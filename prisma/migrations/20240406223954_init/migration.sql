-- CreateTable
CREATE TABLE "Path" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Path_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PathInstance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,
    "numberOfStudents" INTEGER NOT NULL,
    "numberOfRegisteredStudents" INTEGER NOT NULL,
    "stilOpen" BOOLEAN DEFAULT false,

    CONSTRAINT "PathInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pathId" INTEGER NOT NULL,
    "pathName" TEXT NOT NULL,
    "lessons" JSONB NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseInstance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "courseName" TEXT NOT NULL,
    "pathInstanceId" INTEGER NOT NULL,
    "pathInstanceName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,
    "book" TEXT NOT NULL,
    "lessons" JSONB NOT NULL,
    "pageFrom" INTEGER NOT NULL,
    "pageTo" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "teacherName" TEXT NOT NULL,

    CONSTRAINT "CourseInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentPathInstance" (
    "id" SERIAL NOT NULL,
    "mark" INTEGER NOT NULL,
    "fullMark" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "studentName" TEXT NOT NULL,
    "pathInstanceId" INTEGER NOT NULL,
    "pathInstanceName" TEXT NOT NULL,
    "pathId" INTEGER NOT NULL,
    "pathName" TEXT NOT NULL,

    CONSTRAINT "StudentPathInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "student_info" JSONB NOT NULL,
    "pathInformation" JSONB NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizInstance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,
    "mark" DOUBLE PRECISION NOT NULL,
    "questions" JSONB NOT NULL,
    "courseInstanceId" INTEGER NOT NULL,
    "courseInstanceName" TEXT NOT NULL,

    CONSTRAINT "QuizInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizInstanceStudent" (
    "id" SERIAL NOT NULL,
    "fullMark" DOUBLE PRECISION NOT NULL,
    "mark" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quizId" INTEGER NOT NULL,
    "quizName" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "studentName" TEXT NOT NULL,
    "pathInstanceId" INTEGER NOT NULL,
    "pathInstanceString" TEXT NOT NULL,
    "answerOptions" JSONB NOT NULL,

    CONSTRAINT "QuizInstanceStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "Path"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseInstance" ADD CONSTRAINT "CourseInstance_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseInstance" ADD CONSTRAINT "CourseInstance_pathInstanceId_fkey" FOREIGN KEY ("pathInstanceId") REFERENCES "PathInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseInstance" ADD CONSTRAINT "CourseInstance_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPathInstance" ADD CONSTRAINT "StudentPathInstance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPathInstance" ADD CONSTRAINT "StudentPathInstance_pathInstanceId_fkey" FOREIGN KEY ("pathInstanceId") REFERENCES "PathInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPathInstance" ADD CONSTRAINT "StudentPathInstance_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "Path"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizInstance" ADD CONSTRAINT "QuizInstance_courseInstanceId_fkey" FOREIGN KEY ("courseInstanceId") REFERENCES "CourseInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizInstanceStudent" ADD CONSTRAINT "QuizInstanceStudent_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "QuizInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizInstanceStudent" ADD CONSTRAINT "QuizInstanceStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizInstanceStudent" ADD CONSTRAINT "QuizInstanceStudent_pathInstanceId_fkey" FOREIGN KEY ("pathInstanceId") REFERENCES "PathInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
