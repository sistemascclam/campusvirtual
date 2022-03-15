/*
  Warnings:

  - Added the required column `registration_date` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `curso` ADD COLUMN `registration_date` DATETIME(3) NOT NULL;
