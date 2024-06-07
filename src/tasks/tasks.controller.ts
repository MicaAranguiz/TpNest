import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { Task } from './task.entity';
  import { CreateTaskDto } from './create-task.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
  
  @ApiTags('tasks')
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    @ApiOperation({ summary: 'Crear una nueva tarea' })
    @ApiBody({ type: CreateTaskDto })
    @ApiResponse({ status: 201, description: 'La tarea ha sido creada exitosamente.' })
    @ApiResponse({ status: 400, description: 'Datos de entrada no válidos.' })
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
      const { title, description, status } = createTaskDto;
      return this.tasksService.createTask(title, description, status);
    }
  
    @Get()
    @ApiOperation({ summary: 'Obtener todas las tareas' })
    @ApiResponse({ status: 200, description: 'Devuelve todas las tareas.' })
    async getTasks(): Promise<Task[]> {
      return this.tasksService.getTasks();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener una tarea por ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'El ID de la tarea' })
    @ApiResponse({ status: 200, description: 'Devuelve la tarea con el ID dado.' })
    @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
    async getTaskById(@Param('id') id: number): Promise<Task> {
      return this.tasksService.getTaskById(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una tarea' })
    @ApiParam({ name: 'id', type: 'number', description: 'El ID de la tarea' })
    @ApiBody({ type: CreateTaskDto })
    @ApiResponse({ status: 200, description: 'La tarea ha sido actualizada exitosamente.' })
    @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
    async updateTask(
      @Param('id') id: number,
      @Body() createTaskDto: CreateTaskDto,
    ): Promise<Task> {
      const { title, description, status } = createTaskDto;
      return this.tasksService.updateTask(id, title, description, status);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una tarea' })
    @ApiParam({ name: 'id', type: 'number', description: 'El ID de la tarea' })
    @ApiResponse({ status: 200, description: 'La tarea ha sido eliminada exitosamente.' })
    @ApiResponse({ status: 404, description: 'Tarea no encontrada.' })
    async deleteTask(@Param('id') id: number): Promise<void> {
      return this.tasksService.deleteTask(id);
    }
  }
  