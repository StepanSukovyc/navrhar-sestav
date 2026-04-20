//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ALabel.cs                              </Name>
//    <Description> třída pro práci se štítky                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Services;
using Gordic.GFE.WinClient.VariablesView;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.WinClient.Labels;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// třída pro práci se štítky
    /// </summary>
    public class ALabel : AbstractLabel, IKeyActionHandler, IDesignSearchHandler
    {
        #region IKeyActionHandler
        /// <exclude/>
        public IComponent GetLeftObject() { throw new NotImplementedException(); }
        /// <exclude/>
        public virtual IComponent GetLeftObject(object obj)
        {
            if (obj is IGRRLine line)
            {
                // podmínka hledání posledního objektu regionu
                bool lastItem = !Head.Contains(line) && !Body.Contains(line) && !Foot.Contains(line);
                if (lastItem)
                {
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindLastCondition(Foot).LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FindLastCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (_bodyLine.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetLeftObject(line);
                        }
                    }
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindLastCondition(Head).LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }

                switch (line.Type)
                {
                    case LineType.head:
                        var _head = LocalCommonService.FindLastCondition(Head, line);
                        if (_head != null)
                        {
                            if (_head.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        var _hgroup = this is GrrGroup
                            ? ((this as GrrGroup).ParentLabel as GrrRegion).Group.LastOrDefault(gp => (gp as GrrGroup).Index < (this as GrrGroup).Index)
                            : null;
                        if (_hgroup is ALabel)
                            return (_hgroup as ALabel).GetLeftObject(_hgroup);

                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetLeftObject(this);
                        break;
                    case LineType.body:
                        var _body = LocalCommonService.FindLastCondition(Body, line.Index);

                        if (_body != null)
                        {
                            if (_body is IGRRLine _bodyLine)
                            {
                                if (_bodyLine.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_body is ALabel _bodyLabel)
                                return _bodyLabel.GetLeftObject(line);
                        }

                        var _bgroup = (this is GrrRegion && (this as GrrRegion).Group.Count > 0)
                            ? (this as GrrRegion).Group.Last()
                            : null;
                        if (_bgroup is ALabel)
                            return (_bgroup as ALabel).GetLeftObject(line);

                        var _headBody = LocalCommonService.FindLastCondition(Head);
                        if (_headBody != null)
                        {
                            if (_headBody.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        // pokud je to úplně navrchu, pak
                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetLeftObject(this);
                        break;
                    case LineType.foot:
                        var _foot = LocalCommonService.FindLastCondition(Foot, line);
                        if (_foot != null)
                        {
                            if (_foot.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        var group = (this is GrrRegion && (this as GrrRegion).Group.Count > 0) ? (this as GrrRegion).Group.FirstOrDefault() : null;
                        if (group == null)
                            group = (this is GrrGroup && ((this as GrrGroup).ParentLabel as GrrRegion).Group.Count > 0) ? ((this as GrrGroup).ParentLabel as GrrRegion).Group.FirstOrDefault(gp => (gp as GrrGroup).Index > (this as GrrGroup).Index) : null;
                        if (group is ALabel)
                            return (group as ALabel).GetLeftObject(line);

                        var _bodyFoot = LocalCommonService.FindLastCondition(Body);
                        if (_bodyFoot != null)
                        {
                            if (_bodyFoot is IGRRLine _bodyLine)
                            {
                                if (_bodyLine.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bodyFoot is ALabel _bodyLabel)
                                return _bodyLabel.GetLeftObject(line);
                        }

                        var _headFoot = LocalCommonService.FindLastCondition(Head);
                        if (_headFoot != null)
                        {
                            if (_headFoot.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }
                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetLeftObject(this);
                        break;
                    default:
                        break;
                }
            }
            if (obj is GrrRegion label)
            {
                // podmínka hledání posledního objektu regionu
                bool lastItem = !Body.Contains(label);
                if (lastItem)
                {
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindLastCondition(Foot).LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FindLastCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (_bodyLine.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetLeftObject(label);
                        }
                    }
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindLastCondition(Head).LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }

                var _body = LocalCommonService.FindLastCondition(Body, Body.IndexOf(label));
                if (_body != null)
                {
                    if (_body is IGRRLine _bodyLine)
                    {
                        if (_bodyLine.LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (_body is ALabel _bodyLabel)
                        return _bodyLabel.GetLeftObject(label);
                }

                // jdeme nahoru
                if (Head.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FindLastCondition(Head).LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }

                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetLeftObject(this);
            }
            if (obj is GrrGroup _labelGroup)
            {
                // jdeme nahoru
                if (Head.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FindLastCondition(Head).LastOrDefault(cl => !cl.IsComment) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }
                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetLeftObject(this);
            }
            return null;
        }

        /// <exclude/>
        public IComponent GetRightObject() { throw new NotImplementedException(); }
        /// <exclude/>
        public virtual IComponent GetRightObject(object obj)
        {
            if (obj is IGRRLine line)
            {
                // podmínka hledání prvního objektu regionu
                bool firstItem = !Head.Contains(line) && !Body.Contains(line) && !Foot.Contains(line);
                if (firstItem)
                {
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FirstCondition(Head).FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FirstOrDefaultCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (_bodyLine.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetRightObject(line);
                        }
                    }
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FirstOrDefaultCondition(Foot).FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }

                switch (line.Type)
                {
                    case LineType.head:
                        var _head = LocalCommonService.FirstOrDefaultCondition(Head, line);
                        if (_head != null)
                        {
                            if (_head.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        var group = (this is GrrRegion && (this as GrrRegion).Group.Count > 0) ? (this as GrrRegion).Group.FirstOrDefault() : null;
                        if (group == null)
                            group = (this is GrrGroup && ((this as GrrGroup).ParentLabel as GrrRegion).Group.Count > 0) ? ((this as GrrGroup).ParentLabel as GrrRegion).Group.FirstOrDefault(gp => (gp as GrrGroup).Index > (this as GrrGroup).Index) : null;
                        if (group is ALabel)
                            return (group as ALabel).GetRightObject(line);

                        var _bodyHead = LocalCommonService.FirstOrDefaultCondition(Body);
                        if (_bodyHead != null)
                        {
                            if (_bodyHead is IGRRLine _bodyLine)
                            {
                                if (_bodyLine.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bodyHead is ALabel _bodyLabel)
                                return _bodyLabel.GetRightObject(line);
                        }

                        var _footHead = LocalCommonService.FirstOrDefaultCondition(Foot);
                        if (_footHead != null)
                        {
                            if (_footHead.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetRightObject(this);
                        break;
                    case LineType.body:
                        var _body = LocalCommonService.FirstOrDefaultCondition(Body, line.Index);
                        if (_body != null)
                        {
                            if (_body is IGRRLine _bodyLine)
                            {
                                if (_bodyLine.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_body is ALabel _bodyLabel)
                                return _bodyLabel.GetRightObject(line);
                        }

                        var _bgroup = (this is GrrRegion && (this as GrrRegion).Group.Count > 0) ? (this as GrrRegion).Group.Last() : null;
                        if (_bgroup is ALabel)
                            return (_bgroup as ALabel).GetRightObject(line);

                        var _footBody = LocalCommonService.FirstOrDefaultCondition(Foot);
                        if (_footBody != null)
                        {
                            if (_footBody.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        // pokud je to úplně navrchu, pak
                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetRightObject(this);
                        break;
                    case LineType.foot:
                        var _foot = LocalCommonService.FirstOrDefaultCondition(Foot, line);
                        if (_foot != null)
                        {
                            if (_foot.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        var _hgroup = this is GrrGroup ? ((this as GrrGroup).ParentLabel as GrrRegion).Group.LastOrDefault(gp => (gp as GrrGroup).Index < (this as GrrGroup).Index) : null;
                        if (_hgroup is ALabel)
                            return (_hgroup as ALabel).GetRightObject(_hgroup);

                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetRightObject(this);
                        break;
                    default:
                        break;
                }
            }

            if (obj is GrrRegion label)
            {
                // podmínka hledání posledního objektu regionu
                bool lastItem = !Body.Contains(label);
                if (lastItem)
                {
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FirstOrDefaultCondition(Head).FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FirstOrDefaultCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (_bodyLine.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetRightObject(label);
                        }
                    }
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FirstOrDefaultCondition(Foot).FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }

                // dolů
                var _body = LocalCommonService.FirstOrDefaultCondition(Body, Body.IndexOf(label));
                if (_body != null)
                {
                    if (_body is IGRRLine _bodyLine)
                    {
                        if (_bodyLine.FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (_body is ALabel _bodyLabel)
                        return _bodyLabel.GetRightObject(label);
                }

                // jdeme dolů
                if (Foot.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FirstOrDefaultCondition(Foot).FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }

                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetRightObject(this);
            }
            if (obj is GrrGroup _labelGroup)
            {
                // jdeme dolů
                if (Foot.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FirstOrDefaultCondition(Foot).FirstOrDefault(cl => !cl.IsComment) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }
                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetRightObject(this);
            }
            return null;
        }

        /// <exclude/>
        public IComponent GetTopObject() { throw new NotImplementedException(); }
        /// <exclude/>
        public virtual IComponent GetTopObject(object obj, ISizable sizable)
        {
            if (obj is IGRRLine line)
            {
                // podmínka hledání objektu regionu
                bool lastItem = !Head.Contains(line) && !Body.Contains(line) && !Foot.Contains(line);
                if (lastItem)
                {
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        //.LastOrDefault(cl => !cl.IsComment) as GrrCell;
                        if (LocalCommonService.FindCellByTopConditions(Foot.FindLast(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FindLastCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetTopObject(line, sizable);
                        }
                    }
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Head.FindLast(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }

                switch (line.Type)
                {
                    case LineType.head:
                        var _head = LocalCommonService.FindLastCondition(Head, line);
                        if (_head != null)
                        {
                            if (LocalCommonService.FindCellByTopConditions(_head, sizable) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        var _hgroup = this is GrrGroup ? ((this as GrrGroup).ParentLabel as GrrRegion).Group.LastOrDefault(gp => (gp as GrrGroup).Index < (this as GrrGroup).Index) : null;
                        if (_hgroup is ALabel)
                            return (_hgroup as ALabel).GetTopObject(_hgroup, sizable);

                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetTopObject(this, sizable);
                        break;
                    case LineType.body:
                        var _body = LocalCommonService.FindLastCondition(Body, line.Index);
                        if (_body != null)
                        {
                            if (_body is IGRRLine _bodyLine)
                            {
                                if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_body is ALabel _bodyLabel)
                                return _bodyLabel.GetTopObject(line, sizable);
                        }

                        var _bgroup = (this is GrrRegion && (this as GrrRegion).Group.Count > 0) ? (this as GrrRegion).Group.Last() : null;
                        if (_bgroup is ALabel)
                            return (_bgroup as ALabel).GetLeftObject(line);

                        var _headBody = LocalCommonService.FindLastCondition(Head);
                        if (_headBody != null)
                        {
                            if (LocalCommonService.FindCellByTopConditions(_headBody, sizable) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        // pokud je to úplně navrchu, pak
                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetTopObject(this, sizable);
                        break;
                    case LineType.foot:
                        var _foot = LocalCommonService.FindLastCondition(Foot, line);
                        if (_foot != null)
                        {
                            if (LocalCommonService.FindCellByTopConditions(_foot, sizable) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        var group = (this is GrrRegion && (this as GrrRegion).Group.Count > 0) ? (this as GrrRegion).Group.FirstOrDefault() : null;
                        if (group == null)
                            group = (this is GrrGroup && ((this as GrrGroup).ParentLabel as GrrRegion).Group.Count > 0) ? ((this as GrrGroup).ParentLabel as GrrRegion).Group.FirstOrDefault(gp => (gp as GrrGroup).Index > (this as GrrGroup).Index) : null;
                        if (group is ALabel)
                            return (group as ALabel).GetTopObject(line, sizable);

                        var _bodyFoot = LocalCommonService.FindLastCondition(Body);
                        if (_bodyFoot != null)
                        {
                            if (_bodyFoot is IGRRLine _bodyLine)
                            {
                                if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bodyFoot is ALabel _bodyLabel)
                                return _bodyLabel.GetTopObject(line, sizable);
                        }

                        var _headFoot = LocalCommonService.FindLastCondition(Head);
                        if (_headFoot != null)
                        {
                            if (LocalCommonService.FindCellByTopConditions(_headFoot, sizable) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }
                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetTopObject(this, sizable);
                        break;
                    default:
                        break;
                }
            }

            if (obj is GrrRegion label)
            {
                // podmínka hledání posledního objektu regionu
                bool lastItem = !Body.Contains(label);
                if (lastItem)
                {
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Foot.FindLast(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FindLastCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetTopObject(label, sizable);
                        }
                    }
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Head.FindLast(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }

                var _body = LocalCommonService.FindLastCondition(Body, Body.IndexOf(label));
                if (_body != null)
                {
                    if (_body is IGRRLine _bodyLine)
                    {
                        if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (_body is ALabel _bodyLabel)
                        return _bodyLabel.GetTopObject(label, sizable);
                }

                // jdeme nahoru
                if (Head.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FindCellByTopConditions(Head.FindLast(ln => !ln.IsComment), sizable) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }

                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetTopObject(this, sizable);
            }
            if (obj is GrrGroup _labelGroup)
            {
                // jdeme nahoru
                if (Head.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FindCellByTopConditions(Head.FindLast(ln => !ln.IsComment), sizable) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }
                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetTopObject(this, sizable);
            }
            return null;
        }

        /// <exclude/>
        public IComponent GetBottomObject() { throw new NotImplementedException(); }
        /// <exclude/>
        public virtual IComponent GetBottomObject(object obj, ISizable sizable)
        {
            if (obj is IGRRLine line)
            {
                // podmínka hledání prvního objektu regionu
                bool firstItem = !Head.Contains(line) && !Body.Contains(line) && !Foot.Contains(line);
                if (firstItem)
                {
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Head.First(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FirstOrDefaultCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetBottomObject(line, sizable);
                        }
                    }
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Foot.FirstOrDefault(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }

                switch (line.Type)
                {
                    case LineType.head:
                        var _head = LocalCommonService.FirstOrDefaultCondition(Head, line);
                        if (_head != null)
                        {
                            if (LocalCommonService.FindCellByTopConditions(_head, sizable) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        var group = (this is GrrRegion && (this as GrrRegion).Group.Count > 0) ? (this as GrrRegion).Group.FirstOrDefault() : null;
                        if (group == null)
                            group = (this is GrrGroup && ((this as GrrGroup).ParentLabel as GrrRegion).Group.Count > 0) ? ((this as GrrGroup).ParentLabel as GrrRegion).Group.FirstOrDefault(gp => (gp as GrrGroup).Index > (this as GrrGroup).Index) : null;
                        if (group is ALabel)
                            return (group as ALabel).GetBottomObject(line, sizable);

                        var _bodyHead = LocalCommonService.FirstOrDefaultCondition(Body);
                        if (_bodyHead != null)
                        {
                            if (_bodyHead is IGRRLine _bodyLine)
                            {
                                if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bodyHead is ALabel _bodyLabel)
                                return _bodyLabel.GetBottomObject(line, sizable);
                        }

                        var _footHead = LocalCommonService.FirstOrDefaultCondition(Foot);
                        if (_footHead != null)
                        {
                            if (LocalCommonService.FindCellByTopConditions(_footHead, sizable) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetBottomObject(this, sizable);
                        break;
                    case LineType.body:
                        var _body = LocalCommonService.FirstOrDefaultCondition(Body, line.Index);
                        if (_body != null)
                        {
                            if (_body is IGRRLine _bodyLine)
                            {
                                if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_body is ALabel _bodyLabel)
                                return _bodyLabel.GetBottomObject(line, sizable);
                        }

                        var _bgroup = (this is GrrRegion && (this as GrrRegion).Group.Count > 0) ? (this as GrrRegion).Group.Last() : null;
                        if (_bgroup is ALabel)
                            return (_bgroup as ALabel).GetBottomObject(line, sizable);

                        var _footBody = LocalCommonService.FirstOrDefaultCondition(Foot);
                        if (_footBody != null)
                        {
                            if (LocalCommonService.FindCellByTopConditions(_footBody, sizable) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        // pokud je to úplně navrchu, pak
                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetBottomObject(this, sizable);
                        break;
                    case LineType.foot:
                        var _foot = LocalCommonService.FirstOrDefaultCondition(Foot, line);
                        if (_foot != null)
                        {
                            if (LocalCommonService.FindCellByTopConditions(_foot, sizable) is GrrCell cell)
                                return cell.Sizable as IComponent;
                        }

                        var _hgroup = this is GrrGroup ? ((this as GrrGroup).ParentLabel as GrrRegion).Group.LastOrDefault(gp => (gp as GrrGroup).Index < (this as GrrGroup).Index) : null;
                        if (_hgroup is ALabel)
                            return (_hgroup as ALabel).GetBottomObject(_hgroup, sizable);

                        if (ParentLabel != null)
                            return (ParentLabel as ALabel).GetBottomObject(this, sizable);
                        break;
                    default:
                        break;
                }
            }

            if (obj is GrrRegion label)
            {
                // podmínka hledání posledního objektu regionu
                bool lastItem = !Body.Contains(label);
                if (lastItem)
                {
                    if (Head.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Head.FirstOrDefault(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (Body.Exists(itm => itm is ILabel || (itm is IGRRLine && !(itm as IGRRLine).IsComment)))
                    {
                        var _bd = LocalCommonService.FirstOrDefaultCondition(Body);
                        if (_bd != null)
                        {
                            if (_bd is IGRRLine _bodyLine)
                            {
                                if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                                    return cell.Sizable as IComponent;
                            }
                            if (_bd is ALabel _bodyLabel)
                                return _bodyLabel.GetBottomObject(label, sizable);
                        }
                    }
                    if (Foot.Exists(ln => !ln.IsComment))
                    {
                        if (LocalCommonService.FindCellByTopConditions(Foot.FirstOrDefault(ln => !ln.IsComment), sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                }

                // dolů
                var _body = LocalCommonService.FirstOrDefaultCondition(Body, Body.IndexOf(label));
                if (_body != null)
                {
                    if (_body is IGRRLine _bodyLine)
                    {
                        if (LocalCommonService.FindCellByTopConditions(_bodyLine, sizable) is GrrCell cell)
                            return cell.Sizable as IComponent;
                    }
                    if (_body is ALabel _bodyLabel)
                        return _bodyLabel.GetBottomObject(label, sizable);
                }

                // jdeme dolů
                if (Foot.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FindCellByTopConditions(Foot.FirstOrDefault(ln => !ln.IsComment), sizable) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }

                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetBottomObject(this, sizable);
            }
            if (obj is GrrGroup _labelGroup)
            {
                // jdeme dolů
                if (Foot.Exists(ln => !ln.IsComment))
                {
                    if (LocalCommonService.FindCellByTopConditions(Foot.FirstOrDefault(ln => !ln.IsComment), sizable) is GrrCell cell)
                        return cell.Sizable as IComponent;
                }
                if (ParentLabel != null)
                    return (ParentLabel as ALabel).GetBottomObject(this, sizable);
            }
            return null;
        }
        #endregion

        #region IDesignSearchHandler
        /// <exclude/>
        public List<IComponent> SearchComponent(Point location)
        {
            throw new NotImplementedException();
        }
        /// <exclude/>
        public List<IComponent> SearchComponentText(TextEditor.Document.ISelection selection)
        {
            List<IComponent> result = new List<IComponent>();
            List<IDesignSearchHandler> designSH = this.Head.Select(obj => obj as IDesignSearchHandler).ToList().FindAll(dsh => dsh != null);
            if (this is IRegion && (this as IRegion).Group.Count != 0)
                designSH.AddRange((this as IRegion).Group.Select(grp => grp as IDesignSearchHandler).ToList());
            else
                designSH.AddRange(this.Body.Select(obj => obj as IDesignSearchHandler).ToList().FindAll(dsh => dsh != null));
            designSH.AddRange(this.Foot.Select(obj => obj as IDesignSearchHandler).ToList().FindAll(dsh => dsh != null));

            foreach (var item in designSH.Distinct().ToList())
                result.AddRange(item.SearchComponentText(selection));

            return result.Distinct().ToList();
        }
        #endregion

        /// <summary>
        /// Indikuje dostupnost operace posun objektu o jeden nahoru
        /// </summary>
        [Browsable(false)]
        public override bool EnableShiftUp
        {
            get
            {
                if (this is IGroup) 
                    return false;
                if (Parent is AbstractLabel)
                    return (Parent as AbstractLabel).Body.FirstOrDefault(obj => (obj is IGRRLine && (obj as IGRRLine).IsVisible) || obj is AbstractLabel) != this;
                return false;
            }
        }
        /// <summary>
        /// Indikuje dostupnost operace posun objektu o jeden dolu
        /// </summary>
        [Browsable(false)]
        public override bool EnableShiftDown
        {
            get
            {
                if (this is IGroup)
                    return false;
                if (Parent is AbstractLabel)
                    return (Parent as AbstractLabel).Body.LastOrDefault(obj => (obj is IGRRLine && (obj as IGRRLine).IsVisible) || obj is AbstractLabel) != this;
                return false;
            }
        }
        /// <summary>
        /// Indikuje dostupnost operace vložení řádku PŘED aktuální objekt
        /// </summary>
        [Browsable(false)]
        public override bool EnableLineBefore { get { return ByLableZone(); } }

        /// <summary>
        /// Indikuje dostupnost operace vložení řádku ZA aktuální objekt
        /// </summary>
        [Browsable(false)]
        public override bool EnableLineAfter { get { return ByLableZone(); } }

        /// <summary>
        /// metoda kreslí pouze vnitřek (řádky) štítku.
        /// samotný štítek se kreslí v přetížení s odkazem na obsah
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">args</param>
        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            // odstraněné objekty nevykreslujeme
            if (graphics == null || Height.IsEmpty)
                return;

            if (ServiceSelection != null)
            {
                // vykreslíme vnitřek sekce HEAD
                // vykreslíme vnitřní NEvybrané komponenty 
                Head.ForEach(tag => ServiceSelection.SelectedComponents.Find(it => it.Equals(tag)) == null, TagService.PaintTag, graphics, args);
                // vykreslíme vnitřek sekce FOOT
                // vykreslíme vnitřní NEvybrané komponenty 
                Foot.ForEach(tag => ServiceSelection.SelectedComponents.Find(it => it.Equals(tag)) == null, TagService.PaintTag, graphics, args);
            }
        }
        /// <summary>
        /// aktualizace šířky štítkové zóny
        /// </summary>
        public override void UpdateLabelZoneSize() { }
        /// <summary>
        /// vazba na proměnné
        /// </summary>
        /// <param name="vars">seznam proměnných</param>
        public override void BindVariables(IListComponent<IVariable> vars) { }
        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <param name="content">určuje, že hledání probíhá v obsahu štítku</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public override object GetTowedObject(PointF point, bool content) { return null; }
        #region ISizeHandler
        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        public override void ChangeLeft(float value = -1) { }

        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        public override void SetHeight() { }
        /// <summary>
        /// nastavení šířky objektů
        /// </summary>
        /// <param name="value">nová šířka</param>
        public override void ChangeWidth(float value) { }
        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        public override void ChangeTop(float value) { }
        #endregion
        #region ILineManipulator
        /// <summary>
        /// vložení nového řádku před daný objekt
        /// </summary>
        /// <param name="obj">daný objekt</param>
        /// <param name="config">indikuje nutnost brat ohled na konfiguraci</param>
        public override void InsertBefore(object obj, bool config = false) { }
        /// <summary>
        /// vložení nového řádku za daný objekt
        /// </summary>
        /// <param name="obj">daný objekt</param>
        /// <param name="config">indikuje nutnost brat ohled na konfiguraci</param>
        public override void InsertAfter(object obj, bool config = false) { }
        /// <summary>
        /// vložení prázdného řádku do hlavičky
        /// </summary>
        /// <param name="type">Typ vkládaného objektu</param>
        /// <param name="lineType">typ nového řádku</param>
        public override void InsertTo(Type type, LineType lineType = LineType.body) { }
        #endregion
        /// <summary>
        /// Známě značky regionu
        /// </summary>
        [Browsable(false)]
        public override List<string> KnownTags { get => null; }

        /// <summary>
        /// odstranění objektu
        /// </summary>
        /// <param name="com">objekt k odstranní</param>
        public override void Remove(object com) { LocalCommonService.Remove(this, com); }

        /// <summary>
        /// uložení obsahu řádku do <paramref name="xmlElement"/>
        /// </summary>
        /// <param name="xmlElement">daný XML element, do kterého se vkládá obsah</param>
        /// <param name="xmlDoc">výsledný dokument</param>
        /// <param name="styles">seznam již dostupných stylů</param>
        /// <param name="withRect"></param>
        public override void SetXmlData(System.Xml.XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, bool withRect = true) { }

        /// <summary>
        /// Indikuje stav, kdy štítek je aktivní
        /// </summary>
        [Browsable(false)]
        public override bool IsActive { get { return TowedService.TowedObject == this; } }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public ALabel()
            : base()
        {
            Interactive = new AInteractive();
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="tag">větev štítku sestavy</param>
        public ALabel(GFEFormatTag tag)
            : base(tag)
        {
            Interactive = new AInteractive();
        }

        /// <summary>
        /// změna obsahu seznamu
        /// </summary>
        protected void ListChanged(object sender, EventArgs e)
        {
            GrrRegion region = LocalCommonService.GetRootRegion(this);
            if (region != null)
                if (region.Parent is GrrLabelZone)
                {
                    (region.Parent as GrrLabelZone).SetHeight();
                    (region.Parent as GrrLabelZone).SetTop();
                }
        }
        /// <summary>
        /// načtení patičky
        /// </summary>
        /// <param name="item">objekt patičky</param>
        protected void LoadFoot(GFEFormatTag item)
        {
            if (item is GFEFormatGRRLine || item is GFEFormatComment
                // případ GrfGrid objektu
                || item is GFEFormatGRFBlock)
            {
                var gl = new GrrLine();
                gl.Initialize(item, this);

                Foot.Add(gl.LoadInformation(Page, LineType.foot));
            }
        }
        /// <summary>
        /// načtení hlavičky
        /// </summary>
        /// <param name="item">objekt hlavičky</param>
        protected void LoadHead(GFEFormatTag item)
        {
            if (item is GFEFormatGRRLine || item is GFEFormatComment
                // případ GrfGrid objektu
                || item is GFEFormatGRFBlock)
            {
                var gl = new GrrLine();
                gl.Initialize(item, this);

                Head.Add(gl.LoadInformation(Page, LineType.head));
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="item"></param>
        /// <param name="vars"></param>
        protected void BindVariableInLine(IGRRLine item, params object[] vars)
        {
            item.ForEach(cm => cm is GrrCell && (cm as GrrCell).FirstOrNull(obj => obj is GrrContentValue) != null, BindVariable, vars);
        }

        void BindVariable(ICell obj, params object[] vars)
        {
            if (obj is GrrCell)
            {
                object list = vars.FirstOrNull(v => v is UndoRedoList<IVariable>);
                if (list != null)
                    foreach (var item in (obj as GrrCell))
                        if (item is GrrContentValue)
                        {
                            object node = (list as UndoRedoList<IVariable>).FirstOrNull(v => (v as IVariable).Name.Equals((item as GrrContentValue).DataName));
                            if (node != null)
                                (item as GrrContentValue).Variable = node as VariableNode;
                        }
            }
        }
        bool ByLableZone()
        {
            if (this is IGroup)
                return false;

            if (Parent is AbstractLabel aL)
            {
                if (aL.Parent is AbstractLabel)
                    return true;
                else
                {
                    if (!(aL.Parent is GrrLabelZone lZ))
                        return false;
                    else return !(lZ.LObject is IPage);
                }
            }
            return false;
        }
    }

    /// <summary>
    /// Objekt Interaktivity
    /// </summary>
    public class AInteractive : IInteractive
    {
        readonly UndoRedo<bool> isinteractive = new UndoRedo<bool>();
        /// <exclude/>
        public bool IsInteractive
        {
            get
            {
                return isinteractive.Value;
            }
            set
            {
                isinteractive.Value = value;
            }
        }
        readonly UndoRedo<string> title = new UndoRedo<string>();
        /// <exclude/>
        public string Title
        {
            get
            {
                return title.Value;
            }
            set
            {
                title.Value = value;
            }
        }
    }
}
