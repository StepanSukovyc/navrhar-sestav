//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GFEFormatGroup.cs                           </Name>
//    <Description> Parser formatu (ALF) - skupina              </Description>
//    <Author>      Ing. Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// 
    /// </summary>
    public class GFEFormatGroup : IDisposable
    {
        #region IDisposable Members
        /// <summary>
        /// uvolnìní objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                foreach (GFEFormatTag t in m_head)
                    t.Dispose();
                foreach (GFEFormatTag t in m_foot)
                    t.Dispose();
            }
        }
        ~GFEFormatGroup() { Dispose(false); }
        #endregion

        readonly string m_name;
        readonly string m_grouping;
        readonly int m_index;
        readonly GFEAttrList m_atrs;
        readonly GFEFormatRegion m_region;
        List<GFEFormatTag> m_head;
        List<GFEFormatTag> m_foot;
        object m_vg;

        /// <summary>
        /// 
        /// </summary>
        public string Name { get { return m_name; } }

        /// <summary>
        /// 
        /// </summary>
        public string Grouping { get { return m_grouping; } }

        /// <summary>
        /// 
        /// </summary>
        public int Index { get { return m_index; } }

        /// <summary>
        /// atributy objektu
        /// </summary>
        public GFEList Attributes { get { return m_atrs; } }

        /// <summary>
        /// 
        /// </summary>
        public GFEFormatRegion Region { get { return m_region; } }

        /// <summary>
        /// 
        /// </summary>
        public List<GFEFormatTag> Head { get { return m_head; } }

        /// <summary>
        /// 
        /// </summary>
        public List<GFEFormatTag> Foot { get { return m_foot; } }

        /// <summary>
        /// Vizuální skupinu prezentující daný objekt 
        /// </summary>
        public object VisualGroup { get { return m_vg; } set { m_vg = value; } }

        internal GFEFormatGroup(GFEFormatRegion r, Gordic.Report.Implementation.IGFormatGroup g, Gordic.Report.Implementation.IGFormatDevTools dev)
        {
            m_region = r;
            g.getName(out m_name);
            g.getIndex(out m_index);
            g.getGrouping(out m_grouping);

            var gt = g as Gordic.Report.Implementation.IGFormatTag;
            if (gt != null)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(gt.getAttributes(out var list));
                try { m_atrs = new GFEAttrList(list); } // end try
                finally { System.Runtime.InteropServices.Marshal.ReleaseComObject(list); }
            }

            g.getHeadCount(out int hc);
            m_head = new List<GFEFormatTag>(hc);
            for (int i = 0; i < hc; i++)
            {
                Report.Interface.GUnsafeRepWrapper.Throw06Error(g.getHead(i, out Report.Implementation.IGFormatTag t));
                try
                {
                    m_head.Add(GFEFormatTag.Create(m_region, t, dev));
                } // end try
                finally
                {
                    //Marshal.ReleaseComObject(t);
                } // end finally
            } // end for
            g.getFootCount(out int fc);
            m_foot = new List<GFEFormatTag>(fc);
            for (int i = 0; i < fc; i++)
            {
                Gordic.Report.Interface.GUnsafeRepWrapper.Throw06Error(g.getFoot(i, out Report.Implementation.IGFormatTag t));
                try
                {
                    m_foot.Add(GFEFormatTag.Create(m_region, t, dev));
                } // end try
                finally
                {
                    //Marshal.ReleaseComObject(t);
                } // end finally
            } // end for
        } // end method

    } // end class
} // end namespace
