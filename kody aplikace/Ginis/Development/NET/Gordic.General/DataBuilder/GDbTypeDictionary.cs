//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GDbTypeDictionary.cs    </Name>
//    <Description> Třída pro pole G DB typů s unikátním pojmenováním ( Dictionary )</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-04-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Diagnostics;
using System.Data;

namespace Gordic.General
{

    /// <summary>
    /// Třída pro pole G DB typů s unikátním pojmenováním ( Dictionary )
    /// </summary>
    [Serializable, DebuggerTypeProxy(typeof(DictionaryDebugView)),
                   DebuggerDisplay("Count = {Count}")]
    public class GDbTypeDictionary : Dictionary<string, IGDbType>
    {
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="serializationInfo"></param>
        /// <param name="streamingContext"></param>
        protected GDbTypeDictionary(System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext) : base (serializationInfo, streamingContext )
        {
        }

        /// <summary>
        /// Konstruktor pro vytvoření prázdného pole
        /// </summary>
        public GDbTypeDictionary()
        {
            // bez akce
        }
        /// <summary>
        /// Konstruktor, který umožňuje zadat odděleně pole jmen a pole hodnot
        /// </summary>
        /// <param name="names"></param>
        /// <param name="values"></param>
        public GDbTypeDictionary(string[] names, GDbTypeList values)
        {
            if (names.Length != values.Count)
                throw new GInternalDataException(21300059, 21300042, "GDbTypeDictionary(string[] names, GDbTypeList values)"); //RC-EX 21300042 : Interní chyba dat. U {0} - pole jmen a pole hodnot musí být stejně dlouhé.
            for (int i = 0; i < names.Length; i++)
            {
                if(this.ContainsKey(names[i]))
                    throw new GInternalDataException(21300092, 21300043, "GDbTypeDictionary(string[] names, GDbTypeList values)", names[i] ); //RC-EX 21300043 : Interní chyba dat. {0} - pole jmen obsahuje položku [{1}] vícenásobně.
                else
                    this.Add(names[i], values[i]);
            }
        }

        /// <summary>
        /// Konstruktor s objektem, který může být pouze anonymním type, DTO, GDbTypeList, GDbTypeDictionary nebo Tuple&lt;string, IGDbType&gt;[]
        /// Musí být zajištěno unikátní pojmenování jednotlivých prvků objektu, jinak je vyhlášena chyba.
        /// </summary>
        public GDbTypeDictionary(object a_Params)
        {
            if (a_Params == null)
            {
                // nic - není chyba - pouze bude tento objekt prázdný
            }
            else if (a_Params.IsAnonymousType())         // anonymní třída
            {
                var dtoProps_set = a_Params.GetType().GetProperties();
                foreach (var prop in dtoProps_set)
                {
                    var v_field = prop.GetValue(a_Params, null);
                    IGDbType v_hodnota = GDbTypeConverter.GetIGDbType(v_field, true);
                    this.Add(prop.Name, v_hodnota);
                }
            }
            else if (a_Params.GetType().IsAssignableTo(typeof(IGDto)))      // DTO objekt
            {
                this.Add(a_Params as IGDto);
            }
            else if (a_Params is GDbTypeList)                             // GDbTypeList
            {
                GDbTypeList v_list_set = (a_Params as GDbTypeList);
                foreach (IGDbType v_hodnota in v_list_set)
                    this.Add(v_hodnota.SourceColumn, v_hodnota);
            }
            else if (a_Params is GDbTypeDictionary)                             // GDbTypeDictionary
            {
                GDbTypeDictionary v_list_set = (a_Params as GDbTypeDictionary);
                foreach (string v_var_name in v_list_set.Keys)
                    this.Add(v_var_name, v_list_set[v_var_name]);
            }
            else if (a_Params is Tuple<string, IGDbType>[])                 // TUPLE
            {
                Tuple<string, IGDbType>[] v_tuple_params = (a_Params as Tuple<string, IGDbType>[]);
                foreach (Tuple<string, IGDbType> v_par in v_tuple_params)
                    this.Add(v_par.Item1, v_par.Item2);
            }
            else if( a_Params is Dictionary<string,object> v_dict )
            {
                foreach (var v_item in v_dict)
                {
                    IGDbType v_hodnota = GDbTypeConverter.GetIGDbType(v_item.Value, true);
                    this.Add(v_item.Key, v_hodnota);
                }
            }
            else if (a_Params is IGDbType[] v_array)
            {
                foreach (IGDbType v_item in v_array)
                {
                    this.Add(v_item.SourceColumn, v_item);
                }
            }
            else // zcela obecný objekt - přes reflection nacucnu jeho property - pokud jsou prevoditelne na G typy - ostatní bez vyhození chyby vynechám
            {
                var dtoProps_set = a_Params.GetType().GetProperties();
                foreach (var prop in dtoProps_set)
                {
                    var v_field = prop.GetValue(a_Params, null);
                    if(GDbTypeConverter.TryGetIGDbType(v_field, out IGDbType v_hodnota, true))
                        this.Add(prop.Name, v_hodnota);
                }
            }
            //else
            //    throw new ArgumentException("Interní chyba aplikace. Konstruktor GDbTypeDictionary(object ) umožňuje jako agrument pouze anonymním type, DTO, GDbTypeList nebo Tuple<string, IGDbType>[]");
        }

