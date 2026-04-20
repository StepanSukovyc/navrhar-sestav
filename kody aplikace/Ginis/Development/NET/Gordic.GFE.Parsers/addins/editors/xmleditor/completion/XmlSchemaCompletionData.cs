//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlSchemaCompletionData.cs             </Name>
//    <Description> Obsahuje data XML schématu k dokončování (intellisense).    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-24                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using System.Xml.Schema;
using System.IO;
using System.Xml;
using Gordic.TextEditor.Gui.CompletionWindow;
using Gordic.GFE.Parsers.AlfEditor;

namespace Gordic.GFE.Parsers.XmlEditor
{
    /// <summary>
    /// Obsahuje data XML schématu k dokončování (intellisense).
    /// </summary>
    /// <remarks>
    /// XmlSchema třída vyvovalá výjimku pokud se budeme snažit nahrát
    /// xhtml1-strict.xsd schéma.
    /// </remarks>
    public class XmlSchemaCompletionData
    {
        string namespaceUri = String.Empty;
        XmlSchema schema;

        XmlSchemaObjectCollection prohibitedAttributes = new XmlSchemaObjectCollection();

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public XmlSchemaCompletionData()
        {
        }

        /// <summary>
        /// Vytvoření dat k dokončování ze schématu ze čtečky
        /// </summary>
        /// <param name="reader">Čtečka schématu</param>
        public XmlSchemaCompletionData(TextReader reader)
        {
            ReadSchema(String.Empty, reader);
        }

        /// <summary>
        /// Vytvoření dat k dokončování ze schématu ze čtečky
        /// </summary>
        /// <param name="reader">Čtečka schématu</param>
        public XmlSchemaCompletionData(XmlTextReader reader)
        {
            reader.XmlResolver = null;
            ReadSchema(reader);
        }

        /// <summary>
        /// Vytvoření dat k dokončování ze souboru
        /// </summary>
        /// <param name="fileName">Soubor obsahující schéma</param>
        public XmlSchemaCompletionData(string fileName)
            : this(String.Empty, fileName)
        {
        }

        /// <summary>
        /// Vytvoření dat k dokončování ze souboru schématu s 
        /// použitím specifického jmenného prostoru
        /// </summary>
        /// <param name="baseUri">Specifikovaný jmenný prostor</param>
        /// <param name="fileName">Soubor schématu</param>
        public XmlSchemaCompletionData(string baseUri, string fileName)
        {
            StreamReader reader = new StreamReader(fileName, true);
            ReadSchema(baseUri, reader);
            FileName = fileName;
        }

        /// <summary>
        /// Schéma
        /// </summary>
        public XmlSchema Schema { get { return schema; } }

        /// <summary>
        /// Indikuje, že schéma je pouze pro čtení.
        /// Toto schéma je nainstalováno s Návrhářem, a tudiž je neměnné.
        /// </summary>
        public bool ReadOnly { get; set; }

        /// <summary>
        /// Soubor obsahující schéma
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// URI jmenného prostoru
        /// </summary>
        public string NamespaceUri { get { return namespaceUri; } }

        /// <summary>
        /// Získání URI ze souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        public static string GetUri(string fileName)
        {
            return !string.IsNullOrEmpty(fileName)
                ? String.Concat("file:///", fileName.Replace('\\', '/'))
                : string.Empty;
        }

        /// <summary>
        /// Získání možných kořenových prvků pro XML dokument dle tohoto schématu
        /// </summary>
        public ICompletionData[] GetElementCompletionData()
        {
            return GetElementCompletionData(String.Empty);
        }

        /// <summary>
        /// Získání možných kořenových prvků pro XML dokument dle tohoto schématu.
        /// </summary>
        /// <param name="namespacePrefix">Prefix jmenného prostoru</param>
        public ICompletionData[] GetElementCompletionData(string namespacePrefix)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            foreach (XmlSchemaElement element in schema.Elements.Values)
                if (element.Name != null)
                    AddElement(data, element.Name, namespacePrefix, element.Annotation);

            return data.ToArray();
        }

        /// <summary>
        /// Získání atributu pro dokončování elementu, které jsou na specifické cestě
        /// </summary>
        /// <param name="path">Specifikovaná cesta k atributům</param>
        public ICompletionData[] GetAttributeCompletionData(XmlElementPath path)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            // najdeme odpovídající prvek.
            XmlSchemaElement element = FindElement(path);

            // získáme data k dokončování.
            if (element != null)
            {
                prohibitedAttributes.Clear();
                data = GetAttributeCompletionData(element);
            }

