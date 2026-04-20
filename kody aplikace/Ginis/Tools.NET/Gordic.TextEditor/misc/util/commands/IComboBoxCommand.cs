// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

namespace Gordic.TextEditor.Misc.Util
{
    public interface IComboBoxCommand : ICommand
    {
        bool IsEnabled
        {
            get;
            set;
        }
    }
}
