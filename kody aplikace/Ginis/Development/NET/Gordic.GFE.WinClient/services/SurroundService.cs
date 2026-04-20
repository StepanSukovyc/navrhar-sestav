//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SurroundService.cs                     </Name>
//    <Description> Barva orámování                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using Gordic.GFE.Parsers;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.WinClient.Service
{
    /// <summary>
    /// služba pro prácis rámečkem
    /// </summary>
    static class SurroundService
    {
        /// <summary>
        /// Barva orámování
        /// </summary>
        public static Color Color { get; set; }
        static string dashStyle = ComplexDashStyle.Unspec;
        /// <summary>
        /// Styl orámování
        /// </summary>
        public static string DashStyle { get => dashStyle; set => dashStyle = value; }
        /// <summary>
        /// Velikost orámování
        /// </summary>
        public static SizeValue Size { get; set; }

        /// <summary>
        /// Změna orámování vybraných objektů
        /// </summary>
        /// <param name="service">Služba pro prási s vybranými objekty</param>
        /// <param name="surroundType">Nový typ orámování</param>
        /// <param name="getLeftList">metoda na získání seznamu všech objektů, kterým lze změnit levý rámeček</param>
        /// <param name="getNonLeftList">metoda na získání seznamu všech objektů, kterým lze změnit levý vnitřní rámeček</param>
        /// <param name="getRightList">metoda na získání seznamu všech objektů, kterým lze změnit pravý rámeček</param>
        /// <param name="getNonRightList">metoda na získání seznamu všech objektů, kterým lze změnit pravý vnitřní rámeček</param>
        /// <param name="getTopList">metoda na získání seznamu všech objektů, kterým lze změnit horní rámeček</param>
        /// <param name="getNonTopList">metoda na získání seznamu všech objektů, kterým lze změnit horní vnitřní rámeček</param>
        /// <param name="getBottomList">metoda na získání seznamu všech objektů, kterým lze změnit dolní rámeček</param>
        /// <param name="getNonBottomList">metoda na získání seznamu všech objektů, kterým lze změnit dolní vnitřní rámeček</param>
        internal static void ChangeSurround(
            SelectionService service
            , SurroundType surroundType
            , Func<SelectionService, List<ISurroundable>> getLeftList
            , Func<SelectionService, List<ISurroundable>> getNonLeftList
            , Func<SelectionService, List<ISurroundable>> getRightList
            , Func<SelectionService, List<ISurroundable>> getNonRightList
            , Func<SelectionService, List<ISurroundable>> getTopList
            , Func<SelectionService, List<ISurroundable>> getNonTopList
            , Func<SelectionService, List<ISurroundable>> getBottomList
            , Func<SelectionService, List<ISurroundable>> getNonBottomList
            )
        {
            if (service == null)
                return;

            //Zjistíme, zda chceme aplikovat nebo zrušit formát
            bool _notAppl = Control.ModifierKeys == Keys.Control;

            switch (surroundType)
            {
                case SurroundType.nothing:
                    foreach (object item in service.SelectedComponents)
                        if (item is ISurroundable)
                        {
                            (item as ISurroundable).Surround = new URComplexSurround().Initialize();
                            (item as ISurroundable).InnerSurround = new URInnerSurround().Initialize();
                        }
                    break;
                case SurroundType.around:
                    ApplyLeft(service, _notAppl, getLeftList);
                    ApplyRight(service, _notAppl, getRightList);
                    ApplyTop(service, _notAppl, getTopList);
                    ApplyBottom(service, _notAppl, getBottomList);
                    break;
                case SurroundType.inside:
                    ApplyMiddleHorizontal(service, _notAppl, getNonTopList, getNonBottomList);
                    ApplyMiddleVertical(service, _notAppl, getNonLeftList, getNonRightList);
                    break;
                case SurroundType.aroundinside:
                    foreach (object item in service.SelectedComponents)
                        if (item is ISurroundable)
                            (item as ISurroundable).Surround = new URComplexSurround().Initialize(DashStyle, Size.Value, false, Color);
                    break;
                case SurroundType.left:
                    ApplyLeft(service, _notAppl, getLeftList);
                    break;
                case SurroundType.right:
                    ApplyRight(service, _notAppl, getRightList);
                    break;
                case SurroundType.top:
                    ApplyTop(service, _notAppl, getTopList);
                    break;
                case SurroundType.bottom:
                    ApplyBottom(service, _notAppl, getBottomList);
                    break;
                case SurroundType.middlehorizontal:
                    ApplyMiddleHorizontal(service, _notAppl, getNonTopList, getNonBottomList);
                    break;
                case SurroundType.middlevertical:
                    ApplyMiddleVertical(service, _notAppl, getNonLeftList, getNonRightList);
                    break;
                default:
                    break;
            }
        }

        #region Surround
        static void ApplyLeft(SelectionService service, bool notapply, Func<SelectionService, List<ISurroundable>> getLeftList)
        {
            if (DashStyle == ComplexDashStyle.Unspec)
                return;

            //Získánme seznam všech objektů, kterým lze změnit levý rámeček
            List<ISurroundable> _left = getLeftList(service);
            foreach (ISurroundable _item in _left)
            {
                //zafixujeme orámování
                var _border = _item.Surround;
                _border.FrameColor.LeftValue = new URComplexColor();
                if (notapply)
                {
                    _border.FrameColor.LeftValue.Initialize();
                    _border.Width.LeftValue = "0";
                }
                else
                {
                    _border.DashStyle.LeftValue = DashStyle;
                    _border.Width.LeftValue = Size.Value;
                    _border.FrameColor.LeftValue.Initialize(Color);
                }
            }
        }
        static void ApplyRight(SelectionService service, bool notapply, Func<SelectionService, List<ISurroundable>> getRightList)
        {
            if (DashStyle == ComplexDashStyle.Unspec)
                return;

            //Získánme seznam všech objektů, kterým lze změnit levý rámeček
            List<Gordic.GFE.Parsers.Dom.ISurroundable> _right = getRightList(service);

            foreach (Gordic.GFE.Parsers.Dom.ISurroundable _item in _right)
            {
                //zafixujeme orámování
                var _border = _item.Surround;

                _border.FrameColor.RightValue = new URComplexColor();
                if (notapply)
                {
                    _border.FrameColor.RightValue.Initialize();
                    _border.Width.RightValue = "0";
                }
                else
                {
                    _border.DashStyle.RightValue = DashStyle;
                    _border.Width.RightValue = Size.Value;
                    _border.FrameColor.RightValue.Initialize(Color);
                }
            }
        }
        static void ApplyTop(SelectionService service, bool _notAppl, Func<SelectionService, List<ISurroundable>> getTopList)
        {
            //Získánme seznam všech objektů, kterým lze změnit levý rámeček
            List<Gordic.GFE.Parsers.Dom.ISurroundable> _top = getTopList(service);

            foreach (Gordic.GFE.Parsers.Dom.ISurroundable _item in _top)
            {
                //zafixujeme orámování
                var _border = _item.Surround;
                _border.FrameColor.TopValue = new URComplexColor();
                if (_notAppl)
                {
                    _border.Width.TopValue = "0";
                    _border.FrameColor.TopValue.Initialize();
                }
                else
                {
                    _border.DashStyle.TopValue = DashStyle;
                    _border.Width.TopValue = Size.Value;
                    _border.FrameColor.TopValue.Initialize(Color);
                }
            }
        }
        static void ApplyBottom(SelectionService service, bool _notAppl, Func<SelectionService, List<ISurroundable>> getBottomList)
        {
            //Získánme seznam všech objektů, kterým lze změnit levý rámeček
            List<ISurroundable> _bottom = getBottomList(service);
            foreach (ISurroundable _item in _bottom)
            {
                //zafixujeme orámování
                var _border = _item.Surround;
                _border.FrameColor.BottomValue = new URComplexColor();
                if (_notAppl)
                {
                    _border.Width.BottomValue = "0";
                    _border.FrameColor.BottomValue.Initialize();
                }
                else
                {
                    _border.DashStyle.BottomValue = DashStyle;
                    _border.Width.BottomValue = Size.Value;
                    _border.FrameColor.BottomValue.Initialize(Color);
                }
            }

        }
        static void ApplyMiddleVertical(SelectionService service, bool _notAppl
            , Func<SelectionService, List<ISurroundable>> getNonLeftList
            , Func<SelectionService, List<ISurroundable>> getNonRightList)
        {
            //Získánme seznam všech objektů, kterým lze změnit levý a pravý rámeček
            List<ISurroundable> _left = getNonLeftList(service),
                _right = getNonRightList(service);

            foreach (ISurroundable _item in _left)
            {
                //zafixujeme orámování
                var _border = _item.Surround;
                _border.FrameColor.LeftValue = new URComplexColor();
                if (_notAppl)
                {
                    _border.Width.LeftValue = "0";
                    _border.FrameColor.LeftValue.Initialize();
                }
                else
                {
                    _border.DashStyle.LeftValue = DashStyle;
                    _border.Width.LeftValue = Size.Value;
                    _border.FrameColor.LeftValue.Initialize(Color);
                }
            }

            foreach (ISurroundable _item in _right)
            {
                //zafixujeme orámování
                var _border = _item.Surround;
                _border.FrameColor.RightValue = new URComplexColor();
                if (_notAppl)
                {
                    _border.Width.RightValue = "0";
                    _border.FrameColor.RightValue.Initialize();
                }
                else
                {
                    _border.DashStyle.RightValue = DashStyle;
                    _border.Width.RightValue = Size.Value;
                    _border.FrameColor.RightValue.Initialize(Color);
                }
            }
        }
        static void ApplyMiddleHorizontal(SelectionService service, bool _notAppl
            , Func<SelectionService, List<ISurroundable>> getNonTopList
            , Func<SelectionService, List<ISurroundable>> getNonBottomList)
        {
            //Získánme seznam všech objektů, kterým lze změnit horní a spodní rámečeky
            List<ISurroundable> _top = getNonTopList(service),
                _bottom = getNonBottomList(service);

            foreach (ISurroundable _item in _top)
            {
                //zafixujeme orámování
                var _border = _item.Surround;
                _border.FrameColor.TopValue = new URComplexColor();
                if (_notAppl)
                {
                    _border.Width.TopValue = "0";
                    _border.FrameColor.TopValue.Initialize();
                }
                else
                {
                    _border.DashStyle.TopValue = DashStyle;
                    _border.Width.TopValue = Size.Value;
                    _border.FrameColor.TopValue.Initialize(Color);
                }
            }

            foreach (ISurroundable _item in _bottom)
            {
                //zafixujeme orámování
                var _border = _item.Surround;
                _border.FrameColor.BottomValue = new URComplexColor();
                if (_notAppl)
                {
                    _border.Width.BottomValue = "0";
                    _border.FrameColor.BottomValue.Initialize();
                }
                else
                {
                    _border.DashStyle.BottomValue = DashStyle;
                    _border.Width.BottomValue = Size.Value;
                    _border.FrameColor.BottomValue.Initialize(Color);
                }
            }
        }

        /*
         * NEMAZAT URČENO PRO GRR SESTAVY

        /// <summary>
        /// Výběr ze seznamu vybraných objektu pouze GrrContent objektů
        /// </summary>
        /// <returns>Seznam GrrContent objektů</returns>
        private static List<ISurroundeable> GetContentList(ISelectedObject iSelectedObject)
        {
            List<ISurroundeable> _result = new List<ISurroundeable>();

            foreach (ISelectedItem _item in iSelectedObject.Items)
                //U každého vybraného objektuaplikujeme formát 
                if (_item.Object is ISurroundeable)
                    _result.Add(_item.Object as ISurroundeable);

            return _result;
        }

        /// <summary>
        /// Výběr ze seznamu vybraných objektu pouze GrrContent objektů
        /// </summary>
        /// <returns>Seznam GrrContent objektů</returns>
        List<object> GetContentList()
        {
            List<object> _result = new List<object>();

            foreach (_SelectedItem _item in SelectedObject.Items)
                //U každého vybraného objektuaplikujeme formát 
                if ((_item.Objekt is GrrContent)
                    || (_item.Objekt is GrfContent))
                    _result.Add(_item.Objekt);

            return _result;
        }
        /// <summary>
        /// Získání seznamu všech objektů, kterým lze změnit levý rámeček
        /// </summary>
        /// <returns></returns>
        List<object> GetLeftList()
        {
            List<object> _all = GetContentList(),
                _result = new List<object>();

            // v případě GRF sestavy se berou v úvahu všechny položky
            if (FormatingGroup == GFormatingGroup.GRF)
                return _all;

            while (_all.Count != 0)
            {
                //zafixujeme obsah
                GrrContent _content = _all[0] as GrrContent;
                //zafixujeme buňku daného objektu
                GrrCell _cell = _content.ParentCell;
                //zjistíme řádek ve kterém senachází
                GrrLine _line = _cell.Line;

                //indikátor analýzy obsahu
                bool _added = false;

                //zjistíme, zda mezi vybranými objekty je bezprostřední soused po leve straně od daného objektu,
                //pokud ANO pak daný objekt ignorujeme jinak, je v průběžném řádku nejvíce zleva
                int _index = 0;

                while (_index < _result.Count)
                {
                    //zafixuejem průběžný objekt
                    GrrContent _item = _result[_index] as GrrContent;
                    //zafixujeme buňku průběžného objektu
                    GrrCell _cellItem = _item.ParentCell;
                    //řádek průběžného objektu
                    GrrLine _lineItem = _cellItem.Line;

                    if (_lineItem == _line)
                    {
                        int _indexA = _line.Cells.Visible.IndexOf(_cellItem),
                            _indexB = _line.Cells.Visible.IndexOf(_cell);

                        //Je něco mezí?
                        bool _between = _indexA + 1 < _indexB || _indexB + 1 < _indexA;

                        //rozebereme všechny možnosti
                        if (_indexA < _indexB)
                        {
                            if (!_between)
                                _added = true;

                            break;
                        }
                        else if (_indexA > _indexB)
                        {
                            if (!_between)
                                _result.Remove(_item);

                            break;
                        }
                    }

                    //další objekt
                    _index++;
                }
                //pokud objekt nebyl přidán ani vymazán, 
                //pak ho přidáme, protože zřejmě je jediný z řádku 
                //anebo je první v seznamu 
                if (!_added)
                    _result.Add(_content);
                //vymažeme objekt ... teď už je analyzován
                _all.Remove(_content);
            }
            return _result;
        }
        /// <summary>
        /// Získání seznamu všech objektů, kterým lze změnit levý vnitřní rámeček
        /// </summary>
        /// <returns></returns>
        List<object> GetNonLeftList()
        {
            List<object> _all = GetContentList(),
                _result = new List<object>();

            // v případě GRF sestavy se berou v úvahu všechny položky
            if (FormatingGroup == GFormatingGroup.GRF)
                return _all;

            int _indexContent = 0;

            while (_indexContent < _all.Count)
            {
                //zafixujeme obsah
                GrrContent _content = _all[_indexContent] as GrrContent;
                //zafixujeme buňku daného objektu
                GrrCell _cell = _content.ParentCell;
                //zjistíme řádek ve kterém senachází
                GrrLine _line = _cell.Line;

                int _indexItem = 0;
                while (_indexItem < _all.Count)
                {
                    //zafixuejem průběžný objekt
                    GrrContent _item = _all[_indexItem] as GrrContent;
                    //zafixujeme buňku průběžného objektu
                    GrrCell _cellItem = _item.ParentCell;
                    //řádek průběžného objektu
                    GrrLine _lineItem = _cellItem.Line;

                    if (_lineItem == _line)
                    {
                        int _indexA = _line.Cells.Visible.IndexOf(_cellItem),
                            _indexB = _line.Cells.Visible.IndexOf(_cell);

                        //Je něco mezí?
                        bool _between = _indexA + 1 < _indexB || _indexB + 1 < _indexA;

                        //rozebereme všechny možnosti
                        if (_indexA < _indexB)
                        {
                            if (!_between)
                                if (!_result.Contains(_content))
                                {
                                    _result.Add(_content);
                                    break;
                                }
                        }
                        else if (_indexA > _indexB)
                        {
                            if (!_between)
                                if (!_result.Contains(_item))
                                    _result.Add(_item);
                        }
                    }
                    _indexItem++;
                }
                _indexContent++;
            }

            return _result;
        }
        /// <summary>
        /// Získání seznamu všech objektů, kterým lze změnit pravý rámeček
        /// </summary>
        /// <returns></returns>
        List<object> GetRightList()
        {
            List<object> _all = GetContentList(),
                _result = new List<object>();
            // v případě GRF sestavy se berou v úvahu všechny položky
            if (FormatingGroup == GFormatingGroup.GRF)
                return _all;

            while (_all.Count != 0)
            {
                //zafixujeme obsah
                GrrContent _content = _all[0] as GrrContent;
                //zafixujeme buňku daného objektu
                GrrCell _cell = _content.ParentCell;
                //zjistíme řádek ve kterém senachází
                GrrLine _line = _cell.Line;

                //indikátor analýzy obsahu
                bool _added = false;

                //zjistíme, zda mezi vybranými objekty je bezprostřední soused po prave straně od daného objektu,
                //pokud ANO pak daný objekt ignorujeme jinak, je v průběžném řádku nejvíce zprava
                int _index = 0;

                while (_index < _result.Count)
                {
                    //zafixuejem průběžný objekt
                    GrrContent _item = _result[_index] as GrrContent;
                    //zafixujeme buňku průběžného objektu
                    GrrCell _cellCell = _item.ParentCell;
                    //řádek průběžného objektu
                    GrrLine _lineLine = _cellCell.Line;

                    if (_lineLine == _line)
                    {
                        int _indexA = _line.Cells.Visible.IndexOf(_cellCell),
                            _indexB = _line.Cells.Visible.IndexOf(_cell);

                        //Je něco mezí?
                        bool _between = _indexA + 1 < _indexB || _indexB + 1 < _indexA;

                        //rozebereme všechny možnosti
                        if (_indexA > _indexB)
                        {
                            if (!_between)
                                _added = true;

                            break;
                        }
                        else if (_indexA < _indexB)
                        {
                            if (!_between)
                                _result.Remove(_item);

                            break;
                        }
                    }

                    //další objekt
                    _index++;
                }
                //pokud objekt nebyl přidán ani vymazán, 
                //pak ho přidáme, protože zřejmě je jediný z řádku 
                //anebo je první v seznamu 
                if (!_added)
                    _result.Add(_content);
                //vymažeme objekt ... teď už je analyzován
                _all.Remove(_content);
            }
            return _result;
        }
        /// <summary>
        /// Získání seznamu všech objektů, kterým lze změnit pravý vnitřní rámeček
        /// </summary>
        /// <returns></returns>
        List<object> GetNonRightList()
        {
            List<object> _all = GetContentList(),
                _result = new List<object>();
            // v případě GRF sestavy se berou v úvahu všechny položky
            if (FormatingGroup == GFormatingGroup.GRF)
                return _all;

            int _indexContent = 0;

            while (_indexContent < _all.Count)
            {
                //zafixujeme obsah
                GrrContent _content = _all[_indexContent] as GrrContent;
                //zafixujeme buňku daného objektu
                GrrCell _cell = _content.ParentCell;
                //zjistíme řádek ve kterém senachází
                GrrLine _line = _cell.Line;

                //zjistíme, zda mezi vybranými objekty je bezprostřední soused po prave straně od daného objektu,
                //pokud ANO pak daný objekt ignorujeme jinak, je v průběžném řádku nejvíce zprava
                int _indexItem = 0;

                while (_indexItem < _all.Count)
                {
                    //zafixuejem průběžný objekt
                    GrrContent _item = _all[_indexItem] as GrrContent;
                    //zafixujeme buňku průběžného objektu
                    GrrCell _cellItem = _item.ParentCell;
                    //řádek průběžného objektu
                    GrrLine _lineItem = _cellItem.Line;

                    if (_lineItem == _line)
                    {
                        int _indexA = _line.Cells.Visible.IndexOf(_cellItem),
                            _indexB = _line.Cells.Visible.IndexOf(_cell);

                        //Je něco mezí?
                        bool _between = _indexA + 1 < _indexB || _indexB + 1 < _indexA;

                        //rozebereme všechny možnosti
                        if (_indexA > _indexB)
                        {
                            if (!_between)
                                if (!_result.Contains(_content))
                                {
                                    _result.Add(_content);
                                    break;
                                }
                        }
                        else if (_indexA < _indexB)
                        {
                            if (!_between)
                                if (!_result.Contains(_item))
                                    _result.Add(_item);
                        }
                    }

                    //další objekt
                    _indexItem++;
                }
                _indexContent++;
            }
            return _result;
        }
        /// <summary>
        /// Získání seznamu všech objektů, kterým lze změnit horní rámeček
        /// </summary>
        /// <returns></returns>
        List<object> GetTopList()
        {
            List<object> _all = GetContentList(),
                _result = new List<object>();

            // v případě GRF sestavy se berou v úvahu všechny položky
            if (FormatingGroup == GFormatingGroup.GRF)
                return _all;
            int _indexContent = 0;

            while (_indexContent < _all.Count)
            {
                //zafixujeme obsah
                GrrContent _content = _all[_indexContent] as GrrContent;
                //zafixujeme buňku daného objektu
                GrrCell _cell = _content.ParentCell;
                //zjistíme řádek ve kterém senachází
                GrrLine _line = _cell.Line;

                //indikuje, že něco se nachází NAD objektem CELL
                bool _isSomethingOver = false;

                //Index průběžného objektu
                int _indexItem = 0;

                while (_indexItem < _all.Count)
                {
                    if (_indexItem == _indexContent)
                    {
                        _indexItem++;
                        continue;
                    }

                    //zafixujeme obsah
                    GrrContent _item = _all[_indexItem] as GrrContent;
                    //zafixujeme buňku daného objektu
                    GrrCell _cellItem = _item.ParentCell;
                    //zjistíme řádek ve kterém senachází
                    GrrLine _lineItem = _cellItem.Line;

                    //Zjistíme, zda řádky se nachází jeden nad druhým
                    int _positionUnderLine = (int)Math.Round(_line.TopByTab + _line.Height),
                        _positionLineItemTop = (int)Math.Round(_lineItem.TopByTab),
                        _positionUnderLineItem = (int)Math.Round(_lineItem.TopByTab + _lineItem.Height),
                        _positionLineTop = (int)Math.Round(_line.TopByTab);

                    //Případ kdy ITEM se nachází nad CONTENTom
                    if (_positionUnderLineItem == _positionLineTop)
                    {
                        //Použijeme matematické vlastností úseků
                        bool _c = (int)Math.Round(_cell.Left - _cellItem.Left) == 0,
                            _cc = (int)Math.Round(_cell.Left - _cellItem.Left - _cellItem.Width) == 0,
                            _ccc = (int)Math.Round(_cell.Left + _cell.Width - _cellItem.Left) == 0,
                            _cccc = (int)Math.Round(_cell.Left + _cell.Width - _cellItem.Left - _cellItem.Width) == 0;

                        bool _a = (int)Math.Round(_cell.Left - _cellItem.Left) > 0,
                            _aa = (int)Math.Round(_cell.Left - _cellItem.Left - _cellItem.Width) > 0,
                            _b = (int)Math.Round(_cell.Left + _cell.Width - _cellItem.Left) > 0,
                            _bb = (int)Math.Round(_cell.Left + _cell.Width - _cellItem.Left - _cellItem.Width) > 0;

                        //se nachází BEZPROSTŘEDNĚ nad 
                        if ((_a != _b && !_ccc && !_cc)
                            || (_a != _aa && !_ccc && !_cc)
                            || (_b != _bb && !_cccc && !_c)
                            )
                        {
                            _isSomethingOver = true;
                            break;
                        }
                    }
                    //jinak
                    _indexItem++;
                }
                //pokud se nic nenachází NAD objektem CONTENT, pak mu můžeme vykreslit TOP
                if (!_isSomethingOver && !_result.Contains(_content))
                    _result.Add(_content);

                _indexContent++;
            }

            return _result;
        }
        /// <summary>
        /// Získání seznamu všech objektů, kterým lze změnit horní vnitřní rámeček
        /// </summary>
        /// <returns></returns>
        List<object> GetNonTopList()
        {
            List<object> _all = GetContentList(),
                _result = new List<object>();

            // v případě GRF sestavy se berou v úvahu všechny položky
            if (FormatingGroup == GFormatingGroup.GRF)
                return _all;
            int _indexContent = 0;

            while (_indexContent < _all.Count)
            {
                //zafixujeme obsah
                GrrContent _content = _all[_indexContent] as GrrContent;
                //zafixujeme buňku daného objektu
                GrrCell _cell = _content.ParentCell;
                //zjistíme řádek ve kterém senachází
                GrrLine _line = _cell.Line;

                //Index průběžného objektu
                int _indexItem = 0;

                while (_indexItem < _all.Count)
                {
                    if (_indexItem == _indexContent)
                    {
                        _indexItem++;
                        continue;
                    }

                    //zafixujeme obsah
                    GrrContent _item = _all[_indexItem] as GrrContent;
                    //zafixujeme buňku daného objektu
                    GrrCell _cellItem = _item.ParentCell;
                    //zjistíme řádek ve kterém senachází
                    GrrLine _lineItem = _cellItem.Line;

                    //Zjistíme, zda řádky se nachází jeden nad druhým
                    int _positionUnderLine = (int)Math.Round(_line.TopByTab + _line.Height),
                        _positionLineItemTop = (int)Math.Round(_lineItem.TopByTab),
                        _positionUnderLineItem = (int)Math.Round(_lineItem.TopByTab + _lineItem.Height),
                        _positionLineTop = (int)Math.Round(_line.TopByTab);

                    //Případ kdy ITEM se nachází nad CONTENTom
                    if (_positionUnderLineItem == _positionLineTop)
                    {
                        //Použijeme matematické vlastností úseků
                        bool _c = (int)Math.Round(_cell.Left - _cellItem.Left) == 0,
                            _cc = (int)Math.Round(_cell.Left - _cellItem.Left - _cellItem.Width) == 0,
                            _ccc = (int)Math.Round(_cell.Left + _cell.Width - _cellItem.Left) == 0,
                            _cccc = (int)Math.Round(_cell.Left + _cell.Width - _cellItem.Left - _cellItem.Width) == 0;

                        bool _a = (int)Math.Round(_cell.Left - _cellItem.Left) > 0,
                            _aa = (int)Math.Round(_cell.Left - _cellItem.Left - _cellItem.Width) > 0,
                            _b = (int)Math.Round(_cell.Left + _cell.Width - _cellItem.Left) > 0,
                            _bb = (int)Math.Round(_cell.Left + _cell.Width - _cellItem.Left - _cellItem.Width) > 0;

                        //se nachází BEZPROSTŘEDNĚ nad přes celou šířku
                        if (((_a == _b)
                            || (_a != _b && _c))
                            && ((_aa == _bb) || (_aa != _bb && _cccc)))
                        {
                            if (!_result.Contains(_content))
                                _result.Add(_content);
                            break;
                        }
                    }
                    //jinak
                    _indexItem++;
                }
                _indexContent++;
            }

            return _result;
        }
        /// <summary>
        /// Získání seznamu všech objektů, kterým lze změnit dolní rámeček
        /// </summary>
        /// <returns></returns>
        List<object> GetBottomList()
        {
            List<object> _all = GetContentList(),
                _result = new List<object>();

            // v případě GRF sestavy se berou v úvahu všechny položky
            if (FormatingGroup == GFormatingGroup.GRF)
                return _all;
            int _indexContent = 0;

            while (_indexContent < _all.Count)
            {
                //zafixujeme obsah
                GrrContent _content = _all[_indexContent] as GrrContent;
                //zafixujeme buňku daného objektu
                GrrCell _cell = _content.ParentCell;
                //zjistíme řádek ve kterém senachází
                GrrLine _line = _cell.Line;

                //indikuje zda je něco POD objektem CONTENT
                bool _isSomethingBottom = false;

                //Index průběžného objektu
                int _indexItem = 0;

                while (_indexItem < _all.Count)
                {
                    //zafixujeme obsah
                    GrrContent _item = _all[_indexItem] as GrrContent;
                    //zafixujeme buňku daného objektu
                    GrrCell _cellItem = _item.ParentCell;
                    //zjistíme řádek ve kterém senachází
                    GrrLine _lineItem = _cellItem.Line;

                    //Zjistíme, zda řádky se nachází jeden nad druhým
                    int _positionUnderLine = (int)Math.Round(_line.TopByTab + _line.Height),
                        _positionLineItemTop = (int)Math.Round(_lineItem.TopByTab),
                        _positionUnderLineItem = (int)Math.Round(_lineItem.TopByTab + _lineItem.Height),
                        _positionLineTop = (int)Math.Round(_line.TopByTab);

                    //Případ kdy CONTENT se nachází nad ITEMom
                    if (_positionUnderLine == _positionLineItemTop)
                    {
                        //Použijeme matematické vlastností úseků
                        bool _c = (int)Math.Round(_cellItem.Left - _cell.Left) == 0,
                            _cc = (int)Math.Round(_cellItem.Left - _cell.Left - _cell.Width) == 0,
                            _ccc = (int)Math.Round(_cellItem.Left + _cellItem.Width - _cell.Left) == 0,
                            _cccc = (int)Math.Round(_cellItem.Left + _cellItem.Width - _cell.Left - _cell.Width) == 0;

                        bool _a = (int)Math.Round(_cellItem.Left - _cell.Left) > 0,
                            _aa = (int)Math.Round(_cellItem.Left - _cell.Left - _cell.Width) > 0,
                            _b = (int)Math.Round(_cellItem.Left + _cellItem.Width - _cell.Left) > 0,
                            _bb = (int)Math.Round(_cellItem.Left + _cellItem.Width - _cell.Left - _cell.Width) > 0;

                        //se nachází BEZPROSTŘEDNĚ nad 
                        if ((_a != _b && !_ccc && !_cc)
                            || (_a != _aa && !_ccc && !_cc)
                            || (_b != _bb && !_cccc && !_c)
                            )
                        {
                            _isSomethingBottom = true;
                            break;
                        }
                    }
                    _indexItem++;
                }

                if (!_isSomethingBottom && !_result.Contains(_content))
                    _result.Add(_content);

                _indexContent++;
            }

            return _result;
        }
        /// <summary>
        /// Získání seznamu všech objektů, kterým lze změnit dolní vnitřní rámeček
        /// </summary>
        /// <returns></returns>
        List<object> GetNonBottomList()
        {
            List<object> _all = GetContentList(),
                _result = new List<object>();

            // v případě GRF sestavy se berou v úvahu všechny položky
            if (FormatingGroup == GFormatingGroup.GRF)
                return _all;

            int _indexContent = 0;

            while (_indexContent < _all.Count)
            {
                //zafixujeme obsah
                GrrContent _content = _all[_indexContent] as GrrContent;
                //zafixujeme buňku daného objektu
                GrrCell _cell = _content.ParentCell;
                //zjistíme řádek ve kterém senachází
                GrrLine _line = _cell.Line;

                //Index průběžného objektu
                int _indexItem = 0;

                while (_indexItem < _all.Count)
                {
                    if (_indexItem == _indexContent)
                    {
                        _indexItem++;
                        continue;
                    }

                    //zafixujeme obsah
                    GrrContent _item = _all[_indexItem] as GrrContent;
                    //zafixujeme buňku daného objektu
                    GrrCell _cellItem = _item.ParentCell;
                    //zjistíme řádek ve kterém senachází
                    GrrLine _lineItem = _cellItem.Line;

                    //Zjistíme, zda řádky se nachází jeden nad druhým
                    int _positionUnderLine = (int)Math.Round(_line.TopByTab + _line.Height),
                        _positionLineItemTop = (int)Math.Round(_lineItem.TopByTab),
                        _positionUnderLineItem = (int)Math.Round(_lineItem.TopByTab + _lineItem.Height),
                        _positionLineTop = (int)Math.Round(_line.TopByTab);

                    //Případ kdy CONTENT se nachází nad ITEMom
                    if (_positionUnderLine == _positionLineItemTop)
                    {
                        //Použijeme matematické vlastností úseků
                        bool _c = (int)Math.Round(_cellItem.Left - _cell.Left) == 0,
                            _cc = (int)Math.Round(_cellItem.Left - _cell.Left - _cell.Width) == 0,
                            _ccc = (int)Math.Round(_cellItem.Left + _cellItem.Width - _cell.Left) == 0,
                            _cccc = (int)Math.Round(_cellItem.Left + _cellItem.Width - _cell.Left - _cell.Width) == 0;

                        bool _a = (int)Math.Round(_cellItem.Left - _cell.Left) > 0,
                            _aa = (int)Math.Round(_cellItem.Left - _cell.Left - _cell.Width) > 0,
                            _b = (int)Math.Round(_cellItem.Left + _cellItem.Width - _cell.Left) > 0,
                            _bb = (int)Math.Round(_cellItem.Left + _cellItem.Width - _cell.Left - _cell.Width) > 0;

                        //se nachází BEZPROSTŘEDNĚ nad přes celou šířku
                        if (((_a != _b)
                            || (_a == _b && _c))
                            && ((_aa != _bb) || (_aa == _bb && _cccc)))
                        {
                            if (!_result.Contains(_content))
                                _result.Add(_content);
                            break;
                        }
                    }
                    _indexItem++;
                }
                _indexContent++;
            }

            return _result;
        }
*/
        #endregion
    }
}
