//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Commands.cs                            </Name>
//    <Description> příkazy editoru                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-21                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Linq;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Services;
using Gordic.General;

namespace Gordic.GFE.WinClient.GrrEditor
{
    /// <summary>
    /// Vložení nové skupiny
    /// </summary>
    class CreateGroup : AbstractMenuCommand
    {
        SelectionService service;
        /// <summary>
        /// indikuje dostupnost operace
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                if (SimpleDesktop.Desktop.ActiveViewContent is IHost host)
                    service = host.ServiceSelection;

                return service != null && service.SelectedComponents.Exists(cm => cm is IGRRLabel && (cm as IGRRLabel).Parent is IGRRLabel);
            }
        }
        /// <summary>
        /// Spuštění akce vložení
        /// </summary>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (IsEnabled)
                {
                    List<object> selected = service.SelectedComponents
                        .Select(cm => cm is IGRRLabel && (cm as IGRRLabel).Parent is IGRRLabel ? cm : null)
                        .Distinct()
                        .ToList()
                        .FindAll(cmo => cmo != null);

                    if (selected.Count != 0)
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450064))) //RC 29450064 : vložení nové skupiny do vybrané sekce
                        {
                            selected.ForEach(cm => cm is IGRRLabel, _CreateGroup);
                            LocalCommonService.LabelZoneListChanged(selected.FirstOrNull(cm => cm is IGRRLabel) as IGRRLabel);
                            UndoRedoService.Commit();
                        }
                }
            });
        }

        void _CreateGroup(object obj)
        {
            if (obj is GrrRegion)
                (obj as GrrRegion).Group.InsertAfter(typeof(GrrGroup), obj as AbstractLabel);
            else if (obj is GrrGroup)
                if ((obj as GrrGroup).ParentLabel is GrrRegion reg)
                    reg.Group.InsertAfter(typeof(GrrGroup), obj as AbstractLabel);
        }
    }
}
