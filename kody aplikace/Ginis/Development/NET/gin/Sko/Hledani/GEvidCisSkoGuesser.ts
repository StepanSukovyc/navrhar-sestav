namespace Gordic.Sko.WebApp {
    export class GEvidCisSkoGuesser extends Gordic.Utils.GBaseTypeGuesser {
        type = "evidCis"
        guess(input: string): Gordic.Utils.IGTypeGuess[] {
           
            if (input.length >= 13 && (input.match('^[0-9]+$') && input.length <= 15)) return [{ type: this.type, confidence: 1, parsed: input }]
            else return [{ type: this.type, confidence: 0 }];
        }
    }
}