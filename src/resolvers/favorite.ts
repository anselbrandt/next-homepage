import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Favorite } from "../entities/Favorite";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver(Favorite)
export class FavoriteResolver {
  @Query(() => Favorite, { nullable: true })
  Favorite(@Arg("id", () => Int) id: number): Promise<Favorite | undefined> {
    return Favorite.findOne(id);
  }

  @Mutation(() => Favorite)
  @UseMiddleware(isAuth)
  async addFavorite(
    @Arg("postId") postId: string,
    @Ctx() { req }: MyContext
  ): Promise<Favorite> {
    return Favorite.create({
      postId: postId,
      userId: req.session.userId,
    }).save();
  }
}
