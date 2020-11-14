import { Arg, Query, Resolver } from "type-graphql";
import { Favorite } from "../entities/Favorite";

@Resolver(Favorite)
export class FavoriteResolver {
  @Query(() => Favorite, { nullable: true })
  Favorite(
    @Arg("postId", () => String) postId: string
  ): Promise<Favorite | undefined> {
    return Favorite.findOne(postId);
  }
}
