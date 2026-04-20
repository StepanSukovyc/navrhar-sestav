//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GVirtualStoredObject.cs                      </Name>
//    <Description> Trida pro nacteni kontextoveho nastaveni bez kontextu (velmi specificke pouziti!)</Description>
//    <Author>      Tomáš Skála                                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2014-02-27                                                  </Created>
//  </FileHeader>

using System;
using System.Xml.Linq;

namespace Gordic.General {
    /// <summary> Trida pro nacteni kontextoveho nastaveni bez kontextu (velmi specificke pouziti!)
    /// </summary>
    public class GVirtualStoredObject: GSettingStorage, IGSettingAcceptor, IGObject {
        #region Vlastnosti

        #endregion 

        #region Konstruktory 

        /// <summary>Konstruktor</summary>
        /// <param name="xmlRoot">kontextovy XElement, ktery bude pouzit jako uloziste hodnot</param>
        /// <param name="onDataChanged">delegat, ktery je volan pri zmene hodnot v ulozisti</param>
        public GVirtualStoredObject(XElement xmlRoot, Action onDataChanged = null): base(xmlRoot, onDataChanged) {
        } // end constructor

        /// <summary>Konstruktor
        /// </summary>
        public GVirtualStoredObject(): base() {
        } // end constructor

        #endregion

        #region Verejne metody 

        /// <summary></summary>
        /// <returns></returns>
        public override string ToString() {
            return Xml.Name.LocalName;
        } // end method

        #endregion

        #region IGSettingAcceptor Members

        /// <summary>Metoda volana pred zapisem tohoto itemu do kolekce nastaveni (volano z WriteVirtualList)</summary>
        /// <param name="storage"></param>
        public virtual void SaveSettings(GSettingStorage storage) {
        } // end method 

        /// <summary>metoda volana po vytvoreni a precteni tohoto itemu z kolekce nastaveni (volano z ReadVirtualList)</summary>
        /// <param name="storage"></param>
        public virtual void ApplySettings(GSettingStorage storage) {
        } // end method

        #endregion
    } // end class
} // end namespace
