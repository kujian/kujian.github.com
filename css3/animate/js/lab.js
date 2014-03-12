$(function(){
	var lab={
		init:function(){
			this.setTextareaCode();
			this.getHtml();
			this.editCode();
			this.runDemo();	
			this.copy();
			this.openNewWindow();
		},
		
		getHtml:function(){
			var self=this;
			$("#menu").find("a").click(function(){
				var url=$(this).attr("href");
				$(".menu_scroll a").removeClass("hover");
				$(this).addClass("hover");
				$("#ajaxHtml").load(url+' #loadHtml',function(response, status, xhr){
					if(status=="error"){
						$("#ajaxHtml").html("页面不存在");
					}
					var href=window.location.href;
					var arr=href.split("?");
					
					self.setTextareaCode();
					$.SyntaxHighlighter.init();
					self.runDemo();
					self.editCode();
					self.copy();
			        self.openNewWindow();
					window.history.pushState("", "", arr[0]+"?"+url.slice(15,url.length-5));
				});
				
				return false;
			});
		},
		//iframe高度自适应
		getIframeHeight:function(obj){
			var win=obj;
			if(document.getElementById){
				if(win&&!window.opera){
					if(win.contentDocument && win.contentDocument.body.offsetHeight){ 
						win.height = win.contentDocument.body.offsetHeight; 
					}else if(win.Document && win.Document.body.scrollHeight){
						win.height = win.Document.body.scrollHeight;
					}
				}
			}
		},
		setIframeHeight:function(){
			var self=this;
			$("#code_window").load(function(e) {
				self.getIframeHeight($(this)[0]);
			});
		},
		//运行实例
		runDemo:function(){
			$("#run_demo").click(function(){
				var cssCode="<style>"+$("#css_code").val()+"</style>";
				var htmlCode=$("#html_code").val();
				var mod_run_code=$("#mod_run_code");
				var mod_run_box=$("#mod_run_box");
				var mask=$("#mask");
				if(top.window!=window){
					mod_run_code=$(top.window.document.body).find("#mod_run_code");
					mod_run_box=$(top.window.document.body).find("#mod_run_box");
					mask=$(top.window.document.body).find("#mask");
				}
				mod_run_code.html(cssCode+htmlCode);
				//alert(mod_run_box.height());
				mod_run_box.css("margin-top",-(mod_run_box.height()+24)/2).slideDown(200);
				mask.show();
			});
		},
		//设置文本框代码，用于编辑
		setTextareaCode:function(){
			$(".code_textarea").each(function(index, element) {
				var val=$(this).next("pre").text();
				if($(this).attr("id")=="html_code"){
					val=val.replace(/&lt;/g,"<").replace(/&gt;/g,">");
				}
				$(this).val(val);
			});
		},
		//编辑代码，关闭实例
		editCode:function(){
			var mod_run_code=$("#mod_run_code");
			var mod_run_box=$("#mod_run_box");
			var mask=$("#mask");
			var css_code_edit=$("#css_code_edit");
			var html_code_edit=$("#html_code_edit");
			var edit_code_box=$("#edit_code_box");
			var css_code=$("#css_code").val();
			var html_code=$("#html_code").val();
			if(top.window!=window){
				mod_run_code=$(top.window.document.body).find("#mod_run_code");
				mod_run_box=$(top.window.document.body).find("#mod_run_box");
				mask=$(top.window.document.body).find("#mask");
				css_code_edit=$(top.window.document.body).find("#css_code_edit");
				html_code_edit=$(top.window.document.body).find("#html_code_edit");
				edit_code_box=$(top.window.document.body).find("#edit_code_box");
			}
			$("#edit").click(function(){
				if($("#code_window").attr("id")){
					css_code=$(window.frames["code_window"].document).find("#css_code").val();
					html_code=$(window.frames["code_window"].document).find("#html_code").val();	
				}
				css_code_edit.val(css_code);
				html_code_edit.val(html_code);
				edit_code_box.slideDown(200);
				mod_run_box.css("margin-top",-(mod_run_box.height()+174)/2);
				return false;
			});
			$("#run_again").click(function(){
				mod_run_code.html("<style>"+css_code_edit.val()+"</style>"+html_code_edit.val());
				mod_run_box.slideDown(200);
				mask.show();
				return false;
			});
			$("#close").click(function(){
				mod_run_code.html("");
				mod_run_box.hide();
				edit_code_box.hide();
				mask.hide();
				css_code_edit.val("");
				html_code_edit.val("");
				return false;
			});
		},
		copy:function(){
			var clip;
			$("#c_flash").remove();
			clip = new ZeroClipboard.Client();
			clip.setHandCursor(true);
			$(".mod_copy").mouseover( function() {
				var txt = "";
				var input = $(this).next("textarea");
				txt = $.trim(input.val());
				clip.setText( txt );				
				if (clip.div) {
					clip.receiveEvent('mouseout', null);
					clip.reposition(this);
				}
				else clip.glue(this);
				$("#c_flash").css({
				    "top":$(this).offset().top,
					"left":$(this).offset().left,
					"display":"block"
				})
				clip.receiveEvent('mouseover', null);
			} );
			clip.addEventListener('complete', function (client, text) {
				$("#js_gui_suc").removeClass("hidden");
				setTimeout(function(){
					$("#js_gui_suc").addClass("hidden");
				},1000)
			});
		},
		openNewWindow:function(){
			$("#run_demo_new").click(function(){
				var winExample=window.open();
				var _html='<!DOCTYPE HTML>\
							<html>\
							<head>\
							<meta charset="utf-8">\
							<title>实例</title>\
							</head>\
							<body>\
							<style type="text/css">';
							_html+='.demo_box{border:1px solid #3DA5DC;background:#a4dcf9;height:100px;width:200px; text-align:center;color:#fff; }';
				_html+=$("#css_code").val();				
				_html+='</style>';
				_html+=$("#html_code").val();
				_html+='</body>\
				        </html>';
				winExample.document.write(_html);
				return false;
			});
		}
	}
	lab.init();
	function pageLoad(){
		var href=window.location.href;
		var arr=href.split("?");
		if(!arr[1]){
		    arr[1]="transform";
		};
		$("#ajaxHtml").load('html/animation/'+arr[1]+'.html #loadHtml',function(response, status, xhr){
			if(status=="error"){
				$("#ajaxHtml").html("页面不存在");
			}
			lab.setTextareaCode();
			$.SyntaxHighlighter.init();
			lab.runDemo();
			lab.editCode();
			lab.copy();
			lab.openNewWindow();
		});
		$(".menu_scroll li").each(function(index, element) {
            var url=$(this).children("a").attr("href");
			url=url.slice(15,url.length-5);
			if(url==arr[1]){
				$(".menu_scroll li").children("a").removeClass("hover");
			    $(this).children("a").addClass("hover");
				//console.info(url);
			}
        });
	};
	pageLoad();
	//复制代码
	//var clip=null;
	
});