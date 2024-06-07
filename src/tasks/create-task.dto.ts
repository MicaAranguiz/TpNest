import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Título de la Tarea', description: 'El título de la tarea' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Descripción de la Tarea', description: 'La descripción de la tarea' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'pendiente', description: 'El estado de la tarea', enum: ['pending', 'in progress', 'done'] })
  @IsString()
  @IsIn(['pending', 'in progress', 'done'])
  status: string;
}
