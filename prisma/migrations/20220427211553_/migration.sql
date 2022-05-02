-- AlterTable
ALTER TABLE `progress` ADD COLUMN `advance` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Qualification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProgres` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `star` INTEGER NOT NULL DEFAULT 0,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Qualification` ADD CONSTRAINT `Qualification_idProgres_fkey` FOREIGN KEY (`idProgres`) REFERENCES `Progress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
