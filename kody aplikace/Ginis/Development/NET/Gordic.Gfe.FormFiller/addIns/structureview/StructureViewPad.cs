//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.StructureViewPad.cs                   </Name>
//    <Description> Rozhraní obsahů používajícíc strukturu                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;

namespace Gordic.Gfe.FormFiller.StructureView
{
    /// <summary>
    /// Rozhraní obsahů používajícíc strukturu
    /// </summary>
    interface IStructureHost
    {
        /// <summary>
        /// Jednotka struktury
        /// </summary>
        StructureViewEntry StructureViewEntry { get; }
    }

    class StructureViewPad
    {
        static StructureViewPad instance;
        /// <summary>
        /// Instance třídy
        /// </summary>
        public static StructureViewPad Instance
        {
            get
            {
                if (instance == null)
                    instance = new StructureViewPad();
                return instance;
            }
        }

        List<StructureViewEntry> entries = new List<StructureViewEntry>();
        /// <summary>
        /// Seznam načtených struktur
        /// </summary>
        public List<StructureViewEntry> Entries { get { return entries; } }

        /// <summary>
        /// Přidání položky dp zobrazení zpráv.
        /// </summary>
        /// <param name="entry">Přidávaná struktura</param>
        public void AddItem(StructureViewEntry entry)
        {
            if (entry != null)
                entries.Add(entry);
        }
    }
}
