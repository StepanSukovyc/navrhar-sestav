//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GDtoInterfaceExtensions.cs</Name>
//    <Description>                                                             </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-11-15                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using System.Data;

namespace Gordic.General
{
    /// <summary>
    /// Rozšíření IDto o obecné funkce
    /// </summary>
    public static class GDtoInterfaceExtensions
    {
        #region Modifikace dat


        /// <summary>
        /// Funkce pro otrimování všech textových položek DTO objektu
        /// </summary>
        /// <param name="a_dto">DTO objekt, jehož hodnoty se mají otrimovat</param>
        /// <param name="a_tim_type">
        /// Typ trimování 
        /// - pro uživatele můžou být i zcela prázdné stringy, 
        /// - pro ukládání do databáze (původní chování) musí u otrimovaných hodnot zůstat alespoň jedna mezera. Pokud byl původní text prázdný, zůstane i po této funkci prázdný
        /// - pro striktní ukládání do DB - nesmí zústat nikdy prázdný string
        /// </param>
        public static void TrimValues(this IGDto a_dto, GTrimTypeEnum a_tim_type = GTrimTypeEnum.ForDb )   
        {
            string v_field_name = "";
            try
            {
                var dtoProps = GDtoAccessor.Get(a_dto.GetType());
                foreach (var prop in dtoProps)
                {
                    //if (prop == null)
                    //    continue;

                    //if (prop.MemberType == MemberTypes.Field)                   // pokud je to instanční proměnná DTO - potom se jedná o sloupce DB tabulky
                    {
                        v_field_name = prop.Name;
                        if (prop.Type == typeof(GString))
                        {
                            GString v_hodnota = (GString)prop.GetValue(a_dto);
                            if (v_hodnota != null && !v_hodnota.IsNull)
                            {
                                if (v_hodnota.Value == String.Empty && a_tim_type == GTrimTypeEnum.ForDbStrict) // pokud je požadovaný striktní režim - to znamená, že nesmí po volání této funkce zůstat prázdný string
                                    v_hodnota.Value = " ";                                            // nechám tam alespoň jednu mezeru
                                else
                                {
                                    string v_pomocna = v_hodnota.Value.TrimEnd();                     // zkusím otrimovat
                                    if (v_hodnota.Value != v_pomocna)                                 // pokud se otrimovaná hodnota liší od původní hodnoty
                                    {
                                        if (v_pomocna == String.Empty && a_tim_type == GTrimTypeEnum.ForDb)     // pokud se jedná o prázdný string
                                            v_hodnota.Value = " ";                                              // nechám tam alespoň jednu mezeru
                                        else
                                            v_hodnota.Value = v_pomocna;                             // nastavim otrimovanou hodnotu
                                    }
                                }
                            }
                        }
                    }
                } // foreach
            }
            catch (Exception v_chyba)
            {
                throw new GException(21300030, 21350011, v_chyba, nameof(TrimValues), a_dto.GetType().ToString(), v_field_name); //RC-EX 21350011 : Interní chyba aplikace. U funkce {0} stringových dat v DTO objektu [{1}] patrně u property [{2}]
            }
        }

        /// <summary>
        /// Funkce pro otrimování všech textových položek DTO objektu pro ukládání do databáze
        /// Prázdné stringu jsou nahrazeny jednou mezerou - nesmí zůstat prázdný string
        /// </summary>
        /// <param name="a_dto">DTO objekt, jehož hodnoty se mají otrimovat</param>
        public static void TrimValuesForDb(this IGDto a_dto)
        {
            a_dto.TrimValues(GTrimTypeEnum.ForDbStrict);
        }

        /// <summary>
        /// Funkce pro otrimování všech textových položek DTO objektu pro zobrazení uživatelům 
        /// Mohou vzniknout prázdné stringy
        /// </summary>
        /// <param name="a_dto">DTO objekt, jehož hodnoty se mají otrimovat</param>
        public static void TrimValuesForUser(this IGDto a_dto)
        {
            a_dto.TrimValues(GTrimTypeEnum.ForUser);
        }

