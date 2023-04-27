export enum UserRelations {
	teacherFor = "teacherFor",
	paths = "paths",
	courses = "courses",
	pathInstances = "pathInstances",
	pathInstanceRefs = "pathInstanceRefs",
}

export enum CourseRelations {
	course_instances = "course_instances",
	path = "path",
}

export enum CourseInstanceRelations {
	course = "course",
	path_instance = "path_instance",
	lessons = "lessons",
	quizzes = "quizzes",
}

export enum PathRelations {
	courses = "courses",
	teacher = "teacher",
	students = "students",
	path_instances = "path_instances",
}

export enum PathInstanceRelations {
	path = "path",
	teacher = "teacher",
	course_instances = "course_instances",
	students = "students",
}

export enum LessonRelations {
	questions = "questions",
	student_activities = "student_activities",
}

export enum StudentLessonRelations {
	student = "student",
}

export enum QuestionRelations {
	answers = "answers",
}

export enum QuizRelations {
	questions = "questions",
	student_quizzes = "student_quizzes",
}

export enum StudentQuizRelations {
	student = "student",
}

export enum CourseResultRelations {
	course = "course",
	course_instance = "course_instance",
	path = "path",
}

export enum PathResultRelations {
	path = "path",
	path_instance = "path_instance",
}

export enum UserAttributes {
	username = "username",
	email = "email",
	provider = "provider",
	password = "password",
	resetPasswordToken = "resetPasswordToken",
	confirmationToken = "confirmationToken",
	confirmed = "confirmed",
	blocked = "blocked",
	teacherFor = "teacherFor",
	paths = "paths",
	courses = "courses",
	pathInstances = "pathInstances",
	pathInstanceRefs = "pathInstanceRefs",
	firstName = "firstName",
	lastName = "lastName",
	status = "status",
	id = "id",
}

export enum CourseAttributes {
	title = "title",
	course_instances = "course_instances",
	path = "path",
	id = "id",
}

export enum CourseInstanceAttributes {
	course = "course",
	path_instance = "path_instance",
	title = "title",
	description = "description",
	dateFrom = "dateFrom",
	dateTo = "dateTo",
	lessons = "lessons",
	quizzes = "quizzes",
	id = "id",
}

export enum PathAttributes {
	title = "title",
	description = "description",
	courses = "courses",
	teacher = "teacher",
	students = "students",
	path_instances = "path_instances",
	id = "id",
}

export enum PathInstanceAttributes {
	path = "path",
	title = "title",
	description = "description",
	dateFrom = "dateFrom",
	dateTo = "dateTo",
	teacher = "teacher",
	numberOfStudents = "numberOfStudents",
	numberOfRegisteredStudents = "numberOfRegisteredStudents",
	stillOpen = "stillOpen",
	course_instances = "course_instances",
	students = "students",
	id = "id",
}

export enum LessonAttributes {
	title = "title",
	description = "description",
	date = "date",
	questions = "questions",
	student_activities = "student_activities",
}

export enum StudentLessonAttributes {
	student = "student",
	done = "done",
	mark = "mark",
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
	student_quizzes = "student_quizzes",
}

export enum StudentQuizAttributes {
	student = "student",
	date = "date",
	mark = "mark",
}

export enum CourseResultAttributes {
	course = "course",
	course_instance = "course_instance",
	path = "path",
	mark = "mark",
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
	pathInstanceRefs: PathInstance[];
	firstName: string;
	lastName: string;
	status: string;
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
	path_instance: PathInstance;
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
	numberOfRegisteredStudents: number;
	stillOpen: boolean;
	course_instances: CourseInstance[];
	students: User[];
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

