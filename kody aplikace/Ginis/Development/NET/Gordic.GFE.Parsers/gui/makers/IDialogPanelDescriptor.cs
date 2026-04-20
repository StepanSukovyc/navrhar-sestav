//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDialogPanelDescriptor.cs              </Name>
//    <Description> Deskriptor dialogových panelů                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Deskriptor dialogových panelů
    /// </summary>
    public interface IDialogPanelDescriptor
    {
        /// <value>
        /// Vrácí ID dialogového panelu
        /// </value>
        string ID { get; }

        /// <value>
        /// štítek dialogového panelu
        /// </value>
        string Label { get; set; }

        /// <summary>
        /// vnitřní dialogové panely (apř. pro stromy atd.)
        /// </summary>
        IEnumerable<IDialogPanelDescriptor> ChildDialogPanelDescriptors { get; }

        /// <value>
        /// objekt dialogového panelu
        /// </value>
        IDialogPanel DialogPanel { get; }
    }
}
