import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class JoinRequestDto {
  @IsEmail()
  @ApiProperty({
    example: "ash982416@gmail.com",
    description: "이메일",
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "ash",
    description: "닉네임",
  })
  public nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "123123123",
    description: "비밀번호",
  })
  public password: string;
}
