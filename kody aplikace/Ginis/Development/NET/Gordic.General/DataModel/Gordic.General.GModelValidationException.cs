////  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
////    <Name>        Gordic.General.GModelValidationException.cs                 </Name>
////    <Description> výjimka pro chybu validace modelu                           </Description>
////    <Author>      Martin Aliger                                               </Author>
////    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
////    <Created>     2016-06-18                                                  </Created>
////  </FileHeader>

//using System;
//using System.Resources;
//using System.Reflection;
//using System.Runtime.Serialization;
//using System.Runtime.CompilerServices;

//namespace Gordic.General {
	
//    /// <summary>výjimka pro chybu validace modelu</summary>
//    [Serializable]
//    public class GModelValidationException : GException {

//        #region vlastnosti

//        /// <summary>lokální assembly</summary>
//        private static Assembly ThisAssembly {
//            get {return typeof(GArgumentException).Assembly;}
//        } // end property

//        #endregion

//        #region konstruktory
//        private const int m_cnDefaultMessageCode = /*RC-EX*/ 21090023; //RC-EX 21090023 : Chyba validace modelu {0}

//        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
//        protected GModelValidationException() : base() {}

//        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
//        /// <param name="message">text výjimky</param>
//        protected GModelValidationException(string message) : base(message) {} 
        
//        /// <summary> konstruktor povinně odvozený ze základní třídy </summary>
//        /// <param name="serializationInfo">serializovaná data výjimky</param>
//        /// <param name="streamingContext">kontext serializace</param>
//        protected GModelValidationException(SerializationInfo serializationInfo,StreamingContext streamingContext) : base(serializationInfo,streamingContext) {}
		
//        /// <summary>veřejný konstruktor</summary>
//        /// <param name="code">kód výjimky</param>
//        /// <param name="parameter">název chybného parametru</param>
//        [MethodImpl(MethodImplOptions.NoInlining)]
//        public GModelValidationException(int code,string parameter) : base(code,Assembly.GetCallingAssembly(), PrepareMessage(m_cnDefaultMessageCode,ThisAssembly, new object[] { parameter } ), null) { }

//        /// <summary>veřejný konstruktor</summary>
//        /// <param name="code">kód výjimky</param>
//        /// <param name="innerException">původní výjimka</param>
//        [MethodImpl(MethodImplOptions.NoInlining)]
//        public GModelValidationException(int code, Exception innerException) : base(code, ThisAssembly, PrepareMessage(m_cnDefaultMessageCode, ThisAssembly, new object[] { "" }), innerException) { }

//        /// <summary>veřejný konstruktor</summary>
//        /// <param name="code">kód výjimky</param>
//        /// <param name="resourceCode">kód textu výjimky v souboru se zdroji</param>
//        /// <param name="parameters">parametry pro formátovaný text výjimky</param>
//        [MethodImpl(MethodImplOptions.NoInlining)]
//        public GModelValidationException(int code,int resourceCode,params object[] parameters) : base(code,resourceCode,Assembly.GetCallingAssembly(),null,parameters) {}
        

//        #endregion

//    } // end class
   
//} // end namespace
