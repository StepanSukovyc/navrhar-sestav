//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GBooleanConverter.cs          </Name>
//    <Description>   typový konvertor pro databázový typ GBoolean </Description>
//    <Author>        Jan Kuttich                                  </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021   </Copyright>
//    <Created>       2007-12-12                                   </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Globalization;

namespace Gordic.General {

    /// <summary>typový konvertor pro databázový typ GBoolean</summary>
	public class GBooleanConverter : TypeConverter {

        #region pøetížené metody

        /// <summary>vrací pøíznak pøípustnosti konverze ze zdrojového typu</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="sourceType">zdrojový typ</param>
        /// <returns>true v pøípadì pøípustnosti konverze, jinak false</returns>
        public override bool CanConvertFrom(ITypeDescriptorContext context,Type sourceType) {
            return sourceType==typeof(DBNull) || IsSupportedType(sourceType);
        } // end method

        /// <summary>typová konverze ze zdrojové hodnoty</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="culture">aktuální kultura</param>
        /// <param name="sourceValue">zdrojová hodnota pro konverzi</param>
        /// <returns>pøetypovaná hodnota</returns>
        public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object sourceValue) {
            return GBoolean.Parse(sourceValue,true);
        } // end method

        /// <summary>vrací pøíznak pøípustnosti konverze do cílového typu</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="destinationType">cílový typ</param>
        /// <returns>true v pøípadì pøípustnosti konverze, jinak false</returns>
        public override bool CanConvertTo(ITypeDescriptorContext context,Type destinationType) {
            return IsSupportedType(destinationType);
        } // end method

        /// <summary>typová konverze na požadovaný typ</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="culture">aktuální kultura</param>
        /// <param name="sourceValue">zdrojová hodnota pro konverzi</param>
        /// <param name="destinationType">cílový typ</param>
        /// <returns>pøetypovaná hodnota</returns>
        public override object ConvertTo(ITypeDescriptorContext context,CultureInfo culture, object sourceValue, Type destinationType) {  
            if(destinationType == null) throw new GArgumentNullException(23200168); // nebyla nastavena hodnota oèekávaného parametru
            GBoolean l_oSourceValue = sourceValue as GBoolean;
            if(l_oSourceValue != null) {
                try {
                    if(destinationType == typeof(string)) return l_oSourceValue.ToString();
                    else if(destinationType == typeof(bool)) return l_oSourceValue.BaseValue;
                    else if(destinationType == typeof(short)) return Convert.ToInt16(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(int)) return Convert.ToInt32(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(decimal)) return Convert.ToDecimal(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(double)) return Convert.ToDouble(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(long)) return Convert.ToInt64(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(float)) return Convert.ToSingle(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(sbyte)) return Convert.ToSByte(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(byte)) return Convert.ToByte(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(ushort)) return Convert.ToUInt16(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(uint)) return Convert.ToUInt32(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(ulong)) return Convert.ToUInt64(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(GString)) return GString.Parse(l_oSourceValue,true);
                    else if(destinationType == typeof(GBoolean)) return l_oSourceValue.Clone();
                    else if(destinationType == typeof(GInt16)) return GInt16.Parse(l_oSourceValue,true);
                    else if(destinationType == typeof(GInt32)) return GInt32.Parse(l_oSourceValue,true);
                    else if(destinationType == typeof(GDecimal)) return GDecimal.Parse(l_oSourceValue,true);
                } // end try
                catch(Exception e) {
                    if(e is GException == false) throw new GOverflowException(23200169,e); // velikost hodnoty pøesáhla limit použitého datového typu
                    else throw;
                } // end catch
            } // end if
            throw new GInvalidCastException(23200170); // pokus o nepovolenou typovou konverzi
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>vrací pøíznak pøípustnosti zdrojového typu pro konverzi</summary>
        /// <param name="type">zdrojový typ</param>
        /// <returns>true v pøípadì pøípustnosti konverze, jinak false</returns>
        private bool IsSupportedType(Type type) {
            return
                type == typeof(string) ||
                type == typeof(bool) ||
                type == typeof(short) ||
                type == typeof(int) ||     
                type == typeof(decimal) || 
                type == typeof(double) || 
                type == typeof(long) ||  
                type == typeof(float) ||   
                type == typeof(sbyte) ||   
                type == typeof(byte) ||    
                type == typeof(ushort) ||  
                type == typeof(uint) ||    
                type == typeof(ulong) ||   
                type == typeof(GString) ||
                type == typeof(GBoolean) ||
                type == typeof(GInt16) ||
                type == typeof(GInt32) ||
                type == typeof(GDecimal);
        } // end method

        #endregion

	} // end class

} // end namespace
