//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ParserDescriptor.cs                      </Name>
//    <Description> Deskriptor analyzátoru                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.IO;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Deskriptor analyzátoru
    /// </summary>
    public sealed class ParserDescriptor
    {
        IParser parser = null;
        string[] supportedExtensions = null,
            supportformats = null;

        Entity entity;
        /// <summary>
        /// Analyzátor
        /// </summary>
        public IParser Parser
        {
            get
            {
                if (parser == null)
                    parser = (IParser)entity.AddIn.CreateObject(entity.Properties["class"]);
                return parser;
            }
        }
        /// <summary>
        /// Větev konfiguračního stromu
        /// </summary>
        public Entity Entity { get { return entity; } }
        /// <summary>
        /// Jazyk 
        /// </summary>
        public string Language { get { return entity.Id; } }
        /// <summary>
        /// Koncovka projektového souboru
        /// </summary>
        public string ProjectFileExtension { get { return entity.Properties["projectfileextension"]; } }
        /// <summary>
        /// Koncovka projektového souboru
        /// </summary>
        public string[] SupportFormats
        {
            get
            {
                if (supportformats == null)
                    supportformats = entity.Properties["supportformats"].ToUpperInvariant().Split(';');
                return supportformats;
            }
        }
        /// <summary>
        /// Podporované koncovky souboru
        /// </summary>
        public string[] Supportedextensions
        {
            get
            {
                if (supportedExtensions == null)
                    supportedExtensions = entity.Properties["supportedextensions"].ToUpperInvariant().Split(';');
                return supportedExtensions;
            }
        }
        /// <summary>
        /// Zjištění, zda lze soubor analyzovat
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="fileContent">obsah souboru</param>
        /// <returns></returns>
        public bool CanParse(string fileName, string fileContent = null)
        {
            string fileExtension = Path.GetExtension(fileName).ToUpperInvariant();
            foreach (string ext in Supportedextensions)
                if (fileExtension == ext)
                    return true;

            if (Parser != null)
                return Parser.CanParse(fileName, fileContent);

            return false;
        }

        /// <summary>
        /// Vytvoření insatnce nové třídy
        /// </summary>
        /// <param name="entity">Větev konfiguračního stromu</param>
        public ParserDescriptor(Entity entity)
        {
            this.entity = entity;
        }
    }
}
