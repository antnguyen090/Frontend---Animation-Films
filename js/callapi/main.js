$( document ).ready(function() {
    $(".slicknav_nav .slicknav_parent:last-child ul").attr('id', 'api-area-category-news-slicknav')
    showListCategory();
    showItemsCategory();
    showGoldPrice();
    showCoinPrice();
    showArticleViewed();
    showArticleDetail();
    showArticleNew();
    showArticleLove();
    changeTitle();
    showFilmLove();
    setTimeout(filmView, 500)
    showSearch();
});


