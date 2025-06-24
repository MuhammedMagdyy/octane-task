import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateIntervalDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  bookUUID: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1 })
  startPage: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 100 })
  endPage: number;
}
