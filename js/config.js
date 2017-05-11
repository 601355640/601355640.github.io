/*
	配置文件
*/
require.config({
	paths : {
		'jquery' : 'lib/jquery-1.11.3',
		'banner' : 'js/banner',
		'dt':'js/dt',
		'template':'plug/template',
		'floor':'js/floor',
		'search':'js/search',
		'drag':'js/drag',
		'jquery.cookie': 'plug/jquery.cookie',
		'loupe':'js/loupe',
		'fly':'plug/jquery.fly'

	},
	shim: {
		"jquery.cookie": ['jquery'],
		"fly":['jquery']
	}
})