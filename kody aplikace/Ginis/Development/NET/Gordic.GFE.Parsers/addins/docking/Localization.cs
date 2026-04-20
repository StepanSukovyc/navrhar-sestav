//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Localization.cs                        </Name>
//    <Description> Lokalizace                                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Lokalizace
    /// </summary>
	[AttributeUsage(AttributeTargets.All)]
	internal sealed class LocalizedDescriptionAttribute : DescriptionAttribute
	{
		private bool m_initialized = false;

        public LocalizedDescriptionAttribute(string key) : base(key) { }

		public override string Description
		{
			get
			{	
				if (!m_initialized)
				{
					string key = base.Description;
					DescriptionValue = ResourceService.GetString(key);
					if (DescriptionValue == null)
						DescriptionValue = String.Empty;

					m_initialized = true;
				}

				return DescriptionValue;
			}
		}
	}

	[AttributeUsage(AttributeTargets.All)]
	internal sealed class LocalizedCategoryAttribute : CategoryAttribute
	{
        public LocalizedCategoryAttribute(string key) : base(key) { }
        protected override string GetLocalizedString(string key) { return ResourceService.GetString(key); }
	}
}
