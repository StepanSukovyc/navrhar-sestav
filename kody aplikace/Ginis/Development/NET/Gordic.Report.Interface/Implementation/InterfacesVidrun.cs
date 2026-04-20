//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Interfaces.cs                               </Name>
//    <Description> Import nativnich typu reporteru             </Description>
//    <Author>      Martin Aliger                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2006  </Copyright>
//    <Created>     2006-10-05                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.InteropServices;
using System.Text;
using System.IO;
using System.Reflection;
using System.ComponentModel;

#pragma warning disable 1591

namespace Gordic.Report.Implementation
{
    [GuidAttribute("2339D24D-1252-4FBF-8CF7-9BE8CB3EDFD3")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    public interface IPlugin
    {
        [PreserveSig]void Init(IPluginSystem ps);
        [PreserveSig]void Release();
        [PreserveSig]IntPtr About();
    }

    [GuidAttribute("2482385D-8751-4BE0-B106-375B1FD47048")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    public interface IPluginInfo
    {
        [PreserveSig]IntPtr GetName();
        [PreserveSig]void GetInterface(out IPlugin pint);
        [PreserveSig]IPlugin GetCommInterface();
        [PreserveSig]IntPtr GetFileName();
    }

    [GuidAttribute("24823848-8751-4BE0-B106-375B1FD47048")]
    [InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    public interface IPluginSystem
    {
        [PreserveSig]int GetPluginCount();
        [PreserveSig]void GetPlugin(int index, out IPluginInfo pi);
        [PreserveSig]void FindPlugin(string name, out IPluginInfo pi);
        [PreserveSig]void GetActivePlugin(out IPluginInfo pi);
        [PreserveSig]int GetVersion();
        [PreserveSig]IntPtr GetMainForm();
        [PreserveSig]IntPtr GetApplicationHandle();
        [PreserveSig]int WaitForHandle(IntPtr Handle, int timeout);
        [PreserveSig]void Sleep(int timeout);
        [PreserveSig]int GetService(Guid iid, out object obj);
    }

}
