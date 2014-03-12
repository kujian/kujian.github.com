// JavaScript Document
$(function(){
	var canvas = document.getElementById("curve"),
	ctx = canvas.getContext("2d"),
	supportsTouch = ("createTouch" in document),
	timeVal = 500;
	function BezierHandle(a, b) {
		this.x = a;
		this.y = b;
		this.width = 12;
		this.height = 12;
	}
	BezierHandle.prototype = {
		getSides: function() {
			this.left = this.x - (this.width / 2);
			this.right = this.left + this.width;
			this.top = this.y - (this.height / 2);
			this.bottom = this.top + this.height;
		},
		draw: function() {
			this.getSides();
			ctx.fillStyle = "#222";
			ctx.fillRect(this.left, this.top, this.width, this.height);
		}
	};
	var handles = [new BezierHandle(50, 280), new BezierHandle(150, 180)];
	function Graph() {
		this.x = 0;
		this.y = 130;
		this.height = 200;
		this.width = 200;
	}
	Graph.prototype = {
		draw: function() {
			ctx.save();
			ctx.fillStyle = "#fff";
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.strokeStyle = "#666";
			ctx.lineWidth = 1;
			ctx.strokeRect(this.x + 0.5, this.y - 0.5, this.width - 1, this.height);
			ctx.restore();
		}
	};
	var graph = new Graph();
	function getPos(c) {
		var b = c.pageX - getOffSet(c.target).left,
		a = c.pageY - getOffSet(c.target).top;
		return {
			x: b,
			y: a
		};
	}
	function getOffSet(a) {
		var b = curtop = 0;
		if (a.offsetParent) {
			do {
				b += a.offsetLeft;
				curtop += a.offsetTop;
			}
			while (a = a.offsetParent);
			return {
				left: b,
				top: curtop
			};
		}
	}
	var drag = false,
	draggingObj,
	oldX,
	oldY;
	function onPress(a) {
		a.preventDefault();
		a.stopPropagation();
		var m = supportsTouch ? a.touches[0] : a;
		var b = getPos(m),
		l = b.x,
		j = b.y;
		for (var f = 0; f < handles.length; f++) {
			var h = handles[f],
			d = h.left,
			e = h.right,
			c = h.top,
			k = h.bottom;
			if (supportsTouch) {
				d -= 20;
				e += 20;
				c -= 20;
				k += 20;
			}
			if (l >= d && l <= e && j >= c && j <= k) {
				draggingObj = h;
				oldX = a.pageX;
				oldY = a.pageY;
				var g = $("#presets option:selected");
				g.removeAttr("selected").parent().parent().find("option").last().attr("selected", "selected");
				document.addEventListener("mouseup", onRelease, false);
				document.addEventListener("touchend", touchEnd, false);
				document.addEventListener("mousemove", onMove, false);
				document.addEventListener("touchmove", touchMove, false);
				document.body.style.cursor = canvas.style.cursor = "move";
			}
		}
	}
	function onMove(c) {
		var b = supportsTouch ? c.touches[0] : c;
		var a = b.pageX - getOffSet(canvas).left,
		d = b.pageY - getOffSet(canvas).top;
		if (a > graph.width) {
			a = graph.width;
		}
		if (a < 0) {
			a = 0;
		}
		if (d > canvas.height) {
			d = canvas.height;
		}
		if (d < 0) {
			d = 0;
		}
		draggingObj.x = a;
		draggingObj.y = d;
		updateDrawing();
	}
	function touchMove(a) {
		onMove(a);
		a.preventDefault();
	}
	function onRelease(a) {
		drag = false;
		canvas.style.cursor = "pointer";
		document.body.style.cursor = "default";
		document.removeEventListener("mousemove", onMove, false);
		document.removeEventListener("touchmove", touchMove, false);
		document.removeEventListener("mouseup", onRelease, false);
		document.removeEventListener("touchend", touchEnd, false);
	}
	function touchEnd(a) {
		onRelease(a);
		a.preventDefault();
	}
	canvas.addEventListener("mousedown", onPress, false);
	canvas.addEventListener("touchstart", 
	function touchPress(a) {
		onPress(a);
		a.preventDefault();
	},
	false);
	function updateDrawing() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		graph.draw();
		var f = handles[0],
		e = handles[1];
		ctx.save();
		ctx.strokeStyle = "#4C84D3";
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(graph.x, graph.y + graph.height);
		ctx.bezierCurveTo(f.x, f.y, e.x, e.y, graph.width, graph.y);
		ctx.stroke();
		ctx.restore();
		ctx.strokeStyle = "#f00";
		ctx.beginPath();
		ctx.moveTo(graph.x, graph.y + graph.height);
		ctx.lineTo(f.x, f.y);
		ctx.moveTo(graph.width, graph.y);
		ctx.lineTo(e.x, e.y);
		ctx.stroke();
		for (var g = 0; g < handles.length; g++) {
			handles[g].draw();
		}
		var b = (f.x / graph.width).toFixed(3),
		k = ((graph.height + graph.y - f.y) / graph.height).toFixed(3),
		a = (e.x / canvas.width).toFixed(3),
		j = ((graph.height + graph.y - e.y) / graph.height).toFixed(3),
		o = "(" + b + ", " + k + ", " + a + ", " + j + ")",
		c = "cubic-bezier" + o,
		d = $("#presets option:selected").text();
		if (d.indexOf("custom") > -1) {
			d = "custom";
		}
		if (k > 1 || k < 0 || j > 1 || j < 0) {
			var m = k,
			l = j;
			if (k > 1) {
				m = 1;
			}
			if (k < 0) {
				m = 0;
			}
			if (j > 1) {
				l = 1;
			}
			if (j < 0) {
				l = 0;
			}
		}
		$("#cubic").text(c).attr("value",c);
		$("#cubic_2").text(c).attr("value",c);
	}
	function presetChange() {
		var c = this.value.split(","),
		b = handles[0],
		a = handles[1];
		b.x = c[0] * graph.width;
		b.y = graph.y + graph.height - (c[1] * graph.height);
		a.x = c[2] * graph.width;
		a.y = graph.y + graph.height - (c[3] * graph.height);
		updateDrawing();
	}
	var $presets = $("#presets"),
	$presetOpts = $("#presets option");
	$presets.change(presetChange);
	$presets.trigger("change");
});