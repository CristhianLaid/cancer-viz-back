import { PartialType } from '@nestjs/mapped-types';
import { CreateCancervizDto } from './create-cancerviz.dto';

export class UpdateCancervizDto extends PartialType(CreateCancervizDto) {}
