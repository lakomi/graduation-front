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
                    list.appendChild(nTr).innerHTML = '<td style="font-size: large">' + data1.data[i].foodId + '</td>' +
                        '<td style="font-size: large">' + data1.data[i].foodName + '</td>' +
                        '<td></td><td></td><td></td>' +
                        '<td><a class="layui-btn" lay-event="ok" style="color: #FFFFFF" ><i class="layui-icon">&#xe605;</i></a></td>';

                }else{
                    list.appendChild(nTr).innerHTML = '<td style="font-size: large">' + data1.data[i].foodId + '</td>' +
                        '<td style="font-size: large">' + data1.data[i].foodName + '</td>' +
                        '<td style="font-size: large">' + data1.data[i].foodPrice + '</td>' +
                        '<td style="font-size: large">' + data1.data[i].remark + '</td>' +
                        '<td><img src="data:image/png;base64,' + data1.data[i].platePhoto + '" style="width:100%;height: auto"></td>' +
                        '<td><a class="layui-btn" lay-event="ok" style="color: #FFFFFF" ><i class="layui-icon">&#xe605;</i></a></td>';
                }
            }

        },
    });





};




