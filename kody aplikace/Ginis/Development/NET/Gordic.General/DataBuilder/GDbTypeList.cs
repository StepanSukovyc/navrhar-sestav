//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GDbTypeList.cs          </Name>
//    <Description> Třída by měla usnadnit práci s poli G typů                  </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-04-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;


namespace Gordic.General
{
    /// <summary>
    /// Třída by měla usnadnit práci s poli G typů
    /// </summary>
    public class GDbTypeList : List<IGDbType>
    {
        /// <summary>
        /// Konstruktor s proměnným počtem argumentů, kterými se naplní List.
        /// Jako argumenty je možné zadat GDbType nebo hodnotové typy.
        /// </summary>
        public GDbTypeList( params object[] a_Params )
        {
            if (a_Params.Length == 1  )
            {
                object v_params = a_Params[0];
                if (v_params is GDbTypeList || v_params is Tuple<string, IGDbType>[] || v_params.IsAnonymousType() || v_params.GetType().IsAssignableTo(typeof(IGDto)) || v_params is IGDbType[]) // 2018-08-28
                {
                    AddItemsFrom(v_params);
                    return;
                }
                if (v_params is GDbTypeDictionary dictionary)
                    foreach (var item in dictionary)
                    {
                        Add(item.Value, item.Key);
                    }
            }
            
            int v_arg_num = 0;
            foreach (object v_param in a_Params)
            {
                if(v_param is IGDbType gvalue)
                    this.Add(gvalue);
                else if (GDbTypeConverter.TryGetIGDbType(v_param, out IGDbType v_vysledek, true))
                    this.Add((IGDbType)v_vysledek);
                else
                    throw new ArgumentException(String.Format("Interní chyba aplikace. Nepovolený typ {0} vstupního argumentu u arg.číslo: {1}", v_param.GetType().ToString(), v_arg_num.ToString()));
                v_arg_num++;
            }
            
        }


        /// <summary>
        /// Přidání obecné pojmenované hodnoty do Listu hodnot.
        /// </summary>
        /// <param name="a_item">Přidávaná hodnota.</param>
        /// <param name="a_SourceColumn">Jméno sloupce</param>
        public void Add( object a_item, string a_SourceColumn)
        {
            try
            {
                IGDbType v_item = GDbTypeConverter.GetIGDbType(a_item, true);
                v_item.SourceColumn = a_SourceColumn;
                this.Add(v_item);
            }
            catch( Exception v_chyba )
            {
                throw new GException(21300042, 21300033, v_chyba, a_SourceColumn); //RC-EX 21300033 : Interní chyba aplikace - při pokusu doplnit SourceColum do GDbType a následném přidání do GDbTypList pro SourceColum = {0)
            }
        }
        
        /// <summary>
        /// Seznam jmen DB sloupců, které byly společně s GDbType vloženy do tohoto listu - není garantována unikátnost ani vyplnění.
        /// Jedná se spíše o ukázku možností.
        /// </summary>
        public IEnumerable<string> SourceColumns
        {
            get
            {
                // return a filtered collection of bars where Bar.Status equals Foo.Status
                foreach (IGDbType v_column in this )
                {
                   yield return v_column.SourceColumn;
                }
            }
        }


        ///// <summary>
        ///// Převede hodnotový nebo IGDbType na IGDbType nebo vyhlásí chybu
        ///// 
        ///// Možná časem odstranit a přesměrovat - je to také v Gordic.Adm.Server.TypeExtensions
        ///// </summary>
        ///// <param name="a_param">Vstupní hodnota, která se má převést na IGDbType</param>
        ///// <returns>Odpovídající hodnota IGDbType</returns>
        //[Obsolete("GDbTypeConverter.GetIGDbType")]
        //private IGDbType GetIGDbType(object a_param)
        //{
        //    IGDbType v_vysledek = null;
        //    if (!TryGetIGDbType(a_param, out v_vysledek))
        //        throw new ArgumentException(String.Format("Interní chyba aplikace. Nepovolený typ {0} pro konverzi do IGDbType", a_param.GetType().ToString()));
        //    return (v_vysledek);
        //}

