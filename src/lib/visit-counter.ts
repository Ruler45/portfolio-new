import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const storagePath = path.join(process.cwd(), "data", "visit-count.json");

async function readStoredCount(): Promise<number> {
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