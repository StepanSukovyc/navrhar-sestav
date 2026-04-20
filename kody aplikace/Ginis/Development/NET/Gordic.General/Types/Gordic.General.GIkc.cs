//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GIkc.cs                                      </Name>
//    <Description> G-typ Int64 reprezentující IKC - identifikaci kolekce dat   </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-07-09                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// G-typ Int64 reprezentující IKC - identifikaci kolekce dat, pro předávání hodnot v temp tabulkách mezi logikami, SPG či prostředími.
    /// </summary>
    public class GIkc : GInt64
    {
        //Struktura ikc

        //•	18ti-místné číslo(bigint) složené z časové a náhodné složky
        //•	použití výhradně ve dvojici s log_por_cislo
        //•	default 0 pro zpětnou kompatibilitu s dosavadními aplikacemi(těmi, u kterých nehrozí souběžné transakce s jedním log_por_cislo)
        //•	časová složka přináší kromě unikátnosti i pomůcku pro diagnostiku
        //•	datový typ BIGINT je databázově efektivnější, než GUID

        //YYMMDDHHmmSSNNNNNN
        //YY 19-99 rok
        //MM 01-12 měsíc
        //DD 01-31 den
        //HH 00-59 hodina
        //mm 00-59 minuta
        //SS 00-59 sekunda
        //NNNNNN 000000-999999 náhoda(případně pořadí, pokud ho budeme schopni technicky realizovat)
        //(Bigint zabírá 8B, maximální hodnota 9.223.372.036.854.775.807, na ORA bude nahrazen typem number(18))


        private static volatile int m_snCounter = 0;

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        private static readonly GIkc m_cgnNull = new GIkc(true);

        /// <summary>
        /// Nový unikátní Ikc pro použití k identifikaci kolekcí dat
        /// </summary>
        public GIkc()
        {
            var now = DateTime.UtcNow;
            long date_part = ((((now.Year%100) * 100) + now.Month) * 100) + now.Day;
            long time_part = (((now.Hour * 100) + now.Minute) * 100) + now.Second;
            long rand_part = Rand(now.Millisecond);
            this.Value = (((date_part * 1000000) + time_part) * 1000000) + rand_part;
            SetReadOnly();
        }

        private GIkc(bool readOnly)
        {
            if (readOnly) SetReadOnly();
        }

        private GIkc(long value)
        {
            this.Value = value;
            SetReadOnly();
        }

        private int Rand(int seed)
        {
            if (m_snCounter == 0)
                lock (typeof(GIkc))
                    if (m_snCounter == 0)
                        m_snCounter = new Random(seed).Next(1, 999999);
            var v = m_snCounter;
            //v ^= v >> 13;
            //v ^= v << 18;
            m_snCounter++;
            if (m_snCounter > 999999) m_snCounter = 1;
            return v;
        }

        /// <summary>typová konverze</summary>
        public static new GIkc Parse(object inputValue) => new GIkc(GInt64.Parse(inputValue, false));

        /// <summary>typová konverze</summary>
        public static new GIkc Parse(string inputValue, IFormatProvider formatProvider) => new GIkc(GInt64.Parse(inputValue, formatProvider));

        /// <summary>instance hodnoty null určená pouze pro čtení</summary>
        public new static GIkc Null
        {
            get { return m_cgnNull; }
        }
    }
}
