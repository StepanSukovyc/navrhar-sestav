//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GNativeStringCache.cs               </Name>
//    <Description> Pomocná třída pro cache řetězců pro přenos do Native        </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2013                            </Copyright>
//    <Created>     2013-02-20                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using Gordic.General;
using Gordic.Report.Interface;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;

namespace Gordic.Report.Implementation
{

    /// <summary>
    /// Pomocná třída pro cache řetězců pro přenos do Native prostředí
    /// </summary>
    [System.Security.SecurityCritical]
    public class GNativeStringCache
    {
        Dictionary<string, IntPtr> _a = new Dictionary<string, IntPtr>();

        ///// <summary/>
        //public RepString RepString(string s)
        //{
        //    return new RepString(Ansi(s));
        //}

        ///// <summary/>
        //public IntPtr Ansi(string s)
        //{
        //    if (s == null) return IntPtr.Zero;  //null nebudu ukladat do slovniku (i kdyz by to taky slo)
        //    IntPtr value;
        //    if (_a.TryGetValue(s, out value))
        //        return value;
        //    value = Marshal.StringToHGlobalAnsi(s);
        //    _a[s] = value;
        //    return value;
        //}

        /// <summary/>
        public IntPtr Find(string s)
        {
            IntPtr value;
            if (_a.TryGetValue(s, out value))
                return value;
            return IntPtr.Zero;
        }

        /// <summary/>
        public void AddCoTaskmem(string s, IntPtr a)
        {
            _a[s] = a;
        }

        /// <summary/>
        public void Free()
        {
            foreach (IntPtr a in _a.Values)
            {
                //Marshal.FreeHGlobal(a);
                Marshal.FreeCoTaskMem(a);
            }
            _a.Clear();
        }

        public string DebugString()
        {
            if (_a.Count == 0) return string.Empty;
            return $" ({_a.Count} native strings)";
        }
        public static string DebugString(IGNativeStringOwner owner) => owner?.NativeStringCache.DebugString();
        

        //static Dictionary<IGNativeStringOwner, GNativeStringCache> _c = new Dictionary<IGNativeStringOwner, GNativeStringCache>();
        //static ConditionalWeakTable<IGNativeStringOwner, GNativeStringCache> _c = new ConditionalWeakTable<IGNativeStringOwner, GNativeStringCache>();

        /// <summary/>
        public static string RepString(IGNativeStringOwner owner, string s)
        {
            var c = owner.NativeStringCache;
            //GNativeStringCache c;
            //if (_c.TryGetValue(owner, out c) == false)
            //{
            //    c = new GNativeStringCache();
            //    //_c[owner] = c;
            //    _c.Add(owner, c);
            //}
            RepStringOut.ns_cache.Push(c);
            return s;
            //return c.RepString(s);
        }
        ///// <summary/>
        //public static IntPtr Ansi(IGNativeStringOwner owner, string s)
        //{
        //    GNativeStringCache c;
        //    if (_c.TryGetValue(owner, out c) == false)
        //    {
        //        c = new GNativeStringCache();
        //        _c[owner] = c;
        //    }
        //    return c.Ansi(s);
        //}
        /// <summary/>
        public static void Free(IGNativeStringOwner owner)
        {
            owner.NativeStringCache.Free();
            //GNativeStringCache c;
            //if (_c.TryGetValue(owner, out c))
            //{
            //    c.Free();
            //    _c.Remove(owner);
            //}
        }

    }

    /// <summary/>
    [System.Security.SecurityCritical]
    public interface IGNativeStringOwner : IDisposable
    {
        GNativeStringCache NativeStringCache { [System.Security.SecurityCritical] get; }
    }
}
