//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.IGReportMessageBoxes.cs       </Name>
//    <Description> Interface pro dialogy                       </Description>
//    <Author>      Jan Brabec, Martin Aliger                   </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2005  </Copyright>
//    <Created>     2003-06-29                                  </Created>
//  </FileHeader>
// 2005-09-26  Martin Aliger prevezmuto

using System;
using System.Collections;
using System.Drawing;

namespace Gordic.Report.Interface
{

    /// <summary>
    /// Výsledek Custom dialogu
    /// </summary>
    public enum GDialogResult
    {
        /// <summary>
        /// The dialog box return value is Cancel (usually sent from a button labeled Cancel).  
        /// </summary>
        Cancel,
        /// <summary>
        /// The dialog box return value is OK (usually sent from a button labeled OK).  
        /// </summary>
        OK
    }

	/// <summary>
	/// Interface pro používání dialogů v interpretru .ALV
	/// </summary>
    [System.Security.SecurityCritical]
	public interface IGReportMessageBoxes
	{
		/// <summary>
		/// Zobrazí klasický MessageBox, s jedním tlačítkem OK
		/// </summary>
		/// <example>
		/// <code>
		/// IGReport l_oReport;
		/// ...
		/// (l_oReport as IGReportMessageBoxes).MessageBox("Caption","Pokusný text");
		/// ...
		/// </code>
		/// </example>
		/// <param name="caption">Nadpis dialogového okna</param>
		/// <param name="text">Text v dialogovém okně</param>
		void MessageBox(string caption,string text);

		/// <summary>
		/// Zobrazí dialogový box s políčkem pro zadání textové hodnoty od uživatele
		/// </summary>
		/// <example>
		/// <code>
		/// IGReport l_oReport;
		/// string l_sInput = "default.txt";
		/// ...
		/// (l_oReport as IGReportMessageBoxes).InputBox("Caption","Zde zadejte název",ref l_oInput);
		/// ...
		/// </code>
		/// </example>
		/// <param name="caption">Nadpis dialogového okna</param>
		/// <param name="text">Popisek nad vstupním polem pro text</param>
		/// <param name="input">Vstupně výstupní parametr, bude zde uveden text zadaný
		/// uživatelem, pokud se zadá již při volání funkce, bude to sloužit jako
		/// předvyplněný text</param>
		void InputBox(string caption, string text,ref string input);

		/// <summary>
		/// Zobrazí dialogový box se seznamem možností, kde lze jednu vybrat
		/// </summary>
		/// <example>
		/// <code>
		/// IGReport l_oReport;
		/// string l_sOutput;
		/// ArrayList l_oChoice = new ArrayList();
		/// ...
		/// l_oChoice.Add("volba1");
		/// l_oChoice.Add("volba2");
		/// if ((l_oReport as IGReportMessageBoxes).ChoiceBox("Caption","Vyberte jednu položku",
		/// l_oChoice,ref l_oOutput) == DialogResult.OK)
		/// {
		///   // stisknuto Ok
		///   ...
		/// } else
		/// {
		///   // stisknuto Zrusit
		///   ...
		/// }
		/// ...
		/// </code>
		/// </example>
		/// <param name="caption">Nadpis dialogového okna</param>
		/// <param name="choice">Seznam možností z kterých se bude vybírat</param>
		/// <param name="output">Vybraná položka</param>
        /// <param name="returnIndex">Zda se má vrátit index položky nebo její hodnota</param>
		GDialogResult ChoiceBox(string caption, IList choice, out string output, bool returnIndex);

		/// <summary>
		/// Zobrazí dialogový box s ukazatelem procentuálního dokončení úlohy
		/// </summary>
		/// <example>
		/// <code>
		/// IGReportProgressBox pb = (report as IGReportMessageBoxes).ProgressBox("Caption2","Top Label","Bottom Label");
		/// ...
		///	if (pb.Canceled) ...;
		///	...
		///	pb.Value = 50;
		///	...
		///	if (pb.Canceled) ...;
		///	...
		///	p.Value = 100; 
		///	...
		///	p.CloseDialog();
		///	</code>
		/// </example>
		/// <param name="caption">Nadpis dialogového okna</param>
		/// <param name="topLabel">Nápis nad teploměrem</param>
		/// <param name="bottomLabel">Nápis pod teploměrem</param>
		/// <returns>Vrací interface pro ovládávní dialogového okna</returns>
		IGReportProgressBox ProgressBox(string caption,string topLabel, string bottomLabel);

