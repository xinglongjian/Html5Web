var map,geocoder,tx,ty,crossm,distmks=[],distlines=null,mapjob,rdiv,ispano,ux,uy,uzoom,showinfo,panoLayer,owindow=null;function ForDight(a,c){return a=Math.round(a*Math.pow(10,c))/Math.pow(10,c)}function getArgs(){for(var a={},c=location.search.substring(1).split("&"),d=0;d<c.length;d++){var e=c[d].indexOf("=");if(-1!=e){var f=c[d].substring(0,e),e=c[d].substring(e+1);a[f]=decodeURIComponent(e)}}return a}
function getWindowHeight(){return window.self&&self.innerHeight?self.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:0}function mapresize(){th=getWindowHeight()-130;document.getElementById("map").style.height=th+"px"}function makeurl(a){var c=Math.round(1E5*tx)/1E5,d=Math.round(1E5*ty)/1E5;return a+"?x="+c+"&y="+d+"&zoom="+map.getZoom()}
function getmapurl(){var a=makeurl("http://map.earthol.com/"),c=encodeURIComponent("Google Earth Online"),d=encodeURIComponent(a);openInfo('<div><strong>\u76f4\u8fbe\u6b64\u4f4d\u7f6e\u7684\u7f51\u5740\u94fe\u63a5\uff1a<input id="sharelink" size="46" value="'+a+'" readonly="readonly" onclick="this.select()" onfocus="this.select()" /><br /><br />\u60a8\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0a\u94fe\u63a5\u4e0e\u670b\u53cb\u5206\u4eab\u5f53\u524d\u5730\u56fe\uff0c\u9009\u53d6\u8f93\u5165\u6846\u4e2d\u7684\u7f51\u5740\u94fe\u63a5\u7136\u540e\u6309\u201cCtrl+C\u201d\u8fdb\u884c\u590d\u5236<br /><br />\u6216\u76f4\u63a5\u5206\u4eab\u5230\uff1a<a href="'+
("http://www.jiathis.com/send/?webid=tsina&url="+d+"&title="+c+"&uid=97625")+'" target="_blank"><img src="http://img.earthol.net/1/tsina.jpg" alt="\u65b0\u6d6a\u5fae\u535a" border="0" /></a> <a href="'+("http://www.jiathis.com/send/?webid=qzone&url="+d+"&title="+c+"&uid=97625")+'" target="_blank"><img src="http://img.earthol.net/1/qzone.jpg" alt="QQ\u7a7a\u95f4" border="0" /></a> <a href="'+("http://www.jiathis.com/send/?webid=renren&url="+d+"&title="+c+"&uid=97625")+'" target="_blank"><img src="http://img.earthol.net/1/renren.jpg" alt="\u6821\u5185\u4eba\u4eba\u7f51" border="0" /></a> <a href="'+
("http://www.jiathis.com/send/?webid=kaixin001&url="+d+"&title="+c+"&uid=97625")+'" target="_blank"><img src="http://img.earthol.net/1/kaixin.gif" alt="\u5f00\u5fc3\u7f51" border="0" /></a> <a href="'+("http://www.jiathis.com/send/?webid=douban&url="+d+"&title="+c+"&uid=97625")+'" target="_blank"><img src="http://img.earthol.net/1/douban.gif" alt="\u8c46\u74e3\u7f51" border="0" /></a> <a href="'+("http://www.jiathis.com/send/?webid=baidu&url="+d+"&title="+c+"&uid=97625")+'" target="_blank"><img src="http://img.earthol.net/1/baidu.gif" alt="\u767e\u5ea6\u6536\u85cf" border="0" /></a> <a href="'+
("http://www.jiathis.com/send/?webid=tqq&url="+d+"&title="+c+"&uid=97625")+'" target="_blank"><img src="http://img.earthol.net/1/tqq.jpg" alt="QQ\u4e66\u7b7e" border="0" /></a><br /><br />\u5982\u679c\u60a8\u60f3\u751f\u6210\u5e26\u6587\u5b57\u4ecb\u7ecd\u7684\u5730\u56fe\u7f51\u9875\uff0c\u8bf7<a href="javascript:void(0)" onclick="return gotoeolme()">\u70b9\u6b64\u5236\u4f5c</a></strong><br /></div>')}
function openInfo(a){null!=owindow&&owindow.close();var c=map.getCenter();a=new google.maps.InfoWindow({position:c,content:a});a.open(map);owindow=a}function gotowide(){var a=makeurl("http://map.earthol.com/w/");top.location=a}function flyto(a,c,d,e){0<e?map.setCenter(new google.maps.LatLng(c,a),e):map.setCenter(new google.maps.LatLng(c,a));openInfo(d)}
function gotoxy(){var a=document.xyform.x.value,c=document.xyform.y.value;flyto(a,c,"\u7ecf\u5ea6\uff1a"+a+"<br /><br />\u7eac\u5ea6\uff1a"+c,12)}function gotove(){var a=makeurl("http://ve.earthol.com/");top.location=a}function gotobd(){var a=makeurl("http://map.earthol.com/bd/");top.location=a}function gotoss(){var a=makeurl("http://map.earthol.com/soso/");top.location=a}function goto3d(){var a=makeurl("http://3d.earthol.com/");top.location=a}
function gotoeolme(){var a=makeurl("http://www.earthol.me/share.php");top.location=a}
function showmore(){openInfo('<div class="mapctrl" style="width:300px;"><center><b>\u5176\u4ed6\u64cd\u4f5c\u9009\u9879</b></center><br />>><a href="javascript:void(0)" onclick="return getHaiba()" title="\u67e5\u770b\u6d77\u62d4\u9ad8\u5ea6">\u67e5\u770b\u5f53\u524d\u5730\u56fe\u4f4d\u7f6e\u7684\u6d77\u62d4\u9ad8\u5ea6\u4fe1\u606f</a><br />>><a href="http://tq.xun.me/" target="_blank" title="\u5929\u6c14\u9884\u62a5">\u5168\u7403\u57ce\u5e02\u5929\u6c14\u5730\u56fe</a><br />>><a href="javascript:void(0)" onclick="return gotowide()" title="\u5207\u6362\u5230\u5bbd\u5c4f\u5730\u56fe">\u5207\u6362\u5230\u5bbd\u5c4f\u89c6\u56fe\u6a21\u5f0f</a><br />>><a href="http://www.ditu6.com/" target="_blank" title="\u5bfc\u822a\u5730\u56fe">\u884c\u8f66/\u5f92\u6b65\u8def\u7ebf-\u5bfc\u822a\u5730\u56fe\u67e5\u8be2</a><br />>><a href="http://www.ditu6.com/bus/" target="_blank" title="\u516c\u4ea4\u67e5\u8be2">\u516c\u4ea4\u7ebf\u8def\u6362\u4e58\u67e5\u8be2</a><br />>><a href="javascript:void(0)" onclick="return goto3d()" title="\u5207\u6362\u52303D\u5730\u56fe">\u5207\u6362\u52303D\u89c6\u56fe\u6a21\u5f0f</a><br /></div>')}
window.onresize=function(){mapresize()};top.location!=self.location&&(top.location=self.location);function ForDight(a,c){return a=Math.round(a*Math.pow(10,c))/Math.pow(10,c)}
function drawdist(){distlines&&(distlines.setMap(null),distlines=null);if(1<distmks.length){for(var a=[],c=0,d=0;d<distmks.length;d++){var e=distmks[d].getPosition();a.push(e);0<d&&(b=distmks[d-1].getPosition(),e=distab(b.lng(),b.lat(),e.lng(),e.lat()),c+=e)}distlines=new google.maps.Polyline({path:a,strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2});distlines.setMap(map);a="";a=1E3<c?"\u5f53\u524d\u957f\u5ea6:"+ForDight(c/1E3,3)+"\u516c\u91cc":"\u5f53\u524d\u957f\u5ea6:"+ForDight(c,0)+"\u7c73";
cjout(a)}else 1==distmks.length&&cjout("\u8bf7\u9009\u62e9\u7ed3\u675f\u70b9")}function distab(a,c,d,e){c=c*Math.PI/180;e=e*Math.PI/180;a=a*Math.PI/180-d*Math.PI/180;a=2*Math.asin(Math.sqrt(Math.pow(Math.sin((c-e)/2),2)+Math.cos(c)*Math.cos(e)*Math.pow(Math.sin(a/2),2)));return a=Math.round(6378137E4*a)/1E4}
function ceju(a){if("distance"==mapjob){distlines&&(distlines.setMap(null),distlines=null);for(var c=distmks.length-1;0<=c;c--)distmks[c].setMap(null);distmks=[];1!=a?(cjout("",1),mapjob=""):cjout("\u8bf7\u9009\u62e9\u8d77\u59cb\u70b9")}else openInfo('<div style="width:339px; word-break:break-all;">\u6d4b\u8ddd\u6a21\u5f0f\u5df2\u5f00\u542f-\u8bf7\u70b9\u51fb\u8d77\u59cb\u70b9\u5f00\u59cb\u6d4b\u8ddd<br /><br />\u652f\u6301\u4e24\u70b9\u6216\u591a\u70b9\u95f4\u7684\u6d4b\u8ddd\uff0c\u6d4b\u91cf\u7ed3\u679c\u663e\u793a\u5728\u5730\u56fe\u7684\u5de6\u4e0a\u89d2\u3002<br />\u60a8\u53ef\u4ee5\u968f\u610f\u62d6\u52a8\u5730\u56fe\u4e0a\u7684\u6d4b\u91cf\u70b9\uff0c\u4fee\u6b63\u540e\u7684\u8ddd\u79bb\u4f1a\u81ea\u52a8\u7ed9\u51fa\u3002</div><br />'),cjout("\u8bf7\u9009\u62e9\u8d77\u59cb\u70b9"),
mapjob="distance"}function mapclick(a){"distance"==mapjob&&null!=a&&(a=new google.maps.Marker({position:a,map:map,draggable:!0}),distmks.push(a),google.maps.event.addListener(a,"dragend",function(){drawdist()}),drawdist())}
function cjout(a,c){map&&(null==rdiv&&(rdiv=document.createElement("div"),rdiv.style.position="absolute",map.getDiv().appendChild(rdiv)),rdiv.innerHTML=1!=c?'<span class="distance">'+a+'<br /><a href="javascript:void(0)" onclick="return ceju(1)" title="\u6e05\u9664\u6240\u6709\u6807\u8bb0\uff0c\u8ddd\u79bb\u5f52\u96f6">\u91cd\u7f6e\u5f52\u96f6</a> <a href="javascript:void(0)" onclick="return ceju()" title="\u9000\u51fa\u6d4b\u8ddd\u6a21\u5f0f">\u7ed3\u675f\u6d4b\u8ddd</a></span>':a,rdiv.style.left=
"150px",rdiv.style.top="30px")}function showpano(){var a=document.getElementById("spbtn");1==ispano?(panoLayer.setMap(null),ispano=0,a&&(a.innerHTML="\u663e\u793a\u5b9e\u666f\u7167\u7247")):(panoLayer.setMap(map),ispano=1,a&&(a.innerHTML="\u9690\u85cf\u5b9e\u666f\u7167\u7247"))}var args=getArgs();args.x&&args.y&&args.zoom?(ux=parseFloat(args.x),uy=parseFloat(args.y),uzoom=parseInt(args.zoom)):(ux=109.77539,uy=33.43144,uzoom=4,showinfo=1);
function showaddr(){var a=map.getCenter();geocoder.geocode({latLng:a},function(c,d){if(d==google.maps.GeocoderStatus.OK)if(c[0]){var e=" ",f=a.lng(),g=a.lat();79<f&&134>f&&17<g&&52>g&&(e='<b>\u5c0f\u63d0\u793a\uff1a\u5982\u679c\u60a8\u60f3\u67e5\u770b\u6b64\u4f4d\u7f6e\u7684\u8be6\u7ec6\u8857\u9053\u5730\u56fe\uff0c<a href="http://china.earthol.com/?x='+f+"&y="+g+'&z=15&t=s" target="_blank">\u8bf7\u70b9\u6b64\u5207\u6362\u5230\u201c\u4e2d\u56fd\u5927\u9646\u7248\u5730\u56fe\u201d</a>\uff0c\u60a8\u5c06\u83b7\u5f97\u66f4\u597d\u7684\u6d4f\u89c8\u6548\u679c\u3002</b>');
openInfo('<div style="width:300px;overflow:hidden;">\u5f53\u524d\u5730\u56fe\u6240\u5728\u4f4d\u7f6e\u7684\u5730\u5740\u4e3a\uff1a<br /><div class="addrinfo">'+c[0].formatted_address+"<br /></div><br />"+e+"</div>")}else alert("\u6ca1\u6709\u627e\u5230\u6b64\u4f4d\u7f6e\u7684\u5730\u5740\u4fe1\u606f\u3002");else alert("\u51fa\u9519\u5566\uff0c\u9519\u8bef\u4ee3\u7801\uff1a"+d)})}
function getxy(){var a=map.getCenter();tx=a.lng();ty=a.lat();var c="\u7ecf\u5ea6:"+tx+"<br />\u7eac\u5ea6:"+ty+"<br />";document.getElementById("xy").innerHTML=c;crossm.setPosition(a)}
function getHaiba(){var a=map.getCenter(),c=new google.maps.ElevationService,d=[];d.push(a);c.getElevationForLocations({locations:d},function(a,c){if(c==google.maps.ElevationStatus.OK)if(a[0]){var d=Math.round(10*a[0].elevation)/10;openInfo("\u6b64\u4f4d\u7f6e\u6d77\u62d4\u9ad8\u5ea6\u4e3a"+d+"\u7c73")}else openInfo("\u65e0\u5f53\u524d\u4f4d\u7f6e\u6d77\u62d4\u9ad8\u5ea6\u4fe1\u606f");else alert("\u6682\u4e0d\u53ef\u7528: "+c)})}
function load(){mapresize();geocoder=new google.maps.Geocoder;panoLayer=new google.maps.panoramio.PanoramioLayer;var a=new google.maps.LatLng(uy,ux),c={zoom:uzoom,center:a,scaleControl:!0,mapTypeId:google.maps.MapTypeId.HYBRID};map=new google.maps.Map(document.getElementById("map"),c);crossm=new google.maps.Marker({position:a,map:map,icon:"http://www.earthol.com/cross.png"});google.maps.event.addListener(map,"click",function(a){mapclick(a.latLng)});google.maps.event.addListener(map,"center_changed",
function(){getxy()});1==showinfo&&openInfo('<div style="width:300px;"><center>\u6b22\u8fce\u5149\u4e34\u201c\u5730\u7403\u5728\u7ebf\u201d\u3002</center><br />\u60a8\u53ef\u4ee5\u4f7f\u7528\u201c\u5730\u6807\u641c\u7d22\u201d\u529f\u80fd\u6765\u67e5\u627e\u60a8\u60f3\u770b\u7684\u5730\u70b9\uff0c\u4e5f\u53ef\u4ee5\u901a\u8fc7\u8f93\u5165\u7ecf\u7eac\u5ea6\u6765\u5230\u8fbe\u4e16\u754c\u4e0a\u7684\u4efb\u4f55\u5730\u70b9\u3002<br /><br /></div>');getxy()};