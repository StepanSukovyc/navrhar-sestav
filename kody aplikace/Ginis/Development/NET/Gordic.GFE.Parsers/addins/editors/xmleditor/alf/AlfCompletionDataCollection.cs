//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlCompletionDataCollection.cs         </Name>
//    <Description> Kolekce <see cref='XmlCompletionData'/> objektu.            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using Gordic.TextEditor.Gui.CompletionWindow;

namespace Gordic.GFE.Parsers.AlfEditor
{
    /// <summary>
    /// Kolekce <see cref='AlfCompletionData'/> objektu.
    /// </summary>
    [Serializable()]
    public class AlfCompletionDataCollection : CollectionBase
    {
        /// <summary>
        /// Vytvoření nové instance třídy <see cref='AlfCompletionDataCollection'/>.
        /// </summary>
        public AlfCompletionDataCollection()
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy <see cref='AlfCompletionDataCollection'/> 
        /// založené na jiné třídě <see cref='AlfCompletionDataCollection'/>.
        /// </summary>
        /// <param name='val'>
        /// <see cref='AlfCompletionDataCollection'/> z které se kopíruje obsah
        /// </param>
        public AlfCompletionDataCollection(AlfCompletionDataCollection val)
        {
            this.AddRange(val);
        }

        /// <summary>
        /// Vytvoření nové instance třídy <see cref='AlfCompletionDataCollection'/> 
        /// obsahující objekty <see cref='AlfCompletionData'/> nějakého pole.
        /// </summary>
        /// <param name='val'>
        /// Pole objektů <see cref='AlfCompletionData'/> z kterých se vytváří daná kolekce
        /// </param>
        public AlfCompletionDataCollection(AlfCompletionData[] val)
        {
            this.AddRange(val);
        }

        /// <summary>
        /// Představuje vstup na zadaném indexu <see cref='AlfCompletionData'/>.
        /// </summary>
        /// <param name='index'>
        /// Od 0 počítaný index pro nalezení v kolekci
        /// </param>
        /// <value>Vstup na určeném indexu sbírky.</value>
        /// <exception cref='ArgumentOutOfRangeException'>
        /// <paramref name='index'/> je mimo platný rozsah indexů pro sbírku.</exception>
        public AlfCompletionData this[int index]
        {
            get { return ((AlfCompletionData)(List[index])); }
            set { List[index] = value; }
        }

        /// <summary>
        /// Přidání objektu <see cref='AlfCompletionData'/> se specifickou hodnotou 
        /// do kolekce <see cref='AlfCompletionDataCollection'/>.
        /// </summary>
        /// <remarks>
        /// Pokud data v kolekci již existují, pak se nepřidávají.
        /// </remarks>
        /// <param name='val'><see cref='AlfCompletionData'/> pro přidání.</param>
        /// <returns>Index elementu na který se data vložila.</returns>
        public int Add(AlfCompletionData val)
        {
            int index = -1;
            if (!Contains(val))
                index = List.Add(val);

            return index;
        }

        /// <summary>
        /// Zkopíruje prvky pole na konec kolekce <see cref='AlfCompletionDataCollection'/>.
        /// </summary>
        /// <param name='val'>
        /// Pole <see cref='AlfCompletionData'/> objektů přidávaných do kolekce.
        /// </param>
        /// <seealso cref='AlfCompletionDataCollection.Add'/>
        public void AddRange(AlfCompletionData[] val)
        {
            for (int i = 0; i < val.Length; i++)
                this.Add(val[i]);
        }

        /// <summary>
        /// Přidání obsahu jiné kolekce <see cref='AlfCompletionDataCollection'/> na konec dané kolekce.
        /// </summary>
        /// <param name='val'>
        /// Kolekce <see cref='AlfCompletionDataCollection'/> obsahující přidávané objekty.
        /// </param>
        /// <seealso cref='AlfCompletionDataCollection.Add'/>
        public void AddRange(AlfCompletionDataCollection val)
        {
            for (int i = 0; i < val.Count; i++)
                this.Add(val[i]);
        }

        /// <summary>
        /// Indikuje, zda kolekce <see cref='AlfCompletionDataCollection'/> obsahuje 
        /// specifický objekt <see cref='AlfCompletionData'/>.
        /// </summary>
        /// <param name='val'><see cref='AlfCompletionData'/> pro zjištění.</param>
        /// <returns>
        /// <see langword='true'/> pokud objekt <see cref='AlfCompletionData'/> se nachází v kolekci; 
        /// jinak - <see langword='false'/>.
        /// </returns>
        /// <seealso cref='AlfCompletionDataCollection.IndexOf'/>
        public bool Contains(AlfCompletionData val)
        {
            return val.Text != null && !string.IsNullOrEmpty(string.Join(string.Empty, val.Text))
                    ? Contains(string.Join(string.Empty, val.Text))
                    : false;
        }

        /// <summary>
        /// Indikuje, zda specifický název se nachází v kolekci
        /// </summary>
        /// <param name="name">Specifický název</param>
        /// <returns></returns>
        public bool Contains(string name)
        {
            bool contains = false;

            foreach (AlfCompletionData data in this)
            {
                if (data.Text != null
                    && !string.IsNullOrEmpty(string.Join(string.Empty, data.Text))
                    && string.Equals(string.Join(string.Empty, data.Text), name, StringComparison.InvariantCultureIgnoreCase))
                {
                    contains = true;
                    break;
                }
            }

            return contains;
        }

