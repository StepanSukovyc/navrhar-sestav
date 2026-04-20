declare namespace Gordic.Sko.WebApp {
    class GEvidCisSkoResolver extends Gordic.Components.Search.GBaseSearchResolver {
        modal: boolean;
        readonly terms: string[];
        readonly typeGuesser: GEvidCisSkoGuesser;
        /**
         * Zde vracíme identifikátor resolveru.
         */
        protected getDefaultId(): string;
        /**
         * Zde vracíme informace o doméně resolveru.
         */
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
