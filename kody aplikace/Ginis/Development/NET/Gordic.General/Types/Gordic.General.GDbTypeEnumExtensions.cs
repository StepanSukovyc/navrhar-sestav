//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTypeExtensions.cs                           </Name>
//    <Description> Pomocná třída pro práci s IGDbType                          </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-11-13                                                  </Created>
//  </FileHeader>

using System;
using System.Globalization;
using System.Reflection;
using System.Runtime.CompilerServices;


namespace Gordic.General
{
    /// <summary>
    /// Pomocná třída pro obecnou práci s Type
    /// </summary>
    public static class GDbTypeEnumExtensions
    {
        /// <summary>
        /// Vrátí instanci IGDbType odpovídajícího typu podle zadaného výčtového typu
        /// </summary>
        /// <param name="typeEnum">Požadovaný typ</param>
        /// <returns></returns>
        public static IGDbType GetNewGDbType( this GDbTypeEnum typeEnum )
        {
            switch (typeEnum)
            {
                case GDbTypeEnum.GInt16:
                    return new GInt16();
                case GDbTypeEnum.GInt32:
                    return new GInt32();
                case GDbTypeEnum.GInt64:
                  return new GInt64();
                case GDbTypeEnum.GString:
                    return new GString();
                case GDbTypeEnum.GDate:
                    return new GDate();
                case GDbTypeEnum.GDateTime:
                    return new GDateTime();
                case GDbTypeEnum.GEkoDate:
                    return new GEkoDate();
                case GDbTypeEnum.GDecimal:
                    return new GDecimal();
                case GDbTypeEnum.GBoolean:
                    return new GBoolean();
                case GDbTypeEnum.GBlob:
                    return new GBlob();
                case GDbTypeEnum.GDbTypeNull:
                    return new GDbTypeNull();
                default:
                    throw new GNotImplementedException(21300034, 21300036, typeEnum.ToString()); //RC-EX 21300036 : Neošetřený datový typ [{0}]
            } // switch
        }

        /// <summary>Vrátí instanci Type odpovídajícího typu podle zadaného výčtového typu</summary>
        /// <param name="typeEnum">Požadovaný typ</param>
        /// <returns>>type některého z GDbType potomků</returns>
        public static Type GetGDbTypeType(this GDbTypeEnum typeEnum)
        {
            switch (typeEnum)
            {
                case GDbTypeEnum.GInt16:
                    return typeof( GInt16 );
                case GDbTypeEnum.GInt32:
                    return typeof(GInt32);
                case GDbTypeEnum.GInt64:
                    return typeof(GInt64);
                case GDbTypeEnum.GString:
                    return typeof(GString);
                case GDbTypeEnum.GDate:
                    return typeof(GDate);
                case GDbTypeEnum.GDateTime:
                    return typeof(GDateTime);
                case GDbTypeEnum.GEkoDate:
                    return typeof(GEkoDate);
                case GDbTypeEnum.GDecimal:
                    return typeof(GDecimal);
                case GDbTypeEnum.GBoolean:
                    return typeof(GBoolean);
                case GDbTypeEnum.GBlob:
                    return typeof(GBlob);
                case GDbTypeEnum.GDbTypeNull:
                    return typeof(GDbTypeNull);
                default:
                    throw new GNotImplementedException(21300058, 21300036, typeEnum.ToString()); //RC-EX 21300036 : Neošetřený datový typ [{0}]
            } // switch
        }
    }
}
