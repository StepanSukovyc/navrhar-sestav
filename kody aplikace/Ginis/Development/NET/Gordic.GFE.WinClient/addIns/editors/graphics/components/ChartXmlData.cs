//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ChartXmlData.cs                        </Name>
//    <Description> objekt prezentující položku XML data                        </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-10-24                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.UndoRedoFramework;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// objekt prezentující položku XML data
    /// </summary>
    class ChartXmlData: IXMLContent
    {
        #region IXMLContent
        readonly UndoRedo<string> innerText = new UndoRedo<string>();
        /// <summary>
        /// obsah ve formátu XML
        /// </summary>
        public string InnerText { get { return innerText.Value; } set { innerText.Value = value; } }
        #endregion

        /// <summary>
        /// název datové větve
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="item"></param>
        public ChartXmlData(Parsers.Core.GFEFormatTag item)
        {
            if (item != null)
                InnerText = item.GetOuterXml();

            Name = item.TagName;
        }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public ChartXmlData() { }

        /// <exclude/>
        public override string ToString()
        {
            return string.IsNullOrEmpty(Name) ? GResources.GetResourceText(29451441) : Name;
        }
    }
}
