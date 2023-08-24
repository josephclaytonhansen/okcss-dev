import {savePostCallback, savePost} from '/postFunctions.js'

$('#user-dropdown').on('click', (e) => {
    e.stopPropagation()
    showDropdown(e.target)
})

$('#dropdown-close').on('click', (e) => {
    e.stopPropagation()
    $('#dropdown-close').addClass('hidden')
    $('#user-dropdown').removeClass('hidden')
    $('.dropdown').remove()
})


function showDropdown(target){
    //get target parent
    let target_parent = target.parentElement.parentElement
    let loc = target_parent.getBoundingClientRect()
    console.log(loc)
    $('#user-dropdown').addClass('hidden')
    $('#dropdown-close').removeClass('hidden')
    //create dropdown element (a div at the location)
    let dropdown = document.createElement('div')
    dropdown.classList.add('dropdown')
    dropdown.style.top = loc.bottom - 14 + 'px'
    dropdown.style.left = loc.left - 2 + 'px'
    dropdown.style.width = loc.width + 2 + 'px'
    dropdown.style.position = 'absolute'
    dropdown.style.zIndex = '800'
    dropdown.style.backgroundColor = '#404040'
    //add dropdown to the body
    document.body.appendChild(dropdown)
    //add dropdown items
    let dropdown_items = ['Account settings', 'Log out']
    let dropdown_links = ['/account', '/logout']
    dropdown_items.forEach((item) => {
        let dropdown_item = document.createElement('div')
        dropdown_item.classList.add('dropdown-item')
        //add click event listener
        dropdown_item.addEventListener('click', (e) => {
            link = dropdown_links[dropdown_items.indexOf(item)]
            document.location.href = link
        })
        dropdown_item.innerHTML = item
        dropdown.appendChild(dropdown_item)
    })
}

$('#save').on('click', (e) => {
    savePost(sessionStorage.getItem('current-blog-data-raw'))
})