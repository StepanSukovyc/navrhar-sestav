//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.BaseXmlForm.cs              </Name>
//    <Description> Základní form návrháře                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using System.Reflection;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.XmlForms
{
    /// <summary>
    /// Základní form návrháře
    /// </summary>
    public abstract class BaseXmlForm : XmlForm
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
                    MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450419), "{0}", GResources.GetResourceText(29450143)), controlName); //RC 29450419 : Ovladač
                else
                    control.Enabled = enabled;
            }
        }

        /// <summary>
        /// Aktuální sestavení
        /// </summary>
        protected Assembly Assembly { get => ProcessService.Assembly; }
    }
}
