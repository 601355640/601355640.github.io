require(['config'],function(){
	require(['jquery','jquery.cookie'],function($){
		var ts = $('.tishi');
		var ck = $('.lgauto');
		var txt = $('.account');
		var psw = $('.psw');
		var txtero = $('.txtero');
		var pswero = $('.pswero');
		ck.click(function(){
			if(ck.prop('checked')){

				ts.show();
			}else{
				ts.hide();
			}
		});
		
		$('.c-right input').focus(function(){
			txtero.hide();
			pswero.hide();
			txt.css('border','1px solid #ccc');
			psw.css('border','1px solid #ccc');
		});

		$('.btncon').click(function(){
			
			if(txt.val()===''){
				txtero.show();
				txtero.html('请输入账号');
				txt.css('border','1px solid #f60');
				return;
			}
			if(psw.val()===''){
				pswero.show();
				pswero.html('请输入密码');
				psw.css('border','1px solid #f60');
				return;
			}
		
			//使用ajax进行登录
			$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/login.php',
				data: {
					account: txt.val(),
					password: psw.val()
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status) {

							var userinfo = {
								account: txt.val(),
								login_status: 1
							};
							$.cookie('userinfo',JSON.stringify(userinfo),{expires: 180,path: '/'});						
						//跳转到首页				
						location.href = 'index.html';
					}else{
							txtero.show()
							txtero.html('用户名不存在或者密码错误');
					}
				}
			});
		});
	})
})