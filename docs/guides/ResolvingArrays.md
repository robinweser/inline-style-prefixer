# Resolving Array Values

Sometimes, vendor prefixed styles require multiple values for a single property. Technically, we can't have multiple values for a single key in a JavaScript object. That's why both prefixer use an array of values instead e.g.
```javascript
{
  display: [ '-webkit-flex', '-moz-flex', 'flex' ]
}
```

Yet, these arrays cannot be used as is. If you're using inline styles you need to resolve them. Many other CSS-in-JS solutions, might provide functionality to resolve them automatically, but it is not ensured.

Basically, we want to get single string out after all.<br>
The above example would be transformed to the following valid CSS string:

```javascript
{
  display: '-webkit-flex;display:-moz-flex;display:flex'
}
```

To achieve that, I recommend using [`resolveArrayValue(propety, value)`](https://github.com/rofrischmann/css-in-js-utils#resolvearrayvalueproperty-value) provided by [css-in-js-utils](https://github.com/rofrischmann/css-in-js-utils).

### Example
```javascript
import { resolveArrayValue } from 'css-in-js-utils'

const displayValue = [ '-webkit-flex', '-moz-flex', 'flex' ]

resolveArrayValue('display', displayValue)
// => '-webkit-flex;display:-moz-flex;display:flex'
```
