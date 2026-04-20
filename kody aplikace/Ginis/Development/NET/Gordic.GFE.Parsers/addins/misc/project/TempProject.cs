//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TempProject.cs                           </Name>
//    <Description> dočasný pomocný projekt sestavení                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-27                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using System;

namespace Gordic.GFE.Parsers.AddIns.Project
{
    /// <summary>
    /// dočasný pomocný projekt sestavení
    /// </summary>
    public class TempProject : IDisposable
    {
        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                if (tempDir != null)
                {
                    tempDir.Dispose();
                    tempDir = null;
                }
        }
        ~TempProject() { Dispose(false); }
        #endregion

        GFETempDir tempDir;
        /// <summary>
        /// Dočasná složka souborů projektu
        /// </summary>
        public GFETempDir TemporaryDir { get { return tempDir; } }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public TempProject()
        {
            tempDir = new GFETempDir();
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="fullFileName">úplná cesta k souboru archivního projektu</param>
        public TempProject(string fullFileName)
        {
            tempDir = new GFETempDir(fullFileName);
        }
    }
}
