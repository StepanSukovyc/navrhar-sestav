//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFETemplate.cs                           </Name>
//    <Description> Šablona                                                     </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2006-10-05                                                  </Created>
//  </FileHeader>

using Gordic.Report.Implementation;
using System.Collections.Generic;
using System.Xml;
using System.Xml.Linq;
using Gordic.Report.Interface;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Šablona
    /// </summary>
    public class GFETemplate
    {
        /// <summary>
        /// obsah
        /// </summary>
        public string Content { get; private set; }

        /// <summary>
        /// název
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// titulek
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// id
        /// </summary>
        public string Guid { get; set; }

        public GFETemplate(string content)
        {
            Content = content;
        }

        public GFETemplate(XmlElement element)
        {
            Content = element.OuterXml;
            InitFromAttributes(element.Attributes);
        }

        public GFETemplate(XElement e)
        {
            var reader = e.CreateReader();
            reader.MoveToContent();
            Content = reader.ReadOuterXml();
            InitFromAttributes(e.Attributes());
        }

        public GFETemplate(IEnumerable<XAttribute> attributes, string content)
        {
            Content = content;
            InitFromAttributes(attributes);
        }

        private void InitFromAttributes(IEnumerable<XAttribute> attributes)
        {
            foreach (var a in attributes)
            {
                switch (a.Name.LocalName)
                {
                    case "name":
                        Name = a.Value;
                        break;
                    case "title":
                        Title = a.Value;
                        break;
                    case "guid":
                        Guid = a.Value;
                        break;
                }
            }
        }
        private void InitFromAttributes(XmlAttributeCollection attributes)
        {
            foreach (XmlAttribute a in attributes)
            {
                switch (a.LocalName)
                {
                    case "name":
                        Name = a.Value;
                        break;
                    case "title":
                        Title = a.Value;
                        break;
                    case "guid":
                        Guid = a.Value;
                        break;
                }
            }
        }



        public GFEFormatTag Instantiate(GFEFormat f)
        {
            if (!(f.Native is IGFormatParser fp)) return null; // new List<GFEFormatTag>();

            var l_content = "<?xml version='1.0' encoding='utf-8'?><fragment>" + Content + "</fragment>\0";
            GUnsafeRepWrapper.Throw06Error(fp.parseContent(System.Text.Encoding.UTF8.GetBytes(l_content), Name ?? "unnamed_part", 0, out IGFormatTag tag));
            if (tag == null) return null; //nic nevratilo?
            var block = GFEFormatTag.Create(f.Root, tag);
            try
            {
                System.Diagnostics.Debug.Assert(block is GFEFormatGRFBlock && block.TagName == "block");
                System.Diagnostics.Debug.Assert(block.Children.Count == 1);
                return block.Children[0];
            }
            finally 
            {
                block.Dispose(); 
            }
        }

    }
}
