/*
  Warnings:

  - You are about to drop the column `idProgres` on the `qualification` table. All the data in the column will be lost.
  - Added the required column `idCurso` to the `Qualification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `Qualification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `qualification` DROP FOREIGN KEY `Qualification_idProgres_fkey`;

-- AlterTable
ALTER TABLE `qualification` DROP COLUMN `idProgres`,
    ADD COLUMN `idCurso` INTEGER NOT NULL,
    ADD COLUMN `idUsuario` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Qualification` ADD CONSTRAINT `Qualification_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Qualification` ADD CONSTRAINT `Qualification_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
