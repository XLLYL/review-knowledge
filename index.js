var marked = require('marked')
var sassmd = require('./mdfloder/sass.md')
var webpackmd = require('./mdfloder/webpack面试题汇总.md')
var mpmd = require('./mdfloder/小程序.md')
let liNodes = document.getElementsByTagName('li')
for(let liNode of liNodes){
	liNode.onclick = () => {
	
		let mdStr;
		switch(liNode.dataset.type){
			case 'sass':
				mdStr = sassmd.default
				break;
			case 'mp':
				mdStr = webpackmd.default
				break;
			case 'webpack':
				mdStr = mpmd.default
				break;
		}
		
		var htmlStr = marked(mdStr)
		let mdNode = document.getElementById('mdContent')
		mdNode.innerHTML = htmlStr
	}
}