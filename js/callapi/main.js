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
    showBoxNewsSlider();
    showPlaylistCategory();
    changeTitle();
    showSearchFilm();
    showSearchNews();
    funcStatusMenuTabShow('STATUS-MENU-TAB-SEARCH');
    funcStatusMenuTabShow('STATUS-MENU-TAB-LOVE');
    setTimeout(filmView, 1200)
});



