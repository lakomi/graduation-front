window.onload = function (){
    var username = localStorage.username;
    var name = document.getElementById("name");
    name.innerHTML = username;

    // layui.use('table', function(){
    //     var table = layui.table;
    //     //填充店家信息表格
    //     table.render({
    //         elem: '#foodTable'
    //         ,height: 312
    //         ,skin:'line'
    //         ,url: localStorage.url + "/food/getAllFood?storeId="+localStorage.storeId //数据接口
    //         ,cols: [[ //表头
    //             {field: 'foodId', title: '菜品编号',align: 'center',style:"height:90px"}
    //             ,{field: 'foodName', title: '菜品名称',align: 'center',edit:'text'}
    //             ,{field: 'foodPrice', title: '单价',align: 'center',edit:'text'}
    //             ,{field: 'remark', title: '备注',align: 'center',edit:'text'}
    //             ,{field: 'platePhoto', title: '盘子图片',align: 'center',edit:'text'}
    //             // ,{toolbar: '#foodTable-fil',align: 'center'}
    //         ]]
    //     });
    //
    //
    //     //监听工具条,ok事件
    //     table.on('tool(foodTable-fil)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    //         var data = obj.data; //获得当前行数据
    //         var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    //         var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
    //
    //         if(layEvent === 'ok'){ //编辑
    //             //发送请求，修改数据
    //             var ajax = $.ajax({
    //                 type: "post",
    //                 url: localStorage.url + "/store/modifySelf",
    //                 data: {
    //                     storeId: data.storeId,
    //                     storeName: data.storeName,
    //                     storeAddress: data.storeAddress,
    //                     storeOwner: data.storeOwner
    //                 },
    //
    //                 success: function (data1) {
    //                     alert(data1.data);
    //                 },
    //                 error: function (data1) {
    //                 },
    //             });
    //         }
    //     });
    //
    //
    // });


    var ajax = $.ajax({
        type: "get",
        url: localStorage.url + "/food/getAllFood",
        data: {
            storeId:localStorage.storeId
        },
        success: function (data1) {
            // console.log('test');
            for (var i in data1.data) {
                var list = document.getElementById('list');
                var nTr = document.createElement('tr');

                list.appendChild(nTr).innerHTML = '<td>' + data1.data[i].foodId + '</td>' +
                    '<td>' + data1.data[i].foodName + '</td>' +
                    '<td>' + data1.data[i].foodPrice + '</td>' +
                    '<td>' + data1.data[i].remark + '</td>' +
                    '<td>' + data1.data[i].platePhoto + '</td>' +
                    //<td><input class="btn" type="button" value="111111" disabled="true" title="默认密码"></td>
                    '<td><a class="layui-btn" lay-event="ok" style="color: #FFFFFF" ><i class="layui-icon">&#xe605;</i></a></td>';
            }
        },
    });





};




