namespace Gordic.Sko.WebApp {
    export class GIxpSkoGuesser extends Gordic.Utils.GBaseTypeGuesser {
        type = "ixp"
        guess(input: string): Gordic.Utils.IGTypeGuess[] {
            new Gordic.Validators.Ixs()
            if (input.length > 0 && (input.match('^[A-Z0-9]+$') && input.length <= 12)) {
                var confidence = input.length / 12;
                if (input.length == 12) confidence = new Gordic.Validators.Ixs({ pid: true }).validate(input, $("<div>")) ? 1 : 0;
                return [{ type: this.type, confidence: confidence, parsed: input }]
            }

            return [{ type: this.type, confidence: 0 }];
        }
    }
}