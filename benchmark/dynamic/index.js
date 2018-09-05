import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'
import { dynamic205, dynamic300, dynamic301, dynamic302 } from './cases'

export const run = () => {
  console.log('Running dynamic test.')

  const testSuite = new Suite()

  testSuite.add('2.0.5', () => dynamic205())
  testSuite.add('3.0.0', () => dynamic300())
  testSuite.add('3.0.1', () => dynamic301())
  testSuite.add('3.0.2', () => dynamic301())

  testSuite.on('cycle', (e) => {
    beautifyBenchmark.add(e.target)
  })

  testSuite.on('complete', function () {
    beautifyBenchmark.log()
    console.log(`Fastest is: ${this.filter('fastest').map('name')}\n`)

    console.log(
      `Improvement: ${Math.round(this[this.length - 1].hz / this[this.length - 2].hz * 100) /
        100}x faster`
    )
  })

  return testSuite.run({ async: true })
}

run()
