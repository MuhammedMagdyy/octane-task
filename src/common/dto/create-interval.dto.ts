import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateIntervalDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  @Min(1)
  bookId: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1 })
  startPage: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 100 })
  endPage: number;
}
