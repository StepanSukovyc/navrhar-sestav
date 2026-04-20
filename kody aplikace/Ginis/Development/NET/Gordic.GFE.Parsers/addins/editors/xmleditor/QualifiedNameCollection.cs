//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.QualifiedNameCollection.cs             </Name>
//    <Description> Kolekce obsahující <see cref='QualifiedName'/> objekty.     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-24                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;

namespace Gordic.GFE.Parsers.XmlEditor
{
    /// <summary>
    /// Kolekce obsahující <see cref='QualifiedName'/> objekty.
    /// </summary>
    [Serializable()]
    public class QualifiedNameCollection : CollectionBase
    {
        /// <summary>
        /// Vytvoření nové instance třídy <see cref='QualifiedNameCollection'/>.
        /// </summary>
        public QualifiedNameCollection()
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy <see cref='QualifiedNameCollection'/> 
        /// založené na jiné třídě <see cref='QualifiedNameCollection'/>.
        /// </summary>
        /// <param name='val'>
        /// <see cref='QualifiedNameCollection'/> z které se kopíruje obsah
        /// </param>
        public QualifiedNameCollection(QualifiedNameCollection val)
        {
            this.AddRange(val);
        }

        /// <summary>
        /// Vytvoření nové instance třídy <see cref='QualifiedNameCollection'/> 
        /// obsahující objekty <see cref='QualifiedName'/> daného pole.
        /// </summary>
        /// <param name='val'>
        /// Pole objektů <see cref='QualifiedName'/>
        /// </param>
        public QualifiedNameCollection(QualifiedName[] val)
        {
            this.AddRange(val);
        }

        /// <summary>
        /// Představuje vstup na zadaném indexu <see cref='QualifiedName'/>.
        /// </summary>
        /// <param name='index'>Od 0 počítaný index pro nalezení v kolekci.</param>
        /// <value>Vstup na určeném indexu sbírky.</value>
        /// <exception cref='ArgumentOutOfRangeException'><paramref name='index'/> je mimo platný rozsah indexů pro sbírku.</exception>
        public QualifiedName this[int index]
        {
            get { return ((QualifiedName)(List[index])); }
            set { List[index] = value; }
        }

        /// <summary>
        /// Přidání objektu <see cref='QualifiedName'/> se specifickou hodnotou do kolekce 
        /// <see cref='QualifiedNameCollection'/>.
        /// </summary>
        /// <param name='val'>Přidávaný objekt <see cref='QualifiedName'/>.</param>
        /// <returns>Index právě přidaného objektu.</returns>
        public int Add(QualifiedName val)
        {
            return List.Add(val);
        }

        /// <summary>
        /// Zkopíruje prvky pole na konec kolekce <see cref='QualifiedNameCollection'/>.
        /// </summary>
        /// <param name='val'>
        /// Pole <see cref='QualifiedName'/> objektů přidávaných do kolekce.
        /// </param>
        /// <seealso cref='QualifiedNameCollection.Add'/>
        public void AddRange(QualifiedName[] val)
        {
            for (int i = 0; i < val.Length; i++)
                this.Add(val[i]);
        }

        /// <summary>
        /// Přidání obsahu jiné kolekce <see cref='QualifiedNameCollection'/> na konec dané kolekce.
        /// </summary>
        /// <param name='val'>
        /// Kolekce <see cref='QualifiedNameCollection'/> obsahující přidávané objekty.
        /// </param>
        /// <seealso cref='QualifiedNameCollection.Add'/>
        public void AddRange(QualifiedNameCollection val)
        {
            for (int i = 0; i < val.Count; i++)
                this.Add(val[i]);
        }

        /// <summary>
        /// Indikuje, zda kolekce 
        /// <see cref='QualifiedNameCollection'/> obsahuje specifický objekt <see cref='QualifiedName'/>.
        /// </summary>
        /// <param name='val'><see cref='QualifiedName'/> pro zjištění.</param>
        /// <returns>
        /// <see langword='true'/> pokud objekt <see cref='QualifiedName'/> se nachází v kolekci; 
        /// jinak - <see langword='false'/>.
        /// </returns>
        /// <seealso cref='QualifiedNameCollection.IndexOf'/>
        public bool Contains(QualifiedName val)
        {
            return List.Contains(val);
        }

        /// <summary>
        /// Kopíruje hodnoty kolekce <see cref='QualifiedNameCollection'/> 
        /// do jednorozměrného pole <see cref='Array'/> začínaje specifickým indexem
        /// </summary>
        /// <param name='array'>
        /// Jednorozměrné pole <see cref='Array'/> obsahující kopírované hodnoty kolekce <see cref='QualifiedNameCollection'/>.
        /// </param>
        /// <param name='index'>Index pole <paramref name='array'/> kde začíná kopírování.</param>
        /// <exception cref='ArgumentException'>
        ///   <para><paramref name='array'/> je vícerozměré.</para>
        ///   <para>-nebo-</para>
        /// </exception>
        /// <exception cref='ArgumentNullException'><paramref name='array'/> je <see langword='null'/>. </exception>
        /// než hranice pole <paramref name='array'/>.
        /// <seealso cref='Array'/>
        public void CopyTo(QualifiedName[] array, int index)
        {
            List.CopyTo(array, index);
        }

