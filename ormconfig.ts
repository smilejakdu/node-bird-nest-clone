import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from "dotenv";
import { ChannelChats } from "./src/entities/ChannelChats";
import { ChannelMembers } from "./src/entities/ChannelMembers";
import { Channels } from "./src/entities/Channels";
import { DMs } from "./src/entities/DMs";
import { Mentions } from "./src/entities/Mentions";
import { Users } from "./src/entities/Users";
import { WorkspaceMembers } from "./src/entities/WorkspaceMembers";
import { Workspaces } from "./src/entities/Workspaces";

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // entities: ['entities/*.ts'], // 이렇게 하나거나 하나씩 import 하는 방법도 있다.
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces,
  ],
  migrations: [__dirname + "/src/migrations/*.ts"],
  cli: { migrationsDir: "src/migrations" },
  autoLoadEntities: true,
  charset: "utf8mb4",
  synchronize: false, // 한번 만들고 나서는 false 로 해주는것이 좋다.
  logging: true, // typescript 작성하게 될때 orm 이 자동으로 sql 로 바꿔주게된다. 이게 비효율적으로 될 수도 있다. 그래서
  // 항상 logging 을 켜두고 효율적으로 바꿔주는지 확인을 해봐야한다.
  keepConnectionAlive: true,
  // hot reloading 을 하게되는데 , 자동으로 서버가 재시작된다.
  // 이때 typeorm 은 database 연결을 끊어버리게된다. 그것을 막기 위해서 keepConnectionAlive 을 설정해줘야한다.
};

export = config;
