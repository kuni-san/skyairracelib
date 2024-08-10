//本家ページアコーディオン（コース詳細）をクリックした時の動作
$('.ac-course__index').on('click', function() {//タイトル要素をクリックしたら
    var findElm = $(this).next(".ac-course__contents");//直後のアコーディオンを行うエリアを取得し
    $(findElm).slideToggle();//アコーディオンの上下動作
      
    if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
      $(this).removeClass('close');//クラス名を除去し
    }else{//それ以外は
      $(this).addClass('close');//クラス名closeを付与
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

    // if ($element.is(':visible')) {
    //     $element.slideUp();
    // }
    // else {
    //     $element.slideDown({
    //         start: function() {
    //           $(this).css('display','grid');
    //         }
    //     });
    // }
  });