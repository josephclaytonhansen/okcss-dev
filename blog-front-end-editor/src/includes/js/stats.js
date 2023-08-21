let total_views = 0
let largest = 0
let bars = document.getElementsByClassName("bar")
//convert to array
bars = Array.from(bars)
bars.forEach(element => {
    total_views += parseInt(element.textContent)
    if (parseInt(element.textContent) > largest) {
        largest = parseInt(element.textContent)
    }
    console.log(total_views)
})

let labels = []
let count = -1

let colors = interpolateColors('rgb(49, 152, 196)', 'rgb(196, 111, 94)', bars.length)

bars.forEach(element => {
    count +=1 
    let percent = ((element.textContent/total_views)*100).toFixed(0)
    max_height = 280
    element.style.height = (max_height * (percent/100)) + 'px'
    element.style.minWidth = '1rem'
    let label = document.createElement('span')
    label.classList.add('label')
    labels.push(element.textContent)
    label.textContent = labels[count]
    element.textContent = ''
    element.appendChild(label)
    element.classList.remove('hidden')
    element.style.backgroundColor = colors[count]
})


