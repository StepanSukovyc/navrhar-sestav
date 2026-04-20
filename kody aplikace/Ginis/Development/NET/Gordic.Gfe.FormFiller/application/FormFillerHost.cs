//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.FormFillerHost.cs                     </Name>
//    <Description> Tato třída může hostit instanci FormFilleru uvnitř jiné AppDomain.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-22                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Reflection;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;

namespace Gordic.Gfe.FormFiller
{
    /// <summary>
    /// Tato třída může hostit instanci FormFilleru uvnitř jiné AppDomain.
    /// </summary>
    sealed class FormFillerHost
    {
        readonly AppDomain appDomain;
        CallHelper helper;

        enum FFInitStatus
        {
            None,
            CoreInitialized,
            DesktopInitialized,
            Busy,
            AppDomainUnloaded
        }

        FFInitStatus initStatus;
        ISynchronizeInvoke invokeTarget;
        /// <summary>
        /// Získá/Nastaví objekt pro synchronizací všech události ve vlákně.
        /// Výchozí hodnota NULL.
        /// </summary>
        public ISynchronizeInvoke InvokeTarget
        {
            get { return invokeTarget; }
            set { invokeTarget = value; }
        }

        /// <summary>
        /// Událost před rozběhnutím pracovního stolu.
        /// </summary>
        public event EventHandler BeforeRunDesktop;
        /// <summary>
        /// Událost p uvolění pracovního stolu.
        /// </summary>
        public event EventHandler DesktopClosed;

        /// <summary>
        /// Událost po načtení souboru uvnitř FormFiller.
        /// </summary>
        public event EventHandler<FileEventArgs> FileLoaded;

        /// <summary>
        /// Událost po uložení souboru uvnitř FormFiller.
        /// </summary>
        public event EventHandler<FileEventArgs> FileSaved;

        /// <summary>
        /// Sestavení prohlížeče
        /// </summary>
        internal static Assembly FFAssembly
        {
            get { return typeof(FormFillerHost).Assembly; }
        }

        /// <summary>
        /// Hostitel Prohlížeče ve stávajícím AppDomain.
		/// </summary>
        public FormFillerHost(AppDomain appDomain, StartupSettings startup)
        {
            if (startup == null)
                throw new ArgumentNullException("startup");
            this.appDomain = appDomain ?? throw new ArgumentNullException("appDomain");
            helper = (CallHelper)appDomain.CreateInstanceAndUnwrap(FFAssembly.FullName, typeof(CallHelper).FullName);
            helper.InitApplicationCore(new CallbackHelper(this), startup);
            initStatus = FFInitStatus.CoreInitialized;
        }

        /// <summary>
        /// Inicializuje pracovní plochu (vytvoří instanci MainForm, sestaví nabídku dle AddInTree apod.)
        /// a spustí pomocí dodaných nastavení.
        /// Tím se spustí nová smyčka pro pracovní stůl. Dle výchozího nastavení smyčka se
        /// se vytvoří v novém vlákně, ale nastavení lze změnit tak, aby se smyčka 
        /// vytvářela ve vlákně RunDesktop.
        /// V tomto případě, RunDesktop bude blokovat spuštění dokud se FormFiller neukončí!
        /// </summary>
        public void RunDesktop(DesktopSettings settings)
        {
            if (settings == null)
                throw new ArgumentNullException("settings");
            if (initStatus == FFInitStatus.CoreInitialized)
            {
                initStatus = FFInitStatus.Busy;
                helper.RunDesktop(settings);
                if (settings.RunOnNewThread)
                    initStatus = FFInitStatus.DesktopInitialized;
            }
            else
                throw new InvalidOperationException();
        }

        internal sealed class CallbackHelper : MarshalByRefObject
        {
            readonly FormFillerHost host;
            static readonly object[] emptyObjectArray = new object[0];

            private bool InvokeRequired { get { return host.invokeTarget != null && host.invokeTarget.InvokeRequired; } }

            public CallbackHelper(FormFillerHost host) { this.host = host; }

            private void Invoke(MethodInvoker method)
            {
                host.invokeTarget.BeginInvoke(method, emptyObjectArray);
            }

            private void Invoke(Action<string> method, string argument)
            {
                host.invokeTarget.BeginInvoke(method, new object[] { argument });
            }

            internal void BeforeRunDesktop()
            {
                if (InvokeRequired) { Invoke(BeforeRunDesktop); return; }
                host.initStatus = FFInitStatus.DesktopInitialized;
                host.BeforeRunDesktop?.Invoke(host, EventArgs.Empty);
            }

            internal void DesktopClosed()
            {
                if (InvokeRequired) { Invoke(DesktopClosed); return; }
                host.initStatus = FFInitStatus.CoreInitialized;
                host.DesktopClosed?.Invoke(host, EventArgs.Empty);
            }

            internal void FileLoaded(string fileName)
            {
                if (InvokeRequired) { Invoke(FileLoaded, fileName); return; }
                host.FileLoaded?.Invoke(host, new FileEventArgs(fileName, false));
            }

            internal void FileSaved(string fileName)
            {
                if (InvokeRequired) { Invoke(FileSaved, fileName); return; }
                host.FileSaved?.Invoke(host, new FileEventArgs(fileName, false));
            }
        }
    }
}
