// Контейнер
const container = document.querySelector('#container');
// Блок с надписью "Загрузка"
const loadingBlock = container.querySelector('#loading-block');
// Блок с текстовым полем и результатом поиска
const filterBlock = container.querySelector('#filter-block');
// Текстовое поле для поиска по городам
const filterInput = container.querySelector('#filter-input');
// Блок с результатом поиска
const filterResult = container.querySelector('#filter-result');

// Разрешенный Promise с результатом городов
let promise = loadTowns()

// Обработчик нажатия клавиши в текстовом поле
filterInput.addEventListener('keyup', function() {
	promise.then(towns => {
		// Добавление результата в соответствующий блок
		filterResult.textContent = isMatching(towns, filterInput.value).join(' ')
	})
});

// Функция возвращает Promise, который разрешен с массивом городов в качестве значения
function loadTowns() {
	return new Promise((resolve, reject) => {
		
		// Создание запроса
		let xhr = new XMLHttpRequest()
		
		// Инициализация запроса
		xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
		
		// Функция, которая выполняеться после выполнения запроса
		xhr.onload = function() {
			
			// Парсинг полученого результата
			let towns = JSON.parse(xhr.response)
			
			// После загрузки прячем блок с надписью "Загрузка"
			loadingBlock.style.display = 'none'
			// И показываем блок с строкой ввода
			filterBlock.style.display = 'block'
			
			// Успешно разрешаем Promise с отпарсеным результатом
			resolve(towns)
		}

		// Функция, которая выполняеться в случае ошибки
		xhr.onerror = function() {
			// Замена надписи "Загрузка"
			loadingBlock.textContent = 'Не удалось загрузить города!'
			loadingBlock.style.color = '#f00'
			loadingBlock.style.backgroundColor = '#000'

			// Добавляем в блок с надписью кнопку "Повторить"
			loadingBlock.insertAdjacentHTML('beforeend', `<br><button id="retry">Повторить</button>`)

			let retry = container.querySelector('#retry')
			// Добавляем обработчик на кнопку
			retry.addEventListener('click', function() {
				// При нажатии перезагрузить текущую страницу
				document.location.reload()
			})
		}

		// Отправляем запрос
		xhr.send()
	})
}

// Функция фильтрации и сортировки массива городов
function isMatching(full, chunk) {

	// Массив строк
	let filteredTowns = []
	// Отфильтрованный массив обьектов
	let filteredTownsObjects = full.filter((item) => {

		// Чтобы убрать учет регистра символов, приводим сравниваемые значения к одному регистру
		let upperCaseName = item.name.toUpperCase()
		let upperCaseChunk = chunk.toUpperCase()

		// Возвращает true для строк, содержащих введенный текст
		return upperCaseName.includes(upperCaseChunk)
	})

	// Добавляем в массив отфильтрованные строки
	filteredTownsObjects.forEach(item => filteredTowns.push(item.name))

	// Сортируем и возвращаем отфильтрованный массив
	return filteredTowns.sort(function(prev, next) {
		if (prev < next) return -1
		if (prev > next) return 1
		return 0
	})
}