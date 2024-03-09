import express from "express";
import {getAllQuestions, getRandomQuestion} from "./question.service";

const router = express.Router();
router.get('/random', async (req, res) => {
  try {
    const question = await getRandomQuestion();
    res.status(200).json(question);
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e.message);
  }
})

router.get('/', async (req, res) => {
  try {
    const questions = await getAllQuestions();
    res.status(200).json(questions);
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e.message);
  }
})

export default router;