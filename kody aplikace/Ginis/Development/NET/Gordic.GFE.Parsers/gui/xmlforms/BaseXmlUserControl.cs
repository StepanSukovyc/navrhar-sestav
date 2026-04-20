//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.BaseReportDesignerUserControl.cs         </Name>
//    <Description> Základní třída ovladačů Návrháře sestav                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.XmlForms
{
    /// <summary>
    /// Základní třída ovladačů Návrháře sestav
    /// </summary>
	public abstract class BaseXmlUserControl : XmlUserControl
	{
		/// <summary>
		/// Načtení
		/// </summary>
		protected override void SetupXmlLoader()
		{
			xmlLoader.StringValueFilter    = new StringValueFilter();
            xmlLoader.PropertyValueCreator = new PropertyValueCreator();
		}
        /// <summary>
        /// Nastavení dostupnosti ovladačů
        /// </summary>
        /// <param name="enabled">dostupnst</param>
        /// <param name="controlNames">název ovladačů</param>
        public void SetEnabledStatus(bool enabled, params string[] controlNames)
        {
            foreach (string controlName in controlNames)
            {
                Control control = ControlDictionary[controlName];
                if (control == null)
                    MessageService.ShowErrorFormatted("{0}" + GResources.GetResourceText(29450403), controlName); //RC 29450403 : nenalezen!
                else
                    control.Enabled = enabled;
            }
        }
        
        /// <summary>
        /// Nastavení viditelných ovladačů
        /// </summary>
        /// <param name="visible">viditelnost</param>
        /// <param name="controlNames">název ovladačů</param>
        public void SetVisibleStatus(bool visible, params string[] controlNames)
        {
            foreach (string controlName in controlNames)
            {
                Control control = ControlDictionary[controlName];
                if (control == null)
                    MessageService.ShowErrorFormatted("{0}" + GResources.GetResourceText(29450403), controlName); //RC 29450403 : nenalezen!
                else
                    control.Visible = visible;
            }
        }
	}
}
