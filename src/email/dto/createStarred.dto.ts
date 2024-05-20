import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, isNumber } from 'class-validator';

export class CreateStarredDto {
  @IsNumber()
  id:number;

  @IsEmail()
  @IsNotEmpty()
  recipient: string;

  @IsBoolean()
  starred: boolean

}