export namespace BFF {
  export namespace myPaths {
    export interface Course {
      id: number;
      pathId: number;
      title: string;
      description: string;
      dateFrom: Date;
      dateTo: Date;
      lessons: Lesson[];
      progress: number;
      quizzes: Quiz[];
    }

    export interface PathInfo {
      id: number;
      title: string;
      description: string;
    }

    export interface Path extends PathInfo {
      courses: Course[];
      progress: number;
    }

    export interface Student {
      title: string;
      lastTitle: string;
      image: string;
      paths: Path[];
    }
  }

  export namespace openPath {
    export class Path {
      title: string;
      description: string;
      id: number;
    }
    export interface PathInstance {
      path: Path;
      title: string;
      description: string;
      dateFrom: Date;
      dateTo: Date;
      teacher: User;
      numberOfStudents: number;
      numberOfRegisteredStudents: number;
      stillOpen: boolean;
      id: number;
    }
  }
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
}
