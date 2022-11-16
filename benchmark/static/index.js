import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'
import { static700, static302, static301, static300, static205 } from './cases'

export const run = () => {
  console.log('Running static test.')

  const testSuite = new Suite()

  testSuite.add('2.0.5', () => static205())
  testSuite.add('3.0.0', () => static300())
  testSuite.add('3.0.1', () => static301())
  testSuite.add('3.0.2', () => static302())
  testSuite.add('7.0.0', () => static700())

  testSuite.on('cycle', (e) => {
    beautifyBenchmark.add(e.target)
  })

  testSuite.on('complete', function () {
    beautifyBenchmark.log()
    console.log(`Fastest is: ${this.filter('fastest').map('name')}\n`)

    console.log(
      `Improvement: ${
        Math.round(
          (this[this.length - 1].hz / this[this.length - 2].hz) * 100
        ) / 100
      }x faster`
    )
  })

  return testSuite.run({ async: true })
}

run()
