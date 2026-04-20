//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GXmlParamsIO.cs                         </Name>
//    <Description> ètení a zápis sekce z XML souboru do skupiny parametrù </Description>
//    <Author>      Jiøí Dvoøák                                            </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021             </Copyright>
//    <Created>     2002-11-13                                             </Created>
//  </FileHeader>

using System;
using System.Xml;

namespace Gordic.General {

    /// <summary>ètení a zápis sekce z XML souboru do skupiny parametrù</summary>
    public class GXmlParamsIO : GParamsIO, IGObject	{
        /// <summary> 
        /// Konstruktor 
        /// </summary>
        public GXmlParamsIO()
        {
            Init();
        }
        /// <summary> 
        /// Ètení skupiny parametrù z XML souboru 
        ///		Parametry:
        ///				1. GParams  - Globální parametry.
        ///				2. sGroup   - Název skupiny která se vytvoøí v globálních parametrech.
        ///		Ostatní nutné nastaví :
        ///				1. DataRoot             - Jméno XML souboru (napø. "config.xml")
        ///				2. DataPath             - cesta k souboru (napø. "C:\MyConfigFiles") - nepovinný údaj
        ///				3. DataKey              - XML node v souboru
        ///				4. DataSection          - Název sekce
        ///				5. DataNameSpacePrefix  - Jmenný prostor(prefix)
        ///				6. DataNameSpaceUri     - Jmenný prostor
        /// </summary>
        override public bool ReadGroup(GParams a_oParams, string a_sGroup)
        {
            string sXmlFileName = BuildFullFileName(m_sDataPath, m_sDataRoot);
            XmlDocument oXmlDoc = new XmlDocument();	
            oXmlDoc.Load(sXmlFileName);
            // nalezení 'node'
            //XmlNode foundXmlNode=GetNode(oXmlDoc, a_sGroup);
            XmlNode foundXmlNode=GetNode(oXmlDoc, m_sDataSection);
            if (foundXmlNode!=null)
            {
                return ReadAllParams(foundXmlNode, a_oParams, a_sGroup);
            }
            else
                return false;
        }
        /// <summary> 
        /// Zápis skupiny parametrù do XML souboru
        ///		Parametry:
        ///				1. GParams  - Globální parametry.
        ///				2. sGroup   - Název skupiny která se se zapíše do registrù.
        ///		Ostatní nutné nastaví :
        ///				1. DataRoot             - Jméno XML souboru (napø. "config.xml")
        ///				2. DataPath             - cesta k souboru (napø. "C:\MyConfigFiles") - nepovinný údaj
        ///				3. DataKey              - XML node v souboru
        ///				4. DataSection          - Název sekce
        ///				5. DataNameSpacePrefix  - Jmenný prostor(prefix)
        ///				6. DataNameSpaceUri     - Jmenný prostor
        /// </summary>
        override public bool WriteGroup(GParams loParams, string lsGroup)
        {
            return false;
        }
        /// <summary> 
        /// Vytváøí název souboru z interních promìnných DataPath a DataRoot;
        /// </summary>
        private string BuildFullFileName(string sPath, string sFile)
        {
            string ResultString;

            if (sPath.Length>0)
            {
                if (sPath.Substring(sPath.Length-1, 1)=="\\")
                {
                    ResultString=sPath+sFile;
                }
                else
                {
                    ResultString=sPath+"\\"+sFile;
                }
            }
            else
                ResultString=sFile;

            return ResultString;
        }
    
        /// <summary> 
        /// Vytváøí XmlNode XML dokumentu 'aXmlDoc' kde  název='DataKey' a InnerText='a_sGroup'
        /// </summary>
        private XmlNode GetNode(XmlDocument aXmlDoc, string a_sGroup)
        {
            XmlNodeList nodeList;
            XmlNode foundXmlNode=null;
            string sGroupName;

            XmlElement element = aXmlDoc.DocumentElement;
            if ((m_sDataNameSpacePrefix.Length>0)&(m_sDataNameSpaceUri.Length>0))
            {
                XmlNamespaceManager nsmgr = new XmlNamespaceManager(aXmlDoc.NameTable);
                nsmgr.AddNamespace(m_sDataNameSpacePrefix, m_sDataNameSpaceUri);
                nodeList = element.SelectNodes(m_sDataKey, nsmgr);
            }
            else
            {
                nodeList = element.SelectNodes(m_sDataKey);
            }

            foreach (XmlNode isbn in nodeList)
            {
                sGroupName = GCommon.ObtainFormattedValue(isbn);
                if (sGroupName==a_sGroup)
                {
                    foundXmlNode=isbn;
                    break;
                }
            }
            return foundXmlNode;
        }
        /// <summary> 
        /// Vytvoøí skupinu parametrù 'a_sGroup' a naplní ji parametry z 'GroupXmlNode'
        /// </summary>
        private bool ReadAllParams(XmlNode GroupXmlNode, GParams loParams, string a_sGroup)
        {
            string sPrmName;
            string sPrmValue;

            if (GroupXmlNode.HasChildNodes)
            {
                if (loParams.AddGroup(a_sGroup))
                {
                    for (int i=0; i<GroupXmlNode.ChildNodes.Count; i++)
                    {
                        sPrmName=GroupXmlNode.ChildNodes[i].Name;
                        sPrmValue = GCommon.ObtainFormattedValue(GroupXmlNode.ChildNodes[i]);
                        loParams.AddParam(a_sGroup, sPrmName, sPrmValue);
                    }
                }
            }
            return true;
        }
    
    
    } // end class

} // end namespace
