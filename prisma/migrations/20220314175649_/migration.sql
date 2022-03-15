-- CreateTable
CREATE TABLE `CursoKeyword` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CursoToSection` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CursoToSection_AB_unique`(`A`, `B`),
    INDEX `_CursoToSection_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CursoToCursoKeyword` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CursoToCursoKeyword_AB_unique`(`A`, `B`),
    INDEX `_CursoToCursoKeyword_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CursoToSection` ADD FOREIGN KEY (`A`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoToSection` ADD FOREIGN KEY (`B`) REFERENCES `Section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoToCursoKeyword` ADD FOREIGN KEY (`A`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CursoToCursoKeyword` ADD FOREIGN KEY (`B`) REFERENCES `CursoKeyword`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
