:: Vytvori spravne soubor tango.zip
:: Author: BMartinek

del .\Graphics\Icons\tango.zip
powershell.exe Compress-Archive -Path .\Graphics\Icons\Tango\Standard\* -DestinationPath .\Graphics\Icons\tango.zip