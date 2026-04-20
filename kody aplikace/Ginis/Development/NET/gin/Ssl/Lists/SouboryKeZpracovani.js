function loadFolder() {
    if(document.getElementById(HiddenFileFolderClientId).value == "") {
        getFileFolder();
    }
}
function getFileFolder() {
    try {
        var TextBoxAdresar = document.getElementById(HiddenAdresarClientId);
        var folderPath = TextBoxAdresar.value;
        var folder;
     
        if(folderPath == "") {          
            folderPath = ax_shell_getHome();
            TextBoxAdresar.value = folderPath;
        }
      
        if(folderPath != "") {
            var m_oFolderContentString = ax_file_enumFiles(folderPath, "*.*");
            var m_oFolderContentArray = m_oFolderContentString.split(":");
            var inputFolder;

            for(var i = 0; i < m_oFolderContentArray.length; i++) {
                var file = m_oFolderContentArray[i];
                if(file.substr(file.length-1) != "\\") {
                    var m_sFolderDelimiter = "\\"; // Win
                
                    if(folderPath.indexOf(":\\") == -1) {
                        m_sFolderDelimiter = "/"; // Linux
                    }

                    if(folderPath.charAt(folderPath.length-1) == "\\") { // odstranim lomitko za nazvem disku
                        folderPath = folderPath.substring(0,folderPath.length-1);
                    }
               
                    var filePath = folderPath + m_sFolderDelimiter + file;
                    var fileName = file;
                    var pripona = "";
                    var from = file.lastIndexOf(".");
                    if(from != -1) {
                        pripona = file.substr(from+1);
                    }

                    inputFolder = inputFolder + "|*|" + filePath + "|*|" + fileName + "|*|" + pripona + "|&|";
                }
            } 

            document.getElementById(HiddenFileFolderClientId).value = inputFolder;
            document.getElementById(ButtonNactiClientId).click();
        }
    } catch (vyj){
        alert(vyj.description);
		    window.alert(m_sNepodariloSeStahnoutErrText);
		}	
}
function FolderChoice() {
    var l_sFolder = ax_file_browseFolderDialog("","");

    if(l_sFolder != "") {
        var TextBoxAdresar = document.getElementById(HiddenAdresarClientId);
        TextBoxAdresar.value = l_sFolder;
        getFileFolder();
    }
}
function OpenFile(filePath) {
    var dotIndex = filePath.lastIndexOf(".");
	var apendix = "";
	if(dotIndex != -1) {
		apendix = filePath.substring(dotIndex+1,filePath.length).toLowerCase();
	} 
    
    ax_shell_open(filePath);
} 
function RefreshList(filePath) { 
    getFileFolder();
}
function EvidujFile() {
    GetSelectedDocuments();	
    if(SSLListsFilePath != "") {
        if($get(m_oRadioListIdGenerovatCID).checked) {
            Gordic.Wfl.WebClient.WSOperationWfl.GenerateIxp(OnSucceeded, OnFailed);
        } else { // zadani identifikatoru rucne
            if(true) {
                var l_oZadaniIdNovehoDokumentuOnCompleteFunction = function (rv) {
                    if(rv != null) {
                        PostFile(rv.Ixp);
                    }
                };

                Ssl_OtevriZadaniIdNovehoDokumentuNG(0, 0).on("close", function (ev, retValue, content) { l_oZadaniIdNovehoDokumentuOnCompleteFunction(retValue); });
            } else {
                var retVal = Ssl_OtevriZadaniIdNovehoDokumentu(0, 0);

                if (retVal != null) {
                    PostFile(retVal.values[0]);
                }
            }
        }
    } else {
		window.alert(m_sNeniVybranRadekErrText);
	} 
}
function OnSucceeded(result, userContext, methodName) {
	var aIxp = result;

    PostFile(aIxp);
}
function OnFailed() {

}

function PostFile(Ixp) {
    GetSelectedDocuments();

    SslLists_TvorbaCJPriEvidenciDokumentu(!$get(m_oRadioEvidVlastniCID).checked, "ZaevidujFile('" + Ixp + "','{0}','{1}');");
}

