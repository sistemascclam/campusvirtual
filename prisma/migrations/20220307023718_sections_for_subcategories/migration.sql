/*
  Warnings:

  - You are about to drop the `_categorytosubcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_categorytosubcategory` DROP FOREIGN KEY `_categorytosubcategory_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_categorytosubcategory` DROP FOREIGN KEY `_categorytosubcategory_ibfk_2`;

-- DropTable
DROP TABLE `_categorytosubcategory`;

-- DropTable
DROP TABLE `subcategory`;

-- CreateTable
CREATE TABLE `Section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToSection` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToSection_AB_unique`(`A`, `B`),
    INDEX `_CategoryToSection_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryToSection` ADD FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToSection` ADD FOREIGN KEY (`B`) REFERENCES `Section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
