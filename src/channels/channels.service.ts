import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { ChannelChats } from "../entities/ChannelChats";
import { ChannelMembers } from "../entities/ChannelMembers";
import { Channels } from "../entities/Channels";
import { Users } from "../entities/Users";
import { Workspaces } from "../entities/Workspaces";

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(ChannelChats)
    private channelChatsRepository: Repository<ChannelChats>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findById(id: number) {
    return this.channelsRepository.findOne({ where: { id } });
  }

  async getWorkspaceChannels(url: string, myId: number) {
    // workspace 안에있는 channels 불러오기
    return this.channelsRepository
      .createQueryBuilder("channels")
      .innerJoinAndSelect(
        "channels.ChannelMembers",
        "channelMembers",
        "channelMembers.userId = :myId",
        { myId }, // 내가들어있는 채널 다 불러온다.
      )
      .innerJoinAndSelect(
        "channels.Workspace",
        "workspace",
        "workspace.url = :url",
        { url }, // 채널에 대한 workspace 들을 불러온다.
      )
      .getMany();
  }

  async getWorkspaceChannel(url: string, channelId: number) {
    return this.channelsRepository.findOne({
      where: {
        // workspaceId: id,
        id: channelId,
      },
    });
  }
}