        /// <summary>
        /// Vrátí interfce pro custom dialog
        /// </summary>
        /// <param name="caption">Nadpis dialogového okna</param>
        /// <param name="location">Pozice okna</param>
        /// <param name="size">Velikost okna</param>
        /// <param name="properties">Další nastavitelné vlastnosti. Lze nastavit:</param>
        /// <returns></returns>
        IGReportCustomDialog CustomDialog(string caption,Point location, Size size, IDictionary properties);

        /// <exclude/>
        IGReportExtWindow ExtWindow();
    }

	/// <summary>
	/// Interface pro dialog ProgressBox
	/// </summary>
    [System.Security.SecurityCritical]
	public interface IGReportProgressBox 
	{
		/// <summary>
		/// Nastavení procentuálního posuvu
		/// </summary>
		int Value 
		{
			get;set;
		}

		/// <summary>
		/// Zjištění zda nebylo stisknuto tlačítko Zrušit
		/// </summary>
		bool Canceled
		{
			get;
		}

		/// <summary>
		/// Nápis nad teploměrem
		/// </summary>
		string TopLabel 
		{
			get;set;
		}

		/// <summary>
		/// Nápis pod teploměrem
		/// </summary>
		string BottomLabel
		{
			get;set;
		}

		/// <summary>
		/// Nadpis okna
		/// </summary>
		string Caption
		{
			get;set;
		}

		/// <summary>
		/// Uzavře dialog
		/// </summary>
		void CloseDialog();
	}

	/// <summary>
	/// Combo box pro custom dialog
	/// </summary>
    [System.Security.SecurityCritical]
	public interface IGReportComboBox
	{
		/// <summary>
		/// Jednostlivé položky seznamu
		/// </summary>
		IList Items 
		{
			get;
		}

		/// <summary>
		/// Index vybrané položky
		/// </summary>
		int SelectedIndex
		{
			get;
			set;
		}
	}

	/// <summary>
	/// List Box pro custom dialog
	/// </summary>
    [System.Security.SecurityCritical]
	public interface IGReportListBox
	{
		/// <summary>
		/// Jednotlivé položky seznamu
		/// </summary>
		IList Items
		{
			get;
		}
		/// <summary>
		/// Index vybrané položky
		/// </summary>
		int SelectedIndex
		{
			get;
			set;
		}
	}

    /// <summary>
    /// Styl seznamu se zaškrtávátky. Seznam vrací různé řetězce dle tohoto typu
    /// </summary>
	public enum GCheckListStyle
	{
        /// <summary>
        /// "010"
        /// </summary>
		Default        = 0,
        /// <summary>
        /// "0polozka1|1polozka2|0polozka3|"
        /// </summary>
		NumberedText   = 1,
        /// <summary>
        /// "polozka2|"
        /// </summary>
		Text           = 2,
        /// <summary>
        /// "0hid1|1hid2|0hid3|"
        /// </summary>
		NumberedHidden = 3,
        /// <summary>
        /// "hid2|"
        /// </summary>
		Hidden         = 4,
	}

	/// <summary>
	/// Checked List Box pro custom dialog
	/// </summary>
    [System.Security.SecurityCritical]
	public interface IGReportCheckedListBox
	{
		/// <summary>
		/// Jednotlivé položky seznamu
		/// </summary>
		IList Items
		{
			get;		
		}

        /// <summary>
        /// Typ seznamu se zaškrtávátky
        /// </summary>
		GCheckListStyle Style
		{
			get;
		}

