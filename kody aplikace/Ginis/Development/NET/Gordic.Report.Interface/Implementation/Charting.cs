//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.Charting.cs                         </Name>
//    <Description> Podpora grafů pro sestavy                                   </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2013                            </Copyright>
//    <Created>     2012-12-17                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
using System.Drawing;
using Gordic.Report.Interface;
using System.Xml;

namespace Gordic.Report.Implementation
{
    /// <summary>
    /// Podpora grafů pro sestavy
    /// </summary>
    public class Charting
    {
        [System.Security.SecurityCritical]
        internal static class Grr06Loader2
        {
            public static Delegate LoadFunction<T>() { return GUnsafeRepWrapper.Grr06Loader.Loader.LoadFunction<T>(); }

            public delegate int dcreateChart(int type, ref chart_result result, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string data, int x, int y, double zoom, IGChartLayerConfig config);
            public static readonly dcreateChart createChart_1 = (dcreateChart)GUnsafeRepWrapper.Grr06Loader.LoadFunction<dcreateChart>();

            public delegate int ddcreateChart(int type, ref chart_result result, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string data, int x, int y, double zoom, IGChartLayerConfig config, uint background);
            public static readonly ddcreateChart createChart_2 = (ddcreateChart)GUnsafeRepWrapper.Grr06Loader.LoadFunction<ddcreateChart>();

            public delegate int dddcreateChart(int type, ref chart_result result, [MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(RepStringIn))]string data, int x, int y, double zoom, IGChartLayerConfig config, uint background, int spritesCount);
            public static readonly dddcreateChart createChart_3 = (dddcreateChart)GUnsafeRepWrapper.Grr06Loader.LoadFunction<dddcreateChart>();

            public delegate int dcreateDrawing(out IntPtr result, int x, int y, IGAttrList atrs, IGFormatGRRCellStyle style);
            public static readonly dcreateDrawing createDrawing = (dcreateDrawing)GUnsafeRepWrapper.Grr06Loader.LoadFunction<dcreateDrawing>();

            public delegate int dcreateBarcode(out IntPtr result, string data, int x, int y, int type, int o1, int o2, int o3, IGAttrList atrs, IGFormatGRRCellStyle style);
            public static readonly dcreateBarcode createBarcode = (dcreateBarcode)GUnsafeRepWrapper.Grr06Loader.LoadFunction<dcreateBarcode>();

        }

        #region Chart config
        /// <exclude/>
        public enum ChartType : int
        {
            /// <exclude/>
            pie = 0,
            /// <exclude/>
            bar = 1,
            /// <exclude/>
            line = 2,
            /// <exclude/>
            area = 3,
            /// <exclude/>
            meter = 4,
            /// <exclude/>
            indicator = 5,
        };

        /// <exclude/>
        [System.Security.SecurityCritical]
        public class ChartSet : IGChartSet
        {
            internal ChartLayer m_layer;
            IDictionary<string, string> m_attributes;

            /// <exclude/>
            public ChartSet(ChartLayer layer, IDictionary<string, string> attributes)
            {
                m_layer = layer;
                m_attributes = attributes;
            }

            [System.Security.SecurityCritical]
            int IGChartSet.getAttribute(string name, string defaultValue, out string value)
            {
                if (m_attributes != null)
                {
                    string v;
                    if (m_attributes.TryGetValue(name, out v))
                    {
                        value = GNativeStringCache.RepString(m_layer.m_config, v);
                        return 0;
                    }
                }
                value = defaultValue;
                return 0;
            }
        }

        /// <exclude/>
        [System.Security.SecurityCritical]
        public class ChartLayer : IGChartLayer
        {
            internal ChartConfig m_config;
            ChartType m_type;
            IDictionary<string, string> m_attributes;
            private List<ChartSet> m_sets = new List<ChartSet>();

