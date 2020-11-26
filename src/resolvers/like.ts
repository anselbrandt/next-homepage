import { LessThan } from "typeorm";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  InputType,
  Field,
  FieldResolver,
  Root,
  ObjectType,
} from "type-graphql";
import { Like } from "../entities/Like";
import { Favorite } from "../entities/Favorite";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@InputType()
class LikeInput {
  @Field()
  postId: string;
  @Field()
  subreddit: string;
  @Field()
  title: string;
  @Field()
  preview: string;
}

@ObjectType()
class Likes {
  @Field(() => [Like])
  likes: Like[];
}

@ObjectType()
class PaginatedLikes {
  @Field(() => [Like])
  likes: Like[];
  @Field()
  hasMore: boolean;
}

@Resolver(Like)
export class LikeResolver {
  // @FieldResolver(() => Favorite)
  // details(@Root() like: Like) {
  //   return Favorite.findOne(like.postId);
  // }

  @FieldResolver(() => Favorite)
  details(@Root() like: Like, @Ctx() { favoriteLoader }: MyContext) {
    return favoriteLoader.load(like.postId);
  }

  @Query(() => Like, { nullable: true })
  getLike(@Arg("id", () => Int) id: number): Promise<Like | undefined> {
    return Like.findOne(id);
  }

  @Query(() => Likes)
  @UseMiddleware(isAuth)
  async getAllLikes(@Ctx() { req }: MyContext): Promise<Likes> {
    const likes = await Like.find({ where: { userId: req.session.userId } });
    return { likes: likes };
  }

  @Query(() => PaginatedLikes)
  @UseMiddleware(isAuth)
  async likes(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedLikes> {
    const realLimit = Math.min(25, limit);
    const reaLimitPlusOne = realLimit + 1;
    const likes = await Like.find({
      order: { createdAt: "DESC" },
      where: {
        userId: req.session.userId,
        createdAt: LessThan(cursor ? new Date(parseInt(cursor)) : new Date()),
      },
      take: reaLimitPlusOne,
    });
    return {
      likes: likes.slice(0, realLimit),
      hasMore: likes.length === reaLimitPlusOne,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addLike(@Arg("input") input: LikeInput, @Ctx() { req }: MyContext) {
    const existingLike = await Like.findOne({
      postId: input.postId,
      userId: req.session.userId,
    });
    if (!existingLike) {
      await Like.create({
        postId: input.postId,
        userId: req.session.userId,
      }).save();
    }
    let existingFavorite = await Favorite.findOne(input.postId);
    if (!existingFavorite) {
      await Favorite.create({
        postId: input.postId,
        subreddit: input.subreddit,
        title: input.title,
        preview: input.preview,
      }).save();
    } else {
      existingFavorite.points++;
      await Favorite.save(existingFavorite);
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async removeLike(@Arg("postId") postId: string, @Ctx() { req }: MyContext) {
    const existingLike = await Like.findOne({
      postId: postId,
      userId: req.session.userId,
    });
    if (existingLike) {
      await Like.remove(existingLike);
    }
    let existingFavorite = await Favorite.findOne(postId);
    if (existingFavorite) {
      existingFavorite.points--;
      await Favorite.save(existingFavorite);
    }
    return true;
  }
}
