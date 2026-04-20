//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ApplicationStateInfoService.cs           </Name>
//    <Description> Tato služba shrnuje důležité informace o stavu aplikace,    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-21                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Tato služba shrnuje důležité informace o stavu aplikace,
    /// pro případ, že dojde k výjimce
    /// </summary>
    public static class ApplicationStateInfoService
    {
        static readonly Dictionary<string, StateGetter> stateGetters = new Dictionary<string, StateGetter>(StringComparer.InvariantCulture);

        /// <summary>
        /// Registrace nové metody pro získání aktuálního stavu aplikace
        /// </summary>
        /// <param name="title">Název nové jednotky stavu.</param>
        /// <param name="stateGetter">Metoda, která se použije pro získání hodnoty stavu.</param>
        /// <exception cref="ArgumentNullException">Parametr <paramref name="title"/> je NULL.</exception>
        /// <exception cref="ArgumentException">Získáváč stavu <paramref name="title"/> je již registrován.</exception>
        public static void RegisterStateGetter(string title, StateGetter stateGetter)
        {
            lock (stateGetters)
            {
                stateGetters.Add(title, stateGetter);
            }
        }

        /// <summary>
        /// Určuje, zda získáváč stavu je již registrován.
        /// </summary>
        /// <param name="title">Titulek hledaného získáváče.</param>
        /// <returns><c>true</c>, pokud získáváč se zadaným názvem již registrován, jinak <c>false</c>.</returns>
        public static bool IsRegistered(string title)
        {
            lock (stateGetters)
            {
                return stateGetters.ContainsKey(title);
            }
        }

        /// <summary>
        /// Odregistruje získáváč stavu.
        /// </summary>
        /// <param name="title">Titulek získáváče stavu, který je zapotřebí odstranit.</param>
        /// <returns><c>true</c> pokud specifickýj získáváč je nalezen a odstraněn, jinak <c>false</c>.</returns>
        /// <exception cref="ArgumentNullException"><paramref name="title"/> je NULL.</exception>
        public static bool UnregisterStateGetter(string title)
        {
            lock (stateGetters)
            {
                return stateGetters.Remove(title);
            }
        }

        /// <summary>
        /// Získání přehledu o stavu aplikace ze všech registrovaných získáváčů stavu
        /// </summary>
        /// <returns>Slovnik s titulkami a výsledky všech registrovaných získáváčů stavu.</returns>
        public static IDictionary<string, object> GetCurrentApplicationStateInfo()
        {
            Dictionary<string, object> state = new Dictionary<string, object>(stateGetters.Count, stateGetters.Comparer);
            lock (stateGetters)
            {
                foreach (KeyValuePair<string, StateGetter> entry in stateGetters)
                    try { state.Add(entry.Key, entry.Value()); }
                    catch (Exception ex) { state.Add(entry.Key, new StateGetterExceptionInfo(ex)); }
            }
            return state;
        }

        /// <summary>
        /// Přida informaci o aktuálním stavu všech registrovaných získáváčů do specifikovaného
        /// <see cref="StringBuilder"/>.
        /// </summary>
        /// <param name="sb"><see cref="StringBuilder"/> pro přidání informaci.</param>
        public static void AppendFormatted(StringBuilder sb)
        {
            IFormattable f;
            Exception e;
            StateGetterExceptionInfo exceptionInfo;

            foreach (KeyValuePair<string, object> entry in GetCurrentApplicationStateInfo())
            {
                e = null;
                sb.Append(entry.Key);
                sb.Append(": ");

                if (entry.Value == null)
                    sb.AppendLine("<null>");
                else
                {
                    f = entry.Value as IFormattable;
                    if (f != null)
                        try { sb.AppendLine(f.ToString(null, CultureInfo.InvariantCulture)); }
                        catch (Exception ex)
                        {
                            sb.AppendLine("--> " + GResources.GetResourceText(29450263) + " IFormattable.ToString:"); //RC 29450263 : Výjimka vyvolána
                            e = ex;
                        }
                    else
                    {
                        exceptionInfo = entry.Value as StateGetterExceptionInfo;
                        if (exceptionInfo != null)
                        {
                            sb.AppendLine("--> " + GResources.GetResourceText(29450264) + ":"); //RC 29450264 : Výjimka vyvolána získáváčem stavu
                            e = exceptionInfo.Exception;
                        }
                        else
                            try { sb.AppendLine(entry.Value.ToString()); }
                            catch (Exception ex)
                            {
                                sb.AppendLine("--> " + GResources.GetResourceText(29450263) + " ToString:"); //RC 29450263 : Výjimka vyvolána
                                e = ex;
                            }
                    }
                }

                if (e != null)
                    sb.AppendLine(e.ToString());
            }
        }

        sealed class StateGetterExceptionInfo
        {
            readonly Exception exception;

            internal StateGetterExceptionInfo(Exception exception)
            {
                this.exception = exception ?? throw new ArgumentNullException("exception");
            }

            internal Exception Exception
            {
                get { return exception; }
            }

            public override string ToString()
            {
                return "StateGetterExceptionInfo: " + this.exception.ToString();
            }
        }
    }

    /// <summary>
    /// Delegát používaný pro získávání informaci o aktuálním stavu
    /// </summary>
    public delegate object StateGetter();
}
