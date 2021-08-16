import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChannelMembers } from "../entities/ChannelMembers";
import { Channels } from "../entities/Channels";
import { Users } from "../entities/Users";
import { WorkspaceMembers } from "../entities/WorkspaceMembers";
import { Workspaces } from "../entities/Workspaces";

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async findById(id: number) {
    return this.workspacesRepository.findOne({ where: { id } });
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ userId: myId }],
      },
    });
  }

  async createWorkspace(name: string, url: string, myId: number) {
    const workspace = new Workspaces();
    workspace.name = name;
    workspace.url = url;
    workspace.OwnerId = myId;
    const returned = await this.workspacesRepository.save(workspace);
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    // Promise all 을 사용해서 workspace 추가하는것과 channel 추가하는것을 동시에 할 수가 있다.

    const workspaceMember = new WorkspaceMembers();
    workspaceMember.UserId = myId;
    workspaceMember.WorkspaceId = returned.id;
    await this.workspaceMembersRepository.save(workspaceMember);
    const channel = new Channels();
    channel.name = "일반";
    channel.WorkspaceId = returned.id;

    // const [, channelReturned] = await Promise.all([
    //   this.workspaceMembersRepository.save(workspaceMember),
    //   this.channelsRepository.save(channel),
    // ]); 이런식으로 Promise.all 을 사용해 볼수가 있다.

    const channelReturned = await this.channelsRepository.save(channel);
    const channelMember = new ChannelMembers();
    channelMember.UserId = myId;
    channelMember.ChannelId = channelReturned.id;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceMembers(url: string) {
    // sql 느낌을 잘 살려서 만들어 놓은것이 있는데 그것이 QueryBuilder 이다.
    // QueryBuilder 는 Repositry 뿐만아니라 , Manager 에도 있어서 Manager 사용할때도 쓸수있다.
    return (
      this.usersRepository
        .createQueryBuilder("user") // workspace 안에 들어있는 사용자들을 불러온다. user 는 별명이다.
        .innerJoin("user.WorkspaceMembers", "members")
        // Many to Many 라서 사실 그냥 innerJoin('user.Workspaces' , 'w') 이런식으로 해도 되지만 아직은 bug 가 있어서 이렇게 해주자.
        .innerJoin("members.Workspace", "workspace", "workspace.url = :url", {
          url,
        })
        .getMany()
    );
  }

  async createWorkspaceMembers(url, email) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
      join: {
        alias: "workspace",
        innerJoinAndSelect: {
          // innerJoin 이랑 innerJoinAndSelect 의 차이점은 AndSelect 까지하게됨녀 Join 한테이블 데이터까지 불러오게 된다.
          channels: "workspace.Channels",
        },
      },
    });
    // 만약에 위의 코드를 QueryBuilder 를 사용하게 된다면 ,
    // this.workspacesRepositry.createQueryBuilder('workspace').innerJoinAndSelect('workspace.Channels' , 'channels').getOne()
    // QueryBuiler 를 사용하게되면 복잡한 쿼리를 좀더 단순하게 짤수있다는 장점이있다.
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const workspaceMember = new WorkspaceMembers();
    workspaceMember.WorkspaceId = workspace.id;
    workspaceMember.UserId = user.id;
    await this.workspaceMembersRepository.save(workspaceMember);
    const channelMember = new ChannelMembers();
    channelMember.ChannelId = workspace.Channels.find(
      (v) => v.name === "일반",
    ).id;
    channelMember.UserId = user.id;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceMember(url: string, id: number) {
    return this.usersRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id }) // where 문을 더 붙이고 싶을때는 andWhere , orWhere 를 사용하면 된다.
      .innerJoin("user.Workspaces", "workspaces", "workspaces.url = :url", {
        url,
      })
      .getOne();
  }
}
