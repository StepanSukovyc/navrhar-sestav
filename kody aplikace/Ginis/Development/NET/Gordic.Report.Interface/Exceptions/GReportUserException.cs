//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportUserException.cs             </Name>
//    <Description> Uživatelká vyjímka pro interpreter                          </Description>
//    <Author>      Jan Brabec, Martin Aliger                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2013                            </Copyright>
//    <Created>     2003-08-21                                                  </Created>
//  </FileHeader>

// 2005-09-26  Martin Aliger prevezmuto

using System;
using System.Resources;
using System.Reflection;
using System.Text;
using System.Runtime.CompilerServices;
using Gordic.General;

namespace Gordic.Report.Interface
{
	/// <summary>Výjimka vyhozená autorem sestavy bìhem jejího zpracování.</summary>
	/// <remarks>
	/// <para>
	/// Výjimku nelze použít samostatnì a neobsahuje žádné dodateèné informace oproti GException. 
	/// Tøídu však lze použít k rozlišení výjimky reporteru od ostatních systémových a 
	/// aplikaèních výjimek
	/// </para>
	/// </remarks>
	[Serializable]    public class GReportUserException : GNonFatalException //MAL zmena 68: GReportException
	{
        ///// <summary>
        ///// Veøejný konstruktor
        ///// </summary>
        ///// <param name="code">kód vyjímky</param>
        ///// <param name="message">text výjimky</param>
        //[MethodImpl(MethodImplOptions.NoInlining)]
        //public GReportUserException(int code, string message)
        //    : base(code,Assembly.GetCallingAssembly(),message)
        //{
        //}

		/// <exclude/>
        protected GReportUserException(int code, int resourceCode, Assembly asm, params string[] parameters)
			: base(code,resourceCode,asm,parameters)
		{
		}

		/// <exclude/>
		protected GReportUserException(int code, int resourceCode, Assembly asm, Exception innerException, params string[] parameters)
			: base(code,resourceCode,asm,innerException,parameters)
		{
		}

		/// <summary>
		/// Veøejný konstruktor
		/// </summary>
		/// <param name="code">kód vyjímky</param>
		/// <param name="resourceCode">kód textu výjimky ve zdrojích</param>
		/// <param name="parameters">parametry pro formátovaný text výjimky</param>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public GReportUserException(int code, int resourceCode, params string[] parameters)
			: base(code,resourceCode,Assembly.GetCallingAssembly(),parameters)
		{
		}

        /// <exclude/>
        protected GReportUserException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context)
            : base(info, context)
        {
        }

	}
}
