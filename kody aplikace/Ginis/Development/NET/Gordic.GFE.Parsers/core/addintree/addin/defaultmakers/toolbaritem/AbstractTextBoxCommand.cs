//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractTextBoxCommand.cs                </Name>
//    <Description> Příkazy s textovým polem                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Příkazy s textovým polem
    /// </summary>
    public abstract class AbstractTextBoxCommand : AbstractCommand, ITextBoxCommand
    {
        bool isEnabled = true;
        /// <summary>
        /// Indikuje dostupnost příkazu
        /// </summary>
        public virtual bool IsEnabled
        {
            get { return isEnabled; }
            set { isEnabled = value; }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { }
    }
}