            internal ChartLayer(ChartType type)
            {
                m_type = type;
                m_attributes = null;
            }
            /// <exclude/>
            public ChartLayer(ChartConfig c, ChartType type, IDictionary<string, string> attributes)
            {
                m_config = c;

                string l_type;
                if (attributes.TryGetValue("type", out l_type))
                    Enum.TryParse<ChartType>(l_type, out type);

                m_type = type;
                m_attributes = attributes;
            }

            [System.Security.SecurityCritical]
            int IGChartLayer.getType(out int type)
            {
                type = (int)m_type;
                return 0;
            }

            [System.Security.SecurityCritical]
            int IGChartLayer.getAttribute(string name, string defaultValue, out string value)
            {
                if (m_attributes != null)
                {
                    string v;
                    if (m_attributes.TryGetValue(name, out v))
                    {
                        value = GNativeStringCache.RepString(m_config, v);
                        return 0;
                    }
                }
                value = defaultValue;
                return 0;
            }

            [System.Security.SecurityCritical]
            int IGChartLayer.getSetCount(out int cnt)
            {
                cnt = m_sets.Count;
                return 0;
            }

            [System.Security.SecurityCritical]
            int IGChartLayer.getSet(int index, out IGChartSet value)
            {
                value = m_sets[index];
                return 0;
            }

            /// <exclude/>
            public void AddSet(ChartSet s)
            {
                m_sets.Add(s);
            }

            /// <exclude/>
            public void AddSet(XmlNode setNode)
            {
                //    <dataset series="3"/>
                Dictionary<string, string> l_attrs = new Dictionary<string, string>();
                foreach (XmlAttribute a in setNode.Attributes)
                {
                    l_attrs.Add(a.Name, a.Value);
                }
                AddSet(new ChartSet(this, l_attrs));
            }
        }

        /// <exclude/>
        [System.Security.SecurityCritical]
        public class ChartConfig : IGChartLayerConfig, IGNativeStringOwner
        {
            GNativeStringCache IGNativeStringOwner.NativeStringCache { [System.Security.SecurityCritical] get; } = new GNativeStringCache();
            /// <exclude/>
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }
            /// <exclude/>
            protected virtual void Dispose(bool disposing)
            {
#if MEMORYDEBUG
            Gordic.General.GLoggerExtensions.Trace(Gordic.General.GLogManager.GetLogger("Gordic.Gfe.MemoryDebug"), $"{GetType()} Dispose {disposing}{GNativeStringCache.DebugString(this)}");
#endif
                GNativeStringCache.Free(this);
            }
            [System.Security.SecuritySafeCritical] ~ChartConfig() { Dispose(false); }

            //internal GAttrList atrs;
            IDictionary<string, string> m_attributes;
            private List<ChartLayer> m_layers = null;

            /// <exclude/>
            public ChartType Type
            {
                get
                {
                    ChartType l_type;
                    if (Enum.TryParse<ChartType>(m_attributes["type"], out l_type))
                        return l_type;
                    return default(ChartType);
                }
            }

            ChartLayer m_DefaultLayer = null;
            /// <exclude/>
            public ChartLayer DefaultLayer
            {
                get
                {
                    if (m_DefaultLayer == null)
                    {
                        m_DefaultLayer = new ChartLayer(Type);
                        m_DefaultLayer.AddSet(new ChartSet(m_DefaultLayer, new Dictionary<string, string>()));
                    }
                    return m_DefaultLayer;
                }
            }

            /// <exclude/>
            public ChartConfig(IDictionary<string, string> attributes)
            {
                //atrs = new GAttrList(attributes);
                m_attributes = attributes;
            }

            [System.Security.SecurityCritical]
            int IGChartLayerConfig.getAttribute(string name, string defaultValue, out string value)
            {
                if (m_attributes != null)
                {
                    string v;
                    if (m_attributes.TryGetValue(name, out v))
                    {
                        value = GNativeStringCache.RepString(this, v);
                        return 0;
                    }
                }
                value = defaultValue;
                return 0;
            }

