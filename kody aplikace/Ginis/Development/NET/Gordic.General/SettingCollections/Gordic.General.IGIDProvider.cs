//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGIDProvider.cs            </Name>
//    <Description> Interface pro objekty, ktere dokazi poskytnout unikatni identifikator v ramci dane skupiny</Description>
//    <Author>      Tomáš Skála                                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2014-02-22                                                  </Created>
//  </FileHeader>

namespace Gordic.General {
    /// <summary> Interface pro objekty, ktere dokazi poskytnout unikatni identifikator v ramci dane skupiny
    /// </summary>
    public interface IGIDProvider {
        /// <summary> unikatni identifikator v ramci dane skupiny
        /// </summary>
        string ID {
            get;
        } // end property
    } // end interface
} // end namespace
