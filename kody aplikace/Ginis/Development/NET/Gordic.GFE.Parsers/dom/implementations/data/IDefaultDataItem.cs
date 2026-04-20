//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IFFDataItem.cs                           </Name>
//    <Description> Ovladač datové položky prohlížeče formulářů                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-19                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.General;
using Gordic.General.ApplicationInterface;
using Gordic.GFE.Parsers.Gui;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Ovladač datové položky prohlížeče formulářů
    /// </summary>
    public interface IDefaultDataItemHandler
    {
        /// <summary>
        /// Datová položka prohlížeče formulářů
        /// </summary>
        IDefaultDataItem DataItem { get; }
        /// <summary>
        /// Aktualizace obsahu
        /// </summary>
        /// <param name="content">Nový obsah</param>
        void UpdateContent(object content);
        /// <summary>
        /// Update souvisejícího obsahu (ale není přímo vázána)
        /// </summary>
        /// <param name="dataName">Jméno položky</param>
        /// <param name="content">Nový obsah</param>
        void UpdateContent(string dataName, object content);
    }
    /// <summary>
    /// Datová položka prohlížeče formulářů
    /// </summary>
    public interface IDefaultDataItem : IDefaultDataBound, IFFScriptRunnable, IScriptable, IRDArgumentHandler
    {
        /// <summary>Datový název položky</summary>
        string DataName { get; }
        /// <summary>Datový název položky klíče</summary>
        string ComboKeyName { get; }
        /// <summary>Datový název položky hodnoty</summary>
        string ComboValueName { get; }
        /// <summary>Hodnota klíče</summary>
        string ComboKeyValue { get; }
        /// <summary>Hodnota hodnoty</summary>
        string ComboValueValue { get; }
        /// <summary>
        /// vlastník rozhraní
        /// </summary>
        object Owner { get; }
        /// <summary>
        /// Typ editovateného objektu
        /// </summary>
        ControlType Type { get; }

        /// <summary>Příznak chybné hodnoty. Některá pole to mohou nastavit a takové jsou pak červeně zvýrazněné</summary>
        bool IsError { get; }
        void ClearError();
        void SetError(string message);

        ///// <summary>Příznak povinné a nevyplněné položky. Takový formulář by neměl jít uložit/odeslat atp.</summary>
        //bool EmptyRequired { get; }

        /// <summary>Neformátovaná hodnota (ale prosla pres onData skript)</summary>
        object Value { get; }

        /// <summary>
        /// Nastavení zobrazené hodnoty
        /// </summary>
        void SetDisplayValue();

        /// <summary>
        /// Nastaven změny hodnoty
        /// </summary>
        void MakeDirty();

        /// <summary>
        /// Vytvoření editovatelného ovladače
        /// </summary>
        /// <returns>Editovatelný ovladač</returns>
        IEditControl CreateEditControl();
        /// <summary>
        /// Datová položka prohlížeče formulářů
        /// </summary>
        Core.GFEDataItem StructureItem { get; }
        /// <summary>Validace</summary>
        ValidationResult ValidationResult { get; }
        /// <summary>
        /// změna hodnoty
        /// </summary>
        event System.EventHandler InputChanged;

        /// <summary>
        /// skript pri nactení hodnoty datového pole (vždy vyhodnoceno pouze jednou)
        /// vhodné pro zmenu dat (self.value)
        /// </summary>
        GScript OnData { get; }
        /// <summary>
        /// skript pri vystupu z editacniho pole
        /// </summary>
        GScript OnValidate { get; }

        void RunOnChangeAndValidate();
        void CreateValidators(List<GValidationAttribute> l);
    }
    /// <summary>
    /// Datová položka - základní vazba na data
    /// </summary>
    public interface IDefaultDataBound
    {
        /// <summary>příslušný řádek dat</summary>
        System.Data.DataRow DataRow { get; }
        /// <summary>Správce dat</summary>
        DefaultDataManager DataManager { get; }
        /// <summary>Stránka objektu</summary>
        IPage Page { get; }
    }

    public interface IEditableContent
    {
        GFEAttrList AttrList { get; }
        string DataName { get; }
        string DataFullName { get; }
        IDefaultDataItem DataItem { get; }

        Gordic.GFE.Parsers.Core.GFEDataItem StructureItem { get; }
        /// <summary>Titulek pole</summary>
        string StructureItemTitle { get; }
        /// <summary>Popis pole</summary>
        string StructureItemDescription { get; }

        Gordic.GFE.Parsers.Core.GFEFormatTag FormatTag { get; }
        ITagText Text { get; }
        GFEScriptList Scripts { get; }
        string Tooltip { get; set; }
        void OnTextChanged();

        System.Drawing.RectangleF ContentBounds { get; }
        /// <summary>Formátovaný text pro zobrazení v políčku</summary>
        string FormattedText { get; }

        string ComboItems { get; }
        /// <summary>Datový název položky klíče</summary>
        string ComboKeyName { get; }
        /// <summary>Datový název položky hodnoty</summary>
        string ComboValueName { get; }

        IPage Page { get; }

        /// <summary>viditelnost komponenty</summary>
        bool Visible { get; }

        List<GValidationAttribute> Validators { get; }
    }

    /// <summary>Vysledek validace pres property nebo field</summary>
    public class ValidationResult : GValidationResult
    {
        public IEditableContent c;
        public GValidationAttribute val;

        public ValidationResult(Dom.IEditableContent c, string message)
            : base(c.DataName, message)
        {
            this.c = c;
        }
        public ValidationResult(Dom.IEditableContent c, GValidationAttribute v)
            : base(c.DataName, v.GetMessage(typeof(ValidationResult), c.StructureItemTitle)) //v.Message ?? v.DefaultMessage
        {
            this.c = c;
            this.val = v;            
        }

        /// <summary>Titulek pole</summary>
        public string MemberTitle => c.StructureItemTitle;
        /// <summary>Popis pole</summary>
        public string MemberDescription => c.StructureItemDescription;
    }
}
