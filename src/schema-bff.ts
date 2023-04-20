export namespace BFF {
  export interface Response<T> {
    data?: T;
    error?: {
      message: string;
    };
  }

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

    export type OpenPathResponse = Response<Student>;
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
      numberOfStudents: number;
      numberOfRegisteredStudents: number;
      stillOpen: boolean;
      id: number;
    }

    export type OpenPathResponse = Response<PathInstance[]>;
  }

  export namespace register {
    export enum Errors {
      PATH_NOT_FOUND = "PATH_NOT_FOUND",
    }
    export type OpenPathResponse = Response<openPath.PathInstance[]>;
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
