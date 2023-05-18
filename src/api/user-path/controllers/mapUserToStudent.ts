import { Lesson, Quiz, User } from "../../../schema";
import { BFF } from "../../../schema-bff";

export function arrPercentage<T>(arr: T[], predicate: (value: T) => boolean) {
  return arr?.filter(predicate).length * 100 || 0 / arr?.length || 1;
}

export function mapQuizzesToBffQuizzes(
  quizzes: Quiz[],
  id: number
): BFF.Quiz[] {
  return quizzes?.map((q) => {
    const quizStudent = q.student_quizzes.find((s) => s.student.id === id);
    return {
      dateFrom: q.dateFrom,
      dateTo: q.dateTo,
      doneOnDate: quizStudent?.date,
      title: q.title,
      questions: q.questions,
      mark: quizStudent?.mark,
    };
  });
}

export function mapLessonsToBffLessons(
  lessons: Lesson[],
  userId: number
): BFF.Lesson[] {
  return lessons?.map((l, index) => {
    const studentLesson = l.student_activities.find(
      (s) => s.student.id === userId
    ) ?? { done: false, mark: undefined };
    return {
      lessonId: index,
      title: l.title,
      description: l.description,
      present: studentLesson.done,
      done: studentLesson.done,
      pageNumber: l.pageNumber,
      toPageNumber: l.toPageNumber,
      date: l.date,
      mark: studentLesson.mark,
      questions: l.questions,
    };
  });
}

export function mapUserToStudent(user: User): BFF.myPaths.Student {
  const student: BFF.myPaths.Student = {
    title: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    lastTitle: "",
    image: "",
    paths: user.pathInstances.map(
      (f) =>
        ({
          id: f.path.id,
          title: f.path.title,
          description: f.path.description,
          progress: arrPercentage(
            user.courses,
            (c) => c.path.id === f.path.id && !!c.mark
          ),
          courses: user.courses.map((c) => ({
            id: c.course_instance.id,
            pathId: f.path.id,
            title: c.course_instance.title,
            description: c.course_instance.description,
            dateFrom: c.course_instance.dateFrom,
            dateTo: c.course_instance.dateTo,
            book: c.course_instance.book?.url,
            progress: arrPercentage(c.course_instance.lessons, (l) =>
              l.student_activities.some(
                (s) => s.student.id === user.id && s.done
              )
            ),
            lessons: mapLessonsToBffLessons(c.course_instance.lessons, user.id),
            quizzes: mapQuizzesToBffQuizzes(c.course_instance.quizzes, user.id),
          })),
        } as BFF.myPaths.Path)
    ),
  };
  return student;
}
