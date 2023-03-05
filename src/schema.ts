export enum UserAttributes {
  username = "username",
  email = "email",
  provider = "provider",
  password = "password",
  resetPasswordToken = "resetPasswordToken",
  confirmationToken = "confirmationToken",
  confirmed = "confirmed",
  blocked = "blocked",
  role = "role",
  teacherFor = "teacherFor",
  faculties = "faculties",
  courses = "courses",
}

export enum CourseAttributes {
  title = "title",
  course_instances = "course_instances",
  faculty = "faculty",
}

export enum CourseInstanceAttributes {
  course = "course",
  title = "title",
  description = "description",
  dateFrom = "dateFrom",
  dateTo = "dateTo",
  lessons = "lessons",
  quizzes = "quizzes",
  teacher = "teacher",
  numberOfStudents = "numberOfStudents",
}

export enum FacultyAttributes {
  title = "title",
  description = "description",
  courses = "courses",
  students = "students",
}

export enum LessonAttributes {
  title = "title",
  description = "description",
  date = "date",
  questions = "questions",
}

export enum AnswerAttributes {
  title = "title",
  correct = "correct",
}

export enum QuestionAttributes {
  questionType = "questionType",
  title = "title",
  answers = "answers",
}

export enum QuizAttributes {
  title = "title",
  dateFrom = "dateFrom",
  dateTo = "dateTo",
  mark = "mark",
  questions = "questions",
}

export enum CourseResultAttributes {
  course = "course",
  course_instance = "course_instance",
  faculty = "faculty",
  mark = "mark",
}

export class User {
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: boolean;
  blocked: boolean;
  teacherFor: CourseInstance[];
  faculties: Faculty;
  courses: CourseResult[];
}

export class Course {
  title: string;
  course_instances: CourseInstance[];
  faculty: Faculty;
}

export class CourseInstance {
  course: Course;
  title: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  lessons: Lesson[];
  quizzes: Quiz[];
  teacher: User;
  numberOfStudents: number;
}

export class Faculty {
  title: string;
  description: string;
  courses: Course[];
  students: User;
}

export class Lesson {
  title: string;
  description: string;
  date: Date;
  questions: Question[];
}

export class Answer {
  title: string;
  correct: boolean;
}

export class Question {
  questionType: string;
  title: string;
  answers: Answer[];
}

export class Quiz {
  title: string;
  dateFrom: Date;
  dateTo: Date;
  mark: number;
  questions: Question[];
}

export class CourseResult {
  course: Course;
  course_instance: CourseInstance;
  faculty: Faculty;
  mark: number;
}
