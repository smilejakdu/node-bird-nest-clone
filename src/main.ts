import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./http-exception.filter";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalFilters(new HttpExceptionFilter());
  // swagger 에 대한 설정 부분이다
  // https://docs.nestjs.com/openapi/introduction
  // 공식문서에 너무나도 잘 나와있다.
  const config = new DocumentBuilder()
    .setTitle("Sleact APi clone study")
    .setDescription("this is API document for Sleact clone develop")
    .setVersion("1.0")
    .addCookieAuth("connect.sid")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port);
  console.log(`listening on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
