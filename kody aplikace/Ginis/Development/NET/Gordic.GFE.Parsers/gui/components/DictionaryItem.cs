//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DictionaryItem.cs                        </Name>
//    <Description> Položka seznamu atributů                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing.Design;
using Gordic.GFE.Parsers.UndoRedoFramework;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Položka seznamu atributů
    /// </summary>
    [EditorAttribute(typeof(DictionaryItemEditor), typeof(UITypeEditor))]
    public class DictionaryItem
    {
        readonly UndoRedo<string> key = new UndoRedo<string>();
        /// <summary>
        /// Název atributu
        /// </summary>
        [DisplayName("klíč")]
        [Description("Klíč položky seznamu")]
        public string Key { get { return key.Value; } set { key.Value = value; } }

        readonly UndoRedo<string> m_value = new UndoRedo<string>();
        /// <summary>
        /// Název atributu
        /// </summary>
        [DisplayName("hodnota")]
        [Description("Hodnota položky seznamu")]
        public string Value { get { return m_value.Value; } set { m_value.Value = value; } }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public DictionaryItem() { }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="item">Položka, ze které se vezmou informace pro nový atribut</param>
        public DictionaryItem(KeyValuePair<string, string> item)
        {
            Key = item.Key;
            Value = item.Value;
        }
        /// <summary>
        /// vytvoření nové instance třídy dle jiné
        /// </summary>
        /// <param name="item">vzorová instance třídy</param>
        public DictionaryItem(DictionaryItem item)
        {
            if (item != null)
            {
                Key = item.Key;
                Value = item.Value;
            }
        }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="key">klíčová hodnota</param>
        /// <param name="value">hodnota klíče</param>
        public DictionaryItem(string key, string value)
        {
            // TODO: Complete member initialization
            Key = key;
            Value = value;
        }

        /// <summary>
        /// řetězcová prezentace položky
        /// </summary>
        /// <returns></returns>
        public override string ToString() { return m_value.Value; }
    }
}