		/// <summary>
		/// string (0,1) s vybranými položkami
		/// </summary>
		string CheckedItems
		{
			get;   //podle typu (style) vraci ruzne retezce
		}

        /// <exclude/>
		void AddItem(string value,string hiddenValue,string check);
	}

	/// <summary>
	/// Definuje styl uživatelského dialogu
	/// </summary>
	public enum GUserDlgStyle 
	{
		/// <summary>
		/// Defaultní styl s tlačítkem OK a Cancel
		/// </summary>
		Default
	}

    /// <exclude/>
    [System.Security.SecurityCritical]
    public interface IGReportExtWindow
    {
        ///// <exclude/>
        //System.Windows.Forms.DialogResult ShowExtWindow(System.Windows.Forms.Form dialog);
        ///// <exclude/>
        //System.Windows.Forms.DialogResult ShowExtWindow(System.Windows.Forms.CommonDialog dialog);
    }
    /// <exclude/>
    [System.Security.SecurityCritical]
    public interface IGReportExtWindowConsumer
    {
        /// <exclude/>
        void SetDialogHandler(IGReportExtWindow handler);
    }

    /// <summary>
    /// Interface pro vytvoření custom dialogu
    /// </summary>
    [System.Security.SecurityCritical]
	public interface IGReportCustomDialog 
	{
		/// <summary>
		/// Nadpis dialogového okna
		/// </summary>
		string Caption 
		{
			get;
			set;
		}

		/// <summary>
		/// Pozice dialogového okna
		/// </summary>
		Point Location 
		{
			get;
			set;
		}

		/// <summary>
		/// Velikost dialogového okna
		/// </summary>
		Size Size 
		{
			get;
			set;
		}

		/// <summary>
		/// Styl dialogu <see cref="GUserDlgStyle"/>
		/// </summary>
		GUserDlgStyle Style 
		{
			get;
			set;
		}

		/// <summary>
		/// Vloží editační políčko
		/// </summary>
		/// <param name="location">pozice prvku uvnitř uživatelského dialogu</param>
		/// <param name="size">velikost prvku</param>
		/// <param name="maxLength">maximální délka editovaného textu</param>
		/// <param name="name">název prvku</param>
		/// <param name="Value">přednastavená hodnota</param>
		/// <param name="properties">Další nastavitelné vlastnosti. Lze nastavit:
		/// <list type="bullet">
		/// <item>FontName - Jméno fontu, typu: <see cref="string"/></item>
		/// <item>FontSize - Velikost fontu, typu: <see cref="float"/></item> 
		/// <item>FontStyle - Styl fontu, typu: <see cref="FontStyle"/></item> 
		/// <item>ReadOnly - Edit je pouze pro čtení, typu: <see cref="bool"/></item> 
		/// <item>TabStop - TabStop, typu: <see cref="bool"/></item> 
		/// <item>EnterAsTab - Enter funguje jako Tab, typu: <see cref="bool"/></item> 
		/// </list>
		/// </param>
		void InsertEdit(Point location, Size size, int maxLength,string name, string Value,IDictionary properties);
		
		/// <summary>
		/// Vloží políčko pro editaci čísel
		/// </summary>
		/// <param name="location">pozice prvku uvnitř uživatelského dialogu</param>
		/// <param name="size">velikost prvku</param>
		/// <param name="maxLength">maximální délka editovaného políčka ve znacích</param>
		/// <param name="minValue">minimální povolená hodnota</param>
		/// <param name="maxValue">maximální povolená hodnota</param>
		/// <param name="decimals">počet desetiných míst</param>
		/// <param name="name">název prvku</param>
		/// <param name="Value">přednastavená hodnota</param>
		/// <param name="properties">Další nastavitelné vlastnosti. Lze nastavit:
		/// <list type="bullet">
		/// <item>FontName - Jméno fontu, typu: <see cref="string"/></item>
		/// <item>FontSize - Velikost fontu, typu: <see cref="float"/></item> 
		/// <item>FontStyle - Styl fontu, typu: <see cref="FontStyle"/></item> 
		/// <item>ReadOnly - Edit je pouze pro čtení, typu: <see cref="bool"/></item> 
		/// <item>TabStop - TabStop, typu: <see cref="bool"/></item> 
		/// <item>EnterAsTab - Enter funguje jako Tab, typu: <see cref="bool"/></item> 
		/// </list>
		/// </param>
		void InsertNumEdit(Point location, Size size, int maxLength, 
			Decimal minValue, Decimal maxValue,  
			int decimals, string name,Decimal Value, IDictionary properties);

