import { Language, MediaType, PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

const basicData = {
  updatedDate: new Date(),
  updatedUserId: 1,
  updatedUserName: 'test',
  createdDate: new Date(),
  createdUserId: 1,
  createdUserName: 'tt',
};

async function main() {
  const findUser = await prisma.user.findUnique({
    where: {
      email: 'test',
    },
  });

  if (!findUser) {
    const user = await prisma.user.create({
      data: {
        name: 'test',
        email: 'test',
        password: '123456',
        language: Language.ar,
        roles: [Role.TEACHER],
        ...basicData,
      },
    });
  }

  const path = await prisma.path.create({
    data: {
      name: 'path1',
      description: 'path 1 description',
      ...basicData,
    },
  });

  const course = await prisma.course.create({
    data: {
      name: 'test',
      pathId: path.id,
      pathName: path.name,
      lessons: [],
      quiz: [],
      ...basicData,
    },
  });

  const mediaFolder = await prisma.mediaFolder.create({
    data: {
      name: 'test',
      ...basicData,
    },
  });

  const media = await prisma.media.create({
    data: {
      name: 'test',
      folderId: mediaFolder.id,
      folderName: mediaFolder.name,
      mimetype: '',
      type: MediaType.IMAGE,
      size: 123,
      url: '',
      ext: '',
      ...basicData,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
