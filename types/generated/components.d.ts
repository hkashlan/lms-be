import type { Schema, Attribute } from '@strapi/strapi';

export interface CourseStructureLesson extends Schema.Component {
  collectionName: 'components_course_structure_lessons';
  info: {
    displayName: 'lesson';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.RichText;
    pageNumber: Attribute.Integer;
    toPageNumber: Attribute.Integer;
    audio: Attribute.Media;
    date: Attribute.DateTime & Attribute.Required;
    questions: Attribute.Component<'exam-structure.question', true>;
    student_activities: Attribute.Component<
      'course-structure.student-lesson',
      true
    >;
  };
}

export interface CourseStructureStudentLesson extends Schema.Component {
  collectionName: 'components_course_structure_student_lessons';
  info: {
    displayName: 'student-lesson';
    description: '';
  };
  attributes: {
    student: Attribute.Relation<
      'course-structure.student-lesson',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    done: Attribute.Boolean;
    mark: Attribute.Integer;
    answeredOptions: Attribute.JSON;
  };
}

export interface ExamStructureAnswer extends Schema.Component {
  collectionName: 'components_exam_structure_answers';
  info: {
    displayName: 'answer';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    correct: Attribute.Boolean;
  };
}

export interface ExamStructureQuestion extends Schema.Component {
  collectionName: 'components_exam_structure_questions';
  info: {
    displayName: 'question';
    description: '';
  };
  attributes: {
    questionType: Attribute.Enumeration<['SingleChoice', 'MultiChoice']> &
      Attribute.Required &
      Attribute.DefaultTo<'SingleChoice'>;
    title: Attribute.String & Attribute.Required;
    answers: Attribute.Component<'exam-structure.answer', true> &
      Attribute.Required;
    mark: Attribute.Integer & Attribute.DefaultTo<1>;
  };
}

export interface ExamStructureQuiz extends Schema.Component {
  collectionName: 'components_exam_structure_quizzes';
  info: {
    displayName: 'quiz';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    dateFrom: Attribute.DateTime & Attribute.Required;
    dateTo: Attribute.DateTime & Attribute.Required;
    mark: Attribute.Integer;
    questions: Attribute.Component<'exam-structure.question', true> &
      Attribute.Required;
    student_quizzes: Attribute.Component<'exam-structure.student-quiz', true>;
  };
}

export interface ExamStructureStudentQuiz extends Schema.Component {
  collectionName: 'components_exam_structure_student_quizs';
  info: {
    displayName: 'student-quiz';
    description: '';
  };
  attributes: {
    student: Attribute.Relation<
      'exam-structure.student-quiz',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    date: Attribute.DateTime & Attribute.Required;
    mark: Attribute.Integer & Attribute.Required;
    fullMark: Attribute.Integer & Attribute.Required;
    answeredOptions: Attribute.JSON;
  };
}

export interface StudentInfoCourseResult extends Schema.Component {
  collectionName: 'components_student_info_course_results';
  info: {
    displayName: 'course-result';
  };
  attributes: {
    course: Attribute.Relation<
      'student-info.course-result',
      'oneToOne',
      'api::course.course'
    >;
    course_instance: Attribute.Relation<
      'student-info.course-result',
      'oneToOne',
      'api::course-instance.course-instance'
    >;
    path: Attribute.Relation<
      'student-info.course-result',
      'oneToOne',
      'api::path.path'
    >;
    mark: Attribute.Integer;
  };
}

export interface StudentInfoPathResult extends Schema.Component {
  collectionName: 'components_student_info_path_results';
  info: {
    displayName: 'path-result';
  };
  attributes: {
    path: Attribute.Relation<
      'student-info.path-result',
      'oneToOne',
      'api::path.path'
    >;
    path_instance: Attribute.Relation<
      'student-info.path-result',
      'oneToOne',
      'api::path-instance.path-instance'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'course-structure.lesson': CourseStructureLesson;
      'course-structure.student-lesson': CourseStructureStudentLesson;
      'exam-structure.answer': ExamStructureAnswer;
      'exam-structure.question': ExamStructureQuestion;
      'exam-structure.quiz': ExamStructureQuiz;
      'exam-structure.student-quiz': ExamStructureStudentQuiz;
      'student-info.course-result': StudentInfoCourseResult;
      'student-info.path-result': StudentInfoPathResult;
    }
  }
}
