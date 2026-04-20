//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.PadDescriptor.cs                       </Name>
//    <Description> Popis podložky                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-07                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Popis podložky
    /// </summary>
    public class PadDescriptor : IDisposable
    {
        readonly string @class;
        readonly string title;
        readonly string icon;
        string category;
        string shortcut;

        AddIn addIn;
        readonly Type padType;

        IPadContent padContent;
        bool padContentCreated;

        /// <summary>
        /// Vytvoření nové podložky z konfiguračního strom
        /// </summary>
        /// <param name="entity">Větev konfiguračního stromu.</param>
        public PadDescriptor(Entity entity)
        {
            addIn = entity.AddIn;
            shortcut = entity.Properties["shortcut"];
            category = entity.Properties["category"];
            icon = entity.Properties["icon"];
            title = entity.Properties["title"];
            @class = entity.Properties["class"];
        }

        /// <summary>
        /// Vytvoření nové instance třídy speciálního typu.
        /// </summary>
        /// <param name="padType">Typ podložky</param>
        /// <param name="title">Titulek okna</param>
        /// <param name="icon">Obrázek podložky</param>
        public PadDescriptor(Type padType, string title, string icon)
        {
            this.padType = padType;
            this.@class = padType.FullName;
            this.title = title;
            this.icon = icon;
            this.category = "none";
            this.shortcut = string.Empty;
        }

        /// <summary>
        /// Titulek dané podložy
        /// </summary>
        public string Title { get { return title; } }

        /// <summary>
        /// Název obrázku ze zdroju, pro danou podložku.
        /// Pokud prázdná hodnota, pak podložka nemá ikonku.
        /// </summary>
        public string Icon { get { return icon; } }

        /// <summary>
        /// Kategorije podložky (kvůli položkam menu)
        /// </summary>
        public string Category
        {
            get { return category; }
            set
            {
                category = value ?? throw new ArgumentNullException("value");
            }
        }

        /// <summary>
        /// Klávesové zkratky pro zobrazení položek menu.
        /// </summary>
        public string Shortcut
        {
            get { return shortcut; }
            set
            {
                shortcut = value ?? throw new ArgumentNullException("value");
            }
        }

        /// <summary>
        /// Název třídy podložky
        /// </summary>
        public string Class { get { return @class; } }

        /// <summary>
        /// Indikuje stav, kdy daná položka má focus
        /// </summary>
        public bool HasFocus { get { return (padContent != null) ? padContent.Control.ContainsFocus : false; } }

        /// <summary>
        /// Obsah záložky
        /// </summary>
        public IPadContent PadContent
        {
            get
            {
                CreatePad();
                return padContent;
            }
        }

        /// <summary>
        /// Uvolnění podložky
        /// </summary>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                if (padContent != null)
                {
                    padContent.Dispose();
                    padContent = null;
                }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        ~PadDescriptor() { Dispose(false); }
        /// <summary>
        /// Překreslení obsahu podložky
        /// </summary>
        public void RedrawContent()
        {
            if (padContent != null)
                padContent.RedrawContent();
        }

        /// <summary>
        /// Vytvoření podložky
        /// </summary>
        public void CreatePad()
        {
            if (!padContentCreated)
            {
                padContentCreated = true;
                try
                {
                    if (addIn != null)
                    {
                        LoggingService.DebugFormatted(GResources.GetResourceText(29450410) + " '{0}'...", Class.Split('.').Last()); //RC 29450410 : vytvoření záložky/okna
                        padContent = (IPadContent)addIn.CreateObject(Class);
                    }
                    else
                        padContent = (IPadContent)Activator.CreateInstance(padType);
                }
                catch (Exception ex)
                {
                    MessageService.ShowError(ex, string.Format(GResources.GetResourceText(29450411) + " '{0}'!", Class)); //RC 29450411 : Chyba vytvoření nové instance záložky/okna
                }
            }
        }

        /// <summary>
        /// Přenesení podložky na popředí
        /// </summary>
        /// <param name="layout">Rozmístní plochy</param>
        public void BringPadToFront(IDesktopLayout layout)
        {
            CreatePad();
            if (padContent == null) return;
            if (!layout.IsVisible(this))
                layout.ShowPad(this);
            layout.ActivatePad(this);
        }
    }
}
