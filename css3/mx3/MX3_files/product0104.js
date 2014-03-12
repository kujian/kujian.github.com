try{
	jM('moreProduct').panel('prodct_nav');
} catch(E){}
function selectSmallPic(picId,imgUrl,pidPath) {
	$("#bigImg")[0].src=imgUrl+pidPath;
	var tempSrc = $(".pj_s_pic_bg").find('img')[0].src;
	var tempOpList = tempSrc.split("/");
	var pic_fileName = tempOpList[tempOpList.length-1];
	$(".pj_s_pic_bg").find('img')[0].src = imgUrl + "s_"+pic_fileName.split("_")[1];
	var divList=$("#pj_spic_content div");
	for(var i=0;i<divList.length;i++){
		divList[i].className="pj_s_pic";
	}
	$("#"+picId)[0].className="pj_s_pic pj_s_pic_bg";
	var ImageTemp = new Image();
	ImageTemp.src = imgUrl+"s2_"+$("#"+picId).attr('id').split("_")[1]+".png";
	$("#"+picId).find('img').replaceWith(ImageTemp);
}

$("#moreProduct").hover(function(){
	$(this).find("div").show();
},function(){
	$(this).find("div").hide();
});