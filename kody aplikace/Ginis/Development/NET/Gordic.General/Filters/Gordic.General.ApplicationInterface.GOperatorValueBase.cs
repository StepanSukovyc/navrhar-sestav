//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GOperatorValueBase.cs   </Name>
//    <Description> Hodnota a operátor, podle kterých se provádí filtrace.      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2006-01-03                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;

namespace Gordic.General
{

    //---------------------------------------------------------------------
    /// <summary>
    /// Hodnota a operátor, podle kterých se provádí filtrace.
    /// </summary>
    /// <remarks>
    /// Tato třída je použita z třídy GFilter, slouží k přenosu filtračních kritérií z klienta na server.
    /// Obsahuje dvojici operátor, hodnota. Pro bližší informace se podívejte do <see cref="GFilter{TFilterId,TValue}">GFilter</see>.
    /// </remarks>
    [Serializable()]
    public abstract class GOperatorValueBase
    {
        //---------------------------------------------------------------------
        /// <summary>Typ filtru - podmínka, která bude použita (menší, větší, like, in, ...)</summary>
        protected OperatorEnum m_eOperator;
        /// <summary>
        /// Jaká podmínka je použita pro filtrování podle této hodnoty
        /// </summary>
        public OperatorEnum Operator
        {
            get { return m_eOperator; }
            set { m_eOperator = value; }
        }


        private static System.Reflection.Assembly ThisAssembly
        {
            get { return typeof(GOperatorValueBase).Assembly; }
        } // end property

        //---------------------------------------------------------------------
        /// <summary>
        /// Převod typu OperatorEnum na textový tvar vhodný pro uživatele
        /// </summary>
        /// <param name="op">operátor</param>
        /// <returns>textový lokalizovaný popis operátoru</returns>
        public static string OperatorEnum2String(OperatorEnum op)
        {
            switch (op)
            {
                case OperatorEnum.Equal: return GResources.GetResourceText(ThisAssembly, 21090061); //RC 21090061 : je rovno
                case OperatorEnum.NotEqual: return GResources.GetResourceText(ThisAssembly, 21090062); //RC 21090062 : není rovno
                case OperatorEnum.Like: return GResources.GetResourceText(ThisAssembly, 21090063); //RC 21090063 : jako
                case OperatorEnum.In: return GResources.GetResourceText(ThisAssembly, 21090064); //RC 21090064 : v
                case OperatorEnum.Greater: /*case OperatorEnum.IntervalGreater:*/ return GResources.GetResourceText(ThisAssembly, 21090065); //RC 21090065 : větší než
                case OperatorEnum.Less: case OperatorEnum.IntervalLess: return GResources.GetResourceText(ThisAssembly, 21090066); //RC 21090066 : menší než
                case OperatorEnum.GreaterOrEqual: /*case OperatorEnum.IntervalGreaterOrEqual:*/ return GResources.GetResourceText(ThisAssembly, 21090067); //RC 21090067 : větší nebo rovno
                case OperatorEnum.LessOrEqual: case OperatorEnum.IntervalLessOrEqual: return GResources.GetResourceText(ThisAssembly, 21090068); //RC 21090068 : menší nebo rovno
                case OperatorEnum.Contains: return GResources.GetResourceText(ThisAssembly, 21090069); //RC 21090069 : obsahuje
                case OperatorEnum.NotIn: return GResources.GetResourceText(ThisAssembly, 21090070); //RC 21090070 : není v
                default: return "";
            }
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Převod typu OperatorEnum na textový tvar vhodný pro uživatele
        /// </summary>
        /// <param name="op">operátor</param>
        /// <returns>textový lokalizovaný popis operátoru</returns>
        public static string OperatorEnum2Shortcut(OperatorEnum op)
        {
            switch (op)
            {
                case OperatorEnum.Equal: return "=";
                case OperatorEnum.NotEqual: return "!=";
                case OperatorEnum.Like: return "LIKE";
                case OperatorEnum.In: return "IN";
                case OperatorEnum.Greater: /*case OperatorEnum.IntervalGreater:*/ return ">";
                case OperatorEnum.Less: case OperatorEnum.IntervalLess: return "<";
                case OperatorEnum.GreaterOrEqual: /*case OperatorEnum.IntervalGreaterOrEqual:*/ return ">=";
                case OperatorEnum.LessOrEqual: case OperatorEnum.IntervalLessOrEqual: return "<=";
                case OperatorEnum.Contains: return "CONTAINS";
                case OperatorEnum.NotIn: return "NOT IN";
                case OperatorEnum.NotLike: return "NOT LIKE";
                default: return "";
            }
        }
        //---------------------------------------------------------------------
        /// <summary>
        /// Převod typu OperatorEnum na textový tvar vhodný pro uživatele
        /// </summary>
        /// <param name="op">operátor</param>
        /// <returns>textový lokalizovaný popis operátoru</returns>
        public static OperatorEnum OperatorShortcut2Enum(string op)
        {
            switch (op)
            {
                case "=": return OperatorEnum.Equal;
                case "!=": return OperatorEnum.NotEqual;
                case "LIKE": return OperatorEnum.Like;
                case "IN": return OperatorEnum.In;
                case ">": return OperatorEnum.Greater;
                case "<": return OperatorEnum.Less;
                case ">=": return OperatorEnum.GreaterOrEqual;
                case "<=": return OperatorEnum.LessOrEqual;
                case "CONTAINS": return OperatorEnum.Contains;
                case "NOT IN": return OperatorEnum.NotIn;
                case "NOT LIKE": return OperatorEnum.NotLike;
                default: return OperatorEnum.OnlyColumname;
            }
        }

        /// <summary>Vrací opačný operátor tam, kde ten lze určit nebo null</summary>
        public static OperatorEnum? NegateOperator(OperatorEnum o)
        {
            switch (o)
            {
                case OperatorEnum.Equal: return OperatorEnum.NotEqual;
                case OperatorEnum.NotEqual: return OperatorEnum.Equal;
                case OperatorEnum.In: return OperatorEnum.NotIn;
                case OperatorEnum.NotIn: return OperatorEnum.In;
                case OperatorEnum.Like: return OperatorEnum.NotLike;
                case OperatorEnum.NotLike: return OperatorEnum.Like;
                case OperatorEnum.Greater: return OperatorEnum.LessOrEqual;
                case OperatorEnum.GreaterOrEqual: return OperatorEnum.Less;
                case OperatorEnum.Less: return OperatorEnum.GreaterOrEqual;
                case OperatorEnum.LessOrEqual: return OperatorEnum.Greater;
                default:
                    return null;
            }
        }

    }

