//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GRawString.cs                                             </Name>
//    <Description> Nebezpečná varianta GStringu, se kterou se pracuje bez dalších modifikací</Description>
//    <Author>      bmartinek                                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                                         </Copyright>
//    <Created>     2020-02-11                                                               </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Nebezpečná varianta GStringu, se kterou se pracuje bez dalších modifikací. Použitím tohoto typu bere autor na sebe zodpovědnost 
    /// za případné bezpečnostní útoky a zneužití aplikace.
    /// </summary>
    [Serializable]
    [TypeConverter(typeof(GStringConverter))]
    public class GRawString : GString
    {
        private static readonly GRawString m_cgsNull = new GRawString(true);

        /// <summary>Ctor</summary>
        public GRawString()
        { }

        /// <summary>Ctor</summary>
        public GRawString(string stringValue):base(stringValue)
        { }

        /// <summary>Kopirovaci ctor</summary>
        public GRawString(GRawString source, GDbTypeCopyOptions copyOptions):base(source, copyOptions)
        { }

        /// <summary>Ctor</summary>
        private GRawString(bool readOnly)
        {
            if (readOnly) SetReadOnly();
        }

        /// <summary>Obecna typova konverze</summary>
        public static new GRawString Parse(object inputValue) => new GRawString(Parse(inputValue, false));

        #region Vlastnosti

        /// <summary>Instance hodnoty null určená pouze pro čtení</summary>
        public static new GRawString Null => m_cgsNull;

        #endregion

        /// <summary>Klon objektu</summary>
        public override object Clone()
        {
            return new GRawString(this, null) { SourceColumn = this.SourceColumn };
        }

        #region Pretizeni operatoru

        /// <summary>implicitni konverze na string</summary>
        public static implicit operator string(GRawString s)
        {
            return s?.BaseValue;
        }

        /// <summary>implitni konverze ze string na GRawString</summary>
        public static implicit operator GRawString(string s)
        {
            return new GRawString(s);
        }

        #endregion
    }
}
