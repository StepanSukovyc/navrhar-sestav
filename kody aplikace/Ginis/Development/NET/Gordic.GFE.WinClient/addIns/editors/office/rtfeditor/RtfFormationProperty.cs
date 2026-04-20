//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FormationProperties.cs                 </Name>
//    <Description> Vlastnosti sestavy dokumentu                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;
using System.Xml;
using Gordic.GFE.Parsers.Editor;
using System.Runtime.InteropServices;
using Gordic.Documents.Rtf;

namespace Gordic.GFE.WinClient.Editor
{
    class ListRtfContent : IList<RtfContent>
    {
        readonly List<RtfContent> list = new List<RtfContent>();
        /// <exclude/>
        public int IndexOf(RtfContent item) => list.IndexOf(item);

        /// <exclude/>
        public void Insert(int index, RtfContent item)
        {
            list.Insert(index, item);
        }

        /// <exclude/>
        public void RemoveAt(int index)
        {
            if (list.Count > index)
                Release(list[index]);
            list.RemoveAt(index);
        }

        /// <exclude/>
        public RtfContent this[int index]
        {
            get { return list[index]; }
            set { list[index] = value; }
        }

        /// <exclude/>
        public void Add(RtfContent item) { list.Add(item); }

        /// <exclude/>
        public void Clear()
        {
            list.ForEach(Release);
            list.Clear();
        }

        /// <exclude/>
        public bool Contains(RtfContent item) => list.Contains(item);

        /// <exclude/>
        public void CopyTo(RtfContent[] array, int arrayIndex) { list.CopyTo(array, arrayIndex); }

        /// <exclude/>
        public int Count { get => list.Count; }

        /// <exclude/>
        public bool IsReadOnly { get => false; }

        /// <exclude/>
        public bool Remove(RtfContent item)
        {
            if (list.Contains(item))
                Release(item);
            return list.Remove(item);
        }

        /// <exclude/>
        public IEnumerator<RtfContent> GetEnumerator() { return list.GetEnumerator(); }

        /// <exclude/>
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => list.GetEnumerator();

        void Release(RtfContent rtfContent)
        {
            try
            {
                if (rtfContent != null && rtfContent.COMObject != null)
                    Marshal.ReleaseComObject(rtfContent.COMObject);
            }
            catch { }
            finally { rtfContent.COMObject = null; }
        }
    }

    /// <summary>
    /// Vlastnosti sestavy dokumentu
    /// </summary>
    class RtfFormationProperty : AbstractFormationProperty
    {
        #region IFormationDocumentProperty
        /// <summary>
        /// načtení hlavního regionu
        /// </summary>
        /// <param name="reg">hlavní region sestavy</param>
        public override void LoadRegion(GFEFormatRegion reg)
        {
            if (counter == 0)
                RefreshLists();

            if (reg != null)
            {
                LoadTagItem(reg);

                counter++;
                ThreadService.SafeThreadAsyncCall(delegate
                {
                    if (reg.Head.Count != 0)
                        reg.Head.ForEach(LoadSection);
                    counter--;
                });
                counter++;
                ThreadService.SafeThreadAsyncCall(delegate
                {
                    if (reg.Body.Count != 0)
                        reg.Body.ForEach(LoadSection);
                    counter--;
                });
                counter++;
                ThreadService.SafeThreadAsyncCall(delegate
                {
                    if (reg.Foot.Count != 0)
                        reg.Foot.ForEach(LoadSection);
                    counter--;
                });
            }
        }

