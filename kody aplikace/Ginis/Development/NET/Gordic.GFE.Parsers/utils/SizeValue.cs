//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SizeValue.cs                             </Name>
//    <Description> Objekt prezentující specifickou číselnou hodnotu s metrikou </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Security;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Utils
{
    /// <summary>
    /// Objekt prezentující specifickou číselnou hodnotu s metrikou
    /// </summary>
    [Serializable()]
    [TypeConverter(typeof(SizeValueConverter))]
    [System.Diagnostics.DebuggerDisplay("{(IsEmpty?\"Empty\":Value),nq}")]
    public struct SizeValue : IEquatable<SizeValue>
    {
        #region IEquatable
        /// <exclude/>
        public bool Equals(SizeValue other) { return this == other; }
        #endregion

        float floatValue, pc100;
        string metrics, value;

        #region konverze
        /// <summary>Twipy</summary>
        public float Twips { get => UnitConverter.ConvertToTwips(floatValue); }
        /// <summary>Milimetry</summary>
        public float Milimeters { get => UnitConverter.ConvertToMilimeters(floatValue); }
        /// <summary>Pointy</summary>
        public float Points { get => UnitConverter.ConvertToPoints(floatValue); }
        #endregion

        #region konstruktory

        #endregion

        #region implicitní konverze
        /// <exclude/>
        public static implicit operator float(SizeValue f) => f.floatValue;
        /// <exclude/>
        public static implicit operator SizeValue(float f) => new SizeValue(f);
        /// <exclude/>
        public static implicit operator SizeValue(double f) => new SizeValue((float)f);
        #endregion

        #region operátory
        /// <exclude/>
        public static bool operator !=(SizeValue left, SizeValue right) => left.floatValue != right.floatValue;

        /// <exclude/>
        public static bool operator <(SizeValue left, SizeValue right) => left.floatValue < right.floatValue;

        /// <exclude/>
        public static bool operator <=(SizeValue left, SizeValue right) => left.floatValue <= right.floatValue;

        /// <exclude/>
        public static bool operator ==(SizeValue left, SizeValue right) => Math.Round(left.floatValue - right.floatValue, 2) == 0;

        /// <exclude/>
        public static bool operator >(SizeValue left, SizeValue right) => left.floatValue > right.floatValue;

        /// <exclude/>
        public static bool operator >=(SizeValue left, SizeValue right) => left.floatValue >= right.floatValue;


        /// <summary>
        /// Operace součtu dvou veličin
        /// </summary>
        /// <param name="left">Levý argument</param>
        /// <param name="right">Pravý argument</param>
        /// <returns></returns>
        public static SizeValue operator +(SizeValue left, SizeValue right) => new SizeValue(left.floatValue + right.floatValue, left.Metrics, left.PC100);

        /// <summary>
        /// Operace součtu dvou veličin
        /// </summary>
        /// <param name="left">Levý argument</param>
        /// <param name="right">Pravý argument</param>
        /// <returns></returns>
        public static SizeValue operator +(SizeValue left, float right) => new SizeValue(left.floatValue + right, left.Metrics, left.PC100);

        /// <summary>
        /// Operace součtu dvou veličin
        /// </summary>
        /// <param name="left">Levý argument</param>
        /// <param name="right">Pravý argument</param>
        /// <returns></returns>
        public static SizeValue operator +(SizeValue left, int right) => new SizeValue(left.floatValue + right, left.Metrics, left.PC100);

        /// <summary>
        /// Operace rozdílu dvou veličin
        /// </summary>
        /// <param name="left">Levý argument</param>
        /// <param name="right">Pravý argument</param>
        /// <returns></returns>
        public static SizeValue operator -(SizeValue left, float right) => new SizeValue(left.floatValue - right, left.Metrics, left.PC100);

        /// <summary>
        /// Operace rozdílu dvou veličin
        /// </summary>
        /// <param name="left">Levý argument</param>
        /// <param name="right">Pravý argument</param>
        /// <returns></returns>
        public static SizeValue operator -(SizeValue left, int right) => new SizeValue(left.floatValue - right, left.Metrics, left.PC100);

        /// <summary>
        /// Operace rozdílu dvou veličin
        /// </summary>
        /// <param name="left">Levý argument</param>
        /// <param name="right">Pravý argument</param>
        /// <returns></returns>
        public static SizeValue operator -(SizeValue left, SizeValue right) => new SizeValue(left.floatValue - right.floatValue, left.Metrics, left.PC100);
        #endregion

        /// <summary>
        /// prázdná veličina
        /// </summary>
        public readonly static SizeValue Empty = new SizeValue();
        /// <summary>
        /// 5mm
        /// </summary>
        public readonly static SizeValue MM5 = new SizeValue("5mm");
        /// <summary>
        /// 10mm
        /// </summary>
        public readonly static SizeValue MM10 = new SizeValue("10mm");
        /// <summary>
        /// 210mm
        /// </summary>
        public readonly static SizeValue MM210 = new SizeValue("210mm");
        /// <summary>
        /// 297mm
        /// </summary>
        public readonly static SizeValue MM297 = new SizeValue("297mm");

        /// <summary>
        /// indikuje, jestli místo je prázdné
        /// </summary>
        public bool IsEmpty { get => floatValue == 0 && string.IsNullOrEmpty(value); }

        /// <summary>
        /// INT číselna hodnota objektu
        /// </summary>
        [Browsable(false)]
        public int IntValue { get => (int)floatValue; }

        /// <summary>
        /// řetězcový ekvivalent hodnoty
        /// </summary>
        [Description("Hodnota dané veličiny")]
        [DisplayName("hodnota")]
        public string Value
        {
            get
            {
                if (string.IsNullOrEmpty(value) && metrics != null)
                    LoadValue();
                return value;
            }
            set { this.value = value; }
        }

        /// <summary>
        /// Metrika
        /// </summary>
        [DisplayName("jendotka")]
        [Description("Měrná jednotka veličiny: lze použit mm, px, tw, pt a v někerých případech i % a pc")]
        public string Metrics
        {
            get => metrics;
            set { metrics = value; LoadValue(); }
        }

        /// <summary>
        /// Hodnota 100%
        /// </summary>
        [Browsable(false)]
        public float PC100
        {
            get => pc100;
            set { pc100 = value; LoadValue(); }
        }

        public double WithoutMetrics
        {
            get
            {
                double.TryParse(metrics != null && metrics.Length > 0 ? value.Replace(metrics, String.Empty) : value, out double _value);
                return _value;
            }
        }

        /// <summary>
        /// Vytvoření nové instance dle objektu
        /// </summary>
        /// <param name="value">Daný objekt</param>
        public SizeValue(object value)
        {
            pc100 = 0;
            floatValue = 0;
            this.value = Convert.ToString(value);
            metrics = LoadMetrics(this.value);
            LoadFloatValue();
        }

        /// <summary>
        /// Vytvoření nové instance dle objektu
        /// </summary>
        /// <param name="value">Daný objekt</param>
        public SizeValue(float value)
        {
            this.pc100 = 0;
            this.value = Convert.ToString(value);
            this.metrics = "";
            this.floatValue = value;
        }
        /// <summary>
        /// Vytvoření nové instance dle objektu
        /// </summary>
        /// <param name="value">Daný objekt</param>
        public SizeValue(int value)
        {
            this.pc100 = 0;
            this.value = Convert.ToString(value);
            this.metrics = "";
            this.floatValue = value;
        }
        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="sizeValue">Dle daného objektu</param>
        public SizeValue(SizeValue sizeValue)
        {
            this.floatValue = 0;
            this.metrics = string.Empty;
            this.pc100 = 0;

            this.value = sizeValue.Value;
            this.pc100 = sizeValue.PC100;
            this.metrics = sizeValue.Metrics;
            this.floatValue = sizeValue.floatValue;
        }

        /// <summary>
        /// Vytvoření instance nové třídy
        /// </summary>
        /// <param name="value">Implicitní hodnota</param>
        /// <param name="pc100">Hodnota 100%</param>
        public SizeValue(string value, float pc100)
        {
            this.pc100 = 0;
            this.floatValue = 0;
            this.value = value;
            this.pc100 = pc100;
            this.metrics = LoadMetrics(this.value);
            LoadFloatValue();
        }

        /// <summary>
        /// Vytvoření nové instance dle objektu
        /// </summary>
        /// <param name="value">Daný objekt</param>
        /// <param name="metrics"></param>
        public SizeValue(object value, string metrics)
        {
            this.value = string.Empty;
            this.pc100 = 0;
            this.floatValue = 0;
            this.metrics = metrics;
            this.value = Convert.ToString(value);
            LoadFloatValue();
        }

        /// <summary>
        /// Vytvoření instance nové třídy
        /// </summary>
        /// <param name="floatvalue">Implicitní číselná hodnota v pixelech</param>
        /// <param name="metrics">Metrika do které se hodnota konvertuje</param>
        public SizeValue(float floatvalue, string metrics)
            : this(floatvalue, metrics, 0)
        {
        }

        /// <summary>
        /// Vytvoření instance nové třídy
        /// </summary>
        /// <param name="floatvalue">Implicitní číselná hodnota v pixelech</param>
        /// <param name="metrics">Metrika do které se hodnota konvertuje</param>
        /// <param name="pc100">Hodnota 100% v pixelech</param>
        public SizeValue(float floatvalue, string metrics, float pc100)
        {
            this.floatValue = floatvalue;
            this.metrics = metrics;
            this.pc100 = pc100;
            this.value = string.Empty;
        }

        void LoadValue()
        {
            try
            {
                if (string.Equals(metrics, "mm", StringComparison.Ordinal))
                    this.value = UnitConverter.ConvertToMM(floatValue, 2);
                else if (string.Equals(metrics, "tw", StringComparison.Ordinal))
                    this.value = UnitConverter.ConvertToTW(floatValue, 2);
                else if (string.Equals(metrics, "px", StringComparison.Ordinal))
                    this.value = UnitConverter.ConvertToPX(floatValue, 2);
                else if (string.Equals(metrics, "%", StringComparison.Ordinal)
                    || string.Equals(metrics, "pc", StringComparison.Ordinal))
                    this.value = UnitConverter.ConvertToPC(floatValue, 2, pc100);
                else
                    this.value = Convert.ToString(floatValue);
            }
            catch
            {
                metrics = "mm";
                this.value = UnitConverter.ConvertToMM(floatValue, 2);
            }
        }
        static string LoadMetrics(string value) => UnitConverter.LoadMetrics(value);
        void LoadFloatValue()
        {
            try
            {
                if (string.Equals(metrics, "%", StringComparison.Ordinal))
                {
                    if (pc100 != 0)
                        this.floatValue = UnitConverter.ConvertExactFloat(value, pc100);
                }
                else
                    this.floatValue = UnitConverter.ConvertExactFloat(value);
            }
            catch { this.floatValue = 0; }
        }

        /// <summary>
        /// Valu se zaokrouhlením
        /// </summary>
        /// <param name="round">Zaokrouhlení</param>
        /// <returns></returns>
        public string MathRoundValue(int round) => UnitConverter.ConvertTo(floatValue, metrics, round, pc100).Replace(',', '.');

        /// <summary>
        /// Převod objektu na řetězec
        /// </summary>
        /// <returns>Řetězcová prezentace objektu</returns>
        public override string ToString() => Value;

        /// <exclude/>
        public override bool Equals(object obj) => obj is SizeValue ? Equals((SizeValue)obj) : floatValue.Equals(obj);

        /// <exclude/>
        [SecuritySafeCritical]
        public override int GetHashCode() => floatValue.GetHashCode();
    }
}
