//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GEkoDateConverter.cs          </Name>
//    <Description>   typový konvertor pro databázový typ GEkoDate </Description>
//    <Author>        Jan Kuttich                                  </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021   </Copyright>
//    <Created>       2007-03-28                                   </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Globalization;

namespace Gordic.General {

	/// <summary>typový konvertor pro databázový typ GEkoDate</summary>
	public class GEkoDateConverter : TypeConverter {

        #region pøetížené metody

		/// <summary>vrací pøíznak pøípustnosti konverze ze zdrojového typu</summary>
		/// <param name="context">kontext komponenty</param>
		/// <param name="sourceType">zdrojový typ</param>
		/// <returns>true v pøípadì pøípustnosti konverze, jinak false</returns>
		public override bool CanConvertFrom(ITypeDescriptorContext context,Type sourceType) {
            return sourceType==typeof(DBNull) || IsSupportedType(sourceType) || sourceType==typeof(GDate) || sourceType==typeof(GDateTime);
		} // end method

        /// <summary>typová konverze ze zdrojové hodnoty</summary>
		/// <param name="context">kontext komponenty</param>
		/// <param name="culture">aktuální kultura</param>
		/// <param name="sourceValue">zdrojová hodnota pro konverzi</param>
		/// <returns>pøetypovaná hodnota</returns>
		public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object sourceValue) {
            return GEkoDate.Parse(sourceValue,true);
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
			if(destinationType == null) throw new GArgumentNullException(23200135); // nebyla nastavena hodnota oèekávaného parametru
            GEkoDate l_oSourceValue = sourceValue as GEkoDate;
            if(l_oSourceValue != null) {
                try {
                    if(destinationType == typeof(string)) return l_oSourceValue.ToString();
                    else if(destinationType == typeof(GString)) return l_oSourceValue as GString;
                } // end try
                catch(Exception e) {
                    if(e is GException == false) throw new GOverflowException(23200136,e); // velikost hodnoty pøesáhla limit použitého datového typu
                    else throw;
                } // end catch
            } // end if
            throw new GInvalidCastException(23200137); // pokus o nepovolenou typovou konverzi
		} // end method

        #endregion

        #region soukromé metody

        /// <summary>vrací pøíznak pøípustnosti zdrojového typu pro konverzi</summary>
        /// <param name="type">zdrojový typ</param>
        /// <returns>true v pøípadì pøípustnosti konverze, jinak false</returns>
        private bool IsSupportedType(Type type) {
            return type == typeof(string) || type == typeof(GString);
        } // end method

        #endregion

	} // end class

} // end namespace
