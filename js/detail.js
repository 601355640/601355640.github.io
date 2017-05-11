require(['config'],function(){
	require(['jquery','search','loupe','template','jquery.cookie','fly'],function($,serach,loupe,template,cookie,fly){

	//点击购物车 跳转到购物车页面
	var toCart = $('.pf-cart');
	toCart.click(function(){
		location.href='cart.html';
	})

	var detail = {
		data: {},
		init: function(){
			var _this = this;
			//读取商品数据 (如果json文件格式错误，获取失败)
			$.getJSON('json/detail.json',function(result){
				//console.log(result);
				//保留数据
				_this.data = result;

				var list = template('list',result);
				$('.t-imgs').html( list );
				//选中第一个
				var first = $('.g-imgs:first');
				first.addClass('active');
				//获取第一个分类的编号
				var id = first.data('id');
				$('.m-cxj .p-p').html( result.type[id].sale_price );
				$('.m-id .id-kc em').html( result.type[id].stock );
				$('.m-id .id-sp em').html( result.type[id].id );
				$('.m-title p').html(result.type[id].kind);
				$('.p-k i').html(result.g_price);
				$('.p-jf i').html(result.g_score);
			});

			this.typeSwitch();
			this.increase();
			this.decrease();
			this.input();
			this.addCart();
		},
		typeSwitch: function(){
			var _this = this;
			$('.t-imgs').on('click','.g-imgs',function(){
				$(this).addClass('active').siblings().removeClass('active');
				var id =$(this).data('id');
				$('.m-cxj .p-p').html( _this.data.type[id].sale_price );
				$('.m-id .id-kc em').html( _this.data.type[id].stock );
				$('.m-id .id-sp em').html( _this.data.type[id].id );
				$('.m-title p').html( _this.data.type[id].kind);
				$('.p-k i').html(_this.data.g_price);
				$('.p-jf i').html(_this.data.g_score);
			})
		},
		increase: function(){
			$('.btn-r').click(function(){
				var num = parseInt( $(this).prev().val() );
				var stock = parseInt( $('.m-id .id-kc em').html() );
				if(num >= stock) return;
				num++;
				$(this).prev().val( num );
			});
		},
		decrease: function(){
			$('.btn-l').click(function(){
				var num = parseInt( $(this).next().val() );
				//拿到当前的数量
				if(num <= 1) return;
				num--;
				$(this).next().val(num);
			});
		},
		input: function(){
			$('.number').on('input',function(){
				var num = $(this).val();
				if(num === '') return;
				num = parseInt( num );
				if( isNaN(num) ){
					num = 1;
				}

				//判断库存
				var stock = parseInt( $('.m-id .id-kc em').html() );
				if(num >= stock){
					num = stock;
				}
				$(this).val(num);
			});
			//失焦之后，如果内容为空，更改为1
			$('.number').blur(function(){
				var num = $(this).val();
				if(num === ''){
					 $(this).val(1);
				}
			});
		},
		addCart: function(){
			var _this = this;
			$('.m-cart .car-r').click(function(e){
				
				var selected = $('.g-imgs.active');
				var id = selected.data('id');
				var num = parseInt ( $('.number').val() );
				//console.log(num) ;
				var cart = $.cookie('kd-cart') || '{}';
				cart = JSON.parse(cart);
				if( !cart[id]){
					cart[id] = {
						id: id,
						num: num
					}
				}else {
					cart[id].num += num;
				}

				var src = $('.g-imgs.active img').clone();
				src.width(50);
				//console.log(src);
				var offset = $('.pf-cart').offset(), 
		       		 flyer = src,
		       		 scrollTop = $(document).scrollTop();
			    flyer.fly({
			        start: {
			            left: e.clientX,
			            top: e.clientY
			        },
			        end: {
			            left: offset.left,
			            top: offset.top-scrollTop,
			            width: 30,
			            height: 30
			        }
			    });

				//重写cookie
				$.cookie('kd-cart',JSON.stringify(cart),{expires: 365,path: '/'});

				console.log( JSON.parse($.cookie('kd-cart')) );

			})
		}
	}
	detail.init();


	});
});