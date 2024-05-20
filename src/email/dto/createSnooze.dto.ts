import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSnoozeDto {
  @IsNumber()
  id:number;

  @IsEmail()
  @IsNotEmpty()
  recipient: string;

  @IsNumber()
  duration : number

}