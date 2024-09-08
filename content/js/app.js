let inputElem = document.querySelector('input')

let APIContent = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: 'aef5bd93ec5d2d099f3c1ec3d0ed21ba'
}

function fetchData() {
    let cityValue = inputElem.value
    fetch(`${APIContent.url}${cityValue}&appid=${APIContent.key}`)
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
        showData(data)
    })
    .catch( () => {
        alert("Error 404! city not found")
    })
}

function showData(data) {
    cityElem = document.querySelector('.city')
    cityElem.innerHTML = `${data.name}, ${data.sys.country}`

    showDate()

    mainTempElem = document.querySelector('.temp')
    mainTempElem.innerHTML = `${(data.main.temp -272.15).toFixed(1)}`

    weatherElem = document.querySelector('.weather')
    weatherElem.innerHTML = `${data.weather[0].main}`

    hiLoTempElem = document.querySelector('.hi-low')
    hiLoTempElem.innerHTML = `${(data.main.temp_min -272.15).toFixed(1)}°c / ${(data.main.temp_max -272.15).toFixed(1)}°c`

    weathericon = document.querySelector('.icon')
    
    let iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    let iconalt = data.weather[0].description
    weathericon.setAttribute("src",iconURL) 
    weathericon.setAttribute("alt",iconalt)
}

function showDate() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let now = new Date()
    dateElem = document.querySelector('.date')
    dateElem.innerHTML = `${days[(now.getDay())]} ${now.getDate()} ${months[(now.getMonth()-1)]} ${now.getFullYear()}`
}

inputElem.addEventListener('keypress', (event) => {
    if(event.keyCode === 13) {
        fetchData()
    }
})

