//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DisplayBindingService.cs                 </Name>
//    <Description> Zpracování instalovaných grafických vázeb na soubor         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Zpracování instalovaných grafických vázeb na soubor
    /// </summary>
    public static class DisplayBindingService
    {
        const string displayBindingPath = "/Desktop/DisplayBindings";

        static Property displayBindingServiceProperties;
        static List<DisplayBindingDescriptor> bindings;

        /// <summary>
        /// Inicializace služby
        /// </summary>
        public static void InitializeService()
        {
            bindings = AddInTree.BuildItems<DisplayBindingDescriptor>(displayBindingPath, null, true);
            displayBindingServiceProperties = PropertyService.Get("DisplayBindingService", new Property());
        }

        /// <summary>
        /// Připojení sekundárních pohledů do daného pohledu na obsah.
        /// </summary>
        /// <param name="viewContent">Obsah, do kterého se připojuje</param>
        /// <param name="isReattaching">Indikuje, že se jedná o znovu připojení</param>
        public static void AttachSubWindows(IViewContent viewContent, bool isReattaching)
        {
            ThreadService.AssertMainThread();

            if (viewContent == null)
                throw new ArgumentNullException(nameof(viewContent));

            foreach (DisplayBindingDescriptor binding in bindings)
            {
                if (CanAttachSecondaryBinding(binding, viewContent, isReattaching))
                    AttachSecondaryBinding(binding, viewContent);
            }
        }

        /// <summary>
        /// Kontroluje zda lze připojit sekundární binding
        /// </summary>
        static bool CanAttachSecondaryBinding(DisplayBindingDescriptor binding, IViewContent viewContent, bool isReattaching) =>
            binding.IsSecondary &&
            binding.CanOpenFile(viewContent.PrimaryFileName) &&
            !isReattaching &&
            binding.SecondaryBinding?.CanAttachTo(viewContent) == true;

        /// <summary>
        /// Připojí sekundární binding k view content
        /// </summary>
        static void AttachSecondaryBinding(DisplayBindingDescriptor binding, IViewContent viewContent)
        {
            IViewContent[] subViewContents = binding.SecondaryBinding.CreateSecondaryViewContent(viewContent);

            if (subViewContents != null)
                Array.ForEach(subViewContents, viewContent.SecondaryViewContents.Add);
            else
                ShowAttachmentError(binding, viewContent);
        }

        /// <summary>
        /// Zobrazí chybu připojení sekundárního bindingu
        /// </summary>
        static void ShowAttachmentError(DisplayBindingDescriptor binding, IViewContent viewContent)
        {
            string message = $"{GResources.GetResourceText(29450429)} {{0}} {GResources.GetResourceText(29450430)} {{1}}!\n{GResources.GetResourceText(29450431)}";
            MessageService.ShowErrorFormatted(message, binding.SecondaryBinding, viewContent);
        }

        #region new
        /// <summary>
        /// Získání primární vazby na zobrazení specifického souboru
        /// </summary>
        /// <param name="filename">Název souboru</param>
        /// <param name="content">případný obsah souboru</param>
        public static IDisplayBinding GetBinding(string filename, string content = null)
        {
            ThreadService.AssertMainThread();

            var descriptor = bindings.Find(d => IsPrimaryBindingValid(d, filename, content));
            return descriptor?.Binding;
        }
        static bool IsPrimaryBindingValid(DisplayBindingDescriptor descriptor, string filename, string content)
        {
            if (descriptor.IsSecondary)
                return false;

            // Pokud NENÍ fileNamePattern → VŽDY volat CanCreateContent() (content-based detection)
            if (IsContentBasedBinding(descriptor))
                return descriptor.Binding?.CanCreateContent(filename, content) == true;

            // Pokud JE fileNamePattern → klasická logika (extension-based)
            return descriptor.CanOpenFile(filename) ||
                   (descriptor.Binding?.CanCreateContent(filename, content) == true);
        }

        /// <summary>
        /// Kontroluje zda je binding používá content-based detection
        /// </summary>
        static bool IsContentBasedBinding(DisplayBindingDescriptor descriptor) =>
            string.IsNullOrEmpty(descriptor.FileNameRegex);
        #endregion
    }
}
