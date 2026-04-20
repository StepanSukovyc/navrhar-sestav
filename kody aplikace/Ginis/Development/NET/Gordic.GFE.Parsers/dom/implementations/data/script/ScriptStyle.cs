//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ScriptManager.cs                         </Name>
//    <Description> Manager skriptů. Vázaný na konkrétní ScriptEngine           </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-07                                                  </Created>
//  </FileHeader>

using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Manager skriptů. Vázaný na konkrétní ScriptEngine
    /// </summary>
    public class ScriptStyle : IScriptable
    {
        readonly GScriptEngine engine;
        readonly DefaultAbstractContent owner;
        public ScriptStyle(GScriptEngine eng, DefaultAbstractContent owner)
        {
            this.engine = eng;
            this.owner = owner;
        }

        #region IScriptable Members

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            value = null;
            return 1;
        }

        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            name=name.Replace('_','-');
            using(var s = new GDataScriptable(engine, value))
            {
                //switch(s.Type)
                {
                    //case GScriptableType.Scriptable_type_number:
                    //    l.Add(name, s.ToDecimal());
                    //    //setProperty(name, 
                    //    break;
                    //default:
                        SetProperty(name, s.ToString());
                        //break;
                }
            }
            return 0; //jiny atribut ignoruju
        }
        public void SetProperty(string name, string value)
        {
            var l = new GFEAttrList
            {
                { name, value }
            };
            CommonService.ApplayStyle(owner, l);
        }

        /*
        public void setProperty(string prop, string value)
        {
    switch(prop)
    {
        case "id" : 
            //m_id = value;
            break;
        case "width":  //obvykle by se sem nemelo dostat -> mela by dostat Cell
	        return;// parse_metrics(value,&m_width,&m_widthm);
        case "height": //obvykle by se sem nemelo dostat -> mela by dostat Cell
            //ret=parse_metrics(value,&m_height,&m_heightm);
            //if(ret!=S_OK) return ret;
            //if(m_heightm==1 && m_height>100) grr_error(IDS_StyleHeight100Error);
		    return;
        case "horizontal-align":
        case "align":
            SetHAlign(value);
            return;
        case "vertical-align":
            SetVAlign(value);
            return;
        case "font-face":
            SetFontFace(value);
            return;
        case "font-faceindex":
            SetFontFace(Int32.Parse(value));
            return;
        case "font-name":
            SetFontName(value);
		    return;
        case "font-size":
            SetFontSize(value);
			return;
        case "font-bold":
            SetFontBold(_b(value));
            return;
        case STYLE_FONT_ITALIC:
            m_fitalic = bval;return S_OK;
        case STYLE_FONT_UNDERLINED:
            m_funder  = bval;return S_OK;
        case STYLE_FONT_STROKED:
            m_fstroked  = bval;return S_OK;
        case STYLE_FONT_COLOR:
            return m_fcolor.set(value);
        case STYLE_FONT_CHARSET:
            if(intvalue)  {m_fcharset=*intvalue;return S_OK;}
            i=ParseStyleValueString(value);
            switch(i)
            {
                case STYLE_VALUE_CHARSET_DEFAULT     : m_fcharset=DEFAULT_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_ANSI        : m_fcharset=ANSI_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_SYMBOL      : m_fcharset=SYMBOL_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_OEM         : m_fcharset=OEM_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_EASTEUROPE  : m_fcharset=EASTEUROPE_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_MAC         : m_fcharset=MAC_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_BALTIC      : m_fcharset=BALTIC_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_CHINESEBIG5 : m_fcharset=CHINESEBIG5_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_GB2312      : m_fcharset=GB2312_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_HANGUL      : m_fcharset=HANGUL_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_GREEK       : m_fcharset=GREEK_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_RUSSIAN     : m_fcharset=RUSSIAN_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_SHIFTJIS    : m_fcharset=SHIFTJIS_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_TURKISH     : m_fcharset=TURKISH_CHARSET;return S_OK;
                case STYLE_VALUE_CHARSET_VIETNAMESE  : m_fcharset=VIETNAMESE_CHARSET;return S_OK;
                default: grr_error(IDS_StyleCodePageError);
            }
    
        case STYLE_BORDER_WIDTH_ALL:
            wm=parse_extent_metrics(value);
            m_lborder.m_width=wm;
            m_tborder.m_width=wm;
            m_rborder.m_width=wm;
            m_bborder.m_width=wm;
		    return S_OK;
        case STYLE_BORDER_WIDTH_LEFT:
            wm=parse_extent_metrics(value);m_lborder.m_width=wm; return S_OK;
        case STYLE_BORDER_WIDTH_TOP:
            wm=parse_extent_metrics(value);m_tborder.m_width=wm; return S_OK;
        case STYLE_BORDER_WIDTH_RIGHT:
            wm=parse_extent_metrics(value);m_rborder.m_width=wm; return S_OK;
        case STYLE_BORDER_WIDTH_BOTTOM:
            wm=parse_extent_metrics(value);m_bborder.m_width=wm; return S_OK;
        case STYLE_BORDER_COLOR_ALL:
            ret=m_lborder.m_color.set(value);if(ret!=S_OK) return ret;
            ret=m_tborder.m_color.set(value);if(ret!=S_OK) return ret;
            ret=m_rborder.m_color.set(value);if(ret!=S_OK) return ret;
            ret=m_bborder.m_color.set(value);return ret;
        case STYLE_BORDER_COLOR_LEFT:
            return m_lborder.m_color.set(value);
        case STYLE_BORDER_COLOR_TOP:
            return m_tborder.m_color.set(value);
        case STYLE_BORDER_COLOR_RIGHT:
            return m_rborder.m_color.set(value);
        case STYLE_BORDER_COLOR_BOTTOM:
            return m_bborder.m_color.set(value);
        case STYLE_BORDER_STYLE_ALL:
#define set_border(b,i) switch(i) { \
                case STYLE_VALUE_SOLID  : b=Grr06BorderStyle_SOLID;break; \
                case STYLE_VALUE_DOTTED : b=Grr06BorderStyle_DOTTED;break; \
                case STYLE_VALUE_DASHED : b=Grr06BorderStyle_DASHED;break; \
                case STYLE_VALUE_DOUBLE : b=Grr06BorderStyle_DOUBLE;break; \
                default : grr_error(IDS_StyleBorderError); \
            }		    
            i=ParseStyleValueString(value);
            set_border(m_lborder.m_style,i);
            set_border(m_tborder.m_style,i);
            set_border(m_rborder.m_style,i);
            set_border(m_bborder.m_style,i);
		    return S_OK;
        case STYLE_BORDER_STYLE_LEFT:
            i=ParseStyleValueString(value);set_border(m_lborder.m_style,i);return S_OK;
        case STYLE_BORDER_STYLE_TOP:
            i=ParseStyleValueString(value);set_border(m_tborder.m_style,i);return S_OK;
        case STYLE_BORDER_STYLE_RIGHT:
            i=ParseStyleValueString(value);set_border(m_rborder.m_style,i);return S_OK;
        case STYLE_BORDER_STYLE_BOTTOM:
            i=ParseStyleValueString(value);set_border(m_bborder.m_style,i);return S_OK;
#undef set_border
        case STYLE_ELLIPSIS_STYLE:
            i=ParseStyleValueString(value);
            switch(i)
            {
                case STYLE_VALUE_THREEDOTS: m_elstyle = Grr06ElStyle_DOTS; return S_OK;
                case STYLE_VALUE_CUT      : m_elstyle = Grr06ElStyle_CUT;  return S_OK;
                case STYLE_VALUE_FILL     : m_elstyle = Grr06ElStyle_FILL; return S_OK;
            }
		    grr_error(IDS_StyleEllipsisError);
		    return S_OK;
        case STYLE_ELLIPSIS_CHAR:
            m_elchar = value[0];return S_OK;
        case STYLE_ELLIPSIS_MULTILINE:
            m_elmulti = bval;return S_OK;
        case STYLE_SPACING_ALL:
            wm=parse_extent_metrics(value);
            m_spacing.left=wm;
            m_spacing.top=wm;
            m_spacing.right=wm;
            m_spacing.bottom=wm;
		    return S_OK;
        case STYLE_SPACING_LEFT :
            wm=parse_extent_metrics(value);m_spacing.left=wm;  return S_OK;
        case STYLE_SPACING_TOP:
            wm=parse_extent_metrics(value);m_spacing.top=wm;   return S_OK;
        case STYLE_SPACING_RIGHT:
            wm=parse_extent_metrics(value);m_spacing.right=wm; return S_OK;
        case STYLE_SPACING_BOTTOM:
            wm=parse_extent_metrics(value);m_spacing.bottom=wm;return S_OK;
        case STYLE_PADDING_ALL:
            wm=parse_extent_metrics(value);
            m_padding.left=wm;
            m_padding.top=wm;
            m_padding.right=wm;
            m_padding.bottom=wm;
		    return S_OK;
        case STYLE_PADDING_LEFT:
            wm=parse_extent_metrics(value);m_padding.left=wm;  return S_OK;
        case STYLE_PADDING_TOP:
            wm=parse_extent_metrics(value);m_padding.top=wm;   return S_OK;
        case STYLE_PADDING_RIGHT:
            wm=parse_extent_metrics(value);m_padding.right=wm; return S_OK;
        case STYLE_PADDING_BOTTOM:
            wm=parse_extent_metrics(value);m_padding.bottom=wm;return S_OK;
        case STYLE_BACKCOLOR:
            return m_bkcolor.set(value);
		case STYLE_TEXTORIENT:
			m_orient=ival; return S_OK;
        case STYLE_INSIDEBORDER:
            m_insideborder=bval;return S_OK;
		case STYLE_TEXTLEAD:
			m_leading=atof(value); return S_OK;
        }

        public void setProperty(string prop, decimal value)
        {
            switch(prop)
            {
                case "font-faceindex":
                    SetFontFace(value);
                    return;
                case "font-size":
                    SetFontSize(value);
			        return;
            }
        }

        private bool _b(string value)
        {
            switch(value.ToLowerInvariant())
            {
                //case "false": return false;
                case "true": return true;
                //"0"		0
                case "1": return true;
                //"no"	0
                case "yes": return true;
                //-1
            }
            return false;
        }
        public void setProperty(string prop, bool value)
        {
        }

private void SetHAlign(string value)
{
            i=ParseStyleValueString(value);
            switch(i)
            {
                case STYLE_VALUE_LEFT   : m_halign = Grr06HAlign_LEFT;   return S_OK;
                case STYLE_VALUE_RIGHT  : m_halign = Grr06HAlign_RIGHT;  return S_OK;
                case STYLE_VALUE_CENTER : m_halign = Grr06HAlign_CENTER; return S_OK;
                case STYLE_VALUE_JUSTIFY: m_halign = Grr06HAlign_JUSTIFY;return S_OK;
            }
		    grr_error(IDS_StyleHorizAlignError);	    
}
private void SetVAlign(string value)
{
            i=ParseStyleValueString(value);
            switch(i)
            {
                case STYLE_VALUE_TOP    : m_valign = Grr06VAlign_TOP;    return S_OK;
                case STYLE_VALUE_BOTTOM : m_valign = Grr06VAlign_BOTTOM; return S_OK;
                case STYLE_VALUE_CENTER : m_valign = Grr06VAlign_CENTER; return S_OK;
            }
		    grr_error(IDS_StyleVertAlignError);
}
private void SetFontFace(string value)
{
            i=ParseStyleValueString(value);
            switch(i)
            {
                case STYLE_VALUE_ARIAL  : m_ffaceindex=Grr06FontFace_ARIAL;return S_OK;
                case STYLE_VALUE_COURIER: m_ffaceindex=Grr06FontFace_COURIER;return S_OK;
                case STYLE_VALUE_TIMES  : m_ffaceindex=Grr06FontFace_TIMES;return S_OK;
                case STYLE_VALUE_CUSTOM : return S_OK;
            }
		    grr_error(IDS_StyleFontError);
}
private void SetFontFace(int p)
{
		    if(ival==Grr06FontFace_ARIAL)        {m_ffaceindex=Grr06FontFace_ARIAL;}
		    else if(ival==Grr06FontFace_COURIER) {m_ffaceindex=Grr06FontFace_COURIER;}
		    else if(ival==Grr06FontFace_TIMES)   {m_ffaceindex=Grr06FontFace_TIMES;}
		    else grr_error(IDS_StyleFontFaceIndexError);
		    return S_OK;
}
private void SetFontName(string value)
{
		    m_ffaceindex=Grr06FontFace_CUSTOM;
            m_fname=value;
			CheckCustomFontName();
			if(m_ffaceindex==Grr06FontFace_CUSTOM)
			{
				IFormatGRRFontTable* ft;
				int index;
				m_format->getCustomFontTable(&ft);
				ft->addFont(&index, m_fname);
				ft->Release();
			}
}
private void SetFontSize(string value)
{
    (com as ITextHandler).Text.TextFont.Size.Value = value;
}
private void SetFontSize(int value)
{
    (com as ITextHandler).Text.TextFont.Size.Value = value;
}
private void SetFontBold(bool p)
{
    (com as ITextHandler).Text.TextFont.bol
}
*/
        #endregion
    }
}
