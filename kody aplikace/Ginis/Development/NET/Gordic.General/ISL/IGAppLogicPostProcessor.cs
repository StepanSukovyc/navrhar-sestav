//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGAppLogicPostProcessor.cs                   </Name>
//    <Description> AL creation post processing                                 </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-06-04                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// AL creation post processing
    /// </summary>
    public interface IGAppLogicPostProcessor
    {
        /// <summary>
        /// Additional actions (configure) to created logic
        /// </summary>
        /// <param name="appLogic"></param>
        object PostProcess(object appLogic);
    }
}
