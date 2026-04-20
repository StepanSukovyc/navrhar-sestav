//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GOneParam.cs                </Name>
//    <Description> podpora práce s jedním parametrem          </Description>
//    <Author>      Jiøí Dvoøák                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>     2002-11-13                                 </Created>
//  </FileHeader>

using System;

namespace Gordic.General {

	/// <summary>
	/// Podpora práce s jedním parametrem.
	/// Pokud si vyrobíme instanci této tøídy, pøistupujeme k hodnotì
	/// parametru pomocí vlastnosti value.
	/// 
	/// PrmJmeno = new GOneParam(Params, "Osoba", "Jmeno");
	/// PrmJmeno.Value = "Honza";
	/// 
	/// </summary>
	public class GOneParam {
		/// <summary>
		/// Pøíznak že objekt mùže vytvoøit skupinu parametrù
		/// </summary>
		public bool CanCreateGroup;
		/// <summary>
		/// Pøíznak že objekt mùže vytvoøit parametr ve skupinì
		/// </summary>
		public bool CanCreateParameter;
		
		/// <summary>
		/// Název skupiny parametrù
		/// </summary>
		public string Group;
		/// <summary>
		/// Název parametru
		/// </summary>
		public string Param;
		/// <summary>
		/// Implicitní hodnota parametru
		/// </summary>
		public object Default;

		/// <summary>
		/// Parametrický objekt
		/// </summary>
		private GParams moParams;

		/// <summary>
		/// Kontroa pøípadnì vytváøení parametru a skupiny
		/// </summary>
		/// <param name="PrmValue">Hodnota parametru</param>
		private void CheckParam(object PrmValue)
		{
			if (!moParams.GroupExist(Group))
				if (CanCreateGroup)
					moParams.AddGroup(Group);

			if ((!moParams.GroupExist(Group))&(PrmValue!=null))
			{
				if (!moParams.ParamExist(Group, Param))
					if (CanCreateParameter)
						moParams.AddParam(Group, Param, PrmValue);
			}
		}

		
		/// <summary>
		/// Vrací hodnotu parametru. Pokud je hodnota parametru null vrátí parametr DefaultValue
		/// </summary>
		/// <param name="DefaultValue">Implicitní hodnota</param>
		/// <returns>vrací hodnotu parametru nebo vstupní parametr</returns>
		public object NVL(object DefaultValue)
		{
			object tmpObject;
			if ((Group!=null)&(Param!=null))
			{
				CheckParam(null);
				tmpObject=moParams.GetParam(Group, Param);
				if (tmpObject==null)
					return DefaultValue;
				else
					return tmpObject;
			}
			else
				return null;
		}

		/// <summary>
		/// Vrací hodnotu parametru. Pokud je null, vrací implicitní hodnotu z (public object Default)
		/// </summary>
		public object Value
		{
			
			get
			{
				return NVL(Default);
			}
			set
			{
				if ((value!=null)&(Group!=null)&(Param!=null))
				{
					CheckParam(value);
					moParams.SetAddParam(Group, Param, value);
				}
			}
		}
		/// <summary>
		/// Maže parametr
		/// </summary>
		public void Delete()
		{
			if ((Group!=null)&(Param!=null))
				moParams.DeleteParam(Group, Param);
		}
		/// <summary>
		/// Konstruktor
		/// </summary>
		/// <param name="Params">Objekt parametrù</param>
		public GOneParam(GParams Params)
		{
			moParams=Params;
			Group=null;
			Param=null;
			CanCreateGroup=false;
			CanCreateParameter=false;
			Default=null;
		}
		/// <summary>
		/// Konstruktor
		/// </summary>
		/// <param name="Params">Objekt parametrù</param>
		/// <param name="aGroup">Název skupiny</param>
		/// <param name="aParam">Název parametru</param>
		public GOneParam(GParams Params, string aGroup, string aParam)
		{
			moParams=Params;
			Group=aGroup;
			Param=aParam;
			CanCreateGroup=false;
			CanCreateParameter=false;
			Default=null;
		}
		/// <summary>
		/// Konstruktor
		/// </summary>
		/// <param name="Params">Objekt parametrù</param>
		/// <param name="aGroup">Název skupiny</param>
		/// <param name="aParam">Název parametru</param>
		/// <param name="aCanCreateGroup">Pøíznak že mùže vytvoøit skupinu parametrù pokud neexistuje</param>
		/// <param name="aCanCreateParameter">Pøíznak že mùže vytvoøit parametr ve skupinì pokud neexistuje</param>
		public GOneParam(GParams Params,string aGroup, string aParam, bool aCanCreateGroup, bool aCanCreateParameter)
		{
			moParams=Params;
			Group=aGroup;
			Param=aParam;
			CanCreateGroup=aCanCreateGroup;
			CanCreateParameter=aCanCreateParameter;
			Default=null;
		}
		/// <summary>
		/// Statická metoda která vytváøí objekt GOneParam a vrací na nìj odkaz (vhodné použití - pro vstupní argument)
		/// </summary>
		/// <param name="Params">Objekt parametrù</param>
		/// <param name="aGroup">Název skupiny</param>
		/// <param name="aParam">Název parametru</param>
		/// <returns>Vrací vytvoøený objekt</returns>
		public static GOneParam New(GParams Params, string aGroup, string aParam)
		{
			return (new GOneParam(Params, aGroup, aParam));
		}
	
    } // end class

} // end namespace
