import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuizQuestion } from '../quiz-question.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  questions: QuizQuestion[] = []
  selectedAnswers: (string | undefined)[] = [];
  isGameEnded = false;
  result: number | undefined;
  @ViewChild('resultModal') resultModal!: TemplateRef<any>;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizQuestions().subscribe({
      next: resp => {
        this.questions = resp;
        this.selectedAnswers = new Array(this.questions.length).fill(undefined);
      },
      error: err => console.error(err)
    });
  }

  questionAnswered(answer: string, index: number) {
    this.selectedAnswers[index] = answer;
    this.isGameEnded = this.selectedAnswers.filter(a => !!a).length === this.questions.length;
    if (this.isGameEnded) {
      const points = this.selectedAnswers.filter((a, i) => this.questions[i].correct_answer === a).length;
      this.result = points / this.questions.length;
    }
  }

}
