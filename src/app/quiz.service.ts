import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuizQuestion } from './quiz-question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly quizUrl = environment.quizUrl;

  constructor(private http: HttpClient) { }

  getQuizQuestions() {
    return this.http.get(this.quizUrl).pipe(
      map((resp: any) => {
        const questions = resp.results;
        questions.forEach((q: any) => {
          const answers = [q.correct_answer, ...q.incorrect_answers];
          this.shuffle(answers);
          q.answers = answers;
        });

        return questions as QuizQuestion[];
      }
    ));
  }

  private shuffle(array: string[]) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
}
