//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IValidatable.cs                          </Name>
//    <Description> Pokud IViewContent implementuje danou třídu, pak lze obsah validovat</Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2021-12-01                                                  </Created>
//  </FileHeader>


namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Pokud IViewContent implementuje danou třídu, pak lze obsah validovat
    /// </summary>
    public interface IValidatable
    {
        /// <summary>
        /// Validace objektu
        /// </summary>
        bool Validate();
    }
}
