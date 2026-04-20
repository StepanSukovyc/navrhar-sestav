//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.ActivatedObjectAttribute.cs              </Name>
//      <Description> atribut pro deklaraci aktivovaného objektu pro rozhraní </Description>
//      <Author>      Jan Kuttich                                             </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                      </Copyright>
//      <Created>     2004-03-19                                              </Created>
//  </FileHeader>
using System;
using System.Reflection;

namespace Gordic.General {
	
    /// <summary>atribut pro deklaraci aktivovaného objektu pro rozhraní</summary>
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple=false)]
    public class ActivatedObjectAttribute : Attribute, IGObject {
		
        #region soukromé konstanty

        /// <summary>oddìlovaè èástí v názvu typu aktivovaného objektu</summary>
        private const string m_csTypeNamePartsSeparator = ".";

        /// <summary>jmenný prostor Gordic</summary>
        private const string m_csGordic = "Gordic";
        
        #endregion

        #region soukromé èleny

        /// <summary>název typu aktivovaného objektu</summary>
        private string m_sTypeName = String.Empty;

        /// <summary>jmenný prostor aktivovaného objektu</summary>
        private string m_sNamespace = String.Empty;

        #endregion
    
        #region vlastnosti

        /// <summary>název typu aktivovaného objektu</summary>
        public string TypeName {
            get { return m_sTypeName; }
        } // end property

        /// <summary>jmenný prostor aktivovaného objektu</summary>
        public string Namespace {
            get { return m_sNamespace; } // end method
        } // end property

        /// <summary>název assembly aktivovaného objektu</summary>
        public string AssemblyName {
            get { return m_sNamespace; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(ActivatedObjectAttribute).Assembly;}
        } // end property

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        /// <param name="typeName">název typu aktivovaného objektu vèetnì jmenného prostoru</param>
        public ActivatedObjectAttribute(string typeName) {
            if(typeName==null || (typeName=typeName.Trim()) == String.Empty) throw new GException(23200173,ThisAssembly); // název typu aktivovaného objektu není deklarován
            string [] l_asTypeNameParts = typeName.Split(m_csTypeNamePartsSeparator.ToCharArray());
            if(l_asTypeNameParts.Length<3 || l_asTypeNameParts.Length>4 || l_asTypeNameParts[0]!=m_csGordic) throw new GException(23200174,ThisAssembly,typeName); // nesprávnì deklarovaný název typu aktivovaného objektu {0}
            m_sTypeName = typeName;
            m_sNamespace = typeName.Substring(0,typeName.Length - l_asTypeNameParts[l_asTypeNameParts.Length-1].Length - 1);
        } // end method

        #endregion
	
    } // end class

} // end namespace
