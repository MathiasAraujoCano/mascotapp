import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}


    @Post()
    create(@Body() postDto: PostDto){
        return this.postsService.create(postDto)
    }

    @Get()
    findAll(){
        return this.postsService.findAll()
    }

    @Get(':id')
    findOnePost(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.findOnePost(id)
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() postDto: PostDto
    ) {
        return this.postsService.update(id, postDto)
    }
}
