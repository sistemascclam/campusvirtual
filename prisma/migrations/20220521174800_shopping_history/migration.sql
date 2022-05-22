-- CreateTable
CREATE TABLE `ShoppingHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` VARCHAR(191) NOT NULL,
    `idCurso` INTEGER NOT NULL,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShoppingHistory` ADD CONSTRAINT `ShoppingHistory_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingHistory` ADD CONSTRAINT `ShoppingHistory_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
