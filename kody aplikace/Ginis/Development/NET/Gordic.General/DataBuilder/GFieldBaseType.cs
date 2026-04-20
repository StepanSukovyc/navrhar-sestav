//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GFieldBaseType.cs       </Name>
//    <Description> Základní datové typy polí redukované např. pro potřeby JavaScriptu</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-04-07                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;


namespace Gordic.General
{
    /// <summary>
    /// Třída pro práci se základními hodnotovými typy
    /// </summary>
    public class GFieldBaseType
    {

        /// <summary>
        /// Převede TYPE na základní datové typy
        /// </summary>
        /// <param name="a_type">type</param>
        /// <returns></returns>
        public static GFieldBaseTypeEnum GetFieldBaseType( Type a_type )
        {
            TypeCode v_type_code = Type.GetTypeCode( a_type );
            return( GetFieldBaseType( v_type_code ));
        }
        

        /// <summary>
        /// Převede TypeCode na základní TYP
        /// </summary>
        /// <param name="a_type"></param>
        /// <returns></returns>
        public static GFieldBaseTypeEnum GetFieldBaseType( TypeCode a_type )
        {
            GFieldBaseTypeEnum v_vysledek;
            v_vysledek = GetFieldBaseType( a_type.ToString( ) );
            return v_vysledek;
        }
        /// <summary>
        /// Převede TypeCode na základní TYP
        /// </summary>
        /// <param name="a_type"></param>
        /// <returns></returns>
        public static GFieldBaseTypeEnum GetFieldBaseType( string a_type )
        {
            GFieldBaseTypeEnum v_vysledek;
            switch(a_type)
            {
                case "Boolean":
                case "GBoolean":
                case "Gordic.General.GBoolean":
                    v_vysledek = GFieldBaseTypeEnum.BOOLEAN;
                    break;
                case "Char":
                case "String":
                case "GString":
                case "Gordic.General.GString":
                    v_vysledek = GFieldBaseTypeEnum.TEXT;
                    break;
                case "Int16":
                case "Int32":
                case "Int64":
                case "UInt16":
                case "UInt32":
                case "UInt64":
                case "SByte":
                case "Byte":
                case "GInt16":
                case "GInt32":
                case "GInt64":
                case "Gordic.General.GInt16":
                case "Gordic.General.GInt32":
                case "Gordic.General.GInt64":
                    v_vysledek = GFieldBaseTypeEnum.NUMBER;
                    break;
                case "Double":
                case "Decimal":
                case "Single":
                case "GDecimal":
                case "Gordic.General.GDecimal":
                    v_vysledek = GFieldBaseTypeEnum.DECIMAL;
                    break;
                case "DateTime":
                case "GDateTime":
                case "Gordic.General.GDateTime":
                    v_vysledek = GFieldBaseTypeEnum.DATETIME;
                    break;
                case "GDate":
                case "Gordic.General.GDate":
                    v_vysledek = GFieldBaseTypeEnum.DATE;
                    break;
                default:
                    v_vysledek = GFieldBaseTypeEnum.OTHER;
                    break;
            }
            return v_vysledek;
        }

        /// <summary>
        /// Převod názvu type na TypeCode
        /// </summary>
        /// <param name="a_type"></param>
        /// <returns></returns>
        public static TypeCode GetFieldTypeCode( string a_type )
        {
            TypeCode v_vysledek;
            switch (a_type)
            {
                case "Boolean":
                case "GBoolean":
                    v_vysledek = TypeCode.Boolean;
                    break;
                case "Char":
                    v_vysledek = TypeCode.Char;
                    break;
                case "String":
                case "GString":
                    v_vysledek = TypeCode.String;
                    break;
                case "Int16":
                case "GInt16":
                    v_vysledek = TypeCode.Int16;
                    break;
                case "UInt16":
                    v_vysledek = TypeCode.UInt16;
                    break;
                case "Int32":
                case "GInt32":
                    v_vysledek = TypeCode.UInt32;
                    break;
                case "UInt32":
                    v_vysledek = TypeCode.UInt32;
                    break;
                case "Int64":
                case "GInt64":
                    v_vysledek = TypeCode.Int64;
                    break;
                case "UInt64":
                    v_vysledek = TypeCode.UInt64;
                    break;
                case "SByte":
                    v_vysledek = TypeCode.SByte;
                    break;
                case "Byte":
                    v_vysledek = TypeCode.Byte;
                    break;
                case "Double":
                    v_vysledek = TypeCode.Double;
                    break;
                case "Decimal":
                case "GDecimal":
                    v_vysledek = TypeCode.Decimal;
                    break;
                case "Single":
                    v_vysledek = TypeCode.Single;
                    break;
                case "DateTime":
                case "GDateTime":
                case "GDate":
                    v_vysledek = TypeCode.DateTime;
                    break;
                case "GBlob":
                    v_vysledek = TypeCode.Object;
                    break;

                default:
                    throw new GNotImplementedException(21300032, 21350012, a_type); //RC-EX 21350012 : Interní chyba aplikace. Funkce GetFieldTypeCode() - Neošetřený typ převodu [{0}] na TypeCode
            }
            return v_vysledek;
        }
        
        /// <summary>
        /// Převede základní typ na jméno PowerBuilder hodnotového typu
        /// </summary>
        /// <param name="fieldBaseTypeEnum"></param>
        /// <returns></returns>
        public static string GetFieldPowerBuilderType(GFieldBaseTypeEnum fieldBaseTypeEnum )
        {
            string vysledek = "";
            switch(fieldBaseTypeEnum)
            {
                case GFieldBaseTypeEnum.BOOLEAN:
                    vysledek = "Boolean";
                    break;
                case GFieldBaseTypeEnum.NUMBER:
                    vysledek = "Long";
                    break;
                case GFieldBaseTypeEnum.DECIMAL:
                    vysledek = "Dec";
                    break;
                case GFieldBaseTypeEnum.TEXT:
                    vysledek = "String";
                    break;
                case GFieldBaseTypeEnum.DATE:
                    vysledek = "Date";
                    break;
                case GFieldBaseTypeEnum.DATETIME:
                    vysledek = "DateTime";
                    break;
            }
            return (vysledek);
        }
    }


    /// <summary>
    /// Základní datové typy polí redukované např. pro potřeby JavaScriptu
    /// </summary>
    [Serializable()]
    public enum GFieldBaseTypeEnum
    {
        /// <summary>
        /// Bool
        /// </summary>
        BOOLEAN,
        /// <summary>
        /// Celočíselná čísla
        /// </summary>
        NUMBER,
        /// <summary>
        /// Desetinná čísla
        /// </summary>
        DECIMAL,
        /// <summary>
        /// Texty
        /// </summary>
        TEXT,
        /// <summary>
        /// Datumy
        /// </summary>
        DATE,
        /// <summary>
        /// DAtum a Čas
        /// </summary>
        DATETIME,
        /// <summary>
        /// Ostatní
        /// </summary>
        OTHER
    }



}
