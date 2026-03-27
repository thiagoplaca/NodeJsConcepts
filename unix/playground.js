const { spawn } = require('node:child_process')
const { stdin, stdout, stderr } = require('node:process')

/* stdin.on('data', (data) => {
  console.log(`This is coming from Standard In: ${data.toString('utf-8')}`);
}) */

stdout.write('This is coming from standard out.\n')
stderr.write('This is coming from standard error.\n')

/* const subprocess = spawn('./script.sh')

subprocess.stdout.on('data', (data) => {
  console.log(data.toString('utf-8'));
})

subprocess.stderr.on('data', (data) => {
  console.log('From the shell script', data.toString('utf-8'));
}) */

/* subprocess.stdin.end() */



//console.log(process.env);

