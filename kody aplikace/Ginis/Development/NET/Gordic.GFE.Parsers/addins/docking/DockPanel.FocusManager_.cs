//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockPanel.FocusManager.cs              </Name>
//    <Description> Rozhraní správce fokusu                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2013                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using System.Diagnostics.CodeAnalysis;

using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Gui;


namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Rozhraní správce fokusu
    /// </summary>
    interface IContentFocusManager
    {
        /// <summary>
        /// aktivace dokovatelného obsahu
        /// </summary>
        /// <param name="content">Dokovatelný obsah</param>
        void Activate(IDockContent content);
        /// <summary>
        /// Získání fokusu
        /// </summary>
        /// <param name="content">Dokovatelný obsah</param>
        void GiveUpFocus(IDockContent content);
        /// <summary>
        /// Pøidání do seznamu
        /// </summary>
        /// <param name="content">Dokovatelný obsah</param>
        void AddToList(IDockContent content);
        /// <summary>
        /// Odstranìní ze seznamu
        /// </summary>
        /// <param name="content">Obsah k odstranìní</param>
        void RemoveFromList(IDockContent content);
    }

    /// <summary>
    /// Doplnìní dokovacího okna
    /// </summary>
    partial class DockPanel
    {
        interface IFocusManager
        {
            void SuspendFocusTracking();
            void ResumeFocusTracking();
            bool IsFocusTrackingSuspended { get; }
            IDockContent ActiveContent { get; }
            DockPane ActivePane { get; }
            IDockContent ActiveDocument { get; }
            DockPane ActiveDocumentPane { get; }
        }

        class FocusManagerImpl : Component, IContentFocusManager, IFocusManager
        {
            class HookEventArgs : EventArgs
            {
                [SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
                public int HookCode;
                [SuppressMessage("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
                public IntPtr wParam;
                public IntPtr lParam;
            }

            class LocalWindowsHook : IDisposable
            {
                // vnitøní vlastnosti
                private IntPtr m_hHook = IntPtr.Zero;
                private Gordic.GFE.Parsers.Utils.NativeMethods.HookProc m_filterFunc = null;
                private HookType m_hookType;

                // delegát události
                public delegate void HookEventHandler(object sender, HookEventArgs e);

                // událost: HookInvoked 
                public event HookEventHandler HookInvoked;
                protected void OnHookInvoked(HookEventArgs e)
                {
                    if (HookInvoked != null)
                        HookInvoked(this, e);
                }

                public LocalWindowsHook(HookType hook)
                {
                    m_hookType = hook;
                    m_filterFunc = new Gordic.GFE.Parsers.Utils.NativeMethods.HookProc(this.CoreHookProc);
                }

                // výchozí funkce filtru
                public IntPtr CoreHookProc(int code, IntPtr wParam, IntPtr lParam)
                {
                    if (code < 0)
                        return Gordic.GFE.Parsers.Utils.NativeMethods.CallNextHookEx(m_hHook, code, wParam, lParam);

                    // umožòuje klientùm urèit, co dìlat
                    HookEventArgs e = new HookEventArgs();
                    e.HookCode = code;
                    e.wParam = wParam;
                    e.lParam = lParam;
                    OnHookInvoked(e);

                    return Gordic.GFE.Parsers.Utils.NativeMethods.CallNextHookEx(m_hHook, code, wParam, lParam);
                }

                // instalace
                public void Install()
                {
                    if (m_hHook != IntPtr.Zero)
                        Uninstall();

                    int threadId = Gordic.GFE.Parsers.Utils.NativeMethods.GetCurrentThreadId();
                    m_hHook = Gordic.GFE.Parsers.Utils.NativeMethods.SetWindowsHookEx(m_hookType, m_filterFunc, IntPtr.Zero, threadId);
                }

                // odinstalace
                public void Uninstall()
                {
                    if (m_hHook != IntPtr.Zero)
                    {
                        Gordic.GFE.Parsers.Utils.NativeMethods.UnhookWindowsHookEx(m_hHook);
                        m_hHook = IntPtr.Zero;
                    }
                }

                ~LocalWindowsHook()
                {
                    Dispose(false);
                }

                public void Dispose()
                {
                    Dispose(true);
                    GC.SuppressFinalize(this);
                }

                protected virtual void Dispose(bool disposing)
                {
                    Uninstall();
                }
            }

            LocalWindowsHook m_localWindowsHook;
            LocalWindowsHook.HookEventHandler m_hookEventHandler;

            public FocusManagerImpl(DockPanel dockPanel)
            {
                m_dockPanel = dockPanel;
                m_localWindowsHook = new LocalWindowsHook(HookType.WH_CALLWNDPROCRET);
                m_hookEventHandler = new LocalWindowsHook.HookEventHandler(HookEventHandler);
                m_localWindowsHook.HookInvoked += m_hookEventHandler;
                m_localWindowsHook.Install();
            }

            DockPanel m_dockPanel;
            public DockPanel DockPanel { get { return m_dockPanel; } }

            bool m_disposed = false;
            protected override void Dispose(bool disposing)
            {
                lock (this)
                {
                    if (!m_disposed && disposing)
                    {
                        if (m_localWindowsHook != null)
                            m_localWindowsHook.Dispose();

                        m_disposed = true;
                    }

                    base.Dispose(disposing);
                }
            }

            IDockContent m_contentActivating = null;
            IDockContent ContentActivating
            {
                get { return m_contentActivating; }
                set { m_contentActivating = value; }
            }

            public void Activate(IDockContent content)
            {
                if (IsFocusTrackingSuspended)
                {
                    ContentActivating = content;
                    return;
                }

                if (content.IsDisposed)
                    return;

                if (content == null)
                    return;
                DockContentHandler handler = content.DockHandler;
                if (handler.Form.IsDisposed)
                    return; // nemìlo by se sem dostat
                if (ContentContains(content, handler.ActiveWindowHandle))
                    win32.SetFocus(handler.ActiveWindowHandle);
                if (!handler.Form.ContainsFocus)
                    if (!handler.Form.SelectNextControl(handler.Form.ActiveControl, true, true, true, true))
                        // vzhledem k tomu, že formuláø DockContent není selektabilní, pak použijeme metodu SetFocus z Win32
                        win32.SetFocus(handler.Form.Handle);
            }

            List<IDockContent> m_listContent = new List<IDockContent>();
            List<IDockContent> ListContent { get { return m_listContent; } }

            public void AddToList(IDockContent content)
            {
                if (ListContent.Contains(content) || IsInActiveList(content))
                    return;

                ListContent.Add(content);
            }

            public void RemoveFromList(IDockContent content)
            {
                if (IsInActiveList(content))
                    RemoveFromActiveList(content);
                if (ListContent.Contains(content))
                    ListContent.Remove(content);
            }

            IDockContent m_lastActiveContent = null;
            IDockContent LastActiveContent
            {
                get { return m_lastActiveContent; }
                set { m_lastActiveContent = value; }
            }

            bool IsInActiveList(IDockContent content)
            {
                return !(content.DockHandler.NextActive == null && LastActiveContent != content);
            }

            void AddLastToActiveList(IDockContent content)
            {
                IDockContent last = LastActiveContent;
                if (last == content)
                    return;

                DockContentHandler handler = content.DockHandler;

                if (IsInActiveList(content))
                    RemoveFromActiveList(content);

                handler.PreviousActive = last;
                handler.NextActive = null;
                LastActiveContent = content;
                if (last != null)
                    last.DockHandler.NextActive = LastActiveContent;
            }

            void RemoveFromActiveList(IDockContent content)
            {
                if (LastActiveContent == content)
                    LastActiveContent = content.DockHandler.PreviousActive;

                IDockContent prev = content.DockHandler.PreviousActive;
                IDockContent next = content.DockHandler.NextActive;
                if (prev != null)
                    prev.DockHandler.NextActive = next;
                if (next != null)
                    next.DockHandler.PreviousActive = prev;

                content.DockHandler.PreviousActive = null;
                content.DockHandler.NextActive = null;
            }

            public void GiveUpFocus(IDockContent content)
            {
                DockContentHandler handler = content.DockHandler;
                if (!handler.Form.ContainsFocus)
                    return;

                if (IsFocusTrackingSuspended)
                    DockPanel.DummyControl.Focus();

                if (LastActiveContent == content)
                {
                    IDockContent prev = handler.PreviousActive;
                    if (prev != null)
                        Activate(prev);
                    else if (ListContent.Count > 0)
                        Activate(ListContent[ListContent.Count - 1]);
                }
                else if (LastActiveContent != null)
                    Activate(LastActiveContent);
                else if (ListContent.Count > 0)
                    Activate(ListContent[ListContent.Count - 1]);
            }

            static bool ContentContains(IDockContent content, IntPtr hWnd)
            {
                Control control = Control.FromChildHandle(hWnd);
                for (Control parent = control; parent != null; parent = parent.Parent)
                    if (parent == content.DockHandler.Form)
                        return true;

                return false;
            }

            int m_countSuspendFocusTracking = 0;
            public void SuspendFocusTracking()
            {
                m_countSuspendFocusTracking++;
                m_localWindowsHook.HookInvoked -= m_hookEventHandler;
            }

            public void ResumeFocusTracking()
            {
                if (m_countSuspendFocusTracking > 0)
                    m_countSuspendFocusTracking--;

                if (m_countSuspendFocusTracking == 0)
                {
                    if (ContentActivating != null)
                    {
                        Activate(ContentActivating);
                        ContentActivating = null;
                    }
                    m_localWindowsHook.HookInvoked += m_hookEventHandler;
                    if (!InRefreshActiveWindow)
                        RefreshActiveWindow();
                }
            }

            public bool IsFocusTrackingSuspended { get { return m_countSuspendFocusTracking != 0; } }

            //List<Msgs> msgs = new List<Msgs>();

            void HookEventHandler(object sender, HookEventArgs e)
            {
                Msgs msg = (Msgs)Marshal.ReadInt32(e.lParam, IntPtr.Size * 3);

                //if (!msgs.Contains(msg))
                //    msgs.Add(msg);

                if (msg == Msgs.WM_KILLFOCUS)
                {
                    IntPtr wParam = Marshal.ReadIntPtr(e.lParam, IntPtr.Size * 2);
                    DockPane pane = GetPaneFromHandle(wParam);
                    if (pane == null)
                        RefreshActiveWindow(msg);
                }
                else if (msg == Msgs.WM_SETFOCUS || msg == Msgs.WM_ACTIVATEAPP)
                    RefreshActiveWindow(msg);
            }

            DockPane GetPaneFromHandle(IntPtr hWnd)
            {
                Control control = Control.FromChildHandle(hWnd);

                IDockContent content = null;
                DockPane pane = null;
                for (; control != null; control = control.Parent)
                {
                    content = control as IDockContent;
                    if (content != null)
                        content.DockHandler.ActiveWindowHandle = hWnd;

                    if (content != null && content.DockHandler.DockPanel == DockPanel)
                        return content.DockHandler.Pane;

                    pane = control as DockPane;
                    if (pane != null && pane.DockPanel == DockPanel)
                        break;
                }

                return pane;
            }

            bool m_inRefreshActiveWindow = false;
            bool InRefreshActiveWindow { get { return m_inRefreshActiveWindow; } }

            void RefreshActiveWindow(Msgs msg = Msgs.WM_NULL)
            {
                SuspendFocusTracking();
                m_inRefreshActiveWindow = true;

                DockPane oldActivePane = ActivePane;
                IDockContent oldActiveContent = ActiveContent;
                IDockContent oldActiveDocument = ActiveDocument;

                SetActivePane(msg);
                SetActiveContent();
                SetActiveDocumentPane();
                SetActiveDocument();
                DockPanel.AutoHideWindow.RefreshActivePane();

                ResumeFocusTracking();
                m_inRefreshActiveWindow = false;

                if (oldActiveContent != ActiveContent)
                    DockPanel.OnActiveContentChanged(EventArgs.Empty);
                if (oldActiveDocument != ActiveDocument)
                    DockPanel.OnActiveDocumentChanged(EventArgs.Empty);
                if (oldActivePane != ActivePane)
                    DockPanel.OnActivePaneChanged(EventArgs.Empty);
            }

            DockPane m_activePane = null;
            public DockPane ActivePane { get { return m_activePane; } }

            void SetActivePane(Msgs msg = Msgs.WM_NULL)
            {
                IntPtr hwnd = win32.GetFocus();
                
                // pokud se fokus nedaøí získat, pak zùstaneme u naposledy aktivního okna
                if (hwnd == IntPtr.Zero && msg == Msgs.WM_ACTIVATEAPP)
                {
                    if (this.DockPanel != null)
                        if (this.DockPanel.Parent is IDesktop)
                            hwnd = (this.DockPanel.Parent as IDesktop).GetFocus();
                }

                DockPane value = GetPaneFromHandle(hwnd);
                if (m_activePane == value)
                    return;

                if (m_activePane != null)
                    m_activePane.SetIsActivated(false);

                m_activePane = value;

                if (m_activePane != null)
                    m_activePane.SetIsActivated(true);
            }

            IDockContent m_activeContent = null;
            public IDockContent ActiveContent { get { return m_activeContent; } }

            internal void SetActiveContent()
            {
                IDockContent value = ActivePane == null ? null : ActivePane.ActiveContent;

                if (m_activeContent == value)
                    return;

                if (m_activeContent != null)
                    m_activeContent.DockHandler.IsActivated = false;

                m_activeContent = value;

                if (m_activeContent != null)
                {
                    m_activeContent.DockHandler.IsActivated = true;
                    if (!DockHelper.IsDockStateAutoHide((m_activeContent.DockHandler.DockState)))
                        AddLastToActiveList(m_activeContent);
                }
            }

            DockPane m_activeDocumentPane = null;
            public DockPane ActiveDocumentPane { get { return m_activeDocumentPane; } }

            void SetActiveDocumentPane()
            {
                DockPane value = null;

                if (ActivePane != null && ActivePane.DockState == DockState.Document)
                    value = ActivePane;

                if (value == null && DockPanel.DockWindows != null)
                {
                    if (ActiveDocumentPane == null)
                        value = DockPanel.DockWindows[DockState.Document].DefaultPane;
                    else if (ActiveDocumentPane.DockPanel != DockPanel || ActiveDocumentPane.DockState != DockState.Document)
                        value = DockPanel.DockWindows[DockState.Document].DefaultPane;
                    else
                        value = ActiveDocumentPane;
                }

                if (m_activeDocumentPane == value)
                    return;

                if (m_activeDocumentPane != null)
                    m_activeDocumentPane.SetIsActiveDocumentPane(false);

                m_activeDocumentPane = value;

                if (m_activeDocumentPane != null)
                    m_activeDocumentPane.SetIsActiveDocumentPane(true);
            }

            IDockContent m_activeDocument = null;
            public IDockContent ActiveDocument { get { return m_activeDocument; } }

            void SetActiveDocument()
            {
                IDockContent value = ActiveDocumentPane == null ? null : ActiveDocumentPane.ActiveContent;

                if (m_activeDocument == value)
                    return;

                m_activeDocument = value;
            }
        }

        IFocusManager FocusManager { get { return m_focusManager; } }

        internal IContentFocusManager ContentFocusManager { get { return m_focusManager; } }

        internal void SaveFocus() { DummyControl.Focus(); }

        /// <summary>
        /// Aktivní obsah
        /// </summary>
        [Browsable(false)]
        public IDockContent ActiveContent { get { return FocusManager.ActiveContent; } }

        /// <summary>
        /// Aktivní podokno
        /// </summary>
        [Browsable(false)]
        public DockPane ActivePane { get { return FocusManager.ActivePane; } }

        /// <summary>
        /// Aktivní dokument
        /// </summary>
        [Browsable(false)]
        public IDockContent ActiveDocument { get { return FocusManager.ActiveDocument; } }

        /// <summary>
        /// Aktivní podokno dokumentu
        /// </summary>
        [Browsable(false)]
        public DockPane ActiveDocumentPane { get { return FocusManager.ActiveDocumentPane; } }

        static readonly object ActiveDocumentChangedEvent = new object();
        /// <summary>
        /// Událost na zmìnu aktivního dokumentu
        /// </summary>
        [LocalizedCategory("Vlastnost pozmìnìná")]
        [LocalizedDescription("Se uskuteèní po zmìnì vlastnosti ActiveDocument.")]
        public event EventHandler ActiveDocumentChanged
        {
            add { Events.AddHandler(ActiveDocumentChangedEvent, value); }
            remove { Events.RemoveHandler(ActiveDocumentChangedEvent, value); }
        }
        /// <summary>
        /// Volá se po zmìnì aktivního dokumentu
        /// </summary>
        /// <param name="e"></param>
        protected virtual void OnActiveDocumentChanged(EventArgs e)
        {
            EventHandler handler = (EventHandler)Events[ActiveDocumentChangedEvent];
            if (handler != null)
                handler(this, e);
        }

        static readonly object ActiveContentChangedEvent = new object();
        /// <summary>
        /// Událost na zmìnu aktivního obsahu
        /// </summary>
        [LocalizedCategory("Vlastnost pozmìnìná")]
        [LocalizedDescription("Se uskuteèní po zmìnì vlastnosti ActiveContentProperty.")]
        public event EventHandler ActiveContentChanged
        {
            add { Events.AddHandler(ActiveContentChangedEvent, value); }
            remove { Events.RemoveHandler(ActiveContentChangedEvent, value); }
        }
        /// <summary>
        /// Volá se po zmìnì aktivního obsahu
        /// </summary>
        /// <param name="e"></param>
        protected void OnActiveContentChanged(EventArgs e)
        {
            EventHandler handler = (EventHandler)Events[ActiveContentChangedEvent];
            if (handler != null)
                handler(this, e);
        }

        static readonly object ActivePaneChangedEvent = new object();
        /// <summary>
        /// Událost na zmìnu aktivního podokna
        /// </summary>
        [LocalizedCategory("Vlastnost pozmìnìná")]
        [LocalizedDescription("Se uskuteèní po zmìnì vlastnosti ActivePane.")]
        public event EventHandler ActivePaneChanged
        {
            add { Events.AddHandler(ActivePaneChangedEvent, value); }
            remove { Events.RemoveHandler(ActivePaneChangedEvent, value); }
        }
        /// <summary>
        /// Volá se po zmìnì aktivního podokna
        /// </summary>
        /// <param name="e"></param>
        protected virtual void OnActivePaneChanged(EventArgs e)
        {
            EventHandler handler = (EventHandler)Events[ActivePaneChangedEvent];
            if (handler != null)
                handler(this, e);
        }
    }
}
