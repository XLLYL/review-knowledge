# [SASS 重点知识](https://www.sass.hk/docs/)

### 什么是SASS
> Sass 是一种 CSS 的预编译语言。它提供了 变量（variables）、嵌套（nested rules）、 混合（mixins）、 函数（functions）等功能，并且完全兼容 CSS 语法。Sass 能够帮助复杂的样式表更有条理， 并且易于在项目内部或跨项目共享设计。


### 在uniApp 中使用sass

```
   //安装loader支持编译scss文件 ,注意版本
	npm i --save-dev sass-loader@8.x	 
	npm i --save-dev node-sass@4.x	  

	//安装style-resources-loader 方便配置全局使用的SCSS文件
	npm i --save-dev style-resources-loader vue-cli-plugin-style-resources-loader

	//配置 vue.config.js 指定全局引入的scss
	const path = require('path')

	module.exports = {
	pluginOptions: {
		//使用vue-cli-plugin-style-resources-loader全局import scss文件,这是style-resources-loader的另一种实现方式
		'style-resources-loader': {
			'preProcessor': 'scss',
			'patterns': [
				path.resolve(__dirname, 'src/styles/sass/index.scss'),
			]
		}
	}
	}
```

在Vue中使用应该有另外的配置方法


### SASS变量

```
	//定义
	$font-mini-size:18rpx;
	$font-common-size:28rpx;
	
	//使用
	.myDiv{
		font-size:$font-mini-size;
	}
	
	//编译后
	.myDiv{
		font-size:18rpx;
	}
```


### SASS可以提供计算、函数功能
```
p {
	width: 1in + 8pt;
}

编译为

p {
	width: 1.111in; 
}

p {
	color: hsl(0, 100%, 50%);
}

编译为

p {
	color: #ff0000; 
}
```

### SASS的混合指令
能够传参，原理是拷贝了一份样式代码
```
	//定义混合指令
	@mixin text-all-center($height) {
		height: $height;
		line-height: $height;
		text-align: center;
	}
	
	//使用
	.myClass{
		@include text-all-center(32rpx);
		background:red;
	}
	//编译后
	.myClass{
		height: 32rpx;
		line-height: 32rpx;
		text-align: center;
		
		background:red;
	}
```

### SASS的延伸指令
主要用到并列选择器
```
	//使用延伸指令
	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	.error.intrusion {
	  background-image: url("/image/hacked.png");
	}
	.seriousError {
	  @extend .error;
	  border-width: 3px;
	}
	
	//编译后
	.error, .seriousError {
	  border: 1px #f00;
	  background-color: #fdd; }
	
	.error.intrusion, .seriousError.intrusion {
	  background-image: url("/image/hacked.png"); }
	
	.seriousError {
	  border-width: 3px; 
	}
```

### SASS控制指令 [参看文档理解](https://www.sass.hk/docs/)
控制指令是一种高级功能，日常编写过程中并不常用到，主要与混合指令 (mixin) 配合使用
1. @if 逻辑判断
2. @for @each @while 循环，作用各不同

### 我如何使用SASS开发CSS

1. 目录结构

> sass  
>> variable.scss -> scss变量 
>> combination.scss -> 样式组合  
>> module.scss -> 样式模块  
>> index.scss -> scss文件汇总  

2. 这些文件做什么

```
	//variable.scss 定义变量，主要根据UI规范汇总所有使用到的样式变量
	$font-mini-size:18rpx;
	$font-common-size:28rpx;
	
	//combination.scss 主要为了复用css代码
	//推荐使用支持传入变量并且清晰易懂的混合指令@mixin
	
	//@extend(延伸)有点继承的感觉，可以减少最终生成的css代码大小（编译为并列选择器）
	//但过分使用会使得CSS变得混乱难以维护，推荐在小范围内使用
	
	//定义混合指令
	@mixin text-all-center($height) {
		height: $height;
		line-height: $height;
		text-align: center;
	}
	
	//module.scss 可以理解为我们之前写的common.css，即全局CSS样式
	.levelCard{}
	.noneData{}
	
	//index.scss 汇总导入上面三个css文件，方便vue.config.js里全局导入
	
```

### SASS与LESS对比
[参考资料](https://www.cnblogs.com/wangpenghui522/p/5467560.html)