//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AlfEditorAddInOptions.cs               </Name>
//    <Description> Možností doplňků XML editoru                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-24                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using Gordic.GFE.Parsers.XmlEditor;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.AlfEditor
{
    /// <summary>
    /// Možností doplňků XML editoru
    /// </summary>
    public static class AlfEditorAddInOptions
    {
        /// <summary>
        /// Vlastnosti možnosti
        /// </summary>
        public static readonly string OptionsProperty = "AlfEditor.AddIn.Options";
        /// <summary>
        /// Zobrazení atributů, když název vlastnosti je skrýt
        /// </summary>
        public static readonly string ShowAttributesWhenFoldedPropertyName = "ShowAttributesWhenFolded";
        /// <summary>
        /// Zobrazení anotace schématu
        /// </summary>
        public static readonly string ShowSchemaAnnotationPropertyName = "ShowSchemaAnnotation";

        static readonly Property properties;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        static AlfEditorAddInOptions()
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
        /// Reaguje na změnu vlastnosti
        /// </summary>
        public static event PropertyChangedEventHandler PropertyChanged
        {
            add { Properties.PropertyChanged += value; }
            remove { Properties.PropertyChanged -= value; }
        }

        #region Property
        /// <summary>
        /// Získává asociaci mezí schématem a koncovkou souboru
        /// </summary>
        /// <param name="extension">Koncovka souboru</param>
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
        /// Nastavení vlastnosti asociace
        /// </summary>
        /// <param name="association">Asociace pro daný objekt</param>
        public static void SetSchemaAssociation(XmlSchemaAssociation association)
        {
            Properties.Set("ext" + association.Extension, association.ConvertToString());
        }
        /// <summary>
        /// Zobrazení atributu po skrýtí vlastnosti
        /// </summary>
        public static bool ShowAttributesWhenFolded
        {
            get { return Properties.Get(ShowAttributesWhenFoldedPropertyName, false); }
            set { Properties.Set(ShowAttributesWhenFoldedPropertyName, value); }
        }
        /// <summary>
        /// Zobrazení anotace schématu
        /// </summary>
        public static bool ShowSchemaAnnotation
        {
            get { return Properties.Get(ShowSchemaAnnotationPropertyName, true); }
            set { Properties.Set(ShowSchemaAnnotationPropertyName, value); }
        }

        #endregion
    }
}
