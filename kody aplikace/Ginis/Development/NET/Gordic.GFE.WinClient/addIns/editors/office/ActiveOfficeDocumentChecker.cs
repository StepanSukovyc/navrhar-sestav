//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Editor.ActiveOfficeDocumentChecker.cs                  </Name>
//    <Description> Nastavuje control aktivní, pokud je aktivní office aplikace kde je dokument otevřen       </Description>
//    <Author>      Jan Hrabec                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-28                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers;
using Gordic.GFE.WinClient.Editor;

namespace Gordic.GFE.WinClient.addIns.editors.office
{
    /// <summary>
    /// Nastavuje control aktivní, pokud je aktivní office aplikace kde je dokument otevřen
    /// </summary>
    public class ActiveOfficeDocumentChecker : IDisposable
    {
        const int TICK_RATE = 500;
        private readonly IOfficeAppPointable _docOwner;
        private readonly Control _control;

        /// <param name="docOwner">vlastník office dokumentu</param>
        /// <param name="controlToFocus">kontrol který se focusne</param>
        public ActiveOfficeDocumentChecker(IOfficeAppPointable docOwner, Control controlToFocus)
        {
            _docOwner = docOwner;
            _control = controlToFocus;
        }

        Timer _timer = null;
        /// <summary>
        /// Spustí kontrolu focusu officu
        /// </summary>
        public void Start()
        {
            if (_timer != null)
                Dispose();

            _timer = new Timer();
            _timer.Interval = TICK_RATE;
            _timer.Enabled = true;
            _timer.Tick += FocusControlIfOfficeIsFocused;
        }

        private void FocusControlIfOfficeIsFocused(object sender, EventArgs e)
        {
            IntPtr hWnd = NativeMethods.GetForegroundWindow();
            if (hWnd == IntPtr.Zero || hWnd != _docOwner.DocumentAppPointer || _control.Focused)
                return;

            ThreadService.SafeThreadAsyncCall(() =>
            {
                _control?.Focus();
            });
        }

        /// <exclude/>
        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
