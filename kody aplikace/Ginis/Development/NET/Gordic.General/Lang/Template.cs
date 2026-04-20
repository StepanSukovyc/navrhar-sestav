//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.Template.cs                                  </Name>
//    <Description> Render template                                             </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-08-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Gordic.General
{
    /// <summary>
    /// Render template
    /// </summary>
    public static class Templates
    {
        static readonly Regex TemplateRe = new Regex("\\{\\{[a-zA-Z0-0_\\.]+\\}\\}", RegexOptions.Compiled);

        /// <summary>
        /// Simple template replacer
        /// </summary>
        /// <param name="content"></param>
        /// <param name="values"></param>
        /// <returns></returns>
        public static string RenderTemplate(StringBuilder content, Dictionary<string, Func<string>> values)
        {
            return values.Aggregate(
                content,
                (result, pair) =>
                {
                    var value = pair.Value();
                    return result.Replace($"{{{pair.Key}}}", value);
                }
            ).ToString();
        }

        /// <summary>
        /// Simple template replacer
        /// </summary>
        /// <param name="content"></param>
        /// <param name="values"></param>
        /// <returns></returns>
        public static string RenderTemplate(string content, Dictionary<string, Func<string>> values)
        {
            return TemplateRe.Replace(
                input: content,
                evaluator: new MatchEvaluator((match) =>
                {
                    var key = match.Value.Trim(new char[] { '{', '}' });
                    return match.Success && values.ContainsKey(key)
                        ? values[key]()
                        : match.Value;
                })
            );
        }
    }
}
