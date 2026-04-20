//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLengthAttribute.cs                          </Name>
//    <Description> Validuje delku (aplikovatelny na string, GString a Array)   </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-08-12                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>Validuje delku (aplikovatelny na string, GString a Array)</summary>
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false)]
    public class GLengthAttribute : GValidationAttribute
    {

        private int? m_oMin;
        private int? m_oMax;

        /// <summary>Minimální délka</summary>
        public int Minimum
        {
            get { return m_oMin.Value; }    //Sleti na nullreference exc.
            set { m_oMin = value; }
        }

        /// <summary>Minimalni delka jako int?</summary>
        public int? MinimumNullable
        {
            get { return m_oMin; } //Pro moznost pouzivat operator ?.
        }

        /// <summary>Ma minimum? Pokud ano, tak zavolani property Minimum nespadne na vyjimku.</summary>
        public bool HasMinimum { get { return m_oMin.HasValue; } }

        /// <summary>Maximální délka</summary>
        public int Maximum
        {
            get { return m_oMax.Value; }    //Sleti na nullreference exc.
            set { m_oMax = value; }
        }

        /// <summary>Maximalni delka jako int?</summary>
        public int? MaximumNullable
        {
            get { return m_oMax; } //Pro moznost pouzivat operator ?.
        }

        /// <summary>Ma maximum? Pokud ano, tak zavolani property Maximum nespadne na vyjimku.</summary>
        public bool HasMaximum { get { return m_oMax.HasValue; } }

        /// <summary>Jsou povoleny prazdne retezce?</summary>
        public bool AllowEmptyStrings { get; set; }

        /// <summary>Ctor</summary>
        public GLengthAttribute()
        {}

        /// <summary>Max ctor</summary>
        /// <param name="maximum">Maximalni delka</param>
        /// <param name="resourceCode">Resource code</param>
        public GLengthAttribute(int maximum, int resourceCode = 0) : base(resourceCode)
        {
            m_oMax = maximum;
        }

        /// <summary>Init</summary>
        public override void Init(Type type)
        {
            base.Init(type);

            DefaultMessage = CreateMessage(type, m_oMin, m_oMax);

            m_oValidatorArgs["min"] = m_oMin;
            m_oValidatorArgs["max"] = m_oMax;
        }

        /// <summary>Vytvoreni defaultni message</summary>
        protected virtual string CreateMessage(Type type, int? minimum, int? maximum)
        {
            if (minimum == null && maximum == null)
                throw new GArgumentException(31100004, 21090028, typeof(GLengthAttribute).Assembly); //RC-EX 21090028 : Musí být zadán argument minimum, maximum nebo oba.

            if (minimum.HasValue && maximum.HasValue && minimum.Value > maximum.Value)
                throw new GArgumentException(31100005, 21090029, typeof(GLengthAttribute).Assembly); //RC-EX 21090029 : Argument maximum má menší hodnotu než argument minimum.

            //Stringove typy
            if (type == typeof(string) || type == typeof(GString))
            {
                if (minimum.HasValue && !maximum.HasValue)
                    return GetResourceText(21090030, minimum.Value); //RC 21090030 : Minimální počet znaků je {0}.

                if (!minimum.HasValue && maximum.HasValue)
                    return GetResourceText(21090031, maximum.Value); //RC 21090031 : Maximální počet znaků je {0}.

                if (minimum.Value == maximum.Value)
                    return GetResourceText(21090032, minimum.Value); //RC 21090032 : Požadovaný počet znaků je {0}.

                return GetResourceText(21090033, minimum.Value, maximum.Value); //RC 21090033 : Požadovaný rozsah znaků je {0} - {1}.
            }

            //Arraye
            if(type == typeof(Array))
            {
                if (minimum.HasValue && !maximum.HasValue)
                    return GetResourceText(21090034, minimum.Value); //RC 21090034 : Minimální počet položek je {0}.

                if (!minimum.HasValue && maximum.HasValue)
                    return GetResourceText(21090035, maximum.Value); //RC 21090035 : Maximální počet položek je {0}.

                if (minimum.Value == maximum.Value)
                    return GetResourceText(21090036, minimum.Value); //RC 21090036 : Počet položek musí být přesně {0}.

                return GetResourceText(21090037, minimum.Value, maximum.Value); //RC 21090037 : Počet položek musí být v rozmezí {0} - {1}.
            }

            //Obecny default, sem by se to nemelo vubec dostavat, ale pro jistotu...
            return GetResourceText(21090040, minimum.HasValue ? minimum.ToString() : "0", maximum.HasValue ? maximum.ToString() : int.MaxValue.ToString()); //RC 21090040 : Chybný rozsah hodnot ({0} - {1}).
        }

        /// <summary>Type</summary>
        public override string Type { get { return "Length"; } }

        /// <summary>IsValid</summary>
        public override bool IsValid(object value)
        {
            if (value == null)
                return true;

            if (!IsSupported(value))
                return true;

            var length = GetLength(value);

            if (AllowEmptyStrings && length == 0)
                return true;

            if (m_oMin.HasValue && m_oMax.HasValue)
                return m_oMin.Value <= length && length <= m_oMax.Value;

            if (m_oMin.HasValue)
                return m_oMin.Value <= length;
            else if (m_oMax.HasValue)
                return length <= m_oMax.Value;
            else
                throw new GArgumentException(31100006);
        }

        /// <summary>Je dany objekt podporovany?</summary>
        protected virtual bool IsSupported(object value)
        {
            return (value is Array || value is string || value is GString);
        }

        /// <summary>Vrati delku objektu</summary>
        /// <param name="value">Aplikovatelny na string, GString a Array</param>
        /// <returns>Delka</returns>
        protected virtual int GetLength(object value)
        {
            var length = 0;

            if (value is string)
            {
                var str = value as string;
                if (str != null)
                    length = str.Length;
            }
            else if (value is GString)
            {
                length = (value as GString).BaseValue.Length;
            }
            else if (value is Array)
            {
                length = ((Array)value).Length;
            }
            else
                throw new NotSupportedException();

            return length;
        }

        private string GetResourceText(int rc, params object[] parms)
        {
            return GResources.GetResourceText(typeof(GLengthAttribute).Assembly, rc, parms);
        }
    }
}
