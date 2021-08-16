import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "../decorators/user.decorator";
import { Users } from "../entities/Users";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { WorkspacesService } from "./workspaces.service";

@ApiTags("WORKSPACE")
@Controller("api/workspaces")
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @ApiOperation({ summary: "내 워크스페이스 가져오기" })
  @Get()
  async getMyWorkspaces(@User() user: Users) {
    return this.workspacesService.findMyWorkspaces(user.id);
  }

  @ApiOperation({ summary: "워크스페이스 만들기" })
  @Post()
  async createWorkspace(@User() user: Users, @Body() body: CreateWorkspaceDto) {
    // body 는 dto 로 만들어줘야한다
    return this.workspacesService.createWorkspace(
      body.workspace,
      body.url,
      user.id,
    );
  }

  @Get(":url/members")
  getAllMembersFromWorkspace() {
    // 네이밍을 할때 길게 적더라도 직관적이게 적어주는것이 좋다.
  }

  @Post(":url/members")
  inviteMembersToWorkspace() {}

  @Delete(":url/members/:id")
  kickMemberFromWorkspace() {}

  @Get(":url/members/:id")
  getMemberInfoInWorkspace() {}
}
