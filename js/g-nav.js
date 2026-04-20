$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
    $('body').toggleClass('bodyfix');//開いているページのスクロールを禁止
});

$("#g-nav a, main").click(function () {//ナビゲーションのリンクもしくはmainタグ内要素がクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
    $('body').removeClass('bodyfix');//開いているページのスクロール禁止を解除
});