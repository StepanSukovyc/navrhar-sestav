//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GParams.cs                   </Name>
//    <Description> knihovna obecných parametrù (hlavni objekt) </Description>
//    <Author>      Jiøí Dvoøák                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021  </Copyright>
//    <Created>     2002-11-13                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Collections;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters;
using System.Runtime.Serialization.Formatters.Binary;
using System.Xml.Serialization;


//TODO pøepracovat

namespace Gordic.General {
	
    /// <summary> 
	/// Hlavní rámec pro práci se skupinami parametrù sloužící zejména pro konfiguraci aplikace.
	/// S parametry lze manipulivat pomocí veøejných metod 
	/// a pomocí sady objektù zdìdìných z 'GParamsIO' 
	/// ('GParamsIO' = Tøída pro naèítání a zápis skupin parametrù z externího zdroje)
	/// </summary>
	[Serializable]
    [System.Diagnostics.DebuggerStepThrough]
    public class GParams : IGObject, IEnumerable
    {

		#region PRIVATE SECTION

        /// <summary>
        /// Implicitni jmeno skupiny parametru
        /// </summary>
        public const string DefaultParamsGroupName = "DefaultParamsGroupName";
		/// <summary>
		/// Jméno skupiny, pokud se používá jen jedna
		/// </summary>
        private string msMainGroupName = DefaultParamsGroupName;
		/// <summary> 
		/// Základni objekt - sada skupin parametru 
		/// </summary>
		private Hashtable HtGroups;
		/// <summary> 
		/// Objekt pro pontrolu jmenné konvence
		/// </summary>
		private GParamNamesConvention PrmNameCon;
		/// <summary> 
		/// IDictionaryEnumerator - pro skupiny parametrù
		/// </summary>
		private IDictionaryEnumerator GroupEnum = null;
		/// <summary> 
		/// IDictionaryEnumerator - pro parametry ve skupinì
		/// </summary>
		private IDictionaryEnumerator ParamEnum = null;
		/// <summary> 
		/// Aktivní sada parametrù pro výèet 
		/// </summary>
		private GDParamHashTable ActiveParamSet  = null; 
		/// <summary> 
		/// Aktivní parametr pro výèet 
		/// </summary>
		private object		     ActiveParameter = null; 
		/// <summary> 
		/// Vytvoøí a vrátí skupinu jména 'GroupName' , pokud již existuje, tak vrací null
		/// </summary>
		private GDParamHashTable CreateParametersGroup(string GroupName)
		{
			GDParamHashTable TempHt = null;
			if (!HtGroups.ContainsKey(GroupName))
			{
				TempHt = new GDParamHashTable(GroupName);
				HtGroups.Add(GroupName,  TempHt);
			}
			return TempHt;
		}
		/// <summary> 
		/// Pøidá skupinu 'Htable' jména 'GroupName' , pokud již existuje, tak vrací false
		/// </summary>
		private bool AddParametersGroup(GDParamHashTable Htable, string GroupName)
		{
			if (!HtGroups.ContainsKey(GroupName))
			{
				HtGroups.Add(GroupName,  Htable);
				return true;
			}
			return false;
		}

