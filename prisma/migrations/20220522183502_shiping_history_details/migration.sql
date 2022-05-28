/*
  Warnings:

  - You are about to drop the column `idCurso` on the `shoppinghistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `shoppinghistory` DROP FOREIGN KEY `ShoppingHistory_idCurso_fkey`;

-- AlterTable
ALTER TABLE `shoppinghistory` DROP COLUMN `idCurso`;

-- CreateTable
CREATE TABLE `ShopintHistoryDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idShopingHistory` INTEGER NOT NULL,
    `idCurso` INTEGER NOT NULL,
    `monto` DECIMAL(10, 2) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShopintHistoryDetail` ADD CONSTRAINT `ShopintHistoryDetail_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopintHistoryDetail` ADD CONSTRAINT `ShopintHistoryDetail_idShopingHistory_fkey` FOREIGN KEY (`idShopingHistory`) REFERENCES `ShoppingHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
