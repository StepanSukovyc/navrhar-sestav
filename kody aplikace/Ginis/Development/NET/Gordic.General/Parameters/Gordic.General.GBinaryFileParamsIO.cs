//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GBinaryFileParamsIO.cs                        </Name>
//    <Description> ètení a zápis obsahu klíèe v registrech do skupiny parametrù </Description>
//    <Author>      Jiøí Dvoøák                                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                   </Copyright>
//    <Created>     2002-11-13                                                   </Created>
//  </FileHeader>


using System;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters;
using System.Runtime.Serialization.Formatters.Binary;
using Microsoft.Win32;

namespace Gordic.General {
	
    /// <summary>ètení a zápis obsahu klíèe v registrech do skupiny parametrù</summary>
	public class GBinaryFileParamsIO : GParamsIO, IGObject {

		#region Veøejná sekce
		/// <summary>
		/// Pamìovı stream 
		/// </summary>
		public MemoryStream MemStream;

		/// <summary>
		/// Øetìzec BASE64
		/// </summary>
		public string base64String;
		/// <summary> 
		/// Konstruktor 
		/// </summary>
		public GBinaryFileParamsIO()
		{
			MemStream = new MemoryStream();
		}
		/// <summary> 
		/// Destruktor 
		/// </summary>
		~GBinaryFileParamsIO()
		{
			//MemStream.Close();
			//MemStream = null;

		}
		/// <summary> 
		/// Ètení obsahu binárního souboru  do skupiny parametrù 
		///		Parametry:
		///				1. GParams  - Globální parametry.
		///				2. sGroup   - Název skupiny která se vytvoøí v globálních parametrech.
		///		Ostatní nutné nastaví :
		///				1. DataRoot - Název souboru (napø. "binfile.dat")
		///					( není-li vyplnìn 'DataRoot' provádí se ètení z MemoryStreamu 'MemStream')
		///				2. DataPath - Cesta k souboru (napø. "C:\MyFiles\")
		///					( není-li vyplnìn 'DataPath' pøedpokládá se e v 'DataRoot' je název souboru i z cestou )
		/// </summary>
		override public bool ReadGroup(GParams loParams, string lsGroup)
		{
			if (m_OutputDataType==OutDataType.fmtBinary)
				return ReadGroupBinary(loParams, lsGroup);
			else if (m_OutputDataType==OutDataType.fmtBase64)
				return ReadGroupBase64(loParams, lsGroup);
			else
				return false;
		}

		/// <summary> 
		/// Zápis skupiny parametrù do binárního souboru
		///		Parametry:
		///				1. GParams  - Globální parametry.
		///				2. sGroup   - Název skupiny která se vytvoøí v globálních parametrech.
		///		Ostatní nutné nastaví :
		///				1. DataRoot - Název souboru (napø. "binfile.dat")
		///					( není-li vyplnìn 'DataRoot' provádí se zápis do MemoryStreamu 'MemStream')
		///				2. DataPath - Cesta k souboru (napø. "C:\MyFiles\")
		///					( není-li vyplnìn 'DataPath' pøedpokládá se e v 'DataRoot' je název souboru i z cestou )
		/// </summary>
		override public bool WriteGroup(GParams loParams, string lsGroup)
		{
			if (m_OutputDataType==OutDataType.fmtBinary)
				return WriteGroupBinary(loParams, lsGroup);
			else if (m_OutputDataType==OutDataType.fmtBase64)
				return WriteGroupBase64(loParams, lsGroup);
			else
				return false;
		}
		
		#endregion 

		#region Privátní sekce

		/// <summary> 
		/// Pokud je zadána cesta vrátí jí se jménem souboru, jinak  vrátí jen jméno souboru
		/// </summary>
		private string AddPath(string file, string Path)
		{
			
			string mLocalPathName=Path;
			string mLocalFileName="";

			if (mLocalPathName==null) mLocalPathName="";

			if (mLocalPathName.Length>0)
			{
				if (Path.Substring(mLocalPathName.Length-1)=="\\")
						mLocalFileName=mLocalPathName+file;
					else
						mLocalFileName=mLocalPathName+"\\"+file;
			}
			else
				mLocalFileName=file;

			if (mLocalFileName==null) mLocalFileName="";
			return mLocalFileName;
		}


