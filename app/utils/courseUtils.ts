export function generateCourseSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function findCourseBySlug(slug: string, courses: any[]) {
  return courses.find(course => generateCourseSlug(course.title) === slug.toLowerCase());
}

export function getCoursePdfPath(courseTitle: string): string {
  // Convert course title to lowercase and replace spaces with spaces for PDF naming
  const pdfName = courseTitle.toLowerCase();
  return `/media_assets/${pdfName}.pdf`;
}

export function getCourseImagePath(courseTitle: string): string {
  // Convert course title to lowercase and replace spaces with spaces for image naming
  const imageName = courseTitle.toLowerCase();
  return `/media_assets/${imageName}.png`;
} 