function ZaevidujFile(Ixp, PridelitCJ, InfoCj) {
    try {
 		var EvidovatEnabled = true;

        var l_sVec = document.getElementById(TextBoxPredplneniVeciClientId).value;
        var l_sVlastniCizi = "";
        var l_sPredplnovatUdaje = "";
        
        if($get(m_oRadioEvidVlastniCID).checked) {
            l_sVlastniCizi = "vlastni"; 
        } else {
            l_sVlastniCizi = "cizi"; 
        }
        if(document.getElementById(CheckBoxPredplnovatUdajeClientId).checked) {
            l_sPredplnovatUdaje = "1"; 
        } else {
            l_sPredplnovatUdaje = "0"; 
        }

        var from = SSLListsFilePath.lastIndexOf("/");
        var fromPripona = SSLListsFilePath.lastIndexOf(".");
        if(from == -1) {
            from = SSLListsFilePath.lastIndexOf("\\");
        }
        var fileName = SSLListsFilePath.substr(from+1);
        var pripona = "";

        if(fromPripona != -1) {
            pripona = SSLListsFilePath.substr(fromPripona+1).toLowerCase();
        } 
        
        // kontrola na typ souboru
		if(m_sGinEleTypSoubPar != "null" && m_sGinEleTypSoubPar != "") {
            if(m_sGinEleTypSoubPar.toLowerCase().indexOf(pripona) == -1) {
                 alert(m_sTypSouboruNeniPovolenErrTxt);
                 EvidovatEnabled = false;
            }
        }
         
        // kontrola na nepovolene znaky v nazvu souboru 
        if(EvidovatEnabled == true) {
            if(m_sGinEleNepoznPar != "null") {
                var i = 0;
                var l_sNepovoleneZnaky = "";

                for(i = 0; i < m_sGinEleNepoznPar.length; i++) {
                    var l_sNepovolZnak = m_sGinEleNepoznPar.charAt(i);
                             
                    if(fileName.indexOf(l_sNepovolZnak) != -1) {
                        l_sNepovoleneZnaky = l_sNepovoleneZnaky + l_sNepovolZnak;
                        EvidovatEnabled = false;
                    }
                }
                         
                if(l_sNepovoleneZnaky != "") {
                    alert(m_sNazevSouboruNepovolZnakyErrTxt + " '" + l_sNepovoleneZnaky + "'!");
                }
            }
        }
        
        if(EvidovatEnabled == true) {
            var Titulek = "";
            var Popis = "";
            var Sign = "";
            var l_sTS = "";
            var l_sUrlExt = "";

            if(true) {
                fatpOnComplete = function (retVal) {
                    if (retVal) {
                        Titulek = retVal.titulek;
                        Popis = retVal.popis;
                        Sign = retVal.podpis;
                        l_sTS = retVal.razitko;
                        l_sUrlExt = retVal.url;

                        var aUrl = encodeURI("../WS/WSEvidenceSouboru.aspx?Ixp=" + Ixp + "&Vec=" + l_sVec + "&VlastniCizi=" + l_sVlastniCizi + "&PredplnovatUdaje=" + l_sPredplnovatUdaje + "&Titulek=" + Titulek + "&Popis=" + Popis + "&Nazev=" + fileName + "&MakeCj=" + PridelitCJ + "&InfoCj=" + InfoCj + l_sUrlExt);
                        var aStatus = ax_file_uploadToASPXWS(aUrl, SSLListsFilePath, Sign, l_sTS);

                        if (aStatus != 200 && aStatus != 201) { // 200, 201 OK; 502 vyjimka na serverove strane-lze presmerovat na ErrorPage
                            window.alert(m_sNepodariloSeZaevidovatDuveryhodneErrText + " Status: " + aStatus);
                        } else {
                            Ssl_OtevriDetail(Ixp);
                        }
                    }
                };

                // otevreni okna
                var l_oParamsJSON = { FilePath: SSLListsFilePath, FileName: fileName };

                var $div = Wfl_OtevriFileAddTitulekPopisPodpis(l_oParamsJSON);

                $div.on("close", function (ev, retVal) {
                    if(retVal) {
                        fatpOnComplete(retVal);
                    }
                });
            } else {
                // otevru okno na zadani titulku, podpisu a el. obrazu
                var url = encodeURI("../../Wfl/ElObrazPrilohy/FileAddTitulekPopisPodpis.aspx?FilePath=" + SSLListsFilePath + "&FileName=" + fileName);
                var retVal = ShowModalWindowEx(url, m_sDefiniceElDokumentuWinText, 510, 200, false, true, true);

                if (retVal != null) {
                    Titulek = retVal.values[0];  // titulek
                    Popis = retVal.values[1];  // popis  
                    /*if(retVal.values[2] != null) {
                    Sign = retVal.values[2]; // podpis
                    }*/
                    Sign = retVal.values[2]; // podpis
                    l_sTS = retVal.values[3]; // razitko
                    l_sUrlExt = retVal.values[4]; // url
                } else {
                    EvidovatEnabled = false;
                }

                if (EvidovatEnabled == true) {
                    var aUrl = encodeURI("../WS/WSEvidenceSouboru.aspx?Ixp=" + Ixp + "&Vec=" + l_sVec + "&VlastniCizi=" + l_sVlastniCizi + "&PredplnovatUdaje=" + l_sPredplnovatUdaje + "&Titulek=" + Titulek + "&Popis=" + Popis + "&Nazev=" + fileName + "&MakeCj=" + PridelitCJ + "&InfoCj=" + InfoCj + l_sUrlExt);
                    var aStatus = ax_file_uploadToASPXWS(aUrl, SSLListsFilePath, Sign, l_sTS);

                    if (aStatus != 200 && aStatus != 201) { // 200, 201 OK; 502 vyjimka na serverove strane-lze presmerovat na ErrorPage
                        window.alert(m_sNepodariloSeZaevidovatDuveryhodneErrText + " Status: " + aStatus);
                    } else {
                        Ssl_OtevriDetail(Ixp);
                    }
                }
            }
        }
	} catch(vyj) {
		alert(vyj.description);
		window.alert(m_sNepodariloSeZaevidovatDuveryhodneErrText);
	}
}
function EvidujFileOnSucceeded(result, userContext, methodName) {
    // osetrim navratovou hodnotu a zobrazim detail
    ShowNewDetail(result);
}
function EvidujFileOnFailed() {
    alert(m_sNepodariloSeZaevidovatErrText);
}
function ContextMenuSouboryKeZpracovani(event, filePath) {
	ContextListOperation_Click_PopUp = window.createIPopup(); 	
	ContextListOperation_Click_PopUp.addItem(m_sZaevidovatSouborText, "", "EvidujFile('" + filePath + "');");
    ContextListOperation_Click_PopUp.addItem(m_sOtevritSouborText, "", "OpenFile('" + filePath +"');");
    ContextListOperation_Click_PopUp.addSeparator();
    ContextListOperation_Click_PopUp.addItem(m_sVybratAdresarText, "", "var t = window.setTimeout(FolderChoice,500);");
    ContextListOperation_Click_PopUp.addSeparator();
    ContextListOperation_Click_PopUp.addItem(m_sObcerstvitSeznamText, "gin/obcerstvit", "RefreshList('" + filePath +"');");	
    ContextListOperation_Click_PopUp.popup(event,155);				
}
function GetSelectedDocuments() {
    if(m_oPagingGrid != null) { 
        if(m_oPagingGrid.checked.length > 1) {
            alert(WflLists_VyberteJedenRadekErrText);
        }

        if(m_oPagingGrid.checked.length != 0) {
			var i;					
			SSLListsFilePath = "";
								
			for(i=0;i < m_oPagingGrid.checked.length; i++) {
				if(i == 0) {
					SSLListsFilePath = SSLListsFilePath + m_oPagingGrid.checked[i];
				} else { 
				    SSLListsFilePath = SSLListsFilePath + "," + m_oPagingGrid.checked[i];
				}
			}	
		}	
	}									
}
function UnselectDocuments(aCheckbox) {
	var VybraneRadky = document.getElementsByName("VyberRadku");						
	if(VybraneRadky != null){						
		for(var i=0;i<VybraneRadky.length;i++) {
		    if(VybraneRadky[i].value != aCheckbox.value) {
                VybraneRadky[i].checked = false;
		    }
		}  
	}							
}
function NazevSouboruDoVeciClick() {
    var CheckBoxNazevSouboruDoVeci = document.getElementById(CheckBoxNazevSouboruDoVeciClientId);
    var TextBoxPredplneniVeci = document.getElementById(TextBoxPredplneniVeciClientId);
    var isJmenoSouboruInText = 0;
    
    if(TextBoxPredplneniVeci.value == null) {
      TextBoxPredplneniVeci.value = "";
    }
      
    if(TextBoxPredplneniVeci.value.indexOf(JmenoSouboru) != -1) {
        isJmenoSouboruInText = 1;
    }
    
    if(CheckBoxNazevSouboruDoVeci.checked) {
        if(!isJmenoSouboruInText) {
            TextBoxPredplneniVeci.value = TextBoxPredplneniVeci.value + JmenoSouboru;
        }
    } else {
        if(isJmenoSouboruInText) {
            TextBoxPredplneniVeci.value = xreplace(TextBoxPredplneniVeci.value,JmenoSouboru,"");
        }
    }
}
function xreplace(checkMe,toberep,repwith){
    var temp = checkMe; 
    var i = temp.indexOf(toberep);

    while(i > -1){ 
        temp = temp.replace(toberep, repwith);    
        i = temp.indexOf(toberep, i + repwith.length + 1);
    } 
    return temp;
}
