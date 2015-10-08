$(function () {
    $("#toolbox .tb_itm").bind('click', function () {
        if (!twiVars.drawingLine) {
            $("#toolbox .tb_itm").removeClass("tb_itm_slt");
            $(this).addClass("tb_itm_slt");
            twiVars.tbSltItmId = $(this).attr("id");
            if (twiVars.tbSltItmId == "tb_cursor") {
                if (twiVars.sltBBox) { twiVars.sltBBox.remove(); }
                twiVars.sltItem = null;
            }
            else if (twiVars.tbSltItmId == "tb_del") {
                if (twiVars.sltBBox) { twiVars.sltBBox.remove(); }
                if (twiVars.sltItem) {
                    twiVars.paperSet.exclude(twiVars.sltItem);
                    twiVars.sltItem.remove();
                }
            }
            else if (twiVars.tbSltItmId == "tb_clockwise") {
                if (twiVars.sltItem) {
                    if (twiVars.sltItem.attrs.rotate == undefined) {
                        twiVars.sltItem.attrs.rotate = 0;
                    }
                    twiVars.sltItem.attrs.rotate += twiVars.rotateDegree;
                    twiVars.sltItem.transform("r" + twiVars.sltItem.attrs.rotate);
 
                }
            }
            else if (twiVars.tbSltItmId == "tb_anticwise") {
                if (twiVars.sltItem) {
                    if (twiVars.sltItem.attrs.rotate == undefined) {
                        twiVars.sltItem.attrs.rotate = 0;
                    }
                    twiVars.sltItem.attrs.rotate -= twiVars.rotateDegree;
                    twiVars.sltItem.transform("r" + twiVars.sltItem.attrs.rotate);
                }
            }
        }
    });
 
    twiSelf.init();
 
    $("#dataSave").click(function () {
        twiSelf.getDrawData();
        if (!twiVars.submitData.name) {
            twiVars.submitData.name = prompt("为该轨迹起个名称：", "");
        }
        if (twiVars.submitData.name) {
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: '../PageHandlers/PathHandler.ashx',
                data:
            {
                sign: 'pathNewOrEdit',
                data: JSON.stringify(twiVars.submitData)
            },
                success: function (data, textStatus, jqXHR) {
                    if (data.success) {
                        alert("数据保存成功！");
                    }
                    else {
                        alert("数据保存失败，系统发现异常：" + data.message);
                    }
                },
                error: function (ex) {
                    alert("数据保存失败！");
                }
            });
        }
        else {
            alert("需要填写名称才能保存，请重试！");
        }
    });
});
 
