$('.lightbox-modal-close').on('click', function () {
    $('.lightbox-modal').addClass('hidden')
    $('#editor-grid').css('pointer-events', 'auto')
})

let ll = 0
let rr = 1

function populateHistory(l = 0, r = 1) {
    let raw = $('#history-storage').text()
    raw = raw.split(',{"time')
    let i = -1
    raw.forEach(element => {
        i += 1
        if (!element.startsWith('{"time')) {
            raw[i] = '{"time' + element
        }
    })
    //sort raw by raw.time
    raw.sort(function (a, b) {
        let aTime = JSON.parse(a).time
        let bTime = JSON.parse(b).time
        return bTime - aTime
    })
    //get the most recent
    let mostRecent = raw[l]
    //get the second most recent
    let secondMostRecent = raw[r]

    let left_time = JSON.parse(secondMostRecent).time
    left_time = new Date(left_time)
    left_time = left_time.toLocaleDateString() + ' ' + left_time.toLocaleTimeString()

    let right_time = JSON.parse(mostRecent).time
    right_time = new Date(right_time)
    right_time = right_time.toLocaleDateString() + ' ' + right_time.toLocaleTimeString()


    $('#left-time').text(left_time)
    $('#right-time').text(right_time)

    let left_blocks = JSON.parse(secondMostRecent).blocks
    let right_string = ''
    let left_string = ''
    let right_blocks = JSON.parse(mostRecent).blocks

    right_blocks.forEach(element => {
        if (element.type == 'paragraph') {
            right_string += '<p>' + element.data.text + '</p>'
        } else if (element.type == 'header') {
            let level = element.data.level
            right_string += '<h' + level + '>' + element.data.text + '</h' + level + '>'
        } else {
            right_string += '<p>' + element.type + " - " + element.data.text + '</p>'
        }
    })

    left_blocks.forEach(element => {
        if (element.type == 'paragraph') {
            left_string += '<p>' + element.data.text + '</p>'
        } else if (element.type == 'header') {
            let level = element.data.level
            left_string += '<h' + level + '>' + element.data.text + '</h' + level + '>'
        } else {
            left_string += '<p>' + element.type + " - " + element.data.text + '</p>'
        }
    })

    $('#r-right').html(right_string)
    $('#r-left').html(left_string)
}

populateHistory(ll, rr)

$('#left-arrow').on('click', function () {
    try{
    let max_ll = $('#history-count').text().split(' ')[1]
    if (ll < max_ll) {
        $('#left-arrow').removeClass('disabled')
        ll += 1
        rr += 1
        populateHistory(ll, rr)
    }
    if (ll == max_ll) {
        $('#left-arrow').addClass('disabled')}
        $('#right-arrow').removeClass('disabled')}
    catch(err){
        $('#left-arrow').addClass('disabled')}
        $('#right-arrow').removeClass('disabled')
    })

$('#right-arrow').on('click', function () {
    try{
    if (rr > 0) {
        $('#right-arrow').removeClass('disabled')
        ll -= 1
        rr -= 1
        populateHistory(ll, rr)
    }
    if (rr == 0){
        $('#right-arrow').addClass('disabled')
        $('#left-arrow').removeClass('disabled')
    }} catch {
        $('#right-arrow').addClass('disabled')
        $('#left-arrow').removeClass('disabled')
    }
})