import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEmailDto {
  @IsEmail()
  @IsNotEmpty()
  sender: string;

  @IsEmail()
  @IsNotEmpty()
  recipient: string;

  @IsString()
  @MaxLength(255)
  subject?: string;

  @IsString()
  content?: string;
}