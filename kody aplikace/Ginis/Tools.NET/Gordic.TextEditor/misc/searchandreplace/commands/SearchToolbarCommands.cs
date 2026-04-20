// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
//      <modify name="Stepan Sukovych" />
// </file>

using System;
using System.Windows.Forms;
using Gordic.TextEditor.Misc.Util;

namespace Gordic.TextEditor.SearchAndReplace
{
	/// <summary>
	/// Description of SearchToolbarCommands.
	/// </summary>
	public class FindComboBox : AbstractComboBoxCommand
	{
		ComboBox comboBox = new ComboBox();
		public FindComboBox()
		{
		}
		
		void RefreshComboBox()
		{
			comboBox.Items.Clear();
			foreach (string findItem in SearchOptions.FindPatterns) {
				comboBox.Items.Add(findItem);
			}
			comboBox.Text = SearchOptions.FindPattern;
		}
		
		void OnKeyPress(object sender, KeyPressEventArgs e)
		{
			if (e.KeyChar == '\r') {
				CommitSearch();
				e.Handled = true;
			}
		}
		
		void CommitSearch()
		{
			if (comboBox.Text.Length > 0) {
				SearchOptions.DocumentIteratorType = DocumentIteratorType.CurrentDocument;
				SearchOptions.FindPattern = comboBox.Text;
				SearchReplaceManager.FindNext(null);
				comboBox.Focus();
			}
		}
		
		void SearchOptionsChanged(object sender, PropertyChangedEventArgs e)
		{
			if (e.Key == "FindPatterns") {
				RefreshComboBox();
			}
		}
		
		protected override void OnOwnerChanged(EventArgs e)
		{
			base.OnOwnerChanged(e);
			ComboBox toolbarItem = (ComboBox)Owner;
			comboBox.DropDownStyle = ComboBoxStyle.DropDown;
			comboBox.KeyPress += OnKeyPress;
			SearchOptions.Properties.PropertyChanged += new PropertyChangedEventHandler(SearchOptionsChanged);
			
			RefreshComboBox();
		}
	}
}
