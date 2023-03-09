import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dog } from './entity/dog.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Dog])],
  controllers: [DogsController],
  providers: [DogsService, ]
})
export class DogsModule {}
