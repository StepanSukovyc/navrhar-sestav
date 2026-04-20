declare namespace Gordic.General {
	/**
	*     Available service providers for OAuth
	*     
	*/
	const enum OAuthService {
		/**
		*     Mail_SMTP
		*     
		*/
		Mail_SMTP=0,
		/**
		*     Vault
		*     
		*/
		Vault=10,
		/**
		*     GraphAPI
		*     
		*/
		GraphAPI=20,
		/**
		*     Mail_POP3
		*     
		*/
		Mail_POP3=30,
		/**
		*     MM_Recogniser
		*     
		*/
		MM_Recogniser=40,
		/**
		*     CSAS_API
		*     
		*/
		CSAS_API=50,
		/**
		*     BankGateway (CSAS)
		*     
		*/
		BankGateway=51,
		/**
		*     Unknown
		*     
		*/
		Unknown=60,
		/**
		*     GINIS_ESL
		*     
		*/
		GINIS_ESL=70,
		/**
		*     AzureOpenAI
		*     
		*/
		AzureOpenAI=80,
		/**
		*     Azure Foundry AI
		*     
		*/
		AzureFoundryAI=81,
	}
}
