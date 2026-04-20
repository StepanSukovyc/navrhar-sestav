//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGCustomizableVisualItem.cs     </Name>
//    <Description> rozhraní pro položky customizovatelného obsahu </Description>
//    <Author>      Tomáš Skála                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021     </Copyright>
//    <Created>     2008-04-08                                     </Created>
//  </FileHeader>

namespace Gordic.General {

    /// <summary>rozhraní pro položky customizovatelného obsahu (tj. sloupce gridu, customizovatelné toolitemy, tlačítka)</summary>
    public interface IGCustomizableVisualItem {
        
        /// <summary>identifikátor položky</summary>
        string ID { get; }

        /// <summary>viditelnost položky</summary>
        bool Visible { get; set; }

        /// <summary>položka je viditelná vždy a není možné ji skrýt</summary>
        bool AlwaysVisible { get; }

    } // end interface

} // end namespace
