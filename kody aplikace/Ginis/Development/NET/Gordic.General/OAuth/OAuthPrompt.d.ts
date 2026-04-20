declare namespace Gordic.General {
	/**OAuthPrompt for OAuth profil*/
	const enum OAuthPrompt {
		/**Default*/
		Default=0,
		/**Forces the user to enter their credentials on that request, negating single-sign on*/
		Login=10,
		/**It is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error.*/
		None=20,
		/**Consent triggers the OAuth consent dialog after the user signs in, asking the user to grant permissions to the app.*/
		Consent=30,
		/**Select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.*/
		SelectAccount=40,
	}
}
