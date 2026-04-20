//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.BaseXmlForm.cs                        </Name>
//    <Description> Základní form návrháře                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.XmlForms;
using Gordic.GFE.Parsers.Core;

namespace Gordic.Gfe.FormFiller.XmlForms
{
    /// <summary>
    /// Základní form návrháře
    /// </summary>
    abstract class BaseXmlForm : XmlForm
    {
        /// <summary>
        /// Nastavení XML čtečky
        /// </summary>
        protected override void SetupXmlLoader()
        {
            xmlLoader.StringValueFilter = new StringValueFilter();
            xmlLoader.PropertyValueCreator = new PropertyValueCreator();
        }
        /// <summary>
        /// Nastavení statusu dostupnosti objektu
        /// </summary>
        /// <param name="enabled">indikátor dostuúnosti</param>
        /// <param name="controlNames">jména nastavovaných ovladačů</param>
        public void SetEnabledStatus(bool enabled, params string[] controlNames)
        {
            foreach (string controlName in controlNames)
            {
                Control control = ControlDictionary[controlName];
                if (control == null)
                    MessageService.ShowErrorFormatted("{0} " + GResources.GetResourceText(29450067), controlName); //RC 29450067 : nenalezen!
                else
                    control.Enabled = enabled;
            }
        }
        /// <summary>
        /// Název sestavení
        /// </summary>
        protected string AssemblyName { get { return this.GetType().Assembly.GetName().Name; } }
    }
}
