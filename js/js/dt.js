define(['jquery'],function(){
	// 创建选项卡类
	//最新动态选项卡
	var allCon = $('.dt-hd');
	$('.dt-nav span').mouseenter(function(){
		$(this).addClass('dt-active').siblings().removeClass('dt-active');
		allCon.eq( $(this).index() ).show().siblings().hide();
	});
	//秒杀区选项卡
	var allGoods = $('.ms');
	$('.ht-title div').mouseenter(function(){
		//处理选中状态
		$(this).addClass('active').siblings().removeClass('active');
		allGoods.eq( $(this).index() ).show().siblings().hide();
	});
	//门店选项卡
	var allTab = $('.tab-item-box .tab-item');
	$('.a-title .a-md span').mouseenter(function(){
		$(this).addClass('active').siblings().removeClass('active');
		allTab.eq( $(this).index() ).show().siblings().hide();

	});


	$('.tab-bottom .b-left div').mouseenter(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var item = $(this).parent().next().find(".info-item");
		var index = $(this).index();
		item.eq( index ).show().siblings().hide();
	});

	//评论区选项卡
	var questions = $('.l-nav-con .question');
	$('.dis-l-nav span').mouseenter(function(){
		$(this).addClass('active').siblings().removeClass('active');
		questions.eq( $(this).index() ).show().siblings().hide();
	})

	//关注我们选项卡
	var imgs = $('.r-img img');
	$('.r-btn div').mouseenter(function(){
		$(this).addClass('active').siblings().removeClass('active');
		imgs.eq( $(this).index() ).show().siblings().hide();
	})

})