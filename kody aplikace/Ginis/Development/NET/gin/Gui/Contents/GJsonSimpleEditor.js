(function ($) {
    "use strict";

    namespace("Gordic.WebApp.SimpleJsonEditor", {

 
        // this.options.gstor      - sdílený gstor

        // this.editor                      - editor s
        // this.editorUser                  - editor aktualního/uživatelského
        // this.expandedArray  []      - pole otevřených nodu
        // this.expandedArray  []       - pole otevřených nodu

        // this.data                  - data editoru   

        prepareContent: function (args) {
            var that = this;
            var init = false;
            if (args.gstor) {
                this.gstorLive = args.gstor;
                args.gstor = new GStor(args.gstor.get(null, true));
                init = true;
            } else if (args.data) {
                this.gstorLive = new GStor(args.data);;
                args.gstor = new GStor(this.gstorLive.get(null, true));
                init = true;
            } else {
                this.gstorLive = new GStor({});;
                args.gstor = new GStor(this.gstorLive.get(null, true));
                init = true;
            }

            if (init) { 
                this.inicializace(args);
            }
        },

        inicializace: function (args) {
            var that = this;
            
            var defOptions = {
                gstor: null,
            };
            this.options = $.extend({}, defOptions, args);

            var divikEditor = $("<div id='jsoneditor'>").height(800);

            var form = $("<div>").appendTo(this.element);
            form
                .gform("setup", { layoutDescriptor: "L1M1S1, L-0-12-0, M-12-12-0, S-12-12-0" })
                .gformsection("create")
                //.gformrow("addFieldsRow")

                .closest(".gform-section").append(divikEditor)
               

            //var divik = $("<div id='jsoneditor'>").appendTo(this.element).height(800); // style='width: 400px; '

            var optionsEditor = {
                name: "Gstor",
                mode: 'tree',
                modes: ['code', 'text', 'tree'], // allowed modes
                onError: this.onError.bind(this),

                onEditable: this.onEditable,  //function (node) { return { mojeData: "Lock" }; }, //field: false 

                upravNode: this.addDataToNode.bind(this),

                addTrToRow: this.addTrToRow.bind(this),
                addEmptyRow: this.addEmptyRow.bind(this),

                onModeChange: function(newMode, oldMode) {
                    console.log('Mode switched from', oldMode, 'to', newMode);
                },

                //test
                onChange: function (ev, xy) { // DEBOUNCE_INTERVAL
                    console.log(this, ev, xy);
                    that._onChange(ev, xy);
                    
                },
                mojeOptions: function (aaa) {
                    console.log("that", that);
                    console.log("this", this);
                },

                language: 'default',
                languages: {

                    'default': this.preklady
                },
                //statický autocompleat
                autocomplete: {
                    getOptions: function () {
                        return that.staticAutocomplete;
                    }
                }

                //dynaicky interlisense
                /*
                autocomplete: {
                    applyTo: ['value'],
                    getOptions: function (text, path, input, editor) {
                        return new Promise(function (resolve, reject) {
                            var val = editor.get();
                            var options = that.extractUniqueWords(val);
                            if (options.length > 0) resolve(options); else reject();
                        });
                    }
                }
                */

            };

            

            this.nactiGstor();
            this.editor = new JSONEditor(divikEditor[0], optionsEditor, this.data);
            
            this.menuBar([
                {
                    favorite: true, action: new GAction({
                        name: "actObnovit", caption: "Obnovit", tooltip: "Obnovit do původního stavu",
                        run: function (ev, ctx) {
                            that.obnoveditor();

                        }
                    })
                },
            ]);
            this.commandBar([
                {
                    favorite: true, action: new GAction({
                        name: "actPouzit", customClass: "g-button--primary", caption: "Použít", tooltip: "Použijí se aktuální data z editoru.",
                        run: function (ev, ctx) {
                            that.pouzit();
                        }
                    })
                },
                {
                    favorite: true, action: new GAction({
                        name: "actZavritt", caption: "Zavřít", tooltip: "Zavřít",
                        run: function (ev, ctx) {
                            that.tryClose();
                        }
                    })
                }
            ]);
        },


        staticAutocomplete: ['gordic', 'modal', 'model', 'window', 'favorites', 'fields', 'menuBar'],
        //#region Data do řádků 
        addDataToNode: function (node) {
            var that = this;
            var path = node.getPath();


            if (node.parent === undefined) {

            } else {
                if (node.parent.type === "array") {
                    node.isIndexInArray = true;
                } else {

                    node.gstorLock = that.isPathLocked(path);

                }

                node.copyEnabele = true;
            }

        },



        onEditable: function(node) {
            // node is an object like:
            //   {
            //     field: 'FIELD',
            //     value: 'VALUE',
            //     path: ['PATH', 'TO', 'NODE']
            //     node : cely uzel
            //   }
            if (node.path && node.path.indexOf && node.path.indexOf("_lockedSections") > -1) {
                return false;
            }

            switch (node.field) {
                //case '_id':
                //    return false;

                //case 'name':
                //    return {
                //        field: false,
                //        value: true
                //    };
                default:
                    return true;
            }

        },


        //#endregion

        //#region plnění rowu tr
        addEmptyRow: function(dom, node,mode) {
            if (mode === "add") {
                node.modifiedByGordicEmptyValue = false;

                dom.tr.removeChild(dom.tdDrag);
                dom.tdDrag = undefined;
                
                dom.trLock = $("<td>").width("1rem");
                dom.tr.appendChild(dom.trLock[0]);

            } else if (mode === "remove") {

                if (dom.trLock) {
                    dom.tr.removeChild(dom.trLock[0]);
                }

            }
        },

        addTrToRow: function (dom, node) {
            var that = this;
            // lock
           

            dom.trLock = $("<td>").width("1rem");
            if (typeof node.gstorLock === "boolean") {
                
                var iLock = $("<i>").addClass((node.gstorLock === true ? "fa fa-lock" : "fa fa-fw") + " jsonediror-lock")
                    .gtooltip({ tooltip: (node.gstorLock === true ? "Uzamčeno" : "Odemknuto") });
                dom.iLock = iLock[0];
                dom.trLock.append(dom.iLock);

            }
            dom.tr.appendChild(dom.trLock[0]);


        },

        //#endregion


        //#region akce v editoru

        refreshGstor: function (tempRefresh, DontLoadNewExpanded) { //parametr true způsobí že se nenačte znova expandned pole

            if (tempRefresh) {
                this.data = this.editor.get();
            } else {
                this.nactiGstor();
            }
            if (DontLoadNewExpanded == null || DontLoadNewExpanded === false) {
                this.getEditorExpandedpath();
            }
            this.editor.set(this.data);
            this.setEditorExpandedpath();

        },

        _onChange: function (ev, change) {
            var that = this;

            switch (ev) {
                //case "editField": 
                //    change.node.focus("field");
                //    break;


                default:

            }
        },

        //#endregion



        // not use
        findInEdiotr: function (node, editor) {
            var val = node.getValue();
            var pathArray = node.getPath();
            var editorNode = this._findNode(pathArray, editor);
            if (editorNode) {
                this._focusdNode(editorNode);
            }
        },
        _findNode: function (path, editor) {
            var pathToFind = null;

            //kontrola pokud prázdné pole tak vracím přímo root node
            if (Array.isArray(path) && path.length === 0){
                return editor.node;
            }

            if (Array.isArray(path)) {
                $(path).each(function (index, element) {
                    if (typeof element === "string") {
                        pathToFind = (pathToFind ? pathToFind : "") + "." + element;
                    } else if (typeof element === "number") {
                        pathToFind = (pathToFind ? pathToFind : "") + "[" + element + "]"; // pokud je v cestě number beru to jako index v poli
                    }
                })
                //path = path.join(".");

                //pathToFind = "." + path;
            } else {
                pathToFind = path;
            }
            if (pathToFind === ".") return null; // pokud jen tečka nehledám
            while (pathToFind.slice(-1) === ".") { pathToFind = pathToFind.slice(0, -1); } // pokud tečka na konci odstraním
            return editor.node.findNode(pathToFind);
        },
        _focusdNode: function (node) {
            if (node) {
                node.scrollTo(function () {
                    node.focus();
                    setTimeout(function () {
                        node.focus();
                    }, 200);
                });
            }
        },


       
        //#endregion

    //#region Expanded funkce 
        getEditorExpandedpath: function () {
            // funcke pro sezbírání otevřených nodu v editoru
            this.expandedArray = [];
            if (this.editor.mode !== 'code' && this.editor.mode !== 'text') {
                this.iterateExpandedpath(this.editor.node, this.expandedArray);
            }
        },

    

        setEditorExpandedpath: function () {
            // funcke pro nasetování otevřených nodu v editoru
            if (this.editor.mode !== 'code' && this.editor.mode !== 'text') {
                this.setExpandedpath(this.editor, this.expandedArray);
            }
        },



        iterateExpandedpath: function (node, uloziste) {
            // iterační funkce pro sezbírání otevřených nodu v editoru
            var that = this;

            if(node.expanded === true){
                var pathArr = node.getPath();
                if (pathArr.length > 0) { 
                    var path = pathArr.join(".");
                    uloziste.push(path);
                }
            }
            if (node.childs) {
                $(node.childs).each(function (index, element) {
                        that.iterateExpandedpath(element, uloziste);
                });
            }
        },

        setExpandedpath: function (editor, array) {
            // nastavé otevření  nodu v editoru
            var that = this;
            $(array).each(function (index, element) {
                var node = that._findNode(element, editor);
                if (node) {
                    node.expand(false);
                }
            });


        },
        //#endregion

    //#region gstorefuncke

        nactiGstor: function () {
            this.data = this.options.gstor.get(null, true);
        },



        refreshAll: function () {
            this.refreshGstor();

        },
       

       

        

        //#endregion
    //#region Locked funkce

        isPathLocked: function (path) {
            var lock = false;
            if (path) {
                lock = this.options.gstor.isLocked(path);
            }
            return lock;
        },


        
         //#endregion

    //#region load Save
        tempSaveAll: function () {
            this.tempSaveTo();
        },

        tempSaveTo: function () {
            var newValue = this.editor.get();
            this.options.gstor.set(null, newValue);
        },
        obnoveditor: function () {
            var that = this;
           
            this.options.gstor = new GStor(this.gstorLive.get(null, true));
            this.refreshGstor();
         
        },

    



        //#endregion

    //#region různé

        pathArrayToString: function (pathArray) {
            var strPath = pathArray.join(".");
            return strPath;
        },

        onError: function(err) {
            this.dialogs.warning("Chybná syntaxe v editoru", "<br><br><br><br>" +err.toString());
        },
        //#endregion

        //#region ImportExport

        importAll: function() {

            var date = { dodeltat: "nacteni Ze Souboru" } // dodelat nactenize souboru
            //this.getEditorExpandedpath();
            this.editor.set(date);
            //this.setEditorExpandedpath();
        },
        exportAll: function() {
            try {
                var dataProExport = this.editor.get();
                console.log("kompletní export",dataProExport);
            }
            catch (err) {
                this.onError(err);
            }
           
        },
        exportCastecny: function(node) {
            try {
                var nazevfieldu = node.field;
                var temp = {export: {} };
                temp.export[nazevfieldu] = node.getValue();
                var dataCastecnaProExport = temp.export;
                console.log("částečný export", dataCastecnaProExport);
            }
            catch (err) {
                this.onError(err);
            }

        },


           //#endregion

        pouzit: function () {
            try {
                var newValue = this.editor.get();
                this.close(newValue);
            }
            catch (err) {
                this.onError(err);
            }
        },
        //#region překlad

        preklady: {

            'array': 'Pole',
            'auto': 'Auto',
            'appendText': 'Připojit', //Append
            'appendTitle': 'Připojit nový parametr typu \'auto\' za tento parametr (Ctrl+Shift+Ins)', //'Append a new field with type \'auto\' after this field (Ctrl+Shift+Ins)',
            'appendSubmenuTitle': 'Vyberte typ parametru který má být přidán', //'Select the type of the field to be appended',
            'appendTitleAuto': 'Připojit nový parametr typu \'auto\' (Ctrl+Shift+Ins)', //'Append a new field with type \'auto\' (Ctrl+Shift+Ins)',
            'ascending': 'Vzestupně', //'Ascending',
            'ascendingTitle': 'Seřad potomky ${type} vzestupně', //'Sort the childs of this ${type} in ascending order',
            'actionsMenu': 'Klikni pro otevření editačního menu (Ctrl+M)', //'Click to open the actions menu (Ctrl+M)',
            'collapseAll': 'Sbal všechny parametr', //'Collapse all fields',
            'descending': 'Sestupně', //'Descending',
            'descendingTitle': 'Seřad potomky ${type} sestupně', //'Sort the childs of this ${type} in descending order',
            'drag': 'Chytni a přesuň (Alt+Shift+Arrows)', //'Drag to move this field (Alt+Shift+Arrows)',
            'duplicateKey': 'duplicitní klíč', //'duplicate key',
            'duplicateText': 'Duplikat', //'Duplicate',
            'duplicateTitle': 'Duplikuj vybrané parametry (Ctrl+D)', //'Duplicate selected fields (Ctrl+D)',
            'duplicateField': 'Duplikuj tento parametr (Ctrl+D)', // 'Duplicate this field (Ctrl+D)',
            'empty': 'prázdný', //'empty',
            'expandAll': 'Rozbal všechny parametry', //'Expand all fields',
            'expandTitle': 'Klik pro rozbalení/zabalení tohoto parametru (Ctrl+E). \n' + 'Ctrl+Click pro rozbalení/zabalení včetně všech potomků.',
            'insert': 'Vložit', //'Insert',
            'insertTitle': 'Připojit nový parametr typu \'auto\' před tento parametr (Ctrl+Ins)',//Insert a new field with type \'auto\' before this field (Ctrl+Ins)',
            'insertSub': 'Vyberte typ parametru který má být vložen.', //'Select the type of the field to be inserted',
            'object': 'Objekt', //'Object',
            'redo': 'Znovu (Ctrl+Shift+Z)', //'Redo (Ctrl+Shift+Z)',
            'removeText': 'Odstranit', //'Remove',
            'removeTitle': 'Odstranit vybrané parametry (Ctrl+Del)', //'Remove selected fields (Ctrl+Del)',
            'removeField': 'Odstranit tento parametr (Ctrl+Del)', // 'Remove this field (Ctrl+Del)',
            'sort': 'Seřadit', // 'Sort',
            'sortTitle': 'Seřadit potomky tohoto parametru', //'Sort the childs of this ',
            'string': 'String', //'String',
            'type': 'Typ', //'Type',
            'typeTitle': 'Změnit typ tohoto parametru', //'Change the type of this field',
            'openUrl': 'Ctrl+Click or Ctrl+Enter otevři odkaz v novém okně', //'Ctrl+Click or Ctrl+Enter to open url in new window',
            'undo': 'Vratit poslední akci (Ctrl+Z)', //'Undo last action (Ctrl+Z)',
            'validationCannotMove': 'Nelze přesunout parametr do vlastních potomků.', //'Cannot move a field into a child of itself',
            'autoType': 'Parametr typu "auto". Typ parametru je automaticky odvozen z hodnoty a můžebýt string, číslo, boolean, nebo null.',
            //'Field type "auto". The field type is automatically determined from the value and can be a string, number, boolean, or null.',
            'objectType': 'Parametr typu "objekt". Objekt obsahuje neseřazené páry klíč/hodnota.',
            //'Field type "object". An object contains an unordered set of key/value pairs.',
            'arrayType': 'Parametr typu "pole". Pole obsahuje sežazenou kolekci hodnot.',
            //'Field type "array". An array contains an ordered collection of values.',
            'stringType': 'Parametr typu "string". Parametr není odvozen z hodnoty, a bude vždy vracet string.'
            //'Field type "string". Field type is not determined from the value, but always returned as string.'
        },

        //#endregion
       
       


    }, { extendIntellisense: GContent });

})(jQuery);