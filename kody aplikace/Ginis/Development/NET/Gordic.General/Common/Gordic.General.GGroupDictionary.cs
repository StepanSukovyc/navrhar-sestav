//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GGroupDictionary.cs            </Name>
//      <Description> kolekce øetìzcù typu skupina - klíè - hodnota </Description>
//      <Author>      Jan Kuttich                                   </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021            </Copyright>
//      <Created>     2017-06-22                                    </Created>
//  </FileHeader>

using System;
using System.Reflection;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using System.Security;

namespace Gordic.General {

    /// <summary>kolekce øetìzcù typu skupina - klíè - hodnota</summary>
    [Serializable]
    public class GGroupDictionary : IGObject, ISerializable {

        #region vlastnosti

        /// <summary>data kolekce</summary>
        public Dictionary<string,Dictionary<string,string>> Data { get; set; }

        /// <summary>pøíznak existence alespoò jedné hodnoty</summary>
        [JsonIgnore]
        public bool HasData {
            get { return Data != null; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GGroupDictionary).Assembly;}
        } // end property

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GGroupDictionary() {
        } // end method

        #endregion

        #region implementace rozhraní ISerializable

        /// <summary>konstruktor pro deserializaci</summary>
        /// <param name="info">data k deserializaci</param>
        /// <param name="context">serializaèní kontext</param>
        public GGroupDictionary(SerializationInfo info,StreamingContext context) {
            string l_sData = info.GetString(nameof(Data));
            if(String.IsNullOrEmpty(l_sData) == false) Data = JsonConvert.DeserializeObject<Dictionary<string,Dictionary<string,string>>>(l_sData);
        } // end method

        /// <summary>získání dat pro serializaci</summary>
        /// <param name="info">data k serializaci</param>
        /// <param name="context">serializaèní kontext</param>
        [SecurityCritical]
        public void GetObjectData(SerializationInfo info,StreamingContext context) {
            info.AddValue(nameof(Data),HasData ? JsonConvert.SerializeObject(Data) : String.Empty,typeof(string));
        } // end method

        #endregion

        #region veøejné metody

        /// <summary>získání pøíznaku existence skupiny hodnot</summary>
        /// <param name="group">identifikátor skupiny hodnot</param>
        /// <returns>pøíznak existence skupiny hodnot</returns>
        public bool ContainsGroup(string group) {
            try {
                return HasData && IsValid(ref group) && Data.ContainsKey(group);
            } // end try
            catch(Exception e) {
                throw new GException(23200549,ThisAssembly,e); // nepodaøilo se získat pøíznak existence skupiny hodnot kolekce
            } // end catch
        } // end method

        /// <summary>získání skupiny hodnot</summary>
        /// <param name="group">identifikátor skupiny hodnot</param>
        /// <returns>skupina hodnot</returns>
        public Dictionary<string,string> GetGroup(string group) {
            try {
                Dictionary<string,string> l_oGroup = null;
                if(HasData && IsValid(ref group)) Data.TryGetValue(group,out l_oGroup);
                return l_oGroup;
            } // end try
            catch(Exception e) {
                throw new GException(23200550,ThisAssembly,e); // nepodaøilo se získat skupinu hodnot kolekce
            } // end catch
        } // end method

        /// <summary>získání hodnoty</summary>
        /// <param name="group">identifikátor skupiny hodnot</param>
        /// <param name="key">identifikátor hodnoty</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <param name="trim">pøíznak oøíznutí hodnoty</param>
        /// <returns>hodnota</returns>
        public string GetValue(string group,string key,string defaultValue = "",bool trim = true) {
            try {
                string l_sValue = null;
                Dictionary<string,string> l_oGroup = GetGroup(group);
                if(l_oGroup != null && IsValid(ref key)) l_oGroup.TryGetValue(key,out l_sValue);
                if(l_sValue == null) l_sValue = defaultValue;
                return trim ? l_sValue.Trim() : l_sValue;
            } // end try
            catch(Exception e) {
                throw new GException(23200551,ThisAssembly,e); // nepodaøilo se získat hodnotu kolekce
            } // end catch
        } // end method

        /// <summary>nastavení hodnoty</summary>
        /// <param name="group">identifikátor skupiny hodnot</param>
        /// <param name="key">identifikátor hodnoty</param>
        /// <param name="value">hodnota</param>
        public void SetValue(string group,string key,string value) {
            try {
                if(IsValid(ref group) == false) throw new GArgumentException(23200547,nameof(group));
                if(IsValid(ref key) == false) throw new GArgumentException(23200548,nameof(key));
                Dictionary<string,string> l_oGroup = GetGroup(group);
                if(l_oGroup == null) {
                    if(String.IsNullOrEmpty(value) == false) {
                        l_oGroup = new Dictionary<string,string>();
                        l_oGroup[key] = value;
                        if(HasData == false) Data = new Dictionary<string,Dictionary<string,string>>();
                        Data[group] = l_oGroup;
                    } // end if
                } else {
                    if(String.IsNullOrEmpty(value)) {
                        l_oGroup.Remove(key);
                        if(l_oGroup.Count < 1) {
                            Data.Remove(group);
                            if(Data.Count < 1) Data = null;
                        } // end if
                    } else l_oGroup[key] = value;
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200552,ThisAssembly,e); // nepodaøilo se nastavit hodnotu kolekce
            } // end catch
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>validace klíèe</summary>
        /// <param name="key">klíè jehož hodnota bude oøíznuta a v pøípadì, že je null tak nastavena na prázdnou hodnotu</param>
        /// <returns>true v pøípadì, že hodnota klíèe není prázdná, jinak false</returns>
        private bool IsValid(ref string key) {
            return (key = key.NotNullTrimmed()) != String.Empty;
        } // end method

        #endregion

    } // end class

} // end namespace

