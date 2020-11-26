import { ObjectType, Field, Int } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class Favorite extends BaseEntity {
  @PrimaryColumn()
  postId: string;

  @Field()
  @Column()
  subreddit!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  preview!: string;

  @Field(() => Int)
  @Column({ type: "int", default: 1 })
  points!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
