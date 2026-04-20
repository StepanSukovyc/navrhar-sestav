//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StackProps.cs                          </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-03-19                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Linq;

namespace Gordic.GFE.WinClient.Editor
{

    public class StackProps
    {
        public List<StackObject> CurrentStack { get; set; }
        public List<string> RegionNames { get; set; }
        public StackProps()
        {
            CurrentStack = new List<StackObject>();
            RegionNames = new List<string>();
        }

        public string GetLastType() => CurrentStack.Count > 0 ? CurrentStack.Last().Type : null;
        public string GetLastRegionName() => RegionNames.Count > 0 ? RegionNames.Last() : null;
    }
}
