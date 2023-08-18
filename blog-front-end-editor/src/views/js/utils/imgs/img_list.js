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
        let row = $('<div class="row"></div>')
        let img = $('<img class="img-thumbnail" src="'+images[i].src+'" alt="'+images[i].metadata.alt+'">')
        let name = $('<div class="name">'+images[i].name+'</div>')
        let size = $('<div class="size">'+(images[i].metadata.size/1024).toFixed(2)+'KB</div>')
        let type = $('<div class="type">'+images[i].metadata.type+'</div>')
        let width = $('<div class="width">'+images[i].metadata.width+'px</div>')
        let height = $('<div class="height">'+images[i].metadata.height+'px</div>')
        let date = $('<div class="date">'+images[i].metadata.createdAt.toLocaleDateString()+'</div>')
        let time = $('<div class="time">'+images[i].metadata.createdAt.toLocaleTimeString()+'</div>')
        let rowColor = i % 2 == 0 ? 'row-even' : 'row-odd'
        row.addClass(rowColor)
        row.append(img)
        row.append(name)
        row.append(size)
        row.append(type)
        row.append(width)
        row.append(height)
        row.append(date)
        row.append(time)
        container.append(row)
    }
}

populateListView()