		/// <summary>
		/// Vloží políčko pro editaci datumu
		/// </summary>
		/// <param name="location">pozice prvku uvnitř uživatelského dialogu</param>
		/// <param name="size">velikost prvku</param>
		/// <param name="name">název prvku</param>
		/// <param name="Value">přednastavená hodnota</param>
		/// <param name="properties">Další nastavitelné vlastnosti. Lze nastavit:
		/// <list type="bullet">
		/// <item>FontName - Jméno fontu, typu: <see cref="string"/></item>
		/// <item>FontSize - Velikost fontu, typu: <see cref="float"/></item> 
		/// <item>FontStyle - Styl fontu, typu: <see cref="FontStyle"/></item> 
		/// <item>ReadOnly - Edit je pouze pro čtení, typu: <see cref="bool"/></item> 
		/// <item>TabStop - TabStop, typu: <see cref="bool"/></item> 
		/// <item>EnterAsTab - Enter funguje jako Tab, typu: <see cref="bool"/></item> 
		/// <item>DateEmpty - Pokud je zadáno true, bude editační políčko na počátku prázdné, nezáleží na nastavení Value, typu: <see cref="bool"/></item>
		/// <item>EmptyIsValid - pokud je nastaveno na true, může políčko ztratit focus i když je nevyplněné, tzn. prázdná hodnota je platná, typu: <see cref="bool"/></item>
		/// <item>EmptyTreatAsToday - pokud je nastaveno na true, bude při nevyplněný datum znamenat dnešní datum, jinak DateTime.MinValue, typu: <see cref="bool"/></item>
		/// </list>
		///</param>
		void InsertDateEdit(Point location, Size size,string name, DateTime Value, IDictionary properties);

		/// <summary>
		/// Vloží combo box
		/// </summary>
		/// <param name="location">pozice prvku uvnitř uživatelského dialogu</param>
		/// <param name="size">velikost prvku</param>
		/// <param name="name">název prvku</param>
		/// <param name="properties">Další nastavitelné vlastnosti. Lze nastavit:
		/// <list type="bullet">
		/// <item>FontName - Jméno fontu, typu: <see cref="string"/></item>
		/// <item>FontSize - Velikost fontu, typu: <see cref="float"/></item> 
		/// <item>FontStyle - Styl fontu, typu: <see cref="FontStyle"/></item> 
		/// <item>TabStop - TabStop, typu: <see cref="bool"/></item> 
		/// <item>EnterAsTab - Enter funguje jako Tab, typu: <see cref="bool"/></item> 
		/// <item>SelectedText - Text který bude v editačním políčku, typu: <see cref="string"/></item>
		/// <item>DropDownList - pokud je nastaven na true bude combo box stylu DropDownList jinak pouze DropDown, typu: <see cref="bool"/></item>
		/// </list>
		/// </param>
		/// <returns></returns>
		IGReportComboBox InsertComboBox(Point location, Size size,string name, IDictionary properties);

		/// <summary>
		/// Vloží list box
		/// </summary>
		/// <param name="location">pozice prvku uvnitř uživatelského dialogu</param>
		/// <param name="size">velikost prvku</param>
		/// <param name="name">název prvku</param>
		/// <param name="properties">Další nastavitelné vlastnosti. Lze nastavit:
		/// <list type="bullet">
		/// <item>FontName - Jméno fontu, typu: <see cref="string"/></item>
		/// <item>FontSize - Velikost fontu, typu: <see cref="float"/></item> 
		/// <item>FontStyle - Styl fontu, typu: <see cref="FontStyle"/></item> 
		/// <item>ReadOnly - Edit je pouze pro čtení, typu: <see cref="bool"/></item> 
		/// <item>TabStop - TabStop, typu: <see cref="bool"/></item> 
		/// <item>EnterAsTab - Enter funguje jako Tab, typu: <see cref="bool"/></item> 
		/// </list>
		/// </param>
		/// <returns></returns>
		IGReportListBox InsertListBox(Point location, Size size,string name, IDictionary properties);

