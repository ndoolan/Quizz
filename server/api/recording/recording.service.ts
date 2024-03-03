import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new record
async function createRecord(data: any) {
  try {
    const record = await prisma.record.create({
      data,
    });
    return record;
  } catch (error) {
    throw new Error(`Failed to create record: ${error}`);
  }
}

// Read a record by ID
async function getRecordById(id: number) {
  try {
    const record = await prisma.record.findUnique({
      where: {
        id,
      },
    });
    return record;
  } catch (error) {
    throw new Error(`Failed to get record: ${error}`);
  }
}

// Update a record by ID
async function updateRecordById(id: number, data: any) {
  try {
    const record = await prisma.record.update({
      where: {
        id,
      },
      data,
    });
    return record;
  } catch (error) {
    throw new Error(`Failed to update record: ${error}`);
  }
}

// Delete a record by ID
async function deleteRecordById(id: number) {
  try {
    const record = await prisma.record.delete({
      where: {
        id,
      },
    });
    return record;
  } catch (error) {
    throw new Error(`Failed to delete record: ${error}`);
  }
}

export { createRecord, getRecordById, updateRecordById, deleteRecordById };