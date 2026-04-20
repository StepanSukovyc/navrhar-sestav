declare namespace Gordic.Hst.WebControls {
    /**
     * Content pro zobrazení změn v modulech, sestavách a aplikacích .NET.
     */
    class SeznamPrehledZmen extends GContentBase {
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        private _resizeWidthVersion;
        private _headersVersion;
        private _resizeWidthElementVersion;
        private _dataVersion;
        private groupingHeaderColumnsVersion;
        private _styleElementVersion;
        private cssUidVersion;
        private _columnsVersion;
        private _countItemVersion;
        private uuidVersion;
        private _contentVersion;
        private numberRowVersion;
        static widgetNameVersion: string;
        /**
         * Pole s objekty programových fází
         */
        private fazeData;
        /**
         * Pole s názvy programových fází
         */
        private fazeTxtData;
        private tooltipTagy;
        private origHeigth;
        private origWidth;
        private cloneEl;
        private DataFilter?;
        private DataFilterVersion?;
        private dataFormat;
        private faze;
        private revize;
        private dataExport;
        private zmenyFilter?;
        private legZmenySearch;
        private pocetZaznamu;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private gridFormatVersion;
        private mainLogsPanel;
        private mainLogsPanelVersion;
        private typView;
        /**
         * Data view k vzhledávání popisů změn
         */
        private viewSearchZmeny;
        /**
         * Data view k popisům změn
         */
        private viewZmeny;
        /**
         * Data view k popisům změn
         */
        private viewZmenyOrig;
        /**
         * Data view k popisům změn	dané verze
         */
        private viewZmenyVersion;
        /**
        * element filterpanelu
        * */
        private filter;
        private tagySearch;
        private tagySearchAtestace;
        private priz_ses;
        private fazeSearch;
        private verzeSearch;
        private dat_od;
        private dat_do;
        private MDProcessor;
        private searchValue;
        private resSearch;
        /**
         * Data view k vzhledávání popisů změn
         */
        /**
         * Data view k popisům změn
         */
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * setTitle - Titulek úlohy
         */
        private setTitle;
        /**
         * downloadInnerHtml - Generování reportu změn
         *
         * @param {any} filename
         * @param {any} elId
         * @param {any} mimeType
         * @param {any} dataRange
         * @param {any} dataFormat
         */
        private downloadInnerHtml;
        private getOuterHTMLWithInlineStyle;
        /**
         * downloadInnerHtmlVersion	- Generování souhrnného reportu
         *
         * @param {any} filename
         * @param {any} elId
         * @param {any} mimeType
         * @param {any} dataRange
         * @param {any} dataFormat
         */
        private downloadInnerHtmlVersion;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        private createFilterForm;
        private getMdProcessor;
        /**
         * createMainTagPanel	- Zobrazení hlavních tagů do panelu
         */
        private createMainTagsPanel;
        private configProfile;
        /**
        * nastavit data
        */
        private _createChangeLog;
        /**
         * createMainLogsPanel	- Zobrazení popisů do panelu
         */
        private createMainLogsPanel;
        /** setnout data */
        private createEmptyContent;
        private createGridFormat;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        _unEscape(htmlStr: string): string;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
 * _renderDataRowValues
 *
 * @param {any} trueColumns
 * @param {any} meta
 * @param {any} rowIndex
 * @param {any} level
 * @param {any} headerRowId
 * @returns {HTMLTableRowElement}
 */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * createMainLogsPanel	- Vykreslení popisů změn dané verze do main panelu
         */
        private createMainLogsPanelVersion;
        /**
        * nastavit data
        */
        private _createChangeLogVersion;
        private createGridFormatVersion;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _createVersion(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSettingVersion(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setDataVersion(data: any): void;
        _reloadDataVersion(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRowsVersion(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClickVersion(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeDataVersion(rows: any[]): any[];
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValuesVersion(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * filterData
         *
         * @param {any} value
         */
        private filterData;
    }
}
