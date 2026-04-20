//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCfgPrmReader.cs            </Name>
//    <Description> ètení konfiguraèních parametrù             </Description>
//    <Author>      Jiøí Dvoøák                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>     2002-11-13                                 </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Xml;
using Microsoft.Win32;
using System.Reflection;

namespace Gordic.General {

    /// <summary>ètení konfiguraèních parametrù</summary>
    public class GCfgPrmReader : GCfgPrmReaderMain, IGObject {

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GCfgPrmReader).Assembly; }
        } // end property

        #endregion

        #region konstruktor
        /// <summary>
        /// Konstruktor - volá konstruktor pøedka, který je protected
        /// </summary>
        /// <param name="aCfgType"></param>
        /// <param name="aFaze"></param>
        public GCfgPrmReader(CfgType aCfgType, string aFaze):base(aCfgType, aFaze)
        {
        }

        #endregion 

        #region protected virtual

        /// <summary>
        /// Ètení registrù
        /// </summary>
        /// <param name="RegRoot">koøen v registrech HKLM, HKCU</param>
        /// <param name="RegPath">cesta v registrech</param>
        /// <param name="bResult">výsledek</param>
        /// <param name="nParamCount">poèet naètených parametrù</param>
        /// <param name="strResult">text </param>
        protected override void ReadRegistry(RegistryRootEnum RegRoot, string RegPath, ref bool bResult, ref int nParamCount, ref string strResult)
        {
            try
            {
                bResult = false;
                nParamCount = 0;
                strResult = GResources.GetResourceText(ThisAssembly,23230147); // [ Operace probìhla bez chyb ]
                // -----------------------------------------------------------
                string sName = "";
                object sValue = null;
                RegistryKey regkey;
                string[] SubKeyNames;
                // -----------------------------------------------------------
                if (RegRoot==RegistryRootEnum.HKLM)	
                    regkey = Registry.LocalMachine.OpenSubKey(GCommon.GetRegistry6432Path(RegPath), false);
                else if (RegRoot==RegistryRootEnum.HKCU)
                    regkey = Registry.CurrentUser.OpenSubKey(RegPath, false);
                else
                    regkey = null;
                // -----------------------------------------------------------
                if (regkey==null)
                {
                    bResult = false;
                    strResult = "[Error!] Registry key - not found";
                }
                else
                {
                    SubKeyNames = regkey.GetValueNames();
                    for (int i = 0; i<regkey.ValueCount; i++) 
                    {
                        sName  = SubKeyNames[i];
                        sValue = regkey.GetValue(sName);
                        AddPrm(sName.Trim(), sValue);
                    }
                    nParamCount = regkey.ValueCount;
                    bResult = true;
                }
            }
            catch(Exception e)
            { 
                strResult = GResources.GetResourceText(ThisAssembly,23230148)+e.Message; // [ Chyba ]
                bResult = false;
            }

        }
        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        /// <summary>
        /// Ètení z XML souboru
        /// </summary>
        /// <param name="sFileName">jméno souboru</param>
        /// <param name="XMLPath">XML path</param>
        /// <param name="bResult">výsledek</param>
        /// <param name="nParamCount">poèet naètených parametrù</param>
        /// <param name="strResult">text</param>
        protected override void ReadXMLFile(string sFileName, string XMLPath, ref bool bResult, ref int nParamCount, ref string strResult)
        {
            try
            {
                bResult = false; 
                nParamCount = 0;
                strResult = GResources.GetResourceText(ThisAssembly,23230147);
                //
                string sPrmName  = "";
                string sPrmValue = "";
                //

                XmlNode xmlnode = null;
                XmlDocument oXmlDoc = null;
                // ------------------------------------
                if (File.Exists(sFileName))
                {
                    oXmlDoc = new XmlDocument();
                    oXmlDoc.Load(sFileName);
                    xmlnode = OpenXMLNode(oXmlDoc, XMLPath);
                }

                if (xmlnode!=null)
                {
                    if (xmlnode.HasChildNodes)
                    {
                        nParamCount = xmlnode.ChildNodes.Count;
                        for (int i=0; i<nParamCount; i++)
                        {
                            sPrmName=xmlnode.ChildNodes[i].Name;
                            sPrmValue = GCommon.ObtainFormattedValue(xmlnode.ChildNodes[i]);
                            AddPrm(sPrmName.Trim(), sPrmValue);
                        }

                        bResult = true;
                    }
                    else
                    {
                        // toto neni chyba - nema zadne polozky						
                        bResult = true;
                    }
                }
                else
                {
                    strResult = GResources.GetResourceText(ThisAssembly,23230149); // [ Chyba ]  nenalezena cesta v XML souboru
                    bResult = false;
                }
                //
            }
            catch(Exception e)
            {
                strResult = GResources.GetResourceText(ThisAssembly,23230148) + e.Message;
                bResult = false;
            }
        }
        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        /// <summary>
        /// Ètení APP configu
        /// </summary>
        /// <param name="XMLPath">cesta</param>
        /// <param name="AlternativeXMLPath">alternativní cesta</param>
        /// <param name="bResult">výsledek</param>
        /// <param name="nParamCount">poèet pøeètených parametrù</param>
        /// <param name="strResult">text</param>
        protected override void ReadAppConfigFile(string XMLPath, string AlternativeXMLPath, ref bool bResult, ref int nParamCount, ref string strResult)
        {
            try
            { 
                bResult = false; 
                nParamCount = 0;
                strResult = GResources.GetResourceText(ThisAssembly,23230147);
                //
                string sPrmName  = "";
                string sPrmValue = "";
                //
                //XmlNode RootNode = (XmlNode)ConfigurationSettings.GetConfig("Gordic"); 
                XmlNode RootNode = (XmlNode)System.Configuration.ConfigurationManager.GetSection("Gordic"); 
                if (RootNode!=null)
                {
                    XmlNode xmlnode = OpenSubnode(RootNode, XMLPath, AlternativeXMLPath);
                    if (xmlnode!=null)
                    {
                        if (xmlnode.HasChildNodes)
                        {
                            for (int i=0; i<xmlnode.ChildNodes.Count; i++)
                            {
                                if((xmlnode.ChildNodes[i].NodeType!=XmlNodeType.Whitespace) && 
                                    (xmlnode.ChildNodes[i].NodeType!=XmlNodeType.Comment))
                                {
                                    sPrmName=xmlnode.ChildNodes[i].Name;
                                    sPrmValue = GCommon.ObtainFormattedValue(xmlnode.ChildNodes[i]);
                                    AddPrm(sPrmName.Trim(), sPrmValue);
                                    nParamCount++;
                                }
                            }

                            bResult = true;
                        }
                        else
                            bResult = true;
                    }
                    else
                    {
                        strResult = GResources.GetResourceText(ThisAssembly,23230149); // [ Chyba ]  nenalezena cesta v XML souboru
                        bResult = false;
                    }
                }
                else
                {
                    strResult = GResources.GetResourceText(ThisAssembly,23230150); // [ Chyba ] nenalezen konfiguraèní soubor nebo jeho koøenová sekce
                    bResult = false;
                }
            }
            catch(Exception e)
            {
                strResult = GResources.GetResourceText(ThisAssembly,23230148) + e.Message;
                bResult = false;
            }
        }

        /// <summary>
        /// Ètení globálních parametrù GINISu
        /// </summary>
        /// <param name="bResult">výsledek</param>
        /// <param name="ParamCount">poèet parametrù</param>
        /// <param name="strResult">text</param>
        protected override void ReadGlobalGinisParams(ref bool bResult, ref int ParamCount, ref string strResult)
        {
            try
            {
                object Value=null;
                ParamCount = 0;

                RegistryKey regkey = Registry.LocalMachine.OpenSubKey(GCommon.Is32Bit ? Software_Gordic_Ginis_Shared_Install32 : Software_Gordic_Ginis_Shared_Install32_x64,false);
                if (regkey==null)
                {
                    strResult = GResources.GetResourceText(ThisAssembly,23230151); // [ Chyba ] nenalezen klíè v registrech
                    bResult = false;
                }
                else
                {
                    Value = regkey.GetValue(ConstStrGinadr);
                    if (Value!=null) {
                        AddPrm(ConstStrGinadr, Value);
                        ParamCount++; }
                    Value = regkey.GetValue(ConstStrWinadr);
                    if (Value!=null) {
                        AddPrm(ConstStrWinadr, Value);
                        ParamCount++; }
                    Value = regkey.GetValue(ConstStrInfadr);
                    if (Value!=null) {
                        AddPrm(ConstStrInfadr, Value);
                        ParamCount++; }
                    Value = regkey.GetValue(ConstStrOraadr);
                    if (Value!=null) {
                        AddPrm(ConstStrOraadr, Value);
                        ParamCount++; }
                    Value = regkey.GetValue(ConstStrGroupname);
                    if (Value!=null) {
                        AddPrm(ConstStrGroupname, Value);
                        ParamCount++; }
                    Value = regkey.GetValue(ConstStrShow_err);
                    if (Value!=null) {
                        AddPrm(ConstStrShow_err, Value);
                        ParamCount++; }
                    Value = regkey.GetValue(ConstStrAuto_reinst);
                    if (Value!=null) {
                        AddPrm(ConstStrAuto_reinst, Value);
                        ParamCount++; }
                    Value = regkey.GetValue(ConstStrOdloz_zprac);
                    if (Value!=null) {
                        AddPrm(ConstStrOdloz_zprac, Value);
                        ParamCount++; }
                    Value = regkey.GetValue(ConstStrShare_inst);
                    if (Value!=null) {
                        AddPrm(ConstStrShare_inst, Value);
                        ParamCount++; }
                    Value = regkey.GetValue(ConstStrMulti);
                    if(Value != null) {
                        AddPrm(ConstStrMulti,Value);
                        ParamCount++;
                    }

                        strResult = GResources.GetResourceText(ThisAssembly,23230147);
                    bResult = true;
                }
            }
            catch(Exception e)
            {
                strResult = GResources.GetResourceText(ThisAssembly,23230148) + e.Message;
                bResult = false;
            }

        }



        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        /// <summary>
        /// Vrátí GINIS insal dir
        /// </summary>
        /// <param name="aInstalDir">insal dir</param>
        /// <returns>true = OK</returns>
        protected override bool GetGINISInstalDir(ref string aInstalDir)
        {
            object tnpObj = GetParam(ConstStrGinadr);
            if (tnpObj==null)
                return false;
            else
            {
                aInstalDir = (string)tnpObj;
                if (aInstalDir.Length==0)
                    return false;
                else
                    return true;
            }
        }
        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        /// <summary>
        /// Vrátí WEB ROOT
        /// </summary>
        /// <param name="aWVDir">nalezený adresáø</param>
        /// <returns>true = OK</returns>
        protected override bool GetWebVirtualDir(ref string aWVDir)
        {
#if NETFRAMEWORK
            if (System.Web.HttpContext.Current!=null)
            {
                var sTemp = System.Web.HttpContext.Current.Server.MapPath("~/");

                int nPos = sTemp.IndexOf("\\Ginis\\",StringComparison.OrdinalIgnoreCase);
                if (nPos>=0)
                {
                    aWVDir = sTemp.Substring(0, nPos);
                    return true;
                }
                else
                {
                    aWVDir = null;
                    return false;
                }
            }
            else
#endif
            {
                aWVDir = null;
                return false;
            }
        }

        /// <summary>
        /// Zápis parametru do registrù
        /// </summary>
        /// <param name="RegRoot">koøen</param>
        /// <param name="Path">cesta</param>
        /// <param name="ParamName">jméno parametru</param>
        /// <param name="ParamValue">hodnota</param>
        /// <param name="CreatePathIfNotExist">vytvoøit cestu, pokud neexistuje</param>
        /// <returns>výsledek</returns>
        protected override bool WriteParamToRegistry(
            RegistryRootEnum RegRoot, 
            string Path, 
            string ParamName, 
            object ParamValue,
            bool CreatePathIfNotExist)
        {

            RegistryKey RegKey = OpenRegistryKey(RegRoot, Path, CreatePathIfNotExist);
            if (RegKey==null)
                return false;
            else
            {
                RegKey.SetValue(ParamName, ParamValue);
                return true;
            }
        }
        /// <summary>
        /// Smazání parametru v registrech
        /// </summary>
        /// <param name="RegRoot">koøen</param>
        /// <param name="Path">cesta</param>
        /// <param name="ParamName">jméno</param>
        /// <returns></returns>
        protected override bool DeleteRegistryParam(
            RegistryRootEnum RegRoot, 
            string Path, 
            string ParamName)
        {

            RegistryKey RegKey = OpenRegistryKey(RegRoot, Path, false);
            if (RegKey==null)
                return false;
            else
            {
                RegKey.DeleteValue(ParamName, false);
                return true;
            }
        }
        
        /// <summary>
        /// Zápis parametru do XML souboru
        /// </summary>
        /// <param name="XMLFileName">jméno souboru</param>
        /// <param name="Path">cesta v NODE</param>
        /// <param name="ParamName">jméno parametru</param>
        /// <param name="ParamValue">hodnota parametru</param>
        /// <returns>true = OK</returns>
        protected override bool WriteParamToXML(
            string XMLFileName,
            string Path, 
            string ParamName, 
            string ParamValue)
        {
            try
            {
                XmlNode node = null;
                XmlNode parentnode = null;
                XmlDocument xmldoc = null;
                // -------------------------------
                string strPath;
                if (Path[Path.Length-1]=='/')	strPath = Path + ParamName;
                else	strPath = Path + "/" + ParamName;
                // -------------------------------
                xmldoc = new XmlDocument();
                xmldoc.Load(XMLFileName);
                node = OpenXMLNode(xmldoc, strPath);
                if (node!=null)
                {
                    node.InnerXml = ParamValue;
                    xmldoc.Save(XMLFileName);
                    return true;
                }
                else
                {
                    parentnode = OpenXMLNode(xmldoc, Path);
                    if (parentnode!=null)
                    {
                        XmlElement elem = xmldoc.CreateElement(ParamName);
                        elem.InnerXml = ParamValue;
                        parentnode.AppendChild(elem);
                        xmldoc.Save(XMLFileName);
                        return true;
                    }
                    else
                        return false;
                }
            }
            catch
            { 
                return false;
            }
        }
        /// <summary>
        /// Smazání parametru v XML souboru
        /// </summary>
        /// <param name="XMLFileName">jméno souboru</param>
        /// <param name="Path">cesta k NODE</param>
        /// <param name="ParamName">jméno parametru</param>
        /// <returns>true = OK</returns>
        protected override bool DeleteXMLParam(
            string XMLFileName,
            string Path, 
            string ParamName)
        {
            try
            {
                XmlNode node = null;
                XmlNode parentnode = null;
                XmlDocument xmldoc = null;
                // -------------------------------
                string strPath;
                if (Path[Path.Length-1]=='/')	strPath = Path + ParamName;
                else	strPath = Path + "/" + ParamName;
                // -------------------------------
                xmldoc = new XmlDocument();
                xmldoc.Load(XMLFileName);
                node = OpenXMLNode(xmldoc, strPath);
                if (node==null)
                {
                    return true;
                }
                else
                {
                    parentnode = OpenXMLNode(xmldoc, Path);
                    if (parentnode!=null)
                    {
                        parentnode.RemoveChild(node);
                        return true;
                    }
                    else
                        return false;
                }
            }
            catch
            { 
                return false;
            }
        }
        
        
        #endregion 
    
    } // end class

} // end namespace
