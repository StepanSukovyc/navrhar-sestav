//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionBindingDescriptor.cs           </Name>
//    <Description> Deskriptor jazykových vazeb                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Deskriptor jazykových vazeb
    /// </summary>
    class SolutionBindingDescriptor
    {
        ISolutionBinding binding = null;        
        /// <summary>
        /// Vazba
        /// </summary>
        public ISolutionBinding Binding
        {
            get
            {
                if (binding == null)
                {
                    binding = (ISolutionBinding)entity.AddIn.CreateObject(entity.Properties["class"]);
                    if (binding != null)
                        if (!binding.Type.Equals(this.Language, StringComparison.InvariantCultureIgnoreCase))
                            throw new InvalidOperationException(GResources.GetResourceText(29450403)); //RC 29450403 : Identifikátor neodpovída záznamu v konfiguraci!
                }
                return binding;
            }
        }

        Entity entity;
        /// <summary>
        /// Větev konfiguračního stromu
        /// </summary>
        public Entity Entity { get { return entity; } }
        /// <summary>
        /// možné koncovky souborů projektů
        /// </summary>
        public string ProjectFileExtension { get { return entity.Properties["projectfileextension"]; } }

        /// <summary>
        /// Identifikátor
        /// </summary>
        public string Guid { get { return entity.Properties["guid"]; } }

        /// <summary>
        /// Jazyk
        /// </summary>
        public string Language { get { return entity.Id; } }

        string[] codeFileExtensions;
        /// <summary>
        /// Možné koncovky
        /// </summary>
        public string[] CodeFileExtensions
        {
            get
            {
                if (codeFileExtensions == null)
                {
                    if (entity.Properties["supportedextensions"].Length == 0)
                        codeFileExtensions = new string[0];
                    else
                        codeFileExtensions = entity.Properties["supportedextensions"].ToLowerInvariant().Split(';');
                }
                return codeFileExtensions;
            }
        }
        /// <summary>
        /// Vytvoření deskriptoru
        /// </summary>
        /// <param name="entity">Informace konfiguračního stromu</param>
        public SolutionBindingDescriptor(Entity entity)
        {
            this.entity = entity;
        }
    }
}
