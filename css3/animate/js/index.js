// JavaScript Document
$(function(){
	var check=[0,0,0];
    var LabDemo={
	    init:function(){
		    this.selectType();
			this.addSite();
			this.ajaxPage();
			this.footPosition();
			this.changeCheckValue();
			
		},
		//选择站点类型
		selectType:function(){
		    $("#selectType").click(function(){
			    $(this).find("ul").slideDown();
			});
			$("#selectType ul li").click(function(e){
			    $(this).addClass("selected");
				$(this).siblings().removeClass("selected");
				$("#selectType span").attr("value",$(this).text()).text($(this).text());
				$(this).parent().hide();
				$(this).parent().parent().removeAttr("style");
				check[2]=1;
				e.stopPropagation();
			});
			$(document).click(function(e){
			    if(!$(e.target).isChildAndSelfOf(".mod_select")){
					$("#selectType ul").hide();
				}
			});
		},
		changeCheckValue:function(){
		    var urlReg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
			$("#siteName").bind("blur",function(){
				if($(this).val()){
					if($(this).val().length<=40){
						$(this).removeAttr("style");
						check[0]=1;
					}else{
						$(this).css("border-color","red");
						check[0]=0;
					}
				}else{
				    check[0]=0;
				}
			});
			$("#siteUrl").bind("blur",function(){
				if($(this).val()){
					if(urlReg.test($(this).val())){
						$(this).removeAttr("style");
						check[1]=1;
					}else{
						$(this).css("border-color","red");
						check[1]=0;
					}
				}else{
				    check[1]=0;
				}
			});
		},
		//添加案例站点
		addSite:function(){
			$("#close").click(function(){
			    $("#pop").hide();
				return false;
			});
			$("#btn_add").click(function(){
				var s=0;
		        var siteName=$("#siteName").val();
				var siteUrl=$("#siteUrl").val();
				var siteImg=$("#siteImg").val();
				var offset=$(this).offset();
				var siteType=$("#selectType>span").attr("value");
				if(siteType){
					check[2]=1;
				}else{
				    check[2]=0;
				};
				var date=new Date();
				var addTime=date.getTime();
				for(var i=0;i<check.length;i++){
					s=s+check[i];
			    };
				var timeoutId;
				if(s==check.length){ 
				    clearTimeout(timeoutId)
					$.ajax({
						type:"post",
						url:"php/add.php",
						data:{
							"action":"add",
							"siteName":siteName,
						    "siteUrl":siteUrl,
							"siteType":siteType,
							"addTime":addTime
						},
						success:function(data){
							//console.info(data);
							var _html="";
							if(data==1){
								_html+='<div class="big">\
											<i class="icon_success"></i>\
											<h4>案例提交成功</h4>\
											<p>感谢您的提交，我们将尽快审核</p>\
										</div>';
								
								
							}else if(data==0){
							    _html+='<div class="big">\
											<i class="icon_error"></i>\
											<h4>案例提交失败</h4>\
											<p>该案例已经存在，感谢您的支持</p>\
										</div>';
							}else{
							    _html+='<div class="big">\
											<i class="icon_error"></i>\
											<h4>案例提交失败</h4>\
											<p>网络错误，感谢您的支持</p>\
										</div>';
							}
							$("#pop>.inner").html(_html);
							$("#pop").show();
							$("#siteName").val("");
							$("#siteUrl").val("");
							/*$("#siteImg").val("").attr("placeholder","缩略图");*/
							timeoutId=setTimeout(function(){
								$("#pop").hide();
							},3000);
							check=[0,0,0],s=1;
						},
						fail:function(err){
							console.info(err);
						}
					})
				}else{
				    if(!check[0]){
						$("#siteName").css("border-color","red");
					}
					if(!check[1]){
						$("#siteUrl").css("border-color","red");
					}
					if(!check[2]){
						$("#selectType").css("border-color","red");
					}
				}
			});
		},
		
		ajaxPage:function(){
			var url=location.href;
            var arr=url.split('=');
			var npage=arr[1];
			if(!npage)npage=1;
			url_go(npage);
			var self=this;
			function url_go(page){
				$.ajax({
					   type: "POST",
					   url: "php/get.php",
					   dataType:'json',
					   data: "page="+page,
					   success: function(msg){
					       var data=msg.page_content.split("$-$");
						   for(var i=0;i<data.length;i++){
							  if(data[i]!=""){
								 data[i]=data[i].split(",");
							  }
						   };
						   
						   var _html="<ul>";
						   for(var i=0;i<data.length-1;i++){
							  if(data[i]){
								 if(!data[i][2]){
									data[i][2]="http://tacs.oa.com/img.php?205x205";
								 }else{
									data[i][2]="upload/"+data[i][2];
								 }
							  }
							  _html+='<li>\
						<p class="cover"><a href='+data[i][1]+'  target="_blank"><img src='+data[i][2]+' alt="'+data[i][0].replace(/</g, "&lt;").replace(/>/g, "&gt;")+'"></a></p>\
						<p class="name"><a href='+data[i][1]+' target="_blank" target="_blank">'+data[i][0].replace(/</g, "&lt;").replace(/>/g, "&gt;")+'</a></p>\
					</li>';
						   };
						   
					       _html+="</ul>";
						   
						   var _linkhtml="";
						   for(var k=1;k<=parseInt(msg.page_list);k++){
							   if(k==page){
						           _linkhtml+='<a href="?page='+k+'" class="cur">'+k+'</a>';
							   }else{
							       _linkhtml+='<a href="?page='+k+'">'+k+'</a>';
							   }
						   }
						   $("#urlList").html(_html);
						   $("#pagelist").html(_linkhtml);
						   self.footPosition();
					   }
					}); 
				
			};
			$("#pagelist").find("a").live("click",function(){
				var page=$(this).index()+1;
				url_go(page);
				var arr2=arr[0].split('?');
				window.location=arr2[0]+'?page='+page;
			    return false;
			});
		},
		footPosition:function(){
			function autoPos(){
				var bodyHeight=$("body").height();
				var docHeight=$(document).height();
				if(bodyHeight<docHeight){
					$(".mod_footer").css({
					    "position":"fixed",
						"bottom":0
					});
				}else{
				    $(".mod_footer").css({
					    "position":"static"
					});
				}
			};
			autoPos();
			$(window).resize(function(e) {
                autoPos();
            });
		}
	};
	LabDemo.init();
	jQuery.fn.isChildAndSelfOf = function(b){
		return (this.closest(b).length > 0);
	};
	function getLocalTime(nS) {//时间戳转换成日期格式    
	   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
	};
	
	function SetCookie(name,value)
	{
			var Days = 1;
			var exp  = new Date();
			exp.setTime(exp.getTime() + Days*24*60*60*1000);
			document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	};
	function getCookie(name)
	{
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			 if(arr != null) return unescape(arr[2]); return null;

	};
	
})