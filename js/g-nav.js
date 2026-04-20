$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
    $('body').css('overflow', 'hidden');//開いているページのスクロールを禁止
    //高さ計算
    // $(document).ready(function () {
    //     hsize = $(window).height();　//window高さをセット
    //     $(".panelactive").css("height", hsize);
    // });
});

$("#g-nav a, main").click(function () {//ナビゲーションのリンクもしくはmainタグ内要素がクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
    $('body').css('overflow', 'initial');//開いているページのスクロールを禁止
});