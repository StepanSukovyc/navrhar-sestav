//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlForm.cs                               </Name>
//    <Description> Základní XML generovaný form.                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Windows.Forms;
using System.Reflection;
using System.IO;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.XmlForms
{
    /// <summary>
    /// Základní XML generovaný form.
    /// </summary>
    public abstract class XmlForm : Form
    {
        /// <summary>
        /// čtečka xml souborů
        /// </summary>
        protected XmlLoader xmlLoader;

        /// <summary>
        /// ControlDictionary pro tento Form.
        /// </summary>
        public Dictionary<string, Control> ControlDictionary { get => xmlLoader.ControlDictionary; }

        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public XmlForm() { }

        /// <summary>
        /// Získání ovladač formu
        /// </summary>
        /// <typeparam name="T">typ ovladače</typeparam>
        /// <param name="name">název</param>
        /// <returns></returns>
        public T Get<T>(string name) where T : System.Windows.Forms.Control
        {
            return xmlLoader.Get<T>(name);
        }
        /// <summary>
        /// Nastavení objektu ze zdroju
        /// </summary>
        /// <param name="resourceName">název zdroje</param>
        protected void SetupFromXmlResource(string resourceName)
        {
            Assembly caller = Assembly.GetCallingAssembly();
            resourceName = "Resources." + resourceName;
            SetupFromXmlRes(caller.GetManifestResourceStream(resourceName));
        }
        /// <summary>
        /// Inicializace ze čtečky
        /// </summary>
        /// <param name="zdroj">Čtečka</param>
        protected void SetupFromXmlRes(dynamic zdroj)
        {
            if (zdroj == null)
                throw new System.ArgumentNullException(GResources.GetResourceText(29450418)); //RC 29450418 : Proud je prázdný!

            SuspendLayout();
            xmlLoader = new XmlLoader();
            SetupXmlLoader();
            if (zdroj != null)
                xmlLoader.LoadObjectFromRes(this, zdroj);
            ResumeLayout(false);
        }

        /// <summary>
        /// Načtení definice objektu ze zdroje
        /// </summary>
        /// <param name="formname">Název zdroje definice objektů</param>
        /// <param name="_asm">Aktuální Assembla</param>
        protected void SetupLocalizedXFRM(string formname, Assembly _asm = null)
        {
            Assembly asm = _asm != null ? _asm : this.GetType().Assembly;
            using (Stream s = asm.GetManifestResourceStream(formname))
            using (StreamReader r = new StreamReader(s))
                SetupFromXmlRes(GResLocalizer.Localize(r, asm));
        }
        /// <summary>
        /// Nastavení XML čtečky
        /// </summary>
        protected virtual void SetupXmlLoader() { }

        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(XmlForm));
            this.SuspendLayout();
            // 
            // XmlForm
            // 
            resources.ApplyResources(this, "$this");
            this.Name = "XmlForm";
            this.ResumeLayout(false);

        }

    }
}
