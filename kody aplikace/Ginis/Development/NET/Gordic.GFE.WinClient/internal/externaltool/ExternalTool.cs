//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ExternalTool.cs                        </Name>
//    <Description> Tato třída popisuje externí nástroj - externí program,      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-05                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Xml;

namespace Gordic.GFE.WinClient.External
{
    /// <summary>
    /// Tato třída popisuje externí nástroj - externí program, 
    /// který může být spuštěn z hlavní nabídky uvnitř Návrháře.
    /// </summary>
    public class ExternalTool
    {
        string menuCommand = GResources.GetResourceText(29450508); //RC 29450508 : nový nástroj
        string command = string.Empty
            , arguments = string.Empty
            , initialDirectory = string.Empty;

        /// <summary>
        /// název položky nabídky externího nástroje
        /// </summary>
        public string MenuCommand
        {
            get { return menuCommand; }
            set
            {
                menuCommand = value;
                System.Diagnostics.Debug.Assert(menuCommand != null, "Gordic.GFE.WinClient.Internal.ExternalTool.ExternalTool: " + GResources.GetResourceText(29450509) + " MenuCommand == null"); //RC 29450509 : řetězec
            }
        }
        /// <summary>
        /// příkaz spuštění externího nástroje
        /// </summary>
        public string Command
        {
            get { return command; }
            set
            {
                command = value;
                System.Diagnostics.Debug.Assert(command != null, "Gordic.GFE.WinClient.Internal.ExternalTool.ExternalTool: " + GResources.GetResourceText(29450509) + " Command == null"); //RC 29450509 : řetězec
            }
        }
        /// <summary>
        /// argumenty externího nástroje
        /// </summary>
        public string Arguments
        {
            get { return arguments; }
            set
            {
                arguments = value;
                System.Diagnostics.Debug.Assert(arguments != null, "Gordic.GFE.WinClient.Internal.ExternalTool.ExternalTool: " + GResources.GetResourceText(29450509) + " Arguments == null");
            }
        }
        /// <summary>
        /// inicializační složka externího nástroje
        /// </summary>
        public string InitialDirectory
        {
            get { return initialDirectory; }
            set
            {
                initialDirectory = value;
                System.Diagnostics.Debug.Assert(initialDirectory != null, "Gordic.GFE.WinClient.Internal.ExternalTool.ExternalTool: " + GResources.GetResourceText(29450509) + " InitialDirectory == null");
            }
        }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public ExternalTool() { }
        /// <summary>
        /// konstruktor třídy dle XML elementu
        /// </summary>
        /// <param name="el">element s popisem externího nástroje</param>
        public ExternalTool(XmlElement el)
        {
            if (el == null)
                throw new ArgumentNullException("ExternalTool(XmlElement el): " + "el " + GResources.GetResourceText(29450510) + " null"); //RC 29450510 : nemůže být

            if (el["initialdirectory"] == null ||
                el["arguments"] == null ||
                el["command"] == null ||
                el["menucommand"] == null)
                throw new Exception(string.Join(" ", "ExternalTool(XmlElement el):", GResources.GetResourceText(29450512), "INITIALDIRECTORY, ARGUMENTS, COMMAND, MENUCOMMAND", GResources.GetResourceText(29450511))); //RC 29450512 : atributy

            InitialDirectory = el["initialdirectory"].InnerText;
            Arguments = el["arguments"].InnerText;
            Command = el["command"].InnerText;
            MenuCommand = el["menucommand"].InnerText;
        }

        /// <summary>
        /// nový externí nástroj dle jiného
        /// </summary>
        /// <param name="selectedItem">kopírovaný nástroj</param>
        public ExternalTool(ExternalTool selectedItem)
        {
            if (selectedItem != null)
            {
                initialDirectory = selectedItem.initialDirectory;
                menuCommand = selectedItem.menuCommand;
                command = selectedItem.command;
                arguments = selectedItem.arguments;
            }
        }

        /// <exclude/>
        public override string ToString() { return menuCommand; }
        /// <summary>
        /// Převod na XML jednotku
        /// </summary>
        /// <param name="doc"></param>
        /// <returns></returns>
        public XmlElement ToXmlElement(XmlDocument doc)
        {
            if (doc == null)
                throw new ArgumentNullException("ExternalTool.ToXmlElement(XmlDocument doc): doc " + GResources.GetResourceText(29450510) + " null"); //RC 29450510 : nemůže být

            XmlElement el = doc.CreateElement("tool");

            XmlElement x = doc.CreateElement("initialdirectory");
            x.InnerText = InitialDirectory;
            el.AppendChild(x);

            x = doc.CreateElement("arguments");
            x.InnerText = Arguments;
            el.AppendChild(x);

            x = doc.CreateElement("command");
            x.InnerText = command;
            el.AppendChild(x);

            x = doc.CreateElement("menucommand");
            x.InnerText = MenuCommand;
            el.AppendChild(x);

            return el;
        }

        /// <summary>
        /// prázdný objekt
        /// </summary>
        public static ExternalTool Empty { get; set; }
    }
}
