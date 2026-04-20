//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEList.cs                                  </Name>
//    <Description> Seznamy pro GFE GFE parsery                 </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.UndoRedoFramework;
using System.Diagnostics;
using Gordic.GFE.Parsers.Utils;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// tøída øetìzcových relací
    /// </summary>
    [ComVisible(false)]
    public class GFEList : Dictionary<string,string>
    {
        /// <summary>
        /// prázdný konstruktor tøídy
        /// </summary>
        public GFEList() { }

        /// <summary>
        /// konstruktor tøídy dle originálního slovníku
        /// </summary>
        /// <param name="orig">slovník, dle kterého se vytváøí daný</param>
        public GFEList(GFEList orig)
        {
            Clear();
            foreach (KeyValuePair<string, string> item in orig)
                if (!ContainsKey(item.Key))
                    Add(item.Key, item.Value);
        }

        /// <summary>
        /// Získání výchozí hodnoty
        /// </summary>
        /// <param name="key">klíè</param>
        /// <param name="def">výchozí hodnota</param>
        /// <returns>
        /// Pokud daný klíè <paramref name="key"/> v seznamu není, 
        /// pak na výstupu je výchozí hodnota <paramref name="def"/>
        /// </returns>
        public string GetValueDefault(string key, string def = "")
        {
            if (TryGetValue(key, out string o) == false)
                o = def;
            return o ?? def;
        }

        /// <summary>
        /// Získání výchozí hodnoty
        /// </summary>
        /// <param name="key">klíè</param>
        /// <param name="def">výchozí hodnota</param>
        /// <returns>
        /// Pokud daný klíè <paramref name="key"/> v seznamu není, 
        /// pak na výstupu je výchozí hodnota <paramref name="def"/>
        /// </returns>
        public void SetValueDefault(string key, string def = "")
        {
            if (!string.IsNullOrEmpty(key))
            {
                if (this.ContainsKey(key))
                    this[key] = def;
                else
                    this.Add(key, def);
            }
        }
    }

    /// <summary>
    /// seznam relací INFO sekce sestav
    /// </summary>
    [ComVisible(false)]
    public class GFEInfoList : GFEList
    {
        /// <summary>
        /// prázdný konstruktor tøídy
        /// </summary>
        internal GFEInfoList() { }
        /// <summary>
        /// konstruktor tøídy dle daného rozhraní relací
        /// </summary>
        /// <param name="l"></param>
        internal GFEInfoList(Gordic.Report.Implementation.IGInfoList l)
        {
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(l.getCount(out int c));
            for (int i = 0; i < c; i++)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(l.getItem(i, out string l_name, out string l_value));
                base.Add(l_name, l_value);
            }
        }
    }

    /// <summary>
    /// seznam relací atributù
    /// </summary>
    [ComVisible(false)]
    public class GFEAttrList : GFEList, IUndoRedoMember, IDictionary<string, string>, ICloneable
    {
        #region IUndoRedoMember
        void IUndoRedoMember.OnCommit(object change)
        {
            if (manager != null)
            {
                Debug.Assert(change != null);
                ((Change<Dictionary<string, string>>)change).NewState = dict;
            }
        }
        void IUndoRedoMember.OnUndo(object change)
        {
            if (manager != null)
            {
                Debug.Assert(change != null);
                dict = ((Change<Dictionary<string, string>>)change).OldState;
                ByDictionary();
            }
        }
        void IUndoRedoMember.OnRedo(object change)
        {
            if (manager != null)
            {
                Debug.Assert(change != null);
                dict = ((Change<Dictionary<string, string>>)change).NewState;
                ByDictionary();
            }
        }
        #endregion

        #region ICloneable
        /// <summary>
        /// klonování
        /// </summary>
        /// <returns></returns>
        public virtual object Clone()
        {
            return new GFEAttrList(this);
        }
        #endregion

        /// <summary>
        /// hodnota položky dle indexu
        /// </summary>
        /// <param name="key">index položky</param>
        /// <returns></returns>
        public new string this[string key]
        {
            get
            {
                if (base.ContainsKey(key))
                    return base[key];
                return string.Empty;
            }
            set
            {
                EnumList(true);
                base[key] = value;
                dict[key] = value;
            }
        }
        /// <summary>
        /// hodnota položky dle indexu
        /// </summary>
        /// <param name="index">index položky</param>
        /// <returns></returns>
        public string this[int index]
        {
            get
            {
                string[] arr = new string[Keys.Count];
                base.Keys.CopyTo(arr, 0);
                return arr[index];
            }
            set
            {
                EnumList(true);
                string[] arr = new string[Keys.Count];
                base[arr[index]] = value;
                dict[arr[index]] = value;
            }
        }
        /// <exclude/>
        public new bool Remove(string key)
        {
            EnumList(true);
            dict.Remove(key);
            return base.Remove(key);
        }
        /// <summary>
        /// pøetížení kvùli Undo/Redo
        /// </summary>
        public new void Clear()
        {
            EnumList(false);
            dict.Clear();
            base.Clear();
        }

        protected Dictionary<string, string> dict;
        IUndoRedoManager manager;

        /// <summary>
        /// prázdný konstruktor tøídy
        /// </summary>
        public GFEAttrList()
            : base()
        {
            dict = new Dictionary<string, string>();
        }

        internal string Loc = null;

        /// <summary>
        /// konstruktor tøídy dle daného rozhraní relací
        /// </summary>
        /// <param name="l"></param>
        public GFEAttrList(Gordic.Report.Implementation.IGAttrList l)
            : this()
        {
            Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(l.getCount(out int c));
            for (int i = 0; i < c; i++)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(l.getItem(i, out string l_name, out string l_value));
                switch (l_name)
                {
                    case "__loc": Loc = l_value; break;
                    default: base.Add(l_name, l_value); break;
                }
            }
            ByOriginal();
        }

        /// <summary>
        /// vytvoøení nové instance tøídy se správcem Undo/Redo operací
        /// </summary>
        /// <param name="manager">správce Undo/Redo operací</param>
        public GFEAttrList(IUndoRedoManager manager)
            : this()
        {
            this.manager = manager;
        }

        /// <summary>
        /// vytvoøení nové instance tøídy dle stávající
        /// </summary>
        /// <param name="list"></param>
        public GFEAttrList(GFEAttrList list)
            : this(list?.manager)
        {
            foreach (var item in list)
                base.Add(item.Key, item.Value);

            ByOriginal();
        }

        /// <summary>
        /// vytvoøení nové instance tøídy dle stávající
        /// </summary>
        /// <param name="list"></param>
        /// <param name="manager">správce Undo/Redo operací</param>
        public GFEAttrList(IUndoRedoManager manager, Dictionary<string, string> list)
            : this(manager)
        {
            foreach (var item in list)
                base.Add(item.Key, item.Value);

            ByOriginal();
        }

        /// <summary>
        /// synchronizace seznamù
        /// </summary>
        public void SynchronizeByOrigin()
        {
            ByOriginal();
        }

        void ByOriginal()
        {
            EnumList(false);
            dict = new Dictionary<string, string>(this);
        }
        void ByDictionary()
        {
            base.Clear();
            foreach (var item in dict)
                base.Add(item.Key, item.Value);
        }

        private void EnumList(bool copyItems)
        {
            if (manager != null)
                if (manager.CurrentCommand != null
                    && !manager.CurrentCommand.ContainsKey(this))
                {
                    Change<Dictionary<string, string>> change = new Change<Dictionary<string, string>>
                    {
                        OldState = dict
                    };
                    manager.CurrentCommand[this] = change;
                    if (copyItems)
                        dict = new Dictionary<string, string>(dict);
                    else
                        dict = new Dictionary<string, string>();
                }
        }
    }

    /// <summary>
    /// seznam skriptù
    /// </summary>
    [ComVisible(false)]
    public class GFEScriptList : GFEAttrList
    {
        #region ICloneable
        /// <summary>
        /// klonování
        /// </summary>
        /// <returns></returns>
        public override object Clone()
        {
            return new GFEScriptList(this);
        }
        #endregion        

        /// <summary>
        /// indikuje, jestli existuje alespoò jedná neprázdná hodnota
        /// </summary>
        public bool IsEmpty { get { return !this.ExistsByValue(val => !string.IsNullOrEmpty(val)); } }
        /// <summary>
        /// prázdný konstruktor tøídy
        /// </summary>
        public GFEScriptList()
            : base()
        {
            dict = new Dictionary<string, string>();
        }

        /// <summary>
        /// konstruktor tøídy dle daného rozhraní relací
        /// </summary>
        /// <param name="l"></param>
        public GFEScriptList(Gordic.Report.Implementation.IGAttrList l)
            : base(l)
        {
        }

        /// <summary>
        /// vytvoøení nové instance tøídy se správcem Undo/Redo operací
        /// </summary>
        /// <param name="manager">správce Undo/Redo operací</param>
        public GFEScriptList(IUndoRedoManager manager)
            : base(manager)
        {
        }

        /// <summary>
        /// vytvoøení nové instance tøídy dle stávající
        /// </summary>
        /// <param name="list"></param>
        public GFEScriptList(GFEScriptList list)
            : base(list)
        {
        }

        /// <summary>
        /// volá se po zmìnì skriptù
        /// </summary>
        public event EventHandler ScriptChanged;
        /// <summary>
        /// zmìna skriptù
        /// </summary>
        public void OnScriptChanged()
        {
            ScriptChanged?.Invoke(this, EventArgs.Empty);
        }
    }
}
