import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginRequestDto {
  @IsEmail()
  @ApiProperty({
    example: "ash0924160@gmail.com",
    description: "이메일",
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "123123123",
    description: "비밀번호",
  })
  public password: string;
}
