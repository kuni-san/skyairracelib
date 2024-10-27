//本家ページアコーディオン（コース詳細を見る）をクリックした時の動作
$('.ac-course__index').on('click', function() {//タイトル要素をクリックしたら
    var findElm = $(this).next(".ac-course__contents");//直後のアコーディオンを行うエリアを取得し
    $(findElm).slideToggle();//アコーディオンの上下動作
    $(this).parent('.ac-course').find('.ac-course__index--close').removeClass('close');
      
    if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
      $(this).removeClass('close');//クラス名を除去し
    }else{//それ以外は
      $(this).addClass('close');//クラス名closeを付与
    }
  });
//本家ページアコーディオン（コース詳細を閉じる）をクリックした時の動作
$('.ac-course__index--close').on('click', function() {//タイトル要素をクリックしたら
    var findElm = $(this).prev(".ac-course__contents");//直後のアコーディオンを行うエリアを取得し
    $(findElm).slideToggle();//アコーディオンの上下動作
      
    if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
      $(this).removeClass('close');//クラス名を除去し
    }else{//それ以外は
      $(this).addClass('close');//クラス名closeを付与
      $(findElm).parent('.ac-course').find('.ac-course__index').removeClass('close');
    }
  });

//本家ページアコーディオン（技術）をクリックした時の動作
$('.ac-tech__index').on('click', function() {//タイトル要素をクリックしたら
    var findElm = $(this).next(".ac-tech__contents");//直後のアコーディオンを行うエリアを取得し
    
      
    if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
        $(this).removeClass('close');//クラス名を除去し
        $(findElm).slideUp({
          start: function() {
              $(this).parents('.ac-tech').find('.ac-tech__index').css('border-radius','5px');
          }
      });//アコーディオンを閉じる
    }else{//それ以外は
        $(this).addClass('close');//クラス名closeを付与し
        $(findElm).slideDown({
            start: function() {
                $(this).parents('.ac-tech').find('.ac-tech__index').css('border-radius','5px 5px 0 0');
            }
        });//アコーディオンを開く
    }
});

$(function(){
  var windowWidth = $(window).width();
  var headerHight = 50; 
  $('a[href^=#]').click(function() {
    console.log('てすと１');
  var speed = 1000;
  var href= jQuery(this).attr("href");
  var target = jQuery(href == "#" || href == "" ? 'html' : href);
  var position = target.offset().top-headerHight;
  console.log('てすと２');
  jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
  return false;
 });
});