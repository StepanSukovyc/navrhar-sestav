//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SolutionTypeDescriptor.cs              </Name>
//    <Description> deskriptor typů sestavení                                   </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-06-05                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// deskriptor typů sestavení
    /// </summary>
    class SolutionTypeDescriptor
    {
        Entity entity;
        /// <summary>
        /// Větev konfiguračního stromu
        /// </summary>
        public Entity Entity { get { return entity; } }
        /// <summary>
        /// možné koncovky souborů projektů
        /// </summary>
        public string SupportedExtensions { get { return entity.Properties["supportedextensions"]; } }

         /// <summary>
        /// možné koncovky souborů projektů
        /// </summary>
        public string Class { get { return entity.Properties["class"]; } }

        /// <summary>
        /// Vytvoření deskriptoru
        /// </summary>
        /// <param name="entity">Informace konfiguračního stromu</param>
        public SolutionTypeDescriptor(Entity entity)
        {
            this.entity = entity;
        }
    }
}