        /// <summary>
        /// Vytvoření pole hodnot G typů
        /// </summary>
        /// <returns></returns>
        public IGDbType[] ToArray()
        {
            return this.Values.ToArray<IGDbType>();
        }


        /// <summary>
        /// Převod prvků v tomto GDbTypeDictionary na páry jméno+hodnota.
        /// 
        /// Přepínačem lze určit, zda se mají přenášet také prvky s hodnotou NULL
        /// 
        /// Možná časem přidat test na nastavení SourceColumn u všech prvků a také na unikátnost SourceColumn - pokud ne, tak vyhlásit chybu
        /// </summary>
        /// <param name="a_copy_with_null">Příznak, že se mají kopírovat i null prvky. Nepovinný argument s výchozí hondotou false - takže NULL prvky se nekopírují.</param>
        /// <returns>Nově vytvořený tuple string, IGDbType </returns>
        public Tuple<string, IGDbType>[] ToTupleArray(bool a_copy_with_null = false)
        {
            int v_count = 0;
            int v_index = 0;

            if (a_copy_with_null)
                v_count = this.Count;
            else
            {
                foreach (string v_col_name in this.Keys)
                    if (this[v_col_name] != null)
                        v_count++;
            }

            Tuple<string, IGDbType>[] v_vysledek = new Tuple<string, IGDbType>[v_count];
            foreach (string v_col_name in this.Keys)
            {
                IGDbType v_item = this[v_col_name];
                if (v_item != null || a_copy_with_null)
                {
                    v_vysledek[v_index] = new Tuple<string, IGDbType>(v_col_name, v_item);
                    v_index++;
                }
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Pro hodnoty tohoto dictionary vrátí vytvořený a naplněný DataRow a to pro DataTable podle předaného vzoru
        /// Řádek se ale do DataTable v rámci této funkce nepřidává - slouží pouze jako šablona pro vznik nového řádku
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public DataRow ToDataRow(ref DataTable table)
        {
            DataRow v_row = table.NewRow();
            foreach (string v_col_name in this.Keys)
            {
                if (table.Columns.Contains(v_col_name))
                {
                    if (this[v_col_name].IsNull)
                        v_row[v_col_name] = DBNull.Value; 
                    else
                        v_row[v_col_name] = this[v_col_name].DbValue;
                }
            }
            return (v_row);
        }

        /// <summary>
        /// Převod GDbTypeDictionary na jednoduchý Dictionary string, object
        /// </summary>
        /// <param name="dictionary"></param>
        public static implicit operator Dictionary<string, object>(GDbTypeDictionary dictionary)
        {
            Dictionary<string, object> v_vysledek = new Dictionary<string, object>();
            foreach (var v_item in dictionary)
                v_vysledek.Add(v_item.Key, v_item.Value);
            return (v_vysledek);
        }

        #region ADD
        /// <summary>
        /// Přidání polí na základě nastavených prvků zadaného DTO objektu. Prvky, které byly NULL se nepřidávají
        /// </summary>
        /// <param name="a_dto">IGDto objekt, jehož instanční proměnné se mají přidat do této Dictionary</param>
        public void Add(IGDto a_dto)
    {
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
                            this.Add(v_prop_info.Name, v_gdbtype_field);
                    }
                }
            } // foreach
        }
        catch (Exception v_chyba)
        {
            throw new GException(21300044, 21300034, v_chyba); //RC-EX 21300034 : Interní chyba aplikace. Při pokus o nastavení GDbTypeDictionary na základě GDTO objektu.
        }
    }

        /// <summary>
        /// Přidání hodnoty specifického G typu
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">Hodnota položky</param>
        public void Add(string a_key, GDateTimeCurrent a_value)
        {
            IGDbType v_value = (IGDbType)a_value;
            this.Add(a_key, v_value);
        }
        /// <summary>
        /// Přidání hodnoty specifického G typu
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">Hodnota položky</param>
        public void Add(string a_key, GDateCurrent a_value)
        {
            IGDbType v_value = (IGDbType)a_value;
            this.Add(a_key, v_value);
        }
        /// <summary>
        /// Přidání hodnoty specifického G typu
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">Hodnota položky</param>
        public void Add(string a_key, GDbTypeNull a_value)
        {
            IGDbType v_value = (IGDbType)a_value;
            this.Add(a_key, v_value);
        }

        /// <summary>
        /// Přidání hodnoty typu string
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Add(string a_key, string a_value)
        {
            IGDbType v_value = new GString(a_value);
            this.Add(a_key, v_value);
        }

        /// <summary>
        /// Přidání hodnoty typu short
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Add(string a_key, short? a_value)
        {
            IGDbType v_value = new GInt16(a_value);
            this.Add(a_key, v_value);
        }

        /// <summary>
        /// Přidání hodnoty typu int
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Add(string a_key, int? a_value)
        {
            IGDbType v_value = new GInt32(a_value);
            this.Add(a_key, v_value);
        }

        /// <summary>
        /// Přidání hodnoty typu DateTime
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Add(string a_key, DateTime? a_value)
        {
            IGDbType v_value = new GDateTime(a_value);
            this.Add(a_key, v_value);
        }

        /// <summary>
        /// Přidání hodnoty typu Decimal
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Add(string a_key, Decimal? a_value)
        {
            IGDbType v_value = new GDecimal(a_value);
            this.Add(a_key, v_value);
        }

        /// <summary>
        /// Přidání hodnoty typu Boolean
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Add(string a_key, Boolean? a_value)
        {
            IGDbType v_value = new GBoolean(a_value);
            this.Add(a_key, v_value);
        }

        /// <summary>
        /// Přidání hodnoty typu Blob
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Add(string a_key, byte[] a_value)
        {
            IGDbType v_value = new GBlob(a_value);
            this.Add(a_key, v_value);
        }
        /// <summary>
        /// Přidání hodnoty typu DataTable
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Add(string a_key, DataTable a_value)
        {
            IGDbType v_value = new GTable(a_value);
            this.Add(a_key, v_value);
        }

        /// <summary>
        /// Přidání hodnoty specifického G typu
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">Hodnota položky</param>
        public void AddIfNotExists(string a_key, IGDbType a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                this.Add(a_key, a_value);
            }
        }

        /// <summary>
        /// Přidání hodnoty specifického G typu
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">Hodnota položky</param>
        public void AddIfNotExists(string a_key, GDateTimeCurrent a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = (IGDbType)a_value;
                this.Add(a_key, v_value);
            }
        }
        /// <summary>
        /// Přidání hodnoty specifického G typu
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">Hodnota položky</param>
        public void AddIfNotExists(string a_key, GDateCurrent a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = (IGDbType)a_value;
                this.Add(a_key, v_value);
            }
        }
        /// <summary>
        /// Přidání hodnoty specifického G typu - pouze pokud v kolekci zatím není obsaženo
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">Hodnota položky</param>
        public void AddIfNotExists(string a_key, GDbTypeNull a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = (IGDbType)a_value;
                this.Add(a_key, v_value);
            }
        }

        /// <summary>
        /// Přidání hodnoty typu string
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void AddIfNotExists(string a_key, string a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = new GString(a_value);
                this.Add(a_key, v_value);
            }
        }

        /// <summary>
        /// Přidání hodnoty typu short
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void AddIfNotExists(string a_key, short? a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = new GInt16(a_value);
                this.Add(a_key, v_value);
            }
        }

        /// <summary>
        /// Přidání hodnoty typu int
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void AddIfNotExists(string a_key, int? a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = new GInt32(a_value);
                this.Add(a_key, v_value);
            }
        }

        /// <summary>
        /// Přidání hodnoty typu DateTime
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void AddIfNotExists(string a_key, DateTime? a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = new GDateTime(a_value);
                this.Add(a_key, v_value);
            }
        }

        /// <summary>
        /// Přidání hodnoty typu Decimal
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void AddIfNotExists(string a_key, Decimal? a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = new GDecimal(a_value);
                this.Add(a_key, v_value);
            }
        }

        /// <summary>
        /// Přidání hodnoty typu Boolean
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void AddIfNotExists(string a_key, Boolean? a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = new GBoolean(a_value);
                this.Add(a_key, v_value);
            }
        }

        /// <summary>
        /// Přidání hodnoty typu Blob
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void AddIfNotExists(string a_key, byte[] a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = new GBlob(a_value);
                this.Add(a_key, v_value);
            }
        }
        /// <summary>
        /// Přidání hodnoty typu DataTable
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void AddIfNotExists(string a_key, DataTable a_value)
        {
            if (!this.ContainsKey(a_key))
            {
                IGDbType v_value = new GTable(a_value);
                this.Add(a_key, v_value);
            }
        }
        #endregion

        #region SET
        /// <summary>
        /// Nastaví hodnoty typu string
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Set(string a_key, IGDbType a_value)
        {
            if (this.ContainsKey(a_key))
                this[a_key] = a_value;
            else
                this.Add(a_key, a_value);
        }

        /// <summary>
        /// Nastaví hodnoty typu string
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Set(string a_key, string a_value)
        {
            IGDbType v_value = new GString(a_value);
            if (this.ContainsKey(a_key))
                this[a_key] = v_value;
            else
                this.Add(a_key, v_value);
        }

        /// <summary>
        /// Nastaví hodnoty typu short
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Set(string a_key, short? a_value)
        {
            IGDbType v_value = new GInt16(a_value);
            if (this.ContainsKey(a_key))
                this[a_key] = v_value;
            else
                this.Add(a_key, v_value);
        }

        /// <summary>
        /// Nastaví hodnoty typu int
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Set(string a_key, int? a_value)
        {
            IGDbType v_value = new GInt32(a_value);
            if (this.ContainsKey(a_key))
                this[a_key] = v_value;
            else
                this.Add(a_key, v_value);
        }

        /// <summary>
        /// Nastaví hodnoty typu DateTime
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Set(string a_key, DateTime? a_value)
        {
            IGDbType v_value = new GDateTime(a_value);
            if (this.ContainsKey(a_key))
                this[a_key] = v_value;
            else
                this.Add(a_key, v_value);
        }

        /// <summary>
        /// Nastaví hodnoty typu Decimal
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Set(string a_key, Decimal? a_value)
        {
            IGDbType v_value = new GDecimal(a_value);
            if (this.ContainsKey(a_key))
                this[a_key] = v_value;
            else
                this.Add(a_key, v_value);
        }

        /// <summary>
        /// Nastaví hodnoty typu Boolean
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Set(string a_key, Boolean? a_value)
        {
            IGDbType v_value = new GBoolean(a_value);
            if (this.ContainsKey(a_key))
                this[a_key] = v_value;
            else
                this.Add(a_key, v_value);
        }

        /// <summary>
        /// Nastaví hodnoty typu Blob
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Set(string a_key, byte[] a_value)
        {
            IGDbType v_value = new GBlob(a_value);
            if (this.ContainsKey(a_key))
                this[a_key] = v_value;
            else
                this.Add(a_key, v_value);
        }
        /// <summary>
        /// Nastaví hodnoty typu Blob
        /// </summary>
        /// <param name="a_key">Jméno položky</param>
        /// <param name="a_value">typ položky</param>
        public void Set(string a_key, DataTable a_value)
        {
            IGDbType v_value = new GTable(a_value);
            if (this.ContainsKey(a_key))
                this[a_key] = v_value;
            else
                this.Add(a_key, v_value);
        }
        #endregion

        #region TryRemove
        /// <summary>
        /// Nezávazný REMOVE jedné položky
        /// </summary>
        /// <param name="a_key">jméno položky</param>
        /// <returns></returns>
        public bool TryRemove(string a_key)
        {
            bool v_vysledek = this.ContainsKey(a_key);
            if (v_vysledek)
                this.Remove(a_key);
            return (v_vysledek);
        }
        #endregion

        #region TryGetValue
        /// <summary>
        /// Zkusí načíst hodnotu do typu GInt16 
        /// </summary>
        /// <param name="a_key"></param>
        /// <param name="a_value"></param>
        /// <returns></returns>
        public bool TryGetValue(string a_key, out GInt16 a_value)
        {
            bool v_vysledek = false;
            a_value = null;
            if (this.ContainsKey(a_key))
            {
                IGDbType v_item = this[a_key];
                if (v_item is IGDbTypeNumber)
                {
                    if (v_item.IsNull)
                    {
                        a_value = new GInt16(null);
                        v_vysledek = true;
                    }
                    else
                        try
                        {
                            a_value = new GInt16(Convert.ToInt32(v_item.DbValue));
                            v_vysledek = true;
                        }
                        catch (OverflowException) { }
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Zkusí načíst hodnotu do typu GInt32 
        /// </summary>
        /// <param name="a_key"></param>
        /// <param name="a_value"></param>
        /// <returns></returns>
        public bool TryGetValue(string a_key, out GInt32 a_value)
        {
            bool v_vysledek = false;
            a_value = null;
            if (this.ContainsKey(a_key))
            {
                IGDbType v_item = this[a_key];

                if(v_item is IGDbTypeNumber )
                {
                    if (v_item.IsNull)
                    {
                        a_value = new GInt32(null);
                        v_vysledek = true;
                    }
                    else
                        try
                        {

                            a_value = new GInt32(Convert.ToInt32(v_item.DbValue));
                            v_vysledek = true;
                        }
                        catch (OverflowException) { }
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Zkusí načíst hodnotu do typu GInt64 
        /// </summary>
        /// <param name="a_key"></param>
        /// <param name="a_value"></param>
        /// <returns></returns>
        public bool TryGetValue(string a_key, out GInt64 a_value)
        {
            bool v_vysledek = false;
            a_value = null;
            if (this.ContainsKey(a_key))
            {
                IGDbType v_item = this[a_key];

                if (v_item is IGDbTypeNumber)
                {
                    if (v_item.IsNull)
                    { 
                        a_value = new GInt64(null);
                        v_vysledek = true;
                    }
                    else
                        try
                        {
                            a_value = new GInt64(Convert.ToInt32(v_item.DbValue));
                            v_vysledek = true;
                        }
                        catch (OverflowException) { }
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Zkusí načíst hodnotu z to do typu GString
        /// </summary>
        /// <param name="a_key"></param>
        /// <param name="a_value"></param>
        /// <returns></returns>
        public bool TryGetValue(string a_key, out GString a_value)
        {
            bool v_vysledek = false;
            a_value = null;
            if (this.ContainsKey(a_key))
            {
                IGDbType v_item = this[a_key];
                if (v_item is GString)
                {
                    a_value = (GString)v_item;
                    v_vysledek = true;
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Zkusí načíst hodnotu z to do typu GDate
        /// </summary>
        /// <param name="a_key"></param>
        /// <param name="a_value"></param>
        /// <returns></returns>
        public bool TryGetValue(string a_key, out GDate a_value)
        {
            bool v_vysledek = false;
            a_value = null;
            if (this.ContainsKey(a_key))
            {
                IGDbType v_item = this[a_key];
                if (v_item is GDate)
                {
                    a_value = (GDate)v_item;
                    v_vysledek = true;
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Zkusí načíst hodnotu z to do typu GDateTime
        /// </summary>
        /// <param name="a_key"></param>
        /// <param name="a_value"></param>
        /// <returns></returns>
        public bool TryGetValue(string a_key, out GDateTime a_value)
        {
            bool v_vysledek = false;
            a_value = null;
            if (this.ContainsKey(a_key))
            {
                IGDbType v_item = this[a_key];
                if (v_item is GDateTime)
                {
                    a_value = (GDateTime)v_item;
                    v_vysledek = true;
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Zkusí načíst hodnotu z to do typu GBoolean
        /// </summary>
        /// <param name="a_key"></param>
        /// <param name="a_value"></param>
        /// <returns></returns>
        public bool TryGetValue(string a_key, out GBoolean a_value)
        {
            bool v_vysledek = false;
            a_value = null;
            if (this.ContainsKey(a_key))
            {
                IGDbType v_item = this[a_key];
                if (v_item is GBoolean)
                {
                    a_value = (GBoolean)v_item;
                    v_vysledek = true;
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Zkusí načíst hodnotu z to do typu GTable
        /// </summary>
        /// <param name="a_key"></param>
        /// <param name="a_value"></param>
        /// <returns></returns>
        public bool TryGetValue(string a_key, out GTable a_value)
        {
            bool v_vysledek = false;
            a_value = null;
            if (this.ContainsKey(a_key))
            {
                IGDbType v_item = this[a_key];
                if (v_item is GTable)
                {
                    a_value = (GTable)v_item;
                    v_vysledek = true;
                }
            }
            return (v_vysledek);
        }
        /// <summary>
        /// Zkusí načíst hodnotu z to do typu GBlob
        /// </summary>
        /// <param name="a_key"></param>
        /// <param name="a_value"></param>
        /// <returns></returns>
        public bool TryGetValue(string a_key, out GBlob a_value)
        {
            bool v_vysledek = false;
            a_value = null;
            if (this.ContainsKey(a_key))
            {
                IGDbType v_item = this[a_key];
                if (v_item is GBlob)
                {
                    a_value = (GBlob)v_item;
                    v_vysledek = true;
                }
            }
            return (v_vysledek);
        }
        #endregion

        /// <summary>
        /// Spojení dvou polí pojmenovaných hodnot do jednoho výsledného pole.
        /// Přitom se z prvního pole ( old ) berou všechny položky, i NULL  hodnotové - významem to jsou všechny původní honodty
        /// Z druhého pole ( new ) se berou pouze položky, které nejsou NULL a přepisují hodnoty prvního pole - pouze měněné hodnoty
        /// </summary>
        /// <param name="a_old_values">Původní hondoty</param>
        /// <param name="a_new_values">Nově nastavované hodnoty</param>
        /// <returns>Výsledné pole hodnot s obsahem po uplatnění změn hodnot</returns>
        public static GDbTypeDictionary MergeValues( GDbTypeDictionary a_old_values, GDbTypeDictionary a_new_values)
        {
            GDbTypeDictionary v_vysledek = new GDbTypeDictionary();
            foreach (string v_val_name in a_old_values.Keys)
                v_vysledek.Add(v_val_name, a_old_values[v_val_name]);
            foreach (string v_val_name in a_new_values.Keys)
            {
                IGDbType v_value = a_new_values[v_val_name];
                if (v_value != null)
                {
                    if (v_vysledek.ContainsKey(v_val_name))
                        v_vysledek[v_val_name] = v_value;
                    else
                        v_vysledek.Add(v_val_name, a_new_values[v_val_name]);
                }
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Z pole starých hodnot a pole nových hodnot udělá nové pole obsahující pouze položky, které jsou nové, nebo hodnotově změněné
        /// </summary>
        /// <param name="a_old_values">Staré hodnoty</param>
        /// <param name="a_new_values">Nové hodnoty</param>
        /// <param name="trimed">Příznak, že stringové hodnoty se mají porovnávat ořezané zprava</param>
        /// <returns>Pole změněných hodnot</returns>
        public static GDbTypeDictionary ChangedValues(GDbTypeDictionary a_old_values, GDbTypeDictionary a_new_values, bool trimed = false )
        {
            GDbTypeDictionary v_vysledek = new GDbTypeDictionary();
            foreach (string v_val_name in a_new_values.Keys)        // projdu nové hodnoty
            {
                if (a_new_values[v_val_name] != null)   // pokud je skutečný NULL, potom se jedná o hodnotu typu nenastaveno a taková se do DB nemá ukládat, takže není to G hodnota
                {
                    if (a_old_values.ContainsKey(v_val_name) && a_old_values[v_val_name] != null)            // pokud je obsazena v původní kolekci a má nějakou G honodtu, musím porovnat hodnotově
                    {
                        IGDbType oldValue = a_old_values[v_val_name];
                        IGDbType newValue = a_new_values[v_val_name];

                        if(!IsEquivalent(oldValue, newValue, trimed))
                            v_vysledek.Add(v_val_name, a_new_values[v_val_name]);   
                    }
                    else                                                // pokud ve výčtu původních hodnot není, zařadím do výstupu - ne to NEW
                    {
                        v_vysledek.Add(v_val_name, a_new_values[v_val_name]);
                    }
                }
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Porovnání hodnot dvou GDbTypeDictionary
        /// </summary>
        /// <param name="a_new_values"></param>
        /// <param name="trimed"></param>
        /// <returns></returns>
        public bool IsEquivalent(GDbTypeDictionary a_new_values, bool trimed = false)
        {
            return (IsEquivalent(this, a_new_values, trimed));
        }

        /// <summary>
        /// Porovnání hodnot dvou GDbTypeDictionary
        /// </summary>
        /// <param name="a_old_values"></param>
        /// <param name="a_new_values"></param>
        /// <param name="trimed"></param>
        /// <returns></returns>
        public static bool IsEquivalent(GDbTypeDictionary a_old_values, GDbTypeDictionary a_new_values, bool trimed = false)
        {
            bool v_vysledek = true;
            foreach (string v_val_name in a_new_values.Keys)        // projdu nové hodnoty
            {
                if (a_old_values.ContainsKey(v_val_name))   // pokud je skutečný NULL, potom se jedná o hodnotu typu nenastaveno a taková se do DB nemá ukládat, takže není to G hodnota
                {
                    if(!IsEquivalent(a_old_values[v_val_name], a_new_values[v_val_name]))
                    {
                        v_vysledek = false;
                        break;
                    }
                }
                else
                {
                    v_vysledek = false;
                    break;
                }
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Porovnání hodnot dvou IGDbType
        /// </summary>
        /// <param name="oldValue"></param>
        /// <param name="newValue"></param>
        /// <param name="trimed"></param>
        /// <returns></returns>
        public static bool IsEquivalent(IGDbType oldValue, IGDbType newValue, bool trimed=false )
        {
            bool vysledek = true;

            if (newValue is GDateCurrent || newValue is GDateTimeCurrent)           // pokud nová hodnota je auto current čas
                vysledek = false;                                                   // bude to vždy changed hodnota

            else if ((oldValue == null || oldValue.IsNull ) && (newValue == null || newValue.IsNull))                            // pokud jsou obe hodnoty NULL
            {
                vysledek = true;
            }
            else if (((oldValue == null || oldValue.IsNull) && !(newValue == null || newValue.IsNull)) || (!(oldValue == null || oldValue.IsNull) && newValue.IsNull))  // pokud je jedna z hodnot NULL
            {
                vysledek = false;
            }
            else if (oldValue is GString strOld && newValue is GString strNew)  // pokud je to string
            {
                if (trimed && strOld.BaseValueTrimmed != strNew.BaseValueTrimmed)
                    vysledek = false;
                else if (!trimed && strOld.BaseValue != strNew.BaseValue)
                    vysledek = false;
            }
            else if (oldValue is IGDbTypeNumber numOld && newValue is IGDbTypeNumber numNew) // pokud je to celé číslo
            {
                if (numOld.ToInt64() != numNew.ToInt64())
                    vysledek = false;
            }
            else if (oldValue is IGDbTypeDateTime datOld && newValue is IGDbTypeDateTime datNew) // pokud je to obecne datumcas
            {
                if (datOld.Value != datNew.Value)
                    vysledek = false;
            }
            else if (oldValue is GDecimal decOld && newValue is GDecimal decNew)
            {
                if (decOld.Value != decNew.Value)
                    vysledek = false;
            }
            else if (oldValue is GBoolean bolOld && newValue is GBoolean bolNew)
            {
                if (bolOld.Value != bolNew.Value)
                    vysledek = false;
            }
            else if (oldValue is GBlob blobOld && newValue is GBlob blobNew)
            {
                if (blobOld.Value.Length != blobNew.Value.Length || !blobOld.Value.SequenceEqual(blobNew.Value))
                    vysledek = false;
            }
            else
                throw new GNotImplementedException(21300057, 21300040, nameof(IsEquivalent), oldValue.GetType().ToString(), newValue.GetType().ToString()); //RC 21300040 : Interní chyba aplikace. Funkce [{0}] - Porovnání nepodporovaných typů [{1}] a [{2}] 

            return (vysledek);
        }


        /// <summary>
        /// Spojení dvou polí pojmenovaných hodnot do jednoho výsledného pole. 
        /// Přitom se z prvního pole ( this ) se berou všechny položky, i hodnotové NULL ( myšleno DbNull ) 
        /// Z druhého pole ( new ) se berou pouze položky, které nejsou NULL a přepisují hodnoty prvního pole - pouze měněné hodnoty
        /// </summary>
        /// <param name="a_new_values">Nově nastavované hodnoty</param>
        /// <returns>Výsledné pole hodnot s obsahem po uplatnění změn hodnot</returns>
        public GDbTypeDictionary MergeValues(GDbTypeDictionary a_new_values)
        {
            GDbTypeDictionary v_vysledek = MergeValues(this, a_new_values);
            return (v_vysledek);
        }

        /// <summary>
        /// Z pole aktuálních hodnot a pole nových hodnot udělá nové pole obsahující pouze položky, které jsou nové, nebo hodnotově změněné
        /// Slouží pro kontrolu pouze nových položek, které jsou jíné proti původní kolekci
        /// Nejedná se tedy o seznam všech rozdílných položek dvou polí obecně!!
        /// </summary>
        /// <param name="a_new_values">Nové hodnoty</param>
        /// <returns>Výsledné pole hodnot s obsahem pouze změněných položek</returns>
        public GDbTypeDictionary ChangedValues(GDbTypeDictionary a_new_values)
        {
            GDbTypeDictionary v_vysledek = ChangedValues(this, a_new_values);
            return (v_vysledek);
        }

        /// <summary>
        /// Převede hodnotu hodnotového typu nebo IGDbType na IGDbType nebo vyhlásí chybu
        /// 
        /// Pokud je hodnota zadána NULL, potom to převeden na zástupný G type GDbTypeNull ( to je signál pro další vrstvy, že je to G typ s hodnotou DB NULL )
        /// 
        /// Možná časem odstranit a přesměrovat - je to také v Gordic.Adm.Server.TypeExtensions
        /// </summary>
        /// <param name="a_param">Vstupní hodnota, která se má převést na IGDbType</param>
        /// <returns>Odpovídající hodnota IGDbType</returns>
        [Obsolete("GDbTypeConverter.GetIGDbType")]
        public static IGDbType GetIGDbType(object a_param)
        {
            IGDbType v_vysledek = null;
            if (!TryGetIGDbType(a_param, out v_vysledek))
                throw new ArgumentException(String.Format("Interní chyba aplikace. Nepovolený typ {0} pro konverzi do IGDbType", a_param.GetType().ToString()));
            return (v_vysledek);
        }

        /// <summary>
        /// Pokus o převedení zadané proměnné do IGDbType. Pokud je proměnná převeditelná, potom se vrátí TRUE. Pokud se jedná o nepřevoditelný typ, potom se vrací FALSE.
        /// 
        /// Možná časem odstranit a přesměrovat - je to také v Gordic.Adm.Server.TypeExtensions
        /// </summary>
        /// <param name="a_param">Vstupní hodnota pro převod. Počítá se s IGDbType nebo s hodnotovým typem nebo nullable hodnotovým typem.</param>
        /// <param name="v_out_param">Výstupní převedená hodnota</param>
        /// <returns>true pokud lze převést, false pokud nešlo převést.</returns>
        [Obsolete("GDbTypeConverter.TryGetIGDbType" ) ]
        public static bool TryGetIGDbType( object a_param, out IGDbType v_out_param )
        {
            bool v_vysledek = true;
            v_out_param = null;

            if(a_param == null)
                v_out_param = new GDbTypeNull( );        // 2017-05-30 experiment - znamená to, že je to inicializovaná instance G typu a to na hodnotu DB NULL ( to je rozdíl proti nedefinované hodnotě ) Např. při dynamickém sběru hodnotových typů z javascriptu

            else if(a_param.GetType( ).IsAssignableTo( typeof( IGDbType ) ))
                v_out_param = ((IGDbType)a_param);
            else if(a_param is string)
                v_out_param = (new GString( (string)a_param ));
            else if(a_param is long || a_param is Int64)
            {
                long v_long = (long)a_param;
                if(v_long <= Int16.MaxValue && v_long >= Int16.MinValue)
                    v_out_param = (new GInt16( (int)v_long ));
                else if(v_long <= Int32.MaxValue && v_long >= Int32.MinValue)
                    v_out_param = (new GInt32( (int)v_long ));
                else
                    throw new GArgumentOutOfRangeException( 21300027, 21350006, v_long.ToString( ), typeof( Int32 ).ToString( ) ); //RC-EX 21350006 : Interní chyba aplikace. Číselná hodnota [{0}] je mimo rozsah cílového typu [{1}]
            }
            else if(a_param is int || a_param is Int32)
                v_out_param = (new GInt32( (int)a_param ));
            else if(a_param is int? || a_param is Int32?)
                v_out_param = (new GInt32( (int?)a_param ));
            else if(a_param is Int16 || a_param is short)
                v_out_param = (new GInt16( (Int16)a_param ));
            else if(a_param is Int16? || a_param is short?)
                v_out_param = (new GInt16( (Int16?)a_param ));
            else if(a_param is DateTime)
            {
                DateTime v_datum_a_cas = (DateTime)a_param;
                if(v_datum_a_cas.Hour == 0 && v_datum_a_cas.Minute == 0 && v_datum_a_cas.Second == 0 && v_datum_a_cas.Millisecond == 0)
                    v_out_param = (new GDate( (DateTime)a_param ));
                else
                    v_out_param = (new GDateTime( (DateTime)a_param ));
            }
            else if(a_param is DateTime?)
            {
                if(a_param == null)
                    v_out_param = GDate.Null;
                else
                {
                    DateTime v_datum_a_cas = (DateTime)a_param;
                    if(v_datum_a_cas.Hour == 0 && v_datum_a_cas.Minute == 0 && v_datum_a_cas.Second == 0 && v_datum_a_cas.Millisecond == 0)
                        v_out_param = (new GDate( (DateTime)a_param ));
                    else
                        v_out_param = (new GDateTime( (DateTime)a_param ));
                }
            }
            else if(a_param is decimal)
                v_out_param = (new GDecimal( (decimal)a_param ));
            else if(a_param is decimal?)
                v_out_param = (new GDecimal( (decimal?)a_param ));
            else if(a_param is bool)
                v_out_param = (new GBoolean( (bool)a_param ));
            else if(a_param is bool?)
                v_out_param = (new GBoolean( (bool?)a_param ));
            else if(a_param is byte[])
                v_out_param = (new GBlob( (byte[])a_param ));
            else if (a_param is DataTable)
                v_out_param = (new GTable((DataTable)a_param));
            else
                v_vysledek = false;
            return (v_vysledek);
        }

        /// <summary>
        /// Ořezání stringových položek obsažených v tomto objektů na maximální délku definovanou v DTO objektu
        /// </summary>
        /// <param name="a_dto">DTO objekt, podle kterého budu ořezávat textové hodnoty na max. povolenou délku</param>
        public void TruncateByDtoDefinition( IGDto a_dto )
        {
            var dtoProps = a_dto.GetType( ).GetMembers( BindingFlags.Public | BindingFlags.Instance );
            foreach(var prop in dtoProps)
            {
                if(prop == null)
                    continue;
                if(prop.MemberType == MemberTypes.Field)                   // pokud je to instanční proměnná DTO - potom se jedná o sloupce DB tabulky
                {
                    FieldInfo v_prop_info = (prop as FieldInfo);
                    string v_field_name = v_prop_info.Name;
                    if(this.ContainsKey( v_field_name ))                         // pokud v dictionary takova položka existuje
                    {
                        IGDbType v_hodnota = this[v_field_name];
                        if(v_hodnota != null)
                        {
                            if(v_prop_info.FieldType == typeof( GString ))
                            {
                                if((v_prop_info.GetCustomAttributes( typeof( GLengthAttribute ), true ) as GLengthAttribute[]).FirstOrDefault( )?.HasMaximum ?? false)
                                {
                                    string v_pomocna = ((GString)this[v_prop_info.Name]).BaseValue;
                                    int v_max_length = (v_prop_info.GetCustomAttributes( typeof( GLengthAttribute ), true ) as GLengthAttribute[]).FirstOrDefault( )?.Maximum ?? int.MaxValue;
                                    if(v_pomocna.Length > v_max_length)                                         // pokud je stringová hodnota delší, než je povoleno
                                    {
                                        v_pomocna = v_pomocna.Substring( 0, v_max_length );                     // oříznu text
                                        ((GString)this[v_prop_info.Name]).Value = v_pomocna;                    // nastavím zkrácenou hodnotu
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } // TruncateByDtoDefinition

        /// <summary>
        /// Pomocná funkce pro zobrazení obsahu dictionary v rámci visualstudia a jeho debuggeru
        /// </summary>
        private class DictionaryDebugView
        {
            private GDbTypeDictionary collection;

            public DictionaryDebugView(GDbTypeDictionary collection)
            {
                if (collection == null)
                    throw new ArgumentNullException("collection");
                this.collection = collection;
            }

            [DebuggerBrowsable(DebuggerBrowsableState.RootHidden)]
            public Dictionary<string,string> Items
            {
                get
                {
                    Dictionary<string, string> array = new Dictionary<string, string>();
                    foreach (var item in collection)
                    {
                        string value = null;

                        if (item.Value != null)
                        {
                            if (item.Value.IsNull)
                                value = String.Format("{{{0}}} is DbNull", item.Value.GetType().Name );
                            else if ( item.Value  is GBlob v_blob )
                                value = String.Format("{{{0}}} Blob.Length={1}", item.Value.GetType().Name, v_blob.Value.Length.ToString());
                            else if (item.Value is GTable v_table)
                                value = String.Format("{{{0}}} Table.Rows={1}", item.Value.GetType().Name, v_table.Value.Rows.Count.ToString());
                            else if (item.Value is GString v_string)
                            { 
                                if (v_string.MaxSize == ushort.MaxValue)
                                    value = String.Format("{{{0}}} = {1}", item.Value.GetType().Name, v_string.Value);
                                else
                                    value = String.Format("{{{0}({1})}} = {2}", item.Value.GetType().Name, v_string.MaxSize.ToString(), v_string.Value);
                            }
                            else
                                value = "{" + item.Value.GetType().Name + "} = " + item.Value.ToString(System.Globalization.CultureInfo.InvariantCulture);
                        }
                        array.Add(item.Key, value);
                    }
                    return array;
                }
            }
        }

    }
}
