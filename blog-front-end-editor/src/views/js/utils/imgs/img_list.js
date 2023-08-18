images = []

function populateListView(){
    let l = $('.list-view')
    //for now, use a static array of images
    for(let i = 0; i < 20; i++){
        images.push({"name":"image"+i.toString()+".png","src":"https://images.unsplash.com/photo-1691405660688-adf0c37c6b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80", metadata:{"createdAt":new Date(), "updatedAt":new Date(), "size":1024, "type":"image/png", "width":625, "height":938, "alt": "alt text"}})
    }
    images.push({"name":"wide.png", "src":'https://images.unsplash.com/photo-1533282960533-51328aa49826?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2142&q=80', metadata:{"createdAt":new Date(), "updatedAt":new Date(), "size":1024, "type":"image/png", "width":1364, "height":513, "alt": "alt text"}})
    images.push({"name":"square.png", "src":"https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80", metadata:{"createdAt":new Date(), "updatedAt":new Date(), "size":1024, "type":"image/png", "width":880, "height":880, "alt": "alt text"}})
    images = images.reverse()

    let container = $('.list-view .list')
    for(let i = 0; i < images.length; i++){
        let row = $('<div class="img-list-row"></div>')
        let img_container = $('<div class="img-container"></div>')
        let img = $('<img class="img-thumbnail square" src="'+images[i].src+'" alt="'+images[i].metadata.alt+'">')
        img_container.append(img)
        img.on('click', ()=>{
            lightboxModal(images[i])
        })
        let name = $('<div id="name">'+images[i].name+'</div>')
        let slug = $('<div id="slug'+'-'+i.toString()+'" class="slug">Copy slug</div>')

        let type = $('<div id="type">'+images[i].metadata.type+'</div>')
        let dimensions = $('<div id="dimensions">'+images[i].metadata.width+'x'+images[i].metadata.height+'</div>')
        let date = $('<div id="date">'+images[i].metadata.createdAt.toLocaleDateString()+'</div>')
        let rowColor = i % 2 == 0 ? 'row-even' : 'row-odd'
        row.addClass(rowColor)
        row.append(img_container)
        row.append(name)
        row.append(slug)
        row.append(type)
        row.append(dimensions)
        row.append(date)
        container.append(row)

        let slugs = document.getElementsByClassName('slug')
        slugs = Array.from(slugs)
        slugs.forEach((slug)=>{
            slug.addEventListener('click', (e)=>{
                let count = parseInt(slug.id.split('-')[1])
                let s = images[count].src
                navigator.clipboard.writeText(s)
                slug.innerHTML = 'Copied!'
                setTimeout(()=>{
                    slug.innerHTML = 'Copy slug'
                }, 1000)
            })
        })


    }
}

populateListView()