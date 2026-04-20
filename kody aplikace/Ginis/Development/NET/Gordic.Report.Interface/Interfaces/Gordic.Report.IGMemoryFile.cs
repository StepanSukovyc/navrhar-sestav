//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.IGMemoryFile.cs               </Name>
//    <Description> Interface pro memery maped file             </Description>
//    <Author>      Jan Brabec, Martin Aliger                   </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2005  </Copyright>
//    <Created>     2003-06-29                                  </Created>
//  </FileHeader>
// 2005-09-26  Martin Aliger prevezmuto

using System;

namespace Gordic.Report.Interface
{
	/// <summary>
	/// Rozhraní pro práci se souborem mapovaným do pamìti
	/// </summary>
	public interface IGMemoryFile
	{
		/// <summary>
		/// Uloží data souboru do destination
		/// </summary>
		/// <remarks>
		/// Data souboru jsou v pamìti, tato metoda je uloží, asi nejlépe na disk,
		/// jméno souboru pro uložení je v destination. Pokud není zadán název souboru, použije se FileName
		/// </remarks>
		/// <example>
		/// Uložení souboru na disk. V tomto pøíkladu je vytvoøen nový MemoryFile a je do nìj
		/// zapsána 1 na nultou pozici.
		/// <code>
		/// IGMemory l_oMemFile = new GMemoryFile();
		/// l_oMemFile[0] = 1;
		/// l_oMemFile.SaveTo("c:\pokus.txt");
		/// </code>
		/// </example>
		/// <param name="destination">Název cílového souboru</param>
        /// <param name="asCopy">pokud je true, nemeni ulozene jmeno souboru (FileName)</param>
		void SaveTo(string destination, bool asCopy = false);

		/// <summary>
		/// Pøipojí data do existujícího souboru
		/// </summary>
		/// <remarks>
		/// Pokud soubor neexistuje tak ho nejdøíve vytvoøí. Lze tedy použít AppendTo kdykoli i když na poprvé soubor
		/// ještì neexistuje
		/// </remarks>
		/// <example>
		/// Uložení souboru na disk. V tomto pøíkladu je vytvoøen nový MemoryFile a je do nìj
		/// zapsána 1 na nultou pozici.
		/// <code>
		/// IGMemory l_oMemFile = new GMemoryFile();
		/// l_oMemFile[0] = 1;
		/// l_oMemFile.AppendTo("c:\pokus.txt");
		/// </code>
		/// </example>
		/// <param name="destination"></param>
		void AppendTo(string destination);

		/// <summary>
		/// Uloží data do temporárního souboru
		/// </summary>
		/// <returns>cesta k uloženému souboru souboru</returns>
        /// <param name="path">Cesta kam uložit nebo null</param>
        /// <param name="asCopy">pokud je true, nemeni ulozene jmeno souboru (FileName)</param>
        string SaveToTemp(string path, bool asCopy = false);

		/// <summary>
		/// Uloží data do temporárního souboru
		/// </summary>
		/// <returns>cesta k uloženému souboru souboru</returns>
        /// <param name="path">Cesta kam uložit nebo null</param>
        /// <param name="extension">Pøípona souboru</param>
        /// <param name="asCopy">pokud je true, nemeni ulozene jmeno souboru (FileName)</param>
        string SaveToTemp(string path, string extension, bool asCopy = false);
		
		/// <summary>
		/// Naplní soubor z dat uložených v source
		/// </summary>
		/// <remarks>
		/// Naète data ze souboru do pamìti. Pokud není zadán název souboru, použije se FileName
		/// </remarks>
		/// <param name="source">Název zdrojového souboru</param>
		void LoadFrom(string source);



		/// <summary>
		/// Pøímý pøístup k bytùm souboru
		/// </summary>
		/// <remarks>
		/// Soubor se nemusí nijak pøealokovávat. Alokace se dìje automaticky pøístupem k prvkùm
		/// daného indexu
		/// </remarks>
		byte this [int idx] 
		{
			get;
			set;
		}

		/// <summary>
		/// Aktuální délka souboru
		/// </summary>
		long Length
		{
			get;
		}

		/// <summary>
		/// Vrací, nebo nastavuje aktuální pozici v souboru
		/// </summary>
		/// <exception cref="ArgumentOutOfRangeException">
		/// Position je nastaven na zápornou hodnotu, nebo na
		/// hodnotu vìtší než <see cref="Int64.MaxValue"/>
		/// </exception>
		/// <exception cref="ObjectDisposedException">
		/// Soubor je uzavøen
		/// </exception>
		long Position 
		{
			get; 
			set;
		}

		/// <summary>
		/// Pøeète Byte
		/// </summary>
		/// <exception cref="System.IO.EndOfStreamException">Pozice je na konci souboru</exception>
		/// <returns>Pøeètená hodnota</returns>
		byte ReadByte();

		/// <summary>
		/// Zapíše byte na aktuální pozici v souboru
		/// </summary>
		/// <remarks>
		/// Zápis na konec souboru zvìtšuje soubor
		/// </remarks>
		/// <param name="value">Byte, který se má zapsat</param>
		void WriteByte(byte value);

		/// <summary>
		/// Pøeète UInt16
		/// </summary>
		/// <returns>Pøeètená hodnota</returns>
		ushort ReadUInt16();

		/// <summary>
		/// Pøeète UInt32
		/// </summary>
		/// <returns>Pøeètená hodnota</returns>
		uint ReadUInt32();

		/// <summary>
		/// Zapíše textový øetìzec do streamu
		/// </summary>
		/// <param name="s">Øetìzec, který se má zapsat</param>
		void Write(string s);

		/// <summary>
		/// Zapíše textový øetìzec do streamu a ukonèí øádku
		/// </summary>
		/// <param name="s">Øetìzec, který se má zapsat</param>
		void WriteLine(string s);

		/// <summary>
		/// Pøeète textový øetìzec až do konce øádky
		/// </summary>
		/// <returns>Pøeètený øádek textu</returns>
		string ReadLine();
		/// <summary>
		/// Pøevede stream na pole bytu bez ohledu na pozici ve streamu
		/// </summary>
		/// <returns></returns>
		byte[] ToArray();		
		/// <summary>
		/// Obsahuje aktuální jméno souboru
		/// </summary>
		/// <remarks>
		/// Jméno souboru je pùvodnì prázdné, naplní se automaticky po naètení dat ze souboru,
		/// nebo po uložení dat do souboru.
		/// </remarks>
		string FileName
		{
			get;
			set;
		}

        /// <summary>
        /// Vytvoøí stream pro ètení
        /// </summary>
        /// <returns>stream</returns>
        System.IO.Stream ReadStream();
	}
		
}
