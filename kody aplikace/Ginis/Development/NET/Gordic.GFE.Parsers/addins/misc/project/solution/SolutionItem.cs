//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionItem.cs                        </Name>
//    <Description> Položka řešení                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Text;

namespace Gordic.GFE.Parsers.AddIns.Project
{
    /// <summary>
    /// Položka řešení
    /// </summary>
    public class SolutionItem
    {
        /// <summary>
        /// Název položky
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Umístění položky
        /// </summary>
        public string Location { get; set; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="name">název položky</param>
        /// <param name="location">umístění položky</param>
        public SolutionItem(string name, string location)
        {
            this.Name = name;
            this.Location = location;
        }

        /// <summary>
        /// Přidání položky
        /// </summary>
        /// <param name="sb"></param>
        /// <param name="indentString"></param>
        public void AppendItem(StringBuilder sb, string indentString)
        {
            sb.Append(indentString);
            sb.Append(Name);
            sb.Append(" = ");
            sb.Append(Location);
            sb.Append(Environment.NewLine);
        }

        /// <summary>
        /// Konverze položky na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return String.Format("[SolutionItem: " + Gordic.General.GResources.GetResourceText(29450115) + " = {0}, " + Gordic.General.GResources.GetResourceText(29450116) + " = {1}]", Location, Name); //RC 29450116 : název
        }
    }
}
