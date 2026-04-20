"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Mdf;
    (function (Mdf) {
        var WebClient;
        (function (WebClient) {
            //interface hierarchyDataView {
            //    name: string,
            //    dataView: Isl.View<any, Isl.GServiceListRequest, Isl.GServiceListResponse<Mdf.Interface.MemberDto>>,
            //    nacteno: boolean
            //}
            var gcontent = Decorators.gcontent;
            let MdfGrid = class MdfGrid extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.jeVygenerovanyPohled = false;
                }
                onContentReady() {
                    var that = this;
                    const mdfInterface = Gordic.Mdf.Interface;
                    /*this.hierarchiesCheckedMembers = [
                        //{ name: "MDFODP03", memberNames: ["10194", "10124", "10144", "10103", "10002", "10001", "10114", "10134"] }
                        { name: "MDFODP03", placement: mdfInterface.HierarchyPlacement.rows, index: 0,  checkedMembers: ["0"] }
                        , { name: "MDFCST03", placement: mdfInterface.HierarchyPlacement.columns, index: 0, checkedMembers: ['11', '12', '13'] }
                        , { name: "MDFHST03", placement: mdfInterface.HierarchyPlacement.columns, index: 1, checkedMembers: ['2013', '2014', '2015', '2016', '2020'] }
                        , { name: "MDFPOL03", placement: mdfInterface.HierarchyPlacement.background, index: 0, checkedMembers: ['0'] }
                        , { name: "MDFUUZ03", placement: mdfInterface.HierarchyPlacement.background, index: 1, checkedMembers: ['0'] }
                        , { name: "MDFORJ03", placement: mdfInterface.HierarchyPlacement.background, index: 2, checkedMembers: ['0'] }
                        , { name: "MDFORG03", placement: mdfInterface.HierarchyPlacement.background, index: 3, checkedMembers: ['0'] }
                    ];*/
                    /*//this.call("SetCube", { id_cub: "MDFUCR03" })
                        //.done((hierarchies) => {
                            //this.hierarchies = hierarchies;
                            //this.hierarchiesC = [];
                            //this.hierarchiesR = [];
                            //this.hierarchiesB = [];
                            this.hierarchyDataViews = [];
                            this.hierarchies.forEach((h: Mdf.Interface.InputHierarchy) => {
                                CreateDataView(h);
                                //this.hierarchyDataViews.push({ name: h.name, dataView: dataView });
                            })
        
                    //fce, ktera aktualizuje checkedMembers u hierarchii, ktere jsou nactene do dataview
                    var AktualizujCheckedMembers = () => {
                        that.hierarchyDataViews.map((hdw) => {
                            //jestli už je hierarchie nactena do dataview, zjištuji zaskrtnute radky ve stromu, jinak ponecham checkedMembers ty, co jsou v hierarchii (např. načtené z pohledu)
                            if (hdw.nacteno) {
                                let name = hdw.name;
                                let rows = hdw.dataView.getDataRows(true);
                                let checkedRows = rows.filter((row) => { return row.checked === true; });
                                let inputHierarchy = this.hierarchies.filter((h) => h.name === name)[0];
                                inputHierarchy.checkedMembers.splice(0);
                                checkedRows.forEach((row) => {
                                    inputHierarchy.checkedMembers.push(row.data.id);
                                })
                            }
                        });
                    }
        
                    //fce, která načte hierarchii do stromu
                    var setDataView = (hierarchy: Mdf.Interface.InputHierarchy) => {
                         //není-li zrovna aktuální vybraná hierarchie, není ve stromu, nemusím to řešit
                        if (hierarchy === this.currentHierarchy) {
                            const hierarchyDataView: hierarchyDataView = that.hierarchyDataViews.find((dataview) => { return dataview.name == hierarchy.name; })!;
                            const dataView = hierarchyDataView.dataView;
                            that.$hierarchyGrid.ggrid({ data: dataView });
                            //když už bylo načteno, nenačítám znovu - to bych taky mohl kliknout na ODPA, zaškrtnout něco, pak bych šel na POL, zpátky na ODPA a vše zaškrtlé by se mi přemazalo z inputHierarchy
                            //POZOR, žádoucí je naopak, aby se to vždy načetlo u otevírání nového pohledu (proto dělám nové that.hierarchyDataViews s nacteno=false) a při drillování
                            if (hierarchyDataView.nacteno === false) {
                                const rows: Data.TreeMetaRow<Interface.MemberDto>[] = dataView.getDataRows(true, "data") as Data.TreeMetaRow<Interface.MemberDto>[];
                                //if (rows.length === 0) {
                                //    dataView.refresh();
                                //    rows = dataView.getDataRows(true, "data") as Data.TreeMetaRow<Interface.MemberDto>[];
                                //}
                                //if (rows.length === 0) {
                                //    dataView.requestData();
                                //    rows = dataView.getDataRows(true, "data") as Data.TreeMetaRow<Interface.MemberDto>[];
                                //}
                                //Zaskrtneme vsechny vybrane prvky
                                rows.forEach((row) => {
                                    row.checked = false;
                                    hierarchy.checkedMembers.forEach((m) => {
                                        if (row.data.id === m)
                                            row.checked = true;
                                    })
                                })
        
                                const tree: Gordic.Data.Tree<Gordic.Mdf.Interface.MemberDto, any> = dataView.processors.tree as Gordic.Data.Tree<Gordic.Mdf.Interface.MemberDto, any>;
        
                                rows.forEach((row) => {
                                    //defaultStateFunction(row);
                                    let children = tree.getChildren(row);
                                    var breakMe = false;
        
                                    row.structure = $.extend({}, row.structure, { state: "closed" });
        
                                    //kdyz je alespon jeden child zaskrtly, bude vetev rozkliknuta
                                    children.forEach((child) => {
                                        if (breakMe == false && child.checked) {
                                            row.structure = $.extend({}, row.structure, { state: "open" });
                                            breakMe = true;
                                        }
                                    })
        
                                })
                                dataView.refresh();
        
                                hierarchyDataView.nacteno = true;
                            }
                        }
                    }
                    */
                    //*************************************************************
                    // Seznam akcí
                    //*************************************************************
                    this.actions.addRange({
                        actGenerate: {
                            name: "actGenerate",
                            caption: "Generovat pohled", //RC 26850061 : Závislé úpravy
                            icon: "gi-generate",
                            run: () => {
                                this.subcontentNavrhar.AktualizujCheckedMembers();
                                this.GenerateResult();
                            }
                        },
                        actVyberRez: {
                            name: "actVyberRez",
                            caption: "Vybrat datový řez",
                            icon: "gi-balik",
                            tooltip: "Datový řez - kliknutím lze vybrat jiný",
                            visible: false,
                            run: () => {
                                return new Gordic.Data.Selectors.DefaultSelector({
                                    related: that.element,
                                    title: "Výběr datového řezu",
                                    canSelectEmpty: false,
                                    data: this.rezy,
                                    gridFormat: new Gordic.Data.GridFormat()
                                        .addTextColumn({
                                        name: "zkratka",
                                        caption: "Datový řez", //RC 26850013 : Kód
                                        width: 120
                                    })
                                        .addTextColumn({
                                        name: "nazev",
                                        caption: "Název", //RC 26850014 : Název
                                        width: 150
                                    })
                                }).show()
                                    .then((selectedRez) => {
                                    this.actions.actVyberRez.update({ caption: selectedRez.zkratka, visible: true });
                                    this.statusRez.update();
                                    this.statusBar([this.statusRez]);
                                    return this.call("SetCube", { cube: selectedRez });
                                })
                                    .then((hierarchies) => {
                                    this.createNavrhar();
                                    return this.subcontentNavrhar.readyAwait.then(() => {
                                        this.subcontentNavrhar.activate();
                                    });
                                });
                            }
                        },
                        actVyberRez2: {
                            name: "actVyberRez2",
                            caption: "Vybrat datový řez",
                            icon: "gi-balik",
                            run: () => {
                                that.actions.actVyberRez.run();
                            }
                        },
                        actSave: {
                            name: "actSave",
                            //parentContent: this,
                            caption: "Uložit",
                            icon: "gi-save",
                            tool: "Uložit pohled",
                            run: () => {
                                this.subcontentNavrhar.AktualizujCheckedMembers();
                                let dto = {};
                                dto.id_cub = this.cube.id_dpo;
                                dto.hierarchies = this.hierarchies;
                                dto.nazev = "Novy pohled";
                                this.call("UlozPohled", { dto: dto });
                                //$.content(this.element).dialogs.showModalWindow(["Gordic.Mdf.WebClient.GPohledSave", { uid: "SavePohled", ixsStrRootSoukromy: this.ixsStrRootSoukromy, ixsStrRootVerejny: this.ixsStrRootVerejny, pohledDto: dto, createUmisteniContent: this.createPohledyContent }], null, { width: 600, height: 460 });
                                //var dlg = (parentElement ? $.content(parentElement).dialogs : GDlg).showModalWindow("Gordic.Eko.WebClient.GNewRecordDlg", $.extend(options, { ID: "NewRecordDW" }), { width: 600, height: 460 });
                            }
                        }
                    });
                    this.statusRez = new GObservableObject({ id: "statusKRY", type: "action", caption: "Vybrat datový řez", action: this.actions.actVyberRez });
                    this.statusBar([this.statusRez, { type: "separator", visible: false }]);
                    this.menuBar(this.actions.createBar(["actVyberRez2*"]));
                    //#region Oblast výstupu - drillovací komponenta
                    this.$table = $("<div class='table_wrapper'>")
                        .appendTo(this.element);
                    this.$table.on("click", ".clickable", (ev, ctx) => {
                        let t = $(ev.currentTarget);
                        //zjistim memberName
                        let memberName = t.attr('memberId');
                        //zjistim level
                        let level = -1;
                        for (let i = 0; i < 6; i++)
                            if (t.hasClass("level" + i)) {
                                level = i;
                                break;
                            }
                        //zjistim hierarchyIndex
                        let m = t.children(".member");
                        let hierarchyIndex = -1;
                        for (let i = 0; i < 10; i++)
                            if (m.hasClass("dim" + i)) {
                                hierarchyIndex = i;
                                break;
                            }
                        let placementIndex = -1;
                        for (let i = 0; i < 10; i++)
                            if (m.hasClass("placementIndex" + i)) {
                                placementIndex = i;
                                break;
                            }
                        let plusMinus = ".";
                        let i = t.children(".plusMinus");
                        if (i.hasClass("fa-plus"))
                            plusMinus = "+";
                        else
                            plusMinus = "-";
                        let inputHierarchy; // = this.hierarchies.filter((h) => { return h.placement === Gordic.Mdf.Interface.HierarchyPlacement.rows && h.index === placementIndex; })![0];
                        this.hierarchies.forEach((h) => {
                            if (h.placement === 0 /* Gordic.Mdf.Interface.HierarchyPlacement.rows */ && h.index === placementIndex)
                                inputHierarchy = h;
                        });
                        //const hierarchyDataView: hierarchyDataView = that.hierarchyDataViews.find((dataview) => { return dataview.name == inputHierarchy.name; })!;
                        //hierarchyDataView.nacteno = false;  
                        this.subcontentNavrhar.setNacteno(inputHierarchy, false); //pri drillovani se bude vzdy prenastavovat dataview podle hierarchie
                        //expand
                        if (plusMinus === "+")
                            this.call("GetChildren", { hierarchyIndex: hierarchyIndex, level: level, memberName: memberName, fullyRecursive: false })
                                .done((children) => {
                                inputHierarchy.checkedMembers.push.apply(inputHierarchy.checkedMembers, children);
                                //this.actions.actGenerate!.run();
                                this.GenerateResult();
                                //Zaškrtnu i ve stromu dimenze
                                this.subcontentNavrhar.setDataView(inputHierarchy);
                                return;
                            });
                        //collapse
                        else {
                            this.call("GetChildren", { hierarchyIndex: hierarchyIndex, level: level, memberName: memberName, fullyRecursive: true })
                                .done((children) => {
                                //let children: string[] = ["10124", "10134", "10144", "10194"];
                                children.forEach((m) => {
                                    let index = inputHierarchy.checkedMembers.indexOf(m);
                                    if (index > -1)
                                        inputHierarchy.checkedMembers.splice(index, 1);
                                });
                                this.GenerateResult();
                                //Zaškrtnu i ve stromu dimenze
                                this.subcontentNavrhar.setDataView(inputHierarchy);
                                return;
                            });
                        }
                    });
                    //#endregion
                    //#region Stromy pohledů
                    //const nactiPohled = () => {
                    //    let pohledHierarchies;
                    //    this.call("GetPohledDto", { reportId: this.selectedReportId })
                    //        .then((pohledDto: Gordic.Mdf.Interface.GPohledDto) => {
                    //            this.actions.actVyberRez!.update({ caption: pohledDto.id_cub });
                    //            pohledHierarchies = pohledDto.hierarchies!;
                    //            let rez: Interface.GEkosdpoDto | undefined = this.rezy.find((r) => r.id_dpo === pohledDto.id_cub);
                    //            return this.call("SetCube", { cube: rez });
                    //        })
                    //        .then(() => {
                    //            this.hierarchies = pohledHierarchies;
                    //            return this.createNavrhar();
                    //        })
                    //        .then(() => {
                    //            this.GenerateResult();
                    //        })
                    //}
                    //const createPohledyContent = function (verejne: boolean): GContent<IGContentBase, any>/* & ObjectLiteral<any>*/ {
                    this.subcontentVerejne = this.createPohledyContent(true, true);
                    this.subcontentSoukrome = this.createPohledyContent(false, true);
                    //#endregion
                    //this.actions.actVyberRez!.run();
                }
                GenerateResult() {
                    this.call("GenerujPohled", { hierarchiesCheckedMembers: this.hierarchies /*.sort((a, b) => { return (a.placement * 100 + a.index) - (b.placement * 100 + b.index); })*/ })
                        .done((result) => {
                        //převedení do lokálních proměnných
                        let l_dimInRowsCount = result.dimInRowsCount;
                        let l_dimInColumnsCount = result.dimInColumnsCount;
                        if (!result.cells) {
                            this.$table.html("Nebyly nalezeny žádné záznamy odpovídající zadaným kritériím. Zkuste změnit návrh pohledu.");
                            return;
                        }
                        let cells = result.cells;
                        let levelsRows = result.levelsRows;
                        let plusMinusRows = result.plusMinusRows;
                        let Rnames = result.Rnames;
                        let Cnames = result.Cnames;
                        //tvorba dtos - zobrazených dat
                        let colCount = cells[0].length;
                        let rowCount = cells.length;
                        let dtos = [];
                        for (let r = 0; r < cells.length; r++) {
                            let dto = {};
                            for (let c = 0; c < colCount; c++) {
                                if (c < l_dimInRowsCount) {
                                    dto["dim" + c] = cells[r][c];
                                }
                                else
                                    dto["c" + (c - l_dimInRowsCount)] = cells[r][c];
                            }
                            dtos.push(dto);
                        }
                        //////////////HTML TABLE//////////////////
                        let dimIndexesColumns = result.dimIndexesColumns;
                        let dimIndexesRows = result.dimIndexesRows;
                        let table = "<table class='mdfTable'>";
                        //#region Zahlavi sloupců
                        table += "<thead>";
                        //#region Nazvy dimenzi ve sloupcich
                        table += "<tr>";
                        for (var c = 0; c < l_dimInRowsCount; c++)
                            table += "<th></th>";
                        table += "<th colspan='10' style='text-align: left'>";
                        result.dimInColumnsCaptions.forEach((caption) => { table += caption + "</br>"; });
                        table += "</th>";
                        table += "</tr>";
                        //#endregion
                        for (var r = 0; r < l_dimInColumnsCount; r++) {
                            let dto = dtos[r];
                            table += "<tr>";
                            //#region Levy horni roh
                            //názvy dimenzí v řádcích
                            if (r === l_dimInColumnsCount - 1)
                                for (let s = 0; s < l_dimInRowsCount; s++) {
                                    table += "<th class='headCell'>{0}</th>".format(dto["dim" + s]);
                                }
                            else
                                for (let s = 0; s < l_dimInRowsCount; s++) {
                                    table += "<th  class='headCell'></th>";
                                }
                            //#endregion
                            //#region Zahlavi sloupcu - members
                            //let captionPrev = "";
                            let colspan = 0;
                            let memberPart = "";
                            for (let s = l_dimInRowsCount; s < colCount; s++) {
                                let caption = dto["c" + (s - l_dimInRowsCount)];
                                if (r === l_dimInColumnsCount - 1 || s === l_dimInRowsCount || Cnames[s - l_dimInRowsCount][r] !== Cnames[s - l_dimInRowsCount - 1][r]) {
                                    if (memberPart.length > 0)
                                        if (colspan > 1)
                                            table += "<th colspan='{1}'>{0}</th>".format(memberPart, colspan);
                                        else
                                            table += "<th>{0}</th>".format(memberPart);
                                    memberPart = "<div class='memberColumn dim{0}'>{1}</div>".format(dimIndexesColumns[r], caption);
                                    colspan = 1;
                                }
                                else {
                                    //memberPart += "<th></th>";
                                    colspan++;
                                }
                                //captionPrev = caption;
                            }
                            if (memberPart.length > 0)
                                if (colspan > 1)
                                    table += "<th colspan='{1}'>{0}</th>".format(memberPart, colspan);
                                else
                                    table += "<th>{0}</th>".format(memberPart);
                            //#endregion
                            //table += "<th colspan='2'>Úroveň</th><th colspan='3'>Kontroly na</th>";
                            table += "</tr>";
                        }
                        table += "</thead>";
                        //#endregion
                        //#region řádky s daty
                        for (var r = l_dimInColumnsCount; r < rowCount; r++) {
                            let dto = dtos[r];
                            table += "<tr>";
                            //#region záhlaví řádků - members
                            for (let s = 0; s < l_dimInRowsCount; s++) {
                                //member
                                let plusMinus = plusMinusRows[r - l_dimInColumnsCount][s];
                                let clickable = plusMinus === "." ? "" : "clickable";
                                let plusMinusIcon = plusMinus === "+" ? "fa-plus" : (plusMinus === "-" ? "fa-minus" : "fa-circle dot");
                                //když je to poslední dimenze, vykreslím member vždy, v předchozích dimenzích pak jenom když to není stejné jako předchozí řádek
                                if (s === l_dimInRowsCount - 1 || r === l_dimInColumnsCount || Rnames[r - l_dimInColumnsCount][s] !== Rnames[r - l_dimInColumnsCount - 1][s])
                                    table += "<th  class='headCell'><div class='level{0} {5}' memberId={4}><i class='fa {3} plusMinus'></i><div class='member dim{1} placementIndex{6}'>{2}</div></div></th>"
                                        .format(levelsRows[r - l_dimInColumnsCount][s], dimIndexesRows[s], dto["dim" + s], plusMinusIcon, Rnames[r - l_dimInColumnsCount][s], clickable, s);
                                else
                                    table += "<th class='headCell'></th>";
                            }
                            //#endregion
                            //#region data
                            for (let s = l_dimInRowsCount; s < colCount; s++) {
                                table += "<th class='dataCell'>{0}</th>".format(dto["c" + (s - l_dimInRowsCount)]);
                            }
                            //#endregion
                            table += "</tr>";
                        }
                        //#endregion
                        table += "</table>";
                        this.$table.html(table);
                        this.jeVygenerovanyPohled = true;
                        this.refreshPohledy(this.jeVygenerovanyPohled);
                        return;
                    });
                }
                refreshPohledy(saveEnabled) {
                    this.subcontentVerejne.actions.actSave.update({ enabled: saveEnabled });
                    this.subcontentSoukrome.actions.actSave.update({ enabled: saveEnabled });
                }
                //fce na vytvoření návrháře pohledů
                createNavrhar() {
                    //když už existuje starý návrhář, nejprve ho odpojíme
                    if (this.subcontentNavrhar)
                        this.subcontentNavrhar.undock();
                    //potom vytvoříme nový návrhář (subcontent)
                    this.subcontentNavrhar = this.createContent(WebClient.GNavrharContent);
                    this.subcontentNavrhar.hierarchies = this.hierarchies;
                    this.subcontentNavrhar.actions = this.actions;
                    this.subcontentNavrhar.dockTo(this);
                }
                nactiPohled() {
                    let pohledHierarchies;
                    this.call("GetPohledDto", { reportId: this.selectedReportId })
                        .then((pohledDto) => {
                        this.actions.actVyberRez.update({ caption: pohledDto.id_cub });
                        pohledHierarchies = pohledDto.hierarchies;
                        let rez = this.rezy.find((r) => r.id_dpo === pohledDto.id_cub);
                        return this.call("SetCube", { cube: rez });
                    })
                        .then(() => {
                        this.hierarchies = pohledHierarchies;
                        return this.createNavrhar();
                    })
                        .then(() => {
                        this.GenerateResult();
                    });
                }
                createPohledyContent(verejne, dock) {
                    var that = this;
                    const tema = verejne ? "mdf_ptm_verejny" : "mdf_ptm_soukr";
                    const title = verejne ? "Veřejné pohledy" : "Soukromé pohledy";
                    const icon = verejne ? "gi-zverejnit" : "gi-user";
                    const ixsStrRoot = verejne ? that.ixsStrRootVerejny : that.ixsStrRootSoukromy;
                    const subcontent = that.createContent([Gordic.Report.WebClient.GReportTreeControlTS, {
                            uid: `mdf_${tema}_#`, controlParams: {
                                Tema: tema, SelectReportOnly: true, ShowJustOneReport: true, ixsStr: ixsStrRoot, title: title
                            }
                        }]);
                    //subcontent.uid = "#" + tema;
                    if (dock)
                        subcontent.dockTo(that, { icon: icon, title: title, region: "left" });
                    subcontent.readyAwait.then(() => {
                        const getRow = (treeId, dataview) => {
                            const rows = dataview.getDataRows(true, "data");
                            const parentRow = rows.find((r) => { return r.data.treeId == treeId; });
                            return parentRow;
                        };
                        const expandParents = (treeId) => {
                            const dataview = subcontent.grid.ggrid("getView");
                            const treeProcessor = dataview.processors.tree;
                            //const rows = dataview.getDataRows(true, "data") as Data.TreeMetaRow<Report.WebClient.GReportTreeNodeDto>[];
                            const parentRow = getRow(treeId, dataview); // rows.find((r) => { return r.data.treeId == treeId; });
                            if (parentRow) {
                                let parents = treeProcessor.getParents(parentRow);
                                //for (var i = 0; i < parents.length; i++) {
                                //    let p = parents[i];
                                //    p["structure"] = { state: "open" };
                                //}
                                //rozbalim vsechny parenty parenta
                                parents.forEach((r) => {
                                    r.structure = $.extend({}, r.structure, { state: "open" });
                                });
                                //rozbalim samotneho parenta
                                parentRow.structure = $.extend({}, parentRow.structure, { state: "open" });
                                dataview.refresh();
                            }
                        };
                        const createStr = (podrizenaSlozka) => {
                            let treeId = 0;
                            return that.dialogs.simpleForm("Zadejte název nové složky", new Gordic.Forms.Form().addRow("Název") // jednoduchý formulář // RC 29750333 : Zadejte datum odúčtování // RC 29750334 : Datum
                                .addField("gstringbox", { name: "nazev", validators: [new Gordic.Validators.Required()] }), { /*DatumOductovani: datum*/}, { width: 300, height: 150, resizable: false }) // přidání datumového políčka
                                .createDialogPromise((retVal) => retVal != null)
                                .then((ev, result) => {
                                const selection = subcontent.grid.ggrid("getSelection", true);
                                let ixsStrNad;
                                if (selection.length > 0) {
                                    if (podrizenaSlozka) {
                                        treeId = selection[0].data.treeId;
                                        ixsStrNad = selection[0].data.ixsStr;
                                    }
                                    else {
                                        treeId = selection[0].data.treeParentId;
                                        const parentRow = getRow(treeId, subcontent.grid.ggrid("getView"));
                                        ixsStrNad = parentRow?.data.ixsStr;
                                    }
                                }
                                if (!ixsStrNad)
                                    ixsStrNad = ixsStrRoot;
                                return that.call("CreateStr", { ixsStrNad: ixsStrNad, tema: tema, nazev: ev.nazev });
                            })
                                .then(() => {
                                return subcontent.loadData();
                            })
                                .then(() => {
                                expandParents(treeId);
                            });
                        };
                        /*const getReportId = (): string => {
                            const selection = subcontent.grid.ggrid("getSelection", true);
                            let reportId = "";
                            if (selection.length > 0) {
                                reportId = selection[0].data.ixsStr.reportId;
        
                            }
                            return reportId;
                        }*/
                        //menubar
                        //subcontent.menuBar([
                        subcontent.actions.addRange({
                            actSave: new GAction({
                                name: "actSave",
                                //parentContent: this,
                                caption: "Uložit",
                                icon: "gi-save",
                                tool: "Uložit pohled",
                                enabled: false,
                                run: () => {
                                    this.subcontentNavrhar.AktualizujCheckedMembers();
                                    let dto = {};
                                    dto.id_cub = this.cube.id_dpo;
                                    dto.hierarchies = this.hierarchies;
                                    dto.nazev = "Novy pohled";
                                    dto.tema = tema;
                                    let treeId = 0;
                                    return that.dialogs.simpleForm("Zadejte název pohledu", new Gordic.Forms.Form().addRow("Název") // jednoduchý formulář // RC 29750333 : Zadejte datum odúčtování // RC 29750334 : Datum
                                        .addField("gstringbox", { name: "nazev", validators: [new Gordic.Validators.Required()] }), { /*DatumOductovani: datum*/}, { width: 300, height: 150, resizable: false }) // přidání datumového políčka
                                        .createDialogPromise((retVal) => retVal != null)
                                        .then((ev, result) => {
                                        dto.nazev = ev.nazev;
                                        const selection = subcontent.grid.ggrid("getSelection", true);
                                        let ixsStr;
                                        if (selection.length > 0) {
                                            ixsStr = selection[0].data.ixsStr;
                                            treeId = selection[0].data.treeId;
                                        }
                                        if (!ixsStr)
                                            ixsStr = ixsStrRoot;
                                        dto.ixs_str = ixsStr;
                                        return this.call("UlozPohled", { dto: dto });
                                    })
                                        .then(() => {
                                        return subcontent.loadData();
                                    })
                                        .then(() => {
                                        expandParents(treeId);
                                    });
                                    //$.content(this.element).dialogs.showModalWindow(["Gordic.Mdf.WebClient.GPohledSave", { uid: "SavePohled", ixsStrRootSoukromy: this.ixsStrRootSoukromy, ixsStrRootVerejny: this.ixsStrRootVerejny, pohledDto: dto, createUmisteniContent: this.createPohledyContent }], null, { width: 600, height: 460 });
                                    //var dlg = (parentElement ? $.content(parentElement).dialogs : GDlg).showModalWindow("Gordic.Eko.WebClient.GNewRecordDlg", $.extend(options, { ID: "NewRecordDW" }), { width: 600, height: 460 });
                                }
                            }),
                            actOdstranit: new GAction({
                                name: "actOdstranit",
                                caption: "Odstranit",
                                tooltip: "Odstraní pohled",
                                icon: "gi-bin",
                                enabled: false,
                                run: () => {
                                    const reportId = that.selectedReportId; //musím to uložit do proměnné, protože po loadData se mi that.selectedReportId změní, loadData už nedělám, ale nechám to pro jistotu
                                    return that.dialogs.confirm("Opravdu chcete tento pohled odstranit ze stromu pohledů?").createDialogPromise("yes")
                                        .then(() => {
                                        return that.call("RemoveReport", { reportId: reportId, tema: tema });
                                    })
                                        .then((isPohled) => {
                                        const dataview = subcontent.grid.ggrid("getView");
                                        const rows = dataview.getDataRows(true);
                                        if (isPohled) //pohled
                                            rows.forEach((r) => {
                                                if (r.data.reportId == reportId)
                                                    dataview.updateData(r, "delete");
                                            });
                                        else //strom
                                            rows.forEach((r) => {
                                                if (r.data.ixsStr == reportId)
                                                    dataview.updateData(r, "delete");
                                            });
                                    });
                                }
                            }),
                            actCreateStrPod: new GAction({
                                name: "actCreateStrPod",
                                caption: "Nová podsložka",
                                tooltip: "Vytvoří novou složku ve stromu pohledů o úroveň níže",
                                icon: "gi-folder_bold g-state-text g-state-favorite",
                                run: () => {
                                    createStr(true);
                                }
                            }),
                            actCreateStr: new GAction({
                                name: "actCreateStr",
                                caption: "Nová složka",
                                tooltip: "Vytvoří novou složku ve stromu pohledů",
                                icon: "gi-folder_bold g-state-text g-state-favorite|gi-star gi-stack-fw gi-bgw",
                                run: () => {
                                    createStr(false);
                                }
                            }),
                            actOpenView: new GAction({
                                name: "actOpenView",
                                caption: "Otevřít pohled",
                                tooltip: "Otevře uložený pohled",
                                icon: "gi-generate g-state-text",
                                enabled: false,
                                run: () => {
                                    this.nactiPohled();
                                }
                            })
                        });
                        subcontent.menuBar(subcontent.actions.createBar(["actSave*", "actOdstranit*", "actCreateStrPod", "actCreateStr"]));
                        subcontent.commandBar(subcontent.actions.createBar(["actOpenView!"]));
                        //subcontent.commandBar( [{
                        //    action: new GAction({
                        //        name: "vybratAct", caption: "Otevřít pohled", run: () => {
                        //            this.nactiPohled();
                        //        }
                        //    })
                        //}]);
                    });
                    subcontent.element.on("reportselected.greports", (event, repInfo) => {
                        that.selectedReportId = repInfo.reportId == "" ? repInfo.node.ixsStr : repInfo.reportId;
                        subcontent.actions.actOdstranit.update({ enabled: true });
                        subcontent.actions.actOpenView.update({ enabled: repInfo.reportId !== "" });
                    })
                        .on("reportbeforedefaultaction.greports", (event, ri) => {
                        event.preventDefault(); //timto lze prerusit provedeni akce v okne
                        that.selectedReportId = ri.reportId; //info o sestave
                        if (that.selectedReportId !== "")
                            this.nactiPohled();
                    })
                        .on("reportgridformatcreated.greports", function (event, o) {
                        const gf = o?.gridFormat; // NOTE: Lze menit na primo na instanci
                        gf.columns.find((v) => { return v.name == "name"; }).caption = "Pohled";
                    });
                    return subcontent;
                }
            };
            MdfGrid = __decorate([
                gcontent
            ], MdfGrid);
            WebClient.MdfGrid = MdfGrid;
        })(WebClient = Mdf.WebClient || (Mdf.WebClient = {}));
    })(Mdf = Gordic.Mdf || (Gordic.Mdf = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWRmR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1kZkdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQW10QmY7QUFudEJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW10Qm5CO0lBbnRCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbXRCN0I7UUFudEJvQixXQUFBLFNBQVM7WUFDMUIsK0JBQStCO1lBQy9CLG1CQUFtQjtZQUNuQiwwR0FBMEc7WUFDMUcsc0JBQXNCO1lBQ3RCLEdBQUc7WUFLSCxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQVEsU0FBUSxPQUFBLFlBQVk7Z0JBQXpDOztvQkFZSSx5QkFBb0IsR0FBWSxLQUFLLENBQUM7Z0JBeXJCMUMsQ0FBQztnQkF4ckJHLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztvQkFDMUM7Ozs7Ozs7Ozt3QkFTSTtvQkFFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQWlGRTtvQkFHRiwrREFBK0Q7b0JBQy9ELGNBQWM7b0JBQ2QsK0RBQStEO29CQUUvRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFFbEIsV0FBVyxFQUFFOzRCQUNULElBQUksRUFBRSxhQUFhOzRCQUNuQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsOEJBQThCOzRCQUMzRCxJQUFJLEVBQUUsYUFBYTs0QkFDbkIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLENBQUMsaUJBQWlCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQ0FDbEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzRCQUMxQixDQUFDO3lCQUNKO3dCQUNELFdBQVcsRUFBRTs0QkFDVCxJQUFJLEVBQUUsYUFBYTs0QkFDbkIsT0FBTyxFQUFFLG1CQUFtQjs0QkFDNUIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSx3Q0FBd0M7NEJBQ2pELE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztvQ0FDN0MsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29DQUNyQixLQUFLLEVBQUUscUJBQXFCO29DQUM1QixjQUFjLEVBQUUsS0FBSztvQ0FDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29DQUNmLFVBQVUsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO3lDQUNuQyxhQUFhLENBQUM7d0NBQ1gsSUFBSSxFQUFFLFNBQVM7d0NBQ2YsT0FBTyxFQUFFLFlBQVksRUFBRSxtQkFBbUI7d0NBQzFDLEtBQUssRUFBRSxHQUFHO3FDQUNiLENBQUM7eUNBQ0QsYUFBYSxDQUFDO3dDQUNYLElBQUksRUFBRSxPQUFPO3dDQUNiLE9BQU8sRUFBRSxPQUFPLEVBQUUscUJBQXFCO3dDQUN2QyxLQUFLLEVBQUUsR0FBRztxQ0FDYixDQUFDO2lDQUNULENBQUMsQ0FBQyxJQUFJLEVBQUU7cUNBQ0osSUFBSSxDQUFDLENBQUMsV0FBc0MsRUFBRSxFQUFFO29DQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQ0FDbkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29DQUVqQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUE7Z0NBQ3RELENBQUMsQ0FBQztxQ0FDRCxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQ0FDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29DQUNyQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3Q0FDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO29DQUN0QyxDQUFDLENBQUMsQ0FBQztnQ0FDUCxDQUFDLENBQUMsQ0FBQTs0QkFDVixDQUFDO3lCQUNKO3dCQUNELFlBQVksRUFBRTs0QkFDVixJQUFJLEVBQUUsY0FBYzs0QkFDcEIsT0FBTyxFQUFFLG1CQUFtQjs0QkFDNUIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQ3BDLENBQUM7eUJBQ0o7d0JBQ0QsT0FBTyxFQUFFOzRCQUNMLElBQUksRUFBRSxTQUFTOzRCQUNmLHNCQUFzQjs0QkFDdEIsT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLElBQUksRUFBRSxTQUFTOzRCQUNmLElBQUksRUFBRSxlQUFlOzRCQUNyQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2dDQUNsRCxJQUFJLEdBQUcsR0FBb0MsRUFBRSxDQUFDO2dDQUM5QyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTyxDQUFDO2dDQUMvQixHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0NBQ25DLEdBQUcsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO2dDQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dDQUN0Qyw0U0FBNFM7Z0NBQzVTLG1NQUFtTTs0QkFDdk0sQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFZLEVBQUUsQ0FBQyxDQUFDO29CQUM3SSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFeEQsZ0RBQWdEO29CQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQzt5QkFDekMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTt3QkFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQTt3QkFFM0Isb0JBQW9CO3dCQUNwQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUVwQyxlQUFlO3dCQUNmLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFOzRCQUN0QixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0NBQzFCLEtBQUssR0FBRyxDQUFDLENBQUM7Z0NBQ1YsTUFBTTs0QkFDVixDQUFDO3dCQUVMLHdCQUF3Qjt3QkFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFOzRCQUN2QixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0NBQ3hCLGNBQWMsR0FBRyxDQUFDLENBQUM7Z0NBQ25CLE1BQU07NEJBQ1YsQ0FBQzt3QkFDTCxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7NEJBQ3ZCLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO2dDQUNuQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO2dDQUNuQixNQUFNOzRCQUNWLENBQUM7d0JBRUwsSUFBSSxTQUFTLEdBQVcsR0FBRyxDQUFDO3dCQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDOzRCQUNyQixTQUFTLEdBQUcsR0FBRyxDQUFDOzs0QkFFaEIsU0FBUyxHQUFHLEdBQUcsQ0FBQzt3QkFFcEIsSUFBSSxjQUE0QyxDQUFDLENBQUMsZ0pBQWdKO3dCQUNsTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFOzRCQUMzQixJQUFJLENBQUMsQ0FBQyxTQUFTLHlEQUFpRCxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssY0FBYztnQ0FDMUYsY0FBYyxHQUFHLENBQUMsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLENBQUE7d0JBQ0YsNklBQTZJO3dCQUM3SSxzQ0FBc0M7d0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsY0FBZSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUUscUVBQXFFO3dCQUNqSSxRQUFRO3dCQUNSLElBQUksU0FBUyxLQUFLLEdBQUc7NEJBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxDQUFDO2lDQUNwSCxJQUFJLENBQUMsQ0FBQyxRQUFrQixFQUFFLEVBQUU7Z0NBQ3pCLGNBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dDQUNsRixrQ0FBa0M7Z0NBQ2xDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQ0FDdEIsOEJBQThCO2dDQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGNBQWUsQ0FBQyxDQUFDO2dDQUNwRCxPQUFPOzRCQUNYLENBQUMsQ0FDQSxDQUFBO3dCQUNULFVBQVU7NkJBQ0wsQ0FBQzs0QkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQztpQ0FDbkgsSUFBSSxDQUFDLENBQUMsUUFBa0IsRUFBRSxFQUFFO2dDQUN6QixnRUFBZ0U7Z0NBRWhFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQ0FDbkIsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3JELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQzt3Q0FDVixjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQ3ZELENBQUMsQ0FBQyxDQUFBO2dDQUNGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQ0FDdEIsOEJBQThCO2dDQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGNBQWUsQ0FBQyxDQUFDO2dDQUNwRCxPQUFPOzRCQUNYLENBQUMsQ0FBQyxDQUFDO3dCQUNYLENBQUM7b0JBSUwsQ0FBQyxDQUFDLENBQUE7b0JBRUYsWUFBWTtvQkFDWix3QkFBd0I7b0JBQ3hCLDZCQUE2QjtvQkFDN0IsNEJBQTRCO29CQUM1QixvRUFBb0U7b0JBQ3BFLGlFQUFpRTtvQkFDakUsOEVBQThFO29CQUM5RSx5REFBeUQ7b0JBQ3pELGdIQUFnSDtvQkFDaEgseURBQXlEO29CQUN6RCxZQUFZO29CQUNaLHVCQUF1QjtvQkFDdkIsbURBQW1EO29CQUNuRCwwQ0FBMEM7b0JBQzFDLFlBQVk7b0JBQ1osdUJBQXVCO29CQUN2QixvQ0FBb0M7b0JBQ3BDLFlBQVk7b0JBQ1osR0FBRztvQkFDSCxtSEFBbUg7b0JBQ25ILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUMvRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDakUsWUFBWTtvQkFFWixrQ0FBa0M7Z0JBQ3RDLENBQUM7Z0JBSUQsY0FBYztvQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLHlCQUF5QixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUEsOEZBQThGLEVBQUUsQ0FBQzt5QkFDeEssSUFBSSxDQUFDLENBQUMsTUFBK0IsRUFBRSxFQUFFO3dCQUN0QyxtQ0FBbUM7d0JBQ25DLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQzt3QkFDN0MsSUFBSSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUM7d0JBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRGQUE0RixDQUFDLENBQUM7NEJBQy9HLE9BQU87d0JBQ1gsQ0FBQzt3QkFDRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUN6QixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO3dCQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO3dCQUN6QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUMzQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUUzQiwrQkFBK0I7d0JBQy9CLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQy9CLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQzVCLElBQUksSUFBSSxHQUFVLEVBQUUsQ0FBQzt3QkFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDcEMsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFDOzRCQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0NBQ2hDLElBQUksQ0FBQyxHQUFHLGdCQUFnQixFQUFFLENBQUM7b0NBQ3ZCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNqQyxDQUFDOztvQ0FFRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hELENBQUM7NEJBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbkIsQ0FBQzt3QkFFRCwwQ0FBMEM7d0JBQzFDLElBQUksaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO3dCQUNqRCxJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO3dCQUMzQyxJQUFJLEtBQUssR0FBVywwQkFBMEIsQ0FBQzt3QkFFL0MseUJBQXlCO3dCQUN6QixLQUFLLElBQUksU0FBUyxDQUFDO3dCQUVuQixvQ0FBb0M7d0JBQ3BDLEtBQUssSUFBSSxNQUFNLENBQUM7d0JBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUU7NEJBQ3JDLEtBQUssSUFBSSxXQUFXLENBQUM7d0JBQ3pCLEtBQUssSUFBSSw0Q0FBNEMsQ0FBQzt3QkFDdEQsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUcsS0FBSyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakYsS0FBSyxJQUFJLE9BQU8sQ0FBQzt3QkFDakIsS0FBSyxJQUFJLE9BQU8sQ0FBQzt3QkFDakIsWUFBWTt3QkFFWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDM0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNsQixLQUFLLElBQUksTUFBTSxDQUFDOzRCQUVoQix3QkFBd0I7NEJBQ3hCLHlCQUF5Qjs0QkFDekIsSUFBSSxDQUFDLEtBQUssbUJBQW1CLEdBQUcsQ0FBQztnQ0FDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0NBQ3hDLEtBQUssSUFBSSwrQkFBK0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNwRSxDQUFDOztnQ0FFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQ0FDeEMsS0FBSyxJQUFJLDZCQUE2QixDQUFDO2dDQUMzQyxDQUFDOzRCQUNMLFlBQVk7NEJBRVosbUNBQW1DOzRCQUNuQyx1QkFBdUI7NEJBQ3ZCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQzs0QkFDaEIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDOzRCQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLGdCQUFnQixFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQ0FDL0MsSUFBSSxPQUFPLEdBQVcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0NBQ3hELElBQUksQ0FBQyxLQUFLLG1CQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssZ0JBQWdCLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQ0FDckksSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7d0NBQ3JCLElBQUksT0FBTyxHQUFHLENBQUM7NENBQ1gsS0FBSyxJQUFJLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7OzRDQUVsRSxLQUFLLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQ0FFbkQsVUFBVSxHQUFHLDRDQUE0QyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQ0FDaEcsT0FBTyxHQUFHLENBQUMsQ0FBQztnQ0FDaEIsQ0FBQztxQ0FDSSxDQUFDO29DQUNGLDRCQUE0QjtvQ0FDNUIsT0FBTyxFQUFFLENBQUM7Z0NBQ2QsQ0FBQztnQ0FDRCx3QkFBd0I7NEJBQzVCLENBQUM7NEJBRUQsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7Z0NBQ3JCLElBQUksT0FBTyxHQUFHLENBQUM7b0NBQ1gsS0FBSyxJQUFJLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7O29DQUVsRSxLQUFLLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDbkQsWUFBWTs0QkFFWix5RUFBeUU7NEJBQ3pFLEtBQUssSUFBSSxPQUFPLENBQUM7d0JBQ3JCLENBQUM7d0JBQ0QsS0FBSyxJQUFJLFVBQVUsQ0FBQzt3QkFDcEIsWUFBWTt3QkFFWixzQkFBc0I7d0JBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUNsRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2xCLEtBQUssSUFBSSxNQUFNLENBQUM7NEJBQ2hCLGlDQUFpQzs0QkFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0NBQ3hDLFFBQVE7Z0NBQ1IsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMxRCxJQUFJLFNBQVMsR0FBRyxTQUFTLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQ0FDckQsSUFBSSxhQUFhLEdBQUcsU0FBUyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7Z0NBQ3ZHLGdJQUFnSTtnQ0FDaEksSUFBSSxDQUFDLEtBQUssZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxtQkFBbUIsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsR0FBRyxtQkFBbUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3hJLEtBQUssSUFBSSxnS0FBZ0s7eUNBQ3BLLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7O29DQUV4SixLQUFLLElBQUksNEJBQTRCLENBQUM7NEJBQzlDLENBQUM7NEJBQ0QsWUFBWTs0QkFDWixjQUFjOzRCQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dDQUMvQyxLQUFLLElBQUksK0JBQStCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZGLENBQUM7NEJBQ0QsWUFBWTs0QkFDWixLQUFLLElBQUksT0FBTyxDQUFDO3dCQUNyQixDQUFDO3dCQUNELFlBQVk7d0JBRVosS0FBSyxJQUFJLFVBQVUsQ0FBQzt3QkFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7d0JBQy9DLE9BQU87b0JBQ1gsQ0FBQyxDQUFDLENBQUM7Z0JBRVAsQ0FBQztnQkFFRCxjQUFjLENBQUMsV0FBb0I7b0JBQy9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUN6RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDOUUsQ0FBQztnQkFFRCxtQ0FBbUM7Z0JBQ25DLGFBQWE7b0JBQ1QscURBQXFEO29CQUNyRCxJQUFJLElBQUksQ0FBQyxpQkFBaUI7d0JBQ3RCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDcEMsMkNBQTJDO29CQUMzQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFBLGVBQWUsQ0FBQyxDQUFDO29CQUM3RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3RELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztnQkFFRCxXQUFXO29CQUNQLElBQUksaUJBQWlCLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3lCQUN6RCxJQUFJLENBQUMsQ0FBQyxTQUEwQyxFQUFFLEVBQUU7d0JBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzt3QkFDaEUsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLFdBQVksQ0FBQzt3QkFDM0MsSUFBSSxHQUFHLEdBQXNDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbEcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUMvQyxDQUFDLENBQUM7eUJBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDUCxJQUFJLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDO3dCQUNyQyxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDaEMsQ0FBQyxDQUFDO3lCQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1AsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQTtnQkFDVixDQUFDO2dCQUVELG9CQUFvQixDQUFDLE9BQWdCLEVBQUUsSUFBYTtvQkFDaEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7b0JBQzNELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFBO29CQUM5RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUNsRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO29CQUM5RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUU7NEJBQ2pGLEdBQUcsRUFBRSxPQUFPLElBQUksSUFBSSxFQUFFLGFBQWEsRUFBRTtnQ0FDakMsSUFBSSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUs7NkJBQ2hHO3lCQUNKLENBQUMsQ0FBaUQsQ0FBQztvQkFDcEQsOEJBQThCO29CQUM5QixJQUFJLElBQUk7d0JBQ0osVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7b0JBRTFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFFNUIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFjLEVBQUUsUUFBd0IsRUFBcUUsRUFBRTs0QkFDM0gsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUE0RCxDQUFDOzRCQUMzRyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4RSxPQUFPLFNBQVMsQ0FBQzt3QkFDckIsQ0FBQyxDQUFBO3dCQUVELE1BQU0sYUFBYSxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7NEJBQ3JDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNsRCxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQXdCLENBQUM7NEJBQ25FLDZHQUE2Rzs0QkFDN0csTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLHlEQUF5RDs0QkFDckcsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQ0FDWixJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLFNBQXlCLENBQUMsQ0FBQztnQ0FDbEUsNENBQTRDO2dDQUM1Qyx5QkFBeUI7Z0NBQ3pCLHlDQUF5QztnQ0FDekMsR0FBRztnQ0FFSCxrQ0FBa0M7Z0NBQ2xDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQ0FDbEIsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7Z0NBQzlELENBQUMsQ0FBQyxDQUFBO2dDQUNGLDRCQUE0QjtnQ0FDNUIsU0FBUyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0NBRTNFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDdkIsQ0FBQzt3QkFDTCxDQUFDLENBQUE7d0JBRUQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxlQUF3QixFQUFFLEVBQUU7NEJBQzNDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQzs0QkFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLDJCQUEyQixFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUEsdUZBQXVGO2lDQUNyTCxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSwwQkFBMEIsQ0FBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFFLDZCQUE2QjtpQ0FDeE0sbUJBQW1CLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7aUNBQy9DLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTtnQ0FDakIsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUM5RCxJQUFJLFNBQVMsQ0FBQztnQ0FFZCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0NBQ3ZCLElBQUksZUFBZSxFQUFFLENBQUM7d0NBQ2xCLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3Q0FDbEMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO29DQUN6QyxDQUFDO3lDQUNJLENBQUM7d0NBQ0YsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO3dDQUN4QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0NBQ25FLFNBQVMsR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQ0FDdkMsQ0FBQztnQ0FDTCxDQUFDO2dDQUNELElBQUksQ0FBQyxTQUFTO29DQUNWLFNBQVMsR0FBRyxVQUFVLENBQUM7Z0NBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBOzRCQUN4RixDQUFDLENBQUM7aUNBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQ0FDUCxPQUFPLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDakMsQ0FBQyxDQUFDO2lDQUNELElBQUksQ0FBQyxHQUFHLEVBQUU7Z0NBQ1AsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUMxQixDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDLENBQUE7d0JBRUQ7Ozs7Ozs7OzJCQVFHO3dCQUdILFNBQVM7d0JBQ1Qsc0JBQXNCO3dCQUN0QixVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDdkI7NEJBQ0ksT0FBTyxFQUFFLElBQUksT0FBTyxDQUFDO2dDQUNqQixJQUFJLEVBQUUsU0FBUztnQ0FDZixzQkFBc0I7Z0NBQ3RCLE9BQU8sRUFBRSxRQUFRO2dDQUNqQixJQUFJLEVBQUUsU0FBUztnQ0FDZixJQUFJLEVBQUUsZUFBZTtnQ0FDckIsT0FBTyxFQUFFLEtBQUs7Z0NBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRTtvQ0FDTixJQUFJLENBQUMsaUJBQWlCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztvQ0FDbEQsSUFBSSxHQUFHLEdBQW9DLEVBQUUsQ0FBQztvQ0FDOUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU8sQ0FBQztvQ0FDL0IsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29DQUNuQyxHQUFHLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztvQ0FDMUIsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0NBRWhCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztvQ0FDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLHVCQUF1QixFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUEsdUZBQXVGO3lDQUNqTCxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSwwQkFBMEIsQ0FBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFFLDZCQUE2Qjt5Q0FDeE0sbUJBQW1CLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7eUNBQy9DLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTt3Q0FDakIsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO3dDQUNyQixNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7d0NBQzlELElBQUksTUFBTSxDQUFDO3dDQUVYLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzs0Q0FDdkIsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzRDQUNsQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7d0NBQ3RDLENBQUM7d0NBQ0QsSUFBSSxDQUFDLE1BQU07NENBQ1AsTUFBTSxHQUFHLFVBQVUsQ0FBQzt3Q0FDeEIsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7d0NBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztvQ0FDakQsQ0FBQyxDQUFDO3lDQUVELElBQUksQ0FBQyxHQUFHLEVBQUU7d0NBQ1AsT0FBTyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7b0NBQ2pDLENBQUMsQ0FBQzt5Q0FDRCxJQUFJLENBQUMsR0FBRyxFQUFFO3dDQUNQLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FDMUIsQ0FBQyxDQUFDLENBQUM7b0NBRVAsNFNBQTRTO29DQUM1UyxtTUFBbU07Z0NBQ3ZNLENBQUM7NkJBQ0osQ0FBQzs0QkFDTixZQUFZLEVBQUUsSUFBSSxPQUFPLENBQUM7Z0NBQ2xCLElBQUksRUFBRSxjQUFjO2dDQUNwQixPQUFPLEVBQUUsV0FBVztnQ0FDcEIsT0FBTyxFQUFFLGlCQUFpQjtnQ0FDMUIsSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsT0FBTyxFQUFFLEtBQUs7Z0NBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRTtvQ0FDTixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxvSUFBb0k7b0NBQzVLLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMERBQTBELENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7eUNBQzdHLElBQUksQ0FBQyxHQUFHLEVBQUU7d0NBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0NBQ3pFLENBQUMsQ0FBQzt5Q0FDRCxJQUFJLENBQUMsQ0FBQyxRQUFpQixFQUFFLEVBQUU7d0NBQ3hCLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dDQUNsRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO3dDQUN4QyxJQUFJLFFBQVEsRUFBb0MsUUFBUTs0Q0FDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dEQUNmLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUTtvREFDM0IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7NENBQ3pDLENBQUMsQ0FBQyxDQUFDOzZDQUN5QyxPQUFPOzRDQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0RBQ2YsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRO29EQUN6QixRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQzs0Q0FDekMsQ0FBQyxDQUFDLENBQUM7b0NBQ1gsQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsQ0FBQzs2QkFDSixDQUFDOzRCQUNOLGVBQWUsRUFBRSxJQUFJLE9BQU8sQ0FBQztnQ0FDckIsSUFBSSxFQUFFLGlCQUFpQjtnQ0FDdkIsT0FBTyxFQUFFLGdCQUFnQjtnQ0FDekIsT0FBTyxFQUFFLHNEQUFzRDtnQ0FDL0QsSUFBSSxFQUFFLDhDQUE4QztnQ0FDcEQsR0FBRyxFQUFFLEdBQUcsRUFBRTtvQ0FDTixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3BCLENBQUM7NkJBQ0osQ0FBQzs0QkFDRixZQUFZLEVBQUUsSUFBSSxPQUFPLENBQUM7Z0NBQ3RCLElBQUksRUFBRSxjQUFjO2dDQUNwQixPQUFPLEVBQUUsYUFBYTtnQ0FDdEIsT0FBTyxFQUFFLHdDQUF3QztnQ0FDakQsSUFBSSxFQUFFLHlFQUF5RTtnQ0FDL0UsR0FBRyxFQUFFLEdBQUcsRUFBRTtvQ0FDTixTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQ3JCLENBQUM7NkJBQ0osQ0FBQzs0QkFDRixXQUFXLEVBQUUsSUFBSSxPQUFPLENBQUM7Z0NBQ3JCLElBQUksRUFBRSxhQUFhO2dDQUNuQixPQUFPLEVBQUUsZ0JBQWdCO2dDQUN6QixPQUFPLEVBQUUsdUJBQXVCO2dDQUNoQyxJQUFJLEVBQUUsMEJBQTBCO2dDQUNoQyxPQUFPLEVBQUUsS0FBSztnQ0FDZCxHQUFHLEVBQUUsR0FBRyxFQUFFO29DQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQ0FDdkIsQ0FBQzs2QkFDSixDQUFDO3lCQUNMLENBQ0osQ0FBQzt3QkFDRixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRW5ILFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRXRFLDJCQUEyQjt3QkFDM0IsMkJBQTJCO3dCQUMzQixvRUFBb0U7d0JBQ3BFLGlDQUFpQzt3QkFDakMsV0FBVzt3QkFDWCxRQUFRO3dCQUNSLE1BQU07b0JBQ1YsQ0FBQyxDQUFDLENBQUE7b0JBRUYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7d0JBQ2hFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ3hGLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUMzRCxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUVqRixDQUFDLENBQUM7eUJBQ0csRUFBRSxDQUFDLG9DQUFvQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQTJCLEVBQUUsRUFBRTt3QkFDN0UsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsMENBQTBDO3dCQUNsRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQjt3QkFDckQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssRUFBRTs0QkFDNUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMzQixDQUFDLENBQUM7eUJBQ0QsRUFBRSxDQUFDLGtDQUFrQyxFQUFFLFVBQVUsS0FBSyxFQUFFLENBQUM7d0JBQ3RELE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxVQUFvQyxDQUFDLENBQUMsdUNBQXVDO3dCQUMzRixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7b0JBQzdFLENBQUMsQ0FBQyxDQUFDO29CQUNQLE9BQU8sVUFBVSxDQUFDO2dCQUN0QixDQUFDO2FBQ0osQ0FBQTtZQXJzQlksT0FBTztnQkFEbkIsUUFBUTtlQUNJLE9BQU8sQ0Fxc0JuQjtZQXJzQlksaUJBQU8sVUFxc0JuQixDQUFBO1FBQ0wsQ0FBQyxFQW50Qm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW10QjdCO0lBQUQsQ0FBQyxFQW50QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW10Qm5CO0FBQUQsQ0FBQyxFQW50QlMsTUFBTSxLQUFOLE1BQU0sUUFtdEJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5NZGYuV2ViQ2xpZW50IHtcclxuICAgIC8vaW50ZXJmYWNlIGhpZXJhcmNoeURhdGFWaWV3IHtcclxuICAgIC8vICAgIG5hbWU6IHN0cmluZyxcclxuICAgIC8vICAgIGRhdGFWaWV3OiBJc2wuVmlldzxhbnksIElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8TWRmLkludGVyZmFjZS5NZW1iZXJEdG8+PixcclxuICAgIC8vICAgIG5hY3Rlbm86IGJvb2xlYW5cclxuICAgIC8vfVxyXG5cclxuICAgIC8vdHlwIGZjZSBuYSB2eXR2b8WZZW7DrSBjb250ZW50dSBwb2hsZWR1XHJcbiAgICB0eXBlIEZhY3RvcnkgPSAodmVyZWpuZTogYm9vbGVhbikgPT4gR0NvbnRlbnQ8SUdDb250ZW50QmFzZSwgYW55PjtcclxuXHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIE1kZkdyaWQgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgICR0YWJsZTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgc3RhdHVzUmV6OiBHT2JzZXJ2YWJsZU9iamVjdDxNZW51UGFyYW1zQWN0aW9uPjtcclxuICAgICAgICBoaWVyYXJjaGllczogTWRmLkludGVyZmFjZS5JbnB1dEhpZXJhcmNoeVtdO1xyXG4gICAgICAgIHNlbGVjdGVkUmVwb3J0SWQ6IHN0cmluZztcclxuICAgICAgICBpeHNTdHJSb290U291a3JvbXk6IHN0cmluZztcclxuICAgICAgICBpeHNTdHJSb290VmVyZWpueTogc3RyaW5nO1xyXG4gICAgICAgIGN1YmU6IEludGVyZmFjZS5HRWtvc2Rwb0R0bztcclxuICAgICAgICBzdWJjb250ZW50TmF2cmhhcjogR05hdnJoYXJDb250ZW50O1xyXG4gICAgICAgIHN1YmNvbnRlbnRWZXJlam5lOiBHQ29udGVudDtcclxuICAgICAgICBzdWJjb250ZW50U291a3JvbWU6IEdDb250ZW50O1xyXG4gICAgICAgIHJlenk6IEludGVyZmFjZS5HRWtvc2Rwb0R0b1tdO1xyXG4gICAgICAgIGplVnlnZW5lcm92YW55UG9obGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgbWRmSW50ZXJmYWNlID0gR29yZGljLk1kZi5JbnRlcmZhY2U7XHJcbiAgICAgICAgICAgIC8qdGhpcy5oaWVyYXJjaGllc0NoZWNrZWRNZW1iZXJzID0gW1xyXG4gICAgICAgICAgICAgICAgLy97IG5hbWU6IFwiTURGT0RQMDNcIiwgbWVtYmVyTmFtZXM6IFtcIjEwMTk0XCIsIFwiMTAxMjRcIiwgXCIxMDE0NFwiLCBcIjEwMTAzXCIsIFwiMTAwMDJcIiwgXCIxMDAwMVwiLCBcIjEwMTE0XCIsIFwiMTAxMzRcIl0gfVxyXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcIk1ERk9EUDAzXCIsIHBsYWNlbWVudDogbWRmSW50ZXJmYWNlLkhpZXJhcmNoeVBsYWNlbWVudC5yb3dzLCBpbmRleDogMCwgIGNoZWNrZWRNZW1iZXJzOiBbXCIwXCJdIH1cclxuICAgICAgICAgICAgICAgICwgeyBuYW1lOiBcIk1ERkNTVDAzXCIsIHBsYWNlbWVudDogbWRmSW50ZXJmYWNlLkhpZXJhcmNoeVBsYWNlbWVudC5jb2x1bW5zLCBpbmRleDogMCwgY2hlY2tlZE1lbWJlcnM6IFsnMTEnLCAnMTInLCAnMTMnXSB9XHJcbiAgICAgICAgICAgICAgICAsIHsgbmFtZTogXCJNREZIU1QwM1wiLCBwbGFjZW1lbnQ6IG1kZkludGVyZmFjZS5IaWVyYXJjaHlQbGFjZW1lbnQuY29sdW1ucywgaW5kZXg6IDEsIGNoZWNrZWRNZW1iZXJzOiBbJzIwMTMnLCAnMjAxNCcsICcyMDE1JywgJzIwMTYnLCAnMjAyMCddIH1cclxuICAgICAgICAgICAgICAgICwgeyBuYW1lOiBcIk1ERlBPTDAzXCIsIHBsYWNlbWVudDogbWRmSW50ZXJmYWNlLkhpZXJhcmNoeVBsYWNlbWVudC5iYWNrZ3JvdW5kLCBpbmRleDogMCwgY2hlY2tlZE1lbWJlcnM6IFsnMCddIH1cclxuICAgICAgICAgICAgICAgICwgeyBuYW1lOiBcIk1ERlVVWjAzXCIsIHBsYWNlbWVudDogbWRmSW50ZXJmYWNlLkhpZXJhcmNoeVBsYWNlbWVudC5iYWNrZ3JvdW5kLCBpbmRleDogMSwgY2hlY2tlZE1lbWJlcnM6IFsnMCddIH1cclxuICAgICAgICAgICAgICAgICwgeyBuYW1lOiBcIk1ERk9SSjAzXCIsIHBsYWNlbWVudDogbWRmSW50ZXJmYWNlLkhpZXJhcmNoeVBsYWNlbWVudC5iYWNrZ3JvdW5kLCBpbmRleDogMiwgY2hlY2tlZE1lbWJlcnM6IFsnMCddIH1cclxuICAgICAgICAgICAgICAgICwgeyBuYW1lOiBcIk1ERk9SRzAzXCIsIHBsYWNlbWVudDogbWRmSW50ZXJmYWNlLkhpZXJhcmNoeVBsYWNlbWVudC5iYWNrZ3JvdW5kLCBpbmRleDogMywgY2hlY2tlZE1lbWJlcnM6IFsnMCddIH1cclxuICAgICAgICAgICAgXTsqL1xyXG5cclxuICAgICAgICAgICAgLyovL3RoaXMuY2FsbChcIlNldEN1YmVcIiwgeyBpZF9jdWI6IFwiTURGVUNSMDNcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uZG9uZSgoaGllcmFyY2hpZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuaGllcmFyY2hpZXMgPSBoaWVyYXJjaGllcztcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuaGllcmFyY2hpZXNDID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmhpZXJhcmNoaWVzUiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5oaWVyYXJjaGllc0IgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZXJhcmNoeURhdGFWaWV3cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGllcmFyY2hpZXMuZm9yRWFjaCgoaDogTWRmLkludGVyZmFjZS5JbnB1dEhpZXJhcmNoeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDcmVhdGVEYXRhVmlldyhoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmhpZXJhcmNoeURhdGFWaWV3cy5wdXNoKHsgbmFtZTogaC5uYW1lLCBkYXRhVmlldzogZGF0YVZpZXcgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vZmNlLCBrdGVyYSBha3R1YWxpenVqZSBjaGVja2VkTWVtYmVycyB1IGhpZXJhcmNoaWksIGt0ZXJlIGpzb3UgbmFjdGVuZSBkbyBkYXRhdmlld1xyXG4gICAgICAgICAgICB2YXIgQWt0dWFsaXp1akNoZWNrZWRNZW1iZXJzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5oaWVyYXJjaHlEYXRhVmlld3MubWFwKChoZHcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2plc3RsaSB1xb4gamUgaGllcmFyY2hpZSBuYWN0ZW5hIGRvIGRhdGF2aWV3LCB6amnFoXR1amkgemFza3J0bnV0ZSByYWRreSB2ZSBzdHJvbXUsIGppbmFrIHBvbmVjaGFtIGNoZWNrZWRNZW1iZXJzIHR5LCBjbyBqc291IHYgaGllcmFyY2hpaSAobmFwxZkuIG5hxI10ZW7DqSB6IHBvaGxlZHUpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhkdy5uYWN0ZW5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gaGR3Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dzID0gaGR3LmRhdGFWaWV3LmdldERhdGFSb3dzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2tlZFJvd3MgPSByb3dzLmZpbHRlcigocm93KSA9PiB7IHJldHVybiByb3cuY2hlY2tlZCA9PT0gdHJ1ZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dEhpZXJhcmNoeSA9IHRoaXMuaGllcmFyY2hpZXMuZmlsdGVyKChoKSA9PiBoLm5hbWUgPT09IG5hbWUpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEhpZXJhcmNoeS5jaGVja2VkTWVtYmVycy5zcGxpY2UoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWRSb3dzLmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRIaWVyYXJjaHkuY2hlY2tlZE1lbWJlcnMucHVzaChyb3cuZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZmNlLCBrdGVyw6EgbmHEjXRlIGhpZXJhcmNoaWkgZG8gc3Ryb211XHJcbiAgICAgICAgICAgIHZhciBzZXREYXRhVmlldyA9IChoaWVyYXJjaHk6IE1kZi5JbnRlcmZhY2UuSW5wdXRIaWVyYXJjaHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAvL25lbsOtLWxpIHpyb3ZuYSBha3R1w6FsbsOtIHZ5YnJhbsOhIGhpZXJhcmNoaWUsIG5lbsOtIHZlIHN0cm9tdSwgbmVtdXPDrW0gdG8gxZllxaFpdFxyXG4gICAgICAgICAgICAgICAgaWYgKGhpZXJhcmNoeSA9PT0gdGhpcy5jdXJyZW50SGllcmFyY2h5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGllcmFyY2h5RGF0YVZpZXc6IGhpZXJhcmNoeURhdGFWaWV3ID0gdGhhdC5oaWVyYXJjaHlEYXRhVmlld3MuZmluZCgoZGF0YXZpZXcpID0+IHsgcmV0dXJuIGRhdGF2aWV3Lm5hbWUgPT0gaGllcmFyY2h5Lm5hbWU7IH0pITtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhVmlldyA9IGhpZXJhcmNoeURhdGFWaWV3LmRhdGFWaWV3O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGhpZXJhcmNoeUdyaWQuZ2dyaWQoeyBkYXRhOiBkYXRhVmlldyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL2tkecW+IHXFviBieWxvIG5hxI10ZW5vLCBuZW5hxI3DrXTDoW0gem5vdnUgLSB0byBieWNoIHRha3kgbW9obCBrbGlrbm91dCBuYSBPRFBBLCB6YcWha3J0bm91dCBuxJtjbywgcGFrIGJ5Y2ggxaFlbCBuYSBQT0wsIHpww6F0a3kgbmEgT0RQQSBhIHbFoWUgemHFoWtydGzDqSBieSBzZSBtaSBwxZllbWF6YWxvIHogaW5wdXRIaWVyYXJjaHlcclxuICAgICAgICAgICAgICAgICAgICAvL1BPWk9SLCDFvsOhZG91Y8OtIGplIG5hb3BhaywgYWJ5IHNlIHRvIHbFvmR5IG5hxI1ldGxvIHUgb3RldsOtcsOhbsOtIG5vdsOpaG8gcG9obGVkdSAocHJvdG8gZMSbbMOhbSBub3bDqSB0aGF0LmhpZXJhcmNoeURhdGFWaWV3cyBzIG5hY3Rlbm89ZmFsc2UpIGEgcMWZaSBkcmlsbG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGllcmFyY2h5RGF0YVZpZXcubmFjdGVubyA9PT0gZmFsc2UpIHsgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd3M6IERhdGEuVHJlZU1ldGFSb3c8SW50ZXJmYWNlLk1lbWJlckR0bz5bXSA9IGRhdGFWaWV3LmdldERhdGFSb3dzKHRydWUsIFwiZGF0YVwiKSBhcyBEYXRhLlRyZWVNZXRhUm93PEludGVyZmFjZS5NZW1iZXJEdG8+W107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHJvd3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGRhdGFWaWV3LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcm93cyA9IGRhdGFWaWV3LmdldERhdGFSb3dzKHRydWUsIFwiZGF0YVwiKSBhcyBEYXRhLlRyZWVNZXRhUm93PEludGVyZmFjZS5NZW1iZXJEdG8+W107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChyb3dzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkYXRhVmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByb3dzID0gZGF0YVZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSwgXCJkYXRhXCIpIGFzIERhdGEuVHJlZU1ldGFSb3c8SW50ZXJmYWNlLk1lbWJlckR0bz5bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vWmFza3J0bmVtZSB2c2VjaG55IHZ5YnJhbmUgcHJ2a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWVyYXJjaHkuY2hlY2tlZE1lbWJlcnMuZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuZGF0YS5pZCA9PT0gbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyZWU6IEdvcmRpYy5EYXRhLlRyZWU8R29yZGljLk1kZi5JbnRlcmZhY2UuTWVtYmVyRHRvLCBhbnk+ID0gZGF0YVZpZXcucHJvY2Vzc29ycy50cmVlIGFzIEdvcmRpYy5EYXRhLlRyZWU8R29yZGljLk1kZi5JbnRlcmZhY2UuTWVtYmVyRHRvLCBhbnk+O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdFN0YXRlRnVuY3Rpb24ocm93KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IHRyZWUuZ2V0Q2hpbGRyZW4ocm93KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBicmVha01lID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnN0cnVjdHVyZSA9ICQuZXh0ZW5kKHt9LCByb3cuc3RydWN0dXJlLCB7IHN0YXRlOiBcImNsb3NlZFwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8va2R5eiBqZSBhbGVzcG9uIGplZGVuIGNoaWxkIHphc2tydGx5LCBidWRlIHZldGV2IHJvemtsaWtudXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChicmVha01lID09IGZhbHNlICYmIGNoaWxkLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnN0cnVjdHVyZSA9ICQuZXh0ZW5kKHt9LCByb3cuc3RydWN0dXJlLCB7IHN0YXRlOiBcIm9wZW5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtNZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFWaWV3LnJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZXJhcmNoeURhdGFWaWV3Lm5hY3Rlbm8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyBTZXpuYW0gYWtjw61cclxuICAgICAgICAgICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIGFrY8OtXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0R2VuZXJhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdlbmVyYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJHZW5lcm92YXQgcG9obGVkXCIsIC8vUkMgMjY4NTAwNjEgOiBaw6F2aXNsw6kgw7pwcmF2eVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZ2VuZXJhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJjb250ZW50TmF2cmhhci5Ba3R1YWxpenVqQ2hlY2tlZE1lbWJlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5HZW5lcmF0ZVJlc3VsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RWeWJlclJlejoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VnliZXJSZXpcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5YnJhdCBkYXRvdsO9IMWZZXpcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWJhbGlrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJEYXRvdsO9IMWZZXogLSBrbGlrbnV0w61tIGx6ZSB2eWJyYXQgamluw71cIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5TZWxlY3RvcnMuRGVmYXVsdFNlbGVjdG9yKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWQ6IHRoYXQuZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlbDvWLEm3IgZGF0b3bDqWhvIMWZZXp1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5TZWxlY3RFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnJlenksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInprcmF0a2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYXRvdsO9IMWZZXpcIiwgLy9SQyAyNjg1MDAxMyA6IEvDs2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTsOhemV2XCIsIC8vUkMgMjY4NTAwMTQgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHNlbGVjdGVkUmV6OiBNZGYuSW50ZXJmYWNlLkdFa29zZHBvRHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFZ5YmVyUmV6IS51cGRhdGUoeyBjYXB0aW9uOiBzZWxlY3RlZFJlei56a3JhdGthISwgdmlzaWJsZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c1Jlei51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c0JhcihbdGhpcy5zdGF0dXNSZXpdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChcIlNldEN1YmVcIiwgeyBjdWJlOiBzZWxlY3RlZFJleiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChoaWVyYXJjaGllcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTmF2cmhhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN1YmNvbnRlbnROYXZyaGFyLnJlYWR5QXdhaXQudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3ViY29udGVudE5hdnJoYXIuYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFZ5YmVyUmV6Mjoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VnliZXJSZXoyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeWJyYXQgZGF0b3bDvSDFmWV6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1iYWxpa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VnliZXJSZXohLnJ1bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RTYXZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2w6IFwiVWxvxb5pdCBwb2hsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJjb250ZW50TmF2cmhhci5Ba3R1YWxpenVqQ2hlY2tlZE1lbWJlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR0bzogR29yZGljLk1kZi5JbnRlcmZhY2UuR1BvaGxlZER0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdG8uaWRfY3ViID0gdGhpcy5jdWJlLmlkX2RwbyE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR0by5oaWVyYXJjaGllcyA9IHRoaXMuaGllcmFyY2hpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR0by5uYXpldiA9IFwiTm92eSBwb2hsZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsKFwiVWxvelBvaGxlZFwiLCB7IGR0bzogZHRvIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQuY29udGVudCh0aGlzLmVsZW1lbnQpLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFtcIkdvcmRpYy5NZGYuV2ViQ2xpZW50LkdQb2hsZWRTYXZlXCIsIHsgdWlkOiBcIlNhdmVQb2hsZWRcIiwgaXhzU3RyUm9vdFNvdWtyb215OiB0aGlzLml4c1N0clJvb3RTb3Vrcm9teSwgaXhzU3RyUm9vdFZlcmVqbnk6IHRoaXMuaXhzU3RyUm9vdFZlcmVqbnksIHBvaGxlZER0bzogZHRvLCBjcmVhdGVVbWlzdGVuaUNvbnRlbnQ6IHRoaXMuY3JlYXRlUG9obGVkeUNvbnRlbnQgfV0sIG51bGwsIHsgd2lkdGg6IDYwMCwgaGVpZ2h0OiA0NjAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGRsZyA9IChwYXJlbnRFbGVtZW50ID8gJC5jb250ZW50KHBhcmVudEVsZW1lbnQpLmRpYWxvZ3MgOiBHRGxnKS5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRWtvLldlYkNsaWVudC5HTmV3UmVjb3JkRGxnXCIsICQuZXh0ZW5kKG9wdGlvbnMsIHsgSUQ6IFwiTmV3UmVjb3JkRFdcIiB9KSwgeyB3aWR0aDogNjAwLCBoZWlnaHQ6IDQ2MCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGF0dXNSZXogPSBuZXcgR09ic2VydmFibGVPYmplY3QoeyBpZDogXCJzdGF0dXNLUllcIiwgdHlwZTogXCJhY3Rpb25cIiwgY2FwdGlvbjogXCJWeWJyYXQgZGF0b3bDvSDFmWV6XCIsIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFZ5YmVyUmV6ISB9KTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXNCYXIoW3RoaXMuc3RhdHVzUmV6LCB7IHR5cGU6IFwic2VwYXJhdG9yXCIsIHZpc2libGU6IGZhbHNlIH1dKTtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0VnliZXJSZXoyKlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIE9ibGFzdCB2w71zdHVwdSAtIGRyaWxsb3ZhY8OtIGtvbXBvbmVudGFcclxuICAgICAgICAgICAgdGhpcy4kdGFibGUgPSAkKFwiPGRpdiBjbGFzcz0ndGFibGVfd3JhcHBlcic+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHRhYmxlLm9uKFwiY2xpY2tcIiwgXCIuY2xpY2thYmxlXCIsIChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9ICQoZXYuY3VycmVudFRhcmdldClcclxuXHJcbiAgICAgICAgICAgICAgICAvL3pqaXN0aW0gbWVtYmVyTmFtZVxyXG4gICAgICAgICAgICAgICAgbGV0IG1lbWJlck5hbWUgPSB0LmF0dHIoJ21lbWJlcklkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy96amlzdGltIGxldmVsXHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWwgPSAtMTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0Lmhhc0NsYXNzKFwibGV2ZWxcIiArIGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vemppc3RpbSBoaWVyYXJjaHlJbmRleFxyXG4gICAgICAgICAgICAgICAgbGV0IG0gPSB0LmNoaWxkcmVuKFwiLm1lbWJlclwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWVyYXJjaHlJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtLmhhc0NsYXNzKFwiZGltXCIgKyBpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWVyYXJjaHlJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBwbGFjZW1lbnRJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtLmhhc0NsYXNzKFwicGxhY2VtZW50SW5kZXhcIiArIGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudEluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwbHVzTWludXM6IHN0cmluZyA9IFwiLlwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IGkgPSB0LmNoaWxkcmVuKFwiLnBsdXNNaW51c1wiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpLmhhc0NsYXNzKFwiZmEtcGx1c1wiKSlcclxuICAgICAgICAgICAgICAgICAgICBwbHVzTWludXMgPSBcIitcIjtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBwbHVzTWludXMgPSBcIi1cIjtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRIaWVyYXJjaHk6IE1kZi5JbnRlcmZhY2UuSW5wdXRIaWVyYXJjaHk7IC8vID0gdGhpcy5oaWVyYXJjaGllcy5maWx0ZXIoKGgpID0+IHsgcmV0dXJuIGgucGxhY2VtZW50ID09PSBHb3JkaWMuTWRmLkludGVyZmFjZS5IaWVyYXJjaHlQbGFjZW1lbnQucm93cyAmJiBoLmluZGV4ID09PSBwbGFjZW1lbnRJbmRleDsgfSkhWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWVyYXJjaGllcy5mb3JFYWNoKChoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGgucGxhY2VtZW50ID09PSBHb3JkaWMuTWRmLkludGVyZmFjZS5IaWVyYXJjaHlQbGFjZW1lbnQucm93cyAmJiBoLmluZGV4ID09PSBwbGFjZW1lbnRJbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRIaWVyYXJjaHkgPSBoO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vY29uc3QgaGllcmFyY2h5RGF0YVZpZXc6IGhpZXJhcmNoeURhdGFWaWV3ID0gdGhhdC5oaWVyYXJjaHlEYXRhVmlld3MuZmluZCgoZGF0YXZpZXcpID0+IHsgcmV0dXJuIGRhdGF2aWV3Lm5hbWUgPT0gaW5wdXRIaWVyYXJjaHkubmFtZTsgfSkhO1xyXG4gICAgICAgICAgICAgICAgLy9oaWVyYXJjaHlEYXRhVmlldy5uYWN0ZW5vID0gZmFsc2U7ICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ViY29udGVudE5hdnJoYXIuc2V0TmFjdGVubyhpbnB1dEhpZXJhcmNoeSEsIGZhbHNlKTsgIC8vcHJpIGRyaWxsb3Zhbmkgc2UgYnVkZSB2emR5IHByZW5hc3Rhdm92YXQgZGF0YXZpZXcgcG9kbGUgaGllcmFyY2hpZVxyXG4gICAgICAgICAgICAgICAgLy9leHBhbmRcclxuICAgICAgICAgICAgICAgIGlmIChwbHVzTWludXMgPT09IFwiK1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbChcIkdldENoaWxkcmVuXCIsIHsgaGllcmFyY2h5SW5kZXg6IGhpZXJhcmNoeUluZGV4LCBsZXZlbDogbGV2ZWwsIG1lbWJlck5hbWU6IG1lbWJlck5hbWUsIGZ1bGx5UmVjdXJzaXZlOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoY2hpbGRyZW46IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEhpZXJhcmNoeS5jaGVja2VkTWVtYmVycy5wdXNoLmFwcGx5KGlucHV0SGllcmFyY2h5LmNoZWNrZWRNZW1iZXJzLCBjaGlsZHJlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYWN0aW9ucy5hY3RHZW5lcmF0ZSEucnVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkdlbmVyYXRlUmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1phxaFrcnRudSBpIHZlIHN0cm9tdSBkaW1lbnplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YmNvbnRlbnROYXZyaGFyLnNldERhdGFWaWV3KGlucHV0SGllcmFyY2h5ISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLy9jb2xsYXBzZVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsKFwiR2V0Q2hpbGRyZW5cIiwgeyBoaWVyYXJjaHlJbmRleDogaGllcmFyY2h5SW5kZXgsIGxldmVsOiBsZXZlbCwgbWVtYmVyTmFtZTogbWVtYmVyTmFtZSwgZnVsbHlSZWN1cnNpdmU6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGNoaWxkcmVuOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgY2hpbGRyZW46IHN0cmluZ1tdID0gW1wiMTAxMjRcIiwgXCIxMDEzNFwiLCBcIjEwMTQ0XCIsIFwiMTAxOTRcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgobSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGlucHV0SGllcmFyY2h5LmNoZWNrZWRNZW1iZXJzLmluZGV4T2YobSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0SGllcmFyY2h5LmNoZWNrZWRNZW1iZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5HZW5lcmF0ZVJlc3VsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9aYcWha3J0bnUgaSB2ZSBzdHJvbXUgZGltZW56ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJjb250ZW50TmF2cmhhci5zZXREYXRhVmlldyhpbnB1dEhpZXJhcmNoeSEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gU3Ryb215IHBvaGxlZMWvXHJcbiAgICAgICAgICAgIC8vY29uc3QgbmFjdGlQb2hsZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIGxldCBwb2hsZWRIaWVyYXJjaGllcztcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5jYWxsKFwiR2V0UG9obGVkRHRvXCIsIHsgcmVwb3J0SWQ6IHRoaXMuc2VsZWN0ZWRSZXBvcnRJZCB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLnRoZW4oKHBvaGxlZER0bzogR29yZGljLk1kZi5JbnRlcmZhY2UuR1BvaGxlZER0bykgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RWeWJlclJleiEudXBkYXRlKHsgY2FwdGlvbjogcG9obGVkRHRvLmlkX2N1YiB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBwb2hsZWRIaWVyYXJjaGllcyA9IHBvaGxlZER0by5oaWVyYXJjaGllcyE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbGV0IHJlejogSW50ZXJmYWNlLkdFa29zZHBvRHRvIHwgdW5kZWZpbmVkID0gdGhpcy5yZXp5LmZpbmQoKHIpID0+IHIuaWRfZHBvID09PSBwb2hsZWREdG8uaWRfY3ViKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsKFwiU2V0Q3ViZVwiLCB7IGN1YmU6IHJleiB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5oaWVyYXJjaGllcyA9IHBvaGxlZEhpZXJhcmNoaWVzO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU5hdnJoYXIoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5HZW5lcmF0ZVJlc3VsdCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vY29uc3QgY3JlYXRlUG9obGVkeUNvbnRlbnQgPSBmdW5jdGlvbiAodmVyZWpuZTogYm9vbGVhbik6IEdDb250ZW50PElHQ29udGVudEJhc2UsIGFueT4vKiAmIE9iamVjdExpdGVyYWw8YW55PiovIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJjb250ZW50VmVyZWpuZSA9IHRoaXMuY3JlYXRlUG9obGVkeUNvbnRlbnQodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViY29udGVudFNvdWtyb21lID0gdGhpcy5jcmVhdGVQb2hsZWR5Q29udGVudChmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0VnliZXJSZXohLnJ1bigpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIEdlbmVyYXRlUmVzdWx0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGwoXCJHZW5lcnVqUG9obGVkXCIsIHsgaGllcmFyY2hpZXNDaGVja2VkTWVtYmVyczogdGhpcy5oaWVyYXJjaGllcy8qLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIChhLnBsYWNlbWVudCAqIDEwMCArIGEuaW5kZXgpIC0gKGIucGxhY2VtZW50ICogMTAwICsgYi5pbmRleCk7IH0pKi8gfSlcclxuICAgICAgICAgICAgLmRvbmUoKHJlc3VsdDogTWRmLkludGVyZmFjZS5SZXN1bHREdG8pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vcMWZZXZlZGVuw60gZG8gbG9rw6FsbsOtY2ggcHJvbcSbbm7DvWNoXHJcbiAgICAgICAgICAgICAgICBsZXQgbF9kaW1JblJvd3NDb3VudCA9IHJlc3VsdC5kaW1JblJvd3NDb3VudDtcclxuICAgICAgICAgICAgICAgIGxldCBsX2RpbUluQ29sdW1uc0NvdW50ID0gcmVzdWx0LmRpbUluQ29sdW1uc0NvdW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuY2VsbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0YWJsZS5odG1sKFwiTmVieWx5IG5hbGV6ZW55IMW+w6FkbsOpIHrDoXpuYW15IG9kcG92w61kYWrDrWPDrSB6YWRhbsO9bSBrcml0w6lyacOtbS4gWmt1c3RlIHptxJtuaXQgbsOhdnJoIHBvaGxlZHUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBjZWxscyA9IHJlc3VsdC5jZWxscztcclxuICAgICAgICAgICAgICAgIGxldCBsZXZlbHNSb3dzID0gcmVzdWx0LmxldmVsc1Jvd3M7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGx1c01pbnVzUm93cyA9IHJlc3VsdC5wbHVzTWludXNSb3dzO1xyXG4gICAgICAgICAgICAgICAgbGV0IFJuYW1lcyA9IHJlc3VsdC5SbmFtZXM7XHJcbiAgICAgICAgICAgICAgICBsZXQgQ25hbWVzID0gcmVzdWx0LkNuYW1lcztcclxuXHJcbiAgICAgICAgICAgICAgICAvL3R2b3JiYSBkdG9zIC0gem9icmF6ZW7DvWNoIGRhdFxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbENvdW50ID0gY2VsbHNbMF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvd0NvdW50ID0gY2VsbHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgbGV0IGR0b3M6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IGNlbGxzLmxlbmd0aDsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR0bzogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBjb2xDb3VudDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjIDwgbF9kaW1JblJvd3NDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvW1wiZGltXCIgKyBjXSA9IGNlbGxzW3JdW2NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0b1tcImNcIiArIChjIC0gbF9kaW1JblJvd3NDb3VudCldID0gY2VsbHNbcl1bY107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGR0b3MucHVzaChkdG8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vSFRNTCBUQUJMRS8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpbUluZGV4ZXNDb2x1bW5zID0gcmVzdWx0LmRpbUluZGV4ZXNDb2x1bW5zO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpbUluZGV4ZXNSb3dzID0gcmVzdWx0LmRpbUluZGV4ZXNSb3dzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhYmxlOiBzdHJpbmcgPSBcIjx0YWJsZSBjbGFzcz0nbWRmVGFibGUnPlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBaYWhsYXZpIHNsb3VwY8WvXHJcbiAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0aGVhZD5cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyNyZWdpb24gTmF6dnkgZGltZW56aSB2ZSBzbG91cGNpY2hcclxuICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRyPlwiO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBsX2RpbUluUm93c0NvdW50OyBjKyspXHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGg+PC90aD5cIjtcclxuICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRoIGNvbHNwYW49JzEwJyBzdHlsZT0ndGV4dC1hbGlnbjogbGVmdCc+XCI7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuZGltSW5Db2x1bW5zQ2FwdGlvbnMuZm9yRWFjaCgoY2FwdGlvbikgPT4geyB0YWJsZSArPSBjYXB0aW9uICsgXCI8L2JyPlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8L3RoPlwiO1xyXG4gICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCBsX2RpbUluQ29sdW1uc0NvdW50OyByKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZHRvID0gZHRvc1tyXTtcclxuICAgICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0cj5cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIExldnkgaG9ybmkgcm9oXHJcbiAgICAgICAgICAgICAgICAgICAgLy9uw6F6dnkgZGltZW56w60gdiDFmcOhZGPDrWNoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIgPT09IGxfZGltSW5Db2x1bW5zQ291bnQgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBzID0gMDsgcyA8IGxfZGltSW5Sb3dzQ291bnQ7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGggY2xhc3M9J2hlYWRDZWxsJz57MH08L3RoPlwiLmZvcm1hdChkdG9bXCJkaW1cIiArIHNdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBsX2RpbUluUm93c0NvdW50OyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRoICBjbGFzcz0naGVhZENlbGwnPjwvdGg+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIFphaGxhdmkgc2xvdXBjdSAtIG1lbWJlcnNcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBjYXB0aW9uUHJldiA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHNwYW4gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZW1iZXJQYXJ0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBzID0gbF9kaW1JblJvd3NDb3VudDsgcyA8IGNvbENvdW50OyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhcHRpb246IHN0cmluZyA9IGR0b1tcImNcIiArIChzIC0gbF9kaW1JblJvd3NDb3VudCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAociA9PT0gbF9kaW1JbkNvbHVtbnNDb3VudCAtIDEgfHwgcyA9PT0gbF9kaW1JblJvd3NDb3VudCB8fCBDbmFtZXNbcyAtIGxfZGltSW5Sb3dzQ291bnRdW3JdICE9PSBDbmFtZXNbcyAtIGxfZGltSW5Sb3dzQ291bnQgLSAxXVtyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lbWJlclBhcnQubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sc3BhbiA+IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRoIGNvbHNwYW49J3sxfSc+ezB9PC90aD5cIi5mb3JtYXQobWVtYmVyUGFydCwgY29sc3Bhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0aD57MH08L3RoPlwiLmZvcm1hdChtZW1iZXJQYXJ0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW1iZXJQYXJ0ID0gXCI8ZGl2IGNsYXNzPSdtZW1iZXJDb2x1bW4gZGltezB9Jz57MX08L2Rpdj5cIi5mb3JtYXQoZGltSW5kZXhlc0NvbHVtbnNbcl0sIGNhcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sc3BhbiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL21lbWJlclBhcnQgKz0gXCI8dGg+PC90aD5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHNwYW4rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NhcHRpb25QcmV2ID0gY2FwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZW1iZXJQYXJ0Lmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xzcGFuID4gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRoIGNvbHNwYW49J3sxfSc+ezB9PC90aD5cIi5mb3JtYXQobWVtYmVyUGFydCwgY29sc3Bhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRoPnswfTwvdGg+XCIuZm9ybWF0KG1lbWJlclBhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3RhYmxlICs9IFwiPHRoIGNvbHNwYW49JzInPsOacm92ZcWIPC90aD48dGggY29sc3Bhbj0nMyc+S29udHJvbHkgbmE8L3RoPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90aGVhZD5cIjtcclxuICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiDFmcOhZGt5IHMgZGF0eVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IGxfZGltSW5Db2x1bW5zQ291bnQ7IHIgPCByb3dDb3VudDsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR0byA9IGR0b3Nbcl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dHI+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIHrDoWhsYXbDrSDFmcOhZGvFryAtIG1lbWJlcnNcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBzID0gMDsgcyA8IGxfZGltSW5Sb3dzQ291bnQ7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21lbWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGx1c01pbnVzID0gcGx1c01pbnVzUm93c1tyIC0gbF9kaW1JbkNvbHVtbnNDb3VudF1bc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGlja2FibGUgPSBwbHVzTWludXMgPT09IFwiLlwiID8gXCJcIiA6IFwiY2xpY2thYmxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbHVzTWludXNJY29uID0gcGx1c01pbnVzID09PSBcIitcIiA/IFwiZmEtcGx1c1wiIDogKHBsdXNNaW51cyA9PT0gXCItXCIgPyBcImZhLW1pbnVzXCIgOiBcImZhLWNpcmNsZSBkb3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va2R5xb4gamUgdG8gcG9zbGVkbsOtIGRpbWVuemUsIHZ5a3Jlc2zDrW0gbWVtYmVyIHbFvmR5LCB2IHDFmWVkY2hvesOtY2ggZGltZW56w61jaCBwYWsgamVub20ga2R5xb4gdG8gbmVuw60gc3Rlam7DqSBqYWtvIHDFmWVkY2hvesOtIMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgPT09IGxfZGltSW5Sb3dzQ291bnQgLSAxIHx8IHIgPT09IGxfZGltSW5Db2x1bW5zQ291bnQgfHwgUm5hbWVzW3IgLSBsX2RpbUluQ29sdW1uc0NvdW50XVtzXSAhPT0gUm5hbWVzW3IgLSBsX2RpbUluQ29sdW1uc0NvdW50IC0gMV1bc10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0aCAgY2xhc3M9J2hlYWRDZWxsJz48ZGl2IGNsYXNzPSdsZXZlbHswfSB7NX0nIG1lbWJlcklkPXs0fT48aSBjbGFzcz0nZmEgezN9IHBsdXNNaW51cyc+PC9pPjxkaXYgY2xhc3M9J21lbWJlciBkaW17MX0gcGxhY2VtZW50SW5kZXh7Nn0nPnsyfTwvZGl2PjwvZGl2PjwvdGg+XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9ybWF0KGxldmVsc1Jvd3NbciAtIGxfZGltSW5Db2x1bW5zQ291bnRdW3NdLCBkaW1JbmRleGVzUm93c1tzXSwgZHRvW1wiZGltXCIgKyBzXSwgcGx1c01pbnVzSWNvbiwgUm5hbWVzW3IgLSBsX2RpbUluQ29sdW1uc0NvdW50XVtzXSwgY2xpY2thYmxlLCBzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGggY2xhc3M9J2hlYWRDZWxsJz48L3RoPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHMgPSBsX2RpbUluUm93c0NvdW50OyBzIDwgY29sQ291bnQ7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0aCBjbGFzcz0nZGF0YUNlbGwnPnswfTwvdGg+XCIuZm9ybWF0KGR0b1tcImNcIiArIChzIC0gbF9kaW1JblJvd3NDb3VudCldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8L3RhYmxlPlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuJHRhYmxlLmh0bWwodGFibGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qZVZ5Z2VuZXJvdmFueVBvaGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hQb2hsZWR5KHRoaXMuamVWeWdlbmVyb3ZhbnlQb2hsZWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWZyZXNoUG9obGVkeShzYXZlRW5hYmxlZDogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLnN1YmNvbnRlbnRWZXJlam5lLmFjdGlvbnMuYWN0U2F2ZSEudXBkYXRlKHsgZW5hYmxlZDogc2F2ZUVuYWJsZWQgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViY29udGVudFNvdWtyb21lLmFjdGlvbnMuYWN0U2F2ZSEudXBkYXRlKHsgZW5hYmxlZDogc2F2ZUVuYWJsZWQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ZjZSBuYSB2eXR2b8WZZW7DrSBuw6F2cmjDocWZZSBwb2hsZWTFr1xyXG4gICAgICAgIGNyZWF0ZU5hdnJoYXIoKSB7XHJcbiAgICAgICAgICAgIC8va2R5xb4gdcW+IGV4aXN0dWplIHN0YXLDvSBuw6F2cmjDocWZLCBuZWpwcnZlIGhvIG9kcG9qw61tZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdWJjb250ZW50TmF2cmhhcilcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ViY29udGVudE5hdnJoYXIudW5kb2NrKCk7XHJcbiAgICAgICAgICAgIC8vcG90b20gdnl0dm/FmcOtbWUgbm92w70gbsOhdnJow6HFmSAoc3ViY29udGVudClcclxuICAgICAgICAgICAgdGhpcy5zdWJjb250ZW50TmF2cmhhciA9IHRoaXMuY3JlYXRlQ29udGVudChHTmF2cmhhckNvbnRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnN1YmNvbnRlbnROYXZyaGFyLmhpZXJhcmNoaWVzID0gdGhpcy5oaWVyYXJjaGllcztcclxuICAgICAgICAgICAgdGhpcy5zdWJjb250ZW50TmF2cmhhci5hY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xyXG4gICAgICAgICAgICB0aGlzLnN1YmNvbnRlbnROYXZyaGFyLmRvY2tUbyh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hY3RpUG9obGVkKCkge1xyXG4gICAgICAgICAgICBsZXQgcG9obGVkSGllcmFyY2hpZXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbChcIkdldFBvaGxlZER0b1wiLCB7IHJlcG9ydElkOiB0aGlzLnNlbGVjdGVkUmVwb3J0SWQgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChwb2hsZWREdG86IEdvcmRpYy5NZGYuSW50ZXJmYWNlLkdQb2hsZWREdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VnliZXJSZXohLnVwZGF0ZSh7IGNhcHRpb246IHBvaGxlZER0by5pZF9jdWIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9obGVkSGllcmFyY2hpZXMgPSBwb2hsZWREdG8uaGllcmFyY2hpZXMhO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXo6IEludGVyZmFjZS5HRWtvc2Rwb0R0byB8IHVuZGVmaW5lZCA9IHRoaXMucmV6eS5maW5kKChyKSA9PiByLmlkX2RwbyA9PT0gcG9obGVkRHRvLmlkX2N1Yik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChcIlNldEN1YmVcIiwgeyBjdWJlOiByZXogfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGllcmFyY2hpZXMgPSBwb2hsZWRIaWVyYXJjaGllcztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVOYXZyaGFyKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuR2VuZXJhdGVSZXN1bHQoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVQb2hsZWR5Q29udGVudCh2ZXJlam5lOiBib29sZWFuLCBkb2NrOiBib29sZWFuKTogR0NvbnRlbnQ8SUdDb250ZW50QmFzZSwgYW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgdGVtYSA9IHZlcmVqbmUgPyBcIm1kZl9wdG1fdmVyZWpueVwiIDogXCJtZGZfcHRtX3NvdWtyXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdmVyZWpuZSA/IFwiVmXFmWVqbsOpIHBvaGxlZHlcIiA6IFwiU291a3JvbcOpIHBvaGxlZHlcIlxyXG4gICAgICAgICAgICBjb25zdCBpY29uID0gdmVyZWpuZSA/IFwiZ2ktenZlcmVqbml0XCIgOiBcImdpLXVzZXJcIjtcclxuICAgICAgICAgICAgY29uc3QgaXhzU3RyUm9vdCA9IHZlcmVqbmUgPyB0aGF0Lml4c1N0clJvb3RWZXJlam55IDogdGhhdC5peHNTdHJSb290U291a3JvbXk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YmNvbnRlbnQgPSB0aGF0LmNyZWF0ZUNvbnRlbnQoW0dvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRUcmVlQ29udHJvbFRTLCB7XHJcbiAgICAgICAgICAgICAgICB1aWQ6IGBtZGZfJHt0ZW1hfV8jYCwgY29udHJvbFBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFRlbWE6IHRlbWEsIFNlbGVjdFJlcG9ydE9ubHk6IHRydWUsIFNob3dKdXN0T25lUmVwb3J0OiB0cnVlLCBpeHNTdHI6IGl4c1N0clJvb3QsIHRpdGxlOiB0aXRsZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XSkgYXMgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFM7XHJcbiAgICAgICAgICAgIC8vc3ViY29udGVudC51aWQgPSBcIiNcIiArIHRlbWE7XHJcbiAgICAgICAgICAgIGlmIChkb2NrKVxyXG4gICAgICAgICAgICAgICAgc3ViY29udGVudC5kb2NrVG8odGhhdCwgeyBpY29uOiBpY29uLCB0aXRsZTogdGl0bGUsIHJlZ2lvbjogXCJsZWZ0XCIgfSk7XHJcblxyXG4gICAgICAgICAgICBzdWJjb250ZW50LnJlYWR5QXdhaXQudGhlbigoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2V0Um93ID0gKHRyZWVJZDogbnVtYmVyLCBkYXRhdmlldzogRGF0YS5WaWV3PGFueT4pOiBEYXRhLlRyZWVNZXRhUm93PFJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVOb2RlRHRvPiB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IGRhdGF2aWV3LmdldERhdGFSb3dzKHRydWUsIFwiZGF0YVwiKSBhcyBEYXRhLlRyZWVNZXRhUm93PFJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVOb2RlRHRvPltdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFJvdyA9IHJvd3MuZmluZCgocikgPT4geyByZXR1cm4gci5kYXRhLnRyZWVJZCA9PSB0cmVlSWQ7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRSb3c7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kUGFyZW50cyA9ICh0cmVlSWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGF2aWV3ID0gc3ViY29udGVudC5ncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmVlUHJvY2Vzc29yID0gZGF0YXZpZXcucHJvY2Vzc29ycy50cmVlIGFzIEdvcmRpYy5EYXRhLlRyZWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zdCByb3dzID0gZGF0YXZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSwgXCJkYXRhXCIpIGFzIERhdGEuVHJlZU1ldGFSb3c8UmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZU5vZGVEdG8+W107XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50Um93ID0gZ2V0Um93KHRyZWVJZCwgZGF0YXZpZXcpOyAvLyByb3dzLmZpbmQoKHIpID0+IHsgcmV0dXJuIHIuZGF0YS50cmVlSWQgPT0gdHJlZUlkOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50Um93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJlbnRzID0gdHJlZVByb2Nlc3Nvci5nZXRQYXJlbnRzKHBhcmVudFJvdyBhcyBNZXRhUm93PGFueT4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZvciAodmFyIGkgPSAwOyBpIDwgcGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBsZXQgcCA9IHBhcmVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHBbXCJzdHJ1Y3R1cmVcIl0gPSB7IHN0YXRlOiBcIm9wZW5cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcm96YmFsaW0gdnNlY2hueSBwYXJlbnR5IHBhcmVudGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5mb3JFYWNoKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLnN0cnVjdHVyZSA9ICQuZXh0ZW5kKHt9LCByLnN0cnVjdHVyZSwgeyBzdGF0ZTogXCJvcGVuXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yb3piYWxpbSBzYW1vdG5laG8gcGFyZW50YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRSb3cuc3RydWN0dXJlID0gJC5leHRlbmQoe30sIHBhcmVudFJvdy5zdHJ1Y3R1cmUsIHsgc3RhdGU6IFwib3BlblwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXZpZXcucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjcmVhdGVTdHIgPSAocG9kcml6ZW5hU2xvemthOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyZWVJZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5zaW1wbGVGb3JtKFwiWmFkZWp0ZSBuw6F6ZXYgbm92w6kgc2xvxb5reVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oKS5hZGRSb3coXCJOw6F6ZXZcIikvLyBqZWRub2R1Y2jDvSBmb3JtdWzDocWZIC8vIFJDIDI5NzUwMzMzIDogWmFkZWp0ZSBkYXR1bSBvZMO6xI10b3bDoW7DrSAvLyBSQyAyOTc1MDMzNCA6IERhdHVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIm5hemV2XCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSksIHsgLypEYXR1bU9kdWN0b3Zhbmk6IGRhdHVtKi8gfSwgeyB3aWR0aDogMzAwLCBoZWlnaHQ6IDE1MCwgcmVzaXphYmxlOiBmYWxzZSB9KSAgLy8gcMWZaWTDoW7DrSBkYXR1bW92w6lobyBwb2zDrcSNa2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKHJldFZhbCkgPT4gcmV0VmFsICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChldiwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBzdWJjb250ZW50LmdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXhzU3RyTmFkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2RyaXplbmFTbG96a2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUlkID0gc2VsZWN0aW9uWzBdLmRhdGEudHJlZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNTdHJOYWQgPSBzZWxlY3Rpb25bMF0uZGF0YS5peHNTdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlSWQgPSBzZWxlY3Rpb25bMF0uZGF0YS50cmVlUGFyZW50SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFJvdyA9IGdldFJvdyh0cmVlSWQsIHN1YmNvbnRlbnQuZ3JpZC5nZ3JpZChcImdldFZpZXdcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNTdHJOYWQgPSBwYXJlbnRSb3c/LmRhdGEuaXhzU3RyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXhzU3RyTmFkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c1N0ck5hZCA9IGl4c1N0clJvb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5jYWxsKFwiQ3JlYXRlU3RyXCIsIHsgaXhzU3RyTmFkOiBpeHNTdHJOYWQsIHRlbWE6IHRlbWEsIG5hemV2OiBldi5uYXpldiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YmNvbnRlbnQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kUGFyZW50cyh0cmVlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvKmNvbnN0IGdldFJlcG9ydElkID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gc3ViY29udGVudC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXBvcnRJZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydElkID0gc2VsZWN0aW9uWzBdLmRhdGEuaXhzU3RyLnJlcG9ydElkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcG9ydElkO1xyXG4gICAgICAgICAgICAgICAgfSovXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vbWVudWJhclxyXG4gICAgICAgICAgICAgICAgLy9zdWJjb250ZW50Lm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgc3ViY29udGVudC5hY3Rpb25zLmFkZFJhbmdlKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0U2F2ZTogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3BhcmVudENvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbDogXCJVbG/Fvml0IHBvaGxlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YmNvbnRlbnROYXZyaGFyLkFrdHVhbGl6dWpDaGVja2VkTWVtYmVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdG86IEdvcmRpYy5NZGYuSW50ZXJmYWNlLkdQb2hsZWREdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uaWRfY3ViID0gdGhpcy5jdWJlLmlkX2RwbyE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmhpZXJhcmNoaWVzID0gdGhpcy5oaWVyYXJjaGllcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8ubmF6ZXYgPSBcIk5vdnkgcG9obGVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLnRlbWEgPSB0ZW1hO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJlZUlkID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJaYWRlanRlIG7DoXpldiBwb2hsZWR1XCIsIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpLmFkZFJvdyhcIk7DoXpldlwiKS8vIGplZG5vZHVjaMO9IGZvcm11bMOhxZkgLy8gUkMgMjk3NTAzMzMgOiBaYWRlanRlIGRhdHVtIG9kw7rEjXRvdsOhbsOtIC8vIFJDIDI5NzUwMzM0IDogRGF0dW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwibmF6ZXZcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KSwgeyAvKkRhdHVtT2R1Y3RvdmFuaTogZGF0dW0qLyB9LCB7IHdpZHRoOiAzMDAsIGhlaWdodDogMTUwLCByZXNpemFibGU6IGZhbHNlIH0pICAvLyBwxZlpZMOhbsOtIGRhdHVtb3bDqWhvIHBvbMOtxI1rYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgocmV0VmFsKSA9PiByZXRWYWwgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGV2LCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5uYXpldiA9IGV2Lm5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gc3ViY29udGVudC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl4c1N0cjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNTdHIgPSBzZWxlY3Rpb25bMF0uZGF0YS5peHNTdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZUlkID0gc2VsZWN0aW9uWzBdLmRhdGEudHJlZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpeHNTdHIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzU3RyID0gaXhzU3RyUm9vdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5peHNfc3RyID0gaXhzU3RyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChcIlVsb3pQb2hsZWRcIiwgeyBkdG86IGR0byB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJjb250ZW50LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZFBhcmVudHModHJlZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJC5jb250ZW50KHRoaXMuZWxlbWVudCkuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coW1wiR29yZGljLk1kZi5XZWJDbGllbnQuR1BvaGxlZFNhdmVcIiwgeyB1aWQ6IFwiU2F2ZVBvaGxlZFwiLCBpeHNTdHJSb290U291a3JvbXk6IHRoaXMuaXhzU3RyUm9vdFNvdWtyb215LCBpeHNTdHJSb290VmVyZWpueTogdGhpcy5peHNTdHJSb290VmVyZWpueSwgcG9obGVkRHRvOiBkdG8sIGNyZWF0ZVVtaXN0ZW5pQ29udGVudDogdGhpcy5jcmVhdGVQb2hsZWR5Q29udGVudCB9XSwgbnVsbCwgeyB3aWR0aDogNjAwLCBoZWlnaHQ6IDQ2MCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBkbGcgPSAocGFyZW50RWxlbWVudCA/ICQuY29udGVudChwYXJlbnRFbGVtZW50KS5kaWFsb2dzIDogR0RsZykuc2hvd01vZGFsV2luZG93KFwiR29yZGljLkVrby5XZWJDbGllbnQuR05ld1JlY29yZERsZ1wiLCAkLmV4dGVuZChvcHRpb25zLCB7IElEOiBcIk5ld1JlY29yZERXXCIgfSksIHsgd2lkdGg6IDYwMCwgaGVpZ2h0OiA0NjAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9kc3RyYW5pdDogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPZHN0cmFuaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RzdHJhbml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk9kc3RyYW7DrSBwb2hsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYmluXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcG9ydElkID0gdGhhdC5zZWxlY3RlZFJlcG9ydElkOyAvL211c8OtbSB0byB1bG/Fvml0IGRvIHByb23Em25uw6ksIHByb3Rvxb5lIHBvIGxvYWREYXRhIHNlIG1pIHRoYXQuc2VsZWN0ZWRSZXBvcnRJZCB6bcSbbsOtLCBsb2FkRGF0YSB1xb4gbmVkxJtsw6FtLCBhbGUgbmVjaMOhbSB0byBwcm8gamlzdG90dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybShcIk9wcmF2ZHUgY2hjZXRlIHRlbnRvIHBvaGxlZCBvZHN0cmFuaXQgemUgc3Ryb211IHBvaGxlZMWvP1wiKS5jcmVhdGVEaWFsb2dQcm9taXNlKFwieWVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmNhbGwoXCJSZW1vdmVSZXBvcnRcIiwgeyByZXBvcnRJZDogcmVwb3J0SWQsIHRlbWE6IHRlbWEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpc1BvaGxlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YXZpZXcgPSBzdWJjb250ZW50LmdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IGRhdGF2aWV3LmdldERhdGFSb3dzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUG9obGVkKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIuZGF0YS5yZXBvcnRJZCA9PSByZXBvcnRJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGF2aWV3LnVwZGF0ZURhdGEociwgXCJkZWxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3N0cm9tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmRhdGEuaXhzU3RyID09IHJlcG9ydElkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXZpZXcudXBkYXRlRGF0YShyLCBcImRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdENyZWF0ZVN0clBvZDogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDcmVhdGVTdHJQb2RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w6EgcG9kc2xvxb5rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJWeXR2b8WZw60gbm92b3Ugc2xvxb5rdSB2ZSBzdHJvbXUgcG9obGVkxa8gbyDDunJvdmXFiCBuw63FvmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZm9sZGVyX2JvbGQgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZmF2b3JpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVN0cih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdENyZWF0ZVN0cjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDcmVhdGVTdHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w6Egc2xvxb5rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJWeXR2b8WZw60gbm92b3Ugc2xvxb5rdSB2ZSBzdHJvbXUgcG9obGVkxa9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZm9sZGVyX2JvbGQgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZmF2b3JpdGV8Z2ktc3RhciBnaS1zdGFjay1mdyBnaS1iZ3dcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVN0cihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RPcGVuVmlldzogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPcGVuVmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPdGV2xZnDrXQgcG9obGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk90ZXbFmWUgdWxvxb5lbsO9IHBvaGxlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1nZW5lcmF0ZSBnLXN0YXRlLXRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYWN0aVBvaGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBzdWJjb250ZW50Lm1lbnVCYXIoc3ViY29udGVudC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlKlwiLCBcImFjdE9kc3RyYW5pdCpcIiwgXCJhY3RDcmVhdGVTdHJQb2RcIiwgXCJhY3RDcmVhdGVTdHJcIl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdWJjb250ZW50LmNvbW1hbmRCYXIoc3ViY29udGVudC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPcGVuVmlldyFcIl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3N1YmNvbnRlbnQuY29tbWFuZEJhciggW3tcclxuICAgICAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwidnlicmF0QWN0XCIsIGNhcHRpb246IFwiT3RldsWZw610IHBvaGxlZFwiLCBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5uYWN0aVBvaGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL31dKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHN1YmNvbnRlbnQuZWxlbWVudC5vbihcInJlcG9ydHNlbGVjdGVkLmdyZXBvcnRzXCIsIChldmVudCwgcmVwSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZWxlY3RlZFJlcG9ydElkID0gcmVwSW5mby5yZXBvcnRJZCA9PSBcIlwiID8gcmVwSW5mby5ub2RlLml4c1N0ciA6IHJlcEluZm8ucmVwb3J0SWQ7XHJcbiAgICAgICAgICAgICAgICBzdWJjb250ZW50LmFjdGlvbnMuYWN0T2RzdHJhbml0IS51cGRhdGUoeyBlbmFibGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgc3ViY29udGVudC5hY3Rpb25zLmFjdE9wZW5WaWV3IS51cGRhdGUoeyBlbmFibGVkOiByZXBJbmZvLnJlcG9ydElkICE9PSBcIlwiIH0pO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcInJlcG9ydGJlZm9yZWRlZmF1bHRhY3Rpb24uZ3JlcG9ydHNcIiwgKGV2ZW50LCByaTogSUdQcmludEFjdGlvblJlcG9ydEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvL3RpbXRvIGx6ZSBwcmVydXNpdCBwcm92ZWRlbmkgYWtjZSB2IG9rbmVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlbGVjdGVkUmVwb3J0SWQgPSByaS5yZXBvcnRJZDsgLy9pbmZvIG8gc2VzdGF2ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnNlbGVjdGVkUmVwb3J0SWQgIT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFjdGlQb2hsZWQoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJyZXBvcnRncmlkZm9ybWF0Y3JlYXRlZC5ncmVwb3J0c1wiLCBmdW5jdGlvbiAoZXZlbnQsIG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBnZiA9IG8/LmdyaWRGb3JtYXQgYXMgR29yZGljLkRhdGEuR3JpZEZvcm1hdDsgLy8gTk9URTogTHplIG1lbml0IG5hIHByaW1vIG5hIGluc3RhbmNpXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuY29sdW1ucy5maW5kKCh2KSA9PiB7IHJldHVybiB2Lm5hbWUgPT0gXCJuYW1lXCI7IH0pIS5jYXB0aW9uID0gXCJQb2hsZWRcIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3ViY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=