//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.PropertiesChangedEventArgs.cs            </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-10                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Core
{
    /// <exclude/>
    public delegate void PropertyChangedEventHandler(object sender, PropertyChangedEventArgs e);

    /// <exclude/>
    public class PropertyChangedEventArgs : EventArgs
    {
        readonly Property properties;
        readonly string key;
        readonly object newValue;
        readonly object oldValue;

        /// <returns>
        /// Vrátí změněnou vlastnost objektu
        /// </returns>
        public Property Properties { get { return properties; } }

        /// <returns>
        /// Klíč změněného objektu
        /// </returns>
        public string Key { get { return key; } }

        /// <returns>
        /// Nová hodnota vlastnosti
        /// </returns>
        public object NewValue { get { return newValue; } }

        /// <returns>
        /// stará hodnota vlastnosti
        /// </returns>
        public object OldValue { get { return oldValue; } }

        /// <summary>
        /// Změná vlastnosti
        /// </summary>
        /// <param name="properties">Měněná vastnost</param>
        /// <param name="key">Klíč vlastnosti</param>
        /// <param name="oldValue">Stará hodnota</param>
        /// <param name="newValue">Nová hodnota</param>
        public PropertyChangedEventArgs(Property properties, string key, object oldValue, object newValue)
        {
            this.properties = properties;
            this.key = key;
            this.oldValue = oldValue;
            this.newValue = newValue;
        }
    }
}
