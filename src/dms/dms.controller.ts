import { log } from 'console';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags('DM')
@Controller('api/workspaces/:url/dms')
export class DmsController {
	@ApiParam({
		name: 'url',
		required: true,
		description:'워크스페이스 url',
	})
	@ApiParam({
		name: 'id',
		required: true,
		description:'사용자 아이디',
	})
	@ApiQuery({
		name: 'perPage',
		required: true,
		description:'한 번에 가져오는 개수',
	})
	@ApiQuery({
		name: 'page',
		required: true,
		description:'불러올 페이지',
	})
	@Get(':id/chats')
	getChat(@Query() query, @Param() param) {
	// getChat(@Query() query, @Param('id') id, @Param('url') url) {
	// 이런식으로 낯개씩 받아올려고하면 파라미터에 ('id')이런식으로 추가를 해주면 된다.
		log(query.perPage, query.page)
		log(param.id , param.url)
	}

	@Post(':id/chats')
	postChat(@Body() body) { 
	// 이것도 역시나 DTO 를 만들어주는것이 좋다.
	// DTO 를 만들지 않으면 어떠한 객체 모양인지 모르니깐 그런것들을 typescript 에서 만들어줘야한다.
	// 이럴때 interface 를 사용해도 되지만 class 를 사용하게 된다.
	}
}
