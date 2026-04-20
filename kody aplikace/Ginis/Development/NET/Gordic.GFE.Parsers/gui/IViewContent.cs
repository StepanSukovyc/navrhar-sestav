//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IViewContent.cs                          </Name>
//    <Description> Typ podporovaných formátů                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Typ podporovaných formátů
    /// </summary>
    public enum FormatType
    {
        /// <summary>
        /// Formát GRF
        /// </summary>
        grf,
        /// <summary>
        /// Formát RTF
        /// </summary>
        rtf,
        /// <summary>
        /// Formát MSE
        /// </summary>
        mse,
        /// <summary>
        /// Formát GRR
        /// </summary>
        grr,
        /// <summary>
        /// Formát GFRM - formulář
        /// </summary>
        GFRM,
        /// <summary>
        /// Formát není podporován
        /// </summary>
        other,
        /// <summary>
        /// Žádný formát
        /// </summary>
        NULL
    }

    /// <summary>
    /// IViewContent základní rozhraní "oken" na ploše "dokumentu" ReportDesigneru.
    /// Pohled na obsah je vlastně pohled na více souborů, nebo jiný obsah otevřený jako "dokument"
    /// (např. startovací stránka).
    /// </summary>
    public interface IViewContent : IDisposable, ICanBeDirty
    {
        /// <summary>
        /// Klíč vlastnosti
        /// </summary>
        string PropertyKey { get; }

        /// <summary>
        /// Okno pracovního stolu, ve kterém se zobrazí tento pohled.
        /// </summary>
        IDesktopWindow DesktopWindow { get; set; }

        /// <summary>
        /// Je Windows.Forms ovladač pro dané zobrazení.
        /// </summary>
        object Control { get; }

        /// <summary>
        /// Se volá po změně vlastnosti TabPageText.
        /// </summary>
        event EventHandler TabPageTextChanged;

        /// <summary>
        /// Text na záložce, když do pohledu je připojen více než jeden obsah
        /// </summary>
        string TabPageText { get; }

        /// <summary>
        /// Opětovná inicializace obsahu. (Znovu inicializuje všechny addin vlastnosti)
        /// a překreslí obsah.
        /// </summary>
        void RedrawContent();

        /// <summary>
        /// Záhlaví zobrazení. Obvykle je to název editovatelného primárního souboru.
        /// </summary>
        string TitleName { get; }

        /// <summary>
        /// Volá se pokažde, když se změní název obsahu.
        /// </summary>
        event EventHandler TitleNameChanged;

        /// <summary>
        /// Uložení obsahu do souboru <code>fileName</code>
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="stream">Datový proud</param>
        /// <remarks>
        /// Když se uživatel přepíná mezí více zobrazení stejného souboru, 
        /// změny se uloží do pamětí a jiný pohled si z pamětí načte tento obsah.
        /// </remarks>
        void Save(OpenedFile file, Stream stream);

        /// <summary>
        /// Načtení nebo znovu načtení obsahu specifického souboru z pamětí.
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="stream">Datový proud</param>
        /// <remarks>
        /// Když se uživatel přepíná mezí více zobrazení stejného souboru, 
        /// změny se uloží do pamětí a jiný pohled si z pamětí načte tento obsah.
        /// </remarks>
        void Load(OpenedFile file, Stream stream);

        /// <summary>
        /// Seznam souborů editovatelných daným zobrazením.
        /// Kolekce je pouze pro čtení.
        /// </summary>
        IList<OpenedFile> Files { get; }

        /// <summary>
        /// Primární editovatelný soubor. 
        /// Může vrátit hodnotu NULL, pokud žádný soubor není editovatelný.
        /// </summary>
        OpenedFile PrimaryFile { get; }

        /// <summary>
        /// Název primárního editovatelného souboru. 
        /// Může vrátit hodnotu NULL, pokud žádný soubor není editovatelný.
        /// </summary>
        string PrimaryFileName { get; }

        /// <summary>
        /// Indikuje uvolnění zobrazení
        /// </summary>
        bool IsDisposed { get; }
        /// <summary>
        /// Volá se po uvolnění zobrazení obsahu
        /// </summary>
        event EventHandler Disposed;

        /// <summary>
        /// volá se po inicializací zobrazení
        /// </summary>
        event FilesOperationDelegate AfterInitialize;

        /// <summary>
        /// Zjištění, zda zobrazení je pouze pro čtení 
        /// (takové zobrazení mohou být uloženy pouze v případě, že vyberete jiný název souboru).
        /// </summary>
        bool IsReadOnly { get; }
        /// <summary>
        /// Zjištění, zda zobrazení je pouze pohled na obsah (nikdy ho nelze uložit).
        /// </summary>
        bool IsViewOnly { get; }
        /// <summary>
        /// indikuje viditelnost záložky pohledu
        /// </summary>
        bool Visible { get; set; }
        /// <summary>
        /// Akceptace změn vlastnosti z dialogového okna
        /// </summary>
        /// <param name="sender">objekt, který spustil událost</param>
        /// <param name="e">Jedná se o data, která jsou spojena s událostí.</param>
        void ShowPropertyDialogAccepted(object sender, EventArgs e);

        #region Podpora sekundarních zobrazení
        /// <summary>
        /// KOlekce obsahující sekundární pohledy na obsahy.
        /// </summary>
        ICollection<IViewContent> SecondaryViewContents { get; }

        /// <summary>
        /// Zjištění, zda se můžeme přepnout z daného pohledu na obsah bez uložení/načtení obsahu.
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="newView">Zobrazení, na které se uživátel přepíná.</param>
        bool SupportsSwitchFromThisWithoutSaveLoad(OpenedFile file, IViewContent newView);

        /// <summary>
        /// Zjištění, zda se můžeme přepnout na daný pohled na obsah bez uložení/načtení obsahu.
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="oldView">Zobrazení ze kterého se přepíná</param>
        bool SupportsSwitchToThisWithoutSaveLoad(OpenedFile file, IViewContent oldView);

        /// <summary>
        /// Provedé se před přepnutím z daného pohledu na obsah do nového.
        /// </summary>
        /// <param name="file">Primární soubor zuobrazení.</param>
        /// <param name="newView">Nový pohled na obsah</param>
        bool SwitchFromThisWithoutSaveLoad(OpenedFile file, IViewContent newView);

        /// <summary>
        /// Provedé se před přepnutím ze starého zobrazení na dané.
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="oldView">Zobrazení, ze kterého se přepínáme.</param>
        void SwitchToThisWithoutSaveLoad(OpenedFile file, IViewContent oldView);

        /// <summary>
        /// Indikuje, že se lze bez problémů přepnout z tohoto pohledu na obsah do jiného pohledu.
        /// Např. z textového pohledu na grafický v případě, že obsah je XML validní a lze ho zobrazit v grafickém pohledu bez ztráty dat.
        /// Vrací false pokud přepnutí musí být zablokováno (např. nevalidní XML, neuzavřené transakce, atd.).
        /// </summary>
        bool CanSafelySwitchFromThisView { get; }
        #endregion

        /// <summary>
        /// po inicializací
        /// </summary>
        /// <param name="names">názvy souborů</param>
        void OnAfterInitialize(params string[] names);

        //Dictionary<Dom.IEditableContent,ValidationResult> ValidationErrors { get; }
        //IEnumerable<ValidationResult> ValidationErrors { get; }
    }
}