        void LoadSection(GFEFormatTag item)
        {
            if (item is GFEFormatRTFRow)
            {
                LoadTagItem(item);

                if (item.Children.Count != 0)
                {
                    counter++;
                    ThreadService.SafeThreadAsyncCall(delegate { item.Children.ForEach(LoadItem); counter--; });
                }
            }
            else if (item is GFEFormatRTFItem)
                LoadTagItem(item);
            else if (item is GFEFormatRegion)
                LoadRegion(item as GFEFormatRegion);
        }
        void LoadTagItem(GFEFormatTag item)
        {
            if (item == null)
                return;

            RtfContent lst = new RtfContent();
            if (item is GFEFormatRegion)
                lst.MacroButtonType = GRTFField.GMBType.body;

            try
            {
                if (item.Attributes.ContainsKey("name"))
                {
                    lst.Name = item.Attributes["name"];
                    lst.ScriptName = item.Attributes["name"];
                }
                if (item is GFEFormatContentBarcode)
                {
                    if (item.Children.Count > 0 && item.Children[0].Attributes.ContainsKey("name"))
                    {
                        lst.Name = item.Children[0].Attributes["name"];
                        lst.ScriptName = item.Children[0].Attributes["name"];
                    }
                    lst.TypeRaw = item.Attributes["type"];
                    lst.ItemType = CommonService.OfficeItemTypes["1"];

                    if (item.Attributes.ContainsKey("instance"))
                        lst.Instance = item.Attributes["instance"];

                    if (item.Attributes.ContainsKey("image-height"))
                        lst.ImageHeight = item.Attributes["image-height"];
                    if (item.Attributes.ContainsKey("image-width"))
                        lst.ImageWidth = item.Attributes["image-width"];
                }

                lst.AttrList = new GFEAttrList(UndoRedoService.Manager);
                lst.AttrList.AddRange(item.Attributes.FindAllByKey(itm => !itm.Equals("name") && !itm.Equals("type") && !itm.Equals("rtf") && !itm.Equals("instance") && !itm.Equals("guid") && (!itm.StartsWith("on") || itm.Equals("only-if"))));

                // pamatujeme si instanci, pokud je TEXT
                if (item.Attributes.ContainsKey("instance") && "TEXT".Equals(item.Attributes["instance"], StringComparison.InvariantCultureIgnoreCase))
                    lst.Instance = item.Attributes["instance"];

                lst.AttrList.SynchronizeByOrigin();
                // uložíme skripty
                Dictionary<string, string> scripts = item.Attributes.FindAllByKey(key =>
                    key.StartsWith("on", StringComparison.InvariantCulture)
                    && key.Length > 2
                    && char.IsUpper(key[2]));
                lst.Scripts.AddRange(scripts);
                lst.Scripts.SynchronizeByOrigin();
                if (item.Attributes.ContainsKey("format"))
                    lst.Format = item.Attributes["format"];

                Guid guid = Guid.Empty;
                if (item.Attributes.ContainsKey("guid"))
                    if (Guid.TryParse(item.Attributes["guid"], out guid))
                        lst.Guid = guid;

                // položka nemá jednoznačný identifikátor
                //if (guid != Guid.Empty)
                if (!string.IsNullOrEmpty(lst.Name) || (lst.AttrList != null && lst.AttrList.Count > 0))
                    lock (syncRoot)
                    {
                        if (guid != Guid.Empty)
                        {
                            if (!guids.Contains(lst.Guid))
                            {
                                guids.Add(lst.Guid);
                                fieldsList.Add(lst);
                            }
                            else
                                fieldsList[guids.IndexOf(lst.Guid)] = lst;
                        }
                        else if (guid == Guid.Empty)
                            fieldsList.Add(lst);
                    }
            }
            catch { LoggingService.Error(Gordic.General.GResources.GetResourceText(29450145)); } //RC 29450145 : nepodařilo se přečíst formát RTF objektu!
        }
        void LoadItem(GFEFormatTag children)
        {
            if (children != null)
                LoadTagItem(children);//as GFEFormatRTFItem
        }

        /// <summary>
        /// Inicializace dokumentu
        /// </summary>
        /// <param name="xmlFormat">formát</param>
        /// <param name="unit">kompilační jednotka dokumentu</param>
        public override void SetData(ref XmlElement xmlFormat, ICompilationUnit unit) { }
        #endregion

        readonly object syncRoot = new object();
        ListRtfContent fieldsList;
        /// <summary>
        /// polička dokumentu
        /// </summary>
        public new ListRtfContent FieldsList => fieldsList;

        List<Guid> guids;
        /// <summary>
        /// Jednoznační identifikátory
        /// </summary>
        public List<Guid> Guids => guids;

        /// <summary>
        /// aktualizace seznamů
        /// </summary>
        internal void RefreshLists()
        {
            fieldsList = new ListRtfContent();
            guids = new List<Guid>();
        }
    }
}
