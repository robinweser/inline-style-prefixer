import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'
import { dynamic205, dynamic300 } from './cases'

export const run = () => {
  console.log('Running dynamic test.')

  const testSuite = new Suite()

  testSuite.add('2.0.5', () => dynamic205())
  testSuite.add('3.0.0', () => dynamic300())

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
