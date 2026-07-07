import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const devPs1 = path.join(projectRoot, "scripts", "dev.ps1");
const args = ["dev", "--webpack", "-p", "3000", ...process.argv.slice(2)];

function hasNonAscii(value) {
  return /[^\u0000-\u007F]/.test(value);
}

function runNextDev(cwd) {
  return spawnSync(process.execPath, [nextBin, ...args], {
    cwd,
    stdio: "inherit",
    env: process.env,
  });
}

function runWindowsPowerShellDev() {
  return spawnSync(
    "powershell",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", devPs1],
    {
      cwd: projectRoot,
      stdio: "inherit",
      env: process.env,
    },
  );
}

const result =
  process.platform === "win32" && hasNonAscii(projectRoot)
    ? runWindowsPowerShellDev()
    : runNextDev(projectRoot);

process.exit(result.status ?? 1);
