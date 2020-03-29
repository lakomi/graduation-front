window.onload = function (){
    var username = localStorage.userId;
    var name = document.getElementById("name");
    name.innerHTML = username;

    var ajax = $.ajax({
        type: "get",
        url: localStorage.url + "/food/getAllFood",
        data: {
            "storeId":localStorage.storeId
        },
        success: function (data1) {
            // console.log('test');
            for (var i in data1.data) {
                var list = document.getElementById('list');
                var nTr = document.createElement('tr');

                if (data1.data[i].remark == null) {
                    list.appendChild(nTr).innerHTML = '<td style="font-size: large;">' + data1.data[i].foodId + '</td>' +
                        '<td style="font-size: large;">' + data1.data[i].foodName + '</td>' +
                        '<td></td><td></td><td></td>' +
                        '<td>' +
                        '<button class="layui-btn layui-btn-sm" onclick="modifyFood(this)" style="color: #FFFFFF" ><i class="layui-icon">&#xe642;</i></button></a><br>' +
                        '<button class="layui-btn layui-btn-danger layui-btn-sm" onclick="deletePlate(this)" style="color: #FFFFFF" ><i class="layui-icon">&#xe640;</i></button>' +
                        '</td></tr>';

                }else{
                    list.appendChild(nTr).innerHTML = '<td style="font-size: large;">' + data1.data[i].foodId + '</td>' +
                        '<td style="font-size: large;">' + data1.data[i].foodName + '</td>' +
                        '<td style="font-size: large;">' + data1.data[i].foodPrice + '</td>' +
                        '<td style="font-size: large;">' + data1.data[i].remark + '</td>' +
                        '<td><img src="data:image/png;base64,' + data1.data[i].platePhoto + '" style="width:100%;height: auto"></td>' +
                        '<td>' +
                        '<button class="layui-btn layui-btn-sm" onclick="modifyFood(this)" style="color: #FFFFFF"><i class="layui-icon">&#xe642;</i></button></a><br>' +
                        '<button class="layui-btn layui-btn-danger layui-btn-sm" onclick="deleteFood(this)" style="color: #FFFFFF" ><i class="layui-icon">&#xe640;</i></button>' +
                        '</td></tr>';
                }
            }

        },
    });
};
//跳到修改页面
function modifyFood(element) {
    var td = $(element).parent().parent().find("td");
    //菜品管理页面，传到修改菜品信息页面的foodId
    localStorage.food_manage_to_modify_foodId = td[0].innerHTML;
    window.location.href = "modify-food.html";
}

//删除菜品
function deleteFood(element) {
    var message = confirm("真的要将这个菜下架吗？");
    var td = $(element).parent().parent().find("td");
    if (message == true) {
        $.ajax({
            type: "post",
            url: localStorage.url + "/food/deleteFood",
            data: {
                "foodId":td[0].innerHTML
            },
            success: function (msg) {
                alert(msg.data);
                window.location.href = "food-manage.html";
            },
        });
    }
}




