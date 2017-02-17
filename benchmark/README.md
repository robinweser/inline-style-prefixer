# CSS-in-js Performance tests

Testing a couple of CSS in JS libraries, check [the source folder](./src/cases) for the different tests.

And read why we did these tests [here](https://engineering.hellofresh.com/the-css-in-js-battle-89c34a7a83ea).

## Usage

You can clone this repository, `npm install` and run `npm run bench` to run the tests yourself.

To set the amount of iterations you can set an environment variable called `ITERATIONS`. This will result in: `ITERATIONS=100 npm run bench`.

## Specs

The specs from the machine on which the tests were run:

```
$ node -v
v6.3.0

$ /usr/sbin/system_profiler SPHardwareDataType
Hardware:

    Hardware Overview:

      Model Name: MacBook Pro
      Model Identifier: MacBookPro12,1
      Processor Name: Intel Core i7
      Processor Speed: 3,1 GHz
      Number of Processors: 1
      Total Number of Cores: 2
      L2 Cache (per Core): 256 KB
      L3 Cache: 4 MB
      Memory: 16 GB
```

## Results

The first test is just a simple render test, generate 2 class names, one for a container and one for a button.

```
Running simple test.

aphrodite length 470
jss length 447
jss-without-preset length 443
glamor length 422
cxs length 400
cxs-optimized length 445
styletron length 366
fela length 364

  8 tests completed.

  aphrodite          x 12,093 ops/sec ±4.55% (80 runs sampled)
  jss                x 20,777 ops/sec ±7.63% (74 runs sampled)
  jss-without-preset x 36,694 ops/sec ±4.84% (70 runs sampled)
  glamor             x  9,033 ops/sec ±2.93% (77 runs sampled)
  cxs                x 22,077 ops/sec ±2.19% (83 runs sampled)
  cxs-optimized      x 15,822 ops/sec ±2.37% (71 runs sampled)
  styletron          x 69,996 ops/sec ±2.57% (75 runs sampled)
  fela               x 78,413 ops/sec ±2.26% (72 runs sampled)
  
Fastest is: fela
```

The second test overloads on styles, so it adds `n (ITERATIONS)` amount of different styles for the button.

```
Running styles overload test.

aphrodite length 2868
jss length 2783
jss-without-preset length 2745
glamor length 2572
cxs length 2296
cxs-optimized length 2337
styletron length 1370
fela length 1349

  8 tests completed.

  aphrodite          x  1,446 ops/sec ±2.55% (69 runs sampled)
  jss                x  3,160 ops/sec ±2.85% (75 runs sampled)
  jss-without-preset x  4,733 ops/sec ±2.15% (79 runs sampled)
  glamor             x  1,120 ops/sec ±2.48% (76 runs sampled)
  cxs                x  2,598 ops/sec ±2.88% (81 runs sampled)
  cxs-optimized      x  1,957 ops/sec ±2.92% (76 runs sampled)
  styletron          x 14,782 ops/sec ±2.18% (78 runs sampled)
  fela               x 14,934 ops/sec ±2.69% (76 runs sampled)

Fastest is: fela,styletron
```

The third test overloads on class names, so it adds `n (ITERATIONS)` amount of different class names with the same styles. This test is interesting to see which library actually merges these styles when they're similar.

```
Running classes overload test.

aphrodite length 2318
jss length 2359
jss-without-preset length 2359
glamor length 1209
cxs length 1217
cxs-optimized length 1217
styletron length 960
fela length 939

  8 tests completed.

  aphrodite          x  2,020 ops/sec ±8.99% (70 runs sampled)
  jss                x  3,275 ops/sec ±12.37% (62 runs sampled)
  jss-without-preset x  5,447 ops/sec ±4.42% (68 runs sampled)
  glamor             x  6,247 ops/sec ±7.46% (58 runs sampled)
  cxs                x  4,057 ops/sec ±3.80% (69 runs sampled)
  cxs-optimized      x  3,400 ops/sec ±3.61% (77 runs sampled)
  styletron          x 31,248 ops/sec ±6.26% (72 runs sampled)
  fela               x 40,964 ops/sec ±3.62% (79 runs sampled)

Fastest is: fela
```

### Bundle sizes

```
Size styletron 2.652KB
Size cxs 9.766KB
Size fela 13.161KB
Size cxs-optimized 12.668KB
Size jss-without-preset 24.654KB
Size jss 37.04KB
Size glamor 35.436KB
Size aphrodite 18.919KB
```

<p align="center">
  <a href="https://hellofresh.com">
    <img width="120" src="https://www.hellofresh.de/images/hellofresh/press/HelloFresh_Logo.png">
  </a>
</p>
