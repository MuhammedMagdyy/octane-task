import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateIntervalDto {
  @IsUUID()
  @IsNotEmpty()
  bookUUID: string;

  @IsInt()
  @Min(1)
  startPage: number;

  @IsInt()
  @Min(1)
  endPage: number;
}
