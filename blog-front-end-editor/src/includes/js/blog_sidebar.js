
$('#history').on('click', function() {
    $('#editor-grid').css('pointer-events', 'none')
    $('#history-modal').removeClass('hidden')
    $('#editor-grid').css('opacity', '0')
})


$('#delete-history').on('click', function() {
    let url = new URL(window.location.href)
    // find 'post/' in url
    let postIndex = url.href.indexOf('post/')
    // find the id of the post
    let postId = url.href.slice(postIndex + 5)
    $.ajax({

        
        url: '/post/delete_history/'+postId,
        method: 'GET',
        success: function(data) {
            console.log(data)
            window.location.reload()
        },
    })
    })