        /// <summary>
        /// Kopíruje hodnoty kolekce <see cref='AlfCompletionDataCollection'/> 
        /// do jednorozměrného pole <see cref='Array'/> začínaje specifickým indexem
        /// </summary>
        /// <param name='array'>
        /// Jednorozměrné pole <see cref='Array'/> obsahující kopírované hodnoty kolekce <see cref='AlfCompletionDataCollection'/>.
        /// </param>
        /// <param name='index'>
        /// Index pole <paramref name='array'/> kde začíná kopírování.
        /// </param>
        /// <exception cref='ArgumentException'>
        ///   <para><paramref name='array'/> je vícerozměré.</para>
        ///   <para>-nebo-</para>
        /// </exception>
        /// <exception cref='ArgumentNullException'><paramref name='array'/> je <see langword='null'/>. </exception>
        /// <seealso cref='Array'/>
        public void CopyTo(AlfCompletionData[] array, int index)
        {
            List.CopyTo(array, index);
        }

        /// <summary>
        /// Kopíruje hodnoty kolekce <see cref='AlfCompletionDataCollection'/> 
        /// do jednorozměrného pole <see cref='Array'/> začínaje specifickým indexem
        /// </summary>
        /// <param name='array'>
        /// Jednorozměrné pole <see cref='Array'/> obsahující kopírované hodnoty kolekce <see cref='AlfCompletionDataCollection'/>.
        /// </param>
        /// <param name='index'>
        /// Index pole <paramref name='array'/> kde začíná kopírování.
        /// </param>
        public void CopyTo(ICompletionData[] array, int index)
        {
            List.CopyTo(array, index);
        }

        /// <summary>
        /// Získání indexu elementu <see cref='AlfCompletionData'/> 
        /// v kolekci <see cref='AlfCompletionDataCollection'/>.
        /// </summary>
        /// <param name='val'><see cref='AlfCompletionData'/> k nalezení.</param>
        /// <returns>
        /// Index elementu <see cref='AlfCompletionData'/> s hodnotou <paramref name='val'/>
        /// v kolekci <see cref='AlfCompletionDataCollection'/> - pokud byl nalezen;
        /// jinak - -1.
        /// </returns>
        public int IndexOf(AlfCompletionData val)
        {
            return List.IndexOf(val);
        }

        /// <summary>
        /// Vložení objektu <see cref='AlfCompletionData'/> do kolekce <see cref='AlfCompletionDataCollection'/> 
        /// na specifický index.
        /// </summary>
        /// <param name='index'>Index, kam se má hodnota <paramref name='val'/> vložit.</param>
        /// <param name='val'>Objekt <see cref='AlfCompletionData'/> pro vložení.</param>
        /// <seealso cref='AlfCompletionDataCollection.Add'/>
        public void Insert(int index, AlfCompletionData val)
        {
            List.Insert(index, val);
        }

        /// <summary>
        /// Pole objektů <see cref="ICompletionData"/> dané kolekce.
        /// </summary>
        /// <returns></returns>
        public ICompletionData[] ToArray()
        {
            ICompletionData[] data = new ICompletionData[Count];
            CopyTo(data, 0);
            return data;
        }

        /// <summary>
        /// Získání enumerátoru pro iteraci kolekce <see cref='AlfCompletionDataCollection'/>.
        /// </summary>
        /// <seealso cref='IEnumerator'/>
        public new XmlCompletionDataEnumerator GetEnumerator()
        {
            return new XmlCompletionDataEnumerator(this);
        }

        /// <summary>
        /// Odstranění specifického objektu <see cref='AlfCompletionData'/> 
        /// z kolekce <see cref='AlfCompletionDataCollection'/>.
        /// </summary>
        /// <param name='val'>
        /// Objekt <see cref='AlfCompletionData'/> k odstranění 
        /// z kolekce <see cref='AlfCompletionDataCollection'/>.
        /// </param>
        /// <exception cref='ArgumentException'><paramref name='val'/> není nalezena v kolekci.</exception>
        public void Remove(AlfCompletionData val)
        {
            List.Remove(val);
        }

        /// <summary>
        /// Enumerator pro iterácí přes XmlCompletionDataCollection.
        /// </summary>
        /// <seealso cref='IEnumerator'/>
        /// <seealso cref='AlfCompletionDataCollection'/>
        /// <seealso cref='AlfCompletionData'/>
        public class XmlCompletionDataEnumerator : IEnumerator
        {
            IEnumerator baseEnumerator;
            IEnumerable temp;

            /// <summary>
            /// vytvoření nové instance třídy <see cref='XmlCompletionDataEnumerator'/>.
            /// </summary>
            /// <param name="mappings">Kolekce pro kterou se enumerátor vytváří</param>
            public XmlCompletionDataEnumerator(AlfCompletionDataCollection mappings)
            {
                this.temp = ((IEnumerable)(mappings));
                this.baseEnumerator = temp.GetEnumerator();
            }

            /// <summary>
            /// Zísjání aktuálního objektu <see cref='AlfCompletionData'/> v kolekci <seealso cref='AlfCompletionDataCollection'/>.
            /// </summary>
            public AlfCompletionData Current
            {
                get { return ((AlfCompletionData)(baseEnumerator.Current)); }
            }

            object IEnumerator.Current { get { return baseEnumerator.Current; } }

            /// <summary>
            /// Přechod na další objekt <see cref='AlfCompletionData'/> kolekce <see cref='AlfCompletionDataCollection'/>.
            /// </summary>
            public bool MoveNext() { return baseEnumerator.MoveNext(); }

            /// <summary>
            /// Nastaví enumerátor na výchozí pozici, která je před prvním prvkem kolekce <see cref='AlfCompletionDataCollection'/>.
            /// </summary>
            public void Reset() { baseEnumerator.Reset(); }
        }
    }
}
