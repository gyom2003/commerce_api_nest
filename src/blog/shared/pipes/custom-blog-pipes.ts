import * as mongoose from 'mongoose';
import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pipe } from 'stream';

@Injectable()
export class ValidateBlogIdPipe implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = mongoose.Types.ObjectId.isValid(value)
        if (!isValid) {
            throw new BadRequestException('Invalid ID!');
        }
        return value
    }
}