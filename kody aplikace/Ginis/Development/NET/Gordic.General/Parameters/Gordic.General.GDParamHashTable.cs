//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDParamHashTable.cs          </Name>
//    <Description> skupina parametrù pro objekt GParams        </Description>
//    <Author>      Jiøí Dvoøák                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//    <Created>     2002-11-13                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Runtime.Serialization;


namespace Gordic.General {
	
    /// <summary>skupina parametrù pro objekt GParams</summary>
	[Serializable]
	public class GDParamHashTable : Hashtable, IGObject {
		
		/// <summary>
		/// Jméno serializované skupin
		/// </summary>
		public const string csSerializeParamGroupName = "@SerializeParamGroupName@";

		/// <summary>
		/// Jméno skupiny
		/// </summary>
		private string m_sName;
		/// <summary> 
		/// Konstruktor
		/// </summary>
		public GDParamHashTable(string Name)
		{
			m_sName=Name;
		}
		
		/// <summary>
		/// Konstrukror
		/// </summary>
		/// <param name="info">info pro deserializici</param>
		/// <param name="context">context pro deserializici</param>
        [System.Security.SecurityCritical]
        public GDParamHashTable(SerializationInfo info, StreamingContext context)
		{
			SerializationInfoEnumerator SEnum = info.GetEnumerator();
			
			while (SEnum.MoveNext())
			{
				if (SEnum.Name==csSerializeParamGroupName)
					m_sName=(string)SEnum.Value;
				else
					this.Add(SEnum.Name, SEnum.Value);
			}
		}
		/// <summary>
		/// Sezializace objektu
		/// </summary>
		/// <param name="info">info pro serializici</param>
		/// <param name="context">context pro serializici</param>
        [System.Security.SecurityCritical]
#if !NETFRAMEWORK
        [Obsolete]
#endif
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
		{				
			object ParamValue = null;
			string ParamName  = "";
			IDictionaryEnumerator Enum = this.GetEnumerator();

			info.AddValue(csSerializeParamGroupName, m_sName, m_sName.GetType());

			while (Enum.MoveNext())
			{
				ParamValue = Enum.Value;
				ParamName  = Enum.Key.ToString();
				info.AddValue(ParamName, ParamValue, ParamValue.GetType());
			}
		}
		/// <summary>
		/// Zveøejnìní jména
		/// </summary>
		public string Name
		{
			get {return m_sName;}
		}

	} // end class

} // end namespace
