window.onload = function () {
    var username = localStorage.userId;
    var name = document.getElementById("name");
    name.innerHTML = username;
    getAllPlate();
};

function getAllPlate() {
    $.ajax({
        type: "get",
        url: localStorage.url + "/plate/getAllPlates",
        data: {
            "storeId": localStorage.storeId
        },
        success: function (data1) {
            // console.log('test');
            for (var i in data1.data) {
                var list = document.getElementById('list');
                var nTr = document.createElement('tr');

                list.appendChild(nTr).innerHTML = '<tr><td style="font-size: large;width: 5%;">' + data1.data[i].plateId + '</td>' +
                    '<td style="width: 20%;"><img src="data:image/png;base64,' + data1.data[i].picture + '" style="width:100%;height: auto"></td>' +
                    '<td style="font-size: large;width: 25%;" onclick="showElement(this)">' + data1.data[i].price + '</td>' +
                    '<td style="font-size: large;width: 10%;">' + data1.data[i].usedCount + '</td>' +
                    '<td style="font-size: large;width: 25%;" onclick="showElement(this)">' + data1.data[i].remark + '</td>' +
                    '<td><button class="layui-btn layui-btn-sm" onclick="ok(this)" style="color: #FFFFFF" ><i class="layui-icon">&#xe605;</i></button><br>' +
                    '<button class="layui-btn layui-btn-danger layui-btn-sm" onclick="deletePlate(this)" style="color: #FFFFFF" ><i class="layui-icon">&#xe640;</i></button>' +
                    '</td></tr>';
            }
        },
    });
}

function showElement(element) {
    var oldData = element.innerHTML;//原单元格里的值
    var newobj = document.createElement('input');//创建新的input框
    newobj.type = 'text';
    newobj.onblur = function () {
        element.innerHTML = this.value ? this.value : oldData; //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值
    }
    element.innerHTML = '';
    element.appendChild(newobj);//把新的值赋到单元格
    newobj.focus();
}
//确认修改
function ok(element) {
    var tableData = new Array(); //用于存储当前行数据
    var td = $(element).parent().parent().find("td");
    for (var i = 0; i < td.length; i++) {
        // if(i==1){
        //     var img = $(td[i]).find("img");
        //     var string = img[0].src
        //     string = string.replace("data:image/png;base64,", "");
        //     data.push(string);
        // }else{
        //     data.push(td[i].innerHTML);
        // }
        tableData.push(td[i].innerHTML);
    }

    $.ajax({
        type: "post",
        url: localStorage.url + "/plate/modifyPlate",
        data: {
            "plateId":tableData[0],
            "price":tableData[2],
            "remark":tableData[4]
        },
        success: function (msg) {
            alert(msg.data);
        },
    });
}
//删除盘子
function deletePlate(element) {
    var message = confirm("真的不要这个盘子了吗？这个盘子可能还在装菜，请先确认已修改成其他盘子");
    var td = $(element).parent().parent().find("td");
    if (message == true) {
        $.ajax({
            type: "post",
            url: localStorage.url + "/plate/deletePlate",
            data: {
                "plateId":td[0].innerHTML
            },
            success: function (msg) {
                alert(msg.data);
                window.location.href = "plate-manage.html";
            },
        });
    }
}


