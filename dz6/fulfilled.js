// Task 1:
function delayPromise(seconds) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, seconds * 1000)
	})
}

// Task 2:
function loadAndSortTowns() {
	return new Promise((resolve, reject) => {
		
		let xhr = new XMLHttpRequest()
		
		xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
		
		xhr.onprogress = function(event) {
			let percentComplete = event.loaded / event.total * 100
			console.log('Comleted %s%', percentComplete)
		}
		
		xhr.onload 	= function() {
			
			if (xhr.status !== 200) {
				console.error(`Error : ${xhr.status} : ${xhr.statusText}`)
			} else {
				
				let towns = JSON.parse(xhr.response)
				
				towns.sort(function(a, b) {
					if (a.name > b.name) return 1
					if (a.name < b.name) return -1
					return 0
					})
				
				resolve(towns)
			}
		}
		
		xhr.onerror = function() {
			console.log('Request failed!')
		}
		
		xhr.send()
	})
}