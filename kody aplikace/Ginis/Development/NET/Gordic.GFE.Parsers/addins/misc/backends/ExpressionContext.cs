//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ExpressionContext.cs                   </Name>
//    <Description> třída, popisující kontext, ve kterém se může nacházet výraz.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-26                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Lexer;
using System;

namespace Gordic.GFE.Parsers.Binding
{
    /// <summary>
    /// třída, popisující kontext, ve kterém se může nacházet výraz.
    /// Slouží jako filtr pro výsledky doplňování kódu.
    /// </summary>
    public abstract class ExpressionContext
    {
        /// <summary>
        /// indikuje, že context je cachovatelný
        /// </summary>
        public virtual bool Cach { get { return true; } }

        /// <summary>
        /// Kontext je mimo jakékoli deklarace typu, globální úroveň klíčového slova.
        /// Např. je to vše mezí větví ALF.
        /// </summary>
        public readonly static ExpressionContext Global = new DefaultExpressionContext("Global");
        /// <summary>Kontext hodnot atributu - je to vše, co se nachází v uvozovkách ""</summary>
        public readonly static ExpressionContext ValueContext = new DefaultExpressionContext("AttributeValue");

        /// <summary>
        /// indikuje možnost zobrazení jednotky
        /// </summary>
        /// <param name="o">jednotka k zobrazení</param>
        /// <returns></returns>
        public abstract bool ShowEntry(object o);
        /// <summary>
        /// pouze pro čtení
        /// </summary>
        protected bool readOnly = true;

        object suggestedItem;
        /// <summary>
        /// výchozí položky, které by měly být zahrnuty do dokončování kódu v tomto kontextu
        /// a jsou vybrané jako výchozí
        /// </summary>
        public object SuggestedItem
        {
            get { return suggestedItem; }
            set
            {
                if (readOnly)
                    throw new NotSupportedException();
                suggestedItem = value;
            }
        }

        /// <summary>
        /// indikuje stav, kdy kontext může nabídnout hodnoty
        /// </summary>
        public bool HasValues { get; private set; }

        /// <summary>
        /// indikuje stav komponenty - kvůli argumentům - větev 'style' má stejné argumenty jako komponenty
        /// </summary>
        public bool IsComponent { get; private set; }

        /// <summary>Výchozí/neznámý kontext</summary>
        public readonly static ExpressionContext Default = new DefaultExpressionContext("Default");

        /// <summary>Výchozí/neznámý kontext</summary>
        public readonly static ExpressionContext TypeDeclaration = new DefaultExpressionContext("TypeDeclaration");
        /// <summary>Kontext atributů.</summary>
        public readonly static ExpressionContext Attribute = new AttributeExpressionContext();
        /// <summary>Kontext po rovná se.</summary>
        public readonly static ExpressionContext AssignValue = new DefaultExpressionContext("AssignValue");
        /// <summary>Kontext po rovná se.</summary>
        public readonly static ExpressionContext XmlDeclarationChild = new DefaultExpressionContext("XmlDeclarationChild");

        #region AttributeExpressionContext
        /// <summary>
        /// kontext atributů
        /// </summary>
        public class AttributeExpressionContext : ExpressionContext
        {
            /// <summary>
            /// konstruktor výchozího kontextu
            /// </summary>
            /// <param name="hasValues">indikuje stav, kdy kontext může nabídnout hodnoty</param>
            public AttributeExpressionContext(bool hasValues = false) { HasValues = hasValues; }

            /// <summary>
            /// indikuje možnost zobrazení jednotky
            /// </summary>
            /// <param name="o">jednotka k zobrazení</param>
            /// <returns></returns>
            public override bool ShowEntry(object o) { return o is TokenObject; }

            /// <summary>
            /// řetězec
            /// </summary>
            /// <returns></returns>
            public override string ToString() { return "[" + GetType().Name + "]"; }
        }
        #endregion

        #region DefaultExpressionContext
        /// <summary>
        /// výchozí kontext
        /// </summary>
        public class DefaultExpressionContext : ExpressionContext
        {
            readonly string name;
            /// <summary>
            /// konstruktor výchozího kontextu
            /// </summary>
            /// <param name="name">název</param>
            /// <param name="isComponent">indikuje stav komponenty - kvůli argumentům - větev 'style' má stejné argumenty jako komponenty</param>
            /// <param name="hasValues">indikuje stav, kdy kontext může nabídnout hodnoty</param>
            public DefaultExpressionContext(string name, bool isComponent = false, bool hasValues = false) { this.name = name; HasValues = hasValues; IsComponent = isComponent; }
            /// <summary>
            /// indikuje možnost zobrazení jednotky
            /// </summary>
            /// <param name="o">jednotka k zobrazení</param>
            /// <returns></returns>
            public override bool ShowEntry(object o) { return true; }
            /// <exclude/>
            public override string ToString() { return "[" + GetType().Name + ": " + name + "]"; }
        }
        #endregion    
        #region DefaultExpressionContext
        /// <summary>
        /// výchozí kontext
        /// </summary>
        public class AreaExpressionContext : DefaultExpressionContext
        {
            /// <summary>
            /// konstruktor výchozího kontextu
            /// </summary>
            /// <param name="name">název</param>
            /// <param name="isComponent">indikuje stav komponenty - kvůli argumentům - větev 'style' má stejné argumenty jako komponenty</param>
            /// <param name="hasValues">indikuje stav, kdy kontext může nabídnout hodnoty</param>
            public AreaExpressionContext(string name, bool isComponent = false, bool hasValues = false) 
            : base(name, isComponent, hasValues)
            {
            }
        }
        #endregion        

    }
}
