#!/usr/local/bin/node

let ignoreLines = false;
process.stdin.setEncoding('utf-8');

function write(line) {
  switch (line) {
    case '// docs-ignore-start':
      ignoreLines = true;
      break;

    case '// docs-ignore-end':
      ignoreLines = false;
      break;

    default:
      !ignoreLines && process.stdout.write(line + '\n');
  }
}

process.stdin.on('data', (data) => {
  data.split('\n').forEach(write);
});
