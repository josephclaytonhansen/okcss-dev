function savePost(content){
    let url = new URL(window.location.href)
    let post_index = url.href.indexOf('post/')
    let post_id = url.href.slice(post_index + 5)

    let title = $('#blog-title').val()
    let slug = $('#blog-slug').val()
    let metaTitle = $('#blog-meta-title').val()
    let metaDescription = $('#blog-meta-description').val()
    let metaKeywords = $('#blog-meta-keywords').val()
    let status = $('#blog-status').val()
    let categories = $('#blog-categories').val()
    let tags = $('#blog-tags').val()
    let author = $('#blog-author').val()
    //TODO: featured image
    let featuredImage = ''
    //TODO: scheduled date
    let scheduledDate = ''

    $.ajax({
        url: '/post/update/' + post_id,
        type: 'POST',
        data: {
            post_id: post_id,
            title: title,
            slug: slug,
            metaTitle: metaTitle,
            metaDescription: metaDescription,
            metaKeywords: metaKeywords,
            status: status,
            categories: categories,
            tags: tags,
            author: author,
            content: content,
            featuredImage: featuredImage,
            scheduledDate: scheduledDate
        },
        success: () => savePostCallback(post_id, content),
        error: function (err) {
            console.log(err)}
    })

}

function savePostCallback(post_id, content){
    let current_text = $('#history-count').text().split(' ')
    let current_count = parseInt(current_text[1]) + 1
    $('#history-count').text(current_text[0] +" "+ current_count+" "+current_text[2])
    $.ajax({
        method: 'GET',
        url: '/post/update_history/' + post_id,
        success: () => {
            $.ajax({
                method: 'GET',
                url: '/refresh-session',
                success: () => {
                    window.location.reload()
                }})
        },
        error: (err) => {
        }
    })

}

function publishPost(post=null){
    let post_id = post? post : $('#post-id-hidden').text()

    $.ajax({
        method: 'GET',
        url: '/post/publish/' + post_id,
        success: () => {
            $.ajax({
                method: 'GET',
                url: '/refresh-session',
                success: () => {
                    $.ajax({
                        method: 'GET',
                        url: '/post/publish/' + post_id}),
                        window.location.reload()
                }
            })
            
        },
        error: (err) => {
            console.log(err)
        }
    })
}

function schedulePost(post=null, scheduled_date=null){
    let post_id = post? post : $('#post-id-hidden').text()
    let scheduled_date = scheduled_date

    $.ajax({
        method: 'POST',
        url: '/post/schedule/' + post_id,
        data: {
            scheduled_date: scheduled_date
        },
        success: () => {
            $.ajax({
                method: 'GET',
                url: '/refresh-session',
                success: () => {
                    $.ajax({
                        method: 'POST',
                        url: '/post/schedule/' + post_id,
                        data: {
                            scheduled_date: scheduled_date
                        }}),
                        window.location.reload()
                }
            })
            
        },
        error: (err) => {
            console.log(err)
        }
    })
}

function unpublishPost(post=null){
    let post_id = post? post : $('#post-id-hidden').text()
    $.ajax({
        method: 'GET',
        url: '/post/unpublish/' + post_id,
        success: () => {
            $.ajax({
                method: 'GET',
                url: '/refresh-session',
                success: () => {
                    $.ajax({
                        method: 'GET',
                        url: '/post/unpublish/' + post_id}),
                        window.location.reload()
                }
            })
            
        },
        error: (err) => {
            console.log(err)
        }
    })
}

export {savePostCallback, savePost, publishPost, unpublishPost, schedulePost}