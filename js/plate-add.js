var price;
var remark;
var picture_code;
layui.use('upload', function(){
    var upload = layui.upload;
    //执行实例
    var uploadInst = upload.render({
        elem: '#upload_photo' //绑定元素
        ,auto:false  //不自动上传
        ,choose: function(obj){
            //将每次选择的文件追加到文件队列
            var files = obj.pushFile();

            //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
            obj.preview(function(index, file, result){
                //预览图片
                layui.$('#upload_photo_view').removeClass('layui-hide').find('img').attr('src',result);
                //处理图片编码
                result = result.replace("data:image/jpeg;base64,", "");
                result = result.replace("data:image/png;base64,", "");
                picture_code = result;
            });
        }

    });
});

layui.use('form', function(){
    var form = layui.form;
    form.on('submit(*)',function (elementData) {
        price = elementData.field.single_price;
        remark = elementData.field.plate_remark;

        $.ajax({
            type: "post",
            url: localStorage.url + "/plate/addPlate",
            async: false,
            data: {
                "storeId":localStorage.storeId,
                "price":price,
                "remark":remark,
                "picture":picture_code
            },
            success: function (msg) {
                alert(msg.data);
            },
        });
    })
});