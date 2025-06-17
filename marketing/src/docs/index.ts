import fs from "node:fs";
import path from "node:path";

const DOC_ROOT = path.join(process.cwd(), "src", "docs");

export type DocKind = "terms" | "privacy";
export type VersionInfo = { version: string; filepath: string };

export function listVersions(kind: DocKind): VersionInfo[] {
  const dir = path.join(DOC_ROOT, kind);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({
      version: path.basename(f, ".md"), // 2025-06-17
      filepath: path.join(dir, f),
    }))
    .sort((a, b) => b.version.localeCompare(a.version)); // 新しい順
}

export function loadDoc(kind: DocKind, version?: string): string {
  const versions = listVersions(kind);
  const target = version
    ? versions.find((v) => v.version === version)
    : versions[0]; // 未指定なら最新版
  if (!target) throw new Error("Document not found");
  return fs.readFileSync(target.filepath, "utf8");
}
