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
} from "type-graphql";
import { Favorite } from "../entities/Favorite";
import { Post } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@InputType()
class FavoriteInput {
  @Field()
  postId: string;
  @Field()
  link: string;
  @Field()
  preview: string;
}

@Resolver(Favorite)
export class FavoriteResolver {
  @Query(() => Favorite, { nullable: true })
  Favorite(@Arg("id", () => Int) id: number): Promise<Favorite | undefined> {
    return Favorite.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addFavorite(
    @Arg("input") input: FavoriteInput,
    @Ctx() { req }: MyContext
  ) {
    await Favorite.create({
      postId: input.postId,
      userId: req.session.userId,
    }).save();
    await Post.create({
      postId: input.postId,
      link: input.link,
      preview: input.preview,
    }).save();
    return true;
  }
}
