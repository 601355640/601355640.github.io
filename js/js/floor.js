define(['jquery'],function(){
	function handlefloor(){
		var floorItem = $('.container .floor-item');
		var navItem = $('.pf-left .pf-item');
		//console.log(navItem);
		var nav = $('.pf-left');
		var returnTop = $('.returnTop');
		//console.log(returnTop);
		var ch = document.documentElement.clientHeight;
		$(window).scroll(function(){
			var scrollT = $('body').scrollTop();
			var t = floorItem.first().offset().top;
			//console.log(scrollT);
			if(scrollT > t-ch/2){
				nav.fadeIn(300);
				returnTop.fadeIn(300);
			}else{
				nav.fadeOut(300);
				returnTop.fadeOut(300);
			}

		});
		navItem.click(function(){
			var index = $(this).index();
			console.log(floorItem);
			var t = floorItem.eq(index).offset().top - 30;
			$('html,body').animate({
				scrollTop:t
			});
		});
		returnTop.click(function(){
		
				$('html,body').animate({
					scrollTop:0
				},500);
			
		})
	}

	return {
		init: handlefloor
	};

})