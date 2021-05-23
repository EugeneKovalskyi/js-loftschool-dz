const leftList = document.querySelector('.left-list')
const rightList = document.querySelector('.right-list')
const leftSearch = document.querySelector('.left-search')
const rightSearch = document.querySelector('.right-search')

let currentDrag = {
  item: null,
  list: null,
}

window.addEventListener('load', loadHandler)
document.addEventListener('click', clickHandler)
document.addEventListener('dragstart', dragstartHandler)
document.addEventListener('dragover', dragoverHandler)
document.addEventListener('drop', dropHandler)
leftSearch.addEventListener('input', searchHandler)
rightSearch.addEventListener('input', searchHandler)

function loadHandler() {
  if (localStorage.length) {
    leftList.insertAdjacentHTML(
      'beforeend',
      localStorage.getItem(leftList.dataset.list)
    )

    rightList.insertAdjacentHTML(
      'beforeend',
      localStorage.getItem(rightList.dataset.list)
    )

    checkOverflowY(leftList)
    checkOverflowY(rightList)
  } else {
    const getFriends = async () => {
      try {
        const friendsArray = await fetch('someUrl.json').then((response) =>
          response.json()
        )

        friendsArray.forEach((friend) => {
          addFriendToList(friend)
        })

        checkOverflowY(leftList)
        checkOverflowY(rightList)
      } catch (error) {
        console.error(error)
      }
    }

    getFriends()
  }
}

function addFriendToList(friend) {
  const li = document.createElement('li')
  const span = document.createElement('span')
  const addBtn = document.createElement('button')
  const removeBtn = document.createElement('button')

  li.setAttribute('draggable', 'true')
  span.classList.add('name')
  addBtn.classList.add('btn', 'add-btn')
  removeBtn.classList.add('btn', 'remove-btn')

  span.textContent = friend.name
  addBtn.textContent = '+'
  removeBtn.textContent = 'x'
  removeBtn.style.display = 'none'

  li.append(span)
  li.append(addBtn)
  li.append(removeBtn)
  leftList.append(li)
}

// check css property 'overflow'
function checkOverflowY(list) {
  list.querySelectorAll('li').length > 6
    ? (list.style.overflowY = 'scroll')
    : (list.style.overflowY = 'hidden')
}

function clickHandler(event) {
  // add-btn
  if (event.target.classList.contains('add-btn')) {
    const li = event.target.closest('li')
    const addBtn = li.querySelector('.add-btn')
    const removeBtn = li.querySelector('.remove-btn')

    addBtn.style.display = 'none'
    removeBtn.style.display = 'block'
    rightList.append(li)

    checkOverflowY(leftList)
    checkOverflowY(rightList)
  }

  // remove-btn
  if (event.target.classList.contains('remove-btn')) {
    const li = event.target.closest('li')
    const addBtn = li.querySelector('.add-btn')
    const removeBtn = li.querySelector('.remove-btn')

    removeBtn.style.display = 'none'
    addBtn.style.display = 'block'
    leftList.append(li)

    checkOverflowY(leftList)
    checkOverflowY(rightList)
  }

  // save-btn
  if (event.target.classList.contains('save-btn')) {
    localStorage.setItem(leftList.dataset.list, leftList.innerHTML)
    localStorage.setItem(rightList.dataset.list, rightList.innerHTML)
  }
}

function dragstartHandler(event) {
  if (event.target.tagName === 'LI') {
    currentDrag.item = event.target
    currentDrag.list = event.target.closest('.drop-list')
  }
}

function dragoverHandler(event) {
  if (currentDrag.list) {
    event.preventDefault()
  }
}

function dropHandler(event) {
  const dropTargetList = event.target.closest('.drop-list')

  if (dropTargetList && dropTargetList !== currentDrag.list) {
    dropTargetList.append(currentDrag.item)
    const addBtn = currentDrag.item.querySelector('.add-btn')
    const removeBtn = currentDrag.item.querySelector('.remove-btn')

    addBtn.style.display = addBtn.style.display === 'none' ? 'block' : 'none'
    removeBtn.style.display =
      removeBtn.style.display === 'none' ? 'block' : 'none'

    checkOverflowY(rightList)
    checkOverflowY(leftList)
  }
}

function searchHandler(event) {
  const currentList = document.querySelector(
    `.${event.target.dataset.list}-list`
  )
  const spanArray = currentList.querySelectorAll('.name')

  spanArray.forEach((span) => {
    span.textContent.toLowerCase().includes(event.target.value.toLowerCase())
      ? (span.closest('li').style.display = 'block')
      : (span.closest('li').style.display = 'none')
  })
}
