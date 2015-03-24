Simple use case implemented with different strategies.

### Usecase

1. Connect to a MongoDB instance
2. Issue a query
3. Apply a transformation to each document
4. Print the results or an error message
5. Close the connection

### Strategies

- use Node callbacks
- use Async's `waterfall` function
- use Async's `auto` function
- use Highland streams
- use Bluebird Promises
- use Babel's async/await with Bluebird Coroutines
- use js-csp js implementation of Tony Hoar's CSP (Channel sequential processing)

### Running

```
> npm run with-(callbacks|waterfall|auto|highland|promises|async-await|csp)
```
