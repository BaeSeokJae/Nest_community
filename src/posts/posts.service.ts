import { Injectable } from '@nestjs/common';
import { count } from 'console';
import { Paging } from 'src/utils/Paging';
import { Connection, getConnection, getManager, IsNull, Not } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostTag } from './entities/posttag.entity';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostsService {
  // constructor(private connection: Connection) {}
  constructor(private readonly postRepository: PostRepository) {}
  //전체 게시글 조회
  async allPosts(pageNum: number) {
    // 전체 게시글 수
    const totalPost = await this.postRepository.findAndCount().then((data) => {
      return data[1];
    });

    // 페이징 처리
    const { totalPage, offset, maxPost } = Paging(pageNum, totalPost);
    // 게시글 조회
    const post = await this.postRepository.find({
      skip: offset,
      take: maxPost,
      order: {
        created_at: 'DESC',
      },
    });

    return {
      data: post,
      pagination: {
        page: pageNum,
        total_page: totalPage,
        count: maxPost,
        total_count: totalPost,
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
        title: createPostDto.title,
        body: createPostDto.body,
        owner_user_id: createPostDto.owner_user_id,
        owner_user_dp_name: createPostDto.owner_user_dp_name,
      });

      if (createPostDto.tag_id) {
        for (const ele of createPostDto.tag_id) {
          await queryRunner.manager.save(PostTag, {
            post_id: post,
            tag_id: ele,
          });
        }
      }

      await queryRunner.commitTransaction();
      return { message: 'Write Success' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      throw { message: 'Write Failed' };
    }
  }

  async findPost(id: string) {
    // id에 맞는 게시글 찾기
    const post = await this.postRepository.findOne({
      where: {
        id: id,
      },
      order: {
        parent_id: 'ASC',
        created_at: 'DESC',
      },
    });

    if (post) {
      return { data: post };
    } else {
      return { message: "It's Delete Post" };
    }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    // const updatePost = await getManager()
    //   .createQueryBuilder()
    //   .update(Post)
    //   .set(updatePostDto)
    //   .where('id = :id', { id })
    //   .execute()
    //   .then((data) => {
    //     return data.affected;
    //   });
    const updatePost = await this.postRepository
      .save({
        id,
        ...updatePostDto,
      })
      .then((data) => {
        return data;
      });

    // if (updatePost === 1) {
    //   return { message: 'Update Success' };
    // } else {
    //   return { message: "It's Delete Post" };
    // }
    return updatePost;
  }

  async removePost(id: string) {
    await getManager()
      .createQueryBuilder(Post, 'posts')
      .softDelete()
      .where('id = :id', { id })
      .execute();

    return { message: 'remove Success' };
  }
}
