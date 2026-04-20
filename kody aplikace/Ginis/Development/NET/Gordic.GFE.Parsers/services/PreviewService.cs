//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.PreviewService.cs                        </Name>
//    <Description> Služba náhledu                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-13                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Xml;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Služba náhledu
    /// </summary>
    public static class PreviewService
    {
        /// <summary>
        /// Vytvoření SRZ souboru pro náhled dat
        /// </summary>
        /// <param name="contentAlf">Informace o souboru sestavy</param>
        /// <param name="dataXml">Informace o datech sestavy</param>
        /// <param name="title">Titulek</param>
        /// <param name="tempZipDir">Dočasná složka, kterou bude zapotřebí uvolnít (odstranit)</param>
        /// <returns></returns>
        public static FileInfo CreateSrzFile(FileInfo contentAlf, FileInfo dataXml, string title, out GFETempDir tempZipDir)
        {
            tempZipDir = new GFETempDir();
            GFETempDir tempDirUnZip = new GFETempDir();
            File.Copy(contentAlf.FullName, string.Concat(tempDirUnZip.Path, "\\", contentAlf.Name));
            File.Copy(dataXml.FullName, string.Concat(tempDirUnZip.Path, "\\", dataXml.Name));

            foreach (FileInfo item in contentAlf.Directory.GetFiles("*.zip"))
                if (string.Equals(Path.ChangeExtension(item.Name, ".alf"), contentAlf.Name, StringComparison.InvariantCultureIgnoreCase))
                    File.Copy(item.FullName, string.Concat(tempDirUnZip.Path, "\\", item.Name));

            string xmeName = string.Empty;
            foreach (FileInfo item in contentAlf.Directory.GetFiles("*.xme"))
            {
                xmeName = item.Name;
                File.Copy(item.FullName, string.Concat(tempDirUnZip.Path, "\\", item.Name));
                break;
            }
            using (FileStream fs = new FileStream(string.Concat(tempDirUnZip.Path, "\\preview.ssr"), FileMode.Create, FileAccess.ReadWrite))
            {
                XmlDocument documentSSR = GetDocument(contentAlf.Name, dataXml.Name, xmeName, title);
                documentSSR.Save(fs);
                fs.Flush();
            }
            GZip.Zip(tempDirUnZip.Path + "\\*.*", tempZipDir.Path + "\\preview.srz");
            return new FileInfo(tempZipDir.Path + "\\preview.srz");
        }

        private static XmlDocument GetDocument(string formatName, string dataName, string xmeName, string title)
        {
            string xmlns = "http://www.gordic.cz/TR/ssr/1.0";
            if (string.IsNullOrEmpty(title))
                title = GResources.GetResourceText(29450021); //RC 29450021 : Náhled

            XmlDocument xmlDataDoc = new XmlDocument();
            XmlDeclaration xmlDecl = xmlDataDoc.CreateXmlDeclaration("1.0", "utf-8", null);
            xmlDataDoc.AppendChild(xmlDecl);

            XmlElement xmlElementReports = xmlDataDoc.CreateElement("reports", xmlns);
            XmlElement xmlElementReport = xmlDataDoc.CreateElement("report");
            XmlAttribute atributeTitle = xmlDataDoc.CreateAttribute("title");
            atributeTitle.Value = title;
            xmlElementReport.Attributes.Append(atributeTitle);

            XmlElement xmlElementData = xmlDataDoc.CreateElement("data");
            XmlAttribute atributeDataFile = xmlDataDoc.CreateAttribute("file");
            atributeDataFile.Value = dataName;
            xmlElementData.Attributes.Append(atributeDataFile);
            xmlElementReport.AppendChild(xmlElementData);

            if (!string.IsNullOrEmpty(xmeName))
            {
                XmlElement xmlElementStruct = xmlDataDoc.CreateElement("structure");
                XmlAttribute atributeStructFile = xmlDataDoc.CreateAttribute("file");
                atributeStructFile.Value = xmeName;
                xmlElementStruct.Attributes.Append(atributeStructFile);
                xmlElementReport.AppendChild(xmlElementStruct);
            }

            XmlElement xmlElementFormat = xmlDataDoc.CreateElement("format");
            XmlAttribute atributeFormatFile = xmlDataDoc.CreateAttribute("file");
            atributeFormatFile.Value = formatName;
            XmlAttribute atributeFormatTitle = xmlDataDoc.CreateAttribute("title");
            atributeFormatTitle.Value = title;
            xmlElementFormat.Attributes.Append(atributeFormatTitle);
            xmlElementFormat.Attributes.Append(atributeFormatFile);
            xmlElementReport.AppendChild(xmlElementFormat);

            xmlElementReports.AppendChild(xmlElementReport);
            xmlDataDoc.AppendChild(xmlElementReports);
            return xmlDataDoc;
        }

        public static string CreateSrzFile(string alf, string data, string xmeName, string title, string directory)
        {
            var outname = FileUtility.Combine(directory, Guid.NewGuid().ToString() + ".srz");
            GZip.Zip(alf, outname);
            GZip.ZipAdd(data, outname);
            GZip.ZipAdd(xmeName, outname);
            string ssr = FileUtility.Combine(directory, Guid.NewGuid().ToString() + ".ssr");
            using (FileStream fs = new FileStream(ssr, FileMode.Create, FileAccess.ReadWrite))
            {
                XmlDocument documentSSR = GetDocument(alf, data, xmeName, title);
                documentSSR.Save(fs);
                fs.Flush();
            }
            GZip.ZipAdd(ssr, outname);
            return outname;
        }
    }
}
