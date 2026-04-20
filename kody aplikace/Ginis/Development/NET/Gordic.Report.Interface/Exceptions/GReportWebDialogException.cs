//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportWebDialogException.cs        </Name>
//    <Description> výjimka pro pøerušení interpretu dialogem na LK             </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2009                  </Copyright>
//    <Created>     2009-01-13                                                  </Created>
//  </FileHeader>

using System;
using System.Resources;
using System.Reflection;
using System.Text;
using System.Runtime.CompilerServices;
using Gordic.General;
using System.Runtime.Serialization;
using Gordic.Report.CustomDialogs;

namespace Gordic.Report.Interface
{
	/// <exclude/>
	//[Serializable]	public class GReportWebDialogException : GReportException
	{
        /// <exclude/>
        [MethodImpl(MethodImplOptions.NoInlining)]
		public GReportWebDialogException(int code, string caption, int width, int height, string id, string content)
			: base()
		{
            //base.Code = code;
            Caption = caption;
            Width = width;
            Height = height;
            DialogID = id;
            Content = content;
		}
        /// <exclude/>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GReportWebDialogException(int code, string caption, int width, int height, GCustomDialogBuilder builder)
            : base()
        {
            //base.Code = code;
            Caption = caption;
            Width = width;
            Height = height;
            Builder = builder;
        }
        ///// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        ///// <param name="serializationInfo">serializovaná data výjimky</param>
        ///// <param name="streamingContext">kontext serializace</param>
        //protected GReportWebDialogException(SerializationInfo serializationInfo, StreamingContext streamingContext) : base(serializationInfo, streamingContext) { }
        //TODO: serialization vsech vlastnosti (Caption+Width+ ...)

        /// <exclude/>
        public string Caption;
        /// <exclude/>
        public int Width;
        /// <exclude/>
        public int Height;
        /// <exclude/>
        public string DialogID;
        /// <exclude/>
        public string Content;
        /// <exclude/>
        public string Render
        {
            get { return String.Format("{0}|{1}|{2}|{3}", Caption, Width, Height, DialogID); }
        }

        public GCustomDialogBuilder Builder { get; set; }
        public GReportFilesDto Files { get; set; }
    }


    /// <exclude/>
    //[Serializable]    public class GReportWebDetectException : GReportException
    {
        /// <exclude/>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GReportWebDetectException(int code, string key, int pageLen, int pageWidth)
            : base()
        {
            Key = key;
            PageLen = pageLen;
            PageWidth = pageWidth;
        }

        ///// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        ///// <param name="serializationInfo">serializovaná data výjimky</param>
        ///// <param name="streamingContext">kontext serializace</param>
        //protected GReportWebDialogException(SerializationInfo serializationInfo, StreamingContext streamingContext) : base(serializationInfo, streamingContext) { }
        //TODO: serialization vsech vlastnosti (Caption+Width+ ...)

        /// <exclude/>
        public string Key;
        /// <exclude/>
        public int PageLen;
        /// <exclude/>
        public int PageWidth;
    }
}
