window.tobiz = {
    "project_id": "43762",
    "rep_id": "62300",
    "user_id": "7",
    "owner_email": "guilty.warriors@gmail.com",
    "user_email": "manager1@tobiz.net",
    "bs": true,
    "t": "4",
    "w": 1
}

    $(function () {
        $('body').on('submit', 'form[action="handler.php"]', function (event) {

            //$('form[action="handler.php"]').submit(function (event) {
            event.preventDefault();

//					var check = 1;
//					$(this).find('[""]')


            var this_form = $(this);
            if (!$(this).children("input[name=project_id]").length)
                $(this).prepend('<input type="hidden" name="project_id" value="' + window.tobiz.project_id + '">');
            if (!$(this).children("input[name=page_id]").length)
                $(this).prepend('<input type="hidden" name="page_id" value="' + window.tobiz.rep_id + '">');
            if (!$(this).children("input[name=referrer]").length)
                $(this).prepend('<input type="hidden" name="referrer" value="' + document.referrer + '">');
            if (!$(this).children("input[name=user_id]").length)
                $(this).prepend('<input type="hidden" name="user_id" value="' + window.tobiz.user_id + '">');

            if ($(this).find("[data-action]").size()) {
                console.log(123);
                $(this).prepend('<input type="hidden" name="action" value="' + $(this).find("[data-action]").data('action') + '">');
                $(this).prepend('<input type="hidden" name="amount" value="' + $(this).find("[data-action]").data('amount') + '">');
                $(this).prepend('<input type="hidden" name="url" value="' + $(this).find("[data-action]").data('url') + '">');
            } else {
                console.log('not found');
            }
            var formData = new FormData($(this)[0]);
            var this_block = $(this).closest('.section');
            $.ajax({
                dataType: "json",
                type: "POST",
                url: "/handler.php",
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (data) {
                if (data.status == 'OK') {
                    alert(data.msg);
                    this_form.each(function () {
                        $(this)[0].reset();
                    })
                    $('.popup_form').hide();
                }
                if (data.status == 'ERROR') {
                    alert(data.msg);
                }
                if (data.status == 'JC') {
                    $('body').append(data.form);
                    $('#jc_form').submit();
                    this_form.each(function () {
                        $(this)[0].reset();
                    })
                }
                if (data.status == 'SR') {
                    $('body').append(data.form);
                    $('#sr_form').submit();
                    this_form.each(function () {
                        $(this)[0].reset();
                    })
                }
                if (data.status == 'GR') {
                    $('body').append(data.form);
                    $('#gr_form').submit();
                    this_form.each(function () {
                        $(this)[0].reset();
                    })
                }
                if (data.status == 'RK') {
                    this_form.each(function () {
                        $(this)[0].reset();
                    })
                    window.location.href = data.url;
                }
                if (data.status == 'redirect') {
                    this_form.each(function () {
                        $(this)[0].reset();
                    })


                    window.location.href = data.url;
                }
                if (data.status == 'thanks') {
                    this_block.find('.popup_thanks').show();
                    this_form.each(function () {
                        $(this)[0].reset();
                    })
                    $('.popup_form').hide();
                }
                if (data.status == 'thanks_order_complete') {
                    this_block.find('.popup_thanks').show();
                    this_form.each(function () {
                        $(this)[0].reset();
                    })
                    window.basket.clean();
                    window.basket.hideForm();
                    window.basket.renderForm();
                    window.basket.renderBtn();
                    window.basket.hideBtn();
                    alert('Спасибо ваш заказ успешно оформлен!');
                    $('.popup_form').hide();
                }
            }).error(function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError)
            });
        })
    })


function openMessAndGetOfFormDataToMaile() {
    var name = document.getElementById("Nname").value;
    var mail = document.getElementById("Nemale").value;
    var telephone = document.getElementById("Ntelephone").value;
    window.open('mailto:2614462@mail.ru?subject=Дачный участок 19,8 соток&body=Меня зовут: ' + name + ", " + 'Мой телефон: ' + telephone
        + ', Почта для связи: ' + mail);
}
