export namespace BFF {
  export interface Answer {
    title: string;
    correct: boolean;
  }

  export enum QuestionType {
    SingleChoice = "SingleChoice",
    MultiChoice = "MultiChoice",
  }

  export interface Question {
    title: string;
    answers: Answer[];
    questionType: QuestionType;
  }

  export interface Lesson {
    lessonId: number;
    title: string;
    description: string;
    present: boolean;
    done: boolean;
    date: Date;
    mark: number;
    questions: Question[];
  }

  export interface Quiz {
    dateFrom: Date;
    dateTo: Date;
    doneOnDate: Date;
    title: string;
    questions: Question[];
    mark?: number;
  }

  export interface Course {
    id: number;
    facultyId: number;
    title: string;
    description: string;
    dateFrom: Date;
    dateTo: Date;
    lessons: Lesson[];
    progress: number;
    quizzes: Quiz[];
  }

  export interface Faculty {
    id: number;
    title: string;
    description: string;
    courses: Course[];
    progress: number;
  }

  export interface Student {
    title: string;
    lastTitle: string;
    image: string;
    faculties: Faculty[];
  }
}
