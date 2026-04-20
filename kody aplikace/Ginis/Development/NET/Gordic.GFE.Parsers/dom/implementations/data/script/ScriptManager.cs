//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ScriptManager.cs                         </Name>
//    <Description> Manager skriptů. Vázaný na konkrétní ScriptEngine           </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-07                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.General;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Manager skriptů. Vázaný na konkrétní ScriptEngine
    /// </summary>
    public class ScriptManager : IFFScriptManager, IDisposable
    {        
        //------------------------------------------------------------------
        private IFiller m_filler;
        private GScriptEngine m_ScriptEngine;
        ///<summary>Script Engine</summary>
        public GScriptEngine Engine
        {
            get { return m_ScriptEngine; }
        }


        //------------------------------------------------------------------
        private IScriptable m_FormatScript;
        ///<summary>objekt pro skriptování globálního objektu "format"</summary>
        public IScriptable FormatScript
        {
            get { return m_FormatScript; }
            set { m_FormatScript = value; }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(Core.GFEFormat.MemoryDebugLog, $"{GetType()} Dispose {disposing} (engine={m_ScriptEngine?.GetType()}){GNativeStringCache.DebugString(m_ScriptEngine)}");
#endif
            if (m_ScriptEngine != null) { m_ScriptEngine.Dispose(); m_ScriptEngine = null; }
        }
        ~ScriptManager() { Dispose(false); }
        public interface IScriptRegistrar
        {
            Dictionary<string, IScriptable> ScriptItems { get; }
        }
        public IScriptRegistrar ScriptRegistrar { get { return m_filler.ScriptRegistrar; } }

        Dictionary<string, IScriptable> ScriptItems
        {
            get
            {
                if (ScriptRegistrar != null) return ScriptRegistrar.ScriptItems;
                return new Dictionary<string, IScriptable>();
            }
        }

        internal GScriptBase __Just_Running = null;
        private Queue<Action> __Done_Queue = new Queue<Action>();

        public void RunWhenDone(Action p)
        {
            System.Diagnostics.Debug.Assert(__Just_Running != null);
            __Done_Queue.Enqueue(p);
        }

        /// <summary>
        /// spuštění skriptu
        /// </summary>
        public void RunScript(GScript script)
        {
            try
            {
                System.Diagnostics.Debug.Assert(__Just_Running == null);
                __Just_Running = script;
                script.Run();
                __Just_Running = null;
            }
            catch (Gordic.Report.Implementation.GScriptException x)
            {
                __Just_Running = null;
                Gordic.GFE.Parsers.Core.Services.ServiceManager.MessageService.ShowError(x, GResources.GetResourceText(5)); //RC 5 : Skript formuláře selhal
            }
            catch (Gordic.Report.Interface.GReportException x)
            {
                __Just_Running = null;
                Gordic.GFE.Parsers.Core.Services.ServiceManager.MessageService.ShowError(x, null);
            }
            finally
            {
                while (__Done_Queue.Count > 0) __Done_Queue.Dequeue().Invoke();
            }
        }
        /// <summary>
        /// spuštění skriptu
        /// </summary>
        public GDataScriptable RunExpression(GScriptExpression script)
        {
            try
            {
                System.Diagnostics.Debug.Assert(__Just_Running == null);
                __Just_Running = script;
                var r = script.Evaluate();
                __Just_Running = null;
                return r;
            }
            catch (Gordic.Report.Implementation.GScriptException x)
            {
                __Just_Running = null;
                Gordic.GFE.Parsers.Core.Services.ServiceManager.MessageService.ShowError(x, GResources.GetResourceText(5)); //RC 5 : Skript formuláře selhal
            }
            catch (Gordic.Report.Interface.GReportException x)
            {
                __Just_Running = null;
                Gordic.GFE.Parsers.Core.Services.ServiceManager.MessageService.ShowError(x, null);
            }
            finally
            {
                while (__Done_Queue.Count > 0) __Done_Queue.Dequeue().Invoke();
            }
            return null;
        }

        public GScript PrepareScript(IScriptOwner owner, string scriptid, string script, IScriptable self, bool addItems = true)
        {
            var items = ScriptItems;
            items.Add("self", self);
            if (FormatScript != null)
                items.Add("format", FormatScript);

            if (addItems && self is IDefaultDataBound di)
                AddRegions(script, di.DataRow, di.DataManager, items, di.Page);

            var s = Engine.CreateScript(Preprocess(script, items));
            s.Items = items;
            s.Owner = owner;
            s.Id = scriptid;
            return s;
        }

        public GScriptExpression PrepareExpression(IScriptOwner owner, string scriptid, string expr, System.Data.DataRow row, DefaultDataManager dm, IPage page = null)
        {
            var items = ScriptItems;
            AddRegions(expr, row, dm, items, page);

            var s = Engine.CreateExpression(Preprocess(expr, items));
            s.Items = items;
            s.Owner = owner;
            s.Id = scriptid;
            return s;
        }

        private string Preprocess(string script, Dictionary<string, IScriptable> items)
        {
            //preprocess (TOTAL-SUM)
            while (true)
            {
                var fn = "TOTAL-SUM";
                var i = script.IndexOf(fn);
                if (i < 0) break;
                var j = i - 1;
                if (script[j] != '.') break;
                while (Char.IsLetterOrDigit(script, j - 1)) j--;
                var reg = script.Substring(j, i - j - 1);
                if (!(items[reg] is GScriptDataRow row)) break;

                var k = i + fn.Length;
                if (script[k] != '(') break;
                var ni = ++k;
                while (script[k] != ')') k++;
                var name = script.Substring(ni, k - ni);
                //if (row.GetItemType(name) != typeof(decimal)) break;

                var id = "__c" + row.ComputedValues.Count.ToString();
                row.ComputedValues.Add(id, delegate { return row.ComputeTotalSum(name); });

                script = script.Substring(0, i) + id + script.Substring(k + 1);
            }
            return script;
        }

        internal void AddRegions(string text, System.Data.DataRow row, DefaultDataManager dm, Dictionary<string, IScriptable> items, IPage page)
        {
            while (row != null)
            {
                var reg = row.Table.TableName;
                //if (text.Contains(reg + ".")) //MAL oblasti pridam vzdy. Muze na ne byt nejaky neprimy odkaz, napr. predani parametrem do funkce...
                {
                    items.Add(reg, new GScriptDataRow(row, this, dm, page));
                }
                if (row.Table.ParentRelations.Count < 1) break;
                row = row.GetParentRow(row.Table.ParentRelations[0]);
            }
            if (text.Contains("ROOT.") && items.ContainsKey("ROOT") == false)
                items.Add("ROOT", new GScriptDataRow(dm.RootRow, this, dm, page));
        }

        private class GScriptDataRow : IScriptable
        {
            private ScriptManager manager;
            private System.Data.DataRow row;
            private DefaultDataManager dm;
            readonly IPage page;
            public GScriptDataRow(System.Data.DataRow row, ScriptManager manager, DefaultDataManager dm, IPage page)
            {
                this.row = row;
                this.manager = manager;
                this.dm = dm;
                this.page = page;
            }

            public Dictionary<string, Func<object>> ComputedValues { get; internal set; } = new Dictionary<string, Func<object>>();

            //public Type GetItemType(string dataName)
            //{
            //    var dataCol = row.Table.Columns[dataName];
            //    return dataCol?.DataType;
            //}

            internal decimal ComputeTotalSum(string name)
            {
                decimal sum = 0;

                var tbl = row.Table;
                int from = tbl.Rows.Count;
                var dataCol = tbl.Columns[name];
                while (--from >= 0)
                {
                    var val1 = tbl.Rows[from][dataCol];
                    if (val1.GetType() != typeof(Decimal)) continue;
                    sum += (decimal)val1;
                }
                return sum;
            }

            int IScriptable.getProperty(string name, out IDataScriptable value)
            {
                //GScriptDataRow jednou predany i kdyz se ulozit do Python globalni promenne, tak porad ma referenci a GC ho nesezere.
                //var ccw = System.Runtime.InteropServices.Marshal.GetIUnknownForObject(this);
                //var ccw_rc = System.Runtime.InteropServices.Marshal.Release(ccw);

                Type t;
                object val;
                if (ComputedValues.TryGetValue(name, out Func<object> func))
                {
                    val = func();
                    t = val?.GetType();
                }
                else
                {
                    //val = dm.GetDataRowValueDef(row, name, page, Type.Missing, convertNull: true);
                    val = dm.GetDataRowValueDef(row, name, page, Type.Missing, typ: out t);
                    if (val == Type.Missing)
                        switch (name)
                        {
                            case "delete":
                                value = manager.Engine.GetScriptableMethod(name, args =>
                                {
                                    //using (var a0 = new GDataScriptable(manager.Engine, args[0]))
                                    {
                                        manager.RunWhenDone(() => DefaultContentGrid.RemoveRow(dm, row));
                                    }
                                    return null;
                                });
                                return 0;
                            case "ROWNUM":
                                val = (decimal)row.Table.Rows.IndexOf(row) + 1;
                                t = typeof(decimal);
                                break;
                            default: value = null; return 1;
                        }

                }
                //System.Data.DataColumn cl = row.Table.Columns[name];
                //if (cl == null) { value = null; return 1; }
                //var val = dm.GetDataRowValueCol(row, cl, page);

                if (t == typeof(Decimal))
                    value = manager.Engine.GetScriptableNumber(name, val);
                else if (t == typeof(DateTime))
                    value = manager.Engine.GetScriptableDateTime(name, val);
                else if (t == typeof(DateTimeOffset))
                    value = manager.Engine.GetScriptableDateTime(name, val);
                else
                    value = manager.Engine.GetScriptableString(name, val?.ToString());

                //var t = val.GetType();
                //if (t == typeof(Decimal))
                //    value = manager.Engine.GetScriptableNumber(name, (decimal)val);
                //else if (t == typeof(DateTime))
                //    value = manager.Engine.GetScriptableDateTime(name, (DateTime)val);
                //else if (t == typeof(DateTimeOffset))
                //    value = manager.Engine.GetScriptableDateTime(name, (DateTimeOffset)val);
                //else
                //    value = manager.Engine.GetScriptableString(name, val.ToString());
                return 0;
            }
            int IScriptable.setProperty(string name, IDataScriptable value)
            {
                System.Data.DataColumn cl = row.Table.Columns[name];
                if (cl == null) return 1;

                using (var v = new GDataScriptable(manager.Engine, value))
                {
                    object val;
                    if (cl.DataType == typeof(Decimal))
                        val = v.ToDecimal();
                    else if (cl.DataType == typeof(DateTime))
                        val = v.ToDateTime();
                    else
                        val = v.ToString();

                    //kdyz jede pres grr06 engine, tak neni pravda. ale plati. System.Diagnostics.Debug.Assert(manager.__Just_Running != null);
                    //vyjmu z obnoveni polozku, nad kterou je prave spusteny skript. Napr. onValidate meni polozku, ktera pak zkousi zmenit mne a skoncil bych s nevalidni hodnotou
                    dm.SetDataRowValue1(row, /*cl,*/ name, val, refreshExcept: manager.__Just_Running?.Items?["self"] as IDefaultDataItem);
                }
                return 0;
            }
        }


        public ScriptManager(IFiller filler, GScriptEngine engine)
        {
            m_filler = filler;
            m_ScriptEngine = engine;
        }

    }
}
