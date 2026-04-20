declare namespace Gordic.Sko.WebApp {
    class GIxpSkoGuesser extends Gordic.Utils.GBaseTypeGuesser {
        type: string;
        guess(input: string): Gordic.Utils.IGTypeGuess[];
    }
}
