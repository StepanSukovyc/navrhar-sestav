//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GAibPingRequest.cs                           </Name>
//    <Description>                                                             </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-03-01                                                  </Created>
//  </FileHeader>

using Gordic.App.Core;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Rychlé zjištění statu konektoru
    /// </summary>
    public sealed class GAibPingRequest : GAibMethodRequest
    {
        /// <summary>
        /// Zpráva z modulu, uložená v logu - pro diagnostiku
        /// </summary>
        public string Message;
    }

    /// <summary>
    /// Odpověď na ping
    /// </summary>
    public sealed class GAibPingResponse : GAibMethodResponse
    {
        /// <summary>
        /// StatusItem
        /// </summary>
        public sealed class StatusItem
        {
            /// <summary>
            /// Klíč - např. ClientCertificate.HasPrivateKey
            /// </summary>
            public string Key;

            /// <summary>
            /// Hodnota - např. true, nebo ANO/NE... zobrazení záleží na modulu.
            /// Mělo by být krátké, aby implementátor mohl přečíst z přík. řádku
            /// </summary>
            public string Value;

            /// <summary>
            /// JSON serializer bug
            /// </summary>
            public StatusItem()
            {
            }

            public StatusItem(string key, string value)
            {
                Key = key;
                Value = value;
            }

            public StatusItem(string key, bool value)
            {
                Key = key;
                Value = value.ToString();
            }
        }

        public GAibPingResponse(params StatusItem[] status)
        {
            if(status.Contains(item => item.Key == "ComputerName"))
            {
                // druhy konstruktor - na strane klienta
                Status = status.Append(
                    new StatusItem("ClientName", ComputerName)
                ).ToArray();
            }
            else
            {
                // prvni konstruktor - na strane AIB
                Status = status.Append(
                    new StatusItem("ComputerName", ComputerName)
                ).ToArray();
            }
            ServerDate = DateTime.Now;
            AibRevize = Revize;
        }

        IGSystemConfiguration SystemConfiguration => GComponentCatalog.Mediate<IGSystemConfiguration>();

        string ComputerName => SystemConfiguration.GetSystemParameter(GParamNames.ComputerName, "???");

        string Revize => SystemConfiguration.GetSystemParameter(GParamNames.Revize, "");

        /// <summary>
        /// Řádky statusu
        /// </summary>
        public StatusItem[] Status;

        /// <summary>
        /// Čas na serveru
        /// </summary>
        public DateTime ServerDate;

        /// <summary>
        /// Revize AIB
        /// </summary>
        public string AibRevize;
    }
}
