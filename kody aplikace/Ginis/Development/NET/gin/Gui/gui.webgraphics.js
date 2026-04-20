/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       gui.webgraphics.js
*    project     q:\ginis\Development\NET\Gordic.Gui.WebGraphics\Gordic.Gui.WebGraphics.csproj
*    created     2026-02-16 14:34:23
*    files       src\fonts\webgraphics.fields.js
*/

//#region q:\ginis\Development\NET\Gordic.Gui.WebGraphics\src\fonts\webgraphics.fields.js 

"use strict";

(function ($) {
    var Fields = namespace("Gordic.Prefabs.Select");
    var Selector = namespace("Gordic.Data.Selectors");
    
    var stateColors = [
        { class: "g-state-info" },
        { class: "g-state-success" },
        { class: "g-state-warning" },
        { class: "g-state-error" },
        { class: "g-state-important" },
        { class: "g-state-favorite" },
    ];

    var stateText =       { class: "g-state-text",       children: stateColors };
    var stateBackground = { class: "g-state-background", children: stateColors };
    var rotations = [
        { class: "gi-rot90"  },
        { class: "gi-rot180" },
        { class: "gi-rot270" }
    ];

    var cheatSheetExpressions = [
        stateText,
        stateBackground
    ];

    cheatSheetExpressions = cheatSheetExpressions.concat(rotations);

    var iconBuilder = new Gordic.Utils.IconBuilder();

    var iconsCache = null;
    var getIcons = function (str) {
        //FormatDat: {"icon":"gi-accept","name":"accept","keywords":["vložit","vložit doručenku","accept"],"desc": ""}
        if (str) return getDynamicCheatSheetIcons(str);
        else     return getAllIcons();
    };

    var getAllIcons = function () {
        //FormatDat: {"icon":"gi-accept","name":"accept","keywords":["vložit","vložit doručenku","accept"],"desc": ""}
        var def = $.Deferred();

        if (iconsCache)
            def.resolve(iconsCache);
        else {
            $.getJSON("gin/gui/iconprefabdata.json")
                .done(function (data) {
                    iconsCache = data;
                    def.resolve(data);
                });
        }
        return def.promise();
    };

    var getDynamicCheatSheetIcons = function (str) {
        //FormatDat: {"icon":"gi-accept","name":"accept","keywords":["vložit","vložit doručenku","accept"],"desc": ""}
        if (str.indexOf(" ") === -1 && str.indexOf("|") === -1) return getAllIcons();

        var res = [];
        var stackedFrags = str.split("|");
        var frags = stackedFrags[stackedFrags.length-1].split(" "); //zajima me az to za pipeline, pokud je...
        var lastFrag = frags[frags.length - 1];
        var def = $.Deferred();
        
        var prefix = frags.length > 1 ? str.slice(0, -lastFrag.length).trim() : str;
        
        //Test validity prefixu. Neni-li validni, pak nema cenu nic dalsiho nabizet (muze byt problematicke u skladanych ikon).
        try      { var i = iconBuilder.createIcon(prefix); }
        catch(e) { return def.resolve([]).promise(); }

        //Pokud se vybira druha ikona, co mam nabidnout???
        if (prefix[prefix.length - 1] === "|") return def.resolve([]).promise();

        for (var i = 0; i < cheatSheetExpressions.length; i++) {
            var expr = cheatSheetExpressions[i];
            if (frags.length === 1) getIconRecursive(prefix, expr, res);
            else if (expr.class.indexOf(lastFrag) > -1) getIconRecursive(prefix, expr, res);
        }

        return def.resolve(res).promise();
    };

    var getIconRecursive = function (prefix, expr, outArr) {
        var s = prefix ? prefix + " " + expr.class : expr.class;
        
        if (expr.children) {
            for (var i = 0; i < expr.children.length; i++)
                getIconRecursive(s, expr.children[i], outArr);
        }
        else outArr.push({ icon: s });
    };

    Fields.icons = function (options) {
        options = options || {};
        return $.extend({
            data: getIcons,
            clientFilterEvaluator: false,
            graphicInput: "oninput",
            //graphicInput: "always",
            strict: false,
            invalidTransform: function(d) {
                return { icon: d };
            },
            itemTemplate: function (d) {
                return "<div style='display: flex'><div style='font-size: 2rem;margin: 0 0.5rem;'>" + Gordic.Utils.IconBuilder.defaultInst.createIcon(d.icon) + "</div><div style='display: flex;align-items: center;'>" + (d.icon || "") + "</div></div>";
            },
            itemTooltipTemplate: function (d) {
                return d.desc;
            },
            helperItemTemplate: function (d) {
                return "<div>" + Gordic.Utils.IconBuilder.defaultInst.createIcon(d.icon) + "<span style='margin-left: 0.5rem'>" + (d.icon || "") + "</span></div>";
            },
            helperColumns: ["icon", "keywords"]
        }, options);
    };

    Fields.icons.getIcons = getIcons;
})(jQuery);

//#endregion