		/// <summary> 
		/// Pøidá a vrátí skupinu 'TempHt' jména 'GroupName', pokud již existuje, tak vrací null  
		/// </summary>
		private GDParamHashTable AddParametersGroup(string GroupName, GDParamHashTable TempHt)
		{
			if (!HtGroups.ContainsKey(GroupName))
			{
				HtGroups.Add(GroupName,  TempHt);
			}
			return TempHt;
		}
		/// <summary> 
		/// Vytoøí parametr 'ParamName' ve skupinì 'GroupName' o hodnotì 'ParamValue' vrací výsledek operace true=bez chyb
		/// </summary>
		private bool CreateNewParameter(string GroupName, string ParamName, object ParamValue)
		{
			GDParamHashTable TempHt = GetParametersGroup(GroupName);
			if (TempHt!=null)
			{
				if (TempHt.ContainsKey(ParamName))
				{
					return false;					
				}
				else
				{
					TempHt.Add(ParamName, ParamValue);
					return true;
				}
			}
			else
			{
				return false;
			}
		}
		/// <summary> 
		/// Vrátí skupinu parametrù jména 'GroupName', pokud neexistuje vráti 'null' 
		/// </summary>
		private GDParamHashTable GetParametersGroup(string GroupName)
		{
			if (HtGroups.ContainsKey(GroupName))
				return (GDParamHashTable) HtGroups[GroupName];
			else
				return null;
		}
		/// <summary> 
		/// Vrátí parametr ve skupinì 'GroupName', jménna 'ParamName', pokud neexistuje vráti 'null' 
		/// </summary>
		private object GetOneParameter(string GroupName, string ParamName)
		{
			object oParam=null;
			GDParamHashTable HtParams =GetParametersGroup(GroupName); 
			if (HtParams !=null)
			{
				if (HtParams.ContainsKey(ParamName))
					oParam = HtParams[ParamName];
				else
					oParam = null;
			}
			return oParam;
		}
		/// <summary> 
		/// Odebere skupinu jména "GroupName" (pokud existuje) vrací výsledek operace
		/// </summary>
		private bool DeleteParametersGroup(string GroupName)
		{
			if (HtGroups.ContainsKey(GroupName))
			{
				HtGroups.Remove(GroupName);
				return true;
			}
			else
			{
				return false;
			}
		}
		/// <summary> 
		/// Odebere parametr jména "ParamName" va skupinì "GroupName" - pokud existuje
		/// </summary>
		private bool DeleteOneParameter(string GroupName, string ParamName)
		{
			GDParamHashTable HTemp;

			HTemp = GetParametersGroup(GroupName);
			if (HTemp!=null)
			{
				if (HTemp.ContainsKey(ParamName))
				{
					HTemp.Remove(ParamName);
					return true;
				}
				else
					return false;
			}
			else
				return false;
		}
		/// <summary> 
		/// Vráti typ parametru ve skupinì 'GroupName', jména 'ParamName', pokud neexistuje vrátí 'null' 
		/// </summary>
		private string GetParameterType(string GroupName, string ParamName)
		{
			object oParam=GetOneParameter(GroupName, ParamName);
			if (oParam!=null)
				return oParam.GetType().Name;
			else
				return null;
		}
		
		private int AssignParameters(GParams prmSource, bool bReplace)
		{
			MemoryStream SourcStream = new MemoryStream();
			BinaryFormatter formatter = new BinaryFormatter();

			int GroupCounter=0;
			string TmpGroupName="";
			string TmpParampName="";
			object TmpObject;

			GDParamHashTable TmpGroup;
			GDParamHashTable NewGroup;
			// -----------------------
			prmSource.InitEnumGroups();
			while (prmSource.NextGroup(ref TmpGroupName))
			{
				SourcStream.Position=0;
				TmpGroup = prmSource.ActiveGroup();
				formatter.Serialize(SourcStream, TmpGroup);

				SourcStream.Position=0;
				NewGroup = (GDParamHashTable) formatter.Deserialize(SourcStream);
				if (this.AddGroup( NewGroup, TmpGroupName)) 
				{
					GroupCounter++;
				}
				else
				{
					prmSource.InitEnumParams();
					while (prmSource.NextParam(ref TmpParampName))
					{
						TmpObject = prmSource.ActiveParam();
						if (bReplace)
							this.SetAddParam(TmpGroupName, TmpParampName, TmpObject);
						else
							this.AddParam(TmpGroupName, TmpParampName, TmpObject);
					}

					GroupCounter--;
				}
			}
			return GroupCounter;
		}
	
		#endregion

		#region PUBLIC SECTION

