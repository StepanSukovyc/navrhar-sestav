//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.FillerDataItem.cs                     </Name>
//    <Description> Položka prohlížeče propojující datovou hodnotu s datovou položkou na stránce</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-19                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using Gordic.General;
using Gordic.General.ApplicationInterface;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Položka propojující datovou hodnotu s datovou položkou na stránce
    /// </summary>
    [System.Diagnostics.DebuggerDisplay("DataItem {DataName,nq}")]
    public class DefaultDataItem : IDefaultDataItem, IDisposable
    {
        internal DefaultDataItem() { }

        #region Formátování hodnoty + IScriptable
        private object m_value = null;
        /// <summary>Neformátovaná hodnota (ale prosla pres onData skript)</summary>
        public object Value
        {
            get { return m_value; }
            set //set vyzaduje na vstupu _neformatovanou_ hodnotu
            {
                m_value = value;
                m_isFormatted = false;
            }
        }
        private ControlType ValueType
        {
            get
            {
                if (Value is decimal) return ControlType.NumberType;
                if (Value is DateTime) return ControlType.DatetimeType;
                if (Value is DateTimeOffset) return ControlType.DatetimeType;
                if (Value is DBNull) return Type; //nemam zadnou hodnotu -> vratim co bych snad mel mit
                return ControlType.StringType;
            }
        }

        //private bool m_error = false;
        private ValidationResult m_error = null;
        /// <summary>Příznak chybné hodnoty. Některá pole to mohou nastavit a takové jsou pak červeně zvýrazněné</summary>
        public bool IsError { get { return m_error != null; } }
        /// <summary>Validace</summary>
        public ValidationResult ValidationResult { get { return m_error; } }
        public void ClearError()
        {
            m_error = null;
            //((DefaultAbstractContent)component).view.ValidationErrors.Remove(component);
        }
        public void SetError(string message)
        {
            m_error = new ValidationResult(component, message);
        }
        public void SetError(GValidationAttribute v)
        {
            m_error = new ValidationResult(component, v);
        }
   

    //------------------------------------------------------------------

        private bool m_isFormatted = false;
        /// <summary>
        /// Nejen formátuje veličinu, 
        /// zde proběhne i další nastavení (např. barvy), pokud Value == null
        /// </summary>
        /// <returns>NULL - pokud hodnota datové položky je prázdná, jinak zformátovaná veličina</returns>
        private string FormatValue()
        {
            var v = Value;
            if (v == null) return string.Empty;

            string fmt;
            //zformátování
            switch (v)
            {
                case Decimal num:
                    fmt = component.Text.Format;
                    if (string.IsNullOrEmpty(fmt) == false && ScriptManager != null)
                        return SetSpec(ScriptManager.Engine.FormatDecimal(fmt, num, out string spec), spec);
                    //default prevod cisla na string
                    {
                        var d = new GDecimal(num); //GDecimal.Parse(num);
                        var s = d.ToString("F" + d.Precision.ToString(), System.Globalization.CultureInfo.InvariantCulture);
                        //tohle moc nechapu, co tam melo byt? .TrimEnd(new char[] { ' ', '0', '.' });
                        return s;
                    }
                case DateTime d:
                    fmt = component.Text.Format;
                    if (string.IsNullOrEmpty(fmt) == false && ScriptManager != null)
                        return ScriptManager.Engine.FormatDatetime(fmt, d);
                    return d.ToString();
                case DateTimeOffset d:
                    fmt = component.Text.Format;
                    if (string.IsNullOrEmpty(fmt) == false && ScriptManager != null)
                        return ScriptManager.Engine.FormatDatetime(fmt, d.LocalDateTime);
                    return d.LocalDateTime.ToString();
                default:
                    return v.ToString().TrimEnd();
            }
        }

        private string SetSpec(string val, string spec)
        {
            if (string.IsNullOrEmpty(spec) == false)
            {
                var style = new ScriptStyle(ScriptManager.Engine, (DefaultAbstractContent)component);
                foreach (var s in spec.Split(';'))
                {
                    var v = s.Split(new char[] { '=' }, 2);
                    string name, value;
                    if (v.Length == 1) { name = "font-color"; value = v[0]; }
                    else { name = v[0]; value = v[1]; }
                    style.SetProperty(name, value); 
                }
            }
            return val;
        }

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            switch (name)
            {
                case "value":
                    if (m_isFormatted)
                    {
                        value = ScriptManager.Engine.GetScriptableString(name, component.Text.Text);
                        return 0;
                    }
                    goto case "data";
                case "data":
                    switch (ValueType)
                    {
                        case ControlType.NumberType:
                            value = ScriptManager.Engine.GetScriptableNumber(name, Value);
                            return 0;
                        case ControlType.DatetimeType:
                            value = ScriptManager.Engine.GetScriptableDateTime(name, Value);
                            return 0;
                        default:
                            value = ScriptManager.Engine.GetScriptableString(name, Value == null ? "" : Value.ToString());
                            return 0;
                    }
                case "style":
                    value = new GScriptableObject(ScriptManager.Engine, name, new ScriptStyle(ScriptManager.Engine, (DefaultAbstractContent)component));
                    return 0;
                case "edit" :
                    value = ScriptManager.Engine.GetScriptableNumber(name, m_Edit ? 1 : 0); //Edit vlastnost by mohla vyvolat onData skript -> nelze skript ze skriptu
                    return 0;
                case "required":
                    value = ScriptManager.Engine.GetScriptableNumber(name, RequiredInternal ? 1 : 0); //Required vlastnost by mohla vyvolat onData skript -> nelze skript ze skriptu
                    return 0;
                case "error":
                    value = ScriptManager.Engine.GetScriptableNumber(name, IsError ? 1 : 0);
                    return 0;
                case "fail":
                    value = new GScriptableMethod(ScriptManager.Engine, name, delegate (IDataScriptable[] args)
                    {
                        if (args.Length != 1) throw new GArgumentNullException();
                        using (var v = new GDataScriptable(ScriptManager.Engine, args[0]))
                            SetError(v.ToString());
                        return null;
                    });
                    return 0;
                case "setrequired":
                    value = new GScriptableMethod(ScriptManager.Engine, name, delegate (IDataScriptable[] args)
                    {
                        if (args.Length != 1) throw new GArgumentNullException();
                        using (var v = new GDataScriptable(ScriptManager.Engine, args[0]))
                            SetRequired(v.ToString());
                        return null;
                    });
                    return 0;
                case "success":
                    value = new GScriptableMethod(ScriptManager.Engine, name, delegate (IDataScriptable[] args)
                    {
                        ClearError();
                        return null;
                    });
                    return 0;
                case "tooltip":
                    value = ScriptManager.Engine.GetScriptableString(name, component.Tooltip);
                    return 0;
                case "items":
                    value = ScriptManager.Engine.GetScriptableString(name, component.ComboItems);
                    return 0;
                default:
                    return ((DefaultAbstractContent)component).GetProperty(ScriptManager, name, out value);
            }
        }

        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            switch (name)
            {
                case "value":
                    using (var v = new GDataScriptable(ScriptManager.Engine, value))
                    {
                        MakeDirty();
                        switch (v.Type)
                        {
                            case GScriptableType.Scriptable_type_number:
                                Value = v.ToDecimal();
                                return 0;
                            case GScriptableType.Scriptable_type_datetime:
                                Value = v.ToDateTime();
                                return 0;
                            default:
                                Value = v.ToString();
                                return 0;
                        }
                    }
                case "data":
                    using (var v = new GDataScriptable(ScriptManager.Engine, value))
                    {
                        switch (v.Type)
                        {
                            case GScriptableType.Scriptable_type_number:
                                UpdateDataContent(DataName, v.ToDecimal(), false);
                                return 0;
                            case GScriptableType.Scriptable_type_datetime:
                                UpdateDataContent(DataName, v.ToDateTime(), false);
                                return 0;
                            default:
                                UpdateDataContent(DataName, v.ToString(), false);
                                return 0;
                        }
                    }
                case "edit":
                    using (var v = new GDataScriptable(ScriptManager.Engine, value))
                    {
                        Edit = v.ToInt() > 0;
                        return 0;
                    }
                case "required":
                    using (var v = new GDataScriptable(ScriptManager.Engine, value))
                    {
                        Required = v.ToInt() > 0;
                        return 0;
                    }
                case "error":
                    using (var v = new GDataScriptable(ScriptManager.Engine, value))
                    {
                        if (v.ToInt() > 0) SetError("Chyba v " + component.DataFullName); else ClearError();
                        return 0;
                    }
                case "tooltip":
                    using (var v = new GDataScriptable(ScriptManager.Engine, value))
                    {
                        component.Tooltip = v.ToString();
                        return 0;
                    }
                case "items":
                    using (var v = new GDataScriptable(ScriptManager.Engine, value))
                    {
                        component.AttrList["items"] = v.ToString();
                        return 0;
                    }
                default:
                    return ((DefaultAbstractContent)component).SetProperty(ScriptManager, name, value);
            }
        }
        #endregion

        /// <summary>
        /// změna hodnoty
        /// </summary>
        public event EventHandler InputChanged;

        /// <summary>Datový název položky</summary>
        public string DataName { get { return component.DataName; } }

        /// <summary>Datový název položky klíče</summary>
        public string ComboKeyName { get { return component.ComboKeyName; } }
        /// <summary>Datový název položky hodnoty</summary>
        public string ComboValueName { get { return component.ComboValueName; } }

        #region IScriptRunnable
        private GScript m_OnClick;
        /// <summary>
        /// skript pri Click
        /// </summary>
        public GScript OnClick
        {
            get
            {
                if (m_OnClick == null && ScriptManager != null)
                {
                    var l_script = component.Scripts.GetValueDefault("onClick", string.Empty);
                    if (l_script.Length == 0) return null;
                    m_OnClick = ScriptManager.PrepareScript(component.FormatTag, "onClick", l_script, this);
                }
                return m_OnClick;
            }
        }
        /// <summary>
        /// Spuštění skriptu OnClick
        /// </summary>
        public void RunOnClick()
        {
            var s = OnClick;
            if (s != null) ScriptManager.RunScript(s);
            UpdateDataAfterValueChange();
        }

        //------------------------------------------------------------------
        private GScript m_OnData;
        /// <summary>
        /// skript pri nactení hodnoty datového pole (vždy vyhodnoceno pouze jednou)
        /// vhodné pro zmenu dat (self.value)
        /// </summary>
        public GScript OnData
        {
            get
            {
                if (m_OnData == null && ScriptManager != null)
                {
                    var l_script = component.Scripts.GetValueDefault("onData", string.Empty);
                    if (l_script.Length == 0) return null;
                    m_OnData = ScriptManager.PrepareScript(component.FormatTag, "onData", l_script, this);
                }
                return m_OnData;
            }
        }
        //private bool m_inFormatting = false;
        /// <summary>
        /// Spuštění skriptu OnData
        /// </summary>
        public void RunOnData()
        {
            var s = OnData;
            if (s != null) ScriptManager.RunScript(s);
        }

        private GScript m_OnEdit;
        /// <summary>
        /// skript pri vstupu do editacniho pole
        /// </summary>
        public GScript OnEdit
        {
            get
            {
                if (m_OnEdit == null && ScriptManager != null)
                {
                    var l_script = component.Scripts.GetValueDefault("onEdit", string.Empty);
                    if (l_script.Length == 0) return null;
                    m_OnEdit = ScriptManager.PrepareScript(component.FormatTag, "onEdit", l_script, this);
                }
                return m_OnEdit;
            }
        }
        /// <summary>
        /// Spuštění skriptu OnEdit
        /// </summary>
        public void RunOnEdit()
        {
            var s = OnEdit;
            if (s != null) ScriptManager.RunScript(s);
        }

        private GScript m_OnEnter;
        /// <summary>
        /// Skript vstupu na objekt
        /// </summary>
        public GScript OnEnter
        {
            get
            {
                if (m_OnEnter == null && ScriptManager != null)
                {
                    var l_script = component.Scripts.GetValueDefault("onEnter", string.Empty);
                    if (l_script.Length == 0) return null;
                    m_OnEnter = ScriptManager.PrepareScript(component.FormatTag, "onEnter", l_script, this);
                }
                return m_OnEnter;
            }
        }
        /// <summary>
        /// Spuštění skriptu OnEnter
        /// </summary>
        public void RunOnEnter()
        {
            var s = OnEnter;
            if (s != null) { /*SetValue(false);*/ ScriptManager.RunScript(s); }
        }

        private GScript m_OnChange;
        /// <summary>
        /// skript pri vystupu z editacniho pole
        /// </summary>
        public GScript OnChange
        {
            get
            {
                if (m_OnChange == null && ScriptManager != null)
                {
                    var l_script = component.Scripts.GetValueDefault("onChange", string.Empty);
                    if (l_script.Length == 0) return null;
                    m_OnChange = ScriptManager.PrepareScript(component.FormatTag, "onChange", l_script, this);
                }
                return m_OnChange;
            }
        }
        /// <summary>
        /// Spuštění validace skriptu
        /// </summary>
        public void RunOnChange()
        {
            var s = OnChange;
            if (s != null) { SetValue(false); ScriptManager.RunScript(s); }
        }

        private GScript m_OnValidate;
        /// <summary>
        /// skript pri vystupu z editacniho pole
        /// </summary>
        public GScript OnValidate
        {
            get
            {
                if (m_OnValidate == null && ScriptManager != null)
                {
                    var l_script = component.Scripts.GetValueDefault("onValidate", string.Empty);
                    if (l_script.Length == 0) return null;
                    m_OnValidate = ScriptManager.PrepareScript(component.FormatTag, "onValidate", l_script, this);
                }
                return m_OnValidate;
            }
        }
        /// <summary>
        /// Spuštění validace skriptu
        /// </summary>
        public void RunOnValidate()
        {
            var s = OnValidate;
            if (s == null && component.Validators.Count == 0) return;
            SetValue(false);

            ClearError();
            if (s != null) ScriptManager.RunScript(s);
            if (IsError) return;

            foreach (var v in component.Validators)
            {
                switch (Type)
                {
                    case ControlType.NumberType:
                        v.Init(typeof(decimal));
                        break;
                    case ControlType.DatetimeType:
                        v.Init(typeof(DateTime));
                        break;
                    default:
                        v.Init(typeof(string));
                        break;
                }

                if (v.IsValid(Value == DBNull.Value ? null : Value) == false)
                { SetError(v); return; }
            }
        }

        ///// <summary>
        ///// skript načtení
        ///// </summary>
        //public string OnLoad
        //{
        //    get { return component.Scripts.GetValueDefault("onLoad", string.Empty); }
        //}
        ///// <summary>
        ///// Spuštění skriptu OnLoad
        ///// </summary>
        //public void RunOnLoad()
        //{
        //}

        /// <summary>
        /// Spuštění skriptu OnPrint
        /// </summary>
        public string RunOnPrint(string v)
        {
            var l_script = component.Scripts.GetValueDefault("onPrint", string.Empty);
            if (string.IsNullOrEmpty(l_script) == false)
            {
                using (var s = ScriptManager.PrepareScript(component.FormatTag, "onPrint", l_script, this))
                {
                    var l_old = m_value;
                    m_value = v;
                    try
                    {
                        ScriptManager.RunScript(s);
                        v = m_value.ToString();
                    }
                    finally
                    {
                        m_value = l_old;
                    }
                }
            }
            return v;
        }

        private DefaultDataManager manager;
        /// <summary>Správce dat</summary>
        public DefaultDataManager DataManager { get { return manager; } }
        /// <summary>Správce skriptů</summary>
        public ScriptManager ScriptManager { get { return manager.ScriptManager; } }
        IFFScriptManager IFFScriptRunnable.ScriptManager { get { return manager.ScriptManager; } }

        private IEditableContent component;

        public Gordic.GFE.Parsers.Core.GFEDataItem StructureItem { get { return component.StructureItem; } }

        /// <summary>
        /// Vlastník (value)
        /// </summary>
        public object Owner
        {
            get { return component; }
        }

        IPage IDefaultDataBound.Page
        {
            get { return component.Page; }
        }

        #endregion

        #region IArgumentHandler
        bool m_Edit = false;
        /// <summary>Je položka editovatelná?</summary>
        public bool Edit
        {
            get
            {
                if (DataRow == null) return false; //nelze editovat neco, co neni v datech
                if (ViewReadOnly) return false;
                if (m_value == null)
                    try
                    {
                        SetValue(true); //spusti onData skript, ktery muze Edit zmenit
                    }
                    catch { }
                return m_Edit;
            }
            set { m_Edit = value; }
        }
        private bool ViewReadOnly
        {
            get
            {
                try
                {
                    return ((DefaultAbstractContent)component)._View.IsReadOnly;
                }
                catch { return false; }
            }
        }

    /// <summary>
    /// Dostupnost změny argumentu 'edit'
    /// </summary>
    public bool EnableEdit { get { return true; } }

        /// <summary>Je položka povinná?</summary>
        internal bool RequiredInternal
        {
            get
            {
                var v = component.Validators.OfType<GRequiredAttribute>().FirstOrDefault();
                return v != null;
            }
        }
        /// <summary>Je položka povinná?</summary>
        public bool Required
        {
            get
            {
                if (component != null && component.Visible == false) return false; //neviditelne -> neni povinne
                if (Edit == false) return false; //nelze editovat -> není povinné
                return RequiredInternal;
            }
            set
            {
                var v = component.Validators.OfType<GRequiredAttribute>().FirstOrDefault();
                if (value == (v != null)) return;
                if (value)
                    component.Validators.Add(new GRequiredAttribute());
                else
                    component.Validators.Remove(v);
            }
        }
        public void SetRequired(string message)
        {
            var v = component.Validators.OfType<GRequiredAttribute>().FirstOrDefault();
            if (v != null) component.Validators.Remove(v);
            component.Validators.Add(new GRequiredAttribute() { Message = message });
        }
        ///// <summary>Příznak povinné a nevyplněné položky. Takový formulář by neměl jít uložit/odeslat atp.</summary>
        //public bool EmptyRequired
        //{
        //    get { 
        //        if (m_value == null)
        //            try
        //            {
        //                SetValue(true); //spusti onData skript, ktery muze Edit zmenit
        //            }
        //            catch { }
        //        return Required && (IsError || m_value == null || string.IsNullOrWhiteSpace(Value.ToString()));
        //        }
        //}

        int row = 0;
        /// <summary>
        /// Argument 'row' položky
        /// </summary>
        public int Row { get { return row; } set { row = value; } }

        DataRow datarow = null;
        /// <summary>příslušný řádek dat</summary>
        public DataRow DataRow { get { return datarow; } }

        /// <summary>Hodnota klíče</summary>
        public string ComboKeyValue
        {
            get
            {
                    var keyName = component.ComboKeyName; //muze byt null
                    if (keyName != null)
                    {
                        var c = DataRow.Table.Columns[keyName];
                        if (c != null) return DataRow[c].ToString();
                    }
                return null;
            }
        }
        /// <summary>Hodnota hodnoty</summary>
        public string ComboValueValue
        {
            get
            {
                var valName = component.ComboValueName; //nebude nikdy null
                if (valName != null)
                {
                    var c = DataRow.Table.Columns[valName];
                    if (c != null) return DataRow[c].ToString();
                }
                return null;
            }
        }

        internal void AttachData(IEditableContent component, IDataRegion data)
        {
            this.component = component;
            this.manager = data.Manager;

            TypeRaw = component.AttrList.ContainsKey("type")
                ? component.AttrList["type"]
                : CommonService.GetTypeFromStructure(StructureItem);

            if (component.AttrList.ContainsKey("edit"))
                if (bool.TryParse(component.AttrList["edit"], out bool edit))
                    Edit = edit;

            if (component.AttrList.ContainsKey("required"))
                if (bool.TryParse(component.AttrList["required"], out bool req))
                    Required = req;

            datarow = data.GetDataRow(component.AttrList, component.DataFullName, true, out row);
            //row = datarow.Table.Rows.IndexOf(datarow); //index radku v jeho tabulce

            //pokus o ziskani formatovane hodnoty (to projde jen u GRR obsahu - napr. content uvnitr gridu)
            string fmt = data.GetFormattedValue((DefaultAbstractContent)component);
            if (fmt != null)
            {
                //cteni formatovane hodnoty spusti i onData skripty. nicmene nevime puvodni datovou hodnotu - jen vyslednou formatovanou
                m_value = manager.GetDataRowValueDef(datarow, component.DataName, component.Page, null);
                //SetValue(true); //puvodni hodnota by mohla byt v DataRow -> dohledame ;vyvolam onData/onValidate, nastaveni priznaku error atp.
                if (m_value == null) //pokud neni v DataRow jde nejspis o pocitanou vec (SUM atp.)
                {
                    //TODO m_value = data.GetValue(DefaultAbstractContent)component);
                    m_value = DataRegionGrr.unknown_value; //hodnotu na neco zmenime, aby se pak nepokousel hodnotu cist z datarow a volat na to formatovani (onData)
                }

                component.Text.Text = fmt;
                component.OnTextChanged();
                m_isFormatted = true;

                if (true)
                {
                    var l_oldValue = m_value;
                    //RunOnData();
                    if (ViewReadOnly == false)
                        RunOnValidate();
                    UpdateDataAfterValueChange(l_oldValue);
                }


                //cteni formatovane hodnoty muze zmenit ellipsis (u cisel na FILL)
                if (component.FormatTag.NativeContent is IGFormatContent content)
                {
                    content.getStyle(out IGFormatGRRCellStyle l_style);
                    if (l_style != null)
                    {
                        try
                        {
                            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(l_style.getEllipsisStyle(out Grr06ElStyle l_els));
                            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(l_style.getEllipsisChar(out char l_char));
                            component.Text.Ellipsis.Style = (ElStyle)l_els;
                            component.Text.Ellipsis.Char = l_char;
                        }
                        finally
                        {
                            Marshal.ReleaseComObject(l_style);
                            l_style = null;
                        }
                    }
                }
            }
              
            manager.RegisterDataItem(this);
        }

        private void UpdateDataAfterValueChange(object oldValue = null)
        {
            if (m_Edit == true && datarow != null && string.IsNullOrEmpty(component.DataName) == false && oldValue != m_value)
            {
                manager.SetDataRowValue(datarow, component.DataName, m_value, runRefresh: false);
            }
        }

        string m_typeraw;

        /// <summary>Typ editace</summary>
        public string TypeRaw { get { return m_typeraw; } set { m_typeraw = string.IsNullOrEmpty(value) ? "string" : value; } }

        /// <summary>Typ položky pro editaci</summary>
        public ControlType Type
        {
            get
            {
                switch (TypeRaw.ToLowerInvariant())
                {
                    case "string":
                    case "rtf-formatted":
                    case "rtftext": //=Gordic.Report.Implementation.Grr06DataType.RtfText.ToString().ToLower() vraci CommonService.GetTypeFromStructure
                    case "rtf-compressed":
                    case "rtfcompressed": //=Gordic.Report.Implementation.Grr06DataType.RtfCompressed.ToString().ToLower() vraci CommonService.GetTypeFromStructure
                    case "string-preserve-spaces":
                    case "stringnt":  //=Gordic.Report.Implementation.Grr06DataType.StringNT.ToString().ToLower() vraci CommonService.GetTypeFromStructure
                        return ControlType.StringType;
                    case "number":
                    case "decimal":
                    case "int16":
                    case "int32":
                    case "int64":
                        return ControlType.NumberType;
                    case "datetime":
                        return ControlType.DatetimeType;
                    case "date":
                        return ControlType.DateType;
                    case "list":
                        return ControlType.List;
                    case "stringlist":
                        return ControlType.List1;
                    case "esu":
                        return ControlType.Esu;
                    case "check":
                        return ControlType.CheckBox;
                    case "radio":
                        return ControlType.RadioButton;
                    case "multicheck":
                        return ControlType.MultiCheckBox;
                    default:
                        return ControlType.CustomType;
                }
            }
        }

        /// <summary>
        /// Indikuje, že změna argumentu 'edit' je povolená
        /// </summary>
        public bool EnableArgumentEdit { get { return false; } }
        #endregion

        ////------------------------------------------------------------------
        ///// <summary>
        ///// Reakce na změnu hodnoty
        ///// </summary>
        //public event EventHandlerNonArgument ValueChanged;
        ///// <summary>
        ///// Reakce na změnu hodnoty
        ///// </summary>
        //protected void OnValueChanged()
        //{
        //    if (ValueChanged != null)
        //        ValueChanged();
        //}

        ////------------------------------------------------------------------
        ///// <summary>
        ///// Aktualizace obsahu dat (z editace)
        ///// </summary>
        ///// <param name="content">Aktuální obsah</param>
        //public void UpdateDataContent(object content)
        //{
        //    string dataName = component.DataName;
        //    if (string.IsNullOrEmpty(dataName))
        //        Value = content;
        //    else
        //        UpdateDataContent(dataName, content); //vymaze Value (pres volani MakeDirty)
        //    RunOnValidate();
        //}
        ///// <summary>
        ///// Update souvisejícího obsahu (ale není přímo vázána)
        ///// </summary>
        //public bool UpdateDataContent(string dataName, object content)
        //{
        //    return manager.SetDataRowValue(datarow, dataName, content);
        //}
        /// <summary>
        /// Aktualizace obsahu dat (z editace)
        /// </summary>
        public void UpdateDataContent(string dataName, object content, bool runChangeScript)
        {
            if (string.IsNullOrEmpty(dataName))
            {
                MakeDirty();
                Value = content;
                if (runChangeScript)
                {
                    RunOnChangeAndValidate();
                }
            }
            else if (manager.SetDataRowValue(datarow, dataName, content, runOnChange: runChangeScript) && InputChanged != null)  //vymaze Value (pres volani MakeDirty)
                InputChanged(null, EventArgs.Empty);
        }
        public void RunOnChangeAndValidate()
        {
            RunOnChange();
            RunOnValidate();
            UpdateDataAfterValueChange();
        }

        internal void SetValue(bool runOnData, bool runOnEnter = false)
        {
            //pokud uz mam value nactenou, nectu znovu
            if (m_value == null)
            {
                if (datarow != null)
                {
                    m_value = manager.GetDataRowValue(datarow, component.DataName, component.Page);
                    if (m_Edit == false && m_value == DBNull.Value)
                        m_value = DefaultDataManager.DsValue2ExtValue(Type);
                }
                if (runOnEnter)
                    RunOnEnter();
                if (runOnData)
                {
                    var l_oldValue = m_value;
                    RunOnData();
                    if (ViewReadOnly == false)
                        RunOnValidate();
                    UpdateDataAfterValueChange(l_oldValue);
                }
            }
        }
        //------------------------------------------------------------------
        /// <summary>
        /// Nastavení zobrazené hodnoty (vola se z OnPaint)
        /// TODO: zkusít volát nějak jinak, něž z OnPaint - aby zbytečne se metoda nezatěžovala
        /// </summary>
        public void SetDisplayValue()
        {
            SetValue(true);
            if (m_isFormatted == false)
            {
                // nastavení obsahu
                var t = FormatValue();
                t = RunOnPrint(t);

                //nahrazeni 7f mezer za normalni mezeru (zatim)
                //TODO: zobrazit 7f mezery
                var i = t.IndexOf('\x7f');
                while (i >= 0)
                {
                    t = t.Substring(0, i) + " " + t.Substring(i + 2);
                    i = t.IndexOf('\x7f');
                }

                component.Text.Text = t;
                component.OnTextChanged();

                m_isFormatted = true;
            }
            //MAL 2013/11/20 - nevim co to tady melo delat. pokud je isformatted, tak by Text jiz mel byt nastaven a i ve Value neco bylo vzdy byt
            //else if (Value == null)
            //    component.Text.Text = string.Empty;
        }

        //------------------------------------------------------------------
        /// <summary>
        /// Indikuje změnu hodnoty položky od naposledy použité hodnoty
        /// </summary>
        public bool IsDirty { get { return Value == null; } }
        /// <summary>
        /// Nastaven změny hodnoty
        /// </summary>
        public void MakeDirty()
        {
            Value = null;
            //if (((DefaultAbstractContent)component)._View is DefaultAbstractViewContent v)
            //    v.MakeDirty();

            //// aktualizujeme zobrazovanou hodnotu
            //SetDisplayValue(component.Text);

            //vyvolani prekresleni s novou hodnotou
            var pn = ((DefaultAbstractContent)component).PagePanel;
            if (pn != null) pn.Control.Invalidate();
        }

        public IEditControl CreateEditControl()
        {
            switch (Type)
            {
                case ControlType.StringType:
                    //ctl = new RichTextBoxControl()
                    //{
                    //    Text = v.Text,
                    //    Multiline = v.Multiline,
                    //    Font = new Font(v.FontName, v.FontSize, v.Style),
                    //    ForeColor = v.FontColor,
                    //    BackColor = v.BackgroundColor != Color.Transparent ? v.BackgroundColor : Color.White,
                    //    BulletIndent = 10,
                    //    AcceptsTab = false
                    //};
                    //(ActiveControl as RichTextBoxControl).TextChanged += delegate { ValueChange(); };
                    return new LtbControl()
                    {
                        Multiline = component.Text.MultiLine,
                        Text = Value.ToString(),
                        Font = new Font(component.Text.TextFont.FontFamily.Name, component.Text.TextFont.Size.Point, (FontStyle)component.Text.TextFont.Style),
                        ForeColor = component.Text.TextFont.ForeColor.Color,
                        BackColor = component.Text.TextFont.BackColor.Color != Color.Transparent ? component.Text.TextFont.BackColor.Color : Color.White,
                        AcceptsTab = false,
                        TextAlign = Halign(component.Text.Align.Horizontal),
                        DataItem = (IDefaultDataItemHandler)component
                    };
                case ControlType.NumberType:
                    return new DecimalControl()
                    {
                        Value = GDecimal.Parse(Value, acceptNull: true), //Text = v.Text,
                        Font = new Font(component.Text.TextFont.FontFamily.Name, component.Text.TextFont.Size.Point, (FontStyle)component.Text.TextFont.Style),
                        ForeColor = component.Text.TextFont.ForeColor.Color,
                        BackColor = component.Text.TextFont.BackColor.Color != Color.Transparent ? component.Text.TextFont.BackColor.Color : Color.White,
                        TextAlign = Halign(component.Text.Align.Horizontal),
                        DataItem = (IDefaultDataItemHandler)component
                    };
                case ControlType.DatetimeType:
                    if (DateTimePickerControl.CheckDateTimeFormat(component.Text.Format))
                        return new DateTimePickerControl()
                        {
                            Value = GDateTime.Parse(Value, acceptNull: true),
                            Font = new Font(component.Text.TextFont.FontFamily.Name, component.Text.TextFont.Size.Point, (FontStyle)component.Text.TextFont.Style),
                            ForeColor = component.Text.TextFont.ForeColor.Color,
                            BackColor = component.Text.TextFont.BackColor.Color != Color.Transparent ? component.Text.TextFont.BackColor.Color : Color.White,
                            TextAlign = Halign(component.Text.Align.Horizontal),
                            DataItem = (IDefaultDataItemHandler)component
                        };
                    else
                        return new DatePickerControl()
                        {
                            Value = GDateTime.Parse(Value, acceptNull: true),
                            Font = new Font(component.Text.TextFont.FontFamily.Name, component.Text.TextFont.Size.Point, (FontStyle)component.Text.TextFont.Style),
                            ForeColor = component.Text.TextFont.ForeColor.Color,
                            BackColor = component.Text.TextFont.BackColor.Color != Color.Transparent ? component.Text.TextFont.BackColor.Color : Color.White,
                            TextAlign = Halign(component.Text.Align.Horizontal),
                            DataItem = (IDefaultDataItemHandler)component
                        };
                case ControlType.DateType:
                    return new DatePickerControl()
                    {
                        Value = GDateTime.Parse(Value, acceptNull: true),
                        Font = new Font(component.Text.TextFont.FontFamily.Name, component.Text.TextFont.Size.Point, (FontStyle)component.Text.TextFont.Style),
                        ForeColor = component.Text.TextFont.ForeColor.Color,
                        BackColor = component.Text.TextFont.BackColor.Color != Color.Transparent ? component.Text.TextFont.BackColor.Color : Color.White,
                        TextAlign = Halign(component.Text.Align.Horizontal),
                        DataItem = (IDefaultDataItemHandler)component
                    };
                case ControlType.List:
                case ControlType.List1:
                    //type="List" items="X1|X2|X3|X4"
                    ComboControl cb = new ComboControl()
                    {
                        Font = new Font(component.Text.TextFont.FontFamily.Name, component.Text.TextFont.Size.Point, (FontStyle)component.Text.TextFont.Style),
                        ForeColor = component.Text.TextFont.ForeColor.Color,
                        BackColor = component.Text.TextFont.BackColor.Color != Color.Transparent ? component.Text.TextFont.BackColor.Color : Color.White,
                        TextAlign = Halign(component.Text.Align.Horizontal),
                        AcceptsTab = false,
                        DataItem = (IDefaultDataItemHandler)component,
                        DropDownStyle = Type == ControlType.List ? ComboBoxStyle.DropDownList : ComboBoxStyle.DropDown,
                    };
                    cb.AddItems(component.ComboItems, ComboKeyValue, ComboValueValue);
                    return cb;
                case ControlType.Esu:
                    var name = DataName; // component.Attributes["name"];
                    if (name.EndsWith("_txt") == false) return null;
                    name = name.Substring(0, name.Length - 4);

                    return CreateCustomType(string.Format(
                        "Gordic.Esu.WinClient.GTbDataGinsesuUniversal{{EsuItem=Nazev,SelectZo=true}}"
                        + "@{0}:IxsEsu"
                        + ",{0}_zkratka:ExterniSubjektRow.zkratka"
                        + ",{0}_nazev:Nazev"
                        + ",{0}_stat:ExterniSubjektRow.stat"
                        + ",{0}_obec:ExterniSubjektRow.obec"
                        + ",{0}_psc:ExterniSubjektRow.psc"
                        + ",{0}_ulice:ExterniSubjektRow.ulice"
                        + ",{0}_mail:ExterniSubjektRow.mail"
                        + ",{0}_tel:ExterniSubjektRow.tel"
                        + ",{0}_ico:Ico"
                        + ",{0}_dic:Dic"
                        + ",{0}_zop:PorZast"
                        + ",{0}_zol:LicZast"
                        + ",{0}_zo:ZastTxt"
                        , name));
                default:
                    if (TypeRaw.StartsWith("prefab("))
                    {
                        //var p = TypeRaw.Substring("prefab(".Length).TrimEnd(')').Split(',');
                        //var n = p[0];
                        //switch(n)
                        //{
                        //    case "ico":
                        //}
                        goto case ControlType.StringType;
                    }

                    return CreateCustomType(TypeRaw);
            }
            //return null;
        }

        private class GIcoAttribute2 : GIcoAttribute
        {
            public override string Type => null; //nedavat do JS
        }
        public void CreateValidators(List<GValidationAttribute> l)
        {
            if (TypeRaw.StartsWith("prefab("))
            {
                var p = TypeRaw.Substring("prefab(".Length).TrimEnd(')').Split(',');
                var n = p[0];
                switch (n)
                {
                    case "ico":
                        l.Add(new GIcoAttribute2());
                        break;
                }
            }
        }

        private IEditControl CreateCustomType(string tn)
        {
            //rozkodovani jmena typu
            string tm = "";
            var ti = tn.IndexOf('@');
            if (ti > 0)
            {
                tm = tn.Substring(ti + 1);
                tn = tn.Substring(0, ti);
            }
            string tinit = "";
            ti = tn.IndexOf('{');
            if (ti > 0)
            {
                tinit = tn.Substring(ti + 1).TrimEnd('}', ' ');
                tn = tn.Substring(0, ti);
            }

            //typ bud se jmenem assembly nebo gordic se bere podle namespace
            string name = null;
            if (tn.Contains(','))
                name = tn;
            else if (tn.StartsWith("gordic.", StringComparison.InvariantCultureIgnoreCase))
            {
                var ns = tn.Split('.');
                var an = string.Join(".", ns, 0, ns.Length - 1);

                foreach (System.Reflection.Assembly a in AppDomain.CurrentDomain.GetAssemblies())
                {
                    var asName = a.GetName();
                    if (asName.Name == an) { name = tn + ", " + asName.FullName; break; }
                }
                //if (name == null)
                //{
                //    //System.Reflection.Assembly.LoadFrom(GUserProcess.Current.ApplicationInfo.GinisPath
                //    name = tn + ", " + an;
                //}
            }

            //vlastni typ policka
            if (name != null)
            {
                var t = System.Type.GetType(name, false, true);
                if (t != null)
                    return new WrapperControl(t, component.Text.Text)
                    {
                        Mapping = tm,
                        Init = tinit,
                        DataItem = (IDefaultDataItemHandler)component
                    };
            }

            return null;
        }

        HorizontalAlignment Halign(HAlign align)
        {
            switch (align)
            {
                case HAlign.right: return HorizontalAlignment.Right;
                case HAlign.center: return HorizontalAlignment.Center;
                default: return HorizontalAlignment.Left;
            }
        }

        #region IDisposable Members
        private bool disposedValue = false; // To detect redundant calls

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                }
                if (m_OnClick != null) m_OnClick.Dispose();
                if (m_OnData != null) m_OnData.Dispose();
                if (m_OnEdit != null) m_OnEdit.Dispose();
                if (m_OnEnter != null) m_OnEnter.Dispose();
                if (m_OnValidate != null) m_OnValidate.Dispose();
                if (m_OnChange != null) m_OnChange.Dispose();

                disposedValue = true;
            }
        }
        ~DefaultDataItem() { Dispose(false); }
        #endregion
    }
}