		/// <summary> 
		/// Ètení obsahu binárního souboru  do skupiny parametrù 
		/// </summary>
		private bool ReadGroupBinary(GParams loParams, string lsGroup)
		{
			string mFileName = AddPath(m_sDataRoot, m_sDataPath);
			GDParamHashTable PrmGroup;
			BinaryFormatter formatter = new BinaryFormatter();
			if (mFileName.Length>0) 
			{
				Stream stream = new FileStream(mFileName, FileMode.Open, FileAccess.Read, FileShare.Read);
				PrmGroup = (GDParamHashTable) formatter.Deserialize(stream);
				stream.Close();
				loParams.AddGroup(PrmGroup, lsGroup);
				return true;
			}
			else
			{
				MemStream.Position=0;
				PrmGroup = (GDParamHashTable) formatter.Deserialize(MemStream);
				//MemStream.Close();
				loParams.AddGroup(PrmGroup, lsGroup);
				return true;
			}
		}
		/// <summary> 
		/// Ètení obsahu souboru (base 64) do skupiny parametrù 
		/// </summary>
		private bool ReadGroupBase64(GParams loParams, string lsGroup)
		{
			string mFileName = AddPath(m_sDataRoot, m_sDataPath);
			GDParamHashTable PrmGroup;
			BinaryFormatter formatter = new BinaryFormatter();
			if (mFileName.Length>0) 
			{
				Stream stream = new FileStream(mFileName, FileMode.Open, FileAccess.Read, FileShare.Read);
				BinaryReader bread = new BinaryReader(stream);
				base64String = bread.ReadString();
				stream.Close();
			}
			MemoryStream mStream = new MemoryStream();
			BinaryWriter bWrite = new BinaryWriter(mStream);
			bWrite.Write(System.Convert.FromBase64String(base64String));
			mStream.Position=0;
			PrmGroup = (GDParamHashTable) formatter.Deserialize(mStream);
			loParams.AddGroup(PrmGroup, lsGroup);
			return true;
		}

		
		/// <summary> 
		/// Zápis skupiny parametrù do binárního souboru
		/// </summary>
		private bool WriteGroupBinary(GParams loParams, string lsGroup)
		{
			string mFileName = AddPath(m_sDataRoot, m_sDataPath);
			loParams.ThisGroup(lsGroup);
			GDParamHashTable PrmGroup = loParams.ActiveGroup();
			if (PrmGroup!=null)
			{					
				BinaryFormatter formatter = new BinaryFormatter();
				if (mFileName.Length>0)
				{
					Stream stream = new FileStream(mFileName, FileMode.Create, FileAccess.Write, FileShare.None);
					formatter.Serialize(stream, PrmGroup);
					stream.Close();
					return true;
				}
				else
				{
					//MemStream.Close();
					formatter.Serialize(MemStream, PrmGroup);
					return true;
				}
			}
			else
				return false;
		}
		
		/// <summary> 
		/// Zápis skupiny parametrù do souboru (base 64)
		/// </summary>
		private bool WriteGroupBase64(GParams loParams, string lsGroup)
		{
			base64String="";
			string mFileName = AddPath(m_sDataRoot, m_sDataPath);
			loParams.ThisGroup(lsGroup);
			GDParamHashTable PrmGroup = loParams.ActiveGroup();
			if (PrmGroup!=null)
			{					
				BinaryFormatter formatter = new BinaryFormatter();
				MemoryStream mStream = new MemoryStream();
				formatter.Serialize(mStream, PrmGroup);
				base64String = System.Convert.ToBase64String(
									mStream.GetBuffer(),
									0,
									(int) mStream.Length);
				if (mFileName.Length>0)
				{
					Stream stream = new FileStream(mFileName, FileMode.Create, FileAccess.Write, FileShare.None);
					BinaryWriter bWrite = new BinaryWriter(stream);
					bWrite.Write(base64String);
					stream.Close();
					return true;
				}
				else
				{
					return true;
				}
			}
			else
				return false;
		}



		#endregion 

	} // end class

} // end namespace
