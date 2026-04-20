//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Keyboard.cs                              </Name>
//    <Description> Indikace stisknutých tlačítek                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Utils;
using System;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.Utils
{
    /// <summary>
    /// Indikace stisknutých tlačítek
    /// </summary>
    public abstract class Keyboard
    {
        [Flags]
        enum KeyStates
        {
            None = 0,
            Down = 1,
            Toggled = 2
        }

        static KeyStates GetKeyState(Keys key)
        {
            KeyStates state = KeyStates.None;

            short retVal = NativeMethods.GetKeyState((int)key);

            //Je-li bit vyššího řádu 1, pak klávesa je stisknutá jinak ne
            if ((retVal & 0x8000) == 0x8000)
                state |= KeyStates.Down;

            //Pokud nejnižší bit má hodnotu 1, pak klávesa je přepnutá.
            if ((retVal & 1) == 1)
                state |= KeyStates.Toggled;

            return state;
        }

        /// <summary>
        /// Zjištění, zda daná klávesa je stisknutá
        /// </summary>
        /// <param name="key">Daná klávesa</param>
        /// <returns></returns>
        public static bool IsKeyDown(Keys key)
        {
            return KeyStates.Down == (GetKeyState(key) & KeyStates.Down);
        }

        /// <summary>
        /// Klávesa je přepnutá
        /// </summary>
        /// <param name="key">Daná klávesa</param>
        /// <returns></returns>
        public static bool IsKeyToggled(Keys key)
        {
            return KeyStates.Toggled == (GetKeyState(key) & KeyStates.Toggled);
        }
    }
}
