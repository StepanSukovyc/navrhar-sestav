//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockContentEventArgs.cs                </Name>
//    <Description> Argument metod s dokovácím obsahem                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Argument metod s dokovácím obsahem
    /// </summary>
	public class DockContentEventArgs : EventArgs
    {
        private readonly IDockContent m_content;
        /// <summary>
        /// Obsah
        /// </summary>
        public IDockContent Content { get => m_content; }

        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
        /// <param name="content">Dokovaný obsah</param>
        public DockContentEventArgs(IDockContent content)
        {
            m_content = content;
        }
    }
}
