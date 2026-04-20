//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSpellout.cs                                 </Name>
//    <Description> Konverze čísla na slova (1=jedna)                           </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2009-10-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;

namespace Gordic.General
{
    /// <summary>Konverze čísla na slova (1=jedna)</summary>
    public static class GSpellout
    {
        private static void NumToWords(string num, out string slova, short pad)
        {
            //string pro slova pred desetinou carkou
            string cela;
            //string pro clova za desetinou carkou
            string desetinna;
            //pomocny retezec
            string s;

            num = num.Trim();

            slova = "";
            if (num.Length == 0)
                return;

            //ošetření záporných čísel
            bool neg = num[0] == '-';
            if (neg) num = num.Substring(1).TrimStart();

            //rozdelim si retezec na celou a desetinnou cast
            DivideNumStr(num, out cela, out desetinna);
            //konverze na slova
            NumToWord(cela, out slova, pad);
            //pokud je cela cast prazdna, dam si tam nulu
            if (slova.Length == 0)
                slova = "nula";
            //budu si prevadet desetinnou cast?
            if (desetinna.Length > 0)
            {
                slova = slova.Trim();
                //prevod desetinne casti
                NumToWord(desetinna, out s, pad);
                //dodelani konce retezce
                if (s.Length != 0)
                    slova += " celých " + s;
            }
            slova = slova.Trim();
            if (neg) slova = "mínus " + slova;
        }

        private static void DivideNumStr(string instr, out string cela, out string desetinna)
        {
            //posice vyhledaného desetinného místa
            int destpos;

            //podle tecky si rozdelim retezec na cast celou a desetinnou
            destpos = instr.IndexOf('.');
            if (destpos >= 0)
            {
                cela = instr.Substring(0, destpos);
                desetinna = instr.Substring(destpos + 1);
            }
            else
            {
                cela = instr;
                desetinna = "";
            }
        }

