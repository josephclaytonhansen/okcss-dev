$('.lightbox-modal-close').on('click', function () {
    $('.lightbox-modal').addClass('hidden')
    $('#editor-grid').css('pointer-events', 'auto')
    $('#editor-grid').css('opacity', '1')
})

let ll = 0
let rr = 1
let mostRecent = null
let secondMostRecent = null
let left_time_d = null
let right_time_d = null

import {savePost} from './postFunctions.js'

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
    mostRecent = raw[l]
    //get the second most recent
    secondMostRecent = raw[r]

    let left_time = JSON.parse(secondMostRecent).time
    left_time_d = left_time
    left_time = new Date(left_time)
    left_time = left_time.toLocaleDateString() + ' ' + left_time.toLocaleTimeString()

    let right_time = JSON.parse(mostRecent).time
    let right_time_d = right_time
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

    let right_string_sanitized = right_string.replace(/href=".*?"/g, '')

    let left_string_sanitized = left_string.replace(/href=".*?"/g, '')

    remove_tags = ['canvas', 'svg', 'iframe', 'script', 'pre', 'code', 'form']
    remove_tags.forEach(element => {
        let regex = new RegExp('<' + element + '.*?(\/>|<\/' + element + '>)', 'gi')
        right_string_sanitized = right_string_sanitized.replace(regex, '')
        left_string_sanitized = left_string_sanitized.replace(regex, '')
    })

    $('#r-right').html(right_string_sanitized)
    $('#r-left').html(left_string_sanitized)
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

$('#restore-right').on('click', function () {
        let right_time = JSON.stringify(right_time_d)
        
        mostRecent = JSON.parse(mostRecent)
        mostRecent.time = right_time
        mostRecent = JSON.stringify(mostRecent)
        savePost(mostRecent)
        window.location.reload()
})

$('#restore-left').on('click', function () {
    let left_time = JSON.stringify(left_time_d)
    //change the time of secondMostRecent to left_time
    secondMostRecent = JSON.parse(secondMostRecent)
    secondMostRecent.time = left_time
    secondMostRecent = JSON.stringify(secondMostRecent)
    savePost(secondMostRecent)
    window.location.reload()
})