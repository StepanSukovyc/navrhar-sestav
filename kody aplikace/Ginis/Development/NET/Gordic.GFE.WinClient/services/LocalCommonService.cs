//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CommonService.cs                       </Name>
//    <Description> Výčet všech možných typů položek                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.WinClient.StructureView;
using Gordic.GFE.Parsers.Dom;
using System.ComponentModel;
using Gordic.GFE.WinClient.Designer.Gui;
using Gordic.GFE.WinClient.GrfEditor;
using Gordic.General;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.CreateItem;
using Gordic.GFE.WinClient.Labels;
using Gordic.GFE.WinClient.VariablesView;
using Gordic.GFE.WinClient.Box;
using Word = Microsoft.Office.Interop.Word;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// Výčet všech možných typů položek
    /// </summary>
    public enum TypPolozky
    {
        /// <summary>
        /// Písmo
        /// </summary>
        pismo,
        /// <summary>
        /// Styl písma
        /// </summary>
        stylpisma,
        /// <summary>
        /// Styl čáry
        /// </summary>
        stylcary,
        /// <summary>
        /// Klasický seznam
        /// </summary>
        seznam,
        /// <summary>
        /// Nový styl čáry
        /// </summary>
        dashstyle,
    }

    /// <summary>
    /// Styly linií, kterými se dá kreslit rámečky
    /// </summary>        
    public enum DashStyleBase
    {
        /// <summary>
        /// Pevná
        /// </summary>
        SOLID = 0,
        /// <summary>
        /// Tečkovaná
        /// </summary>
        DOTTED = 1,
        /// <summary>
        /// Čárkovaná
        /// </summary>
        DASHED = 2,
        /// <summary>
        /// Dvojitá
        /// </summary>
        DOUBLE = 3
    }

    /// <summary>
    /// Událost s neznamým počtem parametrů string
    /// </summary>
    /// <param name="parameters"></param>
    public delegate void EventHandlerParamArgument(params string[] parameters);
    /// <summary>
    /// Událost s neznamým počtem parametrů object
    /// </summary>
    /// <param name="value">Pole parametrů</param>
    public delegate void EventHandlerObjectArgument(object value);

    /// <summary>
    /// Společná třída
    /// </summary>
    static class LocalCommonService
    {
        /// <summary>
        /// vybraný objekt
        /// </summary>
        public static object SelectedObject { get; set; }

        /// <summary>
        /// Indikuje, že vložení bylo inicializováno
        /// </summary>
        public static bool DropInitialized { get; set; }
        /// <summary>
        /// Inikuje, že je aktivován process vložení objektu do Office dokumentu
        /// </summary>
        public static bool DropInProgress { get; set; }

        /// <summary>
        /// Tažený objekt
        /// </summary>
        public static object DraggedObject { get; set; }

        /// <summary>
        /// Zaokrouhlení
        /// </summary>
        /// <param name="p_change"></param>
        /// <param name="step">krok změny</param>
        /// <param name="changedValue">měněná hodnota</param>
        /// <returns></returns>
        internal static double GetRoudedValue(double p_change, double step, double changedValue)
        {
            //jinak zaokrouhlíme šířku
            //čistě matematický postup
            double _dbl = changedValue / step;
            _dbl = Math.Round(_dbl);

            double _newWidth = _dbl * step - changedValue;

            if (Math.Round(_newWidth, 2) != 0)
                return p_change + _newWidth;

            return p_change;
        }

        /// <summary>
        /// FLAG pro primární soubor, jakožto pozměněný
        /// </summary>
        internal static void MakeDirty()
        {
            MakeDirty(SimpleDesktop.Desktop.ActiveViewContent);
        }

        /// <summary>
        /// FLAG pro primární soubor, jakožto pozměněný
        /// </summary>
        /// <param name="view">Pohled na primární soubor</param>
        internal static void MakeDirty(IViewContent view)
        {
            if (view != null && view.PrimaryFile != null)
                view.PrimaryFile.MakeDirty();
        }

        /// <summary>
        /// Konverze proudu na pole bytů
        /// </summary>
        /// <param name="stream">Proud ke konverzí</param>
        /// <returns></returns>
        internal static byte[] StreamToByteArray(Stream stream)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                stream.CopyTo(ms);
                return ms.ToArray();
            }
        }

        /// <summary>
        /// Zobrazení kontextového menu
        /// </summary>
        /// <param name="selectedobject">Vybrané objekty sestavy</param>
        /// <param name="position">Pozice na stránce, kde se má zobrazit kontextové menu</param>
        internal static void ShowContextMenu(object selectedobject, Point position)
        {
            ContextMenuStrip strip = MenuService.CreateContextMenu(selectedobject, new EventArgsContextMenu("/ReportDesigner/Formation/ContextMenu/SelectedObject"));
            if (strip != null)
                strip.Show(position);
        }

        /// <summary>
        /// nastavení dialogového okna vlastnosti vybrané položky
        /// </summary>
        internal static PropertyOptions PropertyOptions { get; set; }

        #region ISizeHandler
        /// <summary>
        /// Šířka objektu
        /// </summary>
        public static SizeValue Width { get; set; }
        /// <summary>
        /// Výška objektu
        /// </summary>
        public static SizeValue Height { get; set; }
        /// <summary>
        /// Pozice zleva objektu
        /// </summary>
        public static SizeValue Left { get; set; }
        /// <summary>
        /// Pozice shora objektu
        /// </summary>
        public static SizeValue Top { get; set; }

        ///// <summary>
        ///// Změna šířky vybraných objektů
        ///// </summary>
        ///// <param name="service">Služba vybraných objektů</param>
        //internal static void ChangeWidth(SelectionService service)
        //{
        //    if (service == null)
        //        return;

        //    foreach (object item in service.SelectedComponents)
        //        if (item is ISizable)
        //            // jedná se pouze o změnu metriky
        //            if (CommonService.Width.Value.Equals(CommonService.Width.Metrics, StringComparison.InvariantCultureIgnoreCase))
        //                (item as ISizable).Width.Metrics = CommonService.Width.Metrics;
        //            else
        //                (item as ISizable).SetWidth(CommonService.Width.Value);
        //}

        ///// <summary>
        ///// Změna výšky vybraných objektů
        ///// </summary>
        ///// <param name="service">Služba vybraných objektů</param>
        //internal static void ChangeHeight(SelectionService service)
        //{
        //    if (service == null)
        //        return;

        //    foreach (object item in service.SelectedComponents)
        //        if (item is ISizable)
        //            // jedná se pouze o změnu metriky
        //            if (CommonService.Height.Value.Equals(CommonService.Height.Metrics, StringComparison.InvariantCultureIgnoreCase))
        //            {
        //                if (CommonService.Height.Metrics != "%")
        //                    (item as ISizable).Height.Metrics = CommonService.Height.Metrics;
        //            }
        //            else
        //                (item as ISizable).SetHeight(CommonService.Height.Value);
        //}

        /// <summary>
        /// Změna pozice zleva vybraných objektů
        /// </summary>
        /// <param name="service">Služba vybraných objektů</param>
        internal static void ChangeLeft(SelectionService service)
        {
            if (service == null)
                return;

            foreach (object item in service.SelectedComponents)
                if (item is ISizable)
                    (item as ISizable).Left = new SizeValue(LocalCommonService.Left.Value);
        }

        /// <summary>
        /// Změna pozice shora vybraných objektů
        /// </summary>
        /// <param name="service">Služba vybraných objektů</param>
        internal static void ChangeTop(SelectionService service)
        {
            if (service == null)
                return;

            foreach (object item in service.SelectedComponents)
                if (item is ISizable)
                    (item as ISizable).Top = new SizeValue(LocalCommonService.Top.Value);
        }
        #endregion

        #region MSE
        class ListItem
        {
            /// <summary>
            /// Region
            /// </summary>
            public GFERegion Region { get; set; }

            /// <summary>
            /// Typ položky : H (head), B (body), F (foot)
            /// </summary>
            public char Type { get; set; }
        }

        /// <summary>
        /// Zjištění názvu položky
        /// </summary>
        /// <param name="p_text">Text obsahující název datové položky</param>
        /// <returns></returns>
        static string GetName(string p_text)
        {
            if (string.IsNullOrEmpty(p_text))
                return null;

            string _result = p_text.Substring(p_text.LastIndexOf(":") + 1).Trim();

            if (_result.IndexOf("[#") != -1)
                return _result.Substring(0, _result.IndexOf("[")).Trim();
            else return _result.Trim();
        }

        #endregion

        /// <summary>
        /// Získání hodnoty dle stisknutých kláves
        /// </summary>
        /// <param name="objName">řetězec</param>
        /// <param name="separator">oddělovač</param>
        /// <returns></returns>
        public static string GetText(string objName, char separator = '.')
        {
            string text = objName;
            //obj is TreeNode ? (obj as TreeNode).Name : ;
            int count = text.Split(separator).Length;

            if (Control.ModifierKeys == (Keys.Control | Keys.Shift))
                return text;
            else if (Control.ModifierKeys == Keys.Control)
            {
                // pokud položka patři vnořenému regionu
                if (count > 1)
                    return string.Format("{0}" + separator + "{1}", text.Split(separator)[count - 2], text.Split(separator).Last());
                // jinak položka je standardní
                else return text.Split(separator).Last();
            }

            return text.Split(separator).Last();
        }

        static string GetTextXmlForDataRecursively(StructExtNode objNode, string stringBefore = "", bool withSubNode = true)
        {
            if (objNode != null)
                foreach (StructExtNode item in objNode.Nodes)
                    if (item.Nodes.Count == 0)
                        if (string.IsNullOrEmpty(stringBefore))
                            stringBefore = string.Format("<{0}></{0}>", item.Name);
                        else
                            stringBefore += "\r\n" + string.Format("<{0}></{0}>", item.Name);
                    else if (withSubNode)
                        stringBefore += "\r\n" + string.Format("<{0}>{1}</{0}>", item.Name, GetTextXmlForDataRecursively(item, string.Empty));

            return stringBefore;
        }

        /// <summary>
        /// Seřazení objektů dle top pozice vzestupně
        /// </summary>
        /// <param name="X">První objekt</param>
        /// <param name="Y">Druhý objekt</param>
        /// <returns></returns>
        internal static int SortByTopAsc(object X, object Y)
        {
            return SortByTop(X, Y, true);
        }
        /// <summary>
        /// Seřazení objektů dle top pozice sestupně
        /// </summary>
        /// <param name="X">První objekt</param>
        /// <param name="Y">Druhý objekt</param>
        /// <returns></returns>
        internal static int SortByTopDesc(object X, object Y)
        {
            return SortByTop(X, Y, false);
        }
        /// <summary>
        /// Seřazení objektů dle top pozice
        /// </summary>
        /// <param name="X">První objekt</param>
        /// <param name="Y">Druhý objekt</param>
        /// <param name="asc">Indikuje pořadí - TRUE - vzestupně</param>
        static int SortByTop(object X, object Y, bool asc)
        {
            if (!(X is ISizable))
            {
                if (!(Y is ISizable))
                    return 0;
                // y je dříve
                else return asc ? -1 : 1;
            }
            else
            {
                if (!(Y is IZoomSizable))
                    // x je dříve
                    return asc ? 1 : -1;
                else
                {
                    IZoomSizable x = X as IZoomSizable,
                        y = Y as IZoomSizable;
                    if (x.TopZoom <= y.TopZoom)
                        // x je dříve
                        return asc ? 1 : -1;
                    // y je dříve
                    else return asc ? -1 : 1;
                }
            }
        }

        /// <summary>
        /// Seřazení objektů dle left pozice vzestupně
        /// </summary>
        /// <param name="X">První objekt</param>
        /// <param name="Y">Druhý objekt</param>
        internal static int SortByLeftAsc(object X, object Y)
        {
            return SortByLeft(X, Y, true);
        }
        /// <summary>
        /// Seřazení objektů dle left pozice sestupně
        /// </summary>
        /// <param name="X">První objekt</param>
        /// <param name="Y">Druhý objekt</param>
        internal static int SortByLeftDesc(object X, object Y)
        {
            return SortByLeft(X, Y, false);
        }
        /// <summary>
        /// Seřazení objektů dle LEFT pozice
        /// </summary>
        /// <param name="X">První objekt</param>
        /// <param name="Y">Druhý objekt</param>
        /// <param name="asc">Indikuje pořadí - TRUE - vzestupně</param>
        static int SortByLeft(object X, object Y, bool asc)
        {
            if (!(X is ISizable))
            {
                if (!(Y is ISizable))
                    return 0;
                // y je dříve
                else return asc ? 1 : -1;
            }
            else
            {
                if (!(Y is ISizable))
                    // x je dříve
                    return asc ? -1 : 1;
                else
                {
                    IZoomSizable x = X as IZoomSizable,
                        y = Y as IZoomSizable;
                    if (x.LeftZoom <= y.LeftZoom)
                        // x je dříve
                        return asc ? -1 : 1;
                    // y je dříve
                    else return asc ? 1 : -1;
                }
            }
        }

        #region RTF
        /// <summary>
        /// Aktualizace dokumentu dle listu
        /// </summary>
        /// <param name="document">Dokument</param>
        /// <param name="fields">List</param>
        /// <param name="guids">Jednoznační identifikátory</param>
        internal static void UpdateDocumentByList(Word.Document document, List<RtfContent> fields, List<Guid> guids)
        {
            try
            {
                //if (!CommonService.IsEmpty(document))
                //{
                //    List<Guid> list = new List<Guid>(guids);
                //    //foreach (KeyValuePair<Guid, RtfContent> pair in fields)
                //    //    list.Add(pair.Key);
                //    int j = 0;
                //    for (int i = 1; i <= document.FormFields.Count; i++)
                //    {
                //        object index = (object)i;
                //        Gordic.Interop.Word.FormField wrdField = document.FormFields.Item(ref index);
                //        string text = wrdField.StatusText;
                //        bool novy = false;
                //        string b_guid = "";
                //        Guid guid = CommonService.GetGuid(text, ref novy, ref b_guid);
                //        try
                //        {
                //            //!!!TODO!!!
                //            if (novy && (list.Count > j) && fields.ContainsKey(list[j])
                //                && fields[list[j]].Name.Equals(CommonService.GetNameValueOf(b_guid, "MSWField"), StringComparison.InvariantCultureIgnoreCase))
                //            {
                //                j++;
                //                document.FormFields.Item(ref index).StatusText = text + string.Format("[#{0}#]", guid.ToString());
                //            }
                //        }
                //        catch { }
                //    }
                //}

            }
            catch { }
        }

        #endregion

        /// <summary>
        /// Získání aktuální struktury
        /// </summary>
        /// <returns>Datová struktura</returns>
        internal static GFEStructure GetActualStructure()
        {
            return !(SimpleDesktop.Desktop.ActiveViewContent is IStructureHost) || (SimpleDesktop.Desktop.ActiveViewContent as IStructureHost).StructureEntry == null ? null : (SimpleDesktop.Desktop.ActiveViewContent as IStructureHost).StructureEntry.Structure;
        }

        /// <summary>
        /// Vytvoření nového objektu 'region' na zadaném umístění
        /// </summary>
        /// <param name="container">Konteiner, do kterého se vkládá objekt</param>
        /// <param name="insertPoint">Levý-horní roh nového regionu - zkorigovaný dle ZOOM hodnoty</param>
        /// <param name="page">Stránka, do které se objekt vkládá</param>
        /// <param name="info">Položka bočního panelu s informaci o vkládaném objektu</param>
        /// <param name="type">Typ přidávané položky</param>
        /// <param name="format">Formát sestavy</param>
        internal static IComponent CreateObject(URAbstractContainer container, PointF insertPoint, IPage page, dynamic info, ComponentType type, GFEFormat format = null)
        {
            if (page == null || info == null)
            {
                MessageService.ShowError(GResources.GetResourceText(29450038)); //RC 29450038 : Objekt nelze vložit - nedostatek informace!
                return null;
            }

            // zarovnáme pozice dle rozlišení
            float _insertPoint_x = insertPoint.X
                , _insertPoint_y = insertPoint.Y
                , _left = CommonService.AlignValueByResolution(_insertPoint_x)
                , _top = CommonService.AlignValueByResolution(_insertPoint_y), _width, _height;

            Graphics formGraphics;
            SizeF textSize;
            dynamic com = null;
            switch (type)
            {
                case ComponentType.image:
                    _width = ReportDesignerProperties.Instance.AlignWidthMove ?
                            CommonService.AlignValueByResolution(UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageWidth))
                            : UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageWidth);
                    _height = ReportDesignerProperties.Instance.AlignHeightMove ?
                            CommonService.AlignValueByResolution(UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageHeight))
                            : UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageHeight);

                    com = new GrfContentImage();
                    com.Initialize(info);
                    com.Page = page;

                    // umistíme objekt na tažené místo
                    com.Top = new SizeValue(_top, ReportDesignerDesignerProperties.Instance.ImageDefaultMetrics);
                    com.Left = new SizeValue(_left, ReportDesignerDesignerProperties.Instance.ImageDefaultMetrics);
                    com.Width = new SizeValue(_width, ReportDesignerDesignerProperties.Instance.ImageDefaultMetrics);
                    com.Height = new SizeValue(_height, ReportDesignerDesignerProperties.Instance.ImageDefaultMetrics);
                    break;
                case ComponentType.text:
                    com = new GrfContentText();
                    com.Initialize(info);
                    com.Page = page;

                    formGraphics = page.PagePanel.ComputeGraphics;
                    textSize = formGraphics.MeasureString(info is GFEFormatTag ? info.Text : info.Name, com.Text.TextFont.Font);

                    if (info is GFEFormatTag)
                    {
                        (com.AttrList as GFEAttrList).AddRange(info.Attributes as GFEAttrList);
                        (com.AttrList as GFEAttrList).SynchronizeByOrigin();
                        com.LoadInformation();
                        com.Height = new SizeValue(new SizeValue(info.GrfRect.Height + "tw"), ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Width = new SizeValue(new SizeValue(info.GrfRect.Width + "tw"), ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        // umistíme objekt na tažené místo
                        com.Top = new SizeValue(_top + "tw", ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Left = new SizeValue(_left + "tw", ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    }
                    else
                    {
                        _width = ReportDesignerProperties.Instance.AlignWidthMove ? CommonService.AlignValueByResolution(textSize.Width) : textSize.Width;
                        _height = ReportDesignerProperties.Instance.AlignHeightMove ? CommonService.AlignValueByResolution(textSize.Height * 2) : textSize.Height * 2;

                        // umistíme objekt na tažené místo
                        com.Top = new SizeValue(_top, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Left = new SizeValue(_left, ReportDesignerDesignerProperties.Instance.DefaultMetrics);

                        com.Height = !string.IsNullOrEmpty(ReportDesignerDesignerProperties.Instance.DefaultSizeHeight) ? new SizeValue(ReportDesignerDesignerProperties.Instance.DefaultSizeHeight) : new SizeValue(_height, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Width = !string.IsNullOrEmpty(ReportDesignerDesignerProperties.Instance.DefaultSizeWidth) ? new SizeValue(ReportDesignerDesignerProperties.Instance.DefaultSizeWidth) : new SizeValue(_width, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    }
                    break;
                case ComponentType.chart:
                    com = new GrfContentChart();
                    com.Initialize(info);
                    com.Page = page;

                    // umistíme objekt na tažené místo
                    com.Top = new SizeValue(_top, ReportDesignerDesignerProperties.Instance.ImageDefaultMetrics);
                    com.Left = new SizeValue(_left, ReportDesignerDesignerProperties.Instance.ImageDefaultMetrics);
                    com.Width = new SizeValue(ReportDesignerDesignerProperties.Instance.ImageWidth);
                    com.Height = new SizeValue(ReportDesignerDesignerProperties.Instance.ImageHeight);
                    break;
                case ComponentType.drawing:
                    _width = ReportDesignerProperties.Instance.AlignWidthMove ?
                            CommonService.AlignValueByResolution(UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageWidth))
                            : UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageWidth);
                    _height = ReportDesignerProperties.Instance.AlignHeightMove ?
                            CommonService.AlignValueByResolution(UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageHeight))
                            : UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageHeight);

                    com = new GrfContentDrawing();
                    com.Initialize(info);
                    com.Page = page;

                    // umistíme objekt na tažené místo
                    com.Top = new SizeValue(_top, ReportDesignerDesignerProperties.Instance.ImageDefaultMetrics);
                    com.Left = new SizeValue(_left, ReportDesignerDesignerProperties.Instance.ImageDefaultMetrics);
                    com.Width = new SizeValue(_width);
                    com.Height = new SizeValue(_height);

                    break;
                case ComponentType.valueof:
                    // pokud objekt je tažen ze struktury, pak potřebná informace se nachází ve vlastnosti FullName
                    com = new GrfContentValue();
                    com.Initialize(info);
                    com.Page = page;

                    formGraphics = page.PagePanel.ComputeGraphics;
                    textSize = formGraphics.MeasureString(info is GFEFormatTag ? info.DataName : info.FullName, com.Text.TextFont.Font);

                    if (info is GFEFormatTag)
                    {
                        (com.AttrList as GFEAttrList).AddRange(info.Attributes as GFEAttrList);
                        (com.AttrList as GFEAttrList).SynchronizeByOrigin();
                        com.LoadInformation();
                        com.Height = new SizeValue(new SizeValue(info.GrfRect.Height + "tw"), ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Width = new SizeValue(new SizeValue(info.GrfRect.Width + "tw"), ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        // umistíme objekt na tažené místo
                        com.Top = new SizeValue(_top + "tw", ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Left = new SizeValue(_left + "tw", ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    }
                    else
                    {
                        _width = ReportDesignerProperties.Instance.AlignWidthMove ?
                            CommonService.AlignValueByResolution(textSize.Width)
                            : textSize.Width;
                        _height = ReportDesignerProperties.Instance.AlignHeightMove ?
                                CommonService.AlignValueByResolution(textSize.Height * 2)
                                : textSize.Height * 2;

                        // umistíme objekt na tažené místo
                        com.Top = new SizeValue(_top, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Left = new SizeValue(_left, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Height = !string.IsNullOrEmpty(ReportDesignerDesignerProperties.Instance.DefaultSizeHeight)
                            ? new SizeValue(ReportDesignerDesignerProperties.Instance.DefaultSizeHeight)
                            : new SizeValue(_height, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Width = !string.IsNullOrEmpty(ReportDesignerDesignerProperties.Instance.DefaultSizeWidth)
                            ? new SizeValue(ReportDesignerDesignerProperties.Instance.DefaultSizeWidth)
                            : new SizeValue(_width, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    }
                    break;
                case ComponentType.region:
                    // pokud objekt je tažen ze struktury, pak potřebná informace se nachází ve vlastnosti FullName
                    com = new GrfRegion();
                    com.Initialize(info);
                    com.Page = page;

                    formGraphics = page.PagePanel.ComputeGraphics;
                    textSize = formGraphics.MeasureString(info.FullName, com.Text.TextFont.Font);

                    // zarovnáme pozici dle rozlišení
                    _width = ReportDesignerProperties.Instance.AlignWidthMove ?
                            CommonService.AlignValueByResolution(textSize.Width)
                            : textSize.Width;
                    _height = ReportDesignerProperties.Instance.AlignHeightMove ?
                            CommonService.AlignValueByResolution(textSize.Height * 2)
                            : textSize.Height * 2;

                    // umistíme objekt na tažené místo
                    com.Top = new SizeValue(_top, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    com.Left = new SizeValue(_left, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    com.Height = new SizeValue(_height, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    com.Width = new SizeValue(_width, ReportDesignerDesignerProperties.Instance.DefaultMetrics);

                    break;
                case ComponentType.table:
                    _width = ReportDesignerProperties.Instance.AlignWidthMove ?
                            CommonService.AlignValueByResolution(UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageWidth))
                            : UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageWidth);
                    _height = ReportDesignerProperties.Instance.AlignHeightMove ?
                            CommonService.AlignValueByResolution(UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageHeight))
                            : UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageHeight);

                    // umistíme objekt na tažené místo
                    com = new GrfContentGrid();
                    com.Initialize(info, page
                        , new SizeValue(_left, ReportDesignerDesignerProperties.Instance.ImageDefaultMetrics)
                        , new SizeValue(_top, ReportDesignerDesignerProperties.Instance.ImageDefaultMetrics)
                        , new SizeValue(_width, ReportDesignerDesignerProperties.Instance.DefaultMetrics)
                        , new SizeValue(_height, ReportDesignerDesignerProperties.Instance.DefaultMetrics));

                    break;
                case ComponentType.attachment:
                case ComponentType.addbuttonarea:
                case ComponentType.button:
                case ComponentType.select:
                    // pokud objekt je tažen ze struktury, pak potřebná informace se nachází ve vlastnosti FullName
                    if (type == ComponentType.button)
                        com = new GrfContentButton();
                    else if (type == ComponentType.addbuttonarea)
                        com = new AddButtonArea();
                    else if (type == ComponentType.select)
                        com = new GrfContentSelect();
                    else
                        com = new GrfContentAttachment();

                    com.Initialize(info);
                    com.Page = page;

                    if (info is GFEFormatTag)
                    {
                        (com.AttrList as GFEAttrList).AddRange(info.Attributes as GFEAttrList);
                        (com.AttrList as GFEAttrList).SynchronizeByOrigin();
                        com.LoadInformation();
                        com.Height = new SizeValue(new SizeValue(info.GrfRect.Height + "tw"), ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Width = new SizeValue(new SizeValue(info.GrfRect.Width + "tw"), ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        // umistíme objekt na tažené místo
                        com.Top = new SizeValue(_top + "tw", ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Left = new SizeValue(_left + "tw", ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    }
                    else
                    {
                        _width = ReportDesignerProperties.Instance.AlignWidthMove ?
                            CommonService.AlignValueByResolution(UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageWidth))
                            : UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageWidth);
                        _height = ReportDesignerProperties.Instance.AlignHeightMove ?
                                CommonService.AlignValueByResolution(UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageHeight))
                                : UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageHeight);

                        com.Height = !string.IsNullOrEmpty(ReportDesignerDesignerProperties.Instance.DefaultSizeHeight)
                            ? new SizeValue(ReportDesignerDesignerProperties.Instance.DefaultSizeHeight)
                            : new SizeValue(_height, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Width = !string.IsNullOrEmpty(ReportDesignerDesignerProperties.Instance.DefaultSizeWidth)
                            ? new SizeValue(ReportDesignerDesignerProperties.Instance.DefaultSizeWidth)
                            : new SizeValue(_width, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        // umistíme objekt na tažené místo
                        com.Top = new SizeValue(_top, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Left = new SizeValue(_left, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    }
                    break;
                case ComponentType.barcode:
                    // pokud objekt je tažen ze struktury, pak potřebná informace se nachází ve vlastnosti FullName
                    com = new GrfContentBarcode();

                    com.Initialize(info);
                    com.Page = page;

                    if (info is GFEFormatTag)
                    {
                        (com.AttrList as GFEAttrList).AddRange(info.Attributes as GFEAttrList);
                        (com.AttrList as GFEAttrList).SynchronizeByOrigin();
                        com.LoadInformation();
                        com.Height = new SizeValue(new SizeValue(info.GrfRect.Height + "tw"), ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Width = new SizeValue(new SizeValue(info.GrfRect.Width + "tw"), ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        // umistíme objekt na tažené místo
                        com.Top = new SizeValue(_top + "tw", ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Left = new SizeValue(_left + "tw", ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    }
                    else
                    {
                        _width = ReportDesignerProperties.Instance.AlignWidthMove ?
                            CommonService.AlignValueByResolution(UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageWidth))
                            : UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageWidth);
                        _height = ReportDesignerProperties.Instance.AlignHeightMove ?
                                CommonService.AlignValueByResolution(UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageHeight))
                                : UnitConverter.ConvertFrom(ReportDesignerDesignerProperties.Instance.ImageHeight);

                        com.Height = !string.IsNullOrEmpty(ReportDesignerDesignerProperties.Instance.DefaultSizeHeight)
                            ? new SizeValue(ReportDesignerDesignerProperties.Instance.DefaultSizeHeight)
                            : new SizeValue(_height, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Width = !string.IsNullOrEmpty(ReportDesignerDesignerProperties.Instance.DefaultSizeWidth)
                            ? new SizeValue(ReportDesignerDesignerProperties.Instance.DefaultSizeWidth)
                            : new SizeValue(_width, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        // umistíme objekt na tažené místo
                        com.Top = new SizeValue(_top, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Left = new SizeValue(_left, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                    }
                    break;
                case ComponentType.part:
                    // objekt je XML struktury a nachází se v souboru PARTS.XML
                    if (info is ReportDesignerSideTabItem)
                    {
                        GFEFormatTag item = CreateItemFactory.Create((info as ReportDesignerSideTabItem).Entry, format);
                        if (item == null) break;
                        // pokud objekt je tažen ze struktury, pak potřebná informace se nachází ve vlastnosti FullName
                        com = new GrfContentPart();
                        com.Initialize(item);
                        com.Page = page;
                        (com.AttrList as GFEAttrList).AddRange(item.Attributes);
                        (com.AttrList as GFEAttrList).SynchronizeByOrigin();
                        com.LoadInformation();

                        // umistíme objekt na tažené místo
                        com.Top = new SizeValue(_top, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Left = new SizeValue(_left, ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Height = new SizeValue(new SizeValue(item.GrfRect.Height + "tw"), ReportDesignerDesignerProperties.Instance.DefaultMetrics);
                        com.Width = new SizeValue(new SizeValue(item.GrfRect.Width + "tw"), ReportDesignerDesignerProperties.Instance.DefaultMetrics);

                        item.Children.ForEach(subItem => CreateObject(com, new PointF((float)(subItem.GrfRect.Left - item.GrfRect.Left + com.Left.Twips), (float)(subItem.GrfRect.Top - item.GrfRect.Top + com.Top.Twips)), page, subItem, (new ComponentTypeTypeConverter(typeof(ComponentType))).SConvertFrom(subItem.TagName), format));
                    }
                    break;
                default:
                    if (info is ReportDesignerSideTabItem)
                    {
                        com = CreateItemFactory.Create((info as ReportDesignerSideTabItem).Entry);
                        if (com != null)
                            com.Page = page;
                    }
                    break;
            }

            if (com == null)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450039) + " '{0}'.", type); //RC 29450039 : Nepodporovaný formát objektu
                if (UndoRedoService.IsTransactionStarted)
                    UndoRedoService.FlushHistory();
            }
            else
            {
                com.Parent = container as ISizable;
                container.Add(com);
            }
            return com;
        }

        /// <summary>
        /// Získání hlvaního regionu štítku
        /// </summary>
        /// <param name="label">vnořený štítek</param>
        /// <returns>Hlavní region</returns>
        public static GrrRegion GetRootRegion(ILabel label)
        {
            while (label != null && label.Parent is ILabel)
                label = label.Parent as ILabel;

            return label as GrrRegion;
        }

        /// <summary>
        /// odstranění daného objektu z daného štítku
        /// </summary>
        /// <param name="label">štítek obsahující objekt</param>
        /// <param name="com">objekt k odstranění</param>
        internal static void Remove(IGRRLabel label, object com)
        {
            if (label != null)
            {
                if (com is IGRRLine)
                    switch ((com as IGRRLine).Type)
                    {
                        case LineType.foot:
                            label.Foot.Remove(com as IGRRLine);
                            break;
                        case LineType.head:
                            label.Head.Delete(com as IGRRLine);
                            break;
                        default:
                            label.Body.Remove(com);
                            break;
                    }
                else if (com is GrrGroup)
                {
                    if (label is AbstractLabel)
                        (label as GrrRegion).Group.Delete(com as AbstractLabel);
                }
                else
                    if (label.Body.Contains(com))
                {
                    label.Body.Delete(com);
                    if (com is GrrRegion)
                        (com as GrrRegion).Group.Clear();
                }

                if (com is IGRRLabel)
                    LabelZoneListChanged(label);
                else
                {
                    GrrRegion region = GetRootRegion(label);
                    if (region != null && region.Parent is GrrLabelZone)
                    {
                        if (region.Parent is GrrLabelZone)
                        {
                            (region.Parent as GrrLabelZone).SetHeight();
                            (region.Parent as GrrLabelZone).SetTop();
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Aktualizace štítkové zóny
        /// </summary>
        /// <param name="label">aktuální štítek</param>
        internal static void LabelZoneListChanged(IGRRLabel label)
        {
            if (label != null)
            {
                GrrRegion region = GetRootRegion(label);
                if (region != null && region.Parent is GrrLabelZone)
                    (region.Parent as GrrLabelZone).LabelZoneListChanged(null, EventArgs.Empty);
            }
        }

        /// <summary>
        /// validace názvu vůčiregionu
        /// </summary>
        /// <param name="abstractLabel">štítek, vůči kterému probíha validace</param>
        /// <param name="fullName">úplný název pro validací</param>
        /// <param name="isLabel">indikuje, že název patří štítku</param>
        /// <returns>TRUE - objekt s daným názvem může být ve štítku</returns>
        internal static bool ValidateObject(ILabel abstractLabel, string fullName, bool isLabel = false)
        {
            if (abstractLabel == null || string.IsNullOrEmpty(fullName))
                return false;

            if (abstractLabel is IGroup)
                abstractLabel = (abstractLabel as IGroup).Parent as AbstractLabel;

            if (abstractLabel != null)
            {
                if (fullName.StartsWith("root.", StringComparison.InvariantCultureIgnoreCase))
                    fullName = fullName.Substring(5);

                int index = fullName.LastIndexOf('.');
                if (!isLabel && index > 0)
                    fullName = fullName.Substring(0, index);

                string regName = abstractLabel.DataFullName.StartsWith("root.", StringComparison.InvariantCultureIgnoreCase)
                    ? abstractLabel.DataFullName.Substring(5) : abstractLabel.DataFullName;

                // pokud se pohybujeme s regionem, nad prázdným řádkem ROOT, 
                // pak zřejmě potřebujeme vytvořit další kořenový region
                if (isLabel && regName.Equals("root", StringComparison.OrdinalIgnoreCase) && index == -1)
                    return true;

                if (!isLabel)
                    return regName.CompareTo(fullName) == 0
                        || regName.StartsWith(fullName, StringComparison.InvariantCultureIgnoreCase);
                else
                    return !fullName.Equals(regName, StringComparison.InvariantCultureIgnoreCase)
                        && fullName.StartsWith(regName, StringComparison.InvariantCultureIgnoreCase);
            }
            else return false;
        }

        /// <summary>
        /// získání inicializační složky
        /// </summary>
        /// <returns></returns>
        internal static string GetInitializeFormationDir()
        {
            //List<string> names = RegistryService.GetRegistryDirectoryValue();
            //if (names.Count == 0)
            //    if (ReportDesignerProperties.Instance.FormationPath != null
            //        && Directory.Exists(ReportDesignerProperties.Instance.FormationPath))
            //        names.Add(ReportDesignerProperties.Instance.FormationPath);

            //return names;
            return ReportDesignerProperties.Instance.FormationPath;
        }

        #region IKeyActionHandler
        /// <summary>
        /// nalezení posledního řádku seznamu s indexem menším než daný řádek (čili první před daným řádkem)
        /// </summary>
        /// <param name="lines">seznam řádků</param>
        /// <param name="line">aktuální řádek</param>
        /// <returns></returns>
        internal static IGRRLine FindLastCondition(LineList lines, IGRRLine line)
        {
            return lines.FindLast(ln => !ln.IsComment && ln.Index < line.Index);
        }
        /// <summary>
        /// nalezení posledního řádku seznamu
        /// </summary>
        /// <param name="list">seznam řádků</param>
        /// <returns></returns>
        internal static IGRRLine FindLastCondition(LineList list)
        {
            return list.FindLast(ln => !ln.IsComment);
        }
        /// <summary>
        /// nalezení posledního objektu seznamu s indexem menším než daný index (čili první před daným řádkem)
        /// </summary>
        /// <param name="list">seznam objektů</param>
        /// <param name="index">daný index</param>
        /// <returns></returns>
        internal static object FindLastCondition(BodyList list, int index)
        {
            return list.FindLast(itm =>
                    itm is ALabel && list.IndexOf(itm) < index
                    || (itm is IGRRLine && !(itm as IGRRLine).IsComment && (itm as IGRRLine).Index < index));
        }
        /// <summary>
        /// nelazení posledního objektu seznamu
        /// </summary>
        /// <param name="list">seznam objektů</param>
        /// <returns></returns>
        internal static object FindLastCondition(BodyList list)
        {
            return list.FindLast(itm => itm is ALabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment));
        }
        /// <summary>
        /// nalezení prvního řádku seznamu
        /// </summary>
        /// <param name="list">seznam řádků</param>
        /// <returns></returns>
        internal static IGRRLine FirstCondition(LineList list)
        {
            return list.First(ln => !ln.IsComment);
        }
        /// <summary>
        /// Nalezení prvního nebo výchozího objektu
        /// </summary>
        /// <param name="list">seznam objektů, mezí kterými probíhá hledání</param>
        /// <returns></returns>
        internal static object FirstOrDefaultCondition(BodyList list)
        {
            return list.FirstOrDefault(itm => itm is ALabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment));
        }
        /// <summary>
        /// Nalezení prvního nebo výchozího řádku
        /// </summary>
        /// <param name="list">seznam řádků, mezí kterými probíhá hledání</param>
        /// <returns></returns>
        internal static IGRRLine FirstOrDefaultCondition(LineList list)
        {
            return list.FirstOrDefault(ln => !ln.IsComment);
        }
        /// <summary>
        /// nalezení prvního objektu seznamu s indexem větším než daný index (čili první další řádek)
        /// </summary>
        /// <param name="list">seznam objektů</param>
        /// <param name="index">daný index</param>
        /// <returns></returns>
        internal static object FirstOrDefaultCondition(BodyList list, int index)
        {
            return list.FirstOrDefault(itm =>
                    itm is ALabel && list.IndexOf(itm) > index
                    || (itm is IGRRLine && !(itm as IGRRLine).IsComment && (itm as IGRRLine).Index > index));
        }

        static ISizable _sizable;
        /// <summary>
        /// hledání buňky dle podmínky TOP
        /// </summary>
        /// <param name="line"></param>
        /// <param name="sizable"></param>
        /// <returns></returns>
        internal static object FindCellByTopConditions(IGRRLine line, ISizable sizable)
        {
            _sizable = sizable;
            var cell = line.FirstOrNull(TopConditionA);
            return cell ?? line.FirstOrNull(TopConditionB);
        }
        /// <summary>
        /// Nalezení prvního nebo výchozího řádku, který má index vyšší než daný
        /// </summary>
        /// <param name="list">seznam řádků, mezí kterými probíhá hledání</param>
        /// <param name="line">daný řádek</param>
        /// <returns></returns>
        internal static IGRRLine FirstOrDefaultCondition(LineList list, IGRRLine line)
        {
            return list.FirstOrDefault(ln => !ln.IsComment && ln.Index > line.Index);
        }

        static bool TopConditionA(ICell cell)
        {
            return TopConditionB(cell) && (cell.Left >= _sizable.Left);
        }

        static bool TopConditionB(ICell cell)
        {
            if (cell == null || _sizable == null)
                return false;

            return cell.BoundsInPixels.IntersectsWith(new RectangleF((_sizable as IZoomSizable).LeftZoom, cell.TopZoom, (_sizable as IZoomSizable).WidthZoom, (_sizable as IZoomSizable).HeightZoom));
        }
        #endregion

        /// <summary>
        /// dialogové okno otevření datové struktury
        /// </summary>
        /// <param name="defaultPath">výchozí cesta</param>
        /// <returns></returns>
        internal static string GetStructureFileName(string defaultPath)
        {
            OpenFileDialog l_oVyberSoubor = new OpenFileDialog();
            if (!string.IsNullOrEmpty(defaultPath))
                if (Directory.Exists(defaultPath))
                    l_oVyberSoubor.InitialDirectory = defaultPath;

            string[] fileFilters = (string[])(AddInTree.GetTreeNode("/ReportDesigner/Desktop/OpenStructureFilter").BuildChildItems(null)).ToArray(typeof(string));
            l_oVyberSoubor.Filter = String.Join("|", fileFilters);
            l_oVyberSoubor.ShowDialog();
            return !string.IsNullOrEmpty(l_oVyberSoubor.FileName) ? l_oVyberSoubor.FileName : string.Empty;
        }

        /// <summary>
        /// dialogové okno získání cesty k sestavě
        /// </summary>
        /// <param name="defaultPath">výchozí cesta</param>
        /// <returns></returns>
        internal static string GetFormationFileName(string defaultPath)
        {
            OpenFileDialog l_oVyberSoubor = new OpenFileDialog();
            if (!string.IsNullOrEmpty(defaultPath))
                if (Directory.Exists(defaultPath))
                    l_oVyberSoubor.InitialDirectory = defaultPath;

            string[] fileFilters = (string[])(AddInTree.GetTreeNode("/ReportDesigner/Desktop/OpenFileFilter").BuildChildItems(null)).ToArray(typeof(string));
            l_oVyberSoubor.Filter = String.Join("|", fileFilters);
            l_oVyberSoubor.ShowDialog();

            return !string.IsNullOrEmpty(l_oVyberSoubor.FileName) ? l_oVyberSoubor.FileName : string.Empty;
        }

        /// <summary>
        /// analýza obsahu
        /// </summary>
        /// <param name="parent"></param>
        /// <param name="item"></param>
        /// <param name="iPage"></param>
        internal static dynamic ParseContent(URAbstractContainer parent, GFEFormatTag item, IPage iPage)
        {
            dynamic com;
            if (item is GFEFormatContentText)
                com = new GrfContentText();
            else if (item is GFEFormatContentValue)
                com = new GrfContentValue();
            else if (item is GFEFormatContentDrawing)
                com = new GrfContentDrawing();
            else if (item is GFEFormatContentBarcode)
                com = new GrfContentBarcode();
            else if (item is GFEFormatContentImage)
            {
                if (item.TagName.Equals("drawing", StringComparison.InvariantCultureIgnoreCase))
                    com = new GrfContentDrawing();
                else if (item.TagName.Equals("barcode", StringComparison.InvariantCultureIgnoreCase))
                    com = new GrfContentDrawing();
                else if (item.TagName.Equals("chart", StringComparison.InvariantCultureIgnoreCase))
                    com = new GrfContentChart();
                else
                    com = new GrfContentImage();
            }
            else if (item is GFEFormatContentSelect)
                com = new GrfContentSelect();
            else if (item is GFEFormatContentPar)
                com = new ContentPArea();
            else if (item is GFEFormatUnknown)
                com = new GrfContentUnknown();
            else if (item is GFEFormatGRFPart)
                com = new GrfContentPart();
            else if (item is GFEFormatUnknownContent)
                switch (item.TagName.ToLowerInvariant())
                {
                    case "button":
                        com = new GrfContentButton();
                        break;
                    case "grid":
                        com = new GrfContentGrid();
                        break;
                    case "attachment":
                        com = new GrfContentAttachment();
                        break;
                    case "box":
                        com = new GrfContentBox();
                        break;
                    default:
                        com = new GrfContentUnknown();
                        break;
                }
            else
                com = new GrfContentUnknown();

            if (com != null)
            {
                com.Initialize(item);
                com.Load(iPage, parent == null ? iPage : parent as ISizable);

                if (parent == null)
                    (iPage as URAbstractPage).Add(com);
                else parent.Add(com);
            }
            return com is AreaContent ? com : null;
        }
        /// <summary>
        /// případné ukončení dialogového okna vlastnosti objektů
        /// </summary>
        internal static void ClosePropertyOptions()
        {
            if (PropertyOptions != null)
                PropertyOptions.Close();
        }

        /// <summary>
        /// Získání hodnoty dle stisknutých kláves
        /// </summary>
        /// <param name="sen">větev datové struktury</param>
        /// <returns></returns>
        internal static string GetTextXmlForData(StructExtNode sen)
        {
            if (sen != null)
            {
                // pokud se jedná oregion
                if (sen.Nodes.Count != 0)
                    // vložíme celou setrukturu
                    if (Control.ModifierKeys == (Keys.Control | Keys.Shift))
                        return XmlService.SimpleFormat(XmlService.IndentedFormat(string.Format("<{0}>{1}</{0}>", sen.Name, GetTextXmlForDataRecursively(sen))));
                    else if (Control.ModifierKeys == Keys.Control)
                        return XmlService.SimpleFormat(XmlService.IndentedFormat(string.Format("<{0}>{1}</{0}>", sen.Name, GetTextXmlForDataRecursively(sen, withSubNode: false))));

                // u položky je možná jediná prezentace
                return string.Format("<{0}>{1}</{0}>", sen.Name, sen.DataItem != null ? sen.DataItem.PreviewValue : string.Empty);
            }
            return string.Empty;
        }

        /// <summary>
        /// Získání hodnoty dle stisknutých kláves
        /// </summary>
        /// <param name="objNode">větev datové struktury</param>
        /// <returns></returns>
        internal static string GetTextDataForData(StructExtNode objNode)
        {
            if (objNode != null)
                // pokud se jedná o region
                return objNode.Nodes.Count != 0
                    ? GetTextDataForDataLine(objNode)
                // pokud se jedná o datovou položku
                : GetTextDataForDataLine(objNode.Parent as StructExtNode);
            return string.Empty;
        }

        static string GetTextDataForDataLine(StructExtNode objNode)
        {
            string result = objNode.Name;

            foreach (var item in objNode.Nodes)
            {
                if (!(item is StructExtNode sen) || sen.DataRegion != null)
                    break;

                result += "|" + (sen.DataItem != null ? sen.DataItem.PreviewValue : string.Empty);
            }
            return result + "|\r\n";
        }

        /// <summary>
        /// získání textové hodnoty promměné z větvi proměnné
        /// </summary>
        /// <param name="varExtNode">větev proměnné okna proměnných</param>
        /// <returns></returns>
        internal static string GetText(VarExtNode varExtNode)
        {
            if (varExtNode != null && varExtNode.Variable != null)
                return varExtNode.Variable.Region != null
                    ? GetText(varExtNode.Variable.Region.DataFullName) + '.' + varExtNode.Variable.Name
                    : varExtNode.Variable.Name;

            return string.Empty;
        }
        /// <exclude/>
        public static void DeleteToRecycleBin(string fileName)
        {
            if (!File.Exists(fileName) && !Directory.Exists(fileName))
                throw new FileNotFoundException(GResources.GetResourceText(29450484), fileName); //RC 29450484 : Soubor nebyl nalezen!
            NativeMethods.SHFILEOPSTRUCT info = new NativeMethods.SHFILEOPSTRUCT
            {
                hwnd = SimpleDesktop.MainForm.Handle,
                wFunc = NativeMethods.FO_FUNC.FO_DELETE,
                fFlags = NativeMethods.FILEOP_FLAGS.FOF_ALLOWUNDO | NativeMethods.FILEOP_FLAGS.FOF_NOCONFIRMATION,
                lpszProgressTitle = "Delete " + Path.GetFileName(fileName),
                pFrom = fileName + "\0" // pFrom je double-null-terminated
            };
            int result = NativeMethods.SHFileOperation(ref info);
            if (result != 0)
                throw new IOException(string.Format(GResources.GetResourceText(29450220) + " '{0}' " + GResources.GetResourceText(29450555) + '\n' + GResources.GetResourceText(29450189) + ": {1}!", fileName, result)); //RC 29450220 : Soubor
        }

        internal static string GetText_XmlStructure(StructExtNode structExtNode)
        {
            if (structExtNode != null)
            {
                string result = string.Format("<{0}>$$$</{0}>", structExtNode.Name);
                if (structExtNode.DataRegion != null)
                    result = result.Replace("$$$", "\r\n" + GetText_XmlStructure_Region(structExtNode.DataRegion));
                else
                    result = result.Replace("$$$", string.Empty);
                return result;
            }
            else
                return string.Empty;
        }

        private static string GetText_XmlStructure_Region(GFERegion gFERegion)
        {
            string result = "$$$";

            foreach (var item in gFERegion.Items)
                result = result.Replace("$$$", string.Format("<{0}></{0}>\r\n$$$", item.Name));

            foreach (var item in gFERegion.Children)
                result = result.Replace("$$$", string.Format("<{0}>$$$</{0}>", item.Name).Replace("$$$", "\r\n" + GetText_XmlStructure_Region(item)) + "\r\n$$$");

            result = result.Replace("$$$", string.Empty);

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="textHandler"></param>
        /// <param name="actualXmlStyle"></param>
        /// <returns></returns>
        public static string GetSerializedFontFamilyName(ITextHandler textHandler, GFEList actualXmlStyle)
        {
            if (textHandler?.Text?.TextFont?.FontFamily == null)
                return string.Empty;

            string fontName = textHandler.Text.TextFont.FontFamily.Name;
            if (!"times".Equals(fontName, StringComparison.InvariantCultureIgnoreCase)
                && !"arial".Equals(fontName, StringComparison.InvariantCultureIgnoreCase)
                && !"courier".Equals(fontName, StringComparison.InvariantCultureIgnoreCase))
                return fontName;

            if (actualXmlStyle != null
                && actualXmlStyle.Count != 0
                && actualXmlStyle.ContainsKey("font-face")
                && actualXmlStyle.ContainsKey("font-name")
                && "custom".Equals(Convert.ToString(actualXmlStyle["font-face"]), StringComparison.InvariantCultureIgnoreCase))
            {
                string actualFontName = Convert.ToString(actualXmlStyle["font-name"]);
                if (!string.IsNullOrEmpty(actualFontName)
                    && actualFontName.Equals(textHandler.Text.TextFont.FontFamily.FontFamily.Name, StringComparison.InvariantCultureIgnoreCase))
                    return actualFontName;
            }

            return fontName;
        }

    }
}
