import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { Question } from 'src/app/classes/question';
import { Quiz } from 'src/app/classes/quiz';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { QuizConfig } from './quiz-config';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  offre: string;
  quizs: Quiz[];
  questions: any;
  mode = 'quiz';
  score =0;
  isAnswered = false;
  /*
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };
*/
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  @ViewChild('cd', { static: false }) public countdown: CountdownComponent;
  option: [];
  answers = [];
  validation: number;


  constructor(private quizservice:QuizService, private questionservice: QuestionService,) { }

  ngOnInit(): void {
    this.offre = localStorage.getItem('offre_id');
    console.log(this.offre);
    //this.countdown.begin();
    this.quizservice.getQuizsListe().subscribe(admin => {
      this.quizs = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Quiz;
      });
      this.quizs = this.quizs.filter(quiz =>{
        return quiz.offre == this.offre;
      })
      this.getQuestion(this.quizs[0].uid);
      console.log(this.quizs);           
    });
    
  }

  getQuestion(quiz){
    this.questionservice.getQuestionsListe().subscribe(admin => {
      this.questions = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Question;
      });
      this.questions = this.questions.filter(question =>{
        return question.quiz == quiz;
      })
      this.pager.count = this.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      //this.timer = setInterval(() => { this.tick(); }, 1000);
      //this.duration = this.parseTime(this.config.duration);

      console.log(this.questions);           
    });
  }
/*
  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }*/

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  onSelect(question: Question) {
   
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  

  isCorrect(question: Question) {
  };

  onSubmit() {
    
    this.mode = 'result';
  }

  handleChange(question,i){
    console.log(question);
    console.log(i);
    this.answers[i]=question;
    console.log(this.answers);
  }


  valider(){
    this.isAnswered=true;
   // console.log(this.option);
    let i=0;
    this.questions.forEach(question =>{
      console.log(question.reponse,'|',this.answers[i]);
      if(question.reponse == this.answers[i])
      {
        this.score++;
      }
      i++;
    });
    this.validation = this.score / this.questions.length;
    console.log(this.score,this.validation);
  }

}
