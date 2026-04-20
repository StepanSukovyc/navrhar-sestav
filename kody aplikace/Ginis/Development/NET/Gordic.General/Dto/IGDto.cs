//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGDto.cs                                     </Name>
//    <Description> IFace indickujici DTO objekt                                </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2016-08-15                                                  </Created>
//  </FileHeader>

using Newtonsoft.Json;

namespace Gordic.General
{
    /// <summary>IFace indikující DTO objekt - jeho prvky mohou být GDbType, hodnotový typy nebo i komplexní třídy</summary>
    public interface IGDto // : IGDbTypeDto
    {
        //NOTE: Pro pouziti u GDtoPropertyValidatoru a zrovna tak pro moznost vytvoreni extensions
    }

    /// <summary>IFace indikující DTO objekt se složeným klíčem</summary>
    public interface IGDtoWithCompositeKey : IGDto
    {
    }

    /// <summary>
    /// Interface pro DTO, které může do UpSert metody přinést příznak, zda je požadováno založení nového záznamu - toto má význam hlavně u otevřených tvarů PK
    /// </summary>
    public interface IGDtoForSave : IGDto
    {
        /// <summary>
        /// Příznak, že je požadována akce pro vytvoření nového záznamu - NEW
        /// </summary>
        GBoolean NewRecord { get; set; }
    }

    /// <summary>IFace indikující Metadata DTO objekt</summary>
    public interface IGMetaDto : IGDto
    {
    }
}
