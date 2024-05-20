import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, isNumber } from 'class-validator';

export class FetchUserInboxDto {

  @IsEmail()
  @IsNotEmpty()
  recipient: string;

}