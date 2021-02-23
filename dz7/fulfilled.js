// Контейнер
const container = document.querySelector('#container');
// Текстовое поле для фильтрации cookie
const filterNameInput = container.querySelector('#filter-name-input');
// Текстовое поле с именем cookie
const addNameInput = container.querySelector('#add-name-input');
// Текстовое поле со значением cookie
const addValueInput = container.querySelector('#add-value-input');
// Кнопка "добавить cookie"
const addButton = container.querySelector('#add-button');
// Таблица со списком cookie
const listTable = container.querySelector('#list-table tbody');

window.onload = () => {
	const cookieObj = document.cookie.split('; ').reduce((prev, curr) => {
		let [name, value] = curr.split('=')
		prev[name] = value
		return prev
	}, {})

	if (document.cookie) {
		for (let key in cookieObj) {
			addCookieIntoTable(key, cookieObj[key])
		}
	}
}

// Listener on filters input
filterNameInput.addEventListener('keyup', function() {
	
	const filterValue = filterNameInput.value
	const trArray = listTable.querySelectorAll('tr')
	const nameTdArray = listTable.querySelectorAll('.name')
	const valueTdArray = listTable.querySelectorAll('.value')

	for (let i = 0; i < trArray.length; i++) {
		
		if (filterValue === '' 
			|| nameTdArray[i].textContent.includes(filterValue) 
			|| valueTdArray[i].textContent.includes(filterValue)
			) 
		{			
			trArray[i].style.display = 'table-row'
		} else {
			trArray[i].style.display = 'none'
		}
	}

});
// Listener on delete-button
addButton.addEventListener('click', () => {

	const filterValue = filterNameInput.value
	const name = addNameInput.value
	const value = addValueInput.value
	const nameTdArray = listTable.querySelectorAll('.name')
	const valueTdArray = listTable.querySelectorAll('.value')
	
	let existName = false

	if (name !== '' && value !== '') {

		for (let i = 0; i < nameTdArray.length; i++) {
			// If cookies name, added to the browser, exist and don`t consist with filter
			if (filterValue !== '') {

				// If cookie, added to the browser, don`t consist with filter
				if (filterValue !== name || filterValue !== name) {
					// Then add cookie only into browser
					document.cookie = `${name}=${value}`
					existName = true
					break
				
				} else if (name === nameTdArray[i].textContent && value !== filterValue) {
					// Then add cookie into browser
					document.cookie = `${name}=${value}`
					// And remove from table
					nameTdArray[i].closest('tr').remove()
					break
				} 

			} else if (name === nameTdArray[i].textContent) {
				// Change cookies value in table
				valueTdArray[i].textContent = value
				// Change cookies value in browser
				document.cookie = `${name}=${value}`
				existName = true
				break
			}
		}

		if (!existName) {
			addCookieIntoTable(name, value)
			// Add cookie into browser
			document.cookie = `${name}=${value}`
		}

		addNameInput.value = ''
		addValueInput.value = ''
	}
})

function addCookieIntoTable(name, value) {
	// Add cookie into table
	listTable.insertAdjacentHTML('beforeend', `
		<tr>
		<td class="name">${name}</td>
		<td class="value">${value}</td>
		<td><button class="delete">Delete</button></td>
		</tr>
		`)
	// Add delete-action for delete-button
	listTable.addEventListener('click', (event) => {
		// Name and value cookies that must be deleted
		const cookieName = event.target.closest('tr').querySelector('.name').textContent
		const cookieValue = event.target.closest('tr').querySelector('.value').textContent
		
		if (event.target.classList.contains('delete')) {
			document.cookie = `${cookieName}=${cookieValue}; max-age=0;`
			event.target.closest('tr').remove()
		}
	})
}
