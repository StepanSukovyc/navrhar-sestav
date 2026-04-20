//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IXmlTreeView.cs                        </Name>
//    <Description> Rozhraní XML stromového pohledu                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System.Xml;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Rozhraní XML stromového pohledu
    /// </summary>
    public interface IXmlTreeView
    {
        /// <summary>
        /// Zobrazení chybové zprávy, že strom pro daný obsah nelze zobrazit
        /// </summary>
        /// <param name="ex">Chyba, která nastavé při pokusu o zobrazení stromu.</param>
        void ShowXmlIsNotWellFormedMessage(XmlException ex);

        /// <summary>
        /// Zobrazení chybové zprávy
        /// </summary>
        /// <param name="message">Zpráva</param>
        void ShowErrorMessage(string message);

        /// <summary>
        /// Indikuje nutnost uložení dokumentu
        /// </summary>
        bool IsDirty { get; set; }

        /// <summary>
        /// XML dokument.
        /// </summary>
        XmlDocument Document { get; set; }

        /// <summary>
        /// Výbraná větev stromu.
        /// </summary>
        XmlNode SelectedNode { get; }

        /// <summary>
        /// Vybraný element stromu.
        /// </summary>
        XmlElement SelectedElement { get; }

        /// <summary>
        /// Zobrazení atributů
        /// </summary>
        /// <param name="attributes">Kolekce atributů k zobrazení</param>
        void ShowAttributes(XmlAttributeCollection attributes);

        /// <summary>
        /// Vyčištění všech momentálně zobrazených atributů..
        /// </summary>
        void ClearAttributes();

        /// <summary>
        /// Po výběru větve daná metoda zobrazí odpovídající elemntu text
        /// </summary>
        /// <param name="text">Text k zobrazení</param>
        void ShowTextContent(string text);

        /// <summary>
        /// Obsah aktuálně vybraného elementu
        /// </summary>
        string TextContent { get; set; }

        /// <summary>
        /// Větev textu aktuálně vybraného elementu.
        /// </summary>
        XmlText SelectedTextNode { get; }

        /// <summary>
        /// Zobrazení dialogu na přidání atributu.
        /// </summary>
        /// <param name="attributes">Seznam dostupných atributů</param>
        /// <returns></returns>
        string[] SelectNewAttributes(string[] attributes);

        /// <summary>
        /// Název aktuálně vybraného atributu.
        /// </summary>
        string SelectedAttribute { get; }

        /// <summary>
        /// Zobrazení dialogového okna na přidání elementu stromu
        /// </summary>
        /// <param name="elements">Seznam dostupných elementů.</param>
        /// <returns></returns>
        string[] SelectNewElements(string[] elements);

        /// <summary>
        /// Přidání vnitřního elementu do aktuálně vybrného
        /// </summary>
        /// <param name="element">Přidávaný element</param>
        void AppendChildElement(XmlElement element);

        /// <summary>
        /// Vložení specifického elementu před aktuílně vybraný
        /// </summary>
        /// <param name="element">Přidávaná element</param>
        void InsertElementBefore(XmlElement element);

        /// <summary>
        /// Vložení specifického elementu za aktuálně vybraný
        /// </summary>
        /// <param name="element">Vkládaný element</param>
        void InsertElementAfter(XmlElement element);

        /// <summary>
        /// Odstranění specifického elementu ze stromu.
        /// </summary>
        /// <param name="element">Element k odstranění</param>
        void RemoveElement(XmlElement element);

        /// <summary>
        /// Zobrazení úzlu před výjmutím
        /// </summary>
        /// <param name="node">Zobrazovaný úzel</param>
        void ShowCut(XmlNode node);

        /// <summary>
        /// Skrýtí úzlu k vyjmutí
        /// </summary>
        /// <param name="node">Daný úzel</param>
        void HideCut(XmlNode node);

        /// <summary>
        /// Přidání nové textové větve do aktuálně vybrané
        /// </summary>
        /// <param name="textNode">Přidávaná větev</param>
        void AppendChildTextNode(XmlText textNode);

        /// <summary>
        /// Vložení specifické textové větve před aktuálně vybranou
        /// </summary>
        /// <param name="textNode">Vkládaná větev</param>
        void InsertTextNodeBefore(XmlText textNode);

        /// <summary>
        /// Vložení specifické textové větve za aktuálně vybranou
        /// </summary>
        /// <param name="textNode">Vkládaná větev</param>
        void InsertTextNodeAfter(XmlText textNode);

        /// <summary>
        /// Odstranění specifické textové větve.
        /// </summary>
        /// <param name="textNode">větev k odstranění</param>
        void RemoveTextNode(XmlText textNode);

        /// <summary>
        /// Aktualizace textu odpovídajícího uzlu stromu.
        /// </summary>
        /// <param name="textNode">Textový úzel</param>
        void UpdateTextNode(XmlText textNode);

        /// <summary>
        /// Aktuálně vybraný koměntář.
        /// </summary>
        XmlComment SelectedComment { get; }

        /// <summary>
        /// Aktualizace textu odpovídajícího uzlu stromu
        /// </summary>
        /// <param name="comment">úzel komentáře</param>
        void UpdateComment(XmlComment comment);

        /// <summary>
        /// Přidání nového úzlu komentáře do aktuálně vybrané větve
        /// </summary>
        /// <param name="comment">Přidávaný komentář</param>
        void AppendChildComment(XmlComment comment);

        /// <summary>
        /// Odstranění specifického XML komentáře ze stromu.
        /// </summary>
        /// <param name="comment">Komentář k odstranění</param>
        void RemoveComment(XmlComment comment);

        /// <summary>
        /// Vložení specifického komentáře před aktuálně výbranou větev.
        /// </summary>
        /// <param name="comment">Vkládaný komentář</param>
        void InsertCommentBefore(XmlComment comment);

        /// <summary>
        /// Vložení specifického komentáře za aktuálně výbranou větev
        /// </summary>
        /// <param name="comment">vkládaný komentář</param>
        void InsertCommentAfter(XmlComment comment);
    }
}
