-- CreateTable
CREATE TABLE `RequestedVoucher` (
    `id` VARCHAR(191) NOT NULL,
    `file` VARCHAR(191) NULL,
    `aproved` BOOLEAN NOT NULL DEFAULT false,
    `amount` DOUBLE NULL,
    `amountDiscount` DOUBLE NULL,
    `idDescuento` INTEGER NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `aproved_date` DATETIME(3) NULL,
    `denied_date` DATETIME(3) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RequestedVoucherDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idRequestedVoucher` VARCHAR(191) NOT NULL,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `active` BOOLEAN NOT NULL DEFAULT true,
    `idCurso` INTEGER NOT NULL,
    `price` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RequestedVoucher` ADD CONSTRAINT `RequestedVoucher_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequestedVoucher` ADD CONSTRAINT `RequestedVoucher_idDescuento_fkey` FOREIGN KEY (`idDescuento`) REFERENCES `DiscountCodes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequestedVoucherDetail` ADD CONSTRAINT `RequestedVoucherDetail_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequestedVoucherDetail` ADD CONSTRAINT `RequestedVoucherDetail_idRequestedVoucher_fkey` FOREIGN KEY (`idRequestedVoucher`) REFERENCES `RequestedVoucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
