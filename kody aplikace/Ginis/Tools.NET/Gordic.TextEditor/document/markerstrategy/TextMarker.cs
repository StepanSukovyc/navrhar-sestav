// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Daniel Grunwald" email="daniel@danielgrunwald.de"/>
//     <version>$Revision$</version>
// </file>

using System;
using System.Drawing;

namespace Gordic.TextEditor.Document
{
    /// <summary>
    /// Typy označení
    /// </summary>
	public enum TextMarkerType
	{
        /// <summary>
        /// neviditelný - uloží do seznamu zvýrazněného textu 
        /// ale nijak v dokumentu se tato část textu neprojeví.
        /// </summary>
		Invisible,
        /// <summary>
        /// zvýraznění do vyplněného rámečku
        /// </summary>
		SolidBlock,
        /// <summary>
        /// zvýraznění podtržením
        /// </summary>
		Underlined,
        /// <summary>
        /// zvýraznění vlnkou
        /// </summary>
		WaveLine
	}
	
	/// <summary>
	/// Označení části dokumentu.
	/// </summary>
	public class TextMarker : AbstractSegment
	{
		TextMarkerType textMarkerType;
		Color          color;
		Color          foreColor;
		string         toolTip = null;
		bool           overrideForeColor = false;

        /// <summary>
        /// Typ zvýraznění
        /// </summary>
        public TextMarkerType TextMarkerType { get { return textMarkerType; } }
		/// <summary>
		/// Barva pozadí (případ typu SolidBlack)
		/// </summary>
        public Color Color { get { return color; } }
		/// <summary>
		/// Barva textu zvýraznění
		/// </summary>
        public Color ForeColor { get { return foreColor; } }
		/// <summary>
		/// Přetížení barvy textu
		/// </summary>
        public bool OverrideForeColor { get { return overrideForeColor; } }
		/// <summary>
        /// Označí blok textu jen pro čtení.
		/// </summary>
		public bool IsReadOnly { get; set; }
		/// <summary>
		/// Bublinka nápovědy pro zvýrazněný text
		/// </summary>
        public string ToolTip { get { return toolTip; } set { toolTip = value; } }
		/// <summary>
        /// Získá pozici posledního symbolu, který je uvnitř zvýraznění.
		/// </summary>
        public int EndOffset { get { return Offset + Length - 1; } }
		
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="offset">Pozice začátku části textu.</param>
        /// <param name="length">Délka části.</param>
        /// <param name="textMarkerType">Typ značky textu.</param>
		public TextMarker(int offset, int length, TextMarkerType textMarkerType) : this(offset, length, textMarkerType, Color.Red)
		{
		}

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="offset">Pozice začátku části textu.</param>
        /// <param name="length">Délka části.</param>
        /// <param name="textMarkerType">Typ značky textu.</param>
        /// <param name="color">Barva pozadí části textu.</param>
		public TextMarker(int offset, int length, TextMarkerType textMarkerType, Color color)
		{
			if (length < 1) length = 1;
			this.offset          = offset;
			this.length          = length;
			this.textMarkerType  = textMarkerType;
			this.color           = color;
		}

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="offset">Pozice začátku části textu.</param>
        /// <param name="length">Délka části.</param>
        /// <param name="textMarkerType">Typ značky textu.</param>
        /// <param name="color">Barva pozadí části textu.</param>
        /// <param name="foreColor">Barva textu dané části.</param>
		public TextMarker(int offset, int length, TextMarkerType textMarkerType, Color color, Color foreColor)
		{
			if (length < 1) length = 1;
			this.offset          = offset;
			this.length          = length;
			this.textMarkerType  = textMarkerType;
			this.color           = color;
			this.foreColor       = foreColor;
			this.overrideForeColor = true;
		}
	}
}
