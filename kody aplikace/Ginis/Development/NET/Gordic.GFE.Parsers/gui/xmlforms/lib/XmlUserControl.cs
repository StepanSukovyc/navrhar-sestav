//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.XmlUserControl.cs                      </Name>
//    <Description> Základní XML ovladač.                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-16                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Windows.Forms;
using System.Reflection;
using System.IO;
using Gordic.General;
using System.Drawing;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.XmlForms
{
    /// <summary>
    /// Základní XML ovladač.
    /// </summary>
    public abstract class XmlUserControl : UserControl
    {
        /// <summary>
        /// čtečka xml souboru obsahujících popis formu
        /// </summary>
        protected XmlLoader xmlLoader;

        /// <summary>
        /// Slovnik pro tento ovladač.
        /// </summary>
        public Dictionary<string, Control> ControlDictionary { get { return xmlLoader?.ControlDictionary; } }

        /// <summary>
        /// Ikonka ovladače.
        /// </summary>
        public Icon Icon { get { return xmlLoader?.Icon; } }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public XmlUserControl() { }

        /// <summary>
        /// Získání ovladače dle názvu
        /// </summary>
        /// <typeparam name="T">typ </typeparam>
        /// <param name="name">název</param>
        /// <returns></returns>
        public T Get<T>(string name) where T : System.Windows.Forms.Control
        {
            return xmlLoader.Get<T>(name);
        }

        /// <summary>
        /// Inicializace ze zdroju
        /// </summary>
        /// <param name="resourceName">název zdroju</param>
        protected void SetupFromXmlResource(string resourceName)
        {
            Assembly caller = Assembly.GetCallingAssembly();
            resourceName = "Resources." + resourceName;
            SetupFromXmlRes(caller.GetManifestResourceStream(resourceName));
        }
        /// <summary>
        /// Inicializace z proudu
        /// </summary>
        /// <param name="res">proud</param>
        protected void SetupFromXmlRes(dynamic res)
        {
            if (res == null)
                throw new System.ArgumentNullException(GResources.GetResourceText(29450418)); //RC 29450418 : Proud je prázdný!

            SuspendLayout();
            xmlLoader = new XmlLoader();
            SetupXmlLoader();
            if (res != null)
                xmlLoader.LoadObjectFromRes(this, res);
            ResumeLayout(false);
        }
        /// <summary>
        /// Inicializace čtečky
        /// </summary>
        protected virtual void SetupXmlLoader() { }

        /// <summary>
        /// Načtení definice objektu ze zdroje
        /// </summary>
        /// <param name="formname">Název zdroje definice objektů</param>
        protected void SetupLocalizedXFRM(string formname)
        {
            Assembly asm = this.GetType().Assembly;
            using (Stream s = asm.GetManifestResourceStream(formname))
            using (StreamReader r = new StreamReader(s))
                SetupFromXmlRes(GResLocalizer.Localize(r, asm));
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // XmlUserControl
            // 
            this.Name = "XmlUserControl";
            this.ResumeLayout(false);

        }
    }
}
