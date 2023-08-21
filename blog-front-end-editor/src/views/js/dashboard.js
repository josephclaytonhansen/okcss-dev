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
    name_edit.addEventListener('keypress', (e)=>{
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
        if(e.key === 'Escape' || e.key === 'Esc' || e.key === 'Spacebar' || e.key === ' '){
            e.preventDefault()
            name_edit.contentEditable = false
        }
    })
})

$('#new-post').on('click', ()=>{
    window.location.href = '/new/post'
})

$('#new-page').on('click', ()=>{
    window.location.href = '/new/page'
})