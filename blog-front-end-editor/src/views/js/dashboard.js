$('#current-task').text('Dashboard')

function listView(){
    $('.list-view').css('display', 'flex')
    $('.gallery').css('display', 'none')
    $('#gallery-view').removeClass('hidden')
    $('#list-view').addClass('hidden')
}

function galleryView(){
    $('.list-view').css('display', 'none')
    $('.gallery').css('display', 'flex')
    $('#gallery-view').addClass('hidden')
    $('#list-view').removeClass('hidden')
}

$('#gallery-view').on('click', ()=>{
    galleryView()
})

$('#list-view').on('click', ()=>{
    listView()
})

$('.cat-delete').on('click', (e)=>{
    let parent = e.target.parentElement
    let id = parent.id.split('-')[1]
    let url = `/category/delete/${id}`
    $.ajax({
        url: url,
        type: 'GET',
        success: function(result){
            location.reload()
        },
        error: function(err){
            console.log(err)
        }
    })
})

$('.cat-edit').on('click', (e)=>{
    let parent = e.target.parentElement
    let id = parent.id.split('-')[1]

    let grandparent = parent.parentElement.parentElement
    let name_edit = grandparent.children[0]
 
    name_edit.contentEditable = true
    name_edit.focus()
    name_edit.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter'){
            e.preventDefault()
            name_edit.contentEditable = false
            let url = `/category/id/${id}`
            let name = name_edit.innerText
            let sanitized = name.replace(/[^a-zA-Z0-9 ]/g, "")
            $.ajax({
                url: url,
                type: 'PUT',
                data: {
                    name: sanitized
                },
                success: function(result){
                    location.reload()
                },
                error: function(err){
                    console.log(err)
                }
            })
        }
        if(e.key === 'Escape' || e.key === 'Spacebar' || e.key === ' ' || e.keyCode === 27 || e.code === 'Escape'){
            name_edit.contentEditable = false
        }
    })
})

$('#new-cat').on('click', ()=>{
    let t = document.querySelector("body > div.grid > div.section.right > div.bottomright > div > div.c > section:nth-child(3) > div:nth-child(1)")
    let c = document.querySelector("body > div.grid > div.section.right > div.bottomright > div > div.c > section:nth-child(3)")
    //duplicate t and append it to c
    let clone = t.cloneNode(true)
    c.appendChild(clone)
    //make it editable
    let name_edit = clone.children[0]
    name_edit.textContent = 'untitled category'
    $.ajax({
        url: '/category',
        type: 'POST',
        data: {
            name: 'untitled category'
        },
        success: function(result){
            location.reload()
        },
        error: function(err){
            console.log(err)
        }
    })
})

$('#new-post').on('click', ()=>{
    window.location.href = '/new-post'
})

$('#new-page').on('click', ()=>{
    window.location.href = '/new-page'
})

$('#show-views').on('click', ()=>{
    $('#section-comments').addClass('hidden')
    $('#section-views').removeClass('hidden')
    $('#comments').addClass('hidden')
    $('#views').removeClass('hidden')
})

$('#show-comments').on('click', ()=>{
    $('#section-comments').removeClass('hidden')
    $('#section-views').addClass('hidden')
    $('#comments').removeClass('hidden')
    $('#views').addClass('hidden')
})

