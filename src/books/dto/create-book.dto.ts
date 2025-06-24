import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'The Great Gatsby' })
  title: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 180 })
  numberOfPages: number;
}
