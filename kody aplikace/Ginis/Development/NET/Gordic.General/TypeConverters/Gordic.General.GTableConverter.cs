//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>          Gordic.General.GTableConverter.cs          </Name>
//    <Description>   typový konvertor pro databázový typ GBlob </Description>
//    <Author>        FFIALA                                  </Author>
//    <Copyright>     © GORDIC spol. s r. o. 1993 - 2021   </Copyright>
//    <Created>       2007-12-12                                   </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Globalization;


namespace Gordic.General
{

    /// <summary>typový konvertor pro databázový typ GTable</summary>
	public class GTableConverter : TypeConverter
    {

        #region přetížené metody

        /// <summary>vrací příznak přípustnosti konverze ze zdrojového typu</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="sourceType">zdrojový typ</param>
        /// <returns>true v případě přípustnosti konverze, jinak false</returns>
        public override bool CanConvertFrom( ITypeDescriptorContext context, Type sourceType )
        {
            return sourceType == typeof( DBNull ) || IsSupportedType( sourceType );
        } // end method

        /// <summary>typová konverze ze zdrojové hodnoty</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="culture">aktuální kultura</param>
        /// <param name="sourceValue">zdrojová hodnota pro konverzi</param>
        /// <returns>přetypovaná hodnota</returns>
        public override object ConvertFrom( ITypeDescriptorContext context, CultureInfo culture, object sourceValue )
        {
            throw new GInvalidCastException( 21300041, 23200032 ); // pokus o nepovolenou typovou konverzi //RC-EX 23200032 : pokus o nepovolenou typovou konverzi
        } // end method

        /// <summary>vrací příznak přípustnosti konverze do cílového typu</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="destinationType">cílový typ</param>
        /// <returns>true v případě přípustnosti konverze, jinak false</returns>
        public override bool CanConvertTo( ITypeDescriptorContext context, Type destinationType )
        {
            return IsSupportedType( destinationType );
        } // end method

        /// <summary>typová konverze na požadovaný typ</summary>
        /// <param name="context">kontext komponenty</param>
        /// <param name="culture">aktuální kultura</param>
        /// <param name="sourceValue">zdrojová hodnota pro konverzi</param>
        /// <param name="destinationType">cílový typ</param>
        /// <returns>přetypovaná hodnota</returns>
        public override object ConvertTo( ITypeDescriptorContext context, CultureInfo culture, object sourceValue, Type destinationType )
        {
            throw new GInvalidCastException( 21300045, 23200032 ); // pokus o nepovolenou typovou konverzi //RC-EX 21300015 : pokus o nepovolenou typovou konverzi
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>vrací příznak přípustnosti zdrojového typu pro konverzi</summary>
        /// <param name="type">zdrojový typ</param>
        /// <returns>true v případě přípustnosti konverze, jinak false</returns>
        private bool IsSupportedType( Type type )
        {
            return false;
        } // end method

        #endregion

    } // end class

} // end namespace
