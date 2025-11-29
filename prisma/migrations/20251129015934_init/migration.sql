-- CreateEnum
CREATE TYPE "DicomModality" AS ENUM ('CR', 'CT', 'DX', 'MG', 'MR', 'NM', 'OT', 'PT', 'RF', 'US', 'XA');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "dicomModality" "DicomModality" NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_document_key" ON "Patient"("document");

-- CreateIndex
CREATE INDEX "Patient_document_idx" ON "Patient"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Exam_idempotencyKey_key" ON "Exam"("idempotencyKey");

-- CreateIndex
CREATE INDEX "Exam_patientId_idx" ON "Exam"("patientId");

-- CreateIndex
CREATE INDEX "Exam_idempotencyKey_idx" ON "Exam"("idempotencyKey");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