    //---------------------------------------------------------------------
    /// <summary>
    /// Operátor pro filtr - podmínka, která je mezi hodnotou slopce a filtračním textem v WHERE podmínce
    /// </summary>
    public enum OperatorEnum
    {
        /// <summary>Znaménko = </summary>
        Equal = 0,
        /// <summary>Znaménko != </summary>
        NotEqual = 1,
        /// <summary>LIKE. Pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla</summary>
        Like = 2,
        /// <summary>LIKE. Pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla</summary>
        StartsWith = 2,
        /// <summary>IN, očekává několik za sebou zřetězených values s OperatorEnum.In, ty poskládá v jeden IN</summary>
        In = 3,
        /// <summary>IN, očekává na vstupu GString s hodnotami v textové podobě oddělené čárkou</summary>
        InText = 4,
        /// <summary>větší</summary>
        Greater = 5,
        /// <summary>menší</summary>
        Less = 6,
        /// <summary>větší nebo rovno</summary>
        GreaterOrEqual = 7,
        /// <summary>menší nebo rovno</summary>
        LessOrEqual = 8,
        /// <summary>
        /// vynechává pravou stranu, nechává pouze název sloupce. Používá se v případě, že
        /// aplikační logika si překonstruuje filtr tak, že obsahuje složitější příkaz (například vnořené selecty)
        /// a ten uloží to Columname, filter.Where potom může vrátit jakoukoliv konstrukci
        /// </summary>
        OnlyColumname = 9,
        /// <summary>LIKE. Pokud není v řetězci znak "%", doplní ho na konec i na začátek řetězce, jinak ponechá procenta tak jak byla</summary>
        Contains = 10,
        /// <summary>IN, očekává několik za sebou zřetězených values s OperatorEnum.In, ty poskládá v jeden NOT IN</summary>
        NotIn = 11,
        /// <summary>NOT LIKE, pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla...</summary>
        NotLike = 12,
        ///// <summary>větší</summary>
        //IntervalGreater = 15,
        /// <summary>menší</summary>
        IntervalLess = Less | IntervalMask,
        ///// <summary>větší nebo rovno</summary>
        //IntervalGreaterOrEqual = 17,
        /// <summary>menší nebo rovno</summary>
        IntervalLessOrEqual = LessOrEqual | IntervalMask,
        /// <summary>NEPOUŽÍVAT. maska pro intervaly</summary>
        IntervalMask = 128
    }

}
