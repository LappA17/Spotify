export class CreatePostDto {
	readonly title: string;
	readonly content: string;
	readonly userId: number; // по хорошеу доставать айди из токена а не с дто
}
