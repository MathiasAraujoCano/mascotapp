import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [DogsModule, CatsModule, UsersModule, PostsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
