//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OxsContent.cs                          </Name>
//    <Description> Obsah MSE objektu                                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                        </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2016-01-09                                                  </Created>
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
    /// Obsah OXS objektu
    /// </summary>
    class OxsContent : IScriptHandler, IComponent, IOfficeItem
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
        [DisplayName("filter-In")]
        [Description("Atribut filter-in položky")]
        public string FilterIn { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [ReadOnly(true)]
        [Browsable(false)]
        public string Type { get => "oxs"; } 
        #endregion

        /// <summary>
        /// Kopírování vlastnosti daného objektu
        /// </summary>
        /// <param name="_obj">Daný objekt</param>
        public void Copy(object _obj)
        {
            //Pokud objekt není OXS objekt, pak není co řešit
            if (!(_obj is OxsContent))
                return;

            //zafixujeme objekt
            OxsContent _content = (OxsContent)_obj;

            // nakopírujeme skripty
            foreach (var _item in _content.Scripts)
                if (!Scripts.ContainsKey(_item.Key))
                    Scripts.Add(_item.Key, _item.Value);
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public OxsContent()
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