		/// <summary> 
		/// Konstruktor - vytvoøí prázdný základní objekt HtGroups - skupiny parametrù 
		///             - vytvoøí objekt 'PrmNameCon' pro kontrou jmenné konvecce parametrù
		/// </summary>
		public GParams()
		{
			HtGroups = new Hashtable();
			PrmNameCon = new GParamNamesConvention(false);
		}
		/// <summary>
		/// Konstruktor - vytvoøí skupinu a v ní parametry
		/// </summary>
		/// <param name="GroupName">jméno skupiny</param>
		/// <param name="Params">sada parametrù (lichý=klíè, sudý=hodnota)</param>
		public GParams(string GroupName, params object[] Params)
		{
			HtGroups = new Hashtable();
			PrmNameCon = new GParamNamesConvention(false);
			DefineGroup(GroupName,Params);
		}
		/// <summary> 
		/// Vložení nové skupiny parametrù
		/// </summary>
		public bool AddGroup(string GroupName)
		{
			if (PrmNameCon.ValidateName(GroupName))
			{
				GDParamHashTable PrmsHT = CreateParametersGroup(GroupName);
				if (PrmsHT!=null)
					return true;
				else
					return false;
			}
			else
				return false;
		}
		/// <summary> 
		/// Vložení nové skupiny parametrù
		/// </summary>
		public bool AddGroup(GDParamHashTable Htable, string GroupName)	
		{
			return AddParametersGroup(Htable, GroupName);
		}

		/// <summary> 
		/// Smazáni skupiny parametrù 
		/// </summary>
		public bool DeleteGroup(string GroupName)
		{
			return DeleteParametersGroup(GroupName);
		}
		/// <summary> 
		/// Vložení nové privátni skupiny parametrù 
		/// </summary>
		public bool AddPrivateGroup(string GroupName)
		{
			if (PrmNameCon.ValidateName(GroupName))
			{
				GDParamHashTable PrmsHT = CreateParametersGroup(GroupName);
				if (PrmsHT!=null)
				{
					//PrmsHT.WriteLock = true;
					return true;
				}
				else
					return false;
			}
			else
				return false;
		}
		/// <summary> 
		/// Vložení nového parametru 
		/// </summary>
		public bool AddParam(string GroupName, string ParamName, object ParamValue)
		{
			string LocalParamName = ParamName;

			if (PrmNameCon.ValidateName(LocalParamName))
			{
				return CreateNewParameter(GroupName, LocalParamName, ParamValue);
			}
			else
				return false;
		}
		/// <summary> 
		/// Vložení nového parametru 
		/// </summary>
		public bool AddParam(string ParamName, object ParamValue)
		{
            if (msMainGroupName != null)
			{
                if (!GroupExist(msMainGroupName)) CreateParametersGroup(msMainGroupName);

				string LocalParamName = ParamName;
				if (PrmNameCon.ValidateName(LocalParamName))
				{
                    return CreateNewParameter(msMainGroupName, LocalParamName, ParamValue);
				}
				else
					return false;
			}
			else
				return false;
		}
		
		/// <summary> 
		/// Nastaveni hodnoty parametru 
		/// </summary>
		public bool SetParam(string GroupName, string ParamName, object ParamValue)
		{
			string LocalParamName = ParamName;

			if (PrmNameCon.ValidateName(LocalParamName))
			{
				DeleteOneParameter(GroupName, LocalParamName);
				return CreateNewParameter(GroupName, LocalParamName, ParamValue);
			}
			else
				return false;
		}
		/// <summary>
		/// 
		/// </summary>
		/// <param name="ParamName"></param>
		/// <param name="ParamValue"></param>
		/// <returns></returns>
		public bool SetParam(string ParamName, object ParamValue)
		{
            if (msMainGroupName != null)
			{
				string LocalParamName = ParamName;
				if (PrmNameCon.ValidateName(LocalParamName))
				{
                    DeleteOneParameter(msMainGroupName, LocalParamName);
                    return CreateNewParameter(msMainGroupName, LocalParamName, ParamValue);
				}
				else
					return false;
			}
			else 
				return false;
		}
		/// <summary> 
		/// Nastaveni hodnoty parametru , pokud neexistuje tak je vytvoøen
		/// </summary>
		public bool SetAddParam(string GroupName, string ParamName, object ParamValue)
		{
			if (SetParam(GroupName, ParamName, ParamValue))
			{
				return true;
			}
			else
				return AddParam(GroupName, ParamName, ParamValue);
		}
		/// <summary>
		/// 
		/// </summary>
		/// <param name="ParamName"></param>
		/// <param name="ParamValue"></param>
		/// <returns></returns>
		public bool SetAddParam(string ParamName, object ParamValue)
		{
            if (msMainGroupName != null)
			{
                if (SetParam(msMainGroupName, ParamName, ParamValue))
				{
					return true;
				}
				else
                    return AddParam(msMainGroupName, ParamName, ParamValue);
			}
			else
				return false;
		}


