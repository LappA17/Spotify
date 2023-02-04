import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
	constructor(private readonly postService: PostsService) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
		return this.postService.create(dto, image);
	}
}

// UploadedFile - что бы получить какой-то файл
