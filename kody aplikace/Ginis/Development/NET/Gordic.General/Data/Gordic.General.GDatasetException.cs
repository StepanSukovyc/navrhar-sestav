//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        GDatasetException.cs                                     </Name>
//    <Description> Spoleèná výjimka pro Gordic.Data                         </Description>
//    <Author>      Martin Aliger                                            </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                    </Copyright>
//    <Created>     2005-03-11                                               </Created>
//  </FileHeader>


using System;
using System.Reflection;
using System.Runtime.Serialization;

namespace Gordic.General {

	/// <summary>výjimka pøi práci s datasety nebo propojeními</summary>
	[Serializable]
    [System.Security.SecuritySafeCritical]
    public class GDatasetException : GException
    {

        internal GDatasetException(int code,params string[] parameters)
            : base(code,Assembly.GetExecutingAssembly(),parameters) {
        }

        internal GDatasetException(int code, int resourceCode, params string[] parameters)
			: base(code,resourceCode,Assembly.GetExecutingAssembly(),parameters) {
		}

        internal GDatasetException(int code,Exception innerException,params string[] parameters)
            : base(code,Assembly.GetExecutingAssembly(),innerException,parameters) {
        }

		internal GDatasetException(int code, int resourceCode, Exception innerException, params string[] parameters)
			: base(code,resourceCode,Assembly.GetExecutingAssembly(),innerException,parameters) {
		}

        /// <summary> konstruktor povinnì odvozený ze základní tøídy </summary>
        /// <param name="serializationInfo">serializovaná data výjimky</param>
        /// <param name="streamingContext">kontext serializace</param>
        protected GDatasetException(SerializationInfo serializationInfo, StreamingContext streamingContext) : base(serializationInfo, streamingContext) { }

	} // end class

} // end namespace
 
