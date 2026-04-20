//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OleMessageFilter.cs                      </Name>
//    <Description> třída pro práci s vlákny Office                             </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2020-01-09                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Runtime.InteropServices;
using System.Threading;

namespace Gordic.GFE.Parsers.core
{
    /// <summary>
    /// třída pro práci s vlákny Office
    /// </summary>
    public class OleMessageFilter : IOleMessageFilter
    {
        public static void Register()
        {
            IOleMessageFilter newFilter = new OleMessageFilter();
            IOleMessageFilter oldFilter = null;

            if (Thread.CurrentThread.GetApartmentState() == ApartmentState.STA)
                CoRegisterMessageFilter(newFilter, out oldFilter);
            else
                throw new COMException(GResources.GetResourceText(29450794)); //RC 29450794 : Unable to register message filter because the current thread apartment state is not STA.
        }

        public static void Revoke()
        {
            IOleMessageFilter oldFilter = null;
            CoRegisterMessageFilter(null, out oldFilter);
        }

        int IOleMessageFilter.HandleInComingCall(
            int dwCallType,
            System.IntPtr hTaskCaller,
            int dwTickCount,
            System.IntPtr lpInterfaceInfo)
        {
            return (int)SERVERCALL.SERVERCALL_ISHANDLED;
        }

        int IOleMessageFilter.RetryRejectedCall(
            System.IntPtr hTaskCallee,
            int dwTickCount,
            int dwRejectType)
        {
            return dwRejectType == (int)SERVERCALL.SERVERCALL_RETRYLATER ? 99 : -1;
        }

        int IOleMessageFilter.MessagePending(
            System.IntPtr hTaskCallee,
            int dwTickCount,
            int dwPendingType)
        
        {
            return (int)PENDINGMSG.PENDINGMSG_WAITDEFPROCESS;
        }

        [DllImport("Ole32.dll")]
        private static extern int CoRegisterMessageFilter(
            IOleMessageFilter newFilter,
            out IOleMessageFilter oldFilter);
    }

    enum SERVERCALL
    {
        SERVERCALL_ISHANDLED = 0,
        SERVERCALL_REJECTED = 1,
        SERVERCALL_RETRYLATER = 2
    }

    enum PENDINGMSG
    {
        PENDINGMSG_CANCELCALL = 0,
        PENDINGMSG_WAITNOPROCESS = 1,
        PENDINGMSG_WAITDEFPROCESS = 2
    }

    [ComImport(), Guid("00000016-0000-0000-C000-000000000046"),
    InterfaceTypeAttribute(ComInterfaceType.InterfaceIsIUnknown)]
    interface IOleMessageFilter
    {
        [PreserveSig]
        int HandleInComingCall(
            int dwCallType,
            IntPtr hTaskCaller,
            int dwTickCount,
            IntPtr lpInterfaceInfo);

        [PreserveSig]
        int RetryRejectedCall(
            IntPtr hTaskCallee,
            int dwTickCount,
            int dwRejectType);

        [PreserveSig]
        int MessagePending(
            IntPtr hTaskCallee,
            int dwTickCount,
            int dwPendingType);
    }
}
