"use strict";
/**
 * Created by Robson Miranda on 2016-12-08.
 */
var UTILITIES;
UTILITIES = (function () {
    //
    String.prototype.initCap = function () {
        return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
            return m.toUpperCase();
        });
    };
    //
    //noinspection JSAnnotator
    return {
        //
        createNewDOM: function (evType, evClass, evID, evContent) {
            //
            let elem = document.createElement(evType);
            (evClass != "" ? elem.className = evClass : null);
            (evID != "" ? elem.id = evID : null);
            (evContent != "" ? elem.innerHTML = evContent : null);
            // elem.innerHTML = evContent;
            return elem;
            //
        },
        //
        sortCompare: function (a, b) {
            let sortList = ["wins","draws","losses","points"];
            //
            for (var i=0, l=sortList.length-1; i<l; i++){
                if(a[sortList[i]] == b[sortList[i]])
                {
                    return (a[sortList[i+1]] < b[sortList[i+1]]) ? -1 : (a[sortList[i+1]] > b[sortList[i+1]]) ? 1 : 0;
                }
                else
                {
                    return (a[sortList[i]] < b[sortList[i]]) ? -1 : 1;
                }
            }
            // if (a.points < b.points)
            //     return -1;
            // if (a.points > b.points)
            //     return 1;
            // return 0;
            // if (a.points.toUpperCase() < b.points.toUpperCase())
            //     return -1;
            // if (a.points.toUpperCase() > b.points.toUpperCase())
            //     return 1;
            // return 0;
        },
        //
        validateEmail: function (email) {
            let atpos = email.indexOf("@");
            let dotpos = email.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                return false;
            }
            ;
            return true;
        },
        //
        formatVal: function (string, type) {
            switch (type) {
                case "tel":
                    return String(string).replace(/^(\d{3})(\d{3})(\d{4}).*/, '($1) $2-$3');
                case "initCap":
                    // return "".concat(String(string).substr(0,1).toUpperCase(),String(string).substr(1,String(string).length).toLowerCase());
                    return String(string).initCap();
                default:
                    return string;
            }
        },
        setLocalStorage: function (key,content) {
            localStorage.setItem(key, JSON.stringify(content));
            app.setResultsPage();
            app.setStandingsPage();
        },
        getLocalStorage: function (key) {
            return JSON.parse(localStorage.getItem(key));
        }
        // ,
        // initLocalStorage: function () {
        //     if (CONTACT_ADM.contacts.length == 0) {
        //         //
        //         CONTACT_ADM.contacts.push({firstName : "Robson"
        //             ,lastName  : "Miranda"
        //             ,mobile    : "(613) 700-0017"
        //             ,phone     : "(613) 421-8529"
        //             ,email     : "stra0165@algonquinlive.com"
        //         });
        //         CONTACT_ADM.setLocalStorage();
        //         //
        //     };
        // }
    };
    //
})();