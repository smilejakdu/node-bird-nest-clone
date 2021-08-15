import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "src/entities/Users";
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  getUser() {}
  async join(email: string, nickname: string, password: string) {
    if (!email) {
      // 이메일 없다고 에러
      throw new HttpException("이메일이 없네요", 400);
    }
    if (!nickname) {
      // 닉네임 없다고 에러
      throw new HttpException("닉네임이 없네요", 400);
    }
    if (!password) {
      // 비밀번호 없다고 에러
      throw new HttpException("비밀번호가 없네요", 400);
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      // 이미 존재하는 유저라고 에러
      throw new HttpException("이미 존재하는 사용자입니다.", 401);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