		/// <summary> 
		/// Vrátí hodnotu parametru 
		/// </summary>
		public object GetParam(string GroupName, string ParamName)
		{
			return GetOneParameter(GroupName, ParamName);
		}
		/// <summary>
		/// Vrátí hodnotu parametru 
		/// </summary>
		/// <param name="ParamName"></param>
		/// <returns></returns>
		public object GetParam(string ParamName)
		{
            if (msMainGroupName != null)
                return GetOneParameter(msMainGroupName, ParamName);
			else
				return null;
		}

		/// <summary> 
		/// Smaže parametr
		/// </summary>
		public bool DeleteParam(string GroupName, string ParamName)
		{
			return this.DeleteOneParameter(GroupName, ParamName);
		}
		/// <summary>
		/// 
		/// </summary>
		/// <param name="ParamName"></param>
		/// <returns></returns>
		public bool DeleteParam(string ParamName)
		{
            if (msMainGroupName!= null)
                return this.DeleteOneParameter(msMainGroupName, ParamName);
			else
				return false;
		}
		/// <summary> 
		/// Vráti parametr jako øetìzec, pokud ho nenajde vrátí "" 
		/// </summary>
		public string GetParamStrValue(string GroupName, string ParamName)
		{
			object o = GetOneParameter(GroupName, ParamName);
			if (o!=null)
			{
				return o.ToString();
			}
			else
				return "";
		}
		
		/// <summary>
		/// 
		/// </summary>
		/// <param name="ParamName"></param>
		/// <returns></returns>
		public string GetParamStrValue(string ParamName)
		{
            if (msMainGroupName != null)
			{
                object o = GetOneParameter(msMainGroupName, ParamName);
				if (o!=null)
				{
					return o.ToString();
				}
				else
					return "";
			}
			return "";
		}


		/// <summary> 
		/// Vráti øetìzec ve tvaru 'JménoParametru=HornotaParametru'
		/// </summary>
		public string GetParamNameValue(string GroupName, string ParamName)
		{
			object o = GetOneParameter(GroupName, ParamName);
			if (o!=null)
			{
				return ParamName+"="+o.ToString();
			}
			else
				return "";
		}
		/// <summary>
		/// 
		/// </summary>
		/// <param name="ParamName"></param>
		/// <returns></returns>
		public string GetParamNameValue(string ParamName)
		{
            if (msMainGroupName != null)
			{
                object o = GetOneParameter(msMainGroupName, ParamName);
				if (o!=null)
				{
					return ParamName+"="+o.ToString();
				}
				else
					return "";
			}
			else
				return "";
		}

