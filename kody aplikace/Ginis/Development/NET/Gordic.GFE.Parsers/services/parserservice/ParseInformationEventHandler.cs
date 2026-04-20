//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ParseInformationEventHandler.cs        </Name>
//    <Description> informace analyzátoru                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-18                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// delegát metody analyzátoru
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    public delegate void ParserUpdateStepEventHandler(object sender, ParserUpdateStepEventArgs e);

    /// <summary>
    /// informace analyzátoru
    /// </summary>
    public class ParserUpdateStepEventArgs : EventArgs
    {
        readonly string fileName;
        /// <summary>
        /// název analyzovaného souboru
        /// </summary>
        public string FileName { get { return fileName; } }

        readonly string content;
        /// <summary>
        /// obsah analyzovaného souboru
        /// </summary>
        public string Content { get { return content; } }

        readonly bool updated;
        /// <summary>
        /// indikátor aktuálnosti souboru
        /// </summary>
        public bool Updated { get { return updated; } }

        readonly ParseInformation parseInformation;
        /// <summary>
        /// informace analyzátoru
        /// </summary>
        public ParseInformation ParseInformation { get { return parseInformation; } }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="fileName">název analyzovaného souboru</param>
        /// <param name="content">obsah analyzovaného souboru</param>
        /// <param name="updated">indikátor aktuálnosti obsahu</param>
        /// <param name="parseInformation">informace analyzátoru</param>
        public ParserUpdateStepEventArgs(string fileName, string content, bool updated, ParseInformation parseInformation)
        {
            this.fileName = fileName;
            this.content = content;
            this.updated = updated;
            this.parseInformation = parseInformation;
        }
    }
}
