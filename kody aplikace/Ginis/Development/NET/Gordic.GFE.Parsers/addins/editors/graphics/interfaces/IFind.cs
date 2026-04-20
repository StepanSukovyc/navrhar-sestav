//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IFind.cs                                 </Name>
//    <Description> pomocná rozhraní                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-11                                                  </Created>
//  </FileHeader>


using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using Gordic.TextEditor.Document;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// rozhraní hledání vnitřních objektů
    /// </summary>
    public interface IDesignSearchHandler
    {
        /// <summary>
        /// hledání všech objektů dle umístění <paramref name="selection"/>
        /// v kódu otevřeného dokumentu
        /// </summary>
        /// <param name="selection">Výbraný objekt</param>
        /// <returns>Seznam všech objektu na daném umístění</returns>
        List<IComponent> SearchComponentText(ISelection selection);
        /// <summary>
        /// hledání všech objektů dle pozice <paramref name="location"/>
        /// pod kurzorem
        /// </summary>
        /// <param name="location">Umístění kurzóru</param>
        /// <returns>Buď objekt samotný nebo seznam vnořených objektů</returns>
        List<IComponent> SearchComponent(Point location);
    }

    /// <summary>
    /// rozhraní pomocné pří práci s objekty pod kurzorem myši
    /// </summary>
    public interface ITowedHandler
    {
        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        object GetTowedObject(PointF point);
        /// <summary>
        /// pozice objektu <paramref name="item"/> v seznamu
        /// </summary>
        /// <param name="item">objekt, pozice kterého se hledá</param>
        /// <returns>číslo, prezentující pozici objektu <paramref name="item"/> v seznamu daného objektu.</returns>
        int IndexOf(object item);
    }

}
