//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GOAuthException.cs                           </Name>
//    <Description> OAuth exception                                             </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-04-17                                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.Serialization;

namespace Gordic.General
{
    /// <summary>
    /// OAuth exception
    /// </summary>
    [Serializable]
    public sealed class GOAuthException : GException
    {
        /// <summary>
        /// >
        /// </summary>
        public readonly OAuthJournalEvents OAuthEvent;

        /// <summary>
        /// IxpOap
        /// </summary>
        public readonly IGOAuthProfile OAuthProfile;

        /// <summary>
        /// RequestID
        /// </summary>
        public readonly string RequestID;

        /// <summary>
        /// RequestUri
        /// </summary>
        public readonly Uri RequestUri;

        public GOAuthException(OAuthJournalEvents oauthEvent, IGOAuthProfile profile)
        {
            OAuthEvent = oauthEvent;
            OAuthProfile = profile;
            RequestID = string.Empty;
            SetAdditionalData();
        }

        public GOAuthException(OAuthJournalEvents oauthEvent, IGOAuthProfile profile, string journalID, string message) : base(message)
        {
            OAuthEvent = oauthEvent;
            OAuthProfile = profile;
            RequestID = journalID;
            SetAdditionalData();
        }

        private GOAuthException(SerializationInfo serializationInfo, StreamingContext streamingContext) : base(serializationInfo, streamingContext)
        {
        }

        void SetAdditionalData()
        {
            AdditionalData.Add("ProfileId", OAuthProfile.Id);
            AdditionalData.Add("ProfileName", OAuthProfile.Name);
            AdditionalData.Add("OAuthEvent", OAuthEvent);
            AdditionalData.Add("RequestID", RequestID);
        }
    }
}
