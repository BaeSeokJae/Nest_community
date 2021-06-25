import { Injectable, Options } from '@nestjs/common';
import { Paging } from 'src/utils/Paging';
import { Connection, getConnection, getManager } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostTag } from './entities/posttag.entity';

@Injectable()
export class PostsService {
  constructor(private connection: Connection) {}
  //전체 게시글 조회
  async findAll(pageNum: number) {
    let offset = 0;
    const count = 10;

    if (pageNum > 1) {
      offset = count * (pageNum - 1);
    }
    console.log(offset);
    // 전체 게시글 수
    const totalPost = await getManager()
      .createQueryBuilder(Post, 'post')
      .select('count(id)', 'count')
      .orderBy({
        'post.created_at': 'DESC',
      })
      .getRawMany();

    // 페이징 처리
    const { totalPage } = Paging(pageNum, totalPost[0].count);

    // 게시글 조회
    const post = await getManager()
      .createQueryBuilder(Post, 'post')
      .skip(offset)
      .take(count)
      .orderBy({
        'post.created_at': 'DESC',
      })
      .getMany();

    return {
      data: post,
      pagination: {
        page: pageNum,
        total_page: totalPost,
        count: count,
        total_count: totalPage,
      },
    };
  }

  async createPosts(createPostDto: CreatePostDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await queryRunner.manager.save(Post, {
        title: createPostDto.title || null,
        body: createPostDto.body || null,
        owner_user_id: createPostDto.owner_user_id || null,
        owner_user_dp_name: createPostDto.owner_user_dp_name || null,
      });

      for (const ele of createPostDto.tag_id) {
        await queryRunner.manager.save(PostTag, {
          post_id: post,
          tag_id: ele,
        });
      }

      await queryRunner.commitTransaction();
      return { message: 'Write Success' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw { message: 'Write Failed' };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
