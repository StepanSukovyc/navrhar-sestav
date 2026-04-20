//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ColorService.cs                          </Name>
//    <Description> Služba pro práci s barvou                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using Gordic.GFE.Parsers.ExternalList;
using Gordic.GFE.Parsers.Gui;
using Gordic.General;
using System.Collections.Concurrent;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Služba pro práci s barvou
    /// </summary>
    public static class ColorService
    {
        /// <summary>
        /// položka sezanamu barev
        /// </summary>
        public sealed class ListEntry
        {
            string name;
            /// <summary>
            /// anglický název položky
            /// </summary>
            public string Name { get => name; set { name = value; } }

            string nazev;
            /// <summary>
            /// český název položky
            /// </summary>
            public string Nazev { get => nazev; set { nazev = value; } }

            Color color;
            /// <summary>
            /// barva položky
            /// </summary>
            public Color Color { get => color; set { color = value; } }

            /// <summary>
            /// konstruktor třídy
            /// </summary>
            public ListEntry()
            {
                name = "transparent";
                nazev = GResources.GetResourceText(29450372); //RC 29450372 : průhledná
                color = Color.Transparent;
            }

            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            /// <param name="color">barva položky</param>
            public ListEntry(Color color)
            {
                this.color = color;
                name = nazev = color.ToString();
            }

            /// <summary>
            /// konstruktor třídy
            /// </summary>
            /// <param name="name">název barvy v angličtině</param>
            /// <param name="color">barva položky</param>
            public ListEntry(string name, Color color)
            {
                this.name = name;
                this.color = color;
                nazev = name;
            }

            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            /// <param name="name">název položky v angličtině</param>
            /// <param name="nazev">lokalizovaný název</param>
            /// <param name="color">barva položky</param>
            public ListEntry(string name, string nazev, Color color)
            {
                // TODO: Complete member initialization
                this.name = name;
                this.nazev = nazev;
                this.color = color;
            }
        }

        static readonly Dictionary<string, string> colorNameCzEn = new Dictionary<string, string>();
        /// <summary>
        /// Seznam předdefinovaných barev písma (key - CZ)
        /// </summary>
        public static Dictionary<string, string> ColorNameCzEn { get { lock (syncRoot) { return colorNameCzEn; } } }

        static Dictionary<string, string> colorNameEnCz = new Dictionary<string, string>();
        /// <summary>
        /// Seznam předdefinovaných barev písma (key - EN)
        /// </summary>
        public static Dictionary<string, string> ColorNameEnCz { get { lock (syncRoot) { return colorNameEnCz; } } }

        static Dictionary<Color, string> colorColorNameEn = new Dictionary<Color, string>();
        /// <summary>
        /// Seznam předdefinovaných barev s jejích anglickými názvy (key - System.Drawing.Color)
        /// </summary>
        public static Dictionary<Color, string> ColorColorNameEn { get { lock (syncRoot) { return colorColorNameEn; } } }

        static Dictionary<string, Color> colorNameColorEn = new Dictionary<string, Color>();
        /// <summary>
        /// Seznam předdefinovaných barev s jejích anglickými názvy (key - EN name)
        /// </summary>
        public static Dictionary<string, Color> ColorNameColorEn { get { lock (syncRoot) { return colorNameColorEn; } } }

        static string[] colors;
        /// <summary>
        /// barvy v angličtině
        /// </summary>
        public static string[] Colors { get => colors; }

        /// <summary>
        /// Převod argb kódu na barvu
        /// </summary>
        /// <param name="value">daný argb kód</param>
        /// <returns></returns>
        public static Color FromArgb(int value) => Color.FromArgb(value);

        /// <summary>
        /// Zjištění, zda barva není průhledná
        /// </summary>
        /// <param name="argb">argb kód barvy</param>
        /// <returns></returns>
        public static bool IsTransparent(int argb)
        {
            if (argb == 0)
                return true;
            if (FromArgb(argb).Name == "0")
                return true;
            if (FromArgb(argb).Name.Equals("Transparent", StringComparison.InvariantCultureIgnoreCase))
                return true;
            return false;
        }

        /// <summary>
        /// Vratí barvu dle názvu
        /// </summary>
        /// <param name="colorname">Název barvy</param>
        /// <returns></returns>
        public static URComplexColor GetGFEColor(string colorname)
        {
            URComplexColor color = new URComplexColor();
            if (colorname.Contains('#'))
                color = URComplexColor.Parse(colorname);
            else if (ColorNameCzEn.TryGetValue(colorname, out string _colorname))
                color.Initialize(_colorname);
            else color.Initialize(colorname);

            return color;
        }

        /// <summary>
        /// Získání barvy
        /// </summary>
        /// <param name="color">Barva jiného formátu</param>
        /// <returns>Barva třídy System.Drawing.Color</returns>
        public static Color GetColor(Gordic.Report.Implementation.IGFormatGRRColor color)
        {
            color.getRGB(out int rgb);
            if (rgb == 0)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(color.isTransparent(out bool ct));
                if (ct) return Color.Transparent;
            }
            return Color.FromArgb(255, rgb & 0xff, (rgb >> 8) & 0xff, (rgb >> 16) & 0xff);
        }

        /// <summary>
        /// Převod Hex prezentace barvy na barvu
        /// </summary>
        /// <param name="hexColor"></param>
        /// <returns></returns>
        public static Color HexToColor(string hexColor)
        {
            //odstraníme # pokud existuje
            if (hexColor.IndexOf('#') != -1)
                hexColor = hexColor.Replace("#", "");
            else
                try
                {
                    Color col = Color.FromName(hexColor);
                    if (col.IsKnownColor)
                        return col;
                }
                catch { }

            byte red = 0, green = 0, blue = 0;
            if (hexColor.Length == 8)
            {
                ////odstraníme FF
                //hexColor = hexColor.Substring(2);
                //#AARRGGBB
                byte alpha = byte.Parse(hexColor.Substring(0, 2), NumberStyles.AllowHexSpecifier);
                red = byte.Parse(hexColor.Substring(2, 2), NumberStyles.AllowHexSpecifier);
                green = byte.Parse(hexColor.Substring(4, 2), NumberStyles.AllowHexSpecifier);
                blue = byte.Parse(hexColor.Substring(6, 2), NumberStyles.AllowHexSpecifier);
                Color result = Color.FromArgb(alpha, red, green, blue);
                return alpha == 0 && result.Name.Equals("ffffff", StringComparison.OrdinalIgnoreCase) ? Color.Transparent : result;
            }

            if (hexColor.Length == 6)
            {
                //#RRGGBB
                red = byte.Parse(hexColor.Substring(0, 2), NumberStyles.AllowHexSpecifier);
                green = byte.Parse(hexColor.Substring(2, 2), NumberStyles.AllowHexSpecifier);
                blue = byte.Parse(hexColor.Substring(4, 2), NumberStyles.AllowHexSpecifier);
            }
            else if (hexColor.Length == 3)
            {
                //#RGB
                red = byte.Parse(hexColor[0].ToString() + hexColor[0].ToString(), NumberStyles.AllowHexSpecifier);
                green = byte.Parse(hexColor[1].ToString() + hexColor[1].ToString(), NumberStyles.AllowHexSpecifier);
                blue = byte.Parse(hexColor[2].ToString() + hexColor[2].ToString(), NumberStyles.AllowHexSpecifier);
            }

            return Color.FromArgb(red, green, blue);
        }
        /// <summary>
        /// Získání inverzní barvy k dané
        /// </summary>
        /// <param name="color">Daná barva</param>
        /// <returns>Inverzní barva k dané</returns>
        public static Color InvertColor(Color color) => Color.FromArgb((byte)~color.R, (byte)~color.G, (byte)~color.B);

        /// <summary>
        /// převod barvy do hexadecimalního tvaru
        /// </summary>
        /// <param name="color">barva</param>
        /// <param name="alphaChannel">TRUE - pokud brat v úvahu i alpha komponentu barvy</param>
        /// <returns></returns>
        public static string ColorToHex(Color color, bool alphaChannel) => String.Format("#{0}{1}{2}{3}",
                                 alphaChannel ? color.A.ToString("X2") : String.Empty,
                                 color.R.ToString("X2"),
                                 color.G.ToString("X2"),
                                 color.B.ToString("X2"));

        /// <summary>
        /// přidání položky do seznamu dostupných barev
        /// </summary>
        /// <param name="name">anglický název barvy</param>
        /// <param name="nazev">český název barvy</param>
        /// <param name="color">odpovídající barva</param>
        public static void AddColorItem(string name, string nazev, Color color)
        {
            AddColorItem(new ListEntry(name, nazev, color));
        }

        static void AddColorItem(ListEntry entry)
        {
            lock (syncRoot)
            {
                if (!listOfColors.Contains(entry))
                    if (entry.Nazev != null && entry.Name != null)
                    {
                        listOfColors.Add(entry);
                        string eName = entry.Name.ToLower();
                        if (!colorColorNameEn.ContainsKey(entry.Color))
                            colorColorNameEn.Add(entry.Color, eName);
                        if (!colorNameColorEn.ContainsKey(eName))
                            colorNameColorEn.Add(eName, entry.Color);

                        if (!colorNameCzEn.ContainsKey(entry.Nazev))
                            colorNameCzEn.Add(entry.Nazev, eName);
                        if (!colorNameEnCz.ContainsKey(eName))
                            colorNameEnCz.Add(eName, entry.Nazev);

                        colors = new string[ColorColorNameEn.Count];
                        ColorColorNameEn.Values.CopyTo(colors, 0);
                        Array.Sort(colors);
                        ItemAdded?.Invoke(null, EventArgs.Empty);
                    }
            }
        }

        /// <summary>
        /// volá se po přidání položky do seznamu
        /// </summary>
        public static event EventHandler ItemAdded;
        /// <summary>
        /// volá se po inicializaci sužby
        /// </summary>
        public static event EventHandler ServiceInitialized;

        static readonly object syncRoot = new object();

        /// <summary>
        /// přidání položky do seznamu dostupných barev
        /// </summary>
        /// <param name="name">anglický název barvy</param>
        /// <param name="nazev">český název barvy</param>
        /// <param name="color">odpovídající barva</param>
        public static void RemoveColorItem(string name, string nazev, Color color)
        {
            lock (syncRoot)
            {
                ListEntry entry = new ListEntry(name, nazev, color);
                if (listOfColors.Contains(entry))
                    listOfColors.Remove(entry);

                if (colorColorNameEn.ContainsKey(color))
                    colorColorNameEn.Remove(color);
                if (colorNameColorEn.ContainsKey(name))
                    colorNameColorEn.Remove(name);

                if (colorNameCzEn.ContainsKey(nazev))
                    colorNameCzEn.Remove(nazev);
                if (colorNameEnCz.ContainsKey(name))
                    colorNameEnCz.Remove(name);

                colors = new string[ColorColorNameEn.Count];
                ColorColorNameEn.Values.CopyTo(colors, 0);
                Array.Sort(colors);
                OnItemAdded();
            }
        }

        static void OnItemAdded()
        {
            ItemAdded?.Invoke(null, EventArgs.Empty);
        }

        static List<ListEntry> listOfColors = new List<ListEntry>();
        /// <summary>
        /// u6ivatelsky definované barvy
        /// </summary>
        public static List<string> UserDefineColors
        {
            get
            {
                List<string> result = new List<string>();
                if (ColorColorNameEn.Values.Count - 18 > 0)
                    for (int i = 18; i < ColorColorNameEn.Values.Count; i++)
                        result.Add(ColorColorNameEn.Values.ToList()[i]);
                return result;
            }
        }

        static bool isInitialized = false;
        /// <summary>
        /// inicializace služby barev
        /// </summary>
        public static void InitializeService()
        {
            if (!isInitialized && !CommonService.IsLC)
            {
                GlobalList list = GlobalListLoader.Lists.FirstOrDefault(lst => lst.ID.Equals("ColorObjectNameEN", StringComparison.InvariantCultureIgnoreCase));
                if (list != null)
                    foreach (var item in list.Items)
                        try { AddColorItem(new ListEntry(item.Key, string.IsNullOrEmpty(item.Value) ? item.Key : item.Value, (Color)list.GetItem<Color>(item.Key))); }
                        catch { }

                OnServiceInitialized();
                isInitialized = true;
            }
        }

        static void OnServiceInitialized()
        {
            ServiceInitialized?.Invoke(null, EventArgs.Empty);
        }

        /// <summary>
        /// Přidání uživatelských položek.
        /// </summary>
        /// <param name="dict">Slovník barev</param>
        public static void AddUserItems(Dictionary<string, string> dict)
        {
            foreach (var item in dict)
                AddColorItem(new ListEntry(item.Key, item.Value, HexToColor(item.Key)));
        }
        /// <summary>
        /// cach tabulka barev
        /// </summary>
        static ConcurrentDictionary<string, Color> cachColor = new ConcurrentDictionary<string, Color>();

        /// <summary>
        /// získání CZ nízvu dle EN
        /// </summary>
        /// <param name="name">EN název</param>
        /// <returns>CZ název</returns>
        public static string GetColorCZName(string name) => ColorNameEnCz.ContainsKey(name) ? ColorNameEnCz[name] : name;

        /// <summary>
        /// získání barvy dle názvu
        /// pokud název je NULL, pak se vezme výchozí barva
        /// </summary>
        /// <param name="n">název hledané barvy</param>
        /// <param name="deffColor">výchozí barva</param>
        /// <returns></returns>
        public static Color GetColor(string n, Color deffColor)
        {
            if (!isInitialized)
                InitializeService();

            n = n.ToLower();
            return string.IsNullOrEmpty(n) ? deffColor : cachColor.GetOrAdd(n, delegate { return ColorNameColorEn.ContainsKey(n) ? ColorNameColorEn[n] : HexToColor(n); });
        }
        static ComplexColor complexBlack;
        /// <summary>
        /// černá komplexní barva
        /// </summary>
        public static ComplexColor ComplexBlack
        {
            get
            {
                if (complexBlack == null)
                {
                    complexBlack = new ComplexColor();
                    complexBlack.Initialize(Color.Black, "black");
                }
                return complexBlack;
            }
        }

        static ComplexColor complexTransparent;
        /// <summary>
        /// průhledná barva
        /// </summary>
        public static ComplexColor ComplexTransparent
        {
            get
            {
                if (complexTransparent == null)
                {
                    complexTransparent = new ComplexColor();
                    complexTransparent.Initialize(Color.Transparent, "transparent");
                }
                return complexTransparent;
            }
        }

        /// <summary>
        /// získání názvu barvy
        /// </summary>
        /// <param name="c">daná barva</param>
        /// <returns></returns>
        internal static string GetColorName(Color c)
        {
            if (!isInitialized)
                InitializeService();

            var fc = cachColor.FirstOrDefault(itm => itm.Value == c);
            if (fc.Key != null) return fc.Key;

            if (ColorColorNameEn.ContainsKey(c))
            {
                cachColor.GetOrAdd(ColorColorNameEn[c], c);
                return ColorColorNameEn[c];
            }
            else
            {
                string m_name = ColorToHex(c, false);//String.Format("#{0:x2}{1:x2}{2:x2}", c.R, c.G, c.B);
                cachColor.GetOrAdd(m_name, c);
                return m_name;
            }
        }
        /// <summary>
        /// převod názvu do barvy
        /// </summary>
        /// <param name="colorName"></param>
        /// <param name="isParsed"></param>
        /// <returns></returns>
        internal static Color TryParseColor(string colorName, out bool isParsed)
        {
            isParsed = true;

            if (cachColor.ContainsKey(colorName))
                return cachColor[colorName];

            if (colorName.Length > 1 && colorName[0] == '#')
            {
                int r = 0, g = 0, b = 0;
                if (colorName.Length == 7)
                {
                    r = FromHex(colorName, 1, 2);
                    g = FromHex(colorName, 3, 2);
                    b = FromHex(colorName, 5, 2);
                }
                else if (colorName.Length == 4)
                {
                    r = FromHex(colorName[1]);
                    g = FromHex(colorName[2]);
                    b = FromHex(colorName[3]);
                    r = (r << 4) + r; g = (g << 4) + g; b = (b << 4) + b;
                }
                else
                {
                    isParsed = false;
                    return Color.Transparent;
                }
                return cachColor.GetOrAdd(colorName, Color.FromArgb(r, g, b));
            }

            foreach (var c in ColorService.ColorColorNameEn)
                if (c.Value.Equals(colorName, StringComparison.Ordinal))
                    return c.Key;

            isParsed = false;
            return Color.Transparent;
        }

        static int FromHex(char b)
        {
            if (b >= '0' && b <= '9') return b - '0';
            if (b >= 'A' && b <= 'F') return b + 10 - 'A';
            if (b >= 'a' && b <= 'f') return b + 10 - 'a';
            return 0;
        }
        static int FromHex(string s, int from, int len)
        {
            int r = 0;
            for (int i = from; i < from + len; i++)
            {
                r *= 16;
                r += FromHex(s[i]);
            }
            return r;
        }

    }
}