Twi.CVMS.Pages.DrawPathRaphael = {
    Vars: {
        submitData: {},
        tbSltItmId: null,
        locationMapPath: null,
        paper: null,
        tbWidth: 160,
        iconWidth: 32,
        iconHeight: 32,
        paperSet: null,
        drawingLine: false,
        moveTo: null,
        lineTo: null,
        currentLine: null,
        isMoving: false,
        sltBBox: null,
        sltItem: null,
        rotateDegree: 8
    }
     , init: function () {
         twiVars.submitData.newOrEdit = Twi.GetUrlParam("newOrEdit") || "new";
         twiVars.submitData.locationMapPath = Twi.GetUrlParam("locationMapPath");
         var img = $('#imgHidden');
         img.attr("src", twiVars.submitData.locationMapPath);
 
         $('#canvas').css({
             width: img.width(),
             height: img.height()
         }).click(function (e) {
             twiSelf.drawing(e.pageX, e.pageY);
         }).mousemove(function (e) {
             if (twiVars.drawingLine) {
                 twiVars.isMoving = true;
                 twiSelf.Toolbox.drawLine(e.pageX, e.pageY);
             }
         });
         twiVars.paper = Raphael('canvas', img.width(), img.height());
 
         var bgImage = twiVars.paper.image(img.attr("src"), 0, 0, img.width(), img.height());
         twiVars.paperSet = twiVars.paper.set();
         //twiVars.paperSet.push(bgImage);
 
         if (twiVars.submitData.newOrEdit == "new") {
             twiSelf.newInit();
         }
         else {
             twiSelf.editInit();
         }
     }
 
     , newInit: function () {
         twiVars.submitData.caseNumber = Twi.GetUrlParam("caseNumber");
         twiVars.submitData.locationMapID = Twi.GetUrlParam("locationMapID");
     }
 
     , editInit: function () {
         twiVars.submitData.pathID = Twi.GetUrlParam("pathID");
         $.ajax({
             type: 'POST',
             dataType: 'JSON',
             url: '../PageHandlers/PathHandler.ashx',
             data:
            {
                sign: 'getByID',
                ID: twiVars.submitData.pathID
            },
             success: function (data, textStatus, jqXHR) {
                 if (data.success == undefined) {
                     if (data.totalCount == 0) {
                         alert("未查询到标注信息记录！"); return;
                     }
                     twiVars.submitData.name = data.data[0].FNAME;
                     twiVars.submitData.caseNumber = data.data[0].FCASENUMBER;
                     twiVars.submitData.locationMapID = data.data[0].FLOCATIONMAPID;
                     var pathData = JSON.parse(data.data[0].FPATHDATA);
                     for (var i = 0; i < pathData.items.length; i++) {
                         var record = pathData.items[i];
                         if (record.type == "image") {
                             var item = twiVars.paper.image(record.attrs.src, record.attrs.x, record.attrs.y, record.attrs.width, record.attrs.height);
                             twiSelf.addListeners(item);
                             item.attr(item.attrs);
                             if (record.attrs.rotate != undefined) {
                                 item.attrs.rotate = record.attrs.rotate;
                                 item.transform("r" + item.attrs.rotate);
                             }
                             twiVars.paperSet.push(item);
                         }
                         else if (record.type == "path") {
                             var item = twiVars.paper.path(record.attrs.path);
                             twiSelf.addLineListeners(item);
                             item.attr(record.attrs);
                             if (record.attrs.rotate != undefined) {
                                 item.attrs.rotate = record.attrs.rotate;
                                 item.transform("r" + item.attrs.rotate);
                             }
                             twiVars.currentLine = item;
                             twiVars.paperSet.push(item);
                         }
                         else if (record.type == "text") {
                             var item = twiVars.paper.text(record.attrs.x, record.attrs.y, record.attrs.text);
                             twiSelf.addListeners(item);
                             item.attr(record.attrs);
                             if (record.attrs.rotate != undefined) {
                                 item.attrs.rotate = record.attrs.rotate;
                                 item.transform("r" + item.attrs.rotate);
                             }
                             twiVars.currentLine = item;
                             twiVars.paperSet.push(item);
                         }
                     }
                 }
                 else {
                     alert("数据加载失败，系统发现异常：" + data.message);
                 }
             },
             error: function (ex) {
                 alert("数据加载失败！");
             }
         });
     }
 
     , Toolbox:
     {
         drawCamera: function (x, y) {
             var item = twiVars.paper.image("../resources/images/camera.png", x, y, twiVars.iconWidth, twiVars.iconHeight);
             twiSelf.addListeners(item);
             twiVars.paperSet.push(item);
             return item;
         }
         , drawPoint: function (x, y) {
             var item = twiVars.paper.image("../JS/Twilight/resources/images/flag_greed.png", x, y, twiVars.iconWidth, twiVars.iconHeight);
             twiSelf.addListeners(item);
             twiVars.paperSet.push(item);
             return item;
         }
         , drawPhone: function (x, y) {
             var item = twiVars.paper.image("../JS/Twilight/resources/images/phone_sound.png", x, y, twiVars.iconWidth, twiVars.iconHeight);
             twiSelf.addListeners(item);
             twiVars.paperSet.push(item);
             return item;
         }
         , drawPosition: function (x, y) {
             var item = twiVars.paper.image("../resources/images/camerfile32.png", x, y, twiVars.iconWidth, twiVars.iconHeight);
             twiSelf.addListeners(item);
             twiVars.paperSet.push(item);
             return item;
         }
         , drawText: function (x, y) {
             var text = prompt("文字描述：", "这里是文字描述...");
             if (text) {
                 var item = twiVars.paper.text(x, y, text);
                 item.attr({
                     "font-size": "16px",
                     "font-weight": "bold"
                 });
                 twiSelf.addListeners(item);
                 twiVars.paperSet.push(item);
                 return item;
             }
         }
         , drawLine: function (pageX, pageY) {
             pageX -= twiVars.tbWidth;
             if (twiVars.drawingLine) {
                 if (twiVars.isMoving) {
                     twiVars.lineTo = "L" + pageX + "," + pageY;
                     twiVars.currentLine.attr({
                         "stroke-dasharray": "--",
                         "arrow-end": "open-wide-long",
                         path: twiVars.moveTo + twiVars.lineTo
                     });
                 }
                 else {
                     twiVars.moveTo = "M" + pageX + "," + pageY;
                     var tmp = "L" + (pageX + 2) + "," + (pageY + 2);
                     twiVars.currentLine = twiVars.paper.path(twiVars.moveTo + tmp);
                     twiVars.currentLine.attr({
                         'stroke-width': 3,
                         stroke: "red"
                     });
                     twiVars.currentLine.data("Mx", pageX);
                     twiVars.currentLine.data("My", pageY);
                 }
             }
             else {
                 twiVars.lineTo = "L" + pageX + "," + pageY;
                 twiVars.currentLine.attr({
                     "stroke-dasharray": "",
                     "arrow-end": "open-wide-long",
                     path: twiVars.moveTo + twiVars.lineTo
                 });
                 twiVars.currentLine.data("Lx", pageX);
                 twiVars.currentLine.data("Ly", pageY);
                 twiSelf.addLineListeners(twiVars.currentLine);
                 twiVars.paperSet.push(twiVars.currentLine);
             }
         }
     }
 
     , addListeners: function (item) {
         var onmove = function (dx, dy, x, y, event) {
             if (twiVars.tbSltItmId == "tb_cursor") {
                 item.attr({
                     x: x - twiVars.tbWidth - twiVars.iconWidth / 2,
                     y: y - twiVars.iconHeight / 2
                 });
             }
         }
         var onend = function () {
             twiSelf.drawBBox(item);
         }
         item.drag(onmove, null, onend);
         item.mouseover(function () {
             if (twiVars.tbSltItmId == "tb_cursor") {
                 item.attr("cursor", "move");
             }
             else {
                 item.attr("cursor", "default");
             }
         });
         item.click(function () {
             twiSelf.drawBBox(item);
         });
 
         if (item.type == "text") {
             item.dblclick(function () {
                 var newText = prompt("文字修改：", item.attr("text"));
                 if (newText) {
                     item.attr("text", newText);
                 }
             });
         }
 
         return item;
     }
 
     , addLineListeners: function (item) {
         var onmove = function (dx, dy, x, y, event) {
             if (twiVars.tbSltItmId == "tb_cursor") {
                 item.data("dx", dx);
                 item.data("dy", dy);
                 item.attr({
                     path: "M" + item.data("Mx") + "," + item.data("My") + "L" + (item.data("Lx") + dx) + "," + (item.data("Ly") + dy)
                 });
             }
         }
         var onstart = function () {
             twiVars.currentLine.data("dx", 0);
             twiVars.currentLine.data("dy", 0);
         }
         var onend = function () {
             item.data("Lx", item.data("Lx") + item.data("dx"));
             item.data("Ly", item.data("Ly") + item.data("dy"));
             twiVars.currentLine.data("dx", 0);
             twiVars.currentLine.data("dy", 0);
         }
         item.drag(onmove, onstart, onend);
         item.mouseover(function () {
             if (twiVars.tbSltItmId == "tb_cursor") {
                 item.attr("cursor", "move");
             }
             else {
                 item.attr("cursor", "default");
             }
         });
         item.click(function () {
             twiSelf.drawBBox(item);
         });
         return item;
     }
 
     , drawing: function (pageX, pageY) {
         var x = pageX - twiVars.tbWidth - twiVars.iconWidth / 2;
         var y = pageY - twiVars.iconHeight / 2;
         if (twiVars.tbSltItmId == "tb_cursor") {
 
         }
         else if (twiVars.tbSltItmId == "tb_camera") {
             twiVars.sltItem = twiSelf.Toolbox.drawCamera(x, y);
             twiSelf.setTbDefault();
             twiSelf.drawBBox(twiVars.sltItem);
         }
         else if (twiVars.tbSltItmId == "tb_line") {
             twiVars.drawingLine = !twiVars.drawingLine;
             twiVars.isMoving = false;
             twiSelf.Toolbox.drawLine(pageX, pageY);
             if (!twiVars.drawingLine) { twiSelf.setTbDefault(); }
         }
         else if (twiVars.tbSltItmId == "tb_point") {
             twiVars.sltItem = twiSelf.Toolbox.drawPoint(x, y);
             twiSelf.setTbDefault();
             twiSelf.drawBBox(twiVars.sltItem);
         }
         else if (twiVars.tbSltItmId == "tb_phone") {
             twiVars.sltItem = twiSelf.Toolbox.drawPhone(x, y);
             twiSelf.setTbDefault();
             twiSelf.drawBBox(twiVars.sltItem);
         }
         else if (twiVars.tbSltItmId == "tb_del") {
             twiSelf.setTbDefault();
         }
         else if (twiVars.tbSltItmId == "tb_position") {
             twiVars.sltItem = twiSelf.Toolbox.drawPosition(x, y);
             twiSelf.setTbDefault();
             twiSelf.drawBBox(twiVars.sltItem);
         }
         else if (twiVars.tbSltItmId == "tb_text") {
             twiVars.sltItem = twiSelf.Toolbox.drawText(x, y);
             twiSelf.setTbDefault();
             twiSelf.drawBBox(twiVars.sltItem);
         }
     }
 
     , drawBBox: function (item) {
         if (twiVars.sltBBox) {
             twiVars.sltBBox.remove();
         }
         var bbox = item.getBBox();
         twiVars.sltBBox = twiVars.paper.rect(bbox.x, bbox.y, bbox.width, bbox.height);
         twiVars.sltItem = item;
         twiVars.sltBBox.attr({
             stroke: "blue",
             "stroke-width": 2
         });
     }
 
     , setTbDefault: function () {
         if (!$("#isReuse").attr("checked")) {
             twiVars.tbSltItmId = "tb_cursor";
             $("#toolbox .tb_itm").removeClass("tb_itm_slt");
             $("#tb_cursor").addClass("tb_itm_slt");
         }
     }
 
    , getDrawData: function () {
        var obj = { items: [] };
        twiVars.paperSet.forEach(function (el) {
            var item = {
                type: el.type,
                attrs: el.attrs
            }
            obj.items.push(item);
        });
        obj.length = obj.items.length;
        twiVars.submitData.pathData = JSON.stringify(obj);
        return twiVars.submitData.pathData;
    }
};
 
var twiSelf =  Twi.CVMS.Pages.DrawPathRaphael;
var twiVars = twiSelf.Vars;