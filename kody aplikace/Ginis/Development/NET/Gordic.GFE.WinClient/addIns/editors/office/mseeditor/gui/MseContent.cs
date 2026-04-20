//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MseContent.cs                          </Name>
//    <Description> Obsah MSE objektu                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2011-03-25                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Dom;
using System.Drawing.Design;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Obsah MSE objektu
    /// </summary>
    class MseContent : IScriptHandler, IComponent, IOfficeItem
    {
        #region IScriptHandler
        /// <summary>
        /// Skripty
        /// </summary>
        [DisplayName("skripta")]
        [Description("Seznam dostupných skript datové položky")]
        [EditorAttribute(typeof(ScriptListEditor), typeof(UITypeEditor))]
        [Browsable(false)]
        public GFEScriptList Scripts { get; set; }
        #endregion

        /// <summary>
        /// Kopírování vlastnosti daného objektu
        /// </summary>
        /// <param name="p_obj">Daný objekt</param>
        public void Copy(object p_obj)
        {
            //Pokud objekt není RTF objekt, pak není co řešit
            if (!(p_obj is MseContent))
                return;

            //zafixujeme objekt
            MseContent lContent = (MseContent)p_obj;

            // nakopírujeme skripty
            foreach (var item in lContent.Scripts)
                if (!Scripts.ContainsKey(item.Key))
                    Scripts.Add(item.Key, item.Value);
        }

        #region IComponent
        /// <exclude/>
        public event EventHandler Disposed;
        /// <exclude/>
        [Browsable(false)]
        public ISite Site { get; set; }
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose() { Disposed?.Invoke(this, EventArgs.Empty); }
        #endregion

        #region IOfficeItem
        /// <summary>
        /// Jednoznačný identifikátor políčka
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("identifikátor")]
        [Description("Jednoznačný identifikátor položky")]
        public Guid Guid { get; set; }
        /// <summary>
        /// Název políčka
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("název")]
        [Description("Název položky")]
        public string Name { get; set; }
        /// <summary>
        /// Filter-Out políčka
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("filter-out")]
        [Description("Atribut filter-out položky")]
        public string FilterOut { get; set; }
        /// <summary>
        /// Filter-In políčka
        /// </summary>
        [ReadOnly(true)]
        [DisplayName("filter-in")]
        [Description("Atribut filter-in položky")]
        public string FilterIn { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [ReadOnly(true)]
        [Browsable(false)]
        public string Type { get => "mse"; } 
        #endregion

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public MseContent()
        {
            Guid = Guid.Empty;

            Scripts = new GFEScriptList(UndoRedoService.Manager)
            {
                { "onData", string.Empty },
                { "onEnter", string.Empty },
                { "onLoad", string.Empty },
                { "onPrint", string.Empty }
            };
        }

    }
}
