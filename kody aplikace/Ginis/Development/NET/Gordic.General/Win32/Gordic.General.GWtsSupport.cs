//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GWtsSupport.cs                 </Name>
//    <Description> podpora práce s Windows Terminal Services API </Description>
//    <Author>      Jan Kuttich                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021            </Copyright>
//    <Created>     2021-05-07                                    </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Security;

namespace Gordic.General {

    /// <summary>podpora práce s Windows Terminal Services API</summary>
    /// <remarks>inspirováno https://stackoverflow.com/questions/6537648/using-wtsquerysessioninformation-in-visual-c-sharp a https://stackoverflow.com/questions/32522545/retrieve-user-logontime-on-terminal-service-with-remote-desktop-services-api</remarks>
    [SecuritySafeCritical]
    public class GWtsSupport : IGObject {

        #region externí funkce

        [DllImport("wtsapi32.dll")]
        static extern bool WTSQuerySessionInformation(IntPtr server,int sessionId,WTS_INFO_CLASS property,out IntPtr buffer,out uint bytesReturned);

        [DllImport("wtsapi32.dll")]
        static extern void WTSFreeMemory(IntPtr buffer);

        #endregion

        #region výčtové typy

        /// <summary>vlastnost vzdálené relace</summary>
        private enum WTS_INFO_CLASS { // viz. https://docs.microsoft.com/en-us/windows/win32/api/wtsapi32/ne-wtsapi32-wts_info_class
            UserName = 5,
            DomainName = 7,
            ClientName = 10,
            ClientAddress = 14,
            ClientProtocolType = 16,
            SessionInfo = 24
        } // end enum

        /// <summary>stav připojení vzdálené relace</summary>
        private enum WTS_CONNECTSTATE_CLASS : int { // viz. https://docs.microsoft.com/en-us/windows/win32/api/wtsapi32/ne-wtsapi32-wts_connectstate_class
            WTSActive,
            WTSConnected,
            WTSConnectQuery,
            WTSShadow,
            WTSDisconnected,
            WTSIdle,
            WTSListen,
            WTSReset,
            WTSDown,
            WTSInit,
        } // end enum

        #endregion

        #region struktury

        /// <summary>síťová adresa klienta</summary>
        [StructLayout(LayoutKind.Sequential)]
        private struct WTS_CLIENT_ADDRESS { // viz. https://docs.microsoft.com/en-us/windows/win32/api/wtsapi32/ns-wtsapi32-wts_client_address
            public uint AddressFamily;
            [MarshalAs(UnmanagedType.ByValArray,SizeConst = 20)]
            public byte[] Address;
        } // end struct

        /// <summary>informace o vzdálené relaci</summary>
        [StructLayout(LayoutKind.Sequential,CharSet = CharSet.Ansi)]
        private struct WTSINFOA { // viz. https://docs.microsoft.com/en-us/windows/win32/api/wtsapi32/ns-wtsapi32-wtsinfoa

            #region datové členy

            public WTS_CONNECTSTATE_CLASS State;
            public int SessionId;
            public int IncomingBytes;
            public int OutgoingBytes;
            public int IncomingFrames;
            public int OutgoingFrames;
            public int IncomingCompressedBytes;
            public int OutgoingCompressedBytes;
            [MarshalAs(UnmanagedType.ByValArray,SizeConst = 32)]
            public byte[] WinStationName;
            [MarshalAs(UnmanagedType.ByValArray,SizeConst = 17)]
            public byte[] Domain;
            [MarshalAs(UnmanagedType.ByValArray,SizeConst = 21)]
            public byte[] UserName;
            public long ConnectTime;
            public long DisconnectTime;
            public long LastInputTime;
            public long LogonTime;
            public long CurrentTime;

            #endregion

            #region vlastnosti

            /// <summary>lokální čas přihlášení vzdálené relace</summary>
            public DateTime ConnectTimeLocal {
                get {
                    return DateTime.FromFileTime(ConnectTime);
                } // end method
            } // end property

            #endregion

        } // end struct

