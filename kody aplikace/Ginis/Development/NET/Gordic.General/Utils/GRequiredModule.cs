//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GRequiredModule.cs                    </Name>
//    <Description> Základní popis požadavku na distribučního modulu z jiného distribučného modulu</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018                            </Copyright>
//    <Created>     2018-12-12                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Základní popis požadavku na distribuční modul z jiného distribučního modulu
    /// Požadavek se definuje v rámci TST souboru
    /// </summary>
    public class GRequiredModule
    {
        #region Private
        /// <summary>
        /// Fáze požadovaného modulu
        /// </summary>
        private string _faze = null;

        /// <summary>
        /// Příznak, že požadavek na uvedený modul je povinný
        /// </summary>
        private bool _mandatory = false;

        /// <summary>
        /// Minimální požadovaná subverze modulu
        /// </summary>
        private int _sub_verze_min = 0;

        /// <summary>
        /// Nevím, k čemu tato položka je, ale ve staré ADM se četla z TST souboru a ukládala do GINDREV a GINDREP
        /// </summary>
        private string _param = "";
        #endregion

        /// <summary>
        /// Konstruktor s nastavením fáze
        /// </summary>
        /// <param name="a_faze"></param>
        public GRequiredModule( string a_faze )
        {
            _faze = a_faze;
        }

        #region Property
        /// <summary>
        /// Fáze požadovaného modulu
        /// Nastavuje se pouze přes konstruktor této třídy
        /// </summary>
        public string Faze { get { return (_faze); } }
        /// <summary>
        /// Minimální požadovaná subverze modulu
        /// </summary>
        public int SubVerzeMin { set { _sub_verze_min = value; } get { return (_sub_verze_min); } }
        /// <summary>
        /// Příznak, že požadavek na uvedený modul je povinný
        /// </summary>
        public bool Mandatory { set { _mandatory = value; } get { return (_mandatory); } }
        /// <summary>
        /// Nevím, k čemu tato položka je, ale ve staré ADM se četla z TST souboru a ukládala do GINDREV a GINDREP
        /// </summary>
        public string Param { set { _param = value; } get { return (_param); } }
        #endregion
    }
}
