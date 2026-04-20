//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GAttLengthAttribute.cs                   </Name>
//    <Description> Validuje velikost příloh                                    </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2017-02-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Gordic.General;
using Gordic.General.ApplicationInterface;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>Validuje velikost příloh</summary>
    public class GAttLengthAttribute : GValidationAttribute
    {

        private Int64? m_oMin;
        private Int64? m_oMax;

        /// <summary>Minimální velikost</summary>
        public Int64 Minimum
        {
            get { return m_oMin.Value; }    //Sleti na nullreference exc.
            set { m_oMin = value; }
        }

        public bool HasMaximum => m_oMax.HasValue;
        /// <summary>Maximální velikost</summary>
        public Int64 Maximum
        {
            get { return m_oMax.Value; } //Sleti na nullreference exc.
            set { m_oMax = value; }
        }

        /// <summary>Jsou povoleny prazdne retezce?</summary>
        public bool AllowEmptyStrings { get; set; }

        /// <summary>Ctor</summary>
        public GAttLengthAttribute()
        {}

        /// <summary>Max ctor</summary>
        /// <param name="maximum">Maximalni delka</param>
        /// <param name="resourceCode">Resource code</param>
        public GAttLengthAttribute(Int64 maximum, int resourceCode = 0) : base(resourceCode)
        {
            m_oMax = maximum;
        }

        public override void Init(Type type)
        {
            base.Init(type);
            DefaultMessage = CreateMessage(m_oMin, m_oMax);

            if (!m_oValidatorArgs.ContainsKey("min"))
                m_oValidatorArgs.Add("min", m_oMin);
            else
                m_oValidatorArgs["min"] = m_oMin;

            if (!m_oValidatorArgs.ContainsKey("max"))
                m_oValidatorArgs.Add("max", m_oMax);
            else
                m_oValidatorArgs["max"] = m_oMax;
        }

        private static string CreateMessage(Int64? minimum, Int64? maximum)
        {
            if(minimum == null && maximum == null)
                throw new NotSupportedException(GResources.GetResourceText(29450711));

            if (minimum.HasValue && !maximum.HasValue)
                return string.Format(GResources.GetResourceText(29450714) + " {0}.", minimum.Value);

            if (!minimum.HasValue && maximum.HasValue)
                return string.Format(GResources.GetResourceText(29450715) + " {0}.", maximum.Value);

            if (minimum.Value > maximum.Value)
                throw new InvalidOperationException(GResources.GetResourceText(29450712));

            if (minimum.Value == maximum.Value)
                return string.Format(GResources.GetResourceText(29450716) + " {0}.", minimum.Value);

            return string.Format(GResources.GetResourceText(29450717) + " {0} - {1}.", minimum.Value, maximum.Value);
        }

        /// <summary>Type</summary>
        public override string Type { get => null; }

        /// <summary>IsValid</summary>
        public override bool IsValid(object value)
        {
            if (!(value is DefaultContentAttachment.List al))
                return false;

            Int64 length = al.Length;

            if (m_oMin.HasValue && m_oMax.HasValue)
                return m_oMin.Value <= length && length <= m_oMax.Value;

            if (m_oMin.HasValue)
                return m_oMin.Value <= length;
            else if (m_oMax.HasValue)
                return length <= m_oMax.Value;
            else
                throw new NotSupportedException(GResources.GetResourceText(29450713)); //RC 29450713 : Nebyl zadan parametr Minimum ani Maximum
        }
    }
}
