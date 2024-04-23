/*
  Warnings:

  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdUserName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedUserName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdUserId" INTEGER NOT NULL,
ADD COLUMN     "createdUserName" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedUserId" INTEGER NOT NULL,
ADD COLUMN     "updatedUserName" TEXT NOT NULL;
