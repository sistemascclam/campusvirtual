-- CreateTable
CREATE TABLE `Leccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `cuerpo` TEXT NULL,
    `url` TEXT NULL,
    `orden` INTEGER NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HelperLeccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `orden` INTEGER NULL DEFAULT 1,
    `leccionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HelperLeccion` ADD CONSTRAINT `HelperLeccion_leccionId_fkey` FOREIGN KEY (`leccionId`) REFERENCES `Leccion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
