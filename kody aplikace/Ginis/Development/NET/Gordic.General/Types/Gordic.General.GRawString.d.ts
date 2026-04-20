declare namespace Gordic.General {
    /** Nebezpecny string, ktery by se mel pred vlozenim tohoto do HTML encodovat. Pro vlozeni do textoveho policka, ktere nema graficky 
     *  vystup, lze hodnotu pouzit tak jak je.
     *  
     *  Priklad: 
     * 
     *  let rs: GRawString = "<a href='javascript:void(0)'>click me</a>";
     *  let securedRs = Gordic.Templates.Formatters.encode(rs); //Vystup vypada takto: "&lt;a href='javascript:void(0)'&gt;click me&lt;/a&gt;"
     * */
    type GRawString = string;
}
