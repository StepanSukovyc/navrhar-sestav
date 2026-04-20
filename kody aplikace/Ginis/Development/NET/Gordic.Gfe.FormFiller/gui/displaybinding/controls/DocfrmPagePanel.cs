////  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
////    <Name>        Gordic.Gfe.FormFiller.DocfrmPagePanel.cs                    </Name>
////    <Description> Pagepanel GRF sestav                                        </Description>
////    <Author>      Mgr. Stepan Sukovych                                        </Author>
////    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
////    <Created>     2013-02-13                                                  </Created>
////  </FileHeader>

//using System;
//using System.Collections.Generic;
//using System.ComponentModel;
//using System.ComponentModel.Design;
//using System.Drawing;
//using System.Linq;
//using System.Text;
//using System.Windows.Forms;
//using Gordic.General;
//using Gordic.Gfe.FormFiller.StructureView;
//using Gordic.GFE.Parsers;
//using Gordic.GFE.Parsers.Core;
//using Gordic.GFE.Parsers.Dom;
//using Gordic.GFE.Parsers.Gui;
//using Gordic.GFE.Parsers.Hosting;
//using Gordic.GFE.Parsers.Services;
//using Gordic.GFE.Parsers.Utils;

//namespace Gordic.Gfe.FormFiller.Gui
//{
//    /// <summary>
//    /// Pagepanel GRF sestav.
//    /// Plocha na kterou se kreslí stránky.
//    /// </summary>
//    class DocfrmPagePanel : FillerPagePanel
//    {
//        #region AbstractPagePanel
//        /// <summary>
//        /// Jednotka struktury
//        /// </summary>
//        public override GFEStructure Structure { get { return (_View as DocfrmViewContent).Structure; } }
//        /// <summary>
//        /// Nalezení předchozího editovatelného objektu
//        /// </summary>
//        /// <returns>True - objekt nalezen</returns>
//        public override bool FindPreviousControl()
//        {
//            if (SimpleDesktop.Desktop.ActiveViewContent != _View)
//                return false;

//            return base.FindPreviousControl();
//        }
//        /// <summary>
//        /// Nalezení dalšího editovatelného objektu
//        /// </summary>
//        /// <returns>TRUE-objekt nalezen</returns>
//        public override bool FindNextControl()
//        {
//            if (SimpleDesktop.Desktop.ActiveViewContent != _View)
//                return false;

//            return base.FindNextControl();
//        }
//        #endregion

//        /// <summary>
//        /// Přidání objektu do seznamu vybraných
//        /// </summary>
//        /// <param name="selected">Přidávaný objekt</param>
//        /// <param name="type">Typ výběru</param>
//        protected override void SetSelectedComponents(IComponent selected, SelectionTypes type)
//        {
//            // pokud objekt neexistuje, 
//            // nebo neexistuje služba pro práci s vybranými objekty,
//            // pak není co řešit
//            if (selected == null || !(_View is IHost))
//                return;

//            (_View as IHost).ServiceSelection.SetSelectedComponents(selected, type);
//        }
//        /// <summary>
//        /// Uvolnění objektu
//        /// </summary>
//        /// <param name="disposing">indikuje, že objekt ve stavu uvolnění</param>
//        protected override void Dispose(bool disposing)
//        {
//            if (ServiceSelection != null)
//            {
//                ServiceSelection.SelectionChanged -= ServiceSelectionSelectionChanged;
//                ServiceSelection.SelectionChanging -= ServiceSelectionSelectionChanging;
//            }
//            base.Dispose(disposing);
//        }

//        /// <summary>
//        /// Dokument panelu
//        /// </summary>
//        public DocfrmFormationDocument Document { get; set; }
//        /// <summary>
//        /// Kolekce stránek
//        /// </summary>
//        public override IPages Pages { get { return Document != null ? Document.Pages : null; } }

//        /// <summary>
//        /// Konstruktor třídy
//        /// </summary>
//        private DocfrmPagePanel()
//            : base()
//        {
//        }

//        /// <summary>
//        /// Konstruktor třídy
//        /// </summary>
//        /// <param name="view">pohled na obsah, kterému patří daný panel</param>
//        public DocfrmPagePanel(IViewContent view)
//            : base(view)
//        {
//            this._View = (DocfrmViewContent)view;
//            if (ServiceSelection != null)
//            {
//                ServiceSelection.SelectionChanging += ServiceSelectionSelectionChanging;
//                ServiceSelection.SelectionChanged += ServiceSelectionSelectionChanged;
//            }
//        }

//        void ServiceSelectionSelectionChanging(object sender, EventArgs e)
//        {
//            if (EditControl != null)
//                RemoveEditControl(true);
//        }
//        void ServiceSelectionSelectionChanged(object sender, EventArgs e) { ActivateEditControl(); }
//    }
//}
