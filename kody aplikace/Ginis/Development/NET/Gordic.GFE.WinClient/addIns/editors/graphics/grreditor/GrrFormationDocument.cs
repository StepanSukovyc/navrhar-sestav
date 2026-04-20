//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GrrFormationDocument.cs                </Name>
//    <Description> Jednotka GRR sestavy                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.InfoSectionView;
using Gordic.GFE.WinClient.Services;
using Gordic.General;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jednotka GRR sestavy
    /// </summary>
    class GrrFormationDocument : GraphicFormationDocument
    {
        #region AbstractFormationDocument
        /// <summary>
        /// načtení stránek z formátu <paramref name="format"/>.
        /// </summary>
        /// <param name="format">formát sestavy</param>
        public override void LoadPages(GFEFormat format)
        {
            base.LoadPages(format);
            Pages.Parent = document.Control as IPagePanel;
            var page = new GrrPage(Pages);
            page.Initialize();
            Pages.Add(page);
        }
        /// <summary>
        /// Načtení XML.
        /// </summary>
        /// <param name="xml">XML obsah</param>
        public override void Load(string xml)
        {
            base.Load(xml);
            try
            {
                if (document.PrimaryFile != null)
                {
                    // před načtením uvolníme seznam
                    if (Pages != null)
                        Pages.Clear();

                    // načteme vlastností dokumentu
                    _FormationProperty.LoadContent(this, document.PrimaryFile.Encoding, xml, document.PrimaryFile.FileName);
                    _FormationProperty.RefreshContent();
                    OnFormationLoaded();
                }
            }
            catch (Exception ex)
            {
                LoggingService.Debug(ex.ToString());
                document.ShowErrorMessage(ex.Message);
            }
        }
        #endregion        

        IFormationDocumentProperty formProp;
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="document">pohled na dokument</param>
        public GrrFormationDocument(IDocumentView document)
            : base(document)
        {
        }

        /// <summary>
        /// Vlastnosti dokumentu
        /// </summary>
        public override IFormationDocumentProperty _FormationProperty
        {
            get
            {
                if (formProp == null)
                    if (CompilationService.Units[document.PrimaryFile] is CompilationUnit cu)
                    {
                        if (cu.FormationProperty == null)
                            cu.FormationProperty = new GrrFormationProperty();
                        cu.CompileMethod += CompileMethod;
                        formProp = cu.FormationProperty;
                    }

                return formProp;
            }
        }

        /// <summary>
        /// Generování alf kódu
        /// </summary>
        /// <param name="unt">aktuální unit</param>
        /// <returns></returns>
        string CompileMethod(dynamic unt)
        {
            if (!(CompilationService.Units[document.PrimaryFile] is CompilationUnit unit))
                throw new GException(GResources.GetResourceText(29450001)); //RC 29450001 : Jednotka není připravená!

            // uvolníme seznam obrázků z předchozího uložení
            ImageService.ClearSaved(unit.OpenedFile);

            //Načtení ze sestavy
            XmlDocumentPosition xmlDoc = new XmlDocumentPosition();
            xmlDoc.Selected.Clear();

            //<?xml version="1.0" encoding="utf-8"?>
            XmlDeclaration xmlDecl = xmlDoc.CreateXmlDeclaration(ReportDesignerProperties.Instance.Version, unit.OpenedFile.Encoding.WebName, null);
            xmlDoc.AppendChild(xmlDecl);

            // uložení globálního komentáře před sekci formát
            XmlDocumentService.SetChangesComments(formProp.Comments, xmlDoc);

            // z obsahu převezmene Info sekci a template sekci
            XmlDocument xmlOldDoc = new XmlDocument();
            xmlOldDoc.LoadXml(unit.FileContent.Content);
            unit.NamespaceURI = xmlOldDoc.DocumentElement.NamespaceURI;

            //<format type="grr" xmlns="http://www.gordic.cz/TR/alf/1.4/">
            XmlElement xmlFormat = xmlDoc.CreateElement("format", unit.NamespaceURI);
            xmlFormat.SetAttribute("type", "grr");

            // zkopírujemen sekcí INFO
            if (InfoSectionViewPad.Instance == null
                || !InfoSectionViewPad.SetInfoSection(xmlDoc, xmlFormat, unit.OpenedFile))
                XmlDocumentService.CopyInfoSection(xmlOldDoc, xmlFormat, xmlDoc);

            // uložení dat do sekce PAPER-SETTING
            XmlDocumentService.SetPaperSetting(Pages, xmlFormat, unit.NamespaceURI);

            // uložíme globální komentáře
            XmlDocumentService.SetGlobalScripts(_FormationProperty.GlobalScripts, xmlFormat);
            formProp.SetData(ref xmlFormat, unit);
            if (!unit.OpenedFile.CancelSaving)
            {
                xmlDoc.AppendChild(xmlFormat);

                unit.ZipResources = ImageService.GetZippedImage(unit.OpenedFile);
                //unit.IsCompile = true;
                unit.XmlDocPosition = xmlDoc;

                return xmlDoc.OuterXml;
            }
            else
                throw new GException(string.Join(" ", GResources.GetResourceText(29450003), GResources.GetResourceText(29450004))); //RC 29450004 : Zřejmě chybí datová struktura!
        }

        /// <summary>
        /// Aktualizace polí dle struktury v záložce struktury
        /// </summary>
        internal void RefreshByStructure()
        {
            if (Pages != null)
                foreach (var item in Pages)
                    if (item is IItemContainer)
                        (item as IItemContainer).RefreshByStructure();
        }
    }
}
