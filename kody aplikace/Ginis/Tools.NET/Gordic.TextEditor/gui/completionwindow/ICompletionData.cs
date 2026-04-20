// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System;

namespace Gordic.TextEditor.Gui.CompletionWindow
{
    /// <summary>
    /// kompletní údaje o dokončovací položce
    /// </summary>
	public interface ICompletionData
	{
        /// <summary>
        /// index obrázku (položky dokončení) externího seznamu všech dostupných obrázků
        /// </summary>
        int ImageIndex { get; }
		/// <summary>
		/// text položky
		/// </summary>
        string Text { get; set; }
		/// <summary>
		/// popis položky
		/// </summary>
        string Description { get; }
		
		/// <summary>
        /// Získá hodnotu priority pro dokončení datové položky.
        /// Užitečné při výběru položky podle jejich počátečních znaků, 
        /// položka s nejvyšší prioritou je vybrána jako první.
		/// </summary>
        double Priority { get; }

        /// <summary>
        /// Indikuje, jedinečnost dokončovací položky dle počatečních znaků.
        /// </summary>
        bool IsUnique { get; set; }

		/// <summary>
		/// Vložení prvku do textového editoru
		/// </summary>
		/// <param name="textArea">TextArea do které se vkláda dokončovací položka.</param>
        /// <param name="ch">
        /// Znak, který by měl být po dokončení dat vložen.
        /// Použijte \0, pokud nechcete vkládat žádný znak.
        /// </param>
        /// <returns>
        /// TRUE pokud akce vložení byla dokončená znakem <paramref name="ch"/>; jinak FALSE.
        /// </returns>
        bool InsertAction(TextArea textArea, char ch);
	}
	
    /// <summary>
    /// vychozí dokončovací položka
    /// </summary>
	public class DefaultCompletionData : ICompletionData
	{
		int imageIndex;
        /// <summary>
        /// index obrázku (položky dokončení) externího seznamu všech dostupných obrázků
        /// </summary>
        public int ImageIndex { get { return imageIndex; } }

        string text;
        /// <summary>
        /// text položky
        /// </summary>
        public string Text { get { return text; } set { text = value; } }

        string description;
        /// <summary>
        /// popis položky
        /// </summary>
        public virtual string Description { get { return description; } }
		
        /// <summary>
        /// Získá hodnotu priority pro dokončení datové položky.
        /// Užitečné při výběru položky podle jejich počátečních znaků, 
        /// položka s nejvyšší prioritou je vybrána jako první.
        /// </summary>
        public double Priority { get; set; }

        /// <summary>
        /// Indikuje, jedinečnost dokončovací položky dle počatečních znaků.
        /// </summary>
        public bool IsUnique { get; set; }

        /// <summary>
        /// Vložení prvku do textového editoru
        /// </summary>
        /// <param name="textArea">TextArea do které se vkláda dokončovací položka.</param>
        /// <param name="ch">
        /// Znak, který by měl být po dokončení dat vložen.
        /// Použijte \0, pokud nechcete vkládat žádný znak.
        /// </param>
        /// <returns>
        /// TRUE pokud akce vložení byla dokončená znakem <paramref name="ch"/>; jinak FALSE.
        /// </returns>
        public virtual bool InsertAction(TextArea textArea, char ch)
		{
			textArea.InsertString(text);
			return false;
		}
		
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="text">text dokončovací položky</param>
        /// <param name="imageIndex">index obrázku (položky dokončení) externího seznamu všech dostupných obrázků</param>
		public DefaultCompletionData(string text, int imageIndex)
		{
			this.text        = text;
			this.imageIndex  = imageIndex;
		}

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="text">text položky</param>
        /// <param name="description">popis položky</param>
        /// <param name="imageIndex">index obrázku (položky dokončení) externího seznamu všech dostupných obrázků</param>
        public DefaultCompletionData(string text, string description, int imageIndex)
		{
			this.text        = text;
			this.description = description;
			this.imageIndex  = imageIndex;
		}
		
        /// <summary>
        /// porovnání dvou dokončovacích položek
        /// </summary>
        /// <param name="a">první porovnávaná položka</param>
        /// <param name="b">druhá porovnávaná položka</param>
        /// <returns></returns>
		public static int Compare(ICompletionData a, ICompletionData b)
		{
			if (a == null)
				throw new ArgumentNullException("a");
			if (b == null)
				throw new ArgumentNullException("b");
			return string.Compare(a.Text, b.Text, StringComparison.InvariantCultureIgnoreCase);
		}
	}
}
