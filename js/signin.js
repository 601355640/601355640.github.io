require(['config'],function(){
	require(['jquery','drag',],function($,drag){
		var txt = $('.text input');
		var psw = $('.psw1 input');
		var psw1 = $('.psw2 input');
		var input  =$ ('.f-top input');
		var btn = $('.btn input');
		var yz = $('.verify input');
		console.log(btn);

		var  regStatus = {
			uname: false,
			psw: false,
			yzm:false
		};

		input.blur(function(){
			$(this).css('color','#333');

		})
		input.focus(function(){
			$(this).css('color','#999');
			$(this).parent().next().html('');
		})
		// 验证用户名是否合法
		txt.blur(function(){
			var uname = txt.val();
			var reg1 = /^1[34578]\d{9}$/;
			var reg2 = /^[234567890a-zA-Z]+[a-zA-Z\d]{3,19}$/;
			regStatus.uname = true;
			if(uname.length<4 || uname.length>20){
				$('.hint1').html('账号长度在4至20个字符之间');
				regStatus.uname = false;
				return;
			}
			if(!reg1.test(uname) && !reg2.test(uname)){
				$('.hint1').html('账号名只能为手机号/第一位非数字1的字母数字组合');
				regStatus.uname = false;
				return;
			}

			//判断用户名是否存在
			$.ajax({
				url: 'http://10.9.151.199/PC-Project-Admin/checkAccount.php',
				data: {
					account: uname
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status){
						$('.hint1').html('用户名可用');
					}else{
						$('.hint1').html('用户名已存在');
						regStatus.uname = false;
					}
				}
			});
			
		});
		//验证密码是否合法
		psw.blur(function(){
			var pswd = psw.val();
			var reg = /^[a-zA-Z\d]{6,12}$/;
			regStatus.psw = true;
			if(!reg.test(pswd)){
				$('.hint2').html('密码由英文字母、数字组成,长度6-12位');
				regStatus.psw = false;
				return;
			}
		})
		//验证两次密码输入是否一致
		psw1.blur(function(){
			var pswd1 = psw1.val();
			regStatus.psw = true;
			if(pswd1 !== psw.val()){
				$('.hint3').html('两次密码输入不一致');
				regStatus.psw = false;
				return;
			}
		});
		//验证码是否输入正确
		yz.blur(function(){
			var y = yz.val();
			regStatus.yzm = true;
			var reg = /^[wW][sS][iI][fF]$/
			if(y === ''){
				$('.hint4').html('请输入验证码');
				regStatus.yzm = false;
				return;
			}
			if(!reg.test(y) ){
				$('.hint4').html('验证码不正确');
				regStatus.yzm = false;
			}

		})
		//提交注册
		btn.click(function(){
			//判断所有的信息状态，如果有不合法的，不能注册
			for(var i in regStatus){
				//如果找到某个输入不合法，做出相应的提示并返回
				if(!regStatus[i]){
					alert('部分数据不合法');
					return;
				}
			}

			//通过ajax提交表单数据
			$.ajax({
				type: 'post',
				url: 'http://10.9.151.199/PC-Project-Admin/register.php',
				data: {
					account: txt.val(),
					password: psw.val()
				},
				dataType: 'jsonp',
				success: function(result){
					if(result.status){
						alert('注册成功');
						location.href = 'login.html'
					}
				}
			});




		});


	});
});
