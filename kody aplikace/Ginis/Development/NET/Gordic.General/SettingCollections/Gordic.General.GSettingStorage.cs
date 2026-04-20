//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationClient.GSettingCollection.cs         </Name>
//    <Description> Trida pro ulozeni hodnot nastaveni jednoho uzivatelskeho profilu</Description>
//    <Author>      Tomáš Skála                                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2014-02-05                                                  </Created>
//  </FileHeader>

using System;
using System.Xml.Linq;
using System.Xml.XPath;
using System.Linq;
using System.Collections.Generic;

using Gordic.General;
using System.Text;
using System.IO;
using System.Drawing;
using System.Reflection;
using System.Data;
using System.Xml.Serialization;

namespace Gordic.General {
    /// <summary> Trida pro ulozeni hodnot 
    /// </summary>
    public class GSettingStorage: IGObject {
        /// <summary> XML namespace pro standardni prefix xsi:
        /// </summary>
        public static XNamespace XsiNamespace = "http://www.w3.org/2001/XMLSchema-instance"; 

        #region Vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GSettingStorage).Assembly; }
        } // end property

        private XElement m_oXml = null; 
        /// <summary> interni ulozeni hodnot profilu
        /// </summary>
        protected internal XElement Xml {
            get { return m_oXml; } // end get 
            set { m_oXml = value; } // end set 
        } // end property

        /// <summary> Vychozi XML namespace ziskany z aktualniho XmlRootu
        /// </summary>
        public XNamespace RootNamespace {
            get { return Xml.Name.Namespace; } // end get
        } // end property

        private Action m_oOnDataChanged = null; 
        /// <summary> delegat volany pri zmene hodnot v ulozisti (public kvuli extensions)
        /// </summary>
        public Action OnDataChanged {
            get { return m_oOnDataChanged ?? delegate() { }; } // end get 
            protected internal set { m_oOnDataChanged = value; } // end set 
        } // end property

        #endregion 

        #region konstruktory 

        /// <summary> interni konstruktor
        /// </summary>
        protected internal GSettingStorage() {
        } // end constructor

        /// <summary>Konstruktor</summary>
        /// <param name="xmlRoot">kontextovy XElement, ktery bude pouzit jako uloziste hodnot</param>
        /// <param name="onDataChanged">delegat, ktery je volan pri zmene hodnot v ulozisti</param>
        public GSettingStorage(XElement xmlRoot, Action onDataChanged = null) {
            Xml = xmlRoot;
            OnDataChanged = onDataChanged;
        } // end constructor

        #endregion

        #region verejne metody 

