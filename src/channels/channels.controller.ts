import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { log } from "console";

@Controller("api/workspaces/:url/channels")
export class ChannelsController {
  @Get()
  getAllChannels() {}

  @Post()
  createChannels() {}

  @Get(":name")
  getSpecificChannel(@Param("id", ParseIntPipe) id: number) {
    // ParseIntPipe 를 붙여주면 string 에서 number 로 변환해준다.
    // main.ts 에서 transform:true 를 설정해줘도 된다.
  }

  @Get(":name/chats")
  getChat(@Query() query, @Param() param) {
    log(query.perPage, query.page);
    log(param.id, param.url);
  }

  @Post(":name/chats")
  postChat(@Body() body) {}

  @Get(":name/members")
  getAllMembers() {}

  @Post(":name/members")
  inviteMembers() {}
}
