import { PrismaClient, Question } from '@prisma/client';
const prisma = new PrismaClient();

export async function getRandomQuestion() {
  const allQuestions: Question[] = await prisma.question.findMany();
  return allQuestions[getRandomInt(0, allQuestions.length-1)];
}

export async function getAllQuestions() {
  const allQuestions: Question[] = await prisma.question.findMany();
  return allQuestions;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}