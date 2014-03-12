(function(a){a.tiny=a.tiny||{};a.tiny.carousel={options:{start:1,display:1,axis:"x",controls:true,pager:false,interval:false,intervaltime:3000,rewind:false,animation:true,duration:1000,callback:null}};a.fn.tinycarousel_start=function(){a(this).data("tcl").start()};a.fn.tinycarousel_stop=function(){a(this).data("tcl").stop()};a.fn.tinycarousel_move=function(c){a(this).data("tcl").move(c-1,true)};function b(q,e){var i=this,h=a(".viewport:first",q),g=a(".overview:first",q),k=g.children(),f=a(".next:first",q),d=a(".prev:first",q),l=a(".pager:first",q),w=0,u=0,p=0,j=undefined,o=false,n=true,s=e.axis==="x";function m(){if(e.controls){d.toggleClass("disable",p<=0);f.toggleClass("disable",!(p+1<u))}if(e.pager){var x=a(".pagenum",l);x.removeClass("active");a(x[p]).addClass("active")}}function v(x){if(a(this).hasClass("pagenum")){i.move(parseInt(this.rel,10),true)}return false}function t(){if(e.interval&&!o){clearTimeout(j);j=setTimeout(function(){p=p+1===u?-1:p;n=p+1===u?false:p===0?true:n;i.move(n?1:-1)},e.intervaltime)}}function r(){if(e.controls&&d.length>0&&f.length>0){d.click(function(){i.move(-1);return false});f.click(function(){i.move(1);return false})}if(e.interval){q.hover(i.stop,i.start)}if(e.pager&&l.length>0){a("a",l).click(v)}}this.stop=function(){clearTimeout(j);o=true};this.start=function(){o=false;t()};this.move=function(y,z){p=z?y:p+=y;if(p>-1&&p<u){var x={};x[s?"left":"top"]=-(p*(w*e.display));g.animate(x,{queue:false,duration:e.animation?e.duration:0,complete:function(){if(typeof e.callback==="function"){e.callback.call(this,k[p],p)}}});m();t()}};function c(){w=s?a(k[0]).outerWidth(true):a(k[0]).outerHeight(true);var x=Math.ceil(((s?h.outerWidth():h.outerHeight())/(w*e.display))-1);u=Math.max(1,Math.ceil(k.length/e.display)-x);p=Math.min(u,Math.max(1,e.start))-2;g.css(s?"width":"height",(w*k.length));i.move(1);r();return i}return c()}a.fn.tinycarousel=function(d){var c=a.extend({},a.tiny.carousel.options,d);this.each(function(){a(this).data("tcl",new b(a(this),c))});return this}}(jQuery));
/**
 *
 *  miniMAC
 */
$(document).ready(function() {
	
	//NAV
	//open
	$('.btn_open').click(function () {
		if ( !$(this).hasClass('active') ) {
			$('#navigation').show(100).addClass('animated bounceInDown');
			$(this).addClass('active');
		} else {
			$('#navigation').hide(100);
			$(this).removeClass('active');
		}
	});
	
	
	//POST
	//Effect hover lateral metas
	$('.meta_date, .meta_author, a.comments-link').hover(function () {
		$(this).addClass('animated wobble');
	});
	
	$('.meta-thumb').hover(function () {
		$(this).addClass('animated swing');
	});
	
	//SCOOP SLOGAN
	setTimeout(function(){
		$('a.mini_scoop').addClass('animated tada');
	}, 5000); 
	
	
	//INSTAGRAM
	//Effect on click :)
	$('#instagram_widget').hover(function() {
		$('.instagram_photo').stop().transition({ y: '-90' });
	},function() {
		$('.instagram_photo').stop().transition({ y: '0' });
	});
	
	
	//SOCIALS icons upper
	$('a.socials_dribbble').hover(function () {
		$('span.mini_msg_dribbble').addClass('animated rotateInUpRight');
	});
	$('a.socials_twitter').hover(function () {
		$('span.mini_msg_twitter').addClass('animated rotateInUpRight');
	});
	$('a.socials_google').hover(function () {
		$('span.mini_msg_google').addClass('animated rotateInUpRight');
	});
	
	
	//RESPOND
	//add html to the form
	$('.resp_link').click(function () {
		$("textarea#comment").val($("textarea#comment").val()+'<a href="http://" title="">Nome</a>');
	});
	
	$('.resp_code').click(function () {
		$("textarea#comment").val($("textarea#comment").val()+'<code>Codice</code>');
	});
	
	
	//DEMO BUTTONS
	//add a small effect to the thumbs in demo archive	
	$('.box_demo').hover(function() {
		$(this).find('img').stop().animate({'marginTop': '-70px'}, 300);
	},function() { //mouseout
		$(this).find('img').stop().animate({'marginTop': '0px'}, 400);
	});
	
	
	//CAROUSEL
	//option for the carousel
	$('#carousel').tinycarousel({ 
		pager: false,
		display: 1,
		axis: 'x',
		controls: true,
		pager: false,
		interval: true,
		intervaltime: 5000,
		animation: true,
		duration: 500
	});
	
	// Validazione form contatti
	$('#contact-form-informazioni').submit(function() {
		
		$('#contact-form-informazioni .error').remove();
		
		var hasError = false;
		
		if ( !$('#contactPrivacy').attr('checked') ) {
			hasError = true;
			$('#contactPrivacy').parent().append('<span class="error">Devi accettare la privacy</span>');
		}
		
		$('#contact-form-informazioni .requiredField').each(function() {
			if(jQuery.trim($(this).val()) == '') {
				var labelText = $(this).prev('label').text();
				$(this).parent().append('<span class="error"><span class="iconfont-alert"></span> Manca ' + labelText + '.</span>');
				hasError = true;
			} else if($(this).hasClass('email')) {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test(jQuery.trim($(this).val()))) {
					$(this).parent().append('<p class="thanks"><strong>Grazie!</strong>La tua richiesta è stata inviata.</p>');
					hasError = true;
				}
			}
		});
		if(!hasError) {
			var formInput = $(this).serialize();
			$.ajax({type: 'POST', url: window.location.pathname, data: formInput, success: result_ok(),	dataType: 'JSON'});
			function result_ok(){
			
			function Reload(){
			var pathname = window.location.pathname;
			setTimeout(function(){window.location = pathname;}, 2500);
			};
			
				$('#contact-form-informazioni').slideUp("fast", function() {				   
					$(this).before('<p><strong>Grazie!</strong> La tua richiesta è stata inviata.</p>');
					Reload();
				})
			};				
		}
		
		return false;
	});
	
	$("#contact-form-informazioni input, #contact-form-informazioni textarea").focus(function() { 
		$(this).next(".error").slideUp(600);
	});
	
	//Privacy forms
	$('span.privacy_txt').hide();
	$('span.privacy_btn').click(function(){ 
		$(this).toggleClass("active").next().slideToggle(500); 
	});
	
	
	//scroller
	$('body').plusAnchor({
		easing: 'easeInOutCubic',
		speed:  600
	});
	
});