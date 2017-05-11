define(['jquery'],function(){
	var banner = {
		bannercon:$('.bannercon'),
		banner:$('.banner-wrap'),
		imgs:$('.img-wrap img'),
		btn:$('.btn'),
		items:$('.circle .item'),
		now:0,
		next:0,
		timer:null,
		init:function(){
			this.btnClick();
			this.autoPlay();
			this.enter();
			this.leave();
			this.circle();
			this.btnMouseenr();
			this.btnLeave();
		},
		btnClick:function(){
			var _this = this;
			this.btn.eq(1).click(function(){
				_this.next++;
				_this.next %= _this.imgs.length;
				_this.imgSwitch();

			});
			this.btn.eq(0).click(function(){
				_this.next--;
				if(_this.next<0){
					_this.next = _this.imgs.length-1;
				}
				_this.imgSwitch();

			});
		},
		btnMouseenr:function(){
			var _this = this;
			this.btn.mouseenter(function(){
				_this.btn.css({'opacity':'1'});
			})
		},
		btnLeave:function(){
			var _this = this;
			this.btn.mouseleave(function(){
				_this.btn.css({'opacity':'0.5'});
			})
		},
		autoPlay:function(){
			var _this = this;
			this.timer = setInterval(function(){
				_this.next++;
				_this.next %= _this.imgs.length;
				_this.imgSwitch();

			},2000)			
		},
		enter:function(){
			var _this = this;
			this.banner.mouseenter(function(){
				_this.btn.show();
				clearInterval(_this.timer);	

			})
		},
		leave:function(){
			var _this = this;
			this.banner.mouseleave(function(){
				_this.btn.hide();
				_this.autoPlay();	
			})
		},
		circle:function(){
			var _this = this;
			this.items.mouseenter(function(){
				_this.next = $(this).index();
				_this.imgSwitch();
			})
		},
		imgSwitch:function(){
			var color = this.imgs.eq(this.next).attr('data-color');
			this.imgs.eq(this.now).fadeTo(500,0);
			this.imgs.eq(this.next).fadeTo(500,1);
			this.bannercon.css('background-color',color);			
			this.items.removeClass('active');
			this.items.eq(this.next).addClass('active');
			this.now = this.next;
		}
	};
	banner.init();
})
	

