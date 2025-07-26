-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "productColorId" TEXT;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productColorId_fkey" FOREIGN KEY ("productColorId") REFERENCES "ProductColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
