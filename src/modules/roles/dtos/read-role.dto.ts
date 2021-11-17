import { IsNumber, IsString, IsUUID } from 'class-validator';

export class ReadRoleDto {
  @IsUUID()
  id: string;
  
  @IsString()
  name: string;

  @IsString()
  description: string;
}
