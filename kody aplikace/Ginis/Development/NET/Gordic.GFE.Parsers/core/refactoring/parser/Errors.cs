//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Errors.cs                                </Name>
//    <Description> delegát syntaxické/semantické chyby                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Text;

namespace Gordic.GFE.Parsers.Refactoring.Parser
{
    /// <summary>
    /// delegát syntaxické/semantické chyby
    /// </summary>
    /// <param name="line"></param>
    /// <param name="col"></param>
    /// <param name="n"></param>
    public delegate void ErrorCodeProc(int line, int col, int n);
    /// <summary>
    /// delegát uživatelské chyby
    /// </summary>
    /// <param name="line"></param>
    /// <param name="col"></param>
    /// <param name="msg"></param>
    public delegate void ErrorMsgProc(int line, int col, string msg);

    /// <summary>
    /// třída chyb lexeru
    /// </summary>
    public class Errors
    {
        int count = 0;
        /// <summary>
        /// syntaxická chyba
        /// </summary>
        public ErrorCodeProc SynErr;
        /// <summary>
        /// semanticá chyba
        /// </summary>
        public ErrorCodeProc SemErr;
        /// <summary>
        /// uživatelská chyba
        /// </summary>
        public ErrorMsgProc Error;
        StringBuilder errorText = new StringBuilder();

        /// <summary>
        /// text chyby
        /// </summary>
        public string ErrorOutput { get { return errorText.ToString(); } }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public Errors()
        {
            SynErr = new ErrorCodeProc(DefaultCodeError);  // syntaxické chyby
            SemErr = new ErrorCodeProc(DefaultCodeError);  // semantické chyby
            Error = new ErrorMsgProc(DefaultMsgError);    // uživatelské chyby
        }
        /// <summary>
        /// počet detekovaných chyb
        /// </summary>
        public int Count { get { return count; } }

        void DefaultCodeError(int line, int col, int n)
        {
            errorText.AppendLine(String.Format(string.Join(" ", "--", GResources.GetResourceText(29450229), "{0}", GResources.GetResourceText(29450230), "{1}: {2}"), line, col, n)); //RC 29450230 : sloupec
            count++;
        }
        void DefaultMsgError(int line, int col, string s)
        {
            errorText.AppendLine(String.Format(string.Join(" ", "--", GResources.GetResourceText(29450229), "{0}", GResources.GetResourceText(29450230), "{1}: {2}"), line, col, s)); //RC 29450230 : sloupec
            count++;
        }
    }
}
