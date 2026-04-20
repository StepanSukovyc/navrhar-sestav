//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.InfoSectionViewCommands.cs             </Name>
//    <Description> příkazy sekce INFO                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.InfoSectionView
{
    /// <summary>
    /// Odstranění struktury ze seznamu otevřených struktur
    /// </summary>
    class RemoveAttribute : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { InfoSectionViewPad.Instance.RemoveActiveAttribute(); }
    }

    /// <summary>
    /// Odstranění struktury ze seznamu otevřených struktur
    /// </summary>
    class AddAttribute : AbstractMenuCommand
    {
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { /*InfoSectionViewPad.Instance.AddAttribute();*/ }
    }
}
