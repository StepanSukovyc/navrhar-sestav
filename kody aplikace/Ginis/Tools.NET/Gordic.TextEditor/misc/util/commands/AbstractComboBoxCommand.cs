//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.TextEditor.AbstractComboBoxCommand.cs                </Name>
//    <Description> příkaz rozevíracího seznamu                                 </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2015-01-23                                                  </Created>
//  </FileHeader>

namespace Gordic.TextEditor.Misc.Util
{
    /// <summary>
    /// příkaz rozevíracího seznamu
    /// </summary>
    public abstract class AbstractComboBoxCommand : AbstractCommand, IComboBoxCommand
{
    bool isEnabled = true;
    /// <summary>
    /// příkaz je dostupný
    /// </summary>
    public virtual bool IsEnabled
    {
        get { return isEnabled; }
        set { isEnabled = value; }
    }

    /// <summary>
    /// spuštění příkazu
    /// </summary>
    public override void Run() { }
}
}
