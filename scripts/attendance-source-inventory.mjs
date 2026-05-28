import { readFileSync } from 'node:fs';

const htmlPath = '/Users/youngjinshin/Downloads/_ Design (1).html';
const html = readFileSync(htmlPath, 'utf8');
const templateMatch = html.match(
  /<script type="__bundler\/template">([\s\S]*?)<\/script>/,
);

if (!templateMatch) {
  throw new Error(`Could not find bundled template in ${htmlPath}`);
}

const template = JSON.parse(templateMatch[1]);
const appStart = template.indexOf('function App');

if (appStart === -1) {
  throw new Error('Could not find function App in bundled template');
}

const appEnd = template.indexOf('function ProposalCard');
const appSource = template.slice(appStart, appEnd === -1 ? undefined : appEnd);
const artboards = [...appSource.matchAll(/<DCArtboard\s+([^>]*)>/g)].map(
  ([, attrs]) => {
    const label = attrs.match(/label="([^"]+)"/)?.[1] ?? 'unlabelled';
    const width = Number(attrs.match(/width=\{?(\d+)/)?.[1] ?? 0);
    const height = Number(attrs.match(/height=\{?(\d+)/)?.[1] ?? 0);

    return { label, width, height };
  },
);

console.log(JSON.stringify({ count: artboards.length, artboards }, null, 2));