        /// <summary>
        /// Získání indexu elementu <see cref='QualifiedName'/> 
        /// v kolekci <see cref='QualifiedNameCollection'/>.
        /// </summary>
        /// <param name='val'><see cref='QualifiedName'/> k nalezení.</param>
        /// <returns>
        /// Index elementu <see cref='QualifiedName'/> s hodnotou <paramref name='val'/>
        /// v kolekci <see cref='QualifiedNameCollection'/> - pokud byl nalezen; 
        /// jinak - -1.
        /// </returns>
        /// <seealso cref='QualifiedNameCollection.Contains'/>
        public int IndexOf(QualifiedName val)
        {
            return List.IndexOf(val);
        }

        /// <summary>
        /// Vložení objektu <see cref='QualifiedName'/> do kolekce <see cref='QualifiedNameCollection'/> na specifický index.
        /// </summary>
        /// <param name='index'>Index, kam se má hodnota <paramref name='val'/> vložit.</param>
        /// <param name='val'>Objekt <see cref='QualifiedName'/> pro vložení.</param>
        /// <seealso cref='QualifiedNameCollection.Add'/>
        public void Insert(int index, QualifiedName val)
        {
            List.Insert(index, val);
        }

        /// <summary>
        /// Získání enumerátoru pro iteraci kolekce <see cref='QualifiedNameCollection'/>.
        /// </summary>
        /// <seealso cref='IEnumerator'/>
        public new QualifiedNameEnumerator GetEnumerator()
        {
            return new QualifiedNameEnumerator(this);
        }

        /// <summary>
        /// Odstranění specifického objektu <see cref='QualifiedName'/> z kolekce <see cref='QualifiedNameCollection'/>.
        /// </summary>
        /// <param name='val'>Objekt <see cref='QualifiedName'/> k odstranění 
        /// z kolekce <see cref='QualifiedNameCollection'/>.</param>
        /// <exception cref='ArgumentException'><paramref name='val'/> není nalezena v kolekci.</exception>
        public void Remove(QualifiedName val)
        {
            List.Remove(val);
        }

        /// <summary>
        /// Odstranění poslední položky kolekce.
        /// </summary>
        public void RemoveLast()
        {
            if (Count > 0)
                RemoveAt(Count - 1);
        }

        /// <summary>
        /// Odstranění první položky kolekce.
        /// </summary>
        public void RemoveFirst()
        {
            if (Count > 0)
                RemoveAt(0);
        }

        /// <summary>
        /// Získání jmenného prostoru poslední položky.
        /// </summary>
        public string LastPrefix
        {
            get
            {
                if (Count > 0)
                {
                    QualifiedName name = this[Count - 1];
                    return name.Prefix;
                }
                return String.Empty;
            }
        }

        /// <summary>
        /// Enumerator pro iterácí přes QualifiedNameCollection.
        /// </summary>
        /// <seealso cref='IEnumerator'/>
        /// <seealso cref='QualifiedNameCollection'/>
        /// <seealso cref='QualifiedName'/>
        public class QualifiedNameEnumerator : IEnumerator
        {
            IEnumerator baseEnumerator;
            IEnumerable temp;

            /// <summary>
            /// vytvoření nové instance třídy <see cref='QualifiedNameEnumerator'/>.
            /// </summary>
            /// <param name="mappings">Kolekce pro kterou se enumerátor vytváří</param>
            public QualifiedNameEnumerator(QualifiedNameCollection mappings)
            {
                this.temp = ((IEnumerable)(mappings));
                this.baseEnumerator = temp.GetEnumerator();
            }

            /// <summary>
            /// Zísjání aktuálního objektu <see cref='QualifiedName'/> v kolekci <seealso cref='QualifiedNameCollection'/>.
            /// </summary>
            public QualifiedName Current
            {
                get { return ((QualifiedName)(baseEnumerator.Current)); }
            }

            object IEnumerator.Current
            {
                get
                {
                    return baseEnumerator.Current;
                }
            }

            /// <summary>
            /// Přechod na další objekt <see cref='QualifiedName'/> kolekce <see cref='QualifiedNameCollection'/>.
            /// </summary>
            public bool MoveNext()
            {
                return baseEnumerator.MoveNext();
            }

            /// <summary>
            /// Nastaví enumerátor na výchozí pozici, která je před prvním prvkem kolekce <see cref='QualifiedNameCollection'/>.
            /// </summary>
            public void Reset()
            {
                baseEnumerator.Reset();
            }
        }
    }
}
