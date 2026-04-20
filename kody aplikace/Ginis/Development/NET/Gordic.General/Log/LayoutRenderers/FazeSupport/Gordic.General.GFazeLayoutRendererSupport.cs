//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GFazeLayoutRendererSupport.cs                </Name>
//    <Description> Hodnota fáze aplikace Ginis (bez použití kontextu)          </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-07-08                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace Gordic.General
{
    /* Ve výchozím nastavení od NLog 5 LayoutRenderer JE threadově bezpečný a obsahuje:
    protected virtual void WriteAsyncThreadSafe(AsyncLogEventInfo logEvent)
    {
        lock (SyncRoot)
        {
            // ...
            Write(logEvent);
        }
    } */

    /// <summary>Hodnota fáze aplikace Ginis (bez použití kontextu)</summary>
    [System.Security.SecuritySafeCritical]
    public class GFazeLayoutRendererSupport : IGObject
    {

        /// <summary>
        /// Pokusí se různými způsoby získat hodnotu fáze bez použití kontextu
        /// </summary>
        /// <returns>Získaná hodnota fáze (nebo prázdný řetězec)</returns>
        public string GetFaze()
        {   // u tlustého klienta GetEntryAssembly() nevrací null -> funguje je to ideální způsob 
            try
            {
                // I) u tlustého klienta je navíc v Bin složce velké množství souborů
                var l_oEntryAssembly = Assembly.GetEntryAssembly();

                if (l_oEntryAssembly != null)
                {
                    foreach (Type type in l_oEntryAssembly.GetTypes())
                    {
                        foreach (FazeAttribute fazeAttribute in type.GetCustomAttributes(typeof(FazeAttribute), true))
                        {
                            if (!String.IsNullOrEmpty(fazeAttribute.Faze))
                                return fazeAttribute.Faze;
                        }
                    }
                }

                // II) hledáme .tst soubor ve 2 cestách a) aplikační cesta b) bin cesta
                // u webové aplikace / testcase nebo nějaké unmanaged aplikace (COM) se pokračuje zde

                // var l_sMainModule = Process.GetCurrentProcess()?.MainModule;  // vrací jen iis.exe
                //var l_sBaseDomainDir= AppDomain.CurrentDomain.BaseDirectory;

                // a) aplikační cesta 
                // a) aplikační cesta https://stackoverflow.com/questions/6041332/best-way-to-get-application-folder-path
                var l_sAppDir = AppContext.BaseDirectory;
                var l_oAppDir = new DirectoryInfo(l_sAppDir);

                if (l_oAppDir != null)
                {
                    var l_sFazeAppDir = FazeFromTst(l_oAppDir);
                    if (!string.IsNullOrEmpty(l_sFazeAppDir))
                        return l_sFazeAppDir;
                }

                // b) bin cesta
                // b) bin cesta https://stackoverflow.com/questions/3461865/how-do-i-get-bin-path
                /* Assembly.GetExecutingAssembly().GetName().CodeBase
                For performance reasons, you should call this method only when you do not know at design time what assembly is currently executing. 
                The recommended way to retrieve an Assembly object that represents the current assembly is to 
                use the Type.Assembly property of a type found in the assembly*/
                //var l_sBinAssembly = typeof(GFazeLayoutRendererSupport).Assembly.CodeBase;
                //var l_sBinPath = new Uri(l_sBinAssembly).LocalPath;        //l_sBinAssembly = l_sBinAssembly.Replace("file:///", String.Empty);
                //var l_oBinDir = new FileInfo(l_sBinPath).Directory;
                string l_sBinPath;

                //kód převzatý od Alíka 
                var l_oBinAssembly = Assembly.GetExecutingAssembly();
#if !NET        // CodeBase v .NET Core 5 vyhazuje výjimku 
                if (Uri.TryCreate(l_oBinAssembly.CodeBase, UriKind.Absolute, out var l_oUri) &&
                                l_oUri.IsFile && string.IsNullOrWhiteSpace(l_oUri.Fragment))
                    l_sBinPath = Path.GetDirectoryName(l_oUri.LocalPath);
#else
                if (!string.IsNullOrEmpty(l_oBinAssembly.Location))
                    l_sBinPath = Path.GetDirectoryName(l_oBinAssembly.Location);
#endif
                else
                    l_sBinPath = AppDomain.CurrentDomain.BaseDirectory;
                // konec kódu od Alíka 

                var l_oBinDir = new FileInfo(l_sBinPath).Directory;
                if (l_oBinDir != null)
                {
                    var l_sFazeBinDir = FazeFromTst(l_oBinDir);
                    if (!string.IsNullOrEmpty(l_sFazeBinDir))
                        return l_sFazeBinDir;
                }

                /*var l_oDomainGordicAssembly = AppDomain.CurrentDomain.GetAssemblies()
    .FirstOrDefault(assembly => assembly.FullName.StartsWith("Gordic."));*/
                // 1 nejdříve rodičovská cesta (

                /*var l_oBinDir = new DirectoryInfo(l_oDomainGordicAssembly.CodeBase);
                if (l_oBinDir == null)
                {
                    return String.Empty;
                }

                var l_oBinDirParent = l_oBinDir.Parent;
                if (l_oBinDirParent == null)
                {   // pokud náhodou neexistuje rodičovská složka, pokusím se najít .tst v bin složce
                    return FazeFromTst(l_oBinDir);
                }

                // 1 nejdříve rodičovská cesta (
                var l_sFazeBinDirParent = FazeFromTst(l_oBinDirParent);
                if (!string.IsNullOrEmpty(l_sFazeBinDirParent))
                    return l_sFazeBinDirParent;
                // 2
                var l_sFazeBinDir = FazeFromTst(l_oBinDir);
                if (!string.IsNullOrEmpty(l_sFazeBinDir))
                    return l_sFazeBinDir;*/
            }
            catch (Exception ex)
            {
                Trace.WriteLine(String.Format(GResources.GetResourceText(23320015), ex.ToString())); //RC 23320015 : Při zjišťování fáze pro potřeby logování došlo k výjimce: {0}
            }

            return String.Empty;    // nic se nenašlo - default
        }

        private string FazeFromTst(DirectoryInfo directory)
        {
            var l_oTstList = directory.GetFiles("*0?.tst"); // hledat jen aplikace - ne sestavy, dokumentaci, helpy - např.: GSAADT04.tst, GWAUSU05.tst, GWAPOD01.tst

            if (l_oTstList.Length == 1)
            {   // jsou názvy tst a fází shodné? - předpoklad ano
                var l_oTstFile = l_oTstList[0];
                return l_oTstFile.Name.Left(l_oTstFile.Name.Length - l_oTstFile.Extension.Length);        // název souboru bez koncovky
            }
            else
            {   // na zalogování je příliš brzo. Trace.WriteLn?
                if (l_oTstList.Length > 1)
                    Trace.WriteLine(String.Format(GResources.GetResourceText(23320016), String.Join<FileInfo>(", ", l_oTstList))); //RC 23320016 : Při zjišťování fáze pro potřeby logování nalezeno příliš monoho souborů: {0}

                return String.Empty;
            }
        }

    }



}
