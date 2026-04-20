//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Lists.cs                                 </Name>
//    <Description> seznamy                                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-23                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// seznam řádku, který si pamatuje předchozí modifikace
    /// </summary>
    [ComVisible(false)]
    public class LineList : UndoRedoList<IGRRLine>, ISizeHandler, IParentable
    {
        #region IParentable
        /// <summary>
        /// vlastník seznamu
        /// </summary>
        public ISizable Parent { get; set; }
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;
        #endregion

        #region ISizeHandler
        /// <summary>
        /// šířka obsahu
        /// </summary>
        public float ContentWidth { get => Parent is ISizeHandler ? (Parent as ISizeHandler).ContentWidth : 0; }
        /// <summary>
        /// pozice LEFT obsahu
        /// </summary>
        public float ContentLeft { get => Parent is ISizeHandler ? (Parent as ISizeHandler).ContentLeft : 0; }

        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        public void ChangeLeft(float value = -1)
        {
            lock (syncRoot)
            {
                foreach (var item in this)
                    item.ChangeLeft(value);
            }
        }

        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        public void SetHeight()
        {
            lock (syncRoot)
            {
                float height = 0;

                foreach (var item in this)
                {
                    item.SetHeight();
                    height += item.Height;
                }
                Height = height;
            }
        }

        /// <summary>
        /// nastavení šířky objektů
        /// </summary>
        /// <param name="value">nová šířka</param>
        public void ChangeWidth(float value)
        {
            lock (syncRoot)
            {
                Width = value;
                foreach (var item in this)
                    if (item is ISizeHandler)
                        (item as ISizeHandler).ChangeWidth(value);
            }
        }

        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        public void ChangeTop(float value)
        {
            Top = value;
            lock (syncRoot)
            {
                float top = value;

                foreach (var item in this)
                {
                    item.ChangeTop(top);
                    top += item.Height;
                }
            }
        }
        #endregion

        readonly UndoRedo<float> height = new UndoRedo<float>();
        /// <summary>
        /// výška objektu
        /// </summary>
        public float Height { get { return height.Value; } protected set { height.Value = value; } }

        readonly UndoRedo<float> width = new UndoRedo<float>();
        /// <summary>
        /// výška objektu
        /// </summary>
        public float Width { get => width.Value; protected set => width.Value = value; }

        readonly UndoRedo<float> top = new UndoRedo<float>();
        /// <summary>
        /// výška objektu
        /// </summary>
        public float Top { get => top.Value; protected set => top.Value = value; }

        readonly object syncRoot = new object();

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="sizable">vlastník seznamu</param>
        /// <param name="manager">služba UNDO/REDO</param>
        public LineList(ISizable sizable, IUndoRedoManager manager)
            : base(manager)
        {
            // TODO: Complete member initialization
            Parent = sizable;
            Width = 0;
        }

        /// <summary>
        /// Vytvoření nového řádku před daným
        /// </summary>
        /// <param name="newLine">vkládaný řádek</param>
        /// <param name="line">řádek, před který se vkládá</param>
        /// <param name="config">nutnost brat v úvahu konfigurační nastavení</param>
        /// <returns>TRUE - úspěšné vložení řáku, jinak FALSE</returns>
        public bool InsertBefore(IGRRLine newLine, dynamic line, bool config = false)
        {
            int index = !(line is IGRRLine) ? -1 : (line as IGRRLine).Index;
            try
            {
                if (index == -1)
                    Add(newLine);
                else
                    Insert(index, newLine);
            }
            catch (Exception ex)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450092) + '\n' + "{0}", ex.Message); //RC 29450092 : Chyba vytvoření nového řádku PŘED daným
                return false;
            }

            return true;
        }
        /// <summary>
        /// Vložení řádku za daný
        /// </summary>
        /// <param name="newLine">vkládaný řádek</param>
        /// <param name="line">daný řádek</param>
        /// <param name="config">nutnost brat v úvahu konfigurační nastavení</param>
        /// <returns>TRUE - vložení proběhlo úspěšně, jinak FALSE</returns>
        public bool InsertAfter(IGRRLine newLine, dynamic line, bool config = false)
        {
            int index = !(line is IGRRLine) ? Count - 1 : (line as IGRRLine).Index;
            try
            {
                if (index == Count - 1)
                    Add(newLine);
                else
                    Insert(index + 1, newLine);
            }
            catch (Exception ex)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450093) + '\n' + "{0}", ex.Message); //RC 29450093 : Chyba vytvoření nového řádku ZA daným
                return false;
            }

            return true;
        }

        /// <summary>
        /// uložení seznamu do xmlstromu
        /// </summary>
        /// <param name="xmlElement">element, do kterého probíhá ukládání</param>
        /// <param name="xmlDoc">dokument, který je výsledkém uložení</param>
        /// <param name="qualifiedName">název větve daného seznamu</param>
        /// <param name="styles">seznam již uložených stylů</param>
        public void SetData(XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, string qualifiedName = null)
        {
            if (Count != 0)
            {
                XmlElement xmlNode = string.IsNullOrEmpty(qualifiedName)
                    ? xmlElement
                    : xmlElement.AppendChild(xmlDoc.CreateElement(qualifiedName, xmlElement.NamespaceURI)) as XmlElement;

                foreach (var _line in this)
                    _line.SetData(xmlNode, xmlDoc, styles, string.IsNullOrEmpty(qualifiedName) ? "columns" : "line");
            }
        }
        /// <summary>
        /// odstranění uvedeného řádku ze seznamu
        /// </summary>
        /// <param name="line">uvedený řádek</param>
        public void Delete(ILine line)
        {
            if (line != null && this.Contains(line))
            {
                this.Remove(line as IGRRLine);
                line.Parent = null;
            }
        }
    }

    /// <summary>
    /// seznam objektů v sekci BODY štítku
    /// </summary>
    [ComVisible(false)]
    public class BodyList : UndoRedoList<object>, IParentable, ISizeHandler
    {
        #region IParentable
        /// <summary>
        /// vlastník seznamu
        /// </summary>
        public ISizable Parent { get; set; }
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;
        #endregion

        #region ISizeHandler
        /// <summary>
        /// šířka obsahu
        /// </summary>
        public float ContentWidth { get { return Parent is ISizeHandler ? (Parent as ISizeHandler).ContentWidth : 0; } }
        /// <summary>
        /// pozice LEFT obsahu
        /// </summary>
        public float ContentLeft { get { return Parent is ISizeHandler ? (Parent as ISizeHandler).ContentLeft : 0; } }

        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        public void ChangeLeft(float value = -1) { lock (syncRoot) ForEach(ChangeLeft); }

        void ChangeLeft(object obj) { if (obj is IGRRLabel) (obj as IGRRLabel).ChangeLeft(); }

        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        public void SetHeight()
        {
            lock (syncRoot)
            {
                float height = 0;
                foreach (var item in this)
                    if (item is ISizeHandler)
                    {
                        (item as ISizeHandler).SetHeight();
                        if (item is ISizable)
                            height += (item as ISizable).Height;
                    }
                Height = height;
            }
        }

        /// <summary>
        /// nastavení šířky objektů
        /// </summary>
        /// <param name="value">nová šířka</param>
        public void ChangeWidth(float value)
        {
            lock (syncRoot)
            {
                foreach (var item in this)
                    if (item is ISizeHandler)
                        (item as ISizeHandler).ChangeWidth(value);
            }
        }

        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        public void ChangeTop(float value)
        {
            Top = value;
            lock (syncRoot)
            {
                float top = value;
                foreach (var item in this)
                    if (item is ISizeHandler)
                    {
                        (item as ISizeHandler).ChangeTop(top);
                        if (item is ISizable)
                            top += (item as ISizable).Height;
                    }
            }
        }
        #endregion

        readonly UndoRedo<float> height = new UndoRedo<float>();
        /// <summary>
        /// výška objektu
        /// </summary>
        public float Height { get { return height.Value; } protected set { height.Value = value; } }

        readonly UndoRedo<float> top = new UndoRedo<float>();
        /// <summary>
        /// výška objektu
        /// </summary>
        public float Top { get { return top.Value; } protected set { top.Value = value; } }

        readonly object syncRoot = new object();

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="abstractLabel">vlastník seznamu</param>
        /// <param name="manager">služba UNDO/REDO</param>
        public BodyList(AbstractLabel abstractLabel, IUndoRedoManager manager)
            : base(manager)
        {
            // TODO: Complete member initialization
            Parent = abstractLabel;
        }

        /// <summary>
        /// Vytvoření nového řádku před daným
        /// </summary>
        /// <param name="newLine">vkládaný objekt</param>
        /// <param name="obj">objekt, před který se vkládá</param>
        /// <param name="config">nutnost brat v úvahu konfigurační nastavení</param>
        /// <returns>TRUE - úspěšné vložení řáku, jinak FALSE</returns>
        public bool InsertBefore(dynamic newLine, object obj, object config)
        {
            int index = obj == null ? -1 : IndexOf(obj);
            try
            {
                if (newLine is IGRRLabel)
                    (newLine as IGRRLabel).LoadInformation(obj, config);

                if (index == -1)
                    Add(newLine as object);
                else
                    Insert(index, newLine as object);

                if (newLine is AbstractLabel)
                    SetHeight();
            }
            catch (Exception ex)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450092) + '\n' + "{0}", ex.Message); //RC 29450092 : Chyba vytvoření nového řádku PŘED daným
                return false;
            }

            return true;
        }
        /// <summary>
        /// Vložení řádku za daný
        /// </summary>
        /// <param name="newLine">vkládaný objekt</param>
        /// <param name="obj">objekt, za který se vkládá</param>
        /// <param name="config">indikuje nutnost brat v úvahu i konfiguraci</param>
        /// <returns>TRUE - vložení proběhlo úspěšně, jinak FALSE</returns>
        public bool InsertAfter(dynamic newLine, object obj, object config = null)
        {
            int index = obj == null ? Count - 1 : IndexOf(obj);
            try
            {
                if (newLine is IGRRLabel)
                    (newLine as IGRRLabel).LoadInformation(obj, config);

                if (index == Count - 1
                    || Count == 0)
                    Add(newLine);
                else
                    Insert(index + 1, newLine);

                if (newLine is AbstractLabel)
                    SetHeight();
            }
            catch (Exception ex)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450093) + '\n' + "{0}", ex.Message); //RC 29450093 : Chyba vytvoření nového řádku ZA daným
                return false;
            }

            return true;
        }

        /// <summary>
        /// uložení seznamu do xmlstromu
        /// </summary>
        /// <param name="xmlElement">element, do kterého probíhá ukládání</param>
        /// <param name="xmlDoc">dokument, který je výsledkém uložení</param>
        /// <param name="qualifiedName">název větve daného seznamu</param>
        /// <param name="styles">seznam již uložených stylů</param>
        public void SetData(XmlElement xmlElement, XmlDocumentPosition xmlDoc, List<GFEList> styles, string qualifiedName = null)
        {
            if (Count != 0)
            {
                XmlElement xmlNode = string.IsNullOrEmpty(qualifiedName)
                    ? xmlElement
                    : xmlElement.AppendChild(xmlDoc.CreateElement(qualifiedName, xmlElement.NamespaceURI)) as XmlElement;
                foreach (var item in this)
                    if (item is IGRRLine)
                        (item as IGRRLine).SetData(xmlNode, xmlDoc, styles);
                    else if (item is IGRRLabel)
                        (item as IGRRLabel).SetXmlData(xmlNode, xmlDoc, styles);
            }
        }

        /// <summary>
        /// odstranění uvedeného objektu ze seznamu
        /// </summary>
        /// <param name="comp">uvedený objekt</param>
        public void Delete(object comp)
        {
            if (comp != null && this.Contains(comp))
            {
                if (comp is IGRRLabel)
                {
                    (comp as IGRRLabel).Head.Clear();
                    if (!(comp is IGroup))
                        (comp as IGRRLabel).Body.Clear();
                    (comp as IGRRLabel).Foot.Clear();
                }

                this.Remove(comp);

                if (comp is IParentable)
                    (comp as IParentable).Parent = null;
            }
        }
    }

    /// <summary>
    /// seznam řádku, který si pamatuje předchozí modifikace
    /// </summary>
    [ComVisible(false)]
    public class GroupList : UndoRedoList<AbstractLabel>, ISizeHandler, IParentable
    {
        #region ISizeHandler
        /// <summary>
        /// šířka obsahu
        /// </summary>
        public float ContentWidth { get { return Parent is ISizeHandler ? (Parent as ISizeHandler).ContentWidth : 0; } }
        /// <summary>
        /// pozice LEFT obsahu
        /// </summary>
        public float ContentLeft { get { return Parent is ISizeHandler ? (Parent as ISizeHandler).ContentLeft : 0; } }

        /// <summary>
        /// Změna pozice zleva objektu
        /// </summary>
        /// <param name="value">Nová pozice zleva</param>
        public void ChangeLeft(float value = -1)
        {
            for (int index = 0; index < this.Count; index++)
                this[index].ChangeLeft(value);
        }
        /// <summary>
        /// Změna výšky vybraných objektů
        /// </summary>
        public void SetHeight()
        {
            for (int index = this.Count - 1; index >= 0; index--)
                this[index].SetHeight();
        }
        /// <summary>
        /// nastavení šířky objektů
        /// </summary>
        /// <param name="value">nová šířka</param>
        public void ChangeWidth(float value)
        {
            foreach (var item in this)
                item.ChangeWidth(value);
        }
        /// <summary>
        /// nastavení TOP pozice objektů
        /// </summary>
        /// <param name="value">nová pozice</param>
        public void ChangeTop(float value)
        {
            foreach (var item in this)
                item.ChangeTop(value);
        }
        #endregion

        #region IParentable
        /// <summary>
        /// vlastník seznamu
        /// </summary>
        public ISizable Parent { get; set; }
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        public bool ReadOnly => false;
        #endregion

        /// <summary>
        /// kreslení objektů seznamu skupin
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        /// <param name="args">Upřesnení co a jak vykreslovat</param>
        public void OnPaint(Graphics graphics, PaintArgs args)
        {
            foreach (var item in this)
                item.OnPaint(graphics, args);
        }

        /// <summary>
        /// kreslení objektů seznamu skupin
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        public void PaintLabel(Graphics graphics)
        {
            foreach (var item in this)
                item.PaintLabel(graphics);
        }

        /// <summary>
        /// aktualizace štítkové zóny
        /// </summary>
        /// <param name="step">krok mezí štítky</param>
        public void UpdateLabelZoneSize(float step)
        {
            width = 0;
            for (int index = this.Count - 1; index >= 0; index--)
            {
                this[index].UpdateLabelZoneSize();
                width += this[index].Width + step;
            }
        }

        float width;
        /// <summary>
        /// šířka skupiny
        /// </summary>
        public float Width { get { return width; } set { width = value; } }

        /// <summary>
        /// výška první skupiny
        /// </summary>
        public float Height
        {
            get
            {
                AbstractLabel label = this.FirstOrNull(lbl => lbl != null);
                return label == null ? 0 : label.Height;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="parent">vlastník třídy</param>
        /// <param name="manager">správce UNDO/REDO operace</param>
        public GroupList(AbstractLabel parent, IUndoRedoManager manager)
            : base(manager)
        {
            // TODO: Complete member initialization
            Parent = parent;
        }

        /// <summary>
        /// Vložení řádku za daný
        /// </summary>
        /// <param name="type">Typ vytvářeného řádku</param>
        /// <param name="obj">objekt, za který se vkládá</param>
        /// <returns>TRUE - vložení proběhlo úspěšně, jinak FALSE</returns>
        public bool InsertAfter(Type type, AbstractLabel obj = null)
        {
            int index = obj == null ? -1 : IndexOf(obj);
            try
            {
                AbstractLabel newObject = Activator.CreateInstance(type) as AbstractLabel;
                newObject.Initialize(obj != null ? obj.LabledObject : (Parent as AbstractLabel).LabledObject);

                if (index == Count - 1)
                    Add(newObject);
                else
                    Insert(index + 1, newObject);

                if (Parent is AbstractLabel)
                    (Parent as AbstractLabel).Body.ForEach(cm => cm is AbstractLabel, ChangeParent, newObject);
            }
            catch (Exception ex)
            {
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450093) + '\n' + "{0}", ex.Message); //RC 29450093 : Chyba vytvoření nového řádku ZA daným
                return false;
            }

            return true;
        }

        void ChangeParent(object bodyObject, params object[] obj)
        {
            if (obj == null || obj.Length == 0 || !(obj[0] is ISizable) || !(bodyObject is IParentable))
                return;

            (bodyObject as IParentable).Parent = obj[0] as ISizable;
        }

        /// <summary>
        /// odstranění uvedeného objektu ze seznamu
        /// </summary>
        /// <param name="comp">uvedený objekt</param>
        public void Delete(AbstractLabel comp)
        {
            if (comp != null && this.Contains(comp))
            {
                comp.Head.Clear();
                comp.Foot.Clear();

                this.Remove(comp);

                if (comp is IParentable)
                    (comp as IParentable).Parent = null;
            }
        }
    }

    /// <summary>
    /// UNDO/REDO seznam barev
    /// </summary>
    [ComVisible(false)]
    public class ChartColorPalette : UndoRedoList<IComplexColor>
    {
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="manager">správce UNDO/REDO operace</param>
        public ChartColorPalette(IUndoRedoManager manager)
            : base(manager)
        {
        }
    }

    /// <summary>
    /// UNDO/REDO seznam vrstv objektu CHART
    /// </summary>
    [ComVisible(false)]
    public class ChartLayers : UndoRedoList<IChartLayer>
    {
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="manager">správce UNDO/REDO operace</param>
        public ChartLayers(IUndoRedoManager manager)
            : base(manager)
        {
        }
    }

    /// <summary>
    /// UNDO/REDO seznam množiny dat vrstvy objektu CHART
    /// </summary>
    [ComVisible(false)]
    public class ChartLayersDataSets : UndoRedoList<IChartDataSet>
    {
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="manager">správce UNDO/REDO operace</param>
        public ChartLayersDataSets(IUndoRedoManager manager)
            : base(manager)
        {
        }
    }

    /// <summary>
    /// UNDO/REDO seznam dat objektu CHART
    /// </summary>
    [ComVisible(false)]
    public class ChartData : UndoRedoList<IXMLContent>
    {
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="manager">správce UNDO/REDO operace</param>
        public ChartData(IUndoRedoManager manager)
            : base(manager)
        {
        }
    }

}
