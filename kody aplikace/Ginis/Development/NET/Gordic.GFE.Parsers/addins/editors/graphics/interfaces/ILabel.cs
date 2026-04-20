//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ILabel.cs                              </Name>
//    <Description> Rozhraní štítků                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-22                                                  </Created>
//  </FileHeader>

using System.Drawing;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// rozhraní štítků
    /// </summary>
    public interface ILabel : IDataItem, IParentable
    {
        /// <summary>
        /// vázaný objekt s obsahem
        /// </summary>
        ILabledObject LabledObject { get; set; }
        /// <summary>
        /// Nadřazený štítek
        /// </summary>
        ILabel ParentLabel { get; }

        /// <summary>
        /// Řádky prezentující sekci HEAD
        /// </summary>
        LineList Head { get; }
        /// <summary>
        /// Řádky a regiony prezentující sekci BODY
        /// </summary>
        BodyList Body { get; }
        /// <summary>
        /// Řádky prezentující sekci FOOT
        /// </summary>
        LineList Foot { get; }
    }
    /// <summary>
    /// Rozhraní štítků
    /// </summary>
    public interface IGRRLabel : ILabel, ITagComponent, ISizeHandler, ILineManipulator
    {
        /// <summary>
        /// Velikost štítku
        /// </summary>
        float LabelZoneSize { get; }
        /// <summary>
        /// Velikost štítku - včetně ZOOM parametru
        /// </summary>
        float LabelZoneSizeZoom { get; }

        /// <summary>
        /// Indikuje, že štítek je aktivní
        /// </summary>
        bool IsActive { get; }

        /// <summary>
        /// aktualizace šířky zóny štítku
        /// </summary>
        void UpdateLabelZoneSize();
        /// <summary>
        /// kreslení samotného štítku
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        void PaintLabel(Graphics graphics);

        /// <summary>
        /// Indikuje dostupnost operace vložení řádku PŘED aktuální objekt
        /// </summary>
        bool EnableLineBefore { get; }
        /// <summary>
        /// Indikuje dostupnost operace vložení řádku ZA aktuální objekt
        /// </summary>
        bool EnableLineAfter { get; }
        /// <summary>
        /// Indikuje dostupnost operace posun objektu o jeden nahoru
        /// </summary>
        bool EnableShiftUp { get; }
        /// <summary>
        /// Indikuje dostupnost operace posun objektu o jeden dolu
        /// </summary>
        bool EnableShiftDown { get; }

        /// <summary>
        /// odstranění objektu
        /// </summary>
        /// <param name="com">objekt k odstranění</param>
        void Remove(object com);

        /// <summary>
        /// Interaktivita objektu
        /// </summary>
        IInteractive Interactive { get; }
        
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="lblObject">vázaný objekt</param>
        /// <returns>inicializovaný objekt</returns>
        IGRRLabel Initialize(ILabledObject lblObject);

        /// <summary>
        /// Načtení informací o štítku dle řádku a nastavení
        /// </summary>
        /// <param name="line">řádek s informací o štítku</param>
        /// <param name="config">nastavení</param>
        IGRRLabel LoadInformation(dynamic line, object config);
    }

    /// <summary>
    /// rozhraní interaktivity objektu
    /// </summary>
    public interface IInteractive
    {
        /// <summary>
        /// indikuje interaktivitu
        /// </summary>
        bool IsInteractive { get; set; }

        /// <summary>
        /// Nápis
        /// </summary>
        string Title { get; set; }
    }

}
