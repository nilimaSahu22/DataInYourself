export function generateCourseSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function findCourseBySlug(slug: string, courses: any[]) {
  return courses.find(course => generateCourseSlug(course.title) === slug.toLowerCase());
} 