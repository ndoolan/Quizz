import {getAllQuestions, getRandomQuestion} from "./question.service";

describe("Question service tests.", () => {
  it('should get a random question', async () => {
    const question = await getRandomQuestion();
    expect(question).toBeTruthy();
    expect(question.subject).toBeTruthy();
    expect(question.id).toBeGreaterThan(-1);
    console.log(question);
  })

  it('should get a all questions', async () => {
    const questions = await getAllQuestions();
    expect(questions.length).toBeGreaterThan(5);
  })
})