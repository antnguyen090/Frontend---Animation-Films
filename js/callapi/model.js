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

addItem = (id, title, thumb, link) => {
    let taskNew = {id: id, title: title, thumb: thumb, link: link};
    let items = listItems('ARTICLE_VIEWED');
    items.push(taskNew);
    console.log("item leng"+items.length)
    let uniqueValues = new Set(items.map(v => v.id));
      if (uniqueValues.size < items.length) {
        return;
      } else{
        items = (items.length>5) ? items.slice(1) : items;
        // Lưu item vào storgare
        saveStorage('ARTICLE_VIEWED',items);
      }
}

