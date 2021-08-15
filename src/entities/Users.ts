import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ChannelChats } from "./ChannelChats";
import { ChannelMembers } from "./ChannelMembers";
import { Channels } from "./Channels";
import { DMs } from "./DMs";
import { Mentions } from "./Mentions";
import { WorkspaceMembers } from "./WorkspaceMembers";
import { Workspaces } from "./Workspaces";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Index("email", ["email"], { unique: true })
@Entity({ schema: "sleact", name: "users" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;
  @IsEmail()
  @ApiProperty({
    example: "ash982416@gmail.com",
    description: "email",
  })
  @Column("varchar", { name: "email", unique: true, length: 30 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "ash",
    description: "nickname",
  })
  @Column("varchar", { name: "nickname", length: 30 })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @Column("varchar", { name: "password", length: 100, select: false }) // select: false 하면 password 빼고 불러온다.
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ChannelChats, (channelchats) => channelchats.User)
  ChannelChats: ChannelChats[];

  @OneToMany(() => ChannelMembers, (channelmembers) => channelmembers.User)
  ChannelMembers: ChannelMembers[];

  @OneToMany(() => DMs, (dms) => dms.Sender)
  DMs: DMs[];

  @OneToMany(() => DMs, (dms) => dms.Receiver)
  DMs2: DMs[];

  @OneToMany(() => Mentions, (mentions) => mentions.Sender)
  Mentions: Mentions[];

  @OneToMany(() => Mentions, (mentions) => mentions.Receiver)
  Mentions2: Mentions[];

  @OneToMany(
    () => WorkspaceMembers,
    (workspacemembers) => workspacemembers.User,
  )
  WorkspaceMembers: WorkspaceMembers[];

  @OneToMany(() => Workspaces, (workspaces) => workspaces.Owner)
  OwnedWorkspaces: Workspaces[];

  @ManyToMany(() => Workspaces, (workspaces) => workspaces.Members)
  @JoinTable({
    name: "workspacemembers",
    joinColumn: {
      name: "UserId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "WorkspaceId",
      referencedColumnName: "id",
    },
  })
  Workspaces: Workspaces[];

  @ManyToMany(() => Channels, (channels) => channels.Members)
  @JoinTable({
    name: "channelmembers",
    joinColumn: {
      name: "UserId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "ChannelId",
      referencedColumnName: "id",
    },
  })
  Channels: Channels[];
}
