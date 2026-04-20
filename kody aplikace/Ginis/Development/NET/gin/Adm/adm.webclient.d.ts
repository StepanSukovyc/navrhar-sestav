declare namespace Gordic.Adm.Dialogs {
    /**
    * Dialog detailu v administraci
    *
    * @author  Tomáš Hažmuka
    * @date    22.08.2018
    *
    * @param   parentContent						The content.
    * @param   ModOtevreni							mod otevreni dialogu.
    * @return  .
    */
    function DetailAdmDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu v administraci
    *
    * @author  Tomáš Hažmuka
    * @date    22.08.2018
    *
    * @param   parentContent						The content.
    * @param   ModOtevreni							mod otevreni dialogu.
    * @return  .
    */
    function DetailAdm(parentContent: GContent, opt: {
        /** detail pouze pro čtení */
        detail_rezim: boolean;
        detail_name: any;
        primary_key_list: any;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
}
declare namespace Gordic.Adm.WebClient {
    /**
     * Detail Administrace - Pomocí detailbuideru TS
     *
     * @author thazmuka
     * @since 480.1.0.9
     */
    class DetailAdm extends GContentBase {
        /** ke čtení */
        private readonly;
        /** detail režim true-new|false-old */
        private detail_rezim;
        /** můj list primárních klíčů */
        private my_primary_list;
        /** list primárních klíčů */
        private primary_key_list;
        /** data detailu */
        private data;
        /** element formuláře detailu */
        private form;
        /** ukládání */
        private saving;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * inicializace
         */
        private init;
        /**
         * zobrazit detail
         */
        private showDetail;
        /**
         * získat primární klíče
         */
        private getPrimaryKeys;
        /**
        * nastavení nových primárních klíčů, při změně detailu
        * todo: asi by chtelo zmenit, moc slozite a spomaluje
        */
        private setPrimaryKeys;
        private setListControls;
        private setListControlSetup;
        /**
         * nastavit statusbar
         */
        private setStatusBar;
        /**
         * vytvořit commandBar
         */
        private createCommandBar;
        xonContentReady(): void;
        /**
         * double click na přechod do editace detailu
         */
        private doubleClickDetail;
        /**
         * přepnutí do editace detailu
         */
        private editDetail;
        /** fce pro ukončení režimu vytvoření nového detailu */
        private endEditDetail;
        /**
        * vytvořit menu
        */
        private createMenu;
        /**
        * vytvořit formulář
        */
        private createForm;
        /** fce pro uložení dat detail okna do DB */
        private saveDetail;
        private newDetail;
    }
}
declare namespace Gordic.Adm.WebClient {
    /**
     * Detail - Pomocí detailbuideru TS
     *
     * @author thazmuka
     * @since 480.1.0.9
     */
    class DetailBuilder extends GContentBase {
        /**
         * identifikátor
         */
        private Ixp;
        onContentReady(): void;
        private onDetailBuilderInit;
        private onDetailBuilderBuild;
    }
}
