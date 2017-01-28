import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'
import { static300, static205 } from './cases'

export const run = () => {
  console.log('Running static test.')

  const testSuite = new Suite()

  testSuite.add('2.0.5', () => static205())
  testSuite.add('3.0.0', () => static300())

  testSuite.on('cycle', (e) => {
    beautifyBenchmark.add(e.target)
  })

  testSuite.on('complete', function () {
    beautifyBenchmark.log()
    console.log(`Fastest is: ${this.filter('fastest').map('name')}\n`)
    console.log(
      `Improvement: ${Math.round(this[1].hz / this[0].hz * 100) / 100}x faster`
    )
  })

  return testSuite.run({ async: true })
}

run()
