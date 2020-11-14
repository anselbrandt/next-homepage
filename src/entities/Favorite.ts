import { ObjectType, Field } from "type-graphql";
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
  link!: string;

  @Field()
  @Column()
  preview!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
