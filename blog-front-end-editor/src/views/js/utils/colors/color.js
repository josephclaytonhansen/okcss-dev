function interpolateColors(colorA, colorB, stops){
    let colorArray = []
    let colorAArray = colorA.replace(/[^\d,]/g, '').split(',')
    let colorBArray = colorB.replace(/[^\d,]/g, '').split(',')
    let step = 1 / (stops - 1)
    let fraction = 0

    for (let i = 0; i < stops; i++){
        colorArray.push('rgb(' + Math.round(parseInt(colorAArray[0]) + fraction * (parseInt(colorBArray[0]) - parseInt(colorAArray[0]))) + ', ' + Math.round(parseInt(colorAArray[1]) + fraction * (parseInt(colorBArray[1]) - parseInt(colorAArray[1]))) + ', ' + Math.round(parseInt(colorAArray[2]) + fraction * (parseInt(colorBArray[2]) - parseInt(colorAArray[2]))) + ')')
        fraction += step
    }

    return colorArray.reverse()
}