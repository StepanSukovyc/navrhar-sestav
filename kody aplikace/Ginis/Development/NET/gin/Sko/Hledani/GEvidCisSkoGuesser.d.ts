declare namespace Gordic.Sko.WebApp {
    class GEvidCisSkoGuesser extends Gordic.Utils.GBaseTypeGuesser {
        type: string;
        guess(input: string): Gordic.Utils.IGTypeGuess[];
    }
}
