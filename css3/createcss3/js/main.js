var brcode = "";
var bscode = "";
var bgcode = "";
var brfirst = 1;

$(function(){
	
	$("input, select").change(function(){
		updateCode();
	});
	
	$("#aff-file").change(function() {
		$("#aff-form").submit();
		$("#aff-form").find('input:text, input:password, input:file, select, textarea').val('');
	});
	
	$("#br-div input").change(function(){
		if(brfirst) {
			var setall = $(this).val();
			$("#br-tl").val(setall);
			$("#br-tr").val(setall);
			$("#br-br").val(setall);
			$("#br-bl").val(setall);
			brfirst = 0;
		}
		updateCode();
	});
	
	$("input[type=checkbox]").change(function(){
		var id = $(this).attr("id");
		if($(this).is(':checked')) {
			$("#"+id+"-div").slideDown("fast");
			$(this).parent("li").addClass("active");
		} else {
			$("#"+id+"-div").slideUp("fast");
			$(this).parent("li").removeClass("active");
		}
		updateCode();
	});
	
	$("#bs-color-type").change(function(){
		if($(this).val() == "rgba") {
			$("#bs-color-div-hex").hide();
			$("#bs-color-div-rgba").show();
		} else {
			$("#bs-color-div-hex").show();
			$("#bs-color-div-rgba").hide();
		}
	});
	
	$("#ibs-color-type").change(function(){
		if($(this).val() == "rgba") {
			$("#ibs-color-div-hex").hide();
			$("#ibs-color-div-rgba").show();
		} else {
			$("#ibs-color-div-hex").show();
			$("#ibs-color-div-rgba").hide();
		}
	});
	
	$("#bg-color-type").change(function(){
		if($(this).val() == "rgba") {
			$(".bg-hex").hide();
			$(".bg-rgba").show();
		} else {
			$(".bg-hex").show();
			$(".bg-rgba").hide();
		}
	});
	
	$("#ts-color-type").change(function(){
		if($(this).val() == "rgba") {
			$("#ts-color-div-hex").hide();
			$("#ts-color-div-rgba").show();
		} else {
			$("#ts-color-div-hex").show();
			$("#ts-color-div-rgba").hide();
		}
	});
	
	$("#bg-type").change(function(){
		if($(this).val() == "linear-top") {
			$("#bgll-div, #bgr-div").hide();
			$("#bglt-div").show();
		} else if($(this).val() == "linear-left") {
			$("#bglt-div, #bgr-div").hide();
			$("#bgll-div").show();
		} else {
			$("#bgll-div, #bglt-div").hide();
			$("#bgr-div").show();
		}
	});
	
	resizeCodeArea()
	
	$(window).resize(function(){
		resizeCodeArea();
	});
});

function resizeCodeArea() {
	var wh = $(window).height()-75;
	var ww = $(window).width()-350;
	
	if(!$("#preview-in").is(":hidden")) wh -= 270;
		
	$("#code").height(wh);
	$("#preview").width(ww);
	$(".preview-toggle").css("right", (ww/2)-63);
}

function selectCheckbox(box) {
	var $checkbox = $("#"+box);
	$checkbox.attr('checked', !$checkbox.attr('checked'));
	if($checkbox.is(':checked')) {
		$("#"+box+"-div").show();
		$checkbox.parent().addClass("active");
	} else {
		$("#"+box+"-div").hide();
		$checkbox.parent().removeClass("active");
	}
	updateCode();
}

function togglePreview() {
	if($("#preview-in").is(":hidden")) {
		$("#preview-in").slideDown(250);
		//$("#preview").animate({ bottom: "0px" }, 250);
		resizeCodeArea();
	} else {
		$("#preview-in").slideUp(250, function(){
			resizeCodeArea();
		});
		//$("#preview").animate({ bottom: "-251px" }, 250);
	}
}

function addPrefix(value) {
	return "-webkit-"+value+";\n-moz-"+value+";\n-o-"+value+";\n-ms-"+value+";\n"+value+";\n";
}