        /// <summary>vytvoreni noveho VirtualIDProvideru (pouziti s metodami ReadVirtualList, WriteVirtualList), ktery v sobe nese spravny Storage a root element pro seznamy</summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public GVirtualStoredListItem CreateNewVirtualIDProvider(string id) {
            return new GVirtualStoredListItem(new XElement(RootNamespace + "item", new XAttribute("id", id)), OnDataChanged); 
        } // end method

        /// <summary>Metoda pro jednoduche zanoreni (vytvoreni podrizeneho SettingStorage</summary>
        /// <param name="name">nazev promenne</param>
        /// <returns>SettingStorage, ktery uklada do podrizeneho elementu</returns>
        public GSettingStorage DescendantStorage(string name) {
            var l_oElem = Xml.Element(RootNamespace + name);
            if (l_oElem == null) 
                l_oElem = Xml.SetElementContent(RootNamespace + name);
            return new GSettingStorage(l_oElem, OnDataChanged); 
        } // end method 

        #endregion

        #region Verejne metody - datove

        /// <summary>Zapis hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="value">hodnota promenne</param>
        public void Write(string name, int value) { 
            Xml.SetElementValue(RootNamespace + name, value.ToString());
            OnDataChanged(); 
        } // end method 

        /// <summary>Zapis hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="value">hodnota promenne</param>
        public void Write(string name, short value) { 
            Xml.SetElementValue(RootNamespace + name, value.ToString()); 
            OnDataChanged(); 
        } // end method 

        /// <summary>Zapis hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="value">hodnota promenne</param>
        public void Write(string name, decimal value) { 
            Xml.SetElementValue(RootNamespace + name, value.ToString()); 
            OnDataChanged(); 
        } // end method 

        /// <summary>Zapis hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="value">hodnota promenne</param>
        public void Write(string name, string value) { 
            Xml.SetElementValue(RootNamespace + name, value); 
            OnDataChanged(); 
        } // end method 

        /// <summary>Zapis hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="value">hodnota promenne</param>
        public void Write(string name, bool value) { 
            Xml.SetElementValue(RootNamespace + name, value ? "1" : "0"); 
            OnDataChanged(); 
        } // end method

        /// <summary>Zapis hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="color">hodnota promenne</param>
        public void Write(string name, Color color) {
            if (color.IsEmpty) Xml.SetElementContent(RootNamespace + name, new XAttribute(XsiNamespace + "nil", "true"));
            else Xml.SetElementValue(RootNamespace + name, color.ToArgb());
            OnDataChanged(); 
        } // end method 

        /// <summary>Zapis hodnoty Gordickeho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="value">hodnota promenne</param>
        public void Write<T>(string name, T value) where T:IGDbType{
            if (value == null) Xml.SetElementValue(RootNamespace + name, null);
            else if (value.IsNull) Xml.SetElementContent(RootNamespace + name, new XAttribute(XsiNamespace + "nil", "true"));
            else Xml.SetElementValue(RootNamespace + name, value.DbValue.ToString());
            OnDataChanged(); 
        } // end method

        /// <summary>Zapis hodnoty typu XElement</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="value">XElement k zapisu</param>
        public void WriteXml(string name, XElement value) {
            if (value == null) Xml.SetElementValue(RootNamespace + name, null);
            else Xml.SetElementContent(RootNamespace + name, value);
            OnDataChanged(); 
        } // end method

        /// <summary>Ulozeni nastaveni konkretniho objektu. 
        /// Urceno k pozdejsimu obnoveni nastaveni na existujici instanci (viz metoda RestoreObject)</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="obj">objekt (IGSettingAcceptor) k ulozeni</param>
        public void StoreObject(string name, IGSettingAcceptor obj) {
            if (obj == null) Xml.SetElementValue(RootNamespace + name, null);
            else {
                var l_oRoot = Xml.SetElementContent(RootNamespace + name);
                if (obj is GSettingStorage)
                    l_oRoot.Add(((GSettingStorage)obj).Xml.Elements());
                obj.SaveSettings(new GSettingStorage(l_oRoot, OnDataChanged));
            } // end else
            OnDataChanged(); 
        } // end method 

        /// <summary>Ulozeni usporadaneho seznamu a hodnot nastaveni jednotlivych polozek. 
        /// Urceno k pozdejsimu obnoveni poradi/nastaveni itemu pri zachovani originalnich instanci (viz metoda RestoreList)
        /// (tzn. RestoreList pozdeji nebuduje novy list, ale aplikuje nastaveni na jiz existujici)</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="list">seznam k ulozeni</param>
        public void StoreList<T>(string name, List<T> list) where T: IGIDProvider {
            if (list == null) Xml.SetElementValue(RootNamespace + name, null);
            else {
                var l_oRoot = Xml.SetElementContent(RootNamespace + name);
                foreach (var it in list) {
                    if (String.IsNullOrEmpty(it.ID))
                        throw new GArgumentException(25000002, 25050002, ThisAssembly); //RC-EX 25050002 : GSettingStorage.StoreList: Pokus o vložení elementu s prázdným id
                    var l_oXmlItem = new XElement(RootNamespace + "item", new XAttribute("id", it.ID));
                    l_oRoot.Add(l_oXmlItem);
                    if (it is GSettingStorage)
                        l_oXmlItem.Add((it as GSettingStorage).Xml.Elements());
                    if (it is IGSettingAcceptor)
                        ((IGSettingAcceptor)it).SaveSettings(new GSettingStorage(l_oXmlItem, OnDataChanged));
                } // end foreach
            } // end else
            OnDataChanged(); 
        } // end method 

        /// <summary>Metoda pro ulozeni datasetu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="dataSet">dataset k ulozeni</param>
        public void StoreDataSet(string name, DataSet dataSet) {
            if (dataSet == null) Xml.SetElementValue(RootNamespace + name, null);
            else {
                var l_oElem = Xml.SetElementContent(RootNamespace + name);
                using (var w = l_oElem.CreateWriter())
                    dataSet.WriteXml(w, XmlWriteMode.IgnoreSchema);
            } // end else
            OnDataChanged(); 
        } // end method 

        /// <summary>Ulozeni usporadane podmnoziny listu. Uklada se pouze seznam (a poradi) casti jineho listu
        /// Pozdeji je mozne vybudovat podmnozinu kombinaci tohoto ulozeni a uplne mnoziny.
        /// Typicke pouziti pro ulozeni SortColumns, GroupByColumns, LockedColumns atd.</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="partialList">usporadany seznam itemu</param>
        public void WriteListSet<T>(string name, List<T> partialList) where T: IGIDProvider{
            if (partialList == null) Xml.SetElementValue(RootNamespace + name, null);
            Xml.SetElementContent(RootNamespace + name, 
                partialList.Select(it => new XElement(RootNamespace + "item", new XAttribute("id", it.ID) )));
            OnDataChanged(); 
        } // end method

        /// <summary>Zapis libovolneho serializovatelneho objektu</summary>
        /// <typeparam name="T">typ classy k serializaci</typeparam>
        /// <param name="name">nazev promenne</param>
        /// <param name="obj">objekt k serializaci</param>
        public void WriteSerializable<T>(string name, T obj) {
            if (obj == null) Xml.SetElementValue(RootNamespace + name, null);
            else {
                var l_oXD = new XDocument(); 
                using (var w = l_oXD.CreateWriter())
                    GSerializerFactory.GetXmlSerializer(typeof(T)).Serialize(w, obj);
                Xml.SetElementContent(RootNamespace + name, l_oXD.Root);
            } // end else
            OnDataChanged(); 
        } // end method 

        /// <summary>odstrani promennou z uloziste</summary>
        /// <param name="name">nazev promenne</param>
        public void RemoveValue(string name) {
            Xml.SetAttributeValue(RootNamespace + name, null);
        } // end method 

        /// <summary>Zjisteni zda je nejake nastaveni pritomno</summary>
        /// <param name="name">nazev promenne</param>
        public bool Exists(string name) {
            return Xml.Element(RootNamespace + name) != null;
        } // end method 

        /// <summary>smaze obsah kolekce
        /// </summary>
        public void ClearStorage() {
            Xml.RemoveNodes();
        } // end method

        /// <summary>Zkopiruje hodnotu promenne z jineho uloziste/kolekce</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="from">zdrojove uloziste/kolekce</param>
        public void CopyValue(string name, GSettingStorage from) {
            Xml.Elements(RootNamespace + name).Remove();
            Xml.Add(from.Xml.Element(RootNamespace + name)); 
        } // end method

        /// <summary>Cteni hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="defaultValue">vychozi hodnota promenne</param>
        /// <returns>nactena hodnota z profilu</returns>
        public int Read(string name, int defaultValue) {
            var x = Xml.Element(RootNamespace+name);
            return (x != null ? int.Parse(x.Value) : defaultValue); 
        } // end method

        /// <summary>Cteni hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="defaultValue">vychozi hodnota promenne</param>
        /// <returns>nactena hodnota z profilu</returns>
        public short Read(string name, short defaultValue) {
            var x = Xml.Element(RootNamespace+name);
            return (x != null ? short.Parse(x.Value) : defaultValue); 
        } // end method

        /// <summary>Cteni hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="defaultValue">vychozi hodnota promenne</param>
        /// <returns>nactena hodnota z profilu</returns>
        public decimal Read(string name, decimal defaultValue) {
            var x = Xml.Element(RootNamespace+name);
            return (x != null ? decimal.Parse(x.Value) : defaultValue); 
        } // end method

        /// <summary>Cteni hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="defaultValue">vychozi hodnota promenne</param>
        /// <returns>nactena hodnota z profilu</returns>
        public string Read(string name, string defaultValue) {
            var x = Xml.Element(RootNamespace+name);
            return (x != null ? x.Value : defaultValue); 
        } // end method

        /// <summary>Cteni hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="defaultValue">vychozi hodnota promenne</param>
        /// <returns>nactena hodnota z profilu</returns>
        public bool Read(string name, bool defaultValue) {
            var x = Xml.Element(RootNamespace+name);
            return (x != null ? x.Value != "0" : defaultValue); 
        } // end method

        /// <summary>Cteni hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="defaultColor">vychozi hodnota promenne</param>
        /// <returns>nactena hodnota z profilu</returns>
        public Color Read(string name, Color defaultColor) {
            var x = Xml.Element(RootNamespace+name);
            if (x == null) return defaultColor;
            if ((string)x.Attribute(XsiNamespace + "nil") == "true") return Color.Empty; 
            else return Color.FromArgb(Int32.Parse(x.Value)); 
        } // end method

        /// <summary>Cteni hodnoty zakladniho typu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="defaultValue">vychozi hodnota promenne</param>
        /// <returns>nactena hodnota z profilu</returns>
        public T Read<T>(string name, T defaultValue = null) where T:class, IGDbType {
            var x = Xml.Element(RootNamespace + name);
            if (x == null) return defaultValue; 
            if ((string)x.Attribute(XsiNamespace + "nil") == "true") return GDbType.GetNull<T>(); 
            else return GDbType.Parse<T>(x.Value);
        } // end method

        /// <summary>Cteni hotnoty typu XElement</summary>
        /// <param name="name">nazev promenne</param>
        /// <returns>precteny XElement, nebo NULL pokud element neni soucasti ulozeneho nastaveni</returns>
        public XElement ReadXml(string name) {
            var x = Xml.Element(RootNamespace + name);
            return (x != null && x.FirstNode is XElement ? new XElement((XElement)x.FirstNode) : null); 
        } // end method 

        /// <summary>Obnovi nastaveni objektu (nebuduje novy objekt, pouze aplikuje ulozene nastaveni na existujici)</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="obj">objekt, na ktery se aplikuje ulozene nastaveni</param>
        public void RestoreObject(string name, IGSettingAcceptor obj) {
            var l_oRoot = Xml.Element(RootNamespace + name);
            if (l_oRoot == null) return; 

            obj.ApplySettings(new GSettingStorage(l_oRoot));
        } // end method 

        /// <summary>Nacteni virtualniho objektu (velmi specificke! pouzijte radeji RestoreObject) 
        /// Urceno pro cteni (ReadVirtualObject) a zapis (WriteVirtualObject) dat ve formatu, v jakem jsou ukladana metodami StoreObject apod.
        /// Puvodni metody vsak pracuji primo s instancemi objektu. 
        /// Tato metoda umoznuje upravu nastaveni v "textove" podobe ani by bylo nutne mit k dispozici puvodni instance, 
        /// kterych se nastaveni skutecne tyka. Uziti v pripadech, kdy je nutne zobrazit, nebo i menit nastaveni v DB, 
        /// ale neni dispozici nastavovany objekt. 
        /// 
        /// Je NUTNE znat interni klice daneho objektu, nebot nerizena uprava muze poskodit kolekci a pusobit jeji nenacteni puvodnim objektem!!!</summary>
        /// <param name="name">nazev promenne</param>
        /// <returns>novou (virtualni) instanci objektu obsahujici jeho nastaveni a prislusne Storage pro podrizene nastaveni</returns>
        public T ReadStoredObject<T>(string name) where T: GVirtualStoredObject, new() {
            var l_oRoot = Xml.Element(RootNamespace + name);
            if (l_oRoot == null) return null;

            var l_oItem = new T() { Xml = new XElement(l_oRoot), OnDataChanged = this.OnDataChanged}; 
            l_oItem.ApplySettings(l_oItem);
            return l_oItem; 
        } // end method

        /// <summary>Obnovi nastaveni a poradi polozek v seznamu 
        /// (tzn. nebuduje novy list, pouze aplikuje ulozene nastaneni na stavajici seznam a jeho itemy)</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="list">seznam, na ktery se aplikuje ulozene nastaveni</param>
        /// <param name="restoreOrder">zda-li se ma obnovit i ulozene poradi (false, pokud jde pouze o obnoveni ulozenych hodnot)</param>
        public void RestoreList<T>(string name, List<T> list, bool restoreOrder = true) where T: IGIDProvider {
            var l_oRoot = Xml.Element(RootNamespace + name);
            if (l_oRoot == null) return; 
            var l_oSavedItems = l_oRoot.Elements(RootNamespace + "item"); 

            // poradi 
            var l_oKnown = l_oSavedItems.Select(el => el.Attribute("id").Value).ToList();
            if (restoreOrder) {
#if PUVODNI_SORT
                var l_oUnknown = list.Select(it => it.ID).ToList(); // zaloha pred tim, nez se zacne poradi menit
                list.Sort((a, b) => {
                    //System.Diagnostics.Trace.WriteLine($"{ a.ID}/{ b.ID} ...");
                    // setrideni podle ulozenych hodnot
                    var l_nKa = l_oKnown.IndexOf(a.ID);
                    if (l_nKa >= 0) {
                        var l_nKb = l_oKnown.IndexOf(b.ID);
                        if (l_nKb >= 0) return l_nKa - l_nKb;
                    } // end if 
                    // setrideni podle puvodnich hodnot
                    return l_oUnknown.IndexOf(a.ID) - l_oUnknown.IndexOf(b.ID);
                });
#else
                //MAL 2017/10/27 zmena sort algoritmu - unknown vytvarim jako dictionary - ke kazde instanci predem zjistim index v Known a puvodni index v list
                var l_oUnknown = new Dictionary<T, Tuple<int, int>>(list.Count);
                for (int i = 0; i < list.Count; i++)
                {
                    var x = list[i];
                    l_oUnknown.Add(x, Tuple.Create(l_oKnown.IndexOf(x.ID), i));
                }
                //MAL 2017/10/27 zmena sort algoritmu - sort vyuziva predem zjistene indexy
                list.Sort((a, b) =>
                {
                    var da = l_oUnknown[a];
                    var db = l_oUnknown[b];
                    //System.Diagnostics.Trace.WriteLine($"{ a.ID}/{ b.ID} ... { da}/{ db}");
                    // setrideni podle ulozenych hodnot
                    if (da.Item1 >= 0 && db.Item1 >= 0) return da.Item1 - db.Item1; //Item1 = l_oKnown.IndexOf(x.ID)
                    // setrideni podle puvodnich hodnot
                    return da.Item2 - db.Item2;                                     //Item2 = index v list (zajisti stable sort)
                });
#endif
            } // end if 

            // aplikace vlastniho nastaveni 
            XElement l_oElem = null; 
            foreach (var it in list)
                if (it is IGSettingAcceptor && (l_oElem = l_oSavedItems.ElementAtOrDefault(l_oKnown.IndexOf(it.ID))) != null)
                    ((IGSettingAcceptor)it).ApplySettings(new GSettingStorage(l_oElem));
        } // end method 

        /// <summary>Nacteni virtualniho seznamu (velmi specificke! pouzijte radeji RestoreList) 
        /// Urceno pro cteni (ReadVirtualList) a zapis (WriteVirtualList) dat ve formatu, v jakem jsou ukladana metodami StoreList, WriteListSet, apod.
        /// Puvodni metody vsak pracuji primo s instancemi (seznam sloupcu, seznam tlacitek, atd.). 
        /// Tato metoda umoznuje upravu nastaveni v "textove" podobe ani by bylo nutne mit k dispozici puvodni instance, 
        /// kterych se nastaveni skutecne tyka. Uziti v pripadech, kdy je nutne zobrazit, nebo i menit nastaveni v DB, 
        /// ale neni dispozici nastavovany objekt. 
        /// 
        /// Je NUTNE znat interni klice daneho objektu, nebot nerizena uprava muze poskodit kolekci a pusobit jeji nenacteni puvodnim objektem!!!</summary>
        /// <param name="name">nazev promenne</param>
        /// <returns>novou instanci listu obsahujici jednotlive polozky podle ID a prislusne Storage pro podrizene nastaveni</returns>
        public List<T> ReadStoredList<T>(string name) where T: GVirtualStoredListItem, new() {
            var l_oRoot = Xml.Element(RootNamespace + name);
            if (l_oRoot == null) return null;

            var l_oList = l_oRoot.Elements(RootNamespace + "item")
                .Select(el => new T() { Xml = new XElement(el), OnDataChanged = this.OnDataChanged})
                .ToList();
            l_oList.ForEach(it => it.ApplySettings(it));
            return l_oList; 
        } // end method

        /// <summary>Nacteni virtualniho seznamu (velmi specificke! pouzijte radeji RestoreList) 
        /// Urceno pro cteni (ReadVirtualList) a zapis (WriteVirtualList) dat ve formatu, v jakem jsou ukladana metodami StoreList, WriteListSet, apod.
        /// Puvodni metody vsak pracuji primo s instancemi (seznam sloupcu, seznam tlacitek, atd.). 
        /// Tato metoda umoznuje upravu nastaveni v "textove" podobe ani by bylo nutne mit k dispozici puvodni instance, 
        /// kterych se nastaveni skutecne tyka. Uziti v pripadech, kdy je nutne zobrazit, nebo i menit nastaveni v DB, 
        /// ale neni dispozici nastavovany objekt. 
        /// 
        /// Je NUTNE znat interni klice daneho objektu, nebot nerizena uprava muze poskodit kolekci a pusobit jeji nenacteni puvodnim objektem!!!</summary>
        /// <param name="name">nazev promenne</param>
        /// <returns>novou instanci listu obsahujici jednotlive polozky podle ID a prislusne Storage pro podrizene nastaveni</returns>
        public List<GVirtualStoredListItem> ReadStoredList(string name) {
            return ReadStoredList<GVirtualStoredListItem>(name);
        } // end method
 
        /// <summary>Metoda pro ulozeni datasetu</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="dataSet">dataset k ulozeni</param>
        public bool RestoreDataSet(string name, DataSet dataSet) {
            var l_oRoot = Xml.Element(RootNamespace + name);
            if (l_oRoot == null) return false; 

            try { 
                using (var r = l_oRoot.CreateReader()) {
                    dataSet.Clear(); 
                    dataSet.ReadXml(r, XmlReadMode.IgnoreSchema);
                } // end else
                return true; 
            } // end try
            catch { return false; } 
        } // end method 

        /// <summary>Vytvoreni usporadane podmnoziny listu na zaklade ulozeneho nastaveni a uplne mnoziny
        /// Typicke pouziti pro ulozeni SortedColumns, GroupByColumns, LockedColumns atd.</summary>
        /// <param name="name">nazev promenne</param>
        /// <param name="fullList">uplna mnozina; seznam vsech dostupnych polozek, ze kterych se na zaklade nastaveni vybira podmnozina</param>
        /// <param name="allOrNothing">Vsechno nebo nic. Pokud je true, musi byt kazdy ulozeny prvek pritomen v mnozine. Pokud je false, muze vracena podmnozina obsahovat mene prvku, nez v dobe ulozeni.</param>
        /// <returns>vraci podmnozinu prvku. Muze byt NULL pokud nastaveni neexistuje, nebo allOrNothing=true a ulozeni obsahuje polozky, ktere jiz neexistuji</returns>
        public List<T> ReadListSet<T>(string name, List<T> fullList, bool allOrNothing = true) where T: IGIDProvider {
            var l_oRoot = Xml.Element(RootNamespace + name);
            if (l_oRoot == null) return null;

            var l_oNewList = new List<T>();
            foreach (var el in l_oRoot.Elements(RootNamespace + "item")) {
                var l_oItem = fullList.FirstOrDefault(it => it.ID == el.Attribute("id").Value);
                if (l_oItem == null && allOrNothing) return null;
                l_oNewList.Add(l_oItem);
            } // end foreach
            return l_oNewList; 
        } // end method

        /// <summary>precte serializovany objekt z nastaveni</summary>
        /// <typeparam name="T">typ serializovane tridy</typeparam>
        /// <param name="name">nazev promenne</param>
        /// <returns>instance nove vytvoreneho objektu</returns>
        public T ReadSerializable<T>(string name) where T:class  {
            var l_oRoot = Xml.Element(RootNamespace + name);
            if (l_oRoot == null) return null;

            using (var r = new XDocument(l_oRoot.FirstNode as XElement).CreateReader()) 
                return GSerializerFactory.GetXmlSerializer(typeof(T)).Deserialize(r) as T; 
        } // end method 

#endregion

#region Interni metody

#endregion
    } // end class
} // end namespace
