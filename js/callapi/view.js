// lấy danh sách category
showListCategory = () => {
    $.getJSON(API_PREFIX + "categories_news", function (data) {
        let xhtml = '';
        $.each(data, function (key, val) {
            xhtml += `<li><a href="blog.html?id=${val.id}" role="menuitem" tabindex="0">${val.name}</a></li>`;
        });
        elmAreaCategoryNews.html(xhtml);
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
        <p>Tổng hợp những bài báo mới nhất</p>
        `
            elmNameCategory.html(xhtml)
            xhtml = '';
            $.each(data, function (key, val) {
                let description = val.description.replace(/'/g, '').replace(/"/g, '');   
                let title = val.title.replace(/'/g, '').replace(/"/g, '');   
                let statusHeart = `
                                 <a href="javascript:void(0);" onClick="funcLove('${val.id}','`+title+`','${val.thumb}','${val.link}','${description}','${val.category.name}','newsLove');"><span class="badge badge-danger font-weight-bold loveItems" data-type="news"><i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích</span></a>
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
                    <div class="fs-13 mb-2">
                        <span class="badge badge-primary font-weight-bold mr-2">`+ val.category.name + ` </span><i class="fa-solid fa-clock"></i> `+ day[2]+"-"+day[1]+"-"+day[0] + statusHeart + `
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
                    <p>Tổng hợp những bài báo mới nhất</p>
                    `
            elmNameCategory.html(xhtml)
            xhtml = '';
            $.each(data, function (key, val) {
                let title = val.title.replace(/'/g, '').replace(/"/g, '');   
                let description = val.description.replace(/'/g, '').replace(/"/g, '');   
                let statusHeart = `
                <a href="javascript:void(0);" onClick="funcLove('${val.id}','`+title+`','${val.thumb}','${val.link}','${description}','${val.category.name}','newsLove');">
                <span class="badge badge-danger font-weight-bold loveItems" data-type="news">
                    <i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích
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
        xhtm += `<div class="product__sidebar__comment__item position-relative">
                    <div class="product__sidebar__comment__item__pic  ">
                        <img style="width:100px; height: 60px;"src="${val.thumb}" alt="news">
                    </div>
                    <div class="product__sidebar__comment__item__text ">
                            <h6 class="text-justify" style="height: 36px; overflow: hidden;">
                                <a class="text-light" href="blog-details.html?iddetail=${val.id}">${val.title}</a>
                            </h6>
                            <div onClick="funcRemoveArticleViewd(${val.id});" class="badge-positioned removeArticleViewd">
                                <span class="badge badge-danger font-weight-bold">Xóa</span>
                            </div>
                    </div>
                </div>
        `
    });
    elmArticleViewed.append(xhtm)
}
//show news new index
showArticleNew = () => {
    let xhtm = "";
    $.getJSON(API_PREFIX + "articles", function (data) {
        $.each(data, function (key, val) {
            let title = val.title.replace(/'/g, '').replace(/"/g, '');   
            let description = val.description.replace(/'/g, '').replace(/"/g, '');   
            console.log(description)
            if (key == 5) return false;
            let statusHeart = `
            <div onClick="funcLove('${val.id}','`+title+`','${val.thumb}','${description}','`+description+`','${val.category.name}','newsLove');" class="badge-positioned removeArticleViewd">
                 <span class="badge badge-danger font-weight-bold"><i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích</span>
        </div>
       `
            let loveNews = listItems('newsLove')
            let idNews = val.id;
            $.each(loveNews, function (key, val) {
                if (val.id == idNews) {
                    statusHeart = `
                    <div onClick="funcRemoveLove('${val.id}','newsLove');" class="badge-positioned removeArticleViewd">
                         <span class="badge badge-danger font-weight-bold bg-white text-primary"><i class="fa-solid fa-heart text-primary" style="margin-right: 4px;"></i>Bỏ Thích</span>
                </div>
               `
                }
            })
            xhtm += `<div class="product__sidebar__comment__item position-relative">
            <div class="product__sidebar__comment__item__pic  ">
                <img style="width:100px; height: 60px;"src="${val.thumb}" alt="news">
            </div>
            <div class="product__sidebar__comment__item__text ">
                    <h6 class="text-justify" style="height: 36px; overflow: hidden;">
                        <a class="text-light" onClick="funcArticleViewed('${val.id}','`+title+`','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}">${val.title}</a>
                    </h6>
                    `+statusHeart+`
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
            xhtml = `<div class="row d-flex justify-content-center">
            <div class="col-lg-8">
                <div class="blog__details__title">
                    <h6>${data.category.name} <span>- ${data.publish_date.split(" ")[0]}</span></h6>
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
            xhtml = `<p class="mb-0 text-light font-weight-light font-italic text-center">
                            Danh Sách Yêu Thích Trống!
                      </p>`
    } else{
    $.each(items, function (key, val) {
        let title = val.title.replace(/'/g||/"/g, '')
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
    let items = listItems('filmLove')
    let xhtml ='';
    if (items.length === 0) {
            xhtml = `<p class="mb-0 text-light font-weight-light font-italic text-center">
                            Danh Sách Yêu Thích Trống!
                      </p>`
    } else{
    $.each(items, function (key, val) {
        console.log("data =  "+ val.id)
        let title = val.title.replace(/'/g||/"/g, '')
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
    $.each(items, function (key, val) {
        $.getJSON(API_PREFIX+'videos/'+val.id, function(data) {
            let strJSON = data.thumbnail.replace(/"\"/g,"")
            let thumbnailJson = JSON.parse(strJSON);
            thumbLink = thumbnailJson.medium.url
            xhtm += `
            <a href="anime-watching.html?watching=${val.id}">
                <div class="product__sidebar__view__item set-bg mix day years bg-image"
                style="background-image: url('${thumbLink}');">
                        <div class="view"><i class="fa fa-eye"></i>`+val.viewCount.toLocaleString()+`</div>
                        <h5>${data.title}</h5>
                </div>
            </a>
            `
            elmFilmBestView.html(xhtm)
    });
    });
}


showFilmViewed = () =>{
    let items = listItems('FILM_VIEWED');
    let xhtm = "";
    $.each(items, function (key, val) {
        xhtm += `
        `
    });
    elmFilmsViewed.append(xhtm);
}

showSlideFlim = (number) =>{
    let items = listItems('getFilmStatistics')
    let i = 0;
    console.log(items[getRamdom(0,items.length)])
    let xhtm ="";
    $.getJSON(API_PREFIX+'videos/2334', function(data) {
        let strJSON = data.thumbnail.replace(/"\"/g,"")
        let thumbnailJson = JSON.parse(strJSON);
        thumbLink = thumbnailJson.medium.url
        xhtm += `
        
        <div class="hero__items set-bg" data-setbg="${thumbLink}">
         <div class="row">
                <div class="col-lg-6">
                    <div class="hero__text">
                        <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                        <p>After 30 days of travel across the world...</p>
                        <a href="#"><span>Xem Ngay</span> <i class="fa fa-angle-right"></i></a>
                    </div>
                </div>
          </div>
        </div>
 
        `
        // elmFilmSlide.append(xhtm);
        number--;
        console.log(number)
        if(i === number) return false;
        showSlideFlim(number)
});
}




