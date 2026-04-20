//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCfgXmlReader.cs                </Name>
//    <Description> hierarchické ètení XML konfiguraèních souborù  </Description>
//    <Author>      Jiøí Dvoøák                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021     </Copyright>
//    <Created>     2002-11-13                                     </Created>
//  </FileHeader>

using System;
using System.Xml;
using System.Configuration;


namespace Gordic.General {

    /// <summary>
    /// Hierarchické ètení XML konfiguraèních souborù 
    ///		1)	/configuration/Gordic/Ginis/Shared/[jmeno faze]
    ///		2)	/configuration/Gordic/Ginis/[jmeno faze]
    /// </summary>
    public class GCfgXmlReader {	

        #region veøejné konstanty

        /// <summary>
        /// Windows aplikace (addresáø a jméno souboru pro ètení konfigurace ginisu)
        /// </summary>
        public const string csGinGinisConfig = "Gin\\Ginis.config";
        /// <summary>
        /// Webové aplikace (addresáø a jméno souboru pro ètení konfigurace ginisu)
        /// </summary>
        public const string csGinWebConfig   = "Gin\\Web.config";

        #endregion 
        
        #region privátní èleny

        /// <summary>
        /// Adresáø ginisu
        /// </summary>
        private string msInstalDir;
        /// <summary>
        /// Fáze
        /// </summary>
        private string msFaze;
        /// <summary>
        /// Parametry do kterých se bude èíst konfigurace
        /// </summary>
        private GParams moParams = null;
        /// <summary>
        /// Jedn8 se o web config/windows config
        /// </summary>
        private bool mbIsWeb = false;

        /// <summary>
        /// XML soubor pro konfiguraci celého ginisu
        /// </summary>
        private XmlNode moGinisCfgNode = null;
        /// <summary>
        /// XML node config aplikace (config, webconfig)
        /// </summary>
        private XmlNode moAppCfgNode = null;

        #endregion 

        #region konstruktor
        
        /// <summary>
        /// Konstruktor
        /// </summary>
        public GCfgXmlReader(GParams aParams, bool aIsWeb, string aInstalDir, string aFaze)
        {
            moParams = aParams;
            msInstalDir = aInstalDir;
            msFaze = aFaze;
            mbIsWeb = aIsWeb;

            // aplikaèní config, webconfig -----------------------------------------------
            //ConfigurationManager ca;
            try
            { 
                //moAppCfgNode=(XmlNode)ConfigurationSettings.GetConfig("Gordic"); }
                moAppCfgNode = (XmlNode)ConfigurationManager.GetSection("Gordic");
            }
            catch
            { moAppCfgNode=null; }
            // ginis config, webconfig -----------------------------------------------
            try
            { moGinisCfgNode = OpenRootNodeFromDocument("aaa");}
            catch
            { moGinisCfgNode=null; }

            //Ginadr : C:\GIN32\
            //Install_adr : C:\GIN32\INB\

            //HttpContext.Current.Request.ApplicationPath

            //HKEY_LOCAL_MACHINE\SOFTWARE\Gordic\GINIS\SHARED\INSTALL32
            //ginadr
        }
        
        #endregion 

        #region privátní metody

        /// <summary>
        /// Vrátí XML node ze souboru
        /// </summary>
        /// <param name="filename">jméno souboru</param>
        /// <returns>XML node nebo null</returns>
        private XmlNode OpenRootNodeFromDocument(string filename)
        {
            XmlTextReader reader = new XmlTextReader(filename);
            reader.WhitespaceHandling = WhitespaceHandling.None;
            XmlDocument doc = new XmlDocument();
            doc.Load(reader);
            return doc.FirstChild;
        }

        /// <summary>
        /// Pokusí se otevøeít cestu v XML SubNode pokud se to nepodaøí pokusí se otevøít SubNodeAlternative
        /// </summary>
        /// <param name="node">vìtev pod kterou se hledá cesta</param>
        /// <param name="SubNode">cesta</param>
        /// <param name="SubNodeAlternative">alternativní cesta</param>
        /// <returns>xml node nebo null</returns>
        private XmlNode OpenSubnode(
            XmlNode node, 
            string SubNode,
            string SubNodeAlternative)
        {
            XmlNode TmpNode = null;
            TmpNode = node.SelectSingleNode(SubNode);
            if (TmpNode==null) 
                TmpNode = node.SelectSingleNode(SubNodeAlternative);
            return TmpNode;
        }

        /// <summary>
        /// Vytváøí skupinu parametrù dle xml node
        /// </summary>
        /// <param name="node">xml node s parametry</param>
        /// <param name="GroupName">název skupiny</param>
        /// <param name="SubNode">název subnode</param>
        /// <param name="SubNodeAlternative">alternativní název subnode</param>
        /// <returns>výsledek operace</returns>
        private bool CreateParamsFromNode(
            XmlNode node, 
            string GroupName, 
            string SubNode,
            string SubNodeAlternative)
        {
            XmlNodeList nodeList = null;
            XmlNode TmpNode = null;
            TmpNode = OpenSubnode(node, SubNode, SubNodeAlternative);
            if (TmpNode!=null) nodeList = TmpNode.ChildNodes;
            string sPrmName;
            string sPrmValue;
            if (nodeList!=null)
            {
                if (nodeList.Count>0)
                {
                    moParams.AddGroup(GroupName);
                    for (int i=0;i<nodeList.Count;i++)
                    {
                        if(nodeList[i].NodeType!=XmlNodeType.Whitespace && nodeList[i].NodeType!=XmlNodeType.Comment)
                        {
                            sPrmName	=	nodeList[i].Name;
                            sPrmValue = GCommon.ObtainFormattedValue(nodeList[i]);
                            moParams.SetAddParam(GroupName, sPrmName, sPrmValue);
                        }
                    }
                    return true;
                }
                else
                    return true;
            }
            else
                return false;
        }
        
        #endregion 	
     
    } // end class

} // end namespace
