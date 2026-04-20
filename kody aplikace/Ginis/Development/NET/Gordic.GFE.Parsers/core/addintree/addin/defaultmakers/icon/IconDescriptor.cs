//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IconDescriptor.cs                        </Name>
//    <Description> Descriptor ikonek                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-22                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Descriptor ikonek
    /// </summary>
    public class IconDescriptor
    {
        Entity entity;

        /// <summary>
        /// Identifikátor
        /// </summary>
        public string Id { get { return entity.Id; } }

        /// <summary>
        /// Zdrojj
        /// </summary>
        public string Resource { get { return entity.Properties["resource"]; } }

        /// <summary>
        /// Koncovky
        /// </summary>
        public string[] Extensions { get { return entity.Properties["extensions"].Split(';'); } }

        /// <summary>
        /// Vytvoření nové instance
        /// </summary>
        /// <param name="entity">Větev konfiguračního stromu</param>
        public IconDescriptor(Entity entity)
        {
            this.entity = entity;
        }
    }
}
