//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultDialogPanelDescriptor.cs        </Name>
//    <Description> Výchozí deskriptor dialogových panelů                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-17                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Výchozí deskriptor dialogových panelů
    /// </summary>
    public class DefaultDialogPanelDescriptor : IDialogPanelDescriptor
    {
        readonly string id = String.Empty;
        string label = String.Empty;
        readonly List<IDialogPanelDescriptor> dialogPanelDescriptors = null;
        IDialogPanel dialogPanel = null;
        /// <summary>
        /// Jednoznačný identifikátor
        /// </summary>
        public string ID { get { return id; } }
        /// <summary>
        /// štítek panelu
        /// </summary>
        public string Label
        {
            get { return label; }
            set { label = value; }
        }
        /// <summary>
        /// vnitřní deskriptory dialogových panelů
        /// </summary>
        public IEnumerable<IDialogPanelDescriptor> ChildDialogPanelDescriptors
        {
            get { return dialogPanelDescriptors; }
        }

        AddIn addin;
        string dialogPanelPath;
        /// <summary>
        /// aktivní dialogový panel
        /// </summary>
        public IDialogPanel DialogPanel
        {
            get
            {
                if (dialogPanelPath != null)
                {
                    if (dialogPanel == null)
                        dialogPanel = (IDialogPanel)addin.CreateObject(dialogPanelPath);
                    dialogPanelPath = null;
                    addin = null;
                }
                return dialogPanel;
            }
            set { dialogPanel = value; }
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="id">identifikátor</param>
        /// <param name="label">štítek</param>
        public DefaultDialogPanelDescriptor(string id, string label)
        {
            this.id = id;
            this.label = label;
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="id">identifikátor</param>
        /// <param name="label">štítek</param>
        /// <param name="dialogPanelDescriptors">deskriptory vnitřních panelů</param>
        public DefaultDialogPanelDescriptor(string id, string label, List<IDialogPanelDescriptor> dialogPanelDescriptors)
            : this(id, label)
        {
            this.dialogPanelDescriptors = dialogPanelDescriptors;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="id">identifikátor</param>
        /// <param name="label">štítek</param>
        /// <param name="addin">větev stromu doplňků</param>
        /// <param name="dialogPanelPath">cesta ke konfiguraci panelů</param>
        public DefaultDialogPanelDescriptor(string id, string label, AddIn addin, string dialogPanelPath)
            : this(id, label)
        {
            this.addin = addin;
            this.dialogPanelPath = dialogPanelPath;
        }
    }
}
