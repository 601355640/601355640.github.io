define(['jquery'],function(){
	var box = $('.dragbox');
	var hid = $('.hid');
	var word = $('.word');
	var movecons = $('.movecons');
	var btn = $('.btn input');

	console.log(hid,movecons)
	var l = 0;
	movecons.mousedown(function(e){
		e.preventDefault();
		var lft = box.offset().left;
		
		console.log(lft);
		$(document).mousemove(function(e){
			l = e.pageX-lft-25;
			l = l<-1? -1 :(l>190? 190:l);
			hid.width(l);
			movecons.css('left',l);
			if(l>=190){
				movecons.off('mousedown');
				$(document).off('mousemove');
				hid.html('验证通过');
				hid.css('color','#fff') ;
				btn.css('background','#f60');
				btn.attr('disabled',false);
			}					
		})
		$(document).mouseup(function(){
			$(document).off('mousemove');
	
		})
	
		
		
	})
	
})