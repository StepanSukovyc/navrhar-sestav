//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGRaiseableRuntime.cs                        </Name>
//    <Description> RaiseToStage1                                               </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-15                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// IGRaiseableRuntime
    /// </summary>
    public interface IGRaiseableRuntime
    {
        /// <summary>
        /// RaiseToStage1
        /// </summary>
        void RaiseToStage(RuntimeStages stage);
    }
}
