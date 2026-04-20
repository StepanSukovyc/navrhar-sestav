//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GDateTimeCurrent.cs                          </Name>
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
    public class GDateTimeCurrent : GDateTime
    {

        /// <summary>instance hodnoty Current určená pouze pro čtení</summary>
        private static readonly GDateTimeCurrent m_cgnCurrent = new GDateTimeCurrent();

        /// <summary>
        /// Výchozí konstruktor
        /// </summary>
        public GDateTimeCurrent( )
        {
            IsCurrent = true;
            //this.IsNull = true;
            //SetReadOnly( );
        }


        /// <summary>instance hodnoty Current určená pouze pro čtení</summary>
        public static GDateTimeCurrent Current
        {
            get { return m_cgnCurrent; }
        } // end property
    }
}
