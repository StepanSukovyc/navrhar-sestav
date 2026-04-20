//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GStringConverter.cs          </Name>
//    <Description>   typový konvertor pro databázový typ GString </Description>
//    <Author>        Jan Kuttich                                 </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//    <Created>       2005-04-21                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Globalization;

namespace Gordic.General {

	/// <summary>typový konvertor pro databázový typ GString</summary>
	public class GStringConverter : TypeConverter {
        
        #region pøetížené metody

        /// <summary>vrací pøíznak pøípustnosti konverze ze zdrojového typu</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="sourceType">zdrojový typ</param>
        /// <returns>true v pøípadì pøípustnosti konverze, jinak false</returns>
        public override bool CanConvertFrom(ITypeDescriptorContext context,Type sourceType) {
            return true;
        } // end method

        /// <summary>typová konverze ze zdrojové hodnoty</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="culture">aktuální kultura</param>
        /// <param name="sourceValue">zdrojová hodnota pro konverzi</param>
        /// <returns>pøetypovaná hodnota</returns>
        public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object sourceValue) {

            return GString.Parse(sourceValue,true);
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
            if(destinationType == null) throw new GArgumentNullException(23200109); // nebyla nastavena hodnota oèekávaného parametru
            GString l_oSourceValue = sourceValue as GString;
            if(l_oSourceValue != null) {
                try {
                    if(destinationType == typeof(string)) return l_oSourceValue.ToString();
                    else if(destinationType == typeof(short)) return Int16.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(int)) return Int32.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(decimal)) return Decimal.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(double)) return Double.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(long)) return Int64.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(float)) return Single.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(sbyte)) return SByte.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(byte)) return Byte.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(ushort)) return UInt16.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(uint)) return UInt32.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(ulong)) return UInt64.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(DateTime)) return DateTime.Parse(l_oSourceValue.BaseValue);
                    else if(destinationType == typeof(GString)) return l_oSourceValue.Clone();
                    else if(destinationType == typeof(GInt16)) return GInt16.Parse(l_oSourceValue,true);
                    else if(destinationType == typeof(GInt32)) return GInt32.Parse(l_oSourceValue,true);
                    else if(destinationType == typeof(GDecimal)) return GDecimal.Parse(l_oSourceValue,true);
                    else if(destinationType == typeof(GDate)) return GDate.Parse(l_oSourceValue,true);
                    else if(destinationType == typeof(GDateTime)) return GDateTime.Parse(l_oSourceValue,true);
                } // end try
                catch(Exception e) {
                    if(e is GException == false) throw new GOverflowException(23200110,e); // velikost hodnoty pøesáhla limit použitého datového typu
                    else throw;
                } // end catch
            } // end if
            throw new GInvalidCastException(23200111); // pokus o nepovolenou typovou konverzi
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>vrací pøíznak pøípustnosti zdrojového typu pro konverzi</summary>
        /// <param name="type">zdrojový typ</param>
        /// <returns>true v pøípadì pøípustnosti konverze, jinak false</returns>
        private bool IsSupportedType(Type type) {
            return
                type == typeof(string) ||
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
                type == typeof(DateTime) ||
                type == typeof(GString) ||
                type == typeof(GInt16) ||
                type == typeof(GInt32) ||
                type == typeof(GDecimal) ||
                type == typeof(GDate) ||
                type == typeof(GDateTime);
        } // end method

        #endregion

	} // end class

} // end namespace
