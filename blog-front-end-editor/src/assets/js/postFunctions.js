function savePostCallback(post_id, content){
    console.log(content)
    alert(content)
    $.ajax({
        method: 'GET',
        url: '/post/update_history/' + post_id,
        success: () => {
        },
        error: (err) => {
        }
    })
}

export {savePostCallback}