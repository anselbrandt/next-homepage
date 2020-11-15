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
  link: string;
  @Field()
  preview: string;
}

@ObjectType()
class Likes {
  @Field(() => [Like])
  likes: Like[];
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
  async allLikes(@Ctx() { req }: MyContext): Promise<Likes> {
    const likes = await Like.find({ where: { userId: req.session.userId } });
    return { likes: likes };
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
        link: input.link,
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
