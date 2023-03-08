export enum CourseAttributes {
	course_instances = "course_instances",
	faculty = "faculty",
}

export enum CourseInstanceAttributes {
	course = "course",
	lessons = "lessons",
	quizzes = "quizzes",
	teacher = "teacher",
}

export enum FacultyAttributes {
	courses = "courses",
	students = "students",
}

export enum UserAttributes {
	teacherFor = "teacherFor",
	faculties = "faculties",
	courses = "courses",
}

export enum LessonAttributes {
	questions = "questions",
	student_activities = "student_activities",
}

export enum StudentLessonAttributes {
	student = "student",
}

export enum QuestionAttributes {
	answers = "answers",
}

export enum QuizAttributes {
	questions = "questions",
	student_quizzes = "student_quizzes",
}

export enum StudentQuizAttributes {
	student = "student",
}

export enum CourseResultAttributes {
	course = "course",
	course_instance = "course_instance",
	faculty = "faculty",
}

export class Course {
	title: string;
	course_instances: CourseInstance[];
	faculty: Faculty;
	id: number;
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
	id: number;
}

export class Faculty {
	title: string;
	description: string;
	courses: Course[];
	students: User[];
	id: number;
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
	faculties: Faculty[];
	courses: CourseResult[];
	id: number;
}

export class Lesson {
	title: string;
	description: string;
	date: Date;
	questions: Question[];
	student_activities: StudentLesson[];
}

export class StudentLesson {
	student: User;
	done: boolean;
	mark: number;
}

export class Answer {
	title: string;
	correct: boolean;
}

export enum QuestionType {
	SingleChoice = "SingleChoice",
	MultiChoice = "MultiChoice",
}

export class Question {
	questionType: QuestionType;
	title: string;
	answers: Answer[];
}

export class Quiz {
	title: string;
	dateFrom: Date;
	dateTo: Date;
	mark: number;
	questions: Question[];
	student_quizzes: StudentQuiz[];
}

export class StudentQuiz {
	student: User;
	date: Date;
	mark: number;
}

export class CourseResult {
	course: Course;
	course_instance: CourseInstance;
	faculty: Faculty;
	mark: number;
}

