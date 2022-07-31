funcDeleteTask = (id) => {
    let text = "DELETE!\nBạn chắc chắn muốn xoá công việc";
    if (confirm(text) == true) {
        let items = deleteItem(id);
        showItems(items);
    } 
}


funcArticleViewed = (id, title, thumb, link) => {
     let items = addItem(id, title, thumb, link);
    // Load lại danh sách
}

funcRemoveArticleViewd = (id) => {
    let items = listItems('ARTICLE_VIEWED');
    items = $.grep(items, function(e){ 
        return e.id != id; 
   });
   saveStorage('ARTICLE_VIEWED',items);
   elmArticleViewed.html("")
   showArticleViewed();
}


