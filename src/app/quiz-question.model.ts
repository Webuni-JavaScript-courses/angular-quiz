export interface QuizQuestion {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
  question: string;
  type: string;
}
