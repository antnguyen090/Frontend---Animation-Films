// lấy danh sách category
showListCategory = () => {
    $.getJSON(API_PREFIX + "categories_news", function (data) {
        let xhtml = '';
        $.each(data, function (key, val) {
            xhtml += `<li><a href="blog.html?id=${val.id}" role="menuitem" tabindex="0">${val.name}</a></li>`;
        });
        elmAreaCategoryNews.html(xhtml);
        $("#api-area-category-news-slicknav").html(xhtml);
        $(".slicknav_nav ul.row").removeClass("row-cols-5")
    });
}
//Lấy danh sách bài viết trong 1 category nào đó
showItemsCategory = () => {
    let paramID = $.urlParam('id')
    if (paramID === null) {
        $.getJSON(API_PREFIX + "articles", function (data) {
            let xhtml = '';
            xhtml = `
        <h2>Tin Tức</h2>
        <h6>Tổng hợp những bài báo mới nhất</h6>
        `
            elmNameCategory.html(xhtml)
            xhtml = '';
            $.each(data, function (key, val) {
                let description = val.description.replace(/'/g, '').replace(/"/g, '');   
                let title = val.title.replace(/'/g, '').replace(/"/g, '');   
                let statusHeart = `
                                 <a href="javascript:void(0);" onClick="funcLove('${val.id}','`+title+`','${val.thumb}','${val.link}','${description}','${val.category.name}','newsLove');"><span class="badge badge-danger font-weight-bold loveItems" data-type="news"><i class="fa-solid fa-heart" ></i></span></a>
                                `
                let loveNews = listItems('newsLove')
                let idNews = val.id;
                let day = val.publish_date.split(" ")[0].split("-")
                $.each(loveNews, function (key, val) {
                    if (val.id == idNews) {
                        statusHeart = `
                    <a href="javascript:void(0);" onClick="funcRemoveLove(${val.id},'newsLove');"><span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news"><i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích</span></a>
                 `
                    }
                })
                xhtml += `<div class="row text-light mb-4">
                <div class="col-sm-4 grid-margin">
                    <div class="position-relative">
                        <div class="rotate-img">
                        <a onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}"><img src="` + val.thumb + `" alt="thumb" class="img-fluid"></a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8 grid-margin">
                    <a onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}">
                        <h5 class="mb-2 font-weight-bold text-light text-justify">
                        `+ val.title + `
                        </h5>
                    </a>
                    <div class="fs-13 mb-3">
                       <a href="?id=${val.category_id}"> <span class="badge badge-primary font-weight-bold mr-2">`+ val.category.name + ` </span></a><i class="fa-solid fa-clock"></i> `+ day[2]+"-"+day[1]+"-"+day[0] + statusHeart + `
                    </div>
                    <p class="mb-0 text-light font-weight-light font-italic text-justify">
                    `+ val.description + `
                    </p>
                </div>
            </div>`;
            });
            elmAreaNewsItem.html(xhtml);
        });
    } else {
        $.getJSON(API_PREFIX + "categories_news/" + paramID + "/articles", function (data) {
            let xhtml = '';
            xhtml = `
                    <h2>${data[0].category.name}</h2>
                    <h6>Tổng hợp những bài báo mới nhất</h6>
                    `
            elmNameCategory.html(xhtml)
            xhtml = '';
            $.each(data, function (key, val) {
                let title = val.title.replace(/'/g, '').replace(/"/g, '');   
                let description = val.description.replace(/'/g, '').replace(/"/g, '');   
                let statusHeart = `
                <a href="javascript:void(0);" onClick="funcLove('${val.id}','`+title+`','${val.thumb}','${val.link}','${description}','${val.category.name}','newsLove');">
                <span class="badge badge-danger font-weight-bold loveItems" data-type="news">
                    <i class="fa-solid fa-heart"></i>
               </span>
           </a>               `
                let day = val.publish_date.split(" ")[0].split("-")
                let loveNews = listItems('newsLove')
                let idNews = val.id;
                $.each(loveNews, function (key, val) {
             if (val.id == idNews) {
                        statusHeart = `
                        <a href="javascript:void(0);" onClick="funcRemoveLove(${val.id},'newsLove');">
                             <span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news">
                                 <i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích
                            </span>
                        </a>`
                    }
                })
                xhtml += `<div class="row text-light mb-4">
                <div class="col-sm-4 grid-margin">
                    <div class="position-relative">
                        <div class="rotate-img">
                            <a onClick="funcArticleViewed('${val.id}','${val.title}','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}"><img src="` + val.thumb + `" alt="thumb" class="img-fluid"></a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8  grid-margin">
                    <a onClick="funcArticleViewed('${val.id}','${val.title}','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}">
                        <h5 class="mb-2 font-weight-bold text-light text-justify">
                        `+ val.title + `
                        </h5>
                    </a>
                    <div class="d-flex justify-content-between ">
                        <div class="times-news">
                              <p class="text-light"><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + `</p>
                        </div> 
                       `+ statusHeart + `
                    </div>
                    <p class="mb-0 text-light font-weight-light font-italic text-justify"> 
                    `+ val.description + `
                    </p>
                </div>
            </div>`;
            });
            elmAreaNewsItem.html(xhtml);
        });
    }
}
// call api gold

showGoldPrice = () => {
    $.getJSON(API_PREFIX + "get-gold", function (data) {
        let xhtm = "";
        $.each(data, function (key, val) {
            xhtm += `<tr>
                    <td class="font-weight-bold">`+ val.type + `</td>
                    <td>`+ val.buy + `</td>
                    <td>`+ val.sell + `</td>
                </tr>`
        })
        elmAreaGoldPrice.append(xhtm)
    });
}
//call api coin
showCoinPrice = () => {
    $.getJSON(API_PREFIX + "get-coin", function (data) {
        let xhtm = "";
        $.each(data, function (key, val) {
            colorPercent1h = (val.percent_change_1h < 0) ? "text-danger" : "text-success"
            colorPercent24h = (val.percent_change_24h < 0) ? "text-danger" : "text-success"
            xhtm += `<tr>
                    <td class="font-weight-bold">`+ val.name + `</td>
                    <td>`+ val.price.toFixed(2) + ` US$</td>
                    <td class="`+ colorPercent1h + `">` + val.percent_change_1h.toFixed(2) + ` %</td>
                    <td class="`+ colorPercent24h + `">` + val.percent_change_24h.toFixed(2) + ` %</td>
                </tr>`
        })
        elmAreaCoinPrice.append(xhtm)
    });
}
//show news viewed

showArticleViewed = () => {
    let items = listItems('ARTICLE_VIEWED');
    let xhtm = "";
    $.each(items, function (key, val) {
    let statusDelete = `<a href="javascript:void(0);" class="link" onClick="funcRemoveArticleViewd(${val.id});"><span class="badge badge-danger font-weight-bold loveItems text-light" data-type="movie"><i class="fa-solid fa-trash-can text-light" style="margin-right: 4px;"></i>Xóa</span></a>`
        xhtm += `<div class="product__sidebar__comment__item position-relative">
                    <div class="product__sidebar__comment__item__pic  ">
                        <img style="width:100px; height: 76px;"src="${val.thumb}" alt="news">
                    </div>
                    <div class="product__sidebar__comment__item__text ">
                            <h6 class="text-justify" style="height: 36px; overflow: hidden;">
                                <a class="text-light" href="blog-details.html?iddetail=${val.id}">${val.title}</a>
                            </h6>
                            ${statusDelete}
                    </div>
                </div>
        `
    });
    elmArticleViewed.html(xhtm)

}
//show news new index
showArticleNew = () => {
    let xhtm = "";
    $.getJSON(API_PREFIX + "articles", function (data) {
        $.each(data, function (key, val) {
            let title = val.title.replace(/'/g, '').replace(/"/g, '');   
            let description = val.description.replace(/'/g, '').replace(/"/g, '');   
            if (key == 5) return false;
            let idNews = val.id;
            xhtm += `<div class="product__sidebar__comment__item position-relative">
            <div class="product__sidebar__comment__item__pic  ">
                <img style="width:100px; height: 60px;"src="${val.thumb}" alt="news">
            </div>
            <div class="product__sidebar__comment__item__text ">
                    <h6 class="text-justify" style="height: 36px; overflow: hidden;">
                        <a class="text-light" onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}">${val.title}</a>
                    </h6>
            </div>
        </div>
        `
        });
        elmArticleNew.html(xhtm)
    })
}

showArticleDetail = () => {
    let paramID = $.urlParam('iddetail')
    let xhtml = '';
    if (paramID === null) {

    } else {
        $.getJSON(API_PREFIX + "articles/" + paramID, function (data) {
            let day = data.publish_date.split(" ")[0].split("-")
            xhtml = `<div class="row d-flex justify-content-center">
            <div class="col-lg-8">
                <div class="blog__details__title">
                    <h6>${data.category.name} </h6>
                    <h6><i class="fa-solid fa-clock"></i> ` + day[2]+"-"+day[1]+"-"+day[0] +`</h6>
                    <h2>${data.title}</h2>
                    <div class="blog__details__social">
                        <a href="#" class="facebook"><i class="fa fa-facebook-square"></i> Facebook</a>
                        <a href="#" class="pinterest"><i class="fa fa-pinterest"></i> Pinterest</a>
                        <a href="#" class="linkedin"><i class="fa fa-linkedin-square"></i> Linkedin</a>
                        <a href="#" class="twitter"><i class="fa fa-twitter-square"></i> Twitter</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="blog__details__pic">
                    <img src="${data.thumb}" alt="news">
                </div>
            </div>
            <div class="col-lg-12">
                <div class="blog__details__content">
                 ${data.content}
                </div>
            
            </div>`
            elmArticle.append(xhtml)
        });
    }
}

showArticleLove = () => {
    let items = listItems('newsLove')
    let xhtml ='';
    if (items.length === 0) {
            xhtml = `<p class="ml-4 text-light font-weight-light font-italic text-center">
                            Danh Sách Yêu Thích Trống!
                      </p>`
    } else{
    $.each(items, function (key, val) {
        let title = val.title
                statusHeart = `
            <a href="javascript:void(0);" onClick="funcRemoveLove(${val.id},'newsLove');"><span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news"><i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích</span></a>
         `
        xhtml += `<div class="row text-light mb-4">
        <div class="col-sm-4 grid-margin">
            <div class="position-relative">
                <div class="rotate-img">
                <a onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}"><img src="` + val.thumb + `" alt="thumb" class="img-fluid"></a>
                </div>
            </div>
        </div>
        <div class="col-sm-8 grid-margin">
            <a onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}">
                <h5 class="mb-2 font-weight-bold text-light text-justify">
                `+ val.title + `
                </h5>
            </a>
            <div class="fs-13 mb-2">
            <span class="badge badge-primary font-weight-bold mr-2">`+ val.category + ` </span>` + statusHeart + `
            </div>
            <p class="mb-0 text-light font-weight-light font-italic text-justify">
            `+ val.description + `
            </p>
             </div>
    </div>`;
    });}
    elmArticleLove.html(xhtml);

}

showFilmLove = () => {
    let items = listItems('VIDEO_LOVE')
    let xhtml ='';
    if (items.length === 0) {
            xhtml = `<p class="ml-4 text-light font-weight-light font-italic text-center">
                            Danh Sách Yêu Thích Trống!
                      </p>`
    } else {
    $.each(items, function (key, val) {
            let allVideos = getAllVideo()
            console.log(allVideos)
            let value = allVideos.filter((o)=> o.id == val.id)[0]
            let statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcRemoveLoveFilm('${value.id}');"><span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news"><i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích</span></a>`
            xhtml +=`
            <div class="col-lg-6 col-md-6 col-sm-6 " style="position: relative">
                        <a href="anime-watching.html?watching=${value.id}" class="product__sidebar__view__item set-bg mix day years img" style="background-image: url('${value.thumbnail}'); width: 100%; height:200px">
                            <div class="ep">${value.title}</div>
                        </a>
                        <div class="love" style="position: absolute; top: 10px; right: 20px; z-index: 999; " >${statusHeart}</div>
            </div>
        `
    })  
    }
    elmFilmLove.html(xhtml);
}


showFilmInCategory = () => {
    let paramCategory = $.urlParam('category')
    let filmsList = filmsInCategoryList(paramCategory);
    let nameCategory = funcNameCategory(paramCategory)
    let xhtmlBreadCrumb = `<span>${nameCategory}</span>`
    let xhtmlNameCategory = `<h4>${nameCategory}</h4>`
    if(paramCategory != null){
    $.getJSON(API_PREFIX + "playlists?offset=0&sortBy=id&sort_dir=asc&type=film-cartoon", function (data) {
        let xhtmlContent = '';
        console.log(funcNameCategory(paramCategory))
        $.each(data, function (key, val) {
            if(filmsList.indexOf(val.id) !== -1)  
            {  
                console.log(val.id)
                xhtmlContent += ``;
            }   
        });
        elmCategoryFilm.html(xhtmlContent);
        emlCategoryFilmBreadcrumb.append(xhtmlBreadCrumb);
        emlCategoryFilmName.html(xhtmlNameCategory)
    });
}
}

showBestView = () => {
    let items = getFilmBestView(5);
    let xhtm = "";
     $.each(items,  function (key, val) {
        xhtm+=  `
            <a href="anime-watching.html?watching=${val.id}">
                <div class="product__sidebar__view__item set-bg mix day years bg-image"
                style="background-image: url('${val.thumbnail}'); background-position: 0 -35px;">
                        <div class="view"><i class="fa fa-eye"></i>`+val.viewCount.toLocaleString()+`</div>
                        <h5>${val.title}</h5>
                </div>
            </a>
            `
    });
    elmFilmBestView.html(xhtm);
}

showBestTrend = () => {
    let items = getFilmBestTrend(6);
    let xhtm = "";
     $.each(items,  function (key, val) {
        let heartVideo = listItems('VIDEO_LOVE')
        let statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcLoveFilm('${val.id}');"><span class="badge badge-danger font-weight-bold loveItems" data-type="movie"><i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích</span></a>`
        let idVideo = val.id
        let idPublic = nameCategoryFilm(val.playlist_id)    
        $.each(heartVideo, function (key, val) {
            if (val.id == idVideo) {
                statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcRemoveLoveFilm('${val.id}');"><span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news"><i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích</span></a>`
                }
            })
     xhtm +=`<div class="col-lg-6 col-md-6 col-sm-6"  style="position: relative">
                <div class="product__item" style="position: relative" >
                        <a href="anime-watching.html?watching=${val.id}">
                                <div class="product__item__pic set-bg" style="background-image: url('${val.thumbnail}'); background-position: 0 -35px;">
                                    <div class="category"><span class="badge badge-primary font-weight-bold loveItemsMovie" style="background-color: #035364;"data-type="movie">${idPublic}</span></div>
                                    <div class="view"><i class="fa fa-eye"></i> `+val.viewCount.toLocaleString()+`</div>
                                </div>
                                <div class="product__item__text">
                                    <h5>${val.title}</h5>
                                </div>
                         </a>
                         <div class="love" style="position: absolute; top:120px ; right: 10px; z-index: 999; ">${statusHeart} </div>
                </div>

            </div>`
        });       
    elmFilmBestTrend.html(xhtm);
}

showBestLike = () => {
    let items = getFilmBestLike(5);
    let xhtm = "";
     $.each(items,  function (key, val) {
        let heartVideo = listItems('VIDEO_LOVE')
        let statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcLoveFilm('${val.id}');"><span class="badge badge-danger font-weight-bold loveItems" data-type="movie"><i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích</span></a>`
        let idVideo = val.id
        let idPublic = nameCategoryFilm(val.playlist_id)    
        $.each(heartVideo, function (key, val) {
            if (val.id == idVideo) {
                statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcRemoveLoveFilm('${val.id}');"><span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news"><i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích</span></a>`
                }
            })
            
            let colLg = "col-lg-6 col-md-6 col-sm-6"
            bgPosition    = "background-position: 0 -35px;"
            let stylePosition = "position: absolute; top:120px ; right: 10px; z-index: 999; "
            if (key === 0) {
                colLg = "col-lg-12 col-md-12 col-sm-12"
                stylePosition = "position: absolute; top:305px ; right: 10px; z-index: 999; "
                bgPosition    = "background-position: 0 -90px;"
            }
     xhtm +=`<div class="${colLg}"  style="position: relative">
                <div class="product__item" style="position: relative" >
                        <a href="anime-watching.html?watching=${val.id}">
                                <div class="product__item__pic set-bg" style="background-image: url('${val.thumbnail}'); ${bgPosition}">
                                    <div class="category"><span class="badge badge-primary font-weight-bold loveItemsMovie" style="background-color: #035364;"data-type="movie">${idPublic}</span></div>
                                    <div class="view"><i class="fa fa-eye"></i> `+val.viewCount.toLocaleString()+`</div>
                                </div>
                                <div class="product__item__text">
                                    <h5>${val.title}</h5>
                                </div>
                         </a>
                         <div class="love" style="${stylePosition}">${statusHeart} </div>
                </div>

            </div>`
        });       
        elmFilmBestLike.html(xhtm);
}

showNewDate = () => {
    let newVideo = getFilmNewDate(3)
    let xhtm ="";
    $.each(newVideo,  function (key, val) {
        let heartVideo = listItems('VIDEO_LOVE')
        let statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcLoveFilm('${val.id}');"><span class="badge badge-danger font-weight-bold loveItems" data-type="movie"><i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích</span></a>`
        let idVideo = val.id
        let idPublic = nameCategoryFilm(val.playlist_id)
        $.each(heartVideo, function (key, val) {
            if (val.id == idVideo) {
                statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcRemoveLoveFilm('${val.id}');"><span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news"><i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích</span></a>`
                }
            })
            
            let colLg = "col-lg-6 col-md-6 col-sm-6"
            let stylePosition = "position: absolute; top:120px ; right: 10px; z-index: 999; "
            bgPosition    = "background-position: 0 -35px;"

            if (key === 0) {
                colLg = "col-lg-12 col-md-12 col-sm-12"
                stylePosition = "position: absolute; top:305px ; right: 10px; z-index: 999; "
                bgPosition    = "background-position: 0 -90px;"

            }
     xhtm +=`<div class="${colLg} col-md-6 col-sm-6"  style="position: relative">
                <div class="product__item" style="position: relative" >
                        <a href="anime-watching.html?watching=${val.id}">
                                <div class="product__item__pic set-bg" style="background-image: url('${val.thumbnail}'); ${bgPosition}">
                                    <div class="category"><span class="badge badge-primary font-weight-bold loveItemsMovie" style="background-color: #035364;"data-type="movie">${idPublic}</span></div>
                                    <div class="view"><i class="fa fa-eye"></i> `+val.viewCount.toLocaleString()+`</div>
                                </div>
                                <div class="product__item__text">
                                    <h5>${val.title}</h5>
                                </div>
                         </a>
                         <div class="love" style="${stylePosition}">${statusHeart} </div>
                </div>

            </div>`
        }); 
        elmFilmNewDate.html(xhtm);
}

showFilmViewed = () => {
    let videoViewed = listItems('VIDEO_VIEWED').slice(-5)
    let xhtm ="";
    $.each(videoViewed,  function (key, val) {
        let statusDelete = `<a href="javascript:void(0);" class="link" onClick="funcRemoveViewedFilm('${val.id}');"><span class="badge badge-danger font-weight-bold loveItems text-light" data-type="movie"><i class="fa-solid fa-trash-can text-light" style="margin-right: 4px;"></i>Xóa</span></a>`
        let idPublic = nameCategoryFilm(val.playlist_id)
            let colLg = "col-lg-6 col-md-6 col-sm-6"
            let stylePosition = "position: absolute; top:120px ; right: 10px; z-index: 999; "
            let bgPosition    = "background-position: 0 -35px;"
            if (key === 0) {
                colLg = "col-lg-12 col-md-12 col-sm-12"
                stylePosition = "position: absolute; top:305px ; right: 10px; z-index: 999; "
                bgPosition    = "background-position: 0 -90px;"
            }
     xhtm +=`<div class="${colLg}"  style="position: relative">
                <div class="product__item" style="position: relative" >
                        <a href="anime-watching.html?watching=${val.id}">
                                <div class="product__item__pic set-bg" style="background-image: url('${val.thumbnail}'); ${bgPosition}">
                                    <div class="category"><span class="badge badge-primary font-weight-bold loveItemsMovie" style="background-color: #035364;"data-type="movie">${idPublic}</span></div>
                                    <div class="view"><i class="fa fa-eye"></i> `+val.viewCount.toLocaleString()+`</div>
                                </div>
                                <div class="product__item__text">
                                    <h5>${val.title}</h5>
                                </div>
                         </a>
                         <div class="love" style="${stylePosition}">${statusDelete} </div>
                </div>

            </div>`
        });     
    elmFilmsViewed.html(xhtm) 
}

showFilmWatching = () => {
    let paramID = $.urlParam('watching')
    if (paramID == null) return false;
    let allVideos = getAllVideo()
    let playlistID = allVideos.filter((obj)=> obj.id == paramID)[0]
    addItemFilmViewed(playlistID);
    let episodeList = allVideos.filter((obj)=> obj.playlist_id == playlistID.playlist_id)
    //iframe
    elmFilmEpisode.html(playlistID.iframe)
    //title
    let xhtm =`<h5 >
                ${playlistID.title}
              </h5>`;
    elmFilmTitle.html(xhtm)
    //episode
    let xhtmEpisode ="";
    $.each(episodeList, function (index, val) {
        let videoView = listItems('VIDEO_VIEWED')
        let opacity =  (videoView.filter((o)=> o.id == val.id).length >0) ? 0.3 : 1;
        xhtmEpisode +=`
                <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                        <a href="anime-watching.html?watching=${val.id}" class="product__sidebar__view__item set-bg mix day years img" style="background-image: url('${val.thumbnail}'); opacity: ${opacity}">
                            <div class="ep">${val.title}</div>
                        </a>
                 </div>
        `
    });   
    elmFilmEpisodeList.html(xhtmEpisode); 
    let suggestVideo = getFilmSuggest(4)
    let xhtmSuggest =""
   

    $.each(suggestVideo, function (index, value) {
            let heartVideo = listItems('VIDEO_LOVE')
            let statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcLoveFilm('${value.id}');"><span class="badge badge-danger font-weight-bold loveItems" data-type="movie"><i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích</span></a>`
            let idVideo = value.id
                
            $.each(heartVideo, function (key, val) {
                if (val.id == idVideo) {
                    statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcRemoveLoveFilm('${value.id}');"><span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news"><i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích</span></a>`
                    }
                   })
            xhtmSuggest +=`
            <div class="col-lg-3 col-md-4 col-sm-6 col-12" style="position: relative">
                        <a href="anime-watching.html?watching=${value.id}" class="product__sidebar__view__item set-bg mix day years img" style="background-image: url('${value.thumbnail}');">
                            <div class="ep">${value.title}</div>
                        </a>
                        <div class="love" style="position: absolute; top: 5px; right: 20px; z-index: 999; " >${statusHeart}</div>
            </div>
        `
    });   
    elmFilmSuggest.html(xhtmSuggest);      
}

 showWatchingFilm = () =>{
    let items = listItems('VIDEO_VIEWED');
    let id ="";
    if (items.length == 0) return false;
    id = items.slice(-1)[0].id
    xhtml =`<a href="./anime-watching.html?watching=${id}">Đang Xem</a>`
    elmFilmWatching.html(xhtml)
    elmFilmWatchingFooter.html(xhtml)
 }
 changeTitle = () => {
    let paramID = $.urlParam('id')
    if (paramID === null) {
        return false;
    } else {
        $.getJSON(API_PREFIX + "categories_news/" + paramID + "/articles", function (data) {
         document.title = data[0].category.name + " | ZendVN.com";
        })
    }
 }

 showSearchFilm = () => {
    let paramSearch = $.urlParam('search')
    let xhtm ="";
    let searchValue = [];
    if ( paramSearch == 0 || paramSearch == null) {
            xhtm =`<p class="ml-4 text-light font-weight-light font-italic text-center">
            Vui Lòng Nhập Từ Khóa Tìm Kiếm
                 </p>`;
            elmFilmSearch.html(xhtm);
        return false;
    } else {
        let arrSearch = paramSearch.split("+")
        $.each(arrSearch, function (index, value) {
            let string = removeAccents(value).toLowerCase()
            let allVideos = getAllVideo()
            let newArr = allVideos.filter((obj) => removeAccents(obj.title).toLowerCase().search(" "+string+" ") >0)
            searchValue.push(...newArr)
         })
         if (searchValue.length == 0 ) {
            xhtm =`<p class="ml-4 text-light font-weight-light font-italic text-center">
            Không có kết quả phù hợp!
                 </p>`;
            elmFilmSearch.html(xhtm);
         } else {
         $.each(searchValue, function (index, val) {
            let idPublic = nameCategoryFilm(val.playlist_id)  
            xhtm +=`<div class="col-lg-6 col-md-6 col-sm-6"  style="position: relative">
            <div class="product__item" style="position: relative" >
                    <a href="anime-watching.html?watching=${val.id}">
                            <div class="product__item__pic set-bg" style="background-image: url('${val.thumbnail}'); background-position: 0 -35px;">
                                <div class="category"><span class="badge badge-primary font-weight-bold loveItemsMovie" style="background-color: #035364;"data-type="movie">${idPublic}</span></div>
                                <div class="view"><i class="fa fa-eye"></i> `+val.viewCount.toLocaleString()+`</div>
                            </div>
                            <div class="product__item__text">
                                <h5>${val.title}</h5>
                            </div>
                     </a>
            </div>

        </div>
                    
                `
            elmFilmSearch.html(xhtm);
            if (index >18) return false;
         })}

}}

showSearchNews = () => {
    let paramSearch = $.urlParam('search')
    let xhtm ="";
    let searchValue = [];
    if ( paramSearch == 0 || paramSearch == null) {
            xhtm =`<p class="ml-4 text-light font-weight-light font-italic text-center">
            Vui Lòng Nhập Từ Khóa Tìm Kiếm
                 </p>`;
                 elmNewsSearch.html(xhtm);
        return false;
    } else {
        let arrSearch = paramSearch.split("+")
        $.each(arrSearch, function (index, value) {
                    let string = removeAccents(value).toLowerCase()
                    
                    var newArr = $.getJSON( API_PREFIX + `articles/search?q=${string}&offset=0&limit=10&sort_by=id&sort_dir=desc`, function(data) {
                        console.log( "success" );
                        searchValue.push(...data)
                      })
                        .done(function() {
                          console.log( "second success" );
                        })
                        .fail(function() {
                          console.log( "error" );
                        })
                        .always(function() {
                          console.log( "complete" );
                        });
                       
                      // Perform other work here ...
                       
                      // Set another completion function for the request above
                      newArr.always(function(data) {
                        console.log( "second complete" );
                        if (searchValue.length == 0 ) {
                            xhtm =`<p class="ml-4 text-light font-weight-light font-italic text-center">
                            Không có kết quả phù hợp!
                                 </p>`;
                                 elmNewsSearch.html(xhtm);
                         } else {
                         $.each(searchValue, function (index, val) {
                            let day = val.publish_date.split(" ")[0].split("-")
                            let title = val.title.replace(/'/g, '').replace(/"/g, '');   
                            xhtm += `<div class="row text-light mb-4">
                            <div class="col-sm-4 grid-margin">
                                <div class="position-relative">
                                    <div class="rotate-img">
                                    <a onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}"><img src="` + val.thumb + `" alt="thumb" class="img-fluid"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-8 grid-margin">
                                <a onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}">
                                    <h5 class="mb-2 font-weight-bold text-light text-justify">
                                    `+ val.title + `
                                    </h5>
                                </a>
                                <div class="fs-13 mb-3">
                                   <a href="?id=${val.category_id}"> <span class="badge badge-primary font-weight-bold mr-2">`+ val.category.name + ` </span></a><i class="fa-solid fa-clock"></i> `+ day[2]+"-"+day[1]+"-"+day[0] + `
                                </div>
                                <p class="mb-0 text-light font-weight-light font-italic text-justify">
                                `+ val.description + `
                                </p>
                            </div>
                        </div>`;
                                elmNewsSearch.html(xhtm);
                            if (index >18) return false;
                         })}
                      });

         })

        

}}

showBoxNewsSlider = () => {
    let xhtmSlider = "";
    let xhtmBox = ""
    $.getJSON(API_PREFIX + "articles?offset=15&limit=24&sort_by=description&sort_dir=desc", function (data) {
        $.each(data, function (key, val) {
            let title = val.title.replace(/'/g, '').replace(/"/g, '');   
            let day = val.publish_date.split(" ")[0].split("-")
            let active = (key == 0)? "active" : "";
            if (key >7) return false   
            if (key <4) {
            xhtmSlider += `
            <div class="carousel-item ${active}">
            <div class="card border-0 rounded-0 text-light overflow zoom">
                <div class="position-relative">
                    <!--thumbnail img-->
                    <div class="ratio_left-cover-1 image-wrapper">
                        <a onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="./blog-details.html?iddetail=${val.id}">
                            <img class="img-fluid w-100 sliderImage"
                                 src="${val.thumb}"
                                 alt="news">
                        </a>
                    </div>
                    <div class="position-absolute p-2 p-lg-2 b-0 w-100 bg-shadow">
                        <!--title-->
                        <a onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="./blog-details.html?iddetail=${val.id}">
                            <h2 class="h3 post-title text-white my-1">${val.title}</h2>
                        </a>
                        <!-- meta title -->
                        <div class="news-meta">
                            <span class="news-date"><i class="fa-solid fa-clock mr-2"></i>` + day[2]+"-"+day[1]+"-"+day[0] + `</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `} else {

            xhtmBox += `
            <div class="col-6 pb-1 pt-0 pr-1">
            <div class="card border-0 rounded-0 text-white overflow zoom">
                <div class="position-relative">
                    <!--thumbnail img-->
                    <div class="ratio_right-cover-2 image-wrapper">
                        <a onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="./blog-details.html?iddetail=${val.id}">
                            <img class="img-fluid itemImage"
                                 src="${val.thumb}"
                                 alt="simple blog template bootstrap">
                        </a>
                    </div>
                    <div class="position-absolute p-1 p-lg-1 b-0 w-100 bg-shadow">
                        <!-- category -->
                        <a class="p-1 badge badge-primary rounded-0" href="./blog.html?id=${val.category.id}">${val.category.name}</a>

                        <!--title-->
                        <a onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="./blog-details.html?iddetail=${val.id}">
                            <h2 class="h5 text-white my-1">${val.title}</h2>
                        </a>
                    </div>
                </div>
            </div>
        </div>
            `
        }
        });

        elmNewsBoxSlider.html(xhtmSlider)
        elmNewsBox.html(xhtmBox)
    })
}

showPlaylistCategory = () =>{
    let xhtm ="";
    let paramCategory = $.urlParam('category')
    let playlistName   = CategoryFilm(paramCategory);
    let allVideos     = getAllVideo();
    if (playlistName== null) return false;
    let filterVideos = allVideos.filter((o)=> o.playlist_id == playlistName[0] || o.playlist_id == playlistName[1] )
    let xhtmlCategory = `
            <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-6">
                <div class="section-title" id="api-name-category-film">
                    <h4>${nameCategoryFilm(playlistName[0])}</h4>
                </div>
            </div>
        </div>
    `
    $.each(filterVideos,(key, val) =>{
        let heartVideo = listItems('VIDEO_LOVE')
        let statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcLoveFilm('${val.id}');"><span class="badge badge-danger font-weight-bold loveItems" data-type="movie"><i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích</span></a>`
        let idVideo = val.id
        $.each(heartVideo, function (key, val) {
            if (val.id == idVideo) {
                statusHeart = `<a href="javascript:void(0);" class="link" onClick="funcRemoveLoveFilm('${val.id}');"><span class="badge badge-danger font-weight-bold loveItems bg-white text-primary" data-type="news"><i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích</span></a>`
                }
            })
       xhtm += `<div class="col-lg-6 col-md-6 col-sm-6"  style="position: relative">
       <div class="product__item" style="position: relative" >
               <a href="anime-watching.html?watching=${val.id}">
                       <div class="product__item__pic set-bg" style="background-image: url('${val.thumbnail}'); background-position: 0 -35px;">
                           <div class="view"><i class="fa fa-eye"></i> `+val.viewCount.toLocaleString()+`</div>
                       </div>
                       <div class="product__item__text">
                           <h5>${val.title}</h5>
                       </div>
                </a>
                <div class="love" style="position: absolute; top:120px ; right: 10px; z-index: 999; ">${statusHeart} </div>
       </div>

   </div>`

    })
    elmCategoryFilmName.html(xhtmlCategory)
    elmCategoryFilmNameItems.html(xhtm)
}





