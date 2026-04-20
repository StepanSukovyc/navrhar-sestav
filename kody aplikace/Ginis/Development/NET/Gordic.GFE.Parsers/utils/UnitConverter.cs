//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.UnitConverter.cs                         </Name>
//    <Description> Převodník jednotek                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-03-15                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Utils
{
    /// <summary>
    /// Převodník jednotek
    /// </summary>
    public static class UnitConverter
    {
        /// <summary>
        /// zjištění, zda daná hodnota je platného formátu
        /// </summary>
        /// <param name="value">hodnota, formát které se hledá</param>
        /// <returns>TRUE - hodnota je daná v platném formátu</returns>
        public static bool IsMetricValueValidFormat(string value)
        {
            if (string.IsNullOrEmpty(value))
                return true;

            if (cachValueToFloat.ContainsKey(value))
                return true;

            if (value.Length > 10
                && !(value.Contains(',') || value.Contains('.')))
                return false;

            if (value.IndexOf('.') > 10 || value.IndexOf(',') > 10)
                return false;

            return true;
        }

        /// <summary>
        /// zjištění, zda daná hodnota je platného formátu
        /// </summary>
        /// <param name="value">hodnota, formát které se hledá</param>
        /// <returns>TRUE - hodnota je daná v platném formátu</returns>
        public static bool IsWidthValidFormat(string value) => Regex.Match(value, @"^(\d+\.\d|\d)+(tw|mm|%|pt)").Success;

        /// <summary>
        /// zjištění, zda daná hodnota je platného formátu
        /// </summary>
        /// <param name="value">hodnota, formát které se hledá</param>
        /// <returns>TRUE - hodnota je daná v platném formátu</returns>
        public static bool IsHeightValidFormat(string value) => Regex.Match(value, @"^(\d+\.\d|\d)+(tw|mm|pt)").Success;

        static ConcurrentDictionary<string, float> cachValueToFloat = new ConcurrentDictionary<string, float>();
        /// <summary>
        /// Převod hodnoty na float hodnotu
        /// </summary>
        /// <param name="value">řetězec, prezentující hodnotu</param>
        /// <returns></returns>
        public static float ConvertFrom(string value) => cachValueToFloat.GetOrAdd(value, delegate
            {
                if (string.IsNullOrEmpty(value))
                    return 0f;

                if (value.EndsWith("mm", StringComparison.OrdinalIgnoreCase))
                    return ConvertFromMilimeters(float.Parse(value.Replace("mm", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture));
                else if (value.EndsWith("px", StringComparison.OrdinalIgnoreCase))
                    return float.Parse(value.Replace("px", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture);
                else if (value.EndsWith("pt", StringComparison.OrdinalIgnoreCase))
                    return ConvertFromPoints(float.Parse(value.Replace("pt", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture));
                else if (value.EndsWith("tw", StringComparison.OrdinalIgnoreCase))
                    return ConvertFromTwips(float.Parse(value.Replace("tw", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture));
                else
                    //Zkusíme převést hodnotu na pixely
                    if (float.TryParse(value, out float _unsp))
                    return _unsp;

                throw new Exception(GResources.GetResourceText(29450032, value)); //RC 29450032 : Hodnotu '{0}' nelze konvertovat!
            });

        /// <summary>
        /// Převod řetězce prezentující číslo na číslo typu exact-size
        /// </summary>
        /// <param name="value">Řetězec prezentující číslo</param>
        /// <returns></returns>
        public static float ConvertExactFloat(string value)
        {
            value = value ?? string.Empty;
            string Value = value.Replace("Unspec", string.Empty);
            if (!string.IsNullOrEmpty(Value))
            {
                if (Value.EndsWith("mm", StringComparison.OrdinalIgnoreCase) || Value.EndsWith("MMeters", StringComparison.OrdinalIgnoreCase))
                {
                    Value = Value.Replace("MMeters", "mm");
                    return ConvertFromMilimeters(float.Parse(Value.Replace("mm", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture));
                }
                else if (Value.EndsWith("px", StringComparison.OrdinalIgnoreCase))
                    return float.Parse(value.Replace("px", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture);
                else if (Value.EndsWith("pt", StringComparison.OrdinalIgnoreCase) || Value.EndsWith("Points", StringComparison.OrdinalIgnoreCase))
                {
                    Value = Value.Replace("Points", "pt");
                    return ConvertFromPoints(float.Parse(Value.Replace("pt", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture));
                }
                else if (Value.EndsWith("tw", StringComparison.OrdinalIgnoreCase) || Value.EndsWith("Twip", StringComparison.OrdinalIgnoreCase))
                {
                    Value = Value.Replace("Twip", "tw");
                    return ConvertFromTwips(float.Parse(Value.Replace("tw", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture));
                }

                //Nastavení hodnoty dle pravidla:
                //celé kladné číslo v rozmezí od 0 do 25, 
                //které udává přesnou velikost v twipech  
                //dle pravidla 0 = 0 twipů, 1=1twip, a poté vždy N-1 násobek 10 twipů 
                //(tzn. 2 = 10twipů, 3 = 20twipů, atd.)
                //Zkusíme převést hodnotu
                if (float.TryParse(value, out float _unsp))
                {
                    if (_unsp < 0)
                        _unsp = 0;

                    if (_unsp > 1)
                        _unsp = (_unsp - 1) * 10;
                }
                return _unsp * 96 / 1440;
            }
            return 0;
        }

        /// <summary>
        /// Převod řetězce prezentující číslo na číslo typu exact-size
        /// </summary>
        /// <param name="value">Řetězec prezentující číslo</param>
        /// <param name="pc100">Hodnota 100%</param>
        /// <returns></returns>
        public static float ConvertExactFloat(string value, float pc100)
        {
            value = value ?? string.Empty;
            string Value = value.Replace("Unspec", string.Empty);
            try
            {
                if (!string.IsNullOrEmpty(Value))
                {
                    if (Value.EndsWith("mm", StringComparison.Ordinal) || Value.EndsWith("MMeters", StringComparison.Ordinal))
                    {
                        Value = Value.Replace("MMeters", "mm");
                        return ConvertFromMilimeters(float.Parse(Value.Replace("mm", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture));
                    }
                    else if (Value.EndsWith("px", StringComparison.Ordinal))
                        return float.Parse(value.Replace("px", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture);
                    else if (Value.EndsWith("pt", StringComparison.Ordinal) || Value.EndsWith("Points", StringComparison.Ordinal))
                    {
                        Value = Value.Replace("Points", "pt");
                        return ConvertFromPoints(float.Parse(Value.Replace("pt", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture));
                    }
                    else if (Value.EndsWith("tw", StringComparison.Ordinal) || Value.EndsWith("Twip", StringComparison.Ordinal))
                    {
                        Value = Value.Replace("Twip", "tw");
                        return ConvertFromTwips(float.Parse(Value.Replace("tw", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture));
                    }
                    else if (Value.EndsWith("%", StringComparison.Ordinal) || Value.EndsWith("pc", StringComparison.Ordinal))
                    {
                        if (pc100 == 0)
                            throw new ArgumentNullException(GResources.GetResourceText(29450026)); //RC 29450026 : 100% nesmí být 0.

                        Value = Value.Replace("pc", "%");
                        return float.Parse(Value.Replace("%", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture) * pc100 / 100;
                    }

                    //Nastavení hodnoty dle pravidla:
                    //celé kladné číslo v rozmezí od 0 do 25, 
                    //které udává přesnou velikost v twipech  
                    //dle pravidla 0 = 0 twipů, 1=1twip, a poté vždy N-1 násobek 10 twipů 
                    //(tzn. 2 = 10twipů, 3 = 20twipů, atd.)
                    //Zkusíme převést hodnotu
                    if (float.TryParse(value, out float _unsp))
                    {
                        if (_unsp < 0)
                            _unsp = 0;

                        if (_unsp > 1)
                            _unsp = (_unsp - 1) * 10;
                    }
                    return _unsp * 96 / 1440;
                }
            }
            catch (Exception ex) { MessageService.ShowErrorFormatted(GResources.GetResourceText(29450032, value) + "\n'{0}'", ex.Message); } //RC 29450032 : Hodnotu '{0}' nelze konvertovat!
            return 0;
        }

        /// <summary>
        /// Převod řetězce prezentující číslo na číslo typu exact-size (pt)
        /// </summary>
        /// <param name="value">Řetězec prezentující číslo</param>
        /// <returns>Zaokrouhlená na setiny hodnota v pointech</returns>
        public static float ConvertFontSize(string value)
        {
            int[] fontsize = new int[] { 0, 141, 179, 213, 250, 325, 433, 650, 831 };

            try
            {
                if (!string.IsNullOrEmpty(value))
                {
                    if (value.EndsWith("mm", StringComparison.Ordinal))
                        return (float)Math.Round(float.Parse(value.Replace("mm", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture) * 72 / 25.4, 2);
                    else if (value.EndsWith("px", StringComparison.Ordinal))
                        return (float)Math.Round(float.Parse(value.Replace("px", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture) * 72 / 96, 2);
                    else if (value.EndsWith("pt", StringComparison.Ordinal))
                        return (float)Math.Round(float.Parse(value.Replace("pt", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture), 2);
                    else if (value.EndsWith("tw", StringComparison.Ordinal))
                        return (float)Math.Round(float.Parse(value.Replace("tw", "").Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture) * 72 / 1440, 2);

                    //Nastavení hodnoty dle pravidla 1-8, *npsize
                    //Zkusíme převést hodnotu
                    if (!int.TryParse(value, out int _unsp))
                        _unsp = 1;

                    if (_unsp < 0)
                        _unsp = 1;

                    if (_unsp > 8)
                        _unsp = 8;

                    return (float)Math.Round((float)(fontsize[_unsp] * 72 / 1440), 2);
                }
            }
            catch (Exception ex) { MessageService.ShowErrorFormatted(GResources.GetResourceText(29450032, value) + "\n'{0}'", ex.Message); } //RC 29450032 : Hodnotu '{0}' nelze konvertovat!
            throw new Exception(GResources.GetResourceText(29450032, value)); //RC 29450032 : Hodnotu '{0}' nelze konvertovat!
        }

        static readonly List<string> Metrics = new List<string>() { "mm", "pt", "tw", "px", "%" };
        /// <summary>
        /// Převod pixelů na příslušnou metrickou veličinu
        /// </summary>
        /// <param name="floatvalue">Pixely</param>
        /// <param name="metrics">Metrika nové hodnoty</param>
        /// <returns></returns>
        public static string ConvertTo(float floatvalue, string metrics)
        {
            if (String.Equals(metrics, "px", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", floatvalue, "px");
            else if (String.Equals(metrics, "mm", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", floatvalue * 25.4 / 96, "mm");
            else if (String.Equals(metrics, "tw", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", floatvalue * 15, "tw");
            else if (String.Equals(metrics, "pt", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", floatvalue * 72 / 96, "pt");

            return string.Format("{0}{1}", floatvalue, "px");
        }

        /// <summary>
        /// Převod pixelů na příslušnou metrickou veličinu
        /// </summary>
        /// <param name="floatvalue">Pixely</param>
        /// <param name="metrics">Metrika nové hodnoty</param>
        /// <param name="pc100">Hodnota 100%</param>
        /// <returns></returns>
        public static string ConvertTo(float floatvalue, string metrics, float pc100)
        {
            if (String.Equals(metrics, "px", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", floatvalue, "px");
            else if (String.Equals(metrics, "mm", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", floatvalue * 25.4 / 96, "mm");
            else if (String.Equals(metrics, "tw", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", floatvalue * 15, "tw");
            else if (String.Equals(metrics, "pt", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", floatvalue * 72 / 96, "pt");
            else if (String.Equals(metrics, "%", StringComparison.OrdinalIgnoreCase)
                && pc100 != 0)
                return string.Format("{0}{1}", floatvalue * 100 / pc100, "%");

            return string.Format("{0}{1}", floatvalue, "px");
        }

        /// <summary>
        /// Převod pixelů na příslušnou metrickou veličinu
        /// </summary>
        /// <param name="floatvalue">Pixely</param>
        /// <param name="metrics">Metrika nové hodnoty</param>
        /// <param name="round">Zaokrouhlení</param>
        /// <returns></returns>
        public static string ConvertTo(float floatvalue, string metrics, int round)
        {
            if (String.Equals(metrics, "px", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", Math.Round(floatvalue, round), "px");
            else if (String.Equals(metrics, "mm", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", Math.Round(floatvalue * 25.4 / 96, round), "mm");
            else if (String.Equals(metrics, "tw", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", Math.Round(floatvalue * 15, round), "tw");
            else if (String.Equals(metrics, "pt", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", Math.Round(floatvalue * 72 / 96, round), "pt");

            return string.Format("{0}{1}", Math.Round(floatvalue, round), "px");
        }

        /// <summary>
        /// Převod pixelů na příslušnou metrickou veličinu
        /// </summary>
        /// <param name="floatvalue">Pixely</param>
        /// <param name="round">Zaokrouhlení</param>
        /// <returns></returns>
        public static string ConvertToPX(float floatvalue, int round) => string.Format("{0}{1}", Math.Round(floatvalue, round), "px");

        /// <summary>
        /// Převod pixelů na příslušnou metrickou veličinu
        /// </summary>
        /// <param name="floatvalue">Pixely</param>
        /// <param name="round">Zaokrouhlení</param>
        /// <returns></returns>
        public static string ConvertToMM(float floatvalue, int round) => string.Format("{0}{1}", Math.Round(floatvalue * 25.4 / 96, round), "mm");

        /// <summary>
        /// Převod pixelů na příslušnou metrickou veličinu
        /// </summary>
        /// <param name="floatvalue">Pixely</param>
        /// <param name="round">Zaokrouhlení</param>
        /// <returns></returns>
        public static string ConvertToTW(float floatvalue, int round) => string.Format("{0}{1}", Math.Round(floatvalue * 15, round), "tw");
        /// <summary>
        /// Převod pixelů na příslušnou metrickou veličinu
        /// </summary>
        /// <param name="floatvalue">Pixely</param>
        /// <param name="round">Zaokrouhlení</param>
        /// <param name="pc100">Hodnota 100%</param>
        /// <returns></returns>
        public static string ConvertToPC(float floatvalue, int round, float pc100) => pc100 != 0
            ? string.Format("{0}{1}", Math.Round(floatvalue * 100 / pc100, round), "%")
            : string.Format("{0}{1}", Math.Round(floatvalue, round), "px");

        /// <summary>
        /// Převod pixelů na příslušnou metrickou veličinu
        /// </summary>
        /// <param name="floatvalue">Pixely</param>
        /// <param name="metrics">Metrika nové hodnoty</param>
        /// <param name="round">Zaokrouhlení</param>
        /// <param name="pc100">Hodnota 100%</param>
        /// <returns></returns>
        public static string ConvertTo(float floatvalue, string metrics, int round, float pc100)
        {
            if (String.Equals(metrics, "px", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", Math.Round(floatvalue, round), "px");
            else if (String.Equals(metrics, "mm", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", Math.Round(floatvalue * 25.4 / 96, round), "mm");
            else if (String.Equals(metrics, "tw", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", Math.Round(floatvalue * 15, round), "tw");
            else if (String.Equals(metrics, "pt", StringComparison.OrdinalIgnoreCase))
                return string.Format("{0}{1}", Math.Round(floatvalue * 72 / 96, round), "pt");
            else if (String.Equals(metrics, "%", StringComparison.InvariantCultureIgnoreCase)
                && pc100 != 0)
                return string.Format("{0}{1}", Math.Round(floatvalue * 100 / pc100, round), "%");

            return string.Format("{0}{1}", Math.Round(floatvalue, round), "px");
        }

        /// <summary>
        /// Konverze velikosti procent
        /// </summary>
        /// <param name="Value"></param>
        /// <param name="Percentage"></param>
        /// <returns></returns>
        internal static float ConvertFrom(string Value, float Percentage)
        {
            throw new NotImplementedException();
        }

        #region NEW
        /// <summary>
        /// konverze TW -> PX
        /// </summary>
        /// <param name="value">hodnota ve twipech</param>
        /// <returns>pixelová prezentace dané hodnoty</returns>
        public static float ConvertFromTwips(float value) => value * 96 / 1440;
        /// <summary>
        /// konverze PX -> TW
        /// </summary>
        /// <param name="value">pixelová prezentace dané hodnoty</param>
        /// <returns>hodnota ve twipech</returns>
        public static float ConvertToTwips(float value) => value * 15;
        /// <summary>
        /// konverze PX -> MM
        /// </summary>
        /// <param name="value">pixelová prezentace dané hodnoty</param>
        /// <returns>hodnota v milimetrech</returns>
        public static float ConvertToMilimeters(float value) => (float)(value * 25.4 / 96);
        /// <summary>
        /// konverze PX -> PT
        /// </summary>
        /// <param name="value">pixelová prezentace dané hodnoty</param>
        /// <returns>hodnota v pointéch</returns>
        public static float ConvertToPoints(float value) => value * 72 / 96;
        /// <summary>
        /// konverze PT -> PX
        /// </summary>
        /// <param name="value">hodnota v pointech</param>
        /// <returns>pixelová prezentace dané hodnoty</returns>
        public static float ConvertFromPoints(float value) => value * 96 / 72;
        /// <summary>
        /// konverze MM -> PX
        /// </summary>
        /// <param name="value">hodnota v pointech</param>
        /// <returns>pixelová prezentace dané hodnoty</returns>
        public static float ConvertFromMilimeters(float value) => (float)(value * 96 / 25.4);
        #endregion

        //static ConcurrentDictionary<string, string> cachMetrics = new ConcurrentDictionary<string, string>();
        /// <summary>
        /// načtení metriky
        /// </summary>
        /// <param name="value">převáděná hodnota</param>
        public static string LoadMetrics(string value)
        {
            if (string.IsNullOrEmpty(value))
                return string.Empty;
            if (value.EndsWith("mm", StringComparison.OrdinalIgnoreCase))
                return "mm";
            if (value.EndsWith("px", StringComparison.OrdinalIgnoreCase))
                return "px";
            if (value.EndsWith("pt", StringComparison.OrdinalIgnoreCase))
                return "pt";
            if (value.EndsWith("tw", StringComparison.OrdinalIgnoreCase))
                return "tw";
            if (value.EndsWith("%", StringComparison.OrdinalIgnoreCase) || value.EndsWith("pc", StringComparison.OrdinalIgnoreCase))
                return "%";
            return string.Empty;
        }

        /// <summary>
        /// Formátování řetězce dle metriky
        /// </summary>
        /// <param name="value">Hodnota fomrátovaného řetězce</param>
        /// <param name="shortMetric">Zkrátka metriky: tw, pt, mm apod.</param>
        /// <param name="longMetric">Metrika: Twip, Points apod.</param>
        /// <returns></returns>
        public static string FormatWidthValue(string value, string shortMetric, string longMetric) => value.Replace(shortMetric, "").Replace(longMetric, "").Replace(".", ",");
    }
}
