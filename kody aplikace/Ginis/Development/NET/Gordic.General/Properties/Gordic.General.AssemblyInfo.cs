//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.AssemblyInfo.cs       </Name>
//    <Description> Parametry sestavy Gordic.General.dll </Description>
//    <Author>      Jan Kuttich                          </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021     </Copyright>
//    <Created>     2003-03-21                           </Created>
//  </FileHeader>

using System.Reflection;
using System.Runtime.CompilerServices;

[assembly: AssemblyDescription("obecné objekty pro aplikace")]

//[assembly: System.Security.AllowPartiallyTrustedCallers]
//[assembly: System.Security.SecurityRules(System.Security.SecurityRuleSet.Level2)]

// kvůli viditelnosti internal vlastnosti GLogManager.LogFactory v testech
[assembly: InternalsVisibleTo("Gordic.App.TestBase, PublicKey=0024000004800000940000000602000000240000525341310004000001000100b1c17d23e70b92e4075e36fd307f011d116287fb414a5d231ad6ac9355602ac0acac3ef2005fe462c0366176c1cdbec8a2e4eb21b49331894f2b682f52b5aafeb1178b7826e4e51551d193af629656ec385f8170efb359da1b3efbb114660c12db2309fa6e711225312e35e220bf401010942a4558abbbd01cb5824641bcfaf0")]
[assembly: InternalsVisibleTo("Gordic.General.Test, PublicKey=0024000004800000940000000602000000240000525341310004000001000100b1c17d23e70b92e4075e36fd307f011d116287fb414a5d231ad6ac9355602ac0acac3ef2005fe462c0366176c1cdbec8a2e4eb21b49331894f2b682f52b5aafeb1178b7826e4e51551d193af629656ec385f8170efb359da1b3efbb114660c12db2309fa6e711225312e35e220bf401010942a4558abbbd01cb5824641bcfaf0")]


