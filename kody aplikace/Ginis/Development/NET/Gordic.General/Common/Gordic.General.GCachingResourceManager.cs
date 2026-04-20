//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCachingResourceManager.cs </Name>
//    <Description> Cache nad ResourceManager                 </Description>
//    <Author>      Martin Aliger                             </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021          </Copyright>
//    <Created>     2012-10-26                                </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Collections;
using System.Reflection;
using System.Resources;
using System.Runtime.CompilerServices;
using System.Diagnostics;

namespace Gordic.General {

    /// <summary>
    /// Cache nad ResourceManager
    /// </summary>
    public class GCachingResourceManager : System.Resources.ResourceManager
    {
        System.Runtime.Caching.MemoryCache m;

        /// <summary>Nastavení politiky cache</summary>
        public System.Runtime.Caching.CacheItemPolicy Policy = new System.Runtime.Caching.CacheItemPolicy() { SlidingExpiration = TimeSpan.FromMinutes(2) };

        /// <summary>Konstruktor</summary>
        public GCachingResourceManager(string baseName, System.Reflection.Assembly assembly)
            : base(baseName, assembly)
        {
            m = new System.Runtime.Caching.MemoryCache(baseName);
        }

        /// <summary>Gets the value of the specified non-string resource localized for the specified culture.</summary>
        public override object GetObject(string name, System.Globalization.CultureInfo culture)
        {
            var v = m.Get(name);
            if (v == null)
            {
                v = base.GetObject(name, culture);
                m.Set(name, v, Policy);
            }
            return v;
        }
        /// <summary>Returns the value of the specified string resource.</summary>
        public override string GetString(string name, System.Globalization.CultureInfo culture)
        {
            var v = m.Get(name) as string;
            if (v == null)
            {
                v = base.GetString(name, culture);
                m.Set(name, v, Policy);
            }
            return v;
        }

    }

} // end namespace
