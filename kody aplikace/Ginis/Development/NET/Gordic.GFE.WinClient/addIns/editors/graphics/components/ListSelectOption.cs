//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SelectOption.cs                        </Name>
//    <Description> Položka výběru                                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-10-20                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.UndoRedoFramework;

namespace Gordic.GFE.WinClient.Editor
{
    class ListSelectOption : UndoRedoList<SelectOption>
    {
        public ListSelectOption(IUndoRedoManager manager)
            : base(manager)
        {
        }
    }
}