function updateCode() {
	$("#ads-con .my-podcast").fadeOut(300);
	var code = "";
	var renderParentCode = "";
	var renderCode = "";
	
	// ----------------------------------------------------------------------- Backface Visibility
	if($("#bfv").is(':checked')) {
		var bfvcode = "";
		bfvcode = addPrefix("backface-visibility: "+$("#bfv-val").val());
		code += bfvcode;
	}
	
	// ----------------------------------------------------------------------- Background Gradient
	if($("#bg").is(':checked')) {
		if($("#bg-type").val() == "linear-top") {
		
			var top = "#"+$("#bglt-top").val();
			var bottom = "#"+$("#bglt-bottom").val();
			if($("#bg-color-type").val() == "rgba") {
				top = "rgba("+$("#bglt-top-r").val()+", "+$("#bglt-top-g").val()+", "+$("#bglt-top-b").val()+", "+$("#bglt-top-a").val()+")";
				bottom = "rgba("+$("#bglt-bottom-r").val()+", "+$("#bglt-bottom-g").val()+", "+$("#bglt-bottom-b").val()+", "+$("#bglt-bottom-a").val()+")";
			}
			
			bgcode = "background: -webkit-gradient(linear, left top, right top, from("+top+"), to("+bottom+"));\nbackground: -webkit-linear-gradient(top, "+top+", "+bottom+");\nbackground: -moz-linear-gradient(top, "+top+", "+bottom+");\nbackground: -o-linear-gradient(top, "+top+", "+bottom+");\nbackground: -ms-linear-gradient(top, "+top+", "+bottom+");\nbackground: linear-gradient(top, "+top+", "+bottom+");\nbackground-color: "+top+";\n";
			
		} else if($("#bg-type").val() == "linear-left") {
		
			var top = "#"+$("#bgll-left").val();
			var bottom = "#"+$("#bgll-right").val();
			if($("#bg-color-type").val() == "rgba") {
				top = "rgba("+$("#bgll-left-r").val()+", "+$("#bgll-left-g").val()+", "+$("#bgll-left-b").val()+", "+$("#bgll-left-a").val()+")";
				bottom = "rgba("+$("#bgll-right-r").val()+", "+$("#bgll-right-g").val()+", "+$("#bgll-right-b").val()+", "+$("#bgll-right-a").val()+")";
			}
			
			bgcode = "background: -webkit-gradient(linear, 0% 0%, 0% 100%, from("+top+"), to("+bottom+"));\nbackground: -webkit-linear-gradient(left, "+top+", "+bottom+");\nbackground: -moz-linear-gradient(left, "+top+", "+bottom+");\nbackground: -o-linear-gradient(left, "+top+", "+bottom+");\nbackground: -ms-linear-gradient(left, "+top+", "+bottom+");\nbackground: linear-gradient(left, "+top+", "+bottom+");\nbackground-color: "+top+";\n";
			
		} else if($("#bg-type").val() == "radial") {
		
			var top = "#"+$("#bgr-center").val();
			var bottom = "#"+$("#bgr-outer").val();
			if($("#bg-color-type").val() == "rgba") {
				top = "rgba("+$("#bgr-center-r").val()+", "+$("#bgr-center-g").val()+", "+$("#bgr-center-b").val()+", "+$("#bgr-center-a").val()+")";
				bottom = "rgba("+$("#bgr-outer-r").val()+", "+$("#bgr-outer-g").val()+", "+$("#bgr-outer-b").val()+", "+$("#bgr-outer-a").val()+")";
			}
			
			bgcode = "background: -webkit-gradient(radial, center center, 0, center center, 460, from("+top+"), to("+bottom+"));\nbackground: -webkit-radial-gradient(circle, "+top+", "+bottom+");\nbackground: -moz-radial-gradient(circle, "+top+", "+bottom+");\nbackground: -o-radial-gradient(circle, "+top+", "+bottom+");\nbackground: -ms-radial-gradient(circle, "+top+", "+bottom+");\nbackground: radial-gradient(circle, "+top+", "+bottom+");\nbackground-color: "+top+";\n";
			
		}
		
		code += bgcode;
		renderCode += bgcode;
	}
	
	// ----------------------------------------------------------------------- Border Radius
	if($("#br").is(':checked')) {
		brcode = "";
		var tl = $("#br-tl").val();
		var tr = $("#br-tr").val();
		var br = $("#br-br").val();
		var bl = $("#br-bl").val();
		if(tl == tr && tl == br && tl == bl) {
			$("#br-tr").val(tl);
			$("#br-br").val(tl);
			$("#br-bl").val(tl);
			brcode = addPrefix("border-radius: "+tl+"px");
		} else {
			brcode+= addPrefix("border-radius: "+tl+"px "+tr+"px "+br+"px "+bl+"px");
		}
		code += brcode;
		renderCode += brcode;
	}
	
	// ----------------------------------------------------------------------- Outer/Inner Box Shadow
	if($("#bs").is(':checked') || $("#ibs").is(':checked')) {
		var ox = $("#bs-x").val();
		var oy = $("#bs-y").val();
		var osize = $("#bs-size").val();
		var ocolor = "#"+$("#bs-color-hex").val();
		if($("#bs-color-type").val() == "rgba") {
			ocolor = "rgba("+$("#bs-color-r").val()+", "+$("#bs-color-g").val()+", "+$("#bs-color-b").val()+", "+$("#bs-color-a").val()+")"
		}
		
		var ix = $("#ibs-x").val();
		var iy = $("#ibs-y").val();
		var isize = $("#ibs-size").val();
		var icolor = "#"+$("#ibs-color-hex").val();
		if($("#ibs-color-type").val() == "rgba") {
			icolor = "rgba("+$("#ibs-color-r").val()+", "+$("#ibs-color-g").val()+", "+$("#ibs-color-b").val()+", "+$("#ibs-color-a").val()+")"
		}
		
		if($("#bs").is(':checked') && !$("#ibs").is(':checked')) {
			bscode = addPrefix("box-shadow: "+ox+"px "+oy+"px "+osize+"px "+ocolor);
		} else if(!$("#bs").is(':checked') && $("#ibs").is(':checked')) {
			bscode = addPrefix("box-shadow: inset "+ix+"px "+iy+"px "+isize+"px "+icolor);
		} else if($("#bs").is(':checked') && $("#ibs").is(':checked')) {
			bscode = addPrefix("box-shadow: "+ox+"px "+oy+"px "+osize+"px "+ocolor+", inset "+ix+"px "+iy+"px "+isize+"px "+icolor);
		}
		code += bscode;
		renderCode += bscode;
	}
	
	// ----------------------------------------------------------------------- Box Sizing
	if($("#boxsiz").is(':checked')) {
		var bxszcode = "";
		bxszcode = addPrefix("box-sizing: "+$("#boxsiz-val").val());
		
		code += bxszcode;
		renderCode += bxszcode;
	}
	
	// ----------------------------------------------------------------------- Columns
	if($("#colm").is(':checked')) {
		var colmcode = "";
		colmcode = addPrefix("column-count: "+$("#colm-num").val());
		colmcode += addPrefix("column-gap: "+$("#colm-gap").val()+"px");
		
		code += colmcode;
		renderCode += colmcode;
	}
	
	// ----------------------------------------------------------------------- Opacity
	if($("#op").is(':checked')) {
		var opacitycode = "";
		var opacity = $("#op-opacity").val();
		opacitycode = "filter: alpha(opacity="+Math.round(opacity*100)+");\nopacity: "+opacity+";\n";
		
		code += opacitycode;
		renderCode += opacitycode;
	}
	
	// ----------------------------------------------------------------------- Perspective
	if($("#per").is(':checked')) {
		var perspectivecode = "";
		perspectivecode = addPrefix("perspective: "+$("#per-px").val()+"px");
		
		code += perspectivecode;
		renderParentCode += perspectivecode;
	}
	
	// ----------------------------------------------------------------------- Perspective Origin
	if($("#pero").is(':checked')) {
		var perspectiveorigincode = "";
		perspectiveorigincode = addPrefix("perspective-origin: "+$("#pero-x").val()+$("#pero-x-t").val()+", "+$("#pero-y").val()+$("#pero-y-t").val());
		
		code += perspectiveorigincode;
		renderParentCode += perspectiveorigincode;
	}
	
	// ----------------------------------------------------------------------- Text Shadow
	if($("#ts").is(':checked')) {
		var x = $("#ts-x").val();
		var y = $("#ts-y").val();
		var size = $("#ts-size").val();
		var color = "#"+$("#ts-color-hex").val();
		if($("#ts-color-type").val() == "rgba") {
			color = "rgba("+$("#ts-color-r").val()+", "+$("#ts-color-g").val()+", "+$("#ts-color-b").val()+", "+$("#ts-color-a").val()+")"
		}
		
		bscode = "text-shadow: "+x+"px "+y+"px "+size+"px "+color+";\n";
		
		code += bscode;
		renderCode += bscode;
	}
	
	// ----------------------------------------------------------------------- Transform Origin
	if($("#tro").is(':checked')) {
		var trocode = "";
		trocode = addPrefix("transform-origin: "+$("#tro-x").val()+$("#tro-x-t").val()+" "+$("#tro-y").val()+$("#tro-y-t").val());
		
		code += trocode;
		renderCode += trocode;
	}
	
	// ----------------------------------------------------------------------- Transform Style
	if($("#trst").is(':checked')) {
		var trstcode = "";
		trstcode = addPrefix("transform-style: "+$("#trst-val").val());
		
		code += trstcode;
		renderCode += trstcode;
	}
			
	// ----------------------------------------------------------------------- Transform
	if($("#trap").is(':checked') || $("#tr").is(':checked') || $("#tr3d").is(':checked') || $("#tsc").is(':checked') || $("#tsc3d").is(':checked') || $("#tsk").is(':checked') || $("#ttr").is(':checked') || $("#ttr3d").is(':checked')) {
		var trancode = "";
		var tran = "";
		if($("#trap").is(':checked')) tran += " perspective("+$("#trap-px").val()+"px)";
		if($("#tr").is(':checked')) tran += " rotate("+$("#tr-deg").val()+"deg)";
		if($("#tr3d").is(':checked') && ($("#tr3d-x-on").is(':checked') || $("#tr3d-y-on").is(':checked') || $("#tr3d-z-on").is(':checked'))) {
			if($("#tr3d-x-on").is(':checked')) tran += " rotateX("+$("#tr3d-x-deg").val()+"deg)";
			if($("#tr3d-y-on").is(':checked')) tran += " rotateY("+$("#tr3d-y-deg").val()+"deg)";
			if($("#tr3d-z-on").is(':checked')) tran += " rotateZ("+$("#tr3d-z-deg").val()+"deg)";
		}
		if($("#tsc").is(':checked')) tran += " scale("+$("#tsc-size").val()+")";
		if($("#tsc3d").is(':checked')) tran += " scale3d("+$("#tsc3d-x").val()+", "+$("#tsc3d-y").val()+", "+$("#tsc3d-z").val()+")";
		if($("#tsk").is(':checked')) tran += " skew("+$("#tsk-x").val()+"deg, "+$("#tsk-y").val()+"deg)";
		if($("#ttr").is(':checked')) tran += " translate("+$("#ttr-x").val()+$("#ttr-x-t").val()+", "+$("#ttr-y").val()+$("#ttr-y-t").val()+")";
		if($("#ttr3d").is(':checked')) tran += " translate3d("+$("#ttr3d-x").val()+$("#ttr3d-x-t").val()+", "+$("#ttr3d-y").val()+$("#ttr3d-y-t").val()+", "+$("#ttr3d-z").val()+$("#ttr3d-z-t").val()+")";
		if(tran) trancode = addPrefix("transform:"+tran);
		
		code += trancode;
		renderCode += trancode;
	}
			
	// ----------------------------------------------------------------------- Transition
	if($("#tra").is(':checked')) {
		var transcode = "";
		transcode = addPrefix("transition: "+$("#tra-property").val()+" "+$("#tra-duration").val()+"s "+$("#tra-timing").val());
		
		code += transcode;
		renderCode += transcode;
	}
	
	$("#code").val(code);
	$("#preview-box").attr("style", renderCode);
	$("#preview-render").attr("style", renderParentCode);
}

/* ---- Ads ---- */
function hideAdvertisements() {
	$("#ads-con li").hide();
	$("#ads-con li.show").show();
	$("#ads-con .my-podcast").hide();
	$(".textarea-in").css("marginRight", "0px");
	setCookie("hideAds", "true", 14);
}

function showAdvertisements() {
	$("#ads-con li").show();
	$("#ads-con li.show").hide();
	if($("textarea").val() == "") $("#ads-con .my-podcast").fadeIn(300);
	$(".textarea-in").css("marginRight", "145px");
	setCookie("hideAds", "false", 1);
}

$(function() {
	$(".textarea-in").css("marginRight", "145px");
	if(getCookie("hideAds") == "true") hideAdvertisements();
});

function setCookie(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}