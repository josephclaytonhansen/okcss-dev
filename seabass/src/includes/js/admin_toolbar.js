import {
    savePostCallback,
    savePost,
    publishPost,
    unpublishPost
} from '/postFunctions.js'

$('#user-dropdown').on('click', (e) => {
    e.stopPropagation()
    showDropdown(e.target, "#user-dropdown", "#dropdown-close", ['Account settings', 'Log out'], ['/account', '/logout'], 2, 14, "account")
})

$('#dropdown-close').on('click', (e) => {
    e.stopPropagation()
    $('#dropdown-close').addClass('hidden')
    $('#user-dropdown').removeClass('hidden')
    $('.dropdown').remove()
})


function showDropdown(target, id, close_id, dropdown_items, dropdown_links, wa, ta, did) {
    //get target parent
    let target_parent = target.parentElement.parentElement
    let loc = target_parent.getBoundingClientRect()
    console.log(loc)
    $(id).addClass('hidden')
    $(close_id).removeClass('hidden')
    //create dropdown element (a div at the location)
    let dropdown = document.createElement('div')
    dropdown.classList.add('dropdown')
    dropdown.id = did
    dropdown.style.top = loc.bottom - ta + 'px'
    dropdown.style.left = loc.left - 2 + 'px'
    dropdown.style.width = loc.width + wa + 'px'
    dropdown.style.position = 'absolute'
    dropdown.style.zIndex = '800'
    dropdown.style.backgroundColor = '#404040'
    //add dropdown to the body
    document.body.appendChild(dropdown)
    //add dropdown items
    if (did == "account") {
        dropdown_items.forEach((item) => {
            let dropdown_item = document.createElement('div')
            dropdown_item.classList.add('dropdown-item')
            //add click event listener
            dropdown_item.addEventListener('click', (e) => {
                let link = dropdown_links[dropdown_items.indexOf(item)]
                if (link.startsWith('/')) {
                    document.location.href = link
                } else {
                    window[link]()
                }
            })
            dropdown_item.innerHTML = item
            dropdown.appendChild(dropdown_item)
        })
    } else {
        scheduleDropdown(dropdown)
    }
}

function scheduleDropdown(dropdown_body) {
    let d = dropdown_body
    let calendar = document.createElement('input')
    calendar.style.width = "100%"
    calendar.id = 'calendar'
    calendar.type = 'date'
    let submit = document.createElement('button')
    submit.id = 'submit'
    submit.onclick = (e) => {
        let scheduled_date = $('#calendar').val()
        let url = new URL(window.location.href)
        let post_index = url.href.indexOf('post/')
        let post_id = url.href.slice(post_index + 5)
        scheduled_date = new Date(scheduled_date)
        $.ajax({
            method: 'POST',
            url: '/post/update/' + post_id,
            data: {
                scheduled_date: scheduled_date,
                status: 'scheduled'
            },
            success: () => {
                $.ajax({
                    method: 'GET',
                    url: '/refresh-session',
                    success: () => {
                        window.location.reload()
                    }
                })
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    let s = $('#submit')
    s.on('click', (e) => {
        let scheduled_date = $('#calendar').val()
        let url = new URL(window.location.href)
        let post_index = url.href.indexOf('post/')
        let post_id = url.href.slice(post_index + 5)
        scheduled_date = new Date(scheduled_date)
        $.ajax({
            method: 'POST',
            url: '/post/update/' + post_id,
            data: {
                scheduled_date: scheduled_date,
                status: 'scheduled'
            },
            success: () => {
                $.ajax({
                    method: 'GET',
                    url: '/refresh-session',
                    success: () => {
                        window.location.reload()
                    }
                })
            },
            error: (err) => {
                console.log(err)
            }
        })
    })
    submit.innerHTML = 'Submit'
    submit.classList.add('ocean')
    submit.classList.add('fullwidth')
    d.appendChild(calendar)
    d.appendChild(submit)
}

$('#save').on('click', (e) => {
    savePost(sessionStorage.getItem('current-blog-data-raw'))
})

$('#publish').on('click', (e) => {
    publishPost()
})

$('#unpublish').on('click', (e) => {
    unpublishPost()
})

$('#schedule').on('click', (e) => {
    e.stopPropagation()
    if ($('#schedule-dropdown').length == 0) {
    showDropdown(e.target, "#schedule", "#schedule", [], [], 100, 0, "schedule-dropdown")}
    else {
        $('#schedule-dropdown').remove()
    }
})