//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.MissingProject.cs                      </Name>
//    <Description> Chybějící projekt                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.General;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Chybějící projekt
    /// </summary>
    class MissingProject : AbstractProject
    {
        /// <summary>
        /// Indikuje, že je pouze pro čtení
        /// </summary>
        public override bool ReadOnly { get { return true; } }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public MissingProject()
        {
            Name = GResources.GetResourceText(29451490);
        }
        /// <summary>
        /// Vytvoření nové instance chybějícího projektu
        /// </summary>
        /// <param name="fileName">Název souboru projektu</param>
        /// <param name="title">Název projektu</param>
        public MissingProject(string fileName, string title)
        {
            Name = title;
            FileName = fileName;
        }
    }
}
