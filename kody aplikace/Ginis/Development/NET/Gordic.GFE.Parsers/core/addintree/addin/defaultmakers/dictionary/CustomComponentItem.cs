//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CustomComponentItem.cs                 </Name>
//    <Description> položka listu obsahujícího seznam nových komponent          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// položka listu obsahujícího seznam nových komponent
    /// </summary>
    public class CustomComponentItem : ICloneable
    {
        /// <summary>
        /// Hodnota InnerText: se bere z hodnoty posledního známého atributu s hodnotou
        /// </summary>
        public string Value { get; set; }
        /// <summary>
        /// Tag komponenty
        /// </summary>
        public string Tag { get; set; }

        /// <summary>
        /// Typ komponenty
        /// </summary>
        public ComponentType Type { get; set; }

        /// <summary>
        /// Řetězcová prezentace objektu
        /// </summary>
        public string Text { get => GetText(); }

        readonly Hashtable attributes;
        /// <summary>
        /// Atributy komponenty
        /// </summary>
        public Hashtable Attributes { get => attributes; }

        /// <summary>
        /// Načtení atributů
        /// </summary>
        private string GetText()
        {
            string result = string.Format("<{0} ", Tag);

            foreach (DictionaryEntry item in Attributes)
                result = string.Format("{0} {1}=\"{2}\"", result, item.Key, item.Value);

            return !string.IsNullOrEmpty(Value)
                ? string.Format("{0}>{1}</{2}>", result, Value, Tag)
                : string.Format("{0} />", result);
        }

        /// <summary>
        /// Titulek položky
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Vytvření nové instance třídy
        /// </summary>
        /// <param name="title">Titulek položky</param>
        public CustomComponentItem(string title)
        {
            attributes = new Hashtable();
            Title = title;
        }

        /// <summary>
        /// Vytvoření objektu dle originálu
        /// </summary>
        /// <param name="origin">Originál</param>
        protected CustomComponentItem(CustomComponentItem origin)
        {
            this.Value = origin.Value;
            this.Tag = origin.Tag;
            this.Type = origin.Type;
            this.Title = origin.Title;
            this.attributes = new Hashtable();
            foreach (DictionaryEntry item in origin.Attributes)
                this.Attributes.Add(item.Key, item.Value);
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="tag"></param>
        /// <param name="type"></param>
        /// <param name="attributes"></param>
        public CustomComponentItem(string tag, string type, ArrayList attributes)
        {
            this.Tag = tag;
            ComponentType ct = ComponentType.none;
            Enum.TryParse(type, out ct);
            Type = ct;
            this.attributes = new Hashtable();
            if (attributes != null)
                foreach (DictionaryEntry item in attributes)
                    AddAttribute(item.Key, item.Value);
        }

        /// <summary>
        /// Přidání atributu do seznamu atributů
        /// </summary>
        /// <param name="key">Klíč atributu</param>
        /// <param name="value">Hodnota atributu</param>
        public void AddAttribute(object key, object value)
        {
            if (!Attributes.ContainsKey(key))
                Attributes.Add(key, value);
        }

        /// <summary>
        /// Přidání atributu do seznamu atributů
        /// </summary>
        /// <param name="attributes">Atributy: sudý - key, lichý - value (zero-index)</param>
        public void AddAttribute(params string[] attributes)
        {
            int index = 0;
            for (int i = 0; i < attributes.Length; i++)
            {
                Attributes.Add(attributes[i], (index * 2 + 1) < attributes.Length ? attributes[index * 2 + 1] : string.Empty);
                index++;
                i++;
            }
        }

        /// <summary>
        /// Odstranění atributu ze seznamu atributů
        /// </summary>
        /// <param name="key">Klíč atribbutu pro odstranění</param>
        public void RemoveAttribute(string key)
        {
            if (Attributes.ContainsKey(key))
                Attributes.Remove(key);
        }

        /// <summary>
        /// Přetížení kvůli porovnání s řetězcovou hodnotou
        /// </summary>
        /// <param name="obj">Objekt porovnání</param>
        /// <returns></returns>
        public override bool Equals(object obj)
        {
            if (obj is string)
                return String.Equals((obj as string), this.Text, StringComparison.InvariantCultureIgnoreCase);
            else if (!(obj is CustomComponentItem))
                return base.Equals(obj);

            CustomComponentItem objasof = (obj as CustomComponentItem);
            return string.Equals(Text, objasof.Text, StringComparison.InvariantCultureIgnoreCase);
        }

        /// <summary>
        /// Kvůli textu v textbox seznamu
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return Title;
        }

        /// <summary>
        /// Kvůli přetížení ToString()
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        #region ICloneable
        /// <summary>
        /// Klon daného objektu
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return new CustomComponentItem(this);
        }
        #endregion
    }
}
