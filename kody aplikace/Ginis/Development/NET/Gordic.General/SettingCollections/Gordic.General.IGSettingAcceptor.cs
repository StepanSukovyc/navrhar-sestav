//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGSettingAcceptor.cs       </Name>
//    <Description> Interface pro objekty umožňující self-setting pomocí GSettingCollection</Description>
//    <Author>      Tomáš Skála                                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2014-02-11                                                  </Created>
//  </FileHeader>

namespace Gordic.General {
    /// <summary> Interface pro objekty umožňující self-setting pomocí GSettingCollection
    /// </summary>
    public interface IGSettingAcceptor {
        /// <summary>metoda k ulozeni stavu objektu do nastaveni</summary>
        /// <param name="storage">kontextove uloziste hodnot</param>
        void SaveSettings(GSettingStorage storage);

        /// <summary>metoda pro obnoveni stavu objektu z nastaveni</summary>
        /// <param name="storage">kontextove uloziste hodnot</param>
        void ApplySettings(GSettingStorage storage); 
    } // end interface
} // end namespace