        /// <summary>
        /// Ořezání stringových položek obsažených v tomto objektů na maximální délku definovanou v DTO objektu
        /// </summary>
        /// <param name="a_dto">DTO objekt, podle kterého budu ořezávat textové hodnoty na max. povolenou délku</param>
        public static void TruncateValues(this IGDto a_dto)
        {
            string v_field_name = "";
            try
            {
                var dtoProps = a_dto.GetType().GetMembers(BindingFlags.Public | BindingFlags.Instance);
                foreach (var prop in dtoProps)
                {
                    if (prop == null)
                        continue;
                    if (prop.MemberType == MemberTypes.Field)                   // pokud je to instanční proměnná DTO - potom se jedná o sloupce DB tabulky
                    {
                        FieldInfo v_prop_info = (prop as FieldInfo);
                        v_field_name = v_prop_info.Name;
                        if (v_prop_info.FieldType == typeof(GString))
                        {
                            GString v_hodnota = (GString)v_prop_info.GetValue(a_dto);
                            if (v_hodnota != null)
                            {
                                if ((v_prop_info.GetCustomAttributes(typeof(GLengthAttribute), true) as GLengthAttribute[]).FirstOrDefault()?.HasMaximum ?? false)
                                {
                                    if (!v_hodnota.IsNull)
                                    {
                                        string v_pomocna = v_hodnota.BaseValue;
                                        int v_max_length = (v_prop_info.GetCustomAttributes(typeof(GLengthAttribute), true) as GLengthAttribute[]).FirstOrDefault()?.Maximum ?? int.MaxValue;
                                        if (v_pomocna.Length > v_max_length)                                      // pokud je stringová hodnota delší, než je povoleno
                                        {
                                            v_pomocna = v_pomocna.Substring(0, v_max_length);                     // oříznu text
                                            v_hodnota.Value = v_pomocna;                                          // nastavím zkrácenou hodnotu
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception v_chyba)
            {
                throw new GException(21300023, 21350011, v_chyba, nameof(TruncateValues), a_dto.GetType().ToString(), v_field_name); //RC-EX 21350011 : Interní chyba aplikace. U funkce {0} stringových dat v DTO objektu [{1}] patrně u property [{2}]
            }

        }
        #endregion

        #region SET
        /// <summary>
        /// Funkce pro převod dat z GDbTypeDictionary do IGDto objektu 
        /// </summary>
        /// <param name="a_dto">DTO objekt, který má být naplněn hodnotami z Dictionary</param>
        /// <param name="a_dictionary">GDbTypeDictionary s hodnotami, které se mají přenést do DTO objektu</param>
        public static void SetValues(this IGDto a_dto, GDbTypeDictionary a_dictionary)
        {
            GDbTypeDictionaryToDto(a_dto, a_dictionary, true, false);
        }

        /// <summary>
        /// Funkce pro převod dat z GDbTypeDictionary do IGDto objektu a to s automatickým ořezáním textových hondot na maximální délku definovanou v DTO objektu
        /// </summary>
        /// <param name="a_dto">DTO objekt, který má být naplněn hodnotami z Dictionary</param>
        /// <param name="a_dictionary">GDbTypeDictionary s hodnotami, které se mají přenést do DTO objektu</param>
        public static void SetTruncatedValues(this IGDto a_dto, GDbTypeDictionary a_dictionary)
        {
            GDbTypeDictionaryToDto(a_dto, a_dictionary, true, true);
        }

        /// <summary>
        /// Funkce pro převod dat z GDbTypeDictionary do IGDto objektu - nadbytečné hondnoty v Dictionary neznamenají chybu
        /// </summary>
        /// <param name="a_dto">DTO objekt, který má být naplněn hodnotami z Dictionary</param>
        /// <param name="a_dictionary">GDbTypeDictionary s hodnotami, které se mají přenést do DTO objektu</param>
        /// <param name="a_not_null_object">Příznak, že se prázdná pole ( objekt == null ) nemají přenášet. DbNull se ale i přesto přenáší.</param>
        /// <param name="a_truncate">Příznak, že se stringové položky mají potichu ořezat na maximální povolenou délku podle definice DTO.</param>
        public static void SetValues(this IGDto a_dto, GDbTypeDictionary a_dictionary, bool a_not_null_object, bool a_truncate)
        {
            GDbTypeDictionaryToDto(a_dto, a_dictionary, a_not_null_object, a_truncate);
        }

        /// <summary>
        /// Nastavení jedné pojmenované hodnoty DTO objektu na hodnotu podle IGDbType
        /// 
        /// </summary>
        /// <param name="a_dto">Pointer na DTO objekt, který chci nastavit</param>
        /// <param name="a_var_name">Jméno proměnné</param>
        /// <param name="a_value">Hodnota</param>
        public static void SetValue(this IGDto a_dto, string a_var_name, IGDbType a_value)
        {
            a_dto.SetValue( a_var_name, a_value, true);
        }

        /// <summary>
        /// Nastavení jedné pojmenované hodnoty DTO objektu na hodnotu podle IGDbType
        /// </summary>
        /// <param name="a_dto">Pointer na DTO objekt, který chci nastavit</param>
        /// <param name="a_var_name">Jméno proměnné</param>
        /// <param name="a_value">Hodnota</param>
        /// <param name="a_truncate">Příznak, že se stringové položky mají potichu ořezat na maximální povolenou délku podle definice DTO.</param>
        public static void SetValue(this IGDto a_dto, string a_var_name, IGDbType a_value, bool a_truncate)
        {
            var dtoProp = a_dto.GetType().GetField(a_var_name);
            if (dtoProp == null)
                throw new GArgumentException(21300031, 21300027, nameof(SetValue), a_var_name, a_dto.GetType().ToString()); //RC-EX 21300027 : Interní chyba aplikace. Chyba ve funkci {0} při dynamickém dotazu na hodnotu položky {1} objektu typu {2}. Taková položka v tomto objektu neexistuje.

            FieldInfo v_prop_info = (dtoProp as FieldInfo);

            if (a_value == null)                                // 2020-02-26
                v_prop_info.SetValue(a_dto, a_value);           // 2020-02-26
            else
            {
                //var v_field = v_prop_info.GetValue(a_dto);
                //if(v_field == null )
                //{
                //    v_prop_info.SetValue(a_dto, a_value);                     // nastavím do DTO přímo hodnotu, kterou jsem dostal na vstupu
                //}
                //else if (v_field is IGDbType)                                //if (v_field_type.IsAssignableTo<IGDbType>( ) )

                if(typeof(IGDbType).IsAssignableFrom(v_prop_info.FieldType) )
                {
                    //IGDbType v_hodnota = a_value;
                    try
                    {
                        if (a_value.GetType() == typeof(GDbTypeNull))
                            v_prop_info.SetValue(a_dto, GDbType.GetNull(v_prop_info.FieldType));
                        else if (v_prop_info.FieldType == typeof(GInt16) && (a_value.GetType() == typeof(GInt32) || a_value.GetType() == typeof(GInt64)))                       // pokud cílový je GInt16 a zdrojový je GInt32 nebo 64
                            v_prop_info.SetValue(a_dto, GInt16.Parse(a_value));
                        else if (v_prop_info.FieldType == typeof(GInt32) && (a_value.GetType() == typeof(GInt16) || a_value.GetType() == typeof(GInt64)))                       // pokud cílový je GInt32 a zdrojový je GInt16 nebo 64
                            v_prop_info.SetValue(a_dto, GInt32.Parse(a_value));
                        else if (v_prop_info.FieldType == typeof(GInt64) && (a_value.GetType() == typeof(GInt16) || a_value.GetType() == typeof(GInt32)))                       // pokud cílový je GInt64 a zdrojový je GInt16 nebo 32
                            v_prop_info.SetValue(a_dto, GInt64.Parse(a_value));
                        else if (v_prop_info.FieldType == typeof(GDate) && a_value.GetType() == typeof(GDateTime))                         // pokud cílový je GDate a zdrojový je GDateTime
                            v_prop_info.SetValue(a_dto, GDate.Parse(a_value));                 // nastavím do DTO její hodnotu ( může být i NULL )
                        else if (a_truncate && v_prop_info.FieldType == typeof(GString))
                        {
                            string v_pomocna = ((GString)a_value).BaseValue;
                            // kód na automatické ořezávání string-ů na maximální povolenou délku podle definice v DTO
                            if ((v_prop_info.GetCustomAttributes(typeof(GLengthAttribute), true) as GLengthAttribute[]).FirstOrDefault()?.HasMaximum ?? false)
                            {
                                int v_max_length = (v_prop_info.GetCustomAttributes(typeof(GLengthAttribute), true) as GLengthAttribute[]).FirstOrDefault()?.Maximum ?? int.MaxValue;
                                if (v_pomocna.Length > v_max_length)  // pokud je stringová hodnota delší, než je povoleno
                                {
                                    v_pomocna = v_pomocna.Substring(0, v_max_length);
                                }
                            }
                            v_prop_info.SetValue(a_dto, new GString(v_pomocna));
                        }
                        else
                            v_prop_info.SetValue(a_dto, a_value);                            // nastavím do DTO její hodnotu ( může být i NULL )
                    }
                    catch( Exception ex)
                    {
                        throw new GArgumentException(21300099, 21300069, nameof(SetValue), a_var_name, a_dto.GetType().ToString(), a_value.GetType().ToString(), ex.Message);  //RC-EX 21300069 : Interní chyba aplikace. Chyba ve funkci {0} při dynamickém nastavení hodnoty položky {1} objektu typu {2} na hodnotu typu {3}. Chyba: {4}
                    }
                }
                else
                    throw new GArgumentException(21300024, 21300028, nameof(SetValue), a_var_name, a_dto.GetType().ToString());  //RC-EX 21300028 : Interní chyba aplikace. Chyba ve funkci {0} při dynamickém dotazu na hodnotu položky {1} objektu typu {2}. Položka není typu IGDbType.
            }
        }
        #endregion

        #region GET
        /// <summary>
        /// Hromadné načtení hodnot hlavního DTO objektu do pole pojmenovaných hodnot
        /// 
        /// Přístup k hodnotám je přes reflection - v potomku může být přístup realizován přímým přístupem
        /// 
        /// Do výstupního pole pojmenovaných hodnot se přenáší i NULL hodnoty ( tedy G typ není nainstancován )
        /// </summary>
        /// <param name="a_dto">Pointer na DTO objekt, ze kterého se mají hodnoty načíst - lze zadat _dto nebo _dto_orig </param>
        /// <returns>GDbTypeDictionary s pojmenovanými hodnotami z DTO objektu</returns>
        public static GDbTypeDictionary GetValues(this IGDto a_dto)
        {
            if (a_dto == null)
                return (new GDbTypeDictionary());
            
            GDbTypeDictionary v_vysledek = a_dto.GetValues( true);
            return (v_vysledek);
        }

        /// <summary>
        /// Hromadné načtení hodnot hlavního DTO objektu do pole pojmenovaných hodnot.
        /// Doplňkovým argumentem lze určit, zda se do pole pojmenovaných hodnot mají přenášet i NULL objekty
        /// </summary>
        /// <param name="a_dto">Pointer na DTO objekt, ze kterého se mají hodnoty načíst - lze zadat _dto nebo _dto_orig </param>
        /// <param name="a_not_null_object">Příznak, že se prázdná pole ( objekt == null ) nemají přenášet. DbNull se ale i přesto přenáší. 
        /// Pozor! Do 2024-02-22 se tento argument ignoroval a choval se, jako by to bylo nastaveno na true. </param>
        /// <returns>GDbTypeDictionary s pojmenovanými hodnotami z DTO objektu</returns>
        public static GDbTypeDictionary GetValues(this IGDto a_dto, bool a_not_null_object)
        {
            GDbTypeDictionary v_vysledek = new GDbTypeDictionary();
            var dtoProps = a_dto.GetType().GetMembers(BindingFlags.Public | BindingFlags.Instance);
            foreach (var prop in dtoProps)
            {
                if (prop == null)
                    continue;
                if (prop.MemberType == MemberTypes.Field)                   // pokud je to instanční proměnná DTO - potom se jedná o sloupce DB tabulky
                {
                    FieldInfo v_prop_info = (prop as FieldInfo);
                    var v_field = v_prop_info.GetValue(a_dto);
                    if( v_field == null && !a_not_null_object)
                        v_vysledek.Add(v_prop_info.Name, (IGDbType)null);
                    else if (v_field is IGDbType)
                    {
                        IGDbType v_gdbtype_field = (v_field as IGDbType);
                        v_vysledek.Add(v_prop_info.Name, v_gdbtype_field);
                    }
                }
            } // foreach
            return (v_vysledek);
        }

        /// <summary>
        /// Získání jedné pojmenované hodnoty ze zadaného DTO objektu
        /// </summary>
        /// <param name="a_dto">Pointer na DTO objekt</param>
        /// <param name="a_var_name">Jméno požadované položky</param>
        /// <returns>Získaná IGDbType hodnota</returns>
        public static IGDbType GetValue(this IGDto a_dto, string a_var_name)
        {
            IGDbType v_vysledek = null;
            var dtoProp = a_dto.GetType().GetField(a_var_name);
            if (dtoProp == null)
                throw new GArgumentException(21300029, 21300027, nameof(GetValue), a_var_name, a_dto.GetType().ToString()); //RC-EX 21300027 : Interní chyba aplikace. Chyba ve funkci {0} při dynamickém dotazu na hodnotu položky {1} objektu typu {2}. Taková položka v tomto objektu neexistuje.

            FieldInfo v_prop_info = (dtoProp as FieldInfo);
            var v_field = v_prop_info.GetValue(a_dto);
            if (v_field is IGDbType)                                //if (v_field_type.IsAssignableTo<IGDbType>( ) )
                v_vysledek = (v_field as IGDbType);
            else
                throw new GArgumentException(21300028, 21300028, nameof(GetValue), a_var_name, a_dto.GetType().ToString());  //RC-EX 21300028 : Interní chyba aplikace. Chyba ve funkci {0} při dynamickém dotazu na hodnotu položky {1} objektu typu {2}. Položka není typu IGDbType.

            return (v_vysledek);
        }
        #endregion

        #region TO
        /// <summary>
        /// Funkce pro převod dat z GDbTypeDictionary do IGDto objektu 
        /// </summary>
        /// <param name="a_dto">DTO objekt, který má být naplněn hodnotami z Dictionary</param>
        /// <param name="a_dictionary">GDbTypeDictionary s hodnotami, které se mají přenést do DTO objektu</param>
        /// <param name="a_not_null_object">Příznak, že se prázdná pole ( objekt == null ) nemají přenášet. DbNull se ale i přesto přenáší.</param>
        /// <param name="a_truncate">Příznak, že se stringové položky mají potichu ořezat na maximální povolenou délku podle definice DTO. </param>
        public static void GDbTypeDictionaryToDto(IGDto a_dto, GDbTypeDictionary a_dictionary, bool a_not_null_object, bool a_truncate)
        {
            string v_field_name = "";
            //string v_value = "";
            try
            {
                var dtoProps = a_dto.GetType().GetMembers(BindingFlags.Public | BindingFlags.Instance);
                foreach (var prop in dtoProps)
                {
                    if (prop == null)
                        continue;
                    if (prop.MemberType == MemberTypes.Field)                   // pokud je to instanční proměnná DTO - potom se jedná o sloupce DB tabulky
                    {
                        FieldInfo v_prop_info = (prop as FieldInfo);
                        v_field_name = v_prop_info.Name;
                        if (a_dictionary.ContainsKey(v_prop_info.Name))                         // pokud v dictionary takova položka existuje
                        {
                            IGDbType v_hodnota = a_dictionary[v_prop_info.Name];
                            if (v_hodnota != null)
                            {
                                //v_value = v_hodnota.ToString();

                                if (a_dictionary[v_prop_info.Name].GetType() != v_prop_info.FieldType)  // následující část řeším pouze v případě, že je nesoulad typů
                                {
                                    if (a_dictionary[v_prop_info.Name].GetType() == typeof(GDbTypeNull))
                                        v_hodnota = GDbType.GetNull(v_prop_info.FieldType);

                                    else if (v_prop_info.FieldType == typeof(GInt16) && a_dictionary[v_prop_info.Name] is IGDbTypeNumber cislo16)
                                        v_hodnota = GInt16.Parse(cislo16);

                                    else if (v_prop_info.FieldType == typeof(GInt32) && a_dictionary[v_prop_info.Name] is IGDbTypeNumber cislo32)
                                        v_hodnota = GInt32.Parse(cislo32);

                                    else if (v_prop_info.FieldType == typeof(GInt64) && a_dictionary[v_prop_info.Name] is IGDbTypeNumber cislo64)
                                        v_hodnota = GInt64.Parse(cislo64);

                                    else if (v_prop_info.FieldType == typeof(GInt16) && a_dictionary[v_prop_info.Name] is GDecimal dec16)
                                        v_hodnota = GInt16.Parse(dec16);

                                    else if (v_prop_info.FieldType == typeof(GInt32) && a_dictionary[v_prop_info.Name] is GDecimal dec32)
                                        v_hodnota = GInt32.Parse(dec32);

                                    else if (v_prop_info.FieldType == typeof(GInt64) && a_dictionary[v_prop_info.Name] is GDecimal dec64)
                                        v_hodnota = GInt64.Parse(dec64);

                                    else if (v_prop_info.FieldType == typeof(GDate) && (a_dictionary[v_prop_info.Name] is GDateCurrent || a_dictionary[v_prop_info.Name] is GDateTimeCurrent))
                                        v_hodnota = new GDateCurrent();

                                    else if (v_prop_info.FieldType == typeof(GDateTime) && (a_dictionary[v_prop_info.Name] is GDateCurrent || a_dictionary[v_prop_info.Name] is GDateTimeCurrent))                         // pokud cílový je GDate a zdrojový je GDateTime
                                        v_hodnota = new GDateTimeCurrent();

                                    else if (v_prop_info.FieldType == typeof(GDate) && a_dictionary[v_prop_info.Name] is IGDbTypeDateTime datum)                         // pokud cílový je GDate a zdrojový je GDateTime
                                        v_hodnota = GDate.Parse(datum);

                                    else if (v_prop_info.FieldType == typeof(GDateTime) && a_dictionary[v_prop_info.Name] is IGDbTypeDateTime datumcas)                         // pokud cílový je GDate a zdrojový je GDateTime
                                        v_hodnota = GDateTime.Parse(datumcas);

                                    else if (v_prop_info.FieldType == typeof(GDecimal) && a_dictionary[v_prop_info.Name] is IGDbTypeNumber cislo)
                                        v_hodnota = GDecimal.Parse(cislo);

                                    else if (a_truncate && v_prop_info.FieldType == typeof(GString))
                                    {
                                        // kód na automatické ořezátní stringů na maximální povolenou délku podle definice v DTO
                                        if ((v_prop_info.GetCustomAttributes(typeof(GLengthAttribute), true) as GLengthAttribute[]).FirstOrDefault()?.HasMaximum ?? false)
                                        {
                                            string v_pomocna = ((GString)a_dictionary[v_prop_info.Name]).BaseValue;
                                            int v_max_length = (v_prop_info.GetCustomAttributes(typeof(GLengthAttribute), true) as GLengthAttribute[]).FirstOrDefault()?.Maximum ?? int.MaxValue;
                                            if (v_pomocna.Length > v_max_length)  // pokud je stringová hodnota delší, než je povoleno
                                            {
                                                v_pomocna = v_pomocna.Substring(0, v_max_length);
                                                v_hodnota = new GString(v_pomocna);
                                            }
                                        }
                                    }
                                }
                            }
                            //else
                            //    v_value = "[NULL]";

                            if (v_hodnota != null || !a_not_null_object)
                                v_prop_info.SetValue(a_dto, v_hodnota);                            // nastavím do DTO její hodnotu ( může být i NULL )
                        }
                    }
                } // foreach
            }
            catch (Exception v_chyba)
            {
                throw new GException(21300050, 21300029, v_chyba, a_dto.GetType().ToString(), v_field_name); //RC-EX 21300029 : Interní chyba aplikace. Při přenosu dat z GDbTypeDictionary do DTO objektu [{0}] patrně u property [{1}]
            }
        }

        /// <summary>
        /// Funkce pro převod DTO objektu na GDbTypeList
        /// </summary>
        /// <param name="a_dto">DTO objekt, který se má převést na GDbTypeList</param>
        /// <returns>GDbTypeList hodnosd z DTO objektu</returns>
        public static GDbTypeDictionary DtoToGDbTypeDictionary(IGDto a_dto)
        {
            GDbTypeDictionary v_vysledek = new GDbTypeDictionary();
            var dtoProps = a_dto.GetType().GetMembers(BindingFlags.Public | BindingFlags.Instance);
            foreach (var prop in dtoProps)
            {
                if (prop == null)
                    continue;
                if (prop.MemberType == MemberTypes.Field)                   // pokud je to instanční proměnná DTO - potom se jedná o sloupce DB tabulky
                {
                    FieldInfo v_prop_info = (prop as FieldInfo);
                    var v_field = v_prop_info.GetValue(a_dto);
                    if (v_field is IGDbType)                                //if (v_field_type.IsAssignableTo<IGDbType>( ) )
                    {
                        IGDbType v_gdbtype_field = (v_field as IGDbType);
                        if (v_gdbtype_field != null)                        // pokud je proměnná nastavena, potom jí dám do části SET příkazu UPDATE
                            v_vysledek.Add(v_prop_info.Name, v_gdbtype_field);
                    }
                }
            } // forach
            return (v_vysledek);
        }

        /// <summary>
        /// Funkce pro převod hodnot z DTO do Dictionary G typů
        /// </summary>
        /// <param name="a_dto">DTO objekt, který se má převést</param>
        /// <returns>Trída GDbTypeList obsahujíc list G typů polí z DTO objektu</returns>
        public static GDbTypeDictionary ToGDbTypeDictionary(this IGDto a_dto)
        {
            return (DtoToGDbTypeDictionary(a_dto));
        }

        /// <summary>
        /// Funkce pro převod hodnot primárního klíče DTO objektu na tříděné pole hodnot v IGDbType
        /// 
        /// Pokud je některý sloupec PK nastaven na NULL, potom je vyhlášena chyba: MissingPrimaryKeyException 
        /// </summary>
        /// <param name="a_dto">DTO objekt, ze kterého se mají převést hodnoty PK</param>
        /// <returns>SortedDictionary hodnod PK z DTO objektu</returns>
        public static SortedDictionary<int, IGDbType> DtoPkToSortedDictionary(IGDto a_dto)
        {
            SortedDictionary<int, IGDbType> v_vysledek = new SortedDictionary<int, IGDbType>();
            var dtoProps = a_dto.GetType().GetMembers(BindingFlags.Public | BindingFlags.Instance);
            foreach (var prop in dtoProps)
            {
                if (prop == null)
                    continue;
                if (prop.MemberType == MemberTypes.Field)                   // pokud je to instanční proměnná DTO - potom se jedná o sloupce DB tabulky
                {
                    FieldInfo v_prop_info = (prop as FieldInfo);
                    var v_field = v_prop_info.GetValue(a_dto);
                    if (v_field is IGDbType)                                //if (v_field_type.IsAssignableTo<IGDbType>( ) )
                    {
                        IGDbType v_gdbtype_field = (v_field as IGDbType);
                        object[] v_atrib = prop.GetCustomAttributes(typeof(GKeyAttribute), true);
                        if (v_atrib.Length == 1)   // pokud to obsahuje atribut GKeyAttribute - tak je to součástí PK
                        {
                            GKeyAttribute v_key_atrib = (GKeyAttribute)v_atrib[0];
                            int v_order = v_key_atrib.Order;
                            if (v_gdbtype_field == null)                        // pokud je proměnná nastavena, potom jí dám do části SET příkazu UPDATE
                                throw new MissingPrimaryKeyException(String.Format("Interní chyba aplikace. U objektu DTO není při volání funkce DtoPkToGDbTypeDictionary() nastavena hodnota sloupce PK {0}. Toto je nepřípustná situace.", v_prop_info.Name));
                            else
                            {
                                v_vysledek.Add(v_order, v_gdbtype_field);
                            }
                        }
                    }
                }
            } // forach
            return (v_vysledek);
        }
        /// <summary>
        /// Funkce pro převod hodnot primárního klíče DTO objektu na hodnoty v GDbTypeDictionary
        /// 
        /// Pokud je některý sloupec PK nastaven na NULL, potom je vyhlášena chyba: MissingPrimaryKeyException 
        /// </summary>
        /// <param name="a_dto">DTO objekt, ze kterého se mají převést hodnoty PK</param>
        /// <returns>GDbTypeDictionary hodnod PK z DTO objektu</returns>
        public static SortedDictionary<int, IGDbType> PkToSortedDictionary(this IGDto a_dto)
        {
            return (DtoPkToSortedDictionary(a_dto));
        }

        /// <summary>
        /// Funkce pro převod hodnot primárního klíče DTO objektu na hodnoty v GDbTypeDictionary
        /// 
        /// Pokud je některý sloupec PK nastaven na NULL, potom je vyhlášena chyba: MissingPrimaryKeyException 
        /// 
        /// Pozor! Tato funkce negarantuje pořadí sloupců
        /// </summary>
        /// <param name="a_dto">DTO objekt, ze kterého se mají převést hodnoty PK</param>
        /// <returns>GDbTypeDictionary hodnod PK z DTO objektu</returns>
        public static GDbTypeDictionary DtoPkToGDbTypeDictionary(IGDto a_dto)
        {
            GDbTypeDictionary v_vysledek = new GDbTypeDictionary();
            var dtoProps = a_dto.GetType().GetMembers(BindingFlags.Public | BindingFlags.Instance);
            foreach (var prop in dtoProps)
            {
                if (prop == null)
                    continue;
                if (prop.MemberType == MemberTypes.Field)                   // pokud je to instanční proměnná DTO - potom se jedná o sloupce DB tabulky
                {
                    FieldInfo v_prop_info = (prop as FieldInfo);
                    var v_field = v_prop_info.GetValue(a_dto);
                    if (v_field is IGDbType)                                //if (v_field_type.IsAssignableTo<IGDbType>( ) )
                    {
                        IGDbType v_gdbtype_field = (v_field as IGDbType);
                        if (prop.GetCustomAttributes(typeof(GKeyAttribute), true).Length > 0)   // pokud to obsahuje atribut GKeyAttribute - tak je to součástí PK
                        {
                            if (v_gdbtype_field == null)                        // pokud je proměnná nastavena, potom jí dám do části SET příkazu UPDATE
                                throw new MissingPrimaryKeyException(String.Format("Interní chyba aplikace. U objektu DTO není při volání funkce DtoPkToGDbTypeDictionary() nastavena hodnota sloupce PK {0}. Toto je nepřípustná situace.", v_prop_info.Name));
                            else
                                v_vysledek.Add(v_prop_info.Name, v_gdbtype_field);
                        }
                    }
                }
            } // forach
            return (v_vysledek);
        }

        /// <summary>
        /// Funkce pro převod hodnot primárního klíče DTO objektu na hodnoty v GDbTypeDictionary
        /// 
        /// Pokud je některý sloupec PK nastaven na NULL, potom je vyhlášena chyba: MissingPrimaryKeyException 
        /// </summary>
        /// <param name="a_dto">DTO objekt, ze kterého se mají převést hodnoty PK</param>
        /// <returns>GDbTypeDictionary hodnod PK z DTO objektu</returns>
        public static GDbTypeDictionary PkToGDbTypeDictionary(this IGDto a_dto)
        {
            return (DtoPkToGDbTypeDictionary(a_dto));
        }

        /// <summary>
        /// Funkce pro převod DTO objektu na GDbTypeList
        /// </summary>
        /// <param name="a_dto">DTO objekt, který se má převést na GDbTypeList</param>
        /// <returns>GDbTypeList hodnosd z DTO objektu</returns>
        public static GDbTypeList DtoToGDbTypeList(IGDto a_dto)
        {
            GDbTypeList v_vysledek = new GDbTypeList();
            try
            {
                var dtoProps = a_dto.GetType().GetMembers(BindingFlags.Public | BindingFlags.Instance);
                foreach (var prop in dtoProps)
                {
                    if (prop == null)
                        continue;
                    if (prop.MemberType == MemberTypes.Field)                   // pokud je to instanční proměnná DTO - potom se jedná o sloupce DB tabulky
                    {
                        FieldInfo v_prop_info = (prop as FieldInfo);
                        var v_field = v_prop_info.GetValue(a_dto);
                        if (v_field is IGDbType)                                //if (v_field_type.IsAssignableTo<IGDbType>( ) )
                        {
                            IGDbType v_gdbtype_field = (v_field as IGDbType);
                            if (v_gdbtype_field != null)                        // pokud je proměnná nastavena, potom jí dám do části SET příkazu UPDATE
                                v_vysledek.Add(v_gdbtype_field, v_prop_info.Name);
                        }
                    }
                } // foreach
            }
            catch (Exception v_chyba)
            {
                throw new GException(21300043, 21300030, v_chyba); //RC-EX 21300030 : Interní chyba aplikace. Při pokusu o převod IGDbType na GDbTypeList
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Funkce pro převod hodnot z DTO do List-u G typů
        /// </summary>
        /// <param name="a_dto">DTO objekt, který se má převést</param>
        /// <returns>Trída GDbTypeList obsahujíc list G typů polí z DTO objektu</returns>
        public static GDbTypeList ToGDbTypeList(this IGDto a_dto)
        {
            return (DtoToGDbTypeList(a_dto));
        }
        #endregion

        #region Merge
        /// <summary>
        /// Vrátí novou instanci DTO objektu stejného typu jako je tento.
        /// Hodnoty v novém DTO objektu jsou spojením hodnot tohoto objektu s přepisem nastavených hondot v zadaném DTO objektu.
        /// Přitom položky v novém DTO objektu, které nejsou nastaveny ( jsou null ) se neuplatní při přepisu starých hodnot.
        /// </summary>
        /// <param name="a_dto">tento DTO objekt - je zdrojem výchozích hodnot pro budoucí DTO objekt</param>
        /// <param name="a_dto_new">DTO objekt s novou kolekcí hondnot - počítá se s tím, že mohou být nastaveny jen některé položky.</param>
        /// <returns>Výsledný DTO objekt, který je hodnotovým spojením starých hodnot doplněných/přepsaných neNULL hodnotami z druhého DTO objektu.</returns>
        public static IGDto MergeValues( this IGDto a_dto, IGDto a_dto_new )
        {
            IGDto v_dto_orig = (IGDto)Activator.CreateInstance(a_dto.GetType());  // CREATE _dto_orig podle známého typu _dto
            GDbTypeDictionary v_old_values = a_dto.ToGDbTypeDictionary();
            GDbTypeDictionary v_new_values = a_dto_new.ToGDbTypeDictionary();
            GDbTypeDictionary v_merged_values = v_old_values.MergeValues(v_new_values);
            v_dto_orig.SetValues(v_merged_values);
            return v_dto_orig;
        }

        /// <summary>
        /// Z pole aktuálních hodnot a pole nových hodnot udělá nové pole obsahující pouze položky, které jsou nové, nebo hodnotově změněné
        /// Slouží pro kontrolu pouze nových položek, které jsou jíné proti původní kolekci
        /// Nejedná se tedy o seznam všech rozdílných položek dvou polí obecně!!
        /// </summary>
        /// <param name="a_dto">tento DTO objekt - je zdrojem výchozích hodnot pro budoucí DTO objekt</param>
        /// <param name="a_dto_new">DTO objekt s novou kolekcí hondnot - počítá se s tím, že mohou být nastaveny jen některé položky.</param>
        /// <returns>Výsledný DTO objekt, který obsahuje pouze hodnotově měněné položky</returns>
        public static IGDto ChangedValues(this IGDto a_dto, IGDto a_dto_new)
        {
            IGDto v_dto_orig = (IGDto)Activator.CreateInstance(a_dto.GetType());  // CREATE _dto_orig podle známého typu _dto
            GDbTypeDictionary v_old_values = a_dto.ToGDbTypeDictionary();
            GDbTypeDictionary v_new_values = a_dto_new.ToGDbTypeDictionary();
            GDbTypeDictionary v_merged_values = v_old_values.ChangedValues(v_new_values);
            v_dto_orig.SetValues(v_merged_values);
            return v_dto_orig;
        }


        #endregion

        #region Compare
        /// <summary>
        /// Funkce porovná čerstvě nastavené hodnoty sloupců proti původnímu stavu načtenému z databáze
        /// this jsou původní hodnoty 
        /// </summary>
        /// <param name="a_dto_orig">DTO s původní kolekcí hodnot</param>
        /// <param name="a_dto">DTO s novou kolekcí hodnot</param>
        /// <returns>true pokud nová kolekce dat má jinou hodnotu, než původní kolekce hodnot</returns>
        public static bool IsDataChanged(this IGDto a_dto_orig, IGDto a_dto)
        {
            bool v_is_data_changed = false;

            GDbTypeDictionary v_old_data = a_dto_orig.ToGDbTypeDictionary();
            GDbTypeDictionary v_data = a_dto.ToGDbTypeDictionary();

            foreach (KeyValuePair<string, IGDbType> v_item in v_data)           // projdu postupně všechna nastavená data
            {
                if (v_old_data.ContainsKey(v_item.Key))
                {
                    IGDbType v_n_data = v_item.Value;
                    IGDbType v_o_data = v_old_data[v_item.Key];

                    if (v_n_data.IsNull && v_o_data.IsNull)
                        continue;

                    if (v_n_data.IsNull || v_o_data.IsNull)
                    {
                        v_is_data_changed = true;
                        break;
                    }

                    if (v_n_data is GDateTimeCurrent)
                    {
                        v_is_data_changed = true;
                        break;
                    }
                    if (v_n_data is GDateCurrent)
                    {
                        v_is_data_changed = true;
                        break;
                    }
                    if (v_n_data is IGDbTypeDateTime datum && datum.IsCurrent)
                    {
                        v_is_data_changed = true;
                        break;
                    }

                    if (v_n_data is GDate || v_n_data is GDateTime || v_o_data is GDate || v_o_data is GDateTime)      // pokud je to některý z datumových formátů
                    {
                        if (GetLocalDateTime(v_o_data) != GetLocalDateTime(v_n_data))                                    // porovnám hodnoty ale převedené na lokální čas
                        {
                            v_is_data_changed = true;
                            break;
                        }
                    }
                    else if (v_n_data.CompareTo(v_o_data) != 0)
                    {
                        v_is_data_changed = true;
                        break;
                    }
                }
            }
            return (v_is_data_changed);
        }
        #endregion

        #region Pomocné funkce
        /// <summary>
        /// Pomocná funkce pro převod obecné hodnoty na lokální část nebo na null hodnotu
        /// </summary>
        /// <param name="a_value">Převáděná hodnota - jsou podporovánt pouze typy: DateTime, DateTime?, DateTimeOffset, DateTimeOffset?</param>
        /// <returns>Lokální reprezentace hodnoty nebo null hodnota</returns>
        private static DateTime? GetLocalDateTime(object a_value)
        {
            DateTime? v_value;
            if (a_value == null)
                return v_value = null;
            else if (a_value.GetType() == typeof(GDate))
            {
                GDate v_date = (GDate)a_value;
                if (v_date.IsNull)
                    v_value = null;
                else
                {
                    v_value = GDate.ClearTime(v_date.Value.ToLocalTime());
                }
            }
            else if (a_value.GetType() == typeof(GDateTime))
            {
                GDateTime v_date = (GDateTime)a_value;
                if (v_date.IsNull)
                    v_value = null;
                else
                {
                    DateTime v_datetime = v_date.Value;
                    if (v_datetime.Kind == DateTimeKind.Unspecified)
                        v_value = DateTime.SpecifyKind(v_datetime, DateTimeKind.Local);
                    else if (v_datetime.Kind == DateTimeKind.Utc)
                        v_value = v_datetime.ToLocalTime();
                    else
                        v_value = v_datetime;
                }
            }
            else if (a_value.GetType() == typeof(DateTime) || a_value.GetType() == typeof(DateTime?))
            {
                DateTime v_datetime = (DateTime)a_value;
                if (v_datetime.Kind == DateTimeKind.Unspecified)
                    v_value = DateTime.SpecifyKind(v_datetime, DateTimeKind.Local);
                else if (v_datetime.Kind == DateTimeKind.Utc)
                    v_value = v_datetime.ToLocalTime();
                else
                    v_value = v_datetime;
            }
            else if (a_value.GetType() == typeof(DateTimeOffset) || a_value.GetType() == typeof(DateTimeOffset?))
                v_value = ((DateTimeOffset)a_value).LocalDateTime;
            else
                throw new GException(21300022, 21300031, ThisAssembly, nameof(GetLocalDateTime), a_value.GetType().ToString());  //RC-EX 21300031 : Interní chyba aplikace. Funkce {0} - pokus o nepodporovanou datovou konverzi z typu {1}.

            return v_value;
        }

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly
        {
            get { return typeof(GDtoInterfaceExtensions).Assembly; }
        } // end property

        #endregion
    }
}
