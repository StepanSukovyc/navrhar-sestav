//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ComplexColor.cs                          </Name>
//    <Description> Třída komplexní barvy                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-01                                                  </Created>
//  </FileHeader>

using System.ComponentModel;
using System.Drawing;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.UndoRedoFramework;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// rozhraní komplexní barvy
    /// </summary>
    public interface IComplexColor
    {
        /// <summary>
        /// barva
        /// </summary>
        Color Color { get; set; }
        /// <summary>
        /// název barvy
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// Inicializace objektu
        /// </summary>
        IComplexColor Initialize();
        /// <summary>
        /// inicializace objektu dle barvy
        /// </summary>
        /// <param name="c">barva pro inicializaci</param>
        IComplexColor Initialize(Color c);
        /// <summary>
        /// inicializace objektu dle barvy
        /// </summary>
        /// <param name="c">barva pro inicializaci</param>
        IComplexColor Initialize(GFEColor c);
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="c">barva pro inicializaci</param>
        /// <param name="n">Název barvy ze seznámu barev</param>
        IComplexColor Initialize(Color c, string n);
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="n">Název barvy ze seznámu barev</param>
        IComplexColor Initialize(string n);
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="c">Barva originálu</param>
        IComplexColor Initialize(IComplexColor c);
    }

    /// <summary>
    /// komplexní barva
    /// </summary>
    public class ComplexColor : IComplexColor
    {
        [DisplayName("barva")]
        public virtual Color Color { get; set; }

        [DisplayName("název")]
        public virtual string Name { get; set; }
        /// <summary>
        /// Iniciaizace objektu
        /// </summary>
        public virtual IComplexColor Initialize()
        {
            Color = Color.Black;
            Name = "black";
            return this;
        }
        /// <summary>
        /// inicializace objektu dle barvy
        /// </summary>
        /// <param name="c">barva pro inicializaci</param>
        public virtual IComplexColor Initialize(Color c)
        {
            Color = c;
            Name = ColorService.GetColorName(c);
            return this;
        }
        /// <summary>
        /// inicializace objektu dle barvy
        /// </summary>
        /// <param name="c">barva pro inicializaci</param>
        public virtual IComplexColor Initialize(GFEColor c)
        {
            Color = c.Color;
            Name = c.Name.ToLower();
            return this;
        }
        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="c">barva pro inicializaci</param>
        /// <param name="n">Název barvy ze seznámu barev</param>
        public virtual IComplexColor Initialize(Color c, string n)
        {
            Name = string.IsNullOrEmpty(n) ? "transparent" : n.Trim().ToLower();
            Color = ColorService.GetColor(n, c);
            return this;
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="n">Název barvy ze seznámu barev</param>
        public virtual IComplexColor Initialize(string n)
        {
            n = string.IsNullOrEmpty(n) ? n : n.Trim();
            Name = string.IsNullOrEmpty(n) ? "transparent" : n.ToLower();
            Color = ColorService.GetColor(Name, Color.Transparent);
            return this;
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="c">Barva originálu</param>
        public virtual IComplexColor Initialize(IComplexColor c)
        {
            Color = c.Color;
            if (c.Name != null)
                Name = c.Name.ToLower();
            return this;
        }

        /// <summary>
        /// Prázdný konstruktor třídy s výchozí hodnotou Black
        /// </summary>
        public ComplexColor() { }

        /// <exclude/>
        public static bool operator ==(ComplexColor x, ComplexColor y)
        {
            if (x is null) return y is null;
            if (y is null) return false;

            return x.Color == y.Color;
        }
        /// <exclude/>
        public static bool operator !=(ComplexColor x, ComplexColor y)
        {
            if (x is null) return !(y is null);
            if (y is null) return true;

            return x.Color != y.Color;
        }
        /// <exclude/>
        public override string ToString() { return Name; }
        /// <exclude/>
        public override bool Equals(object obj)
        {
            if (obj == null)
                return false;

            return this == (ComplexColor)obj;
        }
        /// <exclude/>
        public override int GetHashCode() => Color.GetHashCode();
    }

    /// <summary>
    /// UNDO/REDO přetížení komplexní barvy
    /// </summary>
    [TypeConverter(typeof(ComplexColorConverter))]
    public class URComplexColor : ComplexColor
    {
        readonly UndoRedo<Color> color = new UndoRedo<Color>();
        /// <summary>barva</summary>
        [DisplayName("barva")]
        public override Color Color { get => color.Value; set { color.Value = value; } }

        readonly UndoRedo<string> name = new UndoRedo<string>();
        /// <summary>
        /// Název barvy
        /// </summary>
        [DisplayName("název")]
        public override string Name { get => name.Value; set { name.Value = value; } }
        /// <summary>
        /// 
        /// </summary>
        public URComplexColor()
            : base()
        {

        }
        /// <summary>vrací barvu dle jména</summary>
        public static URComplexColor TryParse(string colorName)
        {
            Color color = ColorService.TryParseColor(colorName, out bool isParsed);
            if (isParsed)
            {
                var urcc = new URComplexColor();
                urcc.Initialize(color, colorName);
                return urcc;
            }

            return null;
        }
        /// <summary>vrací barvu dle jména</summary>
        public static URComplexColor Parse(string colorName)
        {
            if (string.IsNullOrEmpty(colorName))
                return TryParse("transparent");

            var c = TryParse(colorName);
            if (c != null) return c;
            throw new GException(string.Format(GResources.GetResourceText(29450344) + " \"{0}\"", colorName)); //RC 29450344 : neznámá barva
        }
    }
}