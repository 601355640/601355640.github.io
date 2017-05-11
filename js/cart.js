require(['config'],function(){
	require(['jquery','jquery.cookie','template'],function($,cookie,template){
/*
 	1、读取cookie   readCookie
 	2、设置cookie   setCookie
 	3、将cookie中的数据渲染到页面上   initData
 	4、数量增加
 	5、数量减少
 	6、直接输入
 	7、删除 (单个删除  批量删除)
 	8、选中
 	9、结算信息填充
*/
	var cart = {
		cart: {},
		data: {},
		conGoods: $('.con-goods'),
		init: function(){
			var _this = this;
			this.readCookie();
			$.getJSON('../json/detail.json',function(data){
				//console.log(data);
				_this.data = data;
				var html = template('cart-list',{cart:_this.cart,data:_this.data});
				//console.log(html);
				$('.con-goods').html(html);

			});
			this.increase();
			this.decrease();
			this.input();
			this.delete();
			this.batchDelete();
			this.select();
			this.selectAll();
		},
		readCookie: function(){
			var cart = $.cookie('kd-cart') || '{}';
			this.cart = JSON.parse(cart);
		},
		setCookie: function(){
			$.cookie('kd-cart',JSON.stringify(this.cart),{expries: 365,parth: '/'})
		},
		//数量增加
		increase: function(){
			var _this = this;
			this.conGoods.on('click','.btn-r',function(){
				var amount = parseInt(  $(this).prev().val() );
				//获取库存
				var stock =parseInt( $(this).parent().data('stock') ) ;
				//console.log(stock);
				if(amount >= stock) return;
				amount++;
				$(this).prev().val(amount);

				_this.handleSubtotal( $(this), amount );
			});
		},
		//数量减少
		decrease: function(){
			var _this = this;
			this.conGoods.on('click','.btn-l',function(){
				var amount = parseInt( $(this).next().val() );
				if(amount <= 1) return;
				amount--;
				$(this).next().val(amount);
				_this.handleSubtotal( $(this), amount );
			});
		},
		//直接输入
		input: function(){
			var _this = this;
			this.conGoods.on('input','.text',function(){
				var amount = parseInt( $(this).val() );
				
				_this.handleSubtotal( $(this), amount );
			});
		},
		handleSubtotal: function(obj,amount){
			var money = amount * obj.parents('.cart-goods-item').find('.g-price').html();
			obj.parents('.cart-goods-item').find('.g-total').html( money.toFixed(2) );
			//重置cookie
			var id = obj.parents('.cart-goods-item').data('id');
			//console.log(id);
			this.cart[id].num = amount;
			this.setCookie();
			this.handleNum();	
		},
		delete:function(){
			var _this = this;
			this.conGoods.on('click','.g-delete',function(){
				if(confirm('确定删除宝贝吗？') ){
					$(this).parents('.cart-goods-item').remove();
					//从cookie删除
					var id = $(this).parents('.cart-goods-item').data('id');
					delete _this.cart[id];
					_this.setCookie();
					_this.handleNum();
				}
			});
		},
		batchDelete: function(){
			var _this = this;
			$('.options .delete').click(function(){
				var allChecked = _this.conGoods.find('input[type=checkbox]:checked');
				if(allChecked.length <= 0){
					alert('请选中商品');
					return;
				}
				if(confirm('确认删除选中的商品吗？')){
					allChecked.each(function(){
						$(this).parents('.cart-goods-item').remove();
					})
					var id = $(this).parents('.cart-goods-item').data('id');
					delete _this.cart[id];
					_this.setCookie();

					_this.handleNum();
					$('input.btn-all').prop('checked',false);
				}
			})
		},
		select: function(){
			var _this = this;
			this.conGoods.on('change','input[type=checkbox]',function(){

				_this.handleNum();

				//判断是否需要选中全选按钮
				var allChecked = _this.conGoods.find('input[type=checkbox]:checked');
				var allCheckBox = _this.conGoods.find('input[type=checkbox]');
				if(allChecked.length === allCheckBox.length){
					$('input.btn-all').prop('checked',true);
				}else{
					$('input.btn-all').prop('checked',false);
				}
			});
		},
		//全选按钮
		selectAll: function(){
			var _this = this;
			$('.btn-all').click(function(){
				var status = $(this).prop('checked');
				//手动给所有复选框添加选中状态
				_this.conGoods.find('input[type=checkbox]').prop('checked',status);
				_this.conGoods.find('input[type=checkbox]').change();

				$('.btn-all').prop('checked',status);
			})
		},
		handleNum : function(){
			var _this = this;
			var allChecked = _this.conGoods.find('input[type=checkbox]:checked');
			//console.log(allChecked);
			var totalNum = 0;
			var totalMoney = 0;
			//遍历选中的商品
			allChecked.each(function(){
				var id = $(this).parents('.cart-goods-item').data('id');
				totalNum += _this.cart[id].num;
				var m = $(this).parents('.cart-goods-item').find('.g-total').html();
				totalMoney += parseFloat( m );

			});
			if(totalNum > 0) {
				$('.to-pay').addClass('can-pay');
			}else{
				$('.to-pay').removeClass('can-pay');
			}
			$('.g-number span').html( totalNum );
			$('.m-spzj span').html( totalMoney.toFixed(2) );
			$('.pay-zj span').html( totalMoney.toFixed(2) );
		}
	}
	cart.init();

	});	
});