//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.PropertyPadCommands.cs                 </Name>
//    <Description> Příkazy tabulky vlastnosti                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-30                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Obnovení
    /// </summary>
    class PropertyPadResetCommand : AbstractMenuCommand
    {
        public override void Run()
        {
            try { PropertyPad.Grid.ResetSelectedProperty(); }
            catch (Exception e)
            {
                MessageService.ShowError(string.Join(" ", GResources.GetResourceText(29450388), GResources.GetResourceText(29450389) + ':', GResources.GetResourceText(29450390)) //RC 29450390 : Reset hodnota není platná, protože byly pozměněné jiné vlastností!
                                         + Environment.NewLine + e.Message);
            }
        }
    }
    /// <summary>
    /// Zobrazení nápovědy
    /// </summary>
    class PropertyPadShowDescriptionCommand : AbstractCheckableMenuCommand
    {
        public override bool IsChecked
        {
            get { return PropertyPad.Grid.HelpVisible; }
            set { PropertyPad.Grid.HelpVisible = value; }
        }

        public override void Run()
        {
            PropertyPad.Grid.HelpVisible = !PropertyPad.Grid.HelpVisible;
        }
    }
}
