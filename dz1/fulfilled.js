// Task 1:
function returnFirstArgument(arg) {
  return arg
}

// Task 2:
function sumWithDefaults(a, b = 100) {
  return a + b
}

// Task 3:
function returnFnResult(fn) {
  return fn()
}

// Task 4:
function returnCounter(number = 0) {
  return function() {
    return ++number
  }
}

// Task 5:
function returnArgumentsArray() {
  let array = [...arguments]
  return array
}

// Task 6:
function bindFunction(fn, ...args) {
  return function() {
    return fn.apply(this, args)
  }
}