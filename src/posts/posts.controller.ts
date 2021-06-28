import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('community')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/posts')
  allPosts(@Query('page') page: number) {
    return this.postsService.allPosts(page);
  }

  @Post('posts')
  createPosts(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPosts(createPostDto);
  }

  @Get('posts/:id')
  findPost(@Param('id') id: string) {
    return this.postsService.findPost(id);
  }

  @Patch('posts/:id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete('posts/:id')
  removePost(@Param('id') id: string) {
    return this.postsService.removePost(id);
  }
}
