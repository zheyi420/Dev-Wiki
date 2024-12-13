- https://www.khronos.org/webgl/
- [WebGL Fundamentals](https://webglfundamentals.org/) 
- [WebGL2 Fundamentals](https://webgl2fundamentals.org/) 
- [MDN - WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) 


# Availability

## Checking

- **访问测试网站** https://get.webgl.org/
	- https://get.webgl.org/get-a-webgl-implementation/

- **使用 WebGL Report** https://webglreport.com/
	- 访问 WebGL Report。该网站会详细列出你的浏览器对 WebGL 1 和 WebGL 2 的支持情况，显示结果包括是否支持以及具体的版本信息。

- **JavaScript 检测方法**
	你可以使用以下 JavaScript 代码在浏览器控制台中运行，以判断是否支持 WebGL。
	```js
	function checkWebGLSupport() {
	    const canvas = document.createElement('canvas');
	    
	    // 检查 WebGL 1 支持
	    const gl1 = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	    const supportsWebGL1 = !!gl1;
	    
	    // 检查 WebGL 2 支持
	    const gl2 = canvas.getContext('webgl2');
	    const supportsWebGL2 = !!gl2;
	    
	    if (supportsWebGL1) {
	        console.log('您的设备支持 WebGL 1.0');
	    } else {
	        console.log('您的设备不支持 WebGL 1.0');
	    }
		
	    if (supportsWebGL2) {
	        console.log('您的设备支持 WebGL 2.0');
	    } else {
	        console.log('您的设备不支持 WebGL 2.0');
	    }
	}
	
	// 调用函数进行检查
	checkWebGLSupport();
	```

## Broswer
- Chrome: `chrome://gpu/`
- Firefox: `about:config`