		/// <summary>
		/// Vloží list box se zaškrtávátky
		/// </summary>
		/// <param name="location">pozice prvku uvnitř uživatelského dialogu</param>
		/// <param name="size">velikost prvku</param>
		/// <param name="name">název prvku</param>
		/// <param name="style">styl návratové hodnoty</param>
		/// <param name="checks">počáteční nastavení zaškrtávátek jako string "010101"</param>
		/// <param name="properties">Další nastavitelné vlastnosti. Lze nastavit:
		/// <list type="bullet">
		/// <item>FontName - Jméno fontu, typu: <see cref="string"/></item>
		/// <item>FontSize - Velikost fontu, typu: <see cref="float"/></item> 
		/// <item>FontStyle - Styl fontu, typu: <see cref="FontStyle"/></item> 
		/// <item>ReadOnly - Edit je pouze pro čtení, typu: <see cref="bool"/></item> 
		/// <item>TabStop - TabStop, typu: <see cref="bool"/></item> 
		/// <item>EnterAsTab - Enter funguje jako Tab, typu: <see cref="bool"/></item> 
		/// </list>
		/// </param>
		/// <returns></returns>
		IGReportCheckedListBox InsertCheckedListBox(Point location, Size size,string name, GCheckListStyle style, string checks, IDictionary properties);

		/// <summary>
		/// Vloží memo
		/// </summary>
		/// <param name="location">pozice prvku uvnitř uživatelského dialogu</param>
		/// <param name="size">velikost prvku</param>
		/// <param name="name">název prvku</param>
		/// <param name="Value">přednastavená hodnota</param>
		/// <param name="properties">Další nastavitelné vlastnosti. Lze nastavit:
		/// <list type="bullet">
		/// <item>FontName - Jméno fontu, typu: <see cref="string"/></item>
		/// <item>FontSize - Velikost fontu, typu: <see cref="float"/></item> 
		/// <item>FontStyle - Styl fontu, typu: <see cref="FontStyle"/></item> 
		/// <item>ReadOnly - Edit je pouze pro čtení, typu: <see cref="bool"/></item> 
		/// <item>TabStop - TabStop, typu: <see cref="bool"/></item> 
		/// <item>EnterAsTab - Enter funguje jako Tab, typu: <see cref="bool"/></item> 
		/// <item>WordWrap - Zalamování řádků, typu: <see cref="bool"/></item>
		/// <item>WantReturns - Akceptuje return, typu: <see cref="bool"/></item>
		/// </list>
		/// </param>
		void InsertMemo(Point location, Size size, string name, string Value, IDictionary properties);

		/// <summary>
		/// Vloží check box
		/// </summary>
		/// <param name="location">pozice prvku uvnitř uživatelského dialogu</param>
		/// <param name="size">velikost prvku</param>
		/// <param name="Caption">popisek</param>
		/// <param name="name">název prvku</param>
		/// <param name="Value">přednastavená hodnota</param>
		/// <param name="properties">Další nastavitelné vlastnosti. Lze nastavit:
		/// <list type="bullet">
		/// <item>FontName - Jméno fontu, typu: <see cref="string"/></item>
		/// <item>FontSize - Velikost fontu, typu: <see cref="float"/></item> 
		/// <item>FontStyle - Styl fontu, typu: <see cref="FontStyle"/></item> 
		/// <item>TabStop - TabStop, typu: <see cref="bool"/></item> 
		/// </list>
		/// </param>
		void InsertCheckBox(Point location, Size size,string Caption,string name, bool Value, IDictionary properties);

