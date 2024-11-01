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
// $('.ac-tech__index').on('click', function() {//タイトル要素をクリックしたら
//     var findElm = $(this).next(".ac-tech__contents");//直後のアコーディオンを行うエリアを取得し
    
      
//     if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
//         $(this).removeClass('close');//クラス名を除去し
//         $(findElm).slideUp({
//           start: function() {
//               $(this).parents('.ac-tech').find('.ac-tech__index').css('border-radius','5px');
//           }
//       });//アコーディオンを閉じる
//     }else{//それ以外は
//         $(this).addClass('close');//クラス名closeを付与し
//         $(findElm).slideDown({
//             start: function() {
//                 $(this).parents('.ac-tech').find('.ac-tech__index').css('border-radius','5px 5px 0 0');
//             }
//         });//アコーディオンを開く
//     }
// });

$('.toranoko__tech-button').on('click', function() {
  $(this).hide();
  $(this).parents('.toranoko__tech-button-wrap').css('background-color', 'transparent').css('backdrop-filter', 'none').hide(1000);
});

// ページのURLを取得
var url = $(location).attr('href'),
// headerの高さを取得してそれに30px追加した値をheaderHeightに代入
headerHeight = $('header').outerHeight() + 20;
url_scroll();

//ページ内リンク時
$('a[href^="#"]').on('click', function(){
  console.log("ページ内リンク");
  console.log(headerHeight);
  url = $(this).attr('href');
  url_scroll();
});

function url_scroll(){
  // urlに「#」が含まれていれば
  if(url.indexOf("#") != -1){
    // urlを#で分割して配列に格納
    const anchor = url.split("#"),
    // 分割した最後の文字列（#◯◯の部分）をtargetに代入
    target_str = '#' + anchor[anchor.length - 1],
    target = $(target_str),
    // リンク先の位置からheaderHeightの高さを引いた値をpositionに代入
    position = Math.floor(target.offset().top) - headerHeight;
    // positionの位置に移動
    $("html, body").animate({scrollTop:position}, 500);
  }
}


//fixed要素を画面に追従させる
var navPos = $( '.common__fixed' ).offset().top // 追随要素の位置
var navHeight = $( '.common__fixed' ).outerHeight(); // 追随要素の高さ
$( window ).on( 'scroll', function() {
	if ( $( this ).scrollTop() > navPos ) {
		$( '.common__mural' ).css( 'padding-bottom', navHeight );//common__fixedが消えた分の空間を補完
		$( '.common__fixed' ).addClass( 'common__fixed--tab' );
	} else {
		$( '.common__mural' ).css( 'padding-bottom', 0 );
		$( '.common__fixed' ).removeClass( 'common__fixed--tab' );
	}
});

//tabアイコンを押したら中身のコンテンツがアクティブになるタグを付与
$('.common__fixed--tab-icon').on('click', function() {
  if($('.common__fixed').hasClass('common__fixed--tab-active')){//タイトル要素にクラス名common__fixed--tab-activeがあれば
      $('.common__fixed').removeClass('common__fixed--tab-active');
  }else{//それ以外は
      $('.common__fixed').addClass('common__fixed--tab-active');
  }
});

//mural-noを押したときtabをひっこめる
$('.toranoko__muralno-img').on('click', function() {
  if($('.common__fixed').hasClass('common__fixed--tab-active')){//タイトル要素にクラス名common__fixed--tab-activeがあれば
      $('.common__fixed').removeClass('common__fixed--tab-active');
  }
});