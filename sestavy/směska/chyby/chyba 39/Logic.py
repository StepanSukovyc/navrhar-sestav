?def Vypis(Vstup):
#--------------------------------------------------------------------
#
# ��slo funkce =1=
#
# Vyp�e "help" funkce
#
#
#--------------------------------------------------------------------
	Text='';
	if Vstup==2:
		Text="""#--------------------------------------------------------------------
#
# ��slo funkce =2=#
# Ur�� hodnoty False a True 
#
# Glob�ln� prom�nn�: 		Nab�v� hodnoty:
#		True			1
#               False			0
#
#--------------------------------------------------------------------""";
	elif Vstup==3:
		Text="""#--------------------------------------------------------------------
#
# ��slo funkce =3=
#
# Funkce provede logick� sou�in zadan�ch prom�nn�ch 
#
#--------------------------------------------------------------------""";
	elif Vstup==4:
		Text="""#--------------------------------------------------------------------
#
# ��slo funkce =4=
#
# Funkce provede logick� sou�et zadan�ch prom�nn�ch 
#
#--------------------------------------------------------------------""";
	elif Vstup==5:
		Text="""#--------------------------------------------------------------------
#
# ��slo funkce =5=
#
# Funkce provede logick� exkluzivn� sou�et zadan�ch prom�nn�ch,
# kter�ch v tomto p��pad� mohou b�t jen dv�. D� se pou��t jako
# kompar�tor. 
#
#--------------------------------------------------------------------""";
	else:
		#Text='Nen� n�pov�da';
		raise RuntimeError, 'ZM - K zadan� funkci nen� ��dn� n�pov�da'

	return Text
#+++++++++++++++++++++++++++++++++++++++++++++++++++++


def TF(Vstup):
#--------------------------------------------------------------------
#
# ��slo funkce =2=
#
# Ur�� hodnoty False a True 
#
# Glob�ln� prom�nn�: 		Nab�v� hodnoty:
#		True			1
#               False			0
#
#--------------------------------------------------------------------

	global True
	global False

	TextV='';
	if Vstup=='?': 
		TextV=Vypis(2);
	False=0;
	True=1;
	
	return TextV
#+++++++++++++++++++++++++++++++++++++++++++++++++++++


def AND(*Vstup):
#--------------------------------------------------------------------
#
# ��slo funkce =3=
#
# Funkce provede logick� sou�in zadan�ch prom�nn�ch 
#
#--------------------------------------------------------------------

	Jedna=0;
	Nula=0;
	Pocet=len(Vstup);
	TextV='';
	if Vstup[0]=='?' and Vstup[0].isalpha(): 
		TextV=Vypis(3);
		return TextV
	elif Vstup[0]==1 or Vstup[0]==0: pass;
	else:
		raise RuntimeError, 'ZM - Nezn�m� prom�n�';
		return
	if Pocet<2: 
		raise RuntimeError, 'ZM - Mal� po�et prom�n�ch - min.=2';
		return
	for i in range(Pocet):
		if Vstup[i]==1 or Vstup[i]==0: pass;
		else: raise RuntimeError, 'ZM - N�kter� z pron�n�ch nen� typu Logic';
   	for i in range(Pocet):
		if Vstup[i]==1 or Vstup[i]==0: pass;
		else: raise RuntimeError, 'ZM - N�kter� z pron�n�ch nen� typu Logic';
	for i in range(Pocet):
   		if Vstup[i]==True: Jedna+=1
   		else: Nula+=1
   	if Jedna==Pocet: return True;
   	return False
   	
#+++++++++++++++++++++++++++++++++++++++++++++++++++++

def OR(*Vstup):
#--------------------------------------------------------------------
#
# ��slo funkce =4=
#
# Funkce provede logick� sou�et zadan�ch prom�nn�ch 
#
#--------------------------------------------------------------------

	Jedna=0;
	Nula=0;
	Pocet=len(Vstup);
	TextV='';
	if Vstup[0]=='?' and Vstup[0].isalpha(): 
		TextV=Vypis(4);
		return TextV
	elif Vstup[0]==1 or Vstup[0]==0: pass;
	else:
		raise RuntimeError, 'ZM - Nezn�m� prom�n�';
		return
	if Pocet<2: 
		raise RuntimeError, 'ZM - Mal� po�et prom�n�ch - min.=2';
		return
	for i in range(Pocet):
		if Vstup[i]==1 or Vstup[i]==0: pass;
		else: raise RuntimeError, 'ZM - N�kter� z pron�n�ch nen� typu Logic';
   	for i in range(Pocet):
   		if Vstup[i]==True: Jedna+=1;
   		else: Nula+=1;
   	if Nula==Pocet:
   		return False;
   	return True
   	
#+++++++++++++++++++++++++++++++++++++++++++++++++++++

def XOR(*Vstup):
#--------------------------------------------------------------------
#
# ��slo funkce =5=
#
# Funkce provede logick� exkluzivn� sou�et zadan�ch prom�nn�ch,
# kter�ch v tomto p��pad� mohou b�t jen dv�. D� se pou��t jako
# kompar�tor. 
#
#--------------------------------------------------------------------

	TextV='';
	if Vstup[0]=='?': 
		Text=Vypis(5);
		return TextV
	Jedna=0;
	Nula=0;
	Pocet=len(Vstup)
	if Pocet>=2: return 555
   	for i in range(Pocet):
   		if Vstup[i]==True: Jedna=Jedna+1
   		else: Nula+=1
   	if Jedna!=Pocet and Nula!=Pocet: return True
   	return False
   	
#+++++++++++++++++++++++++++++++++++++++++++++++++++++


