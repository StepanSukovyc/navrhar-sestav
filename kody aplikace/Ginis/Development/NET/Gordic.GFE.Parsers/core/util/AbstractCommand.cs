//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractCommand.cs                       </Name>
//    <Description> Abstraktní implementace rozhraní <see cref="ICommand"/>.    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Abstraktní implementace rozhraní <see cref="ICommand"/>.
    /// </summary>
    public abstract class AbstractCommand : ICommand
    {
        object owner = null;
        /// <summary>
        /// Vlastník příkazu
        /// </summary>
        public virtual object Owner
        {
            get { return owner; }
            set
            {
                owner = value;
                OnOwnerChanged(EventArgs.Empty);
            }
        }

        /// <summary>
        /// Spuštění příkazu.
        /// </summary>
        public abstract void Run();

        /// <summary>
        /// Změna vlastníka příkazu
        /// </summary>
        /// <param name="e"></param>
        protected virtual void OnOwnerChanged(EventArgs e)
        {
            OwnerChanged?.Invoke(this, e);
        }

        /// <summary>
        /// Spouští se po změně vlastníka příkazu
        /// </summary>
        public event EventHandler OwnerChanged;
    }
}