		/// <summary> 
		/// Vrati typ parametru ( object.GetType() )
		/// </summary>
		public string GetType(string GroupName, string ParamName)
		{
			return GetParameterType(GroupName, ParamName);
		}
		/// <summary> 
		/// Inicializuje enumerator skupin na první nalezenou skupinu
		/// </summary>
		public bool InitEnumGroups()
		{
			GroupEnum = HtGroups.GetEnumerator();
			ActiveParamSet  = null; 
			ActiveParameter = null; 
			return (GroupEnum!=null);
		}
		/// <summary> 
		/// Inicializuje enumerator parametrú nad aktivní sadou parametrù, 
		/// </summary>
		public bool InitEnumParams()
		{
			if ((ActiveParamSet!=null) & (GroupEnum!=null))
			{
				ParamEnum       = ActiveParamSet.GetEnumerator();
				ActiveParameter = null; 
				return (ParamEnum!=null);
			}
			else
				return false;
		}

		/// <summary> 
		/// Najde skupinu jména 'strGroupName' a nastaví jí jako aktuální
		/// </summary>
		public bool ThisGroup(string strGroupName)
		{
			ActiveParamSet=GetParametersGroup(strGroupName);
			if (ActiveParamSet!=null)
			{
				ParamEnum       = ActiveParamSet.GetEnumerator();
				ActiveParameter = null; 
				return (ParamEnum!=null);
			}
			else
				return false;
		}
		
		/// <summary> 
		/// Najde první - nebo další skupinu a nastaví jí jako aktuální
		/// </summary>
		public bool NextGroup(ref string GroupName)
		{
			if (GroupEnum!=null)
			{
				if (GroupEnum.MoveNext())
				{
					ActiveParamSet  = GroupEnum.Value as GDParamHashTable;
					GroupName       = GroupEnum.Key.ToString();
					ActiveParameter = null;
					return true;
				}
				else
				{
					ActiveParamSet  = null;
					GroupName       = null;
					ActiveParameter = null; 
					return false;
				}
			
			}
			else
				return false;
		}
		/// <summary> 
		/// Najde první - nebo další parametr v aktivní skupinì parametrù
		/// Ta se nastaví metodou 'NextGroup(ref string GroupName)' nebo 'ThisGroup(string strGroupName)'
		/// </summary>
		public bool NextParam(ref string ParamName)
		{
			if (ParamEnum!=null)
			{
				if (ParamEnum.MoveNext())
				{
					ActiveParameter = ParamEnum.Value;
					ParamName       = ParamEnum.Key.ToString();
					return true;
				}
				else
				{
					ParamName	    = "";
					ActiveParameter = null; 
					return false;
				}
			}
			else
				return false;
		}

		/// <summary> 
		/// Vrátí skupinu nalezenou metodou ( ThisGroup(string strGroupName) )
		/// </summary>
		public GDParamHashTable ActiveGroup()
		{
			return ActiveParamSet;
		}
		/// <summary> 
		/// Vrátí parametr nalezený metodou ( NextParam(ref string ParamName) )
		/// </summary>
		public object ActiveParam()
		{
			return ActiveParameter;
		}
		/// <summary>
		/// Nahraje všechny skupiny a parametry z objektu 'prmSource'
		/// pokud parametr ve skupinì již existuje, není pøepsán novým
		/// </summary>
		/// <param name="prmSource">Zdroj parametrù</param>
		/// <returns>Vrací poèet vytvoøených skupin</returns>
		public int Assign(GParams prmSource)
		{
			return AssignParameters(prmSource, false);
		}
		/// <summary>
		/// Nahraje všechny skupiny a parametry z objektu 'prmSource'
		/// </summary>
		/// <param name="prmSource">Zdroj parametrù</param>
		/// <param name="bReplace">pokud je true tak se hodnota existujícího parametru pøepíše</param>
		/// <returns>Vrací poèet vytvoøených skupin</returns>
		public int Assign(GParams prmSource, bool bReplace)
		{
			return AssignParameters(prmSource, bReplace);
		}

		/// <summary>
		/// Vymaže všechny skupiny vèetnì parametrù které obsahují
		/// </summary>
		/// <returns>True pokud nedojde k chybì</returns>
		public bool Clear()
		{
			GDParamHashTable ParamSet;
			IDictionaryEnumerator GEnum = HtGroups.GetEnumerator();
			while (GEnum.MoveNext())
			{
				ParamSet = GEnum.Value as GDParamHashTable;
				ParamSet.Clear();
			}
			HtGroups.Clear();
			return true;
		}
		
