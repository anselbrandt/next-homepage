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
import { Post } from "../entities/Post";
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
  @Query(() => Post, { nullable: true })
  Post(@Arg("postId", () => String) postId: string): Promise<Post | undefined> {
    return Post.findOne(postId);
  }

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
    await Post.create({
      postId: input.postId,
      link: input.link,
      preview: input.preview,
    }).save();
    return true;
  }
}
