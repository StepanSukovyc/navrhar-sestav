//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GResLocalizer.cs                         </Name>
//    <Description> Lokalizace .gres souborů                                    </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2019-11-06                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Xml;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Lokalizace .gres souborů
    /// </summary>
    public class GResLocalizer
    {
        /// <summary>statický regulární výraz pro nahrazení gres:[assembly:]nnnnnnnn za resource texty</summary>
        private static readonly Regex m_oRegexGresReplacer = new Regex(@"(?<format>[gj])res:((?<ass>G[\.\w]*):)?(?<res>\d{1,8})");

        public static TextReader Localize(TextReader textReader, Assembly defaultResAssembly)
        {
            var s = textReader.ReadToEnd();
            s = ResReplacer(s, defaultResAssembly);
            return new StringReader(s);
        }

        public static TextReader Localize(string filename, Assembly defaultResAssembly)
        {
            string s = string.Empty;
            using (Stream stream = new FileStream(filename, FileMode.Open, FileAccess.Read))
            using (StreamReader reader = new StreamReader(stream))
                 s = reader.ReadToEnd();
            s = ResReplacer(s, defaultResAssembly);
            return new StringReader(s);
        }

        /// <summary>V predanem textu nahradi vsechny gres:[assembly:]nnnnnnnn za spravne texty</summary>
        /// <param name="input"></param>
        /// <param name="defaultResAssembly">výchozí assembly pro resx</param>
        /// <returns></returns>
        public static string ResReplacer(string input, Assembly defaultResAssembly)
        {
            if (string.IsNullOrWhiteSpace(input)) return input;
            return m_oRegexGresReplacer.Replace(input, new MatchEvaluator(new GResReplacer(defaultResAssembly).Replace));
        } // end methos

        /// <summary>třída pro vyhodnocení regulárních výrazů gres:[assembly:]nnnnnnnn za správné texty</summary>
        private class GResReplacer
        {

            /// <summary>výchozí assembly pro resx</summary>
            private readonly Assembly m_oAssembly = null;

            /// <summary>veřejný konstruktor</summary>
            /// <param name="assembly">výchozí assembly pro resx</param>
            public GResReplacer(Assembly assembly)
            {
                m_oAssembly = assembly;
            } // end method

            /// <summary>MatchEvalutator: náhrada gres; použito v metodě GWebPage.Render a JsHandler.ProcessRequest</summary>
            /// <param name="m">objekt reprezentující výskyt regulárního výrazu</param>
            /// <returns>text k nahrazení</returns>
            public string Replace(Match m)
            {
                try
                {
                    Assembly l_oAss = (m.Groups["ass"].Success ? Assembly.Load(m.Groups["ass"].Value) : (m_oAssembly /*?? HttpContext.Current.ApplicationInstance.GetType().BaseType.Assembly*/));
                    string l_sText = GResources.GetResourceText(l_oAss, Int32.Parse(m.Groups["res"].Value), throwOnMissing: false);
                    if (l_sText == null)
                        return m.Value + "m";
                    //if (m.Groups["format"].Value == "j")
                    //    return GWebPage.StrToJsSrc(l_sText, false);
                    return l_sText;
                }
                catch
                {
                    //                    GWebUserProcess.Current.WriteToLog(e); // zalogování výjimky, 
                    //28.5.2015 zakomentovano asi zpusobuje pady pri volani z handleru je session readonly, pokud se zaroven 
                    //   UP v session nenajde, pokusi se vytvorit a ulozit novy, coz zrejme muze zpusobit pad w3wp.exe na 
                    //   multithread pristup k session
                    return m.Value + "e";
                }
            } // end method

        } // end class
    }
}
