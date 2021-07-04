import { Main } from './Main';

// run
const arg = process.argv[2];
const main = new Main(arg ? +arg : 1);
main.run();
