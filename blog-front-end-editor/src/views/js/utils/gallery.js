let images = []

function populateGallery(){
    let g = $('.gallery')
    //for now, use a static array of images
    for(let i = 0; i < 20; i++){
        images.push({"name":"image"+i.toString()+".png","src":"https://images.unsplash.com/photo-1691405660688-adf0c37c6b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80", metadata:{"createdAt":new Date(), "updatedAt":new Date(), "size":1024, "type":"image/png", "width":625, "height":938}})
    }

    images.forEach((image)=>{
        let d = $('<div>')
        d.addClass('img-container')
        d.css('max-width', '6.3vw')
        d.css('min-width', '50px')
        let i = $('<img>')
        i.on('click', ()=>{
            lightboxModal(image)
        })
        i.addClass('square rounded gallery-img')
        i.attr('src', image['src'])
        d.append(i)
        g.append(d)
        console.log(g,d,i)
    })
}

populateGallery()

function lightboxModal(image){
    let modal = $('<div>')
    modal.addClass('lightbox-modal')
    let img = $('<img>')
    img.addClass('lightbox-img')
    img.attr('src', image['src'])
    modal.append(img)
    $('body').append(modal)
    modal.on('click', ()=>{
        modal.remove()
    })
}

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