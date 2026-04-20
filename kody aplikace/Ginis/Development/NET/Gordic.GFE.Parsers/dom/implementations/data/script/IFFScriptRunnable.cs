//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IScriptableRunner.cs                     </Name>
//    <Description> Spuštění scriptů                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-18                                                  </Created>
//  </FileHeader>

using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Spouštěč skriptů
    /// </summary>
    public interface IFFScriptRunnable
    {
        /// <summary>
        /// Správce spuštění scriptů
        /// </summary>
        IFFScriptManager ScriptManager { get; }
        ///// <summary>
        ///// Obsah skriptu onLoad
        ///// </summary>
        //string OnLoad { get; }
        ///// <summary>
        ///// Obsah skriptu onPrint
        ///// </summary>
        //string OnPrint { get; }
        ///// <summary>
        ///// Skript onEnter
        ///// </summary>
        //GScript OnEnter { get; }
        ///// <summary>
        ///// Skript onData
        ///// </summary>
        //GScript OnData { get; }
        ///// <summary>
        ///// Skript onEdit
        ///// </summary>
        //GScript OnEdit { get; }
        ///// <summary>
        ///// Skript onValidate
        ///// </summary>
        //GScript OnValidate { get; }
        ///// <summary>
        ///// Skript onClick
        ///// </summary>
        //GScript OnClick { get; }
        ///// <summary>
        ///// Spuštění obsahu skriptu "onLoad"
        ///// </summary>
        //void RunOnLoad();
        ///// <summary>
        ///// Spuštění obsahu skriptu "onData"
        ///// </summary>
        //void RunOnData();
        ///// <summary>
        ///// Spuštění obsahu skriptu "onEnter"
        ///// </summary>
        //void RunOnEnter();
        ///// <summary>
        ///// Spuštění obsahu skriptu "onPrint"
        ///// </summary>
        //void RunOnPrint();
        ///// <summary>
        ///// Spuštění skriptu onValidate
        ///// </summary>
        //void RunOnValidate();
        /// <summary>
        /// Spuštění skriptu onEdit
        /// </summary>
        void RunOnEdit();
    }
}
