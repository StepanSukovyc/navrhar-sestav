//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGType.cs                            </Name>
//    <Description> rozhraní základních databázových typù systému Ginis </Description>
//    <Author>      Jan Kuttich                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021               </Copyright>
//    <Created>     2003-08-27                                          </Created>
//  </FileHeader>

using System;
using System.Data.OleDb;
using System.Diagnostics;

namespace Gordic.General {


    /// <summary>Rozhraní základních databázových typù systému Ginis</summary>
    public interface IGDbType : IGObject, ICloneable, IComparable {

        /// <summary>databázová hodnota</summary>
        object DbValue {get; set;}

        /// <summary>pøíznak hodnoty null</summary>
        bool IsNull {get; set;}

        /// <summary>pøíznak hodnoty urèené pouze pro ètení</summary>
        bool IsReadOnly {get; }

        /// <summary>pøíznak povolení hodnoty null</summary>
        bool IsNullable {get;}

        /// <summary>stav hodnoty</summary>
        GDbType.ValueState State {get;}

        /// <summary>zdrojový sloupec v databázové tabulce</summary>
        string SourceColumn {get; set;}

        /// <summary>akceptace zmìny hodnoty</summary>
        void AcceptChanges();
        
        /// <summary>nastavení hodnoty s pøípadnou pøedchozí typovou konverzí</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        void ParseValue(object inputValue);

        /// <summary>
        /// Konvertuje hodnotu na string podle dodaného formátu (culture specific)
        /// </summary>
        /// <param name="provider"><see cref="IFormatProvider"/> s informacemi o formátu (culture specific)</param>
        /// <returns>Øetìzcová reprezentace hodnoty</returns>
        string ToString(IFormatProvider provider);

        /// <summary>pøevod hodnoty na text</summary>
        /// <param name="involveNull">pøíznak zahrnutí hodnoty null</param>
        /// <returns>textová reprezentace hodnoty</returns>
        string ToString(bool involveNull);

    } // end interface

} // end namespace
