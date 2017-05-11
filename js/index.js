/*
	入口文件
*/
require(['config'],function(){
	require(['jquery','banner','dt','template','floor','search','jquery.cookie'],function($,banner,dt,template,f,search,cookie){
		//1-3层楼
		$.getJSON('../json/1f-goods.json',function(data){
			var html = template('goods',{data:data});
			$('.content-top').html(html);

			f.init(); 

			// 左侧轮播
				var	imgWrap = $('.ban-img0'),
					btns = $('.ban-item0'),
					tmBans = $('.tm-ban0'),
					imgs = $('.ban-img0 img');
				lunbo(imgWrap,210,btns,tmBans,imgs);
				var	imgWrap1 = $('.ban-img1'),
					btns1 = $('.ban-item1'),
					tmBans1 = $('.tm-ban1'),
					imgs1 = $('.ban-img1 img');
				lunbo(imgWrap1,210,btns1,tmBans1,imgs1);
				var	imgWrap2 = $('.ban-img2'),
					btns2 = $('.ban-item2'),
					tmBans2 = $('.tm-ban2'),
					imgs2 = $('.ban-img2 img');
				lunbo(imgWrap2,210,btns2,tmBans2,imgs2);
				
			// 右侧轮播
				var banWrap = $('.imgwrap0'),
					items = $('.ul-ban0'),
					liBan = $('.li0'),
					img = $('.imgwrap0 img');
				lunbo(banWrap,490,items,liBan,img);
				var banWrap1 = $('.imgwrap1'),
					items1 = $('.ul-ban1'),
					liBan1 = $('.li1'),
					img1 = $('.imgwrap1 img');
				lunbo(banWrap1,490,items1,liBan1,img1);
				var banWrap2 = $('.imgwrap2'),
					items2 = $('.ul-ban2'),
					liBan2 = $('.li2'),
					img2 = $('.imgwrap2 img');
				lunbo(banWrap2,490,items2,liBan2,img2);
		});


		//4楼
		$.getJSON('../json/4f-goods.json',function(data){
			var html1 = template('goods',{data1:data});
			//console.log(data);
			$('.kj-bottom .4f-kj').html(html1);

			//轮播
			var f4imgWrap = $('.f4-wrap1'),
				f4Items = $('.f4-btn-item'),
				f4Kj = $('.f4-kj'),
				f4imgs = $('.f4-wrap1 img');
			lunbo(f4imgWrap,710,f4Items,f4Kj,f4imgs);

		});


		//5楼
		$.getJSON('../json/5f-goods.json',function(data){
			var html2 = template('goods',{data2:data});
			
			$('.kj-bottom .5f-kj').html(html2);

			var f5imgWrap = $('.f5-wrap1'),
				f5Items = $('.f5-btn-item'),
				f5Kj = $('.f5-kj'),
				f5imgs = $('.f5-wrap1 img');
			lunbo(f5imgWrap,710,f5Items,f5Kj,f5imgs);


		});

		//创建轮播类
		/*！
			luobo  轮播
			elem1  装图片的盒子
			width  图片的宽度
			elem2  小圆圈
			elem3  可视区域
			elem4  所有的图片
		*/

		function lunbo(elem1,width,elem2,elem3,elem4){
			var index = 0;
			var timer;
			autoPlay();
			function autoPlay(){
				timer = setInterval(function(){
					index++;
					imgSwitch();

				},2000);
			}
			elem2.mouseenter(function(){
				index = $(this).index();
				imgSwitch();
			});
			elem3.mouseenter(function(){
				clearInterval(timer);
			})
			elem3.mouseleave(function(){
				autoPlay();
			})

			function imgSwitch(){
				if(index >= elem4.length){
					index=0;
				}
				elem1.stop(true).animate({'marginLeft': -width*index });
				elem2.removeClass('active');
				elem2.eq(index).addClass('active');
			}

		};

		//读取cookie
		var userinfo = $.cookie('userinfo');
		if(userinfo){
			userinfo = JSON.parse(userinfo);
			if(userinfo.login_status){
				$('.login').html( userinfo.account + ',您好,<a href="javascript:;" class="logout">退出</a>' );
			}else{
				$('.login').html( userinfo.account + ',<a href="login.html">登录</a>,<a href="register.html">[免费注册]</a>' );
			}
		}
		//退出
		$('.logout').click(function(){
			var info = {
				account: userinfo.account,
				login_status: 0
			};
			$.cookie('userinfo',JSON.stringify(info),{expires: 365,path: '/'});
			location.href = "login.html";
		});

});
});	
