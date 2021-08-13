import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
	@Get()
	getMyWorkspaces() {

	}
	@Post()
	createWorkspace() {

	}

	@Get(':url/members')
	getAllMembersFromWorkspace() {
	// 네이밍을 할때 길게 적더라도 직관적이게 적어주는것이 좋다.

	}

	@Post(':url/members')
	inviteMembersToWorkspace() { }
	
	@Delete(':url/members/:id')
	kickMemberFromWorkspace() { }

	@Get(':url/members/:id')
	getMemberInfoInWorkspace() { }
}
