declare namespace Gordic.Prefabs.Select {
    
    export interface GCFontIconDto {
        icon: string;
        name: string;
        keywords?: string[];
        desc?: string;
    }

    function icons(options?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<GCFontIconDto>): GSelectBoxOptions<GCFontIconDto>;

    export namespace icons {
        export function getIcons(s?: string): JQueryPromise<GCFontIconDto[]>;
    }
}