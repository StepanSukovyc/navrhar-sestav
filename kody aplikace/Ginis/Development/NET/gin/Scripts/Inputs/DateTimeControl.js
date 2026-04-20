function DateTimeControl_Change(prvek, datum, time)
{
	var datEl = document.getElementById(datum);
	var timeEl = document.getElementById(time);
	if(!prvek.checked){			
		datEl.value = "";
		datEl.readOnly = true;
		datEl.className = "ReadOnlyInputClass";
		timeEl.value = "";
		timeEl.readOnly = true;
		timeEl.className = "ReadOnlyInputClass";
	}
	else{
		if(datEl.value =="")
		{
			var currentDate = new Date();
			var aMonth = new Number(currentDate.getMonth() + 1);
			datEl.value = currentDate.getDate() + "." + aMonth + "." + currentDate.getFullYear();
			var aMinutes = currentDate.getMinutes();
			if(aMinutes < 10)
				aMinutes = "0" + aMinutes;
			timeEl.value = currentDate.getHours() + ":" + aMinutes;
		}
		datEl.readOnly = false;
		datEl.className = "TextBoxFace";
		timeEl.readOnly = false;
		timeEl.className = "TextBoxFace";
	}
}
function DateTimeControl_SetReadOnly(date, time)
{
	var datEl = document.getElementById(date);
	var timeEl = document.getElementById(time);
	datEl.readOnly = true;
	datEl.className = "ReadOnlyInputClass";
	timeEl.readOnly = true;
	timeEl.className = "ReadOnlyInputClass";
}
function DateTimeControl_CheckTime(time)
{
	var text = time.value;
	if(text == '') return false;
	// zadani XXXX, XXX, XX, nebo X  X - number
	if(text.indexOf(':') == -1){
		var before, after = "00";
		if(text.length == 4)		{	before = text.substr(0,2);after  = text.substr(2,2);}
		else if(text.length == 3)	{	before = text.substr(0,1);after  = text.substr(1,2);}
		else if(text.length == 2)	{	before = text.substr(0,2);}
		else if(text.length == 1)	{	before = text.substr(0,1);}
		else return false;
	}
	else if(text.length < 6){
		before = text.substring(0,(text.indexOf(":")));
		after = text.substring(text.indexOf(":") + 1);
	}
	else return false;
	var hourVal = parseInt(before);
	var minVal  = parseInt(after );
	if(isNaN(hourVal) || isNaN(minVal)) return false;
	if(hourVal >= 0 && hourVal < 24 && minVal >= 0 && minVal < 60){
		var minStr = (minVal < 10 ? "0" + minVal : minVal );
		time.value = hourVal + ":" + minStr;
		return true;
	}
	return false;
}
function DateTimeControl_OnBlur(date, time, errorMess)
{
	var timeEl = document.getElementById(time);
	var dateEl = document.getElementById(date);
	if(dateEl.value == '' && timeEl.value == '')
		return true;
	var ret = DateTimeControl_CheckTime(timeEl);
	if(!ret){
		window.alert(errorMess);
		timeEl.focus();
	}
	return ret;
}
