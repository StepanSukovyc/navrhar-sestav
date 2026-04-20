//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFEFormatContentChart.cs                 </Name>
//    <Description> Grafový content                                             </Description>
//    <Author>      Ing. Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-08-20                                                  </Created>
//  </FileHeader>

using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Grafový content
    /// </summary>
    public class GFEFormatContentChart : GFEFormatContentImage
    {
        readonly string m_title;
        /// <summary>Nadpis</summary>
        public string ChartTitle { get { return m_title; } }

        readonly Report.Implementation.Charting.ChartType m_type;
        /// <summary>Typ grafu</summary>
        public Gordic.Report.Implementation.Charting.ChartType Type { get { return m_type; } }

        Gordic.Report.Implementation.IGFormatContentChart m_chart;
        /// <summary>Native content</summary>
        public new Gordic.Report.Implementation.IGFormatContentChart NativeContent { get { return m_chart; } }

        internal GFEFormatContentChart(GFEFormatRegion reg, Gordic.Report.Implementation.IGFormatContentChart t, Gordic.Report.Implementation.IGFormatDevTools dev)
            : base(reg, (Gordic.Report.Implementation.IGFormatContentImage)t, dev)
        {
            t.getChartType(out int l_type);
            m_type = (Report.Implementation.Charting.ChartType)l_type;

            t.getChartTitle(out m_title);

            m_chart = t;
        }


        //public override void Dispose()
        //{
        //    base.Dispose();
        //    if (m_chart != null)
        //    {
        //        Marshal.ReleaseComObject(m_chart); m_chart = null;
        //    }
        //}

        internal Gordic.Report.Implementation.BitmapWrap CreateChartAndMap(string Data, int width, int height, double zoom, out string m_map, string urlBase = "", System.Drawing.Color backColor = default(System.Drawing.Color))
        {
            m_chart.getConfig(out Report.Implementation.IGChartLayerConfig l_config); //Config co nejdriv uvolnit! (grr06 ma fake ref.count)
            try
            {
                return Gordic.Report.Implementation.Charting.CreateChartAndMap(
                    Type, l_config, Data, width, height, zoom, out m_map
                    , urlBase: urlBase
                    , background: backColor.IsEmpty ? this.Style.BackgroundColor.Color: backColor
                );
            }
            finally { Marshal.ReleaseComObject(l_config); }
        }
        internal Gordic.Report.Implementation.BitmapWrap[] CreateChartAndMap(string Data, int width, int height, double zoom, int spritesCount, out string m_map, string urlBase = "")
        {
            m_chart.getConfig(out Report.Implementation.IGChartLayerConfig l_config); //Config co nejdriv uvolnit! (grr06 ma fake ref.count)
            try
            {
                return Gordic.Report.Implementation.Charting.CreateAnimatedChartAndMap(
                    Type, l_config, Data, width, height, zoom, spritesCount, out m_map
                    , urlBase: urlBase
                    , background: this.Style.BackgroundColor.Color
                );
            }
            finally { Marshal.ReleaseComObject(l_config); }
        }
        internal void SetConfigAttribute(string name, string value)
        {
            this.Attributes[name] = value;

            m_chart.getConfig(out Report.Implementation.IGChartLayerConfig l_config); //Config co nejdriv uvolnit! (grr06 ma fake ref.count)
            try { l_config.setAttribute(name, value); }
            finally { Marshal.ReleaseComObject(l_config); }
        }
    }
}
