//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IDialogDatabaseble.cs                  </Name>
//    <Description> Rozhraní určitých aspektů dialogů spojených s DB            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-08-07                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Rozhraní určitých aspektů dialogů spojených s DB
    /// </summary>
    public interface IDialogDatabaseable
    {
        /// <summary>
        /// Zobrazení tlačítka new PID
        /// </summary>
        bool VisibleNewPid { get; }
        /// <summary>
        /// Povolení tlačítka new PID
        /// </summary>
        bool EnableNewPid { get; set; }
        /// <summary>
        /// Generování nového PID
        /// </summary>
        void NewPid();
    }
}
