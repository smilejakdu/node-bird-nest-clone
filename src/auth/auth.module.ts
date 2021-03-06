import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Users } from "../entities/Users";
import { AuthService } from "./auth.service";
import { LocalSerializer } from "./local.serializer";
import { LocalStrategy } from "./local.strategy";

@Module({
  // 남의 module 이면 imports 이다
  imports: [
    PassportModule.register({ session: true }),
    // 토큰으로 할땐 session : false
    TypeOrmModule.forFeature([Users]),
  ],
  // @Injectable() 이 붙으면 전부 providers 라고 생각하면 된다.
  providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
