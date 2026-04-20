//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlCompletionDataProvider.cs           </Name>
//    <Description> Poskytuje automatickou kompletací (intellisense) dat pro XML dokument</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.GFE.Parsers.XmlEditor;
using Gordic.TextEditor;
using Gordic.TextEditor.Gui.CompletionWindow;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Obrázky položek doplnění XML kompletace
    /// </summary>
    public class XmlCompletionDataImageList
    {
        XmlCompletionDataImageList()
        {
        }

        /// <summary>
        /// Získání seznamu
        /// </summary>
        /// <returns></returns>
        public static ImageList GetImageList()
        {
            ImageList imageList = new ImageList();

            return imageList;
        }
    }

    /// <summary>
    /// Poskytuje automatickou kompletací (intellisense) dat pro XML dokument
    /// </summary>
    public class XmlCompletionDataProvider : AbstractCompletionDataProvider
    {
        XmlSchemaCompletionDataCollection schemaCompletionDataItems;
        XmlSchemaCompletionData defaultSchemaCompletionData;
        readonly string defaultNamespacePrefix = String.Empty;

        /// <summary>
        /// Vytvoření nové insatnce třídy
        /// </summary>
        /// <param name="schemaCompletionDataItems">Schéma kompletace</param>
        /// <param name="defaultSchemaCompletionData">Výchozí schéma kompetace</param>
        /// <param name="defaultNamespacePrefix">Výchozí prefix</param>
        public XmlCompletionDataProvider(XmlSchemaCompletionDataCollection schemaCompletionDataItems, XmlSchemaCompletionData defaultSchemaCompletionData, string defaultNamespacePrefix)
        {
            this.schemaCompletionDataItems = schemaCompletionDataItems;
            this.defaultSchemaCompletionData = defaultSchemaCompletionData;
            this.defaultNamespacePrefix = defaultNamespacePrefix;
            DefaultIndex = 0;
        }

        /// <summary>
        /// Obrázky u doplňovaných textů
        /// </summary>
        public override ImageList ImageList
        {
            get
            {
                return XmlCompletionDataImageList.GetImageList();
            }
        }

        /// <summary>
        /// Přepíše výchozí chování a umožňuje vložení specifických XML
        /// symbolů jako '.' a ':'.
        /// </summary>
        public override CompletionDataProviderKeyResult ProcessKey(char key)
        {
            if (key == '\r' || key == '\t')
                return CompletionDataProviderKeyResult.InsertionKey;
            return CompletionDataProviderKeyResult.NormalKey;
        }

        /// <summary>
        /// Generuje pole dat pro doplnění
        /// </summary>
        /// <param name="fileName">Název soouboru</param>
        /// <param name="textArea">Plocha se kterou se pracuje</param>
        /// <param name="charTyped">Stisknutá klávesa</param>
        /// <returns></returns>
        public override ICompletionData[] GenerateCompletionData(string fileName, TextArea textArea, char charTyped)
        {
            preSelection = null;
            string text = String.Concat(textArea.Document.GetText(0, textArea.Caret.Offset), charTyped);

            switch (charTyped)
            {
                case '=':
                    // Namespace intellisense.
                    if (XmlParser.IsNamespaceDeclaration(text, text.Length))
                        return schemaCompletionDataItems.GetNamespaceCompletionData(); ;
                    break;
                case '<':
                    // vnitřní element intellisense.
                    XmlElementPath parentPath = XmlParser.GetParentElementPath(text);
                    if (parentPath.Elements.Count > 0)
                        return GetChildElementCompletionData(parentPath);
                    else if (defaultSchemaCompletionData != null)
                        return defaultSchemaCompletionData.GetElementCompletionData(defaultNamespacePrefix);
                    break;

                case ' ':
                    // atribut intellisense.
                    if (!XmlParser.IsInsideAttributeValue(text, text.Length))
                    {
                        XmlElementPath path = XmlParser.GetActiveElementStartPath(text, text.Length);
                        if (path.Elements.Count > 0)
                            return GetAttributeCompletionData(path);
                    }
                    break;

                default:

                    // hodnota atributu intellisense.
                    if (XmlParser.IsAttributeValueChar(charTyped))
                    {
                        string attributeName = XmlParser.GetAttributeName(text, text.Length);
                        if (attributeName.Length > 0)
                        {
                            XmlElementPath elementPath = XmlParser.GetActiveElementStartPath(text, text.Length);
                            if (elementPath.Elements.Count > 0)
                            {
                                preSelection = charTyped.ToString();
                                return GetAttributeValueCompletionData(elementPath, attributeName);
                            }
                        }
                    }
                    break;
            }

            return null;
        }

        /// <summary>
        /// Nalezení schématudle cesty v XML elementu
        /// </summary>
        /// <param name="path">Cesta ke schématu</param>
        public XmlSchemaCompletionData FindSchema(XmlElementPath path)
        {
            if (path.Elements.Count > 0)
            {
                string namespaceUri = path.Elements[0].Namespace;
                if (namespaceUri.Length > 0)
                    return schemaCompletionDataItems[namespaceUri];
                else if (defaultSchemaCompletionData != null)
                {
                    foreach (QualifiedName name in path.Elements)
                        if (name.Namespace.Length == 0)
                            name.Namespace = defaultSchemaCompletionData.NamespaceUri;
                    return defaultSchemaCompletionData;
                }
            }
            return null;
        }

        /// <summary>
        /// Nalezení schématu daného namespace URI
        /// </summary>
        /// <param name="namespaceUri">Daný namespace URI</param>
        public XmlSchemaCompletionData FindSchema(string namespaceUri)
        {
            return schemaCompletionDataItems[namespaceUri];
        }

        /// <summary>
        /// Získání schématu daného souborem
        /// </summary>
        /// <param name="fileName">Soubor se schématem</param>
        public XmlSchemaCompletionData FindSchemaFromFileName(string fileName)
        {
            return schemaCompletionDataItems.GetSchemaFromFileName(fileName);
        }

        ICompletionData[] GetChildElementCompletionData(XmlElementPath path)
        {
            ICompletionData[] completionData = null;

            XmlSchemaCompletionData schema = FindSchema(path);
            if (schema != null)
                completionData = schema.GetChildElementCompletionData(path);

            return completionData;
        }

        ICompletionData[] GetAttributeCompletionData(XmlElementPath path)
        {
            ICompletionData[] completionData = null;

            XmlSchemaCompletionData schema = FindSchema(path);
            if (schema != null)
                completionData = schema.GetAttributeCompletionData(path);

            return completionData;
        }

        ICompletionData[] GetAttributeValueCompletionData(XmlElementPath path, string name)
        {
            ICompletionData[] completionData = null;

            XmlSchemaCompletionData schema = FindSchema(path);
            if (schema != null)
                completionData = schema.GetAttributeValueCompletionData(path, name);

            return completionData;
        }
    }
}
