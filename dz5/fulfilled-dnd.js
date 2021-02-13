const homeworkContainer = document.querySelector('#homework-container');

function createDiv() {
  let div = document.createElement('div')
  div.classList.add('draggable-div')

  div.style.position = 'absolute'
  div.style.zIndex   = 1000
  div.style.width    = Math.random() * 100 + 50 + 'px'
  div.style.height   = Math.random() * 100 + 50 + 'px'
  div.style.top      = Math.random() * 500 + 50 + 'px'
  div.style.bottom   = Math.random() * 500 + 50 + 'px'
  div.style.left     = Math.random() * 500 + 50 + 'px'
  div.style.right    = Math.random() * 500 + 50 + 'px'
  div.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
  
  return div
}

function addListeners(target) {
  target.addEventListener('mousedown', function(event) {

    moveAt(event.pageX, event.pageY)

    document.addEventListener('mousemove', mouseMove)

    target.addEventListener('mouseup', function() {
      document.removeEventListener('mousemove', mouseMove)
      target.removeEventListener('mouseup', null)
    })

    function mouseMove(event) {
      moveAt(event.pageX, event.pageY)
    }

    function moveAt(x, y) {
      target.style.left = x - event.offsetX + 'px'
      target.style.top = y - event.offsetY + 'px'
    }
  })

  target.addEventListener('dragstart', () => false)
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    const div = createDiv();

    homeworkContainer.appendChild(div);

    addListeners(div);
});