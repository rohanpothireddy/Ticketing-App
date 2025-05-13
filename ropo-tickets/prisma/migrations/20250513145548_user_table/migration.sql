/*
  Warnings:

  - You are about to drop the column `stats` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `stats`,
    ADD COLUMN `assignedToUserId` INTEGER NULL,
    ADD COLUMN `status` ENUM('OPEN', 'STARTED', 'CLOSED') NOT NULL DEFAULT 'OPEN';

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'TECH', 'USER') NOT NULL DEFAULT 'USER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
