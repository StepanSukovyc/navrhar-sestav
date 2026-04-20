//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XPathNodeTextMarker.cs                 </Name>
//    <Description> Označení textu pro XPath shodu příkazu.                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using System.Drawing;
using Gordic.GFE.WinClient.XmlEditor;
using Gordic.TextEditor.Document;

namespace Gordic.GFE.WinClient.XPath
{
    /// <summary>
    /// Označení textu pro XPath shodu příkazu.
    /// </summary>
    public class XPathNodeTextMarker : TextMarker
    {
        /// <summary>
        /// Barva zvýraznění
        /// </summary>
        public static readonly Color MarkerBackColor = Color.FromArgb(159, 255, 162);

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="node"></param>
        public XPathNodeTextMarker(int offset, XPathNodeMatch node)
            : base(offset, node.Value.Length, TextMarkerType.SolidBlock, MarkerBackColor)
        {
        }

        /// <summary>
        /// Přidání označovačů XPathNodeMatch.
        /// </summary>
        /// <param name="markerStrategy">Označovací strategie</param>
        /// <param name="nodes"></param>
        public static void AddMarkers(MarkerStrategy markerStrategy, XPathNodeMatch[] nodes)
        {
            foreach (XPathNodeMatch node in nodes)
                AddMarker(markerStrategy, node);
        }

        /// <summary>
        /// Přidání jednoduchého označovače XPathNodeMatch.
        /// </summary>
        /// <param name="markerStrategy">Označovací strategie</param>
        /// <param name="node"></param>
        public static void AddMarker(MarkerStrategy markerStrategy, XPathNodeMatch node)
        {
            if (node.HasLineInfo() && node.Value.Length > 0)
            {
                LineSegment lineSegment = markerStrategy.Document.GetLineSegment(node.LineNumber);
                markerStrategy.AddMarker(new XPathNodeTextMarker(lineSegment.Offset + node.LinePosition, node));
            }
        }

        /// <summary>
        /// Odtranění všech označovačů ze strategie.
        /// </summary>
        /// <param name="markerStrategy">Strategie pro uvolnění</param>
        public static void RemoveMarkers(MarkerStrategy markerStrategy)
        {
            markerStrategy.RemoveAll(IsXPathNodeTextMarkerMatch);
        }

        static bool IsXPathNodeTextMarkerMatch(TextMarker marker)
        {
            return marker is XPathNodeTextMarker;
        }
    }
}
