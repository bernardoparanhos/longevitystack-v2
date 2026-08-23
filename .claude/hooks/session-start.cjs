// SessionStart hook: injects _docs/PROJECT.md into context at the start of
// every session in this project, so the "read PROJECT.md first" rule is
// enforced automatically instead of relying on Claude remembering to do it.
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..', '..');
const filePath = path.join(projectRoot, '_docs', 'PROJECT.md');

try {
  const content = fs.readFileSync(filePath, 'utf8');
  const output = {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext:
        'Session rule for this project (LongevityStack): _docs/PROJECT.md must be read before any other action. ' +
        'Its full content is included below so this is satisfied automatically.\n\n' +
        '--- _docs/PROJECT.md ---\n\n' +
        content,
    },
  };
  process.stdout.write(JSON.stringify(output));
} catch (err) {
  process.stdout.write(
    JSON.stringify({
      systemMessage: '_docs/PROJECT.md could not be read at session start: ' + err.message,
    })
  );
}
