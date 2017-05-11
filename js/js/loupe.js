define(['jquery'],function(){
	var loupe = $('.loupe'),
		small = $('.small-img'),
		large = $('.large-img'),
		filter = $('.filter'),
		midImg = $('.small-img img'),
		largeImg = $('.large-img img');
	var ol = loupe.offset().left;
	var ot = loupe.offset().top;

	small.mousemove(function(e){
		//滤镜的位置
		var l = e.pageX - ol - 80;
		var t = e.pageY - ot - 80;
		//边界处理
		l = l < 0 ? 0 : (l > 240 ? 240 : l);
		t = t < 0 ? 0 : (t > 240 ? 240 : t);
		//更改滤镜位置
		filter.css({
			left:l,
			top:t
		});
		//更改大图的位置
		largeImg.css({
			left:-l*(400/160),
			top:-t*(400/160)
		}) 
	});
	//鼠标经过small显示滤镜和大图盒子
	small.mouseenter(function(){
		filter.show();
		large.show();
	})
	small.mouseleave(function(){
		filter.hide();
		large.hide();
	})

	//小图
	var imgs = $('.img-item img');
	var btnL = $('.lo-left i');
	var btnR = $('.lo-right i');
	var imgWrap = $('.img-wrap');
	imgs.mouseenter(function(){
		var url = $(this).attr('data-url');
		var src = $(this).attr('data-src');
		midImg.attr('src',url);
		largeImg.attr('src',src);
		$(this).parent().addClass('active').siblings().removeClass('active');
	})
	//变换小图片
	var index=0;
	btnR.click(function(){
		index++;
		if(index > imgs.length-5){
			index = imgs.length-5;
			return;
		}
		imgWrap.animate({marginLeft:-74*index},300);
	})
	btnL.click(function(){
		index--;
		if(index < 0){
			index = 0;
			return;
		}
		imgWrap.animate({marginLeft:-74*index},300);
	})
});
