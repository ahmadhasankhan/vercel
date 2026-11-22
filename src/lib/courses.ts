import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const COURSES_DIR = path.join(process.cwd(), "src/content/learn");

export type LessonInfo = {
  slug: string;
  title: string;
  description: string;
  free: boolean;
  order: number;
  available: boolean; // false = listed in the curriculum but not written yet
  duration?: number;
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  level: string;
  outcomes: string[];
  lessons: LessonInfo[];
};

export function getCourseSlugs(): string[] {
  if (!fs.existsSync(COURSES_DIR)) return [];
  return fs
    .readdirSync(COURSES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(COURSES_DIR, d.name, "course.json")))
    .map((d) => d.name);
}

export function getCourse(slug: string): Course | null {
  const dir = path.join(COURSES_DIR, slug);
  const metaPath = path.join(dir, "course.json");
  if (!fs.existsSync(metaPath)) return null;
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  const lessons: LessonInfo[] = (meta.lessons as Omit<LessonInfo, "order" | "available">[]).map((l, i) => {
    const file = path.join(dir, `${l.slug}.mdx`);
    const available = fs.existsSync(file);
    const duration = available ? Number(matter(fs.readFileSync(file, "utf-8")).data.duration) || undefined : undefined;
    return { ...l, free: Boolean(l.free), order: i + 1, available, duration };
  });
  return { slug, title: meta.title, description: meta.description, level: meta.level, outcomes: meta.outcomes ?? [], lessons };
}

export function getAllCourses(): Course[] {
  return getCourseSlugs().map((s) => getCourse(s)).filter((c): c is Course => !!c);
}

export function readLesson(courseSlug: string, lessonSlug: string) {
  const file = path.join(COURSES_DIR, courseSlug, `${lessonSlug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { content, data } = matter(fs.readFileSync(file, "utf-8"));
  return { content, data };
}
