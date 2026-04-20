//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GAttCountAttribute.cs                    </Name>
//    <Description> Validuje počet příloh                                       </Description>
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
    /// <summary>Validuje počet příloh</summary>
    public class GAttCountAttribute : GValidationAttribute
    {
        private int? m_oMin;
        private int? m_oMax;

        public bool HasMinimum => m_oMin.HasValue;
        /// <summary>Minimální délka</summary>
        public int Minimum
        {
            get { return m_oMin.Value; }    //Sleti na nullreference exc.
            set { m_oMin = value; }
        }

        public bool HasMaximum => m_oMax.HasValue;
        /// <summary>Maximální délka</summary>
        public int Maximum
        {
            get { return m_oMax.Value; }  //Sleti na nullreference exc.
            set { m_oMax = value; }
        }

        /// <summary>Jsou povoleny prazdne retezce?</summary>
        public bool AllowEmptyStrings { get; set; }

        /// <summary>Ctor</summary>
        public GAttCountAttribute()
        {}

        /// <summary>Max ctor</summary>
        /// <param name="maximum">Maximalni delka</param>
        /// <param name="resourceCode">Resource code</param>
        public GAttCountAttribute(int maximum, int resourceCode = 0) : base(resourceCode)
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

        private static string CreateMessage(int? minimum, int? maximum)
        {
            if(minimum == null && maximum == null)
                throw new NotSupportedException(GResources.GetResourceText(29450711));

            if (minimum.HasValue && !maximum.HasValue)
            {
                if (minimum.Value == 1)
                    return GResources.GetResourceText(21000028); //RC 21000028 : Je nutno vložit alespoň jednu přílohu.
                return GResources.GetResourceText(21000029, minimum.Value); //RC 21000029 : Je nutno vložit alespoň {0} příloh.
            }

            if (!minimum.HasValue && maximum.HasValue)
                return GResources.GetResourceText(21000030, maximum.Value); //RC 21000030 : Je nutno vložit nejvíce {0} příloh.

            if (minimum.Value > maximum.Value)
                throw new InvalidOperationException(GResources.GetResourceText(29450712));

            if (minimum.Value == maximum.Value)
                return GResources.GetResourceText(21000031, maximum.Value); //RC 21000031 : Je nutno vložit {0} příloh.

            return GResources.GetResourceText(21000032, minimum.Value, maximum.Value); //RC 21000032 : Je nutno vložit {0} až {1} příloh.
        }

        /// <summary>Type</summary>
        public override string Type { get { return null/*"AttCount"*/; } }

        /// <summary>IsValid</summary>
        public override bool IsValid(object value)
        {
            if (!(value is List<DomContentAttachment> al))
                return false;

            var length = al.Count;

            if (m_oMin.HasValue && m_oMax.HasValue)
                return m_oMin.Value <= length && length <= m_oMax.Value;

            if (m_oMin.HasValue)
                return m_oMin.Value <= length;
            else if (m_oMax.HasValue)
                return length <= m_oMax.Value;
            else
                throw new NotSupportedException(GResources.GetResourceText(29450713));
        }
    }
}
