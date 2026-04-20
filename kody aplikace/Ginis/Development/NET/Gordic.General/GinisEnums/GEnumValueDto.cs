//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GEnumValueDto.cs                             </Name>
//    <Description> Pomocná třída pro přístup ke klíčům a názvům zadaného enum typu</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-07-10                                                  </Created>
//  </FileHeader>



using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Pomocná třída pro přístup ke klíčům a názvům zadaného enum typu
    /// </summary>
    public class GEnumValueDto
    {
        /// <summary>
        /// 
        /// </summary>
        public int Key { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// <example>
        /// Použití: 
        /// <code>
        /// ICollection&lt;EnumValueDto&gt; list = GEnumValueDto.ConvertEnumToList&lt;SearchDataType&gt;();
        /// foreach (var element in list)
        /// {
        ///   Console.WriteLine(string.Format("Key: {0}; Value: {1}", element.Key, element.Value));
        ///}
        ///</code>
        ///</example>
        /// <seealso href="https://stackoverflow.com/questions/1167361/how-do-i-convert-an-enum-to-a-list-in-c">Zdroj kódu</seealso> 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static ICollection<GEnumValueDto> ConvertEnumToList<T>() where T : struct, IConvertible
        {
            if (!typeof(T).IsEnum)
            {
                throw new Exception("Type given T must be an Enum");
            }

            var result = Enum.GetValues(typeof(T))
                             .Cast<T>()
                             .Select(x => new GEnumValueDto
                             {
                                 Key = Convert.ToInt32(x),
                                 Value = x.ToString(new CultureInfo("en"))
                             })
                             .ToList()
                             .AsReadOnly();

            return result;
        }

        /// <summary>
        /// Test, zda zadaná hodnota je v rámci zadaného enum typu definována.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool IsDefined<T>(int value) where T : struct, IConvertible
        {
            var values = Enum.GetValues(typeof(T)).Cast<int>().OrderBy(x => x);
            return values.Contains(value);
        }
    }
}
