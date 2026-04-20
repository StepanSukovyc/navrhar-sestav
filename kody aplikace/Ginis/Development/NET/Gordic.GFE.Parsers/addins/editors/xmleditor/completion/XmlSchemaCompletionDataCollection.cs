//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlSchemaCompletionDataCollection.cs   </Name>
//    <Description> Kolekce uložených objektů <see cref='XmlSchemaCompletionData'/>.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.TextEditor.Gui.CompletionWindow;
using Gordic.GFE.Parsers.AlfEditor;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.XmlEditor
{
    /// <summary>
    /// Kolekce uložených objektů <see cref='XmlSchemaCompletionData'/>.
    /// </summary>
    [Serializable()]
    public class XmlSchemaCompletionDataCollection : System.Collections.CollectionBase
    {
        /// <summary>
        /// Vytvoření nové instance třídy <see cref='XmlSchemaCompletionDataCollection'/>.
        /// </summary>
        public XmlSchemaCompletionDataCollection()
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy <see cref='XmlSchemaCompletionDataCollection'/> 
        /// založené na jiné třídě <see cref='XmlSchemaCompletionDataCollection'/>.
        /// </summary>
        /// <param name='val'>
        /// <see cref='XmlSchemaCompletionDataCollection'/> ze které se kopíruje obsah
        /// </param>
        public XmlSchemaCompletionDataCollection(XmlSchemaCompletionDataCollection val)
        {
            this.AddRange(val);
        }

        /// <summary>
        /// Vytvoření nové instance třídy <see cref='XmlSchemaCompletionDataCollection'/> 
        /// obsahující pole objektů <see cref='XmlSchemaCompletionData'/>.
        /// </summary>
        /// <param name='val'>
        /// Pole objektů <see cref='XmlSchemaCompletionData'/> ze kterých probíhá inicializace dané třídy
        /// </param>
        public XmlSchemaCompletionDataCollection(XmlSchemaCompletionData[] val)
        {
            this.AddRange(val);
        }

        /// <summary>
        /// Představuje vstup na zadaném indexu <see cref='XmlSchemaCompletionData'/>.
        /// </summary>
        /// <param name='index'>Od 0 počítaný index pro nalezení v kolekci</param>
        /// <value>Vstup na určeném indexu sbírky.</value>
        /// <exception cref='ArgumentOutOfRangeException'>
        /// <paramref name='index'/> je mimo platný rozsah indexů pro sbírku.</exception>
        public XmlSchemaCompletionData this[int index]
        {
            get { return ((XmlSchemaCompletionData)(List[index])); }
            set { List[index] = value; }
        }

        /// <summary>
        /// Získání jmenného prostoru dat k dokončování
        /// </summary>
        /// <returns></returns>
        public ICompletionData[] GetNamespaceCompletionData()
        {
            List<ICompletionData> completionItems = new List<ICompletionData>();

            foreach (XmlSchemaCompletionData schema in this)
            {
                AlfCompletionData completionData = new AlfCompletionData(schema.NamespaceUri, AlfCompletionData.DataType.NamespaceUri);
                completionItems.Add(completionData);
            }

            return completionItems.ToArray();
        }

        /// <summary>
        /// Prezentuje vstup <see cref='XmlSchemaCompletionData'/> se specifickým URI jmenného prostoru.
        /// </summary>
        /// <param name='namespaceUri'>URI jmenného prostoru schématu.</param>
        /// <value>Vstup se zadaným URI jmenného prostoru.</value>
        public XmlSchemaCompletionData this[string namespaceUri]
        {
            get { return GetItem(namespaceUri); }
        }

        /// <summary>
        /// Přidání objektu <see cref='XmlSchemaCompletionData'/> se specifickou hodnotou do kolekce 
        /// <see cref='XmlSchemaCompletionDataCollection'/>.
        /// </summary>
        /// <param name='val'><see cref='XmlSchemaCompletionData'/> objekt pro přidání.</param>
        /// <returns>Index přidaného objektu.</returns>
        public int Add(XmlSchemaCompletionData val)
        {
            return List.Add(val);
        }

        /// <summary>
        /// Kopírování elementů pole na konec dané kolekce <see cref='XmlSchemaCompletionDataCollection'/>.
        /// </summary>
        /// <param name='val'>
        /// Pole objektů <see cref='XmlSchemaCompletionData'/> které se přidájí.
        /// </param>
        /// <seealso cref='XmlSchemaCompletionDataCollection.Add'/>
        public void AddRange(XmlSchemaCompletionData[] val)
        {
            for (int i = 0; i < val.Length; i++)
                this.Add(val[i]);
        }

        /// <summary>
        /// Přidání obsahu jiné kolekce <see cref='XmlSchemaCompletionDataCollection'/> na konec dané kolekce.
        /// </summary>
        /// <param name='val'>
        /// Kolekce <see cref='XmlSchemaCompletionDataCollection'/> obsahující objekty pro přidání.
        /// </param>
        /// <seealso cref='XmlSchemaCompletionDataCollection.Add'/>
        public void AddRange(XmlSchemaCompletionDataCollection val)
        {
            for (int i = 0; i < val.Count; i++)
                this.Add(val[i]);
        }

        /// <summary>
        /// Indikuje, že kolekce <see cref='XmlSchemaCompletionDataCollection'/> 
        /// obsahuje specifický prvek <see cref='XmlSchemaCompletionData'/>.
        /// </summary>
        /// <param name='val'>Prvek <see cref='XmlSchemaCompletionData'/> pro nalezení.</param>
        /// <returns>
        /// <see langword='true'/> pokud kolekce obsahuje prvek <see cref='XmlSchemaCompletionData'/>; 
        /// jiank - <see langword='false'/>.
        /// </returns>
        /// <seealso cref='XmlSchemaCompletionDataCollection.IndexOf'/>
        public bool Contains(XmlSchemaCompletionData val)
        {
            return List.Contains(val);
        }

        /// <summary>
        /// kopíruje prvky dané kolekce <see cref='XmlSchemaCompletionDataCollection'/> 
        /// do jednorozměrného pole <see cref='Array'/> na specifický index.
        /// </summary>
        /// <param name='array'>Jednorozměrné pole <see cref='Array'/> do kterého se kopírují prvky 
        /// kolekce <see cref='XmlSchemaCompletionDataCollection'/>.
        /// </param>
        /// <param name='index'>Index pole <paramref name='array'/>, na který se začíná kopírovat.</param>
        /// <exception cref='ArgumentException'>
        ///   <para><paramref name='array'/> je více rozměrné pole.</para>
        ///   <para>-nebo-</para>
        /// </exception>
        /// <exception cref='ArgumentNullException'><paramref name='array'/> je <see langword='null'/>. </exception>
        /// <seealso cref='Array'/>
        public void CopyTo(XmlSchemaCompletionData[] array, int index)
        {
            List.CopyTo(array, index);
        }

        /// <summary>
        /// získání indexu prvku <see cref='XmlSchemaCompletionData'/> 
        /// v kolekci <see cref='XmlSchemaCompletionDataCollection'/>.
        /// </summary>
        /// <param name='val'>Prvek <see cref='XmlSchemaCompletionData'/> pro získání indexu.</param>
        /// <returns>
        ///   Index prvku <see cref='XmlSchemaCompletionData'/> s hodnotou <paramref name='val'/>
        ///   v kolekci <see cref='XmlSchemaCompletionDataCollection'/> pokud je nalezen; jinak - -1.
        /// </returns>
        /// <seealso cref='XmlSchemaCompletionDataCollection.Contains'/>
        public int IndexOf(XmlSchemaCompletionData val)
        {
            return List.IndexOf(val);
        }

        /// <summary>
        /// Vložení prvku <see cref='XmlSchemaCompletionData'/> do kolekce <see cref='XmlSchemaCompletionDataCollection'/> 
        /// na specifický index.
        /// </summary>
        /// <param name='index'>Index, na který se vkládá hodnota <paramref name='val'/>.</param>
        /// <param name='val'>Vkládaná hodnota <see cref='XmlSchemaCompletionData'/>.</param>
        /// <seealso cref='XmlSchemaCompletionDataCollection.Add'/>
        public void Insert(int index, XmlSchemaCompletionData val)
        {
            List.Insert(index, val);
        }

        /// <summary>
        /// Enumerátor pro práci s kolekci <see cref='XmlSchemaCompletionDataCollection'/>.
        /// </summary>
        public new XmlSchemaCompletionDataEnumerator GetEnumerator()
        {
            return new XmlSchemaCompletionDataEnumerator(this);
        }

        /// <summary>
        /// Odstranění specifické položky <see cref='XmlSchemaCompletionData'/> 
        /// z kolekce <see cref='XmlSchemaCompletionDataCollection'/>.
        /// </summary>
        /// <param name='val'>Položka <see cref='XmlSchemaCompletionData'/> k odstranění
        /// z kolekce <see cref='XmlSchemaCompletionDataCollection'/>.</param>
        /// <exception cref='ArgumentException'><paramref name='val'/> pokud položka nebude nalezená v kolekci.</exception>
        public void Remove(XmlSchemaCompletionData val)
        {
            List.Remove(val);
        }

        /// <summary>
        /// Získá schématu vyplněných údajů se stejným názvem souboru.
        /// </summary>
        /// <param name="fileName">Název souboru schématu</param>
        /// <returns><see langword="null"/> pokud schéma nebude nalezeno.</returns>
        public XmlSchemaCompletionData GetSchemaFromFileName(string fileName)
        {
            foreach (XmlSchemaCompletionData schema in this)
                if (FileUtility.IsEqualFileName(schema.FileName, fileName))
                    return schema;
            return null;
        }

        /// <summary>
        /// Enumerátor pro iterací elementů kolekce XmlSchemaCompletionDataCollection.
        /// </summary>
        /// <seealso cref='XmlSchemaCompletionDataCollection'/>
        /// <seealso cref='XmlSchemaCompletionData'/>
        public class XmlSchemaCompletionDataEnumerator : System.Collections.IEnumerator
        {
            System.Collections.IEnumerator baseEnumerator;
            System.Collections.IEnumerable temp;

            /// <summary>
            /// Vytvoření instance nové třídy <see cref='XmlSchemaCompletionDataEnumerator'/>.
            /// </summary>
            /// <param name="mappings">Kolekce, pro kterou se vytváří daný enumerátor</param>
            public XmlSchemaCompletionDataEnumerator(XmlSchemaCompletionDataCollection mappings)
            {
                this.temp = ((System.Collections.IEnumerable)(mappings));
                this.baseEnumerator = temp.GetEnumerator();
            }

            /// <summary>
            /// Získání aktuální položky <see cref='XmlSchemaCompletionData'/> 
            /// v kolekci <seealso cref='XmlSchemaCompletionDataCollection'/>.
            /// </summary>
            public XmlSchemaCompletionData Current
            {
                get { return ((XmlSchemaCompletionData)(baseEnumerator.Current)); }
            }

            object System.Collections.IEnumerator.Current
            {
                get { return baseEnumerator.Current; }
            }

            /// <summary>
            /// Nalezení dalšího prvku <see cref='XmlSchemaCompletionData'/> 
            /// kolekce <see cref='XmlSchemaCompletionDataCollection'/>.
            /// </summary>
            public bool MoveNext()
            {
                return baseEnumerator.MoveNext();
            }

            /// <summary>
            /// Nastaví enumerátor na výchozí pozici, která je před prvním prvkem kolekce <see cref='XmlSchemaCompletionDataCollection'/>.
            /// </summary>
            public void Reset()
            {
                baseEnumerator.Reset();
            }
        }

        XmlSchemaCompletionData GetItem(string namespaceUri)
        {
            XmlSchemaCompletionData matchedItem = null;

            foreach (XmlSchemaCompletionData item in this)
                if (item.NamespaceUri == namespaceUri)
                {
                    matchedItem = item;
                    break;
                }

            return matchedItem;
        }
    }
}
