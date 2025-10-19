import React, { Component } from 'react';
import Pdfh5 from "pdfh5";
class Pdf extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="demo"></div>
		);
	}
	componentDidMount() {
		//实例化
		this.pdfh5 = new Pdfh5(document.querySelector("#demo"), {
			pdfurl: this.props.src,
			textLayer: true,
			workerSrc: "./pdf.worker.min.js",
			cMapUrl: './cmaps/',
			standardFontDataUrl: './standard_fonts/',
			iccUrl: './iccs/',
			wasmUrl: './wasm/'

		});
		//监听完成事件
		this.pdfh5.on("complete", function (status, msg, time) {
			console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum);
		});
	}
}
export default Pdf;