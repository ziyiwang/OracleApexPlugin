/**
 * plannet_apex.js
 *
 * @fileoverview  jQuery plugin to oralce APEX to generalize PLANNET features.
 * @link
 * @author        Ziyi Wang (ziyi.wang@team.telstra.com)
 * @version       0.0.1
 * @requires      jQuery 1.7+
 *
 * @license       Telstra
 * @Description   Lib draft -- 20/12/17 -- Ziyi
 *                Merge jquery selector plugin -- 21/12/17
 *
 */
"use strict";

if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function F() {
        }
        F.prototype = obj;
        return new F();
    };
} //incase werid issues here if some object.create has been altered to other prototypes


(function ($, window, document, undefined) {

    var PlannetApex = {
        init: function (options, elem) {
            var self = this;
            cosnole.log("checking self object here");
            console.dir(self);
        }
    } // top level universal plannet apex object

    $.fn.plannetApex = function (settings) { //object settings
        if (settings instanceof Object) { //check settings object
            console.log("this pointer in outer loops");
            console.log(this);
            //var inpSearchEle = $('<div>', {class: 'pnwrap'});
            //var inpchild1 = $('<div>', {class: 'pnsearch'});
            //inpSearchEle.appendChild(inpchild1);

            var fasearch =$('<button>', {type:"submit" ,class:"pnsearchButton"});

            $('<i>', {class: 'fa fa-search'}).appendTo(fasearch);

            $('<div>', {class: 'pnsearch'})
                .append($('<input>', {type: "text", class:"pnsearchTerm", placeholder:"Enter text for inplace search"}))
                .append(fasearch)
           //   .appendTo(this);
                .appendTo($('<div>',{class: "pnwrap"})
                            .appendTo(this)); //this pointer here points to the selected object


            //append only works on jquery outer select
            return this.each(function () {
                console.log("checking each object selected");
                console.dir(this); //this context should have switched to the object
                //$('#apexinpsearch').append('<div class=\"arrow\" />');

            })//end each function here
        }
    }



    $.fn.plannetAddFloatingTip = function (settings) { //object settings
        if (settings instanceof Object) { //check settings object
            console.log("adding floating Tip to a selector");
            console.log(this);


            this.qtip({
                content: settings.content,
                position: {
                    target: 'mouse', // Track the mouse as the positioning target
                    adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
                }
            });
            //append only works on jquery outer select
            return this.each(function () {



                console.log("checking each object selected");
                console.dir(this); //this context should have switched to the object
                //$('#apexinpsearch').append('<div class=\"arrow\" />');

            })//end each function here
        }
    }

    $.fn.plannetGetRegionCount = function (settings) { //object settings
        if (settings instanceof Object) { //check settings object
            console.log("adding floating Tip to a selector");
            console.log(this);

            return this.each(function () {
                console.log("checking selected hideshow regions");
                console.dir(this); //this context should have switched to the object

                var regExp = /\d+\s+-\s+(\d+)*/g;

                //regExp.global = true;
                var matches = this.innerHTML.match(/\d+\s+-\s+(\d+)/g);
                console.log(matches);

                //var matches = regExp.exec(this.innerHTML);
                //row(s) 1 - 1 of 1

                if (matches) {
                    console.log("matched rows: " + matches[matches.length-1]); // 22M123456JK98766
                    var matchedMaxRows = regExp.exec(matches[matches.length-1]);
                    console.dir(matchedMaxRows);
                    var headerTitleId = this.id + "_heading";
                        //a_Collapsible1_R246592417416575552_heading     <-- this is the format to replace title
                    var oldTitle = $("h2[id$=" + headerTitleId + "]").get(0).innerText;
                    $("h2[id$=" + headerTitleId + "]").get(0).innerText = oldTitle + " (" + matchedMaxRows[1] + ") ";
                    console.dir($("h2[id$=" + headerTitleId + "]").get(0));
                    console.log($("h2[id$=" + headerTitleId + "]"));
                    console.log('changed title is ' +  $("h2[id$=" + headerTitleId + "]").get(0).innerText);
                } else
                {
                    console.log("no rows matching here");
                }

                //var titlefield = this.find('t-Region-title');
                //console.dir(titlefield);

                //$('#apexinpsearch').append('<div class=\"arrow\" />');

            })//end each function here
        }
    }

})(jQuery, window, document); //load in window an DOM object



