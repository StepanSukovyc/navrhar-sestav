//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGLoggerInt.cs                               </Name>
//    <Description> Rozhraní pro interní použití vèetnì skrytých vlastností     </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-09-21                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{

    /// <summary>
    /// Rozhraní pro interní použití vèetnì skrytých vlastností
    /// </summary>
    internal interface IGLoggerInt : IGLogger
    {
        /// <summary>
        /// Interní logovací objekt
        /// </summary>
        NLog.Logger Logger
        {
            get;
            //set;
        }
    }
}
