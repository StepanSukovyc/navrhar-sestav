//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.InfoSectionViewTreeNode.cs               </Name>
//    <Description> Položka sekce info                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-07                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.UndoRedoFramework;
using System.Runtime.InteropServices;
using System;
using System.Runtime.Serialization;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Položka sekce info
    /// </summary>
    [ComVisible(false)]
    [Serializable]
    public class ISExtNode : AbstractExtTreeNode
    {
        #region ISerializable
        /// <summary>
        /// Initializes a new instance of the ExtTreeNode class using the
        /// specified serialization information and context.
        /// </summary>
        /// <param name="serializationInfo"></param>
        /// <param name="context"></param>
        protected ISExtNode(SerializationInfo serializationInfo, StreamingContext context) : base(serializationInfo, context) { }
        #endregion

        readonly UndoRedo<KeyValuePair<string, string>> parametr = new UndoRedo<KeyValuePair<string, string>>();
        /// <summary>
        /// parametr větve
        /// </summary>
        public KeyValuePair<string, string> Parametr { get { return parametr.Value; } set { parametr.Value = value; } }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public ISExtNode()
        {
            ImageKey = "item";
            SelectedImageKey = "item";
        }

        /// <summary>
        /// konstruktor třídy dle položky seznamu
        /// </summary>
        /// <param name="item">daná položka seznamu</param>
        public ISExtNode(KeyValuePair<string, string> item)
            : this()
        {
            Name = Text = item.Key;
            Parametr = item;
        }
    }
}
