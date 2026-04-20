//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDateCurrent.cs                              </Name>
//    <Description> G-typ DateTime reprezentující v rámci akcí Insert a Update hodnotu current - jinde by se tento typ neměl používat.</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-11-13                                                  </Created>
//  </FileHeader>



namespace Gordic.General
{
    /// <summary>
    /// G-typ DateTime reprezentující v rámci akcí Insert a Update hodnotu current - jinde by se tento typ neměl používat.
    /// </summary>
    public class GDateCurrent : GDate
    {

        /// <summary>instance hodnoty Current určená pouze pro čtení</summary>
        private static readonly GDateCurrent m_cgnCurrent = new GDateCurrent();

        /// <summary>
        /// Výchozí konstruktor
        /// </summary>
        public GDateCurrent( )
        {
            IsCurrent = true;
            //this.m_bIsCurrent = true;
            //this.IsNull = true;
            //SetReadOnly( );
        }

        /// <summary>instance hodnoty Current určená pouze pro čtení</summary>
        public static GDateCurrent Current
        {
            get { return m_cgnCurrent; }
        } // end property

    }
}
