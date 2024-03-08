import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class JsonPipe implements PipeTransform<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata): any {
    const objVal = value?.[metadata.data];
    if (!objVal) {
      return undefined;
    }
    try {
      return JSON.parse(objVal);
    } catch (error) {
      throw new BadRequestException('Invalid JSON format');
    }
  }
}
