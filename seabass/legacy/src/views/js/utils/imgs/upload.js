$('#new-image').on('click', function () {
    $('.lightbox-modal').removeClass('hidden')
    $('.grid').css('pointer-events', 'none')
})

$('.lightbox-modal-close').on('click', function () {
    $('.lightbox-modal').addClass('hidden')
    $('.grid').css('pointer-events', 'auto')
})