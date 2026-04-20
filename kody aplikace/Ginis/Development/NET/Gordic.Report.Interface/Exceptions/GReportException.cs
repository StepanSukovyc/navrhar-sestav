//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GReportAbortException.cs                    </Name>
//    <Description> Obecná výjimka vrstvy Gordic.Report         </Description>
//    <Author>      Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2005  </Copyright>
//    <Created>     2005-09-27                                  </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.Runtime.CompilerServices;
using Gordic.General;

namespace Gordic.Report.Interface
{

	/// <summary> Základní Výjimka používaná vrstvou Gordic.Report </summary>
	/// <remarks>
	/// <para>
	/// Výjimku nelze použít samostatnì a neobsahuje žádné dodateèné informace oproti GException. 
	/// Tøídu však lze použít k rozlišení výjimky vdáleného volání od ostatních systémových a 
	/// aplikaèních výjimek. Samotná vrstva Gordic.Reporter používá další výjimky zdìdìné od této.
	/// </para>
	/// </remarks>
	[Serializable]	public class GReportException : GException
	{
        /// <exclude/>
        protected GReportException()
            : base(GResources.GetResourceText(17)) //RC 17 : Chyba reporteru
        {
        }

		/// <exclude/>
        protected GReportException(int code, int resourceCode, Assembly asm, params string[] parameters)
			: base(code,resourceCode,asm,parameters)
		{
		}

		/// <exclude/>
		protected GReportException(int code, int resourceCode, Assembly asm, Exception innerException, params string[] parameters)
			: base(code,resourceCode,asm,innerException,parameters)
		{
		}

		/// <exclude/>
		protected GReportException(int code, Assembly asm, string message)
			: base(code,asm,message,null)
		{
        }

        /// <exclude/>
        protected GReportException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context)
            : base(info, context)
        {
        }

		/// <summary>
		/// Veøejný konstruktor
		/// </summary>
		/// <param name="code">kód vyjímky</param>
		/// <param name="resourceCode">kód textu výjimky ve zdrojích</param>
		/// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
		public GReportException(int code, int resourceCode, params string[] parameters)
			: base(code,resourceCode,Assembly.GetCallingAssembly(),parameters)
		{
		}
		/// <summary>
		/// Veøejný konstruktor
		/// </summary>
		/// <param name="code">kód vyjímky</param>
		/// <param name="resourceCode">kód textu výjimky ve zdrojích</param>
		/// <param name="innerException">pùvodní výjimka</param>
		/// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GReportException(int code, int resourceCode, Exception innerException, params string[] parameters)
            : base(code, resourceCode, Assembly.GetCallingAssembly(), innerException, parameters)
		{
		}

	}
}
