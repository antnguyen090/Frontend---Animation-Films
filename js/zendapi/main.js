const API_PREFIX = 'http://apiforlearning.zendvn.com/api/';
let elmAreaCategoryNews = $("ul#zvn-area-category-news");
let elmAreaNewsItem = $("#zvn-blog-items");

$.getJSON( API_PREFIX + "categories_news", function( data ) {
        let xhtml = '';
        $.each( data, function( key, val ) {
            xhtml += `<li><a href="blog.html?id=${val.id}">- ${val.name}</a></li>`;
        });
        elmAreaCategoryNews.html(xhtml);
    });


//9. Lấy danh sách bài viết trong 1 category nào đó

    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
           return null;
        }
        return decodeURI(results[1]) || 0;
    }

    let paramID = $.urlParam('id')
    
$.getJSON( API_PREFIX + "categories_news/"+ paramID + "/articles", function( data ) {
        let xhtml = '';
        $.each( data, function( key, val ) {
            console.log(val.title)
            xhtml += `<div class="row text-light">
            <div class="col-sm-4 grid-margin">
                <div class="position-relative">
                    <div class="rotate-img">
                        <img src="`+val.thumb+`" alt="thumb" class="img-fluid">
                    </div>
                    <div class="badge-positioned">
                        <span class="badge badge-danger font-weight-bold ">Flash news</span>
                    </div>
                </div>
            </div>
            <div class="col-sm-8  grid-margin">
                <h2 class="mb-2 font-weight-600 text-light">
                   `+val.title+`
                </h2>
                <div class="fs-13 mb-2">
                    <span class="mr-2">`+val.category.name+` </span>`+val.publish_date+`
                </div>
                <p class="mb-0">
                `+val.description+`
                </p>
            </div>
        </div>`;
        });
        elmAreaNewsItem.html(xhtml);
    });
