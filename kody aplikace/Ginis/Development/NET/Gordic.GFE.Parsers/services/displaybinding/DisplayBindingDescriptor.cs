//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DisplayBindingDescriptor.cs              </Name>
//    <Description> Deskriptor vazeb                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Text.RegularExpressions;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Deskriptor vazeb
    /// </summary>
    public class DisplayBindingDescriptor
    {
        object binding;
        readonly bool isSecondary;
        Entity entity;

        /// <summary>
        /// Získání IDisplayBinding nebo ISecondaryDisplayBinding pokud je již načten,
        /// jinak vrací NULL
        /// </summary>
        internal object GetLoadedBinding() { return binding; }

        /// <summary>
        /// Vazba
        /// </summary>
        public IDisplayBinding Binding
        {
            get
            {
                if (entity != null && binding == null)
                    binding = entity.AddIn.CreateObject(entity.Properties["class"]);

                return binding as IDisplayBinding;
            }
        }

        /// <summary>
        /// Získání sekundarního pohledu
        /// </summary>
        public ISecondaryDisplayBinding SecondaryBinding
        {
            get
            {
                if (entity != null && binding == null)
                    binding = entity.AddIn.CreateObject(entity.Properties["class"]);

                return binding as ISecondaryDisplayBinding;
            }
        }

        /// <summary>
        /// Zjištění, zda vazba je na sekundární pohled
        /// </summary>
        public bool IsSecondary { get { return isSecondary; } }

        /// <summary>
        /// Jednoznačný identifikátor vazby
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// Titulek vazby
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// Regex názvu souboru
        /// </summary>
        public string FileNameRegex { get; set; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="entity">Úzel stromu s informaci o vazbě</param>
        public DisplayBindingDescriptor(Entity entity)
        {
            if (entity == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450427)); //RC 29450427 : Jednotka s informaci je prázdná!

            isSecondary = entity.Properties["type"] == "Secondary";
            if (!isSecondary && entity.Properties["type"] != "" && entity.Properties["type"] != "Primary")
                MessageService.ShowWarningFormatted(GResources.GetResourceText(29450428) + " '{0}'!", entity.Properties["type"]); //RC 29450428 : Neznámý typ vázby

            this.entity = entity;
            this.Id = entity.Id;

            string title = entity.Properties["title"];
            if (string.IsNullOrEmpty(title))
                this.Title = entity.Id;
            else
                this.Title = title;

            this.FileNameRegex = entity.Properties["fileNamePattern"];
        }

        /// <summary>
        /// Vytvoření nové instance třídy dle již existující vazby
        /// </summary>
        /// <param name="binding">Vazba</param>
        public DisplayBindingDescriptor(IDisplayBinding binding)
        {
            this.isSecondary = false;
            this.binding = binding ?? throw new ArgumentNullException("binding");
        }

        /// <summary>
        /// Vytvoření nové instance třídy del již existující sekundární vazby
        /// </summary>
        /// <param name="binding">Sekundarní vazba</param>
        public DisplayBindingDescriptor(ISecondaryDisplayBinding binding)
        {
            this.isSecondary = true;
            this.binding = binding ?? throw new ArgumentNullException("binding");
        }

        /// <summary>
        /// TRUE - pokud pomocí vazby pravděpodobně lze otevřít daný soubor.
        /// Lze volat Binding.CanCreateContentForFile() pro zjištění, zda OPRAVDU lze otevřit daný soubor.
        /// </summary>
        /// <remarks>
        /// </remarks>
        public bool CanOpenFile(string fileName)
        {
            string fileNameRegex = StringParser.Parse(this.FileNameRegex);
            if (fileNameRegex == null || fileNameRegex.Length == 0) // regex není specifikován
                return true;
            if (fileName == null) // regex specifikován, ale název souboru není dan
                return false;
            return Regex.IsMatch(fileName, fileNameRegex, RegexOptions.IgnoreCase);
        }
    }
}
