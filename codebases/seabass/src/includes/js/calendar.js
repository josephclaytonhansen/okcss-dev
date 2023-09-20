let list = $('.upcoming ul')
let listItems = list.children('li')

interpolateColors('rgb(107, 176, 206)', 'rgb(255, 255, 255)', listItems.length).forEach((color, i) => {
    listItems.eq(i).css('background-color', color)
})

function buildCalendar(){
    let date = new Date()
    let month = date.getMonth()
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',  'November', 'December']
    let year = date.getFullYear()
    let firstDay = (new Date(year, month)).getDay()
    let daysInMonth = 32 - new Date(year, month, 32).getDate()
    let calendar = document.getElementById('calendar-body')
    let monthAndYear = document.getElementById('month-and-year')
    let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let daysOfWeekRow = document.getElementById('days-of-week')
    calendar.innerHTML = ''
    monthAndYear.innerHTML = months[month] + ' ' + year
    let dateCounter = 1

    for (let i = 0; i < 6; i++){
        let row = document.createElement('tr')
        row.setAttribute('class', 'calendar-week-row')

        for (let j = 0; j < 7; j++){
            if (i === 0 && j < firstDay){
                let cell = document.createElement('td')
                let cellText = document.createTextNode('')
                cell.appendChild(cellText)
                row.appendChild(cell)
            } else if (dateCounter > daysInMonth){
                break
            } else {
                let cell = document.createElement('td')
                cell.setAttribute('class', 'calendar-day')
                let cellText = document.createTextNode(dateCounter)
                cell.appendChild(cellText)
                row.appendChild(cell)
                dateCounter++
            }
        }

        calendar.appendChild(row)
    }
}

function fixCalendar(){
    let calendar = document.getElementById('calendar-body')
    //get .calendar-week-row elements and pad the last one with empty cells if it has less than 7
    let rows = calendar.getElementsByClassName('calendar-week-row')
    let lastRow = rows[rows.length - 2]
    let cells = lastRow.getElementsByTagName('td')
    let emptyCells = 7 - cells.length
    for (let i = 0; i < emptyCells; i++){
        let cell = document.createElement('td')
        let cellText = document.createTextNode('')
        cell.appendChild(cellText)
        lastRow.appendChild(cell)
    }
    //add a days of week row above the first row
    let daysOfWeekRow = document.createElement('tr')
    daysOfWeekRow.setAttribute('class', 'calendar-week-row')
    daysOfWeekRow.setAttribute('id', 'days-of-week')
    let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    for (let i = 0; i < 7; i++){
        let cell = document.createElement('td')
        let cellText = document.createTextNode(daysOfWeek[i])
        cell.appendChild(cellText)
        daysOfWeekRow.appendChild(cell)
    }
    calendar.insertBefore(daysOfWeekRow, rows[0])

    console.log('Calendar fixed')
    }

function setScheduleDays(){
    //get all elements with the class of upcoming-schedule using jquery
    let scheduleDays = $('.upcoming-schedule')
    //loop through each element
    scheduleDays.each(function(){
        //get first p element
        let firstP = $(this).children('p').eq(0)
        //get the text of the first p element
        let firstPText = firstP.text()
        //this is in format Sep 1st, 5:24 pm
        //get the month and day
        let month = firstPText.split(' ')[0]
        let current_month = new Date().toLocaleString('default', {month: 'short'})
        let day = firstPText.split(' ')[1]
        //remove non-numbers from day
        day = day.replace(/\D/g, '')
        $('.calendar-day').filter(function(){
            return $(this).text() === day && current_month === month
        }).addClass('active-calendar-day')
    })
}


//on document ready
$(document).ready(function(){
let toggle = $('#dashboard-schedule')
let calendar = $('#calendar-container')
console.log(toggle)
toggle.on('click', function(){
    console.log('clicked')
    calendar.toggleClass('hidden')
})})


buildCalendar()
fixCalendar()
setScheduleDays()