//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DataService.cs                         </Name>
//    <Description> Služba pro práci s daty                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.General;
using System.Threading;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Služba pro práci s daty
    /// </summary>
    static class DataService
    {
        class SetDataObject
        {
            /// <summary>
            /// Obsah
            /// </summary>
            public IViewContent Content { get; set; }
            /// <summary>
            /// Start threadu
            /// </summary>
            public DateTime StartTime { get; set; }

            /// <summary>
            /// Vlákno, ve kterém běží metoda
            /// </summary>
            public Thread Thread { get; set; }

            internal void SetData(object o)
            {/*
                lock (Content.PrimaryFile.CloseLock)
                {
                    // pokud čas v tabulce je pozdější, pak vlákno již není aktuální
                    if (DataService.Threads[Content.PrimaryFile].IndexOf(Thread) != DataService.Threads[Content.PrimaryFile].Count - 1)
                    {
                        DataService.Threads[Content.PrimaryFile].Remove(Thread);
                        return;
                    }

                    // stará data
                    string oldData = Content.PrimaryFile.GetData();
                    // získáme nové ALF
                    listOfXMLData[Content.PrimaryFile] = Content.GetOuterXml();
                    // pokud data jsou jiná, pak ozbačíme soubor jakožto pozměněný
                    if (oldData != listOfXMLData[Content.PrimaryFile])
                        DataService.AddIsChanged(Content.PrimaryFile);
                }
                DataService.Threads[Content.PrimaryFile].Remove(Thread);*/
            }
        }

        #region New
        /// <summary>
        /// Soubor struktury dat (v případě nových sestav)
        /// </summary>
        public static string StructureFileName { get; set; }

        /// <summary>
        /// Typ šablony
        /// </summary>
        public static string TemplateType { get; set; }

        static string templateFileName;
        /// <summary>
        /// Soubor šablony (v případě nových sestav), pro Office sestavy
        /// </summary>
        public static string TemplateFileName { get { return templateFileName; }
            set
            {
                /*if (!string.IsNullOrEmpty(value))
                {
                    GFETempDir temporaryDir = new GFETempDir();
                    TemporaryService.RegisterDirectory(temporaryDir);

                    // případ nové sestavy
                    switch (TemplateType)
                    {
                        case "RTF":
                            // vytvoříme WORD dokument do dočasné složky
                            templateFileName = OfficeService.CreateNewWordDocument("sablona.doc", temporaryDir.Path);
                            break;
                        case "MSE":
                            // vytvoříme EXCEL dokument do dočasné složky
                            templateFileName = OfficeService.CreateNewExcelDocument("sablona.xls", temporaryDir.Path);
                            break;
                        default:
                            break;
                    }
                }
                else */templateFileName = value;
            }
        }

        /// <summary>
        /// Data nového GRF souboru
        /// </summary>
        /// <returns></returns>
        internal static string GetNew_DocForm_Data()
        {
            /*
#if !zDEBUG
            var docForm = DocFormTab.Show(null);
            var xme = docForm.Xme;
            var parts = docForm.Parts;
            if (xme == null) return null;

            GTempFile xmeFile = new GTempFile();
            xmeFile.SaveStream(new System.IO.MemoryStream(Encoding.UTF8.GetBytes(xme)));

            TemporaryService.RegisterFile(xmeFile);
            StructureFileName = xmeFile.Path;
#else
            StructureFileName = @"N:\Ginis\467\dev\net\Sestavy\00000AWm.xme";
#endif
            //Načtení ze sestavy
            XmlDocument xmlDoc = new XmlDocument();
            //<?xml version="1.0" encoding="utf-8"?>
            XmlDeclaration xmlDecl = xmlDoc.CreateXmlDeclaration(ReportDesignerProperties.Instance.Version, "utf-8", null);
            xmlDoc.AppendChild(xmlDecl);
            XmlElement xmlFormat = xmlDoc.CreateElement("format", ReportDesignerProperties.Instance.Uri14); //xmlns="http://www.gordic.cz/TR/alf/1.4/"
            xmlFormat.SetAttribute("type", "grf");

            XmlElement info = xmlDoc.CreateElement("info", ReportDesignerProperties.Instance.Uri14);
            if (!string.IsNullOrEmpty(StructureFileName))
            {
                StructureView structureView = CommonService.GetStructureView(StructureFileName);
                info.SetAttribute("ixs_xme", structureView.Structure.StructureID);
                info.SetAttribute("parts", string.Join(",", parts));
                info.SetAttribute("xmeta_ver", Convert.ToString(structureView.Structure.StructureVersionMajor));
                info.SetAttribute("xmeta_subver_min", Convert.ToString(structureView.Structure.StructureVersionMinor));
                info.SetAttribute("ixs_typ", docForm.IxsTyp);

                info.SetAttribute("nazev", "DOCFORM: Formulář XYZ");
                info.SetAttribute("poznamka", "DOCFORM");
                info.SetAttribute("ixs_alv", "0000ALV056IT");
                info.SetAttribute("rokmes_od", "200000");
                info.SetAttribute("rokmes_do", "299999");
                info.SetAttribute("form_vyst", "GFRM");
            }
            xmlFormat.AppendChild(info);

            //Přidáme větev FORMAT do dokumentu
            xmlDoc.AppendChild(xmlFormat);
            return CommonService.GetXmlAsString(xmlDoc);*/
            return "";
        }
        #endregion

        #region Threads

        /// <summary>
        /// List souborů instance aplikace, které byli pozmeněné a ještě nejsou uložené
        /// </summary>
        public static List<OpenedFile> ChangedOpenedFiles { get; set; }

        /// <summary>
        /// Seznam vláken, pro který je zapotřebí ukončít generování dat
        /// </summary>
        public static Dictionary<OpenedFile, List<Thread>> Threads;

        static Dictionary<OpenedFile, string> listOfXMLData;

        /// <summary>
        /// Inicializace služby
        /// </summary>
        public static void InitializeService()
        {
            listOfXMLData = new Dictionary<OpenedFile, string>();
            Threads = new Dictionary<OpenedFile, List<Thread>>();
            ChangedOpenedFiles = new List<OpenedFile>();
        }

        /// <summary>
        /// Startování získávání dat pro ovladač stránky
        /// </summary>
        /// <param name="content">Ovladač stránek sestavy</param>
        public static void StartThreadsData(IViewContent content)
        {
            // pokud ovladač je NULL pak není co řešit
            if (content == null)
                return;

            // pokud pro daný ovladač se vlákno spouští poprvé, pak nastavíme potřebné údaje
            if (!listOfXMLData.ContainsKey(content.PrimaryFile))
                listOfXMLData.Add(content.PrimaryFile, string.Empty);

            // metoda pro vykonání
            SetDataObject dataObject = new SetDataObject() { Content = content, StartTime = DateTime.Now };
            // vlákno pro metodu
            Thread thread = new Thread(dataObject.SetData);
            dataObject.Thread = thread;

            if (!Threads.ContainsKey(content.PrimaryFile))
                Threads.Add(content.PrimaryFile, new List<Thread>());

            Threads[content.PrimaryFile].Add(thread);
            thread.Start();
        }

        /// <summary>
        /// Zastavení získávání dat pro ovladač stránky
        /// </summary>
        /// <param name="content">Obsah</param>
        public static void StopThreadsData(IViewContent content)
        {
            PropertyDialog frm = new PropertyDialog()
            {
                PropertiesDefalut = "Dialog.StopThreadsData",
                VisibleButtonPanel = false,
                Size = new System.Drawing.Size(500, 110),
                ControlBox = false
            };

            CWaiting stopThread = new CWaiting(content)
            {
                AutomaticallyClose = true,
                Dock = DockStyle.Fill,
                TextLabel = string.Join(" ", GResources.GetResourceText(29450581), GResources.GetResourceText(29450582) + "... ") //RC 29450582 : Čekejte prosím
            };
            stopThread.Parameters = new object[] { content.PrimaryFile, stopThread };
            stopThread.Method += OnStopThreadData;

            frm.AddControl(stopThread);
            frm.Text = GResources.GetResourceText(29450583); //RC 29450583 : Ukončení procesů
            frm.ShowDialog();
        }

        static void OnStopThreadData(params object[] parameters)
        {
            /*
            OpenedFile primaryFile = (OpenedFile)parameters[0];

            if (primaryFile != null && listOfXMLData.ContainsKey(primaryFile))
            {
                if (Threads.ContainsKey(primaryFile))
                {
                    while (Threads[primaryFile].Count != 0) { Thread.Sleep(100); }
                    Threads.Remove(primaryFile);
                    // počkáme na dokončení získávání dat
                    lock (primaryFile.CloseLock)
                    {
                        (parameters[1] as CWaiting).Message = "Konec";
                        //listOfXMLData.Remove(primaryFile);
                    };
                }
                primaryFile.FileData = primaryFile.Encoding.GetBytes(listOfXMLData[primaryFile]);
            }
            (parameters[1] as CWaiting).Message = "Konec";
            */
        }

        /// <summary>
        /// Přidání souboru do seznamu pozměněných souborů
        /// </summary>
        /// <param name="openedFile">Přidávaný soubor</param>
        internal static void AddIsChanged(OpenedFile openedFile)
        {
            if (!ChangedOpenedFiles.Contains(openedFile))
                ChangedOpenedFiles.Add(openedFile);
        }
        /// <summary>
        /// Získání aktuálních dat primárního souboru
        /// </summary>
        /// <param name="primaryFile">Soubor pro získání dat</param>
        /// <returns></returns>
        internal static string GetData(OpenedFile primaryFile)
        {
            return primaryFile != null && listOfXMLData.ContainsKey(primaryFile) ? listOfXMLData[primaryFile] : string.Empty;
        }
        /// <summary>
        /// Nastavení dat na počáteční hodnotu
        /// </summary>
        /// <param name="primaryFile"></param>
        /// <param name="content"></param>
        internal static void SetData(OpenedFile primaryFile, string content)
        {
            if (primaryFile == null)
                return;

            if (listOfXMLData.ContainsKey(primaryFile))
                listOfXMLData[primaryFile] = content;
            else listOfXMLData.Add(primaryFile, content);
        }

        #endregion

        /// <summary>
        /// Získání obsahu nového souboru *.ssr - soubor náhledu
        /// </summary>
        /// <returns></returns>
        internal static string GetNewSsrFile()
        {
            string parsedContent = StringParser.Parse(StringParser.Parse(GetContentByTemplate("SSR")));
            if (string.IsNullOrEmpty(parsedContent))
                MessageService.ShowError(GResources.GetResourceText(29450584)); //RC 29450584 : Šablona SSR souboru nebyla nalezená!
            return parsedContent;
        }

        /// <summary>
        /// Získání nového obsahu dle šablony. 
        /// Vrátí pouze obsah prvního souboru ze sekce Files šablony *.xft
        /// </summary>
        /// <param name="name">Název hledané šablony</param>
        /// <returns></returns>
        static string GetContentByTemplate(string name)
        {
            foreach (FileTemplate item in FileTemplate.FileTemplates)
                if (item.Name.Equals(name))
                    foreach (FileDescriptionTemplate newfile in item.FileDescriptionTemplates)
                        return newfile.ContentData != null ?
                            newfile.ContentData.ToString()
                            : newfile.Content;

            return string.Empty;
        }

    }
}
