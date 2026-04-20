//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSecretDefinition.cs                         </Name>
//    <Description> Secret definition - catalog record                          </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-11-22                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Secret definition - catalog record
    /// </summary>
    public class GSecretDefinition : IExistable
    {
        /// <summary>
        /// Path
        /// </summary>
        public readonly string Path;

        /// <summary>
        /// GSecretDefinition
        /// </summary>
        /// <param name="path"></param>
        /// <param name="exists"></param>
        protected GSecretDefinition(string path, bool exists)
        {
            Path = path;
            Exists = exists;
        }

        /// <summary>
        /// Mapping
        /// </summary>
        public virtual string MappedPath => Path;

        /// <summary>
        /// GSecretDefinition
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static GSecretDefinition NotFound(string path) =>
            new GSecretDefinition(
                path: path,
                exists: false
            );

        /// <summary>
        /// ToString
        /// </summary>
        /// <returns></returns>
        public override string ToString() =>
            $"{Path}: {(Exists ? "Exists" : "NotFound")}";

        /// <summary>
        /// Exists
        /// </summary>
        public bool Exists { get; }
    }
}
