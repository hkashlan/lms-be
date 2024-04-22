import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    defaultOutput: './types',
    prettyName: 'Prisma enum custom generator',
    version: '0.0.1',
  };
}
