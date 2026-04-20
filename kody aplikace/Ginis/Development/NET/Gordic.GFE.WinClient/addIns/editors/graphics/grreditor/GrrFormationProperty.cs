//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GrrFormationProperties.cs              </Name>
//    <Description> Vlastnosti sestavy dokumentu                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.General;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Vlastnosti sestavy dokumentu
    /// </summary>
    class GrrFormationProperty : AbstractFormationProperty
    {
        /// <summary>
        /// načtení hlavního regionu
        /// </summary>
        /// <param name="reg">hlavní region sestavy</param>
        public override void LoadRegion(GFEFormatRegion reg) { (document.Pages[0] as GrrPage).LoadRegions(reg); }

        /// <summary>
        /// Inicializace dokumentu
        /// </summary>
        /// <param name="xmlFormat">formát</param>
        /// <param name="unit">kompilační jednotka dokumentu</param>
        public override void SetData(ref XmlElement xmlFormat, ICompilationUnit unit)
        {
            dynamic structureViewEntry = (unit as CompilationUnit).StructureViewEntry;
            // zásobník aktuálních stylů. 
            // používá se při ukládáni sestavy.
            List<GFEList> xmlStyles = new List<GFEList>();

            string rootRegionName = structureViewEntry != null ? structureViewEntry.GetStructureRootRegionName() : string.Empty;

            if (string.IsNullOrEmpty(rootRegionName))
                MessageService.ShowErrorFormatted("{0}\n{1}\n{2}", GResources.GetResourceText(29450005) //RC 29450005 : Chybí kořenový region sestavy.
                    , GResources.GetResourceText(29450006)  //RC 29450006 : Nejspíše chybí odpovídající datová struktura.
                    , GResources.GetResourceText(29450007)); //RC 29450007 : Sestava nemusí být generovaná správně.

            // generátor XML alf formátu vnitřku stránky
            if (document.Pages.First() is GrrPage page)
                page.SetAlfData(xmlFormat, xmlStyles);
        }
    }
}
