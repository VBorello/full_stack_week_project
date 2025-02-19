/*
  Warnings:

  - You are about to drop the column `consuptionMethod` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ingredient` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `restauratId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `consumptionMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ConsumptionMethod" AS ENUM ('TAKEAWAY', 'DINE_IN');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_restauratId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "consuptionMethod",
ADD COLUMN     "consumptionMethod" "ConsumptionMethod" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ingredient",
DROP COLUMN "restauratId",
ADD COLUMN     "ingredients" TEXT[],
ADD COLUMN     "restaurantId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "consuptionMethod";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
