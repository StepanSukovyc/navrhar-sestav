//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AssemblyExistsConditionEvaluator.cs      </Name>
//    <Description> Zjištění existence modulu dle cesty                         </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-07-02                                                  </Created>
//  </FileHeader>


using System;
using System.IO;
using System.Linq;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Zjištění existence modulu dle cesty
    /// </summary>
    /// <attribute name="assembly">
    /// Cesta k modulu
    /// </attribute>
    public class AssemblyNotExistsConditionEvaluator : IConditionEvaluator
    {
        /// <summary>
        /// Kontrola platnosti
        /// </summary>
        /// <param name="caller">Volaný objekt</param>
        /// <param name="condition">Podmmínka</param>
        /// <returns>TRUE - pokud cesta k modulu/souboru NEexistuje</returns>
        public bool IsValid(object caller, Condition condition)
        {
            string assembly = condition.Properties["assembly"];

            try
            {
                if (assembly[0] == ':')
                    try { return System.Reflection.Assembly.Load(assembly.Substring(1)) == null; }
                    catch { return AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(modul => modul.GetName().Name.Equals(assembly.Substring(1), StringComparison.InvariantCultureIgnoreCase)) == null; }
                else if (assembly[0] == '$')
                {
                    // buď je to odkaz na sestavení relativní cestou
                    int pos = assembly.IndexOf('/');
                    if (pos < 0)
                        return true;

                    string referencedAddIn = assembly.Substring(1, pos - 1);
                    foreach (AddIn addIn in AddInTree.AddIns)
                        if (addIn.Enabled && addIn.Manifest.Identities.ContainsKey(referencedAddIn))
                        {
                            string assemblyFile = Path.Combine(Path.GetDirectoryName(addIn.FileName),
                                                               assembly.Substring(pos + 1));

                            return System.Reflection.Assembly.LoadFrom(assemblyFile) == null;
                        }

                    // nebo je to přímo cesta k doplňku
                    if (File.Exists(assembly.Substring(1)))
                        return System.Reflection.Assembly.LoadFrom(assembly.Substring(1)) == null;
                }
            }
            catch { }
            return true;
        }
    }
}
