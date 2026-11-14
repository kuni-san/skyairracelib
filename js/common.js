// ページのURLを取得
var url = $(location).attr('href'),
// headerの高さを取得してそれに30px追加した値をheaderHeightに代入
headerHeight = $('header').outerHeight() + 20;

//ページ内リンク時
$('a[href^="#"]').on('click', function(){
  url = $(this).attr('href');
});

//本家ページアコーディオン（コース詳細を見る）をクリックした時の動作
$('.ac-course__index').on('click', function() {//タイトル要素をクリックしたら
    var findElm = $(this).next(".ac-course__contents");//直後のアコーディオンを行うエリアを取得し
    $(findElm).slideDown();//アコーディオンの上下動作
    $(this).parent('.ac-course').find('.ac-course__index--close').removeClass('close');
      
    if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
      $(this).removeClass('close');//クラス名を除去し
    }else{//それ以外は
      $(this).addClass('close');//クラス名closeを付与
    }
  });
//本家ページアコーディオン（コース詳細を閉じる）もしくはコンテンツ内「閉じる」をクリックした時の動作
$('.ac-course__index--close, .toranoko__fixed-close').on('click', function() {//タイトル要素をクリックしたら
    var findElm = $(this).attr('class') == "ac-course__index--close" ? $(this).parents('.toranoko__wrap').find(".ac-course__contents") : $(this).parents(".ac-course__contents");//直後のアコーディオンを行うエリアを取得し
    console.log(findElm);
    $(findElm).slideUp();//アコーディオンの上下動作

    var elm = $(this).attr('class') == "ac-course__index--close" ? $(this) : $(this).parents('.toranoko__wrap').find('.ac-course__index--close');

    if(elm.hasClass('close')){//タイトル要素にクラス名closeがあれば
      elm.removeClass('close');//クラス名を除去し
    }else{//それ以外は
      elm.addClass('close');//クラス名closeを付与
      $(findElm).parent('.ac-course').find('.ac-course__index').removeClass('close');
    }

    var ac_target = $(this).parents('.toranoko__wrap').offset().top;
    // リンク先の位置からheaderHeightの高さを引いた値をpositionに代入
    var ac_position = Math.floor(ac_target) - headerHeight;
    // positionの位置に移動
    $("html, body").animate({scrollTop:ac_position}, 500);
  });

//テクニック紹介を「見る」ボタン押下時
$('.toranoko__tech-button').on('click', function() {
  $(this).hide();
  $(this).parents('.toranoko__tech-button-wrap').css('background-color', 'transparent').css('backdrop-filter', 'none').hide(1000);
});

//fixed要素を画面に追従させる
var navPos = $( '.common__fixed' ).offset().top // 追随要素の位置
var navHeight = $( '.common__fixed' ).outerHeight(); // 追随要素の高さ
$( window ).on( 'scroll', function() {
	if ( $( this ).scrollTop() > navPos ) {
		$( '.common__fixed' ).addClass( 'common__fixed--tab' );
	} else {
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

//画像をタップしたら動画を読み込ませる処理
function loadVideo(wrapper) {
  wrapper.removeAttribute('onclick'); // これ以降タップしても呼ばれなくなる

  const src = wrapper.dataset.src;

  const video = document.createElement('video');
  video.src = src;
  video.controls = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.preload = 'none';
  video.autoplay = true;
  video.className = 'video-wrapper-inner';

  video.addEventListener('error', () => {
    wrapper.setAttribute('onclick', 'loadVideo(this)');
  });

  wrapper.replaceChild(video, wrapper.firstElementChild);
  video.play();
}