            return data.ToArray();
        }

        /// <summary>
        /// Získání podřízených elementů pro dokončování elementu, které jsou na specifické cestě
        /// </summary>
        /// <param name="path">Specifikovaná cesta k podřízeným elementům</param>
        public ICompletionData[] GetChildElementCompletionData(XmlElementPath path)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            // najdeme odpovídající prvek..
            XmlSchemaElement element = FindElement(path);

            // získáme data k dokončování.
            if (element != null)
                data = GetChildElementCompletionData(element, path.Elements.LastPrefix);

            return data.ToArray();
        }

        /// <summary>
        /// Získání dat k automatickému dokončování pro specifickou hodnotu argumentu
        /// </summary>
        /// <param name="path">Cesta k datam</param>
        /// <param name="name">Hodnota argumentu</param>
        public ICompletionData[] GetAttributeValueCompletionData(XmlElementPath path, string name)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            // najdeme odpovídající prvek.
            XmlSchemaElement element = FindElement(path);

            // získáme data k dokončování.
            if (element != null)
                data = GetAttributeValueCompletionData(element, name);

            return data.ToArray();
        }

        /// <summary>
        /// Nalezení elementu dle specifikované cesty
        /// </summary>
        /// <param name="path">Sepcifická cesta k elementu</param>
        /// <remarks>
        /// Tato metoda není určená pro generování dat, ale je dobra pro nalezení elementu.
        /// </remarks>
        /// <returns><see langword="null"/> pokud nebyl nalezen žádný element.</returns>
        public XmlSchemaElement FindElement(XmlElementPath path)
        {
            XmlSchemaElement element = null;
            for (int i = 0; i < path.Elements.Count; ++i)
            {
                QualifiedName name = path.Elements[i];
                if (i == 0)
                {
                    // podíváme se na kořenový element.
                    element = FindElement(name);
                    if (element == null)
                        break;
                }
                else
                {
                    element = FindChildElement(element, name);
                    if (element == null)
                        break;
                }
            }
            return element;
        }

        /// <summary>
        /// Nalezení elementu v schématu.
        /// </summary>
        /// <param name="name">Název elementu</param>
        /// <remarks>
        /// Jenom se podívá na elementy definované v kořenu ale nenajde jiné elementy mimo kořen.
        /// </remarks>
        public XmlSchemaElement FindElement(QualifiedName name)
        {
            foreach (XmlSchemaElement element in schema.Elements.Values)
                if (name.Equals(element.QualifiedName))
                    return element;
            return null;
        }

        /// <summary>
        /// Najde komplexní typ se zadaným názvem.
        /// </summary>
        /// <param name="name">Název komplexního typu</param>
        public XmlSchemaComplexType FindComplexType(QualifiedName name)
        {
            XmlQualifiedName qualifiedName = new XmlQualifiedName(name.Name, name.Namespace);
            return FindNamedType(schema, qualifiedName);
        }

        /// <summary>
        /// Vyhledá zadaný název atributu daného prvku.
        /// </summary>
        /// <param name="element">Element ve kterém se hledá</param>
        /// <param name="name">Název atributu</param>
        /// <remarks>
        /// Tato metoda není určená pro generování dat, ale je dobra pro nalezení elementu.
        /// </remarks>
        /// <returns><see langword="null"/> pokud atribut nebude nalezen.</returns>
        public XmlSchemaAttribute FindAttribute(XmlSchemaElement element, string name)
        {
            XmlSchemaAttribute attribute = null;
            XmlSchemaComplexType complexType = GetElementAsComplexType(element);
            if (complexType != null)
                attribute = FindAttribute(complexType, name);
            return attribute;
        }

        /// <summary>
        /// Nalezení skupiny atributu dle názvu.
        /// </summary>
        /// <param name="name">Název skupiny</param>
        public XmlSchemaAttributeGroup FindAttributeGroup(string name)
        {
            return FindAttributeGroup(schema, name);
        }

        /// <summary>
        /// Nalezení jednoduchého typu dle názvu.
        /// </summary>
        /// <param name="name">Název hledaného typu</param>
        public XmlSchemaSimpleType FindSimpleType(string name)
        {
            XmlQualifiedName qualifiedName = new XmlQualifiedName(name, namespaceUri);
            return FindSimpleType(qualifiedName);
        }

        /// <summary>
        /// Nalezení specifickéh oatributu ve schématu. 
        /// Tato metoda pouze kontroluje přítomnost atributu ve schématu
        /// </summary>
        /// <param name="name">Název atributu</param>
        public XmlSchemaAttribute FindAttribute(string name)
        {
            foreach (XmlSchemaAttribute attribute in schema.Attributes.Values)
                if (string.Equals(attribute.Name, name, StringComparison.InvariantCultureIgnoreCase))
                    return attribute;
            return null;
        }

        /// <summary>
        /// Nalezení schémy skupiny určitého názvu.
        /// </summary>
        /// <param name="name">Název hledané skupiny</param>
        public XmlSchemaGroup FindGroup(string name)
        {
            if (!string.IsNullOrEmpty(name))
                foreach (XmlSchemaObject schemaObject in schema.Groups.Values)
                    if (schemaObject is XmlSchemaGroup group
                        && string.Equals(group.Name, name, StringComparison.InvariantCultureIgnoreCase))
                        return group;
            return null;
        }

        /// <summary>
        /// Vytvoření kvalifikovaného názvu z daného názvu.
        /// </summary>
        /// <param name="name">Název ke kvalifikací</param>
        /// <remarks></remarks>
        public QualifiedName CreateQualifiedName(string name)
        {
            int index = name.IndexOf(":");
            if (index >= 0)
            {
                string prefix = name.Substring(0, index);
                name = name.Substring(index + 1);
                foreach (XmlQualifiedName xmlQualifiedName in schema.Namespaces.ToArray())
                    if (xmlQualifiedName.Name == prefix)
                        return new QualifiedName(name, xmlQualifiedName.Namespace, prefix);
            }

            // výchozí chování - pouze vrátí název s URi jmenného prostoru
            return new QualifiedName(name, namespaceUri);
        }

        /// <summary>
        /// Převod elementu na komplexní typ (pokud to bude možné)
        /// </summary>
        /// <param name="element">Převáděný element</param>
        public XmlSchemaComplexType GetElementAsComplexType(XmlSchemaElement element)
        {
            if (!(element.SchemaType is XmlSchemaComplexType complexType))
                complexType = FindNamedType(schema, element.SchemaTypeName);
            return complexType;
        }

        /// <summary>
        /// Reakce na chyby spojené s platností schématu
        /// </summary>
        /// <param name="e">Argument platností</param>
        /// <param name="source">Zdroj chyby</param>
        void SchemaValidation(object source, ValidationEventArgs e)
        {
        }

        /// <summary>
        /// Načtení schématu.
        /// </summary>
        /// <param name="reader">Čtečka schématu</param>
        void ReadSchema(XmlReader reader)
        {
            try
            {
                schema = XmlSchema.Read(reader, new ValidationEventHandler(SchemaValidation));
                //schema.Compile(new ValidationEventHandler(SchemaValidation));

                namespaceUri = schema.TargetNamespace;
            }
            finally
            {
                reader.Close();
            }
        }

        void ReadSchema(string baseUri, TextReader reader)
        {
            XmlTextReader xmlReader = new XmlTextReader(baseUri, reader)
            {
                XmlResolver = null
            };
            ReadSchema(xmlReader);
        }

        /// <summary>
        /// Nalezení elementu ve schématu.
        /// </summary>
        /// <remarks>
        /// </remarks>
        XmlSchemaElement FindElement(XmlQualifiedName name)
        {
            XmlSchemaElement matchedElement = null;
            foreach (XmlSchemaElement element in schema.Elements.Values)
                if (name.Equals(element.QualifiedName))
                {
                    matchedElement = element;
                    break;
                }

            return matchedElement;
        }

        AlfCompletionDataCollection GetChildElementCompletionData(XmlSchemaElement element, string prefix)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();
            XmlSchemaComplexType complexType = GetElementAsComplexType(element);

            if (complexType != null)
                data = GetChildElementCompletionData(complexType, prefix);

            return data;
        }

        AlfCompletionDataCollection GetChildElementCompletionData(XmlSchemaComplexType complexType, string prefix)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            XmlSchemaChoice choice = complexType.Particle as XmlSchemaChoice;
            XmlSchemaGroupRef groupRef = complexType.Particle as XmlSchemaGroupRef;
            XmlSchemaComplexContent complexContent = complexType.ContentModel as XmlSchemaComplexContent;
            XmlSchemaAll all = complexType.Particle as XmlSchemaAll;

            if (complexType.Particle is XmlSchemaSequence sequence)
                data = GetChildElementCompletionData(sequence.Items, prefix);
            else if (choice != null)
                data = GetChildElementCompletionData(choice.Items, prefix);
            else if (complexContent != null)
                data = GetChildElementCompletionData(complexContent, prefix);
            else if (groupRef != null)
                data = GetChildElementCompletionData(groupRef, prefix);
            else if (all != null)
                data = GetChildElementCompletionData(all.Items, prefix);

            return data;
        }

        AlfCompletionDataCollection GetChildElementCompletionData(XmlSchemaObjectCollection items, string prefix)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            foreach (XmlSchemaObject schemaObject in items)
            {
                XmlSchemaSequence childSequence = schemaObject as XmlSchemaSequence;
                XmlSchemaChoice childChoice = schemaObject as XmlSchemaChoice;
                XmlSchemaGroupRef groupRef = schemaObject as XmlSchemaGroupRef;

                if (schemaObject is XmlSchemaElement childElement)
                {
                    string name = childElement.Name;
                    if (name == null)
                    {
                        name = childElement.RefName.Name;
                        XmlSchemaElement element = FindElement(childElement.RefName);
                        if (element != null)
                        {
                            if (element.IsAbstract)
                                AddSubstitionGroupElements(data, element.QualifiedName, prefix);
                            else
                                AddElement(data, name, prefix, element.Annotation);
                        }
                        else
                            AddElement(data, name, prefix, childElement.Annotation);
                    }
                    else
                        AddElement(data, name, prefix, childElement.Annotation);
                }
                else if (childSequence != null)
                    AddElements(data, GetChildElementCompletionData(childSequence.Items, prefix));
                else if (childChoice != null)
                    AddElements(data, GetChildElementCompletionData(childChoice.Items, prefix));
                else if (groupRef != null)
                    AddElements(data, GetChildElementCompletionData(groupRef, prefix));
            }

            return data;
        }

        AlfCompletionDataCollection GetChildElementCompletionData(XmlSchemaComplexContent complexContent, string prefix)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            if (complexContent.Content is XmlSchemaComplexContentExtension extension)
                data = GetChildElementCompletionData(extension, prefix);
            else
                if (complexContent.Content is XmlSchemaComplexContentRestriction restriction)
                data = GetChildElementCompletionData(restriction, prefix);

            return data;
        }

        AlfCompletionDataCollection GetChildElementCompletionData(XmlSchemaComplexContentExtension extension, string prefix)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            XmlSchemaComplexType complexType = FindNamedType(schema, extension.BaseTypeName);
            if (complexType != null)
                data = GetChildElementCompletionData(complexType, prefix);

            // přidání všch prvků.
            if (extension.Particle != null)
            {
                XmlSchemaChoice choice = extension.Particle as XmlSchemaChoice;
                XmlSchemaGroupRef groupRef = extension.Particle as XmlSchemaGroupRef;

                if (extension.Particle is XmlSchemaSequence sequence)
                    data.AddRange(GetChildElementCompletionData(sequence.Items, prefix));
                else if (choice != null)
                    data.AddRange(GetChildElementCompletionData(choice.Items, prefix));
                else if (groupRef != null)
                    data.AddRange(GetChildElementCompletionData(groupRef, prefix));
            }

            return data;
        }

        AlfCompletionDataCollection GetChildElementCompletionData(XmlSchemaGroupRef groupRef, string prefix)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            XmlSchemaGroup group = FindGroup(groupRef.RefName.Name);
            if (group != null)
            {
                XmlSchemaChoice choice = group.Particle as XmlSchemaChoice;

                if (group.Particle is XmlSchemaSequence sequence)
                    data = GetChildElementCompletionData(sequence.Items, prefix);
                else if (choice != null)
                    data = GetChildElementCompletionData(choice.Items, prefix);
            }

            return data;
        }

        AlfCompletionDataCollection GetChildElementCompletionData(XmlSchemaComplexContentRestriction restriction, string prefix)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            // přidání všech elementů.
            if (restriction.Particle != null)
            {
                XmlSchemaChoice choice = restriction.Particle as XmlSchemaChoice;
                XmlSchemaGroupRef groupRef = restriction.Particle as XmlSchemaGroupRef;

                if (restriction.Particle is XmlSchemaSequence sequence)
                    data = GetChildElementCompletionData(sequence.Items, prefix);
                else if (choice != null)
                    data = GetChildElementCompletionData(choice.Items, prefix);
                else if (groupRef != null)
                    data = GetChildElementCompletionData(groupRef, prefix);
            }

            return data;
        }

        void AddElement(AlfCompletionDataCollection data, string name, string prefix, string documentation)
        {
            if (!data.Contains(name))
            {
                if (prefix.Length > 0)
                    name = String.Concat(prefix, ":", name);
                AlfCompletionData completionData = new AlfCompletionData(name, documentation);
                data.Add(completionData);
            }
        }

        void AddElement(AlfCompletionDataCollection data, string name, string prefix, XmlSchemaAnnotation annotation)
        {
            string documentation = GetDocumentation(annotation);

            AddElement(data, name, prefix, documentation);
        }

        void AddElements(AlfCompletionDataCollection lhs, AlfCompletionDataCollection rhs)
        {
            foreach (AlfCompletionData data in rhs)
                if (!lhs.Contains(data))
                    lhs.Add(data);
        }

        /// <summary>
        /// Gets the documentation from the annotation element.
        /// </summary>
        /// <remarks>
        /// </remarks>
        string GetDocumentation(XmlSchemaAnnotation annotation)
        {
            string documentation = String.Empty;

            if (annotation != null)
            {
                StringBuilder documentationBuilder = new StringBuilder();
                foreach (XmlSchemaObject schemaObject in annotation.Items)
                    if (schemaObject is XmlSchemaDocumentation schemaDocumentation)
                        foreach (XmlNode node in schemaDocumentation.Markup)
                            if (node is XmlText textNode && !string.IsNullOrEmpty(textNode.Data))
                                documentationBuilder.Append(textNode.Data);

                documentation = documentationBuilder.ToString();
            }

            return documentation;
        }

        AlfCompletionDataCollection GetAttributeCompletionData(XmlSchemaElement element)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();
            XmlSchemaComplexType complexType = GetElementAsComplexType(element);

            if (complexType != null)
                data.AddRange(GetAttributeCompletionData(complexType));

            return data;
        }

        AlfCompletionDataCollection GetAttributeCompletionData(XmlSchemaComplexContentRestriction restriction)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();
            data.AddRange(GetAttributeCompletionData(restriction.Attributes));

            XmlSchemaComplexType baseComplexType = FindNamedType(schema, restriction.BaseTypeName);
            if (baseComplexType != null)
                data.AddRange(GetAttributeCompletionData(baseComplexType));

            return data;
        }

        AlfCompletionDataCollection GetAttributeCompletionData(XmlSchemaComplexType complexType)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            data = GetAttributeCompletionData(complexType.Attributes);

            // přidání všech atributů.
            if (complexType.ContentModel is XmlSchemaComplexContent complexContent)
            {
                XmlSchemaComplexContentRestriction restriction = complexContent.Content as XmlSchemaComplexContentRestriction;
                if (complexContent.Content is XmlSchemaComplexContentExtension extension)
                    data.AddRange(GetAttributeCompletionData(extension));
                else if (restriction != null)
                    data.AddRange(GetAttributeCompletionData(restriction));
            }
            else if (complexType.ContentModel is XmlSchemaSimpleContent simpleContent)
                data.AddRange(GetAttributeCompletionData(simpleContent));

            return data;
        }

        AlfCompletionDataCollection GetAttributeCompletionData(XmlSchemaComplexContentExtension extension)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            data.AddRange(GetAttributeCompletionData(extension.Attributes));
            XmlSchemaComplexType baseComplexType = FindNamedType(schema, extension.BaseTypeName);
            if (baseComplexType != null)
                data.AddRange(GetAttributeCompletionData(baseComplexType));

            return data;
        }

        AlfCompletionDataCollection GetAttributeCompletionData(XmlSchemaSimpleContent simpleContent)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            if (simpleContent.Content is XmlSchemaSimpleContentExtension extension)
                data.AddRange(GetAttributeCompletionData(extension));

            return data;
        }

        AlfCompletionDataCollection GetAttributeCompletionData(XmlSchemaSimpleContentExtension extension)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();
            data.AddRange(GetAttributeCompletionData(extension.Attributes));

            return data;
        }

        AlfCompletionDataCollection GetAttributeCompletionData(XmlSchemaObjectCollection attributes)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            foreach (XmlSchemaObject schemaObject in attributes)
            {
                XmlSchemaAttributeGroupRef attributeGroupRef = schemaObject as XmlSchemaAttributeGroupRef;
                if (schemaObject is XmlSchemaAttribute attribute)
                {
                    if (!IsProhibitedAttribute(attribute))
                        AddAttribute(data, attribute);
                    else
                        prohibitedAttributes.Add(attribute);
                }
                else if (attributeGroupRef != null)
                    data.AddRange(GetAttributeCompletionData(attributeGroupRef));
            }
            return data;
        }

        bool IsProhibitedAttribute(XmlSchemaAttribute attribute)
        {
            bool prohibited = false;
            if (attribute.Use == XmlSchemaUse.Prohibited)
                prohibited = true;
            else
                foreach (XmlSchemaAttribute prohibitedAttribute in prohibitedAttributes)
                    if (prohibitedAttribute.QualifiedName == attribute.QualifiedName)
                    {
                        prohibited = true;
                        break;
                    }

            return prohibited;
        }

        /// <summary>
        /// Přidání atributu do kolekce k dokončování
        /// </summary>
        /// <param name="data">Kolekce k dokončování</param>
        /// <param name="attribute">Přidávaný atribut</param>
        void AddAttribute(AlfCompletionDataCollection data, XmlSchemaAttribute attribute)
        {
            string name = attribute.Name;
            if (name == null
                && attribute.RefName.Namespace == "http://www.w3.org/XML/1998/namespace")
                name = String.Concat("xml:", attribute.RefName.Name);

            if (name != null)
            {
                string documentation = GetDocumentation(attribute.Annotation);
                AlfCompletionData completionData = new AlfCompletionData(name, documentation, AlfCompletionData.DataType.XmlAttribute);
                data.Add(completionData);
            }
        }

        AlfCompletionDataCollection GetAttributeCompletionData(XmlSchemaAttributeGroupRef groupRef)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();
            XmlSchemaAttributeGroup group = FindAttributeGroup(schema, groupRef.RefName.Name);
            if (group != null)
                data = GetAttributeCompletionData(group.Attributes);

            return data;
        }

        static XmlSchemaComplexType FindNamedType(XmlSchema schema, XmlQualifiedName name)
        {
            XmlSchemaComplexType matchedComplexType = null;

            if (name != null)
            {
                foreach (XmlSchemaObject schemaObject in schema.Items)
                    if (schemaObject is XmlSchemaComplexType complexType
                        && complexType.QualifiedName.Equals(name))
                    {
                        matchedComplexType = complexType;
                        break;
                    }

                if (matchedComplexType == null)
                    foreach (XmlSchemaExternal external in schema.Includes)
                        if (external is XmlSchemaInclude include && include.Schema != null)
                            matchedComplexType = FindNamedType(include.Schema, name);
            }

            return matchedComplexType;
        }

        XmlSchemaElement FindChildElement(XmlSchemaElement element, QualifiedName name)
        {
            XmlSchemaElement matchedElement = null;

            XmlSchemaComplexType complexType = GetElementAsComplexType(element);
            if (complexType != null)
                matchedElement = FindChildElement(complexType, name);

            return matchedElement;
        }

        XmlSchemaElement FindChildElement(XmlSchemaComplexType complexType, QualifiedName name)
        {
            XmlSchemaElement matchedElement = null;

            XmlSchemaChoice choice = complexType.Particle as XmlSchemaChoice;
            XmlSchemaGroupRef groupRef = complexType.Particle as XmlSchemaGroupRef;
            XmlSchemaAll all = complexType.Particle as XmlSchemaAll;
            XmlSchemaComplexContent complexContent = complexType.ContentModel as XmlSchemaComplexContent;

            if (complexType.Particle is XmlSchemaSequence sequence)
                matchedElement = FindElement(sequence.Items, name);
            else if (choice != null)
                matchedElement = FindElement(choice.Items, name);
            else if (complexContent != null)
            {
                XmlSchemaComplexContentRestriction restriction = complexContent.Content as XmlSchemaComplexContentRestriction;
                if (complexContent.Content is XmlSchemaComplexContentExtension extension)
                    matchedElement = FindChildElement(extension, name);
                else if (restriction != null)
                    matchedElement = FindChildElement(restriction, name);
            }
            else if (groupRef != null)
                matchedElement = FindElement(groupRef, name);
            else if (all != null)
                matchedElement = FindElement(all.Items, name);

            return matchedElement;
        }

        XmlSchemaElement FindChildElement(XmlSchemaComplexContentExtension extension, QualifiedName name)
        {
            XmlSchemaElement matchedElement = null;

            XmlSchemaComplexType complexType = FindNamedType(schema, extension.BaseTypeName);
            if (complexType != null)
            {
                matchedElement = FindChildElement(complexType, name);

                if (matchedElement == null)
                {
                    XmlSchemaChoice choice = extension.Particle as XmlSchemaChoice;
                    XmlSchemaGroupRef groupRef = extension.Particle as XmlSchemaGroupRef;

                    if (extension.Particle is XmlSchemaSequence sequence)
                        matchedElement = FindElement(sequence.Items, name);
                    else if (choice != null)
                        matchedElement = FindElement(choice.Items, name);
                    else if (groupRef != null)
                        matchedElement = FindElement(groupRef, name);
                }
            }

            return matchedElement;
        }

        XmlSchemaElement FindChildElement(XmlSchemaComplexContentRestriction restriction, QualifiedName name)
        {
            XmlSchemaElement matchedElement = null;
            XmlSchemaGroupRef groupRef = restriction.Particle as XmlSchemaGroupRef;

            if (restriction.Particle is XmlSchemaSequence sequence)
                matchedElement = FindElement(sequence.Items, name);
            else if (groupRef != null)
                matchedElement = FindElement(groupRef, name);

            return matchedElement;
        }

        XmlSchemaElement FindElement(XmlSchemaObjectCollection items, QualifiedName name)
        {
            XmlSchemaElement matchedElement = null;

            foreach (XmlSchemaObject schemaObject in items)
            {
                XmlSchemaSequence sequence = schemaObject as XmlSchemaSequence;
                XmlSchemaChoice choice = schemaObject as XmlSchemaChoice;
                XmlSchemaGroupRef groupRef = schemaObject as XmlSchemaGroupRef;

                if (schemaObject is XmlSchemaElement element)
                {
                    if (element.Name != null)
                    {
                        if (name.Name.Equals(element.Name))
                            matchedElement = element;
                    }
                    else if (element.RefName != null)
                    {
                        if (name.Name.Equals(element.RefName.Name))
                            matchedElement = FindElement(element.RefName);
                        else
                        {
                            // abstraktní element?
                            XmlSchemaElement abstractElement = FindElement(element.RefName);
                            if (abstractElement != null && abstractElement.IsAbstract)
                                matchedElement = FindSubstitutionGroupElement(abstractElement.QualifiedName, name);
                        }
                    }
                }
                else if (sequence != null)
                    matchedElement = FindElement(sequence.Items, name);
                else if (choice != null)
                    matchedElement = FindElement(choice.Items, name);
                else if (groupRef != null)
                    matchedElement = FindElement(groupRef, name);

                // shoda nalezená?
                if (matchedElement != null)
                    break;
            }

            return matchedElement;
        }

        XmlSchemaElement FindElement(XmlSchemaGroupRef groupRef, QualifiedName name)
        {
            XmlSchemaElement matchedElement = null;

            XmlSchemaGroup group = FindGroup(groupRef.RefName.Name);
            if (group != null)
            {
                XmlSchemaChoice choice = group.Particle as XmlSchemaChoice;

                if (group.Particle is XmlSchemaSequence sequence)
                    matchedElement = FindElement(sequence.Items, name);
                else if (choice != null)
                    matchedElement = FindElement(choice.Items, name);
            }

            return matchedElement;
        }

        static XmlSchemaAttributeGroup FindAttributeGroup(XmlSchema schema, string name)
        {
            XmlSchemaAttributeGroup matchedGroup = null;

            if (name != null)
            {
                foreach (XmlSchemaObject schemaObject in schema.Items)
                    if (schemaObject is XmlSchemaAttributeGroup group && group.Name.Equals(name))
                    {
                        matchedGroup = group;
                        break;
                    }

                if (matchedGroup == null)
                    foreach (XmlSchemaExternal external in schema.Includes)
                        if (external is XmlSchemaInclude include && include.Schema != null)
                            matchedGroup = FindAttributeGroup(include.Schema, name);
            }

            return matchedGroup;
        }

        AlfCompletionDataCollection GetAttributeValueCompletionData(XmlSchemaElement element, string name)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            XmlSchemaComplexType complexType = GetElementAsComplexType(element);
            if (complexType != null)
            {
                XmlSchemaAttribute attribute = FindAttribute(complexType, name);
                if (attribute != null)
                    data.AddRange(GetAttributeValueCompletionData(attribute));
            }

            return data;
        }

        AlfCompletionDataCollection GetAttributeValueCompletionData(XmlSchemaAttribute attribute)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            if (attribute.SchemaType != null)
            {
                if (attribute.SchemaType.Content is XmlSchemaSimpleTypeRestriction simpleTypeRestriction)
                    data.AddRange(GetAttributeValueCompletionData(simpleTypeRestriction));
            }
            else if (attribute.AttributeSchemaType != null)
                if (attribute.AttributeSchemaType is XmlSchemaSimpleType simpleType)
                {
                    if (simpleType.Name == "boolean")
                        data.AddRange(GetBooleanAttributeValueCompletionData());
                    else
                        data.AddRange(GetAttributeValueCompletionData(simpleType));
                }

            return data;
        }

        AlfCompletionDataCollection GetAttributeValueCompletionData(XmlSchemaSimpleTypeRestriction simpleTypeRestriction)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            foreach (XmlSchemaObject schemaObject in simpleTypeRestriction.Facets)
                if (schemaObject is XmlSchemaEnumerationFacet enumFacet)
                    AddAttributeValue(data, enumFacet.Value, enumFacet.Annotation);

            return data;
        }

        AlfCompletionDataCollection GetAttributeValueCompletionData(XmlSchemaSimpleTypeUnion union)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            foreach (XmlSchemaObject schemaObject in union.BaseTypes)
            {
                if (schemaObject is XmlSchemaSimpleType simpleType)
                    data.AddRange(GetAttributeValueCompletionData(simpleType));
            }

            return data;
        }

        AlfCompletionDataCollection GetAttributeValueCompletionData(XmlSchemaSimpleType simpleType)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            XmlSchemaSimpleTypeUnion union = simpleType.Content as XmlSchemaSimpleTypeUnion;
            XmlSchemaSimpleTypeList list = simpleType.Content as XmlSchemaSimpleTypeList;

            if (simpleType.Content is XmlSchemaSimpleTypeRestriction simpleTypeRestriction)
                data.AddRange(GetAttributeValueCompletionData(simpleTypeRestriction));
            else if (union != null)
                data.AddRange(GetAttributeValueCompletionData(union));
            else if (list != null)
                data.AddRange(GetAttributeValueCompletionData(list));

            return data;
        }

        AlfCompletionDataCollection GetAttributeValueCompletionData(XmlSchemaSimpleTypeList list)
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            if (list.ItemType != null)
                data.AddRange(GetAttributeValueCompletionData(list.ItemType));
            else if (list.ItemTypeName != null)
            {
                XmlSchemaSimpleType simpleType = FindSimpleType(list.ItemTypeName);
                if (simpleType != null)
                    data.AddRange(GetAttributeValueCompletionData(simpleType));
            }

            return data;
        }

        AlfCompletionDataCollection GetBooleanAttributeValueCompletionData()
        {
            AlfCompletionDataCollection data = new AlfCompletionDataCollection();

            AddAttributeValue(data, "0");
            AddAttributeValue(data, "1");
            AddAttributeValue(data, "true");
            AddAttributeValue(data, "false");

            return data;
        }

        XmlSchemaAttribute FindAttribute(XmlSchemaComplexType complexType, string name)
        {
            XmlSchemaAttribute matchedAttribute = null;

            matchedAttribute = FindAttribute(complexType.Attributes, name);

            if (matchedAttribute == null)
            {
                if (complexType.ContentModel is XmlSchemaComplexContent complexContent)
                    matchedAttribute = FindAttribute(complexContent, name);
            }

            return matchedAttribute;
        }

        XmlSchemaAttribute FindAttribute(XmlSchemaObjectCollection schemaObjects, string name)
        {
            XmlSchemaAttribute matchedAttribute = null;

            foreach (XmlSchemaObject schemaObject in schemaObjects)
            {
                XmlSchemaAttributeGroupRef groupRef = schemaObject as XmlSchemaAttributeGroupRef;

                if (schemaObject is XmlSchemaAttribute attribute)
                {
                    if (attribute.Name.Equals(name))
                    {
                        matchedAttribute = attribute;
                        break;
                    }
                }
                else if (groupRef != null)
                {
                    matchedAttribute = FindAttribute(groupRef, name);
                    if (matchedAttribute != null)
                        break;
                }
            }

            return matchedAttribute;
        }

        XmlSchemaAttribute FindAttribute(XmlSchemaAttributeGroupRef groupRef, string name)
        {
            XmlSchemaAttribute matchedAttribute = null;

            if (groupRef.RefName != null)
            {
                XmlSchemaAttributeGroup group = FindAttributeGroup(schema, groupRef.RefName.Name);
                if (group != null)
                    matchedAttribute = FindAttribute(group.Attributes, name);
            }

            return matchedAttribute;
        }

        XmlSchemaAttribute FindAttribute(XmlSchemaComplexContent complexContent, string name)
        {
            XmlSchemaAttribute matchedAttribute = null;

            XmlSchemaComplexContentRestriction restriction = complexContent.Content as XmlSchemaComplexContentRestriction;

            if (complexContent.Content is XmlSchemaComplexContentExtension extension)
                matchedAttribute = FindAttribute(extension, name);
            else if (restriction != null)
                matchedAttribute = FindAttribute(restriction, name);

            return matchedAttribute;
        }

        XmlSchemaAttribute FindAttribute(XmlSchemaComplexContentExtension extension, string name)
        {
            return FindAttribute(extension.Attributes, name);
        }

        XmlSchemaAttribute FindAttribute(XmlSchemaComplexContentRestriction restriction, string name)
        {
            XmlSchemaAttribute matchedAttribute = FindAttribute(restriction.Attributes, name);

            if (matchedAttribute == null)
            {
                XmlSchemaComplexType complexType = FindNamedType(schema, restriction.BaseTypeName);
                if (complexType != null)
                    matchedAttribute = FindAttribute(complexType, name);
            }

            return matchedAttribute;
        }

        void AddAttributeValue(AlfCompletionDataCollection data, string valueText)
        {
            AlfCompletionData completionData = new AlfCompletionData(valueText, AlfCompletionData.DataType.XmlAttributeValue);
            data.Add(completionData);
        }

        void AddAttributeValue(AlfCompletionDataCollection data, string valueText, XmlSchemaAnnotation annotation)
        {
            string documentation = GetDocumentation(annotation);
            AlfCompletionData completionData = new AlfCompletionData(valueText, documentation, AlfCompletionData.DataType.XmlAttributeValue);
            data.Add(completionData);
        }

        void AddAttributeValue(AlfCompletionDataCollection data, string valueText, string description)
        {
            AlfCompletionData completionData = new AlfCompletionData(valueText, description, AlfCompletionData.DataType.XmlAttributeValue);
            data.Add(completionData);
        }

        XmlSchemaSimpleType FindSimpleType(XmlQualifiedName name)
        {
            XmlSchemaSimpleType matchedSimpleType = null;

            foreach (XmlSchemaObject schemaObject in schema.SchemaTypes.Values)
                if (schemaObject is XmlSchemaSimpleType simpleType && simpleType.QualifiedName.Equals(name))
                {
                    matchedSimpleType = simpleType;
                    break;
                }

            return matchedSimpleType;
        }

        void AddSubstitionGroupElements(AlfCompletionDataCollection data, XmlQualifiedName group, string prefix)
        {
            foreach (XmlSchemaElement element in schema.Elements.Values)
                if (element.SubstitutionGroup == group)
                    AddElement(data, element.Name, prefix, element.Annotation);
        }

        XmlSchemaElement FindSubstitutionGroupElement(XmlQualifiedName group, QualifiedName name)
        {
            XmlSchemaElement matchedElement = null;

            foreach (XmlSchemaElement element in schema.Elements.Values)
                if (element.SubstitutionGroup == group
                    && !string.IsNullOrEmpty(element.Name)
                    && element.Name.Equals(name.Name))
                {
                    matchedElement = element;
                    break;
                }

            return matchedElement;
        }
    }
}
