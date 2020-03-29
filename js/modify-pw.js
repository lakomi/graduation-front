window.onload = function (){
    var username = localStorage.userId;
    var name = document.getElementById("userid");
    name.value = username;
};
layui.use('form', function(){
    var form = layui.form;
    form.on('submit(*)',function (elementData) {
        oldpw = elementData.field.old_pw;
        newpw = elementData.field.new_pw;

        $.ajax({
            type: "post",
            url: localStorage.url + "/store/modifyPw",
            async:false,
            data: {
                "userId":localStorage.userId,
                "oldPW":oldpw,
                "newPW":newpw
            },
            success: function (data1) {
                alert(data1.data);

            },
            error: function (data1) {

            },
        });
    })

    //各种基于事件的操作，下面会有进一步介绍
});