loadStorage = (name) => {
    return JSON.parse(localStorage.getItem(name)) ;
}

saveStorage = (name, items) => {
    localStorage.setItem(name, JSON.stringify(items));
}
        
// let items = [       // dữ liệu ảo mock data
//     {id: makeid(5) , name: 'Coding', level: 'medium'},
//     {id: makeid(5) , name: 'Sleep', level: 'small'},
// ];
// saveStorage(items);

listItems = (name) => {
    let items = loadStorage(name) ;
    if(items === null) items = [];  // 
    return items;
}


deleteItem = (id) => {
  let items = listItems();  // [ {id,name,level}, {id,name,level}, {id,name,level}]
  items = items.filter(item => item.id !== id);
  saveStorage(items);
  // xoá công việc trong items có id = id được truyền vào
  return items;
}

addItemArticleViewed = (id, title, thumb, link) => {
    let taskNew = {id: id, title: title, thumb: thumb, link: link};
    let items = listItems('ARTICLE_VIEWED');
    items.push(taskNew);
    let uniqueValues = new Set(items.map(v => v.id));
      if (uniqueValues.size < items.length) {
        return;
      } else{
        items = (items.length>5) ? items.slice(1) : items;
        // Lưu item vào storgare
        saveStorage('ARTICLE_VIEWED',items);
      }
}

addItemLove = (id, title, thumb, link, description,category, local) => {
  let taskNew = {id: id, title: title, thumb: thumb, link: link, description: description, category: category};
  let items = listItems(local);
  items.push(taskNew);
  // Lưu item vào storgare
  saveStorage(local,items);
}



nameCategoryFilm = (number) => {
  let category = "";
  console.log("test+"+number)
  if (number==102 || number==103){
    category = "Việt Nam"
  } else if ((number==104 || number==106)){
    category = "Trung Quốc"
  } else if ((number==107 || number==108)){
    category = "Nhật Bản"
  } else {
    category = "Âu Mỹ"
  }
  console.log("category+"+category)
  return category;
}



  function getAllVideo() {
          let items = listItems('AllVideo');
          if (items.length !== 0) return items;
          let data = $.getJSON( API_PREFIX + "playlists?offset=0&sortBy=id&sort_dir=asc&type=film-cartoon", function() {
          })
            .done(function() {
            })
            .fail(function() {
            })
            .always(function() {
            });
            data.always(function(data) {
              $.each(data, function (key, val) {
                let dataDetail = $.getJSON(API_PREFIX + `playlists/${val.id}/videos`, function () {
                })
                .done(function() {
                })
                .fail(function() {
                })
                .always(function() {
                });
                dataDetail.always(function(data) {
                  $.each(data, function (key, val) {
                    let strJSON = val.statistics.replace(/"\"/g,"")
                    let statisticsJson = JSON.parse(strJSON);
                    let strJSONImg = val.thumbnail.replace(/"\"/g,"")
                    let thumbnailJson = JSON.parse(strJSONImg);
                    thumbLink = thumbnailJson.medium.url
                    taskView = {id: val.id, playlist_id: val.playlist_id, published_at: val.published_at, title: val.title, thumbnail: thumbLink, iframe: val.iframe, description: val.description, viewCount: parseInt(statisticsJson.viewCount),likeCount:parseInt(statisticsJson.likeCount), commentCount: parseInt(statisticsJson.commentCount)}
                    items.push(taskView);
                    saveStorage('AllVideo', items)
                  })
                });
            })
            });
    
    return items;
}

var allVideos =  getAllVideo()


getFilmBestView = (number) =>{
  allVideos.sort((a, b) => b.viewCount -a.viewCount)
  return allVideos.slice(0,number)
}

getFilmBestTrend = (number) => {
  allVideos.sort((a, b) => b.commentCount -a.commentCount)
  return allVideos.slice(0,number)
}
getFilmBestLike = (number) => {
  allVideos.sort((a, b) => b.likeCount -a.likeCount)
  return allVideos.slice(0,number)
}

getFilmNewDate = (number) => {
  allVideos.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
  return allVideos.slice(0,number)
}

getFilmSuggest = (number=4) => {
  let items = [];
  for (let i=0; i < number; i++){
  var item = allVideos[Math.floor(Math.random() * allVideos.length)];
  items.push(item);
  }
  return items
}

addItemFilmViewed = (data) => {
  let items = listItems('VIDEO_VIEWED');
  
  items.push(data);
  let uniqueValues = new Set(items.map(v => v.id));
    if (uniqueValues.size < items.length) {
      return;
    } else{
      // Lưu item vào storgare
      saveStorage('VIDEO_VIEWED',items);
    }
}

addFilmLove = (id) => {
  let items = listItems('VIDEO_LOVE');
  let item = {id: id}
  items.push(item);
  saveStorage('VIDEO_LOVE',items);
}





