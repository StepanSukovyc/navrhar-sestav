//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GMd2.cs                 </Name>
//    <Description> podpora výpočtu MD2 kontrolních součtů </Description>
//    <Author>      Leoš Hromádka                          </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021     </Copyright>
//    <Created>     2011-04-14                             </Created>
//  </FileHeader>


namespace Gordic.General {

    /// <summary>podpora výpočtu MD2 kontrolních součtů</summary>
    public class GMd2 : IGObject {

        #region konstanty

        /// <summary></summary>
        private const int m_cnHashSize = 16;

        /// <summary></summary>
        private static byte[] S = new byte[256] {
            41, 46, 67, 201, 162, 216, 124, 1, 61, 54, 84, 161, 236, 240, 6,
            19, 98, 167, 5, 243, 192, 199, 115, 140, 152, 147, 43, 217, 188,
            76, 130, 202, 30, 155, 87, 60, 253, 212, 224, 22, 103, 66, 111, 24,
            138, 23, 229, 18, 190, 78, 196, 214, 218, 158, 222, 73, 160, 251,
            245, 142, 187, 47, 238, 122, 169, 104, 121, 145, 21, 178, 7, 63,
            148, 194, 16, 137, 11, 34, 95, 33, 128, 127, 93, 154, 90, 144, 50,
            39, 53, 62, 204, 231, 191, 247, 151, 3, 255, 25, 48, 179, 72, 165,
            181, 209, 215, 94, 146, 42, 172, 86, 170, 198, 79, 184, 56, 210,
            150, 164, 125, 182, 118, 252, 107, 226, 156, 116, 4, 241, 69, 157,
            112, 89, 100, 113, 135, 32, 134, 91, 207, 101, 230, 45, 168, 2, 27,
            96, 37, 173, 174, 176, 185, 246, 28, 70, 97, 105, 52, 64, 126, 15,
            85, 71, 163, 35, 221, 81, 175, 58, 195, 92, 249, 206, 186, 197,
            234, 38, 44, 83, 13, 110, 133, 40, 132, 9, 211, 223, 205, 244, 65,
            129, 77, 82, 106, 220, 55, 200, 108, 193, 171, 250, 36, 225, 123,
            8, 12, 189, 177, 74, 120, 136, 149, 139, 227, 99, 232, 109, 233,
            203, 213, 254, 59, 0, 29, 57, 242, 239, 183, 14, 102, 88, 208, 228,
            166, 119, 114, 248, 235, 117, 75, 10, 49, 68, 80, 180, 143, 237,
            31, 26, 219, 153, 141, 51, 159, 17, 131, 20
        };

        #endregion

        #region datové členy

        /// <summary></summary>
        private byte[] X;

        /// <summary></summary>
        private byte[] C;

        /// <summary></summary>
        private byte[] c_buffer;

        /// <summary></summary>
        private byte c_buffer_count;

        #endregion

        #region veřejné metody

        /// <summary>výpočet MD2 hashe</summary>
        /// <param name="a_buffer">vstupní data</param>
        /// <returns>MD2 hash</returns>
        public byte[] Compute(byte[] a_buffer) {
            Init();
            Update(a_buffer);
            byte[] l_padding = new byte[16];
            byte padlength = (byte) (16 - c_buffer_count);
            for(byte i = 0; i < padlength; i++) {
                l_padding[i] = padlength;
            } // end for
            Update(l_padding,padlength);
            Update(C);
            return new byte[m_cnHashSize] { X[0],X[1],X[2],X[3],X[4],X[5],X[6],X[7],X[8],X[9],X[10],X[11],X[12],X[13],X[14],X[15] };
        } // end method

        #endregion

        #region soukromé metody

        /// <summary></summary>
        private void Init() {
            X = new byte[48] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            C = new byte[16] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            c_buffer = new byte[16] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            c_buffer_count = 0;
        } // end method

        /// <summary></summary>
        /// <param name="a_buffer"></param>
        /// <param name="a_length"></param>
        private void Update(byte[] a_buffer, int a_length = -1) {
            int l_length = (a_length >= 0) ? a_length : a_buffer.Length;
            int l_position = 0;
            byte t, i, j;
            while (l_length > 0) {
                byte l = (byte)((16 - c_buffer_count) < l_length ? (16 - c_buffer_count) : l_length);
                for(i = 0; i < l; i++) {
                    c_buffer[i + c_buffer_count] = a_buffer[i + l_position];
                } // end for
                c_buffer_count += l;
                l_position += l;
                l_length -= l;
                if (c_buffer_count == 16) {
                    c_buffer_count = 0;
                    for(i = 0; i < 16; i++) {
                        X[i + 16] = c_buffer[i];
                    } // end for
                    t = C[15];
                    for (i = 0; i < 16; i++) {
                        X[32 + i] = (byte)(X[16 + i] ^ X[i]);
                        t = C[i] ^= S[c_buffer[i]^t];
                    } // end for
                    t = 0;
                    for (i = 0; i < 18; i++) {
                        for (j = 0; j < 48; j++)
                            t = X[j] ^= S[t];
                        t = (byte)((t + i) & (byte)(255));
                    } // end for
                } // end if
            } // end while
        } // end method

        #endregion

    } // end class

} // end namespace
