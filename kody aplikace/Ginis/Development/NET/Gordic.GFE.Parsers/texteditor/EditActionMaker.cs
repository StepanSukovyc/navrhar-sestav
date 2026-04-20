//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.EditActionMaker.cs                    </Name>
//    <Description> Vytvvoření IEditAction objektu pro textový editor.          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-10                                                  </Created>
//  </FileHeader>

using System.Collections;
using System.Reflection;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.TextEditor.Actions;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// Vytvvoření IEditAction objektu pro textový editor.
    /// </summary>
    public class EditActionMaker : IMaker
    {
        /// <summary>
        /// Hodnocení podmínky
        /// </summary>
        public bool HandleConditions { get => false; }

        /// <summary>
        /// Vytvoření položek
        /// </summary>
        /// <param name="caller"></param>
        /// <param name="entity">Jednotka s informaci o objektu</param>
        /// <param name="subItems"></param>
        /// <returns></returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            IEditAction editAction = (IEditAction)entity.AddIn.CreateObject(entity.Properties["class"]);
            string[] keys = entity.Properties["keys"].Split(',');

            Keys[] actionKeys = new Keys[keys.Length];
            for (int j = 0; j < keys.Length; ++j)
            {
                string[] keydescr = keys[j].Split('|');
                Keys key = (Keys)((System.Windows.Forms.Keys.Space.GetType()).InvokeMember(keydescr[0], BindingFlags.GetField, null, System.Windows.Forms.Keys.Space, new object[0]));
                for (int k = 1; k < keydescr.Length; ++k)
                    key |= (Keys)((System.Windows.Forms.Keys.Space.GetType()).InvokeMember(keydescr[k], BindingFlags.GetField, null, System.Windows.Forms.Keys.Space, new object[0]));
                actionKeys[j] = key;
            }
            editAction.Keys = actionKeys;

            return editAction;
        }
    }
}
