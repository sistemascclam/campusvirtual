/*
  Warnings:

  - A unique constraint covering the columns `[ruta]` on the table `Curso` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `curso` ADD COLUMN `ruta` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Curso_ruta_key` ON `Curso`(`ruta`);
