"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gui.WebControls.GPublicUserDtoEnum.ts                </Name>
//    <Description>                                                             </Description>
//    <Author>      TFeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2019                            </Copyright>
//    <Created>     2019-08-19                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Gui;
    (function (Gui) {
        var WebControls;
        (function (WebControls) {
            var GPublicUserDto;
            (function (GPublicUserDto) {
                /**
                 * Validační skupiny.
                 *
                 * @author  TFeik
                 * @since   482.1.0.501
                 * @date    19.08.2019
                 */
                let ValidationGroup;
                (function (ValidationGroup) {
                    ValidationGroup["GROUP_CORRECT_FORMAT"] = "correct_format";
                    ValidationGroup["GROUP_REGISTRATION"] = "registration";
                    ValidationGroup["GROUP_CHANGE"] = "change";
                    ValidationGroup["GROUP_CHANGE_EXTERNAL_USER"] = "change_external_user";
                    ValidationGroup["GROUP_BUSINESS"] = "business";
                    ValidationGroup["GROUP_PERSONAL"] = "personal";
                    ValidationGroup["GROUP_COMPANY"] = "company";
                })(ValidationGroup = GPublicUserDto.ValidationGroup || (GPublicUserDto.ValidationGroup = {}));
            })(GPublicUserDto = WebControls.GPublicUserDto || (WebControls.GPublicUserDto = {}));
        })(WebControls = Gui.WebControls || (Gui.WebControls = {}));
    })(Gui = Gordic.Gui || (Gordic.Gui = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gui.WebControls.GPublicUserRegForm.ts                </Name>
//    <Description> Formulář pro registraci / zm2nu údajů veřejného uživatele.  </Description>
//    <Author>      tfeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-03-27                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Gui;
    (function (Gui) {
        var WebControls;
        (function (WebControls) {
            /**
             * Názvy políček registrační formuláře veřejného uživatele.
             *
             * @author  TFeik
             * @since   482.1.0.475
             * @date    07.08.2019
             */
            let FieldNames;
            (function (FieldNames) {
                FieldNames["email"] = "email";
                FieldNames["emailAsLogin"] = "emailAsLogin";
                FieldNames["uzivatelskeJmeno"] = "uzivatelskeJmeno";
                FieldNames["heslo"] = "heslo";
                FieldNames["overeniHesla"] = "overeniHesla";
                FieldNames["typEsu"] = "typEsu";
                FieldNames["ic"] = "ic";
                FieldNames["isVatPayer"] = "isVatPayer";
                FieldNames["dic"] = "dic";
                FieldNames["obchodniJmeno"] = "obchodniJmeno";
                FieldNames["typOrg"] = "typOrg";
                FieldNames["titulPred"] = "titulPred";
                FieldNames["titulZa"] = "titulZa";
                FieldNames["jmeno"] = "jmeno";
                FieldNames["prijmeni"] = "prijmeni";
                FieldNames["rodneCislo"] = "rodneCislo";
                FieldNames["datumNarozeni"] = "datumNarozeni";
                FieldNames["telefon"] = "telefon";
                FieldNames["ulice"] = "ulice";
                FieldNames["cislo"] = "cislo";
                FieldNames["cisloPopisne"] = "cPop";
                FieldNames["cisloOrientacni"] = "cOr";
                FieldNames["psc"] = "psc";
                FieldNames["obec"] = "obec";
                FieldNames["castObce"] = "castObce";
                FieldNames["stat"] = "stat";
                FieldNames["souhlasSeZpracovanimUdaju"] = "souhlasSeZpracovanimUdaju";
                FieldNames["useEmailNotifications"] = "useEmailNotifications";
                FieldNames["useSmsNotifications"] = "useSmsNotifications";
            })(FieldNames || (FieldNames = {}));
            /**
             * Názvy sekcí registrační formuláře veřejného uživatele.
             *
             * @author  TFeik
             * @since   482.1.0.499
             * @date    16.08.2019
             */
            let SectionNames;
            (function (SectionNames) {
                SectionNames["prihlasovaciUdaje"] = "prihlasovaciUdaje";
                SectionNames["adresa"] = "adresa";
                SectionNames["osobniUdaje"] = "osobniUdaje";
                SectionNames["osoba"] = "osoba";
                SectionNames["podminkyPouzivani"] = "podminkyPouzivani";
                SectionNames["kontaktyProElektronickouKomunikaci"] = "kontaktyProElektronickouKomunikaci";
            })(SectionNames || (SectionNames = {}));
            const FormName = "RegisterPublicUserForm";
            /**
             * GPublicUserRegForm
             *
             * @author  TFeik
             * @since   480.1.0.517
             * @date    10.04.2017
             */
            class GPublicUserRegForm {
                /**
                 * Vrátí inicializovaní logger pro logování.
                 *
                 * @author  TFeik
                 * @date    29.04.2025
                 *
                 * @returns {Diagnostics.GLog}
                 */
                static GetLogger() {
                    if (this.Logger == null) {
                        this.Logger = new Gordic.Diagnostics.GLog({
                            name: 'Gordic.Wfl.WebClient.GOdeslaniHandler',
                            fileName: 'GOdeslaniHandler.ts',
                            authorCode: 321
                        });
                    }
                    return this.Logger;
                }
                /**
                 * enableFields
                 *
                 * @author  TFeik
                 * @date    07.08.2019
                 *
                 * @param {GPublicUserPermissionDto} [permissions]
                 */
                static enableFields(opt) {
                    if (!opt || !Gordic.Utils.WidgetExists("gform", opt.form)) {
                        return;
                    }
                    // Napřed všechny políčka zakážu, ...
                    opt.form.findFields().gfield("option", "disabled", true);
                    if (!opt.permissions) {
                        opt.permissions = {};
                    }
                    // ... posbírám si jména políček, které je možné editovat ...
                    const fieldNamesToEnable = [
                        FieldNames.souhlasSeZpracovanimUdaju,
                        FieldNames.useEmailNotifications,
                        FieldNames.useSmsNotifications
                    ];
                    if (opt.isRegistrationForm || (opt.permissions.CanEditCastObce?.value)) {
                        fieldNamesToEnable.push(FieldNames.castObce);
                    }
                    if (opt.isRegistrationForm
                        || (opt.permissions.CanEditCisloOrientacni?.value
                            && opt.permissions.CanEditCisloPopisne?.value)) {
                        fieldNamesToEnable.push(FieldNames.cislo);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditCisloPopisne?.value)) {
                        fieldNamesToEnable.push(FieldNames.cisloPopisne);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditCisloOrientacni?.value)) {
                        fieldNamesToEnable.push(FieldNames.cisloOrientacni);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditDatumNarozeni?.value)) {
                        fieldNamesToEnable.push(FieldNames.datumNarozeni);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditDic?.value)) {
                        fieldNamesToEnable.push(FieldNames.dic);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditEmail?.value)) {
                        fieldNamesToEnable.push(FieldNames.email);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditEmailAsLogin?.value)) {
                        fieldNamesToEnable.push(FieldNames.emailAsLogin);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditHeslo?.value)) {
                        fieldNamesToEnable.push(FieldNames.heslo);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditIc?.value)) {
                        fieldNamesToEnable.push(FieldNames.ic);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditJmeno?.value)) {
                        fieldNamesToEnable.push(FieldNames.jmeno);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditObchodniJmeno?.value)) {
                        fieldNamesToEnable.push(FieldNames.obchodniJmeno);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditObec?.value)) {
                        fieldNamesToEnable.push(FieldNames.obec);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditCastObce?.value)) {
                        fieldNamesToEnable.push(FieldNames.castObce);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditPrijmeni?.value)) {
                        fieldNamesToEnable.push(FieldNames.prijmeni);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditPsc?.value)) {
                        fieldNamesToEnable.push(FieldNames.psc);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditRodneCislo?.value)) {
                        fieldNamesToEnable.push(FieldNames.rodneCislo);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditStat?.value)) {
                        fieldNamesToEnable.push(FieldNames.stat);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditTelefon?.value)) {
                        fieldNamesToEnable.push(FieldNames.telefon);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditTitulPredJmenem?.value)) {
                        fieldNamesToEnable.push(FieldNames.titulPred);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditTitulZaJmenem?.value)) {
                        fieldNamesToEnable.push(FieldNames.titulZa);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditTypEsu?.value)) {
                        fieldNamesToEnable.push(FieldNames.typEsu);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditTypOrg?.value)) {
                        fieldNamesToEnable.push(FieldNames.typOrg);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditUlice?.value)) {
                        fieldNamesToEnable.push(FieldNames.ulice);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditIsVatPayer?.value)) {
                        fieldNamesToEnable.push(FieldNames.isVatPayer);
                    }
                    // 03.09.2019 - TFeik
                    // Povolí enabled uživatelského jména pouze, pokud není nastaveno použití emailu jako loginu.
                    const emailAsLogin = opt.form.findFields(FieldNames.emailAsLogin).gfield("getValue");
                    if (!emailAsLogin && (opt.isRegistrationForm || (opt.permissions.CanEditUzivatelskeJmeno?.value))) {
                        fieldNamesToEnable.push(FieldNames.uzivatelskeJmeno);
                    }
                    // ... a u nich zruším disabled.
                    if (fieldNamesToEnable.length > 0) {
                        opt.form.findFields(fieldNamesToEnable.toString())
                            .gfield("option", "disabled", false);
                    }
                }
                /**
                 * Vytvoří objekt registračního formuláře, inicializuje jej a nastaví do contentu.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 *
                 * @param {GPublicUserRegFormOptions} params
                 */
                static create(params) {
                    const that = this;
                    const deferred = $.Deferred();
                    let publicLoginConfig;
                    let formObject;
                    //let RsaParamsPublic: System.Security.Cryptography.RSAParameters | undefined;
                    // 14.08.2018 - TFeik
                    // Prepracovani funkce create na promis abych zajistil radne nacteni configu.
                    function loadPublicLoginConfig() {
                        return WebControls.GLoginUtils.GetPublicLoginConfig()
                            .done(function (publicLoginConfigRetVal) {
                            publicLoginConfig = publicLoginConfigRetVal;
                            //        });
                            //}
                            formObject = $.extend(formObject, {
                                name: FormName,
                                container: that.element,
                                layoutDescriptor: params.layoutDescriptor ?? "L1M1S1"
                            }, params, params.readers ?
                                {
                                    ciselnikStat: {
                                        data: new Gordic.Data.View(params.readers.gincsta, {
                                            key: "stat" /* Data.Readers.GincstaDtoNames.stat */
                                        }),
                                        helperColumns: [
                                            "stat_txt" /* Data.Readers.GincstaDtoNames.stat_txt */,
                                            "stat_sis_aa" /* Data.Readers.GincstaDtoNames.stat_sis_aa */
                                        ],
                                        itemTemplate: function (object) {
                                            if (object == null) {
                                                return '';
                                            }
                                            return object.stat_sis_aa
                                                ? object.stat_txt + " - " + object.stat_sis_aa
                                                : object.stat_txt;
                                        },
                                        dropdown: false
                                    },
                                    ciselnikPsc: {
                                        data: new Gordic.Data.View(params.readers.ginspsc, {
                                            key: [
                                                "psc" /* Data.Readers.GinspscDtoNames.psc */,
                                                "stat" /* Data.Readers.GinspscDtoNames.stat */
                                            ],
                                            // 12.06.2023 - TFeik
                                            // Filtrování dat dle vybraného státu (při registrace nefunguje serverFilter protože nepoužívá reader).
                                            processors: {
                                                statDependency: new Gordic.Data.FilterProcessor((meta) => {
                                                    const $field = formObject?.formDiv?.findFields(FieldNames.stat);
                                                    if (!Gordic.Utils.WidgetExists('gfield', $field)) {
                                                        return false;
                                                    }
                                                    const data = {};
                                                    $field.gfield('model', 'collect', data);
                                                    const stat = data.stat;
                                                    if (stat == null) {
                                                        return false;
                                                    }
                                                    return meta.data.stat === stat;
                                                })
                                            }
                                        }),
                                        helperColumns: [
                                            "psc" /* Data.Readers.GinspscDtoNames.psc */,
                                            "posta" /* Data.Readers.GinspscDtoNames.posta */
                                        ],
                                        itemTemplate: (item) => {
                                            if (item == null) {
                                                return '';
                                            }
                                            return [
                                                item.psc,
                                                item.posta
                                            ].filter(i => i).join(' - ');
                                        }
                                    },
                                    ciselnikTypEsu: {
                                        data: new Gordic.Data.View(params.readers.gincesu, {
                                            key: "typ_esu" /* Data.Readers.GincesuDtoNames.typ_esu */,
                                            // 12.06.2023 - TFeik
                                            // Filtrování dat dle povolených typů externího subjektu (při registrace nefunguje serverFilter protože nepoužívá reader).
                                            processors: {
                                                statDependency: new Gordic.Data.FilterProcessor((meta) => {
                                                    const typEsuAllowedValues = publicLoginConfig?.allowedValues?.typEsu;
                                                    if (typEsuAllowedValues == null) {
                                                        return true;
                                                    }
                                                    const typEsuValue = meta.data.typ_esu;
                                                    if (typEsuValue == null) {
                                                        return false;
                                                    }
                                                    return typEsuAllowedValues.includes(typEsuValue);
                                                })
                                            }
                                        }),
                                        helperColumns: [
                                            "typ_esu_txt" /* Data.Readers.GincesuDtoNames.typ_esu_txt */
                                        ],
                                        itemTemplate: `{${"typ_esu_txt" /* Data.Readers.GincesuDtoNames.typ_esu_txt */}:trim:encode}`,
                                        dropdown: true
                                    },
                                    ciselnikTypOrg: {
                                        data: new Gordic.Data.View(params.readers.ginctyo, {
                                            key: "typ_org" /* Data.Readers.GinctyoDtoNames.typ_org */
                                        }),
                                        helperColumns: [
                                            "typ_org_txt" /* Data.Readers.GinctyoDtoNames.typ_org_txt */
                                        ],
                                        itemTemplate: `{${"typ_org_txt" /* Data.Readers.GinctyoDtoNames.typ_org_txt */}:trim:encode}`,
                                        dropdown: false
                                    },
                                    ciselnikSzrPravniForma: {
                                        data: new Gordic.Data.View(params.readers.szrsprf, {
                                            key: "kod_pravni_formy" /* ControlsLogic.Interface.GSzrsprfDtoNames.kod_pravni_formy */
                                        }),
                                        helperColumns: [
                                            "kod_pravni_formy" /* ControlsLogic.Interface.GSzrsprfDtoNames.kod_pravni_formy */,
                                            "nazev_prav_formy" /* ControlsLogic.Interface.GSzrsprfDtoNames.nazev_prav_formy */
                                        ],
                                        itemTemplate: `{${"nazev_prav_formy" /* ControlsLogic.Interface.GSzrsprfDtoNames.nazev_prav_formy */}:trim:encode}`,
                                        dropdown: false
                                    }
                                } : {
                                ciselnikTypEsu: Gordic.Prefabs.Select.gincesu(),
                                ciselnikTypOrg: Gordic.Prefabs.Select.ginctyo(),
                                ciselnikStat: Gordic.Prefabs.Select.gincsta(),
                                ciselnikPsc: Gordic.Prefabs.Select.ginspsc(),
                                ciselnikSzrPravniForma: Gordic.Prefabs.Select.szrsprf()
                            });
                            // Načtení dat právních forem ze SZR.
                            if (formObject.ciselnikSzrPravniForma.data.getData) {
                                formObject.ciselnikSzrPravniForma.data.getData()
                                    .done(function (retValPravniForma) {
                                    formObject.dataPravniFormy = retValPravniForma;
                                });
                            }
                            else if (formObject.ciselnikSzrPravniForma.data.getDataRows) {
                                formObject.dataPravniFormy = formObject.ciselnikSzrPravniForma.data.getDataRows();
                            }
                            //Gordic.Prefabs.Select.szrsprf().data.getData()
                            //    .done(function (retValPravniForma) {
                            //        formObject.dataPravniFormy = retValPravniForma;
                            //    })
                            // Načtení dat typů organizací
                            if (formObject.ciselnikTypOrg.data.getData) {
                                formObject.ciselnikTypOrg.data.getData()
                                    .done(function (retValTypSubjektu) {
                                    formObject.dataTypOrganizace = retValTypSubjektu;
                                });
                            }
                            else if (formObject.ciselnikTypOrg.data.getDataRows) {
                                formObject.dataTypOrganizace = formObject.ciselnikTypOrg.data.getDataRows();
                            }
                            //formObject.cisloPopOrPatt = /^\s*(?:(\d+)\D+)?(\d+[a-zA-Z]?)\s*$/;
                            formObject.reCeleJmeno = /^\s*([\w\s,\.]+\.[\s,]*)?([^\s\d\_\.]+)[\s,]+((?:[^\s\d\_\.]+[\s,]*)+?)([\s,]+(?:\w+\.)+)?\s*$/;
                            formObject.reJmenoTrim = /^[\s,]*(.*?)[\s,]*$/;
                            const regForm = formObject.name === FormName;
                            formObject._createForm = function () {
                                // Vytvoří formulář.
                                //const regForm = formObject.name === "RegisterPublicUserForm";
                                let regInstructions, setInstructions = $.noop;
                                if (regForm) {
                                    //"jres:31400067" //RC 31400067 : Vyplněním formuláře a kliknutím na <q>{0}</q> dojde k odeslání aktivačního emailu{{0}}. Než se poprvé přihlásíte, musíte kliknout na odkaz uvedený v aktivačním emailu, abychom ověřili, že máte přístup k uvedené emailové schránce.
                                    regInstructions = publicLoginConfigRetVal.text != undefined && publicLoginConfigRetVal.text.instructions != undefined
                                        ? publicLoginConfigRetVal.text.instructions.format("jres:31400068") : ""; //RC 31400068 : Registrovat
                                    setInstructions = function (email) {
                                        if (regInstructions) {
                                            formObject.formDiv.find(".js-instructions")
                                                .gformtext(regInstructions.format(!email ? "" :
                                                " " + "jres:31400070" //RC 31400070 : na adresu
                                                    + " <strong>" + email + "</strong>"));
                                        }
                                    };
                                }
                                function _adjustTypOrganizaceDataView(typEsu) {
                                    if (regForm) {
                                        const typOrgField = formObject.formDiv.findFields("typOrg");
                                        const tempView = formObject.ciselnikTypOrg.data;
                                        tempView.applyView({
                                            filter: "typ_esu === " + typEsu.toString()
                                        });
                                        typOrgField.gfield("option", "data", new Gordic.Data.View(tempView.getRows(), {
                                            key: "typ_org"
                                        }));
                                    }
                                }
                                const showPlaceholders = regForm && (publicLoginConfig?.showPlaceholders ?? false);
                                const initialValues = params.initialValues;
                                // 20.02.2023 - TFeik
                                // Přidána podmínka na permissions CanEditEmailAsLogin (teoreticky by mohlo nahradit RegistrationType).
                                const canEditEmailAsLogin = (initialValues?.Permissions?.CanEditEmailAsLogin?.value || regForm)
                                    && initialValues?.RegistrationType === 0 /* General.ApplicationInterface.PublicUserLoginRegistrationTypeEnum.Ginis */;
                                // 19.08.2024 - TFeik
                                // Možnost dát jméno a příjmení nepovinné při editaci osobních údajů.
                                const isPrijmeniJmenoRequired = regForm || publicLoginConfig?.isNameAndSurnameRequiredForEdit;
                                // Vytvoreni formulare pro registraci
                                const formBuilder = new Gordic.Forms.Form({
                                    name: formObject.name,
                                    layoutDescriptor: formObject.layoutDescriptor
                                });
                                const addEmailRow = (hint) => {
                                    formBuilder
                                        .addRow({
                                        label: "jres:31400022", //RC 31400022 : Email
                                        hint: hint
                                    })
                                        .addField("gstringbox", {
                                        name: FieldNames.email,
                                        model: `model.${"email" /* GPublicUserDtoNames.email */} = value`,
                                        inputType: "email",
                                        change: function (ev, changeObj) {
                                            $(this).gfield("resetErrors", "serverValidation");
                                            // Použití emailu jako uživatelského jména                        
                                            const $form = formObject.formDiv, $email = $form.findFields(FieldNames.email), email = $email.gfield("getValue"), isValid = email
                                                && $email
                                                    .gfield("validate", formObject._createValidationGroups())
                                                    .gfield("getErrors")
                                                    .length === 0;
                                            // 16.05.2023 - TFeik
                                            // Permission vyhodnoceno váše v proměnné canEditEmailAsLogin.
                                            if (canEditEmailAsLogin && $form.findFields(FieldNames.emailAsLogin).gfield("getValue")) {
                                                $form.findFields(FieldNames.uzivatelskeJmeno)
                                                    .gfield("setInitial", isValid ? email : "");
                                            }
                                            setInstructions(isValid ? email : "");
                                        },
                                        placeholder: showPlaceholders ? "anna@email.cz" : void 0 //,
                                        //validators: regForm ? undefined : [
                                        //    new Gordic.Validators.Required({
                                        //        stopping: true,
                                        //        group: GPublicUserDto.ValidationGroup.GROUP_REGISTRATION
                                        //            + "." + GPublicUserDto.ValidationGroup.GROUP_CHANGE
                                        //    })
                                        //]
                                    })
                                        // 20.11.2023 - TFeik
                                        // Přidán souhlas pro notifikace emailem.
                                        .addRow()
                                        .addField('gcheck', {
                                        label: 'jres:32100350', //RC 32100350 : Odesílat notifikace související s elektronickým vyřizováním agendy s úřadem.
                                        name: FieldNames.useEmailNotifications,
                                        model: `model.${"UseEmailNotifications" /* GPublicUserDtoNames.UseEmailNotifications */} = value`,
                                        initialValue: true
                                    });
                                };
                                const addUserNameRow = () => {
                                    formBuilder
                                        .addRow()
                                        .addField("gcheck", {
                                        label: "jres:31400023", //RC 31400023 : Použít email jako uživatelské jméno
                                        name: FieldNames.emailAsLogin,
                                        model: `model.${"emailAsLogin" /* GPublicUserDtoNames.emailAsLogin */} = value`,
                                        //disabled: initialValues.RegistrationType !== 0,
                                        lastUser: "",
                                        change: function (event, changeObj) {
                                            // 16.05.2023 - TFeik
                                            // Permission vyhodnoceno váše v proměnné canEditEmailAsLogin.
                                            if (!canEditEmailAsLogin) {
                                                return;
                                            }
                                            const $user = formObject.formDiv.findFields("uzivatelskeJmeno"), $useEmail = $(event.target), useEmail = changeObj.value !== false;
                                            if (useEmail) {
                                                $useEmail.gfield("option", "lastUser", $user.gfield("getValue") || "");
                                            }
                                            $user.gfield("option", "disabled", useEmail)
                                                .gfield("setInitial", useEmail
                                                ? formObject.formDiv.findFields("email").gfield("getValue")
                                                : $useEmail.gfield("option", "lastUser"));
                                        }
                                    })
                                        .addRow("jres:31400024") //RC 31400024 : Uživatelské jméno                    
                                        .addField("gstringbox", {
                                        name: FieldNames.uzivatelskeJmeno,
                                        model: `model.${"uzivatelskeJmeno" /* GPublicUserDtoNames.uzivatelskeJmeno */} = value`,
                                        //disabled: initialValues
                                        //    && (initialValues.emailAsLogin || initialValues.RegistrationType !== 0),
                                        validators: [
                                            new Gordic.Validators.Base({
                                                message: "jres:31400025", //RC 31400025 : Uživatelské jméno nesmí obsahovat "@" nebo musí být stejné jako email.
                                                validate: function (value, changeObj) {
                                                    // uzivatelske jmeno nesmi obsahovat "@"
                                                    // nebo musi byt stejne jako email
                                                    return !value || !value.includes("@")
                                                        || value === formObject.formDiv
                                                            .findFields(FieldNames.email)
                                                            .gfield("getValue");
                                                },
                                                group: "customValidation"
                                            })
                                        ],
                                        change: function (ev, changeObj) {
                                            $(this).gfield("resetErrors", "serverValidation");
                                        },
                                        spellCheck: false
                                    });
                                };
                                ///////////////////////////////////////////////////////////////
                                // Přihlašovací údaje
                                ///////////////////////////////////////////////////////////////
                                // 05.10.2023 - TFeik
                                // Při registračním formuláři dávám email na začtek. Jinak do kontaktních údajů.
                                if (regForm) {
                                    formBuilder.addSection({
                                        label: regForm ? undefined : "jres:32100158", //RC 32100158 : Přihlašovací údaje
                                        name: SectionNames.prihlasovaciUdaje
                                    });
                                    addEmailRow("jres:32100160"); //RC 32100160 : Email je nezbytný v případě obnovení zapomenutého hesla.
                                    addUserNameRow();
                                    formBuilder
                                        .addRow("jres:31400044") //RC 31400044 : Heslo, ověření
                                        .addField("gstringbox", "w-6", Gordic.Prefabs.GStringBox.password({
                                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                                    }), {
                                        name: FieldNames.heslo,
                                        model: `model.${"heslo" /* GPublicUserDtoNames.heslo */} = value`,
                                        change: function (ev, changeObj) {
                                            $(this).gfield("resetErrors", "serverValidation");
                                        }
                                    })
                                        .addField("gstringbox", "w-6", Gordic.Prefabs.GStringBox.passwordReEnter({
                                        passwordFieldName: "heslo",
                                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                                    }), {
                                        name: FieldNames.overeniHesla,
                                        model: `model.${"overeniHesla" /* GPublicUserDtoNames.overeniHesla */} = value`,
                                        change: function (ev, changeObj) {
                                            $(this).gfield("resetErrors", "serverValidation");
                                        }
                                    });
                                }
                                ///////////////////////////////////////////////////////////////
                                // Osobní informace
                                ///////////////////////////////////////////////////////////////
                                formBuilder.addSection({
                                    label: "jres:32100157", //RC 32100157 : Osobní údaje
                                    name: SectionNames.osobniUdaje
                                });
                                if (!regForm) {
                                    addUserNameRow();
                                }
                                formBuilder
                                    .addRow("jres:31400027") //RC 31400027 : Typ subjektu
                                    .addField("gselectbox", {
                                    name: FieldNames.typEsu,
                                    model: `model.${"typEsu" /* GPublicUserDtoNames.typEsu */} = value.${"typ_esu" /* Data.Readers.GincesuDtoNames.typ_esu */}`,
                                    //disabled: !regForm,
                                    strict: true,
                                    //modelValueTransform: {
                                    //    apply: function (modelValue) { return modelValue; },
                                    //    collect: function (fieldValue) { return fieldValue; }
                                    //},
                                    serverFilters: {
                                        //typ_esu: "!= 0"
                                        typ_esu: publicLoginConfig?.allowedValues?.typEsu
                                    },
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                        if (changeObj.value && typeof changeObj.value === "object") {
                                            const defaultTypOrgs = publicLoginConfig?.defaultOrg;
                                            const adjust = function () {
                                                const typEsu = changeObj.value?.typ_esu;
                                                _adjustTypOrganizaceDataView(typEsu);
                                                formObject._adjustForm(typEsu);
                                                // Nastaveni typu organizace "podnikatel - OSVČ" jako výchozí pro OSVČ a "práv. osoba - s.r.o." pro právníckou osobu
                                                //if (changeObj.value.typ_esu === 30 || changeObj.value.typ_esu === 10) {
                                                // Nastavení výchozí hodnoty typu subjektu pro daný typ esu.
                                                const formValue = {};
                                                const fields = formObject.container.findFields(FieldNames.typOrg);
                                                fields.gfield("model", "collect", formValue);
                                                if (formValue.typOrg === null || formValue.typOrg === undefined || formValue.typOrg === 0 || !fields.gfield("hasChanged")) {
                                                    let typOrg = 0; // neurčeno
                                                    // 15.06.2018 - TFeik
                                                    // Uživatelsky nastavené výchozí hodnoty typu organizací pro dané typy esu.
                                                    switch (typEsu) {
                                                        case 10: // právnická
                                                            if (defaultTypOrgs && defaultTypOrgs.pravnickaOsoba) {
                                                                typOrg = /*defaultTypOrgs && */ defaultTypOrgs.pravnickaOsoba /* !== undefined ? defaultTypOrgs.po : 34*/; // práv. osoba - s.r.o.
                                                            }
                                                            break;
                                                        case 20: // fyzická
                                                            if (defaultTypOrgs && defaultTypOrgs.fyzickaOsoba) {
                                                                typOrg = /*defaultTypOrgs &&*/ defaultTypOrgs.fyzickaOsoba /* !== undefined ? defaultTypOrgs.fo : 70*/; // občan
                                                            }
                                                            break;
                                                        case 30: // osvč
                                                            if (defaultTypOrgs && defaultTypOrgs.fyzickaOsobaOsvc) {
                                                                typOrg = /*defaultTypOrgs &&*/ defaultTypOrgs.fyzickaOsobaOsvc /* !== undefined ? defaultTypOrgs.foOsvc : 80*/; // podnikatel - OSVČ
                                                            }
                                                            break;
                                                    }
                                                    formValue.typOrg = formObject._getTypOrganizace(typOrg);
                                                    //if (formValue.typOrg === null || formValue.typOrg === undefined) {
                                                    //    formValue.typOrg = formObject._getPravniForma("10" + typOrg);
                                                    //}
                                                    if (formValue.typOrg === null || formValue.typOrg === undefined) {
                                                        formValue.typOrg = formObject._getTypOrganizace(0); // neurčeno
                                                    }
                                                    fields.gfield("model", "apply", formValue, {
                                                        initialValues: true,
                                                        setFlags: {
                                                            typEsuChanged: true,
                                                            valid: false
                                                        }
                                                    });
                                                }
                                                //}
                                            };
                                            //if (!defaultTypOrgs) {
                                            //    loadPublicLoginConfig()
                                            //        .done(function () {
                                            //            defaultTypOrgs = publicLoginConfig.defaultOrg;
                                            //            adjust();
                                            //        });
                                            //} else {
                                            adjust();
                                            //}
                                            //if (!defaultTypOrgs) {
                                            //    new GContent("Gordic.Gui.WebControls.GLoginUtils").call("GetDefaultOrgForEsu")
                                            //        .done(function (defaultTypOrgsRetVal) {
                                            //            defaultTypOrgs = defaultTypOrgsRetVal;
                                            //            adjust();
                                            //        });
                                            //} else {
                                            //    adjust();
                                            //}
                                        }
                                    }
                                }, formObject.ciselnikTypEsu)
                                    .addRow({
                                    label: "jres:31400028", //RC 31400028 : IČO
                                    customClass: "js-isHideable"
                                })
                                    .addField("gstringbox", {
                                    name: FieldNames.ic,
                                    model: `model.${"ic" /* GPublicUserDtoNames.ic */} = value`,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                        if (changeObj.value) {
                                            const $field = $(ev.target);
                                            if (($field.gfield("validate"), !$field.gfield("getErrors").length)) {
                                                GPublicUserRegForm.getAresData(changeObj.value, regForm)
                                                    //formObject._getAresData(changeObj.value)
                                                    .fail(console.warn.bind(console))
                                                    .then((data) => {
                                                    return formObject._applyAresData(data);
                                                });
                                            }
                                        }
                                    },
                                    buttons: [{
                                            icon: 'gi-accept',
                                            action: new GAction({
                                                name: 'applyAresData',
                                                tooltip: "jres:32100154", //RC 32100154 : Naplnit hodnoty z rejstříku.
                                                run: function (ev, object) {
                                                    const $field = $(object.field), ic = $field.gfield("getValue");
                                                    if (ic && ($field.gfield("validate"), !$field.gfield("getErrors").length)) {
                                                        GPublicUserRegForm.getAresData(ic, regForm)
                                                            //formObject._getAresData(ic)
                                                            //.fail(function (msg) {
                                                            //    GDlg.alert("jres:25030452", msg); //RC 25030452 : Chyba
                                                            //})
                                                            .then(function (data) {
                                                            GDlg.confirm("jres:31400048" //RC 31400048 : Potvrzení
                                                            , "jres:31400049".format(ic)) //RC 31400049 : Opravdu chcete načíst data pro IČ {0} a přepsat jimi Vámi zadané údaje?
                                                                .on("yes", function () {
                                                                formObject._applyAresData(data, true);
                                                            });
                                                        });
                                                    }
                                                }
                                            })
                                        }] //,
                                    //validators: [
                                    //    new Gordic.Validators.Ico(),
                                    //    new Gordic.Validators.Required({
                                    //        //message: "Povinná hodnota",
                                    //        //errorType: "error",
                                    //        //stopping: true,
                                    //        validate: function (value, source) {
                                    //            // vracim true, pokud je hodnota spravna.
                                    //            if (!Gordic.Utils.WidgetExists("gform", formObject.formDiv)) {
                                    //                return false;
                                    //            }
                                    //            const typEsu = (formObject.formDiv as JQuery<HTMLElement>)
                                    //                .findFields(FieldNames.typEsu)
                                    //                .gfield<{ typ_esu?: number } | undefined>("getValue");
                                    //            // 0 - "neurčeno"
                                    //            // 10 - "právnická osoba"
                                    //            // 20 - "fyzická osoba"
                                    //            // 30 - "fyzická osoba - OSVČ"
                                    //            if (typEsu && (typEsu.typ_esu === 10 || typEsu.typ_esu === 30) && Gordic.Utils.GString.IsNullOrWhiteSpace(value)) {
                                    //                return false;
                                    //            }
                                    //            else {
                                    //                return true;
                                    //            }
                                    //        }
                                    //    })
                                    //]
                                })
                                    .addRow({
                                    customClass: "js-isHideable"
                                })
                                    .addField("gcheck", {
                                    name: FieldNames.isVatPayer,
                                    model: `model.${"IsVatPayer" /* GPublicUserDtoNames.IsVatPayer */} = value`,
                                    label: "jres:31400091", //RC 31400091 : Plátce DPH
                                    change: function (event, input) {
                                        const isVatPayer = !!$(event.target).gfield("getValue"), dicFieldValidators = formObject.formDiv
                                            .findFields("dic")
                                            .gfield("option", "validators"), idxRequired = dicFieldValidators
                                            .findIndex(function (validator) {
                                            return validator instanceof Gordic.Validators.Required;
                                        }), isRequired = idxRequired !== -1;
                                        if (isRequired !== isVatPayer && dicFieldValidators) {
                                            if (isVatPayer) {
                                                dicFieldValidators.push(new Gordic.Validators.Required({
                                                    stopping: true,
                                                    group: WebControls.GPublicUserDto.ValidationGroup.GROUP_BUSINESS
                                                }));
                                            }
                                            else {
                                                dicFieldValidators.splice(idxRequired, 1);
                                            }
                                            // 10.02.2021 - TFeik
                                            // Aktualizace validátorů a nastavení required.
                                            formObject._updateValidators();
                                        }
                                    }
                                })
                                    .addRow({
                                    label: "jres:31400029", //RC 31400029 : DIČ
                                    customClass: "js-isHideable"
                                })
                                    .addField("gstringbox", {
                                    name: FieldNames.dic,
                                    model: `model.${"dic" /* GPublicUserDtoNames.dic */} = value`,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addRow({
                                    label: "jres:31400030", //RC 31400030 : Jméno/Obchodní firma
                                    customClass: "js-isHideable"
                                })
                                    .addField("gstringbox", {
                                    name: FieldNames.obchodniJmeno,
                                    model: `model.${"obchodniJmeno" /* GPublicUserDtoNames.obchodniJmeno */} = value`,
                                    validators: [
                                        new Gordic.Validators.Required({
                                            stopping: true,
                                            group: WebControls.GPublicUserDto.ValidationGroup.GROUP_COMPANY
                                        })
                                    ],
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addRow({
                                    label: "jres:25030455", //RC 25030455 : Typ organizace
                                    customClass: "js-isHideable"
                                });
                                let typOrgServerFilters = undefined;
                                if (!regForm) {
                                    typOrgServerFilters = {
                                        typ_esu: new Gordic.Forms.Dependency(FieldNames.typEsu, "typ_esu", true) //, bool znamená, zda lze vyplnit hodnotu aniž by bylo vyplněné master políčko
                                    };
                                }
                                formBuilder
                                    .addField("gselectbox", formObject.ciselnikTypOrg, {
                                    name: FieldNames.typOrg,
                                    //, disabled: true
                                    model: `model.${"typOrg" /* GPublicUserDtoNames.typOrg */} = value.${"typ_org" /* Data.Readers.GinctyoDtoNames.typ_org */}`,
                                    dropdown: false,
                                    strict: true,
                                    itemTemplate: `{${"typ_org_txt" /* Data.Readers.GinctyoDtoNames.typ_org_txt */}:trim:encode}`,
                                    serverFilters: typOrgServerFilters,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                        const { value, flags } = changeObj;
                                        // Pokud se změní typ subjektu dle dependecy tak nastavím neurčito místo null.
                                        if (flags.dependencySet && !value) {
                                            $(ev.target)
                                                .findFields(FieldNames.typOrg)
                                                .gfield("model", "apply", { typOrg: null }, { initialValues: true });
                                        }
                                        // Měním hodnotu dle typuEsu, nastavím ji jako initial value.
                                        if (flags.typEsuChanged && value) {
                                            $(ev.target)
                                                .findFields(FieldNames.typOrg)
                                                .gfield("confirm");
                                        }
                                    }
                                })
                                    //.addRow({
                                    //    customClass: "js-representative"
                                    //})
                                    .addSection({
                                    label: "jres:31400073", //RC 31400073 : Zastupující osoba
                                    name: SectionNames.osoba
                                })
                                    //.addText("jres:31400073") //RC 31400073 : Zastupující osoba
                                    .addRow("jres:31400071") //RC 31400071 : Tituly před, za jménem
                                    .addField("gstringbox", {
                                    name: FieldNames.titulPred,
                                    model: `model.${"titulPred" /* GPublicUserDtoNames.titulPred */} = value`,
                                    customClass: "w-6",
                                    placeholder: showPlaceholders ? "Ing." : void 0,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addField("gstringbox", {
                                    name: FieldNames.titulZa,
                                    model: `model.${"titulZa" /* GPublicUserDtoNames.titulZa */} = value`,
                                    customClass: "w-6",
                                    placeholder: showPlaceholders ? "Ph. D." : void 0,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addRow("jres:25030356") //RC 25030356 : Jméno
                                    .addField("gstringbox", {
                                    name: FieldNames.jmeno,
                                    model: `model.${"jmeno" /* GPublicUserDtoNames.jmeno */} = value`,
                                    placeholder: showPlaceholders ? "Anna" : void 0,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    },
                                    validators: isPrijmeniJmenoRequired
                                        ? [
                                            new Gordic.Validators.Required({
                                                stopping: true,
                                                message: 'jres:32100386', //RC 32100386 : Zadejte jméno.
                                                group: WebControls.GPublicUserDto.ValidationGroup.GROUP_CHANGE
                                            })
                                        ]
                                        : void 0
                                })
                                    .addRow("jres:31400032") //RC 31400032 : Příjmení
                                    .addField("gstringbox", {
                                    name: FieldNames.prijmeni,
                                    model: `model.${"prijmeni" /* GPublicUserDtoNames.prijmeni */} = value`,
                                    placeholder: showPlaceholders ? "Nováková" : void 0,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    },
                                    validators: isPrijmeniJmenoRequired
                                        ? [
                                            new Gordic.Validators.Required({
                                                stopping: true,
                                                message: 'jres:32100387', //RC 32100387 : Zadejte příjmení.
                                                group: WebControls.GPublicUserDto.ValidationGroup.GROUP_CHANGE
                                            })
                                        ]
                                        : void 0
                                })
                                    //.addRow("Rodné číslo")
                                    //.addField("gstringbox", {
                                    //    name: FieldNames.rodneCislo,
                                    //})
                                    .addRow({
                                    label: "jres:31400058", //RC 31400058 : Datum narození
                                    customClass: "js-isHideable"
                                })
                                    .addField("gdatebox", {
                                    name: FieldNames.datumNarozeni,
                                    model: `model.${"datumNarozeni" /* GPublicUserDtoNames.datumNarozeni */} = value`,
                                    create: function (event) {
                                        $(this).find(".g-button--disabled").hide();
                                    },
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                });
                                ///////////////////////////////////////////////////////////////
                                // Adresa
                                ///////////////////////////////////////////////////////////////
                                const googPlaces = new Api.GPlaces(), mapAddressFields = function (component, fieldName) {
                                    if (component) {
                                        switch (fieldName) {
                                            default: return component.long_name;
                                            case "stat":
                                                const sis_aa = component.shortName, gstat = formObject.dataViewStat
                                                    .getDataRows()
                                                    .find(function (row) {
                                                    return row.stat_sis_aa === sis_aa;
                                                });
                                                if (gstat) {
                                                    return gstat.stat;
                                                }
                                        }
                                    }
                                };
                                formBuilder
                                    .addSection({
                                    // 09.12.2019 - TFeik
                                    // Text změněn dle požadavku R. Fouska - sjednocení terminologie s ISDS a NIA.
                                    // https://phabricator.gordic.cz/T242
                                    label: "jres:32100102", //RC 32100102 : Adresa trvalého pobytu
                                    name: SectionNames.adresa
                                })
                                    //.addRow({ customClass: "js-adresa" })
                                    //// popisek se mění v závislosti na vybranném typu subjektu
                                    //.addText("jres:32100102")  //RC 32100102 : Trvalé bydliště
                                    .addRow({
                                    //label: "jres:25030413, <span class='required'>jres:31400089</span>", //RC 31400089 : Číslo
                                    //customClass: "js-ignore-mark-required"
                                    label: 'jres:25030413', //RC 25030413 : Ulice, č.pop, č.or
                                    hint: 'jres:31400089' //RC 31400089 : Ulice, číslo popisné, číslo orientační
                                })
                                    .addField("gselectbox", "w-8", googPlaces.prefab(), {
                                    name: FieldNames.ulice,
                                    model: `model.${"ulice" /* GPublicUserDtoNames.ulice */} = value`,
                                    change: function (event, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                        const val = changeObj.value;
                                        if (val && typeof val === "object") {
                                            googPlaces.getPlaceDetails(val)
                                                .then(function (details) {
                                                formObject.formDiv.findFields()
                                                    .gfield("model", "apply", Gordic.Utils.objectMap(details
                                                    .mapAddressComponentsByType({
                                                    ulice: "route",
                                                    obec: "locality",
                                                    psc: "postal_code",
                                                    stat: "country"
                                                }), mapAddressFields));
                                            });
                                        }
                                    },
                                    modelValueTransform: {
                                        collect: function (value) {
                                            return value && (typeof value === "object"
                                                ? value.structured_formatting.main_text
                                                : value);
                                        },
                                        apply: function (value) {
                                            return value;
                                        }
                                    },
                                    placeholder: showPlaceholders ? "Strmá" : void 0
                                })
                                    //.addField("gformattedbox", "w-4", Gordic.Prefabs.GFormattedBox.streetNrSingle("cPop", "cOr"), {
                                    //    name: FieldNames.cislo,
                                    //    //model: "model." + GPublicUserDtoNames.cislo + " = value",
                                    //    validators: [
                                    //        new Gordic.Validators.Required({
                                    //            stopping: true,
                                    //            group: GPublicUserDto.ValidationGroup.GROUP_REGISTRATION
                                    //                + "." + GPublicUserDto.ValidationGroup.GROUP_CHANGE
                                    //        })
                                    //    ],
                                    //    placeholder: showPlaceholders ? "432/1" : void 0,
                                    //    change: function (ev, changeObj) {
                                    //        $(this).gfield("resetErrors", "serverValidation");
                                    //    }
                                    //})
                                    .addField("gstringbox", "w-2", {
                                    name: FieldNames.cisloPopisne,
                                    model: `model.${"cPop" /* GPublicUserDtoNames.cPop */} = value`,
                                    placeholder: 'jres:32100320', //RC 32100320 : Č.p
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addField("gstringbox", "w-2", {
                                    name: FieldNames.cisloOrientacni,
                                    model: `model.${"cOr" /* GPublicUserDtoNames.cOr */} = value`,
                                    placeholder: 'jres:32100321', //RC 32100321 : Č.or
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addRow("jres:32100319") //RC 32100319 : Část obce
                                    .addField("gstringbox", {
                                    name: FieldNames.castObce,
                                    model: `model.${"castObce" /* GPublicUserDtoNames.castObce */} = value`,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addRow("jres:31400036") //RC 31400036 : PSČ, Obec
                                    .addField("gselectbox", "w-4", formObject.ciselnikPsc, {
                                    name: FieldNames.psc,
                                    model: `model.${"psc" /* GPublicUserDtoNames.psc */} = value.${"psc" /* Data.Readers.GinspscDtoNames.psc */};`
                                        + `model.${"stat" /* GPublicUserDtoNames.stat */} => value.${"stat" /* Data.Readers.GinspscDtoNames.stat */}`,
                                    strict: false,
                                    // 19.06.2023 - TFeik
                                    invalidTransform: (input) => {
                                        // Odstraním mezery z PSČ (včetně mezer uprostřed textu což řeší replace).
                                        const psc = typeof input === 'string' ? input.trim().replace(/\s/g, '') : null;
                                        if (!psc) {
                                            // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                                            return input;
                                        }
                                        const result = {
                                            psc: psc
                                        };
                                        return result;
                                    },
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    },
                                    serverFilters: {
                                        stat: new Gordic.Forms.Dependency(FieldNames.stat, "stat" /* GPublicUserDtoNames.stat */)
                                    }
                                })
                                    //.addField("gformattedbox", "w-4", {
                                    //    name: FieldNames.psc,
                                    //    model: "model." + GPublicUserDtoNames.psc + " = value",
                                    //    placeholder: showPlaceholders ? "123 45" : void 0,
                                    //    parser: function (str) {
                                    //        return typeof str === "string"
                                    //            ? str.replace(/\D/g, "")
                                    //            : ""
                                    //            ;
                                    //    },
                                    //    formatter: function (value, isEdited) {
                                    //        return value == null || value.length <= 3 ? value :
                                    //            value.slice(0, 3) + " " + value.slice(3);
                                    //    },
                                    //    change: function (ev, changeObj) {
                                    //        $(this).gfield("resetErrors", "serverValidation");
                                    //    }
                                    //})
                                    .addField("gstringbox", "w-8", {
                                    name: FieldNames.obec,
                                    model: `model.${"obec" /* GPublicUserDtoNames.obec */} = value`,
                                    placeholder: showPlaceholders ? "Rajec" : void 0,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addRow("jres:25030053") //RC 25030053 : Stát
                                    .addField("gselectbox", formObject.ciselnikStat, {
                                    name: FieldNames.stat,
                                    model: `model.${"stat" /* GPublicUserDtoNames.stat */} = value.${"stat" /* Data.Readers.GincstaDtoNames.stat */}`,
                                    strict: true,
                                    dropdown: false,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                });
                                formBuilder
                                    .addSection({
                                    name: SectionNames.kontaktyProElektronickouKomunikaci,
                                    label: 'jres:32100349' //RC 32100349 : Kontakty pro elektronickou komunikaci
                                });
                                // 05.10.2023 - TFeik
                                // Při registračním formuláři dávám email na začtek. Jinak do kontaktních údajů.
                                if (!regForm) {
                                    addEmailRow();
                                }
                                formBuilder
                                    .addRow({
                                    label: "jres:31400034", //RC 31400034 : Telefon
                                    hint: publicLoginConfig?.phoneNumberHint?.trim()
                                })
                                    .addField("gstringbox", {
                                    name: FieldNames.telefon,
                                    model: `model.${"telefon" /* GPublicUserDtoNames.telefon */} = value`,
                                    placeholder: showPlaceholders ? "+420999666333" : void 0,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    },
                                    inputType: "tel",
                                    validators: [
                                        publicLoginConfig?.isPhoneNumberRequired
                                            ? new Gordic.Validators.Required({
                                                stopping: true,
                                                group: [
                                                    WebControls.GPublicUserDto.ValidationGroup.GROUP_REGISTRATION,
                                                    WebControls.GPublicUserDto.ValidationGroup.GROUP_CHANGE,
                                                    WebControls.GPublicUserDto.ValidationGroup.GROUP_CHANGE_EXTERNAL_USER
                                                ].join('.')
                                            })
                                            : null
                                    ]
                                });
                                if (params?.showUseSmsNotificationsField) {
                                    formBuilder
                                        .addRow()
                                        .addField('gcheck', {
                                        label: 'jres:32100351', //RC 32100351 : Odesílat notifikace přes SMS související s elektronickým vyřizováním agendy s úřadem.
                                        name: FieldNames.useSmsNotifications,
                                        model: `model.${"UseSmsNotifications" /* GPublicUserDtoNames.UseSmsNotifications */} = value`,
                                        initialValue: true
                                    });
                                }
                                //formBuilder
                                //.addRow({ label: "Fax", customClass: " js-isHideable js-isHideable-fo js-isHideable-fo-osvc js-isHideable-po " }) //RC 26265167 : Fax
                                //    .addField("gstringbox", {
                                //        "name": "fax",
                                //    });
                                // Sekce
                                formBuilder
                                    .addSection({
                                    name: SectionNames.podminkyPouzivani
                                });
                                if (regForm && formObject.conditionAgreementText && formObject.conditionAgreementText.trim()) {
                                    formBuilder
                                        .addRow()
                                        .addField("gcheck", {
                                        name: FieldNames.souhlasSeZpracovanimUdaju,
                                        model: `model.${"souhlasSeZpracovanimUdaju" /* GPublicUserDtoNames.souhlasSeZpracovanimUdaju */} = value`,
                                        label: formObject.conditionAgreementText,
                                        validators: [
                                            new Gordic.Validators.Base({
                                                validate: function (value, changeObj) {
                                                    return value === true;
                                                },
                                                message: "jres:31400038", //RC 31400038 : Souhlas s podmínkami je nezbytný.
                                                group: "customValidation"
                                            })
                                        ],
                                        change: function (ev, changeObj) {
                                            $(this).gfield("resetErrors", "serverValidation");
                                        }
                                    });
                                }
                                if (regForm && regInstructions) {
                                    formBuilder
                                        .addRow({
                                    //layoutDescriptor: "L1M1S1, L-1-11-0, M-1-11-0, S-1-11-0"
                                    })
                                        .addText(regInstructions.format(""), "js-instructions");
                                }
                                formBuilder
                                    .addRow({
                                    //layoutDescriptor: "L1M1S1, L-1-11-0, M-1-11-0, S-1-11-0",
                                    required: true,
                                    name: 'starRequiredDecription',
                                    // Zruší nastavování / odebírání hvězdičky dle validátorů.
                                    // To dělá funkce Gordic.Utils.Form.markRequired($form);
                                    customClass: Gordic.Utils.Form.MarkRequireIgnoreClassName //'js-ignore-mark-required' 
                                    // 'g-state-text g-state-info'
                                })
                                    .addText('jres:32100156'); //RC 32100156 : Položky označené modrým pruhem je nutné vyplnit.
                                //.addRow()
                                // Přidání formuláře do DOMu.
                                const $form = formObject.formDiv = $.newDiv()
                                    .appendTo(formObject.container)
                                    // 03.09.2021 - TFeik
                                    // Možnost upravit formulář z venku po vytvoření.
                                    .gform("createFrom", params.modifyForm ? params.modifyForm(formBuilder) : formBuilder)
                                    .on("fieldchange", function (event) {
                                    const field = $(event.target).gfield("instance");
                                    if (field._autoValidationActive !== true) {
                                        field.validate(true);
                                    }
                                });
                                if (!regForm) {
                                    $form.findFields(FieldNames.emailAsLogin).gformrow().hide();
                                }
                                if (initialValues?.RegistrationType === 3 /* General.ApplicationInterface.PublicUserLoginRegistrationTypeEnum.EIdentita */) {
                                    $form.findFormSections(SectionNames.prihlasovaciUdaje).hide();
                                    $form.findFields(FieldNames.uzivatelskeJmeno).gformrow().hide();
                                }
                                else {
                                    // 16.11.2021 - TFeik
                                    // Upravení autocomplete atributu dle applu.
                                    // https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element
                                    // https://phabricator.gordic.cz/T15804
                                    $('input', $form.findFields(FieldNames.uzivatelskeJmeno))
                                        .attr('autocomplete', 'username');
                                    $('input', $form.findFields(FieldNames.heslo))
                                        .attr('autocomplete', 'new-password');
                                    $('input', $form.findFields(FieldNames.overeniHesla))
                                        .attr('autocomplete', 'new-password');
                                }
                                // 08.08.2019 - TFeik
                                // Nastavenídisabled/enabled políček dle permissions.
                                GPublicUserRegForm.enableFields({
                                    form: $form,
                                    permissions: initialValues?.Permissions,
                                    isRegistrationForm: regForm
                                });
                            };
                            //formObject._getAresData = function (ic) {
                            //    return $.get("gin/webservices/ares.ashx?q=" + ic)
                            //        .fail(function (err) {
                            //            GDlg.alert("jres:25030452", //RC 25030452 : Chyba
                            //                "jres:31400046".format(ic));  //RC 31400046 : Selhalo získávání informací pro IČ {0}.
                            //            return $.Deferred().reject("jres:31400046".format(ic)); //RC 31400046 : Selhalo získávání informací pro IČ {0}.
                            //        })
                            //        .then(function (data) {
                            //            if (!data || data.length !== 1 || !data[0]) {
                            //                GDlg.alert("jres:25030452", //RC 25030452 : Chyba
                            //                    "jres:31400047".format(ic)); //RC 31400047 : Nalezena adekvátní data pro IČ {0}.
                            //                return $.Deferred().reject("jres:31400047".format(ic)); //RC 31400047 : Nalezena adekvátní data pro IČ {0}.
                            //            }
                            //            return data[0];
                            //        });
                            //};
                            let aresChanged = false;
                            formObject._applyAresData = function (data, overwriteUserValues) {
                                let fields = formObject.formDiv.findFields(), isPravnicka = 10 === fields.findFields(FieldNames.typEsu)
                                    .gfield("getValue").typ_esu, 
                                //dto = formObject._aresDataToDto(data, isPravnicka),
                                dto = GPublicUserRegForm.aresDataToPublicUser(data, isPravnicka, formObject.dataPravniFormy, formObject.dataTypOrganizace), 
                                // všechna políčka na kterých Ares může nastavovat hodnoty
                                aresFields = fields.findFields([
                                    FieldNames.obchodniJmeno, FieldNames.titulPred, FieldNames.jmeno, FieldNames.prijmeni,
                                    FieldNames.titulZa, FieldNames.typOrg, FieldNames.dic, FieldNames.cisloPopisne, FieldNames.cisloOrientacni,
                                    FieldNames.castObce, FieldNames.obec, FieldNames.ulice, FieldNames.psc, FieldNames.stat,
                                    FieldNames.isVatPayer, FieldNames.cislo
                                ].toString()), 
                                // všechna políčka, která budeme aktuálně nastatovat
                                fieldsToFill = aresFields.filter(function (i, e) {
                                    const $f = $(e), dtoValue = dto[$f.gfield("option", "name")];
                                    // nastaví se i prázdné hodnoty pro políčka, která
                                    // byla z Ares nastavená z minula
                                    $f.gfield("option", "aresValue", dtoValue);
                                    // návratová hodnota ovlivňuje filtr, propouštím
                                    // políčka pro která mám hodnotu a zároveň pokud
                                    // nechci přepisovat, políčka jen taková, která 
                                    // nebyla změněná uživatelem.
                                    return dtoValue != null
                                        && (overwriteUserValues || !$f.gfield("hasChanged"));
                                });
                                // aplikace hodnot do připravených políček
                                fieldsToFill.gfield("model", "apply", dto, {
                                    initialValues: true
                                });
                                // nad všemi ares políčky se znovu vyhodnotí odchylky
                                // zadaných hodnot oproti údajům v rejstříku
                                const fieldchangeFlags = { redrawAresErrors: true };
                                aresFields.trigger("fieldchange", {
                                    flags: fieldchangeFlags
                                });
                                // 29.01.2024 - TFeik
                                // Po vyvolání eventu výše se vymazaly ohdnoty PSČ (a u osobních údajů i stát) tak je jako hotfix nastavím znovu.
                                const hotfixFieldNames = [
                                    FieldNames.psc
                                ];
                                if (!regForm) {
                                    hotfixFieldNames.push(FieldNames.stat);
                                }
                                fieldsToFill
                                    .findFields(hotfixFieldNames.toString())
                                    .gfield('model', 'apply', dto)
                                    .gfield('confirm')
                                    .trigger("fieldchange", {
                                    flags: fieldchangeFlags
                                });
                                const isVatPayerField = aresFields.findFields(FieldNames.isVatPayer);
                                if (!isVatPayerField.gfield("option", "disabled")) {
                                    // explicitní vyvolání change, protože model apply s flag
                                    // initialValue ho nevyvolá
                                    isVatPayerField.gfield("instance")._trigger("change", null, {
                                        value: dto.isVatPayer,
                                        flags: {}
                                    });
                                }
                            };
                            //formObject._aresDataToDto = function (ares, isPravnicka) {
                            //    const dto: GPublicUserDto = {
                            //        dic: ares.Dic,
                            //        //ic: ares.ICO,
                            //        cPop: ares.CisloDomu,
                            //        cOr: ares.CisloOrientacni,
                            //        castObce: ares.NazevCastiObce,
                            //        obec: ares.NazevObce,
                            //        ulice: ares.NazevUlice,
                            //        psc: ares.PSC,
                            //        stat: 42,
                            //        // 5. priznak je existence v rejstriku platcu DPH, viz.:
                            //        // http://wwwinfo.mfcr.cz/ares/ares_xml_basic.html.cz
                            //        isVatPayer: ares.Priznaky_subjektu
                            //            && ares.Priznaky_subjektu[5] === "A"
                            //    } as any;
                            //    //var typOrg = formObject._getTypOrganizace(ares.PravniForma);
                            //    //if (!typOrg) {
                            //    //  // někdy je před kód nutné přidat "10", některé kódy jsou tak
                            //    //  // uložené v číselníku
                            //    //    typOrg = formObject._getTypOrganizace("10" + ares.PravniForma);
                            //    //}
                            //    //if (!typOrg) typOrg = 30; // práv. osoba - nespecif.
                            //    let typOrg = formObject._getTypOrganizaceDlePravniFormy(ares.PravniForma);
                            //    if (!typOrg) typOrg = 0; // neurčeno
                            //    dto.typOrg = typOrg;
                            //    if (isPravnicka) {
                            //        dto.obchodniJmeno = ares.Nazev;
                            //    }
                            //    else {
                            //        let matches = formObject.reCeleJmeno ? formObject.reCeleJmeno.exec(ares.Nazev) : void 0;
                            //        if (matches) {
                            //            const matcheArray = matches.slice(1).map(function (m) {
                            //                return m && m.replace(formObject.reJmenoTrim!, "$1");
                            //            });
                            //            $.extend(dto, {
                            //                titulPred: matcheArray[0],
                            //                jmeno: matcheArray[1],
                            //                prijmeni: matcheArray[2],
                            //                titulZa: matcheArray[3]
                            //            });
                            //        }
                            //    }
                            //    // Nastavení prázdného znaku pro ulici, pokud není v Ares vyplněna (u obcí).
                            //    if (!dto.ulice) {
                            //        dto.ulice = " ";
                            //    }
                            //    // Nastaveni fiktivni hodnoty pro ulozeni cisla domu "cislo", ktera obsluhuje hodnoty cPop a cOr.
                            //    (dto as any).cislo = Gordic.Gui.WebControls.GPublicUserRegForm.getStreetNumber((dto as any).cPop, (dto as any).cOr);
                            //    return dto;
                            //};
                            formObject._getTypOrganizace = function (typOrganiace) {
                                //var tempTypOrgDataView = formObject.dataViewTypOrg; 
                                //tempTypOrgDataView.applyView({ "filter": "typ_org == " + typOrganiace });
                                //var typOrgByPravniFormaArray = tempTypOrgDataView.getDataRows();
                                //if (typOrgByPravniFormaArray
                                //    && typOrgByPravniFormaArray.length === 1
                                //    && typOrgByPravniFormaArray[0].typ_org !== null && typOrgByPravniFormaArray[0].typ_org !== undefined
                                //) {
                                //    return typOrgByPravniFormaArray[0].typ_org;
                                //}
                                let typOrg = null;
                                const typOrgObject = formObject._getTypOrganizaceObject(typOrganiace);
                                if (typOrgObject !== null && typOrgObject !== undefined) {
                                    typOrg = typOrgObject.typ_org;
                                }
                                return typOrg;
                            };
                            formObject._getTypOrganizaceObject = function (typOrganiace) {
                                //var tempTypOrgDataView = formObject.dataViewTypOrg; 
                                //tempTypOrgDataView.applyView({ "filter": "typ_org == " + typOrganiace });
                                //var typOrgByPravniFormaArray = tempTypOrgDataView.getDataRows();
                                //if (typOrgByPravniFormaArray
                                //    && typOrgByPravniFormaArray.length === 1
                                //    && typOrgByPravniFormaArray[0].typ_org !== null && typOrgByPravniFormaArray[0].typ_org !== undefined
                                //) {
                                //    return typOrgByPravniFormaArray[0]
                                //}
                                let typOrg = null;
                                if (formObject.dataTypOrganizace !== null && formObject.dataTypOrganizace !== undefined && formObject.dataTypOrganizace.length > 0) {
                                    $.each(formObject.dataTypOrganizace, function (key, item) {
                                        if (typOrganiace === parseInt(item.typ_org)) {
                                            typOrg = item;
                                            return false;
                                        }
                                    });
                                }
                                return typOrg;
                            };
                            formObject._getTypOrganizaceDlePravniFormy = function (pravniForma) {
                                let typOrg = null;
                                if (typeof pravniForma === "string") {
                                    pravniForma = parseInt(pravniForma);
                                }
                                if (formObject.dataPravniFormy !== null && formObject.dataPravniFormy !== undefined && formObject.dataPravniFormy.length > 0) {
                                    $.each(formObject.dataPravniFormy, function (key, item) {
                                        if (pravniForma === parseInt(item.kod_pravni_formy)) {
                                            typOrg = item.typ_org;
                                            return false;
                                        }
                                    });
                                }
                                if ((typOrg === null || typOrg === undefined || typOrg === 0)
                                    && formObject.dataTypOrganizace !== null && formObject.dataTypOrganizace !== undefined && formObject.dataTypOrganizace.length > 0) {
                                    $.each(formObject.dataTypOrganizace, function (key, item) {
                                        if (pravniForma === parseInt(item.pr_forma)) {
                                            typOrg = item.typ_org;
                                            return false;
                                        }
                                    });
                                }
                                return typOrg;
                            };
                            formObject._adjustForm = function (typEsu) {
                                /// <summary>
                                /// Zobrazí / skryje políčka na formuláři dle typu právní osoby. Hodnota skrytých políček se nemaže. 
                                /// </summary>
                                /// <param name="typEsu" type="type">0 - "neurčeno", 10 - "právnická osoba", 20 - "fyzická osoba", 30 - "fyzická osoba - OSVČ"</param>
                                const fieldsToHide = publicLoginConfig?.fieldsToHide;
                                function hide() {
                                    GPublicUserRegForm.enableFields({
                                        form: formObject.formDiv,
                                        permissions: formObject.initialValues?.Permissions,
                                        isRegistrationForm: regForm
                                    });
                                    let fieldsToDisable;
                                    const representative = formObject.formDiv.find(".js-representative");
                                    representative.hide();
                                    if (fieldsToHide) {
                                        switch (typEsu) {
                                            case 10: // právnická osoba
                                                fieldsToDisable = fieldsToHide.pravnickaOsoba; //"datumNarozeni";
                                                representative.show();
                                                break;
                                            case 20: // fyzická osoba
                                                fieldsToDisable = fieldsToHide.fyzickaOsoba; // "ic, dic, obchodniJmeno, isVatPayer";//, typOrg
                                                break;
                                            case 30: // fyzická osoba - OSVČ
                                                fieldsToDisable = fieldsToHide.fyzickaOsobaOsvc; // "obchodniJmeno"; // typOrg
                                                break;
                                            default: // neurčeno
                                                fieldsToDisable = fieldsToHide.neurceno; //"ic, dic, obchodniJmeno, datumNarozeni, typOrg";// typOrg
                                                break;
                                        }
                                    }
                                    //formObject.formDiv.find(".js-adresa .gform-text").text(
                                    //    typEsu === 10
                                    //        ? "jres:31400074" //RC 31400074 : Adresa sídla
                                    //        : "jres:32100102" //RC 32100102 : Trvalé bydliště
                                    //);
                                    const isPravnickaOsoba = typEsu === 10 ? true : false;
                                    formObject.formDiv.findFormSections(SectionNames.adresa)
                                        .gformsection("setLabel", isPravnickaOsoba
                                        ? "jres:31400074" //RC 31400074 : Adresa sídla
                                        // 09.12.2019 - TFeik
                                        // Text změněn dle požadavku R. Fouska - sjednocení terminologie s ISDS a NIA.
                                        // https://phabricator.gordic.cz/T242
                                        : "jres:32100102" //RC 32100102 : Adresa trvalého pobytu
                                    );
                                    const sekceOsoba = formObject.formDiv.findFormSections(SectionNames.osoba);
                                    sekceOsoba
                                        .gformsection("setLabel", isPravnickaOsoba
                                        ? "jres:31400073" //RC 31400073 : Zastupující osoba
                                        : "jres:32100352" //RC 32100352 : Osoba
                                    );
                                    $("label", sekceOsoba).css("border", isPravnickaOsoba ? "" : "unset");
                                    formObject.formDiv.find(".js-isHideable").show();
                                    if (fieldsToDisable) {
                                        formObject.formDiv.findFields(fieldsToDisable)
                                            //.gfield("option", "disabled", true)
                                            .gformrow().hide();
                                    }
                                }
                                //if (!fieldsToHide) {
                                //    loadPublicLoginConfig()
                                //        .done(function () {
                                //            fieldsToHide = publicLoginConfig.fieldsToHide;
                                //            hide();
                                //        });
                                //} else {
                                hide();
                                //}
                                //if (!fieldsToHide) {
                                //    new GContent("Gordic.Gui.WebControls.GLoginUtils").call("GetDefaultFieldsToHide")
                                //        .done(function (fieldsToHideRetVal) {
                                //            fieldsToHide = fieldsToHideRetVal;
                                //            hide();
                                //        });
                                //} else {
                                //    hide();
                                //}
                            };
                            formObject._initForm = function () {
                                /// <summary>
                                /// Nastaví výchozí hodnoty, validátory a onChangeListener, který zobrazuje odlišnost hodnoty políčka od hodnoty z Ares.
                                /// </summary>
                                const fields = formObject.formDiv.findFields();
                                if (formObject.initialValues) {
                                    formObject.initialValues.cislo = Gordic.Gui.WebControls.GPublicUserRegForm
                                        .getStreetNumber(formObject.initialValues.cPop, formObject.initialValues.cOr);
                                    fields.gfield("model", "apply", formObject.initialValues, {
                                        initialValues: true
                                    });
                                    // Skryti nepotrebnych policek formulare, nastaveni vychozich hodnot a validatoru.
                                    formObject._adjustForm(formObject.initialValues.typEsu);
                                }
                                // 10.02.2020 - TFeik
                                // Nastavení validátorů přesunuto do vlastnífnkce.
                                formObject._updateValidators();
                                //if (formObject.validators) {
                                //    //// 08.08.2019 - TFeik
                                //    //// Validator na IC(O) řídím sám přímo na políčku.
                                //    //(formObject.validators as any).ic = undefined;
                                //    fields.gfield("model", "validators", formObject.validators);
                                //    // 10.02.2021 - TFeik
                                //    // Aktualizace validátorů a nastavení required.
                                //    formObject._updateValidators();
                                //}
                                // Nastaveni a odebrani chyby v zavislosti na odlisnosti zadane hodnoty a hodnoty z Ares. 
                                formObject.formDiv.on("fieldchange", function (event, changeObj) {
                                    const $f = $(event.target), options = $f.gfield("option");
                                    if (!("aresValue" in options))
                                        return;
                                    if ($f.gfield("getErrors", "ares").length > 0) {
                                        $f.gfield("resetErrors", "ares");
                                    }
                                    const aresValue = options["aresValue"];
                                    if (aresValue == null)
                                        return;
                                    if (aresValue !== formObject._getFieldRawValue($f)) {
                                        if (typeof aresValue === "boolean") {
                                            // úprava pro checkbox, kde se zobrazovalo true/false
                                            aresValue = aresValue
                                                ? "jres:31400092" //RC 31400092 : platí
                                                : "jres:31400093" //RC 31400093 : neplatí
                                            ;
                                        }
                                        let aresValueText = aresValue;
                                        if (options.name === "typOrg") {
                                            if (aresValue === null || aresValue === undefined || aresValue === 0) {
                                                return;
                                            }
                                            let typOrganizace = formObject._getTypOrganizaceObject(aresValue);
                                            if (typOrganizace) {
                                                aresValueText = typOrganizace.typ_org_txt;
                                            }
                                        }
                                        $f.gfield("setError", {
                                            message: "jres:31400050" + aresValueText, //RC 31400050 : V rejstříku dle IČ bylo nalezeno: 
                                            errorType: "warning",
                                            group: "ares",
                                            stopping: false
                                        });
                                    }
                                });
                            };
                            formObject._getFieldRawValue = function ($field) {
                                /// <summary>
                                /// Vrati primitivní hodnotu z field.
                                /// </summary>
                                /// <param name="fieldValue" type="object"></param>
                                /// <param name="fieldName" type="string"></param>
                                /// <returns type="string/int/object"></returns>
                                const value = $field.gfield("getValue");
                                if (value && typeof value === "object") {
                                    switch ($field.gfield("option", "name")) {
                                        case FieldNames.typOrg:
                                            return value.typ_org;
                                        case FieldNames.ulice:
                                            return value.ulice_nazev?.trim();
                                        case FieldNames.psc:
                                            return value.psc?.trim();
                                        case FieldNames.castObce:
                                            return value.cast_obce_nazev?.trim();
                                        case FieldNames.obec:
                                            return value.obec?.trim();
                                        case FieldNames.stat:
                                            return value.stat;
                                        case FieldNames.cislo:
                                            const cislo = Gordic.Gui.WebControls.GPublicUserRegForm.getStreetNumber(value.cPop, value.cOr);
                                            if (cislo != null) {
                                                return cislo;
                                            }
                                    }
                                }
                                return value;
                            };
                            formObject.apply = function (formData, fields, flags) {
                                /// <summary>
                                /// Nastaví data do formuláře a složí číslo domu a jméno uživatele z několika políček do jedné (cislo, celeJmeno).
                                /// </summary>
                                /// <param name="formData" type="type">Objekt hodnot, které se uloží do formuláře.</param>
                                /// <param name="fields" type="type">Políčka, do kterých se data nastavují. Pokud není vyplněno pak se použijí všechny políčka formuláře.</param>
                                /// <param name="flags" type="type">Příznaky.</param>
                                //formData.cislo = formObject._setCisloPopOr(formData.cPop, formData.cOr);
                                //formData.celeJmeno = formObject._setCeleJmeno(formData.titulPred, formData.jmeno, formData.prijmeni, formData.titulZa);
                                if (!fields) {
                                    fields = formObject.formDiv.findFields();
                                }
                                if (flags) {
                                    fields.gfield("model", "apply", formData, flags);
                                }
                                else {
                                    fields.gfield("model", "apply", formData);
                                }
                            };
                            formObject.collect = function () {
                                /// <summary>
                                /// Sezbírá data z formuláře a rozparsuje číslo domu a jméno uživatele z jednoho políčka do více (pro Dto).
                                /// </summary>
                                /// <param name="result" type="type">Objekt, do kterého se uloží nalezené hodnoty.</param>
                                /// <param name="fields" type="type">Políčka, ze kterých se data načítají. Pokud není vyplněno pak se použijí všechny políčka formuláře.</param>
                                //if (!fields) {
                                //    fields = formObject.formDiv.findFields();
                                //}
                                //formObject._parseCisloPopOr(result);
                                //formObject._parseCeleJmeno(result);
                                const $form = formObject.formDiv;
                                // 01.04.2020 - TFeik
                                // Přidána aktualizace širovacího klíče pro heslo.
                                return Gordic.Prefabs.GStringBox.updateChiperPublicKeys($form)
                                    .then(() => {
                                    if (!Gordic.Utils.WidgetExists('gform', $form)) {
                                        return $.Deferred().reject().promise();
                                    }
                                    const result = {};
                                    $form.findFields().gfield("model", "collect", result);
                                    return result;
                                });
                            };
                            //formObject.checkAdresAtRuian = function () {
                            //    new GContent("Gordic.Gui.WebControls.GLoginUtils").call("Ruian").done(function (a) {
                            //        
                            //    });
                            //    //var formData = {};
                            //    //formObject.collect(formData);
                            //    //return $.get("gin/webservices/ruian.ashx?q=" + formData.obec)
                            //    //    .done(function (data) {
                            //    //        if (!(data) || data.length !== 1 || !(data[0])) {
                            //    //            GDlg.alert("jres:25030452", //RC 25030452 : Chyba
                            //    //                "jres:31400047"); //RC 31400047 : Nalezena adekvátní data pro IČ {0}.
                            //    //            return $.Deferred().reject("jres:31400047"); //RC 31400047 : Nalezena adekvátní data pro IČ {0}.
                            //    //        }
                            //    //        return data[0];
                            //    //    })
                            //    //    .fail(function (err) {
                            //    //        GDlg.alert("jres:25030452", //RC 25030452 : Chyba
                            //    //            "jres:31400046");  //RC 31400046 : Selhalo získávání informací pro IČ {0}.
                            //    //        return $.Deferred().reject("jres:31400046"); //RC 31400046 : Selhalo získávání informací pro IČ {0}.
                            //    //    });
                            //    //if (!publicLoginConfig || !publicLoginConfig.ruianFnxIoKey) {
                            //    //    return;
                            //    //}
                            //    //var formData = {};
                            //    //formObject.collect(formData);
                            //    //var ruianUrl = "https://ruian.fnx.io/api/v1/ruian/validate?apiKey=" + publicLoginConfig.ruianFnxIoKey;
                            //    //if (formData.obec) {
                            //    //    ruianUrl += "&municipalityName=" + formData.obec;
                            //    //}
                            //    //if (formData.psc) {
                            //    //    ruianUrl += "&zip=" + formData.psc;
                            //    //}
                            //    //if (formData.cOr) {
                            //    //    ruianUrl += "&co=" + formData.cOr;
                            //    //}
                            //    //if (formData.cPop) {
                            //    //    ruianUrl += "&cp=" + formData.cPop;
                            //    //}
                            //    //if (formData.ulice) {
                            //    //    ruianUrl += "&street=" + formData.ulice;
                            //    //}
                            //    //console.log(ruianUrl);
                            //    //formObject._parseCisloPopOr(result);
                            //    //formObject._parseCeleJmeno(result);
                            //};
                            //#endregion
                            //#region Nacteni DataView pro TypEsu, TypOrg a Stat na vyhledavani zda zadana hodnota existuje v ciselniku.
                            //formObject.dataViewTypEsu = {};
                            //formObject._findDataView(formObject.ciselnikTypEsu.data, formObject.dataViewTypEsu);
                            if (formObject.ciselnikTypEsu.data.constructor.name === "GDataView"
                                || formObject.ciselnikTypEsu.data.findByKey) {
                                //formObject.ciselnikTypEsu.data.applyView({
                                //    filter: "typ_esu !== 0"})
                                formObject.dataViewTypEsu = formObject.ciselnikTypEsu.data;
                            }
                            else {
                                formObject.ciselnikTypEsu.data.getView()
                                    .then(function (dataView) {
                                    //dataView.applyView({
                                    //    filter: "typ_esu !== 0"
                                    //})
                                    formObject.dataViewTypEsu = dataView;
                                });
                            }
                            //formObject.dataViewTypEsu._view[1] = null;
                            //if (formObject.typEsuVychoziHodnota) {
                            //    formObject.dataViewTypEsu.applyView({
                            //        filter: "typ_esu !== 0"
                            //        //function (object) {
                            //        //if (object && object.data && object.data.typ_esu
                            //        //    && object.data.typ_esu !== 0) {
                            //        //    return true;
                            //        //}
                            //        //else {
                            //        //    return false;
                            //        //}
                            //        //}
                            //    })
                            //}
                            //formObject.dataViewTypOrg = {};
                            //formObject._findDataView(formObject.ciselnikTypOrg.data, formObject.dataViewTypOrg);
                            if (formObject.ciselnikTypOrg.data.constructor.name === "GDataView"
                                || formObject.ciselnikTypOrg.data.findByKey) {
                                formObject.dataViewTypOrg = formObject.ciselnikTypOrg.data;
                            }
                            else {
                                formObject.ciselnikTypOrg.data.getView()
                                    .then(function (dataView) {
                                    formObject.dataViewTypOrg = dataView;
                                });
                            }
                            //formObject.dataViewStat = {};
                            //formObject._findDataView(formObject.ciselnikStat.data, formObject.dataViewStat);
                            if (formObject.ciselnikStat.data.constructor.name === "GDataView"
                                || formObject.ciselnikStat.data.findByKey) {
                                formObject.dataViewStat = formObject.ciselnikStat.data;
                            }
                            else {
                                formObject.ciselnikStat.data.getView()
                                    .then(function (dataView) {
                                    formObject.dataViewStat = dataView;
                                });
                            }
                            if (formObject.ciselnikPsc.data.constructor.name === "GDataView"
                                || formObject.ciselnikPsc.data.findByKey) {
                                formObject.dataViewPsc = formObject.ciselnikPsc.data;
                            }
                            else {
                                formObject.ciselnikPsc.data.getView()
                                    .then((dataView) => {
                                    formObject.dataViewPsc = dataView;
                                });
                            }
                            // 19.08.2019 - TFeik
                            // Vlastní funkce na validaci formuláře. Ta zasjistí, aby se validovaly správné validační skupiny.
                            formObject.isValid = () => {
                                const formDiv = formObject.formDiv;
                                if (!Gordic.Utils.WidgetExists("gform", formDiv)) {
                                    return false;
                                }
                                return formDiv.gform("isValid", formObject._createValidationGroups());
                            };
                            formObject._createValidationGroups = () => {
                                // 06.02.2024 - TFeik
                                // Přidána extra validační skupina pro správný formát dat v dto.
                                const validationGroups = [
                                    WebControls.GPublicUserDto.ValidationGroup.GROUP_CORRECT_FORMAT
                                ];
                                if (regForm) {
                                    validationGroups.push(WebControls.GPublicUserDto.ValidationGroup.GROUP_REGISTRATION);
                                }
                                else {
                                    validationGroups.push(params.isGinisUser
                                        ? WebControls.GPublicUserDto.ValidationGroup.GROUP_CHANGE
                                        : WebControls.GPublicUserDto.ValidationGroup.GROUP_CHANGE_EXTERNAL_USER);
                                }
                                let typEsu;
                                if (Gordic.Utils.WidgetExists("gform", formObject.formDiv)) {
                                    typEsu = formObject.formDiv
                                        .findFields(FieldNames.typEsu)
                                        .gfield("getValue")?.typ_esu;
                                }
                                if (typEsu != null) {
                                    // 0 - "neurčeno", 10 - "právnická osoba", 20 - "fyzická osoba", 30 - "fyzická osoba - OSVČ"
                                    switch (typEsu) {
                                        case 10:
                                            validationGroups.push(WebControls.GPublicUserDto.ValidationGroup.GROUP_COMPANY);
                                            validationGroups.push(WebControls.GPublicUserDto.ValidationGroup.GROUP_BUSINESS);
                                            break;
                                        case 20:
                                            validationGroups.push(WebControls.GPublicUserDto.ValidationGroup.GROUP_PERSONAL);
                                            break;
                                        case 30:
                                            validationGroups.push(WebControls.GPublicUserDto.ValidationGroup.GROUP_PERSONAL);
                                            validationGroups.push(WebControls.GPublicUserDto.ValidationGroup.GROUP_BUSINESS);
                                            break;
                                    }
                                }
                                return validationGroups;
                            };
                            formObject._updateValidators = () => {
                                const formValidators = formObject.validators;
                                if (!Gordic.Utils.WidgetExists('gform', formObject.formDiv) || !formValidators) {
                                    return;
                                }
                                const formValidationGoups = formObject._createValidationGroups();
                                const filtersToApply = {};
                                const fieldValidatorNames = Object.keys(formValidators);
                                for (let i = 0; i < fieldValidatorNames.length; i++) {
                                    const fieldValidatorName = fieldValidatorNames[i]?.trim();
                                    if (!fieldValidatorName || !Array.isArray(formValidators[fieldValidatorName])) {
                                        continue;
                                    }
                                    const validatorsToApply = formValidators[fieldValidatorName]?.filter(v => {
                                        if (!v.group) {
                                            return true;
                                        }
                                        return v.group.split('.').some(g => g && formValidationGoups.includes(g));
                                    });
                                    if (validatorsToApply.length <= 0) {
                                        continue;
                                    }
                                    filtersToApply[fieldValidatorName] = validatorsToApply;
                                }
                                formObject.formDiv.findFields().gfield('model', 'validators', filtersToApply);
                                Gordic.Utils.Form.markRequired(formObject.formDiv, formValidationGoups);
                            };
                            //#endregion
                            // Vytvoření a inicializace formuláře.
                            formObject._createForm();
                            formObject._initForm();
                            deferred.resolve(formObject);
                        });
                    }
                    //// 12.08.2019 - TFeik
                    //// Napřed si načtu data pro šifrování hesla.
                    //GLoginUtils.GetCipherPublicKey()
                    //    .done(function (cipherPublicKey) {
                    //        RsaParamsPublic = cipherPublicKey;
                    loadPublicLoginConfig();
                    //    });
                    //return formObject;
                    return deferred.promise();
                }
                /**
                 * Vrátí číslo domu obsahující číslo popisné a číslo orientační, oddělené lomítkem.
                 *
                 * @author  tfeik
                 * @date    21.12.2017
                 *
                 * @param {number|string} cPop Číslo popisné.
                 * @param {number|string} cOr Číslo oriantační.
                 * @returns {string} Číslo popisné, nebo kombinace Číslo popisné/Číslo oriantační.
                 */
                static getStreetNumber(cPop, cOr) {
                    if (cPop) {
                        return cOr ? cPop.toString() + "/" + cOr.toString() : cPop.toString();
                    }
                    else {
                        return null;
                    }
                }
                /**
                 * Načte data z ARES pro zadané IČ.
                 *
                 * @author  TFeik
                 * @date    08.09.2021
                 *
                 * @param {string} ic
                 * @returns {JQuery.Promise<GAresDataDto, string>}
                 */
                static getAresData(ic, useGlobalParameters) {
                    if (!ic) {
                        return $.Deferred().reject('jres:32100281').promise(); //RC 32100281 : Není zadané IČ.
                    }
                    return WebControls.GLoginUtils
                        .GetAresData(ic, useGlobalParameters)
                        .then((data) => {
                        if (!data) {
                            GDlg.alert("jres:25030452", //RC 25030452 : Chyba
                            "jres:31400047".format(ic) //RC 31400047 : Nalezena adekvátní data pro IČ {0}.
                            );
                            return $.Deferred().reject('jres:31400047'.format(ic)); //RC 31400047 : Nalezena adekvátní data pro IČ {0}.
                        }
                        return data;
                    }, () => {
                        GDlg.alert("jres:25030452", //RC 25030452 : Chyba
                        "jres:31400046".format(ic) //RC 31400046 : Selhalo získávání informací pro IČ {0}.
                        );
                        return $.Deferred().reject('jres:31400046'.format(ic)); //RC 31400046 : Selhalo získávání informací pro IČ {0}. 
                    });
                    //return $.get('gin/webservices/ares.ashx?q={0}'.format(ic))
                    //    .fail((err) => {
                    //        GDlg.alert(
                    //            "jres:25030452", //RC 25030452 : Chyba
                    //            "jres:31400046".format(ic)  //RC 31400046 : Selhalo získávání informací pro IČ {0}.
                    //        );
                    //        return $.Deferred().reject('jres:31400046'.format(ic)); //RC 31400046 : Selhalo získávání informací pro IČ {0}.
                    //    })
                    //    .then((data) => {
                    //        if ((data?.length ?? 0) !== 1 || !data[0]) {
                    //            GDlg.alert(
                    //                "jres:25030452", //RC 25030452 : Chyba
                    //                "jres:31400047".format(ic) //RC 31400047 : Nalezena adekvátní data pro IČ {0}.
                    //            );
                    //            return $.Deferred().reject('jres:31400047'.format(ic)); //RC 31400047 : Nalezena adekvátní data pro IČ {0}.
                    //        }
                    //        return data[0];
                    //    });
                }
                /**
                 * Načte data z ARES pro zadané IČ a převede je do GPublicUserDto.
                 *
                 * @author  TFeik
                 * @date    08.09.2021
                 *
                 * @param {string} ic
                 * @param {boolean} isPravnickaPreset
                 * @returns {JQuery.Promise<WebControls.GPublicUserDto, string>}
                 */
                static getAresPublicUserData(ic, isPravnickaPreset, useGlobalParameters) {
                    return $.when(GPublicUserRegForm.getAresData(ic, useGlobalParameters), Gordic.Prefabs.Select.ginctyo().data.getData(), Gordic.Prefabs.Select.szrsprf().data.getData())
                        .then((aresData, ciselnikTypOrg, ciselnikSzrPravniForma) => {
                        // Ciselniky z nejakych zvlastnich duvodu vraci pole dat v poli, takže se beru prvni položku.
                        return GPublicUserRegForm.aresDataToPublicUser(aresData, isPravnickaPreset, ciselnikSzrPravniForma[0], ciselnikTypOrg[0]);
                    });
                }
                /**
                 * Převede ares data do GPublicUserDto.
                 *
                 * @author  TFeik
                 * @date    08.09.2021
                 *
                 * @param {GAresDataDto} ares
                 * @param {boolean} isPravnicka
                 * @param {Gordic.ControlsLogic.Interface.GSzrsprfDto[]} dataPravniFormy
                 * @param {Gordic.Data.Readers.GinctyoDto[]} dataTypOrganizace
                 * @returns {GPublicUserDto}
                 */
                static aresDataToPublicUser(ares, isPravnickaPreset, dataPravniFormy, dataTypOrganizace) {
                    const logger = this.GetLogger();
                    logger.debug('aresDataToPublicUser - start.');
                    logger.debug('aresDataToPublicUser - ic: {0}.'.format(ares.Ico ?? void 0));
                    logger.debug('aresDataToPublicUser - dataPravniFormyLength: {0}.'.format(dataPravniFormy?.length));
                    logger.debug('aresDataToPublicUser - dataTypOrganizaceLength: {0}.'.format(dataTypOrganizace?.length));
                    const dic = ares.Dic?.trim();
                    const cOr = ares.CisloOrientacni?.trim();
                    const dto /* & { cislo?: string | null }*/ = {
                        dic: dic ? dic : void 0,
                        //ic: ares.ICO,
                        cPop: ares.CisloPopisne,
                        cOr: cOr ? cOr : void 0,
                        castObce: ares.CastObce,
                        obec: ares.Obec,
                        ulice: ares.Ulice,
                        psc: ares.Psc,
                        stat: 42,
                        // 5. priznak je existence v rejstriku platcu DPH, viz.:
                        // http://wwwinfo.mfcr.cz/ares/ares_xml_basic.html.cz
                        //IsVatPayer: ares.Priznaky_subjektu ? ares.Priznaky_subjektu[5] === "A" : void 0
                        IsVatPayer: ares.PlatceDane
                    };
                    //var typOrg = formObject._getTypOrganizace(ares.PravniForma);
                    //if (!typOrg) {
                    //  // někdy je před kód nutné přidat "10", některé kódy jsou tak
                    //  // uložené v číselníku
                    //    typOrg = formObject._getTypOrganizace("10" + ares.PravniForma);
                    //}
                    //if (!typOrg) typOrg = 30; // práv. osoba - nespecif.
                    let typOrg = GPublicUserRegForm.getTypOrganizaceDlePravniFormy(ares.PravniForma, dataPravniFormy, dataTypOrganizace);
                    logger.debug('aresDataToPublicUser - typOrg: {0}.'.format(typOrg ?? void 0));
                    if (!typOrg) {
                        typOrg = 0; // neurčeno
                    }
                    dto.typOrg = typOrg;
                    // Načtení typu subjektu z typu organizace.
                    const typOrganizace = dataTypOrganizace?.filter(i => i.typ_org === typOrg)[0];
                    logger.debug('aresDataToPublicUser - isTypOrganizace: {0}.'.format(typOrganizace ? true : false));
                    let typ_esu = typOrganizace?.typ_esu;
                    logger.debug('aresDataToPublicUser - typ_esu: {0}.'.format(typ_esu ?? void 0));
                    // 29.04.2025 - TFeik
                    // Pravděpodobně existují situace / instalace, kde není u organizace naadministrovat typ esu tak jej pro vybraé dořeším samostatně.
                    if (!typ_esu) {
                        const typOrgsPravnickaOsoba = [
                            34, 40
                        ];
                        if (typOrgsPravnickaOsoba.includes(typOrg)) {
                            logger.debug('aresDataToPublicUser - nastaveni pravnicke ososby pro definovany typOrg.');
                            typ_esu = 10 /* Ginis.DbModel.GGincesuEnum.pravnicka_osoba */;
                        }
                    }
                    let isPravnicka = isPravnickaPreset;
                    if (typ_esu != void 0) {
                        isPravnicka = typ_esu === 10 /* Ginis.DbModel.GGincesuEnum.pravnicka_osoba */;
                        dto.typEsu = typ_esu;
                    }
                    //if (isPravnicka) {
                    dto.obchodniJmeno = ares.Nazev;
                    //}
                    if (!isPravnicka) {
                        const reCeleJmeno = /^\s*([\w\s,\.]+\.[\s,]*)?([^\s\d\_\.]+)[\s,]+((?:[^\s\d\_\.]+[\s,]*)+?)([\s,]+(?:\w+\.)+)?\s*$/;
                        const reJmenoTrim = /^[\s,]*(.*?)[\s,]*$/;
                        const matches = reCeleJmeno && ares.Nazev ? reCeleJmeno.exec(ares.Nazev) : void 0;
                        if (matches) {
                            const matcheArray = matches.slice(1).map(function (m) {
                                return m && m.replace(reJmenoTrim, "$1");
                            });
                            $.extend(dto, {
                                titulPred: matcheArray[0],
                                jmeno: matcheArray[1],
                                prijmeni: matcheArray[2],
                                titulZa: matcheArray[3]
                            });
                        }
                    }
                    // Nastavení prázdného znaku pro ulici, pokud není v Ares vyplněna (u obcí).
                    if (!dto.ulice) {
                        dto.ulice = " ";
                    }
                    // 07.03.2023 - TFeik
                    // Číslo popisné a orientační se už použíá pouze v oddělené formě.
                    // Nastaveni fiktivni hodnoty pro ulozeni cisla domu "cislo", ktera obsluhuje hodnoty cPop a cOr.
                    //dto.cislo = Gordic.Gui.WebControls.GPublicUserRegForm.getStreetNumber(dto.cPop, dto.cOr);
                    logger.debug('aresDataToPublicUser - end.');
                    return dto;
                }
                /**
                 * Vrátí typ organizace dle právní formy z ares.
                 *
                 * @author  TFeik
                 * @date    08.09.2021
                 *
                 * @param {number | string | undefined | null} pravniForma
                 * @param {Gordic.ControlsLogic.Interface.GSzrsprfDto[]} dataPravniFormy
                 * @param {Gordic.Data.Readers.GinctyoDto[]} dataTypOrganizace
                 * @returns {number | undefined | null}
                 */
                static getTypOrganizaceDlePravniFormy(pravniForma, dataPravniFormy, dataTypOrganizace) {
                    const logger = this.GetLogger();
                    logger.debug('getTypOrganizaceDlePravniFormy - start.');
                    logger.debug('getTypOrganizaceDlePravniFormy - pravniForma: {0}.'.format(pravniForma ?? void 0));
                    let typOrg = null;
                    if (typeof pravniForma === "string") {
                        pravniForma = parseInt(pravniForma);
                    }
                    if (dataPravniFormy) {
                        for (let i = 0; i < dataPravniFormy.length; i++) {
                            const item = dataPravniFormy[i];
                            if (!item) {
                                continue;
                            }
                            if (pravniForma === parseInt(item.kod_pravni_formy)) {
                                typOrg = item.typ_org;
                                logger.debug('getTypOrganizaceDlePravniFormy - dataPravniFormy - typOrg: {0}.'.format(typOrg ?? void 0));
                                break;
                            }
                        }
                    }
                    if (!typOrg && dataTypOrganizace) {
                        for (let i = 0; i < dataTypOrganizace.length; i++) {
                            const item = dataTypOrganizace[i];
                            if (!item) {
                                continue;
                            }
                            if (pravniForma === parseInt(item.pr_forma)) {
                                typOrg = item.typ_org;
                                logger.debug('getTypOrganizaceDlePravniFormy - dataTypOrganizace - typOrg: {0}.'.format(typOrg ?? void 0));
                                break;
                            }
                        }
                        // 17.04.2025 - TFeik
                        // Čtení typu organizace pro OSVČ rozšířeno o výchozí právní formy dle Esu.Server.GDetGinsesu.GetTypOrgDlePrFormy.
                        if (!typOrg && pravniForma != void 0) {
                            const pravniFormaOsvc = [
                                100, 101, 102, 103, 104, 105, 106, 107, 108, 109,
                                // 29.04.2025 - TFeik
                                // Přidány zahaniční OSVČ.
                                421, 424
                            ];
                            if (pravniFormaOsvc.includes(pravniForma)) {
                                const dbModel = Gordic.Ginis.DbModel;
                                const typOrgsOsvc = dataTypOrganizace
                                    .filter(i => i.typ_esu === 30 /* dbModel.GGincesuEnum.fyz_osoba_osvc */ && i.aktivita === 100 /* dbModel.GGincaktEnum.aktivni */)
                                    .map(i => i.typ_org)
                                    .filter(i => i != void 0);
                                if (typOrgsOsvc.length > 0) {
                                    typOrg = Math.min(...typOrgsOsvc);
                                    logger.debug('getTypOrganizaceDlePravniFormy - pravniFormaOsvc - typOrg: {0}.'.format(typOrg ?? void 0));
                                }
                            }
                        }
                    }
                    logger.debug('getTypOrganizaceDlePravniFormy - end.');
                    return typOrg;
                }
                ;
            }
            WebControls.GPublicUserRegForm = GPublicUserRegForm;
            ///**
            // * Data vracená z ARESu.
            // * 
            // * @author  TFeik
            // * @date    08.09.2021
            // * @since   486.1.0.465
            // */
            //export interface AresData {
            //    AdresaKod?: string,
            //    CisloDomu?: string,
            //    CisloOrientacni?: string,
            //    /**
            //     * RRRR-MM-DD
            //     * @type {string}
            //     */
            //    DatumVzniku?: string,
            //    Dic?: string,
            //    ICO?: string,
            //    Nazev?: string,
            //    NazevCastiObce?: string,
            //    NazevObce?: string,
            //    NazevOkresu?: string,
            //    NazevUlice?: string,
            //    PSC?: string,
            //    PravniForma?: string,
            //    Priznaky_subjektu?: string
            //}
        })(WebControls = Gui.WebControls || (Gui.WebControls = {}));
    })(Gui = Gordic.Gui || (Gordic.Gui = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gui.WebControls.GPublicUserRegForm.ts                </Name>
//    <Description> Formulář pro registraci / zm2nu údajů veřejného uživatele.  </Description>
//    <Author>      tfeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-03-27                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Gui;
    (function (Gui) {
        var WebControls;
        (function (WebControls) {
            /**
             * Názvy políček registrační formuláře veřejného uživatele.
             *
             * @author  PHorsak
             * @since   482.1.0.475
             * @date    07.08.2019
             */
            let FieldNames;
            (function (FieldNames) {
                FieldNames["email"] = "email";
                FieldNames["emailAsLogin"] = "emailAsLogin";
                FieldNames["uzivatelskeJmeno"] = "uzivatelskeJmeno";
                FieldNames["heslo"] = "heslo";
                FieldNames["overeniHesla"] = "overeniHesla";
                FieldNames["ic"] = "ic";
                FieldNames["obchodniJmeno"] = "obchodniJmeno";
                FieldNames["jmeno"] = "jmeno";
                FieldNames["prijmeni"] = "prijmeni";
                FieldNames["souhlasSeZpracovanimUdaju"] = "souhlasSeZpracovanimUdaju";
            })(FieldNames || (FieldNames = {}));
            /**
             * Názvy sekcí registrační formuláře veřejného uživatele.
             *
             * @author  PHorsak
             * @since   482.1.0.499
             * @date    16.08.2019
             */
            let SectionNames;
            (function (SectionNames) {
                SectionNames["prihlasovaciUdaje"] = "prihlasovaciUdaje";
                SectionNames["podminkyPouzivani"] = "podminkyPouzivani";
            })(SectionNames || (SectionNames = {}));
            const FormName = "RegisterPublicUserForm";
            /**
             * GPublicUserRegForm
             *
             * @author  TFeik
             * @since   480.1.0.517
             * @date    10.04.2017
             */
            class GXrgPublicUserRegForm {
                /**
                 * enableFields
                 *
                 * @author  TFeik
                 * @date    07.08.2019
                 *
                 * @param {GPublicUserPermissionDto} [permissions]
                 */
                static enableFields(opt) {
                    if (!opt || !Gordic.Utils.WidgetExists("gform", opt.form)) {
                        return;
                    }
                    // Napřed všechny políčka zakážu, ...
                    opt.form.findFields().gfield("option", "disabled", true);
                    if (!opt.permissions) {
                        opt.permissions = {};
                    }
                    // ... posbírám si jména políček, které je možné editovat ...
                    const fieldNamesToEnable = [
                        FieldNames.souhlasSeZpracovanimUdaju
                    ];
                    if (opt.isRegistrationForm || (opt.permissions.CanEditEmail && opt.permissions.CanEditEmail.value)) {
                        fieldNamesToEnable.push(FieldNames.email);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditEmailAsLogin && opt.permissions.CanEditEmailAsLogin.value)) {
                        fieldNamesToEnable.push(FieldNames.emailAsLogin);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditHeslo && opt.permissions.CanEditHeslo.value)) {
                        fieldNamesToEnable.push(FieldNames.heslo);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditIc && opt.permissions.CanEditIc.value)) {
                        fieldNamesToEnable.push(FieldNames.ic);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditJmeno && opt.permissions.CanEditJmeno.value)) {
                        fieldNamesToEnable.push(FieldNames.jmeno);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditObchodniJmeno && opt.permissions.CanEditObchodniJmeno.value)) {
                        fieldNamesToEnable.push(FieldNames.obchodniJmeno);
                    }
                    if (opt.isRegistrationForm || (opt.permissions.CanEditPrijmeni && opt.permissions.CanEditPrijmeni.value)) {
                        fieldNamesToEnable.push(FieldNames.prijmeni);
                    }
                    // 03.09.2019 - TFeik
                    // Povolí enabled uživatelského jména pouze, pokud není nastaveno použití emailu jako loginu.
                    const emailAsLogin = opt.form.findFields(FieldNames.emailAsLogin).gfield("getValue");
                    if (!emailAsLogin && (opt.isRegistrationForm || (opt.permissions.CanEditUzivatelskeJmeno && opt.permissions.CanEditUzivatelskeJmeno.value))) {
                        fieldNamesToEnable.push(FieldNames.uzivatelskeJmeno);
                    }
                    // ... a u nich zruším disabled.
                    if (fieldNamesToEnable.length > 0) {
                        opt.form.findFields(fieldNamesToEnable.toString())
                            .gfield("option", "disabled", false);
                    }
                }
                /**
                 * Vytvoří objekt registračního formuláře, inicializuje jej a nastaví do contentu.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 *
                 * @param {any} params
                 */
                static create(params) {
                    const that = this;
                    const deferred = $.Deferred();
                    let publicLoginConfig;
                    let formObject;
                    //let RsaParamsPublic: System.Security.Cryptography.RSAParameters | undefined;
                    // 14.08.2018 - TFeik
                    // Prepracovani funkce create na promis abych zajistil radne nacteni configu.
                    function loadPublicLoginConfig() {
                        return WebControls.GLoginUtils.GetPublicLoginConfig()
                            .done(function (publicLoginConfigRetVal) {
                            publicLoginConfig = publicLoginConfigRetVal;
                            //        });
                            //}
                            formObject = $.extend(formObject, {
                                name: FormName,
                                container: that.element,
                                layoutDescriptor: "L1M1S1"
                            }, params);
                            //formObject.cisloPopOrPatt = /^\s*(?:(\d+)\D+)?(\d+[a-zA-Z]?)\s*$/;
                            formObject.reCeleJmeno = /^\s*([\w\s,\.]+\.[\s,]*)?([^\s\d\_\.]+)[\s,]+((?:[^\s\d\_\.]+[\s,]*)+?)([\s,]+(?:\w+\.)+)?\s*$/;
                            formObject.reJmenoTrim = /^[\s,]*(.*?)[\s,]*$/;
                            const regForm = formObject.name === FormName;
                            formObject._createForm = function () {
                                // Vytvoří formulář.
                                //const regForm = formObject.name === "RegisterPublicUserForm";
                                let regInstructions, setInstructions = $.noop;
                                if (regForm) {
                                    //"jres:31400067" //RC 31400067 : Vyplněním formuláře a kliknutím na <q>{0}</q> dojde k odeslání aktivačního emailu{{0}}. Než se poprvé přihlásíte, musíte kliknout na odkaz uvedený v aktivačním emailu, abychom ověřili, že máte přístup k uvedené emailové schránce.
                                    regInstructions = publicLoginConfigRetVal.text != undefined && publicLoginConfigRetVal.text.instructions != undefined
                                        ? publicLoginConfigRetVal.text.instructions.format("jres:31400068") : ""; //RC 31400068 : Registrovat
                                    setInstructions = function (email) {
                                        if (regInstructions) {
                                            formObject.formDiv.find(".js-instructions")
                                                .gformtext(regInstructions.format(!email ? "" :
                                                " " + "jres:31400070" //RC 31400070 : na adresu
                                                    + " <strong>" + email + "</strong>"));
                                        }
                                    };
                                }
                                //function _adjustTypOrganizaceDataView(typEsu) {
                                //    if (regForm) {
                                //        const typOrgField = formObject.formDiv.findFields("typOrg");
                                //        const tempView = formObject.ciselnikTypOrg.data;
                                //        tempView.applyView({
                                //            filter: "typ_esu === " + typEsu.toString()
                                //        });
                                //        typOrgField.gfield("option", "data", new Gordic.Data.View(tempView.getRows(), {
                                //            key: "typ_org"
                                //        }));
                                //    }
                                //}
                                // Vytvoreni formulare pro registraci
                                const formBuilder = new Gordic.Forms.Form({
                                    name: formObject.name,
                                    layoutDescriptor: formObject.layoutDescriptor
                                });
                                ///////////////////////////////////////////////////////////////
                                // Přihlašovací údaje
                                ///////////////////////////////////////////////////////////////
                                formBuilder
                                    .addSection({
                                    label: regForm ? undefined : "jres:32100158", //RC 32100158 : Přihlašovací údaje
                                    name: SectionNames.prihlasovaciUdaje
                                })
                                    .addRow({
                                    label: "jres:31400022", //RC 31400022 : Email
                                    hint: "jres:32100160", //RC 32100160 : Email je nezbytný v případě obnovení zapomenutého hesla.
                                    required: true
                                })
                                    .addField("gstringbox", {
                                    name: FieldNames.email,
                                    model: "model." + "email" /* GPublicUserDtoNames.email */ + " = value",
                                    inputType: "email",
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                        // Použití emailu jako uživatelského jména                        
                                        const $form = formObject.formDiv, $email = $form.findFields(FieldNames.email), email = $email.gfield("getValue"), isValid = email
                                            && $email
                                                .gfield("validate")
                                                .gfield("getErrors")
                                                .length === 0;
                                        if ($form.findFields(FieldNames.emailAsLogin).gfield("getValue")) {
                                            $form.findFields(FieldNames.uzivatelskeJmeno)
                                                .gfield("setInitial", isValid ? email : "");
                                        }
                                        setInstructions(isValid ? email : "");
                                    },
                                    placeholder: regForm && publicLoginConfig && publicLoginConfig.showPlaceholders ? "anna@email.cz" : undefined //,
                                    //validators: regForm ? undefined : [
                                    //    new Gordic.Validators.Required({
                                    //        stopping: true,
                                    //        group: GPublicUserDto.ValidationGroup.GROUP_REGISTRATION
                                    //            + "." + GPublicUserDto.ValidationGroup.GROUP_CHANGE
                                    //    })
                                    //]
                                })
                                    .addRow()
                                    .addField("gcheck", {
                                    label: "jres:31400023", //RC 31400023 : Použít email jako uživatelské jméno
                                    name: FieldNames.emailAsLogin,
                                    model: "model." + "emailAsLogin" /* GPublicUserDtoNames.emailAsLogin */ + " = value",
                                    //disabled: params.initialValues && params.initialValues.RegistrationType !== 0,
                                    lastUser: "",
                                    change: function (event, changeObj) {
                                        // Registrace přes externí službu.
                                        if (params.initialValues && params.initialValues.RegistrationType !== 0) {
                                            return;
                                        }
                                        const $user = formObject.formDiv.findFields("uzivatelskeJmeno"), $useEmail = $(event.target), useEmail = changeObj.value !== false;
                                        if (useEmail) {
                                            $useEmail.gfield("option", "lastUser", $user.gfield("getValue") || "");
                                        }
                                        $user.gfield("option", "disabled", useEmail)
                                            .gfield("setInitial", useEmail
                                            ? formObject.formDiv.findFields("email").gfield("getValue")
                                            : $useEmail.gfield("option", "lastUser"));
                                    }
                                })
                                    .addRow("jres:31400024") //RC 31400024 : Uživatelské jméno                    
                                    .addField("gstringbox", {
                                    name: FieldNames.uzivatelskeJmeno,
                                    model: "model." + "uzivatelskeJmeno" /* GPublicUserDtoNames.uzivatelskeJmeno */ + " = value",
                                    //disabled: params.initialValues
                                    //    && (params.initialValues.emailAsLogin || params.initialValues.RegistrationType !== 0),
                                    validators: [
                                        new Gordic.Validators.Base({
                                            message: "jres:31400025", //RC 31400025 : Uživatelské jméno nesmí obsahovat "@" nebo musí být stejné jako email.
                                            validate: function (value, changeObj) {
                                                // uzivatelske jmeno nesmi obsahovat "@"
                                                // nebo musi byt stejne jako email
                                                return !value || !value.includes("@")
                                                    || value === formObject.formDiv
                                                        .findFields(FieldNames.email)
                                                        .gfield("getValue");
                                            },
                                            group: "customValidation"
                                        })
                                    ],
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    },
                                    spellCheck: false
                                });
                                if (regForm) {
                                    formBuilder
                                        .addRow({ label: "jres:31400044", required: true }) //RC 31400044 : Heslo, ověření
                                        // 16.12.2019 - TFeik
                                        // Tady by opět měl být použit prefab pro heslo se šifrováním.
                                        /* .addField("gstringbox", Gordic.Prefabs.GStringBox.passwordWithoutEncryption(), {*/
                                        .addField("gstringbox", Gordic.Prefabs.GStringBox.password({
                                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                                    }), {
                                        name: FieldNames.heslo,
                                        model: "model." + "heslo" /* GPublicUserDtoNames.heslo */ + " = value",
                                        customClass: "w-6 " + Gordic.Prefabs.GStringBox.cryptedCustomClass.cryptedJs,
                                        change: function (ev, changeObj) {
                                            $(this).gfield("resetErrors", "serverValidation");
                                        }
                                    })
                                        // 18.12.2019 - TFeik
                                        // Ověření hela by mělo být s šifrováním.
                                        //.addField("gstringbox", Gordic.Prefabs.GStringBox.passwordReEnterWithoutEncryption("heslo"), {
                                        .addField("gstringbox", Gordic.Prefabs.GStringBox.password({
                                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                                    }), {
                                        name: FieldNames.overeniHesla,
                                        model: "model." + "overeniHesla" /* GPublicUserDtoNames.overeniHesla */ + " = value",
                                        customClass: "w-6 " + Gordic.Prefabs.GStringBox.cryptedCustomClass.cryptedJs,
                                        change: function (ev, changeObj) {
                                            $(this).gfield("resetErrors", "serverValidation");
                                        }
                                    });
                                }
                                ///////////////////////////////////////////////////////////////
                                // Osobní informace
                                ///////////////////////////////////////////////////////////////
                                //formBuilder.addSection({
                                //    label: "jres:32100157", //RC 32100157 : Osobní údaje
                                //    name: ""//SectionNames.osobniUdaje
                                //})  
                                formBuilder.addRow({ label: "jres:25030356", required: true }) //RC 25030356 : Jméno
                                    .addField("gstringbox", {
                                    name: FieldNames.jmeno,
                                    model: "model." + "jmeno" /* GPublicUserDtoNames.jmeno */ + " = value",
                                    placeholder: regForm && publicLoginConfig && publicLoginConfig.showPlaceholders ? "Anna" : undefined,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addRow({ label: "jres:31400032", required: true }) //RC 31400032 : Příjmení
                                    .addField("gstringbox", {
                                    name: FieldNames.prijmeni,
                                    model: "model." + "prijmeni" /* GPublicUserDtoNames.prijmeni */ + " = value",
                                    placeholder: regForm && publicLoginConfig && publicLoginConfig.showPlaceholders ? "Nováková" : undefined,
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addRow({
                                    label: "jres:31400030", //RC 31400030 : Jméno/Obchodní firma
                                    customClass: "js-isHideable"
                                })
                                    .addField("gstringbox", {
                                    name: FieldNames.obchodniJmeno,
                                    model: "model." + "obchodniJmeno" /* GPublicUserDtoNames.obchodniJmeno */ + " = value",
                                    validators: [
                                        new Gordic.Validators.Required({
                                            stopping: true,
                                            group: WebControls.GPublicUserDto.ValidationGroup.GROUP_COMPANY
                                        })
                                    ],
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                    }
                                })
                                    .addRow({
                                    label: "jres:31400028", //RC 31400028 : IČO
                                    customClass: "js-isHideable"
                                })
                                    .addField("gstringbox", {
                                    name: FieldNames.ic,
                                    model: "model." + "ic" /* GPublicUserDtoNames.ic */ + " = value",
                                    change: function (ev, changeObj) {
                                        $(this).gfield("resetErrors", "serverValidation");
                                        if (changeObj.value) {
                                            const $field = $(ev.target);
                                            if (($field.gfield("validate"), !$field.gfield("getErrors").length)) {
                                                WebControls.GPublicUserRegForm.getAresData(changeObj.value, true)
                                                    //formObject._getAresData(changeObj.value)
                                                    .fail(console.warn.bind(console))
                                                    .then((data) => {
                                                    return formObject._applyAresData(data);
                                                });
                                            }
                                        }
                                    },
                                    //buttons: [{
                                    //    icon: 'gi-accept',
                                    //    action: new GAction({
                                    //        name: 'applyAresData',
                                    //        tooltip: "jres:32100154", //RC 32100154 : Naplnit hodnoty z rejstříku.
                                    //        run: function (ev, object) {
                                    //            const $field = $(object.field),
                                    //                ic = $field.gfield("getValue");
                                    //            if (ic&& ($field.gfield("validate"), !$field.gfield("getErrors").length)) {
                                    //                formObject._getAresData(ic)
                                    //                    //.fail(function (msg) {
                                    //                    //    GDlg.alert("jres:25030452", msg); //RC 25030452 : Chyba
                                    //                    //})
                                    //                    .then(function (data) {
                                    //                        GDlg.confirm("jres:31400048" //RC 31400048 : Potvrzení
                                    //                            , "jres:31400049".format(ic)) //RC 31400049 : Opravdu chcete načíst data pro IČ {0} a přepsat jimi Vámi zadané údaje?
                                    //                            .on("yes", function () {
                                    //                                formObject._applyAresData(data, true);
                                    //                            })
                                    //                            ;
                                    //                    })
                                    //                    ;
                                    //            }
                                    //        }
                                    //    })
                                    //}]                                    
                                });
                                //.addRow({
                                //    customClass: "js-isHideable"
                                //})
                                //.addRow({
                                //    label: "jres:31400029", //RC 31400029 : DIČ
                                //    customClass: "js-isHideable"
                                //})                                
                                // Sekce
                                formBuilder
                                    .addSection({
                                    name: SectionNames.podminkyPouzivani
                                });
                                if (regForm && formObject.conditionAgreementText && formObject.conditionAgreementText.trim()) {
                                    formBuilder
                                        .addRow()
                                        .addField("gcheck", {
                                        name: FieldNames.souhlasSeZpracovanimUdaju,
                                        model: "model." + "souhlasSeZpracovanimUdaju" /* GPublicUserDtoNames.souhlasSeZpracovanimUdaju */ + " = value",
                                        label: formObject.conditionAgreementText,
                                        validators: [
                                            new Gordic.Validators.Base({
                                                validate: function (value, changeObj) {
                                                    return value === true;
                                                },
                                                message: "jres:31400038", //RC 31400038 : Souhlas s podmínkami je nezbytný.
                                                group: "customValidation"
                                            })
                                        ],
                                        change: function (ev, changeObj) {
                                            $(this).gfield("resetErrors", "serverValidation");
                                        }
                                    });
                                }
                                if (regForm && regInstructions) {
                                    formBuilder
                                        .addRow({
                                    //layoutDescriptor: "L1M1S1, L-1-11-0, M-1-11-0, S-1-11-0"
                                    })
                                        .addText(regInstructions.format(""), "js-instructions");
                                }
                                formBuilder
                                    .addRow({
                                    //layoutDescriptor: "L1M1S1, L-1-11-0, M-1-11-0, S-1-11-0",
                                    required: true,
                                    name: 'starRequiredDecription',
                                    // Zruší nastavování / odebírání hvězdičky dle validátorů.
                                    // To dělá funkce Gordic.Utils.Form.markRequired(formObject.formDiv);
                                    customClass: Gordic.Utils.Form.MarkRequireIgnoreClassName
                                    // 'g-state-text g-state-info'
                                })
                                    .addText('jres:32100156'); //RC 32100156 : Položky označené hvězdičkou je nutné vyplnit.
                                //.addRow()
                                // Přidání formuláře do DOMu.
                                formObject.formDiv = $("<div>")
                                    .appendTo(formObject.container)
                                    .gform("createFrom", formBuilder)
                                    .on("fieldchange", function (event) {
                                    const field = $(event.target).gfield("instance");
                                    if (field._autoValidationActive !== true) {
                                        field.validate(true);
                                    }
                                });
                                // 16.11.2021 - TFeik
                                // Upravení autocomplete atributu dle applu.
                                // https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element
                                // https://phabricator.gordic.cz/T15804
                                $('input', formObject.formDiv.findFields(FieldNames.uzivatelskeJmeno))
                                    .attr('autocomplete', 'username');
                                $('input', formObject.formDiv.findFields(FieldNames.heslo))
                                    .attr('autocomplete', 'new-password');
                                $('input', formObject.formDiv.findFields(FieldNames.overeniHesla))
                                    .attr('autocomplete', 'new-password');
                            };
                            //formObject._getAresData = function (ic) {
                            //    return $.get("gin/webservices/ares.ashx?q=" + ic)
                            //        .fail(function (err) {
                            //            GDlg.alert("jres:25030452", //RC 25030452 : Chyba
                            //                "jres:31400046".format(ic));  //RC 31400046 : Selhalo získávání informací pro IČ {0}.
                            //            return $.Deferred().reject("jres:31400046".format(ic)); //RC 31400046 : Selhalo získávání informací pro IČ {0}.
                            //        })
                            //        .then(function (data) {
                            //            if (!data || data.length !== 1 || !data[0]) {
                            //                GDlg.alert("jres:25030452", //RC 25030452 : Chyba
                            //                    "jres:31400047".format(ic)); //RC 31400047 : Nalezena adekvátní data pro IČ {0}.
                            //                return $.Deferred().reject("jres:31400047".format(ic)); //RC 31400047 : Nalezena adekvátní data pro IČ {0}.
                            //            }
                            //            return data[0];
                            //        });
                            //};
                            formObject._initForm = function () {
                                /// <summary>
                                /// Nastaví výchozí hodnoty, validátory a onChangeListener, který zobrazuje odlišnost hodnoty políčka od hodnoty z Ares.
                                /// </summary>
                                const fields = formObject.formDiv.findFields();
                                if (formObject.initialValues) {
                                    formObject.initialValues.cislo = Gordic.Gui.WebControls.GPublicUserRegForm
                                        .getStreetNumber(formObject.initialValues.cPop, formObject.initialValues.cOr);
                                    fields.gfield("model", "apply", formObject.initialValues, {
                                        initialValues: true
                                    });
                                    // Skryti nepotrebnych policek formulare, nastaveni vychozich hodnot a validatoru.
                                    formObject._adjustForm(formObject.initialValues.typEsu !== null ? formObject.initialValues.typEsu : undefined);
                                }
                                if (formObject.validators) {
                                    //// 08.08.2019 - TFeik
                                    //// Validator na IC(O) řídím sám přímo na políčku.
                                    //(formObject.validators as any).ic = undefined;
                                    fields.gfield("model", "validators", formObject.validators);
                                    Gordic.Utils.Form.markRequired(formObject.formDiv);
                                }
                            };
                            formObject.apply = function (formData, fields, flags) {
                                /// <summary>
                                /// Nastaví data do formuláře a složí číslo domu a jméno uživatele z několika políček do jedné (cislo, celeJmeno).
                                /// </summary>
                                /// <param name="formData" type="type">Objekt hodnot, které se uloží do formuláře.</param>
                                /// <param name="fields" type="type">Políčka, do kterých se data nastavují. Pokud není vyplněno pak se použijí všechny políčka formuláře.</param>
                                /// <param name="flags" type="type">Příznaky.</param>
                                //formData.cislo = formObject._setCisloPopOr(formData.cPop, formData.cOr);
                                //formData.celeJmeno = formObject._setCeleJmeno(formData.titulPred, formData.jmeno, formData.prijmeni, formData.titulZa);
                                if (!fields) {
                                    fields = formObject.formDiv.findFields();
                                }
                                if (flags) {
                                    fields.gfield("model", "apply", formData, flags);
                                }
                                else {
                                    fields.gfield("model", "apply", formData);
                                }
                            };
                            /*formObject.collect = function (result, fields) {*/
                            formObject.collect = function () {
                                //if (!fields) {
                                //    fields = formObject.formDiv.findFields();
                                //}
                                //fields.gfield("model", "collect", result);
                                return Gordic.Prefabs.GStringBox.updateChiperPublicKeys(formObject.formDiv)
                                    .then(() => {
                                    if (!Gordic.Utils.WidgetExists('gform', formObject.formDiv)) {
                                        return $.Deferred().reject().promise();
                                    }
                                    const result = {};
                                    formObject.formDiv.findFields().gfield("model", "collect", result);
                                    return result;
                                });
                            };
                            //#endregion
                            // Vytvoření a inicializace formuláře.
                            formObject._createForm();
                            formObject._initForm();
                            deferred.resolve(formObject);
                        });
                    }
                    //// 12.08.2019 - TFeik
                    //// Napřed si načtu data pro šifrování hesla.
                    //GLoginUtils.GetCipherPublicKey()
                    //    .done(function (cipherPublicKey) {
                    //        RsaParamsPublic = cipherPublicKey;
                    loadPublicLoginConfig();
                    //    });
                    //return formObject;
                    return deferred.promise();
                }
                /**
                 * Vrátí číslo domu obsahující číslo popisné a číslo orientační, oddělené lomítkem.
                 *
                 * @author  tfeik
                 * @date    21.12.2017
                 *
                 * @param {number|string} cPop Číslo popisné.
                 * @param {number|string} cOr Číslo oriantační.
                 * @returns {string} Číslo popisné, nebo kombinace Číslo popisné/Číslo oriantační.
                 */
                static getStreetNumber(cPop, cOr) {
                    if (cPop) {
                        return cOr ? cPop.toString() + "/" + cOr.toString() : cPop.toString();
                    }
                    else {
                        return null;
                    }
                }
            }
            WebControls.GXrgPublicUserRegForm = GXrgPublicUserRegForm;
        })(WebControls = Gui.WebControls || (Gui.WebControls = {}));
    })(Gui = Gordic.Gui || (Gordic.Gui = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gui.WebControls.GRegPagePublicDlg.ts                 </Name>
//    <Description> Registrace veřejného uživatele a obnovení zapomenutého hesla.   </Description>
//    <Author>      TFeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-03-27                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Gui;
    (function (Gui) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * GChangePasswordDlg
             *
             * @author  TFeik
             * @since   482.1.0.457
             */
            let GRegPagePublicDlg = class GRegPagePublicDlg extends Gordic.GContentBase {
                ///**
                // * Username
                // * @type {string}
                // */
                //private Username?: string
                /**
                 * Vytvoří formulář, přidá jej do contentu, nastaví validátory a inicializuje reCaptchu.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 */
                onContentReady() {
                    this.beginOperation();
                    // Inicializace reCaptcha.
                    this.ReCaptcha = new Api.GReCaptcha(this.register.bind(this), this.element);
                    const formParams = $.extend({
                        layoutDescriptor: "L1M1S1, L-3-4-5, M-4-8-0, S-12-12-0, breaks-300-800",
                        container: this.element,
                        cipherPublicKey: this.CipherPublicKey,
                        isGinisUser: true,
                        showUseSmsNotificationsField: this.IsSmsGatewayEnabled
                    }, this.Data);
                    // 14.08.2018 - TFeik
                    // Prepracovani funkce create na promis abych zajistil radne nacteni configu.
                    const content = this;
                    Gordic.Gui.WebControls.GPublicUserRegForm.create(formParams)
                        .done(function (regFormObjectRetVal) {
                        content.RegFormObject = regFormObjectRetVal;
                        // 13.07.2017 - Zobrazení registračního formuláře ořes celou obrazovku a na střed.
                        //              Požadavek KUKV.
                        // Tomáš Feik
                        $('.g-login__static')
                            .addClass("g-login__full_screen");
                        $('.g-login__main')
                            .addClass("g-login__full_screen");
                        content.endOperation();
                    });
                }
                /**
                 * Zvaliduje formular a provede overeni uzivatele pomoci Google reCaptcha.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 */
                registerCheckCapcha() {
                    if (this.ReCaptcha && this.RegFormObject && this.RegFormObject.isValid()) {
                        this.ReCaptcha.execute();
                    }
                }
                /**
                 * Zvaliduje formulář a zavolá serverovou metodu RegisterUser pro zaregistrování veřejného uživatele.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 *
                 * @param {string} reCaptchaToken Token reCaptcha validace.
                 */
                register(reCaptchaToken) {
                    const regFormObject = this.RegFormObject;
                    // Kontrola validnosti fomulare.
                    if (!regFormObject || !regFormObject.isValid()) {
                        return;
                    }
                    this.beginOperation();
                    // 01.04.2020 - TFeik
                    // Přidána aktualizace širovacího klíče pro heslo.
                    regFormObject
                        .collect()
                        .then((userData) => {
                        $.each(userData, function (key, value) {
                            // otrimování textových polí
                            if (typeof value === "string"
                                && key !== "heslo"
                                && key !== "overeniHesla") {
                                userData[key] = value?.trim();
                            }
                        });
                        this.call("RegisterUser", {
                            userData: userData,
                            reCaptchaToken: reCaptchaToken
                        })
                            .done((data) => {
                            // Vypsání flash message informující o úspěšné registraci a vrácení se zpět na přihlašovací formulář.
                            this.element
                                .trigger("flashmessage", {
                                id: "registrationFlash",
                                label: "jres:31400055".format(userData.email ?? ''), //RC 31400055 : Registrace proběhla úspěšně. Na emailovou adresu {0} byl odeslán email pro potvrzení registrace.
                                state: "success"
                            })
                                .trigger("gwalkthroughback");
                            // 13.07.2017 - Zobrazení registračního formuláře ořes celou obrazovku a na střed.
                            //              Požadavek KUKV.
                            //              Navrácení okna do původního stavu při odchodu z registra4ního formuláře.
                            // Tomáš Feik
                            $('.g-login__static')
                                .removeClass("g-login__full_screen");
                            $('.g-login__main')
                                .removeClass("g-login__full_screen");
                        })
                            .fail((data) => {
                            // Vypsání flash message informující o neúspěšné registraci nebo zobrazení chyb serverových validátorů.
                            const form = regFormObject?.formDiv;
                            // 24.01.2024 - TFeik
                            // ValidationResult je na jiném místě než dříve.
                            //const validationResult = data?.responseJSON?.validationResult;
                            const validationResult = data?.validationResult;
                            if (validationResult && Gordic.Utils.WidgetExists('gform', form)) {
                                form.findFields()
                                    .gfield("model", "validations", validationResult);
                            }
                            else {
                                this.element.trigger("flashmessage", {
                                    id: "registrationFlash",
                                    label: "jres:31400056", //RC 31400056 : Registrace selhala.
                                    state: "error"
                                });
                            }
                        })
                            .always(() => {
                            this.endOperation();
                        });
                    }, () => {
                        this.endOperation();
                    });
                }
            };
            GRegPagePublicDlg = __decorate([
                gcontent
            ], GRegPagePublicDlg);
            WebControls.GRegPagePublicDlg = GRegPagePublicDlg;
        })(WebControls = Gui.WebControls || (Gui.WebControls = {}));
    })(Gui = Gordic.Gui || (Gordic.Gui = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gui.WebControls.GRegPagePublicDlg.ts                 </Name>
//    <Description> Registrace veřejného uživatele a obnovení zapomenutého hesla.   </Description>
//    <Author>      TFeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-03-27                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Gui;
    (function (Gui) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            /**
             * GChangePasswordDlg
             *
             * @author  PHorsak
             * @since   482.1.0.457
             */
            let GXrgRegPagePublicDlg = class GXrgRegPagePublicDlg extends Gordic.GContentBase {
                ///**
                // * Username
                // * @type {string}
                // */
                //private Username?: string
                /**
                 * Vytvoří formulář, přidá jej do contentu, nastaví validátory a inicializuje reCaptchu.
                 *
                 * @author  PHorsak
                 * @date    10.04.2017
                 */
                onContentReady() {
                    this.beginOperation();
                    // Inicializace reCaptcha.
                    this.ReCaptcha = new Api.GReCaptcha(this.register.bind(this), this.element);
                    const formParams = $.extend({
                        layoutDescriptor: "L1M1S1, L-3-4-5, M-4-8-0, S-12-12-0, breaks-300-800",
                        container: this.element
                    }, this.Data);
                    const content = this;
                    Gordic.Gui.WebControls.GXrgPublicUserRegForm.create(formParams)
                        .done(function (regFormObjectRetVal) {
                        content.RegFormObject = regFormObjectRetVal;
                        $('.g-login__static')
                            .addClass("g-login__full_screen");
                        $('.g-login__main')
                            .addClass("g-login__full_screen");
                        content.endOperation();
                    });
                }
                /**
                 * Zvaliduje formular a provede overeni uzivatele pomoci Google reCaptcha.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 */
                registerCheckCapcha() {
                    if (this.ReCaptcha && this.RegFormObject && this.RegFormObject != null) { //.isValid()) {
                        this.ReCaptcha.execute();
                    }
                }
                /**
                 * Zvaliduje formulář a zavolá serverovou metodu RegisterUser pro zaregistrování veřejného uživatele.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 *
                 * @param {string} reCaptchaToken Token reCaptcha validace.
                 */
                register(reCaptchaToken) {
                    //this.RegFormObject.checkAdresAtRuian(); return;
                    const content = this;
                    // Kontrola validnosti fomulare.
                    if (content.RegFormObject != null) { //&& content.RegFormObject.isValid()) {
                        //const userData: any = {};
                        //content.RegFormObject.collect(userData);
                        //$.each(userData, function (key, value) {
                        //    // otrimování textových polí
                        //    if (typeof value === "string"
                        //        && key !== "heslo"
                        //        && key !== "overeniHesla"
                        //    ) {
                        //        userData[key] = $.trim(value);
                        //    }
                        //});
                        //var userData: any = {};
                        //this.RegFormObject?.collect(userData);
                        content.RegFormObject.collect().then((userData) => {
                            if (userData) {
                                var subject = {
                                    /* Password: userData.heslo ? CryptoJS.SHA256(userData.heslo).toString() : null,*/
                                    Password: userData.heslo ? userData.heslo : null,
                                    Ico: userData.ic ? userData.ic : null,
                                    Name: (userData.prijmeni != null ? userData.prijmeni : "") + " " + (userData.jmeno != null ? userData.jmeno : ""),
                                    Shortcut: userData.uzivatelskeJmeno ? userData.uzivatelskeJmeno : null,
                                    Login: userData.uzivatelskeJmeno ? userData.uzivatelskeJmeno : null,
                                    Email: userData.email ? userData.email : null,
                                    Firm: userData.obchodniJmeno ? userData.obchodniJmeno : null,
                                    Active: true,
                                    Created: new Date()
                                };
                                new GContent("Gordic.Xrg.WebPortal.GXrgCommonService").call("RegisterNewSubject", { subject: subject, reCaptchaToken: reCaptchaToken })
                                    //.then(function (result) {
                                    //})
                                    .then(function () {
                                    if (subject.Email != null)
                                        new GContent("Gordic.Xrg.WebPortal.GXrgCommonService").call("SendValidationEmail", { email: subject.Email }).done(function () {
                                            content.element
                                                .trigger("flashmessage", {
                                                id: "registrationFlash",
                                                label: "Registrace proběhla úspěšně. Na Váš email byla odeslána potvrzovací zpráva. Po ověření emailu se můžete přihlásit ke svému účtu.", //RC 31400055 : Registrace proběhla úspěšně. 
                                                customClass: Gordic.Global.Enums.ColorStateClass.success
                                            })
                                                .trigger("gwalkthroughback");
                                        });
                                }).fail(function () {
                                    content.element
                                        .trigger("flashmessage", {
                                        id: "registrationFailedFlash",
                                        label: "Registrace se nezdařila. Účet s tímto přihlašovacím jménem již existuje.", //RC 31400055 : Registrace proběhla úspěšně. 
                                        customClass: Gordic.Global.Enums.ColorStateClass.error
                                    })
                                        .trigger("gwalkthroughback");
                                });
                            }
                        });
                        //new GContent("Gordic.Xrg.WebPortal.GXrgCommonService").call("CreateSubject", { subject: userData });
                        //content.beginOperation();
                        //content.call("RegisterUser", {
                        //    userData: userData,
                        //    reCaptchaToken: reCaptchaToken
                        //})
                        //    .done(function (data) {
                        //        // Vypsání flash message informující o úspěšné registraci a vrácení se zpět na přihlašovací formulář.
                        //        content.element
                        //            .trigger("flashmessage", {
                        //                id: "registrationFlash",
                        //                label: "jres:31400055".format(userData.email), //RC 31400055 : Registrace proběhla úspěšně. Na emailovou adresu {0} byl odeslán email pro potvrzení registrace.
                        //                customClass: "g-state-success"
                        //            })
                        //            .trigger("gwalkthroughback");
                        //        // 13.07.2017 - Zobrazení registračního formuláře ořes celou obrazovku a na střed.
                        //        //              Požadavek KUKV.
                        //        //              Navrácení okna do původního stavu při odchodu z registra4ního formuláře.
                        //        // Tomáš Feik
                        //        $('.g-login__static')
                        //            .removeClass("g-login__full_screen");
                        //        $('.g-login__main')
                        //            .removeClass("g-login__full_screen");
                        //    })
                        //    .fail(function (data) {
                        //        // Vypsání flash message informující o neúspěšné registraci nebo zobrazení chyb serverových validátorů.
                        //        if (data.responseJSON.validationResult && content.RegFormObject) {
                        //            content.RegFormObject.formDiv.findFields()
                        //                .gfield("model", "validations", data.responseJSON.validationResult);
                        //        }
                        //        else {
                        //            content.element.trigger("flashmessage", {
                        //                id: "registrationFlash",
                        //                label: "jres:31400056", //RC 31400056 : Registrace selhala.
                        //                customClass: "g-state-error"
                        //            });
                        //        }
                        //    })
                        //    .always(function () {
                        //        content.endOperation();
                        //    });
                    }
                }
            };
            GXrgRegPagePublicDlg = __decorate([
                gcontent
            ], GXrgRegPagePublicDlg);
            WebControls.GXrgRegPagePublicDlg = GXrgRegPagePublicDlg;
        })(WebControls = Gui.WebControls || (Gui.WebControls = {}));
    })(Gui = Gordic.Gui || (Gordic.Gui = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gui.WebControls.RegPagePublicDlg.js                  </Name>
//    <Description> Změna osobních údajů veřejného uživatele.                   </Description>
//    <Author>      tfeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-03-27                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Gui;
    (function (Gui) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            let ActionNames;
            (function (ActionNames) {
                ActionNames["savePublicUserInfo"] = "actSavePublicUserInfo";
                ActionNames["requestConfirmEmail"] = "actRequestConfirmEmail";
            })(ActionNames || (ActionNames = {}));
            /**
             * GChangePublicUserInfoDlg
             *
             * @author  TFeik
             * @since   482.1.0.457
             */
            let GChangePublicUserInfoDlg = class GChangePublicUserInfoDlg extends Gordic.GContentBase {
                /**
                 * Vytvoří formulář, přidá jej do contentu a nastaví validátory.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 */
                onContentReady() {
                    //if (!Gordic.Utils.GString.IsNullOrWhiteSpace(this.PersonalInformationRestrictionMessage)) {
                    //    this.showFlash(
                    //        this.PersonalInformationRestrictionMessage,
                    //        Gordic.Global.Enums.ColorStateClass.warning
                    //    );
                    //}
                    if (this.FormConfig?.initialValues?.RegistrationType === 3 /* General.ApplicationInterface.PublicUserLoginRegistrationTypeEnum.EIdentita */) {
                        this.showFlash({
                            id: 'niaInfo',
                            label: 'jres:32100348', //RC 32100348 : Needitovatelné údaje jsou přebírány z registrů NIA - Národní identitní autority.
                            state: 'info'
                        });
                    }
                    this.CreateMenu();
                    // 14.08.2018 - TFeik
                    // Prepracovani funkce create na promis abych zajistil radne nacteni configu.
                    Gordic.Gui.WebControls.GPublicUserRegForm.create($.extend({
                        name: 'ChangePublicUserInfoForm',
                        container: this.element
                        //cipherPublicKey: this.CipherPublicKey,
                        //isGinisUser: this.IsGinisUser
                    }, {
                        cipherPublicKey: this.CipherPublicKey,
                        isGinisUser: this.IsGinisUser,
                        layoutDescriptor: 'L2M2S1'
                    }, this.FormConfig))
                        .then((regFormObjectRetVal) => {
                        this.RegFormObject = regFormObjectRetVal;
                    });
                }
                /**
                 * SaveUserInfo
                 *
                 * @author  TFeik
                 * @date    27.07.2021
                 *
                 * @param {GPublicUserDto} userDto
                 * @returns {JQuery.Promise<SaveUserInfoRetVal>}
                 */
                SaveUserInfo(userDto) {
                    const content = this;
                    content.beginOperation("jres:32100164"); //RC 32100164 : Ukládám osobní údaje.
                    const deferred = $.Deferred();
                    function call(saveAnyway) {
                        // Ulozeni dat z formulare.
                        content.call("SaveUserInfo", {
                            userDto: userDto,
                            saveAnyway: saveAnyway
                        })
                            .done((retVal) => {
                            const question = retVal?.result?.data?.Question?.trim();
                            if (question) {
                                content.dialogs.confirm("jres:25030450", question) //RC 25030450 : Upozornění
                                    .on("close", function (questionRetVal) {
                                    if (questionRetVal && questionRetVal.returnValue === "yes") {
                                        call(true);
                                    }
                                    else {
                                        deferred.resolve({
                                            canceledByUser: true
                                        });
                                    }
                                });
                            }
                            else {
                                deferred.resolve({});
                            }
                        })
                            .fail((data) => {
                            // Vypsání flash message informující o neúspěšné změně osobních údajů nebo zobrazení chyb serverových validátorů.
                            const form = content?.RegFormObject?.formDiv;
                            // 24.01.2024 - TFeik
                            // ValidationResult je na jiném místě než dříve.
                            //const validationResult = data?.responseJSON?.validationResult;
                            const validationResult = data?.validationResult;
                            if (validationResult && Gordic.Utils.WidgetExists('gform', form)) {
                                $.each(validationResult, function (errorGroupKey, errorGroup) {
                                    if (errorGroup.length > 0) {
                                        $.each(errorGroup, function (errorKey, error) {
                                            error.message += " jres:32100152"; //RC 32100152 : Opravte chybu a znovu zkuste uložit znovu.
                                        });
                                    }
                                });
                                form.findFields()
                                    .gfield("model", "validations", validationResult);
                            }
                            deferred.reject();
                        })
                            .always(() => {
                            // Odemknutí contentu (skrytí motátka).
                            content.endOperation();
                        });
                    }
                    call();
                    return deferred.promise();
                }
                /**
                 * Zvaliduje formulář a zavolá metodu SaveUserInfo pro uložení osobních údajů uživatele.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 */
                UlozDataUzivatele(showSuccesFlashMessages = false) {
                    const deferred = $.Deferred();
                    const flashMessageId = "ChangePublicUserInfoFlash";
                    const regFormObject = this.RegFormObject;
                    // Kontrola validnosti fomulare.
                    if (!regFormObject || !regFormObject.isValid()) {
                        return deferred.reject().promise();
                    }
                    // 01.04.2020 - TFeik
                    // Přidána aktualizace širovacího klíče pro heslo.
                    regFormObject
                        .collect()
                        .then((formData) => {
                        // 05.09.2019 - TFeik
                        // Přepracování volání ulo6ení údajů tak, aby bylo možné zpracovávat upozornění ze serveru 
                        // aby se uživatel mohl rozhodnout, zda chce údaje i tak uložit.
                        this.SaveUserInfo(formData)
                            .done((retVal) => {
                            if (retVal?.canceledByUser) {
                                this.showFlash("jres:32100163", //RC 32100163 : Změna osobních údajů přerušena uživatelem.
                                "error", flashMessageId);
                                deferred.reject();
                                return;
                            }
                            if (showSuccesFlashMessages) {
                                // Vypsání flash message informující o úspěšné změně osobních údajů.
                                this.showFlash("jres:32100151", //RC 32100151 : Osobní údaje byly úspěšně změněny.
                                "success", flashMessageId);
                            }
                            deferred.resolve();
                        })
                            .fail(() => {
                            this.showFlash("jres:32100153", //RC 32100153 : Změna osobních údajů selhala.
                            "error", flashMessageId);
                            deferred.reject();
                        });
                    });
                    return deferred.promise();
                }
                /**
                 * RequestConfirmEmail
                 *
                 * @author  TFeik
                 * @date    27.07.2021
                 *
                 * @returns {JQuery.Promise<boolean>}
                 */
                RequestConfirmEmail() {
                    return this.call('RequestConfirmEmail');
                }
                /**
                 * PozadatOPotvrzeniEmailu
                 *
                 * @author  TFeik
                 * @date    27.07.2021
                 *
                 * @returns {JQuery.Promise<undefined>}
                 */
                PozadatOPotvrzeniEmailu() {
                    const regForm = this.RegFormObject;
                    if (!regForm || !regForm.isValid()) {
                        return $.Deferred().reject().promise();
                    }
                    this.beginOperation();
                    return regForm
                        .collect()
                        .then((publicUser) => {
                        const email = publicUser.email?.trim();
                        if (!email) {
                            return $.Deferred().reject().promise();
                        }
                        return this.UlozDataUzivatele()
                            .then(() => {
                            return this.RequestConfirmEmail()
                                .then((output) => {
                                if (!output) {
                                    return $.Deferred().reject().promise();
                                }
                                this.showFlash('jres:32100249'); //RC 32100249 : Potvrzovací email byl odeslán.
                            })
                                .done(() => {
                                this.endOperation();
                            });
                        });
                    })
                        .fail(() => {
                        this.endOperation();
                    });
                }
                /**
                 * Vytvoří menu.
                 *
                 * @author  TFeik
                 * @date    11.10.2019
                 */
                CreateMenu() {
                    const content = this;
                    this.actions.addRange([
                        new GAction($.extend({}, Gordic.Prefabs.Icons.IconToActionParams(Gordic.Prefabs.Icons.Ulozit()), {
                            name: ActionNames.savePublicUserInfo,
                            run: function () {
                                this.setPending(content.UlozDataUzivatele());
                            }
                        })),
                        new GAction({
                            name: ActionNames.requestConfirmEmail,
                            caption: 'jres:32100251', //RC 32100251 : Potvrdit email
                            run: function () {
                                this.setPending(content.PozadatOPotvrzeniEmailu());
                            },
                            permission: this.CanRequestConfirmEmail
                        }),
                        new GAction(Gordic.Prefabs.Actions.ZavritContent())
                    ]);
                    // Horní menu.
                    this.menuBar(this.actions.createBar([
                        {
                            action: this.actions[ActionNames.requestConfirmEmail],
                            favorite: true
                        }
                    ]));
                    // Dolní menu.
                    this.commandBar(this.actions.createBar([
                        {
                            action: this.actions[ActionNames.savePublicUserInfo],
                            primary: true
                        },
                        {
                            action: this.actions[Gordic.Prefabs.Actions.Names.ZavritContent]
                        }
                    ]));
                }
            };
            GChangePublicUserInfoDlg = __decorate([
                gcontent
            ], GChangePublicUserInfoDlg);
            WebControls.GChangePublicUserInfoDlg = GChangePublicUserInfoDlg;
        })(WebControls = Gui.WebControls || (Gui.WebControls = {}));
    })(Gui = Gordic.Gui || (Gordic.Gui = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gui.WebControls.GChangePasswordDlg.ts                </Name>
//    <Description> Změna hesla veřejného uživatele.                            </Description>
//    <Author>      TFeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-04-10                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Gui;
    (function (Gui) {
        var WebControls;
        (function (WebControls) {
            var GChangePasswordDlg_1;
            const { gcontent } = Decorators;
            let FieldNames;
            (function (FieldNames) {
                FieldNames["puvodniHeslo"] = "puvodniHeslo";
                FieldNames["overeniHesla"] = "overeniHesla";
                FieldNames["heslo"] = "heslo";
            })(FieldNames || (FieldNames = {}));
            /**
             * GChangePasswordDlg
             *
             * @author  TFeik
             * @since   482.1.0.457
             */
            let GChangePasswordDlg = GChangePasswordDlg_1 = class GChangePasswordDlg extends Gordic.GContentBase {
                /**
                 * Vytvoří formulář, přidá jej do contentu a nastaví validátory.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 */
                onContentReady() {
                    this.beginOperation();
                    // Vytvoření formuláře.
                    this.$Form = GChangePasswordDlg_1.createForm(this.element);
                    // Nastavení validátorů.
                    this.$Form.findFields().gfield("model", "validators", this.ChangePasswordFormValidators);
                    Gordic.Utils.Form.markRequired(this.$Form);
                    // Vytvoření menu.
                    this.createMenu();
                    this.endOperation();
                }
                /**
                 * Vytvoří menu.
                 *
                 * @author  TFeik
                 * @date    29.07.2019
                 */
                createMenu() {
                    const content = this;
                    // Dolní menu.
                    const commandBarPole = [];
                    commandBarPole.push({
                        action: content.actions.add(new GAction({
                            name: "actChangePassword",
                            caption: "jres:31400060", //RC 31400060 : Změnit heslo
                            tooltip: "jres:31400060", //RC 31400060 : Změnit heslo
                            icon: Gordic.Prefabs.Icons.Ulozit().icon,
                            run: function () {
                                this.setPending(content.changePassword());
                            }
                        })),
                        primary: true
                    });
                    commandBarPole.push({
                        action: content.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
                    });
                    content.commandBar(content.actions.createBar(commandBarPole));
                }
                /**
                 * Zvaliduje formulář a zavolá serverovou metodu ChangePassword.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 */
                changePassword() {
                    const content = this;
                    // Kontrola validnosti fomuláře.
                    if (!Gordic.Utils.WidgetExists("gform", content.$Form) || !content.$Form.gform("isValid")) {
                        return $.Deferred().reject().promise();
                    }
                    content.beginOperation();
                    // 01.04.2020 - TFeik
                    // Přidána aktualizace širovacího klíče pro heslo.
                    return Gordic.Prefabs.GStringBox.updateChiperPublicKeys(content.$Form)
                        .then(() => {
                        if (!Gordic.Utils.WidgetExists('gform', content.$Form)) {
                            return $.Deferred().reject().promise();
                        }
                        const dto = {};
                        content.$Form.findFields().gfield("model", "collect", dto);
                        return content.call("ChangePassword", {
                            formData: dto
                        })
                            .done(function () {
                            // Vypsání flash message informující o úspěšné změně hesla.
                            content.showFlash("jres:32100144", //RC 32100144 : Změna hesla proběhla úspěšně.
                            "success", "ChangePasswordFlash");
                        })
                            .fail(function (data) {
                            // Vypsání flash message informující o neúspěšné změně hesla nebo
                            // zobrazení chyb serverových validátorů.
                            if (data?.responseJSON?.validationResult) {
                                $.each(data.responseJSON.validationResult, function (errorGroupKey, errorGroup) {
                                    if (errorGroup.length > 0) {
                                        $.each(errorGroup, function (errorKey, error) {
                                            error.message += " " + "jres:32100146"; //RC 32100146 : Opravte chybu a heslo změnit znovu.
                                        });
                                    }
                                });
                                if (Gordic.Utils.WidgetExists("gform", content.$Form)) {
                                    content.$Form.findFields()
                                        .gfield("model", "validations", data.responseJSON.validationResult);
                                }
                            }
                            else {
                                console.error("ChangePassword Failed");
                                content.showFlash("jres:32100145", //RC 32100145 : Změna hesla selhala.
                                "error", "ChangePasswordFlash");
                            }
                        })
                            .always(function () {
                            content.endOperation();
                        });
                    }, () => {
                        content.endOperation();
                        return undefined;
                    });
                }
                /**
                 * Vytvoří formulář.
                 *
                 * @author  TFeik
                 * @date    05.08.2019
                 *
                 * @param {JQuery<HTMLElement>} appendTo
                 * @returns {JQuery<HTMLElement>}
                 */
                static createForm(appendTo) {
                    // Vytvoření formuláře.
                    const formBuilder = new Gordic.Forms.Form({
                        name: "changePasswordForm",
                        layoutDescriptor: "L1M1S1"
                    })
                        // Sekce 
                        .addSection()
                        .addRow("jres:31400062") //RC 31400062 : Staré heslo
                        .addField("gstringbox", Gordic.Prefabs.GStringBox.password({
                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                    }), {
                        name: FieldNames.puvodniHeslo,
                        model: "model." + "puvodniHeslo" /* GChangePasswordFormDtoNames.puvodniHeslo */ + " = value"
                    })
                        .addRow("jres:31400063") //RC 31400063 : Nové heslo
                        .addField("gstringbox", Gordic.Prefabs.GStringBox.password({
                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                    }), {
                        name: FieldNames.heslo,
                        model: "model." + "heslo" /* GChangePasswordFormDtoNames.heslo */ + " = value"
                    })
                        .addRow("jres:31400026") //RC 31400026 : Ověření hesla
                        .addField("gstringbox", Gordic.Prefabs.GStringBox.passwordReEnter({
                        passwordFieldName: FieldNames.heslo,
                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                    }), {
                        name: FieldNames.overeniHesla,
                        model: "model." + "overeniHesla" /* GChangePasswordFormDtoNames.overeniHesla */ + " = value"
                    });
                    // Přidání formuláře do DOMu.
                    const result = $("<div>")
                        .appendTo(appendTo)
                        .gform("createFrom", formBuilder);
                    // 16.11.2021 - TFeik
                    // Upravení autocomplete atributu dle applu.
                    // https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element
                    // https://phabricator.gordic.cz/T15804
                    $('input', result.findFields(FieldNames.puvodniHeslo))
                        .attr('autocomplete', 'current-password');
                    $('input', result.findFields(FieldNames.heslo))
                        .attr('autocomplete', 'new-password');
                    $('input', result.findFields(FieldNames.overeniHesla))
                        .attr('autocomplete', 'new-password');
                    return result;
                }
            };
            GChangePasswordDlg = GChangePasswordDlg_1 = __decorate([
                gcontent
            ], GChangePasswordDlg);
            WebControls.GChangePasswordDlg = GChangePasswordDlg;
        })(WebControls = Gui.WebControls || (Gui.WebControls = {}));
    })(Gui = Gordic.Gui || (Gordic.Gui = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gui.WebControls.GNewPasswordDlg.ts                   </Name>
//    <Description> Nastavení nového hesla veřejného uživatele po jeho obnovení (zapomenutí).</Description>
//    <Author>      TFeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-04-10                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Gui;
    (function (Gui) {
        var WebControls;
        (function (WebControls) {
            var GNewPasswordDlg_1;
            const { gcontent } = Decorators;
            /**
             * GNewPasswordDlg
             *
             * @author  TFeik
             * @since   482.1.0.457
             */
            let GNewPasswordDlg = GNewPasswordDlg_1 = class GNewPasswordDlg extends Gordic.GContentBase {
                /**
                 * Vytvoří formulář, přidá jej do contentu a nastaví validátory.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 *
                 * @param {GNewPasswordDlg} this
                 */
                onContentReady() {
                    this.beginOperation();
                    // Inicializace reCaptcha.
                    this.ReCaptcha = new Api.GReCaptcha(this.newPassword.bind(this), this.element);
                    // Přidání formuláře do DOMu.
                    this.$Form = GNewPasswordDlg_1.createForm(this.element);
                    // Nastavení validátorů.
                    this.$Form.findFields().gfield("model", "validators", this.NewPasswordFormValidators);
                    Gordic.Utils.Form.markRequired(this.$Form);
                    // Vytvoření menu.
                    this.createMenu();
                    this.endOperation();
                }
                /**
                 * Zvaliduje formulář a provede ověření uživatele pomocí Google reCaptcha.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 */
                registerCheckCapcha() {
                    if (Gordic.Utils.WidgetExists("gform", this.$Form) && this.$Form.gform("isValid") && this.ReCaptcha) {
                        this.ReCaptcha.execute();
                    }
                }
                /**
                 * Zvaliduje formulář a zavolá serverovou metodu SetNewPassword pro nastavení nového hesla.
                 *
                 * @author  TFeik
                 * @date    10.04.2017
                 *
                 * @param {string} [token] Token reCaptcha validace.
                 */
                newPassword(token) {
                    const content = this;
                    // Kontrola validnosti fomuláře.
                    if (!Gordic.Utils.WidgetExists("gform", content.$Form) || !(content.$Form.gform("isValid"))) {
                        return $.Deferred().reject().promise();
                    }
                    content.beginOperation();
                    // 01.04.2020 - TFeik
                    // Přidána aktualizace širovacího klíče pro heslo.
                    return Gordic.Prefabs.GStringBox.updateChiperPublicKeys(content.$Form)
                        .then(() => {
                        if (!Gordic.Utils.WidgetExists('gform', content.$Form)) {
                            return $.Deferred().reject().promise();
                        }
                        const formData = { reCaptchaToken: token };
                        content.$Form.findFields().gfield("model", "collect", formData);
                        content.call("SetNewPassword", { formData: formData })
                            .done(function (result) {
                            // Vypsání flash message informující o úspěšném nastavení hesla.
                            content.element.trigger("flashupdate", {
                                id: "NewPasswordFlash",
                                label: "jres:32100149", //RC 32100149 : Nastavení nového hesla proběhlo úspěšně.
                                customClass: Gordic.Global.Enums.ColorStateClass.success
                            });
                            content.element.trigger("gwalkthroughback");
                        })
                            .fail(function (data) {
                            // Vypsání flash message informující o neúspěšném nastavení hesla nebo zobrazení chyb serverových validátorů.
                            if (data?.responseJSON?.validationResult && Gordic.Utils.WidgetExists("gform", content.$Form)) {
                                $.each(data.responseJSON.validationResult, function (errorGroupKey, errorGroup) {
                                    if (errorGroup.length > 0) {
                                        $.each(errorGroup, function (errorKey, error) {
                                            error.message += " " + "jres:32100146"; //RC 32100146 : Opravte chybu a heslo změnit znovu.
                                        });
                                    }
                                });
                                content.$Form.findFields()
                                    .gfield("model", "validations", data.responseJSON.validationResult);
                            }
                            else {
                                console.error("SetNewPassword Failed");
                                content.element.trigger("flashupdate", {
                                    id: "NewPasswordFlash",
                                    label: "jres:32100148", //RC 32100148 : Nastavení nového hesla selhalo.
                                    customClass: Gordic.Global.Enums.ColorStateClass.error
                                });
                            }
                        })
                            .always(function () {
                            // Odemknutí contentu (skrytí motátka).
                            content.endOperation();
                        });
                    }, () => {
                        content.endOperation();
                        return undefined;
                    });
                }
                /**
                 * Vytvoří menu.
                 *
                 * @author  TFeik
                 * @date    05.08.2019
                 */
                createMenu() {
                    const content = this;
                    // Dolní menu.
                    const commandBarPole = [];
                    commandBarPole.push({
                        action: content.actions.add(new GAction({
                            name: "actNewPassword",
                            caption: "jres:31400060", //RC 31400060 : Změnit heslo
                            icon: "gi-save",
                            run: function () {
                                content.registerCheckCapcha();
                            }
                        })),
                        favorite: true,
                        primary: true
                    });
                    commandBarPole.push({
                        action: content.actions.add(new GAction({
                            name: "GResources",
                            caption: "jres:25030459", //RC 25030459 : Zavřít
                            icon: "gi-window-close",
                            run: function () {
                                this.setPending(content.tryClose());
                            }
                        })),
                        favorite: true
                    });
                    content.commandBar(content.actions.createBar(commandBarPole));
                }
                /**
                 * Vytvoří formulář.
                 *
                 * @author  TFeik
                 * @date    05.08.2019
                 *
                 * @param {JQuery<HTMLElement>} appendTo
                 * @returns {JQuery<HTMLElement>}
                 */
                static createForm(appendTo) {
                    // Vytvoření formuláře.
                    const formBuilder = new Gordic.Forms.Form({
                        name: "newPasswordForm",
                        layoutDescriptor: "L1M1S1"
                    })
                        // Sekce 
                        .addSection()
                        .addRow({
                        label: "jres:31400002", //RC 31400002 : Heslo
                        required: true
                    })
                        .addField("gstringbox", Gordic.Prefabs.GStringBox.password({
                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                    }), {
                        name: "heslo"
                    })
                        .addRow({
                        label: "jres:31400026", //RC 31400026 : Ověření hesla
                        required: true
                    })
                        .addField("gstringbox", Gordic.Prefabs.GStringBox.passwordReEnter({
                        passwordFieldName: "heslo",
                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                    }), {
                        name: "overeniHesla"
                    });
                    // Přidání formuláře do DOMu.
                    const $form = $("<div>").appendTo(appendTo).gform("createFrom", formBuilder);
                    $('<div class="gform-row required"><label></label><label>' +
                        'jres:32100147' + //RC 32100147 : značí povinné položky
                        '.</label></div>').appendTo(appendTo);
                    // 16.11.2021 - TFeik
                    // Upravení autocomplete atributu dle applu.
                    // https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element
                    // https://phabricator.gordic.cz/T15804
                    $('input', $form.findFields('heslo'))
                        .attr('autocomplete', 'new-password');
                    $('input', $form.findFields('overeniHesla'))
                        .attr('autocomplete', 'new-password');
                    return $form;
                }
            };
            GNewPasswordDlg = GNewPasswordDlg_1 = __decorate([
                gcontent
            ], GNewPasswordDlg);
            WebControls.GNewPasswordDlg = GNewPasswordDlg;
        })(WebControls = Gui.WebControls || (Gui.WebControls = {}));
    })(Gui = Gordic.Gui || (Gordic.Gui = {}));
})(Gordic || (Gordic = {}));
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gui.WebControls.GAddRepresentPublicUserDlg.ts        </Name>
//    <Description> Dialog provázání účtů veřejného uživatele.                  </Description>
//    <Author>      TFeik                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-09-03                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Gui;
    (function (Gui) {
        var WebControls;
        (function (WebControls) {
            const { gcontent } = Decorators;
            let ActionNames;
            (function (ActionNames) {
                ActionNames["AddRepresented"] = "actAddRepresented";
                ActionNames["CreateAndAddRepresented"] = "actCreateAndAddRepresented";
            })(ActionNames || (ActionNames = {}));
            let LoginFieldNames;
            (function (LoginFieldNames) {
                LoginFieldNames["login"] = "Login";
                LoginFieldNames["password"] = "Password";
            })(LoginFieldNames || (LoginFieldNames = {}));
            let NewUserFieldNames;
            (function (NewUserFieldNames) {
                NewUserFieldNames["typEsu"] = "TypEsu";
                NewUserFieldNames["ic"] = "Ic";
                NewUserFieldNames["isVatPayer"] = "IsVatPayer";
                NewUserFieldNames["dic"] = "Dic";
                NewUserFieldNames["obchodniJmeno"] = "ObchodniJmeno";
                NewUserFieldNames["typOrg"] = "TypOrg";
                NewUserFieldNames["titulPred"] = "TitulPred";
                NewUserFieldNames["titulZa"] = "TitulZa";
                NewUserFieldNames["jmeno"] = "Jmeno";
                NewUserFieldNames["prijmeni"] = "Prijmeni";
                NewUserFieldNames["datumNarozeni"] = "DatumNarozeni";
                NewUserFieldNames["ulice"] = "Ulice";
                //cislo = 'Cislo',
                NewUserFieldNames["cisloPopisne"] = "CisloPopisne";
                NewUserFieldNames["cisloOrientacni"] = "CisloOrientacni";
                NewUserFieldNames["psc"] = "Psc";
                NewUserFieldNames["obec"] = "Obec";
                NewUserFieldNames["stat"] = "Stat";
                NewUserFieldNames["email"] = "Email";
                NewUserFieldNames["telefon"] = "Telefon";
                NewUserFieldNames["useEmailNotifications"] = "UseEmailNotifications";
                NewUserFieldNames["useSmsNotifications"] = "UseSmsNotifications";
            })(NewUserFieldNames || (NewUserFieldNames = {}));
            /**
             * Dialog provázání účtů veřejného uživatele.
             *
             * @author TFeik
             * @since 486.1.0.452
             */
            let GAddRepresentPublicUserDlg = class GAddRepresentPublicUserDlg extends Gordic.GContentBase {
                /**
                 * OnContentReady.
                 *
                 * @author  TFeik
                 * @date    03.09.2021
                 */
                onContentReady() {
                    this.beginOperation();
                    // Vytvoření akcí.
                    this.CreateActions();
                    // Vytvoření menu.
                    this.CreateMenu();
                    // 06.11.2024 - TFeik
                    // Připojení existujícího účtu navázáno na parametr.
                    // https://phabricator.gordic.cz/T38104
                    if (this.IsConnectExistingAccountAvailable) {
                        // Formulář připojení existujícího účtu.
                        this.$LoginForm = $.newDiv()
                            .gform('createFrom', this.CreateLoginForm()
                            // Akce propojení účtu.
                            .addSection()
                            .addText($.newDiv().gbutton({
                            params: {
                                caption: 'jres:32100258', //RC 32100258 : Připojit
                                action: this.actions[ActionNames.AddRepresented],
                                primary: true
                            }
                        })));
                        // 16.11.2021 - TFeik
                        // Upravení autocomplete atributu dle applu.
                        // https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element
                        // https://phabricator.gordic.cz/T15804
                        $('input', this.$LoginForm.findFields(LoginFieldNames.login))
                            .attr('autocomplete', 'username');
                        $('input', this.$LoginForm.findFields(LoginFieldNames.password))
                            .attr('autocomplete', 'current-password');
                        if (this.LoginFormValidators) {
                            this.$LoginForm
                                .findFields()
                                .gfield('model', 'validators', this.LoginFormValidators);
                            Gordic.Utils.Form.markRequired(this.$LoginForm);
                        }
                        $.newDiv()
                            .appendTo(this.element)
                            .gtab({
                            title: 'jres:32100257' //RC 32100257 : Připojení existujícího účtu
                        })
                            .append(this.$LoginForm);
                    }
                    // Formulář vytvoření nového účtu.
                    this.$NewUserForm = $.newDiv()
                        .gform('createFrom', this.CreateNewUserForm()
                        // Akce propojení účtu.
                        .addSection()
                        .addText($.newDiv().gbutton({
                        params: {
                            caption: 'jres:32100256', //RC 32100256 : Vytvořit a připojit
                            action: this.actions[ActionNames.CreateAndAddRepresented],
                            primary: true
                        }
                    })));
                    if (this.NewUserFormValidators) {
                        this.$NewUserForm
                            .findFields()
                            .gfield('model', 'validators', this.NewUserFormValidators);
                        Gordic.Utils.Form.markRequired(this.$NewUserForm);
                    }
                    $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: 'jres:32100255', //RC 32100255 : Připojení nového účtu
                        opened: true
                    })
                        .append(this.$NewUserForm);
                    this.UpdateNewUserFormEnabled()
                        .always(() => {
                        this.endOperation();
                    });
                }
                /**
                 * Vytvoří akce.
                 *
                 * @author  TFeik
                 * @date    03.09.2021
                 */
                CreateActions() {
                    const content = this;
                    this.actions.addRange([
                        new GAction({
                            name: ActionNames.AddRepresented,
                            caption: 'jres:32100259', //RC 32100259 : Připojit existující účet
                            run: function () {
                                this.setPending(content.PripojitExistujiciUcet());
                            }
                        }),
                        new GAction({
                            name: ActionNames.CreateAndAddRepresented,
                            caption: 'jres:32100260', //RC 32100260 : Vytvořit a připojit nový účet
                            run: function () {
                                this.setPending(content.VytvoritAPripojitNovyUcet());
                            }
                        }),
                        new GAction(Gordic.Prefabs.Actions.ZavritContent())
                    ]);
                }
                /**
                 * Vytvoří menu.
                 *
                 * @author  TFeik
                 * @date    03.09.2021
                 */
                CreateMenu() {
                    const actions = this.actions;
                    // Dolní menu.
                    this.commandBar(actions.createBar([
                        {
                            action: actions[Gordic.Prefabs.Actions.Names.ZavritContent]
                        }
                    ]));
                }
                //#region Připojení existujícího účtu.
                /**
                 * Vytvoření vormuláře pro připojení existujícího účtu.
                 *
                 * @author  TFeik
                 * @date    06.09.2021
                 *
                 * @returns {Forms.Form}
                 */
                CreateLoginForm() {
                    return new Gordic.Forms.Form()
                        .addRow('jres:32100253') //RC 32100253 : Uživatel
                        .addField('gstringbox', {
                        name: LoginFieldNames.login,
                        model: 'model.{0} = value'.format("Login" /* GAddRepresentedPublicUserInputDtoNames.Login */),
                        spellCheck: false
                    })
                        .addRow('jres:32100254') //RC 32100254 : Heslo
                        .addField('gstringbox', Gordic.Prefabs.GStringBox.password({
                        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true
                    }), {
                        name: LoginFieldNames.password,
                        model: 'model.{0} = value'.format("Password" /* GAddRepresentedPublicUserInputDtoNames.Password */)
                    });
                }
                /**
                 * Vrátí data formuláře pro provázání existujícího účtu.
                 *
                 * @author  TFeik
                 * @date    06.09.2021
                 *
                 * @returns {JQuery.Promise<GAddRepresentedPublicUserInputDto>}
                 */
                GetLoginFormValues() {
                    const $form = this.$LoginForm;
                    if (!Gordic.Utils.WidgetExists('gform', $form) || !$form.gform('isValid')) {
                        return $.Deferred().reject().promise();
                    }
                    return Gordic.Prefabs.GStringBox.updateChiperPublicKeys($form)
                        .then(() => {
                        const values = {};
                        $form
                            .findFields()
                            .gfield('model', 'collect', values);
                        return $.Deferred().resolve(values).promise();
                    });
                }
                /**
                 * Prováže externí účet nalezený dle loginu a hesla s aktuálně přihlášeným účtem.
                 *
                 * @author  TFeik
                 * @date    03.09.2021
                 *
                 * @param {GAddRepresentedPublicUserInputDto} input
                 * @returns {JQuery.Promise<boolean>}
                 */
                AddRepresentedPublicUser(input) {
                    return this.call('AddRepresentedPublicUser', {
                        input: input
                    });
                }
                /**
                 * Prováže externí účet nalezený dle loginu a hesla s aktuálně přihlášeným účtem.
                 *
                 * @author  TFeik
                 * @date    06.09.2021
                 *
                 * @returns {JQuery.Promise<void>}
                 */
                PripojitExistujiciUcet() {
                    const flashId = 'pripojitExistujiciUcetMessage';
                    this.hideFlash(flashId);
                    return this.GetLoginFormValues()
                        .then((getLoginFormValuesReturnValues) => {
                        return this.AddRepresentedPublicUser(getLoginFormValuesReturnValues)
                            .then((addRepresentedPublicUserReturnValues) => {
                            if (addRepresentedPublicUserReturnValues === false) {
                                return $.Deferred().reject().promise();
                            }
                            this.showFlash({
                                id: flashId,
                                state: 'success',
                                label: 'jres:32100261' //RC 32100261 : Účet je úspěšně připojen.
                            });
                        });
                    })
                        .fail(() => {
                        this.showFlash({
                            id: flashId,
                            state: 'error',
                            label: 'jres:32100262' //RC 32100262 : Připojení účtu se nezdařilo.
                        });
                    });
                }
                ;
                //#endregion
                //#region Vytvořenínového účtu
                /**
                 * Vytvoří nový externí účet a prováže jej s aktuálně přihlášeným účtem.
                 *
                 * @author  TFeik
                 * @date    03.09.2021
                 *
                 * @param {GCreateAndAddRepresentedPublicUserInputDto} input
                 * @returns {JQuery.Promise<boolean>} true v případě vytvoření zástupu se založením nového uživatele, false při vytvoření zástupu za existujícího uživatele
                 */
                CreateAndAddRepresentedPublicUser(input) {
                    return this.call('CreateAndAddRepresentedPublicUser', {
                        input: input
                    });
                }
                /**
                 * Vytvoření vormuláře pro připojení nového účtu.
                 *
                 * @author  TFeik
                 * @date    06.09.2021
                 *
                 * @returns {Forms.Form}
                 */
                CreateNewUserForm() {
                    const dbModel = Gordic.Ginis.DbModel;
                    const publicLoginConfig = this.PublicLoginConfig ?? {};
                    const allowedValuesTypEsu = publicLoginConfig.allowedValues?.typEsu;
                    const isNameAndSurnameRequiredForEdit = publicLoginConfig.isNameAndSurnameRequiredForEdit;
                    const typ_esu_items = [
                        10 /* dbModel.GGincesuEnum.pravnicka_osoba */,
                        30 /* dbModel.GGincesuEnum.fyz_osoba_osvc */
                    ].filter(i => !allowedValuesTypEsu || allowedValuesTypEsu.includes(i));
                    // 14.04.2025 - TFeik
                    // Neurčenu přidáv8m aby nebylo prázdé políčko pokud je neurčeno nastaveno z ARES.
                    typ_esu_items.push(0 /* dbModel.GGincesuEnum.neurceno */);
                    const form = new Gordic.Forms.Form()
                        .addSection('jres:32100263') //RC 32100263 : Zastupovaný subjekt
                        .addRow('jres:32100264') //RC 32100264 : Typ subjektu
                        .addField('gselectbox', Gordic.Prefabs.Select.gincesu(), {
                        name: NewUserFieldNames.typEsu,
                        model: 'model.{0} = value.{1}'.format("TypEsu" /* GCreateAndAddRepresentedPublicUserInputDtoNames.TypEsu */, "typ_esu" /* Data.Readers.GincesuDtoNames.typ_esu */),
                        initialValue: {
                            typ_esu: typ_esu_items[0]
                        },
                        serverFilters: {
                            typ_esu: typ_esu_items
                        },
                        validators: [
                            new Gordic.Validators.Required({
                                validate: (value, source) => {
                                    // 14.04.2025 - TFeik
                                    // Neurčeno beru jako nevyplněno.
                                    return value?.typ_esu ? true : false;
                                }
                            })
                        ]
                        //change: (event, input) => {
                        //    this.beginOperation();
                        //    const defaultOrg = this.GetDefaultTypeOrg(input.value?.typ_esu);
                        //    if (defaultOrg != null) {
                        //        const $form = this.$NewUserForm;
                        //        if (Utils.WidgetExists('gform', $form)) {
                        //            $form
                        //                .findFields(NewUserFieldNames.typOrg)
                        //                .gfield<GCreateAndAddRepresentedPublicUserInputDto>(
                        //                    'model',
                        //                    'apply',
                        //                    {
                        //                        TypOrg: defaultOrg
                        //                    }
                        //                );
                        //        }
                        //    }
                        //    this.UpdateNewUserFormEnabled()
                        //        .always(() => {
                        //            this.endOperation();
                        //        });
                        //}
                    })
                        .addRow('jres:32100265') //RC 32100265 : IČO
                        .addField('gstringbox', {
                        name: NewUserFieldNames.ic,
                        model: 'model.{0} = value'.format("Ic" /* GCreateAndAddRepresentedPublicUserInputDtoNames.Ic */),
                        change: (ev, changeObj) => {
                            const ic = changeObj?.value?.trim();
                            if (!ic) {
                                return;
                            }
                            this.GetAndApplyAresData(ic, this.GetPripojeniNovehoUctuPouzeIC());
                        },
                        buttons: [{
                                icon: 'gi-accept',
                                action: new GAction({
                                    name: 'applyAresData',
                                    tooltip: 'jres:32100266', //RC 32100266 : Naplnit hodnoty z rejstříku.
                                    run: (ev, object) => {
                                        const $field = $(object?.field);
                                        if (!Gordic.Utils.WidgetExists('gfield', $field)) {
                                            return;
                                        }
                                        const ic = $field.gfield('getValue');
                                        if (!ic) {
                                            return;
                                        }
                                        this.GetAndApplyAresData(ic, true);
                                    }
                                })
                            }]
                    })
                        .addRow()
                        .addField('gcheck', {
                        name: NewUserFieldNames.isVatPayer,
                        model: `model.${"IsVatPayer" /* GCreateAndAddRepresentedPublicUserInputDtoNames.IsVatPayer */} = value`,
                        label: 'jres:32100358', //RC 32100358 : Plátce DPH
                        change: (event, input) => {
                            this.beginOperation();
                            this.UpdateNewUserFormEnabled()
                                .always(() => {
                                this.endOperation();
                            });
                        }
                    })
                        .addRow('jres:32100267') //RC 32100267 : DIČ
                        .addField('gstringbox', {
                        name: NewUserFieldNames.dic,
                        model: 'model.{0} = value'.format("Dic" /* GCreateAndAddRepresentedPublicUserInputDtoNames.Dic */)
                    })
                        .addRow('jres:32100268') //RC 32100268 : Jméno/Obchodní firma
                        .addField('gstringbox', {
                        name: NewUserFieldNames.obchodniJmeno,
                        model: 'model.{0} = value'.format("ObchodniJmeno" /* GCreateAndAddRepresentedPublicUserInputDtoNames.ObchodniJmeno */)
                        //validators: [
                        //    new Validators.Required()
                        //]
                    })
                        .addRow('jres:32100269') //RC 32100269 : Typ organizace
                        .addField('gselectbox', Gordic.Prefabs.Select.ginctyo(), {
                        name: NewUserFieldNames.typOrg,
                        model: 'model.{0} = value.{1}'.format("TypOrg" /* GCreateAndAddRepresentedPublicUserInputDtoNames.TypOrg */, "typ_org" /* Data.Readers.GinctyoDtoNames.typ_org */),
                        dropdown: false,
                        serverFilters: {
                            typ_esu: new Gordic.Forms.Dependency(NewUserFieldNames.typEsu, "typ_esu" /* Data.Readers.GincesuDtoNames.typ_esu */, false)
                        },
                        validators: [
                            new Gordic.Validators.Required({
                                validate: (value, source) => {
                                    // 14.04.2025 - TFeik
                                    // Neurčeno beru jako nevyplněno.
                                    return value?.typ_org ? true : false;
                                }
                            })
                        ]
                        //initialValue: {
                        //    typ_org: 34 // práv. osoba - s.r.o.
                        //}
                    })
                        .addSection({
                        label: 'jres:32100390' //RC 32100390 : Zastupující osoba
                    })
                        .addRow('jres:32100391') //RC 32100391 : Tituly před, za jménem
                        .addField('gstringbox', 'w-6', {
                        name: NewUserFieldNames.titulPred,
                        model: `model.${"TitulPred" /* GCreateAndAddRepresentedPublicUserInputDtoNames.TitulPred */} = value`
                        //initialValue: publicUserCurrent?.titulPred
                    })
                        .addField('gstringbox', 'w-6', {
                        name: NewUserFieldNames.titulZa,
                        model: `model.${"TitulZa" /* GCreateAndAddRepresentedPublicUserInputDtoNames.TitulZa */} = value`
                        //initialValue: publicUserCurrent?.titulZa
                    })
                        .addRow('jres:32100388') //RC 32100388 : Jméno
                        .addField('gstringbox', {
                        name: NewUserFieldNames.jmeno,
                        model: `model.${"Jmeno" /* GCreateAndAddRepresentedPublicUserInputDtoNames.Jmeno */} = value`,
                        //initialValue: publicUserCurrent?.jmeno,
                        validators: isNameAndSurnameRequiredForEdit
                            ? [new Gordic.Validators.Required()]
                            : void 0
                    })
                        .addRow('jres:32100389') //RC 32100389 : Příjmení
                        .addField('gstringbox', {
                        name: NewUserFieldNames.prijmeni,
                        model: `model.${"Prijmeni" /* GCreateAndAddRepresentedPublicUserInputDtoNames.Prijmeni */} = value`,
                        //initialValue: publicUserCurrent?.prijmeni,
                        validators: isNameAndSurnameRequiredForEdit
                            ? [new Gordic.Validators.Required()]
                            : void 0
                    })
                        .addRow('jres:32100392') //RC 32100392 : Datum narození
                        .addField("gdatebox", {
                        name: NewUserFieldNames.datumNarozeni,
                        model: `model.${"DatumNarozeni" /* GCreateAndAddRepresentedPublicUserInputDtoNames.DatumNarozeni */} = value`
                        //initialValue: publicUserCurrent?.datumNarozeni
                    })
                        .addSection('jres:32100270') //RC 32100270 : Adresa sídla
                        .addRow('jres:32100271') //RC 32100271 : Ulice, číslo
                        // Většina registrací by měla být přes ičo a ares, tudíž uživatel nebude zadávat adresu ručně a tak neřeším adresu přes google.
                        // I tak stále používám prefab z registra4ního formuláře, abych se k polí4ku choval stejně.
                        .addField('gselectbox', 'w-8', new Api.GPlaces().prefab(), {
                        name: NewUserFieldNames.ulice,
                        model: 'model.{0} = value'.format("Ulice" /* GCreateAndAddRepresentedPublicUserInputDtoNames.Ulice */),
                        modelValueTransform: {
                            collect: (value) => {
                                return value && (typeof value === 'object'
                                    ? value.structured_formatting.main_text
                                    : value);
                            },
                            apply: (value) => {
                                return value;
                            }
                        }
                    })
                        //.addField('gformattedbox', 'w-4', Prefabs.GFormattedBox.streetNrSingle(GCreateAndAddRepresentedPublicUserInputDtoNames.CPop, GCreateAndAddRepresentedPublicUserInputDtoNames.COr), {
                        //    name: NewUserFieldNames.cislo,
                        //    model: 'model.{0} = value'.format('cislo'),
                        //    validators: [
                        //        new Validators.Required({
                        //            stopping: true
                        //        })
                        //    ]
                        //})
                        .addField('gstringbox', 'w-2', {
                        name: NewUserFieldNames.cisloPopisne,
                        model: `model.${"CPop" /* GCreateAndAddRepresentedPublicUserInputDtoNames.CPop */} = value`,
                        placeholder: 'jres:32100327' //RC 32100327 : Č.p
                    })
                        .addField('gstringbox', 'w-2', {
                        name: NewUserFieldNames.cisloOrientacni,
                        model: `model.${"COr" /* GCreateAndAddRepresentedPublicUserInputDtoNames.COr */} = value`,
                        placeholder: 'jres:32100328' //RC 32100328 : Č.or
                    })
                        .addRow('jres:32100272') //RC 32100272 : PSČ, Obec
                        .addField('gformattedbox', 'w-4', {
                        name: NewUserFieldNames.psc,
                        model: 'model.{0} = value'.format("Psc" /* GCreateAndAddRepresentedPublicUserInputDtoNames.Psc */),
                        parser: (str) => {
                            return typeof str === 'string'
                                ? str.replace(/\D/g, '')
                                : '';
                        },
                        formatter: (value, isEdited) => {
                            return value == null || value.length <= 3 ? value :
                                value.slice(0, 3) + ' ' + value.slice(3);
                        }
                    })
                        .addField('gstringbox', 'w-8', {
                        name: NewUserFieldNames.obec,
                        model: 'model.{0} = value'.format("Obec" /* GCreateAndAddRepresentedPublicUserInputDtoNames.Obec */)
                    })
                        .addRow('jres:32100273') //RC 32100273 : Stát
                        .addField('gselectbox', Gordic.Prefabs.Select.gincsta(), {
                        name: NewUserFieldNames.stat,
                        model: 'model.{0} = value.{1}'.format("Stat" /* GCreateAndAddRepresentedPublicUserInputDtoNames.Stat */, "stat" /* Data.Readers.GincstaDtoNames.stat */),
                        strict: true,
                        initialValue: {
                            stat: 42
                        }
                    })
                        .addSection('jres:32100274') //RC 32100274 : Kontaktní údaje
                        .addRow('jres:32100275') //RC 32100275 : Email
                        .addField('gstringbox', {
                        name: NewUserFieldNames.email,
                        model: 'model.{0} = value'.format("Email" /* GCreateAndAddRepresentedPublicUserInputDtoNames.Email */),
                        inputType: 'email'
                    })
                        // 20.11.2023 - TFeik
                        // Přidán souhlas pro notifikace emailem.
                        .addRow()
                        .addField('gcheck', {
                        label: 'jres:32100356', //RC 32100356 : Odesílat notifikace související s elektronickým vyřizováním agendy s úřadem.
                        name: NewUserFieldNames.useEmailNotifications,
                        model: `model.${"UseEmailNotifications" /* GCreateAndAddRepresentedPublicUserInputDtoNames.UseEmailNotifications */} = value`,
                        initialValue: true
                    })
                        .addRow({
                        label: 'jres:32100276', //RC 32100276 : Telefon
                        hint: publicLoginConfig.phoneNumberHint?.trim()
                    })
                        .addField('gstringbox', {
                        name: NewUserFieldNames.telefon,
                        model: 'model.{0} = value'.format("Telefon" /* GCreateAndAddRepresentedPublicUserInputDtoNames.Telefon */),
                        inputType: 'tel',
                        validators: publicLoginConfig.isPhoneNumberRequired
                            ? [new Gordic.Validators.Required()]
                            : void 0
                    });
                    if (this.IsSmsGatewayEnabled) {
                        form
                            .addRow()
                            .addField('gcheck', {
                            label: 'jres:32100357', //RC 32100357 : Odesílat notifikace přes SMS související s elektronickým vyřizováním agendy s úřadem.
                            name: NewUserFieldNames.useSmsNotifications,
                            model: `model.${"UseSmsNotifications" /* GCreateAndAddRepresentedPublicUserInputDtoNames.UseSmsNotifications */} = value`,
                            initialValue: true
                        });
                    }
                    return form;
                }
                /**
                 * Vrátí data formuláře pro provázání nového účtu.
                 *
                 * @author  TFeik
                 * @date    06.09.2021
                 *
                 * @param {boolean} [validate] (Default: true) Příznak, zda se má formulář validovat.
                 * @returns {JQuery.Promise<GCreateAndAddRepresentedPublicUserInputDto>}
                 */
                GetNewUserFormValues(validate) {
                    const $form = this.$NewUserForm;
                    if (!Gordic.Utils.WidgetExists('gform', $form) || (validate !== false && !$form.gform('isValid'))) {
                        return $.Deferred().reject().promise();
                    }
                    const values = {};
                    $form
                        .findFields()
                        .gfield('model', 'collect', values);
                    return $.Deferred().resolve(values).promise();
                }
                /**
                 * Vytvoří a prováže nový externí účet s aktuálně přihlášeným účtem.
                 *
                 * @author  TFeik
                 * @date    06.09.2021
                 *
                 * @returns {JQuery.Promise<void>}
                 */
                VytvoritAPripojitNovyUcet() {
                    const flashId = 'vytvoritAPripojitNovyUcetMessage';
                    this.hideFlash(flashId);
                    return this.GetNewUserFormValues()
                        .then((getNewUserFormValuesReturnValues) => {
                        return this.CreateAndAddRepresentedPublicUser(getNewUserFormValuesReturnValues)
                            .then((createAndAddRepresentedPublicUserReturnValues) => {
                            // 06.01.2022 - TFeik
                            // Příznak neurčije zda se připojení účtu zdařilo, ale zda byl vytvořen nový (true),
                            // nebo došlo k propojení s existujícím účtem (false).
                            this.showFlash({
                                id: flashId,
                                state: 'success',
                                label: createAndAddRepresentedPublicUserReturnValues === true
                                    ? 'jres:32100277' //RC 32100277 : Účet je úspěšně vytvořen a připojen.
                                    : 'jres:32100289' //RC 32100289 : Účet je úspěšně připojen.
                            });
                        });
                    })
                        .fail(() => {
                        this.showFlash({
                            id: flashId,
                            state: 'error',
                            label: 'jres:32100278' //RC 32100278 : Vytvoření a připojení účtu se nezdařilo.
                        });
                    });
                }
                ;
                /**
                 * Načte data z ares dle ič a nastaví je do formuláře.
                 *
                 * @author  TFeik
                 * @date    08.09.2021
                 *
                 * @param {string} ic
                 * @param {boolean} overwriteUserValues
                 * @returns {JQuery.Promise<void>}
                 */
                GetAndApplyAresData(ic, overwriteUserValues) {
                    this.beginOperation();
                    return this.GetNewUserFormValues(false)
                        .then((userData) => {
                        const isPravnicka = (typEsu) => {
                            return (typEsu ?? userData.TypEsu) === 10 /* Ginis.DbModel.GGincesuEnum.pravnicka_osoba */;
                        };
                        return WebControls.GPublicUserRegForm.getAresPublicUserData(ic, isPravnicka(void 0), false)
                            .then((aresData) => {
                            const form = this.$NewUserForm;
                            if (!aresData || !Gordic.Utils.WidgetExists('gform', form)) {
                                return $.Deferred().reject().promise();
                            }
                            const fieldNames = [
                                NewUserFieldNames.dic,
                                NewUserFieldNames.obchodniJmeno,
                                NewUserFieldNames.typOrg,
                                NewUserFieldNames.ulice,
                                //NewUserFieldNames.cislo,
                                NewUserFieldNames.cisloPopisne,
                                NewUserFieldNames.cisloOrientacni,
                                NewUserFieldNames.psc,
                                NewUserFieldNames.obec,
                                NewUserFieldNames.typEsu,
                                NewUserFieldNames.isVatPayer
                            ];
                            const aresDataTypEsu = aresData.typEsu;
                            if (!isPravnicka(aresDataTypEsu)) {
                                fieldNames.push(NewUserFieldNames.titulPred, NewUserFieldNames.titulZa, NewUserFieldNames.jmeno, NewUserFieldNames.prijmeni);
                            }
                            form
                                .findFields(fieldNames.toString())
                                .filter((index, item) => {
                                if (overwriteUserValues) {
                                    return true;
                                }
                                const $field = $(item);
                                return !$field.gfield('hasChanged') || ($field.gfield('option', 'name') === NewUserFieldNames.typEsu);
                            })
                                // Políčka která nastavuji napřed vymažu (pokud jsem zadal napřed ičo ke kterému je DIČ/ulice)
                                // a k dalšímu ne, pak musím vymazat původní údaje (nové jsou undefined a tak se nepřepíšou).
                                .gfield('clear')
                                .gfield('model', 'apply', {
                                Dic: aresData.dic,
                                ObchodniJmeno: aresData.obchodniJmeno,
                                TypOrg: aresData.typOrg,
                                Ulice: aresData.ulice,
                                // Místo cPop a cOr je souhrně číslo.
                                //cislo: aresData.cislo,
                                CPop: aresData.cPop,
                                COr: aresData.cOr,
                                Psc: aresData.psc,
                                Obec: aresData.obec,
                                Jmeno: aresData.jmeno,
                                Prijmeni: aresData.prijmeni,
                                TitulPred: aresData.titulPred,
                                TitulZa: aresData.titulZa,
                                TypEsu: aresDataTypEsu,
                                IsVatPayer: aresData.IsVatPayer
                            }, {
                                initialValues: true
                            });
                            return form
                                .gform('waitForValues')
                                .then(() => {
                                return this.UpdateNewUserFormEnabled();
                            });
                        });
                    })
                        .always(() => {
                        this.endOperation();
                    });
                }
                /**
                 * UpdateNewUserFormEnabled
                 *
                 * @author  TFeik
                 * @date    27.11.2023
                 *
                 * @returns {JQuery.Promise<void>}
                 */
                UpdateNewUserFormEnabled() {
                    const $form = this.$NewUserForm;
                    if (!Gordic.Utils.WidgetExists('gform', $form)) {
                        return $.Deferred().reject().promise();
                    }
                    return $form.gform('waitForValues')
                        .then(() => {
                        const data = {};
                        const $fields = $form
                            .findFields()
                            .gfield('model', 'collect', data)
                            .gfield('disable');
                        const fieldNamesToEnable = [
                            NewUserFieldNames.ic
                        ];
                        if (this.GetPripojeniNovehoUctuPouzeIC()) {
                            // 14.04.2025 - TFeik
                            // Pokud je vyplněno IČO (načtena data z ARES), tak povolím typ organizace a typ ESU v případě, že nejsou vyplněné.
                            if (data.Ic?.trim()) {
                                if (!data.TypEsu) {
                                    fieldNamesToEnable.push(NewUserFieldNames.typEsu);
                                }
                                if (!data.TypOrg) {
                                    fieldNamesToEnable.push(NewUserFieldNames.typOrg);
                                }
                            }
                        }
                        else {
                            if (data.IsVatPayer) {
                                fieldNamesToEnable.push(NewUserFieldNames.dic);
                            }
                            fieldNamesToEnable.push(NewUserFieldNames.email, NewUserFieldNames.telefon, NewUserFieldNames.useEmailNotifications, NewUserFieldNames.useSmsNotifications, NewUserFieldNames.typEsu, NewUserFieldNames.isVatPayer, NewUserFieldNames.obchodniJmeno, NewUserFieldNames.typOrg, NewUserFieldNames.titulPred, NewUserFieldNames.titulZa, NewUserFieldNames.jmeno, NewUserFieldNames.prijmeni, NewUserFieldNames.datumNarozeni, NewUserFieldNames.ulice, NewUserFieldNames.cisloPopisne, NewUserFieldNames.cisloOrientacni, NewUserFieldNames.psc, NewUserFieldNames.obec, NewUserFieldNames.stat);
                            //if (data.TypEsu === Ginis.DbModel.GGincesuEnum.pravnicka_osoba) {
                            //    fieldNamesToEnable.push(NewUserFieldNames.obchodniJmeno);
                            //}
                        }
                        if (fieldNamesToEnable.length > 0) {
                            $fields
                                .findFields(fieldNamesToEnable.toString())
                                .gfield('enable');
                        }
                        //const row = $fields.findFields(NewUserFieldNames.obchodniJmeno).gformrow();
                        //if (fieldNamesToEnable.includes(NewUserFieldNames.obchodniJmeno)) {
                        //    row.show();
                        //} else {
                        //    row.hide();
                        //}
                    });
                }
                /**
                 * GetDefaultTypeOrg
                 *
                 * @author  TFeik
                 * @date    27.11.2023
                 *
                 * @param {Ginis.DbModel.GGincesuEnum | number | null | undefined} typEsu
                 * @returns {number | null | undefined}
                 */
                GetDefaultTypeOrg(typEsu) {
                    const defaultOrg = this.PublicLoginConfig?.defaultOrg;
                    if (!defaultOrg) {
                        return null;
                    }
                    const dbModel = Gordic.Ginis.DbModel;
                    switch (typEsu) {
                        case 10 /* dbModel.GGincesuEnum.pravnicka_osoba */:
                            return defaultOrg.pravnickaOsoba;
                        case 20 /* dbModel.GGincesuEnum.fyz_osoba */:
                            return defaultOrg.fyzickaOsoba;
                        case 30 /* dbModel.GGincesuEnum.fyz_osoba_osvc */:
                            return defaultOrg.fyzickaOsobaOsvc;
                        default:
                            return null;
                    }
                }
                /**
                 * Vrátí příznak zda je povolena pouze editace IČ pro připojení nového účtu.
                 *
                 * @author  TFeik
                 * @date    14.04.2025
                 *
                 * @returns {boolean}
                 */
                GetPripojeniNovehoUctuPouzeIC() {
                    return this.PublicLoginConfig?.pripojeniNovehoUctuPouzeIC ?? false;
                }
            };
            GAddRepresentPublicUserDlg = __decorate([
                gcontent
            ], GAddRepresentPublicUserDlg);
            WebControls.GAddRepresentPublicUserDlg = GAddRepresentPublicUserDlg;
        })(WebControls = Gui.WebControls || (Gui.WebControls = {}));
    })(Gui = Gordic.Gui || (Gordic.Gui = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpLndlYmNvbnRyb2xzLnB1YmxpY2xvZ2luLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJHb3JkaWMuR3VpLldlYkNvbnRyb2xzL1B1YmxpY0xvZ2luL0R0by9HUHVibGljVXNlckR0b0VudW0udHMiLCJHb3JkaWMuR3VpLldlYkNvbnRyb2xzL1B1YmxpY0xvZ2luL0dQdWJsaWNVc2VyUmVnRm9ybS50cyIsIkdvcmRpYy5HdWkuV2ViQ29udHJvbHMvUHVibGljTG9naW4vR1hyZ1B1YmxpY1VzZXJSZWdGb3JtLnRzIiwiR29yZGljLkd1aS5XZWJDb250cm9scy9QdWJsaWNMb2dpbi9HUmVnUGFnZVB1YmxpY0RsZy50cyIsIkdvcmRpYy5HdWkuV2ViQ29udHJvbHMvUHVibGljTG9naW4vR1hyZ1JlZ1BhZ2VQdWJsaWNEbGcudHMiLCJHb3JkaWMuR3VpLldlYkNvbnRyb2xzL1B1YmxpY0xvZ2luL0dDaGFuZ2VQdWJsaWNVc2VySW5mb0RsZy50cyIsIkdvcmRpYy5HdWkuV2ViQ29udHJvbHMvUHVibGljTG9naW4vR0NoYW5nZVBhc3N3b3JkRGxnLnRzIiwiR29yZGljLkd1aS5XZWJDb250cm9scy9QdWJsaWNMb2dpbi9HTmV3UGFzc3dvcmREbGcudHMiLCJHb3JkaWMuR3VpLldlYkNvbnRyb2xzL1B1YmxpY0xvZ2luL0dBZGRSZXByZXNlbnRQdWJsaWNVc2VyRGxnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFFakIsSUFBVSxNQUFNLENBaUJmO0FBakJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWlCbkI7SUFqQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQWlCL0I7UUFqQm9CLFdBQUEsV0FBVztZQUFDLElBQUEsY0FBYyxDQWlCOUM7WUFqQmdDLFdB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LElBQUksQ0FBQyxpQkFBaUIsRUFBRSwwQkFBMEIsSUFBSSxLQUFLLENBQUM7Z0JBQ3ZFLENBQUM7YUFHSixDQUFBO1lBMzZCWSwwQkFBMEI7Z0JBRHRDLFFBQVE7ZUFDSSwwQkFBMEIsQ0EyNkJ0QztZQTM2Qlksc0NBQTBCLDZCQTI2QnRDLENBQUE7UUFDTCxDQUFDLEVBejlCb0IsV0FBVyxHQUFYLGVBQVcsS0FBWCxlQUFXLFFBeTlCL0I7SUFBRCxDQUFDLEVBejlCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeTlCbkI7QUFBRCxDQUFDLEVBejlCUyxNQUFNLEtBQU4sTUFBTSxRQXk5QmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkd1aS5XZWJDb250cm9scy5HUHVibGljVXNlckR0b0VudW0udHMgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgVEZlaWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE5ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDgtMTkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdQdWJsaWNVc2VyRHRvIHtcclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhxI1uw60gc2t1cGlueS5cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAqIEBzaW5jZSAgIDQ4Mi4xLjAuNTAxXHJcbiAgICAgKiBAZGF0ZSAgICAxOS4wOC4yMDE5XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBlbnVtIFZhbGlkYXRpb25Hcm91cCB7XHJcbiAgICAgICAgR1JPVVBfQ09SUkVDVF9GT1JNQVQgPSBcImNvcnJlY3RfZm9ybWF0XCIsXHJcbiAgICAgICAgR1JPVVBfUkVHSVNUUkFUSU9OID0gXCJyZWdpc3RyYXRpb25cIixcclxuICAgICAgICBHUk9VUF9DSEFOR0UgPSBcImNoYW5nZVwiLFxyXG4gICAgICAgIEdST1VQX0NIQU5HRV9FWFRFUk5BTF9VU0VSID0gXCJjaGFuZ2VfZXh0ZXJuYWxfdXNlclwiLFxyXG4gICAgICAgIEdST1VQX0JVU0lORVNTID0gXCJidXNpbmVzc1wiLFxyXG4gICAgICAgIEdST1VQX1BFUlNPTkFMID0gXCJwZXJzb25hbFwiLFxyXG4gICAgICAgIEdST1VQX0NPTVBBTlkgPSBcImNvbXBhbnlcIixcclxuICAgIH1cclxufSIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdQdWJsaWNVc2VyUmVnRm9ybS50cyAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gRm9ybXVsw6HFmSBwcm8gcmVnaXN0cmFjaSAvIHptMm51IMO6ZGFqxa8gdmXFmWVqbsOpaG8gdcW+aXZhdGVsZS4gIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdGZlaWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE3ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTctMDMtMjcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuR3VpLldlYkNvbnRyb2xzIHtcclxuICAgIC8qKlxyXG4gICAgICogTsOhenZ5IHBvbMOtxI1layByZWdpc3RyYcSNbsOtIGZvcm11bMOhxZllIHZlxZllam7DqWhvIHXFvml2YXRlbGUuXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgKiBAc2luY2UgICA0ODIuMS4wLjQ3NVxyXG4gICAgICogQGRhdGUgICAgMDcuMDguMjAxOVxyXG4gICAgICovXHJcbiAgICBlbnVtIEZpZWxkTmFtZXMge1xyXG4gICAgICAgIGVtYWlsID0gXCJlbWFpbFwiLFxyXG4gICAgICAgIGVtYWlsQXNMb2dpbiA9IFwiZW1haWxBc0xvZ2luXCIsXHJcbiAgICAgICAgdXppdmF0ZWxza2VKbWVubyA9IFwidXppdmF0ZWxza2VKbWVub1wiLFxyXG4gICAgICAgIGhlc2xvID0gXCJoZXNsb1wiLFxyXG4gICAgICAgIG92ZXJlbmlIZXNsYSA9IFwib3ZlcmVuaUhlc2xhXCIsXHJcbiAgICAgICAgdHlwRXN1ID0gXCJ0eXBFc3VcIixcclxuICAgICAgICBpYyA9IFwiaWNcIixcclxuICAgICAgICBpc1ZhdFBheWVyID0gXCJpc1ZhdFBheWVyXCIsXHJcbiAgICAgICAgZGljID0gXCJkaWNcIixcclxuICAgICAgICBvYmNob2RuaUptZW5vID0gXCJvYmNob2RuaUptZW5vXCIsXHJcbiAgICAgICAgdHlwT3JnID0gXCJ0eXBPcmdcIixcclxuICAgICAgICB0aXR1bFByZWQgPSBcInRpdHVsUHJlZFwiLFxyXG4gICAgICAgIHRpdHVsWmEgPSBcInRpdHVsWmFcIixcclxuICAgICAgICBqbWVubyA9IFwiam1lbm9cIixcclxuICAgICAgICBwcmlqbWVuaSA9IFwicHJpam1lbmlcIixcclxuICAgICAgICByb2RuZUNpc2xvID0gXCJyb2RuZUNpc2xvXCIsXHJcbiAgICAgICAgZGF0dW1OYXJvemVuaSA9IFwiZGF0dW1OYXJvemVuaVwiLFxyXG4gICAgICAgIHRlbGVmb24gPSBcInRlbGVmb25cIixcclxuICAgICAgICB1bGljZSA9IFwidWxpY2VcIixcclxuICAgICAgICBjaXNsbyA9IFwiY2lzbG9cIixcclxuICAgICAgICBjaXNsb1BvcGlzbmUgPSAnY1BvcCcsXHJcbiAgICAgICAgY2lzbG9PcmllbnRhY25pID0gJ2NPcicsXHJcbiAgICAgICAgcHNjID0gXCJwc2NcIixcclxuICAgICAgICBvYmVjID0gXCJvYmVjXCIsXHJcbiAgICAgICAgY2FzdE9iY2UgPSBcImNhc3RPYmNlXCIsXHJcbiAgICAgICAgc3RhdCA9IFwic3RhdFwiLFxyXG4gICAgICAgIHNvdWhsYXNTZVpwcmFjb3ZhbmltVWRhanUgPSBcInNvdWhsYXNTZVpwcmFjb3ZhbmltVWRhanVcIixcclxuICAgICAgICB1c2VFbWFpbE5vdGlmaWNhdGlvbnMgPSAndXNlRW1haWxOb3RpZmljYXRpb25zJyxcclxuICAgICAgICB1c2VTbXNOb3RpZmljYXRpb25zID0gJ3VzZVNtc05vdGlmaWNhdGlvbnMnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOw6F6dnkgc2VrY8OtIHJlZ2lzdHJhxI1uw60gZm9ybXVsw6HFmWUgdmXFmWVqbsOpaG8gdcW+aXZhdGVsZS5cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAqIEBzaW5jZSAgIDQ4Mi4xLjAuNDk5XHJcbiAgICAgKiBAZGF0ZSAgICAxNi4wOC4yMDE5XHJcbiAgICAgKi9cclxuICAgIGVudW0gU2VjdGlvbk5hbWVzIHtcclxuICAgICAgICBwcmlobGFzb3ZhY2lVZGFqZSA9IFwicHJpaGxhc292YWNpVWRhamVcIixcclxuICAgICAgICBhZHJlc2EgPSBcImFkcmVzYVwiLFxyXG4gICAgICAgIG9zb2JuaVVkYWplID0gXCJvc29ibmlVZGFqZVwiLFxyXG4gICAgICAgIG9zb2JhID0gXCJvc29iYVwiLFxyXG4gICAgICAgIHBvZG1pbmt5UG91eml2YW5pID0gXCJwb2RtaW5reVBvdXppdmFuaVwiLFxyXG4gICAgICAgIGtvbnRha3R5UHJvRWxla3Ryb25pY2tvdUtvbXVuaWthY2kgPSAna29udGFrdHlQcm9FbGVrdHJvbmlja291S29tdW5pa2FjaSdcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBGb3JtTmFtZSA9IFwiUmVnaXN0ZXJQdWJsaWNVc2VyRm9ybVwiXHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHUHVibGljVXNlclJlZ0Zvcm1PYmplY3Qge1xyXG4gICAgICAgIG5hbWU6IHN0cmluZyxcclxuICAgICAgICBmb3JtRGl2OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LFxyXG4gICAgICAgIGxheW91dERlc2NyaXB0b3I/OiBzdHJpbmcsXHJcbiAgICAgICAgZGF0YVByYXZuaUZvcm15OiBhbnksXHJcbiAgICAgICAgY2lzZWxuaWtTenJQcmF2bmlGb3JtYTogYW55LFxyXG4gICAgICAgIGRhdGFUeXBPcmdhbml6YWNlOiBhbnksXHJcbiAgICAgICAgY2lzZWxuaWtUeXBPcmc6IGFueSxcclxuICAgICAgICByZUNlbGVKbWVubz86IFJlZ0V4cCxcclxuICAgICAgICByZUptZW5vVHJpbT86IFJlZ0V4cCxcclxuICAgICAgICBkYXRhVmlld1R5cE9yZzogYW55LFxyXG4gICAgICAgIGRhdGFWaWV3VHlwRXN1OiBhbnksXHJcbiAgICAgICAgY29udGFpbmVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LFxyXG4gICAgICAgIGNpc2VsbmlrVHlwRXN1OiBhbnksXHJcbiAgICAgICAgZGF0YVZpZXdTdGF0OiBhbnksXHJcbiAgICAgICAgY29uZGl0aW9uQWdyZWVtZW50VGV4dD86IHN0cmluZyxcclxuICAgICAgICBjaXNlbG5pa1N0YXQ6IGFueSxcclxuICAgICAgICBjaXNlbG5pa1BzYzogYW55LFxyXG4gICAgICAgIGRhdGFWaWV3UHNjOiBhbnksXHJcbiAgICAgICAgdmFsaWRhdG9ycz86IG9iamVjdCxcclxuICAgICAgICBpbml0aWFsVmFsdWVzPzogR1B1YmxpY1VzZXJEdG8sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBmb3JtdWzDocWZLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX2NyZWF0ZUZvcm0oKTogdm9pZCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6w60gLyBza3J5amUgcG9sw63EjWthIG5hIGZvcm11bMOhxZlpIGRsZSB0eXB1IHByw6F2bsOtIG9zb2J5LiBIb2Rub3RhIHNrcnl0w71jaCBwb2zDrcSNZWsgc2UgbmVtYcW+ZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdHlwX2VzdV0gMCAtIFwibmV1csSNZW5vXCIsIDEwIC0gXCJwcsOhdm5pY2vDoSBvc29iYVwiLCAyMCAtIFwiZnl6aWNrw6Egb3NvYmFcIiwgMzAgLSBcImZ5emlja8OhIG9zb2JhIC0gT1NWxIxcIlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9hZGp1c3RGb3JtKHR5cF9lc3U6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBfZ2V0VHlwT3JnYW5pemFjZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHR5cE9yZ2FuaXphY2VcclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBfZ2V0VHlwT3JnYW5pemFjZSh0eXBPcmdhbml6YWNlOiBudW1iZXIpOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLFxyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogX2dldEFyZXNEYXRhXHJcbiAgICAgICAgLy8gKlxyXG4gICAgICAgIC8vICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAvLyAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAvLyAqIFxyXG4gICAgICAgIC8vICogQHBhcmFtIHtzdHJpbmd9IGljXHJcbiAgICAgICAgLy8gKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9fZ2V0QXJlc0RhdGEoaWM6IHN0cmluZyk6IGFueSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogX2FwcGx5QXJlc0RhdGFcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBbb3ZlcndyaXRlVXNlclZhbHVlc11cclxuICAgICAgICAgKi9cclxuICAgICAgICBfYXBwbHlBcmVzRGF0YShkYXRhOiBhbnksIG92ZXJ3cml0ZVVzZXJWYWx1ZXM/OiBib29sZWFuKTogdm9pZCxcclxuXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIF9hcmVzRGF0YVRvRHRvXHJcbiAgICAgICAgLy8gKlxyXG4gICAgICAgIC8vICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAvLyAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAvLyAqIFxyXG4gICAgICAgIC8vICogQHBhcmFtIHthbnl9IGFyZXNcclxuICAgICAgICAvLyAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzUHJhdm5pY2thXVxyXG4gICAgICAgIC8vICogQHJldHVybnMge0dQdWJsaWNVc2VyRHRvfVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9fYXJlc0RhdGFUb0R0byhhcmVzOiBhbnksIGlzUHJhdm5pY2thPzogYm9vbGVhbik6IEdQdWJsaWNVc2VyRHRvLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBfZ2V0VHlwT3JnYW5pemFjZURsZVByYXZuaUZvcm15XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gcHJhdm5pRm9ybWFcclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyIHwgbnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBfZ2V0VHlwT3JnYW5pemFjZURsZVByYXZuaUZvcm15KHByYXZuaUZvcm1hOiBudW1iZXIgfCBzdHJpbmcpOiBudW1iZXIgfCBudWxsLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXbDrSB2w71jaG96w60gaG9kbm90eSwgdmFsaWTDoXRvcnkgYSBvbkNoYW5nZUxpc3RlbmVyLCBrdGVyw70gem9icmF6dWplIG9kbGnFoW5vc3QgaG9kbm90eSBwb2zDrcSNa2Egb2QgaG9kbm90eSB6IEFyZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKi9cclxuICAgICAgICBfaW5pdEZvcm0oKTogdm9pZCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXp1amUgdmFsaWTDoXRvcnkgYSBuYXN0YXbDrSByZXF1aXJlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDIuMjAyMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF91cGRhdGVWYWxpZGF0b3JzKCk6IHZvaWQsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE96bmHEjcOtIHZ5YnJhbsOpIMWZw6Fka3kgamFrbyByZXF1aXJlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMDkuMDIuMjAyMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9jcmVhdGVWYWxpZGF0aW9uR3JvdXBzKCk6IHN0cmluZ1tdLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBfZ2V0VHlwT3JnYW5pemFjZU9iamVjdFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHR5cE9yZ2FuaWFjZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRGF0YS5SZWFkZXJzLkdpbmN0eW9EdG8gfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9nZXRUeXBPcmdhbml6YWNlT2JqZWN0KHR5cE9yZ2FuaWFjZTogbnVtYmVyKTogR29yZGljLkRhdGEuUmVhZGVycy5HaW5jdHlvRHRvIHwgbnVsbCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhdGkgcHJpbWl0aXZuw60gaG9kbm90dSB6IGZpZWxkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fSAkZmllbGRcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgbnVtYmVyIHwgb2JqZWN0IHwgdW5kZWZpbmVkIHwgbnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBfZ2V0RmllbGRSYXdWYWx1ZSgkZmllbGQ6IEpRdWVyeTxIVE1MRWxlbWVudD4pOiBzdHJpbmcgfCBudW1iZXIgfCBvYmplY3QgfCB1bmRlZmluZWQgfCBudWxsLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXbDrSBkYXRhIGRvIGZvcm11bMOhxZllIGEgc2xvxb7DrSDEjcOtc2xvIGRvbXUgYSBqbcOpbm8gdcW+aXZhdGVsZSB6IG7Em2tvbGlrYSBwb2zDrcSNZWsgZG8gamVkbsOpIChjaXNsbywgY2VsZUptZW5vKS5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dQdWJsaWNVc2VyRHRvfSBmb3JtRGF0YSBPYmpla3QgaG9kbm90LCBrdGVyw6kgc2UgdWxvxb7DrSBkbyBmb3JtdWzDocWZZS5cclxuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IFtmaWVsZHNdIFBvbMOtxI1rYSwgZG8ga3RlcsO9Y2ggc2UgZGF0YSBuYXN0YXZ1asOtLiBQb2t1ZCBuZW7DrSB2eXBsbsSbbm8gcGFrIHNlIHBvdcW+aWrDrSB2xaFlY2hueSBwb2zDrcSNa2EgZm9ybXVsw6HFmWUuXHJcbiAgICAgICAgICogQHBhcmFtIHtGaWVsZFNldFZhbHVlRmxhZ3N9IFtmbGFnc10gUMWZw616bmFreS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBhcHBseShmb3JtRGF0YTogR1B1YmxpY1VzZXJEdG8sIGZpZWxkcz86IEpRdWVyeTxIVE1MRWxlbWVudD4sIGZsYWdzPzogRmllbGRTZXRWYWx1ZUZsYWdzKTogdm9pZCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V6YsOtcsOhIGRhdGEgeiBmb3JtdWzDocWZZSBhIHJvenBhcnN1amUgxI3DrXNsbyBkb211IGEgam3DqW5vIHXFvml2YXRlbGUgeiBqZWRub2hvIHBvbMOtxI1rYSBkbyB2w61jZSAocHJvIER0bykuXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29sbGVjdCgpOiBKUXVlcnkuUHJvbWlzZTxHUHVibGljVXNlckR0bz5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmtvbnRyb2x1amUgemRhIGplIGZvcm11bMOhxZkgdmFsaWRuw60uXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAxOS4wOC4yMDE5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNWYWxpZCgpOiBib29sZWFuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHUHVibGljVXNlclJlZ0Zvcm1PcHRpb25zIHtcclxuICAgICAgICByZWFkZXJzPzoge1xyXG4gICAgICAgICAgICBjaXNlbG5pa1N6clByYXZuaUZvcm1hPzogR1NlbGVjdEJveE9wdGlvbnM8R29yZGljLkNvbnRyb2xzTG9naWMuSW50ZXJmYWNlLkdTenJzcHJmRHRvPixcclxuICAgICAgICAgICAgY2lzZWxuaWtTdGF0PzogR1NlbGVjdEJveE9wdGlvbnM8R29yZGljLkRhdGEuUmVhZGVycy5HaW5jc3RhRHRvPixcclxuICAgICAgICAgICAgY2lzZWxuaWtQc2M/OiBHU2VsZWN0Qm94T3B0aW9uczxHb3JkaWMuRGF0YS5SZWFkZXJzLkdpbnNwc2NEdG8+LFxyXG4gICAgICAgICAgICBjaXNlbG5pa1R5cE9yZz86IEdTZWxlY3RCb3hPcHRpb25zPEdvcmRpYy5EYXRhLlJlYWRlcnMuR2luY3R5b0R0bz4sXHJcbiAgICAgICAgICAgIGNpc2VsbmlrVHlwRXN1PzogR1NlbGVjdEJveE9wdGlvbnM8R29yZGljLkRhdGEuUmVhZGVycy5HaW5jZXN1RHRvPixcclxuXHJcbiAgICAgICAgICAgIGdpbmNzdGE/OiBhbnksXHJcbiAgICAgICAgICAgIGdpbnNwc2M/OiBhbnksXHJcbiAgICAgICAgICAgIHN6cnNwcmY/OiBhbnksXHJcbiAgICAgICAgICAgIGdpbmN0eW8/OiBhbnksXHJcbiAgICAgICAgICAgIGdpbmNlc3U/OiBhbnlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0aWFsVmFsdWVzPzogV2ViQ29udHJvbHMuR1B1YmxpY1VzZXJEdG8sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtsw63EjSBwcm8gUlNBIMWhaWZyb3bDoW7DrS5cclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNpcGhlclB1YmxpY0tleTogc3RyaW5nLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZnDrXpuYWssIHpkYSBzZSBqZWRuw6EgbyB1xb5pdmF0ZWxlIHJlZ2lzdHJvdmFuw6lobyBza3J6ZSBmb3JtdWzDocWZIFt0cnVlXSwgbmVibyBleHRlcm7DrXNsdWJ1IFtmYWxzZV0uXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNHaW5pc1VzZXI6IGJvb2xlYW4sXHJcblxyXG4gICAgICAgIG1vZGlmeUZvcm0/OiAoZm9ybTogRm9ybXMuRm9ybSkgPT4gRm9ybXMuRm9ybSxcclxuXHJcbiAgICAgICAgbGF5b3V0RGVzY3JpcHRvcj86IHN0cmluZyxcclxuXHJcbiAgICAgICAgc2hvd1VzZVNtc05vdGlmaWNhdGlvbnNGaWVsZD86IGJvb2xlYW5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdQdWJsaWNVc2VyUmVnRm9ybVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICogQHNpbmNlICAgNDgwLjEuMC41MTdcclxuICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdQdWJsaWNVc2VyUmVnRm9ybSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIExvZ2dlcjogRGlhZ25vc3RpY3MuR0xvZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnLDoXTDrSBpbmljaWFsaXpvdmFuw60gbG9nZ2VyIHBybyBsb2dvdsOhbsOtLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAyOS4wNC4yMDI1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0RpYWdub3N0aWNzLkdMb2d9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgR2V0TG9nZ2VyKCk6IERpYWdub3N0aWNzLkdMb2cge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Mb2dnZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnZXIgPSBuZXcgR29yZGljLkRpYWdub3N0aWNzLkdMb2coe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdHb3JkaWMuV2ZsLldlYkNsaWVudC5HT2Rlc2xhbmlIYW5kbGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogJ0dPZGVzbGFuaUhhbmRsZXIudHMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvckNvZGU6IDMyMVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkxvZ2dlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGVuYWJsZUZpZWxkc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAwNy4wOC4yMDE5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHUHVibGljVXNlclBlcm1pc3Npb25EdG99IFtwZXJtaXNzaW9uc11cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBlbmFibGVGaWVsZHMob3B0OiB7XHJcbiAgICAgICAgICAgIGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zOiBHUHVibGljVXNlclBlcm1pc3Npb25EdG8gfCBudWxsIHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBpc1JlZ2lzdHJhdGlvbkZvcm0/OiBib29sZWFuXHJcbiAgICAgICAgfSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoIW9wdCB8fCAhR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmb3JtXCIsIG9wdC5mb3JtKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBOYXDFmWVkIHbFoWVjaG55IHBvbMOtxI1rYSB6YWvDocW+dSwgLi4uXHJcbiAgICAgICAgICAgIG9wdC5mb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghb3B0LnBlcm1pc3Npb25zKSB7XHJcbiAgICAgICAgICAgICAgICBvcHQucGVybWlzc2lvbnMgPSB7fSBhcyBHUHVibGljVXNlclBlcm1pc3Npb25EdG87XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIC4uLiBwb3Niw61yw6FtIHNpIGptw6luYSBwb2zDrcSNZWssIGt0ZXLDqSBqZSBtb8W+bsOpIGVkaXRvdmF0IC4uLlxyXG4gICAgICAgICAgICBjb25zdCBmaWVsZE5hbWVzVG9FbmFibGU6IEZpZWxkTmFtZXNbXSA9IFtcclxuICAgICAgICAgICAgICAgIEZpZWxkTmFtZXMuc291aGxhc1NlWnByYWNvdmFuaW1VZGFqdSxcclxuICAgICAgICAgICAgICAgIEZpZWxkTmFtZXMudXNlRW1haWxOb3RpZmljYXRpb25zLFxyXG4gICAgICAgICAgICAgICAgRmllbGROYW1lcy51c2VTbXNOb3RpZmljYXRpb25zXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRDYXN0T2JjZT8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLmNhc3RPYmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm1cclxuICAgICAgICAgICAgICAgIHx8IChvcHQucGVybWlzc2lvbnMuQ2FuRWRpdENpc2xvT3JpZW50YWNuaT8udmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAmJiBvcHQucGVybWlzc2lvbnMuQ2FuRWRpdENpc2xvUG9waXNuZT8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLmNpc2xvKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0Q2lzbG9Qb3Bpc25lPy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMuY2lzbG9Qb3Bpc25lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0Q2lzbG9PcmllbnRhY25pPy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMuY2lzbG9PcmllbnRhY25pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0RGF0dW1OYXJvemVuaT8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLmRhdHVtTmFyb3plbmkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXREaWM/LnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lc1RvRW5hYmxlLnB1c2goRmllbGROYW1lcy5kaWMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRFbWFpbD8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLmVtYWlsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0RW1haWxBc0xvZ2luPy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMuZW1haWxBc0xvZ2luKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0SGVzbG8/LnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lc1RvRW5hYmxlLnB1c2goRmllbGROYW1lcy5oZXNsbyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHQuaXNSZWdpc3RyYXRpb25Gb3JtIHx8IChvcHQucGVybWlzc2lvbnMuQ2FuRWRpdEljPy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMuaWMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRKbWVubz8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLmptZW5vKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0T2JjaG9kbmlKbWVubz8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLm9iY2hvZG5pSm1lbm8pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRPYmVjPy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMub2JlYyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHQuaXNSZWdpc3RyYXRpb25Gb3JtIHx8IChvcHQucGVybWlzc2lvbnMuQ2FuRWRpdENhc3RPYmNlPy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMuY2FzdE9iY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRQcmlqbWVuaT8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLnByaWptZW5pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0UHNjPy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMucHNjKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0Um9kbmVDaXNsbz8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLnJvZG5lQ2lzbG8pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRTdGF0Py52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMuc3RhdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHQuaXNSZWdpc3RyYXRpb25Gb3JtIHx8IChvcHQucGVybWlzc2lvbnMuQ2FuRWRpdFRlbGVmb24/LnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lc1RvRW5hYmxlLnB1c2goRmllbGROYW1lcy50ZWxlZm9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0VGl0dWxQcmVkSm1lbmVtPy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMudGl0dWxQcmVkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0VGl0dWxaYUptZW5lbT8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLnRpdHVsWmEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRUeXBFc3U/LnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lc1RvRW5hYmxlLnB1c2goRmllbGROYW1lcy50eXBFc3UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRUeXBPcmc/LnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lc1RvRW5hYmxlLnB1c2goRmllbGROYW1lcy50eXBPcmcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRVbGljZT8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLnVsaWNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0SXNWYXRQYXllcj8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLmlzVmF0UGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAwMy4wOS4yMDE5IC0gVEZlaWtcclxuICAgICAgICAgICAgLy8gUG92b2zDrSBlbmFibGVkIHXFvml2YXRlbHNrw6lobyBqbcOpbmEgcG91emUsIHBva3VkIG5lbsOtIG5hc3RhdmVubyBwb3XFvml0w60gZW1haWx1IGpha28gbG9naW51LlxyXG4gICAgICAgICAgICBjb25zdCBlbWFpbEFzTG9naW4gPSBvcHQuZm9ybS5maW5kRmllbGRzKEZpZWxkTmFtZXMuZW1haWxBc0xvZ2luKS5nZmllbGQ8Ym9vbGVhbiB8IHVuZGVmaW5lZD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgaWYgKCFlbWFpbEFzTG9naW4gJiYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0VXppdmF0ZWxza2VKbWVubz8udmFsdWUpKSkge1xyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lc1RvRW5hYmxlLnB1c2goRmllbGROYW1lcy51eml2YXRlbHNrZUptZW5vKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gLi4uIGEgdSBuaWNoIHpydcWhw61tIGRpc2FibGVkLlxyXG4gICAgICAgICAgICBpZiAoZmllbGROYW1lc1RvRW5hYmxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG9wdC5mb3JtLmZpbmRGaWVsZHMoZmllbGROYW1lc1RvRW5hYmxlLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIG9iamVrdCByZWdpc3RyYcSNbsOtaG8gZm9ybXVsw6HFmWUsIGluaWNpYWxpenVqZSBqZWogYSBuYXN0YXbDrSBkbyBjb250ZW50dS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R1B1YmxpY1VzZXJSZWdGb3JtT3B0aW9uc30gcGFyYW1zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUocGFyYW1zOiBHUHVibGljVXNlclJlZ0Zvcm1PcHRpb25zKTogSlF1ZXJ5LlByb21pc2U8R1B1YmxpY1VzZXJSZWdGb3JtT2JqZWN0PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgbGV0IHB1YmxpY0xvZ2luQ29uZmlnOiBHUHVibGljTG9naW5Db25maWdEdG8gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCBmb3JtT2JqZWN0OiBHUHVibGljVXNlclJlZ0Zvcm1PYmplY3Q7XHJcbiAgICAgICAgICAgIC8vbGV0IFJzYVBhcmFtc1B1YmxpYzogU3lzdGVtLlNlY3VyaXR5LkNyeXB0b2dyYXBoeS5SU0FQYXJhbWV0ZXJzIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgLy8gMTQuMDguMjAxOCAtIFRGZWlrXHJcbiAgICAgICAgICAgIC8vIFByZXByYWNvdmFuaSBmdW5rY2UgY3JlYXRlIG5hIHByb21pcyBhYnljaCB6YWppc3RpbCByYWRuZSBuYWN0ZW5pIGNvbmZpZ3UuXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsb2FkUHVibGljTG9naW5Db25maWcoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR0xvZ2luVXRpbHMuR2V0UHVibGljTG9naW5Db25maWcoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChwdWJsaWNMb2dpbkNvbmZpZ1JldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdWJsaWNMb2dpbkNvbmZpZyA9IHB1YmxpY0xvZ2luQ29uZmlnUmV0VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdCA9ICQuZXh0ZW5kKGZvcm1PYmplY3QsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZvcm1OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiAodGhhdCBhcyBhbnkpLmVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBwYXJhbXMubGF5b3V0RGVzY3JpcHRvciA/PyBcIkwxTTFTMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHBhcmFtcywgcGFyYW1zLnJlYWRlcnMgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc2VsbmlrU3RhdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldzxEYXRhLlJlYWRlcnMuR2luY3N0YUR0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucmVhZGVycy5naW5jc3RhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogRGF0YS5SZWFkZXJzLkdpbmNzdGFEdG9OYW1lcy5zdGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGEuUmVhZGVycy5HaW5jc3RhRHRvTmFtZXMuc3RhdF90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhLlJlYWRlcnMuR2luY3N0YUR0b05hbWVzLnN0YXRfc2lzX2FhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Quc3RhdF9zaXNfYWFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG9iamVjdC5zdGF0X3R4dCArIFwiIC0gXCIgKyBvYmplY3Quc3RhdF9zaXNfYWFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG9iamVjdC5zdGF0X3R4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNlbG5pa1BzYzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldzxEYXRhLlJlYWRlcnMuR2luc3BzY0R0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucmVhZGVycy5naW5zcHNjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhLlJlYWRlcnMuR2luc3BzY0R0b05hbWVzLnBzYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YS5SZWFkZXJzLkdpbnNwc2NEdG9OYW1lcy5zdGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxMi4wNi4yMDIzIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGaWx0cm92w6Fuw60gZGF0IGRsZSB2eWJyYW7DqWhvIHN0w6F0dSAocMWZaSByZWdpc3RyYWNlIG5lZnVuZ3VqZSBzZXJ2ZXJGaWx0ZXIgcHJvdG/FvmUgbmVwb3XFvsOtdsOhIHJlYWRlcikuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0RGVwZW5kZW5jeTogbmV3IERhdGEuRmlsdGVyUHJvY2Vzc29yPERhdGEuUmVhZGVycy5HaW5zcHNjRHRvPihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gZm9ybU9iamVjdD8uZm9ybURpdj8uZmluZEZpZWxkcyhGaWVsZE5hbWVzLnN0YXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghR29yZGljLlV0aWxzLldpZGdldEV4aXN0cygnZ2ZpZWxkJywgJGZpZWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhOiBHUHVibGljVXNlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaWVsZC5nZmllbGQoJ21vZGVsJywgJ2NvbGxlY3QnLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0ID0gZGF0YS5zdGF0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1ldGEuZGF0YS5zdGF0ID09PSBzdGF0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhLlJlYWRlcnMuR2luc3BzY0R0b05hbWVzLnBzYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGEuUmVhZGVycy5HaW5zcHNjRHRvTmFtZXMucG9zdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHNjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucG9zdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0uZmlsdGVyKGkgPT4gaSkuam9pbignIC0gJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc2VsbmlrVHlwRXN1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3PERhdGEuUmVhZGVycy5HaW5jZXN1RHRvPihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5yZWFkZXJzLmdpbmNlc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBEYXRhLlJlYWRlcnMuR2luY2VzdUR0b05hbWVzLnR5cF9lc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTIuMDYuMjAyMyAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlsdHJvdsOhbsOtIGRhdCBkbGUgcG92b2xlbsO9Y2ggdHlwxa8gZXh0ZXJuw61obyBzdWJqZWt0dSAocMWZaSByZWdpc3RyYWNlIG5lZnVuZ3VqZSBzZXJ2ZXJGaWx0ZXIgcHJvdG/FvmUgbmVwb3XFvsOtdsOhIHJlYWRlcikuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0RGVwZW5kZW5jeTogbmV3IERhdGEuRmlsdGVyUHJvY2Vzc29yPERhdGEuUmVhZGVycy5HaW5jZXN1RHRvPihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwRXN1QWxsb3dlZFZhbHVlcyA9IHB1YmxpY0xvZ2luQ29uZmlnPy5hbGxvd2VkVmFsdWVzPy50eXBFc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cEVzdUFsbG93ZWRWYWx1ZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHR5cEVzdVZhbHVlID0gbWV0YS5kYXRhLnR5cF9lc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cEVzdVZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cEVzdUFsbG93ZWRWYWx1ZXMuaW5jbHVkZXModHlwRXN1VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhLlJlYWRlcnMuR2luY2VzdUR0b05hbWVzLnR5cF9lc3VfdHh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogYHske0RhdGEuUmVhZGVycy5HaW5jZXN1RHRvTmFtZXMudHlwX2VzdV90eHR9OnRyaW06ZW5jb2RlfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNlbG5pa1R5cE9yZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldzxEYXRhLlJlYWRlcnMuR2luY3R5b0R0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucmVhZGVycy5naW5jdHlvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogRGF0YS5SZWFkZXJzLkdpbmN0eW9EdG9OYW1lcy50eXBfb3JnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGEuUmVhZGVycy5HaW5jdHlvRHRvTmFtZXMudHlwX29yZ190eHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBgeyR7RGF0YS5SZWFkZXJzLkdpbmN0eW9EdG9OYW1lcy50eXBfb3JnX3R4dH06dHJpbTplbmNvZGV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNlbG5pa1N6clByYXZuaUZvcm1hOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3PENvbnRyb2xzTG9naWMuSW50ZXJmYWNlLkdTenJzcHJmRHRvPihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5yZWFkZXJzLnN6cnNwcmYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBDb250cm9sc0xvZ2ljLkludGVyZmFjZS5HU3pyc3ByZkR0b05hbWVzLmtvZF9wcmF2bmlfZm9ybXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29udHJvbHNMb2dpYy5JbnRlcmZhY2UuR1N6cnNwcmZEdG9OYW1lcy5rb2RfcHJhdm5pX2Zvcm15LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29udHJvbHNMb2dpYy5JbnRlcmZhY2UuR1N6cnNwcmZEdG9OYW1lcy5uYXpldl9wcmF2X2Zvcm15XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogYHske0NvbnRyb2xzTG9naWMuSW50ZXJmYWNlLkdTenJzcHJmRHRvTmFtZXMubmF6ZXZfcHJhdl9mb3JteX06dHJpbTplbmNvZGV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNlbG5pa1R5cEVzdTogR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNlc3UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNlbG5pa1R5cE9yZzogR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmN0eW8oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNlbG5pa1N0YXQ6IEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jc3RhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzZWxuaWtQc2M6IEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zcHNjKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzZWxuaWtTenJQcmF2bmlGb3JtYTogR29yZGljLlByZWZhYnMuU2VsZWN0LnN6cnNwcmYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOYcSNdGVuw60gZGF0IHByw6F2bsOtY2ggZm9yZW0gemUgU1pSLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU9iamVjdC5jaXNlbG5pa1N6clByYXZuaUZvcm1hLmRhdGEuZ2V0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5jaXNlbG5pa1N6clByYXZuaUZvcm1hLmRhdGEuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbFByYXZuaUZvcm1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuZGF0YVByYXZuaUZvcm15ID0gcmV0VmFsUHJhdm5pRm9ybWE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybU9iamVjdC5jaXNlbG5pa1N6clByYXZuaUZvcm1hLmRhdGEuZ2V0RGF0YVJvd3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuZGF0YVByYXZuaUZvcm15ID0gZm9ybU9iamVjdC5jaXNlbG5pa1N6clByYXZuaUZvcm1hLmRhdGEuZ2V0RGF0YVJvd3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5QcmVmYWJzLlNlbGVjdC5zenJzcHJmKCkuZGF0YS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbFByYXZuaUZvcm1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtT2JqZWN0LmRhdGFQcmF2bmlGb3JteSA9IHJldFZhbFByYXZuaUZvcm1hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmHEjXRlbsOtIGRhdCB0eXDFryBvcmdhbml6YWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU9iamVjdC5jaXNlbG5pa1R5cE9yZy5kYXRhLmdldERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuY2lzZWxuaWtUeXBPcmcuZGF0YS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0VmFsVHlwU3ViamVrdHUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5kYXRhVHlwT3JnYW5pemFjZSA9IHJldFZhbFR5cFN1Ympla3R1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1PYmplY3QuY2lzZWxuaWtUeXBPcmcuZGF0YS5nZXREYXRhUm93cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5kYXRhVHlwT3JnYW5pemFjZSA9IGZvcm1PYmplY3QuY2lzZWxuaWtUeXBPcmcuZGF0YS5nZXREYXRhUm93cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1PYmplY3QuY2lzbG9Qb3BPclBhdHQgPSAvXlxccyooPzooXFxkKylcXEQrKT8oXFxkK1thLXpBLVpdPylcXHMqJC87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QucmVDZWxlSm1lbm8gPSAvXlxccyooW1xcd1xccyxcXC5dK1xcLltcXHMsXSopPyhbXlxcc1xcZFxcX1xcLl0rKVtcXHMsXSsoKD86W15cXHNcXGRcXF9cXC5dK1tcXHMsXSopKz8pKFtcXHMsXSsoPzpcXHcrXFwuKSspP1xccyokLztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5yZUptZW5vVHJpbSA9IC9eW1xccyxdKiguKj8pW1xccyxdKiQvO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnRm9ybSA9IGZvcm1PYmplY3QubmFtZSA9PT0gRm9ybU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuX2NyZWF0ZUZvcm0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b8WZw60gZm9ybXVsw6HFmS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3QgcmVnRm9ybSA9IGZvcm1PYmplY3QubmFtZSA9PT0gXCJSZWdpc3RlclB1YmxpY1VzZXJGb3JtXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVnSW5zdHJ1Y3Rpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW5zdHJ1Y3Rpb25zOiBhbnkgPSAkLm5vb3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ0Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1wianJlczozMTQwMDA2N1wiIC8vUkMgMzE0MDAwNjcgOiBWeXBsbsSbbsOtbSBmb3JtdWzDocWZZSBhIGtsaWtudXTDrW0gbmEgPHE+ezB9PC9xPiBkb2pkZSBrIG9kZXNsw6Fuw60gYWt0aXZhxI1uw61obyBlbWFpbHV7ezB9fS4gTmXFviBzZSBwb3BydsOpIHDFmWlobMOhc8OtdGUsIG11c8OtdGUga2xpa25vdXQgbmEgb2RrYXogdXZlZGVuw70gdiBha3RpdmHEjW7DrW0gZW1haWx1LCBhYnljaG9tIG92xJvFmWlsaSwgxb5lIG3DoXRlIHDFmcOtc3R1cCBrIHV2ZWRlbsOpIGVtYWlsb3bDqSBzY2hyw6FuY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnSW5zdHJ1Y3Rpb25zID0gcHVibGljTG9naW5Db25maWdSZXRWYWwudGV4dCAhPSB1bmRlZmluZWQgJiYgcHVibGljTG9naW5Db25maWdSZXRWYWwudGV4dC5pbnN0cnVjdGlvbnMgIT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHVibGljTG9naW5Db25maWdSZXRWYWwudGV4dC5pbnN0cnVjdGlvbnMuZm9ybWF0KFwianJlczozMTQwMDA2OFwiKSA6IFwiXCI7IC8vUkMgMzE0MDAwNjggOiBSZWdpc3Ryb3ZhdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbnN0cnVjdGlvbnMgPSBmdW5jdGlvbiAoZW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ0luc3RydWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5mb3JtRGl2LmZpbmQoXCIuanMtaW5zdHJ1Y3Rpb25zXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmb3JtdGV4dChyZWdJbnN0cnVjdGlvbnMuZm9ybWF0KCFlbWFpbCA/IFwiXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBcIiArIFwianJlczozMTQwMDA3MFwiIC8vUkMgMzE0MDAwNzAgOiBuYSBhZHJlc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiA8c3Ryb25nPlwiICsgZW1haWwgKyBcIjwvc3Ryb25nPlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBfYWRqdXN0VHlwT3JnYW5pemFjZURhdGFWaWV3KHR5cEVzdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHR5cE9yZ0ZpZWxkID0gZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGaWVsZHMoXCJ0eXBPcmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBWaWV3ID0gZm9ybU9iamVjdC5jaXNlbG5pa1R5cE9yZy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wVmlldy5hcHBseVZpZXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBcInR5cF9lc3UgPT09IFwiICsgdHlwRXN1LnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cE9yZ0ZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImRhdGFcIiwgbmV3IEdvcmRpYy5EYXRhLlZpZXcodGVtcFZpZXcuZ2V0Um93cygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwidHlwX29yZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hvd1BsYWNlaG9sZGVycyA9IHJlZ0Zvcm0gJiYgKHB1YmxpY0xvZ2luQ29uZmlnPy5zaG93UGxhY2Vob2xkZXJzID8/IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZXMgPSBwYXJhbXMuaW5pdGlhbFZhbHVlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDIwLjAyLjIwMjMgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUMWZaWTDoW5hIHBvZG3DrW5rYSBuYSBwZXJtaXNzaW9ucyBDYW5FZGl0RW1haWxBc0xvZ2luICh0ZW9yZXRpY2t5IGJ5IG1vaGxvIG5haHJhZGl0IFJlZ2lzdHJhdGlvblR5cGUpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FuRWRpdEVtYWlsQXNMb2dpbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluaXRpYWxWYWx1ZXM/LlBlcm1pc3Npb25zPy5DYW5FZGl0RW1haWxBc0xvZ2luPy52YWx1ZSB8fCByZWdGb3JtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGluaXRpYWxWYWx1ZXM/LlJlZ2lzdHJhdGlvblR5cGUgPT09IEdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuUHVibGljVXNlckxvZ2luUmVnaXN0cmF0aW9uVHlwZUVudW0uR2luaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTkuMDguMjAyNCAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNb8W+bm9zdCBkw6F0IGptw6lubyBhIHDFmcOtam1lbsOtIG5lcG92aW5uw6kgcMWZaSBlZGl0YWNpIG9zb2Juw61jaCDDumRhasWvLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNQcmlqbWVuaUptZW5vUmVxdWlyZWQgPSByZWdGb3JtIHx8IHB1YmxpY0xvZ2luQ29uZmlnPy5pc05hbWVBbmRTdXJuYW1lUmVxdWlyZWRGb3JFZGl0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmVuaSBmb3JtdWxhcmUgcHJvIHJlZ2lzdHJhY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1CdWlsZGVyID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmb3JtT2JqZWN0Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogZm9ybU9iamVjdC5sYXlvdXREZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRFbWFpbFJvdyA9IChoaW50Pzogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMxNDAwMDIyXCIsIC8vUkMgMzE0MDAwMjIgOiBFbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGludDogaGludFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMuZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5lbWFpbH0gPSB2YWx1ZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFR5cGU6IFwiZW1haWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG91xb5pdMOtIGVtYWlsdSBqYWtvIHXFvml2YXRlbHNrw6lobyBqbcOpbmEgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkZm9ybSA9IGZvcm1PYmplY3QuZm9ybURpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICRlbWFpbCA9ICRmb3JtLmZpbmRGaWVsZHMoRmllbGROYW1lcy5lbWFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBlbWFpbCA9ICRlbWFpbC5nZmllbGQoXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGlzVmFsaWQgPSBlbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCRlbWFpbCBhcyBhbnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcInZhbGlkYXRlXCIsIGZvcm1PYmplY3QuX2NyZWF0ZVZhbGlkYXRpb25Hcm91cHMoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwiZ2V0RXJyb3JzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE2LjA1LjIwMjMgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBlcm1pc3Npb24gdnlob2Rub2Nlbm8gdsOhxaFlIHYgcHJvbcSbbm7DqSBjYW5FZGl0RW1haWxBc0xvZ2luLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5FZGl0RW1haWxBc0xvZ2luICYmICRmb3JtLmZpbmRGaWVsZHMoRmllbGROYW1lcy5lbWFpbEFzTG9naW4pLmdmaWVsZDxib29sZWFuIHwgdW5kZWZpbmVkPihcImdldFZhbHVlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtLmZpbmRGaWVsZHMoRmllbGROYW1lcy51eml2YXRlbHNrZUptZW5vKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcInNldEluaXRpYWxcIiwgaXNWYWxpZCA/IGVtYWlsIDogXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbnN0cnVjdGlvbnMoaXNWYWxpZCA/IGVtYWlsIDogXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHNob3dQbGFjZWhvbGRlcnMgPyBcImFubmFAZW1haWwuY3pcIiA6IHZvaWQgMC8vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YWxpZGF0b3JzOiByZWdGb3JtID8gdW5kZWZpbmVkIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBzdG9wcGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBncm91cDogR1B1YmxpY1VzZXJEdG8uVmFsaWRhdGlvbkdyb3VwLkdST1VQX1JFR0lTVFJBVElPTlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICArIFwiLlwiICsgR1B1YmxpY1VzZXJEdG8uVmFsaWRhdGlvbkdyb3VwLkdST1VQX0NIQU5HRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAyMC4xMS4yMDIzIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUMWZaWTDoW4gc291aGxhcyBwcm8gbm90aWZpa2FjZSBlbWFpbGVtLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKCdnY2hlY2snLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ2pyZXM6MzIxMDAzNTAnLCAvL1JDIDMyMTAwMzUwIDogT2Rlc8OtbGF0IG5vdGlmaWthY2Ugc291dmlzZWrDrWPDrSBzIGVsZWt0cm9uaWNrw71tIHZ5xZlpem92w6Fuw61tIGFnZW5keSBzIMO6xZlhZGVtLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy51c2VFbWFpbE5vdGlmaWNhdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5Vc2VFbWFpbE5vdGlmaWNhdGlvbnN9ID0gdmFsdWVgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRVc2VyTmFtZVJvdyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQnVpbGRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwMjNcIiwgLy9SQyAzMTQwMDAyMyA6IFBvdcW+w610IGVtYWlsIGpha28gdcW+aXZhdGVsc2vDqSBqbcOpbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMuZW1haWxBc0xvZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dQdWJsaWNVc2VyRHRvTmFtZXMuZW1haWxBc0xvZ2lufSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGlzYWJsZWQ6IGluaXRpYWxWYWx1ZXMuUmVnaXN0cmF0aW9uVHlwZSAhPT0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RVc2VyOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE2LjA1LjIwMjMgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBlcm1pc3Npb24gdnlob2Rub2Nlbm8gdsOhxaFlIHYgcHJvbcSbbm7DqSBjYW5FZGl0RW1haWxBc0xvZ2luLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2FuRWRpdEVtYWlsQXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkdXNlciA9IGZvcm1PYmplY3QuZm9ybURpdi5maW5kRmllbGRzKFwidXppdmF0ZWxza2VKbWVub1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHVzZUVtYWlsID0gJChldmVudC50YXJnZXQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VFbWFpbCA9IGNoYW5nZU9iai52YWx1ZSAhPT0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VFbWFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoJHVzZUVtYWlsIGFzIGFueSkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwibGFzdFVzZXJcIiwgJHVzZXIuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgfHwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdXNlci5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB1c2VFbWFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcInNldEluaXRpYWxcIiwgdXNlRW1haWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGaWVsZHMoXCJlbWFpbFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAoJHVzZUVtYWlsIGFzIGFueSkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwibGFzdFVzZXJcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGFzIGFueSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxNDAwMDI0XCIpIC8vUkMgMzE0MDAwMjQgOiBVxb5pdmF0ZWxza8OpIGptw6lubyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy51eml2YXRlbHNrZUptZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dQdWJsaWNVc2VyRHRvTmFtZXMudXppdmF0ZWxza2VKbWVub30gPSB2YWx1ZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Rpc2FibGVkOiBpbml0aWFsVmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAmJiAoaW5pdGlhbFZhbHVlcy5lbWFpbEFzTG9naW4gfHwgaW5pdGlhbFZhbHVlcy5SZWdpc3RyYXRpb25UeXBlICE9PSAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMTQwMDAyNVwiLCAvL1JDIDMxNDAwMDI1IDogVcW+aXZhdGVsc2vDqSBqbcOpbm8gbmVzbcOtIG9ic2Fob3ZhdCBcIkBcIiBuZWJvIG11c8OtIGLDvXQgc3Rlam7DqSBqYWtvIGVtYWlsLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlLCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHV6aXZhdGVsc2tlIGptZW5vIG5lc21pIG9ic2Fob3ZhdCBcIkBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVibyBtdXNpIGJ5dCBzdGVqbmUgamFrbyBlbWFpbFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhdmFsdWUgfHwgIXZhbHVlLmluY2x1ZGVzKFwiQFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHZhbHVlID09PSBmb3JtT2JqZWN0LmZvcm1EaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmRGaWVsZHMoRmllbGROYW1lcy5lbWFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogXCJjdXN0b21WYWxpZGF0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVsbENoZWNrOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUMWZaWhsYcWhb3ZhY8OtIMO6ZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDA1LjEwLjIwMjMgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUMWZaSByZWdpc3RyYcSNbsOtbSBmb3JtdWzDocWZaSBkw6F2w6FtIGVtYWlsIG5hIHphxI10ZWsuIEppbmFrIGRvIGtvbnRha3Ruw61jaCDDumRhasWvLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ0Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQnVpbGRlci5hZGRTZWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHJlZ0Zvcm0gPyB1bmRlZmluZWQgOiBcImpyZXM6MzIxMDAxNThcIiwgLy9SQyAzMjEwMDE1OCA6IFDFmWlobGHFoW92YWPDrSDDumRhamVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogU2VjdGlvbk5hbWVzLnByaWhsYXNvdmFjaVVkYWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEVtYWlsUm93KFwianJlczozMjEwMDE2MFwiKTsgLy9SQyAzMjEwMDE2MCA6IEVtYWlsIGplIG5lemJ5dG7DvSB2IHDFmcOtcGFkxJsgb2Jub3ZlbsOtIHphcG9tZW51dMOpaG8gaGVzbGEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlck5hbWVSb3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzE0MDAwNDRcIikgLy9SQyAzMTQwMDA0NCA6IEhlc2xvLCBvdsSbxZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuR1N0cmluZ0JveC5wYXNzd29yZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNsb3V6aWxKc2VtU2JpcmFuaUhvZG5vdFpQb2xpY2VrVGFrQWJ5TmVtb2hsTmFzdGF0UHJvYmxlbVNOZWFrdHVhbG5pbVNpZnJvdmFjaW1LbGljZW06IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMuaGVzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5oZXNsb30gPSB2YWx1ZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJyZXNldEVycm9yc1wiLCBcInNlcnZlclZhbGlkYXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuR1N0cmluZ0JveC5wYXNzd29yZFJlRW50ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRGaWVsZE5hbWU6IFwiaGVzbG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2xvdXppbEpzZW1TYmlyYW5pSG9kbm90WlBvbGljZWtUYWtBYnlOZW1vaGxOYXN0YXRQcm9ibGVtU05lYWt0dWFsbmltU2lmcm92YWNpbUtsaWNlbTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5vdmVyZW5pSGVzbGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5vdmVyZW5pSGVzbGF9ID0gdmFsdWVgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJzZXJ2ZXJWYWxpZGF0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9zb2Juw60gaW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQnVpbGRlci5hZGRTZWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMyMTAwMTU3XCIsIC8vUkMgMzIxMDAxNTcgOiBPc29ibsOtIMO6ZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFNlY3Rpb25OYW1lcy5vc29ibmlVZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWdGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlck5hbWVSb3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQnVpbGRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxNDAwMDI3XCIpIC8vUkMgMzE0MDAwMjcgOiBUeXAgc3ViamVrdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQ8RGF0YS5SZWFkZXJzLkdpbmNlc3VEdG8+KFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMudHlwRXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy50eXBFc3V9ID0gdmFsdWUuJHtEYXRhLlJlYWRlcnMuR2luY2VzdUR0b05hbWVzLnR5cF9lc3V9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kaXNhYmxlZDogIXJlZ0Zvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gbW9kZWxWYWx1ZTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY29sbGVjdDogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHsgcmV0dXJuIGZpZWxkVmFsdWU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3R5cF9lc3U6IFwiIT0gMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfZXN1OiBwdWJsaWNMb2dpbkNvbmZpZz8uYWxsb3dlZFZhbHVlcz8udHlwRXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJzZXJ2ZXJWYWxpZGF0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VPYmoudmFsdWUgJiYgdHlwZW9mIGNoYW5nZU9iai52YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRUeXBPcmdzID0gcHVibGljTG9naW5Db25maWc/LmRlZmF1bHRPcmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkanVzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwRXN1ID0gY2hhbmdlT2JqLnZhbHVlPy50eXBfZXN1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWRqdXN0VHlwT3JnYW5pemFjZURhdGFWaWV3KHR5cEVzdSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll9hZGp1c3RGb3JtKHR5cEVzdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdmVuaSB0eXB1IG9yZ2FuaXphY2UgXCJwb2RuaWthdGVsIC0gT1NWxIxcIiBqYWtvIHbDvWNob3rDrSBwcm8gT1NWxIwgYSBcInByw6F2LiBvc29iYSAtIHMuci5vLlwiIHBybyBwcsOhdm7DrWNrb3Ugb3NvYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoY2hhbmdlT2JqLnZhbHVlLnR5cF9lc3UgPT09IDMwIHx8IGNoYW5nZU9iai52YWx1ZS50eXBfZXN1ID09PSAxMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGF2ZW7DrSB2w71jaG96w60gaG9kbm90eSB0eXB1IHN1Ympla3R1IHBybyBkYW7DvSB0eXAgZXN1LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtVmFsdWU6IEdQdWJsaWNVc2VyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IGZvcm1PYmplY3QuY29udGFpbmVyLmZpbmRGaWVsZHMoRmllbGROYW1lcy50eXBPcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGZvcm1WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtVmFsdWUudHlwT3JnID09PSBudWxsIHx8IGZvcm1WYWx1ZS50eXBPcmcgPT09IHVuZGVmaW5lZCB8fCBmb3JtVmFsdWUudHlwT3JnID09PSAwIHx8ICFmaWVsZHMuZ2ZpZWxkKFwiaGFzQ2hhbmdlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR5cE9yZzogbnVtYmVyID0gMDsgLy8gbmV1csSNZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxNS4wNi4yMDE4IC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFXFvml2YXRlbHNreSBuYXN0YXZlbsOpIHbDvWNob3rDrSBob2Rub3R5IHR5cHUgb3JnYW5pemFjw60gcHJvIGRhbsOpIHR5cHkgZXN1LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0eXBFc3UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOiAvLyBwcsOhdm5pY2vDoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFR5cE9yZ3MgJiYgZGVmYXVsdFR5cE9yZ3MucHJhdm5pY2thT3NvYmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cE9yZyA9IC8qZGVmYXVsdFR5cE9yZ3MgJiYgKi9kZWZhdWx0VHlwT3Jncy5wcmF2bmlja2FPc29iYS8qICE9PSB1bmRlZmluZWQgPyBkZWZhdWx0VHlwT3Jncy5wbyA6IDM0Ki87IC8vIHByw6F2LiBvc29iYSAtIHMuci5vLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjA6IC8vIGZ5emlja8OhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VHlwT3JncyAmJiBkZWZhdWx0VHlwT3Jncy5meXppY2thT3NvYmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cE9yZyA9IC8qZGVmYXVsdFR5cE9yZ3MgJiYqLyBkZWZhdWx0VHlwT3Jncy5meXppY2thT3NvYmEvKiAhPT0gdW5kZWZpbmVkID8gZGVmYXVsdFR5cE9yZ3MuZm8gOiA3MCovOyAvLyBvYsSNYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwOiAvLyBvc3bEjVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFR5cE9yZ3MgJiYgZGVmYXVsdFR5cE9yZ3MuZnl6aWNrYU9zb2JhT3N2Yykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwT3JnID0gLypkZWZhdWx0VHlwT3JncyAmJiovIGRlZmF1bHRUeXBPcmdzLmZ5emlja2FPc29iYU9zdmMvKiAhPT0gdW5kZWZpbmVkID8gZGVmYXVsdFR5cE9yZ3MuZm9Pc3ZjIDogODAqLzsgLy8gcG9kbmlrYXRlbCAtIE9TVsSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtVmFsdWUudHlwT3JnID0gZm9ybU9iamVjdC5fZ2V0VHlwT3JnYW5pemFjZSh0eXBPcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoZm9ybVZhbHVlLnR5cE9yZyA9PT0gbnVsbCB8fCBmb3JtVmFsdWUudHlwT3JnID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGZvcm1WYWx1ZS50eXBPcmcgPSBmb3JtT2JqZWN0Ll9nZXRQcmF2bmlGb3JtYShcIjEwXCIgKyB0eXBPcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybVZhbHVlLnR5cE9yZyA9PT0gbnVsbCB8fCBmb3JtVmFsdWUudHlwT3JnID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtVmFsdWUudHlwT3JnID0gZm9ybU9iamVjdC5fZ2V0VHlwT3JnYW5pemFjZSgwKTsgLy8gbmV1csSNZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBmb3JtVmFsdWUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZsYWdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cEVzdUNoYW5nZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIWRlZmF1bHRUeXBPcmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbG9hZFB1YmxpY0xvZ2luQ29uZmlnKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZGVmYXVsdFR5cE9yZ3MgPSBwdWJsaWNMb2dpbkNvbmZpZy5kZWZhdWx0T3JnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgYWRqdXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGp1c3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghZGVmYXVsdFR5cE9yZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBuZXcgR0NvbnRlbnQoXCJHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdMb2dpblV0aWxzXCIpLmNhbGwoXCJHZXREZWZhdWx0T3JnRm9yRXN1XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5kb25lKGZ1bmN0aW9uIChkZWZhdWx0VHlwT3Jnc1JldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZGVmYXVsdFR5cE9yZ3MgPSBkZWZhdWx0VHlwT3Jnc1JldFZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGFkanVzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgYWRqdXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmb3JtT2JqZWN0LmNpc2VsbmlrVHlwRXN1KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMTQwMDAyOFwiLCAvL1JDIDMxNDAwMDI4IDogScSMT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1pc0hpZGVhYmxlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLmljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5pY30gPSB2YWx1ZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJzZXJ2ZXJWYWxpZGF0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VPYmoudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgkZmllbGQuZ2ZpZWxkKFwidmFsaWRhdGVcIiksICEkZmllbGQuZ2ZpZWxkKFwiZ2V0RXJyb3JzXCIpLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR1B1YmxpY1VzZXJSZWdGb3JtLmdldEFyZXNEYXRhKGNoYW5nZU9iai52YWx1ZSwgcmVnRm9ybSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtT2JqZWN0Ll9nZXRBcmVzRGF0YShjaGFuZ2VPYmoudmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChjb25zb2xlLndhcm4uYmluZChjb25zb2xlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1PYmplY3QuX2FwcGx5QXJlc0RhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdnaS1hY2NlcHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2FwcGx5QXJlc0RhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMjEwMDE1NFwiLCAvL1JDIDMyMTAwMTU0IDogTmFwbG5pdCBob2Rub3R5IHogcmVqc3TFmcOta3UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIG9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKG9iamVjdC5maWVsZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpYyA9ICRmaWVsZC5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpYyAmJiAoJGZpZWxkLmdmaWVsZChcInZhbGlkYXRlXCIpLCAhJGZpZWxkLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHUHVibGljVXNlclJlZ0Zvcm0uZ2V0QXJlc0RhdGEoaWMsIHJlZ0Zvcm0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1PYmplY3QuX2dldEFyZXNEYXRhKGljKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmZhaWwoZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIEdEbGcuYWxlcnQoXCJqcmVzOjI1MDMwNDUyXCIsIG1zZyk7IC8vUkMgMjUwMzA0NTIgOiBDaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHRGxnLmNvbmZpcm0oXCJqcmVzOjMxNDAwMDQ4XCIgLy9SQyAzMTQwMDA0OCA6IFBvdHZyemVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgXCJqcmVzOjMxNDAwMDQ5XCIuZm9ybWF0KGljKSkgLy9SQyAzMTQwMDA0OSA6IE9wcmF2ZHUgY2hjZXRlIG5hxI3DrXN0IGRhdGEgcHJvIEnEjCB7MH0gYSBwxZllcHNhdCBqaW1pIFbDoW1pIHphZGFuw6kgw7pkYWplP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll9hcHBseUFyZXNEYXRhKGRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dLy8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuSWNvKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL21lc3NhZ2U6IFwiUG92aW5uw6EgaG9kbm90YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9lcnJvclR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vc3RvcHBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlLCBzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyB2cmFjaW0gdHJ1ZSwgcG9rdWQgamUgaG9kbm90YSBzcHJhdm5hLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICghR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmb3JtXCIsIGZvcm1PYmplY3QuZm9ybURpdikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc3QgdHlwRXN1ID0gKGZvcm1PYmplY3QuZm9ybURpdiBhcyBKUXVlcnk8SFRNTEVsZW1lbnQ+KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZmluZEZpZWxkcyhGaWVsZE5hbWVzLnR5cEVzdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdmaWVsZDx7IHR5cF9lc3U/OiBudW1iZXIgfSB8IHVuZGVmaW5lZD4oXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gMCAtIFwibmV1csSNZW5vXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAxMCAtIFwicHLDoXZuaWNrw6Egb3NvYmFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIDIwIC0gXCJmeXppY2vDoSBvc29iYVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gMzAgLSBcImZ5emlja8OhIG9zb2JhIC0gT1NWxIxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICh0eXBFc3UgJiYgKHR5cEVzdS50eXBfZXN1ID09PSAxMCB8fCB0eXBFc3UudHlwX2VzdSA9PT0gMzApICYmIEdvcmRpYy5VdGlscy5HU3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1pc0hpZGVhYmxlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMuaXNWYXRQYXllcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dQdWJsaWNVc2VyRHRvTmFtZXMuSXNWYXRQYXllcn0gPSB2YWx1ZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwOTFcIiwgLy9SQyAzMTQwMDA5MSA6IFBsw6F0Y2UgRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNWYXRQYXllciA9ICEhJChldmVudC50YXJnZXQpLmdmaWVsZChcImdldFZhbHVlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaWNGaWVsZFZhbGlkYXRvcnMgPSBmb3JtT2JqZWN0LmZvcm1EaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmRGaWVsZHMoXCJkaWNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm9wdGlvblwiLCBcInZhbGlkYXRvcnNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGlkeFJlcXVpcmVkID0gKGRpY0ZpZWxkVmFsaWRhdG9ycyBhcyBhbnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kSW5kZXgoZnVuY3Rpb24gKHZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvciBpbnN0YW5jZW9mIEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgaXNSZXF1aXJlZCA9IGlkeFJlcXVpcmVkICE9PSAtMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUmVxdWlyZWQgIT09IGlzVmF0UGF5ZXIgJiYgZGljRmllbGRWYWxpZGF0b3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmF0UGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGljRmllbGRWYWxpZGF0b3JzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHUHVibGljVXNlckR0by5WYWxpZGF0aW9uR3JvdXAuR1JPVVBfQlVTSU5FU1NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpY0ZpZWxkVmFsaWRhdG9ycy5zcGxpY2UoaWR4UmVxdWlyZWQsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTAuMDIuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWt0dWFsaXphY2UgdmFsaWTDoXRvcsWvIGEgbmFzdGF2ZW7DrSByZXF1aXJlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll91cGRhdGVWYWxpZGF0b3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMxNDAwMDI5XCIsIC8vUkMgMzE0MDAwMjkgOiBEScSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLWlzSGlkZWFibGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMuZGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5kaWN9ID0gdmFsdWVgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwMzBcIiwgLy9SQyAzMTQwMDAzMCA6IEptw6luby9PYmNob2Ruw60gZmlybWFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtaXNIaWRlYWJsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5vYmNob2RuaUptZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5vYmNob2RuaUptZW5vfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wcGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogR1B1YmxpY1VzZXJEdG8uVmFsaWRhdGlvbkdyb3VwLkdST1VQX0NPTVBBTllcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJzZXJ2ZXJWYWxpZGF0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyNTAzMDQ1NVwiLCAgLy9SQyAyNTAzMDQ1NSA6IFR5cCBvcmdhbml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLWlzSGlkZWFibGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eXBPcmdTZXJ2ZXJGaWx0ZXJzOiBvYmplY3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZ0Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBPcmdTZXJ2ZXJGaWx0ZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfZXN1OiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koRmllbGROYW1lcy50eXBFc3UsIFwidHlwX2VzdVwiLCB0cnVlKSAvLywgYm9vbCB6bmFtZW7DoSwgemRhIGx6ZSB2eXBsbml0IGhvZG5vdHUgYW5pxb4gYnkgYnlsbyB2eXBsbsSbbsOpIG1hc3RlciBwb2zDrcSNa29cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQ8RGF0YS5SZWFkZXJzLkdpbmN0eW9EdG8+KFwiZ3NlbGVjdGJveFwiLCBmb3JtT2JqZWN0LmNpc2VsbmlrVHlwT3JnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMudHlwT3JnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLywgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dQdWJsaWNVc2VyRHRvTmFtZXMudHlwT3JnfSA9IHZhbHVlLiR7RGF0YS5SZWFkZXJzLkdpbmN0eW9EdG9OYW1lcy50eXBfb3JnfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IGB7JHtEYXRhLlJlYWRlcnMuR2luY3R5b0R0b05hbWVzLnR5cF9vcmdfdHh0fTp0cmltOmVuY29kZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB0eXBPcmdTZXJ2ZXJGaWx0ZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdmFsdWUsIGZsYWdzIH0gPSBjaGFuZ2VPYmo7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgc2Ugem3Em27DrSB0eXAgc3ViamVrdHUgZGxlIGRlcGVuZGVjeSB0YWsgbmFzdGF2w61tIG5ldXLEjWl0byBtw61zdG8gbnVsbC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmbGFncy5kZXBlbmRlbmN5U2V0ICYmICF2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYudGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZEZpZWxkcyhGaWVsZE5hbWVzLnR5cE9yZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyB0eXBPcmc6IG51bGwgfSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE3Em27DrW0gaG9kbm90dSBkbGUgdHlwdUVzdSwgbmFzdGF2w61tIGppIGpha28gaW5pdGlhbCB2YWx1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmbGFncy50eXBFc3VDaGFuZ2VkICYmIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi50YXJnZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kRmllbGRzKEZpZWxkTmFtZXMudHlwT3JnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwiY29uZmlybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjdXN0b21DbGFzczogXCJqcy1yZXByZXNlbnRhdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwNzNcIiwgLy9SQyAzMTQwMDA3MyA6IFphc3R1cHVqw61jw60gb3NvYmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogU2VjdGlvbk5hbWVzLm9zb2JhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRUZXh0KFwianJlczozMTQwMDA3M1wiKSAvL1JDIDMxNDAwMDczIDogWmFzdHVwdWrDrWPDrSBvc29iYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxNDAwMDcxXCIpIC8vUkMgMzE0MDAwNzEgOiBUaXR1bHkgcMWZZWQsIHphIGptw6luZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy50aXR1bFByZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBgbW9kZWwuJHtHUHVibGljVXNlckR0b05hbWVzLnRpdHVsUHJlZH0gPSB2YWx1ZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogc2hvd1BsYWNlaG9sZGVycyA/IFwiSW5nLlwiIDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMudGl0dWxaYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dQdWJsaWNVc2VyRHRvTmFtZXMudGl0dWxaYX0gPSB2YWx1ZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogc2hvd1BsYWNlaG9sZGVycyA/IFwiUGguIEQuXCIgOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJzZXJ2ZXJWYWxpZGF0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTAzMDM1NlwiKSAvL1JDIDI1MDMwMzU2IDogSm3DqW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMuam1lbm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBgbW9kZWwuJHtHUHVibGljVXNlckR0b05hbWVzLmptZW5vfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHNob3dQbGFjZWhvbGRlcnMgPyBcIkFubmFcIiA6IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJyZXNldEVycm9yc1wiLCBcInNlcnZlclZhbGlkYXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IGlzUHJpam1lbmlKbWVub1JlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wcGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2pyZXM6MzIxMDAzODYnLCAvL1JDIDMyMTAwMzg2IDogWmFkZWp0ZSBqbcOpbm8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHUHVibGljVXNlckR0by5WYWxpZGF0aW9uR3JvdXAuR1JPVVBfQ0hBTkdFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdm9pZCAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTQwMDAzMlwiKSAvL1JDIDMxNDAwMDMyIDogUMWZw61qbWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5wcmlqbWVuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dQdWJsaWNVc2VyRHRvTmFtZXMucHJpam1lbml9ID0gdmFsdWVgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogc2hvd1BsYWNlaG9sZGVycyA/IFwiTm92w6Frb3bDoVwiIDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogaXNQcmlqbWVuaUptZW5vUmVxdWlyZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnanJlczozMjEwMDM4NycsIC8vUkMgMzIxMDAzODcgOiBaYWRlanRlIHDFmcOtam1lbsOtLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogR1B1YmxpY1VzZXJEdG8uVmFsaWRhdGlvbkdyb3VwLkdST1VQX0NIQU5HRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHZvaWQgMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiUm9kbsOpIMSNw61zbG9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IEZpZWxkTmFtZXMucm9kbmVDaXNsbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwNThcIiwgLy9SQyAzMTQwMDA1OCA6IERhdHVtIG5hcm96ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1pc0hpZGVhYmxlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5kYXR1bU5hcm96ZW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5kYXR1bU5hcm96ZW5pfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZChcIi5nLWJ1dHRvbi0tZGlzYWJsZWRcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiRnVua2NlIHZlIGZpcm3Em1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogRmllbGROYW1lcy5mdW5rY2VWZUZpcm1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZHJlc2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdvb2dQbGFjZXMgPSBuZXcgQXBpLkdQbGFjZXMoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBBZGRyZXNzRmllbGRzID0gZnVuY3Rpb24gKGNvbXBvbmVudCwgZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIGNvbXBvbmVudC5sb25nX25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInN0YXRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2lzX2FhID0gY29tcG9uZW50LnNob3J0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdzdGF0ID0gZm9ybU9iamVjdC5kYXRhVmlld1N0YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YVJvd3MoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdy5zdGF0X3Npc19hYSA9PT0gc2lzX2FhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdzdGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ3N0YXQuc3RhdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQnVpbGRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMDkuMTIuMjAxOSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRleHQgem3Em27Em24gZGxlIHBvxb5hZGF2a3UgUi4gRm91c2thIC0gc2plZG5vY2Vuw60gdGVybWlub2xvZ2llIHMgSVNEUyBhIE5JQS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9waGFicmljYXRvci5nb3JkaWMuY3ovVDI0MlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMyMTAwMTAyXCIsIC8vUkMgMzIxMDAxMDIgOiBBZHJlc2EgdHJ2YWzDqWhvIHBvYnl0dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTZWN0aW9uTmFtZXMuYWRyZXNhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coeyBjdXN0b21DbGFzczogXCJqcy1hZHJlc2FcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8gcG9waXNlayBzZSBtxJtuw60gdiB6w6F2aXNsb3N0aSBuYSB2eWJyYW5uw6ltIHR5cHUgc3ViamVrdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRUZXh0KFwianJlczozMjEwMDEwMlwiKSAgLy9SQyAzMjEwMDEwMiA6IFRydmFsw6kgYnlkbGnFoXTEm1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xhYmVsOiBcImpyZXM6MjUwMzA0MTMsIDxzcGFuIGNsYXNzPSdyZXF1aXJlZCc+anJlczozMTQwMDA4OTwvc3Bhbj5cIiwgLy9SQyAzMTQwMDA4OSA6IMSMw61zbG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczogXCJqcy1pZ25vcmUtbWFyay1yZXF1aXJlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnanJlczoyNTAzMDQxMycsIC8vUkMgMjUwMzA0MTMgOiBVbGljZSwgxI0ucG9wLCDEjS5vclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaW50OiAnanJlczozMTQwMDA4OScgLy9SQyAzMTQwMDA4OSA6IFVsaWNlLCDEjcOtc2xvIHBvcGlzbsOpLCDEjcOtc2xvIG9yaWVudGHEjW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctOFwiLCBnb29nUGxhY2VzLnByZWZhYigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMudWxpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBgbW9kZWwuJHtHUHVibGljVXNlckR0b05hbWVzLnVsaWNlfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJyZXNldEVycm9yc1wiLCBcInNlcnZlclZhbGlkYXRpb25cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gY2hhbmdlT2JqLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ29vZ1BsYWNlcy5nZXRQbGFjZURldGFpbHModmFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGV0YWlscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBVdGlscy5vYmplY3RNYXAoZGV0YWlsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcEFkZHJlc3NDb21wb25lbnRzQnlUeXBlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bGljZTogXCJyb3V0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvYmVjOiBcImxvY2FsaXR5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHBzYzogXCJwb3N0YWxfY29kZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBzdGF0OiBcImNvdW50cnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbWFwQWRkcmVzc0ZpZWxkcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICYmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAodmFsdWUgYXMgYW55KS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmcubWFpbl90ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBhcHBseTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogc2hvd1BsYWNlaG9sZGVycyA/IFwiU3RybcOhXCIgOiB2b2lkIDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2Zvcm1hdHRlZGJveFwiLCBcInctNFwiLCBHb3JkaWMuUHJlZmFicy5HRm9ybWF0dGVkQm94LnN0cmVldE5yU2luZ2xlKFwiY1BvcFwiLCBcImNPclwiKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IEZpZWxkTmFtZXMuY2lzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9tb2RlbDogXCJtb2RlbC5cIiArIEdQdWJsaWNVc2VyRHRvTmFtZXMuY2lzbG8gKyBcIiA9IHZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgc3RvcHBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBncm91cDogR1B1YmxpY1VzZXJEdG8uVmFsaWRhdGlvbkdyb3VwLkdST1VQX1JFR0lTVFJBVElPTlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICsgXCIuXCIgKyBHUHVibGljVXNlckR0by5WYWxpZGF0aW9uR3JvdXAuR1JPVVBfQ0hBTkdFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBwbGFjZWhvbGRlcjogc2hvd1BsYWNlaG9sZGVycyA/IFwiNDMyLzFcIiA6IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJzZXJ2ZXJWYWxpZGF0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMuY2lzbG9Qb3Bpc25lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5jUG9wfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdqcmVzOjMyMTAwMzIwJywgLy9SQyAzMjEwMDMyMCA6IMSMLnBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJyZXNldEVycm9yc1wiLCBcInNlcnZlclZhbGlkYXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLmNpc2xvT3JpZW50YWNuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dQdWJsaWNVc2VyRHRvTmFtZXMuY09yfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdqcmVzOjMyMTAwMzIxJywgLy9SQyAzMjEwMDMyMSA6IMSMLm9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJzZXJ2ZXJWYWxpZGF0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMjEwMDMxOVwiKSAvL1JDIDMyMTAwMzE5IDogxIzDoXN0IG9iY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5jYXN0T2JjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dQdWJsaWNVc2VyRHRvTmFtZXMuY2FzdE9iY2V9ID0gdmFsdWVgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzE0MDAwMzZcIikgLy9SQyAzMTQwMDAzNiA6IFBTxIwsIE9iZWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQ8RGF0YS5SZWFkZXJzLkdpbnNwc2NEdG8+KFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBmb3JtT2JqZWN0LmNpc2VsbmlrUHNjLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMucHNjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5wc2N9ID0gdmFsdWUuJHtEYXRhLlJlYWRlcnMuR2luc3BzY0R0b05hbWVzLnBzY307YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBgbW9kZWwuJHtHUHVibGljVXNlckR0b05hbWVzLnN0YXR9ID0+IHZhbHVlLiR7RGF0YS5SZWFkZXJzLkdpbnNwc2NEdG9OYW1lcy5zdGF0fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE5LjA2LjIwMjMgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkVHJhbnNmb3JtOiAoaW5wdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9kc3RyYW7DrW0gbWV6ZXJ5IHogUFPEjCAodsSNZXRuxJsgbWV6ZXIgdXByb3N0xZllZCB0ZXh0dSBjb8W+IMWZZcWhw60gcmVwbGFjZSkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwc2MgPSB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnID8gaW5wdXQudHJpbSgpLnJlcGxhY2UoL1xccy9nLCAnJykgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwc2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2cmF0aW1lIHB1dm9kbmkgaG9kbm90dSBwcm8gcHJpcGFkLCB6ZSBzaSBzIG5pIHZlcmlmaWthY2UgbmVqYWsgcG9yYWRpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogRGF0YS5SZWFkZXJzLkdpbnNwc2NEdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHNjOiBwc2NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdDogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KEZpZWxkTmFtZXMuc3RhdCwgR1B1YmxpY1VzZXJEdG9OYW1lcy5zdGF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdmb3JtYXR0ZWRib3hcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IEZpZWxkTmFtZXMucHNjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcIm1vZGVsLlwiICsgR1B1YmxpY1VzZXJEdG9OYW1lcy5wc2MgKyBcIiA9IHZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcGxhY2Vob2xkZXI6IHNob3dQbGFjZWhvbGRlcnMgPyBcIjEyMyA0NVwiIDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHBhcnNlcjogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgPyBzdHIucmVwbGFjZSgvXFxEL2csIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICA6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGZvcm1hdHRlcjogZnVuY3Rpb24gKHZhbHVlLCBpc0VkaXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPD0gMyA/IHZhbHVlIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHZhbHVlLnNsaWNlKDAsIDMpICsgXCIgXCIgKyB2YWx1ZS5zbGljZSgzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJyZXNldEVycm9yc1wiLCBcInNlcnZlclZhbGlkYXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy04XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5vYmVjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5vYmVjfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHNob3dQbGFjZWhvbGRlcnMgPyBcIlJhamVjXCIgOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJzZXJ2ZXJWYWxpZGF0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNTAzMDA1M1wiKSAvL1JDIDI1MDMwMDUzIDogU3TDoXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQ8RGF0YS5SZWFkZXJzLkdpbmNzdGFEdG8+KFwiZ3NlbGVjdGJveFwiLCBmb3JtT2JqZWN0LmNpc2VsbmlrU3RhdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLnN0YXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBgbW9kZWwuJHtHUHVibGljVXNlckR0b05hbWVzLnN0YXR9ID0gdmFsdWUuJHtEYXRhLlJlYWRlcnMuR2luY3N0YUR0b05hbWVzLnN0YXR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJzZXJ2ZXJWYWxpZGF0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFNlY3Rpb25OYW1lcy5rb250YWt0eVByb0VsZWt0cm9uaWNrb3VLb211bmlrYWNpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ2pyZXM6MzIxMDAzNDknIC8vUkMgMzIxMDAzNDkgOiBLb250YWt0eSBwcm8gZWxla3Ryb25pY2tvdSBrb211bmlrYWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMDUuMTAuMjAyMyAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQxZlpIHJlZ2lzdHJhxI1uw61tIGZvcm11bMOhxZlpIGTDoXbDoW0gZW1haWwgbmEgemHEjXRlay4gSmluYWsgZG8ga29udGFrdG7DrWNoIMO6ZGFqxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZ0Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRFbWFpbFJvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1CdWlsZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwMzRcIiwgLy9SQyAzMTQwMDAzNCA6IFRlbGVmb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGludDogcHVibGljTG9naW5Db25maWc/LnBob25lTnVtYmVySGludD8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy50ZWxlZm9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy50ZWxlZm9ufSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHNob3dQbGFjZWhvbGRlcnMgPyBcIis0MjA5OTk2NjYzMzNcIiA6IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJyZXNldEVycm9yc1wiLCBcInNlcnZlclZhbGlkYXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0VHlwZTogXCJ0ZWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGljTG9naW5Db25maWc/LmlzUGhvbmVOdW1iZXJSZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHUHVibGljVXNlckR0by5WYWxpZGF0aW9uR3JvdXAuR1JPVVBfUkVHSVNUUkFUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR1B1YmxpY1VzZXJEdG8uVmFsaWRhdGlvbkdyb3VwLkdST1VQX0NIQU5HRSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdQdWJsaWNVc2VyRHRvLlZhbGlkYXRpb25Hcm91cC5HUk9VUF9DSEFOR0VfRVhURVJOQUxfVVNFUlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLmpvaW4oJy4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zPy5zaG93VXNlU21zTm90aWZpY2F0aW9uc0ZpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZCgnZ2NoZWNrJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdqcmVzOjMyMTAwMzUxJywgLy9SQyAzMjEwMDM1MSA6IE9kZXPDrWxhdCBub3RpZmlrYWNlIHDFmWVzIFNNUyBzb3V2aXNlasOtY8OtIHMgZWxla3Ryb25pY2vDvW0gdnnFmWl6b3bDoW7DrW0gYWdlbmR5IHMgw7rFmWFkZW0uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLnVzZVNtc05vdGlmaWNhdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5Vc2VTbXNOb3RpZmljYXRpb25zfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1CdWlsZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coeyBsYWJlbDogXCJGYXhcIiwgY3VzdG9tQ2xhc3M6IFwiIGpzLWlzSGlkZWFibGUganMtaXNIaWRlYWJsZS1mbyBqcy1pc0hpZGVhYmxlLWZvLW9zdmMganMtaXNIaWRlYWJsZS1wbyBcIiB9KSAvL1JDIDI2MjY1MTY3IDogRmF4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBcIm5hbWVcIjogXCJmYXhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNla2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQnVpbGRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogU2VjdGlvbk5hbWVzLnBvZG1pbmt5UG91eml2YW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdGb3JtICYmIGZvcm1PYmplY3QuY29uZGl0aW9uQWdyZWVtZW50VGV4dCAmJiBmb3JtT2JqZWN0LmNvbmRpdGlvbkFncmVlbWVudFRleHQudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLnNvdWhsYXNTZVpwcmFjb3ZhbmltVWRhanUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R1B1YmxpY1VzZXJEdG9OYW1lcy5zb3VobGFzU2VacHJhY292YW5pbVVkYWp1fSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmb3JtT2JqZWN0LmNvbmRpdGlvbkFncmVlbWVudFRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlLCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMxNDAwMDM4XCIsIC8vUkMgMzE0MDAwMzggOiBTb3VobGFzIHMgcG9kbcOtbmthbWkgamUgbmV6Ynl0bsO9LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogXCJjdXN0b21WYWxpZGF0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ0Zvcm0gJiYgcmVnSW5zdHJ1Y3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTEtMTEtMCwgTS0xLTExLTAsIFMtMS0xMS0wXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQocmVnSW5zdHJ1Y3Rpb25zLmZvcm1hdChcIlwiKSwgXCJqcy1pbnN0cnVjdGlvbnNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0xLTExLTAsIE0tMS0xMS0wLCBTLTEtMTEtMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3N0YXJSZXF1aXJlZERlY3JpcHRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBacnXFocOtIG5hc3Rhdm92w6Fuw60gLyBvZGViw61yw6Fuw60gaHbEm3pkacSNa3kgZGxlIHZhbGlkw6F0b3LFry5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG8gZMSbbMOhIGZ1bmtjZSBHb3JkaWMuVXRpbHMuRm9ybS5tYXJrUmVxdWlyZWQoJGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogR29yZGljLlV0aWxzLkZvcm0uTWFya1JlcXVpcmVJZ25vcmVDbGFzc05hbWUgLy8nanMtaWdub3JlLW1hcmstcmVxdWlyZWQnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAnZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mbydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0KCdqcmVzOjMyMTAwMTU2JykgLy9SQyAzMjEwMDE1NiA6IFBvbG/Fvmt5IG96bmHEjWVuw6kgbW9kcsO9bSBwcnVoZW0gamUgbnV0bsOpIHZ5cGxuaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFDFmWlkw6Fuw60gZm9ybXVsw6HFmWUgZG8gRE9NdS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gZm9ybU9iamVjdC5mb3JtRGl2ID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhmb3JtT2JqZWN0LmNvbnRhaW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwMy4wOS4yMDIxIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNb8W+bm9zdCB1cHJhdml0IGZvcm11bMOhxZkgeiB2ZW5rdSBwbyB2eXR2b8WZZW7DrS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHBhcmFtcy5tb2RpZnlGb3JtID8gcGFyYW1zLm1vZGlmeUZvcm0oZm9ybUJ1aWxkZXIpIDogZm9ybUJ1aWxkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiZmllbGRjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gJChldmVudC50YXJnZXQpLmdmaWVsZChcImluc3RhbmNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQuX2F1dG9WYWxpZGF0aW9uQWN0aXZlICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC52YWxpZGF0ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVnRm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtLmZpbmRGaWVsZHMoRmllbGROYW1lcy5lbWFpbEFzTG9naW4pLmdmb3Jtcm93KCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsVmFsdWVzPy5SZWdpc3RyYXRpb25UeXBlID09PSBHZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLlB1YmxpY1VzZXJMb2dpblJlZ2lzdHJhdGlvblR5cGVFbnVtLkVJZGVudGl0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtLmZpbmRGb3JtU2VjdGlvbnMoU2VjdGlvbk5hbWVzLnByaWhsYXNvdmFjaVVkYWplKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZvcm0uZmluZEZpZWxkcyhGaWVsZE5hbWVzLnV6aXZhdGVsc2tlSm1lbm8pLmdmb3Jtcm93KCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTYuMTEuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXByYXZlbsOtIGF1dG9jb21wbGV0ZSBhdHJpYnV0dSBkbGUgYXBwbHUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vc2VjdXJpdHkvcGFzc3dvcmRfYXV0b2ZpbGwvZW5hYmxpbmdfcGFzc3dvcmRfYXV0b2ZpbGxfb25fYW5faHRtbF9pbnB1dF9lbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9waGFicmljYXRvci5nb3JkaWMuY3ovVDE1ODA0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnaW5wdXQnLCAkZm9ybS5maW5kRmllbGRzKEZpZWxkTmFtZXMudXppdmF0ZWxza2VKbWVubykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhdXRvY29tcGxldGUnLCAndXNlcm5hbWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnaW5wdXQnLCAkZm9ybS5maW5kRmllbGRzKEZpZWxkTmFtZXMuaGVzbG8pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXV0b2NvbXBsZXRlJywgJ25ldy1wYXNzd29yZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCdpbnB1dCcsICRmb3JtLmZpbmRGaWVsZHMoRmllbGROYW1lcy5vdmVyZW5pSGVzbGEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXV0b2NvbXBsZXRlJywgJ25ldy1wYXNzd29yZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDA4LjA4LjIwMTkgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGF2ZW7DrWRpc2FibGVkL2VuYWJsZWQgcG9sw63EjWVrIGRsZSBwZXJtaXNzaW9ucy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdQdWJsaWNVc2VyUmVnRm9ybS5lbmFibGVGaWVsZHMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06ICRmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiBpbml0aWFsVmFsdWVzPy5QZXJtaXNzaW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JlZ2lzdHJhdGlvbkZvcm06IHJlZ0Zvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtT2JqZWN0Ll9nZXRBcmVzRGF0YSA9IGZ1bmN0aW9uIChpYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gJC5nZXQoXCJnaW4vd2Vic2VydmljZXMvYXJlcy5hc2h4P3E9XCIgKyBpYylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBHRGxnLmFsZXJ0KFwianJlczoyNTAzMDQ1MlwiLCAvL1JDIDI1MDMwNDUyIDogQ2h5YmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgXCJqcmVzOjMxNDAwMDQ2XCIuZm9ybWF0KGljKSk7ICAvL1JDIDMxNDAwMDQ2IDogU2VsaGFsbyB6w61za8OhdsOhbsOtIGluZm9ybWFjw60gcHJvIEnEjCB7MH0uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoXCJqcmVzOjMxNDAwMDQ2XCIuZm9ybWF0KGljKSk7IC8vUkMgMzE0MDAwNDYgOiBTZWxoYWxvIHrDrXNrw6F2w6Fuw60gaW5mb3JtYWPDrSBwcm8gScSMIHswfS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCAhPT0gMSB8fCAhZGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBHRGxnLmFsZXJ0KFwianJlczoyNTAzMDQ1MlwiLCAvL1JDIDI1MDMwNDUyIDogQ2h5YmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIFwianJlczozMTQwMDA0N1wiLmZvcm1hdChpYykpOyAvL1JDIDMxNDAwMDQ3IDogTmFsZXplbmEgYWRla3bDoXRuw60gZGF0YSBwcm8gScSMIHswfS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoXCJqcmVzOjMxNDAwMDQ3XCIuZm9ybWF0KGljKSk7IC8vUkMgMzE0MDAwNDcgOiBOYWxlemVuYSBhZGVrdsOhdG7DrSBkYXRhIHBybyBJxIwgezB9LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gZGF0YVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL307XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZXNDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll9hcHBseUFyZXNEYXRhID0gZnVuY3Rpb24gKGRhdGEsIG92ZXJ3cml0ZVVzZXJWYWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZHMgPSBmb3JtT2JqZWN0LmZvcm1EaXYuZmluZEZpZWxkcygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJhdm5pY2thID0gMTAgPT09IGZpZWxkcy5maW5kRmllbGRzKEZpZWxkTmFtZXMudHlwRXN1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikudHlwX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2R0byA9IGZvcm1PYmplY3QuX2FyZXNEYXRhVG9EdG8oZGF0YSwgaXNQcmF2bmlja2EpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0byA9IEdQdWJsaWNVc2VyUmVnRm9ybS5hcmVzRGF0YVRvUHVibGljVXNlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmF2bmlja2EsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuZGF0YVByYXZuaUZvcm15LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmRhdGFUeXBPcmdhbml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xaFlY2huYSBwb2zDrcSNa2EgbmEga3RlcsO9Y2ggQXJlcyBtxa/FvmUgbmFzdGF2b3ZhdCBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlc0ZpZWxkcyA9IGZpZWxkcy5maW5kRmllbGRzKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmllbGROYW1lcy5vYmNob2RuaUptZW5vLCBGaWVsZE5hbWVzLnRpdHVsUHJlZCwgRmllbGROYW1lcy5qbWVubywgRmllbGROYW1lcy5wcmlqbWVuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmllbGROYW1lcy50aXR1bFphLCBGaWVsZE5hbWVzLnR5cE9yZywgRmllbGROYW1lcy5kaWMsIEZpZWxkTmFtZXMuY2lzbG9Qb3Bpc25lLCBGaWVsZE5hbWVzLmNpc2xvT3JpZW50YWNuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmllbGROYW1lcy5jYXN0T2JjZSwgRmllbGROYW1lcy5vYmVjLCBGaWVsZE5hbWVzLnVsaWNlLCBGaWVsZE5hbWVzLnBzYywgRmllbGROYW1lcy5zdGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaWVsZE5hbWVzLmlzVmF0UGF5ZXIsIEZpZWxkTmFtZXMuY2lzbG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFoWVjaG5hIHBvbMOtxI1rYSwga3RlcsOhIGJ1ZGVtZSBha3R1w6FsbsSbIG5hc3RhdG92YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUb0ZpbGwgPSBhcmVzRmllbGRzLmZpbHRlcihmdW5jdGlvbiAoaSwgZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkZiA9ICQoZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG9WYWx1ZSA9IGR0b1soJGYgYXMgYW55KS5nZmllbGQoXCJvcHRpb25cIiwgXCJuYW1lXCIpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdsOtIHNlIGkgcHLDoXpkbsOpIGhvZG5vdHkgcHJvIHBvbMOtxI1rYSwga3RlcsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ5bGEgeiBBcmVzIG5hc3RhdmVuw6EgeiBtaW51bGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCRmIGFzIGFueSkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiYXJlc1ZhbHVlXCIsIGR0b1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG7DoXZyYXRvdsOhIGhvZG5vdGEgb3ZsaXbFiHVqZSBmaWx0ciwgcHJvcG91xaF0w61tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbMOtxI1rYSBwcm8ga3RlcsOhIG3DoW0gaG9kbm90dSBhIHrDoXJvdmXFiCBwb2t1ZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWNoY2kgcMWZZXBpc292YXQsIHBvbMOtxI1rYSBqZW4gdGFrb3bDoSwga3RlcsOhIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWJ5bGEgem3Em27Em27DoSB1xb5pdmF0ZWxlbS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGR0b1ZhbHVlICE9IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIChvdmVyd3JpdGVVc2VyVmFsdWVzIHx8ICEkZi5nZmllbGQoXCJoYXNDaGFuZ2VkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhcGxpa2FjZSBob2Rub3QgZG8gcMWZaXByYXZlbsO9Y2ggcG9sw63EjWVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUb0ZpbGwuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBkdG8sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWVzOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWQgdsWhZW1pIGFyZXMgcG9sw63EjWt5IHNlIHpub3Z1IHZ5aG9kbm90w60gb2RjaHlsa3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphZGFuw71jaCBob2Rub3Qgb3Byb3RpIMO6ZGFqxa9tIHYgcmVqc3TFmcOta3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkY2hhbmdlRmxhZ3MgPSB7IHJlZHJhd0FyZXNFcnJvcnM6IHRydWUgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZXNGaWVsZHMudHJpZ2dlcihcImZpZWxkY2hhbmdlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnczogZmllbGRjaGFuZ2VGbGFnc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMjkuMDEuMjAyNCAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyB2eXZvbMOhbsOtIGV2ZW50dSB2w73FoWUgc2UgdnltYXphbHkgb2hkbm90eSBQU8SMIChhIHUgb3NvYm7DrWNoIMO6ZGFqxa8gaSBzdMOhdCkgdGFrIGplIGpha28gaG90Zml4IG5hc3RhdsOtbSB6bm92dS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhvdGZpeEZpZWxkTmFtZXM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZpZWxkTmFtZXMucHNjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWdGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG90Zml4RmllbGROYW1lcy5wdXNoKEZpZWxkTmFtZXMuc3RhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUb0ZpbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZEZpZWxkcyhob3RmaXhGaWVsZE5hbWVzLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZCgnbW9kZWwnLCAnYXBwbHknLCBkdG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZCgnY29uZmlybScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaWdnZXIoXCJmaWVsZGNoYW5nZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdzOiBmaWVsZGNoYW5nZUZsYWdzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNWYXRQYXllckZpZWxkID0gYXJlc0ZpZWxkcy5maW5kRmllbGRzKEZpZWxkTmFtZXMuaXNWYXRQYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVmF0UGF5ZXJGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4cGxpY2l0bsOtIHZ5dm9sw6Fuw60gY2hhbmdlLCBwcm90b8W+ZSBtb2RlbCBhcHBseSBzIGZsYWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsVmFsdWUgaG8gbmV2eXZvbMOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNWYXRQYXllckZpZWxkLmdmaWVsZChcImluc3RhbmNlXCIpLl90cmlnZ2VyKFwiY2hhbmdlXCIsIG51bGwsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IChkdG8gYXMgYW55KS5pc1ZhdFBheWVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnczoge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybU9iamVjdC5fYXJlc0RhdGFUb0R0byA9IGZ1bmN0aW9uIChhcmVzLCBpc1ByYXZuaWNrYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjb25zdCBkdG86IEdQdWJsaWNVc2VyRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZGljOiBhcmVzLkRpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vaWM6IGFyZXMuSUNPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY1BvcDogYXJlcy5DaXNsb0RvbXUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjT3I6IGFyZXMuQ2lzbG9PcmllbnRhY25pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY2FzdE9iY2U6IGFyZXMuTmF6ZXZDYXN0aU9iY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBvYmVjOiBhcmVzLk5hemV2T2JjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHVsaWNlOiBhcmVzLk5hemV2VWxpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBwc2M6IGFyZXMuUFNDLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgc3RhdDogNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyA1LiBwcml6bmFrIGplIGV4aXN0ZW5jZSB2IHJlanN0cmlrdSBwbGF0Y3UgRFBILCB2aXouOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gaHR0cDovL3d3d2luZm8ubWZjci5jei9hcmVzL2FyZXNfeG1sX2Jhc2ljLmh0bWwuY3pcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlzVmF0UGF5ZXI6IGFyZXMuUHJpem5ha3lfc3ViamVrdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAmJiBhcmVzLlByaXpuYWt5X3N1Ympla3R1WzVdID09PSBcIkFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9IGFzIGFueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vdmFyIHR5cE9yZyA9IGZvcm1PYmplY3QuX2dldFR5cE9yZ2FuaXphY2UoYXJlcy5QcmF2bmlGb3JtYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vaWYgKCF0eXBPcmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gIC8vIG7Em2tkeSBqZSBwxZllZCBrw7NkIG51dG7DqSBwxZlpZGF0IFwiMTBcIiwgbsSba3RlcsOpIGvDs2R5IGpzb3UgdGFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAvLyB1bG/FvmVuw6kgdiDEjcOtc2VsbsOta3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgdHlwT3JnID0gZm9ybU9iamVjdC5fZ2V0VHlwT3JnYW5pemFjZShcIjEwXCIgKyBhcmVzLlByYXZuaUZvcm1hKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vaWYgKCF0eXBPcmcpIHR5cE9yZyA9IDMwOyAvLyBwcsOhdi4gb3NvYmEgLSBuZXNwZWNpZi5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGxldCB0eXBPcmcgPSBmb3JtT2JqZWN0Ll9nZXRUeXBPcmdhbml6YWNlRGxlUHJhdm5pRm9ybXkoYXJlcy5QcmF2bmlGb3JtYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICghdHlwT3JnKSB0eXBPcmcgPSAwOyAvLyBuZXVyxI1lbm9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGR0by50eXBPcmcgPSB0eXBPcmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoaXNQcmF2bmlja2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGR0by5vYmNob2RuaUptZW5vID0gYXJlcy5OYXpldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGxldCBtYXRjaGVzID0gZm9ybU9iamVjdC5yZUNlbGVKbWVubyA/IGZvcm1PYmplY3QucmVDZWxlSm1lbm8uZXhlYyhhcmVzLk5hemV2KSA6IHZvaWQgMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnN0IG1hdGNoZUFycmF5ID0gbWF0Y2hlcy5zbGljZSgxKS5tYXAoZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIG0gJiYgbS5yZXBsYWNlKGZvcm1PYmplY3QucmVKbWVub1RyaW0hLCBcIiQxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICQuZXh0ZW5kKGR0bywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aXR1bFByZWQ6IG1hdGNoZUFycmF5WzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBqbWVubzogbWF0Y2hlQXJyYXlbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHByaWptZW5pOiBtYXRjaGVBcnJheVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGl0dWxaYTogbWF0Y2hlQXJyYXlbM11cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gTmFzdGF2ZW7DrSBwcsOhemRuw6lobyB6bmFrdSBwcm8gdWxpY2ksIHBva3VkIG5lbsOtIHYgQXJlcyB2eXBsbsSbbmEgKHUgb2Jjw60pLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoIWR0by51bGljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZHRvLnVsaWNlID0gXCIgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIE5hc3RhdmVuaSBmaWt0aXZuaSBob2Rub3R5IHBybyB1bG96ZW5pIGNpc2xhIGRvbXUgXCJjaXNsb1wiLCBrdGVyYSBvYnNsdWh1amUgaG9kbm90eSBjUG9wIGEgY09yLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAoZHRvIGFzIGFueSkuY2lzbG8gPSBHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdQdWJsaWNVc2VyUmVnRm9ybS5nZXRTdHJlZXROdW1iZXIoKGR0byBhcyBhbnkpLmNQb3AsIChkdG8gYXMgYW55KS5jT3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIGR0bztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5fZ2V0VHlwT3JnYW5pemFjZSA9IGZ1bmN0aW9uICh0eXBPcmdhbmlhY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHRlbXBUeXBPcmdEYXRhVmlldyA9IGZvcm1PYmplY3QuZGF0YVZpZXdUeXBPcmc7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90ZW1wVHlwT3JnRGF0YVZpZXcuYXBwbHlWaWV3KHsgXCJmaWx0ZXJcIjogXCJ0eXBfb3JnID09IFwiICsgdHlwT3JnYW5pYWNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgdHlwT3JnQnlQcmF2bmlGb3JtYUFycmF5ID0gdGVtcFR5cE9yZ0RhdGFWaWV3LmdldERhdGFSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0eXBPcmdCeVByYXZuaUZvcm1hQXJyYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICYmIHR5cE9yZ0J5UHJhdm5pRm9ybWFBcnJheS5sZW5ndGggPT09IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICYmIHR5cE9yZ0J5UHJhdm5pRm9ybWFBcnJheVswXS50eXBfb3JnICE9PSBudWxsICYmIHR5cE9yZ0J5UHJhdm5pRm9ybWFBcnJheVswXS50eXBfb3JnICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gdHlwT3JnQnlQcmF2bmlGb3JtYUFycmF5WzBdLnR5cF9vcmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHlwT3JnOiBudW1iZXIgfCB1bmRlZmluZWQgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHR5cE9yZ09iamVjdCA9IGZvcm1PYmplY3QuX2dldFR5cE9yZ2FuaXphY2VPYmplY3QodHlwT3JnYW5pYWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBPcmdPYmplY3QgIT09IG51bGwgJiYgdHlwT3JnT2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBPcmcgPSB0eXBPcmdPYmplY3QudHlwX29yZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBPcmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll9nZXRUeXBPcmdhbml6YWNlT2JqZWN0ID0gZnVuY3Rpb24gKHR5cE9yZ2FuaWFjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgdGVtcFR5cE9yZ0RhdGFWaWV3ID0gZm9ybU9iamVjdC5kYXRhVmlld1R5cE9yZzsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RlbXBUeXBPcmdEYXRhVmlldy5hcHBseVZpZXcoeyBcImZpbHRlclwiOiBcInR5cF9vcmcgPT0gXCIgKyB0eXBPcmdhbmlhY2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB0eXBPcmdCeVByYXZuaUZvcm1hQXJyYXkgPSB0ZW1wVHlwT3JnRGF0YVZpZXcuZ2V0RGF0YVJvd3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHR5cE9yZ0J5UHJhdm5pRm9ybWFBcnJheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgJiYgdHlwT3JnQnlQcmF2bmlGb3JtYUFycmF5Lmxlbmd0aCA9PT0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgJiYgdHlwT3JnQnlQcmF2bmlGb3JtYUFycmF5WzBdLnR5cF9vcmcgIT09IG51bGwgJiYgdHlwT3JnQnlQcmF2bmlGb3JtYUFycmF5WzBdLnR5cF9vcmcgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0eXBPcmdCeVByYXZuaUZvcm1hQXJyYXlbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eXBPcmcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1PYmplY3QuZGF0YVR5cE9yZ2FuaXphY2UgIT09IG51bGwgJiYgZm9ybU9iamVjdC5kYXRhVHlwT3JnYW5pemFjZSAhPT0gdW5kZWZpbmVkICYmIGZvcm1PYmplY3QuZGF0YVR5cE9yZ2FuaXphY2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChmb3JtT2JqZWN0LmRhdGFUeXBPcmdhbml6YWNlLCBmdW5jdGlvbiAoa2V5LCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBPcmdhbmlhY2UgPT09IHBhcnNlSW50KGl0ZW0udHlwX29yZykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cE9yZyA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBPcmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll9nZXRUeXBPcmdhbml6YWNlRGxlUHJhdm5pRm9ybXkgPSBmdW5jdGlvbiAocHJhdm5pRm9ybWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eXBPcmc6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmF2bmlGb3JtYSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByYXZuaUZvcm1hID0gcGFyc2VJbnQocHJhdm5pRm9ybWEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtT2JqZWN0LmRhdGFQcmF2bmlGb3JteSAhPT0gbnVsbCAmJiBmb3JtT2JqZWN0LmRhdGFQcmF2bmlGb3JteSAhPT0gdW5kZWZpbmVkICYmIGZvcm1PYmplY3QuZGF0YVByYXZuaUZvcm15Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goZm9ybU9iamVjdC5kYXRhUHJhdm5pRm9ybXksIGZ1bmN0aW9uIChrZXksIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByYXZuaUZvcm1hID09PSBwYXJzZUludChpdGVtLmtvZF9wcmF2bmlfZm9ybXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBPcmcgPSBpdGVtLnR5cF9vcmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHR5cE9yZyA9PT0gbnVsbCB8fCB0eXBPcmcgPT09IHVuZGVmaW5lZCB8fCB0eXBPcmcgPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZm9ybU9iamVjdC5kYXRhVHlwT3JnYW5pemFjZSAhPT0gbnVsbCAmJiBmb3JtT2JqZWN0LmRhdGFUeXBPcmdhbml6YWNlICE9PSB1bmRlZmluZWQgJiYgZm9ybU9iamVjdC5kYXRhVHlwT3JnYW5pemFjZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGZvcm1PYmplY3QuZGF0YVR5cE9yZ2FuaXphY2UsIGZ1bmN0aW9uIChrZXksIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByYXZuaUZvcm1hID09PSBwYXJzZUludChpdGVtLnByX2Zvcm1hKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwT3JnID0gaXRlbS50eXBfb3JnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cE9yZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuX2FkanVzdEZvcm0gPSBmdW5jdGlvbiAodHlwRXN1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gWm9icmF6w60gLyBza3J5amUgcG9sw63EjWthIG5hIGZvcm11bMOhxZlpIGRsZSB0eXB1IHByw6F2bsOtIG9zb2J5LiBIb2Rub3RhIHNrcnl0w71jaCBwb2zDrcSNZWsgc2UgbmVtYcW+ZS4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidHlwRXN1XCIgdHlwZT1cInR5cGVcIj4wIC0gXCJuZXVyxI1lbm9cIiwgMTAgLSBcInByw6F2bmlja8OhIG9zb2JhXCIsIDIwIC0gXCJmeXppY2vDoSBvc29iYVwiLCAzMCAtIFwiZnl6aWNrw6Egb3NvYmEgLSBPU1bEjFwiPC9wYXJhbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkc1RvSGlkZSA9IHB1YmxpY0xvZ2luQ29uZmlnPy5maWVsZHNUb0hpZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gaGlkZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHUHVibGljVXNlclJlZ0Zvcm0uZW5hYmxlRmllbGRzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybU9iamVjdC5mb3JtRGl2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uczogZm9ybU9iamVjdC5pbml0aWFsVmFsdWVzPy5QZXJtaXNzaW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZWdpc3RyYXRpb25Gb3JtOiByZWdGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRzVG9EaXNhYmxlOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcHJlc2VudGF0aXZlID0gZm9ybU9iamVjdC5mb3JtRGl2LmZpbmQoXCIuanMtcmVwcmVzZW50YXRpdmVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcHJlc2VudGF0aXZlLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkc1RvSGlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cEVzdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDogLy8gcHLDoXZuaWNrw6Egb3NvYmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUb0Rpc2FibGUgPSBmaWVsZHNUb0hpZGUucHJhdm5pY2thT3NvYmE7IC8vXCJkYXR1bU5hcm96ZW5pXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwcmVzZW50YXRpdmUuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMDogLy8gZnl6aWNrw6Egb3NvYmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNUb0Rpc2FibGUgPSBmaWVsZHNUb0hpZGUuZnl6aWNrYU9zb2JhOyAvLyBcImljLCBkaWMsIG9iY2hvZG5pSm1lbm8sIGlzVmF0UGF5ZXJcIjsvLywgdHlwT3JnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwOiAvLyBmeXppY2vDoSBvc29iYSAtIE9TVsSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzVG9EaXNhYmxlID0gZmllbGRzVG9IaWRlLmZ5emlja2FPc29iYU9zdmM7IC8vIFwib2JjaG9kbmlKbWVub1wiOyAvLyB0eXBPcmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IC8vIG5ldXLEjWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkc1RvRGlzYWJsZSA9IGZpZWxkc1RvSGlkZS5uZXVyY2VubzsgLy9cImljLCBkaWMsIG9iY2hvZG5pSm1lbm8sIGRhdHVtTmFyb3plbmksIHR5cE9yZ1wiOy8vIHR5cE9yZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1PYmplY3QuZm9ybURpdi5maW5kKFwiLmpzLWFkcmVzYSAuZ2Zvcm0tdGV4dFwiKS50ZXh0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHR5cEVzdSA9PT0gMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgPyBcImpyZXM6MzE0MDAwNzRcIiAvL1JDIDMxNDAwMDc0IDogQWRyZXNhIHPDrWRsYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICA6IFwianJlczozMjEwMDEwMlwiIC8vUkMgMzIxMDAxMDIgOiBUcnZhbMOpIGJ5ZGxpxaF0xJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNQcmF2bmlja2FPc29iYSA9IHR5cEVzdSA9PT0gMTAgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGb3JtU2VjdGlvbnMoU2VjdGlvbk5hbWVzLmFkcmVzYSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmb3Jtc2VjdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2V0TGFiZWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJhdm5pY2thT3NvYmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwianJlczozMTQwMDA3NFwiIC8vUkMgMzE0MDAwNzQgOiBBZHJlc2Egc8OtZGxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMDkuMTIuMjAxOSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGV4dCB6bcSbbsSbbiBkbGUgcG/FvmFkYXZrdSBSLiBGb3Vza2EgLSBzamVkbm9jZW7DrSB0ZXJtaW5vbG9naWUgcyBJU0RTIGEgTklBLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vcGhhYnJpY2F0b3IuZ29yZGljLmN6L1QyNDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwianJlczozMjEwMDEwMlwiIC8vUkMgMzIxMDAxMDIgOiBBZHJlc2EgdHJ2YWzDqWhvIHBvYnl0dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNla2NlT3NvYmEgPSBmb3JtT2JqZWN0LmZvcm1EaXYuZmluZEZvcm1TZWN0aW9ucyhTZWN0aW9uTmFtZXMub3NvYmEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNla2NlT3NvYmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmb3Jtc2VjdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2V0TGFiZWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJhdm5pY2thT3NvYmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwianJlczozMTQwMDA3M1wiIC8vUkMgMzE0MDAwNzMgOiBaYXN0dXB1asOtY8OtIG9zb2JhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImpyZXM6MzIxMDAzNTJcIiAvL1JDIDMyMTAwMzUyIDogT3NvYmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwibGFiZWxcIiwgc2VrY2VPc29iYSkuY3NzKFwiYm9yZGVyXCIsIGlzUHJhdm5pY2thT3NvYmEgPyBcIlwiIDogXCJ1bnNldFwiKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmZvcm1EaXYuZmluZChcIi5qcy1pc0hpZGVhYmxlXCIpLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkc1RvRGlzYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmZvcm1EaXYuZmluZEZpZWxkcyhmaWVsZHNUb0Rpc2FibGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmb3Jtcm93KCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghZmllbGRzVG9IaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBsb2FkUHVibGljTG9naW5Db25maWcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZmllbGRzVG9IaWRlID0gcHVibGljTG9naW5Db25maWcuZmllbGRzVG9IaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBoaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghZmllbGRzVG9IaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBuZXcgR0NvbnRlbnQoXCJHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdMb2dpblV0aWxzXCIpLmNhbGwoXCJHZXREZWZhdWx0RmllbGRzVG9IaWRlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGZpZWxkc1RvSGlkZVJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBmaWVsZHNUb0hpZGUgPSBmaWVsZHNUb0hpZGVSZXRWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5faW5pdEZvcm0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gTmFzdGF2w60gdsO9Y2hvesOtIGhvZG5vdHksIHZhbGlkw6F0b3J5IGEgb25DaGFuZ2VMaXN0ZW5lciwga3RlcsO9IHpvYnJhenVqZSBvZGxpxaFub3N0IGhvZG5vdHkgcG9sw63EjWthIG9kIGhvZG5vdHkgeiBBcmVzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZHMgPSBmb3JtT2JqZWN0LmZvcm1EaXYuZmluZEZpZWxkcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtT2JqZWN0LmluaXRpYWxWYWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm9ybU9iamVjdC5pbml0aWFsVmFsdWVzIGFzIGFueSkuY2lzbG8gPSBHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdQdWJsaWNVc2VyUmVnRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0U3RyZWV0TnVtYmVyKGZvcm1PYmplY3QuaW5pdGlhbFZhbHVlcy5jUG9wLCBmb3JtT2JqZWN0LmluaXRpYWxWYWx1ZXMuY09yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBmb3JtT2JqZWN0LmluaXRpYWxWYWx1ZXMsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlczogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTa3J5dGkgbmVwb3RyZWJueWNoIHBvbGljZWsgZm9ybXVsYXJlLCBuYXN0YXZlbmkgdnljaG96aWNoIGhvZG5vdCBhIHZhbGlkYXRvcnUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5fYWRqdXN0Rm9ybShmb3JtT2JqZWN0LmluaXRpYWxWYWx1ZXMudHlwRXN1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxMC4wMi4yMDIwIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gdmFsaWTDoXRvcsWvIHDFmWVzdW51dG8gZG8gdmxhc3Ruw61mbmtjZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuX3VwZGF0ZVZhbGlkYXRvcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGZvcm1PYmplY3QudmFsaWRhdG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8vLyAwOC4wOC4yMDE5IC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vLy8gVmFsaWRhdG9yIG5hIElDKE8pIMWZw61kw61tIHPDoW0gcMWZw61tbyBuYSBwb2zDrcSNa3UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyhmb3JtT2JqZWN0LnZhbGlkYXRvcnMgYXMgYW55KS5pYyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBmaWVsZHMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIGZvcm1PYmplY3QudmFsaWRhdG9ycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gMTAuMDIuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBBa3R1YWxpemFjZSB2YWxpZMOhdG9yxa8gYSBuYXN0YXZlbsOtIHJlcXVpcmVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZm9ybU9iamVjdC5fdXBkYXRlVmFsaWRhdG9ycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGF2ZW5pIGEgb2RlYnJhbmkgY2h5YnkgdiB6YXZpc2xvc3RpIG5hIG9kbGlzbm9zdGkgemFkYW5lIGhvZG5vdHkgYSBob2Rub3R5IHogQXJlcy4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmZvcm1EaXYub24oXCJmaWVsZGNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0ICRmID0gJChldmVudC50YXJnZXQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gJGYuZ2ZpZWxkKFwib3B0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShcImFyZXNWYWx1ZVwiIGluIG9wdGlvbnMpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZi5nZmllbGQoXCJnZXRFcnJvcnNcIiwgXCJhcmVzXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGYuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJhcmVzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJlc1ZhbHVlID0gb3B0aW9uc1tcImFyZXNWYWx1ZVwiXSBhcyBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJlc1ZhbHVlID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZXNWYWx1ZSAhPT0gZm9ybU9iamVjdC5fZ2V0RmllbGRSYXdWYWx1ZSgkZikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmVzVmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDDunByYXZhIHBybyBjaGVja2JveCwga2RlIHNlIHpvYnJhem92YWxvIHRydWUvZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhcmVzVmFsdWUgYXMgYW55KSA9IGFyZXNWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJqcmVzOjMxNDAwMDkyXCIgIC8vUkMgMzE0MDAwOTIgOiBwbGF0w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwianJlczozMTQwMDA5M1wiICAvL1JDIDMxNDAwMDkzIDogbmVwbGF0w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZXNWYWx1ZVRleHQgPSBhcmVzVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgob3B0aW9ucyBhcyBhbnkpLm5hbWUgPT09IFwidHlwT3JnXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmVzVmFsdWUgPT09IG51bGwgfHwgYXJlc1ZhbHVlID09PSB1bmRlZmluZWQgfHwgYXJlc1ZhbHVlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR5cE9yZ2FuaXphY2UgPSBmb3JtT2JqZWN0Ll9nZXRUeXBPcmdhbml6YWNlT2JqZWN0KGFyZXNWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwT3JnYW5pemFjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhcmVzVmFsdWVUZXh0IGFzIGFueSkgPSB0eXBPcmdhbml6YWNlLnR5cF9vcmdfdHh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmLmdmaWVsZChcInNldEVycm9yXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMTQwMDA1MFwiICsgYXJlc1ZhbHVlVGV4dCwgLy9SQyAzMTQwMDA1MCA6IFYgcmVqc3TFmcOta3UgZGxlIEnEjCBieWxvIG5hbGV6ZW5vOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogXCJhcmVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wcGluZzogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5fZ2V0RmllbGRSYXdWYWx1ZSA9IGZ1bmN0aW9uICgkZmllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBWcmF0aSBwcmltaXRpdm7DrSBob2Rub3R1IHogZmllbGQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZmllbGRWYWx1ZVwiIHR5cGU9XCJvYmplY3RcIj48L3BhcmFtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZmllbGROYW1lXCIgdHlwZT1cInN0cmluZ1wiPjwvcGFyYW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cInN0cmluZy9pbnQvb2JqZWN0XCI+PC9yZXR1cm5zPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gJGZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKCRmaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJuYW1lXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRmllbGROYW1lcy50eXBPcmc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudHlwX29yZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBGaWVsZE5hbWVzLnVsaWNlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnVsaWNlX25hemV2Py50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRmllbGROYW1lcy5wc2M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUucHNjPy50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRmllbGROYW1lcy5jYXN0T2JjZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jYXN0X29iY2VfbmF6ZXY/LnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBGaWVsZE5hbWVzLm9iZWM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUub2JlYz8udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEZpZWxkTmFtZXMuc3RhdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zdGF0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEZpZWxkTmFtZXMuY2lzbG86XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXNsbyA9IEdvcmRpYy5HdWkuV2ViQ29udHJvbHMuR1B1YmxpY1VzZXJSZWdGb3JtLmdldFN0cmVldE51bWJlcih2YWx1ZS5jUG9wLCB2YWx1ZS5jT3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNpc2xvICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2lzbG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuYXBwbHkgPSBmdW5jdGlvbiAoZm9ybURhdGEsIGZpZWxkcywgZmxhZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBOYXN0YXbDrSBkYXRhIGRvIGZvcm11bMOhxZllIGEgc2xvxb7DrSDEjcOtc2xvIGRvbXUgYSBqbcOpbm8gdcW+aXZhdGVsZSB6IG7Em2tvbGlrYSBwb2zDrcSNZWsgZG8gamVkbsOpIChjaXNsbywgY2VsZUptZW5vKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmb3JtRGF0YVwiIHR5cGU9XCJ0eXBlXCI+T2JqZWt0IGhvZG5vdCwga3RlcsOpIHNlIHVsb8W+w60gZG8gZm9ybXVsw6HFmWUuPC9wYXJhbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZpZWxkc1wiIHR5cGU9XCJ0eXBlXCI+UG9sw63EjWthLCBkbyBrdGVyw71jaCBzZSBkYXRhIG5hc3RhdnVqw60uIFBva3VkIG5lbsOtIHZ5cGxuxJtubyBwYWsgc2UgcG91xb5pasOtIHbFoWVjaG55IHBvbMOtxI1rYSBmb3JtdWzDocWZZS48L3BhcmFtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZmxhZ3NcIiB0eXBlPVwidHlwZVwiPlDFmcOtem5ha3kuPC9wYXJhbT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1EYXRhLmNpc2xvID0gZm9ybU9iamVjdC5fc2V0Q2lzbG9Qb3BPcihmb3JtRGF0YS5jUG9wLCBmb3JtRGF0YS5jT3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtRGF0YS5jZWxlSm1lbm8gPSBmb3JtT2JqZWN0Ll9zZXRDZWxlSm1lbm8oZm9ybURhdGEudGl0dWxQcmVkLCBmb3JtRGF0YS5qbWVubywgZm9ybURhdGEucHJpam1lbmksIGZvcm1EYXRhLnRpdHVsWmEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmllbGRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzID0gZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmxhZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBmb3JtRGF0YSwgZmxhZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBmb3JtRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmNvbGxlY3QgPSBmdW5jdGlvbiAoKTogSlF1ZXJ5LlByb21pc2U8R1B1YmxpY1VzZXJEdG8+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBTZXpiw61yw6EgZGF0YSB6IGZvcm11bMOhxZllIGEgcm96cGFyc3VqZSDEjcOtc2xvIGRvbXUgYSBqbcOpbm8gdcW+aXZhdGVsZSB6IGplZG5vaG8gcG9sw63EjWthIGRvIHbDrWNlIChwcm8gRHRvKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIiB0eXBlPVwidHlwZVwiPk9iamVrdCwgZG8ga3RlcsOpaG8gc2UgdWxvxb7DrSBuYWxlemVuw6kgaG9kbm90eS48L3BhcmFtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZmllbGRzXCIgdHlwZT1cInR5cGVcIj5Qb2zDrcSNa2EsIHplIGt0ZXLDvWNoIHNlIGRhdGEgbmHEjcOtdGFqw60uIFBva3VkIG5lbsOtIHZ5cGxuxJtubyBwYWsgc2UgcG91xb5pasOtIHbFoWVjaG55IHBvbMOtxI1rYSBmb3JtdWzDocWZZS48L3BhcmFtPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCFmaWVsZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGZpZWxkcyA9IGZvcm1PYmplY3QuZm9ybURpdi5maW5kRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1PYmplY3QuX3BhcnNlQ2lzbG9Qb3BPcihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtT2JqZWN0Ll9wYXJzZUNlbGVKbWVubyhyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gZm9ybU9iamVjdC5mb3JtRGl2O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAxLjA0LjIwMjAgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUMWZaWTDoW5hIGFrdHVhbGl6YWNlIMWhaXJvdmFjw61obyBrbMOtxI1lIHBybyBoZXNsby5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcmVmYWJzLkdTdHJpbmdCb3gudXBkYXRlQ2hpcGVyUHVibGljS2V5cygkZm9ybSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghR29yZGljLlV0aWxzLldpZGdldEV4aXN0cygnZ2Zvcm0nLCAkZm9ybSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPEdQdWJsaWNVc2VyRHRvPigpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBHUHVibGljVXNlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1PYmplY3QuY2hlY2tBZHJlc0F0UnVpYW4gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBuZXcgR0NvbnRlbnQoXCJHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdMb2dpblV0aWxzXCIpLmNhbGwoXCJSdWlhblwiKS5kb25lKGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy92YXIgZm9ybURhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9mb3JtT2JqZWN0LmNvbGxlY3QoZm9ybURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9yZXR1cm4gJC5nZXQoXCJnaW4vd2Vic2VydmljZXMvcnVpYW4uYXNoeD9xPVwiICsgZm9ybURhdGEub2JlYylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgIGlmICghKGRhdGEpIHx8IGRhdGEubGVuZ3RoICE9PSAxIHx8ICEoZGF0YVswXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgICAgICBHRGxnLmFsZXJ0KFwianJlczoyNTAzMDQ1MlwiLCAvL1JDIDI1MDMwNDUyIDogQ2h5YmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgICAgICAgICAgXCJqcmVzOjMxNDAwMDQ3XCIpOyAvL1JDIDMxNDAwMDQ3IDogTmFsZXplbmEgYWRla3bDoXRuw60gZGF0YSBwcm8gScSMIHswfS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdChcImpyZXM6MzE0MDAwNDdcIik7IC8vUkMgMzE0MDAwNDcgOiBOYWxlemVuYSBhZGVrdsOhdG7DrSBkYXRhIHBybyBJxIwgezB9LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgcmV0dXJuIGRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgIEdEbGcuYWxlcnQoXCJqcmVzOjI1MDMwNDUyXCIsIC8vUkMgMjUwMzA0NTIgOiBDaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIFwianJlczozMTQwMDA0NlwiKTsgIC8vUkMgMzE0MDAwNDYgOiBTZWxoYWxvIHrDrXNrw6F2w6Fuw60gaW5mb3JtYWPDrSBwcm8gScSMIHswfS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KFwianJlczozMTQwMDA0NlwiKTsgLy9SQyAzMTQwMDA0NiA6IFNlbGhhbG8gesOtc2vDoXbDoW7DrSBpbmZvcm1hY8OtIHBybyBJxIwgezB9LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vaWYgKCFwdWJsaWNMb2dpbkNvbmZpZyB8fCAhcHVibGljTG9naW5Db25maWcucnVpYW5GbnhJb0tleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy92YXIgZm9ybURhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9mb3JtT2JqZWN0LmNvbGxlY3QoZm9ybURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy92YXIgcnVpYW5VcmwgPSBcImh0dHBzOi8vcnVpYW4uZm54LmlvL2FwaS92MS9ydWlhbi92YWxpZGF0ZT9hcGlLZXk9XCIgKyBwdWJsaWNMb2dpbkNvbmZpZy5ydWlhbkZueElvS2V5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL2lmIChmb3JtRGF0YS5vYmVjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHJ1aWFuVXJsICs9IFwiJm11bmljaXBhbGl0eU5hbWU9XCIgKyBmb3JtRGF0YS5vYmVjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9pZiAoZm9ybURhdGEucHNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHJ1aWFuVXJsICs9IFwiJnppcD1cIiArIGZvcm1EYXRhLnBzYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vaWYgKGZvcm1EYXRhLmNPcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBydWlhblVybCArPSBcIiZjbz1cIiArIGZvcm1EYXRhLmNPcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vaWYgKGZvcm1EYXRhLmNQb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgcnVpYW5VcmwgKz0gXCImY3A9XCIgKyBmb3JtRGF0YS5jUG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9pZiAoZm9ybURhdGEudWxpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgcnVpYW5VcmwgKz0gXCImc3RyZWV0PVwiICsgZm9ybURhdGEudWxpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL2NvbnNvbGUubG9nKHJ1aWFuVXJsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vZm9ybU9iamVjdC5fcGFyc2VDaXNsb1BvcE9yKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vZm9ybU9iamVjdC5fcGFyc2VDZWxlSm1lbm8ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gTmFjdGVuaSBEYXRhVmlldyBwcm8gVHlwRXN1LCBUeXBPcmcgYSBTdGF0IG5hIHZ5aGxlZGF2YW5pIHpkYSB6YWRhbmEgaG9kbm90YSBleGlzdHVqZSB2IGNpc2VsbmlrdS5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybU9iamVjdC5kYXRhVmlld1R5cEVzdSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1PYmplY3QuX2ZpbmREYXRhVmlldyhmb3JtT2JqZWN0LmNpc2VsbmlrVHlwRXN1LmRhdGEsIGZvcm1PYmplY3QuZGF0YVZpZXdUeXBFc3UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU9iamVjdC5jaXNlbG5pa1R5cEVzdS5kYXRhLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiR0RhdGFWaWV3XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGZvcm1PYmplY3QuY2lzZWxuaWtUeXBFc3UuZGF0YS5maW5kQnlLZXkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1PYmplY3QuY2lzZWxuaWtUeXBFc3UuZGF0YS5hcHBseVZpZXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZmlsdGVyOiBcInR5cF9lc3UgIT09IDBcIn0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5kYXRhVmlld1R5cEVzdSA9IGZvcm1PYmplY3QuY2lzZWxuaWtUeXBFc3UuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuY2lzZWxuaWtUeXBFc3UuZGF0YS5nZXRWaWV3KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YVZpZXcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGF0YVZpZXcuYXBwbHlWaWV3KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZmlsdGVyOiBcInR5cF9lc3UgIT09IDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmRhdGFWaWV3VHlwRXN1ID0gZGF0YVZpZXc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybU9iamVjdC5kYXRhVmlld1R5cEVzdS5fdmlld1sxXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGZvcm1PYmplY3QudHlwRXN1VnljaG96aUhvZG5vdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZm9ybU9iamVjdC5kYXRhVmlld1R5cEVzdS5hcHBseVZpZXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyOiBcInR5cF9lc3UgIT09IDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9mdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL2lmIChvYmplY3QgJiYgb2JqZWN0LmRhdGEgJiYgb2JqZWN0LmRhdGEudHlwX2VzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgJiYgb2JqZWN0LmRhdGEudHlwX2VzdSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybU9iamVjdC5kYXRhVmlld1R5cE9yZyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1PYmplY3QuX2ZpbmREYXRhVmlldyhmb3JtT2JqZWN0LmNpc2VsbmlrVHlwT3JnLmRhdGEsIGZvcm1PYmplY3QuZGF0YVZpZXdUeXBPcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU9iamVjdC5jaXNlbG5pa1R5cE9yZy5kYXRhLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiR0RhdGFWaWV3XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGZvcm1PYmplY3QuY2lzZWxuaWtUeXBPcmcuZGF0YS5maW5kQnlLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuZGF0YVZpZXdUeXBPcmcgPSBmb3JtT2JqZWN0LmNpc2VsbmlrVHlwT3JnLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmNpc2VsbmlrVHlwT3JnLmRhdGEuZ2V0VmlldygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGFWaWV3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuZGF0YVZpZXdUeXBPcmcgPSBkYXRhVmlldztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtT2JqZWN0LmRhdGFWaWV3U3RhdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1PYmplY3QuX2ZpbmREYXRhVmlldyhmb3JtT2JqZWN0LmNpc2VsbmlrU3RhdC5kYXRhLCBmb3JtT2JqZWN0LmRhdGFWaWV3U3RhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtT2JqZWN0LmNpc2VsbmlrU3RhdC5kYXRhLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiR0RhdGFWaWV3XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGZvcm1PYmplY3QuY2lzZWxuaWtTdGF0LmRhdGEuZmluZEJ5S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmRhdGFWaWV3U3RhdCA9IGZvcm1PYmplY3QuY2lzZWxuaWtTdGF0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmNpc2VsbmlrU3RhdC5kYXRhLmdldFZpZXcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhVmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmRhdGFWaWV3U3RhdCA9IGRhdGFWaWV3O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU9iamVjdC5jaXNlbG5pa1BzYy5kYXRhLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiR0RhdGFWaWV3XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGZvcm1PYmplY3QuY2lzZWxuaWtQc2MuZGF0YS5maW5kQnlLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuZGF0YVZpZXdQc2MgPSBmb3JtT2JqZWN0LmNpc2VsbmlrUHNjLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmNpc2VsbmlrUHNjLmRhdGEuZ2V0VmlldygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGFWaWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuZGF0YVZpZXdQc2MgPSBkYXRhVmlldztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTkuMDguMjAxOSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZsYXN0bsOtIGZ1bmtjZSBuYSB2YWxpZGFjaSBmb3JtdWzDocWZZS4gVGEgemFzamlzdMOtLCBhYnkgc2UgdmFsaWRvdmFseSBzcHLDoXZuw6kgdmFsaWRhxI1uw60gc2t1cGlueS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5pc1ZhbGlkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybURpdiA9IGZvcm1PYmplY3QuZm9ybURpdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmb3JtXCIsIGZvcm1EaXYpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGl2Lmdmb3JtKFwiaXNWYWxpZFwiLCBmb3JtT2JqZWN0Ll9jcmVhdGVWYWxpZGF0aW9uR3JvdXBzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll9jcmVhdGVWYWxpZGF0aW9uR3JvdXBzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMDYuMDIuMjAyNCAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQxZlpZMOhbmEgZXh0cmEgdmFsaWRhxI1uw60gc2t1cGluYSBwcm8gc3Byw6F2bsO9IGZvcm3DoXQgZGF0IHYgZHRvLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkdyb3Vwczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR1B1YmxpY1VzZXJEdG8uVmFsaWRhdGlvbkdyb3VwLkdST1VQX0NPUlJFQ1RfRk9STUFUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkdyb3Vwcy5wdXNoKEdQdWJsaWNVc2VyRHRvLlZhbGlkYXRpb25Hcm91cC5HUk9VUF9SRUdJU1RSQVRJT04pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkdyb3Vwcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuaXNHaW5pc1VzZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gR1B1YmxpY1VzZXJEdG8uVmFsaWRhdGlvbkdyb3VwLkdST1VQX0NIQU5HRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBHUHVibGljVXNlckR0by5WYWxpZGF0aW9uR3JvdXAuR1JPVVBfQ0hBTkdFX0VYVEVSTkFMX1VTRVJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eXBFc3U6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmb3JtXCIsIGZvcm1PYmplY3QuZm9ybURpdikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBFc3UgPSBmb3JtT2JqZWN0LmZvcm1EaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmRGaWVsZHMoRmllbGROYW1lcy50eXBFc3UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQ8eyB0eXBfZXN1PzogbnVtYmVyIH0gfCB1bmRlZmluZWQ+KFwiZ2V0VmFsdWVcIik/LnR5cF9lc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cEVzdSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCAtIFwibmV1csSNZW5vXCIsIDEwIC0gXCJwcsOhdm5pY2vDoSBvc29iYVwiLCAyMCAtIFwiZnl6aWNrw6Egb3NvYmFcIiwgMzAgLSBcImZ5emlja8OhIG9zb2JhIC0gT1NWxIxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwRXN1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uR3JvdXBzLnB1c2goR1B1YmxpY1VzZXJEdG8uVmFsaWRhdGlvbkdyb3VwLkdST1VQX0NPTVBBTlkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkdyb3Vwcy5wdXNoKEdQdWJsaWNVc2VyRHRvLlZhbGlkYXRpb25Hcm91cC5HUk9VUF9CVVNJTkVTUyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25Hcm91cHMucHVzaChHUHVibGljVXNlckR0by5WYWxpZGF0aW9uR3JvdXAuR1JPVVBfUEVSU09OQUwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uR3JvdXBzLnB1c2goR1B1YmxpY1VzZXJEdG8uVmFsaWRhdGlvbkdyb3VwLkdST1VQX1BFUlNPTkFMKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25Hcm91cHMucHVzaChHUHVibGljVXNlckR0by5WYWxpZGF0aW9uR3JvdXAuR1JPVVBfQlVTSU5FU1MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0aW9uR3JvdXBzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll91cGRhdGVWYWxpZGF0b3JzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybVZhbGlkYXRvcnM6IE9iamVjdExpdGVyYWw8VmFsaWRhdG9ycy5WYWxpZGF0b3JPcHRpb25zW10+IHwgdW5kZWZpbmVkID0gZm9ybU9iamVjdC52YWxpZGF0b3JzIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghR29yZGljLlV0aWxzLldpZGdldEV4aXN0cygnZ2Zvcm0nLCBmb3JtT2JqZWN0LmZvcm1EaXYpIHx8ICFmb3JtVmFsaWRhdG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtVmFsaWRhdGlvbkdvdXBzID0gZm9ybU9iamVjdC5fY3JlYXRlVmFsaWRhdGlvbkdyb3VwcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyc1RvQXBwbHk6IE9iamVjdExpdGVyYWw8VmFsaWRhdG9ycy5WYWxpZGF0b3JPcHRpb25zW10+ID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGRWYWxpZGF0b3JOYW1lcyA9IE9iamVjdC5rZXlzKGZvcm1WYWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGRWYWxpZGF0b3JOYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsaWRhdG9yTmFtZSA9IGZpZWxkVmFsaWRhdG9yTmFtZXNbaV0/LnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpZWxkVmFsaWRhdG9yTmFtZSB8fCAhQXJyYXkuaXNBcnJheShmb3JtVmFsaWRhdG9yc1tmaWVsZFZhbGlkYXRvck5hbWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRvcnNUb0FwcGx5ID0gZm9ybVZhbGlkYXRvcnNbZmllbGRWYWxpZGF0b3JOYW1lXT8uZmlsdGVyKHYgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXYuZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdi5ncm91cC5zcGxpdCgnLicpLnNvbWUoZyA9PiBnICYmIGZvcm1WYWxpZGF0aW9uR291cHMuaW5jbHVkZXMoZykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdG9yc1RvQXBwbHkubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzVG9BcHBseVtmaWVsZFZhbGlkYXRvck5hbWVdID0gdmFsaWRhdG9yc1RvQXBwbHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGaWVsZHMoKS5nZmllbGQoJ21vZGVsJywgJ3ZhbGlkYXRvcnMnLCBmaWx0ZXJzVG9BcHBseSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuRm9ybS5tYXJrUmVxdWlyZWQoZm9ybU9iamVjdC5mb3JtRGl2LCBmb3JtVmFsaWRhdGlvbkdvdXBzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnl0dm/FmWVuw60gYSBpbmljaWFsaXphY2UgZm9ybXVsw6HFmWUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuX2NyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5faW5pdEZvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShmb3JtT2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8vLyAxMi4wOC4yMDE5IC0gVEZlaWtcclxuICAgICAgICAgICAgLy8vLyBOYXDFmWVkIHNpIG5hxI10dSBkYXRhIHBybyDFoWlmcm92w6Fuw60gaGVzbGEuXHJcbiAgICAgICAgICAgIC8vR0xvZ2luVXRpbHMuR2V0Q2lwaGVyUHVibGljS2V5KClcclxuICAgICAgICAgICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKGNpcGhlclB1YmxpY0tleSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgUnNhUGFyYW1zUHVibGljID0gY2lwaGVyUHVibGljS2V5O1xyXG4gICAgICAgICAgICBsb2FkUHVibGljTG9naW5Db25maWcoKTtcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGZvcm1PYmplY3Q7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcsOhdMOtIMSNw61zbG8gZG9tdSBvYnNhaHVqw61jw60gxI3DrXNsbyBwb3Bpc27DqSBhIMSNw61zbG8gb3JpZW50YcSNbsOtLCBvZGTEm2xlbsOpIGxvbcOtdGtlbS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIHRmZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMjEuMTIuMjAxN1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBjUG9wIMSMw61zbG8gcG9waXNuw6kuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBjT3IgxIzDrXNsbyBvcmlhbnRhxI1uw60uXHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gxIzDrXNsbyBwb3Bpc27DqSwgbmVibyBrb21iaW5hY2UgxIzDrXNsbyBwb3Bpc27DqS/EjMOtc2xvIG9yaWFudGHEjW7DrS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldFN0cmVldE51bWJlcihjUG9wPzogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCwgY09yPzogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY1BvcCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNPciA/IGNQb3AudG9TdHJpbmcoKSArIFwiL1wiICsgY09yLnRvU3RyaW5nKCkgOiBjUG9wLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmHEjXRlIGRhdGEgeiBBUkVTIHBybyB6YWRhbsOpIEnEjC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMDguMDkuMjAyMVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxHQXJlc0RhdGFEdG8sIHN0cmluZz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRBcmVzRGF0YShcclxuICAgICAgICAgICAgaWM6IHN0cmluZyxcclxuICAgICAgICAgICAgdXNlR2xvYmFsUGFyYW1ldGVyczogYm9vbGVhblxyXG4gICAgICAgICk6IEpRdWVyeS5Qcm9taXNlPEdBcmVzRGF0YUR0bywgc3RyaW5nPiB7XHJcbiAgICAgICAgICAgIGlmICghaWMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCdqcmVzOjMyMTAwMjgxJykucHJvbWlzZSgpOyAvL1JDIDMyMTAwMjgxIDogTmVuw60gemFkYW7DqSBJxIwuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHTG9naW5VdGlsc1xyXG4gICAgICAgICAgICAgICAgLkdldEFyZXNEYXRhKGljLCB1c2VHbG9iYWxQYXJhbWV0ZXJzKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHRGxnLmFsZXJ0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczoyNTAzMDQ1MlwiLCAvL1JDIDI1MDMwNDUyIDogQ2h5YmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzE0MDAwNDdcIi5mb3JtYXQoaWMpIC8vUkMgMzE0MDAwNDcgOiBOYWxlemVuYSBhZGVrdsOhdG7DrSBkYXRhIHBybyBJxIwgezB9LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCdqcmVzOjMxNDAwMDQ3Jy5mb3JtYXQoaWMpKTsgLy9SQyAzMTQwMDA0NyA6IE5hbGV6ZW5hIGFkZWt2w6F0bsOtIGRhdGEgcHJvIEnEjCB7MH0uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHRGxnLmFsZXJ0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjI1MDMwNDUyXCIsIC8vUkMgMjUwMzA0NTIgOiBDaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMxNDAwMDQ2XCIuZm9ybWF0KGljKSAgLy9SQyAzMTQwMDA0NiA6IFNlbGhhbG8gesOtc2vDoXbDoW7DrSBpbmZvcm1hY8OtIHBybyBJxIwgezB9LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgnanJlczozMTQwMDA0NicuZm9ybWF0KGljKSk7IC8vUkMgMzE0MDAwNDYgOiBTZWxoYWxvIHrDrXNrw6F2w6Fuw60gaW5mb3JtYWPDrSBwcm8gScSMIHswfS4gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vcmV0dXJuICQuZ2V0KCdnaW4vd2Vic2VydmljZXMvYXJlcy5hc2h4P3E9ezB9Jy5mb3JtYXQoaWMpKVxyXG4gICAgICAgICAgICAvLyAgICAuZmFpbCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBHRGxnLmFsZXJ0KFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIFwianJlczoyNTAzMDQ1MlwiLCAvL1JDIDI1MDMwNDUyIDogQ2h5YmFcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBcImpyZXM6MzE0MDAwNDZcIi5mb3JtYXQoaWMpICAvL1JDIDMxNDAwMDQ2IDogU2VsaGFsbyB6w61za8OhdsOhbsOtIGluZm9ybWFjw60gcHJvIEnEjCB7MH0uXHJcbiAgICAgICAgICAgIC8vICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoJ2pyZXM6MzE0MDAwNDYnLmZvcm1hdChpYykpOyAvL1JDIDMxNDAwMDQ2IDogU2VsaGFsbyB6w61za8OhdsOhbsOtIGluZm9ybWFjw60gcHJvIEnEjCB7MH0uXHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoKGRhdGE/Lmxlbmd0aCA/PyAwKSAhPT0gMSB8fCAhZGF0YVswXSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIEdEbGcuYWxlcnQoXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIFwianJlczoyNTAzMDQ1MlwiLCAvL1JDIDI1MDMwNDUyIDogQ2h5YmFcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgXCJqcmVzOjMxNDAwMDQ3XCIuZm9ybWF0KGljKSAvL1JDIDMxNDAwMDQ3IDogTmFsZXplbmEgYWRla3bDoXRuw60gZGF0YSBwcm8gScSMIHswfS5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCdqcmVzOjMxNDAwMDQ3Jy5mb3JtYXQoaWMpKTsgLy9SQyAzMTQwMDA0NyA6IE5hbGV6ZW5hIGFkZWt2w6F0bsOtIGRhdGEgcHJvIEnEjCB7MH0uXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRhdGFbMF07XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmHEjXRlIGRhdGEgeiBBUkVTIHBybyB6YWRhbsOpIEnEjCBhIHDFmWV2ZWRlIGplIGRvIEdQdWJsaWNVc2VyRHRvLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAwOC4wOS4yMDIxXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGljXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBpc1ByYXZuaWNrYVByZXNldFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxXZWJDb250cm9scy5HUHVibGljVXNlckR0bywgc3RyaW5nPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEFyZXNQdWJsaWNVc2VyRGF0YShcclxuICAgICAgICAgICAgaWM6IHN0cmluZyxcclxuICAgICAgICAgICAgaXNQcmF2bmlja2FQcmVzZXQ6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHVzZUdsb2JhbFBhcmFtZXRlcnM6IGJvb2xlYW5cclxuICAgICAgICApOiBKUXVlcnkuUHJvbWlzZTxXZWJDb250cm9scy5HUHVibGljVXNlckR0by8qICYgeyBjaXNsbz86IHN0cmluZyB8IG51bGwgfSovLCBzdHJpbmc+IHtcclxuICAgICAgICAgICAgcmV0dXJuICQud2hlbihcclxuICAgICAgICAgICAgICAgIEdQdWJsaWNVc2VyUmVnRm9ybS5nZXRBcmVzRGF0YShpYywgdXNlR2xvYmFsUGFyYW1ldGVycyksXHJcbiAgICAgICAgICAgICAgICAoR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmN0eW8oKS5kYXRhIGFzIGFueSkuZ2V0RGF0YSgpLFxyXG4gICAgICAgICAgICAgICAgKEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zenJzcHJmKCkuZGF0YSBhcyBhbnkpLmdldERhdGEoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAudGhlbigoYXJlc0RhdGEsIGNpc2VsbmlrVHlwT3JnLCBjaXNlbG5pa1N6clByYXZuaUZvcm1hKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2lzZWxuaWt5IHogbmVqYWt5Y2ggenZsYXN0bmljaCBkdXZvZHUgdnJhY2kgcG9sZSBkYXQgdiBwb2xpLCB0YWvFvmUgc2UgYmVydSBwcnZuaSBwb2xvxb5rdS5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gR1B1YmxpY1VzZXJSZWdGb3JtLmFyZXNEYXRhVG9QdWJsaWNVc2VyKGFyZXNEYXRhLCBpc1ByYXZuaWNrYVByZXNldCwgY2lzZWxuaWtTenJQcmF2bmlGb3JtYVswXSwgY2lzZWxuaWtUeXBPcmdbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlldmVkZSBhcmVzIGRhdGEgZG8gR1B1YmxpY1VzZXJEdG8uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDA4LjA5LjIwMjFcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dBcmVzRGF0YUR0b30gYXJlc1xyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNQcmF2bmlja2FcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5Db250cm9sc0xvZ2ljLkludGVyZmFjZS5HU3pyc3ByZkR0b1tdfSBkYXRhUHJhdm5pRm9ybXlcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5EYXRhLlJlYWRlcnMuR2luY3R5b0R0b1tdfSBkYXRhVHlwT3JnYW5pemFjZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHUHVibGljVXNlckR0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGFyZXNEYXRhVG9QdWJsaWNVc2VyKFxyXG4gICAgICAgICAgICBhcmVzOiBHQXJlc0RhdGFEdG8sXHJcbiAgICAgICAgICAgIGlzUHJhdm5pY2thUHJlc2V0OiBib29sZWFuLFxyXG4gICAgICAgICAgICBkYXRhUHJhdm5pRm9ybXk6IEdvcmRpYy5Db250cm9sc0xvZ2ljLkludGVyZmFjZS5HU3pyc3ByZkR0b1tdLFxyXG4gICAgICAgICAgICBkYXRhVHlwT3JnYW5pemFjZTogR29yZGljLkRhdGEuUmVhZGVycy5HaW5jdHlvRHRvW11cclxuICAgICAgICApOiBHUHVibGljVXNlckR0by8qICYgeyBjaXNsbz86IHN0cmluZyB8IG51bGwgfSovIHtcclxuICAgICAgICAgICAgY29uc3QgbG9nZ2VyID0gdGhpcy5HZXRMb2dnZXIoKTtcclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdhcmVzRGF0YVRvUHVibGljVXNlciAtIHN0YXJ0LicpO1xyXG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2FyZXNEYXRhVG9QdWJsaWNVc2VyIC0gaWM6IHswfS4nLmZvcm1hdChhcmVzLkljbyA/PyB2b2lkIDApKTtcclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdhcmVzRGF0YVRvUHVibGljVXNlciAtIGRhdGFQcmF2bmlGb3JteUxlbmd0aDogezB9LicuZm9ybWF0KGRhdGFQcmF2bmlGb3JteT8ubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnYXJlc0RhdGFUb1B1YmxpY1VzZXIgLSBkYXRhVHlwT3JnYW5pemFjZUxlbmd0aDogezB9LicuZm9ybWF0KGRhdGFUeXBPcmdhbml6YWNlPy5sZW5ndGgpKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRpYyA9IGFyZXMuRGljPy50cmltKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNPciA9IGFyZXMuQ2lzbG9PcmllbnRhY25pPy50cmltKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGR0bzogR1B1YmxpY1VzZXJEdG8vKiAmIHsgY2lzbG8/OiBzdHJpbmcgfCBudWxsIH0qLyA9IHtcclxuICAgICAgICAgICAgICAgIGRpYzogZGljID8gZGljIDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgLy9pYzogYXJlcy5JQ08sXHJcbiAgICAgICAgICAgICAgICBjUG9wOiBhcmVzLkNpc2xvUG9waXNuZSxcclxuICAgICAgICAgICAgICAgIGNPcjogY09yID8gY09yIDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgY2FzdE9iY2U6IGFyZXMuQ2FzdE9iY2UsXHJcbiAgICAgICAgICAgICAgICBvYmVjOiBhcmVzLk9iZWMsXHJcbiAgICAgICAgICAgICAgICB1bGljZTogYXJlcy5VbGljZSxcclxuICAgICAgICAgICAgICAgIHBzYzogYXJlcy5Qc2MsXHJcbiAgICAgICAgICAgICAgICBzdGF0OiA0MixcclxuICAgICAgICAgICAgICAgIC8vIDUuIHByaXpuYWsgamUgZXhpc3RlbmNlIHYgcmVqc3RyaWt1IHBsYXRjdSBEUEgsIHZpei46XHJcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3aW5mby5tZmNyLmN6L2FyZXMvYXJlc194bWxfYmFzaWMuaHRtbC5jelxyXG4gICAgICAgICAgICAgICAgLy9Jc1ZhdFBheWVyOiBhcmVzLlByaXpuYWt5X3N1Ympla3R1ID8gYXJlcy5Qcml6bmFreV9zdWJqZWt0dVs1XSA9PT0gXCJBXCIgOiB2b2lkIDBcclxuICAgICAgICAgICAgICAgIElzVmF0UGF5ZXI6IGFyZXMuUGxhdGNlRGFuZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy92YXIgdHlwT3JnID0gZm9ybU9iamVjdC5fZ2V0VHlwT3JnYW5pemFjZShhcmVzLlByYXZuaUZvcm1hKTtcclxuICAgICAgICAgICAgLy9pZiAoIXR5cE9yZykge1xyXG4gICAgICAgICAgICAvLyAgLy8gbsSba2R5IGplIHDFmWVkIGvDs2QgbnV0bsOpIHDFmWlkYXQgXCIxMFwiLCBuxJtrdGVyw6kga8OzZHkganNvdSB0YWtcclxuICAgICAgICAgICAgLy8gIC8vIHVsb8W+ZW7DqSB2IMSNw61zZWxuw61rdVxyXG4gICAgICAgICAgICAvLyAgICB0eXBPcmcgPSBmb3JtT2JqZWN0Ll9nZXRUeXBPcmdhbml6YWNlKFwiMTBcIiArIGFyZXMuUHJhdm5pRm9ybWEpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9pZiAoIXR5cE9yZykgdHlwT3JnID0gMzA7IC8vIHByw6F2LiBvc29iYSAtIG5lc3BlY2lmLlxyXG5cclxuICAgICAgICAgICAgbGV0IHR5cE9yZyA9IEdQdWJsaWNVc2VyUmVnRm9ybS5nZXRUeXBPcmdhbml6YWNlRGxlUHJhdm5pRm9ybXkoYXJlcy5QcmF2bmlGb3JtYSwgZGF0YVByYXZuaUZvcm15LCBkYXRhVHlwT3JnYW5pemFjZSk7XHJcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnYXJlc0RhdGFUb1B1YmxpY1VzZXIgLSB0eXBPcmc6IHswfS4nLmZvcm1hdCh0eXBPcmcgPz8gdm9pZCAwKSk7XHJcbiAgICAgICAgICAgIGlmICghdHlwT3JnKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBPcmcgPSAwOyAvLyBuZXVyxI1lbm9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZHRvLnR5cE9yZyA9IHR5cE9yZztcclxuXHJcbiAgICAgICAgICAgIC8vIE5hxI10ZW7DrSB0eXB1IHN1Ympla3R1IHogdHlwdSBvcmdhbml6YWNlLlxyXG4gICAgICAgICAgICBjb25zdCB0eXBPcmdhbml6YWNlID0gZGF0YVR5cE9yZ2FuaXphY2U/LmZpbHRlcihpID0+IGkudHlwX29yZyA9PT0gdHlwT3JnKVswXTtcclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdhcmVzRGF0YVRvUHVibGljVXNlciAtIGlzVHlwT3JnYW5pemFjZTogezB9LicuZm9ybWF0KHR5cE9yZ2FuaXphY2UgPyB0cnVlIDogZmFsc2UpKTtcclxuICAgICAgICAgICAgbGV0IHR5cF9lc3UgPSB0eXBPcmdhbml6YWNlPy50eXBfZXN1O1xyXG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2FyZXNEYXRhVG9QdWJsaWNVc2VyIC0gdHlwX2VzdTogezB9LicuZm9ybWF0KHR5cF9lc3UgPz8gdm9pZCAwKSk7XHJcblxyXG4gICAgICAgICAgICAvLyAyOS4wNC4yMDI1IC0gVEZlaWtcclxuICAgICAgICAgICAgLy8gUHJhdmTEm3BvZG9ibsSbIGV4aXN0dWrDrSBzaXR1YWNlIC8gaW5zdGFsYWNlLCBrZGUgbmVuw60gdSBvcmdhbml6YWNlIG5hYWRtaW5pc3Ryb3ZhdCB0eXAgZXN1IHRhayBqZWogcHJvIHZ5YnJhw6kgZG/FmWXFocOtbSBzYW1vc3RhdG7Emy5cclxuICAgICAgICAgICAgaWYgKCF0eXBfZXN1KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBPcmdzUHJhdm5pY2thT3NvYmE6IG51bWJlcltdID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIDM0LCA0MFxyXG4gICAgICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwT3Jnc1ByYXZuaWNrYU9zb2JhLmluY2x1ZGVzKHR5cE9yZykpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2FyZXNEYXRhVG9QdWJsaWNVc2VyIC0gbmFzdGF2ZW5pIHByYXZuaWNrZSBvc29zYnkgcHJvIGRlZmlub3ZhbnkgdHlwT3JnLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cF9lc3UgPSBHaW5pcy5EYk1vZGVsLkdHaW5jZXN1RW51bS5wcmF2bmlja2Ffb3NvYmE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBpc1ByYXZuaWNrYSA9IGlzUHJhdm5pY2thUHJlc2V0O1xyXG4gICAgICAgICAgICBpZiAodHlwX2VzdSAhPSB2b2lkIDApIHtcclxuICAgICAgICAgICAgICAgIGlzUHJhdm5pY2thID0gdHlwX2VzdSA9PT0gR2luaXMuRGJNb2RlbC5HR2luY2VzdUVudW0ucHJhdm5pY2thX29zb2JhO1xyXG4gICAgICAgICAgICAgICAgZHRvLnR5cEVzdSA9IHR5cF9lc3U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vaWYgKGlzUHJhdm5pY2thKSB7XHJcbiAgICAgICAgICAgICAgICBkdG8ub2JjaG9kbmlKbWVubyA9IGFyZXMuTmF6ZXY7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFpc1ByYXZuaWNrYSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVDZWxlSm1lbm8gPSAvXlxccyooW1xcd1xccyxcXC5dK1xcLltcXHMsXSopPyhbXlxcc1xcZFxcX1xcLl0rKVtcXHMsXSsoKD86W15cXHNcXGRcXF9cXC5dK1tcXHMsXSopKz8pKFtcXHMsXSsoPzpcXHcrXFwuKSspP1xccyokLztcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlSm1lbm9UcmltID0gL15bXFxzLF0qKC4qPylbXFxzLF0qJC87XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHJlQ2VsZUptZW5vICYmIGFyZXMuTmF6ZXYgPyByZUNlbGVKbWVuby5leGVjKGFyZXMuTmF6ZXYpIDogdm9pZCAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlQXJyYXkgPSBtYXRjaGVzLnNsaWNlKDEpLm1hcChmdW5jdGlvbiAobSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbSAmJiBtLnJlcGxhY2UocmVKbWVub1RyaW0hLCBcIiQxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKGR0bywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXR1bFByZWQ6IG1hdGNoZUFycmF5WzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqbWVubzogbWF0Y2hlQXJyYXlbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWptZW5pOiBtYXRjaGVBcnJheVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0dWxaYTogbWF0Y2hlQXJyYXlbM11cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTmFzdGF2ZW7DrSBwcsOhemRuw6lobyB6bmFrdSBwcm8gdWxpY2ksIHBva3VkIG5lbsOtIHYgQXJlcyB2eXBsbsSbbmEgKHUgb2Jjw60pLlxyXG4gICAgICAgICAgICBpZiAoIWR0by51bGljZSkge1xyXG4gICAgICAgICAgICAgICAgZHRvLnVsaWNlID0gXCIgXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIDA3LjAzLjIwMjMgLSBURmVpa1xyXG4gICAgICAgICAgICAvLyDEjMOtc2xvIHBvcGlzbsOpIGEgb3JpZW50YcSNbsOtIHNlIHXFviBwb3XFvsOtw6EgcG91emUgdiBvZGTEm2xlbsOpIGZvcm3Emy5cclxuICAgICAgICAgICAgLy8gTmFzdGF2ZW5pIGZpa3Rpdm5pIGhvZG5vdHkgcHJvIHVsb3plbmkgY2lzbGEgZG9tdSBcImNpc2xvXCIsIGt0ZXJhIG9ic2x1aHVqZSBob2Rub3R5IGNQb3AgYSBjT3IuXHJcbiAgICAgICAgICAgIC8vZHRvLmNpc2xvID0gR29yZGljLkd1aS5XZWJDb250cm9scy5HUHVibGljVXNlclJlZ0Zvcm0uZ2V0U3RyZWV0TnVtYmVyKGR0by5jUG9wLCBkdG8uY09yKTtcclxuXHJcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnYXJlc0RhdGFUb1B1YmxpY1VzZXIgLSBlbmQuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkdG87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcsOhdMOtIHR5cCBvcmdhbml6YWNlIGRsZSBwcsOhdm7DrSBmb3JteSB6IGFyZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDA4LjA5LjIwMjFcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlciB8IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IHByYXZuaUZvcm1hXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuQ29udHJvbHNMb2dpYy5JbnRlcmZhY2UuR1N6cnNwcmZEdG9bXX0gZGF0YVByYXZuaUZvcm15XHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRGF0YS5SZWFkZXJzLkdpbmN0eW9EdG9bXX0gZGF0YVR5cE9yZ2FuaXphY2VcclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBnZXRUeXBPcmdhbml6YWNlRGxlUHJhdm5pRm9ybXkoXHJcbiAgICAgICAgICAgIHByYXZuaUZvcm1hOiBudW1iZXIgfCBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsLFxyXG4gICAgICAgICAgICBkYXRhUHJhdm5pRm9ybXk6IEdvcmRpYy5Db250cm9sc0xvZ2ljLkludGVyZmFjZS5HU3pyc3ByZkR0b1tdLFxyXG4gICAgICAgICAgICBkYXRhVHlwT3JnYW5pemFjZTogR29yZGljLkRhdGEuUmVhZGVycy5HaW5jdHlvRHRvW11cclxuICAgICAgICApOiBudW1iZXIgfCB1bmRlZmluZWQgfCBudWxsIHtcclxuICAgICAgICAgICAgY29uc3QgbG9nZ2VyID0gdGhpcy5HZXRMb2dnZXIoKTtcclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdnZXRUeXBPcmdhbml6YWNlRGxlUHJhdm5pRm9ybXkgLSBzdGFydC4nKTtcclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdnZXRUeXBPcmdhbml6YWNlRGxlUHJhdm5pRm9ybXkgLSBwcmF2bmlGb3JtYTogezB9LicuZm9ybWF0KHByYXZuaUZvcm1hID8/IHZvaWQgMCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHR5cE9yZzogbnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJhdm5pRm9ybWEgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHByYXZuaUZvcm1hID0gcGFyc2VJbnQocHJhdm5pRm9ybWEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YVByYXZuaUZvcm15KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFQcmF2bmlGb3JteS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBkYXRhUHJhdm5pRm9ybXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByYXZuaUZvcm1hID09PSBwYXJzZUludChpdGVtLmtvZF9wcmF2bmlfZm9ybXkgYXMgYW55KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBPcmcgPSBpdGVtLnR5cF9vcmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnZ2V0VHlwT3JnYW5pemFjZURsZVByYXZuaUZvcm15IC0gZGF0YVByYXZuaUZvcm15IC0gdHlwT3JnOiB7MH0uJy5mb3JtYXQodHlwT3JnID8/IHZvaWQgMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdHlwT3JnICYmIGRhdGFUeXBPcmdhbml6YWNlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFUeXBPcmdhbml6YWNlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGRhdGFUeXBPcmdhbml6YWNlW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmF2bmlGb3JtYSA9PT0gcGFyc2VJbnQoaXRlbS5wcl9mb3JtYSBhcyBhbnkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cE9yZyA9IGl0ZW0udHlwX29yZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdnZXRUeXBPcmdhbml6YWNlRGxlUHJhdm5pRm9ybXkgLSBkYXRhVHlwT3JnYW5pemFjZSAtIHR5cE9yZzogezB9LicuZm9ybWF0KHR5cE9yZyA/PyB2b2lkIDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIDE3LjA0LjIwMjUgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgLy8gxIx0ZW7DrSB0eXB1IG9yZ2FuaXphY2UgcHJvIE9TVsSMIHJvesWhw63FmWVubyBvIHbDvWNob3rDrSBwcsOhdm7DrSBmb3JteSBkbGUgRXN1LlNlcnZlci5HRGV0R2luc2VzdS5HZXRUeXBPcmdEbGVQckZvcm15LlxyXG4gICAgICAgICAgICAgICAgaWYgKCF0eXBPcmcgJiYgcHJhdm5pRm9ybWEgIT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJhdm5pRm9ybWFPc3ZjOiBudW1iZXJbXSA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMTAwLCAxMDEsIDEwMiwgMTAzLCAxMDQsIDEwNSwgMTA2LCAxMDcsIDEwOCwgMTA5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAyOS4wNC4yMDI1IC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUMWZaWTDoW55IHphaGFuacSNbsOtIE9TVsSMLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MjEsIDQyNFxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmF2bmlGb3JtYU9zdmMuaW5jbHVkZXMocHJhdm5pRm9ybWEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRiTW9kZWwgPSBHaW5pcy5EYk1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBPcmdzT3N2YyA9IGRhdGFUeXBPcmdhbml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGkgPT4gaS50eXBfZXN1ID09PSBkYk1vZGVsLkdHaW5jZXN1RW51bS5meXpfb3NvYmFfb3N2YyAmJiBpLmFrdGl2aXRhID09PSBkYk1vZGVsLkdHaW5jYWt0RW51bS5ha3Rpdm5pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChpID0+IGkudHlwX29yZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoaSA9PiBpICE9IHZvaWQgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBPcmdzT3N2Yy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBPcmcgPSBNYXRoLm1pbiguLi50eXBPcmdzT3N2Yyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2dldFR5cE9yZ2FuaXphY2VEbGVQcmF2bmlGb3JteSAtIHByYXZuaUZvcm1hT3N2YyAtIHR5cE9yZzogezB9LicuZm9ybWF0KHR5cE9yZyA/PyB2b2lkIDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdnZXRUeXBPcmdhbml6YWNlRGxlUHJhdm5pRm9ybXkgLSBlbmQuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBPcmc7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8qKlxyXG4gICAgLy8gKiBEYXRhIHZyYWNlbsOhIHogQVJFU3UuXHJcbiAgICAvLyAqIFxyXG4gICAgLy8gKiBAYXV0aG9yICBURmVpa1xyXG4gICAgLy8gKiBAZGF0ZSAgICAwOC4wOS4yMDIxXHJcbiAgICAvLyAqIEBzaW5jZSAgIDQ4Ni4xLjAuNDY1XHJcbiAgICAvLyAqL1xyXG4gICAgLy9leHBvcnQgaW50ZXJmYWNlIEFyZXNEYXRhIHtcclxuICAgIC8vICAgIEFkcmVzYUtvZD86IHN0cmluZyxcclxuICAgIC8vICAgIENpc2xvRG9tdT86IHN0cmluZyxcclxuICAgIC8vICAgIENpc2xvT3JpZW50YWNuaT86IHN0cmluZyxcclxuICAgIC8vICAgIC8qKlxyXG4gICAgLy8gICAgICogUlJSUi1NTS1ERFxyXG4gICAgLy8gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgIC8vICAgICAqL1xyXG4gICAgLy8gICAgRGF0dW1Wem5pa3U/OiBzdHJpbmcsXHJcbiAgICAvLyAgICBEaWM/OiBzdHJpbmcsXHJcbiAgICAvLyAgICBJQ08/OiBzdHJpbmcsXHJcbiAgICAvLyAgICBOYXpldj86IHN0cmluZyxcclxuICAgIC8vICAgIE5hemV2Q2FzdGlPYmNlPzogc3RyaW5nLFxyXG4gICAgLy8gICAgTmF6ZXZPYmNlPzogc3RyaW5nLFxyXG4gICAgLy8gICAgTmF6ZXZPa3Jlc3U/OiBzdHJpbmcsXHJcbiAgICAvLyAgICBOYXpldlVsaWNlPzogc3RyaW5nLFxyXG4gICAgLy8gICAgUFNDPzogc3RyaW5nLFxyXG4gICAgLy8gICAgUHJhdm5pRm9ybWE/OiBzdHJpbmcsXHJcbiAgICAvLyAgICBQcml6bmFreV9zdWJqZWt0dT86IHN0cmluZ1xyXG4gICAgLy99XHJcbn0iLCIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkd1aS5XZWJDb250cm9scy5HUHVibGljVXNlclJlZ0Zvcm0udHMgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEZvcm11bMOhxZkgcHJvIHJlZ2lzdHJhY2kgLyB6bTJudSDDumRhasWvIHZlxZllam7DqWhvIHXFvml2YXRlbGUuICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHRmZWlrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE3LTAzLTI3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkd1aS5XZWJDb250cm9scyB7XHJcbiAgICAvKipcclxuICAgICAqIE7DoXp2eSBwb2zDrcSNZWsgcmVnaXN0cmHEjW7DrSBmb3JtdWzDocWZZSB2ZcWZZWpuw6lobyB1xb5pdmF0ZWxlLlxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yICBQSG9yc2FrXHJcbiAgICAgKiBAc2luY2UgICA0ODIuMS4wLjQ3NVxyXG4gICAgICogQGRhdGUgICAgMDcuMDguMjAxOVxyXG4gICAgICovXHJcbiAgICBlbnVtIEZpZWxkTmFtZXMge1xyXG4gICAgICAgIGVtYWlsID0gXCJlbWFpbFwiLFxyXG4gICAgICAgIGVtYWlsQXNMb2dpbiA9IFwiZW1haWxBc0xvZ2luXCIsXHJcbiAgICAgICAgdXppdmF0ZWxza2VKbWVubyA9IFwidXppdmF0ZWxza2VKbWVub1wiLFxyXG4gICAgICAgIGhlc2xvID0gXCJoZXNsb1wiLFxyXG4gICAgICAgIG92ZXJlbmlIZXNsYSA9IFwib3ZlcmVuaUhlc2xhXCIsXHJcbiAgICAgICAgaWMgPSBcImljXCIsXHJcbiAgICAgICAgb2JjaG9kbmlKbWVubyA9IFwib2JjaG9kbmlKbWVub1wiLFxyXG4gICAgICAgIGptZW5vID0gXCJqbWVub1wiLFxyXG4gICAgICAgIHByaWptZW5pID0gXCJwcmlqbWVuaVwiLFxyXG4gICAgICAgIHNvdWhsYXNTZVpwcmFjb3ZhbmltVWRhanUgPSBcInNvdWhsYXNTZVpwcmFjb3ZhbmltVWRhanVcIlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTsOhenZ5IHNla2PDrSByZWdpc3RyYcSNbsOtIGZvcm11bMOhxZllIHZlxZllam7DqWhvIHXFvml2YXRlbGUuXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgIFBIb3JzYWtcclxuICAgICAqIEBzaW5jZSAgIDQ4Mi4xLjAuNDk5XHJcbiAgICAgKiBAZGF0ZSAgICAxNi4wOC4yMDE5XHJcbiAgICAgKi9cclxuICAgIGVudW0gU2VjdGlvbk5hbWVzIHtcclxuICAgICAgICBwcmlobGFzb3ZhY2lVZGFqZSA9IFwicHJpaGxhc292YWNpVWRhamVcIixcclxuICAgICAgICBwb2RtaW5reVBvdXppdmFuaSA9IFwicG9kbWlua3lQb3V6aXZhbmlcIlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IEZvcm1OYW1lID0gXCJSZWdpc3RlclB1YmxpY1VzZXJGb3JtXCJcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdYcmdQdWJsaWNVc2VyUmVnRm9ybU9iamVjdCB7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGZvcm1EaXY6IEpRdWVyeTxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgbGF5b3V0RGVzY3JpcHRvcj86IHN0cmluZyxcclxuICAgICAgICAvL2RhdGFQcmF2bmlGb3JteTogYW55LFxyXG4gICAgICAgIC8vY2lzZWxuaWtTenJQcmF2bmlGb3JtYTogYW55LFxyXG4gICAgICAgIC8vZGF0YVR5cE9yZ2FuaXphY2U6IGFueSxcclxuICAgICAgICAvL2Npc2VsbmlrVHlwT3JnOiBhbnksXHJcbiAgICAgICAgcmVDZWxlSm1lbm8/OiBSZWdFeHAsXHJcbiAgICAgICAgcmVKbWVub1RyaW0/OiBSZWdFeHAsXHJcbiAgICAgICAgLy9kYXRhVmlld1R5cE9yZzogYW55LFxyXG4gICAgICAgIC8vZGF0YVZpZXdUeXBFc3U6IGFueSxcclxuICAgICAgICBjb250YWluZXI6IEpRdWVyeTxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgLy9kYXRhVmlld1N0YXQ6IGFueSxcclxuICAgICAgICBjb25kaXRpb25BZ3JlZW1lbnRUZXh0Pzogc3RyaW5nLFxyXG4gICAgICAgIHZhbGlkYXRvcnM/OiBvYmplY3QsXHJcbiAgICAgICAgaW5pdGlhbFZhbHVlcz86IEdQdWJsaWNVc2VyRHRvLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gZm9ybXVsw6HFmS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9jcmVhdGVGb3JtKCk6IHZvaWQsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhesOtIC8gc2tyeWplIHBvbMOtxI1rYSBuYSBmb3JtdWzDocWZaSBkbGUgdHlwdSBwcsOhdm7DrSBvc29ieS4gSG9kbm90YSBza3J5dMO9Y2ggcG9sw63EjWVrIHNlIG5lbWHFvmUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW3R5cF9lc3VdIDAgLSBcIm5ldXLEjWVub1wiLCAxMCAtIFwicHLDoXZuaWNrw6Egb3NvYmFcIiwgMjAgLSBcImZ5emlja8OhIG9zb2JhXCIsIDMwIC0gXCJmeXppY2vDoSBvc29iYSAtIE9TVsSMXCJcclxuICAgICAgICAgKi9cclxuICAgICAgICBfYWRqdXN0Rm9ybSh0eXBfZXN1PzogbnVtYmVyKTogdm9pZCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogX2dldFR5cE9yZ2FuaXphY2VcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0eXBPcmdhbml6YWNlXHJcbiAgICAgICAgICogQHJldHVybnMge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX2dldFR5cE9yZ2FuaXphY2UodHlwT3JnYW5pemFjZTogbnVtYmVyKTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIF9nZXRBcmVzRGF0YVxyXG4gICAgICAgIC8vICpcclxuICAgICAgICAvLyAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgLy8gKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgLy8gKiBcclxuICAgICAgICAvLyAqIEBwYXJhbSB7c3RyaW5nfSBpY1xyXG4gICAgICAgIC8vICogQHJldHVybnMge2FueX1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vX2dldEFyZXNEYXRhKGljOiBzdHJpbmcpOiBhbnksXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIF9hcHBseUFyZXNEYXRhXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW292ZXJ3cml0ZVVzZXJWYWx1ZXNdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX2FwcGx5QXJlc0RhdGEoZGF0YTogYW55LCBvdmVyd3JpdGVVc2VyVmFsdWVzPzogYm9vbGVhbik6IHZvaWQsXHJcblxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBfYXJlc0RhdGFUb0R0b1xyXG4gICAgICAgIC8vICpcclxuICAgICAgICAvLyAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgLy8gKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgLy8gKiBcclxuICAgICAgICAvLyAqIEBwYXJhbSB7YW55fSBhcmVzXHJcbiAgICAgICAgLy8gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1ByYXZuaWNrYV1cclxuICAgICAgICAvLyAqIEByZXR1cm5zIHtHUHVibGljVXNlckR0b31cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vX2FyZXNEYXRhVG9EdG8oYXJlczogYW55LCBpc1ByYXZuaWNrYT86IGJvb2xlYW4pOiBHUHVibGljVXNlckR0byxcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdsOtIHbDvWNob3rDrSBob2Rub3R5LCB2YWxpZMOhdG9yeSBhIG9uQ2hhbmdlTGlzdGVuZXIsIGt0ZXLDvSB6b2JyYXp1amUgb2RsacWhbm9zdCBob2Rub3R5IHBvbMOtxI1rYSBvZCBob2Rub3R5IHogQXJlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9pbml0Rm9ybSgpOiB2b2lkLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmF0aSBwcmltaXRpdm7DrSBob2Rub3R1IHogZmllbGQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59ICRmaWVsZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmcgfCBudW1iZXIgfCBvYmplY3QgfCB1bmRlZmluZWQgfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9nZXRGaWVsZFJhd1ZhbHVlKCRmaWVsZDogSlF1ZXJ5PEhUTUxFbGVtZW50Pik6IHN0cmluZyB8IG51bWJlciB8IG9iamVjdCB8IHVuZGVmaW5lZCB8IG51bGwsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdsOtIGRhdGEgZG8gZm9ybXVsw6HFmWUgYSBzbG/FvsOtIMSNw61zbG8gZG9tdSBhIGptw6lubyB1xb5pdmF0ZWxlIHogbsSba29saWthIHBvbMOtxI1layBkbyBqZWRuw6kgKGNpc2xvLCBjZWxlSm1lbm8pLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R1B1YmxpY1VzZXJEdG99IGZvcm1EYXRhIE9iamVrdCBob2Rub3QsIGt0ZXLDqSBzZSB1bG/FvsOtIGRvIGZvcm11bMOhxZllLlxyXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gW2ZpZWxkc10gUG9sw63EjWthLCBkbyBrdGVyw71jaCBzZSBkYXRhIG5hc3RhdnVqw60uIFBva3VkIG5lbsOtIHZ5cGxuxJtubyBwYWsgc2UgcG91xb5pasOtIHbFoWVjaG55IHBvbMOtxI1rYSBmb3JtdWzDocWZZS5cclxuICAgICAgICAgKiBAcGFyYW0ge0ZpZWxkU2V0VmFsdWVGbGFnc30gW2ZsYWdzXSBQxZnDrXpuYWt5LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFwcGx5KGZvcm1EYXRhOiBHUHVibGljVXNlckR0bywgZmllbGRzPzogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgZmxhZ3M/OiBGaWVsZFNldFZhbHVlRmxhZ3MpOiB2b2lkLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpiw61yw6EgZGF0YSB6IGZvcm11bMOhxZllIGEgcm96cGFyc3VqZSDEjcOtc2xvIGRvbXUgYSBqbcOpbm8gdcW+aXZhdGVsZSB6IGplZG5vaG8gcG9sw63EjWthIGRvIHbDrWNlIChwcm8gRHRvKS5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dQdWJsaWNVc2VyRHRvfSByZXN1bHQgT2JqZWt0LCBkbyBrdGVyw6lobyBzZSB1bG/FvsOtIG5hbGV6ZW7DqSBob2Rub3R5LlxyXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn0gW2ZpZWxkc10gUG9sw63EjWthLCB6ZSBrdGVyw71jaCBzZSBkYXRhIG5hxI3DrXRhasOtLiBQb2t1ZCBuZW7DrSB2eXBsbsSbbm8gcGFrIHNlIHBvdcW+aWrDrSB2xaFlY2hueSBwb2zDrcSNa2EgZm9ybXVsw6HFmWUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy9jb2xsZWN0KHJlc3VsdDogR1B1YmxpY1VzZXJEdG8sIGZpZWxkcz86IEpRdWVyeTxIVE1MRWxlbWVudD4pOiB2b2lkXHJcbiAgICAgICAgY29sbGVjdCgpOiBKUXVlcnkuUHJvbWlzZTxHUHVibGljVXNlckR0bz4sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFprb250cm9sdWplIHpkYSBqZSBmb3JtdWzDocWZIHZhbGlkbsOtLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTkuMDguMjAxOVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzVmFsaWQoKTogYm9vbGVhblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1hyZ1B1YmxpY1VzZXJSZWdGb3JtT3B0aW9ucyB7XHJcbiAgICAgICAgaW5pdGlhbFZhbHVlcz86IFdlYkNvbnRyb2xzLkdQdWJsaWNVc2VyRHRvXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHUHVibGljVXNlclJlZ0Zvcm1cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAqIEBzaW5jZSAgIDQ4MC4xLjAuNTE3XHJcbiAgICAgKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHWHJnUHVibGljVXNlclJlZ0Zvcm0ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGVuYWJsZUZpZWxkc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAwNy4wOC4yMDE5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHUHVibGljVXNlclBlcm1pc3Npb25EdG99IFtwZXJtaXNzaW9uc11cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBlbmFibGVGaWVsZHMob3B0OiB7XHJcbiAgICAgICAgICAgIGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zPzogR1B1YmxpY1VzZXJQZXJtaXNzaW9uRHRvLFxyXG4gICAgICAgICAgICBpc1JlZ2lzdHJhdGlvbkZvcm0/OiBib29sZWFuXHJcbiAgICAgICAgfSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoIW9wdCB8fCAhR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmb3JtXCIsIG9wdC5mb3JtKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBOYXDFmWVkIHbFoWVjaG55IHBvbMOtxI1rYSB6YWvDocW+dSwgLi4uXHJcbiAgICAgICAgICAgIG9wdC5mb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghb3B0LnBlcm1pc3Npb25zKSB7XHJcbiAgICAgICAgICAgICAgICBvcHQucGVybWlzc2lvbnMgPSB7fSBhcyBHUHVibGljVXNlclBlcm1pc3Npb25EdG87XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIC4uLiBwb3Niw61yw6FtIHNpIGptw6luYSBwb2zDrcSNZWssIGt0ZXLDqSBqZSBtb8W+bsOpIGVkaXRvdmF0IC4uLlxyXG4gICAgICAgICAgICBjb25zdCBmaWVsZE5hbWVzVG9FbmFibGU6IEZpZWxkTmFtZXNbXSA9IFtcclxuICAgICAgICAgICAgICAgIEZpZWxkTmFtZXMuc291aGxhc1NlWnByYWNvdmFuaW1VZGFqdVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0RW1haWwgJiYgb3B0LnBlcm1pc3Npb25zLkNhbkVkaXRFbWFpbC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMuZW1haWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRFbWFpbEFzTG9naW4gJiYgb3B0LnBlcm1pc3Npb25zLkNhbkVkaXRFbWFpbEFzTG9naW4udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLmVtYWlsQXNMb2dpbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHQuaXNSZWdpc3RyYXRpb25Gb3JtIHx8IChvcHQucGVybWlzc2lvbnMuQ2FuRWRpdEhlc2xvICYmIG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0SGVzbG8udmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLmhlc2xvKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pc1JlZ2lzdHJhdGlvbkZvcm0gfHwgKG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0SWMgJiYgb3B0LnBlcm1pc3Npb25zLkNhbkVkaXRJYy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMuaWMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0LmlzUmVnaXN0cmF0aW9uRm9ybSB8fCAob3B0LnBlcm1pc3Npb25zLkNhbkVkaXRKbWVubyAmJiBvcHQucGVybWlzc2lvbnMuQ2FuRWRpdEptZW5vLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lc1RvRW5hYmxlLnB1c2goRmllbGROYW1lcy5qbWVubyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHQuaXNSZWdpc3RyYXRpb25Gb3JtIHx8IChvcHQucGVybWlzc2lvbnMuQ2FuRWRpdE9iY2hvZG5pSm1lbm8gJiYgb3B0LnBlcm1pc3Npb25zLkNhbkVkaXRPYmNob2RuaUptZW5vLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lc1RvRW5hYmxlLnB1c2goRmllbGROYW1lcy5vYmNob2RuaUptZW5vKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHQuaXNSZWdpc3RyYXRpb25Gb3JtIHx8IChvcHQucGVybWlzc2lvbnMuQ2FuRWRpdFByaWptZW5pICYmIG9wdC5wZXJtaXNzaW9ucy5DYW5FZGl0UHJpam1lbmkudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChGaWVsZE5hbWVzLnByaWptZW5pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gMDMuMDkuMjAxOSAtIFRGZWlrXHJcbiAgICAgICAgICAgIC8vIFBvdm9sw60gZW5hYmxlZCB1xb5pdmF0ZWxza8OpaG8gam3DqW5hIHBvdXplLCBwb2t1ZCBuZW7DrSBuYXN0YXZlbm8gcG91xb5pdMOtIGVtYWlsdSBqYWtvIGxvZ2ludS5cclxuICAgICAgICAgICAgY29uc3QgZW1haWxBc0xvZ2luID0gb3B0LmZvcm0uZmluZEZpZWxkcyhGaWVsZE5hbWVzLmVtYWlsQXNMb2dpbikuZ2ZpZWxkPGJvb2xlYW4gfCB1bmRlZmluZWQ+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmICghZW1haWxBc0xvZ2luICYmIChvcHQuaXNSZWdpc3RyYXRpb25Gb3JtIHx8IChvcHQucGVybWlzc2lvbnMuQ2FuRWRpdFV6aXZhdGVsc2tlSm1lbm8gJiYgb3B0LnBlcm1pc3Npb25zLkNhbkVkaXRVeml2YXRlbHNrZUptZW5vLnZhbHVlKSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZXNUb0VuYWJsZS5wdXNoKEZpZWxkTmFtZXMudXppdmF0ZWxza2VKbWVubyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIC4uLiBhIHUgbmljaCB6cnXFocOtbSBkaXNhYmxlZC5cclxuICAgICAgICAgICAgaWYgKGZpZWxkTmFtZXNUb0VuYWJsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBvcHQuZm9ybS5maW5kRmllbGRzKGZpZWxkTmFtZXNUb0VuYWJsZS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBvYmpla3QgcmVnaXN0cmHEjW7DrWhvIGZvcm11bMOhxZllLCBpbmljaWFsaXp1amUgamVqIGEgbmFzdGF2w60gZG8gY29udGVudHUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW1zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUocGFyYW1zOiBHWHJnUHVibGljVXNlclJlZ0Zvcm1PcHRpb25zKTogSlF1ZXJ5LlByb21pc2U8R1hyZ1B1YmxpY1VzZXJSZWdGb3JtT2JqZWN0PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgbGV0IHB1YmxpY0xvZ2luQ29uZmlnOiBHUHVibGljTG9naW5Db25maWdEdG8gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCBmb3JtT2JqZWN0OiBHWHJnUHVibGljVXNlclJlZ0Zvcm1PYmplY3Q7XHJcbiAgICAgICAgICAgIC8vbGV0IFJzYVBhcmFtc1B1YmxpYzogU3lzdGVtLlNlY3VyaXR5LkNyeXB0b2dyYXBoeS5SU0FQYXJhbWV0ZXJzIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgLy8gMTQuMDguMjAxOCAtIFRGZWlrXHJcbiAgICAgICAgICAgIC8vIFByZXByYWNvdmFuaSBmdW5rY2UgY3JlYXRlIG5hIHByb21pcyBhYnljaCB6YWppc3RpbCByYWRuZSBuYWN0ZW5pIGNvbmZpZ3UuXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsb2FkUHVibGljTG9naW5Db25maWcoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR0xvZ2luVXRpbHMuR2V0UHVibGljTG9naW5Db25maWcoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChwdWJsaWNMb2dpbkNvbmZpZ1JldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdWJsaWNMb2dpbkNvbmZpZyA9IHB1YmxpY0xvZ2luQ29uZmlnUmV0VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QgPSAkLmV4dGVuZChmb3JtT2JqZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGb3JtTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogKHRoYXQgYXMgYW55KS5lbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBwYXJhbXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybU9iamVjdC5jaXNsb1BvcE9yUGF0dCA9IC9eXFxzKig/OihcXGQrKVxcRCspPyhcXGQrW2EtekEtWl0/KVxccyokLztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5yZUNlbGVKbWVubyA9IC9eXFxzKihbXFx3XFxzLFxcLl0rXFwuW1xccyxdKik/KFteXFxzXFxkXFxfXFwuXSspW1xccyxdKygoPzpbXlxcc1xcZFxcX1xcLl0rW1xccyxdKikrPykoW1xccyxdKyg/OlxcdytcXC4pKyk/XFxzKiQvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LnJlSm1lbm9UcmltID0gL15bXFxzLF0qKC4qPylbXFxzLF0qJC87XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdGb3JtID0gZm9ybU9iamVjdC5uYW1lID09PSBGb3JtTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5fY3JlYXRlRm9ybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvxZnDrSBmb3JtdWzDocWZLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zdCByZWdGb3JtID0gZm9ybU9iamVjdC5uYW1lID09PSBcIlJlZ2lzdGVyUHVibGljVXNlckZvcm1cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWdJbnN0cnVjdGlvbnM6IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbnN0cnVjdGlvbnM6IGFueSA9ICQubm9vcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVnRm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXCJqcmVzOjMxNDAwMDY3XCIgLy9SQyAzMTQwMDA2NyA6IFZ5cGxuxJtuw61tIGZvcm11bMOhxZllIGEga2xpa251dMOtbSBuYSA8cT57MH08L3E+IGRvamRlIGsgb2Rlc2zDoW7DrSBha3RpdmHEjW7DrWhvIGVtYWlsdXt7MH19LiBOZcW+IHNlIHBvcHJ2w6kgcMWZaWhsw6Fzw610ZSwgbXVzw610ZSBrbGlrbm91dCBuYSBvZGtheiB1dmVkZW7DvSB2IGFrdGl2YcSNbsOtbSBlbWFpbHUsIGFieWNob20gb3bEm8WZaWxpLCDFvmUgbcOhdGUgcMWZw61zdHVwIGsgdXZlZGVuw6kgZW1haWxvdsOpIHNjaHLDoW5jZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdJbnN0cnVjdGlvbnMgPSBwdWJsaWNMb2dpbkNvbmZpZ1JldFZhbC50ZXh0ICE9IHVuZGVmaW5lZCAmJiBwdWJsaWNMb2dpbkNvbmZpZ1JldFZhbC50ZXh0Lmluc3RydWN0aW9ucyAhPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwdWJsaWNMb2dpbkNvbmZpZ1JldFZhbC50ZXh0Lmluc3RydWN0aW9ucy5mb3JtYXQoXCJqcmVzOjMxNDAwMDY4XCIpIDogXCJcIjsgLy9SQyAzMTQwMDA2OCA6IFJlZ2lzdHJvdmF0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEluc3RydWN0aW9ucyA9IGZ1bmN0aW9uIChlbWFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVnSW5zdHJ1Y3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0LmZvcm1EaXYuZmluZChcIi5qcy1pbnN0cnVjdGlvbnNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2Zvcm10ZXh0KHJlZ0luc3RydWN0aW9ucy5mb3JtYXQoIWVtYWlsID8gXCJcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiICsgXCJqcmVzOjMxNDAwMDcwXCIgLy9SQyAzMTQwMDA3MCA6IG5hIGFkcmVzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiIDxzdHJvbmc+XCIgKyBlbWFpbCArIFwiPC9zdHJvbmc+XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZnVuY3Rpb24gX2FkanVzdFR5cE9yZ2FuaXphY2VEYXRhVmlldyh0eXBFc3UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChyZWdGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY29uc3QgdHlwT3JnRmllbGQgPSBmb3JtT2JqZWN0LmZvcm1EaXYuZmluZEZpZWxkcyhcInR5cE9yZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjb25zdCB0ZW1wVmlldyA9IGZvcm1PYmplY3QuY2lzZWxuaWtUeXBPcmcuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0ZW1wVmlldy5hcHBseVZpZXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBmaWx0ZXI6IFwidHlwX2VzdSA9PT0gXCIgKyB0eXBFc3UudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHR5cE9yZ0ZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImRhdGFcIiwgbmV3IEdvcmRpYy5EYXRhLlZpZXcodGVtcFZpZXcuZ2V0Um93cygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGtleTogXCJ0eXBfb3JnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JlbmkgZm9ybXVsYXJlIHBybyByZWdpc3RyYWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtQnVpbGRlciA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZm9ybU9iamVjdC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IGZvcm1PYmplY3QubGF5b3V0RGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQxZlpaGxhxaFvdmFjw60gw7pkYWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1CdWlsZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogcmVnRm9ybSA/IHVuZGVmaW5lZCA6IFwianJlczozMjEwMDE1OFwiLCAvL1JDIDMyMTAwMTU4IDogUMWZaWhsYcWhb3ZhY8OtIMO6ZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTZWN0aW9uTmFtZXMucHJpaGxhc292YWNpVWRhamVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMxNDAwMDIyXCIsIC8vUkMgMzE0MDAwMjIgOiBFbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcImpyZXM6MzIxMDAxNjBcIiwgLy9SQyAzMjEwMDE2MCA6IEVtYWlsIGplIG5lemJ5dG7DvSB2IHDFmcOtcGFkxJsgb2Jub3ZlbsOtIHphcG9tZW51dMOpaG8gaGVzbGEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuXCIgKyBHUHVibGljVXNlckR0b05hbWVzLmVtYWlsICsgXCIgPSB2YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFR5cGU6IFwiZW1haWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJyZXNldEVycm9yc1wiLCBcInNlcnZlclZhbGlkYXRpb25cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG91xb5pdMOtIGVtYWlsdSBqYWtvIHXFvml2YXRlbHNrw6lobyBqbcOpbmEgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gZm9ybU9iamVjdC5mb3JtRGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAkZW1haWwgPSAkZm9ybS5maW5kRmllbGRzKEZpZWxkTmFtZXMuZW1haWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBlbWFpbCA9ICRlbWFpbC5nZmllbGQoXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgaXNWYWxpZCA9IGVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICRlbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcInZhbGlkYXRlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwiZ2V0RXJyb3JzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZm9ybS5maW5kRmllbGRzKEZpZWxkTmFtZXMuZW1haWxBc0xvZ2luKS5nZmllbGQ8Ym9vbGVhbiB8IHVuZGVmaW5lZD4oXCJnZXRWYWx1ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtLmZpbmRGaWVsZHMoRmllbGROYW1lcy51eml2YXRlbHNrZUptZW5vKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCBpc1ZhbGlkID8gZW1haWwgOiBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbnN0cnVjdGlvbnMoaXNWYWxpZCA/IGVtYWlsIDogXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiByZWdGb3JtICYmIHB1YmxpY0xvZ2luQ29uZmlnICYmIHB1YmxpY0xvZ2luQ29uZmlnLnNob3dQbGFjZWhvbGRlcnMgPyBcImFubmFAZW1haWwuY3pcIiA6IHVuZGVmaW5lZC8vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IHJlZ0Zvcm0gPyB1bmRlZmluZWQgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBzdG9wcGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGdyb3VwOiBHUHVibGljVXNlckR0by5WYWxpZGF0aW9uR3JvdXAuR1JPVVBfUkVHSVNUUkFUSU9OXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgKyBcIi5cIiArIEdQdWJsaWNVc2VyRHRvLlZhbGlkYXRpb25Hcm91cC5HUk9VUF9DSEFOR0VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMTQwMDAyM1wiLCAvL1JDIDMxNDAwMDIzIDogUG91xb7DrXQgZW1haWwgamFrbyB1xb5pdmF0ZWxza8OpIGptw6lub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLmVtYWlsQXNMb2dpbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuXCIgKyBHUHVibGljVXNlckR0b05hbWVzLmVtYWlsQXNMb2dpbiArIFwiID0gdmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kaXNhYmxlZDogcGFyYW1zLmluaXRpYWxWYWx1ZXMgJiYgcGFyYW1zLmluaXRpYWxWYWx1ZXMuUmVnaXN0cmF0aW9uVHlwZSAhPT0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFVzZXI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2ZW50LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZ2lzdHJhY2UgcMWZZXMgZXh0ZXJuw60gc2x1xb5idS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaW5pdGlhbFZhbHVlcyAmJiBwYXJhbXMuaW5pdGlhbFZhbHVlcy5SZWdpc3RyYXRpb25UeXBlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0ICR1c2VyID0gZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGaWVsZHMoXCJ1eml2YXRlbHNrZUptZW5vXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR1c2VFbWFpbCA9ICQoZXZlbnQudGFyZ2V0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VFbWFpbCA9IGNoYW5nZU9iai52YWx1ZSAhPT0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZUVtYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCR1c2VFbWFpbCBhcyBhbnkpLmdmaWVsZChcIm9wdGlvblwiLCBcImxhc3RVc2VyXCIsICR1c2VyLmdmaWVsZChcImdldFZhbHVlXCIpIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR1c2VyLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHVzZUVtYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHVzZUVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGaWVsZHMoXCJlbWFpbFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICgkdXNlRW1haWwgYXMgYW55KS5nZmllbGQoXCJvcHRpb25cIiwgXCJsYXN0VXNlclwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGFzIGFueSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzE0MDAwMjRcIikgLy9SQyAzMTQwMDAyNCA6IFXFvml2YXRlbHNrw6kgam3DqW5vICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy51eml2YXRlbHNrZUptZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5cIiArIEdQdWJsaWNVc2VyRHRvTmFtZXMudXppdmF0ZWxza2VKbWVubyArIFwiID0gdmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kaXNhYmxlZDogcGFyYW1zLmluaXRpYWxWYWx1ZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgJiYgKHBhcmFtcy5pbml0aWFsVmFsdWVzLmVtYWlsQXNMb2dpbiB8fCBwYXJhbXMuaW5pdGlhbFZhbHVlcy5SZWdpc3RyYXRpb25UeXBlICE9PSAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMTQwMDAyNVwiLCAvL1JDIDMxNDAwMDI1IDogVcW+aXZhdGVsc2vDqSBqbcOpbm8gbmVzbcOtIG9ic2Fob3ZhdCBcIkBcIiBuZWJvIG11c8OtIGLDvXQgc3Rlam7DqSBqYWtvIGVtYWlsLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1eml2YXRlbHNrZSBqbWVubyBuZXNtaSBvYnNhaG92YXQgXCJAXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVibyBtdXNpIGJ5dCBzdGVqbmUgamFrbyBlbWFpbFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWx1ZSB8fCAhdmFsdWUuaW5jbHVkZXMoXCJAXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB2YWx1ZSA9PT0gZm9ybU9iamVjdC5mb3JtRGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmRGaWVsZHMoRmllbGROYW1lcy5lbWFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogXCJjdXN0b21WYWxpZGF0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIiwgXCJzZXJ2ZXJWYWxpZGF0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVsbENoZWNrOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzE0MDAwNDRcIiwgcmVxdWlyZWQ6IHRydWUgfSkgLy9SQyAzMTQwMDA0NCA6IEhlc2xvLCBvdsSbxZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE2LjEyLjIwMTkgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUYWR5IGJ5IG9wxJt0IG3Em2wgYsO9dCBwb3XFvml0IHByZWZhYiBwcm8gaGVzbG8gc2UgxaFpZnJvdsOhbsOtbS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5HU3RyaW5nQm94LnBhc3N3b3JkV2l0aG91dEVuY3J5cHRpb24oKSwgeyovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuR1N0cmluZ0JveC5wYXNzd29yZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNsb3V6aWxKc2VtU2JpcmFuaUhvZG5vdFpQb2xpY2VrVGFrQWJ5TmVtb2hsTmFzdGF0UHJvYmxlbVNOZWFrdHVhbG5pbVNpZnJvdmFjaW1LbGljZW06IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMuaGVzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5cIiArIEdQdWJsaWNVc2VyRHRvTmFtZXMuaGVzbG8gKyBcIiA9IHZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ3LTYgXCIgKyBQcmVmYWJzLkdTdHJpbmdCb3guY3J5cHRlZEN1c3RvbUNsYXNzLmNyeXB0ZWRKcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTguMTIuMjAxOSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE92xJvFmWVuw60gaGVsYSBieSBtxJtsbyBiw710IHMgxaFpZnJvdsOhbsOtbS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkdTdHJpbmdCb3gucGFzc3dvcmRSZUVudGVyV2l0aG91dEVuY3J5cHRpb24oXCJoZXNsb1wiKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkdTdHJpbmdCb3gucGFzc3dvcmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzbG91emlsSnNlbVNiaXJhbmlIb2Rub3RaUG9saWNla1Rha0FieU5lbW9obE5hc3RhdFByb2JsZW1TTmVha3R1YWxuaW1TaWZyb3ZhY2ltS2xpY2VtOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLm92ZXJlbmlIZXNsYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLlwiICsgR1B1YmxpY1VzZXJEdG9OYW1lcy5vdmVyZW5pSGVzbGEgKyBcIiA9IHZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ3LTYgXCIgKyBQcmVmYWJzLkdTdHJpbmdCb3guY3J5cHRlZEN1c3RvbUNsYXNzLmNyeXB0ZWRKcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3NvYm7DrSBpbmZvcm1hY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybUJ1aWxkZXIuYWRkU2VjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBsYWJlbDogXCJqcmVzOjMyMTAwMTU3XCIsIC8vUkMgMzIxMDAxNTcgOiBPc29ibsOtIMO6ZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJcIi8vU2VjdGlvbk5hbWVzLm9zb2JuaVVkYWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1CdWlsZGVyLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MjUwMzAzNTZcIiwgcmVxdWlyZWQ6IHRydWUgfSkgLy9SQyAyNTAzMDM1NiA6IEptw6lub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLmptZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5cIiArIEdQdWJsaWNVc2VyRHRvTmFtZXMuam1lbm8gKyBcIiA9IHZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiByZWdGb3JtICYmIHB1YmxpY0xvZ2luQ29uZmlnICYmIHB1YmxpY0xvZ2luQ29uZmlnLnNob3dQbGFjZWhvbGRlcnMgPyBcIkFubmFcIiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJyZXNldEVycm9yc1wiLCBcInNlcnZlclZhbGlkYXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMxNDAwMDMyXCIsIHJlcXVpcmVkOiB0cnVlIH0pIC8vUkMgMzE0MDAwMzIgOiBQxZnDrWptZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLnByaWptZW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5cIiArIEdQdWJsaWNVc2VyRHRvTmFtZXMucHJpam1lbmkgKyBcIiA9IHZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiByZWdGb3JtICYmIHB1YmxpY0xvZ2luQ29uZmlnICYmIHB1YmxpY0xvZ2luQ29uZmlnLnNob3dQbGFjZWhvbGRlcnMgPyBcIk5vdsOha292w6FcIiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJyZXNldEVycm9yc1wiLCBcInNlcnZlclZhbGlkYXRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMxNDAwMDMwXCIsIC8vUkMgMzE0MDAwMzAgOiBKbcOpbm8vT2JjaG9kbsOtIGZpcm1hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLWlzSGlkZWFibGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkTmFtZXMub2JjaG9kbmlKbWVubyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuXCIgKyBHUHVibGljVXNlckR0b05hbWVzLm9iY2hvZG5pSm1lbm8gKyBcIiA9IHZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdQdWJsaWNVc2VyRHRvLlZhbGlkYXRpb25Hcm91cC5HUk9VUF9DT01QQU5ZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwMjhcIiwgLy9SQyAzMTQwMDAyOCA6IEnEjE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtaXNIaWRlYWJsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGROYW1lcy5pYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuXCIgKyBHUHVibGljVXNlckR0b05hbWVzLmljICsgXCIgPSB2YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlT2JqLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoJGZpZWxkLmdmaWVsZChcInZhbGlkYXRlXCIpLCAhJGZpZWxkLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdQdWJsaWNVc2VyUmVnRm9ybS5nZXRBcmVzRGF0YShjaGFuZ2VPYmoudmFsdWUsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybU9iamVjdC5fZ2V0QXJlc0RhdGEoY2hhbmdlT2JqLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoY29uc29sZS53YXJuLmJpbmQoY29uc29sZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtT2JqZWN0Ll9hcHBseUFyZXNEYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYnV0dG9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWNvbjogJ2dpLWFjY2VwdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbmFtZTogJ2FwcGx5QXJlc0RhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMyMTAwMTU0XCIsIC8vUkMgMzIxMDAxNTQgOiBOYXBsbml0IGhvZG5vdHkgeiByZWpzdMWZw61rdS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBvYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKG9iamVjdC5maWVsZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGljID0gJGZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoaWMmJiAoJGZpZWxkLmdmaWVsZChcInZhbGlkYXRlXCIpLCAhJGZpZWxkLmdmaWVsZChcImdldEVycm9yc1wiKS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuX2dldEFyZXNEYXRhKGljKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8uZmFpbChmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICBHRGxnLmFsZXJ0KFwianJlczoyNTAzMDQ1MlwiLCBtc2cpOyAvL1JDIDI1MDMwNDUyIDogQ2h5YmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgR0RsZy5jb25maXJtKFwianJlczozMTQwMDA0OFwiIC8vUkMgMzE0MDAwNDggOiBQb3R2cnplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgXCJqcmVzOjMxNDAwMDQ5XCIuZm9ybWF0KGljKSkgLy9SQyAzMTQwMDA0OSA6IE9wcmF2ZHUgY2hjZXRlIG5hxI3DrXN0IGRhdGEgcHJvIEnEjCB7MH0gYSBwxZllcHNhdCBqaW1pIFbDoW1pIHphZGFuw6kgw7pkYWplP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5fYXBwbHlBcmVzRGF0YShkYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfV0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGN1c3RvbUNsYXNzOiBcImpzLWlzSGlkZWFibGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwMjlcIiwgLy9SQyAzMTQwMDAyOSA6IERJxIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGN1c3RvbUNsYXNzOiBcImpzLWlzSGlkZWFibGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNla2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQnVpbGRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogU2VjdGlvbk5hbWVzLnBvZG1pbmt5UG91eml2YW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdGb3JtICYmIGZvcm1PYmplY3QuY29uZGl0aW9uQWdyZWVtZW50VGV4dCAmJiBmb3JtT2JqZWN0LmNvbmRpdGlvbkFncmVlbWVudFRleHQudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLnNvdWhsYXNTZVpwcmFjb3ZhbmltVWRhanUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5cIiArIEdQdWJsaWNVc2VyRHRvTmFtZXMuc291aGxhc1NlWnByYWNvdmFuaW1VZGFqdSArIFwiID0gdmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmb3JtT2JqZWN0LmNvbmRpdGlvbkFncmVlbWVudFRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlLCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMxNDAwMDM4XCIsIC8vUkMgMzE0MDAwMzggOiBTb3VobGFzIHMgcG9kbcOtbmthbWkgamUgbmV6Ynl0bsO9LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogXCJjdXN0b21WYWxpZGF0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInJlc2V0RXJyb3JzXCIsIFwic2VydmVyVmFsaWRhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ0Zvcm0gJiYgcmVnSW5zdHJ1Y3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTEtMTEtMCwgTS0xLTExLTAsIFMtMS0xMS0wXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQocmVnSW5zdHJ1Y3Rpb25zLmZvcm1hdChcIlwiKSwgXCJqcy1pbnN0cnVjdGlvbnNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUJ1aWxkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0xLTExLTAsIE0tMS0xMS0wLCBTLTEtMTEtMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3N0YXJSZXF1aXJlZERlY3JpcHRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBacnXFocOtIG5hc3Rhdm92w6Fuw60gLyBvZGViw61yw6Fuw60gaHbEm3pkacSNa3kgZGxlIHZhbGlkw6F0b3LFry5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG8gZMSbbMOhIGZ1bmtjZSBHb3JkaWMuVXRpbHMuRm9ybS5tYXJrUmVxdWlyZWQoZm9ybU9iamVjdC5mb3JtRGl2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IEdvcmRpYy5VdGlscy5Gb3JtLk1hcmtSZXF1aXJlSWdub3JlQ2xhc3NOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICdnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoJ2pyZXM6MzIxMDAxNTYnKSAvL1JDIDMyMTAwMTU2IDogUG9sb8W+a3kgb3puYcSNZW7DqSBodsSbemRpxI1rb3UgamUgbnV0bsOpIHZ5cGxuaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFDFmWlkw6Fuw60gZm9ybXVsw6HFmWUgZG8gRE9NdS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuZm9ybURpdiA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhmb3JtT2JqZWN0LmNvbnRhaW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1CdWlsZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImZpZWxkY2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9ICQoZXZlbnQudGFyZ2V0KS5nZmllbGQoXCJpbnN0YW5jZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLl9hdXRvVmFsaWRhdGlvbkFjdGl2ZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxNi4xMS4yMDIxIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwcmF2ZW7DrSBhdXRvY29tcGxldGUgYXRyaWJ1dHUgZGxlIGFwcGx1LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vc2VjdXJpdHkvcGFzc3dvcmRfYXV0b2ZpbGwvZW5hYmxpbmdfcGFzc3dvcmRfYXV0b2ZpbGxfb25fYW5faHRtbF9pbnB1dF9lbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3BoYWJyaWNhdG9yLmdvcmRpYy5jei9UMTU4MDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2lucHV0JywgZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGaWVsZHMoRmllbGROYW1lcy51eml2YXRlbHNrZUptZW5vKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXV0b2NvbXBsZXRlJywgJ3VzZXJuYW1lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnaW5wdXQnLCBmb3JtT2JqZWN0LmZvcm1EaXYuZmluZEZpZWxkcyhGaWVsZE5hbWVzLmhlc2xvKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXV0b2NvbXBsZXRlJywgJ25ldy1wYXNzd29yZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2lucHV0JywgZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGaWVsZHMoRmllbGROYW1lcy5vdmVyZW5pSGVzbGEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhdXRvY29tcGxldGUnLCAnbmV3LXBhc3N3b3JkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1PYmplY3QuX2dldEFyZXNEYXRhID0gZnVuY3Rpb24gKGljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiAkLmdldChcImdpbi93ZWJzZXJ2aWNlcy9hcmVzLmFzaHg/cT1cIiArIGljKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIEdEbGcuYWxlcnQoXCJqcmVzOjI1MDMwNDUyXCIsIC8vUkMgMjUwMzA0NTIgOiBDaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBcImpyZXM6MzE0MDAwNDZcIi5mb3JtYXQoaWMpKTsgIC8vUkMgMzE0MDAwNDYgOiBTZWxoYWxvIHrDrXNrw6F2w6Fuw60gaW5mb3JtYWPDrSBwcm8gScSMIHswfS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdChcImpyZXM6MzE0MDAwNDZcIi5mb3JtYXQoaWMpKTsgLy9SQyAzMTQwMDA0NiA6IFNlbGhhbG8gesOtc2vDoXbDoW7DrSBpbmZvcm1hY8OtIHBybyBJxIwgezB9LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEubGVuZ3RoICE9PSAxIHx8ICFkYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIEdEbGcuYWxlcnQoXCJqcmVzOjI1MDMwNDUyXCIsIC8vUkMgMjUwMzA0NTIgOiBDaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMxNDAwMDQ3XCIuZm9ybWF0KGljKSk7IC8vUkMgMzE0MDAwNDcgOiBOYWxlemVuYSBhZGVrdsOhdG7DrSBkYXRhIHBybyBJxIwgezB9LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdChcImpyZXM6MzE0MDAwNDdcIi5mb3JtYXQoaWMpKTsgLy9SQyAzMTQwMDA0NyA6IE5hbGV6ZW5hIGFkZWt2w6F0bsOtIGRhdGEgcHJvIEnEjCB7MH0uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBkYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll9pbml0Rm9ybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBOYXN0YXbDrSB2w71jaG96w60gaG9kbm90eSwgdmFsaWTDoXRvcnkgYSBvbkNoYW5nZUxpc3RlbmVyLCBrdGVyw70gem9icmF6dWplIG9kbGnFoW5vc3QgaG9kbm90eSBwb2zDrcSNa2Egb2QgaG9kbm90eSB6IEFyZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IGZvcm1PYmplY3QuZm9ybURpdi5maW5kRmllbGRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1PYmplY3QuaW5pdGlhbFZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb3JtT2JqZWN0LmluaXRpYWxWYWx1ZXMgYXMgYW55KS5jaXNsbyA9IEdvcmRpYy5HdWkuV2ViQ29udHJvbHMuR1B1YmxpY1VzZXJSZWdGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRTdHJlZXROdW1iZXIoZm9ybU9iamVjdC5pbml0aWFsVmFsdWVzLmNQb3AsIGZvcm1PYmplY3QuaW5pdGlhbFZhbHVlcy5jT3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkcy5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGZvcm1PYmplY3QuaW5pdGlhbFZhbHVlcywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWVzOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNrcnl0aSBuZXBvdHJlYm55Y2ggcG9saWNlayBmb3JtdWxhcmUsIG5hc3RhdmVuaSB2eWNob3ppY2ggaG9kbm90IGEgdmFsaWRhdG9ydS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll9hZGp1c3RGb3JtKGZvcm1PYmplY3QuaW5pdGlhbFZhbHVlcy50eXBFc3UgIT09IG51bGwgPyBmb3JtT2JqZWN0LmluaXRpYWxWYWx1ZXMudHlwRXN1IDogdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU9iamVjdC52YWxpZGF0b3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vLyAwOC4wOC4yMDE5IC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vIFZhbGlkYXRvciBuYSBJQyhPKSDFmcOtZMOtbSBzw6FtIHDFmcOtbW8gbmEgcG9sw63EjWt1LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKGZvcm1PYmplY3QudmFsaWRhdG9ycyBhcyBhbnkpLmljID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkcy5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgZm9ybU9iamVjdC52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5Gb3JtLm1hcmtSZXF1aXJlZChmb3JtT2JqZWN0LmZvcm1EaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuYXBwbHkgPSBmdW5jdGlvbiAoZm9ybURhdGEsIGZpZWxkcywgZmxhZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBOYXN0YXbDrSBkYXRhIGRvIGZvcm11bMOhxZllIGEgc2xvxb7DrSDEjcOtc2xvIGRvbXUgYSBqbcOpbm8gdcW+aXZhdGVsZSB6IG7Em2tvbGlrYSBwb2zDrcSNZWsgZG8gamVkbsOpIChjaXNsbywgY2VsZUptZW5vKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmb3JtRGF0YVwiIHR5cGU9XCJ0eXBlXCI+T2JqZWt0IGhvZG5vdCwga3RlcsOpIHNlIHVsb8W+w60gZG8gZm9ybXVsw6HFmWUuPC9wYXJhbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZpZWxkc1wiIHR5cGU9XCJ0eXBlXCI+UG9sw63EjWthLCBkbyBrdGVyw71jaCBzZSBkYXRhIG5hc3RhdnVqw60uIFBva3VkIG5lbsOtIHZ5cGxuxJtubyBwYWsgc2UgcG91xb5pasOtIHbFoWVjaG55IHBvbMOtxI1rYSBmb3JtdWzDocWZZS48L3BhcmFtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZmxhZ3NcIiB0eXBlPVwidHlwZVwiPlDFmcOtem5ha3kuPC9wYXJhbT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1EYXRhLmNpc2xvID0gZm9ybU9iamVjdC5fc2V0Q2lzbG9Qb3BPcihmb3JtRGF0YS5jUG9wLCBmb3JtRGF0YS5jT3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtRGF0YS5jZWxlSm1lbm8gPSBmb3JtT2JqZWN0Ll9zZXRDZWxlSm1lbm8oZm9ybURhdGEudGl0dWxQcmVkLCBmb3JtRGF0YS5qbWVubywgZm9ybURhdGEucHJpam1lbmksIGZvcm1EYXRhLnRpdHVsWmEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmllbGRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzID0gZm9ybU9iamVjdC5mb3JtRGl2LmZpbmRGaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmxhZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBmb3JtRGF0YSwgZmxhZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHMuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBmb3JtRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qZm9ybU9iamVjdC5jb2xsZWN0ID0gZnVuY3Rpb24gKHJlc3VsdCwgZmllbGRzKSB7Ki9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybU9iamVjdC5jb2xsZWN0ID0gZnVuY3Rpb24gKCk6IEpRdWVyeS5Qcm9taXNlPEdQdWJsaWNVc2VyRHRvPiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghZmllbGRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBmaWVsZHMgPSBmb3JtT2JqZWN0LmZvcm1EaXYuZmluZEZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ZpZWxkcy5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgcmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJlZmFicy5HU3RyaW5nQm94LnVwZGF0ZUNoaXBlclB1YmxpY0tleXMoZm9ybU9iamVjdC5mb3JtRGl2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKCdnZm9ybScsIGZvcm1PYmplY3QuZm9ybURpdikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IEdQdWJsaWNVc2VyRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuZm9ybURpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvxZllbsOtIGEgaW5pY2lhbGl6YWNlIGZvcm11bMOhxZllLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtT2JqZWN0Ll9jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1PYmplY3QuX2luaXRGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZm9ybU9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vLy8gMTIuMDguMjAxOSAtIFRGZWlrXHJcbiAgICAgICAgICAgIC8vLy8gTmFwxZllZCBzaSBuYcSNdHUgZGF0YSBwcm8gxaFpZnJvdsOhbsOtIGhlc2xhLlxyXG4gICAgICAgICAgICAvL0dMb2dpblV0aWxzLkdldENpcGhlclB1YmxpY0tleSgpXHJcbiAgICAgICAgICAgIC8vICAgIC5kb25lKGZ1bmN0aW9uIChjaXBoZXJQdWJsaWNLZXkpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIFJzYVBhcmFtc1B1YmxpYyA9IGNpcGhlclB1YmxpY0tleTtcclxuICAgICAgICAgICAgbG9hZFB1YmxpY0xvZ2luQ29uZmlnKCk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL3JldHVybiBmb3JtT2JqZWN0O1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnLDoXTDrSDEjcOtc2xvIGRvbXUgb2JzYWh1asOtY8OtIMSNw61zbG8gcG9waXNuw6kgYSDEjcOtc2xvIG9yaWVudGHEjW7DrSwgb2RkxJtsZW7DqSBsb23DrXRrZW0uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICB0ZmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDIxLjEyLjIwMTdcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gY1BvcCDEjMOtc2xvIHBvcGlzbsOpLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gY09yIMSMw61zbG8gb3JpYW50YcSNbsOtLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IMSMw61zbG8gcG9waXNuw6ksIG5lYm8ga29tYmluYWNlIMSMw61zbG8gcG9waXNuw6kvxIzDrXNsbyBvcmlhbnRhxI1uw60uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRTdHJlZXROdW1iZXIoY1BvcD86IG51bWJlciB8IHN0cmluZyB8IG51bGwsIGNPcj86IG51bWJlciB8IHN0cmluZyB8IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGNQb3ApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjT3IgPyBjUG9wLnRvU3RyaW5nKCkgKyBcIi9cIiArIGNPci50b1N0cmluZygpIDogY1BvcC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5HdWkuV2ViQ29udHJvbHMuR1JlZ1BhZ2VQdWJsaWNEbGcudHMgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBSZWdpc3RyYWNlIHZlxZllam7DqWhvIHXFvml2YXRlbGUgYSBvYm5vdmVuw60gemFwb21lbnV0w6lobyBoZXNsYS4gICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIFRGZWlrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE3LTAzLTI3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkd1aS5XZWJDb250cm9scyB7XHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHQ2hhbmdlUGFzc3dvcmREbGdcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAqIEBzaW5jZSAgIDQ4Mi4xLjAuNDU3XHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdSZWdQYWdlUHVibGljRGxnIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdQdWJsaWNMb2dpbkRpYWxvZyB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGF0YVxyXG4gICAgICAgICAqIEB0eXBlIHthbnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBEYXRhPzogYW55XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtsw63EjSBwcm8gUlNBIMWhaWZyb3bDoW7DrS5cclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgQ2lwaGVyUHVibGljS2V5OiBzdHJpbmdcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw616bmFrLCB6ZGEgamUgbW/Fvm7DqSBwb3XFvsOtdCBTTVMgbm90aWZpa2FjZS5cclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElzU21zR2F0ZXdheUVuYWJsZWQ6IGJvb2xlYW5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnRm9ybU9iamVjdFxyXG4gICAgICAgICAqIEB0eXBlIHtHUHVibGljVXNlclJlZ0Zvcm1PYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBSZWdGb3JtT2JqZWN0PzogR1B1YmxpY1VzZXJSZWdGb3JtT2JqZWN0XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlQ2FwdGNoYVxyXG4gICAgICAgICAqIEB0eXBlIHtBcGkuR1JlQ2FwdGNoYX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFJlQ2FwdGNoYT86IEFwaS5HUmVDYXB0Y2hhXHJcblxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBVc2VybmFtZVxyXG4gICAgICAgIC8vICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBVc2VybmFtZT86IHN0cmluZ1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gZm9ybXVsw6HFmSwgcMWZaWTDoSBqZWogZG8gY29udGVudHUsIG5hc3RhdsOtIHZhbGlkw6F0b3J5IGEgaW5pY2lhbGl6dWplIHJlQ2FwdGNodS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pY2lhbGl6YWNlIHJlQ2FwdGNoYS5cclxuICAgICAgICAgICAgdGhpcy5SZUNhcHRjaGEgPSBuZXcgQXBpLkdSZUNhcHRjaGEodGhpcy5yZWdpc3Rlci5iaW5kKHRoaXMpLCB0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybVBhcmFtczogR1B1YmxpY1VzZXJSZWdGb3JtT3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTMtNC01LCBNLTQtOC0wLCBTLTEyLTEyLTAsIGJyZWFrcy0zMDAtODAwXCIsXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IHRoaXMuZWxlbWVudCxcclxuICAgICAgICAgICAgICAgIGNpcGhlclB1YmxpY0tleTogdGhpcy5DaXBoZXJQdWJsaWNLZXksXHJcbiAgICAgICAgICAgICAgICBpc0dpbmlzVXNlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3dVc2VTbXNOb3RpZmljYXRpb25zRmllbGQ6IHRoaXMuSXNTbXNHYXRld2F5RW5hYmxlZFxyXG4gICAgICAgICAgICB9LCB0aGlzLkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgLy8gMTQuMDguMjAxOCAtIFRGZWlrXHJcbiAgICAgICAgICAgIC8vIFByZXByYWNvdmFuaSBmdW5rY2UgY3JlYXRlIG5hIHByb21pcyBhYnljaCB6YWppc3RpbCByYWRuZSBuYWN0ZW5pIGNvbmZpZ3UuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICBHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdQdWJsaWNVc2VyUmVnRm9ybS5jcmVhdGUoZm9ybVBhcmFtcylcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZWdGb3JtT2JqZWN0UmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5SZWdGb3JtT2JqZWN0ID0gcmVnRm9ybU9iamVjdFJldFZhbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMTMuMDcuMjAxNyAtIFpvYnJhemVuw60gcmVnaXN0cmHEjW7DrWhvIGZvcm11bMOhxZllIG/FmWVzIGNlbG91IG9icmF6b3ZrdSBhIG5hIHN0xZllZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgUG/FvmFkYXZlayBLVUtWLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRvbcOhxaEgRmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5nLWxvZ2luX19zdGF0aWMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJnLWxvZ2luX19mdWxsX3NjcmVlblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmctbG9naW5fX21haW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJnLWxvZ2luX19mdWxsX3NjcmVlblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWnZhbGlkdWplIGZvcm11bGFyIGEgcHJvdmVkZSBvdmVyZW5pIHV6aXZhdGVsZSBwb21vY2kgR29vZ2xlIHJlQ2FwdGNoYS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyByZWdpc3RlckNoZWNrQ2FwY2hhKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5SZUNhcHRjaGEgJiYgdGhpcy5SZWdGb3JtT2JqZWN0ICYmIHRoaXMuUmVnRm9ybU9iamVjdC5pc1ZhbGlkKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVDYXB0Y2hhLmV4ZWN1dGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWnZhbGlkdWplIGZvcm11bMOhxZkgYSB6YXZvbMOhIHNlcnZlcm92b3UgbWV0b2R1IFJlZ2lzdGVyVXNlciBwcm8gemFyZWdpc3Ryb3bDoW7DrSB2ZcWZZWpuw6lobyB1xb5pdmF0ZWxlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHJlQ2FwdGNoYVRva2VuIFRva2VuIHJlQ2FwdGNoYSB2YWxpZGFjZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVnaXN0ZXIoXHJcbiAgICAgICAgICAgIHJlQ2FwdGNoYVRva2VuOiBzdHJpbmdcclxuICAgICAgICApOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgcmVnRm9ybU9iamVjdCA9IHRoaXMuUmVnRm9ybU9iamVjdDtcclxuICAgICAgICAgICAgLy8gS29udHJvbGEgdmFsaWRub3N0aSBmb211bGFyZS5cclxuICAgICAgICAgICAgaWYgKCFyZWdGb3JtT2JqZWN0IHx8ICFyZWdGb3JtT2JqZWN0LmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAvLyAwMS4wNC4yMDIwIC0gVEZlaWtcclxuICAgICAgICAgICAgLy8gUMWZaWTDoW5hIGFrdHVhbGl6YWNlIMWhaXJvdmFjw61obyBrbMOtxI1lIHBybyBoZXNsby5cclxuICAgICAgICAgICAgcmVnRm9ybU9iamVjdFxyXG4gICAgICAgICAgICAgICAgLmNvbGxlY3QoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHVzZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaCh1c2VyRGF0YSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG90cmltb3bDoW7DrSB0ZXh0b3bDvWNoIHBvbMOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYga2V5ICE9PSBcImhlc2xvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBrZXkgIT09IFwib3ZlcmVuaUhlc2xhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh1c2VyRGF0YSBhcyBhbnkpW2tleV0gPSB2YWx1ZT8udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbChcIlJlZ2lzdGVyVXNlclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YTogdXNlckRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZUNhcHRjaGFUb2tlbjogcmVDYXB0Y2hhVG9rZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnlwc8OhbsOtIGZsYXNoIG1lc3NhZ2UgaW5mb3JtdWrDrWPDrSBvIMO6c3DEm8WhbsOpIHJlZ2lzdHJhY2kgYSB2csOhY2Vuw60gc2UgenDEm3QgbmEgcMWZaWhsYcWhb3ZhY8OtIGZvcm11bMOhxZkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmlnZ2VyKFwiZmxhc2htZXNzYWdlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInJlZ2lzdHJhdGlvbkZsYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMxNDAwMDU1XCIuZm9ybWF0KHVzZXJEYXRhLmVtYWlsID8/ICcnKSwgLy9SQyAzMTQwMDA1NSA6IFJlZ2lzdHJhY2UgcHJvYsSbaGxhIMO6c3DEm8WhbsSbLiBOYSBlbWFpbG92b3UgYWRyZXN1IHswfSBieWwgb2Rlc2zDoW4gZW1haWwgcHJvIHBvdHZyemVuw60gcmVnaXN0cmFjZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcInN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJpZ2dlcihcImd3YWxrdGhyb3VnaGJhY2tcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEzLjA3LjIwMTcgLSBab2JyYXplbsOtIHJlZ2lzdHJhxI1uw61obyBmb3JtdWzDocWZZSBvxZllcyBjZWxvdSBvYnJhem92a3UgYSBuYSBzdMWZZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgIFBvxb5hZGF2ZWsgS1VLVi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgTmF2csOhY2Vuw60gb2tuYSBkbyBwxa92b2Ruw61obyBzdGF2dSBwxZlpIG9kY2hvZHUgeiByZWdpc3RyYTRuw61obyBmb3JtdWzDocWZZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUb23DocWhIEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZy1sb2dpbl9fc3RhdGljJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiZy1sb2dpbl9fZnVsbF9zY3JlZW5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5nLWxvZ2luX19tYWluJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiZy1sb2dpbl9fZnVsbF9zY3JlZW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXBzw6Fuw60gZmxhc2ggbWVzc2FnZSBpbmZvcm11asOtY8OtIG8gbmXDunNwxJvFoW7DqSByZWdpc3RyYWNpIG5lYm8gem9icmF6ZW7DrSBjaHliIHNlcnZlcm92w71jaCB2YWxpZMOhdG9yxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IHJlZ0Zvcm1PYmplY3Q/LmZvcm1EaXY7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDI0LjAxLjIwMjQgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYXRpb25SZXN1bHQgamUgbmEgamluw6ltIG3DrXN0xJsgbmXFviBkxZnDrXZlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IGRhdGE/LnJlc3BvbnNlSlNPTj8udmFsaWRhdGlvblJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uUmVzdWx0ID0gKGRhdGEgYXMgYW55KT8udmFsaWRhdGlvblJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvblJlc3VsdCAmJiBHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKCdnZm9ybScsIGZvcm0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCB2YWxpZGF0aW9uUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKFwiZmxhc2htZXNzYWdlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInJlZ2lzdHJhdGlvbkZsYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMxNDAwMDU2XCIsIC8vUkMgMzE0MDAwNTYgOiBSZWdpc3RyYWNlIHNlbGhhbGEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJlcnJvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkd1aS5XZWJDb250cm9scy5HUmVnUGFnZVB1YmxpY0RsZy50cyAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFJlZ2lzdHJhY2UgdmXFmWVqbsOpaG8gdcW+aXZhdGVsZSBhIG9ibm92ZW7DrSB6YXBvbWVudXTDqWhvIGhlc2xhLiAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgVEZlaWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE3ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTctMDMtMjcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuR3VpLldlYkNvbnRyb2xzIHtcclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnNcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdDaGFuZ2VQYXNzd29yZERsZ1xyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yICBQSG9yc2FrXHJcbiAgICAgKiBAc2luY2UgICA0ODIuMS4wLjQ1N1xyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHWHJnUmVnUGFnZVB1YmxpY0RsZyBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHUHVibGljTG9naW5EaWFsb2cge1xyXG4gICAgICAgIC8vcHVibGljIGNsYXNzTmFtZTogc3RyaW5nID0gXCJHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdYcmdSZWdQYWdlUHVibGljRGxnXCJcclxuICAgICAgICBwdWJsaWMgUmVnaXN0cmF0aW9uRXZlbnQ/OiBzdHJpbmdcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGF0YVxyXG4gICAgICAgICAqIEB0eXBlIHthbnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBEYXRhPzogYW55XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ0Zvcm1PYmplY3RcclxuICAgICAgICAgKiBAdHlwZSB7R1hyZ1B1YmxpY1VzZXJSZWdGb3JtT2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUmVnRm9ybU9iamVjdD86IEdYcmdQdWJsaWNVc2VyUmVnRm9ybU9iamVjdFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZUNhcHRjaGFcclxuICAgICAgICAgKiBAdHlwZSB7QXBpLkdSZUNhcHRjaGF9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBSZUNhcHRjaGE/OiBBcGkuR1JlQ2FwdGNoYVxyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogVXNlcm5hbWVcclxuICAgICAgICAvLyAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgVXNlcm5hbWU/OiBzdHJpbmdcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIGZvcm11bMOhxZksIHDFmWlkw6EgamVqIGRvIGNvbnRlbnR1LCBuYXN0YXbDrSB2YWxpZMOhdG9yeSBhIGluaWNpYWxpenVqZSByZUNhcHRjaHUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBQSG9yc2FrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pY2lhbGl6YWNlIHJlQ2FwdGNoYS5cclxuICAgICAgICAgICAgdGhpcy5SZUNhcHRjaGEgPSBuZXcgQXBpLkdSZUNhcHRjaGEodGhpcy5yZWdpc3Rlci5iaW5kKHRoaXMpLCB0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybVBhcmFtcyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTMtNC01LCBNLTQtOC0wLCBTLTEyLTEyLTAsIGJyZWFrcy0zMDAtODAwXCIsXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IHRoaXMuZWxlbWVudFxyXG4gICAgICAgICAgICB9LCB0aGlzLkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXM7XHJcbiAgICAgICAgICAgIEdvcmRpYy5HdWkuV2ViQ29udHJvbHMuR1hyZ1B1YmxpY1VzZXJSZWdGb3JtLmNyZWF0ZShmb3JtUGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlZ0Zvcm1PYmplY3RSZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LlJlZ0Zvcm1PYmplY3QgPSByZWdGb3JtT2JqZWN0UmV0VmFsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuZy1sb2dpbl9fc3RhdGljJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiZy1sb2dpbl9fZnVsbF9zY3JlZW5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5nLWxvZ2luX19tYWluJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiZy1sb2dpbl9fZnVsbF9zY3JlZW5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFp2YWxpZHVqZSBmb3JtdWxhciBhIHByb3ZlZGUgb3ZlcmVuaSB1eml2YXRlbGUgcG9tb2NpIEdvb2dsZSByZUNhcHRjaGEuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVnaXN0ZXJDaGVja0NhcGNoYSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUmVDYXB0Y2hhICYmIHRoaXMuUmVnRm9ybU9iamVjdCAmJiB0aGlzLlJlZ0Zvcm1PYmplY3QgIT0gbnVsbCkgey8vLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZUNhcHRjaGEuZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBadmFsaWR1amUgZm9ybXVsw6HFmSBhIHphdm9sw6Egc2VydmVyb3ZvdSBtZXRvZHUgUmVnaXN0ZXJVc2VyIHBybyB6YXJlZ2lzdHJvdsOhbsOtIHZlxZllam7DqWhvIHXFvml2YXRlbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVDYXB0Y2hhVG9rZW4gVG9rZW4gcmVDYXB0Y2hhIHZhbGlkYWNlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyByZWdpc3RlcihyZUNhcHRjaGFUb2tlbjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5SZWdGb3JtT2JqZWN0LmNoZWNrQWRyZXNBdFJ1aWFuKCk7IHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBLb250cm9sYSB2YWxpZG5vc3RpIGZvbXVsYXJlLlxyXG4gICAgICAgICAgICBpZiAoY29udGVudC5SZWdGb3JtT2JqZWN0ICE9IG51bGwpIHsgLy8mJiBjb250ZW50LlJlZ0Zvcm1PYmplY3QuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnN0IHVzZXJEYXRhOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbnRlbnQuUmVnRm9ybU9iamVjdC5jb2xsZWN0KHVzZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIC8vJC5lYWNoKHVzZXJEYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gb3RyaW1vdsOhbsOtIHRleHRvdsO9Y2ggcG9sw61cclxuICAgICAgICAgICAgICAgIC8vICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAmJiBrZXkgIT09IFwiaGVzbG9cIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICYmIGtleSAhPT0gXCJvdmVyZW5pSGVzbGFcIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdXNlckRhdGFba2V5XSA9ICQudHJpbSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIHVzZXJEYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5SZWdGb3JtT2JqZWN0Py5jb2xsZWN0KHVzZXJEYXRhKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29udGVudC5SZWdGb3JtT2JqZWN0LmNvbGxlY3QoKS50aGVuKCh1c2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIFBhc3N3b3JkOiB1c2VyRGF0YS5oZXNsbyA/IENyeXB0b0pTLlNIQTI1Nih1c2VyRGF0YS5oZXNsbykudG9TdHJpbmcoKSA6IG51bGwsKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhc3N3b3JkOiB1c2VyRGF0YS5oZXNsbyA/IHVzZXJEYXRhLmhlc2xvIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEljbzogdXNlckRhdGEuaWMgPyB1c2VyRGF0YS5pYyA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiAodXNlckRhdGEucHJpam1lbmkgIT0gbnVsbCA/IHVzZXJEYXRhLnByaWptZW5pIDogXCJcIikgKyBcIiBcIiArICh1c2VyRGF0YS5qbWVubyAhPSBudWxsID8gdXNlckRhdGEuam1lbm8gOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3J0Y3V0OiB1c2VyRGF0YS51eml2YXRlbHNrZUptZW5vID8gdXNlckRhdGEudXppdmF0ZWxza2VKbWVubyA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dpbjogdXNlckRhdGEudXppdmF0ZWxza2VKbWVubyA/IHVzZXJEYXRhLnV6aXZhdGVsc2tlSm1lbm8gOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW1haWw6IHVzZXJEYXRhLmVtYWlsID8gdXNlckRhdGEuZW1haWwgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRmlybTogdXNlckRhdGEub2JjaG9kbmlKbWVubyA/IHVzZXJEYXRhLm9iY2hvZG5pSm1lbm8gOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3JlYXRlZDogbmV3IERhdGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR0NvbnRlbnQoXCJHb3JkaWMuWHJnLldlYlBvcnRhbC5HWHJnQ29tbW9uU2VydmljZVwiKS5jYWxsKFwiUmVnaXN0ZXJOZXdTdWJqZWN0XCIsIHsgc3ViamVjdDogc3ViamVjdCwgcmVDYXB0Y2hhVG9rZW46IHJlQ2FwdGNoYVRva2VuIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YmplY3QuRW1haWwgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdDb250ZW50KFwiR29yZGljLlhyZy5XZWJQb3J0YWwuR1hyZ0NvbW1vblNlcnZpY2VcIikuY2FsbChcIlNlbmRWYWxpZGF0aW9uRW1haWxcIiwgeyBlbWFpbDogc3ViamVjdC5FbWFpbCB9KS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmlnZ2VyKFwiZmxhc2htZXNzYWdlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwicmVnaXN0cmF0aW9uRmxhc2hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUmVnaXN0cmFjZSBwcm9ixJtobGEgw7pzcMSbxaFuxJsuIE5hIFbDocWhIGVtYWlsIGJ5bGEgb2Rlc2zDoW5hIHBvdHZyem92YWPDrSB6cHLDoXZhLiBQbyBvdsSbxZllbsOtIGVtYWlsdSBzZSBtxa/FvmV0ZSBwxZlpaGzDoXNpdCBrZSBzdsOpbXUgw7rEjXR1LlwiLCAvL1JDIDMxNDAwMDU1IDogUmVnaXN0cmFjZSBwcm9ixJtobGEgw7pzcMSbxaFuxJsuIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogR29yZGljLkdsb2JhbC5FbnVtcy5Db2xvclN0YXRlQ2xhc3Muc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaWdnZXIoXCJnd2Fsa3Rocm91Z2hiYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJpZ2dlcihcImZsYXNobWVzc2FnZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJyZWdpc3RyYXRpb25GYWlsZWRGbGFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUmVnaXN0cmFjZSBzZSBuZXpkYcWZaWxhLiDDmsSNZXQgcyB0w61tdG8gcMWZaWhsYcWhb3ZhY8OtbSBqbcOpbmVtIGppxb4gZXhpc3R1amUuXCIsIC8vUkMgMzE0MDAwNTUgOiBSZWdpc3RyYWNlIHByb2LEm2hsYSDDunNwxJvFoW7Emy4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogR29yZGljLkdsb2JhbC5FbnVtcy5Db2xvclN0YXRlQ2xhc3MuZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaWdnZXIoXCJnd2Fsa3Rocm91Z2hiYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9uZXcgR0NvbnRlbnQoXCJHb3JkaWMuWHJnLldlYlBvcnRhbC5HWHJnQ29tbW9uU2VydmljZVwiKS5jYWxsKFwiQ3JlYXRlU3ViamVjdFwiLCB7IHN1YmplY3Q6IHVzZXJEYXRhIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY29udGVudC5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY29udGVudC5jYWxsKFwiUmVnaXN0ZXJVc2VyXCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHVzZXJEYXRhOiB1c2VyRGF0YSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHJlQ2FwdGNoYVRva2VuOiByZUNhcHRjaGFUb2tlblxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBWeXBzw6Fuw60gZmxhc2ggbWVzc2FnZSBpbmZvcm11asOtY8OtIG8gw7pzcMSbxaFuw6kgcmVnaXN0cmFjaSBhIHZyw6FjZW7DrSBzZSB6cMSbdCBuYSBwxZlpaGxhxaFvdmFjw60gZm9ybXVsw6HFmS5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjb250ZW50LmVsZW1lbnRcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLnRyaWdnZXIoXCJmbGFzaG1lc3NhZ2VcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWQ6IFwicmVnaXN0cmF0aW9uRmxhc2hcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwNTVcIi5mb3JtYXQodXNlckRhdGEuZW1haWwpLCAvL1JDIDMxNDAwMDU1IDogUmVnaXN0cmFjZSBwcm9ixJtobGEgw7pzcMSbxaFuxJsuIE5hIGVtYWlsb3ZvdSBhZHJlc3UgezB9IGJ5bCBvZGVzbMOhbiBlbWFpbCBwcm8gcG90dnJ6ZW7DrSByZWdpc3RyYWNlLlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1zdWNjZXNzXCJcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLnRyaWdnZXIoXCJnd2Fsa3Rocm91Z2hiYWNrXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAxMy4wNy4yMDE3IC0gWm9icmF6ZW7DrSByZWdpc3RyYcSNbsOtaG8gZm9ybXVsw6HFmWUgb8WZZXMgY2Vsb3Ugb2JyYXpvdmt1IGEgbmEgc3TFmWVkLlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICAgICAgICAgICAgICBQb8W+YWRhdmVrIEtVS1YuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgICAgICAgICAgIE5hdnLDoWNlbsOtIG9rbmEgZG8gcMWvdm9kbsOtaG8gc3RhdnUgcMWZaSBvZGNob2R1IHogcmVnaXN0cmE0bsOtaG8gZm9ybXVsw6HFmWUuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gVG9tw6HFoSBGZWlrXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgJCgnLmctbG9naW5fX3N0YXRpYycpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImctbG9naW5fX2Z1bGxfc2NyZWVuXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAkKCcuZy1sb2dpbl9fbWFpbicpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImctbG9naW5fX2Z1bGxfc2NyZWVuXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIC5mYWlsKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gVnlwc8OhbsOtIGZsYXNoIG1lc3NhZ2UgaW5mb3JtdWrDrWPDrSBvIG5lw7pzcMSbxaFuw6kgcmVnaXN0cmFjaSBuZWJvIHpvYnJhemVuw60gY2h5YiBzZXJ2ZXJvdsO9Y2ggdmFsaWTDoXRvcsWvLlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChkYXRhLnJlc3BvbnNlSlNPTi52YWxpZGF0aW9uUmVzdWx0ICYmIGNvbnRlbnQuUmVnRm9ybU9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjb250ZW50LlJlZ0Zvcm1PYmplY3QuZm9ybURpdi5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRpb25zXCIsIGRhdGEucmVzcG9uc2VKU09OLnZhbGlkYXRpb25SZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY29udGVudC5lbGVtZW50LnRyaWdnZXIoXCJmbGFzaG1lc3NhZ2VcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWQ6IFwicmVnaXN0cmF0aW9uRmxhc2hcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwNTZcIiwgLy9SQyAzMTQwMDA1NiA6IFJlZ2lzdHJhY2Ugc2VsaGFsYS5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtZXJyb3JcIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3B1YmxpYyBuZXdQYXNzd29yZFJlcXVlc3RDaGVja0NhcGNoYSh1c2VybmFtZSkge1xyXG4gICAgICAgIC8vICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLyAgICAvLy8gUHJvdmVkZSBvdsSbxZllbsOtIHXFvml2YXRlbGUgcG9tb2PDrSBHb29nbGUgcmVDYXB0Y2hhLlxyXG4gICAgICAgIC8vICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8gICAgLy8vIDxwYXJhbSBuYW1lPVwidXNlcm5hbWVcIiB0eXBlPVwiU3RyaW5nXCI+VcW+aXZhdGVsc2vDqSBqbcOpbm8uPC9wYXJhbT5cclxuXHJcbiAgICAgICAgLy8gICAgaWYgKCF1c2VybmFtZSB8fCB0eXBlb2YgdXNlcm5hbWUgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAvLyAgICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoXCJmbGFzaG1lc3NhZ2VcIiwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgaWQ6IFwicmVxdWVzdE5ld1Bhc3N3b3JkRmxhc2hcIlxyXG4gICAgICAgIC8vICAgICAgICAgICAgLCBsYWJlbDogXCJVxb5pdmF0ZWxza8OpIGptw6lubyBuZW7DrSB2eXBsbsSbbm8uXCJcclxuICAgICAgICAvLyAgICAgICAgICAgICwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1lcnJvclwiXHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcihcImd3YWxrdGhyb3VnaGJhY2tcIik7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgIC8vICAgIHRoaXMuVXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgICAgICAvLyAgICAodGhpcy5SZUNhcHRjaGEgYXMgYW55KS5leGVjdXRlKHRoaXMubmV3UGFzc3dvcmRSZXF1ZXN0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3B1YmxpYyBuZXdQYXNzd29yZFJlcXVlc3QodG9rZW4pIHtcclxuICAgICAgICAvLyAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8gICAgLy8vIFphdm9sw6EgbWV0b2R1IG5ld1Bhc3N3b3JkUmVxdWVzdCBwcm8gdnl0dm/FmcOtIHBvxb5hZGF2a3UgbmEgem3Em251IGhlc2xhLlxyXG4gICAgICAgIC8vICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8gICAgLy8vIDxwYXJhbSBuYW1lPVwidG9rZW5cIiB0eXBlPVwic3RyaW5nXCI+VG9rZW4gcmVDYXB0Y2hhIHZhbGlkYWNlLjwvcGFyYW0+XHJcblxyXG4gICAgICAgIC8vICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gICAgaWYgKCF0aGF0LlVzZXJuYW1lIHx8IHR5cGVvZiB0aGF0LlVzZXJuYW1lICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQuZWxlbWVudC50cmlnZ2VyKFwiZmxhc2htZXNzYWdlXCIsIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGlkOiBcInJlcXVlc3ROZXdQYXNzd29yZEZsYXNoXCJcclxuICAgICAgICAvLyAgICAgICAgICAgICwgbGFiZWw6IFwiVcW+aXZhdGVsc2vDqSBqbcOpbm8gbmVuw60gdnlwbG7Em25vLlwiXHJcbiAgICAgICAgLy8gICAgICAgICAgICAsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtZXJyb3JcIlxyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5lbGVtZW50LnRyaWdnZXIoXCJnd2Fsa3Rocm91Z2hiYWNrXCIpO1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICAgfVxyXG5cclxuICAgICAgICAvLyAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vICAgIHZhciBmb3JtRGF0YSA9IHsgcmVDYXB0Y2hhVG9rZW46IHRva2VuIH07XHJcbiAgICAgICAgLy8gICAgZm9ybURhdGEudXppdmF0ZWxza2VKbWVubyA9IHRoYXQuVXNlcm5hbWU7XHJcblxyXG4gICAgICAgIC8vICAgIGpRdWVyeS5lYWNoKGZvcm1EYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8gICAgICAgIC8vLyBPZGViZXJlIGtyYWpuaSBtZXplcnkgJC50cmltKCkgemUgdsWhZWNoIHN0cmluZ292w71jaCBwb2zDrSB2eWptYSBjaGFwY2hhIHRva2VudSBhIG5hc3RhdmkgamUgenBldCBkbyBmb3JtdWxhcmUuXHJcbiAgICAgICAgLy8gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImtleVwiIHR5cGU9XCJzdHJpbmdcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiIHR5cGU9XCJzdHJpbmd8aW50ZWdlcnxib29sZWFuXCI+PC9wYXJhbT5cclxuXHJcbiAgICAgICAgLy8gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYga2V5ICE9PSBcInJlQ2FwdGNoYVRva2VuXCIpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGZvcm1EYXRhW2tleV0gPSAkLnRyaW0odmFsdWUpO1xyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgIHRoYXQuY2FsbChcIlJlcXVlc3ROZXdQYXNzd29yZFwiLCB7IGZvcm1EYXRhOiBmb3JtRGF0YSB9KVxyXG4gICAgICAgIC8vICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy8gVnlwc8OhbsOtIGZsYXNoIG1lc3NhZ2UgaW5mb3JtdWrDrWPDrSBvIHN0YXZ1IMW+w6Fkb3N0aSBvIG9ibm92ZW7DrSBoZXNsYS5cclxuICAgICAgICAvLyAgICAgICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIiB0eXBlPVwidHlwZVwiPjwvcGFyYW0+XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5lbGVtZW50LnRyaWdnZXIoXCJmbGFzaG1lc3NhZ2VcIiwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlkOiBcInJlcXVlc3ROZXdQYXNzd29yZEZsYXNoXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMTQwMDA5NVwiLmZvcm1hdChmb3JtRGF0YS51eml2YXRlbHNrZUptZW5vKSwgLy9SQyAzMTQwMDA5NSA6ICBPZGVzbMOhbsOtIGVtYWlsdSBwcm8gb2Jub3Z1IGhlc2xhIGsgdcW+aXZhdGVsc2vDqW11IMO6xI10dSB7MH0gcHJvYsSbaGxvIMO6c3DEm8WhbsSbLlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtc3VjY2Vzc1wiXHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8vIFZ5cHPDoW7DrSBmbGFzaCBtZXNzYWdlIGluZm9ybXVqw61jw60gbyBuZcO6c3DEm8WhbsOpIG9kZXNsw6Fuw60gxb7DoWRvc3RpIG8gb2Jub3ZlbsOtIGhlc2xhLlxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLyAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiIHR5cGU9XCJ0eXBlXCI+PC9wYXJhbT5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUmVxdWVzdE5ld1Bhc3N3b3JkIEZhaWxlZCBcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmVsZW1lbnQudHJpZ2dlcihcImZsYXNobWVzc2FnZVwiLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWQ6IFwicmVxdWVzdE5ld1Bhc3N3b3JkRmxhc2hcIixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMxNDAwMDk2XCIuZm9ybWF0KGZvcm1EYXRhLnV6aXZhdGVsc2tlSm1lbm8pLCAvL1JDIDMxNDAwMDk2IDogIE9kZXNsw6Fuw60gZW1haWx1IHBybyBvYm5vdnUgaGVzbGEgayB1xb5pdmF0ZWxza8OpbXUgw7rEjXR1IHswfSBzZSBuZXpkYcWZaWxvLlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtZXJyb3JcIlxyXG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90aGF0LmVsZW1lbnQudHJpZ2dlcihcImZsYXNobWVzc2FnZVwiLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyAgICBpZDogXCJyZXF1ZXN0TmV3UGFzc3dvcmRGbGFzaFwiXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAsIGxhYmVsOiBcIk9kZXNsw6Fuw60gZW1haWx1IHBybyBvYm5vdnUgaGVzbGEgayB1xb5pdmF0ZWxza8OpbXUgw7rEjXR1IFwiXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAgICAgKyBcIlxcXCJcIiArIGZvcm1EYXRhLnV6aXZhdGVsc2tlSm1lbm8gKyBcIlxcXCIgXCJcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vICAgICAgICArIFwic2VsaGFsby4gUMWZw63EjWlueSBtb2hvdSBiw710OlwiXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAgICAgKyBcIjx1bD5cIlxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gICAgICAgICsgXCI8bGk+xaBwYXRuw6kgdcW+aXZhdGVsc2vDqSBqbcOpbm8gKGVtYWlsKS48L2xpPlwiXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAgICAgKyBcIjxsaT5OZXphcmVnaXN0cm92YW7DvSDDusSNZXQuPC9saT5cIlxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gICAgICAgICsgXCI8bGk+TmVha3Rpdm92YW7DvSBhIG7DoXNsZWRuxJsgc21hemFuw70gw7rEjWV0LjwvbGk+XCJcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vICAgICAgICArIFwiPC91bD5cIlxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gICAgLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWVycm9yXCJcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy8gT2RlbWtudXTDrSBjb250ZW50dSAoc2tyeXTDrSBtb3TDoXRrYSkgYSB2csOhY2Vuw60gc2UgenDEm3QgbmEgcMWZaWhsYcWhb3ZhY8OtIGZvcm11bMOhxZkuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmVsZW1lbnQudHJpZ2dlcihcImd3YWxrdGhyb3VnaGJhY2tcIik7XHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG4gICAgfVxyXG5cclxufSIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuR3VpLldlYkNvbnRyb2xzLlJlZ1BhZ2VQdWJsaWNEbGcuanMgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gWm3Em25hIG9zb2Juw61jaCDDumRhasWvIHZlxZllam7DqWhvIHXFvml2YXRlbGUuICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdGZlaWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE3ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTctMDMtMjcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuR3VpLldlYkNvbnRyb2xzIHtcclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnNcclxuXHJcbiAgICBpbnRlcmZhY2UgU2F2ZVVzZXJJbmZvUmV0VmFsIHtcclxuICAgICAgICBjYW5jZWxlZEJ5VXNlcj86IGJvb2xlYW5cclxuICAgIH1cclxuXHJcbiAgICBlbnVtIEFjdGlvbk5hbWVzIHtcclxuICAgICAgICBzYXZlUHVibGljVXNlckluZm8gPSAnYWN0U2F2ZVB1YmxpY1VzZXJJbmZvJyxcclxuICAgICAgICByZXF1ZXN0Q29uZmlybUVtYWlsID0gJ2FjdFJlcXVlc3RDb25maXJtRW1haWwnXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHQ2hhbmdlUHVibGljVXNlckluZm9EbGdcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAqIEBzaW5jZSAgIDQ4Mi4xLjAuNDU3XHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdDaGFuZ2VQdWJsaWNVc2VySW5mb0RsZyBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIFRleHQgenBydnkgaW5mb3JtdWrDrWPDrSBvIHDFmcOtcGFkbsOpbSBvbWV6ZW7DrSBlZGl0YWNlIG9zb2Juw61jaCDDumRhasWvLlxyXG4gICAgICAgIC8vICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSByZWFkb25seSBQZXJzb25hbEluZm9ybWF0aW9uUmVzdHJpY3Rpb25NZXNzYWdlPzogc3RyaW5nXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtsw63EjSBwcm8gUlNBIMWhaWZyb3bDoW7DrS5cclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgQ2lwaGVyUHVibGljS2V5OiBzdHJpbmdcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw616bmFrLCB6ZGEgc2UgamVkbsOhIG8gdcW+aXZhdGVsZSByZWdpc3Ryb3ZhbsOpaG8gc2tyemUgZm9ybXVsw6HFmSBbdHJ1ZV0sIG5lYm8gZXh0ZXJuw61zbHVidSBbZmFsc2VdLlxyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSXNHaW5pc1VzZXI6IGJvb2xlYW5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw616bmFrLCB6ZGEgamUgbW/Fvm7DqSB6YcW+w6FkYXQgbyBwb3R2cnplbsOtIGVtYWlsdS5cclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IENhblJlcXVlc3RDb25maXJtRW1haWw/OiBHZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdQZXJtaXNzaW9uO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdGb3JtT2JqZWN0XHJcbiAgICAgICAgICogQHR5cGUge0dQdWJsaWNVc2VyUmVnRm9ybU9iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFJlZ0Zvcm1PYmplY3Q/OiBHUHVibGljVXNlclJlZ0Zvcm1PYmplY3RcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRm9ybUNvbmZpZ1xyXG4gICAgICAgICAqIEB0eXBlIHthbnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBGb3JtQ29uZmlnPzogYW55XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBmb3JtdWzDocWZLCBwxZlpZMOhIGplaiBkbyBjb250ZW50dSBhIG5hc3RhdsOtIHZhbGlkw6F0b3J5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICAvL2lmICghR29yZGljLlV0aWxzLkdTdHJpbmcuSXNOdWxsT3JXaGl0ZVNwYWNlKHRoaXMuUGVyc29uYWxJbmZvcm1hdGlvblJlc3RyaWN0aW9uTWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5zaG93Rmxhc2goXHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLlBlcnNvbmFsSW5mb3JtYXRpb25SZXN0cmljdGlvbk1lc3NhZ2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBHb3JkaWMuR2xvYmFsLkVudW1zLkNvbG9yU3RhdGVDbGFzcy53YXJuaW5nXHJcbiAgICAgICAgICAgIC8vICAgICk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5Gb3JtQ29uZmlnPy5pbml0aWFsVmFsdWVzPy5SZWdpc3RyYXRpb25UeXBlID09PSBHZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLlB1YmxpY1VzZXJMb2dpblJlZ2lzdHJhdGlvblR5cGVFbnVtLkVJZGVudGl0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbmlhSW5mbycsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdqcmVzOjMyMTAwMzQ4JywgLy9SQyAzMjEwMDM0OCA6IE5lZWRpdG92YXRlbG7DqSDDumRhamUganNvdSBwxZllYsOtcsOhbnkgeiByZWdpc3Ryxa8gTklBIC0gTsOhcm9kbsOtIGlkZW50aXRuw60gYXV0b3JpdHkuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6ICdpbmZvJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlTWVudSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gMTQuMDguMjAxOCAtIFRGZWlrXHJcbiAgICAgICAgICAgIC8vIFByZXByYWNvdmFuaSBmdW5rY2UgY3JlYXRlIG5hIHByb21pcyBhYnljaCB6YWppc3RpbCByYWRuZSBuYWN0ZW5pIGNvbmZpZ3UuXHJcbiAgICAgICAgICAgIEdvcmRpYy5HdWkuV2ViQ29udHJvbHMuR1B1YmxpY1VzZXJSZWdGb3JtLmNyZWF0ZSgkLmV4dGVuZDxhbnksIEdQdWJsaWNVc2VyUmVnRm9ybU9wdGlvbnMsIGFueT4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0NoYW5nZVB1YmxpY1VzZXJJbmZvRm9ybScsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiB0aGlzLmVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAvL2NpcGhlclB1YmxpY0tleTogdGhpcy5DaXBoZXJQdWJsaWNLZXksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pc0dpbmlzVXNlcjogdGhpcy5Jc0dpbmlzVXNlclxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjaXBoZXJQdWJsaWNLZXk6IHRoaXMuQ2lwaGVyUHVibGljS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIGlzR2luaXNVc2VyOiB0aGlzLklzR2luaXNVc2VyLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6ICdMMk0yUzEnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5Gb3JtQ29uZmlnXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVnRm9ybU9iamVjdFJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJlZ0Zvcm1PYmplY3QgPSByZWdGb3JtT2JqZWN0UmV0VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTYXZlVXNlckluZm9cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMjcuMDcuMjAyMVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R1B1YmxpY1VzZXJEdG99IHVzZXJEdG9cclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8U2F2ZVVzZXJJbmZvUmV0VmFsPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFNhdmVVc2VySW5mbyhcclxuICAgICAgICAgICAgdXNlckR0bzogR1B1YmxpY1VzZXJEdG9cclxuICAgICAgICApOiBKUXVlcnkuUHJvbWlzZTxTYXZlVXNlckluZm9SZXRWYWw+IHtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMyMTAwMTY0XCIpOyAvL1JDIDMyMTAwMTY0IDogVWtsw6Fkw6FtIG9zb2Juw60gw7pkYWplLlxyXG4gICAgICAgICAgICBjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQ8U2F2ZVVzZXJJbmZvUmV0VmFsPigpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2FsbChzYXZlQW55d2F5PzogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgLy8gVWxvemVuaSBkYXQgeiBmb3JtdWxhcmUuXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmNhbGw8SXNsLkdTZXJ2aWNlQWN0aW9uUmVzcG9uc2U8R1NhdmVVc2VySW5mb1JldFZhbER0bz4+KFwiU2F2ZVVzZXJJbmZvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyRHRvOiB1c2VyRHRvLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhdmVBbnl3YXk6IHNhdmVBbnl3YXlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVzdGlvbiA9IHJldFZhbD8ucmVzdWx0Py5kYXRhPy5RdWVzdGlvbj8udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZGlhbG9ncy5jb25maXJtKFwianJlczoyNTAzMDQ1MFwiLCBxdWVzdGlvbikgLy9SQyAyNTAzMDQ1MCA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChxdWVzdGlvblJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb25SZXRWYWwgJiYgKHF1ZXN0aW9uUmV0VmFsIGFzIGFueSkucmV0dXJuVmFsdWUgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxlZEJ5VXNlcjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbCgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXBzw6Fuw60gZmxhc2ggbWVzc2FnZSBpbmZvcm11asOtY8OtIG8gbmXDunNwxJvFoW7DqSB6bcSbbsSbIG9zb2Juw61jaCDDumRhasWvIG5lYm8gem9icmF6ZW7DrSBjaHliIHNlcnZlcm92w71jaCB2YWxpZMOhdG9yxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBjb250ZW50Py5SZWdGb3JtT2JqZWN0Py5mb3JtRGl2O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMjQuMDEuMjAyNCAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYXRpb25SZXN1bHQgamUgbmEgamluw6ltIG3DrXN0xJsgbmXFviBkxZnDrXZlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSBkYXRhPy5yZXNwb25zZUpTT04/LnZhbGlkYXRpb25SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSAoZGF0YSBhcyBhbnkpPy52YWxpZGF0aW9uUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvblJlc3VsdCAmJiBHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKCdnZm9ybScsIGZvcm0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2godmFsaWRhdGlvblJlc3VsdCwgZnVuY3Rpb24gKGVycm9yR3JvdXBLZXksIGVycm9yR3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JHcm91cC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChlcnJvckdyb3VwLCBmdW5jdGlvbiAoZXJyb3JLZXksIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlICs9IFwiIGpyZXM6MzIxMDAxNTJcIjsgLy9SQyAzMjEwMDE1MiA6IE9wcmF2dGUgY2h5YnUgYSB6bm92dSB6a3VzdGUgdWxvxb5pdCB6bm92dS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCB2YWxpZGF0aW9uUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2RlbWtudXTDrSBjb250ZW50dSAoc2tyeXTDrSBtb3TDoXRrYSkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhbGwoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBadmFsaWR1amUgZm9ybXVsw6HFmSBhIHphdm9sw6EgbWV0b2R1IFNhdmVVc2VySW5mbyBwcm8gdWxvxb5lbsOtIG9zb2Juw61jaCDDumRhasWvIHXFvml2YXRlbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgVWxvekRhdGFVeml2YXRlbGUoXHJcbiAgICAgICAgICAgIHNob3dTdWNjZXNGbGFzaE1lc3NhZ2VzOiBib29sZWFuID0gZmFsc2VcclxuICAgICAgICApOiBKUXVlcnkuUHJvbWlzZTx1bmRlZmluZWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgZGVmZXJyZWQgPSAkLkRlZmVycmVkPHVuZGVmaW5lZD4oKTtcclxuICAgICAgICAgICAgY29uc3QgZmxhc2hNZXNzYWdlSWQgPSBcIkNoYW5nZVB1YmxpY1VzZXJJbmZvRmxhc2hcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlZ0Zvcm1PYmplY3QgPSB0aGlzLlJlZ0Zvcm1PYmplY3Q7XHJcbiAgICAgICAgICAgIC8vIEtvbnRyb2xhIHZhbGlkbm9zdGkgZm9tdWxhcmUuXHJcbiAgICAgICAgICAgIGlmICghcmVnRm9ybU9iamVjdCB8fCAhcmVnRm9ybU9iamVjdC5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIDAxLjA0LjIwMjAgLSBURmVpa1xyXG4gICAgICAgICAgICAvLyBQxZlpZMOhbmEgYWt0dWFsaXphY2UgxaFpcm92YWPDrWhvIGtsw63EjWUgcHJvIGhlc2xvLlxyXG4gICAgICAgICAgICByZWdGb3JtT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAuY29sbGVjdCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAoZm9ybURhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMDUuMDkuMjAxOSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFDFmWVwcmFjb3bDoW7DrSB2b2zDoW7DrSB1bG82ZW7DrSDDumRhasWvIHRhaywgYWJ5IGJ5bG8gbW/Fvm7DqSB6cHJhY292w6F2YXQgdXBvem9ybsSbbsOtIHplIHNlcnZlcnUgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFieSBzZSB1xb5pdmF0ZWwgbW9obCByb3pob2Rub3V0LCB6ZGEgY2hjZSDDumRhamUgaSB0YWsgdWxvxb5pdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5TYXZlVXNlckluZm8oZm9ybURhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbD8uY2FuY2VsZWRCeVVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzIxMDAxNjNcIiwgLy9SQyAzMjEwMDE2MyA6IFptxJtuYSBvc29ibsOtY2ggw7pkYWrFryBwxZllcnXFoWVuYSB1xb5pdmF0ZWxlbS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXNoTWVzc2FnZUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hvd1N1Y2Nlc0ZsYXNoTWVzc2FnZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnlwc8OhbsOtIGZsYXNoIG1lc3NhZ2UgaW5mb3JtdWrDrWPDrSBvIMO6c3DEm8WhbsOpIHptxJtuxJsgb3NvYm7DrWNoIMO6ZGFqxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMyMTAwMTUxXCIsIC8vUkMgMzIxMDAxNTEgOiBPc29ibsOtIMO6ZGFqZSBieWx5IMO6c3DEm8WhbsSbIHptxJtuxJtueS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhc2hNZXNzYWdlSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMjEwMDE1M1wiLCAvL1JDIDMyMTAwMTUzIDogWm3Em25hIG9zb2Juw61jaCDDumRhasWvIHNlbGhhbGEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhc2hNZXNzYWdlSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXF1ZXN0Q29uZmlybUVtYWlsXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDI3LjA3LjIwMjFcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBSZXF1ZXN0Q29uZmlybUVtYWlsKCk6IEpRdWVyeS5Qcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbDxib29sZWFuPignUmVxdWVzdENvbmZpcm1FbWFpbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG96YWRhdE9Qb3R2cnplbmlFbWFpbHVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMjcuMDcuMjAyMVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTx1bmRlZmluZWQ+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUG96YWRhdE9Qb3R2cnplbmlFbWFpbHUoKTogSlF1ZXJ5LlByb21pc2U8dW5kZWZpbmVkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZ0Zvcm0gPSB0aGlzLlJlZ0Zvcm1PYmplY3Q7XHJcbiAgICAgICAgICAgIGlmICghcmVnRm9ybSB8fCAhcmVnRm9ybS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZWdGb3JtXHJcbiAgICAgICAgICAgICAgICAuY29sbGVjdCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocHVibGljVXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gcHVibGljVXNlci5lbWFpbD8udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5VbG96RGF0YVV6aXZhdGVsZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLlJlcXVlc3RDb25maXJtRW1haWwoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChvdXRwdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvdXRwdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCgnanJlczozMjEwMDI0OScpOyAvL1JDIDMyMTAwMjQ5IDogUG90dnJ6b3ZhY8OtIGVtYWlsIGJ5bCBvZGVzbMOhbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gbWVudS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTEuMTAuMjAxOVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlTWVudSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oJC5leHRlbmQ8YW55LCBHQWN0aW9uUGFyYW1zRGVmT2JqQmFzZSwgR0FjdGlvblBhcmFtcz4oe30sXHJcbiAgICAgICAgICAgICAgICAgICAgUHJlZmFicy5JY29ucy5JY29uVG9BY3Rpb25QYXJhbXMoUHJlZmFicy5JY29ucy5VbG96aXQoKSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBBY3Rpb25OYW1lcy5zYXZlUHVibGljVXNlckluZm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKGNvbnRlbnQuVWxvekRhdGFVeml2YXRlbGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApKSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBBY3Rpb25OYW1lcy5yZXF1ZXN0Q29uZmlybUVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICdqcmVzOjMyMTAwMjUxJywgLy9SQyAzMjEwMDI1MSA6IFBvdHZyZGl0IGVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyhjb250ZW50LlBvemFkYXRPUG90dnJ6ZW5pRW1haWx1KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5DYW5SZXF1ZXN0Q29uZmlybUVtYWlsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKFByZWZhYnMuQWN0aW9ucy5aYXZyaXRDb250ZW50KCkpXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gSG9ybsOtIG1lbnUuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tBY3Rpb25OYW1lcy5yZXF1ZXN0Q29uZmlybUVtYWlsXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEb2xuw60gbWVudS5cclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW0FjdGlvbk5hbWVzLnNhdmVQdWJsaWNVc2VySW5mb10sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tQcmVmYWJzLkFjdGlvbnMuTmFtZXMuWmF2cml0Q29udGVudF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdDaGFuZ2VQYXNzd29yZERsZy50cyAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gWm3Em25hIGhlc2xhIHZlxZllam7DqWhvIHXFvml2YXRlbGUuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgVEZlaWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE3ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTctMDQtMTAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuR3VpLldlYkNvbnRyb2xzIHtcclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnNcclxuXHJcbiAgICBlbnVtIEZpZWxkTmFtZXMge1xyXG4gICAgICAgIHB1dm9kbmlIZXNsbyA9IFwicHV2b2RuaUhlc2xvXCIsXHJcbiAgICAgICAgb3ZlcmVuaUhlc2xhID0gXCJvdmVyZW5pSGVzbGFcIixcclxuICAgICAgICBoZXNsbyA9IFwiaGVzbG9cIlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR0NoYW5nZVBhc3N3b3JkRGxnXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgKiBAc2luY2UgICA0ODIuMS4wLjQ1N1xyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQ2hhbmdlUGFzc3dvcmREbGcgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZhbGlkw6F0b3J5XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IENoYW5nZVBhc3N3b3JkRm9ybVZhbGlkYXRvcnM/OiBvYmplY3RcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogJEZvcm1cclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRGb3JtPzogSlF1ZXJ5PEhUTUxFbGVtZW50PlxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gZm9ybXVsw6HFmSwgcMWZaWTDoSBqZWogZG8gY29udGVudHUgYSBuYXN0YXbDrSB2YWxpZMOhdG9yeS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAvLyBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZS5cclxuICAgICAgICAgICAgdGhpcy4kRm9ybSA9IEdDaGFuZ2VQYXNzd29yZERsZy5jcmVhdGVGb3JtKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gdmFsaWTDoXRvcsWvLlxyXG4gICAgICAgICAgICB0aGlzLiRGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy5DaGFuZ2VQYXNzd29yZEZvcm1WYWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgR29yZGljLlV0aWxzLkZvcm0ubWFya1JlcXVpcmVkKHRoaXMuJEZvcm0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVnl0dm/FmWVuw60gbWVudS5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIG1lbnUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDI5LjA3LjIwMTlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gRG9sbsOtIG1lbnUuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRCYXJQb2xlOiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgY29tbWFuZEJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGNvbnRlbnQuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2hhbmdlUGFzc3dvcmRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzE0MDAwNjBcIiwgLy9SQyAzMTQwMDA2MCA6IFptxJtuaXQgaGVzbG9cclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzE0MDAwNjBcIiwgLy9SQyAzMTQwMDA2MCA6IFptxJtuaXQgaGVzbG9cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBHb3JkaWMuUHJlZmFicy5JY29ucy5VbG96aXQoKS5pY29uLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcoY29udGVudC5jaGFuZ2VQYXNzd29yZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb21tYW5kQmFyUG9sZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogY29udGVudC5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbihHb3JkaWMuUHJlZmFicy5BY3Rpb25zLlphdnJpdENvbnRlbnQoKSkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb250ZW50LmNvbW1hbmRCYXIoY29udGVudC5hY3Rpb25zLmNyZWF0ZUJhcihjb21tYW5kQmFyUG9sZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWnZhbGlkdWplIGZvcm11bMOhxZkgYSB6YXZvbMOhIHNlcnZlcm92b3UgbWV0b2R1IENoYW5nZVBhc3N3b3JkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNoYW5nZVBhc3N3b3JkKCk6IEpRdWVyeS5Qcm9taXNlPHVuZGVmaW5lZD4ge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIEtvbnRyb2xhIHZhbGlkbm9zdGkgZm9tdWzDocWZZS5cclxuICAgICAgICAgICAgaWYgKCFHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKFwiZ2Zvcm1cIiwgY29udGVudC4kRm9ybSkgfHwgIWNvbnRlbnQuJEZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGVudC5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgLy8gMDEuMDQuMjAyMCAtIFRGZWlrXHJcbiAgICAgICAgICAgIC8vIFDFmWlkw6FuYSBha3R1YWxpemFjZSDFoWlyb3ZhY8OtaG8ga2zDrcSNZSBwcm8gaGVzbG8uXHJcbiAgICAgICAgICAgIHJldHVybiBQcmVmYWJzLkdTdHJpbmdCb3gudXBkYXRlQ2hpcGVyUHVibGljS2V5cyhjb250ZW50LiRGb3JtKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoJ2dmb3JtJywgY29udGVudC4kRm9ybSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkdG86IEdDaGFuZ2VQYXNzd29yZEZvcm1EdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC4kRm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkPEdDaGFuZ2VQYXNzd29yZEZvcm1EdG8+KFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5jYWxsPHVuZGVmaW5lZD4oXCJDaGFuZ2VQYXNzd29yZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YTogZHRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnlwc8OhbsOtIGZsYXNoIG1lc3NhZ2UgaW5mb3JtdWrDrWPDrSBvIMO6c3DEm8WhbsOpIHptxJtuxJsgaGVzbGEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5zaG93Rmxhc2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMjEwMDE0NFwiLCAvL1JDIDMyMTAwMTQ0IDogWm3Em25hIGhlc2xhIHByb2LEm2hsYSDDunNwxJvFoW7Emy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2hhbmdlUGFzc3dvcmRGbGFzaFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5cHPDoW7DrSBmbGFzaCBtZXNzYWdlIGluZm9ybXVqw61jw60gbyBuZcO6c3DEm8WhbsOpIHptxJtuxJsgaGVzbGEgbmVib1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuw60gY2h5YiBzZXJ2ZXJvdsO9Y2ggdmFsaWTDoXRvcsWvLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhPy5yZXNwb25zZUpTT04/LnZhbGlkYXRpb25SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGRhdGEucmVzcG9uc2VKU09OLnZhbGlkYXRpb25SZXN1bHQsIGZ1bmN0aW9uIChlcnJvckdyb3VwS2V5LCBlcnJvckdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JHcm91cC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGVycm9yR3JvdXAsIGZ1bmN0aW9uIChlcnJvcktleSwgZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSArPSBcIiBcIiArIFwianJlczozMjEwMDE0NlwiOyAvL1JDIDMyMTAwMTQ2IDogT3ByYXZ0ZSBjaHlidSBhIGhlc2xvIHptxJtuaXQgem5vdnUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZm9ybVwiLCBjb250ZW50LiRGb3JtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC4kRm9ybS5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0aW9uc1wiLCBkYXRhLnJlc3BvbnNlSlNPTi52YWxpZGF0aW9uUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDaGFuZ2VQYXNzd29yZCBGYWlsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc2hvd0ZsYXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMyMTAwMTQ1XCIsIC8vUkMgMzIxMDAxNDUgOiBabcSbbmEgaGVzbGEgc2VsaGFsYS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2hhbmdlUGFzc3dvcmRGbGFzaFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBmb3JtdWzDocWZLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAwNS4wOC4yMDE5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fSBhcHBlbmRUb1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUZvcm0oXHJcbiAgICAgICAgICAgIGFwcGVuZFRvOiBKUXVlcnk8SFRNTEVsZW1lbnQ+XHJcbiAgICAgICAgKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB7XHJcbiAgICAgICAgICAgIC8vIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllLlxyXG4gICAgICAgICAgICBjb25zdCBmb3JtQnVpbGRlciA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNoYW5nZVBhc3N3b3JkRm9ybVwiLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gU2VrY2UgXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTQwMDA2MlwiKSAvL1JDIDMxNDAwMDYyIDogU3RhcsOpIGhlc2xvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkdTdHJpbmdCb3gucGFzc3dvcmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2xvdXppbEpzZW1TYmlyYW5pSG9kbm90WlBvbGljZWtUYWtBYnlOZW1vaGxOYXN0YXRQcm9ibGVtU05lYWt0dWFsbmltU2lmcm92YWNpbUtsaWNlbTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLnB1dm9kbmlIZXNsbyxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5cIiArIEdDaGFuZ2VQYXNzd29yZEZvcm1EdG9OYW1lcy5wdXZvZG5pSGVzbG8gKyBcIiA9IHZhbHVlXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzE0MDAwNjNcIikgLy9SQyAzMTQwMDA2MyA6IE5vdsOpIGhlc2xvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLkdTdHJpbmdCb3gucGFzc3dvcmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2xvdXppbEpzZW1TYmlyYW5pSG9kbm90WlBvbGljZWtUYWtBYnlOZW1vaGxOYXN0YXRQcm9ibGVtU05lYWt0dWFsbmltU2lmcm92YWNpbUtsaWNlbTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLmhlc2xvLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLlwiICsgR0NoYW5nZVBhc3N3b3JkRm9ybUR0b05hbWVzLmhlc2xvICsgXCIgPSB2YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxNDAwMDI2XCIpIC8vUkMgMzE0MDAwMjYgOiBPdsSbxZllbsOtIGhlc2xhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuR1N0cmluZ0JveC5wYXNzd29yZFJlRW50ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZEZpZWxkTmFtZTogRmllbGROYW1lcy5oZXNsbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JzbG91emlsSnNlbVNiaXJhbmlIb2Rub3RaUG9saWNla1Rha0FieU5lbW9obE5hc3RhdFByb2JsZW1TTmVha3R1YWxuaW1TaWZyb3ZhY2ltS2xpY2VtOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZE5hbWVzLm92ZXJlbmlIZXNsYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuXCIgKyBHQ2hhbmdlUGFzc3dvcmRGb3JtRHRvTmFtZXMub3ZlcmVuaUhlc2xhICsgXCIgPSB2YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFDFmWlkw6Fuw60gZm9ybXVsw6HFmWUgZG8gRE9NdS5cclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oYXBwZW5kVG8pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1CdWlsZGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIDE2LjExLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAvLyBVcHJhdmVuw60gYXV0b2NvbXBsZXRlIGF0cmlidXR1IGRsZSBhcHBsdS5cclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vc2VjdXJpdHkvcGFzc3dvcmRfYXV0b2ZpbGwvZW5hYmxpbmdfcGFzc3dvcmRfYXV0b2ZpbGxfb25fYW5faHRtbF9pbnB1dF9lbGVtZW50XHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vcGhhYnJpY2F0b3IuZ29yZGljLmN6L1QxNTgwNFxyXG4gICAgICAgICAgICAkKCdpbnB1dCcsIHJlc3VsdC5maW5kRmllbGRzKEZpZWxkTmFtZXMucHV2b2RuaUhlc2xvKSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdhdXRvY29tcGxldGUnLCAnY3VycmVudC1wYXNzd29yZCcpO1xyXG5cclxuICAgICAgICAgICAgJCgnaW5wdXQnLCByZXN1bHQuZmluZEZpZWxkcyhGaWVsZE5hbWVzLmhlc2xvKSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdhdXRvY29tcGxldGUnLCAnbmV3LXBhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgICAgICAkKCdpbnB1dCcsIHJlc3VsdC5maW5kRmllbGRzKEZpZWxkTmFtZXMub3ZlcmVuaUhlc2xhKSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdhdXRvY29tcGxldGUnLCAnbmV3LXBhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuR3VpLldlYkNvbnRyb2xzLkdOZXdQYXNzd29yZERsZy50cyAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gTmFzdGF2ZW7DrSBub3bDqWhvIGhlc2xhIHZlxZllam7DqWhvIHXFvml2YXRlbGUgcG8gamVobyBvYm5vdmVuw60gKHphcG9tZW51dMOtKS48L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIFRGZWlrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE3LTA0LTEwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkd1aS5XZWJDb250cm9scyB7XHJcbiAgICBjb25zdCB7IGdjb250ZW50IH0gPSBEZWNvcmF0b3JzXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHTmV3UGFzc3dvcmREbGdcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAqIEBzaW5jZSAgIDQ4Mi4xLjAuNDU3XHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdOZXdQYXNzd29yZERsZyBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHUHVibGljTG9naW5EaWFsb2d7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmFsaWTDoXRvcnlcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTmV3UGFzc3dvcmRGb3JtVmFsaWRhdG9ycz86IG9iamVjdFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAkRm9ybVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJEZvcm0/OiBKUXVlcnk8SFRNTEVsZW1lbnQ+XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlQ2FwdGNoYVxyXG4gICAgICAgICAqIEB0eXBlIHtBcGkuR1JlQ2FwdGNoYX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFJlQ2FwdGNoYT86IEFwaS5HUmVDYXB0Y2hhXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBmb3JtdWzDocWZLCBwxZlpZMOhIGplaiBkbyBjb250ZW50dSBhIG5hc3RhdsOtIHZhbGlkw6F0b3J5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAxMC4wNC4yMDE3XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHTmV3UGFzc3dvcmREbGd9IHRoaXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaWNpYWxpemFjZSByZUNhcHRjaGEuXHJcbiAgICAgICAgICAgIHRoaXMuUmVDYXB0Y2hhID0gbmV3IEFwaS5HUmVDYXB0Y2hhKHRoaXMubmV3UGFzc3dvcmQuYmluZCh0aGlzKSwgdGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFDFmWlkw6Fuw60gZm9ybXVsw6HFmWUgZG8gRE9NdS5cclxuICAgICAgICAgICAgdGhpcy4kRm9ybSA9IEdOZXdQYXNzd29yZERsZy5jcmVhdGVGb3JtKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gdmFsaWTDoXRvcsWvLlxyXG4gICAgICAgICAgICB0aGlzLiRGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy5OZXdQYXNzd29yZEZvcm1WYWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgR29yZGljLlV0aWxzLkZvcm0ubWFya1JlcXVpcmVkKHRoaXMuJEZvcm0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVnl0dm/FmWVuw60gbWVudS5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWnZhbGlkdWplIGZvcm11bMOhxZkgYSBwcm92ZWRlIG92xJvFmWVuw60gdcW+aXZhdGVsZSBwb21vY8OtIEdvb2dsZSByZUNhcHRjaGEuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDEwLjA0LjIwMTdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVnaXN0ZXJDaGVja0NhcGNoYSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZm9ybVwiLCB0aGlzLiRGb3JtKSAmJiB0aGlzLiRGb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSAmJiB0aGlzLlJlQ2FwdGNoYSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZUNhcHRjaGEuZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBadmFsaWR1amUgZm9ybXVsw6HFmSBhIHphdm9sw6Egc2VydmVyb3ZvdSBtZXRvZHUgU2V0TmV3UGFzc3dvcmQgcHJvIG5hc3RhdmVuw60gbm92w6lobyBoZXNsYS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTAuMDQuMjAxN1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdG9rZW5dIFRva2VuIHJlQ2FwdGNoYSB2YWxpZGFjZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5ld1Bhc3N3b3JkKHRva2VuPzogc3RyaW5nKTogSlF1ZXJ5LlByb21pc2U8dW5kZWZpbmVkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gS29udHJvbGEgdmFsaWRub3N0aSBmb211bMOhxZllLlxyXG4gICAgICAgICAgICBpZiAoIUdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZm9ybVwiLCBjb250ZW50LiRGb3JtKSB8fCAhKGNvbnRlbnQuJEZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIDAxLjA0LjIwMjAgLSBURmVpa1xyXG4gICAgICAgICAgICAvLyBQxZlpZMOhbmEgYWt0dWFsaXphY2UgxaFpcm92YWPDrWhvIGtsw63EjWUgcHJvIGhlc2xvLlxyXG4gICAgICAgICAgICByZXR1cm4gUHJlZmFicy5HU3RyaW5nQm94LnVwZGF0ZUNoaXBlclB1YmxpY0tleXMoY29udGVudC4kRm9ybSlcclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKCdnZm9ybScsIGNvbnRlbnQuJEZvcm0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybURhdGE6IEdOZXdQYXNzd29yZEZvcm1EdG8gPSB7IHJlQ2FwdGNoYVRva2VuOiB0b2tlbiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LiRGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZm9ybURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jYWxsPHVuZGVmaW5lZD4oXCJTZXROZXdQYXNzd29yZFwiLCB7IGZvcm1EYXRhOiBmb3JtRGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5cHPDoW7DrSBmbGFzaCBtZXNzYWdlIGluZm9ybXVqw61jw60gbyDDunNwxJvFoW7DqW0gbmFzdGF2ZW7DrSBoZXNsYS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVsZW1lbnQudHJpZ2dlcihcImZsYXNodXBkYXRlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTmV3UGFzc3dvcmRGbGFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMyMTAwMTQ5XCIsIC8vUkMgMzIxMDAxNDkgOiBOYXN0YXZlbsOtIG5vdsOpaG8gaGVzbGEgcHJvYsSbaGxvIMO6c3DEm8WhbsSbLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogR29yZGljLkdsb2JhbC5FbnVtcy5Db2xvclN0YXRlQ2xhc3Muc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZWxlbWVudC50cmlnZ2VyKFwiZ3dhbGt0aHJvdWdoYmFja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5cHPDoW7DrSBmbGFzaCBtZXNzYWdlIGluZm9ybXVqw61jw60gbyBuZcO6c3DEm8WhbsOpbSBuYXN0YXZlbsOtIGhlc2xhIG5lYm8gem9icmF6ZW7DrSBjaHliIHNlcnZlcm92w71jaCB2YWxpZMOhdG9yxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGE/LnJlc3BvbnNlSlNPTj8udmFsaWRhdGlvblJlc3VsdCAmJiBHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKFwiZ2Zvcm1cIiwgY29udGVudC4kRm9ybSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGRhdGEucmVzcG9uc2VKU09OLnZhbGlkYXRpb25SZXN1bHQsIGZ1bmN0aW9uIChlcnJvckdyb3VwS2V5LCBlcnJvckdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JHcm91cC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGVycm9yR3JvdXAsIGZ1bmN0aW9uIChlcnJvcktleSwgZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSArPSBcIiBcIiArIFwianJlczozMjEwMDE0NlwiOyAvL1JDIDMyMTAwMTQ2IDogT3ByYXZ0ZSBjaHlidSBhIGhlc2xvIHptxJtuaXQgem5vdnUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC4kRm9ybS5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRpb25zXCIsIGRhdGEucmVzcG9uc2VKU09OLnZhbGlkYXRpb25SZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNldE5ld1Bhc3N3b3JkIEZhaWxlZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZWxlbWVudC50cmlnZ2VyKFwiZmxhc2h1cGRhdGVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiTmV3UGFzc3dvcmRGbGFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMjEwMDE0OFwiLCAvL1JDIDMyMTAwMTQ4IDogTmFzdGF2ZW7DrSBub3bDqWhvIGhlc2xhIHNlbGhhbG8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogR29yZGljLkdsb2JhbC5FbnVtcy5Db2xvclN0YXRlQ2xhc3MuZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9kZW1rbnV0w60gY29udGVudHUgKHNrcnl0w60gbW90w6F0a2EpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBtZW51LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAwNS4wOC4yMDE5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIERvbG7DrSBtZW51LlxyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kQmFyUG9sZTogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIGNvbW1hbmRCYXJQb2xlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBjb250ZW50LmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE5ld1Bhc3N3b3JkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxNDAwMDYwXCIsIC8vUkMgMzE0MDAwNjAgOiBabcSbbml0IGhlc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQucmVnaXN0ZXJDaGVja0NhcGNoYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29tbWFuZEJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IGNvbnRlbnQuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiR1Jlc291cmNlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTAzMDQ1OVwiLCAvL1JDIDI1MDMwNDU5IDogWmF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcoY29udGVudC50cnlDbG9zZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29udGVudC5jb21tYW5kQmFyKGNvbnRlbnQuYWN0aW9ucy5jcmVhdGVCYXIoY29tbWFuZEJhclBvbGUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBmb3JtdWzDocWZLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAwNS4wOC4yMDE5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fSBhcHBlbmRUb1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUZvcm0oXHJcbiAgICAgICAgICAgIGFwcGVuZFRvOiBKUXVlcnk8SFRNTEVsZW1lbnQ+XHJcbiAgICAgICAgKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB7XHJcbiAgICAgICAgICAgIC8vIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllLlxyXG4gICAgICAgICAgICBjb25zdCBmb3JtQnVpbGRlciA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5ld1Bhc3N3b3JkRm9ybVwiLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gU2VrY2UgXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMxNDAwMDAyXCIsIC8vUkMgMzE0MDAwMDIgOiBIZXNsb1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5HU3RyaW5nQm94LnBhc3N3b3JkKHtcclxuICAgICAgICAgICAgICAgICAgICBvYnNsb3V6aWxKc2VtU2JpcmFuaUhvZG5vdFpQb2xpY2VrVGFrQWJ5TmVtb2hsTmFzdGF0UHJvYmxlbVNOZWFrdHVhbG5pbVNpZnJvdmFjaW1LbGljZW06IHRydWVcclxuICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJoZXNsb1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzE0MDAwMjZcIiwgLy9SQyAzMTQwMDAyNiA6IE92xJvFmWVuw60gaGVzbGFcclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuR1N0cmluZ0JveC5wYXNzd29yZFJlRW50ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkRmllbGROYW1lOiBcImhlc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2JzbG91emlsSnNlbVNiaXJhbmlIb2Rub3RaUG9saWNla1Rha0FieU5lbW9obE5hc3RhdFByb2JsZW1TTmVha3R1YWxuaW1TaWZyb3ZhY2ltS2xpY2VtOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib3ZlcmVuaUhlc2xhXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gUMWZaWTDoW7DrSBmb3JtdWzDocWZZSBkbyBET011LlxyXG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhhcHBlbmRUbykuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1CdWlsZGVyKTtcclxuICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZ2Zvcm0tcm93IHJlcXVpcmVkXCI+PGxhYmVsPjwvbGFiZWw+PGxhYmVsPicgK1xyXG4gICAgICAgICAgICAgICAgJ2pyZXM6MzIxMDAxNDcnICsgLy9SQyAzMjEwMDE0NyA6IHpuYcSNw60gcG92aW5uw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICcuPC9sYWJlbD48L2Rpdj4nXHJcbiAgICAgICAgICAgICkuYXBwZW5kVG8oYXBwZW5kVG8pO1xyXG5cclxuICAgICAgICAgICAgLy8gMTYuMTEuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgIC8vIFVwcmF2ZW7DrSBhdXRvY29tcGxldGUgYXRyaWJ1dHUgZGxlIGFwcGx1LlxyXG4gICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9zZWN1cml0eS9wYXNzd29yZF9hdXRvZmlsbC9lbmFibGluZ19wYXNzd29yZF9hdXRvZmlsbF9vbl9hbl9odG1sX2lucHV0X2VsZW1lbnRcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9waGFicmljYXRvci5nb3JkaWMuY3ovVDE1ODA0XHJcbiAgICAgICAgICAgICQoJ2lucHV0JywgJGZvcm0uZmluZEZpZWxkcygnaGVzbG8nKSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdhdXRvY29tcGxldGUnLCAnbmV3LXBhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgICAgICAkKCdpbnB1dCcsICRmb3JtLmZpbmRGaWVsZHMoJ292ZXJlbmlIZXNsYScpKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2F1dG9jb21wbGV0ZScsICduZXctcGFzc3dvcmQnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkZm9ybTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkd1aS5XZWJDb250cm9scy5HQWRkUmVwcmVzZW50UHVibGljVXNlckRsZy50cyAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IERpYWxvZyBwcm92w6F6w6Fuw60gw7rEjXTFryB2ZcWZZWpuw6lobyB1xb5pdmF0ZWxlLiAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgVEZlaWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIxICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjEtMDktMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuR3VpLldlYkNvbnRyb2xzIHtcclxuICAgIGNvbnN0IHsgZ2NvbnRlbnQgfSA9IERlY29yYXRvcnNcclxuXHJcbiAgICBlbnVtIEFjdGlvbk5hbWVzIHtcclxuICAgICAgICBBZGRSZXByZXNlbnRlZCA9ICdhY3RBZGRSZXByZXNlbnRlZCcsXHJcbiAgICAgICAgQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWQgPSAnYWN0Q3JlYXRlQW5kQWRkUmVwcmVzZW50ZWQnXHJcbiAgICB9XHJcblxyXG4gICAgZW51bSBMb2dpbkZpZWxkTmFtZXMge1xyXG4gICAgICAgIGxvZ2luID0gJ0xvZ2luJyxcclxuICAgICAgICBwYXNzd29yZCA9ICdQYXNzd29yZCdcclxuICAgIH1cclxuXHJcbiAgICBlbnVtIE5ld1VzZXJGaWVsZE5hbWVzIHtcclxuICAgICAgICB0eXBFc3UgPSAnVHlwRXN1JyxcclxuICAgICAgICBpYyA9ICdJYycsXHJcbiAgICAgICAgaXNWYXRQYXllciA9ICdJc1ZhdFBheWVyJyxcclxuICAgICAgICBkaWMgPSAnRGljJyxcclxuICAgICAgICBvYmNob2RuaUptZW5vID0gJ09iY2hvZG5pSm1lbm8nLFxyXG4gICAgICAgIHR5cE9yZyA9ICdUeXBPcmcnLFxyXG4gICAgICAgIHRpdHVsUHJlZCA9ICdUaXR1bFByZWQnLFxyXG4gICAgICAgIHRpdHVsWmEgPSAnVGl0dWxaYScsXHJcbiAgICAgICAgam1lbm8gPSAnSm1lbm8nLFxyXG4gICAgICAgIHByaWptZW5pID0gJ1ByaWptZW5pJyxcclxuICAgICAgICBkYXR1bU5hcm96ZW5pID0gJ0RhdHVtTmFyb3plbmknLFxyXG4gICAgICAgIHVsaWNlID0gJ1VsaWNlJyxcclxuICAgICAgICAvL2Npc2xvID0gJ0Npc2xvJyxcclxuICAgICAgICBjaXNsb1BvcGlzbmUgPSAnQ2lzbG9Qb3Bpc25lJyxcclxuICAgICAgICBjaXNsb09yaWVudGFjbmkgPSAnQ2lzbG9PcmllbnRhY25pJyxcclxuICAgICAgICBwc2MgPSAnUHNjJyxcclxuICAgICAgICBvYmVjID0gJ09iZWMnLFxyXG4gICAgICAgIHN0YXQgPSAnU3RhdCcsXHJcbiAgICAgICAgZW1haWwgPSAnRW1haWwnLFxyXG4gICAgICAgIHRlbGVmb24gPSAnVGVsZWZvbicsXHJcbiAgICAgICAgdXNlRW1haWxOb3RpZmljYXRpb25zID0gJ1VzZUVtYWlsTm90aWZpY2F0aW9ucycsXHJcbiAgICAgICAgdXNlU21zTm90aWZpY2F0aW9ucyA9ICdVc2VTbXNOb3RpZmljYXRpb25zJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlhbG9nIHByb3bDoXrDoW7DrSDDusSNdMWvIHZlxZllam7DqWhvIHXFvml2YXRlbGUuXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgVEZlaWtcclxuICAgICAqIEBzaW5jZSA0ODYuMS4wLjQ1MlxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQWRkUmVwcmVzZW50UHVibGljVXNlckRsZyBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmFsaWTDoXRvcnkgZm9ybXVsw6HFmWUgcHJvIHDFmWlwb2plbsOtIGV4aXN0dWrDrWPDrWhvIMO6xI10dS5cclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTG9naW5Gb3JtVmFsaWRhdG9ycz86IG9iamVjdDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmFsaWTDoXRvcnkgZm9ybXVsw6HFmWUgcHJvIHDFmWlwb2plbsOtIG5vdsOpaG8gw7rEjXR1LlxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBOZXdVc2VyRm9ybVZhbGlkYXRvcnM/OiBvYmplY3Q7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5haywgemRhIGplIHDFmWlwcmF2ZW5hIFNNUyBicsOhbmEuXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJc1Ntc0dhdGV3YXlFbmFibGVkPzogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29uZmlndXJhY2UgcMWZaWhsYcWhb3ZhY8OtIG9icmF6b3ZreS5cclxuICAgICAgICAgKiBAdHlwZSB7R1B1YmxpY0xvZ2luQ29uZmlnRHRvfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUHVibGljTG9naW5Db25maWc/OiBHUHVibGljTG9naW5Db25maWdEdG87XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5haywgemRhIG3DoSBiw710IGsgZGlzcG96aWNpIHDFmWlwb2plbsOtIGV4aXN0dWrDrWPDrWhvIMO6xI10dS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElzQ29ubmVjdEV4aXN0aW5nQWNjb3VudEF2YWlsYWJsZT86IGJvb2xlYW47XHJcblxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiDDmmRhamUgYWt0dcOhbG7EmyBwxZlpaGzDocWhZW7DqWhvIHXFvml2YXRlbGUuXHJcbiAgICAgICAgLy8gKiBAdHlwZSB7R1B1YmxpY1VzZXJEdG99XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgcmVhZG9ubHkgUHVibGljVXNlckN1cnJlbnQ/OiBHUHVibGljVXNlckR0bztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRm9ybXVsw6HFmSBwcm8gcMWZaXBvamVuw60gZXhpc3R1asOtY8OtaG8gw7rEjXR1LlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJExvZ2luRm9ybT86IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZvcm11bMOhxZkgcHJvIHDFmWlwb2plbsOtIG5vdsOpaG8gw7rEjXR1LlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJE5ld1VzZXJGb3JtPzogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT25Db250ZW50UmVhZHkuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDAzLjA5LjIwMjFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZ5dHZvxZllbsOtIGFrY8OtLlxyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZUFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZ5dHZvxZllbsOtIG1lbnUuXHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlTWVudSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gMDYuMTEuMjAyNCAtIFRGZWlrXHJcbiAgICAgICAgICAgIC8vIFDFmWlwb2plbsOtIGV4aXN0dWrDrWPDrWhvIMO6xI10dSBuYXbDoXrDoW5vIG5hIHBhcmFtZXRyLlxyXG4gICAgICAgICAgICAvLyBodHRwczovL3BoYWJyaWNhdG9yLmdvcmRpYy5jei9UMzgxMDRcclxuICAgICAgICAgICAgaWYgKHRoaXMuSXNDb25uZWN0RXhpc3RpbmdBY2NvdW50QXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3JtdWzDocWZIHDFmWlwb2plbsOtIGV4aXN0dWrDrWPDrWhvIMO6xI10dS5cclxuICAgICAgICAgICAgICAgIHRoaXMuJExvZ2luRm9ybSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAuZ2Zvcm0oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjcmVhdGVGcm9tJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DcmVhdGVMb2dpbkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWtjZSBwcm9wb2plbsOtIMO6xI10dS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0KCQubmV3RGl2KCkuZ2J1dHRvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICdqcmVzOjMyMTAwMjU4JywgLy9SQyAzMjEwMDI1OCA6IFDFmWlwb2ppdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tBY3Rpb25OYW1lcy5BZGRSZXByZXNlbnRlZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIDE2LjExLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgLy8gVXByYXZlbsOtIGF1dG9jb21wbGV0ZSBhdHJpYnV0dSBkbGUgYXBwbHUuXHJcbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vZG9jdW1lbnRhdGlvbi9zZWN1cml0eS9wYXNzd29yZF9hdXRvZmlsbC9lbmFibGluZ19wYXNzd29yZF9hdXRvZmlsbF9vbl9hbl9odG1sX2lucHV0X2VsZW1lbnRcclxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vcGhhYnJpY2F0b3IuZ29yZGljLmN6L1QxNTgwNFxyXG4gICAgICAgICAgICAgICAgJCgnaW5wdXQnLCB0aGlzLiRMb2dpbkZvcm0uZmluZEZpZWxkcyhMb2dpbkZpZWxkTmFtZXMubG9naW4pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhdXRvY29tcGxldGUnLCAndXNlcm5hbWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdpbnB1dCcsIHRoaXMuJExvZ2luRm9ybS5maW5kRmllbGRzKExvZ2luRmllbGROYW1lcy5wYXNzd29yZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2F1dG9jb21wbGV0ZScsICdjdXJyZW50LXBhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuTG9naW5Gb3JtVmFsaWRhdG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJExvZ2luRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQoJ21vZGVsJywgJ3ZhbGlkYXRvcnMnLCB0aGlzLkxvZ2luRm9ybVZhbGlkYXRvcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBVdGlscy5Gb3JtLm1hcmtSZXF1aXJlZCh0aGlzLiRMb2dpbkZvcm0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdqcmVzOjMyMTAwMjU3JyAgLy9SQyAzMjEwMDI1NyA6IFDFmWlwb2plbsOtIGV4aXN0dWrDrWPDrWhvIMO6xI10dVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCh0aGlzLiRMb2dpbkZvcm0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGb3JtdWzDocWZIHZ5dHZvxZllbsOtIG5vdsOpaG8gw7rEjXR1LlxyXG4gICAgICAgICAgICB0aGlzLiROZXdVc2VyRm9ybSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcclxuICAgICAgICAgICAgICAgICAgICAnY3JlYXRlRnJvbScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DcmVhdGVOZXdVc2VyRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFrY2UgcHJvcG9qZW7DrSDDusSNdHUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoJC5uZXdEaXYoKS5nYnV0dG9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICdqcmVzOjMyMTAwMjU2JywgLy9SQyAzMjEwMDI1NiA6IFZ5dHZvxZlpdCBhIHDFmWlwb2ppdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW0FjdGlvbk5hbWVzLkNyZWF0ZUFuZEFkZFJlcHJlc2VudGVkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLk5ld1VzZXJGb3JtVmFsaWRhdG9ycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kTmV3VXNlckZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdmaWVsZCgnbW9kZWwnLCAndmFsaWRhdG9ycycsIHRoaXMuTmV3VXNlckZvcm1WYWxpZGF0b3JzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBVdGlscy5Gb3JtLm1hcmtSZXF1aXJlZCh0aGlzLiROZXdVc2VyRm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdqcmVzOjMyMTAwMjU1JywgLy9SQyAzMjEwMDI1NSA6IFDFmWlwb2plbsOtIG5vdsOpaG8gw7rEjXR1XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCh0aGlzLiROZXdVc2VyRm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZU5ld1VzZXJGb3JtRW5hYmxlZCgpXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gYWtjZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMDMuMDkuMjAyMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEFjdGlvbk5hbWVzLkFkZFJlcHJlc2VudGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICdqcmVzOjMyMTAwMjU5JywgLy9SQyAzMjEwMDI1OSA6IFDFmWlwb2ppdCBleGlzdHVqw61jw60gw7rEjWV0XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyhjb250ZW50LlByaXBvaml0RXhpc3R1amljaVVjZXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogQWN0aW9uTmFtZXMuQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogJ2pyZXM6MzIxMDAyNjAnLCAvL1JDIDMyMTAwMjYwIDogVnl0dm/FmWl0IGEgcMWZaXBvaml0IG5vdsO9IMO6xI1ldFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcoY29udGVudC5WeXR2b3JpdEFQcmlwb2ppdE5vdnlVY2V0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oUHJlZmFicy5BY3Rpb25zLlphdnJpdENvbnRlbnQoKSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gbWVudS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMDMuMDkuMjAyMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlTWVudSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcclxuICAgICAgICAgICAgLy8gRG9sbsOtIG1lbnUuXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihhY3Rpb25zLmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb25zW1ByZWZhYnMuQWN0aW9ucy5OYW1lcy5aYXZyaXRDb250ZW50XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gUMWZaXBvamVuw60gZXhpc3R1asOtY8OtaG8gw7rEjXR1LlxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSB2b3JtdWzDocWZZSBwcm8gcMWZaXBvamVuw60gZXhpc3R1asOtY8OtaG8gw7rEjXR1LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAwNi4wOS4yMDIxXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0Zvcm1zLkZvcm19XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBDcmVhdGVMb2dpbkZvcm0oKTogRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCdqcmVzOjMyMTAwMjUzJykgLy9SQyAzMjEwMDI1MyA6IFXFvml2YXRlbFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKCdnc3RyaW5nYm94Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IExvZ2luRmllbGROYW1lcy5sb2dpbixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogJ21vZGVsLnswfSA9IHZhbHVlJy5mb3JtYXQoR0FkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuTG9naW4pLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWxsQ2hlY2s6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygnanJlczozMjEwMDI1NCcpIC8vUkMgMzIxMDAyNTQgOiBIZXNsb1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKCdnc3RyaW5nYm94JywgUHJlZmFicy5HU3RyaW5nQm94LnBhc3N3b3JkKHtcclxuICAgICAgICAgICAgICAgICAgICBvYnNsb3V6aWxKc2VtU2JpcmFuaUhvZG5vdFpQb2xpY2VrVGFrQWJ5TmVtb2hsTmFzdGF0UHJvYmxlbVNOZWFrdHVhbG5pbVNpZnJvdmFjaW1LbGljZW06IHRydWVcclxuICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTG9naW5GaWVsZE5hbWVzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiAnbW9kZWwuezB9ID0gdmFsdWUnLmZvcm1hdChHQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG9OYW1lcy5QYXNzd29yZClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnLDoXTDrSBkYXRhIGZvcm11bMOhxZllIHBybyBwcm92w6F6w6Fuw60gZXhpc3R1asOtY8OtaG8gw7rEjXR1LlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMDYuMDkuMjAyMVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxHQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG8+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgR2V0TG9naW5Gb3JtVmFsdWVzKCk6IEpRdWVyeS5Qcm9taXNlPEdBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJJbnB1dER0bz4ge1xyXG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9IHRoaXMuJExvZ2luRm9ybTtcclxuXHJcbiAgICAgICAgICAgIGlmICghVXRpbHMuV2lkZ2V0RXhpc3RzKCdnZm9ybScsICRmb3JtKSB8fCAhJGZvcm0uZ2Zvcm0oJ2lzVmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8R0FkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvPigpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByZWZhYnMuR1N0cmluZ0JveC51cGRhdGVDaGlwZXJQdWJsaWNLZXlzKCRmb3JtKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlczogR0FkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZCgnbW9kZWwnLCAnY29sbGVjdCcsIHZhbHVlcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPEdBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJJbnB1dER0bz4oKS5yZXNvbHZlKHZhbHVlcykucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm92w6HFvmUgZXh0ZXJuw60gw7rEjWV0IG5hbGV6ZW7DvSBkbGUgbG9naW51IGEgaGVzbGEgcyBha3R1w6FsbsSbIHDFmWlobMOhxaFlbsO9bSDDusSNdGVtLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAwMy4wOS4yMDIxXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG99IGlucHV0XHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGJvb2xlYW4+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VyKFxyXG4gICAgICAgICAgICBpbnB1dDogR0FkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvXHJcbiAgICAgICAgKTogSlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsPGJvb2xlYW4+KCdBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXInLCB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dDogaW5wdXRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcm92w6HFvmUgZXh0ZXJuw60gw7rEjWV0IG5hbGV6ZW7DvSBkbGUgbG9naW51IGEgaGVzbGEgcyBha3R1w6FsbsSbIHDFmWlobMOhxaFlbsO9bSDDusSNdGVtLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMDYuMDkuMjAyMVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTx2b2lkPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFByaXBvaml0RXhpc3R1amljaVVjZXQoKTogSlF1ZXJ5LlByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGFzaElkID0gJ3ByaXBvaml0RXhpc3R1amljaVVjZXRNZXNzYWdlJztcclxuICAgICAgICAgICAgdGhpcy5oaWRlRmxhc2goZmxhc2hJZCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5HZXRMb2dpbkZvcm1WYWx1ZXMoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGdldExvZ2luRm9ybVZhbHVlc1JldHVyblZhbHVlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkFkZFJlcHJlc2VudGVkUHVibGljVXNlcihnZXRMb2dpbkZvcm1WYWx1ZXNSZXR1cm5WYWx1ZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChhZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJSZXR1cm5WYWx1ZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJSZXR1cm5WYWx1ZXMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8dm9pZD4oKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBmbGFzaElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdqcmVzOjMyMTAwMjYxJyAvL1JDIDMyMTAwMjYxIDogw5rEjWV0IGplIMO6c3DEm8WhbsSbIHDFmWlwb2plbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Rmxhc2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZmxhc2hJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnanJlczozMjEwMDI2MicgLy9SQyAzMjEwMDI2MiA6IFDFmWlwb2plbsOtIMO6xI10dSBzZSBuZXpkYcWZaWxvLlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBWeXR2b8WZZW7DrW5vdsOpaG8gw7rEjXR1XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBub3bDvSBleHRlcm7DrSDDusSNZXQgYSBwcm92w6HFvmUgamVqIHMgYWt0dcOhbG7EmyBwxZlpaGzDocWhZW7DvW0gw7rEjXRlbS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMDMuMDkuMjAyMVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtHQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG99IGlucHV0XHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGJvb2xlYW4+fSB0cnVlIHYgcMWZw61wYWTEmyB2eXR2b8WZZW7DrSB6w6FzdHVwdSBzZSB6YWxvxb5lbsOtbSBub3bDqWhvIHXFvml2YXRlbGUsIGZhbHNlIHDFmWkgdnl0dm/FmWVuw60gesOhc3R1cHUgemEgZXhpc3R1asOtY8OtaG8gdcW+aXZhdGVsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VyKFxyXG4gICAgICAgICAgICBpbnB1dDogR0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvXHJcbiAgICAgICAgKTogSlF1ZXJ5LlByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsPGJvb2xlYW4+KCdDcmVhdGVBbmRBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXInLCB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dDogaW5wdXRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSB2b3JtdWzDocWZZSBwcm8gcMWZaXBvamVuw60gbm92w6lobyDDusSNdHUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDA2LjA5LjIwMjFcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIENyZWF0ZU5ld1VzZXJGb3JtKCk6IEZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICBjb25zdCBkYk1vZGVsID0gR2luaXMuRGJNb2RlbDtcclxuICAgICAgICAgICAgY29uc3QgcHVibGljTG9naW5Db25maWcgPSB0aGlzLlB1YmxpY0xvZ2luQ29uZmlnID8/IHt9O1xyXG4gICAgICAgICAgICBjb25zdCBhbGxvd2VkVmFsdWVzVHlwRXN1ID0gcHVibGljTG9naW5Db25maWcuYWxsb3dlZFZhbHVlcz8udHlwRXN1O1xyXG4gICAgICAgICAgICBjb25zdCBpc05hbWVBbmRTdXJuYW1lUmVxdWlyZWRGb3JFZGl0ID0gcHVibGljTG9naW5Db25maWcuaXNOYW1lQW5kU3VybmFtZVJlcXVpcmVkRm9yRWRpdDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHR5cF9lc3VfaXRlbXMgPSBbXHJcbiAgICAgICAgICAgICAgICBkYk1vZGVsLkdHaW5jZXN1RW51bS5wcmF2bmlja2Ffb3NvYmEsXHJcbiAgICAgICAgICAgICAgICBkYk1vZGVsLkdHaW5jZXN1RW51bS5meXpfb3NvYmFfb3N2Y1xyXG4gICAgICAgICAgICBdLmZpbHRlcihpID0+ICFhbGxvd2VkVmFsdWVzVHlwRXN1IHx8IGFsbG93ZWRWYWx1ZXNUeXBFc3UuaW5jbHVkZXMoaSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gMTQuMDQuMjAyNSAtIFRGZWlrXHJcbiAgICAgICAgICAgIC8vIE5ldXLEjWVudSBwxZlpZMOhdjhtIGFieSBuZWJ5bG8gcHLDoXpkw6kgcG9sw63EjWtvIHBva3VkIGplIG5ldXLEjWVubyBuYXN0YXZlbm8geiBBUkVTLlxyXG4gICAgICAgICAgICB0eXBfZXN1X2l0ZW1zLnB1c2goZGJNb2RlbC5HR2luY2VzdUVudW0ubmV1cmNlbm8pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IG5ldyBGb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCdqcmVzOjMyMTAwMjYzJykgLy9SQyAzMjEwMDI2MyA6IFphc3R1cG92YW7DvSBzdWJqZWt0XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCdqcmVzOjMyMTAwMjY0JykgLy9SQyAzMjEwMDI2NCA6IFR5cCBzdWJqZWt0dVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkPERhdGEuUmVhZGVycy5HaW5jZXN1RHRvPignZ3NlbGVjdGJveCcsIFByZWZhYnMuU2VsZWN0LmdpbmNlc3UoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IE5ld1VzZXJGaWVsZE5hbWVzLnR5cEVzdSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogJ21vZGVsLnswfSA9IHZhbHVlLnsxfScuZm9ybWF0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG9OYW1lcy5UeXBFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERhdGEuUmVhZGVycy5HaW5jZXN1RHRvTmFtZXMudHlwX2VzdVxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9lc3U6IHR5cF9lc3VfaXRlbXNbMF1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2VzdTogdHlwX2VzdV9pdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgVmFsaWRhdG9ycy5SZXF1aXJlZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlOiBEYXRhLlJlYWRlcnMuR2luY2VzdUR0byB8IHVuZGVmaW5lZCB8IG51bGwsIHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE0LjA0LjIwMjUgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5ldXLEjWVubyBiZXJ1IGpha28gbmV2eXBsbsSbbm8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlPy50eXBfZXN1ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZTogKGV2ZW50LCBpbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY29uc3QgZGVmYXVsdE9yZyA9IHRoaXMuR2V0RGVmYXVsdFR5cGVPcmcoaW5wdXQudmFsdWU/LnR5cF9lc3UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChkZWZhdWx0T3JnICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY29uc3QgJGZvcm0gPSB0aGlzLiROZXdVc2VyRm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKFV0aWxzLldpZGdldEV4aXN0cygnZ2Zvcm0nLCAkZm9ybSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICRmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmZpbmRGaWVsZHMoTmV3VXNlckZpZWxkTmFtZXMudHlwT3JnKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5nZmllbGQ8R0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvPihcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgJ21vZGVsJyxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgJ2FwcGx5JyxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgVHlwT3JnOiBkZWZhdWx0T3JnXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLlVwZGF0ZU5ld1VzZXJGb3JtRW5hYmxlZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coJ2pyZXM6MzIxMDAyNjUnKSAvL1JDIDMyMTAwMjY1IDogScSMT1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKCdnc3RyaW5nYm94Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IE5ld1VzZXJGaWVsZE5hbWVzLmljLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiAnbW9kZWwuezB9ID0gdmFsdWUnLmZvcm1hdChHQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG9OYW1lcy5JYyksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGNoYW5nZU9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpYyA9IGNoYW5nZU9iaj8udmFsdWU/LnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkdldEFuZEFwcGx5QXJlc0RhdGEoaWMsIHRoaXMuR2V0UHJpcG9qZW5pTm92ZWhvVWN0dVBvdXplSUMoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZ2ktYWNjZXB0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnYXBwbHlBcmVzRGF0YScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiAnanJlczozMjEwMDI2NicsIC8vUkMgMzIxMDAyNjYgOiBOYXBsbml0IGhvZG5vdHkgeiByZWpzdMWZw61rdS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBvYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKG9iamVjdD8uZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghVXRpbHMuV2lkZ2V0RXhpc3RzKCdnZmllbGQnLCAkZmllbGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGljID0gJGZpZWxkLmdmaWVsZCgnZ2V0VmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuR2V0QW5kQXBwbHlBcmVzRGF0YShpYywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoJ2djaGVjaycsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBOZXdVc2VyRmllbGROYW1lcy5pc1ZhdFBheWVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBgbW9kZWwuJHtHQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG9OYW1lcy5Jc1ZhdFBheWVyfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ2pyZXM6MzIxMDAzNTgnLCAvL1JDIDMyMTAwMzU4IDogUGzDoXRjZSBEUEhcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldmVudCwgaW5wdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZU5ld1VzZXJGb3JtRW5hYmxlZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCdqcmVzOjMyMTAwMjY3JykgLy9SQyAzMjEwMDI2NyA6IERJxIxcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZCgnZ3N0cmluZ2JveCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBOZXdVc2VyRmllbGROYW1lcy5kaWMsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6ICdtb2RlbC57MH0gPSB2YWx1ZScuZm9ybWF0KEdDcmVhdGVBbmRBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJJbnB1dER0b05hbWVzLkRpYylcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygnanJlczozMjEwMDI2OCcpIC8vUkMgMzIxMDAyNjggOiBKbcOpbm8vT2JjaG9kbsOtIGZpcm1hXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoJ2dzdHJpbmdib3gnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTmV3VXNlckZpZWxkTmFtZXMub2JjaG9kbmlKbWVubyxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogJ21vZGVsLnswfSA9IHZhbHVlJy5mb3JtYXQoR0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuT2JjaG9kbmlKbWVubylcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBuZXcgVmFsaWRhdG9ycy5SZXF1aXJlZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9dXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coJ2pyZXM6MzIxMDAyNjknKSAvL1JDIDMyMTAwMjY5IDogVHlwIG9yZ2FuaXphY2VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZDxEYXRhLlJlYWRlcnMuR2luY3R5b0R0bz4oJ2dzZWxlY3Rib3gnLCBQcmVmYWJzLlNlbGVjdC5naW5jdHlvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBOZXdVc2VyRmllbGROYW1lcy50eXBPcmcsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6ICdtb2RlbC57MH0gPSB2YWx1ZS57MX0nLmZvcm1hdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgR0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuVHlwT3JnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEYXRhLlJlYWRlcnMuR2luY3R5b0R0b05hbWVzLnR5cF9vcmdcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9lc3U6IG5ldyBGb3Jtcy5EZXBlbmRlbmN5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMudHlwRXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0YS5SZWFkZXJzLkdpbmNlc3VEdG9OYW1lcy50eXBfZXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgVmFsaWRhdG9ycy5SZXF1aXJlZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlOiBEYXRhLlJlYWRlcnMuR2luY3R5b0R0byB8IHVuZGVmaW5lZCB8IG51bGwsIHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE0LjA0LjIwMjUgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5ldXLEjWVubyBiZXJ1IGpha28gbmV2eXBsbsSbbm8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlPy50eXBfb3JnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHR5cF9vcmc6IDM0IC8vIHByw6F2LiBvc29iYSAtIHMuci5vLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdqcmVzOjMyMTAwMzkwJyAvL1JDIDMyMTAwMzkwIDogWmFzdHVwdWrDrWPDrSBvc29iYVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coJ2pyZXM6MzIxMDAzOTEnKSAvL1JDIDMyMTAwMzkxIDogVGl0dWx5IHDFmWVkLCB6YSBqbcOpbmVtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoJ2dzdHJpbmdib3gnLCAndy02Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IE5ld1VzZXJGaWVsZE5hbWVzLnRpdHVsUHJlZCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuVGl0dWxQcmVkfSA9IHZhbHVlYFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiBwdWJsaWNVc2VyQ3VycmVudD8udGl0dWxQcmVkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKCdnc3RyaW5nYm94JywgJ3ctNicsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBOZXdVc2VyRmllbGROYW1lcy50aXR1bFphLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBgbW9kZWwuJHtHQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG9OYW1lcy5UaXR1bFphfSA9IHZhbHVlYFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiBwdWJsaWNVc2VyQ3VycmVudD8udGl0dWxaYVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coJ2pyZXM6MzIxMDAzODgnKSAvL1JDIDMyMTAwMzg4IDogSm3DqW5vXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoJ2dzdHJpbmdib3gnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTmV3VXNlckZpZWxkTmFtZXMuam1lbm8sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dDcmVhdGVBbmRBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJJbnB1dER0b05hbWVzLkptZW5vfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogcHVibGljVXNlckN1cnJlbnQ/LmptZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IGlzTmFtZUFuZFN1cm5hbWVSZXF1aXJlZEZvckVkaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBbbmV3IFZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB2b2lkIDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCdqcmVzOjMyMTAwMzg5JykgLy9SQyAzMjEwMDM4OSA6IFDFmcOtam1lbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoJ2dzdHJpbmdib3gnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTmV3VXNlckZpZWxkTmFtZXMucHJpam1lbmksXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dDcmVhdGVBbmRBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJJbnB1dER0b05hbWVzLlByaWptZW5pfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogcHVibGljVXNlckN1cnJlbnQ/LnByaWptZW5pLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IGlzTmFtZUFuZFN1cm5hbWVSZXF1aXJlZEZvckVkaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBbbmV3IFZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB2b2lkIDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCdqcmVzOjMyMTAwMzkyJykgLy9SQyAzMjEwMDM5MiA6IERhdHVtIG5hcm96ZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IE5ld1VzZXJGaWVsZE5hbWVzLmRhdHVtTmFyb3plbmksXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGBtb2RlbC4ke0dDcmVhdGVBbmRBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJJbnB1dER0b05hbWVzLkRhdHVtTmFyb3plbml9ID0gdmFsdWVgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IHB1YmxpY1VzZXJDdXJyZW50Py5kYXR1bU5hcm96ZW5pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCdqcmVzOjMyMTAwMjcwJykgLy9SQyAzMjEwMDI3MCA6IEFkcmVzYSBzw61kbGFcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coJ2pyZXM6MzIxMDAyNzEnKSAvL1JDIDMyMTAwMjcxIDogVWxpY2UsIMSNw61zbG9cclxuICAgICAgICAgICAgICAgIC8vIFbEm3TFoWluYSByZWdpc3RyYWPDrSBieSBtxJtsYSBiw710IHDFmWVzIGnEjW8gYSBhcmVzLCB0dWTDrcW+IHXFvml2YXRlbCBuZWJ1ZGUgemFkw6F2YXQgYWRyZXN1IHJ1xI1uxJsgYSB0YWsgbmXFmWXFocOtbSBhZHJlc3UgcMWZZXMgZ29vZ2xlLlxyXG4gICAgICAgICAgICAgICAgLy8gSSB0YWsgc3TDoWxlIHBvdcW+w612w6FtIHByZWZhYiB6IHJlZ2lzdHJhNG7DrWhvIGZvcm11bMOhxZllLCBhYnljaCBzZSBrIHBvbMOtNGt1IGNob3ZhbCBzdGVqbsSbLlxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKCdnc2VsZWN0Ym94JywgJ3ctOCcsIG5ldyBBcGkuR1BsYWNlcygpLnByZWZhYigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTmV3VXNlckZpZWxkTmFtZXMudWxpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6ICdtb2RlbC57MH0gPSB2YWx1ZScuZm9ybWF0KEdDcmVhdGVBbmRBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJJbnB1dER0b05hbWVzLlVsaWNlKSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICYmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAodmFsdWUgYXMgYW55KS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmcubWFpbl90ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5OiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZCgnZ2Zvcm1hdHRlZGJveCcsICd3LTQnLCBQcmVmYWJzLkdGb3JtYXR0ZWRCb3guc3RyZWV0TnJTaW5nbGUoR0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuQ1BvcCwgR0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuQ09yKSwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogTmV3VXNlckZpZWxkTmFtZXMuY2lzbG8sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBtb2RlbDogJ21vZGVsLnswfSA9IHZhbHVlJy5mb3JtYXQoJ2Npc2xvJyksXHJcbiAgICAgICAgICAgICAgICAvLyAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbmV3IFZhbGlkYXRvcnMuUmVxdWlyZWQoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBzdG9wcGluZzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICBdXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoJ2dzdHJpbmdib3gnLCAndy0yJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IE5ld1VzZXJGaWVsZE5hbWVzLmNpc2xvUG9waXNuZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuQ1BvcH0gPSB2YWx1ZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdqcmVzOjMyMTAwMzI3JyAvL1JDIDMyMTAwMzI3IDogxIwucFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZCgnZ3N0cmluZ2JveCcsICd3LTInLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTmV3VXNlckZpZWxkTmFtZXMuY2lzbG9PcmllbnRhY25pLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBgbW9kZWwuJHtHQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG9OYW1lcy5DT3J9ID0gdmFsdWVgLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnanJlczozMjEwMDMyOCcgLy9SQyAzMjEwMDMyOCA6IMSMLm9yXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygnanJlczozMjEwMDI3MicpIC8vUkMgMzIxMDAyNzIgOiBQU8SMLCBPYmVjXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoJ2dmb3JtYXR0ZWRib3gnLCAndy00Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IE5ld1VzZXJGaWVsZE5hbWVzLnBzYyxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogJ21vZGVsLnswfSA9IHZhbHVlJy5mb3JtYXQoR0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuUHNjKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZXI6IChzdHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHN0ci5yZXBsYWNlKC9cXEQvZywgJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiAodmFsdWUsIGlzRWRpdGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA8PSAzID8gdmFsdWUgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuc2xpY2UoMCwgMykgKyAnICcgKyB2YWx1ZS5zbGljZSgzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKCdnc3RyaW5nYm94JywgJ3ctOCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBOZXdVc2VyRmllbGROYW1lcy5vYmVjLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiAnbW9kZWwuezB9ID0gdmFsdWUnLmZvcm1hdChHQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG9OYW1lcy5PYmVjKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coJ2pyZXM6MzIxMDAyNzMnKSAvL1JDIDMyMTAwMjczIDogU3TDoXRcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZDxEYXRhLlJlYWRlcnMuR2luY3N0YUR0bz4oJ2dzZWxlY3Rib3gnLCBQcmVmYWJzLlNlbGVjdC5naW5jc3RhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBOZXdVc2VyRmllbGROYW1lcy5zdGF0LFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiAnbW9kZWwuezB9ID0gdmFsdWUuezF9Jy5mb3JtYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdDcmVhdGVBbmRBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJJbnB1dER0b05hbWVzLlN0YXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERhdGEuUmVhZGVycy5HaW5jc3RhRHRvTmFtZXMuc3RhdFxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0OiA0MlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oJ2pyZXM6MzIxMDAyNzQnKSAvL1JDIDMyMTAwMjc0IDogS29udGFrdG7DrSDDumRhamVcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coJ2pyZXM6MzIxMDAyNzUnKSAvL1JDIDMyMTAwMjc1IDogRW1haWxcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZCgnZ3N0cmluZ2JveCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBOZXdVc2VyRmllbGROYW1lcy5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogJ21vZGVsLnswfSA9IHZhbHVlJy5mb3JtYXQoR0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuRW1haWwpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0VHlwZTogJ2VtYWlsJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIDIwLjExLjIwMjMgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgLy8gUMWZaWTDoW4gc291aGxhcyBwcm8gbm90aWZpa2FjZSBlbWFpbGVtLlxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoJ2djaGVjaycsIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ2pyZXM6MzIxMDAzNTYnLCAvL1JDIDMyMTAwMzU2IDogT2Rlc8OtbGF0IG5vdGlmaWthY2Ugc291dmlzZWrDrWPDrSBzIGVsZWt0cm9uaWNrw71tIHZ5xZlpem92w6Fuw61tIGFnZW5keSBzIMO6xZlhZGVtLlxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IE5ld1VzZXJGaWVsZE5hbWVzLnVzZUVtYWlsTm90aWZpY2F0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuVXNlRW1haWxOb3RpZmljYXRpb25zfSA9IHZhbHVlYCxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdqcmVzOjMyMTAwMjc2JywgLy9SQyAzMjEwMDI3NiA6IFRlbGVmb25cclxuICAgICAgICAgICAgICAgICAgICBoaW50OiBwdWJsaWNMb2dpbkNvbmZpZy5waG9uZU51bWJlckhpbnQ/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZCgnZ3N0cmluZ2JveCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBOZXdVc2VyRmllbGROYW1lcy50ZWxlZm9uLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiAnbW9kZWwuezB9ID0gdmFsdWUnLmZvcm1hdChHQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG9OYW1lcy5UZWxlZm9uKSxcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFR5cGU6ICd0ZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IHB1YmxpY0xvZ2luQ29uZmlnLmlzUGhvbmVOdW1iZXJSZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFtuZXcgVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHZvaWQgMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5Jc1Ntc0dhdGV3YXlFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKCdnY2hlY2snLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnanJlczozMjEwMDM1NycsIC8vUkMgMzIxMDAzNTcgOiBPZGVzw61sYXQgbm90aWZpa2FjZSBwxZllcyBTTVMgc291dmlzZWrDrWPDrSBzIGVsZWt0cm9uaWNrw71tIHZ5xZlpem92w6Fuw61tIGFnZW5keSBzIMO6xZlhZGVtLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBOZXdVc2VyRmllbGROYW1lcy51c2VTbXNOb3RpZmljYXRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYG1vZGVsLiR7R0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvTmFtZXMuVXNlU21zTm90aWZpY2F0aW9uc30gPSB2YWx1ZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyw6F0w60gZGF0YSBmb3JtdWzDocWZZSBwcm8gcHJvdsOhesOhbsOtIG5vdsOpaG8gw7rEjXR1LlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMDYuMDkuMjAyMVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ZhbGlkYXRlXSAoRGVmYXVsdDogdHJ1ZSkgUMWZw616bmFrLCB6ZGEgc2UgbcOhIGZvcm11bMOhxZkgdmFsaWRvdmF0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxHQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG8+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgR2V0TmV3VXNlckZvcm1WYWx1ZXModmFsaWRhdGU/OiBib29sZWFuKTogSlF1ZXJ5LlByb21pc2U8R0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvPiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gdGhpcy4kTmV3VXNlckZvcm07XHJcblxyXG4gICAgICAgICAgICBpZiAoIVV0aWxzLldpZGdldEV4aXN0cygnZ2Zvcm0nLCAkZm9ybSkgfHwgKHZhbGlkYXRlICE9PSBmYWxzZSAmJiAhJGZvcm0uZ2Zvcm0oJ2lzVmFsaWQnKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPEdDcmVhdGVBbmRBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJJbnB1dER0bz4oKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlczogR0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvID0ge307XHJcblxyXG4gICAgICAgICAgICAkZm9ybVxyXG4gICAgICAgICAgICAgICAgLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZDxHQ3JlYXRlQW5kQWRkUmVwcmVzZW50ZWRQdWJsaWNVc2VySW5wdXREdG8+KCdtb2RlbCcsICdjb2xsZWN0JywgdmFsdWVzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPEdDcmVhdGVBbmRBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJJbnB1dER0bz4oKS5yZXNvbHZlKHZhbHVlcykucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIGEgcHJvdsOhxb5lIG5vdsO9IGV4dGVybsOtIMO6xI1ldCBzIGFrdHXDoWxuxJsgcMWZaWhsw6HFoWVuw71tIMO6xI10ZW0uXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQGF1dGhvciAgVEZlaWtcclxuICAgICAgICAgKiBAZGF0ZSAgICAwNi4wOS4yMDIxXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPHZvaWQ+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgVnl0dm9yaXRBUHJpcG9qaXROb3Z5VWNldCgpOiBKUXVlcnkuUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsYXNoSWQgPSAndnl0dm9yaXRBUHJpcG9qaXROb3Z5VWNldE1lc3NhZ2UnO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVGbGFzaChmbGFzaElkKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkdldE5ld1VzZXJGb3JtVmFsdWVzKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChnZXROZXdVc2VyRm9ybVZhbHVlc1JldHVyblZhbHVlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkNyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcihnZXROZXdVc2VyRm9ybVZhbHVlc1JldHVyblZhbHVlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGNyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlclJldHVyblZhbHVlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMDYuMDEuMjAyMiAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQxZnDrXpuYWsgbmV1csSNaWplIHpkYSBzZSBwxZlpcG9qZW7DrSDDusSNdHUgemRhxZlpbG8sIGFsZSB6ZGEgYnlsIHZ5dHZvxZllbiBub3bDvSAodHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWJvIGRvxaFsbyBrIHByb3BvamVuw60gcyBleGlzdHVqw61jw61tIMO6xI10ZW0gKGZhbHNlKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZmxhc2hJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBjcmVhdGVBbmRBZGRSZXByZXNlbnRlZFB1YmxpY1VzZXJSZXR1cm5WYWx1ZXMgPT09IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnanJlczozMjEwMDI3NycgLy9SQyAzMjEwMDI3NyA6IMOaxI1ldCBqZSDDunNwxJvFoW7EmyB2eXR2b8WZZW4gYSBwxZlpcG9qZW4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2pyZXM6MzIxMDAyODknIC8vUkMgMzIxMDAyODkgOiDDmsSNZXQgamUgw7pzcMSbxaFuxJsgcMWZaXBvamVuLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGbGFzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBmbGFzaElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdqcmVzOjMyMTAwMjc4JyAvL1JDIDMyMTAwMjc4IDogVnl0dm/FmWVuw60gYSBwxZlpcG9qZW7DrSDDusSNdHUgc2UgbmV6ZGHFmWlsby5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hxI10ZSBkYXRhIHogYXJlcyBkbGUgacSNIGEgbmFzdGF2w60gamUgZG8gZm9ybXVsw6HFmWUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDA4LjA5LjIwMjFcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY1xyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3ZlcndyaXRlVXNlclZhbHVlc1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTx2b2lkPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEdldEFuZEFwcGx5QXJlc0RhdGEoXHJcbiAgICAgICAgICAgIGljOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIG92ZXJ3cml0ZVVzZXJWYWx1ZXM6IGJvb2xlYW5cclxuICAgICAgICApOiBKUXVlcnkuUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkdldE5ld1VzZXJGb3JtVmFsdWVzKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHVzZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNQcmF2bmlja2EgPSAodHlwRXN1OiBHaW5pcy5EYk1vZGVsLkdHaW5jZXN1RW51bSB8IHVuZGVmaW5lZCB8IG51bGwpOiBib29sZWFuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0eXBFc3UgPz8gdXNlckRhdGEuVHlwRXN1KSA9PT0gR2luaXMuRGJNb2RlbC5HR2luY2VzdUVudW0ucHJhdm5pY2thX29zb2JhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdQdWJsaWNVc2VyUmVnRm9ybS5nZXRBcmVzUHVibGljVXNlckRhdGEoaWMsIGlzUHJhdm5pY2thKHZvaWQgMCksIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoYXJlc0RhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLiROZXdVc2VyRm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXJlc0RhdGEgfHwgIVV0aWxzLldpZGdldEV4aXN0cygnZ2Zvcm0nLCBmb3JtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPHZvaWQ+KCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkTmFtZXM6IE5ld1VzZXJGaWVsZE5hbWVzW10gPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMuZGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLm9iY2hvZG5pSm1lbm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMudHlwT3JnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLnVsaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTmV3VXNlckZpZWxkTmFtZXMuY2lzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMuY2lzbG9Qb3Bpc25lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLmNpc2xvT3JpZW50YWNuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXdVc2VyRmllbGROYW1lcy5wc2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMub2JlYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXdVc2VyRmllbGROYW1lcy50eXBFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMuaXNWYXRQYXllclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmVzRGF0YVR5cEVzdSA9IGFyZXNEYXRhLnR5cEVzdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNQcmF2bmlja2EoYXJlc0RhdGFUeXBFc3UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGROYW1lcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXdVc2VyRmllbGROYW1lcy50aXR1bFByZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLnRpdHVsWmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLmptZW5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXdVc2VyRmllbGROYW1lcy5wcmlqbWVuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kRmllbGRzKGZpZWxkTmFtZXMudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChpbmRleCwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlVXNlclZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0ICRmaWVsZCA9ICQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhJGZpZWxkLmdmaWVsZCgnaGFzQ2hhbmdlZCcpIHx8ICgkZmllbGQuZ2ZpZWxkKCdvcHRpb24nLCAnbmFtZScpID09PSBOZXdVc2VyRmllbGROYW1lcy50eXBFc3UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvbMOtxI1rYSBrdGVyw6EgbmFzdGF2dWppIG5hcMWZZWQgdnltYcW+dSAocG9rdWQganNlbSB6YWRhbCBuYXDFmWVkIGnEjW8ga2Uga3RlcsOpbXUgamUgREnEjC91bGljZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhIGsgZGFsxaHDrW11IG5lLCBwYWsgbXVzw61tIHZ5bWF6YXQgcMWvdm9kbsOtIMO6ZGFqZSAobm92w6kganNvdSB1bmRlZmluZWQgYSB0YWsgc2UgbmVwxZllcMOtxaFvdSkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZCgnY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQ8R0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvLyogJiB7IGNpc2xvPzogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB9Ki8+KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbW9kZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYXBwbHknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEaWM6IGFyZXNEYXRhLmRpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iY2hvZG5pSm1lbm86IGFyZXNEYXRhLm9iY2hvZG5pSm1lbm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBPcmc6IGFyZXNEYXRhLnR5cE9yZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVsaWNlOiBhcmVzRGF0YS51bGljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE3DrXN0byBjUG9wIGEgY09yIGplIHNvdWhybsSbIMSNw61zbG8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Npc2xvOiBhcmVzRGF0YS5jaXNsbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENQb3A6IGFyZXNEYXRhLmNQb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDT3I6IGFyZXNEYXRhLmNPcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBzYzogYXJlc0RhdGEucHNjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JlYzogYXJlc0RhdGEub2JlYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEptZW5vOiBhcmVzRGF0YS5qbWVubyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByaWptZW5pOiBhcmVzRGF0YS5wcmlqbWVuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRpdHVsUHJlZDogYXJlc0RhdGEudGl0dWxQcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGl0dWxaYTogYXJlc0RhdGEudGl0dWxaYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cEVzdTogYXJlc0RhdGFUeXBFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJc1ZhdFBheWVyOiBhcmVzRGF0YS5Jc1ZhdFBheWVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZXM6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2Zvcm0oJ3dhaXRGb3JWYWx1ZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuVXBkYXRlTmV3VXNlckZvcm1FbmFibGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwZGF0ZU5ld1VzZXJGb3JtRW5hYmxlZFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMjcuMTEuMjAyM1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTx2b2lkPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFVwZGF0ZU5ld1VzZXJGb3JtRW5hYmxlZCgpOiBKUXVlcnkuUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gdGhpcy4kTmV3VXNlckZvcm07XHJcbiAgICAgICAgICAgIGlmICghVXRpbHMuV2lkZ2V0RXhpc3RzKCdnZm9ybScsICRmb3JtKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8dm9pZD4oKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkZm9ybS5nZm9ybSgnd2FpdEZvclZhbHVlcycpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YTogR0NyZWF0ZUFuZEFkZFJlcHJlc2VudGVkUHVibGljVXNlcklucHV0RHRvID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRmaWVsZHMgPSAkZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZmllbGQoJ21vZGVsJywgJ2NvbGxlY3QnLCBkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKCdkaXNhYmxlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZE5hbWVzVG9FbmFibGU6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZXdVc2VyRmllbGROYW1lcy5pY1xyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkdldFByaXBvamVuaU5vdmVob1VjdHVQb3V6ZUlDKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTQuMDQuMjAyNSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIGplIHZ5cGxuxJtubyBJxIxPIChuYcSNdGVuYSBkYXRhIHogQVJFUyksIHRhayBwb3ZvbMOtbSB0eXAgb3JnYW5pemFjZSBhIHR5cCBFU1UgdiBwxZnDrXBhZMSbLCDFvmUgbmVqc291IHZ5cGxuxJtuw6kuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLkljPy50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5UeXBFc3UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChOZXdVc2VyRmllbGROYW1lcy50eXBFc3UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5UeXBPcmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChOZXdVc2VyRmllbGROYW1lcy50eXBPcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5Jc1ZhdFBheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChOZXdVc2VyRmllbGROYW1lcy5kaWMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWVzVG9FbmFibGUucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMudGVsZWZvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLnVzZUVtYWlsTm90aWZpY2F0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLnVzZVNtc05vdGlmaWNhdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXdVc2VyRmllbGROYW1lcy50eXBFc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXdVc2VyRmllbGROYW1lcy5pc1ZhdFBheWVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMub2JjaG9kbmlKbWVubyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLnR5cE9yZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLnRpdHVsUHJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLnRpdHVsWmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXdVc2VyRmllbGROYW1lcy5qbWVubyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLnByaWptZW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMuZGF0dW1OYXJvemVuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLnVsaWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMuY2lzbG9Qb3Bpc25lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMuY2lzbG9PcmllbnRhY25pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMucHNjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV3VXNlckZpZWxkTmFtZXMub2JlYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5ld1VzZXJGaWVsZE5hbWVzLnN0YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGRhdGEuVHlwRXN1ID09PSBHaW5pcy5EYk1vZGVsLkdHaW5jZXN1RW51bS5wcmF2bmlja2Ffb3NvYmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZmllbGROYW1lc1RvRW5hYmxlLnB1c2goTmV3VXNlckZpZWxkTmFtZXMub2JjaG9kbmlKbWVubyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkTmFtZXNUb0VuYWJsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRmaWVsZHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kRmllbGRzKGZpZWxkTmFtZXNUb0VuYWJsZS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZCgnZW5hYmxlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc3Qgcm93ID0gJGZpZWxkcy5maW5kRmllbGRzKE5ld1VzZXJGaWVsZE5hbWVzLm9iY2hvZG5pSm1lbm8pLmdmb3Jtcm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoZmllbGROYW1lc1RvRW5hYmxlLmluY2x1ZGVzKE5ld1VzZXJGaWVsZE5hbWVzLm9iY2hvZG5pSm1lbm8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcm93LnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcm93LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0RGVmYXVsdFR5cGVPcmdcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAYXV0aG9yICBURmVpa1xyXG4gICAgICAgICAqIEBkYXRlICAgIDI3LjExLjIwMjNcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dpbmlzLkRiTW9kZWwuR0dpbmNlc3VFbnVtIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gdHlwRXN1XHJcbiAgICAgICAgICogQHJldHVybnMge251bWJlciB8IG51bGwgfCB1bmRlZmluZWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBHZXREZWZhdWx0VHlwZU9yZyhcclxuICAgICAgICAgICAgdHlwRXN1OiBHaW5pcy5EYk1vZGVsLkdHaW5jZXN1RW51bSB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWRcclxuICAgICAgICApOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdE9yZyA9IHRoaXMuUHVibGljTG9naW5Db25maWc/LmRlZmF1bHRPcmc7XHJcbiAgICAgICAgICAgIGlmICghZGVmYXVsdE9yZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRiTW9kZWwgPSBHaW5pcy5EYk1vZGVsO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cEVzdSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBkYk1vZGVsLkdHaW5jZXN1RW51bS5wcmF2bmlja2Ffb3NvYmE6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRPcmcucHJhdm5pY2thT3NvYmE7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBkYk1vZGVsLkdHaW5jZXN1RW51bS5meXpfb3NvYmE6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRPcmcuZnl6aWNrYU9zb2JhO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgZGJNb2RlbC5HR2luY2VzdUVudW0uZnl6X29zb2JhX29zdmM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRPcmcuZnl6aWNrYU9zb2JhT3N2YztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcsOhdMOtIHDFmcOtem5hayB6ZGEgamUgcG92b2xlbmEgcG91emUgZWRpdGFjZSBJxIwgcHJvIHDFmWlwb2plbsOtIG5vdsOpaG8gw7rEjXR1LlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBhdXRob3IgIFRGZWlrXHJcbiAgICAgICAgICogQGRhdGUgICAgMTQuMDQuMjAyNVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgR2V0UHJpcG9qZW5pTm92ZWhvVWN0dVBvdXplSUMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlB1YmxpY0xvZ2luQ29uZmlnPy5wcmlwb2plbmlOb3ZlaG9VY3R1UG91emVJQyA/PyBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59Il19