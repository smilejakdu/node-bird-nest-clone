import { Injectable } from '@nestjs/common';

/*
요청 과 응답에 대해서는 몰라요
req , res 가 없는게 더 좋다.
정말 해야하는 동작만 여기서 동작하게 되고 결과값을 controller 에 돌려주면된다.
*/
@Injectable()
export class AppService {
  async getHello() {
    return process.env.SECRET;
  }
}
