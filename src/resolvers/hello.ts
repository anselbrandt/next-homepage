import {
  Ctx,
  ObjectType,
  Field,
  Resolver,
  Query,
  Subscription,
} from "type-graphql";

@ObjectType()
class Status {
  @Field()
  status: string;
}

@ObjectType()
class Notification {
  @Field()
  message: string;
  @Field()
  time: number;
}

@Resolver()
export class HelloResolver {
  @Query(() => Status)
  async hello(@Ctx() ctx: any) {
    await ctx.req.pubsub.publish("MESSAGES");
    const status = { status: "GraphQL server up and running." };
    return status;
  }

  @Subscription(() => Notification, {
    topics: "MESSAGES",
  })
  async subscription(): Promise<any> {
    const time = Date.now();
    const notification = { message: "New user query", time: time };
    return notification;
  }
}
