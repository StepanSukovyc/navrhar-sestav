//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GAttTypeAttribute.cs                     </Name>
//    <Description> Validuje Typ přílohy                                        </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2017-02-10                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Gordic.General;
using Gordic.General.ApplicationInterface;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>Validuje Typ přílohy</summary>
    public class GAttTypeAttribute : GValidationAttribute
    {

        private string m_ext;
        /// <summary>Extension</summary>
        public string Extension
        {
            get => m_ext;
            set
            {
                var exts = value.Split(',').Select(e => e.TrimStart(' ', '.').ToLower()).Distinct();
                m_ext = string.Join(",", exts);
            }
        }
        /// <summary>Extension</summary>
        public string ExtensionWithDots => string.Join(",", Extensions.Select(e => "." + e));
        public string[] Extensions => Extension.Split(',');

        /// <summary>Ctor</summary>
        public GAttTypeAttribute()
        {}

        /// <summary>Type</summary>
        public override string Type { get { return null/*"AttType"*/; } }

        /// <summary>IsValid</summary>
        public override bool IsValid(object value)
        {
            if (!(value is List<DomContentAttachment> al))
                return false;
            var exts = Extensions;
            foreach (var a in al)
            {
                var ext = Path.GetExtension(a.FileName);
                if (string.IsNullOrEmpty(ext) | ext.Length < 2) return false;
                ext = ext.Substring(1).ToLower();
                if (exts.Contains(ext) == false) return false;
            }
            return true;
        }

        public override void Init(Type type)
        {
            base.Init(type);
            DefaultMessage = CreateMessage(Extensions);
        }

        private static string CreateMessage(string[] extensions)
        {
            if (extensions.Length < 1)
                throw new NotSupportedException();

            if (extensions.Length==1)
            {
                return GResources.GetResourceText(21000034, extensions[0]); //RC 21000034 : Je nutno vložit přílohu typu {0}.
            }
            return GResources.GetResourceText(21000035, string.Join(", ", extensions)); //RC 21000035 : Je nutno vložit přílohu jednoho z těchto typů: {0}.
        }
    }
}
