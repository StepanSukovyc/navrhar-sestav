//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlEditorAddInOptions.cs               </Name>
//    <Description> Xml Editor nastavení doplňků.                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.XmlEditor;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Xml Editor nastavení doplňků.
    /// </summary>
    public static class XmlEditorAddInOptions
    {
        /// <summary>
        /// vlastnosti možnosti
        /// </summary>
        public static readonly string OptionsProperty = "XmlEditor.AddIn.Options";
        /// <summary>
        /// vlastnosti nastavení zobrazení atributů po složení větve
        /// </summary>
        public static readonly string ShowAttributesWhenFoldedPropertyName = "ShowAttributesWhenFolded";
        /// <summary>
        /// vlastnosti nastavení zobrazení anotace
        /// </summary>
        public static readonly string ShowSchemaAnnotationPropertyName = "ShowSchemaAnnotation";

        static readonly Property properties;

        static XmlEditorAddInOptions()
        {
            properties = PropertyService.Get(OptionsProperty, new Property());
        }

        static Property Properties
        {
            get
            {
                Debug.Assert(properties != null);
                return properties;
            }
        }
        /// <summary>
        /// Reakce na změnu vlastnosti
        /// </summary>
        public static event PropertyChangedEventHandler PropertyChanged
        {
            add { Properties.PropertyChanged += value; }
            remove { Properties.PropertyChanged -= value; }
        }

        #region Property
        /// <summary>
        /// Získá přidružení mezi schématem a příponu souboru.
        /// </summary>
        /// <param name="extension">Připona</param>
        /// <remarks></remarks>
        public static XmlSchemaAssociation GetSchemaAssociation(string extension)
        {
            extension = extension.ToLower();
            string property = Properties.Get("ext" + extension, String.Empty);
            XmlSchemaAssociation association = null;

            if (property.Length > 0)
                association = XmlSchemaAssociation.ConvertFromString(property);

            // použit výchozí?
            if (association == null)
                association = XmlSchemaAssociation.GetDefaultAssociation(extension);

            return association;
        }

        /// <summary>
        /// Nastavení schématu
        /// </summary>
        /// <param name="association">Asociované schéma</param>
        public static void SetSchemaAssociation(XmlSchemaAssociation association)
        {
            Properties.Set("ext" + association.Extension, association.ConvertToString());
        }

        /// <summary>
        /// Zbrazení atributu když je folded
        /// </summary>
        public static bool ShowAttributesWhenFolded
        {
            get
            {
                return Properties.Get(ShowAttributesWhenFoldedPropertyName, false);
            }

            set
            {
                Properties.Set(ShowAttributesWhenFoldedPropertyName, value);
            }
        }
        /// <summary>
        /// Zobrazení anotace
        /// </summary>
        public static bool ShowSchemaAnnotation
        {
            get
            {
                return Properties.Get(ShowSchemaAnnotationPropertyName, true);
            }

            set
            {
                Properties.Set(ShowSchemaAnnotationPropertyName, value);
            }
        }

        #endregion
    }
}
