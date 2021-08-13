import { NestMiddleware , Injectable , Logger } from "@nestjs/common";
import { Request , Response , NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger('HTTP');

	use(request: Request, response: Response, next: NextFunction):void {
		const { ip, method, originalUrl } = request;
		const userAgent = request.get('user-agent') || '';
		/*
			이것은 왜 response.on 일까 ?? 
			여기있는 middleware 는 router 보다 먼저 실행이 된다.
			finish 가 끝나고 나서 그리고 나서 안에 있는 코드가 실행이 된다. ==> 그래서 비동기이다.
		*/
		response.on('finish', () => { 
			const { statusCode } = response;
			const contentLength = response.get('content-length');
			this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
		});
		next();
	}
}
