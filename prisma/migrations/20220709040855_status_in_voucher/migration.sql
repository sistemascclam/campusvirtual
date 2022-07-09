/*
  Warnings:

  - You are about to drop the column `aproved` on the `requestedvoucher` table. All the data in the column will be lost.
  - Added the required column `status` to the `RequestedVoucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `requestedvoucher` DROP COLUMN `aproved`,
    ADD COLUMN `status` INTEGER NOT NULL;
