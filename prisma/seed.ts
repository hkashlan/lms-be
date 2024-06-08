import { Language, MediaType, PrismaClient, Role, Student, Teacher, User } from '@prisma/client';

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
  const findUser: User | null = await prisma.user.findUnique({
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
        roles: [Role.TEACHER, Role.ADMIN],
        ...basicData,
      },
    });
  }

  const findStudent: Student | null = await prisma.student.findUnique({
    where: {
      id: 1,
    },
  });
  if (!findStudent) {
    const student = await prisma.student.create({
      data: {
        name: 'test',
        user: {
          connect: {
            id: 1,
          },
        },
        student_info: {},
        pathInformation: {},
        ...basicData,
      },
    });
  }

  const findTeacher: Teacher | null = await prisma.teacher.findUnique({
    where: {
      id: 1,
    },
  });

  if (!findTeacher) {
    const teacher = await prisma.teacher.create({
      data: {
        name: 'test',
        user: {
          connect: {
            id: 1,
          },
        },
        ...basicData,
      },
    });
  }

  const path = await prisma.path.create({
    data: {
      name: 'الطهارة',
      description: 'تعلم الطهارة في الإسلام',
      ...basicData,
    },
  });

  const course = await prisma.course.create({
    data: {
      name: 'الطهارة ١',
      pathId: path.id,
      pathName: path.name,
      lessons: [
        {
          date: '2024-05-22T22:00:00.000Z',
          name: 'درس الاول في الطهارة',
          audio: 12,
          audioName: null,
          questions: {
            mark: 12,
            name: 'السؤال الاول',
            answers: [{ name: 'جواب صحيح', correct: true }],
            questionType: 'MultiChoice',
          },
          pageNumber: 12,
          description: 'درس الاول في الطهارة',
          toPageNumber: 12,
        },
        {
          date: '2024-05-07T22:00:00.000Z',
          name: 'الدرس الثاني',
          audio: null,
          audioName: null,
          questions: null,
          pageNumber: 1,
          description: '12213',
          toPageNumber: 1,
        },
        {
          date: '2024-05-21T22:00:00.000Z',
          name: 'الدرس الثالث',
          audio: null,
          questins: null,
          students: null,
          audioName: null,
          pageNumber: 12,
          description: 'سيبسي',
          toPageNumber: 12,
        },
      ],
      quiz: [
        {
          mark: 12,
          name: 'الاختبار الاول',
          dateTo: '2024-05-22T22:00:00.000Z',
          dateFrom: '2024-05-07T22:00:00.000Z',
          questions: [{ mark: 12, name: 'السؤال الاول', answers: null, questionType: 'MultiChoice' }],
        },
        {
          mark: null,
          name: 'الاختبار الثاني',
          dateTo: '2024-05-28T22:00:00.000Z',
          dateFrom: '2024-05-20T22:00:00.000Z',
          questions: null,
        },
        { mark: null, name: 'الاختبار الثالث', dateTo: null, dateFrom: null, questions: null },
      ],
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
