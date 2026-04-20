//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ImageMap.cs                              </Name>
//    <Description> Třída pro práci s HTML-like Image Map                       </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Gordic.GFE.Parsers.Gui
{

    /// <summary>
    /// Třída pro práci s HTML-like Image Map
    /// </summary>
    public class GImageMap
    {
        #region Point, Rect
        /// <summary>Bod</summary>
        public struct Point
        {
            /// <summary>X</summary>
            public float x;
            /// <summary>Y</summary>
            public float y;
            /// <summary>Konstruktor</summary>
            public Point(float x, float y) { this.x = x; this.y = y; }

            /// <summary>Nový posunutý Point</summary>
            public Point Offset(float offsetX, float offsetY)
            {
                return new Point(x + offsetX, y + offsetY);
            }

            /// <summary>Nový posunutý Point</summary>
            public Point Scale(float scale)
            {
                return new Point(x * scale, y * scale);
            }
        }
        /// <summary>Čtverec</summary>
        public struct Rect
        {
            /// <summary>X bodu vlevo nahoře</summary>
            public float x1;
            /// <summary>Y bodu vlevo nahoře</summary>
            public float y1;
            /// <summary>X bodu vpravo dole</summary>
            public float x2;
            /// <summary>Y bodu vpravo dole</summary>
            public float y2;
            /// <summary>šířka</summary>
            public float Width { get { return x2 - x1; } }
            /// <summary>výška</summary>
            public float Height { get { return y2 - y1; } }
            /// <summary>bod vlevo nahoře</summary>
            public Point Topleft { get { return new Point(x1, y1); } }
            /// <summary>bod vpravo dole</summary>
            public Point BottomRight { get { return new Point(x2, y2); } }

            /// <summary>Konstruktor</summary>
            public Rect(float x1, float y1, float x2, float y2)
            {
                if (x1 > x2) { this.x1 = x2; this.x2 = x1; }
                else { this.x1 = x1; this.x2 = x2; }
                if (y1 > y2) { this.y1 = y2; this.y2 = y1; }
                else { this.y1 = y1; this.y2 = y2; }
            }
            /// <summary>Hit-test</summary>
            public bool Contains(float x, float y)
            {
                return x >= x1 && x <= x2 && y >= y1 && y <= y2;
            }

            /// <summary>Nový posunutý Rect</summary>
            public Rect Offset(float offsetX, float offsetY)
            {
                return new Rect(x1 + offsetX, y1 + offsetY, x2 + offsetX, y2 + offsetY);
            }

            /// <summary>Nový posunutý Rect</summary>
            public Rect Scale(float scale)
            {
                return new Rect(x1 * scale, y1 * scale, x2 * scale, y2 * scale);
            }
        }
        #endregion
        #region Tvary (Shapes)
        /// <summary>Abstraktní základní tvar</summary>
        public abstract class Shape
        {
            /// <summary>Kontruktor</summary>
            protected Shape(string href)
            {
                m_url = href;
            }

            string m_url;
            /// <summary>Asociovaná URL</summary>
            public string Href
            {
                get { return m_url; }
                set { m_url = value; }
            }

            string m_xtra;
            /// <summary>Extra pole mimo href</summary>
            public string Extra
            {
                get { return m_xtra; }
                set { m_xtra = value; }
            }

            /// <summary>Hit-test</summary>
            public abstract bool HitTest(float x, float y);
            /// <summary>Serializace do stringu</summary>
            public abstract void Serialize(StringBuilder sb);

            internal static Shape Clone(Shape s, float offsetX = 0, float offsetY = 0)
            {
                if (s is ShapeRect)
                    return new ShapeRect(((ShapeRect)s).Bounds.Offset(offsetX, offsetY), s.Href) { Extra = s.Extra };
                if (s is ShapePoly)
                    return new ShapePoly(((ShapePoly)s).Polygon.Select(p => p.Offset(offsetX, offsetY)).ToArray(), s.Href) { Extra = s.Extra };
                if (s is ShapeCircle)
                    return new ShapeCircle(((ShapeCircle)s).Center.Offset(offsetX, offsetY), ((ShapeCircle)s).Diameter, s.Href) { Extra = s.Extra };
                return new ShapeFallback(s.Href) { Extra = s.Extra };
            }

            internal static Shape Clone(Shape s, float scale)
            {
                if (s is ShapeRect)
                    return new ShapeRect(((ShapeRect)s).Bounds.Scale(scale), s.Href) { Extra = s.Extra };
                if (s is ShapePoly)
                    return new ShapePoly(((ShapePoly)s).Polygon.Select(p => p.Scale(scale)).ToArray(), s.Href) { Extra = s.Extra };
                if (s is ShapeCircle)
                    return new ShapeCircle(((ShapeCircle)s).Center.Scale(scale), ((ShapeCircle)s).Diameter * scale, s.Href) { Extra = s.Extra };
                return new ShapeFallback(s.Href) { Extra = s.Extra };
            }

        }
        /// <summary>Default tvar (pozadí)</summary>
        public class ShapeFallback : Shape
        {
            /// <summary>Kontruktor</summary>
            public ShapeFallback(string href)
                : base(href)
            {
            }
            /// <summary>Hit-test</summary>
            public override bool HitTest(float x, float y) { return true; }
            /// <summary>Serializace do stringu</summary>
            public override void Serialize(StringBuilder sb) { sb.AppendFormat("<AREA shape='default' href='{0}'{1}/>", Href, Extra); }
        }
        /// <summary>Obdélník</summary>
        public class ShapeRect : Shape
        {
            Rect m_r;
            /// <summary>Rozměry</summary>
            public Rect Bounds { get { return m_r; } }
            internal void SetBounds(Rect r) { m_r = r; }
            internal void SetBounds(System.Drawing.RectangleF r) { m_r = new Rect(r.Left, r.Top, r.Right, r.Bottom); }
            
            /// <summary>Konstruktor</summary>
            public ShapeRect(Rect r, string href)
                : base(href)
            {
                m_r = r;
            }
            /// <summary>Hit-test</summary>
            public override bool HitTest(float x, float y) { return m_r.Contains(x, y); }
            /// <summary>Serializace do stringu</summary>
            public override void Serialize(StringBuilder sb) { sb.Append("<AREA shape='rect' coords='"); Polyline_SerializePoints(sb, m_r.Topleft, m_r.BottomRight); sb.AppendFormat("' href='{0}'{1}/>", Href, Extra); }
        }
        /// <summary>Polyline (mnohoúhelník)</summary>
        public class ShapePoly : Shape
        {
            readonly Point[] m_coords;
            Rect? m_brect;
            /// <summary>Kontruktor</summary>
            public ShapePoly(Point[] coords, string href)
                : base(href)
            {
                m_coords = coords;
            }
            /// <summary>Obalující obdélník</summary>
            public Rect Bounds { get { if (m_brect.HasValue == false) m_brect = Polyline_ComputeBoundingRect(m_coords); return m_brect.Value; } }
            /// <summary>Rozměry</summary>
            public Point[] Polygon { get { return m_coords; } }
            /// <summary>Hit-test</summary>
            public override bool HitTest(float x, float y) { return Bounds.Contains(x, y) && Polyline_HitTest(x, y, m_coords); }
            /// <summary>Serializace do stringu</summary>
            public override void Serialize(StringBuilder sb) { sb.Append("<AREA shape='poly' coords='"); Polyline_SerializePoints(sb, m_coords); sb.AppendFormat("' href='{0}'{1}/>", Href, Extra); }
        }
        /// <summary>Kruh</summary>
        public class ShapeCircle : Shape
        {
            private Point m_center;
            private readonly float m_diameter;
            /// <summary>Střed</summary>
            public Point Center { get { return m_center; } }
            /// <summary>Průměr</summary>
            public float Diameter { get { return m_diameter; } }

            /// <summary>Kontruktor</summary>
            public ShapeCircle(Point center, float diameter, string href)
                : base(href)
            {
                m_center = center;
                m_diameter = diameter;
            }
            /// <summary>Hit-test</summary>
            public override bool HitTest(float x, float y) { return Circle_HitTest(x, y, m_center, m_diameter); }
            /// <summary>Serializace do stringu</summary>
            public override void Serialize(StringBuilder sb) { sb.AppendFormat("<AREA shape='circle' coords='{1},{2},{3}' href='{0}'{4}/>", Href, m_center.x, m_center.y, m_diameter, Extra); }
        }
        List<Shape> m_shapes = new List<Shape>();

        /// <summary>Počet tvarů</summary>
        public int Length
        {
            get { return m_shapes.Count; }
        }
        /// <summary>Tvarů</summary>
        public IEnumerable<Shape> Shapes
        {
            get { return m_shapes; }
        }

        /// <summary>Přidání tvaru</summary>
        public void Add(Shape shape)
        {
            if (shape == null) return;
            m_shapes.Add(shape);
        }
        /// <summary>Přidání obdélníku</summary>
        public ShapeRect AddRect(float x1, float y1, float x2, float y2, string href)
        {
            var shape = new ShapeRect(new Rect(x1, y1, x2, y2), href);
            Add(shape);
            return shape;
        }
        /// <summary>Přidání obdélníku</summary>
        public ShapeRect AddRect(System.Drawing.RectangleF r, string href)
        {
            var shape = new ShapeRect(new Rect(r.Left, r.Top, r.Right, r.Bottom), href);
            Add(shape);
            return shape;
        }
        
        #endregion
        #region Init
        /// <summary>Kontruktor</summary>
        public GImageMap()
        {
        }

        /// <summary>Kontruktor</summary>
        public GImageMap(string htmlMap)
        {
            Parse(new System.IO.StringReader(htmlMap));
        }
        public string MapName = "mymap";
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<MAP name='");
            sb.Append(MapName);
            sb.AppendLine("'>");
            foreach (Shape s in m_shapes)
            {
                s.Serialize(sb);
            } 
            sb.AppendLine("</MAP>");
            return sb.ToString();
        }

        #endregion
        #region Parse
        private void Parse(System.IO.TextReader m)
        {
            StringBuilder l = new StringBuilder();
            int st = 0;
            while (true)
            {
                var c = m.Read();
                if (c == -1) return;
                var ch = (char)c;
                switch (ch)
                {
                    case '<':
                        if (st != 0)
                            throw new System.IO.IOException(GResources.GetResourceText(29450423)); //RC 29450423 : Chybné vnoření!
                        if (m.Peek() == (int)'/') st = 2; else st = 1;
                        break;
                    case '/':
                        if (st == 0)
                            throw new System.IO.IOException(GResources.GetResourceText(29450423)); //RC 29450423 : Chybné vnoření!
                        break; //ignorace
                    case '>':
                        if (st == 0)
                            throw new System.IO.IOException(GResources.GetResourceText(29450423)); //RC 29450423 : Chybné vnoření!
                        if (st == 1)
                            ParseLine(l.ToString());
                        l.Clear();
                        st = 0;
                        break;
                    case '\'':
                    case '\"':
                        //l.Append('"');
                        ReadStringLiteral(m, ch, l);
                        //l.Append('"');
                        break;
                    default:
                        if (st == 0 && Char.IsWhiteSpace(ch) == false)
                            throw new System.IO.IOException(GResources.GetResourceText(29450424)); //RC 29450424 : Chybný znak!
                        if (st > 0) l.Append(ch);
                        break;
                }
            }
        }

        private void ReadStringLiteral(System.IO.TextReader m, char endch, StringBuilder l)
        {
            while (true)
            {
                var c = m.Read();
                if (c == -1) return;
                var ch = (char)c;
                if (ch == endch) return;
                l.Append(ch);
            }
        }

        private void ParseLine(string l)
        {
            var spl = l.Split(new char[] { ' ' }, 2);
            switch (spl[0].ToUpperInvariant())
            {
                case "MAP":
                    break;
                case "AREA":
                    Add(ParseArea(spl[1]));
                    break;
            }
        }

        private Shape ParseArea(string area)
        {
            string l_shape = null;
            float[] l_coord = null;
            string l_href = null;
            foreach (var spl in area.Split(' '))
            {
                var kv = spl.Split(new char[] { '=' }, 2);
                switch (kv[0].ToUpperInvariant())
                {
                    case "SHAPE":
                        l_shape = kv[1];
                        break;
                    case "COORDS":
                        l_coord = ParseCoords(kv[1]);
                        break;
                    case "HREF":
                        l_href = kv[1];
                        break;
                }
            }
            switch (l_shape.ToUpperInvariant())
            {
                case "DEFAULT":
                    return new ShapeFallback(l_href);
                case "RECT":
                    return new ShapeRect(ParseRect(l_coord), l_href);
                case "POLY":
                    if (l_coord.Length == 4)
                        return new ShapeRect(ParseRect(l_coord), l_href);
                    return new ShapePoly(ParsePoints(l_coord), l_href);
                case "CIRCLE":
                    if (l_coord.Length != 3)
                        throw new InvalidOperationException(string.Format(GResources.GetResourceText(29450425) + " circle coords: {0}", l_coord)); //RC 29450425 : Chybný
                    return new ShapeCircle(new Point(l_coord[0], l_coord[1]), l_coord[2], l_href);
                default:
                    throw new InvalidOperationException(string.Format(GResources.GetResourceText(29450426) + " shape {0}", l_shape)); //RC 29450426 : Neznámý
            }
        }

        private Point[] ParsePoints(float[] coords)
        {
            if (coords.Length % 2 >0)
                throw new InvalidOperationException(string.Format(GResources.GetResourceText(29450425) + " poly coords: {0}", coords)); //RC 29450425 : Chybný
            var l = coords.Length / 2;
            var ret = new Point[l];
            for (int i = 0; i < l; i++)
                ret[i] = new Point(coords[i * 2], coords[i * 2 + 1]);
            return ret;
        }

        private Rect ParseRect(float[] coords)
        {
            if (coords.Length != 4)
                throw new InvalidOperationException(string.Format(GResources.GetResourceText(29450425) + " rect coords: {0}", coords)); //RC 29450425 : Chybný
            return new Rect(coords[0], coords[1], coords[2], coords[3]);
        }

        private float[] ParseCoords(string p)
        {
            var c = p.Split(',');
            var res = new float[c.Length];
            for (int i = 0; i < c.Length; i++)
                res[i] = System.Single.Parse(c[i]);
            return res;
        }
        #endregion
        #region HitTest
        /// <summary>Hit-test</summary>
        public Shape HitTest(float x, float y)
        {
            foreach (Shape s in m_shapes)
            {
                if (s.HitTest(x, y)) return s;
            }
            return null;
        }

        /// <summary>Vrací seznam bodů jako řetězec oddělený čárkou</summary>
        public static void Polyline_SerializePoints(StringBuilder sb, params Point[] polyline)
        {
            var f = false;
            foreach (Point p in polyline)
            {
                if (f) sb.Append(','); else f = true;
                sb.Append(Math.Ceiling(p.x));
                sb.Append(',');
                sb.Append(Math.Ceiling(p.y));
            }
        }

        /// <summary>Výpočet obalujícího obdélníku pro polyline</summary>
        public static Rect Polyline_ComputeBoundingRect(Point[] polyline)
        {
            float x0 = float.MaxValue, x9 = float.MinValue, y0 = float.MaxValue, y9 = float.MinValue;
            foreach (Point p in polyline)
            {
                x0 = Math.Min(x0, p.x);
                y0 = Math.Min(y0, p.y);
                x9 = Math.Max(x9, p.x);
                y9 = Math.Max(y9, p.y);
            }
            return new Rect(x0, y0, x9, y9);
        }
        /// <summary>Hit-test pro polyline</summary>
        public static bool Polyline_HitTest(float testx, float testy, Point[] polyline)
        {
            var nvert = polyline.Length;
            int i, j;
            bool c = false;
            for (i = 0, j = nvert - 1; i < nvert; j = i++)
            {
                if (((polyline[i].y > testy) != (polyline[j].y > testy)) &&
                 (testx < (polyline[j].x - polyline[i].x) * (testy - polyline[i].y) / (polyline[j].y - polyline[i].y) + polyline[i].x))
                    c = !c;
            }
            return c;
        }
        /// <summary>Hit-test pro kruh</summary>
        public static bool Circle_HitTest(float testx, float testy, Point center, float diameter)
        {
            testx -= center.x;
            testy -= center.y;
            return testx * testx + testy * testy <= diameter * diameter;
        }
        #endregion
        #region Union
        internal void Union(GImageMap imageMap, float offsetX = 0, float offsetY = 0)
        {
            foreach (Shape s in imageMap.m_shapes)
            {
                Add(Shape.Clone(s, offsetX, offsetY));
            }
        }

        public GImageMap Scaled(float factor)
        {
            var m = new GImageMap() { MapName = this.MapName };
            foreach (Shape s in m_shapes)
            {
                m.Add(Shape.Clone(s, factor));
            }
            return m;
        }

        #endregion
        #region **test-cases**
#if DEBUG

        /// <summary>TEST CASE</summary>
        public static GImageMap Test1
        {
            get
            {
                return new GImageMap(@"<MAP Name='mymap'>
<AREA Shape='circle' Coords='70,84,51' Href='http://www.december.com'> 
<AREA Shape='rect' Coords='25,180,125,280' Href='http://www.december.com/html/'> 
<AREA Shape='poly' Coords='153,106,186,225,340,193,315,81,304,167' Href='http://www.december.com/works/tour.html'> 
<AREA Shape='rect' Coords='420,19,478,278' Nohref/>
<AREA Shape='circle' Coords='499,299,100' Href='http://www.cnn.com/'>
<AREA Shape='default' Coords='0,0,500,300' Href='http://www.december.com/john/'> 
</MAP>
");
            }
        }

#endif
        #endregion
    }
}
