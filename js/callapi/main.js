$( document ).ready(function() {
//Lấy danh sách category 
$.getJSON(API_PREFIX + "categories_news", function (data) {
    let xhtml = '';
    $.each(data, function (key, val) {
        xhtml += `<li><a href="blog.html?id=${val.id}" role="menuitem" tabindex="0">${val.name}</a></li>`;
    });
    elmAreaCategoryNews.html(xhtml);
});

//Lấy danh sách bài viết trong 1 category nào đó
let paramID = $.urlParam('id')
if (paramID === null) {
    $.getJSON(API_PREFIX + "articles", function (data) {
        let xhtml = '';
        console.log(data)
        $.each(data, function (key, val) {
            console.log(val.title)
            xhtml += `<div class="row text-light mb-4">
                <div class="col-sm-4 grid-margin">
                    <div class="position-relative">
                        <div class="rotate-img">
                        <a href="blog/blog-detail.html?id=${val.id}"><img src="`+ val.thumb + `" alt="thumb" class="img-fluid"></a>
                        </div>
                        <div class="badge-positioned newsHightLight">
                            <span class="badge badge-danger font-weight-bold ">Tin Mới</span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8 grid-margin">
                    <a href="blog/blog-detail.html?id=${val.id}">
                        <h2 class="mb-2 font-weight-800 text-light">
                        `+ val.title + `
                        </h2>
                    </a>
                    <div class="fs-13 mb-2">
                        <span class="mr-2 font-weight-bold bg-danger">`+ val.category.name + ` </span>` + val.publish_date + `
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
        $.each(data, function (key, val) {
            console.log(val.title)
            xhtml += `<div class="row text-light mb-4">
                <div class="col-sm-4 grid-margin">
                    <div class="position-relative">
                        <div class="rotate-img">
                            <a href="blog/blog-detail.html?id=${val.id}"><img src="`+ val.thumb + `" alt="thumb" class="img-fluid"></a>
                        </div>
                        <div class="badge-positioned newsHightLight">
                            <span class="badge badge-danger font-weight-bold ">Tin Mới</span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8  grid-margin">
                    <a href="blog/blog-detail.html?id=${val.id}">
                        <h2 class="mb-2 font-weight-800 text-light">
                        `+ val.title + `
                        </h2>
                    </a>
                    <div class="fs-13 mb-2">
                        <span class="mr-2 font-weight-bold bg-danger">`+ val.category.name + ` </span>` + val.publish_date + `
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

// call api gold

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

//call api coin

$.getJSON(API_PREFIX + "get-coin", function (data) {
    let xhtm = "";
    console.log(data)
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

});
