(function () {
    $Core.namespace("MZ.Product.View", MZ.View.extend({
        defaults: {
            currentTab: 0,
            onlyOnceStandard: false,
            onlyOnceSignal: false,
            onlyOnceLasting: false,
            onlyOnceScreen: false//动画默认可执行，执行一次后不可再被触发
        },
        render: function () {
            this.initEvents();
            this.animationBanner();
        },
        animationBanner: function () {
            var self = this;
            var dom = $("#banner").find("img");
            setTimeout(function () {
                self.bannerFirst(dom);
            }, 400);
        },
        bannerFirst: function (dom) {
            var self = this;
            dom.eq(0).css({ opacity: 0, marginLeft: 0 }).stop().animate({ marginLeft: 20, opacity: 1 }, { duration: 1000 });
            dom.eq(1).css({ opacity: 0, marginLeft: 0, left: 490 }).stop().animate({ left: 430, opacity: 1 }, { duration: 1000 });
            setTimeout(function () {
                self.bannerSecond();
            }, 2000);
        },
        bannerSecond: function () {
            var self = this; productHead
            $("#mzHeader").css({ visibility: "visible", opacity: 0 }).stop().animate({ opacity: 1 });
            $("#productHead").css({ visibility: "visible", opacity: 0 }).stop().animate({ opacity: 1 });
            $("#functionMain").css({ visibility: "visible", opacity: 0, top: 30 }).stop().animate({ opacity: 1, top: 0 });
            $("#banner").css({ borderTop: "1px solid #e6e6e7" });
            setTimeout(function () {
                self.showIcon();
            }, 300);

        },
        showIcon: function () {

            var dom = $("#functionMenu li");
            var len = dom.length;
            var num = len / 2;
            var apart = 127;
            num = Math.ceil(num);
            dom.eq(num - 1).css({ visibility: "visible", left: (num - 1) * apart }).stop().animate({ opacity: 1 }, 600);
            for (var i = 0; i < num - 1; i++) {
                dom.eq(i).css({ visibility: "visible", left: (i * apart) + 20 }).stop().animate({ left: i * apart, opacity: 1 }, 600);
            }
            if (len % 2 == 0) {
                dom.eq(num).css({ visibility: "visible", left: (num) * apart }).stop().animate({ opacity: 1 }, 600);
                num = num + 1;
            }
            for (var n = num; n < len; n++) {
                dom.eq(n).css({ visibility: "visible", left: (n * apart) - 20 }).stop().animate({ left: n * apart, opacity: 1 }, 600);
            }
        },
        animationPercentage: function (id, direction) {
            var dom = id.find("li");
            var len = dom.length;
            for (var i = 0; i < len; i++) {
                (function (i) {
                    var num = dom.eq(i).attr("data-num");
                    num = parseInt(num);
                    switch (direction) {
                        case "top":
                            dom.eq(i).find(".percentage").css({ height: 0 }).stop().animate({ height: num / 129 }, { duration: 1000, complete: function () {
                                dom.eq(i).find(".total").text(num).fadeIn(1000);
                            } 
                            });
                            break;
                        case "left":
                            dom.eq(i).css({ width: 0 }).stop().animate({ width: num }, { duration: 1000, complete: function () {
                                dom.eq(i).find("i").fadeIn(1000);
                            } 
                            });
                            break;
                    }
                })(i)
            }
        },
        animationNum: function (id) {
            var self = this;
            var dom = $("#" + id);
            var windowHeight = dom.position().top;
            var screenPosition = $(window).scrollTop();
            var top = dom.offset().top;
            var num = top - windowHeight - screenPosition;
            if (num >= -220 && num <= 480) {
                switch (id) {
                    case "screenNum":
                        self.defaults.onlyOnceScreen = true;
                        break;
                    case "standardNum":
                        self.defaults.onlyOnceStandard = true;
                        break;
                    case "signalNum":
                        self.defaults.onlyOnceSignal = true;
                        break;
                    case "lastingNum":
                        self.animationPercentage(dom, "left");
                        self.defaults.onlyOnceLasting = true;
                        return;
                    default:
                        break;
                }
                var domI = dom.find("i");
                var len = domI.length;
                dom.css({ opacity: 0, visibility: "visible" }).stop().animate({ opacity: 1 }, 1000);
                for (var i = 0; i < len; i++) {
                    var num = domI.eq(i).attr("data-num");
                    domI.eq(i).animate({ top: (1 - num) * 65 }, {
                        duration: 1000,
                        complete: function () {
                            dom.find(".zero").fadeIn();
                        }
                    });

                }
            }

        },
        initEvents: function () {
            var self = this;
            var con = $("#functionCon");
            $("#functionMenu li").click(function () {
                var menuHeight = 156;
                var index = $(this).index();
                //if(index==self.defaults.currentTab ){return}
               //$(this).siblings().removeClass("current");
                //$(this).addClass("current");
                self.defaults.currentTab = index;
                var conTop = con.find(".con").eq(index).offset().top;
                $(window).scrollTop(conTop - menuHeight);
            });
            $("#goToTop").click(function () {
                $(window).scrollTop(0);
            });
            $("#moreProduct").hover(function () {
                $(this).find("div").show();
            }, function () {
                $(this).find("div").hide();
            });
            $("#floatBar").hover(function () {
                $(this).find(".line").hide();
                if (!self.defaults.floatBarStatus) {
                    self.defaults.floatBarStatus = true;
                    $(this).animate({ right: 4 }, { duration: 100, complete: function () {
                        self.defaults.floatBarStatus = false;
                    } 
                    });
                }
            }, function () {
                if (!self.defaults.floatBarStatus) {
                    self.defaults.floatBarStatus = true;
                    $(this).animate({ right: -67 }, { duration: 100, complete: function () {
                        $(this).find(".line").show();
                        self.defaults.floatBarStatus = false;
                    } 
                    });
                }
            });
            $("#cameraTab li").click(function () {
                var index = $(this).index();
                $(this).siblings().removeClass("current");
                $(this).addClass("current");
                var cameraPhoto = $("#cameraPhoto");
                var src = cameraPhoto.attr("src");
                var regx = /camera-\d*/;
                $("#cameraPhoto").hide();
                src = src.replace(regx, "camera-" + (index + 1));
                $("#cameraPhoto").attr("src", src).fadeIn();
            });
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > 0) {
                    var windowHeight = document.documentElement.clientHeight;
                    $("#floatBar").css({ top: scrollTop + windowHeight / 2, display: "block" });
                } else {
                    $("#floatBar").css({ display: "none" });
                }
                if (!self.defaults.onlyOnceScreen) {
                    self.animationNum("screenNum");
                };
                if (!self.defaults.onlyOnceStandard) {
                    self.animationNum("standardNum");
                };
                if (!self.defaults.onlyOnceSignal) {
                    self.animationNum("signalNum");
                };
                if (!self.defaults.onlyOnceLasting) {
                    self.animationNum("lastingNum");
                };
            });
        }
    }));
    $(function () {
        var productView = new MZ.Product.View();
        productView.render();
    })
})();