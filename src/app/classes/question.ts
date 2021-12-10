import { Quiz } from "./quiz";

export class Question {
    uid:string;
    titre:string;
    choix:Date;
    reponse:string;
    quiz:Quiz;
}
