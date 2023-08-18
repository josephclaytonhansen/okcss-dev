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