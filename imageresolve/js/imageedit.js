(function($,app){
	//通过js实现读取本地文件
	app.upload=function(input) {
  //支持chrome IE10
  if (window.FileReader) {
    var file = input.files[0];
    filename = file.name.split(".")[0];
    var reader = new FileReader();
    reader.onload = function() {
      console.log(this.result)
      alert(this.result);
    }
    reader.readAsText(file);
  } 
  //支持IE 7 8 9 10
  else if (typeof window.ActiveXObject != 'undefined'){
    var xmlDoc; 
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); 
    xmlDoc.async = false; 
    xmlDoc.load(input.value); 
    alert(xmlDoc.xml); 
  } 
  //支持FF
  else if (document.implementation && document.implementation.createDocument) { 
    var xmlDoc; 
    xmlDoc = document.implementation.createDocument("", "", null); 
    xmlDoc.async = false; 
    xmlDoc.load(input.value); 
    alert(xmlDoc.xml);
  } else { 
    alert('error'); 
  } 
}
})(jQuery,window.app={});
