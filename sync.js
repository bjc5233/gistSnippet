var chalk = require('chalk');
const gistService = require('./gistService');


// if (!process.argv[2]) {
//   console.log(chalk.gray('command line usage'));
//   console.log(chalk.cyan('  $ ') + 'sync fileName');
//   return;
// }
// var args = process.argv.splice(2);
// gistService.syncClip2Gist(args[0]);

console.log('===========================');
console.log(process.argv);
// gistService.syncClip2Gist();