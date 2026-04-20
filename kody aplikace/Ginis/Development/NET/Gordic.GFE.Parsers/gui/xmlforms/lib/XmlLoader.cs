//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlLoader.cs                             </Name>
//    <Description> Třída je schopna vygenerovat GUI definici z XML souboru     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Collections;
using System.Text.RegularExpressions;
using Gordic.General;
using System.Xml;
using System.IO;
using System.Reflection;
using System.Drawing;
using System.ComponentModel;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.XmlForms
{
    /// <summary>
    /// Třída je schopna vygenerovat GUI definici z XML souboru
    /// </summary>
    public class XmlLoader
    {
        readonly Dictionary<string, Control> controlDictionary = new Dictionary<string, Control>();
        object customizationObject;

        // nutné pro generování accept/cancel button/tooltips
        Form mainForm = null;

        Hashtable tooltips = new Hashtable();
        string acceptButtonName = String.Empty;
        string cancelButtonName = String.Empty;
        Icon icon = null;

        IObjectCreator objectCreator = new DefaultObjectCreator();

        readonly static Regex propertySet = new Regex(@"(?<Property>[\w]+)\s*=\s*(?<Value>[\w\d]+)", RegexOptions.Compiled);

        /// <summary>
        /// Získání slovnika všech ovladačů pro tento XmlLoader.
        /// </summary>
        public Dictionary<string, Control> ControlDictionary { get { return controlDictionary; } }
        /// <summary>
        /// Ikonka objektu
        /// </summary>
        public Icon Icon { get { return icon; } }

        /// <summary>
        /// Filter řetězců.
        /// </summary>
        public IStringValueFilter StringValueFilter { get; set; }

        /// <summary>
        /// IObjectCreator nemůže být <code>null</code>.
        /// </summary>
        public IObjectCreator ObjectCreator
        {
            get { return objectCreator; }
            set
            {
                objectCreator = value ?? throw new System.ArgumentNullException();
            }
        }

        /// <summary>
        /// IPropertyValueCreator - může být <code>null</code>.
        /// </summary>
        public IPropertyValueCreator PropertyValueCreator { get; set; }


        /// <summary>
        /// Vytvoření nové instance třídy.
        /// </summary>
        public XmlLoader() { }

        /// <summary>
        /// Získání ovladače dle jména
        /// </summary>
        /// <typeparam name="T">Typ ovladače</typeparam>
        /// <param name="name">Název ovladače</param>
        /// <returns></returns>
        public T Get<T>(string name) where T : System.Windows.Forms.Control
        {
            string key = name + typeof(T).Name;
            if (!ControlDictionary.ContainsKey(key))
                throw new System.ArgumentException(string.Format(string.Join(" ", GResources.GetResourceText(29450419), "'{0}'", GResources.GetResourceText(29450143)), key), "name"); //RC 29450419 : Ovladač

            return ControlDictionary[key] as T;
        }

        #region Load/Create functions
        /// <summary>
        /// Načtení XML definition z fileName.
        /// </summary>
        /// <param name="fileName">
        /// Název souboru pro načtení.
        /// </param>
        public object CreateObjectFromFileDefinition(string fileName)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(fileName);

            XmlElement el = doc.DocumentElement;

            if (doc.DocumentElement.Attributes["version"] != null)
                el = (XmlElement)doc.DocumentElement.ChildNodes[0];

            customizationObject = objectCreator.CreateObject(XmlConvert.DecodeName(el.Name), el);

            SetUpObject(customizationObject, el);
            return customizationObject;
        }

        /// <summary>
        /// Načtení XML definice z XML definice.
        /// </summary>
        /// <param name="xmlContent">Obsah y definici</param>
        public object CreateObjectFromXmlDefinition(string xmlContent)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xmlContent);

            XmlElement el = doc.DocumentElement;
            if (doc.DocumentElement.Attributes["version"] != null)
                el = (XmlElement)doc.DocumentElement.ChildNodes[0];

            customizationObject = objectCreator.CreateObject(XmlConvert.DecodeName(el.Name), el);

            SetUpObject(customizationObject, el);
            return customizationObject;
        }

        /// <summary>
        /// načtení XML definice ze souboru.
        /// </summary>
        /// <param name="customizationObject">
        /// Přizpůsobení objektu.
        /// </param>
        /// <param name="fileName">
        /// Název souboru s XML definici objektu
        /// </param>
        public void LoadObjectFromFileDefinition(object customizationObject, string fileName)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(fileName);
            LoadObjectFromXmlDocument(customizationObject, doc);
        }
        /// <summary>
        /// Načtení objektu z proudu
        /// </summary>
        /// <param name="customizationObject">Přizpůsobení objektu</param>
        /// <param name="_res">Proud ovsahující definici objektu</param>
        public void LoadObjectFromRes(object customizationObject, dynamic _res)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(_res);
            LoadObjectFromXmlDocument(customizationObject, doc);
        }

        /// <summary>
        /// Načtení objektu z XML dokumentu
        /// </summary>
        /// <param name="customizationObject">Přizpůsobení objektu</param>
        /// <param name="doc">dokument pro načtení</param>
        public void LoadObjectFromXmlDocument(object customizationObject, XmlDocument doc)
        {
            this.customizationObject = customizationObject;

            XmlElement el = doc.DocumentElement;
            if (doc.DocumentElement.Attributes["version"] != null)
                el = (XmlElement)doc.DocumentElement.ChildNodes[0];

            SetUpObject(customizationObject, el);

            // nastavení Accept & Cancel tlačítek
            if (customizationObject is Form mainForm)
            {
                if (acceptButtonName != null && acceptButtonName.Length > 0)
                    mainForm.AcceptButton = (Button)controlDictionary[acceptButtonName];
                if (cancelButtonName != null && cancelButtonName.Length > 0)
                    mainForm.CancelButton = (Button)controlDictionary[cancelButtonName];
                if (icon != null)
                    mainForm.Icon = icon;
            }
            // nastavení Tooltips...
            if (tooltips.Count > 0)
            {
                ToolTip toolTip = new ToolTip();
                foreach (DictionaryEntry entry in tooltips)
                    toolTip.SetToolTip((Control)entry.Key, entry.Value.ToString());
            }
        }

        /// <summary>
        /// Načtení XML definice z XML definice
        /// </summary>
        /// <param name="xmlContent">Obsah XML definice</param>
        public void LoadObjectFromXmlDefinition(string xmlContent)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xmlContent);

            XmlElement el = doc.DocumentElement;
            if (doc.DocumentElement.Attributes["version"] != null)
                el = (XmlElement)doc.DocumentElement.ChildNodes[0];
            SetUpObject(customizationObject, doc.DocumentElement);
        }
        #endregion

        /// <summary>
        /// Nastavení vlastnosti objektu
        /// </summary>
        /// <param name="currentObject">Objekt</param>
        /// <param name="element">Element obsahující vlastnosti</param>
        void SetUpObject(object currentObject, XmlElement element)
        {
            foreach (XmlNode subNode in element.ChildNodes)
                if (subNode is XmlElement subElement)
                    SetAttributes(currentObject, subElement);

            if (currentObject is Control)
                ((Control)currentObject).ResumeLayout(false);
        }

        string acceptButton = string.Empty;
        string cancelButton = string.Empty;

        void SetValue(object o, string propertyName, string val)
        {
            try
            {
                PropertyInfo propertyInfo = o.GetType().GetProperty(propertyName);
                if (propertyName.Equals("AcceptButton", StringComparison.InvariantCultureIgnoreCase))
                {
                    this.acceptButton = val.Split(' ')[0];
                    return;
                }

                if (propertyName.Equals("CancelButton", StringComparison.InvariantCultureIgnoreCase))
                {
                    this.cancelButton = val.Split(' ')[0];
                    return;
                }

                if (propertyName.Equals("ToolTip", StringComparison.InvariantCultureIgnoreCase))
                {
                    tooltips[o] = val;
                    return;
                }

                if (propertyName.Equals("Icon", StringComparison.InvariantCultureIgnoreCase))
                {
                    this.icon = WinFormsResourceService.GetIcon(val);
                    return;
                }

                if (propertyName.Equals("Tag", StringComparison.InvariantCultureIgnoreCase))
                {
                    propertyInfo.SetValue(o, (object)val, null);
                    return;
                }

                if (val.StartsWith("{") && val.EndsWith("}"))
                {
                    val = val.Substring(1, val.Length - 2);
                    object propertyObject = null;
                    if (propertyInfo.CanWrite)
                    {
                        Type type = objectCreator.GetType(propertyInfo.PropertyType.FullName);
                        propertyObject = type.Assembly.CreateInstance(propertyInfo.PropertyType.FullName);
                    }
                    else
                        propertyObject = propertyInfo.GetValue(o, null);

                    Match match = propertySet.Match(val);
                    while (true)
                    {
                        if (!match.Success)
                            break;
                        SetValue(propertyObject, match.Result("${Property}"), match.Result("${Value}"));
                        match = match.NextMatch();
                    }

                    if (propertyInfo.CanWrite)
                        propertyInfo.SetValue(o, propertyObject, null);

                }
                else if (propertyInfo != null)
                {
                    if (propertyInfo.PropertyType.IsEnum)
                        propertyInfo.SetValue(o, Enum.Parse(propertyInfo.PropertyType, val), null);
                    else if (propertyInfo.PropertyType == typeof(Color))
                    {
                        string color = val.Substring(val.IndexOf('[') + 1).Replace("]", "");
                        string[] argb = color.Split(',', '=');
                        if (argb.Length > 1)
                            propertyInfo.SetValue(o, Color.FromArgb(Int32.Parse(argb[1]), Int32.Parse(argb[3]), Int32.Parse(argb[5]), Int32.Parse(argb[7])), null);
                        else
                            propertyInfo.SetValue(o, Color.FromName(color), null);
                    }
                    else if (propertyInfo.PropertyType == typeof(Image))
                        propertyInfo.SetValue(o, WinFormsResourceService.GetBitmap(val), null);
                    else if (val.Length > 0)
                    {
                        TypeConverter conv = TypeDescriptor.GetConverter(propertyInfo.PropertyType);
                        propertyInfo.SetValue(o, conv.ConvertFromInvariantString(val), null);
                    }
                }
            }
            catch (Exception e)
            {
                throw new ApplicationException(string.Format(string.Join(" ", GResources.GetResourceText(29450420), "{0}", GResources.GetResourceText(29450421), "{1}", GResources.GetResourceText(29450422), "'{2}'!"), propertyName, o.ToString(), val), e); //RC 29450422 : na hodnotu
            }
        }

        void SetAttributes(object o, XmlElement el)
        {
            if (el.Name == "AcceptButton")
            {
                mainForm = (Form)o;
                acceptButtonName = el.Attributes["value"].InnerText.Split(' ')[0];
                return;
            }

            if (el.Name == "CancelButton")
            {
                mainForm = (Form)o;
                cancelButtonName = el.Attributes["value"].InnerText.Split(' ')[0];
                return;
            }

            if (el.Name == "ToolTip")
            {
                string val = el.Attributes["value"].InnerText;
                tooltips[o] = StringValueFilter != null ? StringValueFilter.GetFilteredValue(val) : val;
                return;
            }

            if (el.Name.Equals("Icon", StringComparison.InvariantCultureIgnoreCase))
                icon = WinFormsResourceService.GetIcon(el.Attributes["value"].InnerText);

            if (el.Attributes["value"] != null)
            {
                string val = el.Attributes["value"].InnerText;
                try
                {
                    SetValue(o, el.Name, StringValueFilter != null ? StringValueFilter.GetFilteredValue(val) : val);
                }
                catch (Exception) { }
            }
            else if (el.Attributes["event"] != null)
            {
                try
                {
                    EventInfo eventInfo = o.GetType().GetEvent(el.Name);
                    eventInfo.AddEventHandler(o, Delegate.CreateDelegate(eventInfo.EventHandlerType, customizationObject, el.Attributes["event"].InnerText));
                }
                catch (Exception) { }
            }
            else if (el.Name == "Panel1")
            {
                if (o is SplitContainer)
                    SetUpObject((o as SplitContainer).Panel1, el);
            }
            else if (el.Name == "Panel2")
            {
                if (o is SplitContainer)
                    SetUpObject((o as SplitContainer).Panel2, el);
            }
            else
            {
                PropertyInfo propertyInfo = o.GetType().GetProperty(el.Name);
                object pv = propertyInfo.GetValue(o, null);
                if (pv is IList)
                {
                    foreach (XmlNode subNode in el.ChildNodes)
                    {
                        if (subNode is XmlElement subElement)
                        {
                            object collectionObject = objectCreator.CreateObject(XmlConvert.DecodeName(subElement.Name), subElement);
                            if (collectionObject == null)
                                continue;
                            if (collectionObject is IComponent)
                            {
                                string name = null;
                                if (subElement["Name"] != null &&
                                    subElement["Name"].Attributes["value"] != null)
                                    name = subElement["Name"].Attributes["value"].InnerText;

                                if (string.IsNullOrEmpty(name))
                                    name = "CreatedObject" + num++;
                            }

                            SetUpObject(collectionObject, subElement);

                            if (collectionObject is Control)
                            {
                                string name = ((Control)collectionObject).Name;
                                if (!string.IsNullOrEmpty(name))
                                    ControlDictionary[name] = (Control)collectionObject;
                            }

                            if (collectionObject != null)
                                ((IList)pv).Add(collectionObject);
                        }
                    }
                }
                else
                {
                    object propertyObject = objectCreator.CreateObject(o.GetType().GetProperty(el.Name).PropertyType.Name, el);
                    if (propertyObject is IComponent)
                    {
                        PropertyInfo pInfo = propertyObject.GetType().GetProperty("Name");
                        string name = null;
                        if (el["Name"] != null &&
                            el["Name"].Attributes["value"] != null)
                            name = el["Name"].Attributes["value"].InnerText;

                        if (string.IsNullOrEmpty(name))
                            name = "CreatedObject" + num++;
                        propertyObject = objectCreator.CreateObject(name, el);
                    }
                    SetUpObject(propertyObject, el);
                    propertyInfo.SetValue(o, propertyObject, null);
                }
            }
        }
        int num = 0;
    }
}
