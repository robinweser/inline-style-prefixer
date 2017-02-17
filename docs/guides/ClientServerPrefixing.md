# Client / Server Prefixing

The most important requirement often is to be able to render universally, thus both on server and client. Both the dynamic and the static version are capable of universal rendering.

## Static Prefixing
If you're using the static prefixer, you won't have any issues with universal rendering at all, as it works seamlessly on both sides.

## Dynamic Prefixing
With the dynamic version, on the other hand, we have to do some additional steps to be able to prefix correctly on the server-side as well.<br>
The problem is, that on the client-side it uses the `navigator.userAgent` to detect the required vendor prefixes. But, on server-side, we do not have the `navigator.userAgent` set at all. Still we can get the `userAgent` from the request. Check the following server-side example:

```javascript
import express from 'express'
import Prefixer from 'inline-style-prefixer'

const server = express()

server.get('/', (req, res) => {
  const reqUserAgent = req.headers['user-agent']

  const prefixer = new Prefixer({
    userAgent: reqUserAgent
  })

  // do anything with the prefixer
})
```
