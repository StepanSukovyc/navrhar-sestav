//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGAibTransferConfiguration.cs                </Name>
//    <Description> DTO interface for GAppLogicExternalConfiguration refactoring</Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-03-22                                                  </Created>
//  </FileHeader>


namespace Gordic.General
{
    /// <summary>
    /// DTO interface for GAppLogicExternalConfiguration refactoring
    /// </summary>
    public interface IGExternalLogicTransferConfig
    {
        /// <summary>
        /// AIB_Enabled
        /// </summary>
        bool AIB_Enabled
        {
            get;
        }

        /// <summary>
        /// AIB_Domain
        /// </summary>
        string AIB_Domain
        {
            get;
        }

        /// <summary>
        /// AIB_UserName
        /// </summary>
        string AIB_UserName
        {
            get;
        }

        /// <summary>
        /// AIB_Password
        /// </summary>
        IPasswordSecret AIB_Password
        {
            get;
        }

        /// <summary>
        /// Url
        /// </summary>
        string Url
        {
            get;
        }

        /// <summary>
        /// Faze
        /// </summary>
        string Faze
        {
            get;
        }
    }
}
