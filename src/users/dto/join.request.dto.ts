import { ApiProperty, PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";

// PickType 은 클래스간에 중복을 제거해준다.
// https://docs.nestjs.com/openapi/mapped-types#omit 여기로 들어가서 PickType 찾아보면 나온다.
export class JoinRequestDto extends PickType(Users, [
  "email",
  "nickname",
  "password",
] as const) {}
