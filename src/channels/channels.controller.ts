import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { log } from 'console';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
	@Get()
	getAllChannels() {

	}

	@Post()
	createChannels() {

	}

	@Get(':name')
	getSpecificChannel() {

	}

	@Get(':name/chats')
	getChat(@Query() query, @Param() param) {
		log(query.perPage, query.page)
		log(param.id , param.url)
	}

	@Post(':name/chats')
	postChat(@Body() body) { }

	@Get(':name/members')
	getAllMembers() {

	}

	@Post(':name/members')
	inviteMembers() {

	}
}
