/*
  Warnings:

  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserName` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserName` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `CourseInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `CourseInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserName` to the `CourseInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `CourseInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `CourseInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserName` to the `CourseInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `Path` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `Path` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserName` to the `Path` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `Path` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `Path` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserName` to the `Path` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `PathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `PathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserName` to the `PathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `PathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `PathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserName` to the `PathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `QuizInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `QuizInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserName` to the `QuizInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `QuizInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `QuizInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserName` to the `QuizInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `QuizInstanceStudent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `QuizInstanceStudent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserName` to the `QuizInstanceStudent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `QuizInstanceStudent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `QuizInstanceStudent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserName` to the `QuizInstanceStudent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `StudentPathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `StudentPathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserName` to the `StudentPathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `StudentPathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `StudentPathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserName` to the `StudentPathInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserName` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserName` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TEACHER', 'STUDENT');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "createdUserName" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" INTEGER NOT NULL,
ADD COLUMN     "updatedUserName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CourseInstance" ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "createdUserName" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" INTEGER NOT NULL,
ADD COLUMN     "updatedUserName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Path" ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "createdUserName" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" INTEGER NOT NULL,
ADD COLUMN     "updatedUserName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PathInstance" ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "createdUserName" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" INTEGER NOT NULL,
ADD COLUMN     "updatedUserName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuizInstance" ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "createdUserName" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" INTEGER NOT NULL,
ADD COLUMN     "updatedUserName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuizInstanceStudent" ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "createdUserName" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" INTEGER NOT NULL,
ADD COLUMN     "updatedUserName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "createdUserName" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" INTEGER NOT NULL,
ADD COLUMN     "updatedUserName" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Student_id_seq";

-- AlterTable
ALTER TABLE "StudentPathInstance" ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "createdUserName" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" INTEGER NOT NULL,
ADD COLUMN     "updatedUserName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "phone",
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "createdUserName" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" INTEGER NOT NULL,
ADD COLUMN     "updatedUserName" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Teacher_id_seq";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "roles" "Role"[],
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Post";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
