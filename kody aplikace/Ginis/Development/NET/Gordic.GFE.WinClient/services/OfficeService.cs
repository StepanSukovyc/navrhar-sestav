//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.RtfService.cs                          </Name>
//    <Description> Služba pro práci s RTF sestavy                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-06-11                                                  </Created>
//  </FileHeader>

using System;
using Microsoft.Office.Core;
using Word = Microsoft.Office.Interop.Word;
using Excel = Microsoft.Office.Interop.Excel;
using System.Reflection;
using Gordic.General;
using System.Threading;
using System.IO;
using System.Runtime.InteropServices;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Service
{
    /// <summary>
    /// Služba pro práci s RTF sestavy
    /// </summary>
    static partial class OfficeService
    {
        static _CommandBarButtonEvents_ClickEventHandler eventHandler;
        static Word.Application WordApplication;
        static Object missing = Missing.Value;
        static Word.Template customTemplate;
        static string CommandBarName = "Form Fields";// Display Fields, Forms, Frames, Text, Frame Properties, Field Auto Text
        static bool menuItemCreated;

        static bool RemoveExistingMenuItem()
        {
            try
            {
                CommandBar contextMenu = WordApplication.CommandBars[CommandBarName];
                WordApplication.CustomizationContext = customTemplate;

                CommandBarButton control = (CommandBarButton)contextMenu.FindControl(MsoControlType.msoControlButton, missing, "PROPERTY_TAG", true, true);

                if (control != null)
                {
                    control.Click -= eventHandler;
                    control.Delete();
                    contextMenu.Reset();
                    Thread.Sleep(100);
                }
            }
            catch
            {
                menuItemCreated = true;
                return false;
            }
            menuItemCreated = false;
            return true;
        }

        static void GetCustomTemplate()
        {            
            object TemplatePath = WordApplication.NormalTemplate.FullName;
            try
            {
                customTemplate = WordApplication.Templates[TemplatePath];
            }
            catch (COMException)
            {
                TemplatePath = WordApplication.ActiveDocument.Path;
                try
                {
                    WordApplication.AddIns.Add((string)TemplatePath, missing);
                    customTemplate = WordApplication.Templates[TemplatePath];
                }
                catch { }
            }
        }

        static void AddMenuItem()
        {
            WordApplication.CustomizationContext = customTemplate;
            MsoControlType menuItem = MsoControlType.msoControlButton;
            CommandBarButton CommandBarButton = (CommandBarButton)WordApplication.CommandBars[CommandBarName].Controls.Add(menuItem, missing, missing, missing, true);
            try
            {
                CommandBarButton.Style = MsoButtonStyle.msoButtonIconAndCaption;
                CommandBarButton.Caption = GResources.GetResourceText(29450439); //RC 29450439 : Vlastnosti výběru
                CommandBarButton.Tag = "PROPERTY_TAG";

                CommandBarButton.Click += eventHandler;
                CommandBarButton.FaceId = 222;
                CommandBarButton.BeginGroup = true;
                menuItemCreated = true;
            }
            catch { /*CommandBarButton.Click -= eventHandler; */}
            //customTemplate.Saved = true;
        }

        /// <summary>
        /// Vytvoření nové šablony pro RTF sestavu
        /// </summary>
        /// <param name="fileName">Název vytvářeného souboru</param>
        /// <param name="tempDirPath">Cesta k adresáři souboru</param>
        /// <returns></returns>
        internal static string CreateNewWordDocument(string fileName, string tempDirPath)
        {
            string filename = tempDirPath + "\\" + fileName;
            try
            {
                Word.Application application = new Word.Application();
                Word.Document document = application.Documents.Add(missing, missing, missing, false);
                document.SaveAs(filename);
                Thread.Sleep(100);

                // pokud je otevřeno okno s instancí WORD dokumentu, pak ho zavřeme
                if (document != null)
                    (document as Word._Document).Close(ref missing, ref missing, ref missing);

                // pokud aplikace Office neobsahuje žádné okno, pak jí ukončíme
                if (application != null && application.Documents.Count == 0)
                    (application as Word._Application).Quit(ref missing, ref missing, ref missing);
            }
            catch { }

            return File.Exists(filename) ? filename : null;
        }

        /// <summary>
        /// Vytvoření nové šablony pro RTF sestavu
        /// </summary>
        /// <param name="fileName">Název vytvářeného souboru</param>
        /// <param name="tempDirPath">Cesta k adresáři souboru</param>
        /// <returns></returns>
        internal static string CreateNewExcelDocument(string fileName, string tempDirPath)
        {
            string filename = tempDirPath + "\\" + fileName;
            try
            {
                Excel.Application application = new Excel.Application();
                Excel.Workbook document = application.Workbooks.Add(missing);
                document.SaveAs(filename);
                Thread.Sleep(100);

                // pokud je otevřeno okno s instancí WORD dokumentu, pak ho zavřeme
                if (document != null)
                    (document as Excel._Workbook).Close();

                // pokud aplikace Office neobsahuje žádné okno, pak jí ukončíme
                if (application != null && application.Workbooks.Count == 0)
                    (application as Excel._Application).Quit();
            }
            catch { }

            return File.Exists(filename) ? filename : null;
        }


        /// <summary>
        /// Spuštění doplňku
        /// </summary>
        /// <param name="wAppl">Instance aplikace Word</param>
        /// <param name="commandbarname">Typ command baru</param>
        /// <param name="content">Obsah</param>
        public static void ThisAddInStartup(IViewContent content, Word.Application wAppl, string commandbarname)
        {
            try
            {
                eventHandler = new _CommandBarButtonEvents_ClickEventHandler((CommandBarButton cmdBarbutton, ref bool cancel) =>
                {
                    // musí být - jinak Word ne vždy zobrazí vlastnosti
                    Thread.Sleep(100);
                    Thread thread = new Thread(() => { if (content is IPropertyHandler) (content as IPropertyHandler).ShowProperty(); });
                    thread.SetApartmentState(ApartmentState.STA);
                    thread.Priority = ThreadPriority.AboveNormal;
                    thread.Start();
                });

                WordApplication = wAppl;
                CommandBarName = commandbarname;
                GetCustomTemplate();
                if (RemoveExistingMenuItem() || !menuItemCreated)
                    AddMenuItem();
            }
            catch (Exception exc)
            {
                MessageService.ShowError(exc);
            }
        }

        internal static void ThisAddInStartup(IViewContent viewContent, Excel.Application application, string p)
        {
            //    //try
            //    //{
            //    //    eventHandler = new _CommandBarButtonEvents_ClickEventHandler((CommandBarButton cmdBarbutton, ref bool cancel) =>
            //    //    {
            //    //        Thread thread = new Thread(() => { if (content is IOfficeFormat) (content as IOfficeFormat).Property(); });
            //    //        thread.SetApartmentState(ApartmentState.STA);
            //    //        thread.Priority = ThreadPriority.AboveNormal;
            //    //        thread.Start();
            //    //    });

            //    //    ExcelApplication = Application;
            //    //    CommandBarName = commandbarname;

            //    //    if (!ExistsExcelMenuItem())
            //    //        AddExcelMenuItem();
            //    //}
            //    //catch (Exception exception)
            //    //{
            //    //    MessageService.ShowError("změna hodnoty" + exception.Message); //RC 29450649 : Chyba: 
            //    //}
        }
    }
}
