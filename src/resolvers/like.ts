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

@Resolver(Like)
export class LikeResolver {
  @Query(() => Like, { nullable: true })
  Like(@Arg("id", () => Int) id: number): Promise<Like | undefined> {
    return Like.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addLike(@Arg("input") input: LikeInput, @Ctx() { req }: MyContext) {
    await Like.create({
      postId: input.postId,
      userId: req.session.userId,
    }).save();
    await Favorite.create({
      postId: input.postId,
      link: input.link,
      preview: input.preview,
    }).save();
    return true;
  }
}
