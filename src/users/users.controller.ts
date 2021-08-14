import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/common/decorator/user.decorator";
import { UserDto } from "src/common/dto/user.dto";
import { JoinRequestDto } from "./dto/join.request.dto";
import { UsersService } from "./users.service";

@ApiTags("USER")
@Controller("api/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    // swagger 에서 response 를 작성할수있게 도와준다.
    status: 200,
    description: "성공",
    type: UserDto,
  })
  @ApiResponse({
    // swagger 에서 에럭 response 가 났을경우
    status: 500,
    description: "서버 에러",
  })
  @ApiOperation({ summary: "내정보 조회" }) // swagger 문서 요약 title 을 붙여준다.
  @Get()
  getUsers(@User() user) {
    return user;
  }

  @ApiOperation({ summary: "회원가입" })
  @Post()
  postUsers(@Body() body: JoinRequestDto) {
    this.usersService.postUsers(body.email, body.nickname, body.password);
  }

  @ApiResponse({
    status: 200,
    description: "성공",
    type: UserDto,
  })
  @ApiOperation({ summary: "로그인" })
  @Post("login") // users/login
  logIn(@User() user) {
    return user;
  }

  @ApiOperation({ summary: "로그아웃" })
  @Post("lgout") // users/logout
  logOut(@Req() req, @Res() res) {
    // logOut(@Req() req , @Res() res) {
    // 이렇게 적어도 되지만 되도록 @Req() 라던지 안적는게 좋다.
    req.logOut();
    res.clearCookie("connect.sid", { httpOnly: true });
    res.send("ok");
  }
}
