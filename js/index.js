let areaData = [];

$.ajax({
    url: "./index.json",
    success: function (data) {
        areaData = data;
        // insert dom
        data.map((item, idx) => {
            if (item.items.length) {
                $('.box-content').append("<h3>" + item.title + "</h3>");
                item.items.map((val, index) => {
                    $('.box-content').append("<p class='box-content-item'><span>" +
                        val.label +
                        "</span><span>" +
                        val.label_en +
                        "</span><span>" + val.code + "</span></p>")
                })
            }
        })

        // show json
        $('.box-json-content').JSONView(data, {
            collapsed: false,
            recursive_collapser: true
        })

        // copy json
        $('#copy-content').val(JSON.stringify(data));
    }
});

$('#collapse-btn').on('click', function () {
    $('.box-json-content').JSONView('collapse');
});

$('#expand-btn').on('click', function () {
    $('.box-json-content').JSONView('expand');
});

$('#toggle-btn').on('click', function () {
    $('.box-json-content').JSONView('toggle');
});

$('#toggle-level1-btn').on('click', function () {
    $('.box-json-content').JSONView('toggle', 1);
});

$('#toggle-level2-btn').on('click', function () {
    $('.box-json-content').JSONView('toggle', 2);
});

$('#copy-btn').on('click', function () {
    var inputText = document.getElementById('copy-content');
    var currentFocus = document.activeElement;
    inputText.focus();
    inputText.setSelectionRange(0, inputText.value.length);
    try {
        if (document.execCommand("Copy", "false", null)) {
            alert("Copy Success!");
        } else {
            alert("Copy Failed!");
        }
    } catch (err) {
        alert("Error!")
    }
});

const trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
let last_title = 'title';
let last_items = 'items';
let last_label = 'label';
let last_label_en = 'label_en';
let last_code = 'code';

$('.box-features-btn').on('click', function () {
    let data = areaData;
    let newTitle = $('.box-features-item-title').val();
    if (trim(newTitle) && newTitle != last_title) {
        data.map((group, idx) => {
            data[idx][newTitle] = group[last_title];
            delete data[idx][last_title];
        })
        last_title = newTitle;
    }
    let newItems = $('.box-features-item-items').val();
    if (trim(newItems) && newItems != last_items) {
        data.map((group, idx) => {
            data[idx][newItems] = group[last_items];
            delete data[idx][last_items];
        })
        last_items = newItems;
    }
    let newLabel = $('.box-features-item-label').val();
    if (trim(newLabel) && newLabel != last_label) {
        data.map((group, idx) => {
            data[idx][last_items].map((item, index) => {
                data[idx][last_items][index][newLabel] = item[last_label];
                delete data[idx][last_items][index][last_label];
            })
        })
        last_label = newLabel;
    }
    let newLabelEn = $('.box-features-item-label-en').val();
    if (trim(newLabelEn) && newLabelEn != last_label_en) {
        data.map((group, idx) => {
            data[idx][last_items].map((item, index) => {
                data[idx][last_items][index][newLabelEn] = item[last_label_en];
                delete data[idx][last_items][index][last_label_en];
            })
        })
        last_label_en = newLabelEn;
    }
    let newCode= $('.box-features-item-code').val();
    if (trim(newCode) && newCode != last_code) {
        data.map((group, idx) => {
            data[idx][last_items].map((item, index) => {
                data[idx][last_items][index][newCode] = item[last_code];
                delete data[idx][last_items][index][last_code];
            })
        })
        last_code = newCode;
    }
    // show json
    $('.box-json-content').JSONView(data)

    // copy json
    $('#copy-content').val(JSON.stringify(data));

});