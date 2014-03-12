(function (jQuery) {
    var $ = jQuery;
    window.MZ = {};
    MZ.Model = function () { };
    MZ.View = function () { };
    var extend = function (obj) {
        var fn = function (options) {
            this.options = options || null;
        };
        fn.prototype = obj;
        return fn;
    }
    MZ.Model.extend = MZ.View.extend = extend;
    MZ.Core = MZ.Model.extend({
        namespace: function (namespace, obj, win) {
            var path = namespace.split(".");
            var target = win || window;
            while (path.length > 0) {
                var p = path.shift();
                if (!target[p]) {
                    if (path.length > 0) {
                        target[p] = {};
                    } else {
                        target[p] = obj || {};
                    }
                } else {
                    if (path.length == 0) {
                        target[p] = $.extend(target[p], obj);
                    }
                }
                target = target[p];
            }
            return target;
        },
        ajaxRequest: {
            get: function (url, callback) {
                $.getJSON(url, function (data) {
                    callback(data);
                });
            },
            post: function () { }

        }

    });
    $Core = new MZ.Core();
    $Utils = MZ.Util;
})(jQuery);



