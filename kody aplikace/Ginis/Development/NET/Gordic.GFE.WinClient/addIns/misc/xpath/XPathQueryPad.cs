//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XPathQueryPad.cs                       </Name>
//    <Description> Podložka XPath příkazů                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient.XPathQuery
{
    /// <summary>
    /// Podložka XPath příkazů
    /// </summary>
    class XPathQueryPad : AbstractPadContent
    {
        /// <summary>
        /// Klíč k valstnostem
        /// </summary>
        public const string XPathQueryControlProperties = "XPathQueryControl.Options";

        XPathQueryControl xPathQueryControl;
        static XPathQueryPad instance;
        /// <summary>
        /// Vytvoření podložky
        /// </summary>
        public XPathQueryPad()
        {
            xPathQueryControl = new XPathQueryControl();
            SimpleDesktop.Desktop.ActiveViewContentChanged += ActiveViewContentChanged;
            Property properties = PropertyService.Get(XPathQueryControlProperties, new Property());
            xPathQueryControl.SetMemento(properties);
            instance = this;
        }
        /// <summary>
        /// Instance podložky
        /// </summary>
        public static XPathQueryPad Instance { get { return instance; } }

        /// <summary>
        /// <see cref="System.Windows.Forms.Control"/> prezentující danou podložku.
        /// </summary>
        public override Control Control { get { return xPathQueryControl; } }
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                SimpleDesktop.Desktop.ActiveViewContentChanged -= ActiveViewContentChanged;
                if (xPathQueryControl != null && !string.IsNullOrEmpty(XPathQueryControlProperties))
                {
                    Property properties = xPathQueryControl.CreateMemento();
                    PropertyService.Set(XPathQueryControlProperties, properties);
                    xPathQueryControl.Dispose();
                }
            }
            base.Dispose(disposing);
        }
        /// <summary>
        /// Odstranění zvýraznění XPath
        /// </summary>
        public void RemoveXPathHighlighting()
        {
            xPathQueryControl.RemoveXPathNodeTextMarkers();
        }

        void ActiveViewContentChanged(object source, EventArgs e)
        {
            xPathQueryControl.ActiveWindowChanged();
        }
    }
}
