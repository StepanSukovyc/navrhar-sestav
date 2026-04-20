//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.IGReportImplementation.cs     </Name>
//    <Description> Interface pro použití uvnitř reporteru      </Description>
//    <Author>      Jan Brabec, Martin Aliger                   </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2005  </Copyright>
//    <Created>     2003-06-29                                  </Created>
//  </FileHeader>
// 2005-09-26  Martin Aliger prevezmuto

using System;
using System.Collections.Generic;
using Gordic.General;
using System.IO;

namespace Gordic.Report.Interface
{
	/// <summary>
	/// Pouze pro interní použití.
	/// </summary>
    [System.Security.SecurityCritical]
	public interface IGReportImplementation
	{
		/// <summary>
		/// Tato metoda vygeneruje report
		/// </summary>
        IGMemoryFile Generate(Stream continueStream);
        /// <summary>
        /// Tato metoda vygeneruje report
        /// </summary>
        System.Threading.Tasks.Task<IGMemoryFile> GenerateAsync(Stream continueStream, System.Threading.CancellationToken cancel, IProgress<GenerateProgress> progress);

        ///// <summary>
        ///// Tato metoda pokračuje v generování přerušeného reportu
        ///// </summary>
        //IGMemoryFile ContinueGeneration(Stream continueStream, Dictionary<string, object> vals);
        /// <summary>
        /// Tato metoda pokračuje v generování přerušeného reportu
        /// </summary>
        IGMemoryFile ContinueGeneration(Stream continueStream, string dataFile, Dictionary<string, object> vals);

        ///// <exclude/>
        //void OnBeginFormatting(string ixs_frm, string format_group, string bridge);

        ///// <exclude/>
        //void OnEndFormatting(Exception e);

        /// <exclude/>
        void ThreadStart();

        /// <exclude/>
        void ThreadEnd();

		/// <summary>
		/// Soubory reportu
		/// </summary>
        GMemoryFiles Files 
		{
			get;
		}

        /// <summary>
        /// Reprezentuje stav reportu.
        /// </summary>
        /// <remarks>
        /// Report může mít stavy: Empty - report ještě nebyl vygenerován, Working - report je právě
        /// generován, Done - report je již vygenerován.
        /// </remarks>
        GReportState State
        {
            get;
            set;
        }

        /// <summary>
        /// Obejde generování a nastaví výstupní data na předaná
        /// </summary>
        IGMemoryFile SetDataFile(Stream data);

	}

	/// <summary>
	/// Interface pro vnitří použití (NEPOUŽÍVAT)
	/// </summary>
    [System.Security.SecurityCritical]
	public interface IGVisualRepresentationImpl
	{
		/// <summary>
		/// Soubory s formátem sestavy .ALF a případné další soubory ... (ZIP)
		/// </summary>
        GMemoryFiles Files
		{
			get;
		}
        /// <summary>Vynucené znovunačtení souborů</summary>
        void Refresh();
	}

}
