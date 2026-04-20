//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ssl.WebClient.gsslheadercomponent.js                 </Name>
//    <Description>                                                             </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-12-22                                                  </Created>
//  </FileHeader>

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslPrilohy: {
          
            create: function (inputDto,componentDto) {
                return Gordic.Wfl.DetailBuilderComponents.WflPrilohy.create(inputDto, componentDto);
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);