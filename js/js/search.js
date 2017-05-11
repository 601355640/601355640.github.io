define(['jquery'],function(){
	var txt = $('.s-left .txt');
	var btn = $('.s-right .submit');
	var content =$('.s-content');
	txt.bind('input propertychange',function(){
		$.ajax({
			url:'http://suggestion.baidu.com/su?',
			data:{
				wd:txt.val()
			},
			dataType:'jsonp',
			jsonp:'cb',
			success:function(data){
				var data = data.s;
				var con = '';
				if(txt.val()!=0 & data!=''){
					for(var i = 0;i<data.length;i++){
						con += `<p class="ser-item">${data[i]}</p>`;
					}
					content.html(con);
				}else{
					content.html('');
				};
				$('.s-content p').click(function(){
					txt.val( $(this).html() ) ;
					content.html('');
				});
				btn.click (function(){
					location.href = 'https://www.baidu.com/s?wd='+txt.val();
					txt.val('');
				});

			}
		});
	});


	txt.click(function(e){
		e.stopPropagation();
		content.show();			
	});
	$(document).click(function(e){
		if( !$(e.target).is('.s-content,.s-content *') ){
			content.hide(); 
		}
	});

	
})
