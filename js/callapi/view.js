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
        let  xhtml = '';
        xhtml = `
        <h2>Tin Tức</h2>
        <p>Tổng hợp những bài báo mới nhất</p>
        `
        elmNameCategory.html(xhtml)
        xhtml='';
        $.each(data, function (key, val) {
            xhtml += `<div class="row text-light mb-4">
                <div class="col-sm-4 grid-margin">
                    <div class="position-relative">
                        <div class="rotate-img">
                        <a onClick="funcArticleViewed('${val.id}','${val.title}','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}"><img src="`+ val.thumb + `" alt="thumb" class="img-fluid"></a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8 grid-margin">
                    <a onClick="funcArticleViewed('${val.id}','${val.title}','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}">
                        <h5 class="mb-2 font-weight-bold text-light">
                        `+ val.title + `
                        </h5>
                    </a>
                    <div class="fs-13 mb-2">
                        <span class="badge badge-primary font-weight-bold mr-2">`+ val.category.name + ` </span><i class="fa-solid fa-clock"></i> ` + val.publish_date.split(" ")[0] + `<a href="javascript:void(0);" onClick="funcLove('news');"><span class="badge badge-danger font-weight-bold loveItems" data-type="news"><i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích</span></a>
                    </div>
                    <p class="mb-0 text-light font-weight-light font-italic">
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
        xhtml='';
        $.each(data, function (key, val) {
            xhtml += `<div class="row text-light mb-4">
                <div class="col-sm-4 grid-margin">
                    <div class="position-relative">
                        <div class="rotate-img">
                            <a onClick="funcArticleViewed('${val.id}','${val.title}','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}"><img src="`+ val.thumb + `" alt="thumb" class="img-fluid"></a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8  grid-margin">
                    <a onClick="funcArticleViewed('${val.id}','${val.title}','${val.thumb}','${val.link}');" href="blog-details.html?iddetail=${val.id}">
                        <h5 class="mb-2 font-weight-bold text-light">
                        `+ val.title + `
                        </h5>
                    </a>
                    <div class="fs-13 mb-2">
                    <i class="fa-solid fa-clock mr-2"></i>` + val.publish_date.split(" ")[0] + `<a href="javascript:void(0);" onClick="funcLove('news');"><span class="badge badge-danger font-weight-bold loveItems" data-type="news"><i class="fa-solid fa-heart" style="margin-right: 4px;"></i>Thích</span></a>
                    </div>
                    <p class="mb-0 text-light font-weight-light font-italic"> 
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
                    <td class="font-weight-bold">`+val.type+`</td>
                    <td>`+val.buy+`</td>
                    <td>`+val.sell+`</td>
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
                    <td class="font-weight-bold">`+val.name+`</td>
                    <td>`+val.price.toFixed(2)+` US$</td>
                    <td class="`+colorPercent1h+`">`+val.percent_change_1h.toFixed(2)+` %</td>
                    <td class="`+colorPercent24h+`">`+val.percent_change_24h.toFixed(2)+` %</td>
                </tr>` 
    })
    elmAreaCoinPrice.append(xhtm)
});
}
//show news viewed

showArticleViewed = () => {
    let items = listItems('ARTICLE_VIEWED')
    let xhtm = "";
    $.each(items,function ( key, val) {
        xhtm += `<div class="product__sidebar__comment__item position-relative">
                    <div class="product__sidebar__comment__item__pic  ">
                        <img style="width:90px;"src="${val.thumb}" alt="news">
                    </div>
                    <div onClick="funcRemoveArticleViewd(${val.id});" class="badge-positioned removeArticleViewd">
                            <span class="badge badge-danger font-weight-bold">Xóa</span>
                     </div>
                    <div class="product__sidebar__comment__item__text ">
                        <h6>
                            <a class="text-light" href="blog-details.html?iddetail=${val.id}">${val.title}</a>
                        </h6>
                    </div>
                </div>
        `
      });
      elmArticleViewed.append(xhtm)
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

    