		/// <summary>
		/// Vloží Label
		/// </summary>
		/// <param name="location">pozice prvku uvnitř uživatelského dialogu</param>
		/// <param name="size">velikost prvku</param>
		/// <param name="Caption">popisek</param>
		/// <param name="name">název prvku</param>
		/// <param name="properties">Další nastavitelné vlastnosti. Lze nastavit:
		/// <list type="bullet">
		/// <item>FontName - Jméno fontu, typu: <see cref="string"/></item>
		/// <item>FontSize - Velikost fontu, typu: <see cref="float"/></item> 
		/// <item>FontStyle - Styl fontu, typu: <see cref="FontStyle"/></item> 
		/// <item>AutoSize - Automatické nastavování velikosti provku, typu: <see cref="bool"/></item> 
		/// <item>TextAlign - Zarovnání textu, typu: <see cref="ContentAlignment"/></item> 
		/// </list>
		/// </param>
		void InsertLabel(Point location, Size size,string Caption,string name, IDictionary properties);


		/// <summary>
		/// Stav komponent po uzavření dialogu
		/// </summary>
		/// <remarks>
		/// Z této vlastnosti lze zjistit jistit stav komponent, klíčem je jméno komponenty, value je
		/// pak nastavená hodnota.
		/// <list type="bullet">
		/// <item>CheckBox - hodnota typu: <see cref="bool"/></item> 
		/// <item>Memo - hodnota typu: <see cref="string"/></item> 
		/// </list>
		/// </remarks>
		IDictionary ComponentState 
		{
			get;
		}

		/// <summary>
		/// Zobrazí dialogové okno modálně
		/// </summary>
		/// <returns>Návratová hodnota dialogu</returns>
		GDialogResult ShowDialog();
	}

	#region interfaces and delegates for internal use

	/// <summary>
	/// Pro interní použití
	/// </summary>
    [System.Security.SecurityCritical]
	public delegate void MessageBoxHandler(string caption,string text);
	
	/// <summary>
	/// Pro interní použití
	/// </summary>
    [System.Security.SecurityCritical]
	public delegate void InputBoxHandler(string caption, string text,ref string input);

	/// <summary>
	/// Pro interní použití
	/// </summary>
    [System.Security.SecurityCritical]
    public delegate GDialogResult ChoiceBoxHandler(string caption, IList choice, out string output, bool returnIndex);

	/// <summary>
	/// Pro interní použití
	/// </summary>
    [System.Security.SecurityCritical]
	public delegate IGReportProgressBox ProgressBoxHandler(string caption,string topLabel, string bottomLabel);

	/// <summary>
	/// Pro interní použití
	/// </summary>
    [System.Security.SecurityCritical]
	public delegate IGReportCustomDialog CustomDialogHandler(string caption,Point location, Size size, IDictionary properties);

    /// <summary>
    /// Pro interní použití
    /// </summary>
    [System.Security.SecurityCritical]
    public delegate IGReportExtWindow ExtWindowHandler();

	/// <summary>
	/// Pro interní použití
	/// </summary>
    [System.Security.SecurityCritical]
	public interface IGReportMessageBoxesImplementation
	{
		/// <summary>
		/// Pro interní použití
		/// </summary>
		event MessageBoxHandler MessageBoxImplementation;

		/// <summary>
		/// Pro interní použití
		/// </summary>
		event InputBoxHandler InputBoxImplementation; 

		/// <summary>
		/// Pro interní použití
		/// </summary>
		event ChoiceBoxHandler ChoiceBoxImplementation;

		/// <summary>
		/// Pro interní použití
		/// </summary>
		event ProgressBoxHandler ProgressBoxImplementation;

		/// <summary>
		/// Pro interní použití
		/// </summary>
		event CustomDialogHandler CustomDialogImplementation;

        /// <summary>
        /// Pro interní použití
        /// </summary>
        event ExtWindowHandler ExtWindowImplementation;

		/// <summary>
		/// Pro interní použití
		/// </summary>
		void OverrideProgress(ProgressBoxHandler progressBoxImplementation);
    }

    #endregion
}
