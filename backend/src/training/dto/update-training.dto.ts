/**
 * Data Transfer Object for Updating Training Session
 */

import { PartialType } from '@nestjs/swagger';
import { CreateTrainingDto } from './create-training.dto';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {}

