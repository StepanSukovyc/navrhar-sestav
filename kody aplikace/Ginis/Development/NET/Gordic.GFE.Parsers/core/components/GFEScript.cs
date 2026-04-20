//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEScript.cs                             </Name>
//    <Description> Script globální úrovnì                                      </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2010-07-13                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Script globální úrovnì
    /// </summary>
    public class GFEScript : GFEFormatTag
    {
        readonly string m_text;

        /// <summary>
        /// Text skriptu
        /// </summary>
        public string ScriptText { get { return m_text; } }

        internal GFEScript(GFEFormatRegion reg, Gordic.Report.Implementation.IGScript script, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatTag)script, dev)
        {
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(script.getScriptText(out m_text));
        }
    }
}
