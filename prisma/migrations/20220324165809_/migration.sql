/*
  Warnings:

  - Made the column `idUsuario` on table `favorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idCurso` on table `favorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idUsuario` on table `shopingcart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idCurso` on table `shopingcart` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `favorites` MODIFY `idUsuario` VARCHAR(191) NOT NULL,
    MODIFY `idCurso` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `shopingcart` MODIFY `idUsuario` VARCHAR(191) NOT NULL,
    MODIFY `idCurso` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ShopingCart` ADD CONSTRAINT `ShopingCart_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
