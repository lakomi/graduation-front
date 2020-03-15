window.onload = function (){
  var username = localStorage.username;
  var name = document.getElementById("name");
  name.innerHTML = username;

  layui.use('table', function(){
    var table = layui.table;
    //填充店家信息表格
    table.render({
      elem: '#demo'
      ,height: 312
      ,skin:'line'
      ,url: localStorage.url + "/store/getself?userId="+localStorage.userId //数据接口
      ,cols: [[ //表头
        {field: 'storeId', title: '店铺编号',align: 'center',style:"height:90px"}
        ,{field: 'storeName', title: '店铺名称',align: 'center',edit:'text'}
        ,{field: 'storeAddress', title: '店铺地址',align: 'center',edit:'text'}
        ,{field: 'storeOwner', title: '店长',align: 'center',edit:'text'}
        ,{toolbar: '#test',align: 'center'}
      ]]
    });


    //监听工具条,ok事件
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      localStorage.storeId = data.storeId;
      var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

      if(layEvent === 'ok'){ //编辑
        //发送请求，修改数据
        var ajax = $.ajax({
          type: "post",
          url: localStorage.url + "/store/modifySelf",
          data: {
            storeId: data.storeId,
            storeName: data.storeName,
            storeAddress: data.storeAddress,
            storeOwner: data.storeOwner
          },

          success: function (data1) {
            alert(data1.data);
          },
          error: function (data1) {
          },
        });
      }
    });


  });
};




