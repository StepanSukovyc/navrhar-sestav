//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.LFCommands.cs                          </Name>
//    <Description> příkazy vázaných souborů                                    </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-02-28                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.LinkedFiles
{
    /// <summary>
    /// příkazy vázaných souborů - odstranění položky
    /// </summary>
    class DeleteItem : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            LinkedFilesPad.Instance.DeleteSelectedItem();
        }
    }

    /// <summary>
    /// příkazy vázaných souborů - přidat obrázek
    /// </summary>
    class AddItemImage : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            LinkedFilesPad.Instance.AddItem(LFNodeType.image);
        }
    }


    /// <summary>
    /// příkazy vázaných souborů - stažení obrázku
    /// </summary>
    class DownloadItemImage : AbstractMenuCommand
    {
        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            LinkedFilesPad.Instance.DownloadSelectedItem();
        }
    }
}
