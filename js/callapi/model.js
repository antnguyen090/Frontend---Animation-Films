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

funcNameCategory = (paramCategory) =>{
  let nameCategoryFilm = '';
  switch (paramCategory){
    case "vietnam": nameCategoryFilm = 'Hoạt Hình Việt Nam';
                       break; 
    case "donghua": nameCategoryFilm = 'Hoạt Hình Trung Quốc';
                       break; 
    case "anime": nameCategoryFilm = 'Hoạt Hình Nhật Bản';
                       break; 
    case "cartoon": nameCategoryFilm = 'Hoạt Hình Âu Mỹ';
                       break; 
  }
  return nameCategoryFilm
}

filmsInCategoryList = (name) => {
  let listFilms = [];
  switch (name){
    case "vietnam": listFilms= [102,103];
                       break; 
    case "donghua": listFilms= [104,106];
                       break; 
    case "anime": listFilms= [107,108];
                       break; 
    case "cartoon": listFilms= [109,110];
                       break;
    default: nameCategoryFilm = "";
  }
  return listFilms;
}

getFilmStatistics = () => {
  let items = listItems('getFilmStatistics')
  console.log(items)
  if(items.length === 0) {
  $.getJSON(API_PREFIX + "playlists?offset=0&sortBy=id&sort_dir=asc&type=film-cartoon", function (data) {
    $.each(data, function (key, val) {
          $.getJSON(API_PREFIX + `playlists/${val.id}/videos`, function (data) {
              $.each(data, function (key, val) {
                let strJSON = val.statistics.replace(/"\"/g,"")
                let statisticsJson = JSON.parse(strJSON);
                taskView = {id: val.id, viewCount: parseInt(statisticsJson.viewCount),likeCount:parseInt(statisticsJson.likeCount), commentCount: parseInt(statisticsJson.commentCount)}
                items.push(taskView);
                saveStorage('getFilmStatistics', items);
              })
          });
})
})}
}

getFilmBestView = (number) => {
  let items = listItems('getFilmStatistics');
  items.sort((a, b) => b.viewCount -a.viewCount)
  return items.slice(0,number)
}

getFilmBestTrend = (number) => {
  let items = listItems('getFilmStatistics');
  items.sort((a, b) => b.commentCount -a.commentCount)
  return items.slice(0,number)
}
getFilmBestLike = (number) => {
  let items = listItems('getFilmStatistics');
  items.sort((a, b) => b.likeCount -a.likeCount)
  return items.slice(0,number)
}







