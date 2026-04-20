//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ReportDesignerSideTabItem.cs           </Name>
//    <Description> Položka záložky postranní lišty                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.TextEditor.Document;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Položka záložky postranní lišty
    /// </summary>
    public class ReportDesignerSideTabItem : SideTabItem, ISelection
    {
        #region ISelection
        /// <exclude/>
        public bool ContainsOffset(int offset) { return false; }
        /// <exclude/>
        public bool ContainsPosition(TextEditor.TextLocation position) { return false; }
        /// <exclude/>
        public int EndOffset { get { return 0; } }
        /// <exclude/>
        public TextEditor.TextLocation EndPosition { get; set;}
        /// <exclude/>
        public bool IsEmpty { get { return !string.IsNullOrEmpty(Tag is string ? Convert.ToString(Tag) : null); } }
        /// <exclude/>
        public bool IsRectangularSelection { get { return !string.IsNullOrEmpty(Tag is string ? Convert.ToString(Tag) : null); } }
        /// <exclude/>
        public int Length { get { return Tag is string ? Convert.ToString(Tag).Length : 0; } }
        /// <exclude/>
        public int Offset { get { return 0; } }
        /// <exclude/>
        public string SelectedText { get { return Tag is string ? Convert.ToString(Tag) : null; } }
        /// <exclude/>
        public TextEditor.TextLocation StartPosition { get; set; }
        #endregion

        /// <summary>
        /// Vytvoření položky s určitým názvěm
        /// </summary>
        /// <param name="name">Název položky záložky</param>
		public ReportDesignerSideTabItem(string name)
			: base(name)
		{
            Icon = WinFormsResourceService.GetBitmap("Icons.16x16.SideBarDocument");
		}
		
        /// <summary>
        /// Vytvoření položky záložky postranní lišty s určitým názvem a tag objektem
        /// </summary>
        /// <param name="name">Daný název položky záložky postranní lišty</param>
        /// <param name="tag">Tag objekt položky</param>
		public ReportDesignerSideTabItem(string name, object tag)
			: base(name, tag)
		{
            Icon = WinFormsResourceService.GetBitmap("Icons.16x16.SideBarDocument");
		}

        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="entry">jednotka s informaci o objektu</param>
        public ReportDesignerSideTabItem(ComponentTemplateEntry entry)
			: base(entry)
		{
		}

        /// <summary>
        /// Vytvoření položky záložky dle názvu
        /// </summary>
        /// <param name="entry">jednotka s informaci o objektu</param>
        public ReportDesignerSideTabItem(GFETemplate entry)
            : base(entry)
        {
        }
    }
}
