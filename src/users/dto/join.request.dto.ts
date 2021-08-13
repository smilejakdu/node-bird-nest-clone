import { ApiProperty } from "@nestjs/swagger";

export class JoinRequestDto {
	// ApiProperty 에 option 이 무엇이 있는지 궁금할 경우 go to definition 으로 이동하면 된다.
	// ApiProperty 부분은 Swagger 부분에서 Schema 에 잡히게 된다.
	@ApiProperty({
		example: 'ash982416@gmail.com',
		description: '이메일',
		required:true
	})
	public email: string;
		@ApiProperty({
		example: 'ash',
		description: '닉네임',
		required:true
	})
	public nickname: string;
		@ApiProperty({
		example: '123123123',
		description: '비밀번호',
		required:true
	})
	public password: string;
}