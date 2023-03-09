import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid, validate as isUUID } from 'uuid';
import { PostDto } from './dto/post.dto';
import { Post } from './entity/post.entity';


@Injectable()
export class PostsService {

    constructor(

        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ){}


    async create( postDto: PostDto) {

        const post : Post = {
            id: uuid(),
            ...postDto
        }

        const postToCreate = this.postRepository.create(post)

        await this.postRepository.save(postToCreate)

        return postToCreate;
    }


    async findAll() {
        
        const post = await this.postRepository.find()

        return post;
    }

    async findOnePost( id: string) {

        let post: Post;

        if (isUUID(id)) {
            post = await this.postRepository.findOneBy({id})
        }  
        
        if ( !post ) {
            throw new NotFoundException(`Post with id "${id}" not found`)
        }

        return post;
    }

    async update( id: string, updateDto: PostDto) {

        const postToUpdate = await this.postRepository.preload({
            id,
            ...updateDto
        })

        if ( !postToUpdate ) {
            throw new NotFoundException(`Post with id: ${id} not found`)
        }

        const postUpdated = this.postRepository.save(postToUpdate)

        return postUpdated;
    }


    async delete( id: string ) {

        const post = await this.findOnePost(id)

        if (!post) {
            throw new NotFoundException(`Post with id "${id}" not found`)
        }

        await this.postRepository.remove(post)

        return `Delete successful`
    }
    
}