        private static void NumToWord(string num, out string slova, short rodparam)
        {
            int cislo;
            //rad v tisicich
            int trad;

            int rod;
            //řád - 10^x
            int rad;
            //zbytek radu v tisicich
            int rad3;
            int vtroj;
            //index v poli
            int index;

            //vyprazdneni vysledneho retezce
            slova = "";
            //odstranim si mezery zleva
            num.TrimStart(' ');
            index = 0;
            rad = num.Length;
            vtroj = 0;
            while (rad > 0)
            {
                rad--;
                //pokusim se zjistit cislo
                cislo = num[index] - 48;
                //tohle je neco spatneho (jak se to sem vubec dostalo???)
                if (cislo < 0 || cislo > 9)
                {
                    slova = "!Chyba prevodu na slova!";
                    return;
                }
                //skok na dalsi index...
                index++;
                //takhle se pocitaji tisice
                if (rad % 3 == 1 && cislo == 1)
                {
                    //cislo nasobim deseti
                    cislo *= 10;
                    //zjisteni cisla v poradi
                    cislo += num[index] - 48;
                    ;
                    //odruseni dalsiho radu
                    rad--;
                    //zvyseni indexu
                    index++;
                    if (cislo < 10 || cislo > 19)
                    {
                        slova = "!Chyba prevodu na slova!";
                        return;
                    }
                }
                //bude nazev radu (tisic,milion,...)
                trad = rad / 3;
                //zbytek v tisicich
                rad3 = rad % 3;
                //uschovani puvodniho radu v tisicich
                rod = trad;
                if (rad3 == 2)
                    vtroj = 0;
                vtroj += cislo;

                if ((rod == 0) && rodparam == 1)
                    rod = 1;
                switch (cislo)
                {
                    case 0: /*if (rad3==0) strcat(slova,"nula ");*/
                        break;
                    case 1:
                        switch (rad3)
                        {
                            case 0:
                                switch (rod)
                                {
                                    case 0:
                                    case 3:
                                        slova += "jedna";
                                        break;
                                    case 1:
                                    case 2:
                                        slova += "jeden";
                                        break;
                                }
                                break;
                            case 2:
                                slova += "jedno";
                                break;
                            case 3:
                                slova += "jeden";
                                break;
                        }
                        break;
                    case 2:
                        switch (rad3)
                        {
                            case 0:
                                switch (rod)
                                {
                                    case 0:
                                    case 3:
                                        slova += "dvě";
                                        break;
                                    case 1:
                                    case 2:
                                        slova += "dva";
                                        break;
                                }
                                break;
                            case 2:
                                slova += "dvě";
                                break;
                            case 1:
                            case 3:
                                slova += "dva";
                                break;
                        }
                        break;
                    case 3:
                        slova += "tři";
                        break;
                    case 4:
                        slova += "čtyři";
                        break;
                    case 5:
                        if (rad3 != 1)
                            slova += "pět";
                        else
                            slova += "pa";
                        break;
                    case 6:
                        if (rad3 != 1)
                            slova += "šest";
                        else
                            slova += "še";
                        break;
                    case 7:
                        slova += "sedm";
                        break;
                    case 8:
                        slova += "osm";
                        break;
                    case 9:
                        if (rad3 != 1)
                            slova += "devět";
                        else
                            slova += "deva";
                        break;
                    case 10:
                        slova += "deset";
                        break;
                    case 11:
                        slova += "jedenáct";
                        break;
                    case 12:
                        slova += "dvanáct";
                        break;
                    case 13:
                        slova += "třináct";
                        break;
                    case 14:
                        slova += "čtrnáct";
                        break;
                    case 15:
                        slova += "patnáct";
                        break;
                    case 16:
                        slova += "šestnáct";
                        break;
                    case 17:
                        slova += "sedmnáct";
                        break;
                    case 18:
                        slova += "osmnáct";
                        break;
                    case 19:
                        slova += "devatenáct";
                        break;
                }
                if (cislo > 0 || rad3 == 0)
                {
                    //mezera pred radem
                    if ((rad3 != 1) && (slova.Length > 0) && (slova[slova.Length - 1] != ' '))
                        slova += " ";
                    switch (rad3)
                    {
                        case 0:
                            if (vtroj != 0)
                                switch (trad)
                                {
                                    case 0:
                                        break;
                                    case 1:
                                        switch (cislo)
                                        {
                                            case 2:
                                            case 3:
                                            case 4:
                                                slova += "tisíce";
                                                break;
                                            default:
                                                slova += "tisíc";
                                                break;
                                        }
                                        break;
                                    case 2:
                                        switch (cislo)
                                        {
                                            case 1:
                                                slova += "milión";
                                                break;
                                            case 2:
                                            case 3:
                                            case 4:
                                                slova += "milióny";
                                                break;
                                            default:
                                                slova += "miliónů";
                                                break;
                                        }
                                        break;
                                    case 3:
                                        switch (cislo)
                                        {
                                            case 1:
                                                slova += "miliarda";
                                                break;
                                            case 2:
                                            case 3:
                                            case 4:
                                                slova += "miliardy";
                                                break;
                                            default:
                                                slova += "miliard";
                                                break;
                                        }
                                        break;
                                }
                            break;
                        case 1:
                            switch (cislo)
                            {
                                case 2:
                                case 3:
                                case 4:
                                    slova += "cet";
                                    break;
                                default:
                                    slova += "desát";
                                    break;
                            }
                            break;
                        case 2:
                            switch (cislo)
                            {
                                case 1:
                                    slova += "sto";
                                    break;
                                case 2:
                                    slova += "stě";
                                    break;
                                case 3:
                                case 4:
                                    slova += "sta";
                                    break;
                                default:
                                    slova += "set";
                                    break;
                            }
                            break;
                    }
                    if (slova.Length > 1 && slova[slova.Length - 1] != ' ')
                        slova += " "; //mezera po radu
                }
            }
        }

        /// <summary>Konverze čísla na slova (1=jedna)</summary>
        /// <param name="num">vstupní číslo</param>
        /// <param name="rodparam">jaký je rod (0-koruna,1-haléře)</param>
        public static string Spellout(string num, short rodparam)
        {
            string slova = "";
            NumToWords(num, out slova, rodparam);
            return slova;
        }
        /// <summary>Konverze čísla na slova (1=jedna)</summary>
        public static string Spellout(string num)
        {
            return Spellout(num, 0);
        }
        /// <summary>Konverze čísla na slova (1=jedna)</summary>
        public static string Spellout(decimal num)
        {
            return Spellout(num.ToString(), 0);
        }
        /// <summary>Konverze čísla na slova (1=jedna)</summary>
        public static string Spellout(int num)
        {
            return Spellout(num.ToString(), 0);
        }
        /// <summary>Konverze čísla na slova (1=jedna)</summary>
        public static string Spellout(short num)
        {
            return Spellout(num.ToString(), 0);
        }

    }
}
