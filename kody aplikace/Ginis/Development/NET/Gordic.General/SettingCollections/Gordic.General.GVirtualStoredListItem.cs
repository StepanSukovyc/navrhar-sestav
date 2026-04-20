//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GVirtualIDProvider.cs                        </Name>
//    <Description> Trida pro nacteni kontextoveho nastaveni bez kotextu (velmi specificke pouziti!)</Description>
//    <Author>      Tomáš Skála                                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2014-02-25                                                  </Created>
//  </FileHeader>

using System;
using System.Xml.Linq;

namespace Gordic.General {
    /// <summary> Trida pro nacteni kontextoveho nastaveni bez kontextu (velmi specificke pouziti!)
    /// </summary>
    public class GVirtualStoredListItem: GVirtualStoredObject, IGIDProvider, IGObject {
        #region Vlastnosti

        /// <summary> identifikator polozek
        /// </summary>
        public string ID { 
            get { return (string)Xml.Attribute("id"); } 
        } // end method

        #endregion 

        #region Konstruktory 

        /// <summary>Konstruktor</summary>
        /// <param name="xmlRoot">kontextovy XElement, ktery bude pouzit jako uloziste hodnot</param>
        /// <param name="onDataChanged">delegat, ktery je volan pri zmene hodnot v ulozisti</param>
        public GVirtualStoredListItem(XElement xmlRoot, Action onDataChanged = null): base(xmlRoot, onDataChanged) {
        } // end constructor

        /// <summary>Konstruktor
        /// </summary>
        public GVirtualStoredListItem(): base() {
        } // end constructor

        #endregion

        #region Verejne metody 

        /// <summary></summary>
        /// <returns></returns>
        public override string ToString() {
            return ID;
        } // end method 

        #endregion
    } // end class
} // end namespace
