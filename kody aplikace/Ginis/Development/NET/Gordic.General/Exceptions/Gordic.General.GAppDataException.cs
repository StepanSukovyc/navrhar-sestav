//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GAppDataException.cs       </Name>
//    <Description> Výjimka chybných uživatelských dat                            </Description>
//    <Author>      Petr Svoboda                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2011-04-12                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Resources;
using System.Reflection;
using System.Text;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;

namespace Gordic.General
{
    /// <summary> Výjimka chybných dat  </summary>
    [Serializable]
    [System.Security.SecurityCritical]
    public class GAppDataException : GException {

        #region Povinné konstruktory
        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        public GAppDataException( ) : base() { }

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="message">text výjimky</param>
        public GAppDataException( string message ) : base(message) { }

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="message">text výjimky</param>
        /// <param name="innerException">pùvodní výjimka</param>
        public GAppDataException( string message, Exception innerException ) : base(message,innerException) { }

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GAppDataException( SerializationInfo serializationInfo, StreamingContext streamingContext ) : base(serializationInfo,streamingContext) { }
        #endregion

        /// <summary>získání výchozí kategorie výjimky</summary>
        /// <returns>kategorie výjimky</returns>
        [System.Security.SecuritySafeCritical]
        protected override ExceptionCategory OnGetCategory( )
        {
            return ExceptionCategory.UserDataError;
        } // end method

        /// <summary>
        /// Programátorské ID datové položky u které došlo k chybì hodnoty dat 
        /// Tato položka je souèástí výjimky proto, aby na stranì klienta bylo snadné graficky zvýraznit prvek, který s toto položkou souvisí a nebylo nutné nìjak parsovat text chyby.
        /// </summary>
        private string _field_name = "";

        /// <summary>
        /// Jméno datové položky, u které je reklamována chybná hodnota dat. Mùže být prázdná.
        /// Poèítá se i s možností datovou položku upøesnit dodateènì - tedy i mimo konstruktor.
        /// Tato položka je souèástí výjimky proto, aby na stranì klienta bylo snadné graficky zvýraznit prvek, který s toto položkou souvisí a nebylo nutné nìjak parsovat text chyby.
        /// </summary>
        public string field_name {
            get { return _field_name; }
            set { _field_name = value;  }
        }

        #region *********** Konstruktory *************
        //-------------------------------------------------------------------------
        /// <summary>
        /// Konstruktor vyjímky chyby dat administrace, který umožòuje specifikovat u jaké položky došlo k chybì dat.
        /// </summary>
        /// <param name="a_field_name">Jméno datové položky u které došlo k chybì.</param>
        /// <param name="localization">lokalizace</param>
        /// <param name="resourceCode">kód resources</param>
        /// <param name="parameters">parametry</param>
        [MethodImpl( MethodImplOptions.NoInlining )]
        [Obsolete( "Pøi vytváøení výjimky použijte standardní konstruktor a za nìj pøipojte podobnou konstrukci: { field_name = nameof(spis_pl) };" )]
        public GAppDataException(string a_field_name, int localization, int resourceCode, params string[] parameters )
                : base(
                    localization,
                    resourceCode,
                    Assembly.GetCallingAssembly( ),
                    parameters
                    )
        {
            _field_name = a_field_name;
        }

        //-------------------------------------------------------------------------
        /// <summary>
        /// Konstruktor vyjímky
        /// </summary>
        /// <param name="localization">lokalizace</param>
        /// <param name="resourceCode">kód resources</param>
        /// <param name="parameters">parametry</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GAppDataException(int localization,int resourceCode, params string[] parameters)
                : base(
                    localization,
                    resourceCode,
                    Assembly.GetCallingAssembly(),
                    parameters
                    )
        {
            // zadna pridana obsluha
        }

        //-------------------------------------------------------------------------
        /// <summary>
        /// Konstruktor vyjímky
        /// </summary>
        /// <param name="localization">lokalizace</param>
        /// <param name="resourceCode">kód resources</param>
        /// <param name="innerException">vnitøní vyjímka</param>
        /// <param name="parameters">parametry</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GAppDataException(int localization, int resourceCode, Exception innerException, params string[] parameters)
                : base(
                    localization,
                    resourceCode,
                    Assembly.GetCallingAssembly(),
                    innerException,
                    parameters
                    )
        {
            // zadna pridana obsluha
        }

        #endregion

        }// end class
}// end namespace

