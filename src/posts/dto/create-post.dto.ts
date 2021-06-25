import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  readonly parent_id: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly body: string;

  @IsNotEmpty()
  @IsString()
  readonly owner_user_id: string;

  @IsNotEmpty()
  @IsString()
  readonly owner_user_dp_name: string;

  @IsOptional()
  @IsString({ each: true })
  readonly tag_id: any;
}
