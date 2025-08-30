/*
  Warnings:

  - Added the required column `shippingCost` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxes` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."OrderItem" ADD COLUMN     "couponDiscount" DECIMAL(65,30),
ADD COLUMN     "shippingCost" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "taxes" DECIMAL(65,30) NOT NULL;
