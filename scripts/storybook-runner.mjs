import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const storybookBin = join(
  projectRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'storybook.cmd' : 'storybook',
);
const args = process.argv.slice(2);
const command = args[0];
const hasConfigDir = args.some((arg) => arg === '-c' || arg === '--config-dir');
const hasOutputDir = args.some((arg) => arg === '-o' || arg === '--output-dir');
const finalArgs = [...args];

// Running from /tmp prevents esbuild from picking up a parent ~/.pnp.cjs file.
if (!hasConfigDir) {
  finalArgs.push('--config-dir', join(projectRoot, '.storybook'));
}

if (command === 'build' && !hasOutputDir) {
  finalArgs.push('--output-dir', join(projectRoot, 'storybook-static'));
}

const child = spawn(storybookBin, finalArgs, {
  cwd: tmpdir(),
  env: {
    ...process.env,
    INIT_CWD: projectRoot,
  },
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
