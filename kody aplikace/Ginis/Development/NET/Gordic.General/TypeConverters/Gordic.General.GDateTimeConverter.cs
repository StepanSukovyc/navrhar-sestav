//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GDateTimeConverter.cs          </Name>
//    <Description>   typový konvertor pro databázový typ GDateTime </Description>
//    <Author>        Jan Kuttich                                   </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021            </Copyright>
//    <Created>       2005-04-21                                    </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Globalization;

namespace Gordic.General {
	    
	/// <summary>typový konvertor pro databázový typ GDate</summary>
	public class GDateTimeConverter : TypeConverter {
		
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
            if (sourceValue is string && sourceValue!=null) return GDateTime.Parse((String) sourceValue,culture);
            else if(sourceValue is GString && ((GString) sourceValue).IsNull==false) return GDateTime.Parse(sourceValue.ToString(),culture);
            else return GDateTime.Parse(sourceValue,true);
        } // end method

        /// <summary>vrací pøíznak pøípustnosti konverze do cílového typu</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="destinationType">cílový typ</param>
        /// <returns>true v pøípadì pøípustnosti konverze, jinak false</returns>
        public override bool CanConvertTo(ITypeDescriptorContext context,Type destinationType) {
            return IsSupportedType(destinationType)|| destinationType==typeof(GEkoDate);
        } // end method

        /// <summary>typová konverze na požadovaný typ</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="culture">aktuální kultura</param>
        /// <param name="sourceValue">zdrojová hodnota pro konverzi</param>
        /// <param name="destinationType">cílový typ</param>
        /// <returns>pøetypovaná hodnota</returns>
        public override object ConvertTo(ITypeDescriptorContext context,CultureInfo culture, object sourceValue, Type destinationType) {  
            if(destinationType == null) throw new GArgumentNullException(23200096); // nebyla nastavena hodnota oèekávaného parametru
            GDateTime l_oSourceValue = sourceValue as GDateTime;
            if(l_oSourceValue != null) {
                try {
                    if(destinationType == typeof(string)) return l_oSourceValue.ToString();
                    else if(destinationType == typeof(DateTimeOffset)) return l_oSourceValue.BaseOffsetValue;
                    else if(destinationType == typeof(DateTime)) return l_oSourceValue.BaseValue;
                    else if(destinationType == typeof(GDateTime)) return l_oSourceValue.Clone();
                    else if(destinationType == typeof(GDate)) return GDate.Parse(l_oSourceValue,true);
                    else if(destinationType == typeof(GEkoDate)) return GEkoDate.Parse(l_oSourceValue,true);
                    else if(destinationType == typeof(GString)) return GString.Parse(l_oSourceValue,true);
                } // end try
                catch(Exception e) {
                    if(e is GException == false) throw new GOverflowException(23200105,e); // velikost hodnoty pøesáhla limit použitého datového typu
                    else throw;
                } // end catch
            } // end if
            throw new GInvalidCastException(23200097); // pokus o nepovolenou typovou konverzi
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>vrací pøíznak pøípustnosti zdrojového typu pro konverzi</summary>
        /// <param name="type">zdrojový typ</param>
        /// <returns>true v pøípadì pøípustnosti konverze, jinak false</returns>
        private bool IsSupportedType(Type type) {
            return 
                type == typeof(string) ||
                type == typeof(DateTime) ||
                type == typeof(DateTimeOffset) ||
                type == typeof(GString) ||
                type == typeof(GDate) ||
                type == typeof(GDateTime);
        } // end method

        #endregion

	} // end class

} // end namespace
