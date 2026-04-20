//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.FormattableStringExtensions.cs               </Name>
//    <Description> Rozšíření standardního FormattableString                    </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-08-17                                                  </Created>
//  </FileHeader>



using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

namespace Gordic.General
{
    /// <summary>
    /// Rozšíření standardního FormattableString
    /// </summary>
    public static class FormattableStringExtensions
    {
        /// <summary>
        /// Spojí dva FormattableString a vytvoří nový, který má spojené jak formátovací texty, tak argumenty
        /// </summary>
        /// <param name="formattableString1"></param>
        /// <param name="formattableString2"></param>
        /// <returns></returns>
        public static FormattableString Concat( this FormattableString formattableString1, FormattableString formattableString2 )
        {
            string text1 = formattableString1.Format;
            string text2 = formattableString2.Format;

            int items1Count = formattableString1.ArgumentCount;
            int items2Count = formattableString2.ArgumentCount;

            List<string> strings = new List<string>();
            for (int i = items1Count; i < items1Count + items2Count; i++)
                strings.Add($"{{{i}}}");

            text2 = String.Format( text2, strings.ToArray());

            object[] objects = formattableString1.GetArguments();
            objects = objects.Concat(formattableString2.GetArguments()).ToArray();

            FormattableString vysledek = FormattableStringFactory.Create(text1 + text2, objects);

            return vysledek;
        }

        /// <summary>
        /// Pomocná interní funkce pro převod formátovaného stringu na sql příkaz a pole vstupních argumentů
        /// </summary>
        /// <param name="a_sql">FormattableString který obsahuje text sql příkazu a místo sql argumentů odkazy na .NET proměnné.</param>
        /// <returns>Vrací dvojici (string sqlCommand, IGDbType[] sqlParams) kde sqlCommand obsahuje místo argumentů zástupný znak [?] - otazník </returns>
        public static (string sqlCommand, IGDbType[] sqlParams) ToSqlCommand(this FormattableString a_sql)
        {
            object[] sqlArgs = a_sql.GetArguments();
            string sqlFormat = a_sql.Format;
            string[] sqlParams = new string[sqlArgs.Length];
            GDbTypeList v_sql_in_named_arguments = new GDbTypeList();
            for (int i = 0; i < sqlArgs.Length; i++)
            {
                string paramName = $"sqlParam{i}";
                sqlParams[i] = "?";
                v_sql_in_named_arguments.Add(sqlArgs[i], paramName);
            }
            string sqlCommand = String.Format(sqlFormat, sqlParams);
            return (sqlCommand, v_sql_in_named_arguments.ToArray());
        }


        /// <summary>
        /// Pomocná interní funkce pro převod formátovaného stringu na sql příkaz a pole vstupních argumentů
        /// </summary>
        /// <param name="a_sql">FormattableString který obsahuje text sql příkazu a místo sql argumentů odkazy na .NET proměnné.</param>
        /// <returns>Vrací trojici (string sqlCommand, IGDbType[] sqlInParams, IGDbType[] sqlOutParams) kde sqlCommand obsahuje místo argumentů zástupný znak [?] - otazník </returns>
        public static (string sqlCommand, IGDbType[] sqlInParams, IGDbType[] sqlOutParams) ToSqlCommandInto(this FormattableString a_sql)
        {
            object[] sqlArgs = a_sql.GetArguments();
            string sqlFormat = a_sql.Format;
            List<string> sqlInParams = new List<string>();

            string sqlFormatMask = GStrFce.SubsSubstr(sqlFormat);   // vymaskování stringových konstant
            sqlFormatMask = GStrFce.SubsSubstr(sqlFormatMask, "(", ")");    // vymaskování výrazů v závorkách - zůstane SQL příkaz pouze v první úrovni
            sqlFormatMask = sqlFormatMask.Replace("\t", " ");               // tabelátory na mezeru
            sqlFormatMask = sqlFormatMask.Replace("\r", " ");               // odřádkování na mezeru
            sqlFormatMask = sqlFormatMask.Replace("\n", " ");               // odřádkování na mezeru
            sqlFormatMask = sqlFormatMask.ToUpper();                        // masku převedu na velké písmena

            List<int> outParamIndexes = new List<int>();
            string intoSekce = GStrFce.CutFromTo(sqlFormat, sqlFormatMask, " INTO ", " FROM "); // vyříznu sekci od INTO po FROM
            if (String.IsNullOrWhiteSpace(intoSekce))
                throw new GInternalException(21300079, 21300061); //RC-EX 21300061 : U DB selectu typu INTO je v sekce INTO .. FROM prázdná nebo zcela neuvedená

            string[] inArgsTxt = intoSekce.Split(',');
            foreach (string item in inArgsTxt)
            {
                string inArgNumTxt = item.Trim(new char[] { ' ', '\t', '\r', '\n', '{', '}' });
                if (!inArgNumTxt.IsNumber())
                    throw new GInternalException(21300077, 21300093, item); //RC-EX 21300093 : U DB selectu typu INTO je v sekci INTO .. FROM neočekávaný text: {0}
                outParamIndexes.Add(int.Parse(inArgNumTxt));
            }
            string sqlFormatNew = GStrFce.CutTo(sqlFormat, sqlFormatMask, " INTO ") + " FROM " + GStrFce.CutFrom(sqlFormat, sqlFormatMask, " FROM "); // vyříznu sekci od INTO po FROM

            GDbTypeList v_sql_in_named_arguments = new GDbTypeList();
            List<IGDbType> v_sql_out_named_arguments = new List<IGDbType>();
            for (int i = 0; i < sqlArgs.Length; i++)
            {
                sqlInParams.Add("?");

                string paramName = $"sqlParam{i}";
                if (outParamIndexes.Contains(i))    // pokud je to OUT argument
                {
                    if(sqlArgs[i] is IGDbType gVar )
                        v_sql_out_named_arguments.Add(gVar);
                    else
                        throw new GInternalException(21300078, 21300060); //RC-EX 21300060 : U DB selectu typu INTO je v sekci INTO .. FROM povolena pouze proměnná typu IGDbType. 
                }
                else // pokud je to IN argument
                {
                    v_sql_in_named_arguments.Add(sqlArgs[i], paramName);
                }
            }
            string sqlCommand = String.Format(sqlFormatNew, sqlInParams.ToArray());
            return (sqlCommand, v_sql_in_named_arguments.ToArray(), v_sql_out_named_arguments.ToArray());
        }
    }
}
