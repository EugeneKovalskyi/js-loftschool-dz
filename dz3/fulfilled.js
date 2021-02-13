// Task 1:
 function isAllTrue(array, fn) {

   try {

    if (array.length === 0) {
      throw new Error('empty array')
    }

    if (!Array.isArray(array)) {
      throw new Error('empty array')
    }

    if (typeof fn !== 'function') {
      throw new Error('fn is not a function')
    }

    return array.every(fn)

  } catch (e) {
    console.log(e.name + ': ' + e.message)
  }
}

// Task 2:
function isSomeTrue(array, fn) {

  try {

    if (!(array.length && Array.isArray(array))) {
      throw new Error('Array is empty')
    
    } else if (typeof fn !== 'function') {
      throw new Error('fn is not a function')
    }

    return array.some(fn)

  } catch (e) {
    console.log(e.name + ': ' + e.message)
  }
}

// Task 3:
function returnBadArguments(fn) {

  let errorsArray = []

  for (let i = 1; i < arguments.length; i++) {

    try {

      if (typeof fn !== 'function') {
        throw new Error('fn is not a function')
      }

      if (fn(arguments[i])) {
        throw new Error()
      }

    } catch(e) {
      errorsArray.push(arguments[i])
    }
  }

  return errorsArray
}

// Task 4:
function calculator(number = 0) {
  
  try {

    if (typeof number !== 'number') {
      throw new Error('number is not a number')
    }

  } catch(e) {
    console.log(e.name + ': ' + e.message)
  }
  
  let array = [...arguments]
  
  return {

    sum() {
      return array.reduce(function(prev, curr) {
        return prev + curr
      })
    },

    dif() {
      return array.reduce(function(prev, curr) {
        return prev - curr
      })
    },

    div() {
      return array.reduce(function(prev, curr) {
        try {

          if (curr === 0) {
            throw new Error('Division on 0')
          }

          return prev / curr

        } catch(e) {
          console.log(e.name + ': ' + e.message)
        }
      })
    },

    mul() {
      return array.reduce(function(prev, curr) {
        return prev * curr
      })
    }
  }
}