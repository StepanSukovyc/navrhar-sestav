//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.STAThreadCaller.cs                       </Name>
//    <Description> Pomocná třída pro volání metod hlavního vlákna.             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Pomocná třída pro volání metod hlavního vlákna.
    /// </summary>
    public sealed class STAThreadCaller
    {
        Control ctl;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="ctl">Ovladač pro vytvoření vlákna</param>
        public STAThreadCaller(Control ctl)
        {
            if (ctl != null)
            {
                this.ctl = ctl;
                ctl.CreateControl();// zajištění vytvoření ovladače aby se dalo volat metodu Invoke()
                //CreateControl() ale ne vždy vytvoří Handle, takže pro jistotu zjistíme Hanlde
                IntPtr handle = ctl.Handle;
            }
            else 
                LoggingService.Error(GResources.GetResourceText(29450276) + " STAThreadCalleru!"); //RC 29450276 : prázdný ovladač
        }

        /// <summary>
        /// Volání metody
        /// </summary>
        /// <param name="method">Volaná metoda</param>
        /// <param name="arguments">Parametry metody</param>
        /// <returns></returns>
        public object Call(Delegate method, object[] arguments)
        {
            try
            {
                if (method != null)
                {
                    if (!ctl.IsDisposed)
                        return ctl.Invoke(method, arguments);
                }
                else
                    LoggingService.Error(GResources.GetResourceText(29450277)); //RC 29450277 : metoda je prázdná!
            }
            catch { }

            return null;
        }

        /// <summary>
        /// Začátek volání metody
        /// </summary>
        /// <param name="method">Volaná metoda</param>
        /// <param name="arguments">Parametry metody</param>
        public void BeginCall(Delegate method, object[] arguments)
        {
            if (method != null)
            {
                if (ctl.IsHandleCreated && !ctl.IsDisposed)
                    ctl.BeginInvoke(method, arguments);
            }
            else
                LoggingService.Error(GResources.GetResourceText(29450277)); //RC 29450277 : metoda je prázdná!
        }
    }
}
