Simple use case implemented with different strategies.

### Usecase

1. Connect to a MongoDB instance
2. Issue a query
3. Apply a transformation to each document
4. Print the results or an error message
5. Close the connection

### Strategies

- use Node callbacks
- use Async's `auto` function
- use Highland streams
- use Highland stream started on a promise
- use Bluebird's Promises
- use Babel's async/await with Bluebird Coroutines

### Running

```
> npm run with-(callbacks|auto|highland|highland-and-promise|promises|async-await)
```
