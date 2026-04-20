//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GActivityModifier.cs                  </Name>
//    <Description> Defines methods for modifying activity metadata, such as setting custom tags, HTTP status codes, and marking</Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-15                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using static System.Net.WebRequestMethods;

namespace Gordic.General
{
    /// <summary>
    /// Defines methods for modifying activity metadata, such as setting custom tags, HTTP status codes, and marking
    /// failures.
    /// </summary>
    /// <remarks>Activity tags are serialized as bug - Tags and TagObjects are not serialized properly in .NET Framework.</remarks>
    public sealed class GActivityModifier
    {
        readonly Activity _Activity;

        public GActivityModifier(Activity activity)
        {
            _Activity = activity;
        }

        /// <summary>
        /// Set custom tag
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public void SetTag(string key, string value)
        {
            _Activity.SetTag(key, value);
        }

        /// <summary>
        /// Set HTTP status code
        /// </summary>
        /// <param name="statusCode"></param>
        public void SetHttpStatusCode(int statusCode)
        {
            _Activity.SetTag("vysledek_ext", statusCode.ToString());
        }

        /// <summary>
        /// Custom non-exception failure
        /// If you're not sure about exception type, do not use this method.
        /// Just throw exception.
        /// </summary>
        public void Fail(Exception ex)
        {
            if (ex == null)
            {
                _Activity.SetStatus(ActivityStatusCode.Error);
            }
            else
            {
                _Activity.SetStatus(ActivityStatusCode.Error, ex.ToString());
            }

            var (status, text) = HttpExceptionErrorAnalyzer.AnalyzeDetail(ex);
            _Activity.SetTag("failure_kb", HttpExceptionErrorAnalyzer.FormatKB(status));
            _Activity.SetTag("failure_text", text);
            _Activity.Stop();
        }
    }
}
