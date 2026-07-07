import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const buildPs1 = path.join(projectRoot, "scripts", "build.ps1");
const args = ["build", "--webpack", ...process.argv.slice(2)];

function hasNonAscii(value) {
  return /[^\u0000-\u007F]/.test(value);
}

function runNextBuild(cwd) {
  return spawnSync(process.execPath, [nextBin, ...args], {
    cwd,
    stdio: "inherit",
    env: process.env,
  });
}

function runWindowsPowerShellBuild() {
  return spawnSync(
    "powershell",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", buildPs1],
    {
      cwd: projectRoot,
      stdio: "inherit",
      env: process.env,
    },
  );
}

const result =
  process.platform === "win32" && hasNonAscii(projectRoot)
    ? runWindowsPowerShellBuild()
    : runNextBuild(projectRoot);

process.exit(result.status ?? 1);
