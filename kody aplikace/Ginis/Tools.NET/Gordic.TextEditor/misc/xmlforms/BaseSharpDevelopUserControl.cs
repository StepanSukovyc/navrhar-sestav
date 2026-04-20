// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System.Windows.Forms;

namespace Gordic.TextEditor.Misc.XmlForms
{
    public abstract class BaseSharpDevelopUserControl : XmlUserControl
    {
        //		public BaseSharpDevelopUserControl(string fileName) : base(fileName)
        //		{
        //		}
        public BaseSharpDevelopUserControl()
        {
        }

        protected override void SetupXmlLoader()
        {
            xmlLoader.StringValueFilter = new SharpDevelopStringValueFilter();
            xmlLoader.PropertyValueCreator = new SharpDevelopPropertyValueCreator();
        }

        public void SetEnabledStatus(bool enabled, params string[] controlNames)
        {
            foreach (string controlName in controlNames)
            {
                Control control = ControlDictionary[controlName];
                if (control == null)
                {
                    MessageBox.Show(controlName + " not found!");
                }
                else
                {
                    control.Enabled = enabled;
                }
            }
        }

    }
}