            [System.Security.SecurityCritical]
            int IGChartLayerConfig.setAttribute(string name, string value)
            {
                if (m_attributes == null) m_attributes = new Dictionary<string, string>();
                m_attributes[name] = value;
                return 0;
            }

            [System.Security.SecurityCritical]
            int IGChartLayerConfig.getLayerCount(out int cnt)
            {
                cnt = m_layers == null ? 1 : m_layers.Count;
                return 0;
            }

            [System.Security.SecurityCritical]
            int IGChartLayerConfig.getLayer(int index, out IGChartLayer value)
            {
                if (m_layers == null)
                {
                    if (index != 0) { value = null; return 1; }
                    value = DefaultLayer;
                    return 0;
                }
                value = m_layers[index];
                return 0;
            }

            /// <exclude/>
            public string GroupSmall
            {
                get
                {
                    string v;
                    if (m_attributes.TryGetValue("group-small", out v)) return v;
                    return null;
                }
            }
            /// <exclude/>
            public string GroupLimit
            {
                get
                {
                    string v;
                    if (m_attributes.TryGetValue("group-limit", out v)) return v;
                    return "10%";
                }
            }



            /// <exclude/>
            public void AddLayer(System.Xml.XmlNode layerNode)
            {
                //<layer type="area" _draw3d="false">
                //    <dataset series="3"/>
                //</layer>

                Dictionary<string, string> l_attrs = new Dictionary<string, string>();
                foreach (XmlAttribute a in layerNode.Attributes)
                {
                    l_attrs.Add(a.Name, a.Value);
                }
                var l = new ChartLayer(this, Type, l_attrs);

                foreach (XmlNode n in layerNode.ChildNodes)
                {
                    switch (n.Name)
                    {
                        case "dataset":
                            l.AddSet(n);
                            break;
                    }
                }


                if (m_layers == null) m_layers = new List<ChartLayer>();
                m_layers.Add(l);
            }

        }

        //------------------------------------------------------------------
        /// <summary>Vyloučení malých hodnot</summary>
        public void GroupSmallValues(StringBuilder values, string groupLimit, string groupSmall)
        {
            //    GString& dt = *m_fill_result;
            //    SSIZE_T s=-1;
            //    double sum=0;
            //    while(true)
            //    {
            //        size_t b=s+1;
            //        s=dt.find('|',b);
            //        if(s<0) break;
            //        SSIZE_T k = dt.find('=',b,s-1);
            //        if(k>0)
            //        {
            //            double dat=atof(dt+k+1);
            //            sum+=dat;
            //        }
            //    }

            //    const char* l_limitstr; m_config.getAttribute("group-limit","10%",&l_limitstr);
            //    double limit = computelimit(sum,GString(l_limitstr));

            //    double others = 0;
            //    s=-1;
            //    while(true)
            //    {
            //        size_t b=s+1;
            //        s=dt.find('|',b);
            //        if(s<0) break;
            //        SSIZE_T k = dt.find('=',b,s-1);
            //        if(k>0)
            //        {
            //            double dat=atof(dt+k+1);
            //            if(dat<limit)
            //            {
            //                dt.replace(b,s,"");
            //                s=b-1;
            //                others+=dat;
            //            }
            //        }
            //    }
            //    if(others>0)
            //    {
            //        dt.append(GStringFmt("%s=%.2f|",m_groupsm.getBuffer(),others));
            //    }
        }
        #endregion
        #region Chart
        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        internal struct chart_result
        {
            public IntPtr bmp;
            public string url;
            public int maplen;
            public IntPtr map;
            public IntPtr sprites;
        }
        //#pragma pack(1)
        //struct chart_result
        //{
        //    HBITMAP bmp;
        //    const char* url;
        //    int maplen;
        //    char* map;
        //};
        //#pragma pack()

        [System.Security.SecurityCritical]
        private static int createChart(int type, ref chart_result result, string data, int x, int y, double zoom, IGChartLayerConfig config, Color background, int spritesCount = -1)
        {
            //if (Environment.Is64BitProcess)
            //{
            //    if (spritesCount >= 0)
            //        return createChart64_3(type, ref result, data, x, y, zoom, config
            //        , background.A < 0xff ? 0xff000000 : (uint)System.Drawing.ColorTranslator.ToWin32(background)
            //        , spritesCount
            //        );
            //    else
            //        return createChart64_2(type, ref result, data, x, y, zoom, config
            //        , background.A < 0xff ? 0xff000000 : (uint)System.Drawing.ColorTranslator.ToWin32(background)
            //        );
            //}
            var v = GUnsafeRepWrapper.grr06_Version();
            if (v < 4003002013) //prohl - ginis 4.3.2.014 - 15.5.2013
                return Grr06Loader2.createChart_1(type, ref result, data, x, y, zoom, config);
            else if (v >= 4003002017 && spritesCount >= 0)
                return Grr06Loader2.createChart_3(type, ref result, data, x, y, zoom, config
                , background.A < 0xff ? 0xff000000 : (uint)System.Drawing.ColorTranslator.ToWin32(background)
                , spritesCount
                );
            else
                return Grr06Loader2.createChart_2(type, ref result, data, x, y, zoom, config
                , background.A < 0xff ? 0xff000000 : (uint)System.Drawing.ColorTranslator.ToWin32(background)
                );
        }

        /// <summary>Vytvoření grafu</summary>
        [System.Security.SecurityCritical]
        public static BitmapWrap CreateChart(ChartType type, IGChartLayerConfig config, string data, int x, int y, double zoom, Color background = default(Color))
        {
            chart_result res = new chart_result() { url = "", maplen = 0, map = IntPtr.Zero };
            GUnsafeRepWrapper.Throw06Error(createChart((int)type, ref res, data, x, y, zoom, config, background));
            return BitmapWrap.FromHbitmap(res.bmp);
        }
        /// <summary>Vytvoření grafu</summary>
        [System.Security.SecurityCritical]
        public static BitmapWrap CreateChartAndMap(ChartType type, IGChartLayerConfig config, string data, int x, int y, double zoom, out string map, string urlBase = "", Color background = default(Color))
        {
            int len = 1024 * 1024;
            chart_result res = new chart_result() { url = urlBase, maplen = len };
            res.map = Marshal.AllocHGlobal(len);
            try
            {
                var result = createChart((int)type, ref res, data, x, y, zoom, config, background);
                if (result < 0) GUnsafeRepWrapper.Throw06Error(result);
                if (res.bmp == IntPtr.Zero) { map = ""; return null; }

                var buf = new byte[len];
                Marshal.Copy(res.map, buf, 0, len);
                int l = 0;
                for (; l < len; l++)
                    if (buf[l] == 0) break;
                map = Encoding.UTF8.GetString(buf, 0, l);
                buf = null;

                return BitmapWrap.FromHbitmap(res.bmp);
            }
            finally
            {
                Marshal.FreeHGlobal(res.map);
            }
        }
        /// <summary>Vytvoření animovaného grafu</summary>
        [System.Security.SecurityCritical]
        public static BitmapWrap[] CreateAnimatedChartAndMap(ChartType type, IGChartLayerConfig config, string data, int x, int y, double zoom, int spritesCount, out string map, string urlBase = "", Color background = default(Color))
        {
            int len = 1024 * 1024;
            chart_result res = new chart_result() { url = urlBase, maplen = len };
            res.map = Marshal.AllocHGlobal(len);
            res.sprites = Marshal.AllocHGlobal(spritesCount * IntPtr.Size);
            try
            {
                GUnsafeRepWrapper.Throw06Error(createChart((int)type, ref res, data, x, y, zoom, config, background, spritesCount));
                if (res.bmp == IntPtr.Zero) { map = ""; return null; }

                var buf = new byte[len];
                Marshal.Copy(res.map, buf, 0, len);
                int l = 0;
                for (; l < len; l++)
                    if (buf[l] == 0) break;
                map = Encoding.UTF8.GetString(buf, 0, l);
                buf = null;

                BitmapWrap[] spr = new BitmapWrap[spritesCount + 1];
                IntPtr[] sprites = new IntPtr[spritesCount];
                Marshal.Copy(res.sprites, sprites, 0, spritesCount);
                for (int i = 0; i < spritesCount; i++)
                    spr[i] = BitmapWrap.FromHbitmap(sprites[i]);
                spr[spritesCount] = BitmapWrap.FromHbitmap(res.bmp);
                return spr;
            }
            finally
            {
                Marshal.FreeHGlobal(res.sprites);
                Marshal.FreeHGlobal(res.map);
            }
        }
        #endregion
        #region Drawing

        /// <summary>Vytvoření drawing</summary>
        [System.Security.SecurityCritical]
        public static BitmapWrap CreateDrawing(int x, int y, IGAttrList atrs, IGFormatGRRCellStyle style)
        {
            IntPtr res;
            GUnsafeRepWrapper.Throw06Error(Grr06Loader2.createDrawing(out res, x, y, atrs, style));
            return BitmapWrap.FromHbitmap(res);
        }

        /// <summary>Vytvoření drawing</summary>
        [System.Security.SecurityCritical]
        public static BitmapWrap CreateBarcode(string data, int x, int y, int type, int o1, int o2, int o3, IGAttrList atrs, IGFormatGRRCellStyle style)
        {
            IntPtr res;
            GUnsafeRepWrapper.Throw06Error(Grr06Loader2.createBarcode(out res, data, x, y, type, o1, o2, o3, atrs, style));
            return BitmapWrap.FromHbitmap(res);
        }

        #endregion

    }

    /// <summary>Pomocná třída pro uvolnění nativního obrázku z paměti</summary>
    [System.Security.SecurityCritical]
    public class BitmapWrap : IDisposable
    {
        private BitmapWrap(Bitmap bmp, IntPtr handle)
        {
            m_Bitmap = bmp;
            m_Handle = handle;
        }
        //------------------------------------------------------------------
        private Bitmap m_Bitmap;
        ///<summary>Bitmapa</summary>
        public Bitmap Bitmap
        {
            get { return m_Bitmap; }
        }
        ///<summary>Bitmapa</summary>
        public static implicit operator Bitmap(BitmapWrap b)
        {
            return b.Bitmap;
        }
        //------------------------------------------------------------------
        private IntPtr m_Handle;
        ///<summary>Hlídaný handle</summary>
        public IntPtr Handle
        {
            get { return m_Handle; }
        }

        ///<summary>Konstruktor</summary>
        public static BitmapWrap FromHbitmap(IntPtr res)
        {
            return new BitmapWrap(Bitmap.FromHbitmap(res), res);
        }
        ///<summary>Konstruktor</summary>
        public static BitmapWrap FromBitmap(Bitmap bmp, System.Drawing.Imaging.PixelFormat pf)
        {
            Bitmap cl = new Bitmap(bmp.Width, bmp.Height, System.Drawing.Imaging.PixelFormat.Format24bppRgb);
            using (Graphics gr = Graphics.FromImage(cl))
            {
                gr.DrawImage(bmp, new Rectangle(0, 0, cl.Width, cl.Height));
            }
            //var cl = bmp.Clone(new System.Drawing.Rectangle(0, 0, bmp.Width, bmp.Height), pf);

            return new BitmapWrap(cl, cl.GetHbitmap());
        }

        [DllImport("gdi32.dll")]
        static extern bool DeleteObject(IntPtr hObject);

        ///<summary>Uvolnění</summary>
        public void Dispose()
        {
            m_Bitmap.Dispose();
            if (m_Handle != IntPtr.Zero)
            {
                DeleteObject(m_Handle);
                m_Handle = IntPtr.Zero;
            }
        }
    }

}
