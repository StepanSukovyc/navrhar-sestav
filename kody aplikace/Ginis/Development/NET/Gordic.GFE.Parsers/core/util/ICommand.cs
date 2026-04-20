//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ICommand.cs                            </Name>
//    <Description> Základní příkazové rozhraní.                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-02-08                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Základní příkazové rozhraní.
    /// </summary>
    public interface ICommand
    {
        /// <summary>
        /// Vlastník příkazu.
        /// </summary>
        object Owner { get; set; }

        /// <summary>
        /// Vyvolá příkaz.
        /// </summary>
        void Run();
        /// <summary>
        /// Zavolá se po změně vlastníka.
        /// </summary>
        event EventHandler OwnerChanged;
    }
}
