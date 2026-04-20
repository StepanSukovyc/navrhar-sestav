//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GReportAbortException.cs                   </Name>
//    <Description> Výjimka pro pøerušení generování sestavy    </Description>
//    <Author>      Jan Brabec, Martin Aliger                   </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2005  </Copyright>
//    <Created>     2003-08-21                                  </Created>
//  </FileHeader>

using System;
using System.Resources;
using System.Reflection;
using System.Text;
using System.Runtime.CompilerServices;
using Gordic.General;

namespace Gordic.Report.Interface
{
	/// <summary> Výjimka používaná vrstvou Gordic.Report.Client </summary>
	/// <remarks>
	/// <para>
	/// Výjimku nelze použít samostatnì a neobsahuje žádné dodateèné informace oproti GException. 
	/// Tøídu však lze použít k rozlišení výjimky reporteru od ostatních systémových a 
	/// aplikaèních výjimek
	/// </para>
	/// </remarks>
	[Serializable]
	public class GReportAbortException : GNonFatalException //MAL zmena 68: GReportException
	{
		/// <summary>
		/// Veøejný konstruktor
		/// </summary>
		/// <param name="code">kód vyjímky</param>
		/// <param name="resourceCode">kód textu výjimky ve zdrojích</param>
		/// <param name="parameters">parametry pro formátovaný text výjimky</param>
		[MethodImpl(MethodImplOptions.NoInlining)]
		public GReportAbortException(int code, int resourceCode, params string[] parameters)
			: base(code, resourceCode, Assembly.GetCallingAssembly(), parameters)
		{
		}

		///// <summary>
		///// Veøejný konstruktor
		///// </summary>
		//[MethodImpl(MethodImplOptions.NoInlining)]
		//public GReportAbortException(int code, string message)
		//    : base(code, Assembly.GetCallingAssembly(), message)
		//{
		//}

		/// <summary>
		/// Veøejný konstruktor
		/// </summary>
		[MethodImpl(MethodImplOptions.NoInlining)]
		public GReportAbortException(string message)
			: base(message)
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
		public GReportAbortException(int code, int resourceCode, Exception innerException, params string[] parameters)
			: base(code, resourceCode, Assembly.GetCallingAssembly(), innerException, parameters)
		{
		}

		/// <exclude/>
		protected GReportAbortException(System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context)
			: base(info, context)
		{
		}

		/// <summary>
		/// Zda je pøipojeno hlášení
		/// </summary>
		public bool HasMessage
		{
			get { return (ShortMessage.Trim() != "" && ShortMessage.Trim() != "-"); }
		}

		/// <summary>chybové hlášení</summary>
		public override string Message
		{
			get
			{
				StringBuilder l_oMessageBuilder = new StringBuilder();
				//if (ShortMessage.StartsWith(Prefix) == false) AppendPrefix(l_oMessageBuilder);
				l_oMessageBuilder.Append(GResources.GetResourceText(38));  //RC 38 : Sestava byla pøerušena
				if (HasMessage)
				{
					l_oMessageBuilder.Append(": ");
					l_oMessageBuilder.Append(ShortMessage);
				}
				//AppendPostfix(l_oMessageBuilder, Code, AssemblyName, AssemblyVersion);
				return l_oMessageBuilder.ToString();
			}
		}

	}
}
