//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.DocfrmProject.cs                      </Name>
//    <Description> Dočasná složka souborů projektu                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Windows.Forms;
using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.Report.Implementation;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Obsahuje informace o souboréch projektu
    /// </summary>
    class DocfrmFiller : Filler, ScriptManager.IScriptRegistrar
    {
        #region DefaultFiller
        /// <summary>
        /// vytvoření sekundarního pohledu na data
        /// </summary>
        /// <param name="dataFile">datový soubor</param>
        protected override void OpenedFile(string dataFile)
        {
            var v = new DocfrmView();
            v.Initialize(FileAgent.GetOrCreateOpenedFile(dataFile), this);

            PrimaryContents.Add(v);
            v.Open();
        }
        #endregion

        internal void BeginInvoke(MethodInvoker methodInvoker)
        {
            if (this.View?.PagePanel != null)
                this.View.PagePanel.BeginInvoke(methodInvoker);
            else
                methodInvoker();
        }

        public bool Navigate(string url)
        {
            if (Opener != null) url = Opener.GetUrlRedirect(url); else url = GetUrlRedirect(url);
            var uri = new Uri(url);
            //if (uri.Scheme == "report")
            //{
            //    if (rep != null)
            //    {
            //        ShowReport(rep, fragment: uri.Fragment.TrimStart('#'));
            //        return true;
            //    }

            //    Dictionary<string, string> additionalParams = new Dictionary<string, string>();
            //    if (string.IsNullOrEmpty(uri.Query) == false)
            //    {
            //        foreach (string par in uri.Query.Substring(1).Split('&'))
            //        {
            //            var sp = par.Split('=');
            //            if (sp.Length != 2) continue;
            //            additionalParams.Add(sp[0], Uri.UnescapeDataString(sp[1]));
            //        }
            //    }
            //    OpenReport(new GReportIdentity(uri.AbsolutePath), additionalParams, fragment: uri.Fragment.TrimStart('#'));
            //    return true;
            //}
            string l_toshow = uri.ToString();
            if (uri.Scheme == "file")
            {
                var l = uri.LocalPath.TrimStart('/');
                var f = Path.Combine(Path.GetDirectoryName(this.FileName ?? Opener.FileName), l);
                if (Path.GetExtension(f) == ".gfrm") { ShowFile(f, fragment: uri.Fragment.TrimStart('#')); return true; }
                l_toshow = f;
            }
            using (var p = System.Diagnostics.Process.Start(l_toshow))
            {
                if (p != null)
                {
                    try
                    {
                        p.WaitForInputIdle();
                    }
                    catch { }
                }
            }
            return false;
        }

        private void ShowFile(string f, string fragment)
        {
            StartFragment = fragment;
            Initialize(FileService.GetOrCreateOpenedFile(f));
        }

        #region IFiller
        [Browsable(false)]
        public override List<ProjectSection> ProjectSections
        {
            get
            {
                ThreadService.AssertMainThread();
                return base.ProjectSections;
            }
        }

        /// <summary>
        /// Koncovky souboru dle konfigurace
        /// </summary>
        /// <param name="key">Cesta ke konfigurační větví</param>
        /// <returns>Seznam obsahující koncovky dle konfigurace</returns>
        protected override List<string> GetExtensions(FillerExtensions key)
        {
            List<string> ext = new List<string>();
            switch (key)
            {
                case FillerExtensions.format:
                    ext = LocalGetExtensions("/FormFiller/Desktop/FormatFilter");
                    break;
                case FillerExtensions.data:
                    ext = LocalGetExtensions("/FormFiller/Desktop/OpenDataFilter");
                    break;
                case FillerExtensions.structure:
                    ext = LocalGetExtensions("/FormFiller/Desktop/OpenStructureFilter");
                    break;
                default:
                    break;
            }
            return ext;
        }
        List<string> LocalGetExtensions(string key)
        {
            List<string> result = new List<string>();
            AddInTreeNode addinTreeNode = AddInTree.GetTreeNode(key);
            if (addinTreeNode != null)
                foreach (Entity entity in addinTreeNode.Entities)
                {
                    string ext = entity.Properties.Get("extensions", "");
                    if (ext != "*.*" && ext.Length > 0)
                        result.AddRange(ext.Split(';'));
                }
            return result;
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                FileSaved -= DocfrmFileSaved;
            base.Dispose(disposing);
        }
        #endregion

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public DocfrmFiller()
            : base()
        {
            FileSaved += DocfrmFileSaved;
            history = new History(this);
            this.ScriptRegistrar = this;
        }

        void DocfrmFileSaved(object sender, FileNameEventArgs e)
        {
            FileAgent.RecentOpen.GetOrCreateLastFile(e.FileName);
        }

        #region IScriptRegistrar Members

        Dictionary<string, IScriptable> Gordic.GFE.Parsers.Dom.ScriptManager.IScriptRegistrar.ScriptItems
        {
            get
            {
                var ret = new Dictionary<string, IScriptable>() 
                    { 
                        { "window", new Window(this)} ,
                    };
                //if (m_registeredCustoms != null)
                //    foreach (KeyValuePair<string, IScriptable> kv in f.m_registeredCustoms)
                //        ret.Add(kv.Key, kv.Value);
                return ret;
            }
        }
        //Dictionary<string, IScriptable> m_registeredCustoms = null;
        ///// <summary>Registrace dalších tříd pro skripty</summary>
        //public void RegisterCustomClass(string className, IScriptable classInstance)
        //{
        //    if (m_registeredCustoms == null) m_registeredCustoms = new Dictionary<string, IScriptable>();
        //    m_registeredCustoms.Add(className, classInstance);
        //}
        private class Window : IScriptable
        {
            private DocfrmFiller f;

            public Window(DocfrmFiller f)
            {
                this.f = f;
            }

            internal GScriptEngine ScriptEngine { get { return f.ScriptEngine; } }

            int IScriptable.getProperty(string name, out IDataScriptable value)
            {
                switch (name)
                {
                    case "open":
                        value = new GScriptableMethod(ScriptEngine, name, Open);
                        return 0;
                    case "history":
                        value = new GScriptableObject(ScriptEngine, name, f.history);
                        return 0;
                    case "opener":
                        value = new GScriptableObject(ScriptEngine, name, new Window(f.Opener));
                        return 0;
                    case "submit":
                        value = new GScriptableMethod(ScriptEngine, name, Submit);
                        return 0;
                    default:
                        value = null;
                        return 1;
                }
            }

            int IScriptable.setProperty(string name, IDataScriptable value)
            {
                return 1;
            }

            private string _str(IDataScriptable s)
            {
                using (var v = new GDataScriptable(ScriptEngine, s))
                    return v.ToString();
            }
            public IDataScriptable Open(IDataScriptable[] args)
            {
                if (args.Length < 1) throw new GArgumentNullException();
                var url = _str(args[0]);
                var parent = args.Length >= 2 ? _str(args[1]) : "";

                DocfrmFiller w;
                switch (parent)
                {
                    case "_self":
                        w = f;
                        break;
                    default:
                        w = new DocfrmFiller() { Opener = f };
                        break;
                }
                f.BeginInvoke((MethodInvoker)delegate
                {
                    if (w.Navigate(url/*, gfe: f.m_gfe*/) && w != f)
                    {
                        /*f.Task.AddModalWin(w);*/
                    }
                });
                return null;
            }
            public IDataScriptable Submit(IDataScriptable[] args)
            {
                if (!(f.View is ISendHandler view)) return null;

                int i = 0;
                if (args.Length >= 1)
                    using (var a1 = new GDataScriptable(ScriptEngine, args[0]))
                    {
                        i = a1.ToInt();
                    }

                view.Send(i, new DocfrmSender());
                return null;
            }

        }

        private class History : IScriptable
        {
            internal GScriptEngine ScriptEngine { get { return f.ScriptEngine; } }

            int IScriptable.getProperty(string name, out IDataScriptable value)
            {
                switch (name)
                {
                    case "back":
                        value = new GScriptableMethod(ScriptEngine, name, Back);
                        return 0;
                    case "forward":
                        value = new GScriptableMethod(ScriptEngine, name, Forward);
                        return 0;
                    case "go":
                        value = new GScriptableMethod(ScriptEngine, name, Go);
                        return 0;
                    case "length":
                        value = ScriptEngine.GetScriptableNumber(name, Count);
                        return 0;
                    default:
                        value = null;
                        return 1;
                }
            }

            int IScriptable.setProperty(string name, IDataScriptable value)
            {
                return 1;
            }

            public IDataScriptable Back(IDataScriptable[] args)
            {
                f.BeginInvoke((MethodInvoker)delegate { this.Back(); });
                return null;
            }
            public IDataScriptable Forward(IDataScriptable[] args)
            {
                f.BeginInvoke((MethodInvoker)delegate { this.Back(); });
                return null;
            }
            public IDataScriptable Go(IDataScriptable[] args)
            {
                int i;
                using (var a1 = new GDataScriptable(ScriptEngine, args[0]))
                {
                    i = a1.ToInt();
                }
                f.BeginInvoke((MethodInvoker)delegate { this.Go(Current + i); });
                return null;
            }

            DocfrmFiller f;
            int current = -1;
            struct Hist
            {
                public string url;
                public Hist(string url)
                {
                    this.url = url;
                }
            }
            List<Hist> urls = new List<Hist>();

            public History(DocfrmFiller f)
            {
                this.f = f;
            }

            public void Add(string url)
            {
                if (m_lock) return;
                current++;
                if (Current < Count)
                    urls.RemoveRange(Current, Count - Current);
                urls.Add(new Hist(url));
            }
            public string CurrentUrl
            {
                get { return urls[current].url; }
            }
            public int Current
            {
                get { return current; }
            }
            public int Count
            {
                get { return urls.Count; }
            }

            public bool First { get { return Current <= 0; } }

            public bool Last { get { return Current >= Count - 1; } }

            internal void Forward()
            {
                if (Last) return;
                Go(Current + 1);
            }

            internal void Back()
            {
                if (First) return;
                Go(Current - 1);
            }

            internal void Reload()
            {
                Go(Current);
            }
            private void Go(int p)
            {
                Lock();
                current = p;
                var h = urls[p];
                f.Navigate(h.url/*, h.rep*/);
                Unlock();
            }

            bool m_lock = false;
            private void Lock() { m_lock = true; }
            private void Unlock() { m_lock = false; }
        }


        private readonly History history;
        /// <summary/>
        public DocfrmFiller Opener { get; set; }

        #endregion
    }
}