        #endregion

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GWtsSupport).Assembly; }
        } // end property

        #endregion

        #region veřejné metody

        /// <summary>získání informací o vzdálené relaci pro databázový žurnál</summary>
        /// <returns>informace o vzdálené relaci pro databázový žurnál</returns>
        public static WtsInfo GetInfo() {
            try {
                WtsInfo l_oInfo = new WtsInfo();
                l_oInfo.IpAdrRemote.DbValue = GetProperty(WTS_INFO_CLASS.ClientAddress);
                if(l_oInfo.IpAdrRemote.IsNull == false) {
                    l_oInfo.PrizRemote.Value = 1;
                    l_oInfo.TypRemote.DbValue = GetProperty(WTS_INFO_CLASS.ClientProtocolType);
                    string l_sDomainName = (string) GetProperty(WTS_INFO_CLASS.DomainName);
                    string l_sUserName = (string) GetProperty(WTS_INFO_CLASS.UserName);
                    if(String.IsNullOrEmpty(l_sUserName) == false) l_oInfo.LoginRemote.DbValue = String.IsNullOrEmpty(l_sDomainName) ? $"{l_sUserName}" : $"{l_sDomainName}\\{l_sUserName}";
                    l_oInfo.CompNameRemote.DbValue = GetProperty(WTS_INFO_CLASS.ClientName);
                    l_oInfo.DatLoginRemote.DbValue = GetProperty(WTS_INFO_CLASS.SessionInfo);
                } // end if
                return l_oInfo;
            } // end try
            catch(Exception e) {
                throw new GException(23200587,ThisAssembly,e); // nepodařilo se získat informace o vzdálené relaci pro databázový žurnál
            } // end catch
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>získání vlastnosti vzdálené relace</summary>
        /// <param name="property">vlastnost vzdálené relace</param>
        /// <returns>hodnota vlastnosti vzdálené relace</returns>
        private static object GetProperty(WTS_INFO_CLASS property) {
            object l_oProperty = null;
            IntPtr l_oBuffer = IntPtr.Zero;
            uint l_nBytesReturned = 0;
            try {
                if(WTSQuerySessionInformation(
                    IntPtr.Zero, // aktuální server
                    -1, // aktuální relace
                    property,
                    out l_oBuffer,
                    out l_nBytesReturned
                )) {
                    switch(property) {
                        case WTS_INFO_CLASS.ClientAddress:
                            WTS_CLIENT_ADDRESS l_oClientAddress = (WTS_CLIENT_ADDRESS) Marshal.PtrToStructure((System.IntPtr) l_oBuffer,typeof(WTS_CLIENT_ADDRESS));
                            if(l_oClientAddress.AddressFamily == 2) l_oProperty = new IPAddress(l_oClientAddress.Address.Skip(2).Take(4).ToArray()).ToString(); // IPv4
                            else if(l_oClientAddress.AddressFamily == 23) l_oProperty = new IPAddress(l_oClientAddress.Address.Skip(2).Take(16).ToArray()).ToString(); // IPv6
                            break;
                        case WTS_INFO_CLASS.ClientProtocolType:
                            l_oProperty = Marshal.ReadInt16(l_oBuffer);
                            break;
                        case WTS_INFO_CLASS.SessionInfo:
                            l_oProperty = ((WTSINFOA) Marshal.PtrToStructure(l_oBuffer,typeof(WTSINFOA))).ConnectTimeLocal;
                            break;
                        default:
                            l_oProperty = Marshal.PtrToStringAnsi(l_oBuffer)?.Trim();
                            if((string) l_oProperty == String.Empty) l_oProperty = null;
                            break;
                    } // end switch
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200586,ThisAssembly,e,property.ToString()); // selhal pokus o získání vlastnosti {0}
            } // end catch
            finally {
                WTSFreeMemory(l_oBuffer);
            } // end finally
            return l_oProperty;
        } // end method

        #endregion

        #region vnořené třídy

        /// <summary>informace o vzdálené relaci pro databázový žurnál</summary>
        public class WtsInfo {

            /// <summary>příznak vzdálené relace</summary>
            public GInt16 PrizRemote { get; } = new GInt16(0);

            /// <summary>typ vzdálené relace</summary>
            public GInt16 TypRemote { get; } = new GInt16(0);

            /// <summary>uživatel přihlášený pomocí vzdálené relace</summary>
            public GString LoginRemote { get; } = new GString();

            /// <summary>název vzdáleného počítače</summary>
            public GString CompNameRemote { get; } = new GString();

            /// <summary>adresa vzdáleného počítače</summary>
            public GString IpAdrRemote { get; } = new GString();

            /// <summary>datum přihlášení vzdálené relace</summary>
            public GDateTime DatLoginRemote { get; } = new GDateTime();

        } // end class

        #endregion

    } // end class

} // end namespace
