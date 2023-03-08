import { Global, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { Dog } from './dogs/entity/dog.entity';
import { Post } from './posts/entity/post.entity';
import { Cat } from './cats/entity/cat.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () =>({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'cencocenco',
        database: 'mascotapp',
        entities: [User, Dog, Post, Cat],
        autoLoadEntities: true,
        synchronize: true,
        keepConnectionAlive: true,
        retryAttempts: 2,
        retryDelay: 1000,
      }),
    }),
    DogsModule, CatsModule, UsersModule, PostsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
