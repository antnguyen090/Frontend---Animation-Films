funcDeleteTask = (id) => {
    let text = "DELETE!\nBạn chắc chắn muốn xoá công việc";
    if (confirm(text) == true) {
        let items = deleteItem(id);
        showItems(items);
    } 
}


funcArticleViewed = (id, title, thumb, link) => {
     let items = addItemArticleViewed(id, title, thumb, link);
    // Load lại danh sách
    showArticleViewed();
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

funcLove = (id, title, thumb, link, description, category, local ) => {
    let items = addItemLove(id, title, thumb, link,description, category, local);
    showItemsCategory();
    showArticleNew();
    showArticleLove();
   // Load lại danh sách
}

funcRemoveLove = (id, local) => {
    let items = listItems(local);
    items = $.grep(items, function(e){ 
        return e.id != id; 
   });
   saveStorage(local,items);
   showItemsCategory();
   showArticleNew();
   showArticleLove();
   showItemsCategory();
}

funcFilmViewed = (id, title, thumb, link) => {
    let items = addItemArticleViewed(id, title, thumb, link);
   // Load lại danh sách
   showFilmViewed();
}