		/// <summary>
		/// Test existence skupiny
		/// </summary>
		/// <param name="GroupName">název skupiny</param>
		/// <returns>vrací true pokud skupina existuje</returns>
		public bool GroupExist(string GroupName)
		{
			return (HtGroups.ContainsKey(GroupName));
		}
		/// <summary>
		/// Test existence parametru
		/// </summary>
		/// <param name="GroupName">název skupiny</param>
		/// <param name="ParamName">název parametru </param>
		/// <returns>vrací true pokud parametr existuje</returns>
		public bool ParamExist(string GroupName, string ParamName)
		{
			object o = GetOneParameter(GroupName, ParamName);
			if (o==null) return false;
			else return true;
		}
		/// <summary>
		/// Serializuje celý objekt do øetìzce Base64
		/// </summary>
		/// <returns>vrací øetìzec base64</returns>
		public string GetData()
		{
			string base64String="";
			BinaryFormatter formatter = new BinaryFormatter();
			MemoryStream mStream = new MemoryStream();
			formatter.Serialize(mStream, this);
			base64String = System.Convert.ToBase64String(
				mStream.GetBuffer(),
				0,
				(int) mStream.Length);
			return base64String;
		}
		/// <summary>
		/// Provede deserializaci øetìzce Base64 do GParams
		/// </summary>
		/// <param name="base64String">vstupní øetìzec</param>
		/// <returns>vrací instanci GParams</returns>
		public static GParams SetData(string base64String)
		{
			BinaryFormatter formatter = new BinaryFormatter();
			MemoryStream mStream = new MemoryStream();
			BinaryWriter BinWriter = new BinaryWriter(mStream);

			BinWriter.Write(System.Convert.FromBase64String(base64String));
			mStream.Position=0;
			return (GParams) formatter.Deserialize(mStream);
		}
		/// <summary>
		/// Definice skupiny dle jména a sady parametrù
		/// </summary>
		/// <param name="GroupName">jméno skupiny</param>
		/// <param name="Params">sada parametrù (lichý=klíè, sudý=hodnota)</param>
		public void DefineGroup(string GroupName, params object[] Params)
		{
			if ((GroupName!=null)&(Params!=null))
			{
				AddGroup(GroupName);
				for (int i=0;i<Params.Length;i++)
				{
					if ((i+1)<Params.Length)
						AddParam(GroupName,(string)Params[i], Params[i+1]);
					else
						break;
				}
			}
		}


		/// <summary>
		/// Vrací skupinu parametrù dle indexu
		/// </summary>
		public GDParamHashTable this [string GroupName]
		{
			get {return GetParametersGroup(GroupName);}
		}

		
		/// <summary>
		/// Vrací enumerátor skupin
		/// </summary>
		/// <returns>enumerátor skupin</returns>
		public GParamGroupsEnumerator GetEnumerator()
		{
			return new GParamGroupsEnumerator(HtGroups);
		}
		
		#endregion

		#region IEnumerable Members

		IEnumerator System.Collections.IEnumerable.GetEnumerator()
		{
			return new GParamGroupsEnumerator(HtGroups);
		}

		#endregion

        /// <summary>
		/// Implicitní jméno hlavní skupiny. Nastavením hodnoty se skupina vytvoøí.
		/// Pak je možné manipulovat s parametry táto skupiny pomocí metod,
		/// které nemají parametr se jménem skupiny, což ulehèí zápis.
		/// </summary>
		public string MainGroupName	{
			set	{
                msMainGroupName = value;
                if (msMainGroupName != null)
                    if (!GroupExist(msMainGroupName))
                        CreateParametersGroup(msMainGroupName);
			} // end method
			get { return msMainGroupName; }
		} // end property

    } // end class

} // end namespace
