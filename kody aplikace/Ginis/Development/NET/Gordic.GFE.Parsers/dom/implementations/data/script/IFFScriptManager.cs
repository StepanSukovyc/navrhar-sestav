//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IScriptManager.cs                        </Name>
//    <Description> rozhraní objektů správců skriptů                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-18                                                  </Created>
//  </FileHeader>

using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    public interface IScriptOwner
    {
    }

    /// <summary>
    /// rozhraní objektů správců skriptů
    /// </summary>
    public interface IFFScriptManager
    {
        /// <summary>
        /// Nástroj pro práci se scripty
        /// </summary>
        GScriptEngine Engine { get; }
        /// <summary>
        /// příprava skriptu
        /// </summary>
        /// <param name="owner">Tag - vlastník skriptu</param>
        /// <param name="scriptid">Tag - identifikace skriptu</param>
        /// <param name="script">Skript</param>
        /// <param name="self">Objekt - vlastník skriptu</param>
        /// <param name="addItems"> </param>
        /// <returns></returns>
        GScript PrepareScript(IScriptOwner owner, string scriptid, string script, IScriptable self, bool addItems = true);

        /// <summary>
        /// spuštění skriptu
        /// </summary>
        void RunScript(GScript script);

    }
}
