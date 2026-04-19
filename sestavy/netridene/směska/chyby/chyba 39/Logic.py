?def Vypis(Vstup):
#--------------------------------------------------------------------
#
# Èíslo funkce =1=
#
# Vypíše "help" funkce
#
#
#--------------------------------------------------------------------
	Text='';
	if Vstup==2:
		Text="""#--------------------------------------------------------------------
#
# Èíslo funkce =2=#
# Urèí hodnoty False a True 
#
# Globální promìnné: 		Nabývá hodnoty:
#		True			1
#               False			0
#
#--------------------------------------------------------------------""";
	elif Vstup==3:
		Text="""#--------------------------------------------------------------------
#
# Èíslo funkce =3=
#
# Funkce provede logický souèin zadaných promìnných 
#
#--------------------------------------------------------------------""";
	elif Vstup==4:
		Text="""#--------------------------------------------------------------------
#
# Èíslo funkce =4=
#
# Funkce provede logický souèet zadaných promìnných 
#
#--------------------------------------------------------------------""";
	elif Vstup==5:
		Text="""#--------------------------------------------------------------------
#
# Èíslo funkce =5=
#
# Funkce provede logický exkluzivní souèet zadaných promìnných,
# kterých v tomto pøípadì mohou být jen dvì. Dá se použít jako
# komparátor. 
#
#--------------------------------------------------------------------""";
	else:
		#Text='Není nápovìda';
		raise RuntimeError, 'ZM - K zadané funkci není žádná nápovìda'

	return Text
#+++++++++++++++++++++++++++++++++++++++++++++++++++++


def TF(Vstup):
#--------------------------------------------------------------------
#
# Èíslo funkce =2=
#
# Urèí hodnoty False a True 
#
# Globální promìnné: 		Nabývá hodnoty:
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
# Èíslo funkce =3=
#
# Funkce provede logický souèin zadaných promìnných 
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
		raise RuntimeError, 'ZM - Neznámá promìná';
		return
	if Pocet<2: 
		raise RuntimeError, 'ZM - Malý poèet promìných - min.=2';
		return
	for i in range(Pocet):
		if Vstup[i]==1 or Vstup[i]==0: pass;
		else: raise RuntimeError, 'ZM - Nìkterá z pronìných není typu Logic';
   	for i in range(Pocet):
		if Vstup[i]==1 or Vstup[i]==0: pass;
		else: raise RuntimeError, 'ZM - Nìkterá z pronìných není typu Logic';
	for i in range(Pocet):
   		if Vstup[i]==True: Jedna+=1
   		else: Nula+=1
   	if Jedna==Pocet: return True;
   	return False
   	
#+++++++++++++++++++++++++++++++++++++++++++++++++++++

def OR(*Vstup):
#--------------------------------------------------------------------
#
# Èíslo funkce =4=
#
# Funkce provede logický souèet zadaných promìnných 
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
		raise RuntimeError, 'ZM - Neznámá promìná';
		return
	if Pocet<2: 
		raise RuntimeError, 'ZM - Malý poèet promìných - min.=2';
		return
	for i in range(Pocet):
		if Vstup[i]==1 or Vstup[i]==0: pass;
		else: raise RuntimeError, 'ZM - Nìkterá z pronìných není typu Logic';
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
# Èíslo funkce =5=
#
# Funkce provede logický exkluzivní souèet zadaných promìnných,
# kterých v tomto pøípadì mohou být jen dvì. Dá se použít jako
# komparátor. 
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


