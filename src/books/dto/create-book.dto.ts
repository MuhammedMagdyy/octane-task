import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @Min(1)
  numberOfPages: number;
}
