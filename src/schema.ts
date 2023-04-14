export enum UserAttributes {
	teacherFor = "teacherFor",
	paths = "paths",
	courses = "courses",
	pathInstances = "pathInstances",
}

export enum CourseAttributes {
	course_instances = "course_instances",
	path = "path",
}

export enum CourseInstanceAttributes {
	course = "course",
	lessons = "lessons",
	quizzes = "quizzes",
}

export enum PathAttributes {
	courses = "courses",
	teacher = "teacher",
	students = "students",
	path_instances = "path_instances",
}

export enum PathInstanceAttributes {
	path = "path",
	teacher = "teacher",
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
	path = "path",
}

export enum PathResultAttributes {
	path = "path",
	path_instance = "path_instance",
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
	teacherFor: PathInstance[];
	paths: Path[];
	courses: CourseResult[];
	pathInstances: PathResult[];
	id: number;
}

export class Course {
	title: string;
	course_instances: CourseInstance[];
	path: Path;
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
	id: number;
}

export class Path {
	title: string;
	description: string;
	courses: Course[];
	teacher: User;
	students: User[];
	path_instances: PathInstance[];
	id: number;
}

export class PathInstance {
	path: Path;
	title: string;
	description: string;
	dateFrom: Date;
	dateTo: Date;
	teacher: User;
	numberOfStudents: number;
	publishedAt: Date;
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
	path: Path;
	mark: number;
}

export class PathResult {
	path: Path;
	path_instance: PathInstance;
}

