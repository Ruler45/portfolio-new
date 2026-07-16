import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const storagePath = path.join(process.cwd(), "data", "visit-count.json");

// Check if we're running in a production environment where file system is read-only
const isProduction = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

async function readStoredCount(): Promise<number> {
  // Skip file operations in production environments
  if (isProduction) {
    return 0;
  }

  try {
    const file = await readFile(storagePath, "utf8");
    const parsed = JSON.parse(file) as { count?: unknown };

    return typeof parsed.count === "number" && Number.isFinite(parsed.count) ? parsed.count : 0;
  } catch {
    return 0;
  }
}

export async function getVisitCount(): Promise<number> {
  return readStoredCount();
}

export async function incrementVisitCount(): Promise<number> {
  // Skip file operations in production environments
  if (isProduction) {
    return 0;
  }

  await mkdir(path.dirname(storagePath), { recursive: true });

  const nextCount = (await readStoredCount()) + 1;

  await writeFile(
    storagePath,
    JSON.stringify(
      {
        count: nextCount,
        updatedAt: new Date().toISOString()
      },
      null,
      2
    ),
    "utf8"
  );

  return nextCount;
}