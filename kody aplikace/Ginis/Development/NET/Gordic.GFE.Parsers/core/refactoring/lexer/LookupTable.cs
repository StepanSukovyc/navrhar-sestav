//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.LookupTable.cs                           </Name>
//    <Description> Mapování klíčových slov.                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using System.Globalization;

namespace Gordic.GFE.Parsers.Refactoring.Lexer
{
    /// <summary>
    /// Mapování klíčových slov. 
    /// Implementuje číselné hledání slov.
    /// </summary>
    internal class LookupTable
    {
        /// <summary>
        /// pomocná třída větve
        /// </summary>
        sealed class Node
        {
            /// <summary>
            /// slovo větve
            /// </summary>
            public string word;
            /// <summary>
            /// číselna hodnota větve
            /// </summary>
            public int val;
            /// <summary>
            /// seznam větví
            /// </summary>
            public Node[] leaf = new Node[256];

            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            /// <param name="val"></param>
            /// <param name="word"></param>
            public Node(int val, string word)
            {
                this.word = word;
                this.val = val;
            }
        }

        readonly Node root = new Node(-1, null);
        readonly bool casesensitive;
        int length;

        /// <value>
        /// Počet elementů v tabulce
        /// </value>
        public int Count { get { return length; } }

        /// <summary>
        /// Vložení INT hodnoty do stromu dle klíčového slova
        /// </summary>
        public int this[string keyword]
        {
            get
            {
                Node next = root;

                if (!casesensitive)
                    keyword = keyword.ToUpper(CultureInfo.InvariantCulture);

                for (int i = 0; i < keyword.Length; ++i)
                {
                    int index = ((int)keyword[i]) % 256;
                    next = next.leaf[index];

                    if (next == null)
                        return -1;

                    if (keyword == next.word)
                        return next.val;
                }
                return -1;
            }
            set
            {
                Node node = root;
                Node next = root;

                if (!casesensitive)
                    keyword = keyword.ToUpper(CultureInfo.InvariantCulture);

                ++length;

                // vložení slova do stromu
                for (int i = 0; i < keyword.Length; ++i)
                {
                    int index = ((int)keyword[i]) % 256; // pozice aktuálního symbolu
                    bool d = keyword[i] == '\\';

                    next = next.leaf[index];// získání větve pro tento index

                    if (next == null)
                    { // žádná větev nebyla vytvořená -> vložíme zde slovo
                        node.leaf[index] = new Node(value, keyword);
                        break;
                    }

                    if (next.word != null && next.word.Length != i)
                    { // větev je tady, získáme obsah větve a vložíme hoznovu
                        string tmpword = next.word;// toto slovo bude vlo6eno do prvního úrovně zanoření
                        int tmpval = next.val;
                        next.val = -1;
                        next.word = null;
                        this[tmpword] = tmpval;
                    }

                    if (i == keyword.Length - 1)
                    { 
                        // nalazen konec klíčového slova, zde vložíme větev, pokud se zde nachází větev, tak bude znovu vložená
                        // v případě, že je větev stejné délky (slova jsou stejná), pak bude přepsaná
                        next.word = keyword;
                        next.val = value;
                        break;
                    }

                    node = next;
                }
            }
        }

        /// <summary>
        /// Vytvoření nové instance <see cref="LookupTable"/>
        /// </summary>
        public LookupTable(bool casesensitive)
        {
            this.casesensitive = casesensitive;
        }
    }
}
