import { Suite } from 'benchmark';
import beautifyBenchmark from 'beautify-benchmark';
import { oldStatic, newStatic } from './cases';

export const run = () => {
    console.log('Running static test.');

    const jssSuite = new Suite();

    jssSuite.add('newStatic', () => newStatic());
    jssSuite.add('oldStatic', () => oldStatic());

    jssSuite.on('cycle', (e) => {
        beautifyBenchmark.add(e.target);
    });

    jssSuite.on('complete', function() {
        beautifyBenchmark.log();
        console.log(`Fastest is: ${this.filter('fastest').map('name')}\n`);
        console.log('Improvement: ' + (Math.round(this[0].hz / this[1].hz * 100)/100) + 'x faster');
    });

    return jssSuite.run({ async: true });
};

run();
