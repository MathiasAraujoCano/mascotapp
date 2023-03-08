import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PostDto } from './dto/post.dto';


@Injectable()
export class PostsService {

    private Posts: PostDto[] = [
        {
            id: uuid(),
            title: 'Vacunas',
            description: 'Cuarta vacuna',
            name: 'Peter'
        }
    ]

    create( postDto: PostDto) {

        const post : PostDto = {
            id: uuid(),
            title: postDto.title,
            description: postDto.description,
            name: postDto.name
        }

        this.Posts.push(post)
        return post
    }

    findAll() {
        return this.Posts;
    }

    findOnePost( id: string) {
        const post = this.Posts.find(post => post.id === id)

        if (!post) throw new NotFoundException(`Post with id "${id}" not found`)

        return post;
    }

    update( id: string, updateDto: PostDto) {

        let postToUpdate = this.findOnePost(id)

        if (!postToUpdate) throw new NotFoundException(`Post with id "${id}" not found`)

        this.Posts = this.Posts.map(post => {
            if (post.id === id) {
                postToUpdate = { ...postToUpdate, ...updateDto }
                return postToUpdate;
            }
            return post;
        })
        return postToUpdate;
    }


    delete( id: string ) {
        return this.Posts.filter(post => post.id !== id)
    }
}
