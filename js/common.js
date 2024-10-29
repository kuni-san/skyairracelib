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

// ページのURLを取得
const url = $(location).attr('href'),
// headerの高さを取得してそれに30px追加した値をheaderHeightに代入
headerHeight = $('header').outerHeight() + 30;

// urlに「#」が含まれていれば
if(url.indexOf("#") != -1){
  // urlを#で分割して配列に格納
  const anchor = url.split("#"),
  // 分割した最後の文字列（#◯◯の部分）をtargetに代入
  target = $('#' + anchor[anchor.length - 1]),
  // リンク先の位置からheaderHeightの高さを引いた値をpositionに代入
  position = Math.floor(target.offset().top) - headerHeight;
  // positionの位置に移動
  $("html, body").animate({scrollTop:position}, 500);
}