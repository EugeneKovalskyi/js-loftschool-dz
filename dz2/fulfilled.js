// Task 1:
function forEach(array, fn) {

	for (let i = 0; i < array.length; i++) {
		fn(array[i], i, array)
	}
}

// Task 2:
function map(array, fn) {
	
	let newArray = []

	for (let i = 0; i < array.length; i++) {
		newArray.push(fn(array[i], i, array))
	}

	return newArray
}

// Task 3:
function reduce(array, fn, initial) {
	
	let i = 0

	let result = initial || array[0]
	let index = initial ? 0 : 1

	for (let i = index; i < array.length; i++) {
		result = fn(result, array[i], i, array)
	}

	return result
}

// Task 4:
function upperProps(obj) {

	let newArray = []

	for (let i = 0; i < Object.keys(obj).length; i++) {
		newArray.push(Object.keys(obj)[i].toUpperCase())
	}

	return newArray
}

// Task 5:
function slice(array, from, to) {
	
	let newArray = []

	if (to === undefined || to > array.length) to = array.length
	if (from < 0) from += array.length
	if (to < 0) to += array.length

	for (let i = from; i < to; i++) {
		newArray.push(array[i])
	}
	
	return newArray
} 

// Task 6:
function createProxy(obj) {
	return new Proxy(obj, {
		
		set(obj, prop, value) {
			value *= value
			obj[prop] = value
			return true
		}
	})
}