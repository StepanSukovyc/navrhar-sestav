//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultType.cs                           </Name>
//    <Description> výchozí typ nápovědného textu                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-06                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní nápovědné jednotky
    /// </summary>
    public interface ICompletationEntity
    {
        /// <summary>
        /// název jednotky
        /// </summary>
        string Name { get; }
        /// <summary>
        /// typ jednotky
        /// </summary>
        TypeType TypeType { get; }
    }

    /// <summary>
    /// typ třídy
    /// </summary>
    public enum TypeType 
    {
        /// <summary>
        /// xml deklarace
        /// </summary>
		xml,
        /// <summary>
        /// formát
        /// </summary>
        format,
        /// <summary>
        /// region
        /// </summary>
        region
	}

    /// <summary>
    /// výchozí typ nápovědného textu
    /// je to
    /// </summary>
    class DefaultType : ICompletationEntity
    {
        readonly string name;
        /// <summary>
        /// název člena
        /// </summary>
        public string Name { get { return name; } }

        readonly TypeType typeType;
        /// <summary>
        /// typ jednotky
        /// </summary>
        public TypeType TypeType { get { return typeType; } }

        /// <summary>
        /// vytvoření nové nstance třídy
        /// </summary>
        /// <param name="name">název typu</param>
        /// <param name="typeType">typ typu</param>
        public DefaultType(string name, TypeType typeType)
        {
            // TODO: Complete member initialization
            this.name = name;
            this.typeType = typeType;
        }
    }
}
