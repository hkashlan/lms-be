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

const excludeNames = [
  'id',
  'createdDate',
  'createdUserName',
  'createdUserId',
  'updatedDate',
  'updatedUserName',
  'updatedUserId',
];

export default async function onGenerate(options: GeneratorOptions) {
  const models = options.dmmf.datamodel.models;
  const folder = 'src/api';
  // const folderProp = 'src/models/prop-info/';

  models.forEach((e) => {
    const small = toSmallLetter(e.name);
    if (!fs.existsSync(folder + '/' + toKebabCase(e.name))) {
      createService(folder, e, small);
      createController(folder, e, small);
      createModule(folder, e);
    }

    createZod('src/models/validation', e);
  });

  // const content = models.map((m) => `import {${m.name}PropInfo} from './${toKebabCase(m.name)}.prop-info';`).join('\n');
  // const content2 = models.map((m) => `${m.name}PropInfo`).join(',\n');

  // createFile(folderProp, 'index', '', content + 'export const modelPropInfos = { ' + content2 + '}', false);

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
import { ModelRestController } from '../../core/api/model.controller';
import { ${model.name}Validation } from '../../models/validation/${toKebabCase(model.name)}.z';
import { ${model.name}Service } from './${toKebabCase(model.name)}.service';


@Controller('${toKebabCase(model.name)}')
export class ${model.name}Controller extends ModelRestController<
  ${model.name},
  Prisma.${model.name}FindManyArgs,
  Prisma.${model.name}CreateInput,
  Prisma.${model.name}UpdateInput
> {
  constructor(${small}Service: ${model.name}Service) {
    super(${small}Service, ${model.name}Validation);
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

function excludeFields(f: DMMF.Field) {
  return f.kind !== 'object' && f.type !== 'Json' && !excludeNames.includes(f.name);
}

function createZod(folder: string, model: DMMF.Model) {
  // if (!fs.existsSync(folder + '/' + toKebabCase(model.name) + '.z.ts')) {
  const content = `import { ${model.name}, ${model.fields
    .filter((f) => f.kind === 'enum')
    .map((f) => f.type)
    .join(',')} } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const ${model.name}Validation = z.object({
${model.fields.filter(excludeFields).map(
  (f) => `${f.name}: z.${zConstraint(f)}${optional(f)}${array(f)}
  `,
)}
}) satisfies ZodOutputFor<${model.name}>;
`;
  // ${JSON.stringify(f)}
  // console.log(content);
  createFile(folder, `${toKebabCase(model.name)}`, '.z', content, false);
  // }
}

function fromDBToZod(db: string) {
  switch (db) {
    case 'Boolean':
      return 'boolean()';
    case 'String':
      return 'string()';
    case 'Int':
    case 'Float':
      return 'number()';
    case 'DateTime':
      return 'coerce.date()';
    default:
      return db;
  }
}

function zConstraint(field: DMMF.Field) {
  switch (field.kind) {
    case 'enum':
      return `nativeEnum(${field.type})`;
    case 'scalar':
      return fromDBToZod(field.type);
  }
}

function optional(field: DMMF.Field) {
  return field.isRequired ? '' : '.optional().nullable()';
}

function array(field: DMMF.Field) {
  return field.isList ? '.array()' : '';
}

function createFile(folder: string, fileName: string, ext: string, content: string, withFolder = true): void {
  const outputPath = path.resolve(folder) + (withFolder ? '/' + fileName : '');
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {
      recursive: true,
    });
  }
  const fullName = outputPath + '/' + fileName + ext + '.ts';
  console.log(fullName);
  fs.writeFileSync(fullName, content);
}