        ///// <summary>
        ///// Pokus o převedení zadané proměnné do IGDbType. Pokud je proměnná převeditelná, potom se vrátí TRUE. Pokud se jedná o nepřevoditelný typ, potom se vrací FALSE.
        ///// 
        ///// Možná časem odstranit a přesměrovat - je to také v Gordic.Adm.Server.TypeExtensions
        ///// </summary>
        ///// <param name="a_param">Vstupní hodnota pro převod. Počítá se s IGDbType nebo s hodnotovým typem nebo nullable hodnotovým typem.</param>
        ///// <param name="v_out_param">Výstupní převedená hodnota</param>
        ///// <returns>true pokud lze převést, false pokud nešlo převést.</returns>
        //[Obsolete("GDbTypeConverter.TryGetIGDbType")]
        //private bool TryGetIGDbType(object a_param, out IGDbType v_out_param)
        //{
        //    bool v_vysledek = true;
        //    v_out_param = null;
        //    if (a_param.GetType().IsAssignableTo(typeof(IGDbType)))
        //        v_out_param = ((IGDbType)a_param);
        //    else if (a_param is string)
        //        v_out_param = (new GString((string)a_param));
        //    else if (a_param is int || a_param is Int32)
        //        v_out_param = (new GInt32((int)a_param));
        //    else if (a_param is int? || a_param is Int32?)
        //        v_out_param = (new GInt32((int?)a_param));
        //    else if (a_param is Int16 || a_param is short)
        //        v_out_param = (new GInt16((Int16)a_param));
        //    else if (a_param is Int16? || a_param is short?)
        //        v_out_param = (new GInt16((Int16?)a_param));
        //    else if (a_param is DateTime)
        //        v_out_param = (new GDateTime((DateTime)a_param));
        //    else if (a_param is DateTime?)
        //        v_out_param = (new GDateTime((DateTime)a_param));
        //    else if (a_param is decimal)
        //        v_out_param = (new GDecimal((decimal)a_param));
        //    else if (a_param is decimal?)
        //        v_out_param = (new GDecimal((decimal?)a_param));
        //    else
        //        v_vysledek = false;
        //    return (v_vysledek);
        //}

        /// <summary>
        /// Převod prvků Listu na páry jméno+hodnota.
        /// 
        /// Možná časem přidat test na nastavení SourceColumn u všech prvků a také na unikátnost SourceColumn - pokud ne, tak vyhlásit chybu
        /// </summary>
        /// <returns></returns>
        public Tuple<string, IGDbType>[] ToTupleArray() 
        {
            Tuple<string, IGDbType>[] v_vysledek = new Tuple<string, IGDbType>[this.Count];
            int v_index = 0;
            foreach (IGDbType v_item in this)
            {
                v_vysledek[v_index] = new Tuple<string, IGDbType>(v_item.SourceColumn, v_item);
                v_index++;
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Doplní do Listu položky podle zadaného objektu, který může být pouze anonymním type, DTO, GDbTypeList nebo Tuple&lt;string, IGDbType&gt;[]
        /// </summary>
        /// <param name="a_params">Obejekt, jehož pole se mají přidat do tohoto listu</param>
        public void AddItemsFrom( object a_params)
        {
            if (a_params.IsAnonymousType())         // anonymní třída
            {
                var dtoProps_set = a_params.GetType().GetProperties();
                foreach (var prop in dtoProps_set)
                {
                    var v_field = prop.GetValue(a_params, null);
                    IGDbType v_hodnota = GDbTypeConverter.GetIGDbType(v_field, true);
                    v_hodnota.SourceColumn = prop.Name;
                    this.Add(v_hodnota);
                }
            }
            else if (a_params.GetType().IsAssignableTo(typeof(IGDto)))      // DTO objekt
            {
                GDbTypeList v_list_set = (a_params as IGDto).ToGDbTypeList();
                foreach (IGDbType v_hodnota in v_list_set)
                    this.Add(v_hodnota);
            }
            else if (a_params is GDbTypeList)                             // GDbTypeList
            {
                GDbTypeList v_list_set = (a_params as GDbTypeList);
                foreach (IGDbType v_hodnota in v_list_set)
                    this.Add(v_hodnota);
            }
            else if (a_params is Tuple<string, IGDbType>[])                 // TUPLE
            {
                Tuple<string, IGDbType>[] v_tuple_params = (a_params as Tuple<string, IGDbType>[]);
                foreach (Tuple<string, IGDbType> v_par in v_tuple_params)
                    this.Add(v_par.Item2);
            }
            else if (a_params is IGDbType[])        // 2018-08-28
            {
                IGDbType[] v_param_array = (IGDbType[])a_params;
                foreach (var v_param in v_param_array)
                    this.Add(v_param);
            }
            else
                throw new ArgumentException("Interní chyba aplikace. Konstruktor GDbTypeDictionary(object ) umožňuje jako agrument pouze anonymním type, DTO, GDbTypeList nebo Tuple<string, IGDbType>[]");
        }

    }
}
