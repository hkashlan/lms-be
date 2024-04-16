import { DMMF, GeneratorOptions } from '@prisma/generator-helper';
import fs from 'fs';
import path from 'path';

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])(?=[a-z])|(?=[^a-zA-Z0-9])/g, '-$1')
    .toLowerCase()
    .substring(1);
}

function toSmallLetter(str: string): string {
  return str.charAt(0).toLocaleLowerCase() + str.substring(1);
}

export default async function onGenerate(options: GeneratorOptions) {
  const models = options.dmmf.datamodel.models;
  const folder = 'src/api';

  models.forEach((e) => {
    const small = toSmallLetter(e.name);
    if (!fs.existsSync(folder + '/' + toKebabCase(e.name))) {
      createService(folder, e, small);
      createController(folder, e, small);
      createModule(folder, e);
    }
  });

  const outputFile = options.generator.output;
  if (!outputFile || !outputFile.value) {
    throw new Error('No output file specified');
  }
}

function createModule(folder: string, model: DMMF.Model) {
  const content = `import { Module } from '@nestjs/common';
import { ${model.name}Controller } from './${toKebabCase(model.name)}.controller';
import { ${model.name}Service } from './${toKebabCase(model.name)}.service';

@Module({
  controllers: [${model.name}Controller],
  providers: [${model.name}Service],
})
export class ${model.name}Module {}
`;
  createFile(folder, `${toKebabCase(model.name)}`, '.module', content);
}

function createController(folder: string, model: DMMF.Model, small: string) {
  const content = `import { Controller } from '@nestjs/common';
import { ${model.name}, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { ${model.name}Service } from './${toKebabCase(model.name)}.service';

@Controller('${small}')
export class ${model.name}Controller extends RestController<
  ${model.name},
  Prisma.${model.name}FindManyArgs,
  Prisma.${model.name}CreateInput,
  Prisma.${model.name}UpdateInput
> {
  constructor(readonly ${small}Service: ${model.name}Service) {
    super(${small}Service);
  }
}
`;
  createFile(folder, `${toKebabCase(model.name)}`, '.controller', content);
}
function createService(folder: string, model: DMMF.Model, small: string) {
  const content = `
import { Injectable } from '@nestjs/common';
import { ${model.name}, Prisma } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class ${model.name}Service extends APIService<
  ${model.name},
  Prisma.${model.name}FindManyArgs,
  Prisma.${model.name}CreateInput,
  Prisma.${model.name}UpdateInput
> {
  constructor(db: DatabaseService) {
    super({
      findMany: db.${small}.findMany,
      findOne: db.${small}.findUnique,
      count: db.${small}.count,
      create: db.${small}.create,
      update: db.${small}.update,
      delete: db.${small}.delete,
    });
  }
}
`;
  createFile(folder, `${toKebabCase(model.name)}`, '.service', content);
}

function createFile(
  folder: string,
  fileName: string,
  ext: string,
  content: string,
): void {
  const outputPath = path.resolve(folder) + '/' + fileName;
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {
      recursive: true,
    });
  }
  const fullName = outputPath + '/' + fileName + ext + '.ts';
  console.log(fullName);
  fs.writeFileSync(fullName, content);
}
