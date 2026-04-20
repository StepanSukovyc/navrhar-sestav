(function ($) {
    "use strict";
    namespace("Gordic.WebApp.AdminSettings", {
        taskId: "actAdminSettings",
        uid: "adminSettings#",
        title: "jres:33000040", //RC 33000040 : Expertní nastavení"
        admin: false,
        // this.globalSettings   - aktuální globální nastavení (panel vlevo)
        // this.settingTemplate  - nastavení, které lze uložit, upravovat, adt. (panel vpravo)
        //                       - vzdy nastaveni ktere je vybrane nahorre v panelu 

        // Volání importu ze souboru 
        callToImport: function (fileInfo) {
            return new GContent("Gordic.Gui.WebControls.GStorService").call("LoadFromFile", { fileInfo: fileInfo });
        },

        getDatabaseVersion: function () {
            var that = this;
            this.isl.SettingTemplate.canUpdateNode({}).get().done(function (o) {
                that.canUpdateNote = o;
                that.actions.updateSettingTemplate.update({ visible: that.canUpdateNote });
            });
        },

        // Funkce pro ulozeni dat do gridu
        dataToArray: function (data, parentId, treeArray, parents) {
            var that = this;
            Object.keys(data).forEach(function (item) {
                var pom;
                if (item != "_lockedSections") {
                    parents.push(item);
                    treeArray.push(pom = { Id: that.uuid++, Name: item, ParentId: parentId, Parents: parents.join(".") });
                    var itemData = pom.data = data[item];
                    if (itemData == null)
                        pom.Value = "Null";
                    else if (typeof itemData === "object") {
                        pom.Value = Array.isArray(itemData) ? "[]" : "{}";
                        that.dataToArray(itemData, pom.Id, treeArray, parents);
                    } else
                        pom.Value = itemData;
                    parents.pop();
                }
            })
        },

        // Vytvoreni citelneho data
        createStringFromDate: function (date) {
            function addZeroToDate(number) {
                return number < 10 ? '0' + number : number;
            }
            return addZeroToDate(date.getDate()) + "." + addZeroToDate(date.getMonth() + 1) + "." + date.getFullYear() + " " + addZeroToDate(date.getHours()) + ":" + addZeroToDate(date.getMinutes()) + ":" + addZeroToDate(date.getSeconds());
        },

        // Získání realné hodnoty z nastavení
        getRealValueFromSetting: function (parents, isSettingTemplates) {
            if (isSettingTemplates == true)
                return this.settingTemplate.get(parents)
            else
                return this.globalSettings.get(parents)
        },

        // Vytvoreni zanoreneho objektu
        createNestedObject: function (object, path, value) {
            var last = path.pop();
            path.forEach(function (k) {
                object[k] = object[k] || {};
                object = object[k];
            });
            object[last] = value;
        },

        // Zkontrolovat strom
        checkTree: function (data, newTree, previous) {
            var that = this;
            if (typeof (data) == "object") {
                var array = Object.keys(data);
                for (let i = 0; i < array.length; i++) {
                    if (isNaN(array[i]) == false) {
                        var pom = [];
                        Object.keys(data).forEach(function (item) {
                            pom.push(data[item]);
                        })
                        data = pom;
                        break;
                    }
                }
                newTree[previous] = data;
                newTree = newTree[previous];
                Object.keys(data).forEach(function (item) {
                    if ((data[item] != null) && (typeof (data[item]) == "object"))
                        that.checkTree(data[item], newTree, item);
                })
            }
        },

        // Pole do JSON
        arrayToTree: function (data) {
            function createPaths(aliases, propName, path) {
                aliases.set(propName, path);
            }
            var map = new Map();
            var result = {};

            for (var i = 1; i < data.length; i++) {
                var parents = [];
                var parentId = data[i].ParentId;
                while (parentId != null) {
                    data.find(function (obj) {
                        if (obj.Id == parentId) {
                            parents.push(obj.Name);
                            parentId = obj.ParentId;
                        }
                    })
                }
                var path = ""
                for (var j = parents.length - 1; j >= 0; j--) {
                    path += parents[j] + ".";
                }
                path += data[i].Name;
                createPaths(map, path, data[i].Value);
            }

            map.forEach(function (value, key) {
                var keys = key.split('.'), last = keys.pop();
                keys.reduce(function (r, a) { r[a] = r[a] || {}, result })[last] = value;
            });
            return result;
        },

        // Získání cesty k části objektu
        getPathParametersFromString: function (path) {
            var resultArray = path.split('.');
            var result = [];
            resultArray.forEach(function (item) {
                if (item.includes('[')) {
                    var pomString1 = item.split("[");
                    pomString1.forEach(function (item1) {
                        if (item1.includes(']')) {
                            var pomString2 = item1.split(']');
                            pomString2.forEach(function (item2) {
                                if (item2[0] != null)
                                    result.push(item2);
                            })
                        } else
                            result.push(item1)
                    })
                } else
                    result.push(item);
            })
            return result;
        },

        // Získání dat z jakéhokoliv gridu
        getRowFromGrid: function (isSettingTemplate) {
            var gridName = "userSettings";
            if (isSettingTemplate == true)
                gridName = "settingTemplate"
            var data = this.element.find("#" + gridName).ggrid("getSelection")[0];
            return data;
        },

        // Ziskani a kontrola dat 
        getDataAndCheck: function (gridName) {
            var array = this.element.find("#" + gridName).ggrid("getView").getDataRows(false, "data");
            var tree = this.arrayToTree(array);
            var newtree = {};
            newtree["all"] = {};
            this.checkTree(tree, newtree, "all");
            return newtree;
        },

        // Nalezeni rodice podle id
        findParentById: function (id, isSettingTemplates) {
            var gridName = "userSettings";
            if (isSettingTemplates == true)
                gridName = "settingTemplate";

            return this.element.find("#" + gridName).ggrid("getView").verify({ Id: id });
        },

        // Stažení JSON souboru
        downloadJsonFile: function (data, userFileName) {
            let fileName = '{0}.json'.format(userFileName);
            var blob = new Blob([data], { type: "application/json" });
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                var elem = window.document.createElement('a');
                elem.href = window.URL.createObjectURL(blob);
                elem.download = fileName;
                document.body.appendChild(elem);
                elem.click();
                document.body.removeChild(elem);
            }
        },

        // Vytvoreni stringify z objektu
        createStringifyFromObject: function (data) {
            return JSON.stringify(data);
        },

        // Export části do souboru
        createPartToJsonWithPath: function (data, path) {
            var pathArray = this.getPathParametersFromString(path);
            var object = {};
            this.createNestedObject(object, pathArray, data);
            return this.createStringifyFromObject(object);
        },

        // Prevedeni uzivatelskeho nastaveni do objektu, ktery muye byt nacten do gridu
        loadUserData: function () {
            var userData = [];
            var parents = [];
            var userSettings = Object.assign({}, this.globalSettings.__data);
            this.dataToArray(userSettings, null, userData, parents);
            return userData;
        },

        // Nacteni uzivatelskych dat 
        userDataToGrid: function () {
            this.setDataToGrid(this.loadUserData(), this.element.find("#userSettings"));
        },

        // Nacteni sdilenych dat
        loadsettingTemplate: function () {
            var settingTemplate = [];
            var parents = [];
            var settingTemplateObj = Object.assign({}, this.settingTemplate.get(null, true));
            this.dataToArray(settingTemplateObj, null, settingTemplate, parents);
            return settingTemplate;
        },

        // pnacteni do gridu
        settingTemplateToGrid: function () {
            this.setDataToGrid(this.loadsettingTemplate(), this.element.find("#settingTemplate"))
        },

        // Vložení nastavení do gridu
        setDataToGrid: function (data, grid) {
            this.beginOperation();
            let treeprocessor = new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("ParentId"), { defaultState: /*"open"*/ "closed" });
            var view = new Gordic.Data.View(data, {
                key: "Id",
                processors: { tree: treeprocessor }
            });
            if (grid.hasClass("ggrid"))
                grid.ggrid("setData", view);
            this.endOperation();
        },

        // Obnovení dat
        refreshData: function (gridName, data) {
            var activeRow = this.element.find("#" + gridName).ggrid("activeRow", true);
            this.element.find("#" + gridName).ggrid("getView").updateData(data);
            if (activeRow != null) {
                var pathParemeters = this.getPathParametersFromString(activeRow["data"].Parents);
                var gridData = this.element.find("#" + gridName).ggrid("getView");
                var i = 0;
                var path = pathParemeters[i];
                gridData._db.data.forEach(function (item) {
                    if (item.data.Parents == path) {
                        if (i < (pathParemeters.length - 1)) {
                            i++;
                            if (item.structure == undefined) {
                                item.structure = {};
                                item.structure.level = i;
                            }
                            item.structure.state = "open";
                            path += "." + pathParemeters[i];
                        }
                    }
                })
            }
            this.element.find("#" + gridName).ggrid("getView").refresh();
            if (activeRow != null) {
                var view = this.element.find("#" + gridName).ggrid("getView").getDataRows("view");
                var index = view.findIndex(item => item.Parents == activeRow["data"].Parents)
                if (index != -1)
                    this.element.find("#" + gridName).ggrid("activeCellAddress", { row: index, col: 0 })
            }
        },

        // Obnovení uživatelských dat
        refreshUserData: function () {
            this.refreshData("userSettings", this.loadUserData(this.globalSettings));
        },

        // Obnovení sdílených dat
        refreshsettingTemplate: function () {
            this.refreshsettingTemplateToDatabase();
            this.refreshData("settingTemplate", this.loadsettingTemplate(this.settingTemplate));
        },

        //Nalezení proměnné podle cesty
        searchInSettings: function (path, isSettingTemplate) {
            if (path != null) {
                var gridId = "#userSettings";
                if (isSettingTemplate == true)
                    gridId = "#settingTemplate";
                var pathParemeters = this.getPathParametersFromString(path);
                var gridData = this.element.find(gridId).ggrid("getView");
                var i = 0;
                var pathNew = pathParemeters[i];
                var lastItem = {};
                gridData._db.data.forEach(function (item) {
                    if (item.data.Parents == pathNew) {
                        if (i < pathParemeters.length) {
                            i++;
                            if (item.structure == undefined) {
                                item.structure = {};
                                item.structure.level = i;
                            }
                            item.structure.state = "open";
                            pathNew += "." + pathParemeters[i];
                            if (i == pathParemeters.length)
                                lastItem = item.data;
                        }
                    }
                })
                this.element.find(gridId).ggrid("getView").refresh();
                this.element.find(gridId).ggrid("activeRow", lastItem);
            }
        },

        /// Vraci analyzu kodu Path - pole s cestou k promenne, NewPath - string kam lze dojit bez pole, BreakValue - cislo kdy se pruchod prerusi
        secureCheckData: function (data, settings) {
            var path = data.Parents.split('.');
            var tree = Object.assign({}, settings);
            tree = tree.__data;
            var newPath = "";
            var breakValue;
            for (var i = 0; i < path.length; i++) {
                if (!Array.isArray(tree)) {
                    if (tree[path[i]] == undefined && tree[path[i]] != null)
                        break;
                    tree = tree[path[i]];
                    newPath = newPath + path[i] + ".";
                    if (i == (path.length - 1))
                        newPath = newPath.substring(0, newPath.length - 1);
                } else {
                    breakValue = i;
                    newPath = newPath.substring(0, newPath.length - 1);
                    break;
                }
            }
            var result = { Path: path, NewPath: newPath, BreakValue: breakValue };
            return result;
        },

        // Ziskani pole ve keterm postupne upravuji
        getArrayWithPathValues: function (settings, analyze) {
            var newArray = [];
            newArray.push(settings.get(analyze.NewPath));
            for (var j = analyze.BreakValue; j < analyze.Path.length - 1; j++) {
                if (((typeof (newArray[newArray.length - 1]) === "object") || Array.isArray(newArray[newArray.length - 1])) && (typeof (newArray[newArray.length - 1][analyze.Path[j]]) != "string"))
                    if (newArray[newArray.length - 1][analyze.Path[j]] != undefined)
                        newArray.push(newArray[newArray.length - 1][analyze.Path[j]]);
                    else
                        break;
            }
            return newArray;
        },

        // Aktualizovat proměnnou
        updateProperty: function (data, isSettingTemplates) {
            var that = this;
            var settings;
            if (isSettingTemplates)
                settings = this.settingTemplate;
            else
                settings = this.globalSettings;
            var analyze = that.secureCheckData(data, settings);
            var treeAll = new GStor(settings.get(null, true));
            if (Array.isArray(settings.get(data.Parents)) == true)
                settings.set(data.Parents, data.Value);
            else if ((analyze.NewPath == data.Parents) && (Array.isArray(treeAll.get(analyze.NewPath)) == false)) {
                settings.set(data.Parents, data.Value);
            } else {
                var newArray = that.getArrayWithPathValues(treeAll, analyze);
                var changingObject = newArray[newArray.length - 1];
                if (Array.isArray(changingObject)) {
                    for (var i = 0; i < changingObject.length; i++) {
                        if (i == data.Name) {
                            if (Array.isArray(changingObject[i]))
                                changingObject[i] = data.Value;
                            else
                                changingObject[data.Name] = data.Value;
                        }
                    }
                } else {
                    changingObject[data.Name] = data.Value;
                }
                settings.set(analyze.NewPath, newArray[0]);
            }
            //console.log(settings.get(null, true)); // TS201026 - tohle je snad jen pro debug
        },

        // --- PRÁCE S GRIDEM ---
        // Vytvoreni gridu
        createGrid: function (appendToElement, isSettingTemplates) {
            var that = this;

            

            // Úprava akcí pro aktuální nastavení
            function actionSettingsUser() {
                var selectedSetting = that.element.find("#userSettings").ggrid("getSelection");
                if (selectedSetting.length == 1) {
                    that.actions.deleteUserSettings.update({ enabled: true });
                    that.actions.transferFromUserToShare.update({ enabled: true });
                    while (selectedSetting[0].ParentId != null) {
                        selectedSetting[0] = that.findParentById(selectedSetting[0].ParentId, false);
                        if (selectedSetting[0].Value == "[]") {
                            that.actions.transferFromUserToShare.update({ enabled: false });
                            break;
                        }
                    }
                } else {
                    that.actions.deleteUserSettings.update({ enabled: false });
                    that.actions.transferFromUserToShare.update({ enabled: false });
                }
            }

            // Úprava akcí pro šablonu nastavení
            function actionSettingTemplate() {
                var selectedSetting = that.element.find("#settingTemplate").ggrid("getSelection");
                if (selectedSetting.length == 1) {
                    that.actions.deleteSettingTemplate.update({ enabled: true });
                    var path = selectedSetting[0].Parents;
                    var pa = path.split(".");
                    var parentLocked = pa.length > 1 && that.settingTemplate.isLocked(pa.slice(0, -1).join(".")) === true;
                    if (parentLocked || that.settingTemplate.isLocked(path))
                        that.actions.unlockAndLockSettingTemplate.update({ enabled: !parentLocked, caption: "jres:33000013", icon: "fa-unlock-alt" }); //RC 33000013 : Odemknout
                    else
                        that.actions.unlockAndLockSettingTemplate.update({ enabled: checkIfParentNotArray(path), caption: "jres:33000014", icon: "fa-lock" }); //RC 33000014 : Zamknout
                } else {
                    that.actions.deleteSettingTemplate.update({ enabled: false });
                    that.actions.unlockAndLockSettingTemplate.update({ enabled: false });
                }
            }

            function checkIfParentNotArray(path) {
                var pathArray = path.split(".");
                var isNotArray = true;
                var rePath = "";
                for (var i = 0; i < (pathArray.length - 1); i++) {
                    rePath += pathArray[i];
                    if (Array.isArray(that.settingTemplate.get(rePath))) {
                        isNotArray = false;
                        break;
                    }
                    rePath += ".";
                }
                return isNotArray;
            }

            actionSettingTemplate();
            actionSettingsUser();
            var widgetName;
            var updateDate;
            var identification = "userSettings";
            if (isSettingTemplates == true)
                identification = "settingTemplate";
            var gridSettings = appendToElement.attr("id", identification).css("height", "calc(100% - 3.9rem)").addClass("admin-mode-settings").ggrid({
                name: identification + "Grid",
                columnMode: "fit",
                navigationMode: "cell",
                dataKey: ["Parents"],
                contextMenu: function (cellContext) {
                    if (isSettingTemplates)
                        return that.actions.createBar(["addSettingTemplate*", { action: "updateInstanceSettingTemplate*", visible: window["ginisDevelopMode"] }, "deleteSettingTemplate*", "unlockAndLockSettingTemplate*", "-", "exportSettingTemplate*"])
                    else
                        return that.actions.createBar(["addUserSettings*", { action: "updateUserSettingsInstance*", visible: window["ginisDevelopMode"] }, "deleteUserSettings*", "transferFromUserToShare*", "-", "exportUserSettings*"])
                },
                selection: function (ev, ctx) {
                    if (isSettingTemplates)
                        actionSettingTemplate();
                    else
                        actionSettingsUser();
                },
                defaultProfile: {
                    columnList: "Name, IsLocked, Value",
                },
                rowsEnabled: function (m) {
                    return !(m.data.Value == "[]" || m.data.Value == "{}" || m.data.Value == "Null");
                },
                columns: new Gordic.Data.GridFormat()
                    .addStructureColumn({
                        name: "Name",
                        caption: "jres:31150014", //RC 31150014 : Název
                        customClass: "ui-disabled",
                    })
                    .addIconColumn({
                        name: "IsLocked",
                        caption: "jres:33000001",  //RC 33000001 : Zamčeno
                        description: "jres:25000085", //RC 25000085 : Toto nastavení je řízeno šablonou a uživatel jej nemůže změnit
                        customClass: "ui-disabled",
                        headerTemplate: Gordic.Templates.iconTemplate({ icon: "fa-lock" }),
                        formatPreset: "icon",
                        iconTemplate: function (data, meta) {
                            var path = data.Parents;
                            var pa = path.split(".");
                            var parentLocked = pa.length > 1 && that[isSettingTemplates ? "settingTemplate" : "globalSettings"].isLocked(pa.slice(0, -1).join(".")) === true;
                            if (parentLocked)
                                return { icon: "fa-lock g-state-inactive g-state-text", text: "jres:33000001", tooltip: "jres:25000085" } //RC 25000085 : Toto nastavení je řízeno šablonou a uživatel jej nemůže změnit
                            if (that[isSettingTemplates ? "settingTemplate" : "globalSettings"].isLocked(path))
                                return { icon: "fa-lock", text: "jres:33000001", tooltip: "jres:25000085" } //RC 25000085 : Toto nastavení je řízeno šablonou a uživatel jej nemůže změnit
                        }
                    })
                    .addTextColumn({
                        name: "Value",
                        caption: "jres:25000005", //RC 25000005 : Hodnota
                        cellTemplate: function (d, m) {
                            if (d.Value == "[]")
                                return "[" + d.data.length + "]";
                            else if (d.Value == "{}" && $.isEmptyObject(d.data))
                                return "empty"
                            else if (d.Value == "{}")
                                return "{...}"
                            else if (d.Value == null)
                                return "null";
                            else
                                return d.Value.toString();
                        },
                        editor: function (meta) {
                            widgetName = "";
                            var data = meta.cellInfo.data;
                            var realValue;
                            if (isSettingTemplates == true)
                                realValue = that.settingTemplate.get(data.Parents);
                            else
                                realValue = that.globalSettings.get(data.Parents);
                            if (typeof (realValue) == "number") { return { widget: "gnumberbox", } }
                            else if (typeof (realValue) == "boolean") { return { widget: "gcheck" } }
                            else if (typeof (realValue) == "string") { return { widget: "gstringbox" } }
                            return { widget: "gstringbox" }
                        }
                    })
                    .addTextColumn({
                        name: "Parents",
                        caption: "jres:33000002", //RC 33000002 : Cesta
                    })
            }).ggridcelleditor({
                moveDirection: "down",
                change: function (ev, ctx) {
                    var data = ctx.cellInfo.data;
                    that.updateProperty(data, isSettingTemplates);
                    if (isSettingTemplates == true)
                        that.refreshsettingTemplateToDatabase();
                }
            }).gautofit();
            return gridSettings;
        },

        // --- fORMULÁŘE PRO EDITACI ---
        // Smazat proměnnou v gridu
        formDeleteProperty: function (isSettingTemplates) {
            var that = this;
            function deleteVariable(data) {
                var setting;
                if (isSettingTemplates)
                    setting = that.settingTemplate;
                else
                    setting = that.globalSettings;
                var analyze = that.secureCheckData(data, setting);
                var treeAll = new GStor(setting.get(null, true));
                if (analyze.NewPath == data.Parents) {
                    setting.remove(data.Parents);
                    var locked = setting.__data._lockedSections;
                    if (locked != undefined && locked != null) {
                        if (locked.length > 0) {
                            var index = locked.indexOf(data.Parents);
                            if (index != -1)
                                locked.splice(index, 1);
                            do {
                                index = -1;
                                for (var i = 0; i < locked.length; i++) {
                                    if (locked[i].startsWith(data.Parents + ".") == true) {
                                        index = i;
                                        break;
                                    }
                                }
                                if (index >= 0) {
                                    locked.splice(index, 1);
                                }
                            } while (index != -1)
                        }
                    }
                } else {
                    var newArray = that.getArrayWithPathValues(treeAll, analyze);
                    var changingObject = newArray[newArray.length - 1];
                    if (Array.isArray(changingObject)) {
                        for (var k = 0; k < changingObject.length; k++) {
                            if (data.Value != null) {
                                if (k.toString() == data.Name) {
                                    changingObject.splice(k, 1);
                                    break;
                                }
                            } else {
                                if (k == data.Name)
                                    changingObject.splice(k, 1);
                            }
                        }
                    } else
                        delete changingObject[data.Name];
                    if (isSettingTemplates)
                        that.settingTemplate.set(analyze.NewPath, newArray[0]);
                    else
                        that.globalSettings.set(analyze.NewPath, newArray[0]);
                }
                if (isSettingTemplates)
                    that.refreshsettingTemplate();
                else
                    that.refreshUserData();
            }

            var data = that.getRowFromGrid(isSettingTemplates);
            this.dialogs.confirm(String.Format("jres:33000003", data.Parents)).on("yes", function () { //RC 33000003 : Smazat proměnnou: <b>{0}</b> včetně proměnných na ní navázaných?
                deleteVariable(data);
            })
        },

        lockedSectionsForm: function () {
            var setting = this.settingTemplate;
            var locked = setting.__data._lockedSections;
            var lockedItems = [];
            locked.forEach(function (item) {
                lockedItems.push({ item: item });
            })
            var form = new Gordic.Forms.Form({
                layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0",
                name: "formLokedSections"
            }).addRow("jres:33000073").addField("gselectbox", { //RC 33000073 : Uzamčení sekce
                name: "lockedSections",
                data: lockedItems,
                initialValue: lockedItems,
                multi: true,
                itemTemplate: "{item}",
                itemWidth: "w-12",
            })
            this.dialogs.simpleForm("jres:33000074", form, {}, {
                height: 400,
                width: 500,
                commandBar: [
                    {
                        primary: true,
                        action: this.actions.actLockedSectionsAdmOk
                    }, 
                    {
                        action: this.actions.actLockedSectionsAdmCancel
                    }
                ]
            })
        },

        actLockedSectionsAdmOk: function (ev) {
            var cnt = $.content(ev.target);
            var values = cnt.findFields("lockedSections").gfield("getValue");
            var valuesArr = [];
            values.forEach(function (item) {
                valuesArr.push(item.item);
            })
            this.settingTemplate.__data._lockedSections = valuesArr;
            this.refreshsettingTemplate();
            cnt.close();
        },

        // Nový formulář pro přidání porměnné pole atd.
        formAddOrUpdateProperty: function (isSettingTemplates, updateVariable) {
            var that = this;

            // Získání typu hodnoty, hlavně pro určení jaké políčko se má zobrazit
            function getTypeOfValue(value) {
                if (value == "Null")
                    return "Null";
                else if (Array.isArray(value) == true)
                    return "Array";
                else if (typeof (value) == "object")
                    return "Object";
                switch (typeof (value)) {
                    case "boolean":
                        return "Boolean";
                    case "number":
                        return "Number";
                    case "string":
                        return "String";
                }
            }

            // Získání hodnoty z políčka
            function getValueFromForm(objectType, cnt) {
                var hodnota;
                switch (objectType) {
                    case "String":
                        hodnota = cnt.findFields("StringValue").gfield("getValue");
                        return (hodnota == null) ? "" : hodnota;
                    case "Number":
                        hodnota = cnt.findFields("NumberValue").gfield("getValue");
                        return hodnota;
                    case "DateTime":
                        hodnota = cnt.findFields("DateTimeValue").gfield("getValue");
                        return hodnota.toISOString();
                    case "Date":
                        hodnota = cnt.findFields("DateValue").gfield("getValue");
                        return hodnota.toISOString();
                    case "Boolean":
                        return cnt.findFields("BooleanValue").gfield("getValue");
                    case "Object":
                        return JSON.parse(cnt.findFields("ObjectValue").gfield("getValue"));
                    case "Array":
                        return JSON.parse(cnt.findFields("ArrayValue").gfield("getValue"));
                    case "Null":
                        return null;
                }
            }

            function updateAfterDialog(data, resultValue) {
                data.Value = resultValue;
                that.updateProperty(data, isSettingTemplates);
                if (isSettingTemplates)
                    that.refreshsettingTemplate();
                else
                    that.refreshUserData();
            }
            var data = this.getRowFromGrid(isSettingTemplates);
            var settings = (isSettingTemplates) ? this.settingTemplate : this.globalSettings;
            var dataValue = (data) ? settings.get(data.Parents) : "";
            if (data != undefined) {
                if ((data.Value != "[]") && (data.Value != "{}") && (data.Value != null) && (updateVariable == false))
                    data = this.findParentById(data.ParentId, isSettingTemplates);
            }
            var dataForCheck = (data != undefined) ? dataValue : {};
            var initialValue = (Array.isArray(dataForCheck)) ? dataForCheck.length : "";

            var radios = new Array();
            radios.push(
                { value: "Object", label: "jres:33000017" }, //RC 33000017 : Objekt
                { value: "Array", label: "jres:33000018" }, //RC 33000018 : Pole
                { value: "String", label: "jres:33000006" }, //RC 33000006 : Text
                { value: "Number", label: "jres:33000007" } //RC 33000007 : Číslo
            );
            if (updateVariable == false) {
                radios.push(
                    { value: "Date", label: "jres:33000059" }, //RC 33000059 : Datum
                    { value: "DateTime", label: "jres:33000008" } //RC 33000008 : Datum a čas
                );
            }
            radios.push({ value: "Boolean", label: "jres:33000009" }); //RC 33000009 : Logická hodnota
            if (updateVariable == true)
                radios.push({ value: "Null", label: "jres:33000056" }); //RC 33000056 : Nulová hodnota

            var jsonValidator = new Gordic.Validators.Base({
                message: "jres:25000146", //RC 25000146 : Neplatný JSON
                validate: function (value) {
                    try { JSON.parse(value); return true; }
                    catch (e) { this.message = "jres:25000146<br>" + e.name + ": " + e.message; return false; }
                }
            });
            var formNewVariable = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1, L-2-10-0, M-2-10-0, S-2-10-0", name: "formNewVariable" })
                .addRow("jres:33000015").addField("gstringbox", { //RC 33000015 : Větev
                    name: "Parent",
                    initialValue: (data == undefined) ? "" : data.Parents,
                    disabled: true,
                })
                .addRow("jres:31150014").addField("gstringbox", { //RC 31150014 : Název
                    name: "Name",
                    initialValue: (updateVariable == false) ? initialValue : data.Parents,
                    emptyValue: (Array.isArray(dataForCheck)) ? 0 : null,
                    disabled: Array.isArray(dataForCheck) || updateVariable,
                    validators: [new Gordic.Validators.Required({ stopping: true })],
                })
                .addRow("jres:33000016").addField("gradio", { //RC 33000016 : Typ
                    name: "Type",
                    itemClass: "w-6",
                    validators: [new Gordic.Validators.Required({ stopping: true })],
                    initialValue: (updateVariable == true) ? getTypeOfValue(dataValue) : "Object",
                    radios: radios,
                    change: function (ev, changeObj) {
                        var cnt = $.content($(ev.target));
                        cnt.findFields(".js-valuetype").gformrow().hide();
                        cnt.findFormRows("field:{0}Value".format(changeObj.value)).show();
                    }
                })
                .addRow("jres:33000049").addField("gstringbox", { name: "StringValue", customClass: "js-valuetype", initialValue: (getTypeOfValue(dataValue) == "String" && updateVariable == true) ? data.Value : null }) //RC 33000049 : Hodnota
                .addRow("jres:33000049").addField("gnumberbox", { name: "NumberValue", customClass: "js-valuetype", initialValue: (getTypeOfValue(dataValue) == "Number" && updateVariable == true) ? data.Value : null }) //RC 33000049 : Hodnota
                .addRow("jres:33000049").addField("gdatebox", { name: "DateValue", customClass: "js-valuetype", valueType: "date", initialValue: new Date(), validators: [new Gordic.Validators.Required({ stopping: true })] }) //RC 33000049 : Hodnota
                .addRow("jres:33000049").addField("gdatebox", { name: "DateTimeValue", customClass: "js-valuetype", valueType: "datetime", initialValue: new Date(), validators: [new Gordic.Validators.Required({ stopping: true })] }) //RC 33000049 : Hodnota
                .addRow("jres:33000049").addField("gcheck", { name: "BooleanValue", customClass: "js-valuetype", initialValue: (getTypeOfValue(dataValue) == "Boolean" && updateVariable == true) ? data.Value : null }) //RC 33000049 : Hodnota
                .addRow("jres:33000049").addField("gstringbox", { name: "ArrayValue", customClass: "js-valuetype", rows: 4, initialValue: (getTypeOfValue(dataValue) == "Array" && updateVariable == true) ? JSON.stringify(data.data) : null, validators: [jsonValidator] }) //RC 33000049 : Hodnota
                .addRow("jres:33000049").addField("gstringbox", { name: "ObjectValue", customClass: "js-valuetype", rows: 4, initialValue: (getTypeOfValue(dataValue) == "Object" && updateVariable == true) ? JSON.stringify(data.data) : null, validators: [jsonValidator] }); //RC 33000049 : Hodnota

            this.dialogs.simpleForm((updateVariable == true) ? "jres:33000053" : "jres:33000019", formNewVariable, {}, { //RC 33000053 : Upravit proměnnnou
                height: (updateVariable == false) ? 400 : 330,
                width: 600,
                open: function (ev, ctx) {
                    $(this).findFields(".js-valuetype").gformrow().hide();
                    if (updateVariable == true)
                        $(this).findFormRows("field:Parent").hide();
                    $(this).findFormRows("field:{0}Value".format(updateVariable == true ? getTypeOfValue(dataValue) : "Object")).show();
                },
                commandBar: [{
                    primary: true,
                    action: new GAction({
                        name: "actSaveVariable",
                        caption: "jres:31968013", //RC 31968013 : Uložit
                        icon: "fa-save",
                        run: function (ev, ctx) {
                            var cnt = $.content($(ev.target));
                            if (cnt.findFields("form:formNewVariable").filter(":visible").gform("isValid")) {
                                // Uložení dat z formuláře do proměnných
                                var name = cnt.findFields("Name").gfield("getValue");
                                var typeValue = cnt.findFields("Type").gfield("getValue");
                                var resultValue = getValueFromForm(typeValue, cnt);
                                if (updateVariable == true) {
                                    /*  var oldType = getTypeOfValue(dataValue);
                                      if (oldType == typeValue && (typeValue == "Object" || typeValue == "Array")) {
                                          that.dialogs.confirm("jres:33000057".format(data.Parents)).on("yes", function () { //RC 33000057 : Zvolený typ instance <b>{0}</b> je stejný jako původní. Přejete si smazat podřízené proměnné?
                                              updateAfterDialog(data, resultValue);
                                          })
                                      } else */
                                    that.dialogs.confirm("jres:33000058".format(data.Parents)).on("yes", function () { //RC 33000058 : Opravdu si přejete přepsat proměnnou <b>{0}</b>?
                                        updateAfterDialog(data, resultValue);
                                    })
                                } else {
                                    // Pokud přidávám novou proměnou
                                    // Analýza a uložení dat do objektu
                                    if (data == undefined) {
                                        settings.set(name, resultValue);
                                    } else {
                                        var analyze = that.secureCheckData(data, settings);
                                        var treeAll = new GStor(settings.get(null, true));
                                        if ((analyze.NewPath == data.Parents) && (Array.isArray(treeAll.get(analyze.NewPath)) == false)) {
                                            settings.set(data.Parents + "." + name, resultValue);
                                        } else {
                                            var newArray = that.getArrayWithPathValues(treeAll, analyze);
                                            var changingObject = newArray[newArray.length - 1];
                                            if (Array.isArray(changingObject)) {
                                                if (name != changingObject.length) {
                                                    for (var i = 0; i < changingObject.length; i++) {
                                                        if (i == data.Name) {
                                                            if (Array.isArray(changingObject[i])) {
                                                                changingObject[i].push(resultValue);
                                                            } else {
                                                                changingObject[i][name] = resultValue;
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    changingObject.push(resultValue);
                                                }
                                                settings.set(analyze.NewPath, newArray[0]);
                                            }
                                        }
                                    }
                                }
                                cnt.close();
                                if (isSettingTemplates)
                                    that.refreshsettingTemplate();
                                else
                                    that.refreshUserData();
                            }
                        }
                    })
                }]
            })

        },

        // Formulář pro export
        formExport: function (isSettingTemplates) {
            var validatorFileName = new Gordic.Validators.Base({ message: "jres:33000062" }); //RC 33000062 : Tento název nelze použít.
            validatorFileName.validate = function (value, source) {
                var denyChars = ['<', '>', ':', '"', '\\', '/', '|', '?', '*'];
                var nonValidName = true;
                denyChars.forEach(function (char) {
                    if (value.indexOf(char) != -1)
                        nonValidName = false;
                })
                return nonValidName;
            }
            validatorFileName.stopping = true;

            var that = this;
            var settings = (isSettingTemplates) ? this.settingTemplate : this.globalSettings;
            var result;
            var newPath = "";
            if (this.getRowFromGrid(isSettingTemplates) != null) {
                var pathArray = this.getPathParametersFromString(this.getRowFromGrid(isSettingTemplates).Parents);
                var data;
                for (var i = 0; i < pathArray.length; i++) {
                    newPath += pathArray[i];
                    if (Array.isArray(settings.get(newPath))) {
                        data = settings.get(newPath);
                        break;
                    }
                    if (i < (pathArray.length - 1))
                        newPath += ".";
                }
                if (newPath == this.getRowFromGrid(isSettingTemplates).Parents)
                    data = settings.get(this.getRowFromGrid(isSettingTemplates).Parents);
                result = this.createPartToJsonWithPath(data, newPath);
            } else {
                result = "{}";
            }

            var formExportData = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, LMS-3-9-0", customClass: "formExport" })
                .addSection()
                .addRow("jres:33000061").addField("gstringbox", "w-10", { //RC 33000061 : Název souboru
                    name: "FileName",
                    initialValue: "data",
                }).addField("gstringbox", "w-2", {
                    name: "Extension",
                    initialValue: ".json",
                    disabled: true,
                })
                .addSection()
                .addRow("jres:33000015").addField("gstringbox", { //RC 33000015 : Větev
                    name: "Path",
                    disabled: true,
                    initialValue: newPath,
                })
                .addRow("jres:25000092").addField("gradio", {  //RC 25000092 : Exportovat
                    name: "ExportType",
                    itemClass: "w-6",
                    validators: [new Gordic.Validators.Required({ stopping: true })],
                    initialValue: "ExportPart",
                    radios: [
                        { value: "ExportPart", label: "jres:33000021" }, //RC 33000021 : Vybranou větev (vč. zanoření)
                        { value: "ExportAll", label: "jres:33000022" }, //RC 33000022 : Celé nastavení
                    ],
                    change: function (ev, changeObj) {
                        var cnt = $.content($(ev.target));
                        if (changeObj.value == "ExportPart") {
                            cnt.findFields("ExportData").gfield("setValue", result);
                            cnt.findFields("Path").gfield("setValue", newPath);
                        } else {
                            cnt.findFields("ExportData").gfield("setValue", that.createStringifyFromObject(settings.get(null, true)));
                            cnt.findFields("Path").gfield("setValue", "");
                        }
                    }
                })
                .addRow("jres:33000020").addField("gstringbox", { //RC 33000020 : Data
                    name: "ExportData",
                    rows: 8,
                    initialValue: result,
                    wrap: true,
                    validators: [new Gordic.Validators.Required()],
                })

            var dlg = this.dialogs.simpleForm("jres:33000023", formExportData, {}, { //RC 33000023 : Export
                height: 430,
                width: 600,
                commandBar: [
                    {
                        action: new GAction({
                            name: "actExportVarible",
                            caption: "jres:33000024", //RC 33000024 : Kopírovat
                            icon: "fa-clipboard",
                            run: function (ev, ctx) {
                                var cnt = $.content(dlg);
                                var form = cnt.findForms(".formExport");
                                form.findFields("FileName").gfield("setValidators", [])
                                if (form.gform("isValid")) {
                                    var data = $("[data-field='ExportData'] textarea");
                                    data.select();
                                    document.execCommand("copy");
                                }
                            }
                        })
                    },
                    {
                        primary: true,
                        action: new GAction({
                            name: "actExportVarible",
                            caption: "jres:33000023", //RC 33000023 : Export
                            icon: "fa-save",
                            run: function (ev, ctx) {
                                var cnt = $.content(dlg);
                                var form = cnt.findForms(".formExport");
                                form.findFields("FileName").gfield("setValidators", [validatorFileName])
                                if (form.gform("isValid")) {
                                    var data = cnt.findFields("ExportData").gfield("getValue");
                                    var filename = cnt.findFields("FileName").gfield("getValue");
                                    that.downloadJsonFile(data, filename);
                                }
                            }
                        })
                    }
                ]
            })
        },

        // Formulář pro import dat
        formImportDataNew: function (isSettingTemplates) {
            var that = this;
            var formSettings = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1, LMS-2-10-0", customClass: "importPartdata" })
                .addSection()
                .addRow("jres:33000027").addField("gfilefield", { //RC 33000027 : JSON soubor
                    name: "jsonFile",
                    acceptExtension: ".json",
                    change: function (ev, changeObj) {
                        var cnt = $.content($(ev.target));
                        if (changeObj.value.length != 0) {
                            let file = cnt.findFields("jsonFile").gfilefield("getValue")[0];
                            that.callToImport(file).done(function (o) {
                                cnt.findFields("Preview").gfield("setValue", o);
                            });
                        } else {
                            cnt.findFields("Preview").gfield("setValue", "");
                        }
                    }
                })
                .addRow("jres:33000020").addField("gstringbox", { //RC 33000020 : Data
                    name: "Preview",
                    validators: [new Gordic.Validators.Required({ stopping: true })],
                    rows: 8,
                    wrap: true
                })
                .addRow().addField("gradio", { //RC 33000025 : Způsob
                    name: "ImportType",
                    itemClass: "w-6",
                    validators: [new Gordic.Validators.Required({ stopping: true })],
                    initialValue: "ImportLikePart",
                    radios: [
                        { value: "ImportLikePart", label: "jres:33000041" }, //RC 33000041 : Sloučit s existujícím nastavením
                        { value: "ImportEntire", label: "jres:33000026" }, //RC 33000026 : Vymazat existující nastavení!
                    ],
                })

            var dlg = this.dialogs.simpleForm("jres:33000028", formSettings, {}, { //RC 33000028 : Import
                height: 350,
                width: 700,
                commandBar: [
                    {
                        primary: true,
                        action: new GAction({
                            name: "actImportJsonData",
                            caption: "jres:33000029", //RC 33000029 : Importovat
                            icon: "fa-download",
                            run: function (ev, ctx) {
                                var data;
                                var cnt = $.content(dlg);
                                cnt.findFields("Preview").gfield("resetErrors");
                                if (cnt.findForms(".importPartdata").gform("isValid")) {
                                    cnt.findFields("Preview").gfield("getValueAsync").done(function (value) {
                                        try {
                                            data = JSON.parse(value);
                                            var settings = (isSettingTemplates) ? that.settingTemplate : that.globalSettings;
                                            if (cnt.findFields("ImportType").gfield("getValue") == "ImportLikePart") {
                                                var pomObjekt = data;
                                                var newPath = "";
                                                var k = null;
                                                while ($.isPlainObject(pomObjekt) && (k = Object.keys(pomObjekt)).length == 1) {
                                                    newPath += k[0] + ".";
                                                    pomObjekt = pomObjekt[k[0]];
                                                }
                                                newPath = newPath.slice(0, -1);
                                                settings.merge(newPath, pomObjekt);
                                            } else {
                                                if (isSettingTemplates)
                                                    that.settingTemplate.__data = data;
                                                else
                                                    that.globalSettings.__data = data;
                                            }
                                            cnt.close();
                                            if (isSettingTemplates)
                                                that.refreshsettingTemplate();
                                            else
                                                that.refreshUserData();
                                        } catch (exception) {
                                            cnt.findFields("Preview").gfield("setError", "jres:33000031");
                                        }
                                    });
                                }
                            }
                        })
                    }
                ]
            })
        },

        // --- ZAMKNUTI A ODEMKNUTI ---
        // Zamknuti promenne
        lockProperty: function (data, treesettings) {
            //var that = this;
            //var data = that.getRowFromGrid(isSettingTemplates);
            if (!treesettings.__data._lockedSections) {
                treesettings.set("_lockedSections", [])
            }
            var lockedArray = treesettings.__data._lockedSections || [];
            var pathArray = this.getPathParametersFromString(data.Parents)
            var pathPart = "";
            var foundInArray = false;
            pathArray.forEach(function (item) {
                pathPart += item;
                for (var i = 0; i < lockedArray.length; i++) {
                    if (lockedArray[i] == pathPart) {
                        foundInArray = true;
                        break;
                    }
                }
                pathPart += ".";
            })
            if (foundInArray == false) {
                lockedArray.push(data.Parents);
                for (var i = 0; i < lockedArray.length - 1; i++) {
                    if (lockedArray[i].indexOf(data.Parents) == 0) {
                        lockedArray.splice(i, 1);
                    }
                }
                treesettings.set("_lockedSections", lockedArray);
            }
        },

        // Odemknuti promenne
        unlockProperty: function (data, treeSettings) {
            //var that = this;
            //var data = that.getRowFromGrid(isSettingTemplates);
            if (!treeSettings.__data._lockedSections) {
                treeSettings.set("_lockedSections", [])
            }
            var lockedArray = treeSettings.__data._lockedSections || [];
            for (var i = 0; i < lockedArray.length; i++) {
                if (lockedArray[i] == data.Parents) {
                    lockedArray.splice(i, 1);
                }
            }
            treeSettings.set("_lockedSections", lockedArray);
        },

        // Odemknuti a zamknuti promenne
        lockAndUnlockProperty: function (isSettingTemplates) {
            var settings = (isSettingTemplates) ? this.settingTemplate : this.globalSettings;
            var data = this.getRowFromGrid(isSettingTemplates)
            if (settings.isLocked(data.Parents))
                this.unlockProperty(data, settings);
            else
                this.lockProperty(data, settings);
            if (isSettingTemplates)
                this.refreshsettingTemplate();
            else
                this.refreshUserData();
        },

        // --- PRENESENI DAT ---
        // Formular preneseni hodnoty z jednoho gridu do druhého (u pole kontroluji, zda je tam, pokud tam je vkládám celé pole)
        formTransferSettings: function (isSourceUserSettings) {
            var that = this;
            var selection = this.getRowFromGrid(!isSourceUserSettings);
            var oldData = this.globalSettings.get(selection.Parents);
            var mergeData = JSON.stringify(oldData);
            var selectedSetting = this.findFields("selectSetting").gfield("getValue");

            // Pro případ zobrazení celé cesty k objektu
            var object = {};
            this.createNestedObject(object, this.getPathParametersFromString(selection.Parents), oldData);
            // -----------------------------------------

            var formTransferSetting = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1, L-2-10-0, M-2-10-0, S-2-10-0", customClass: "formTransferSetting" })
                .addRow("jres:33000015").addField("gstringbox", { //RC 33000015 : Větev
                    name: "Parent",
                    disabled: true,
                    initialValue: selection.Parents,
                })
                .addRow("jres:33000025").addField("gselectbox", { //RC 33000025 : Způsob
                    name: "TransferType",
                    dropdown: true,
                    data: new Gordic.Data.View([{ key: "set", value: "jres:25000090" }, { key: "merge", value: "jres:25000091" }], { key: "key" }), //RC 25000090 : Nahradit cílovou větev
                    initialValue: { key: "set" },
                    itemTemplate: "{value}",
                    validators: [new Gordic.Validators.Required()],
                })
                .addRow("jres:33000020").addField("gstringbox", { //RC 33000020 : Data
                    name: "Data",
                    rows: 8,
                    initialValue: mergeData,
                    validators: [new Gordic.Validators.Required({ stopping: true })]
                })

            var dlg = this.dialogs.simpleForm("jres:33000030", formTransferSetting, {}, { //RC 33000030 : Přenést
                height: 330,
                width: 600,
                commandBar: [
                    {
                        primary: true,
                        action: new GAction({
                            name: "actTransferSettings",
                            caption: "jres:33000030", //RC 33000030 : Přenést
                            icon: "fa-arrow-right",
                            enabled: (selectedSetting == null) ? false : true,
                            run: function (ev, ctx) {
                                var cnt = $.content(dlg);
                                cnt.findFields("Data").gfield("resetErrors");
                                if (cnt.findForms(".formTransferSetting").gform("isValid")) {
                                    cnt.findFields("Data").gfield("getValueAsync").done(function (value) {  // TSKALA: tohle nedava moc smysl. Po IsValid se uz na hodnoty neceka. Standardni poradi volani s async ochranou je waitForValues -> IsValid -> Save 
                                        try {
                                            var transferType = cnt.findFields("TransferType").gfield("getValue").key;
                                            var result = JSON.parse(value);
                                            that.settingTemplate[transferType || "set"](selection.Parents, result);
                                            that.refreshsettingTemplate();
                                            cnt.close();
                                        } catch (exception) {
                                            cnt.findFields("Data").gfield("setError", "jres:33000031");
                                        }
                                    });
                                } else {
                                    return $.Deferred().reject().promise();
                                }
                            }
                        })
                    }
                ]
            })
        },

        // --- EDITACE DATABAZE
        // Funkce pro správu šablony nastavení v databázi
        // Formulář pro přidání nového nastavení
        formSettingTemplateDb: function (newTemplate) {
            var that = this;
            var settingtemplate = this.findFields("selectSetting").gfield("getValue");
            var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1, LMS-2-10-0", customClass: "formAddToDb" })
                .addRow("jres:31150014").addField("gstringbox", { //RC 31150014 : Název
                    name: "Name",
                    initialValue: (newTemplate == true) ? "" : settingtemplate.nazev,
                    disabled: (newTemplate == true) ? false : true,
                    validators: [new Gordic.Validators.Required({ stopping: true })]
                })
            if (this.canUpdateNote == true) {
                form.addRow("jres:33000065").addField("gstringbox", { //RC 33000065 : Poznámka
                    rows: 3,
                    name: "Note",
                    initialValue: (newTemplate == true) ? "" : settingtemplate.poznamka,
                    validators: [new Gordic.Validators.Length({ max: 254, stopping: true })]
                })
            }
            var dlg = this.dialogs.simpleForm((newTemplate == true) ? "jres:33000054" : "jres:33000063", form, {}, { //RC 33000063 : Upravit nastavení
                height: (this.canUpdateNote == true) ? 230 : 130,
                width: 600,
                commandBar: [
                    {
                        customClass: "smartnav-autoclick",
                        primary: true,
                        action: new GAction({
                            name: "actNewSettingDb",
                            caption: "jres:31968013", //RC 31968013 : Uložit
                            icon: "fa-save",
                            run: function (ev, ctx) {
                                var cnt = $.content(dlg);
                                cnt.findFields("Name").gfield("resetErrors");
                                if (cnt.findForms(".formAddToDb").gform("isValid")) {
                                    var name = cnt.findFields("Name").gfield("getValue");
                                    var note = "";
                                    if (that.canUpdateNote == true) note = cnt.findFields("Note").gfield("getValue");
                                    if (newTemplate == true) {
                                        that.isl.SettingTemplate.create({ data: { nazev: name, poznamka: note } }).get().then(function (result) {
                                            cnt.close();
                                            return that.isl.SettingTemplate.list({ fragments: ["base"] }).getView().done(function (ret) {
                                                that.findFields("selectSetting").gfield("option", "data", ret);
                                                that.findFields("selectSetting").gfield("setValue", result.data);
                                            })
                                        }).fail(function (jqXHR, typ, exc) {
                                            if ((typ === "exception") && (exc.data.member == "DuplicateName")) {
                                                exc.handled = true;
                                                cnt.findFields("Name").gfield("setError", "jres:33000032"); //RC 33000032 : Tento název pro tuto fázi již existuje. Zvolte jiný název.
                                            }
                                        });
                                    } else {
                                        settingtemplate.nazev = name;
                                        settingtemplate.poznamka = note;
                                        settingtemplate.obsah = that.createStringifyFromObject(that.settingTemplate.get(null, true));
                                        that.isl.SettingTemplate.update({ data: settingtemplate }).get().then(function (result) {
                                            cnt.close();
                                        })
                                    }
                                }
                            }
                        })
                    }
                ]
            })
        },

        // Formulář pro smazání nastavení z DB
        formDeleteSettingTemplateFromDb: function () {
            var that = this;
            var setting = this.findFields("selectSetting").gfield("getValue");
            if (setting != null) {
                this.dialogs.confirm(String.Format("jres:33000033", setting.nazev)).on("yes", function () { //RC 33000033 : Smazat nastavení <b>{0}</b> z databáze
                    that.isl.SettingTemplate.delete({ data: { ixs_unw: setting.ixs_unw } }).get().done(function (ret) {
                        that.notification("showToast", {
                            content: "jres:33000034",  //RC 33000034 : Nastavení bylo úspěšně smazáno.
                            state: "success",
                        });
                        that.isl.SettingTemplate.list({ fragments: ["base"] }).getView().done(function (ret) {
                            that.findFields("selectSetting").gfield("option", "data", ret);
                            var row = ret.getDataRows()[0];
                            if (row) {
                                that.findFields("selectSetting").gfield("setValue", row);
                                if (row.ixs_unw != null) {
                                    that.isl.SettingTemplate.read({ data: { ixs_unw: row.ixs_unw } }).getData().done(function (rtn) {
                                        var data = JSON.parse(rtn.obsah)
                                        that.settingTemplate = new GStor(data);
                                        //that.refreshsettingTemplate();  // TS-20210420 : na read hned volat savetodb? 
                                        that.refreshData("settingTemplate", that.loadsettingTemplate(that.settingTemplate));
                                    })
                                }
                            }
                        })
                    });
                })
            }
        },

        // Užení šablony nastavení do databáze
        refreshsettingTemplateToDatabase: function () {
            var obsah = this.createStringifyFromObject(this.settingTemplate.get(null, true));
            var selectSetting = this.findFields("selectSetting").gfield("getValue");
            this.isl.SettingTemplate.update({ data: { ixs_unw: selectSetting.ixs_unw, nazev: selectSetting.nazev, obsah: obsah, poznamka: (selectSetting.poznamka != undefined) ? selectSetting.poznamka : null } }).get();
        },

        // --- AKCE A FORMULARE ---
        // Formulář pro aktuální nastavení
        formUserSettings: function (parentElement) {
            return $("<div>").appendTo(parentElement).gtab({
                title: "jres:33000035", //RC 33000035 : Aktuální nastavení
                id: "userSettingsTab",
                opened: true,
                locked: true,
                icon: null,
                menuBar: this.actions.createBar([
                    ["jres:25000097", "importUserSettings*", "exportUserSettings*"], //RC 25000097 : Nastavení
                    ["jres:25000095", "addUserSettings*", { action: "updateUserSettingsInstance*", visible: window["ginisDevelopMode"] }, "deleteUserSettings*", "transferFromUserToShare*"] //RC 25000095 : Hodnoty
                ])
            })
        },

        // Formulář pro json, který je sdílený
        formSettingTemplate: function (parentElement) {
            var that = this;
            return $("<div>").appendTo(parentElement).gtab({
                id: "settingsTemplateTab",
                opened: true,
                locked: true,
                icon: null,
                menuBar: this.actions.createBar([
                    {
                        type: "widget",
                        favorite: true,
                        init: function () {
                            return $("<div>").width(250).addClass("selectSettingDb")
                                .gselectbox({
                                    buttons: [
                                        {
                                            type: "static",
                                            icon: "fa-cog",
                                            children: [
                                                { action: that.actions.addNewSettingTemplate },
                                                { action: that.actions.deleteSettingTemplateFromDb },
                                                { action: that.actions.updateSettingTemplate }
                                            ]
                                        }
                                    ],
                                    name: "selectSetting",
                                    dropdown: true,
                                    helperColumns: ["nazev"],
                                    itemTemplate: "{nazev}",
                                    change: function (ev, changeObj) {
                                        $(this).gfield("getState", "missingLicense").remove();  // vypneme varovani
                                        if (changeObj.value != null) {
                                            that.actions.importSettingTemplate.update({ enabled: true });
                                            that.actions.addSettingTemplate.update({ enabled: true });
                                            that.actions.deleteSettingTemplateFromDb.update({ enabled: true });
                                            that.actions.exportSettingTemplate.update({ enabled: true });
                                            that.actions.updateInstanceSettingTemplate.update({ enabled: true });
                                            if (that.canUpdateNote == true) that.actions.updateSettingTemplate.update({ enabled: true });
                                            if (changeObj.value.ixs_unw != null) {
                                                that.isl.SettingTemplate.read({ data: { ixs_unw: changeObj.value.ixs_unw } }).get().done(function (rtn) {
                                                    var data = JSON.parse(rtn.data.obsah);
                                                    that.settingTemplate = new GStor(data);
                                                    that.refreshsettingTemplate();
                                                })
                                            }
                                            if (that.prop("licenseUserSettingsMultiTemplates") === false && changeObj.value.ixs_unw !== "00000210A016")
                                                $(this).gfield("addState", { id: "missingLicense", icon: "g-state-warning", tooltip: "jres:25000114" }); //RC 25000114 : Licence pro správu šablon uživatelského nastavení není k dispozici. Tuto šablonu nebude možné bez této licence nastavit a použít!
                                        } else {
                                            that.actions.deleteSettingTemplateFromDb.update({ enabled: false });
                                            that.actions.exportSettingTemplate.update({ enabled: false });
                                            that.actions.deleteSettingTemplate.update({ enabled: false });
                                            that.actions.unlockAndLockSettingTemplate.update({ enabled: false });
                                            that.actions.importSettingTemplate.update({ enabled: false });
                                            that.actions.addSettingTemplate.update({ enabled: false });
                                            that.actions.updateInstanceSettingTemplate.update({ enabled: false });
                                            if (that.canUpdateNote == true) that.actions.updateSettingTemplate.update({ enabled: false });
                                        }
                                    }
                                })
                        }
                    }, ["jres:25000094", "addNewSettingTemplate", "updateSettingTemplate", "deleteSettingTemplateFromDb", "-", "importSettingTemplate*", "exportSettingTemplate*"], //RC 25000094 : Šablona
                    ["jres:25000095", "addSettingTemplate*", { action: "updateInstanceSettingTemplate*", visible: window["ginisDevelopMode"] }, "deleteSettingTemplate*", "unlockAndLockSettingTemplate*", "actLockedSectionsAdm*"], //RC 25000095 : Hodnoty
                    ["jres:25000096", "actNavigationAssistent", "actTemporaryUnlock", "actTestEnvironment"]  //RC 25000096 : Nástroje
                ])
            })
        },

        // Seznam akci v MENU v gTabech 
        registerActionList: function () {
            var that = this;
            this.actions.addRange({
                // AKCE PRO AKTUáLNÍ NASTAVENÍ
                importUserSettings: {
                    caption: "jres:33000028", //RC 33000028 : Import
                    icon: "fa-download",
                    run: function (ev, ctx) {
                        that.formImportDataNew(false);
                    }
                },
                exportUserSettings: {
                    caption: "jres:33000023", //RC 33000023 : Export
                    icon: "fa-share-square-o",
                    run: function (ev, ctx) {
                        that.formExport(false);
                    }
                },
                addUserSettings: {
                    icon: "fa-plus",
                    caption: "jres:33000036", //RC 33000036 : Přidat
                    run: function (ev, ctx) {
                        that.formAddOrUpdateProperty(false, false);
                    }
                },
                updateUserSettingsInstance: {
                    icon: "fa-pencil",
                    caption: "jres:33000055",
                    run: function (ev, ctx) {
                        that.formAddOrUpdateProperty(false, true);
                    }
                },
                deleteUserSettings: {
                    icon: "fa-trash",
                    caption: "jres:33000037", //RC 33000037 : Smazat
                    run: function (ev, ctx) {
                        that.formDeleteProperty(false)
                    }
                },
                transferFromUserToShare: {
                    icon: "fa-arrow-right",
                    visible: this.admin,
                    caption: "jres:33000030", //RC 33000030 : Přenést
                    run: function (ev, ctx) {
                        that.formTransferSettings(true);
                    }
                },
                // AKCE PRO SDÍLENÉ NASTAVENÍ
                addNewSettingTemplate: {
                    icon: "fa-plus",
                    captionVisible: "never",
                    caption: "jres:33000038", //RC 33000038 : Nová šablona
                    run: function (ev, ctx) {
                        that.formSettingTemplateDb(true)
                    }
                },
                updateSettingTemplate: {
                    icon: "fa-pencil",
                    captionVisible: "never",
                    caption: "jres:33000064", //RC 33000064 : Upravit šablonu
                    run: function (ev, ctx) {
                        that.formSettingTemplateDb(false)
                    }
                },
                deleteSettingTemplateFromDb: {
                    icon: "fa-minus",
                    captionVisible: "never",
                    caption: "jres:33000039", //RC 33000039 : Smazat šablonu
                    run: function (ev, ctx) {
                        that.formDeleteSettingTemplateFromDb();
                    }
                },
                importSettingTemplate: {
                    caption: "jres:33000028", //RC 33000028 : Import
                    icon: "fa-download",
                    run: function (ev, ctx) {
                        that.formImportDataNew(true);
                    }
                },
                exportSettingTemplate: {
                    caption: "jres:33000023", //RC 33000023 : Export
                    icon: "fa-share-square-o",
                    run: function (ev, ctx) {
                        that.formExport(true);
                    }
                },
                addSettingTemplate: {
                    icon: "fa-plus",
                    caption: "jres:33000036", //RC 33000036 : Přidat
                    run: function (ev, ctx) {
                        that.formAddOrUpdateProperty(true, false);
                    }
                },
                updateInstanceSettingTemplate: {
                    icon: "fa-pencil",
                    caption: "jres:33000055", //RC 33000055 : Upravit
                    run: function (ev, ctx) {
                        that.formAddOrUpdateProperty(true, true);
                    }
                },
                deleteSettingTemplate: {
                    icon: "fa-trash",
                    caption: "jres:33000037", //RC 33000037 : Smazat
                    run: function (ev, ctx) {
                        that.formDeleteProperty(true)
                    }
                },
                unlockAndLockSettingTemplate: {
                    icon: "fa-lock",
                    caption: "jres:33000014", //RC 33000014 : Zamknout
                    run: function (ev, ctx) {
                        that.lockAndUnlockProperty(true);
                    }
                },
                actLockedSectionsAdm: {
                    icon: "gi-folder gi-stack-bg|fa-lock gi-bgw gi-stack-fw gi-stack-pos--rb",
                    caption: "jres:33000072", //RC 33000072 : Správa zámků
                    run: function (ev, ctx) {
                        that.lockedSectionsForm();
                    } 
                },
                actLockedSectionsAdmOk: {
                    caption: "jres:33000075", //RC 33000075 : OK
                    run: function (ev, ctx) {
                        that.actLockedSectionsAdmOk(ev);
                    }
                },
                actLockedSectionsAdmCancel: {
                    caption: "jres:33000076", //RC 33000076 : Zavřít
                    run: function (ev, ctx) {
                        $.content(ev.target).close();
                    }
                },
                actNavigationAssistent: {
                    caption: "jres:25000086", //RC 25000086 : Navigační assistent
                    checked: $(document.body).gshortcut("get", "ctrl+alt+m").length > 0,
                    run: function (ev, ctx) {
                        $(".admin-mode-nav-assist").remove();
                        if (this.checked()) {
                            $(document.body).gshortcut("remove", "ctrl+alt+m");
                            this.checked(false);
                        } else {
                            var createNavAssist = function (control, us) {
                                var path = typeof us === "string" ? (us || null) : us && us.isVirtual() === false ? us.rootSection : null;
                                return $("<div class='admin-mode-nav-assist g-state-lightbackground'>")
                                    .addClass(path ? "g-state-success" : "g-state-error")
                                    .text(control + (path ? " @ " + path : " (N/A)"))
                                    .click(function () { path && $.content("main").navigate(Gordic.WebApp.AdminSettings, { path: path }); });
                            }
                            $(document.body).gshortcut({
                                key: 'ctrl+alt+m', description: 'jres:25000087', group: Gordic.Shortcuts.Groups.App, run: function (ev, ctx) { //RC 25000087 : Navigační assistent uživatelského nastavení
                                    $(".admin-mode-nav-assist").remove();
                                    $(".gtoolbar").each(function () { var $this = $(this); $this.prepend(createNavAssist("ToolBar", $this.gtoolbar("option", "userSettings"))); });
                                    $(".ggrid").each(function () { var $this = $(this); $this.prepend(createNavAssist("Grid", $this.ggrid("option", "userSettings"))); });
                                    $(".gfilterpanel").each(function () { var $this = $(this); $this.prepend(createNavAssist("FiltrPanel", $this.gfilterpanel("instance").gStore)); });
                                    $(".gcontent").each(function () { var $this = $(this); $this.prepend(createNavAssist("Content", $this.gcontent("userSettings")).css("right", "unset")); });
                                    $(".js-FormSKriterii .gfield").each(function () {
                                        var $this = $(this);
                                        var model = $this.gfield("option", "model"), i;
                                        if (typeof model === "string") {
                                            if ((model = model.split("=")[0]).indexOf(".") >= 0)  // vezmeme jen prvni levou cast a zkontrolujeme "." (do rootu settings je nezadouci zapisovat => prozatim vynechame)
                                                $this.prepend(createNavAssist("UserSetting", model).css("right", "unset"));
                                        }
                                    });
                                    $("[data-admin-mode-nav-assist]").each(function () {  // universalni endpoint, na ktery se muze chytnout kdokoliv 
                                        var $this = $(this);
                                        var us = $this.data("admin-mode-nav-assist");
                                        var navAssist = $this.triggerHandler("adminmodenavassist", createNavAssist);
                                        if (typeof navAssist === "undefined") navAssist = createNavAssist("UserSetting", us); // default
                                        if (navAssist) $this.prepend(navAssist);
                                    });
                                },
                            });
                            that.notification("showToast", {
                                title: "jres:25000088", //RC 25000088 : Navigační assistent byl zapnut
                                content: "jres:25000089",  //RC 25000089 : Stiskem <b>Ctrl + Alt + M</b> zobrazíte kontextovou nápovědu konfigurovatelných prvků
                                state: "success",
                            });
                            this.checked(true);
                        }
                    }
                },
                actTemporaryUnlock: {
                    caption: "jres:25000093", //RC 25000093 : Dočasně odemknout zámky
                    run: function (ev, ctx) {
                        window.gstor.remove("_lockedSections");
                        that.notification("showToast", {
                            title: "jres:25000099", //RC 25000099 : Uživatelské nastavení
                            content: "jres:25000100",  //RC 25000100 : Zámky uživatelského nastavení byly v této instanci dočasně vypnuty
                            state: "success",
                        });
                    }
                },
                actTestEnvironment: {
                    caption: "jres:25000098", //RC 25000098 : Test nastavení
                    run: function (ev, ctx) {
                        var frm = new Gordic.Forms.Form("LMS-12-12-0")
                            .addRow("jres:25000101").addField("gselectbox", {  //RC 25000101 : Výběr šablon
                                name: "ixsUnw",
                                model: "ixsUnw=ixs_unw",
                                data: that.findFields("selectSetting").gfield("option", "data"),
                                itemTemplate: "{nazev}",
                                multi: true,
                                sortable: true,
                                graphicInput: "always",
                                itemWidth: "",
                            })
                            .addRow("jres:25000105").addField("gcheck", { name: "usePersonal" }) //RC 25000105 : Použít i vlastní uživatelské nastavení
                            .addRow({ layoutDescriptor: "LMS-0-12-0" }).addText("<i>jres:25000103</i>"); //RC 25000103 : * POZOR!<br>Po potvrzení formuláře se otevře nové okno, které bude simulovat zvolené šablony jako by byly nastavené v parametru gin_ustused. V tomto režimu bude vypnuté ukládání osobního nastavení do databáze (nepřepíše se stávající, ale žádné změny se neuloží!). Stále bude možné upravovat šablony uživatelského nastavení.
                        that.dialogs.simpleForm("jres:25000102", frm, { ixsUnw: ["00000210A016"] }, {  //RC 25000102 : Nastavení testu
                            width: 550,
                            height: 300,
                        }).on("close", function (ev, data) {
                            if (data)
                                Gordic.WebApp.Utility.openApp(null, 'USTTest', data);
                        });
                    }
                }
            })
        },

        // Hlavní content
        prepareContent: function (args) {
            if (typeof args.admin !== "undefined")
                this.admin = args.admin;
            this.canUpdateNote = false;
            var that = this;
            if (this.admin === true) {
                this.getDatabaseVersion();
                this.isl.SettingTemplate.ensureBaseSettingTemplate({}).get().done(function () {
                    that.isl.SettingTemplate.list({ fragments: ["base"] }).getView().done(function (ret) {
                        that.findFields("selectSetting").gfield("option", "data", ret).gfield("setValue", ret.getDataRows()[0]);
                    })
                })
            }
            this.registerActionList();
            this.settingTemplate = new GStor();
            var defOptions = {
                gstorUser: null,
                gstorTemplate: null,
            };
            this.options = $.extend({}, defOptions, args);
            var main = $("<div>").appendTo(this.element).addClass("admin-mode-main");
            var userSettings = $("<div>").appendTo(main).addClass("admin-mode-panel")
            this.gridUserSettings = this.createGrid(this.formUserSettings(userSettings), false);
            this.userDataToGrid();
            if (this.admin === true) {
                var secondSettings = $("<div>").appendTo(main).addClass("admin-mode-panel")
                this.gridSecondSettings = this.createGrid(this.formSettingTemplate(secondSettings), true);
                this.settingTemplateToGrid();
            }
            if (args.path != null && args.path != undefined) {
                if (this.globalSettings.get(args.path) != undefined)
                    this.searchInSettings(args.path, false);
            }
        }
    }, { extendIntellisense: GContent });
})(jQuery);