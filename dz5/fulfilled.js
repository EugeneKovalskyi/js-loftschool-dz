// Task 1:
function addListener(eventName, target, fn) {
  target.addEventListener(eventName, fn)
}

// Task 2:
function removeListener(eventName, target, fn) {
  target.removeEventListener(eventName, fn)
}

// Task 3:
function skipDefault(eventName, target) {
  target.addEventListener(eventName, function(event) {
    event.preventDefault()
  })
}

// Task 4:
function emulateClick(target) {
  let event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'canceable': true
  })
  target.dispatchEvent(event)
}

// Task 5:
function delegate(target, fn) {
  target.addEventListener('click', function(event) {
    if (event.target.nodeName === 'BUTTON') {
      fn()
    }
  })
}

// Task 6:
function once(target, fn) {
  target.addEventListener('click', fn, {once: true})
}