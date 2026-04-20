//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrfContentAttachment.cs                </Name>
//    <Description> příloha sestav                                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-03-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using Gordic.Report.Implementation;
using System.Data;
using System.Runtime.InteropServices;
using Gordic.General;
using System.Text;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// příloha
    /// </summary>
    public class DomContentAttachment : IMouseHandler
    {
        #region IMouseHandler
        /// <exclude/>
        public void IOnMouseUp(System.Windows.Forms.MouseEventArgs e)
        {
            isMouseDown = false;
            OpenFile(FileName);
        }

        public void Remove()
        {
            OnAfterRemoveFile(FileName);
        }

        private void OpenFile(string fileName)
        {
            try
            {
                Process proc = new Process
                {
                    StartInfo = new ProcessStartInfo(FileName)
                };
                proc.Start();
            }
            catch (Exception x)
            {
                MessageService.ShowError(x);
            }
        }

        /// <exclude/>
        public void IOnMouseDown(System.Windows.Forms.MouseEventArgs e)
        {
            isMouseDown = true;
        }
        #endregion

        bool isMouseDown;
        /// <summary>
        /// indikuje opuštění myši
        /// </summary>
        public bool IsMouseDown { get { return isMouseDown; } }

        /// <summary>
        /// volá se po přidání přílohy
        /// </summary>
        public event EventHandlerStringArgument AfterAdd;
        /// <summary>
        /// volá se po přidání přílohy
        /// </summary>
        public event EventHandlerContextMenu AfterRemove;

        /// <summary>
        /// textový atribut přílohy
        /// </summary>
        public AttachmentText Text { get; set; }

        /// <summary>
        /// textový atribut přílohy
        /// </summary>
        public string[] Filter { get; set; }

        /// <summary>
        /// název souboru přílohy
        /// </summary>
        public string FileName
        {
            get { return Text.File; }
            set { OnAfterAddFile(value); }
        }
        public string ShortFileName { get { return Path.GetFileName(FileName); } }

        /// <summary>
        /// ID do externího systému souborů
        /// </summary>
        public string FileServiceId
        {
            get;
            set;
        }


        public float Width { get; internal set; }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public DomContentAttachment() { }

        /// <exclude/>
        internal void Paint(Graphics graphics, RectangleF rectangleF, IComplexFive padding, float zoom)
        {
            Text.Paint(graphics, rectangleF, padding, zoom);
            //graphics.DrawImage(WinFormsResourceService.GetBitmap("Icons__Gin__vymazat"), new RectangleF(rectangleF.Left, rectangleF.Top, 10, 10));
            var bmp = ImageService.ResizeImage(Properties.Resources.Icons__Gin__vymazat, 10, 10);
            if (bmp != null)
                graphics.DrawImage(bmp, rectangleF.Left, rectangleF.Top);
        }

        void OnAfterAddFile(string value)
        {
            if (AfterAdd != null && !string.IsNullOrEmpty(value))
                Text.File = AfterAdd(value).ToString();
        }
        void OnAfterRemoveFile(string value)
        {
            AfterRemove?.Invoke(this, new EventArgsContextMenu(value, this));
        }
    }
    /// <summary>
    /// příloha sestav
    /// </summary>
    public class DefaultContentAttachment : DefaultAbstractContent, IMouseHandler, IMouseComponent, IEditableContent, IDefaultDataItemHandler
    {
        #region DefaultContentAttachment
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            if (isLoaded)
                return;

            if (FormatTag.Attributes.ContainsKey("text"))
                Text.Text = FormatTag.Attributes["text"];
            base.LoadInformation();

            // pokud to není textové pole pak není co řešit
            if (FormatTag is GFEFormatUnknownContent)
            {
                if (FormatTag.Attributes.ContainsKey("guid"))
                    guid = FormatTag.Attributes["guid"];

                if (string.IsNullOrEmpty(guid))
                {
                    MessageService.ShowError(GResources.GetResourceText(29450705) + "\r\n" + GResources.GetResourceText(29450706));
                    return;
                }
            }
            isLoaded = true;
        }

        DomContentAttachment AddItem(string item)
        {
            DomContentAttachment att = new DomContentAttachment
            {
                Text = new AttachmentText()
            };
            att.Text.Initialize(this, Text);
            if (FormatTag.Attributes.ContainsKey("filter"))
                att.Filter = FormatTag.Attributes["filter"].Split(';');
            att.AfterAdd += Att_AfterAdd;
            att.AfterRemove += Att_AfterRemove;

            if (!string.IsNullOrEmpty(item))
                att.Text.File = item;

            list.Add(att);
            return att;
        }

        public System.IO.FileInfo GetFileInfo(DomContentAttachment a)
        {
            string newName = Path.Combine(directoryPath, "attach", guid, a.ShortFileName);
            return new System.IO.FileInfo(newName);
        }

        object Att_AfterAdd(string fileName)
        {
            if (!string.IsNullOrEmpty(fileName))
                try
                {
                    if (!Directory.Exists(Path.Combine(directoryPath, "attach", guid)))
                        Directory.CreateDirectory(Path.Combine(directoryPath, "attach", guid));
                    string newName = Path.Combine(directoryPath, "attach", guid, Path.GetFileName(fileName));
                    FileUtility.ObservedCopy(fileName, newName);
                    _View.PrimaryFile.IsDirty = true;
                    //list.RunOnValidate();
                    return newName;
                }
                catch { }

            return null;
        }
        object Att_AfterAdd(string fileName, byte[] bytes)
        {
            try
            {
                if (!Directory.Exists(Path.Combine(directoryPath, "attach", guid)))
                    Directory.CreateDirectory(Path.Combine(directoryPath, "attach", guid));
                string newName = Path.Combine(directoryPath, "attach", guid, Path.GetFileName(fileName));
                File.WriteAllBytes(newName, bytes);
                _View.PrimaryFile.IsDirty = true;
                list.RunOnValidate();
                return newName;
            }
            catch { }

            return null;
        }
        object Att_AfterAdd(string fileName, string tempFile, bool deleteTemp)
        {
            if (!string.IsNullOrEmpty(fileName))
                try
                {
                    if (!Directory.Exists(Path.Combine(directoryPath, "attach", guid)))
                        Directory.CreateDirectory(Path.Combine(directoryPath, "attach", guid));
                    string newName = Path.Combine(directoryPath, "attach", guid, Path.GetFileName(fileName));
                    if (deleteTemp)
                        File.Move(tempFile, newName);
                    else
                        File.Copy(tempFile, newName);
                    _View.PrimaryFile.IsDirty = true;
                    //list.RunOnValidate();
                    return newName;
                }
                catch { }

            return null;
        }

        void Att_AfterRemove(object sender, EventArgsContextMenu e)
        {
            if (e == EventArgs.Empty)
                return;
            if (!(e.Owner is DomContentAttachment a))
                return;

            if (MessageService.AskQuestion(string.Format(GResources.GetResourceText(29450707), a.ShortFileName)))
                DeleteFile(a);
        }

        protected override void DrawContent(Graphics graphics)
        {
            //sponka
            float size = (float)Math.Ceiling(Math.Min(HeightZoom, WidthZoom));
            float top = (float)Math.Ceiling(TopZoom + (HeightZoom - size)/2);

            if (list.Count == 0)
            {
                //base.DrawContent(graphics);
                if (Text.TextFont.ForeColor.Color == Color.Black && ((GFEFormatContent)FormatTag)?.Style?.Attributes?.ContainsKey("font-color") != true)
                {
                    var text2 = new TagText();
                    text2.Initialize(this, Text);
                    text2.TextFont.ForeColor.Initialize(Color.Silver);
                    text2.Paint(graphics, BoundsInPixels, Padding, Zoom);
                }
                else
                    Text.Paint(graphics, BoundsInPixels, Padding, Zoom);
            }
            else
            {
                float width = (float)Math.Ceiling((WidthZoom - size));

                // kreslení textu
                if (list.Count > 1)
                    width = width / list.Count;
                if (width > 1) //není už co kreslit
                {
                    float left = LeftZoom;

                    foreach (var item in list)
                        if (item.FileName != null)
                        {
                            item.Paint(graphics, new RectangleF(left, TopZoom, width, HeightZoom), Padding, Zoom);
                            left += width;
                        }
                }
            }

            //sponka
            RectangleF buttonBoundsInPixels = new RectangleF((float)Math.Ceiling(LeftZoom + WidthZoom - size), top, size, size);
            using (System.Drawing.Drawing2D.LinearGradientBrush gradBrush = new System.Drawing.Drawing2D.LinearGradientBrush(buttonBoundsInPixels, Color.LightSlateGray, Color.LightGray, 0, true))
            {
                graphics.FillRectangle(gradBrush, buttonBoundsInPixels);
                graphics.DrawRectangle(new Pen(SystemBrushes.ActiveBorder), buttonBoundsInPixels.Left, top, size - 2, size - 2);
                Image img = ImageService.ResizeImage(Properties.Resources.priloha, size - 2, size - 2);
                foreach (var a in Validators.OfType<GAttCountAttribute>().Where(a => a.HasMaximum))
                    if (a.Maximum <= list.Count) { img = ImageService.MakeDisabledImage(img); break; }

                if (img != null)
                    graphics.DrawImage(img, (float)Math.Ceiling(LeftZoom + WidthZoom - size), top);
            }
        }

        ///// <exclude/>
        //public override void OnPaint(Graphics graphics, PaintArgs args)
        //{
        //    base.OnPaint(graphics, args);

        //    if (args.DrawContent)
        //    {
        //        // kreslení textu
        //        float width = (float)Math.Ceiling((WidthZoom - HeightZoom));
        //        if (list.Count > 1)
        //            width = width / list.Count;
        //        float left = LeftZoom;

        //        foreach (var item in list)
        //            if (item.FileName != null)
        //            {
        //                item.Paint(graphics, new RectangleF(left, TopZoom, width, HeightZoom), Padding, Zoom);
        //                left += width;
        //            }
        //    }
        //}        
        #endregion

        string directoryPath;
        string guid;
        /// <summary>
        /// Filter typů souborů příloh
        /// </summary>
        public string Guid { get { return guid; } }

        public class List : List<DomContentAttachment>, IDefaultDataItem, IDisposable
        {
            private DefaultContentAttachment component;
            /// <summary>
            /// změna hodnoty
            /// </summary>
            public event EventHandler InputChanged;

            internal List(DefaultContentAttachment component, IDataRegion data)
            {
                this.component = component;
                this.manager = data.Manager;

                DataRow = data.GetDataRow(component.AttrList, component.DataFullName, true, out int rowIndex);
                Row = rowIndex;// DataRow.Table.Rows.IndexOf(DataRow); //index radku v jeho tabulce

                if (component.AttrList.ContainsKey("required"))
                    if (bool.TryParse(component.AttrList["required"], out bool req))
                        Required = req;

                manager.RegisterDataItem(this);
            }

            /// <summary>
            /// Spuštění skriptu OnData
            /// </summary>
            public void RunOnData()
            {
                var s = OnData;
                if (s != null) ScriptManager.RunScript(s);
            }
            /// <summary>
            /// Spuštění validace skriptu
            /// </summary>
            public void RunOnChange()
            {
                var s = OnChange;
                if (s != null) ScriptManager.RunScript(s);
            }
            public void RunOnValidate()
            {
                var s = OnValidate;
                if (s == null && component.Validators.Count == 0) return;
                //SetValue(false);

                ClearError();
                if (s != null) ScriptManager.RunScript(s);
                if (IsError) return;

                foreach (var v in component.Validators)
                {
                    v.Init(typeof(List));
                    if (v.IsValid(this) == false)
                    { SetError(v); return; }
                }
            }

            public void RunOnChangeAndValidate()
            {
                SetValue();
                RunOnChange();
                RunOnValidate();
            }

            public string ComboKeyName => throw new NotImplementedException();

            public string ComboKeyValue => throw new NotImplementedException();

            public string ComboValueName => throw new NotImplementedException();

            public string ComboValueValue => throw new NotImplementedException();

            public string DataName => component.DataName;

            /// <summary>
            /// Argument 'row' položky
            /// </summary>
            public int Row { get; set; } = 0;

            /// <summary>příslušný řádek dat</summary>
            public DataRow DataRow { get; private set; }

            public bool Edit
            {
                get
                {
                    if (DataRow == null) return false; //nelze editovat neco, co neni v datech
                    if (ViewReadOnly) return false;
                    //if (m_value == null)
                    //    try
                    //    {
                    //        SetValue(true); //spusti onData skript, ktery muze Edit zmenit
                    //    }
                    //    catch { }
                    //return m_Edit;
                    return true;
                }
                set => throw new NotImplementedException();
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

            //public bool EmptyRequired
            //{
            //    get
            //    {
            //        return false;
            //    }
            //}

            public bool EnableEdit
            {
                get
                {
                    throw new NotImplementedException();
                }
            }

            private GScript m_OnData;
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


            public object Owner => component;
            public DefaultContentAttachment Component => component;

            public IPage Page => Component.Page;

            private DefaultDataManager manager;
            /// <summary>Správce dat</summary>
            public DefaultDataManager DataManager { get { return manager; } }
            /// <summary>Správce skriptů</summary>
            public ScriptManager ScriptManager { get { return manager.ScriptManager; } }
            IFFScriptManager IFFScriptRunnable.ScriptManager { get { return manager.ScriptManager; } }

            public GFEDataItem StructureItem => Component.StructureItem;

            public ControlType Type => ControlType.Attachment;

            public object Value => this;

            public IEditControl CreateEditControl()
            {
                //return new LtbControl()
                //{
                //    Multiline = component.Text.MultiLine,
                //    Text = Value.ToString(),
                //    Font = new Font(component.Text.TextFont.FontFamily.Name, component.Text.TextFont.Size.Point, (FontStyle)component.Text.TextFont.Style),
                //    ForeColor = component.Text.TextFont.ForeColor.Color,
                //    BackColor = component.Text.TextFont.BackColor.Color != Color.Transparent ? component.Text.TextFont.BackColor.Color : Color.White,
                //    AcceptsTab = false,
                //    TextAlign = System.Windows.Forms.HorizontalAlignment.Left,
                //    DataItem = (IDefaultDataItemHandler)component
                //};
                return null;
            }
            public void CreateValidators(List<GValidationAttribute> l)
            {
            }

            bool m_dirty = true;
            public void MakeDirty()
            {
                InputChanged?.Invoke(this, EventArgs.Empty);
                m_dirty = true;
            }
            public string Filenames
            {
                get
                {
                    var sb = new StringBuilder();
                    foreach (var item in this)
                        if (item.FileName != null)
                        {
                            if (sb.Length > 0) sb.Append(';');
                            sb.Append(item.ShortFileName);
                        }
                    return sb.ToString();
                }
            }
            internal void SetValue()
            {
                if (string.IsNullOrEmpty(DataName)) return;
                manager.SetDataRowValue(DataRow, DataName, Filenames, refreshExcept: this);
            }

            public void RunOnEdit()
            {
            }

            public void SetDisplayValue()
            {
                if (m_dirty == true)
                {
                    m_dirty = false;
                    RunOnData();
                    RunOnValidate();
                    SetValue();
                }
            }
            /// <summary>Je položka povinná?</summary>
            internal bool RequiredInternal => component.Validators.OfType<GAttCountAttribute>().Any(a => a.HasMinimum && a.Minimum >= 1);
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
                    var v = component.Validators.OfType<GAttCountAttribute>().FirstOrDefault();
                    if (value == (v != null && v.HasMinimum && v.Minimum >= 1)) return;
                    if (value)
                    {
                        if (v != null) v.Minimum = 1;
                        else component.Validators.Add(new GAttCountAttribute() { Minimum = 1 });
                    }
                    else
                        if (v != null) v.Minimum = 0;
                }
            }

            public int getProperty([MarshalAs(UnmanagedType.LPStr)] string name, out IDataScriptable value)
            {
                switch (name)
                {
                    case "value":
                    case "data":
                        value = ScriptManager.Engine.GetScriptableString(name, Filenames);
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
                    case "delete":
                        value = new GScriptableMethod(ScriptManager.Engine, name, delegate (IDataScriptable[] args)
                        {
                            this.component.DeleteAll();
                            return null;
                        });
                        return 0;
                    case "length":
                        value = ScriptManager.Engine.GetScriptableNumber(name, Length);
                        return 0;
                    case "count":
                        value = ScriptManager.Engine.GetScriptableNumber(name, Count);
                        return 0;
                    default:
                        return Component.GetProperty(ScriptManager, name, out value);
                }
            }

            public Int64 Length
            {
                get
                {
                    Int64 length = 0;
                    foreach (var a in this)
                    {
                        var f = Component.GetFileInfo(a);
                        if(!f.Exists)
                            GLogManager.CurrentClassLogger().Warn($"attachment file '{f.Name}' not exist?!");
                        else
                            length += f.Length;
                    }
                    return length;
                }
            }


            public int setProperty([MarshalAs(UnmanagedType.LPStr)] string name, IDataScriptable value)
            {
                switch (name)
                {
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
                    default:
                        return Component.SetProperty(ScriptManager, name, value);
                }
            }


            private ValidationResult m_error = null;
            /// <summary>Příznak chybné hodnoty. Některá pole to mohou nastavit a takové jsou pak červeně zvýrazněné</summary>
            public bool IsError => m_error != null;
            /// <summary>Validace</summary>
            public ValidationResult ValidationResult => m_error;

            public void ClearError()
            {
                m_error = null;
            }
            public void SetError(string message)
            {
                m_error = new ValidationResult(component, message);
            }
            public void SetError(GValidationAttribute v)
            {
                m_error = new ValidationResult(component, v);
            }

            #region IDisposable Support
            private bool disposedValue = false; // To detect redundant calls

            protected virtual void Dispose(bool disposing)
            {
                if (!disposedValue)
                {
                    if (disposing)
                    {
                    }
                    //if (m_OnClick != null) m_OnClick.Dispose();
                    if (m_OnData != null) m_OnData.Dispose();
                    //if (m_OnEdit != null) m_OnEdit.Dispose();
                    //if (m_OnEnter != null) m_OnEnter.Dispose();
                    if (m_OnValidate != null) m_OnValidate.Dispose();
                    if (m_OnChange != null) m_OnChange.Dispose();

                    disposedValue = true;
                }
            }

            ~List() { Dispose(false); }

            void IDisposable.Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }
            #endregion

        }
        List list;

        public IDefaultDataItem DataItem { get { return list; } }
        public bool IsError => list.IsError;
        public ValidationResult ValidationResult => list.ValidationResult;
        public IEnumerable<DomContentAttachment> Files { get { return list; } }

        ///// <summary>
        ///// inicializace objektu
        ///// </summary>
        ///// <param name="item">položka s informaci o objektu</param>
        ///// <param name="view">pohled objektu</param>
        //public override void Initialize(GFEFormatTag item, IViewContent view)
        //{
        //    base.Initialize(item, view);
        //    ComponentType = ComponentType.attachment;
        //    directoryPath = Path.GetDirectoryName(view.PrimaryFile.FileName);
        //    LoadInformation();
        //}
        protected override void AttachData(IDataRegion dataRegion)
        {
            Debug.Assert(dataRegion != null);
            list = new List(this, dataRegion);
            directoryPath = Path.GetDirectoryName(_View.PrimaryFile.FileName);
            string dirPath = Path.Combine(directoryPath, "attach", guid);
            if (!string.IsNullOrEmpty(directoryPath)
                && Directory.Exists(dirPath))
                foreach (var item in Directory.GetFiles(dirPath))
                    AddItem(item);
        }

        protected internal override void AfterLoad()
        {
            list.MakeDirty();
            //pokud existuje onData skript, musim ho spustit hned. Kvuli spravnemu poradi skriptu (v pripade, ze by neco delali s globalnimi promennymi)
            if (/*Scripts.ContainsKey("onData") ||*/ Scripts.ContainsKey("onValidate") || /*Scripts.ContainsKey("onEnter") ||*/ Validators.Count > 0)
                list.SetDisplayValue();
        }

        /// <summary>počet příloh</summary>
        public int Count { get { return list.Count; } }

        /// <summary>Je položka editovatelná?</summary>
        public bool Edit
        {
            get
            {
                if (Guid == null) return false; //nelze editovat neco, co neni v datech
                if (_View.IsReadOnly) return false;

                //return m_Edit;
                return true;
            }
            //set { m_Edit = value; }
        }
        #region IMouseHandler
        public RectangleF AddAttachmentRect
        {
            get
            {
                if (Edit == false) return RectangleF.Empty;
                var r = new RectangleF(LeftZoom + WidthZoom - (float)Math.Ceiling(HeightZoom), (float)Math.Ceiling(TopZoom), (float)Math.Ceiling(HeightZoom), (float)Math.Ceiling(HeightZoom));
                if (PagePanel != null)
                    r.Offset(-PagePanel.HorizontalScroll.Value, -PagePanel.VerticalScroll.Value);
                return r;
            }
        }
        public RectangleF OpenAttachmentRect(int index)
        {
            float width = (float)Math.Ceiling((WidthZoom - HeightZoom));
            if (list.Count > 1)
                width = width / list.Count;
            var r = new RectangleF(LeftZoom + width * index, TopZoom, width, HeightZoom);
            if (PagePanel != null)
                r.Offset(-PagePanel.HorizontalScroll.Value, -PagePanel.VerticalScroll.Value);
            return r;
        }
        public RectangleF DeleteAttachmentRect(int index)
        {
            float width = (float)Math.Ceiling((WidthZoom - HeightZoom));
            if (list.Count > 1)
                width = width / list.Count;
            var r = new RectangleF(LeftZoom + width * index, TopZoom, 10, 10);
            if (PagePanel != null)
                r.Offset(-PagePanel.HorizontalScroll.Value, -PagePanel.VerticalScroll.Value);
            return r;
        }
        public DomContentAttachment AddFile(string fileName, byte[] bytes = null, string tempFile = null)
        {
            if (!string.IsNullOrEmpty(fileName))
            {
                fileName = MangleFilename(fileName);
                
                var f = Files.FirstOrDefault(x => x.ShortFileName == fileName);
                if (f != null)
                {
                    GLogManager.CurrentClassLogger().Warn($"attachment file '{f.ShortFileName}' already exist!");
                    return null;
                }

                var att = AddItem(fileName);
                if (tempFile != null)
                    att.Text.File = Att_AfterAdd(fileName, tempFile, true).ToString();
                else if (bytes != null)
                    att.Text.File = Att_AfterAdd(fileName, bytes).ToString();
                else
                    att.Text.File = Att_AfterAdd(fileName).ToString();
                list.RunOnChangeAndValidate();
                return att;
            }
            return null;
        }

        private string MangleFilename(string fileName)
        {
            var ac = FormatTag.Attributes.GetValueDefault("allowedFilenameChar").ToCharArray();
            if (ac.Length > 0)
            {
                var ext = Path.GetExtension(fileName);
                var fn = Path.GetFileNameWithoutExtension(fileName);
                var result = new string(fn.Where(o => char.IsLetterOrDigit(o) || ac.Contains(o)).ToArray());
                fileName = result + ext;
            }
            var dc = FormatTag.Attributes.GetValueDefault("disallowedFilenameChar").ToCharArray();
            if (dc.Length > 0)
            {
                var ext = Path.GetExtension(fileName);
                var fn = Path.GetFileNameWithoutExtension(fileName);
                var result = new string(fn.Where(o => !dc.Contains(o)).ToArray());
                fileName = result + ext;
            }

            if (Int32.TryParse(FormatTag.Attributes.GetValueDefault("maxFilenameLength"), out var ml))
            {
                var ext = Path.GetExtension(fileName);
                var fn = Path.GetFileNameWithoutExtension(fileName);
                var result = fn.Substring(0, Math.Min(ml, fn.Length));
                fileName = result + ext;
            }

            return fileName;
        }

        public string GetFile(int index)
        {
            string newName = Path.Combine(directoryPath, "attach", guid, list[index].ShortFileName);
            return newName;
        }
        public void DeleteFile(int index)
        {
            //volano pro stare LK BackgroundRenderer
            FileUtility.ObservedDelete(new List<string>() { list[index].FileName });
            _View.PrimaryFile.IsDirty = true;

            list.RemoveAt(index);
            list.RunOnChangeAndValidate();

            PagePanel?.Invalidate();
        }
        public void DeleteAll()
        {
            if (list.Count == 0) return;
            foreach(DomContentAttachment f in list)
                if (!string.IsNullOrEmpty(f.FileName) && File.Exists(f.FileName))
                {
                    FileUtility.ObservedDelete(new List<string>() { f.FileName });
                }
            _View.PrimaryFile.IsDirty = true;
            list.Clear();
            list.RunOnChangeAndValidate();

            PagePanel?.Invalidate();
        }
        public DomContentAttachment DeleteAllAndAddFile(string fileName, byte[] bytes = null)
        {
            if (list.Count >= 0)
            {
                foreach (DomContentAttachment f in list)
                    if (!string.IsNullOrEmpty(f.FileName) && File.Exists(f.FileName))
                    {
                        FileUtility.ObservedDelete(new List<string>() { f.FileName });
                    }
                _View.PrimaryFile.IsDirty = true;
                list.Clear();
            }
            var att = AddItem(fileName);
            if (bytes != null)
                att.Text.File = Att_AfterAdd(fileName, bytes).ToString();
            else
                att.Text.File = Att_AfterAdd(fileName).ToString();
            list.RunOnChangeAndValidate();
            PagePanel?.Invalidate();
            return att;
        }

        public void DeleteFile(DomContentAttachment f)
        {
            //volano pro TK
            //a pro nove LK GReportFormControl
            if (!string.IsNullOrEmpty(f.FileName) && File.Exists(f.FileName))
            {
                FileUtility.ObservedDelete(new List<string>() { f.FileName });
                _View.PrimaryFile.IsDirty = true;
            }

            list.Remove(f);
            list.RunOnChangeAndValidate();

            PagePanel?.Invalidate();
        }
        /// <exclude/>
        public void IOnMouseUp(System.Windows.Forms.MouseEventArgs e)
        {
            //vola se jen na TK
            if (AddAttachmentRect.Contains(e.Location))
            {
                foreach (var a in Validators.OfType<GAttCountAttribute>().Where(a => a.HasMaximum))
                {
                    if (a.Maximum <= list.Count) return;
                }
                List<string> filter = FormatTag.Attributes.ContainsKey("filter") ? FormatTag.Attributes["filter"].Split(';').ToList() : new List<string>();
                foreach (var a in Validators.OfType<GAttTypeAttribute>())
                {
                    var s = a.Extension.Split(',');
                    foreach (var ext in s)
                        filter.Add(string.Format(GResources.GetResourceText(29450708) + " {0}|*.{0}", ext));
                }
                if (filter.Count > 1)
                {
                    var ext = string.Join(";", filter.Select(f => "*" + Path.GetExtension(f.Substring(f.LastIndexOf('|') + 1))));
                    filter.Insert(0, "(" + GResources.GetResourceText(29450709) + ")|" + ext);
                }
                string fileName = FileUtility.GetFileNameByDialog(GResources.GetResourceText(29450710), filter.ToArray());
                AddFile(fileName);
            }
            else
            {
                //TODO: pouzit OpenAttachmentRect ?
                float width = (float)Math.Ceiling((WidthZoom - HeightZoom));
                if (list.Count > 1)
                    width = width / list.Count;
                float left = LeftZoom - PagePanel.HorizontalScroll.Value;
                float top = (float)Math.Ceiling(TopZoom - PagePanel.VerticalScroll.Value);
                foreach (var item in list)
                    if ((new RectangleF(left, top, 10, 10)).Contains(e.Location))
                    {

                        item.Remove();
                        break;
                    }
                    else if ((new RectangleF(left, top, width, HeightZoom)).Contains(e.Location))
                    {
                        item.IOnMouseUp(e);
                        break;
                    }
                    else left += width;

                //DomContentAttachment item = list.FirstOrDefault(itm => itm.IsMouseDown);
                //if (item != null)
                //    item.IOnMouseUp(e);
            }
            this.PagePanel.Invalidate();
        }

        /// <exclude/>
        public void IOnMouseDown(System.Windows.Forms.MouseEventArgs e)
        {
            //vola se jen na TK
            if (AddAttachmentRect.Contains(e.Location) == false)
            {
                //TODO: pouzit OpenAttachmentRect ?
                float width = (float)Math.Ceiling((WidthZoom - HeightZoom));
                if (list.Count > 1)
                    width = width / list.Count;
                float left = LeftZoom - PagePanel.HorizontalScroll.Value;
                float top = (float)Math.Ceiling(TopZoom - PagePanel.VerticalScroll.Value);

                foreach (var item in list)
                    if ((new RectangleF(left, top, width, HeightZoom)).Contains(e.Location))
                    {
                        item.IOnMouseDown(e);
                        break;
                    }
                    else left += width;
            }
            this.PagePanel.Invalidate();
        }

        void IMouseComponent.Click(float x, float y)
        {

        }

        void IMouseComponent.HoverEnd()
        {
            (PagePanel as FillerPagePanel).TkHoverEnd(this);
        }

        void IMouseComponent.Hover(float x, float y)
        {
            (PagePanel as FillerPagePanel).TkHover(this, x, y, true);
        }

        //private string m_tooltip = null;
        ///// <summary>Text nad objektem</summary>
        //public string Tooltip
        //{
        //    get
        //    {
        //        if (m_tooltip == null)
        //            m_tooltip = AttrList.GetValueDefault("tooltip");
        //        return m_tooltip;
        //    }
        //    set { m_tooltip = value; }
        //}
        #endregion
        #region DataItem handlers
        protected override GValidationAttribute CreateValidator(GFEFormatTag t)
        {
            string v;
            switch (t.Attributes.GetValueDefault("type"))
            {
                case "type":
                    {
                        var a = new GAttTypeAttribute();
                        //bool b1, b2;
                        if (t.Attributes.TryGetValue("ext", out v))
                            a.Extension = v;
                        //if (b2 = t.Attributes.TryGetValue("max", out v))
                        //    m.Maximum = Int32.Parse(v);
                        return a; //alespon jedna mez, jinak to zahodim
                    }
                case "count":
                    {
                        var m = new GAttCountAttribute();
                        bool b1, b2;
                        if (b1 = t.Attributes.TryGetValue("min", out v))
                            m.Minimum = Int32.Parse(v);
                        if (b2 = t.Attributes.TryGetValue("max", out v))
                            m.Maximum = Int32.Parse(v);
                        if (b1 || b2) return m; //alespon jedna mez, jinak to zahodim
                    }
                    break;
                case "required":
                    return new GAttCountAttribute() { Minimum = 1 };
                case "length":
                    {
                        var m = new GAttLengthAttribute();
                        bool b1, b2;
                        if (b1 = t.Attributes.TryGetValue("min", out v))
                            m.Minimum = Int64.Parse(v);
                        if (b2 = t.Attributes.TryGetValue("max", out v))
                            m.Maximum = Int64.Parse(v);
                        if (b1 || b2) return m; //alespon jedna mez, jinak to zahodim
                    }
                    break;
            }
            return null;
        }


        void IDefaultDataItemHandler.UpdateContent(object content)
        {
        }

        void IDefaultDataItemHandler.UpdateContent(string dataName, object content)
        {
        }

        void IEditableContent.OnTextChanged()
        {
            throw new NotImplementedException();
        }


        GFEDataItem structItem;
        /// <summary>Položka struktury</summary>
        public GFEDataItem StructureItem
        {
            get
            {
                if (structItem == null)
                    if (!string.IsNullOrEmpty(DataName) && PageControl != null)
                        structItem = (GFEDataItem)CommonService.GetItemFromStructure(PageControl.Structure, DataFullPath, 1);
                return structItem;
            }
        }
        /// <summary>Titulek pole</summary>
        public string StructureItemTitle => StructureItem != null ? StructureItem.FullName : Text?.Text;
        /// <summary>Popis pole</summary>
        public string StructureItemDescription => StructureItem?.Description ?? "";

        string IEditableContent.FormattedText
        {
            get { throw new NotImplementedException(); }
        }

        string IEditableContent.ComboItems
        {
            get { throw new NotImplementedException(); }
        }

        string IEditableContent.ComboKeyName
        {
            get { throw new NotImplementedException(); }
        }

        string IEditableContent.ComboValueName
        {
            get { throw new NotImplementedException(); }
        }

        #endregion
    }
}
