declare namespace Gordic.Gui.WebControls.GPublicUserDto {
    /**
     * Validační skupiny.
     *
     * @author  TFeik
     * @since   482.1.0.501
     * @date    19.08.2019
     */
    enum ValidationGroup {
        GROUP_CORRECT_FORMAT = "correct_format",
        GROUP_REGISTRATION = "registration",
        GROUP_CHANGE = "change",
        GROUP_CHANGE_EXTERNAL_USER = "change_external_user",
        GROUP_BUSINESS = "business",
        GROUP_PERSONAL = "personal",
        GROUP_COMPANY = "company"
    }
}
declare namespace Gordic.Gui.WebControls {
    interface GPublicUserRegFormObject {
        name: string;
        formDiv: JQuery<HTMLElement>;
        layoutDescriptor?: string;
        dataPravniFormy: any;
        ciselnikSzrPravniForma: any;
        dataTypOrganizace: any;
        ciselnikTypOrg: any;
        reCeleJmeno?: RegExp;
        reJmenoTrim?: RegExp;
        dataViewTypOrg: any;
        dataViewTypEsu: any;
        container: JQuery<HTMLElement>;
        ciselnikTypEsu: any;
        dataViewStat: any;
        conditionAgreementText?: string;
        ciselnikStat: any;
        ciselnikPsc: any;
        dataViewPsc: any;
        validators?: object;
        initialValues?: GPublicUserDto;
        /**
         * Vytvoří formulář.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        _createForm(): void;
        /**
         * Zobrazí / skryje políčka na formuláři dle typu právní osoby. Hodnota skrytých políček se nemaže.
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {number} [typ_esu] 0 - "neurčeno", 10 - "právnická osoba", 20 - "fyzická osoba", 30 - "fyzická osoba - OSVČ"
         */
        _adjustForm(typ_esu: number | null | undefined): void;
        /**
         * _getTypOrganizace
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {number} typOrganizace
         * @returns {number | null | undefined}
         */
        _getTypOrganizace(typOrganizace: number): number | null | undefined;
        /**
         * _applyAresData
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {any} data
         * @param {boolean} [overwriteUserValues]
         */
        _applyAresData(data: any, overwriteUserValues?: boolean): void;
        /**
         * _getTypOrganizaceDlePravniFormy
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {number | string} pravniForma
         * @returns {number | null}
         */
        _getTypOrganizaceDlePravniFormy(pravniForma: number | string): number | null;
        /**
         * Nastaví výchozí hodnoty, validátory a onChangeListener, který zobrazuje odlišnost hodnoty políčka od hodnoty z Ares.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        _initForm(): void;
        /**
         * Aktualizuje validátory a nastaví required.
         *
         * @author  TFeik
         * @date    10.02.2021
         */
        _updateValidators(): void;
        /**
         * Označí vybrané řádky jako required.
         *
         * @author  TFeik
         * @date    09.02.2021
         */
        _createValidationGroups(): string[];
        /**
         * _getTypOrganizaceObject
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {number} typOrganiace
         * @returns {Gordic.Data.Readers.GinctyoDto | null}
         */
        _getTypOrganizaceObject(typOrganiace: number): Gordic.Data.Readers.GinctyoDto | null;
        /**
         * Vrati primitivní hodnotu z field.
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {JQuery<HTMLElement>} $field
         * @returns {string | number | object | undefined | null}
         */
        _getFieldRawValue($field: JQuery<HTMLElement>): string | number | object | undefined | null;
        /**
         * Nastaví data do formuláře a složí číslo domu a jméno uživatele z několika políček do jedné (cislo, celeJmeno).
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {GPublicUserDto} formData Objekt hodnot, které se uloží do formuláře.
         * @param {JQuery<HTMLElement>} [fields] Políčka, do kterých se data nastavují. Pokud není vyplněno pak se použijí všechny políčka formuláře.
         * @param {FieldSetValueFlags} [flags] Příznaky.
         */
        apply(formData: GPublicUserDto, fields?: JQuery<HTMLElement>, flags?: FieldSetValueFlags): void;
        /**
         * Sezbírá data z formuláře a rozparsuje číslo domu a jméno uživatele z jednoho políčka do více (pro Dto).
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        collect(): JQuery.Promise<GPublicUserDto>;
        /**
         * Zkontroluje zda je formulář validní.
         *
         * @author  TFeik
         * @date    19.08.2019
         *
         * @returns {boolean}
         */
        isValid(): boolean;
    }
    interface GPublicUserRegFormOptions {
        readers?: {
            ciselnikSzrPravniForma?: GSelectBoxOptions<Gordic.ControlsLogic.Interface.GSzrsprfDto>;
            ciselnikStat?: GSelectBoxOptions<Gordic.Data.Readers.GincstaDto>;
            ciselnikPsc?: GSelectBoxOptions<Gordic.Data.Readers.GinspscDto>;
            ciselnikTypOrg?: GSelectBoxOptions<Gordic.Data.Readers.GinctyoDto>;
            ciselnikTypEsu?: GSelectBoxOptions<Gordic.Data.Readers.GincesuDto>;
            gincsta?: any;
            ginspsc?: any;
            szrsprf?: any;
            ginctyo?: any;
            gincesu?: any;
        };
        initialValues?: WebControls.GPublicUserDto;
        /**
         * Klíč pro RSA šifrování.
         * @type {string}
         */
        cipherPublicKey: string;
        /**
         * Příznak, zda se jedná o uživatele registrovaného skrze formulář [true], nebo externíslubu [false].
         * @type {boolean}
         */
        isGinisUser: boolean;
        modifyForm?: (form: Forms.Form) => Forms.Form;
        layoutDescriptor?: string;
        showUseSmsNotificationsField?: boolean;
    }
    /**
     * GPublicUserRegForm
     *
     * @author  TFeik
     * @since   480.1.0.517
     * @date    10.04.2017
     */
    class GPublicUserRegForm {
        private static Logger;
        /**
         * Vrátí inicializovaní logger pro logování.
         *
         * @author  TFeik
         * @date    29.04.2025
         *
         * @returns {Diagnostics.GLog}
         */
        private static GetLogger;
        /**
         * enableFields
         *
         * @author  TFeik
         * @date    07.08.2019
         *
         * @param {GPublicUserPermissionDto} [permissions]
         */
        private static enableFields;
        /**
         * Vytvoří objekt registračního formuláře, inicializuje jej a nastaví do contentu.
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {GPublicUserRegFormOptions} params
         */
        static create(params: GPublicUserRegFormOptions): JQuery.Promise<GPublicUserRegFormObject>;
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
        static getStreetNumber(cPop?: number | string | null, cOr?: number | string | null): string | null;
        /**
         * Načte data z ARES pro zadané IČ.
         *
         * @author  TFeik
         * @date    08.09.2021
         *
         * @param {string} ic
         * @returns {JQuery.Promise<GAresDataDto, string>}
         */
        static getAresData(ic: string, useGlobalParameters: boolean): JQuery.Promise<GAresDataDto, string>;
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
        static getAresPublicUserData(ic: string, isPravnickaPreset: boolean, useGlobalParameters: boolean): JQuery.Promise<WebControls.GPublicUserDto, string>;
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
        static aresDataToPublicUser(ares: GAresDataDto, isPravnickaPreset: boolean, dataPravniFormy: Gordic.ControlsLogic.Interface.GSzrsprfDto[], dataTypOrganizace: Gordic.Data.Readers.GinctyoDto[]): GPublicUserDto;
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
        private static getTypOrganizaceDlePravniFormy;
    }
}
declare namespace Gordic.Gui.WebControls {
    interface GXrgPublicUserRegFormObject {
        name: string;
        formDiv: JQuery<HTMLElement>;
        layoutDescriptor?: string;
        reCeleJmeno?: RegExp;
        reJmenoTrim?: RegExp;
        container: JQuery<HTMLElement>;
        conditionAgreementText?: string;
        validators?: object;
        initialValues?: GPublicUserDto;
        /**
         * Vytvoří formulář.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        _createForm(): void;
        /**
         * Zobrazí / skryje políčka na formuláři dle typu právní osoby. Hodnota skrytých políček se nemaže.
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {number} [typ_esu] 0 - "neurčeno", 10 - "právnická osoba", 20 - "fyzická osoba", 30 - "fyzická osoba - OSVČ"
         */
        _adjustForm(typ_esu?: number): void;
        /**
         * _getTypOrganizace
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {number} typOrganizace
         * @returns {number | null | undefined}
         */
        _getTypOrganizace(typOrganizace: number): number | null | undefined;
        /**
         * _applyAresData
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {any} data
         * @param {boolean} [overwriteUserValues]
         */
        _applyAresData(data: any, overwriteUserValues?: boolean): void;
        /**
         * Nastaví výchozí hodnoty, validátory a onChangeListener, který zobrazuje odlišnost hodnoty políčka od hodnoty z Ares.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        _initForm(): void;
        /**
         * Vrati primitivní hodnotu z field.
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {JQuery<HTMLElement>} $field
         * @returns {string | number | object | undefined | null}
         */
        _getFieldRawValue($field: JQuery<HTMLElement>): string | number | object | undefined | null;
        /**
         * Nastaví data do formuláře a složí číslo domu a jméno uživatele z několika políček do jedné (cislo, celeJmeno).
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {GPublicUserDto} formData Objekt hodnot, které se uloží do formuláře.
         * @param {JQuery<HTMLElement>} [fields] Políčka, do kterých se data nastavují. Pokud není vyplněno pak se použijí všechny políčka formuláře.
         * @param {FieldSetValueFlags} [flags] Příznaky.
         */
        apply(formData: GPublicUserDto, fields?: JQuery<HTMLElement>, flags?: FieldSetValueFlags): void;
        /**
         * Sezbírá data z formuláře a rozparsuje číslo domu a jméno uživatele z jednoho políčka do více (pro Dto).
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {GPublicUserDto} result Objekt, do kterého se uloží nalezené hodnoty.
         * @param {JQuery<HTMLElement>} [fields] Políčka, ze kterých se data načítají. Pokud není vyplněno pak se použijí všechny políčka formuláře.
         */
        collect(): JQuery.Promise<GPublicUserDto>;
        /**
         * Zkontroluje zda je formulář validní.
         *
         * @author  TFeik
         * @date    19.08.2019
         *
         * @returns {boolean}
         */
        isValid(): boolean;
    }
    interface GXrgPublicUserRegFormOptions {
        initialValues?: WebControls.GPublicUserDto;
    }
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
        private static enableFields;
        /**
         * Vytvoří objekt registračního formuláře, inicializuje jej a nastaví do contentu.
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {any} params
         */
        static create(params: GXrgPublicUserRegFormOptions): JQuery.Promise<GXrgPublicUserRegFormObject>;
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
        static getStreetNumber(cPop?: number | string | null, cOr?: number | string | null): string | null;
    }
}
declare namespace Gordic.Gui.WebControls {
    /**
     * GChangePasswordDlg
     *
     * @author  TFeik
     * @since   482.1.0.457
     */
    class GRegPagePublicDlg extends GContentBase implements IGPublicLoginDialog {
        /**
         * Data
         * @type {any}
         */
        private Data?;
        /**
         * Klíč pro RSA šifrování.
         * @type {string}
         */
        private readonly CipherPublicKey;
        /**
         * Příznak, zda je možné použít SMS notifikace.
         * @type {boolean}
         */
        private readonly IsSmsGatewayEnabled;
        /**
         * RegFormObject
         * @type {GPublicUserRegFormObject}
         */
        private RegFormObject?;
        /**
         * ReCaptcha
         * @type {Api.GReCaptcha}
         */
        private ReCaptcha?;
        /**
         * Vytvoří formulář, přidá jej do contentu, nastaví validátory a inicializuje reCaptchu.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        onContentReady(): void;
        /**
         * Zvaliduje formular a provede overeni uzivatele pomoci Google reCaptcha.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        registerCheckCapcha(): void;
        /**
         * Zvaliduje formulář a zavolá serverovou metodu RegisterUser pro zaregistrování veřejného uživatele.
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {string} reCaptchaToken Token reCaptcha validace.
         */
        register(reCaptchaToken: string): void;
    }
}
declare namespace Gordic.Gui.WebControls {
    /**
     * GChangePasswordDlg
     *
     * @author  PHorsak
     * @since   482.1.0.457
     */
    class GXrgRegPagePublicDlg extends GContentBase implements IGPublicLoginDialog {
        RegistrationEvent?: string;
        /**
         * Data
         * @type {any}
         */
        private Data?;
        /**
         * RegFormObject
         * @type {GXrgPublicUserRegFormObject}
         */
        private RegFormObject?;
        /**
         * ReCaptcha
         * @type {Api.GReCaptcha}
         */
        private ReCaptcha?;
        /**
         * Vytvoří formulář, přidá jej do contentu, nastaví validátory a inicializuje reCaptchu.
         *
         * @author  PHorsak
         * @date    10.04.2017
         */
        onContentReady(): void;
        /**
         * Zvaliduje formular a provede overeni uzivatele pomoci Google reCaptcha.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        registerCheckCapcha(): void;
        /**
         * Zvaliduje formulář a zavolá serverovou metodu RegisterUser pro zaregistrování veřejného uživatele.
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {string} reCaptchaToken Token reCaptcha validace.
         */
        register(reCaptchaToken: string): void;
    }
}
declare namespace Gordic.Gui.WebControls {
    /**
     * GChangePublicUserInfoDlg
     *
     * @author  TFeik
     * @since   482.1.0.457
     */
    class GChangePublicUserInfoDlg extends GContentBase {
        /**
         * Klíč pro RSA šifrování.
         * @type {string}
         */
        private readonly CipherPublicKey;
        /**
         * Příznak, zda se jedná o uživatele registrovaného skrze formulář [true], nebo externíslubu [false].
         * @type {boolean}
         */
        private readonly IsGinisUser;
        /**
         * Příznak, zda je možné zažádat o potvrzení emailu.
         * @type {boolean}
         */
        private readonly CanRequestConfirmEmail?;
        /**
         * RegFormObject
         * @type {GPublicUserRegFormObject}
         */
        private RegFormObject?;
        /**
         * FormConfig
         * @type {any}
         */
        private FormConfig?;
        /**
         * Vytvoří formulář, přidá jej do contentu a nastaví validátory.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        onContentReady(): void;
        /**
         * SaveUserInfo
         *
         * @author  TFeik
         * @date    27.07.2021
         *
         * @param {GPublicUserDto} userDto
         * @returns {JQuery.Promise<SaveUserInfoRetVal>}
         */
        private SaveUserInfo;
        /**
         * Zvaliduje formulář a zavolá metodu SaveUserInfo pro uložení osobních údajů uživatele.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        UlozDataUzivatele(showSuccesFlashMessages?: boolean): JQuery.Promise<undefined>;
        /**
         * RequestConfirmEmail
         *
         * @author  TFeik
         * @date    27.07.2021
         *
         * @returns {JQuery.Promise<boolean>}
         */
        private RequestConfirmEmail;
        /**
         * PozadatOPotvrzeniEmailu
         *
         * @author  TFeik
         * @date    27.07.2021
         *
         * @returns {JQuery.Promise<undefined>}
         */
        private PozadatOPotvrzeniEmailu;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    11.10.2019
         */
        private CreateMenu;
    }
}
declare namespace Gordic.Gui.WebControls {
    /**
     * GChangePasswordDlg
     *
     * @author  TFeik
     * @since   482.1.0.457
     */
    class GChangePasswordDlg extends GContentBase {
        /**
         * Validátory
         * @type {object}
         */
        private readonly ChangePasswordFormValidators?;
        /**
         * $Form
         * @type {JQuery<HTMLElement>}
         */
        private $Form?;
        /**
         * Vytvoří formulář, přidá jej do contentu a nastaví validátory.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        onContentReady(): void;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    29.07.2019
         */
        private createMenu;
        /**
         * Zvaliduje formulář a zavolá serverovou metodu ChangePassword.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        changePassword(): JQuery.Promise<undefined>;
        /**
         * Vytvoří formulář.
         *
         * @author  TFeik
         * @date    05.08.2019
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @returns {JQuery<HTMLElement>}
         */
        private static createForm;
    }
}
declare namespace Gordic.Gui.WebControls {
    /**
     * GNewPasswordDlg
     *
     * @author  TFeik
     * @since   482.1.0.457
     */
    class GNewPasswordDlg extends GContentBase implements IGPublicLoginDialog {
        /**
         * Validátory
         * @type {object}
         */
        private readonly NewPasswordFormValidators?;
        /**
         * $Form
         * @type {JQuery<HTMLElement>}
         */
        private $Form?;
        /**
         * ReCaptcha
         * @type {Api.GReCaptcha}
         */
        private ReCaptcha?;
        /**
         * Vytvoří formulář, přidá jej do contentu a nastaví validátory.
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {GNewPasswordDlg} this
         */
        onContentReady(): void;
        /**
         * Zvaliduje formulář a provede ověření uživatele pomocí Google reCaptcha.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        registerCheckCapcha(): void;
        /**
         * Zvaliduje formulář a zavolá serverovou metodu SetNewPassword pro nastavení nového hesla.
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {string} [token] Token reCaptcha validace.
         */
        private newPassword;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    05.08.2019
         */
        private createMenu;
        /**
         * Vytvoří formulář.
         *
         * @author  TFeik
         * @date    05.08.2019
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @returns {JQuery<HTMLElement>}
         */
        private static createForm;
    }
}
declare namespace Gordic.Gui.WebControls {
    /**
     * Dialog provázání účtů veřejného uživatele.
     *
     * @author TFeik
     * @since 486.1.0.452
     */
    class GAddRepresentPublicUserDlg extends GContentBase {
        /**
         * Validátory formuláře pro připojení existujícího účtu.
         * @type {object}
         */
        private readonly LoginFormValidators?;
        /**
         * Validátory formuláře pro připojení nového účtu.
         * @type {object}
         */
        private readonly NewUserFormValidators?;
        /**
         * Příznak, zda je připravena SMS brána.
         * @type {boolean}
         */
        private readonly IsSmsGatewayEnabled?;
        /**
         * Konfigurace přihlašovací obrazovky.
         * @type {GPublicLoginConfigDto}
         */
        private readonly PublicLoginConfig?;
        /**
         * Příznak, zda má být k dispozici připojení existujícího účtu.
         */
        private readonly IsConnectExistingAccountAvailable?;
        /**
         * Formulář pro připojení existujícího účtu.
         *
         * @type {JQuery<HTMLElement>}
         */
        private $LoginForm?;
        /**
         * Formulář pro připojení nového účtu.
         *
         * @type {JQuery<HTMLElement>}
         */
        private $NewUserForm?;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    03.09.2021
         */
        onContentReady(): void;
        /**
         * Vytvoří akce.
         *
         * @author  TFeik
         * @date    03.09.2021
         */
        private CreateActions;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    03.09.2021
         */
        private CreateMenu;
        /**
         * Vytvoření vormuláře pro připojení existujícího účtu.
         *
         * @author  TFeik
         * @date    06.09.2021
         *
         * @returns {Forms.Form}
         */
        private CreateLoginForm;
        /**
         * Vrátí data formuláře pro provázání existujícího účtu.
         *
         * @author  TFeik
         * @date    06.09.2021
         *
         * @returns {JQuery.Promise<GAddRepresentedPublicUserInputDto>}
         */
        private GetLoginFormValues;
        /**
         * Prováže externí účet nalezený dle loginu a hesla s aktuálně přihlášeným účtem.
         *
         * @author  TFeik
         * @date    03.09.2021
         *
         * @param {GAddRepresentedPublicUserInputDto} input
         * @returns {JQuery.Promise<boolean>}
         */
        private AddRepresentedPublicUser;
        /**
         * Prováže externí účet nalezený dle loginu a hesla s aktuálně přihlášeným účtem.
         *
         * @author  TFeik
         * @date    06.09.2021
         *
         * @returns {JQuery.Promise<void>}
         */
        private PripojitExistujiciUcet;
        /**
         * Vytvoří nový externí účet a prováže jej s aktuálně přihlášeným účtem.
         *
         * @author  TFeik
         * @date    03.09.2021
         *
         * @param {GCreateAndAddRepresentedPublicUserInputDto} input
         * @returns {JQuery.Promise<boolean>} true v případě vytvoření zástupu se založením nového uživatele, false při vytvoření zástupu za existujícího uživatele
         */
        private CreateAndAddRepresentedPublicUser;
        /**
         * Vytvoření vormuláře pro připojení nového účtu.
         *
         * @author  TFeik
         * @date    06.09.2021
         *
         * @returns {Forms.Form}
         */
        private CreateNewUserForm;
        /**
         * Vrátí data formuláře pro provázání nového účtu.
         *
         * @author  TFeik
         * @date    06.09.2021
         *
         * @param {boolean} [validate] (Default: true) Příznak, zda se má formulář validovat.
         * @returns {JQuery.Promise<GCreateAndAddRepresentedPublicUserInputDto>}
         */
        private GetNewUserFormValues;
        /**
         * Vytvoří a prováže nový externí účet s aktuálně přihlášeným účtem.
         *
         * @author  TFeik
         * @date    06.09.2021
         *
         * @returns {JQuery.Promise<void>}
         */
        private VytvoritAPripojitNovyUcet;
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
        private GetAndApplyAresData;
        /**
         * UpdateNewUserFormEnabled
         *
         * @author  TFeik
         * @date    27.11.2023
         *
         * @returns {JQuery.Promise<void>}
         */
        private UpdateNewUserFormEnabled;
        /**
         * GetDefaultTypeOrg
         *
         * @author  TFeik
         * @date    27.11.2023
         *
         * @param {Ginis.DbModel.GGincesuEnum | number | null | undefined} typEsu
         * @returns {number | null | undefined}
         */
        private GetDefaultTypeOrg;
        /**
         * Vrátí příznak zda je povolena pouze editace IČ pro připojení nového účtu.
         *
         * @author  TFeik
         * @date    14.04.2025
         *
         * @returns {boolean}
         */
        private GetPripojeniNovehoUctuPouzeIC;
    }
}
