import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from "@nestjs/common";
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseObjectPipe implements PipeTransform<string> {
    transform(value: string): string {
        if (!isValidObjectId(value)) {
            throw new BadRequestException('Invalid Mongo ObjectID')
        }
        return value
    }
}