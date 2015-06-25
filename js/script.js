/* 利便性のためにグローバル環境汚染は厭わない */

window.onload = function () {

    var jsEditor = CodeMirror.fromTextArea(document.getElementById('editor-js'), {
        mode: 'javascript',
        lineNumbers: true,
        indentUnit: 4,
        theme: 'monokai',
        autoCloseBrackets: true
    });


    addArgInput = function () {
        var index = $('#arguments-area').data('last-arg-index');
        index = index + 1;
        var html = '<label for="arg-' + index + '">arg[' + index + ']</label><input class="arg" type="text" id="arg-' + index + '"><br>';
        $('#arguments-area .args').append(html);
        $('#arguments-area').data('last-arg-index', index);
        return false;
    };

    clearArgs = function () {
        $('#arguments-area').data('last-arg-index', 0);
        var html = '<label for="arg-0">arg[0]</label><input class="arg" type="text" id="arg-0"><br>';
        $('#arguments-area .args').html(html);
        return false;
    };

    getArg = function (index) {
        var arg = $('#arg-' + index).val();
        if (arg === undefined) {
            printErr('arg[' + index + ']の取得に失敗しました');
        } else if (arg === '') {
            return undefined;
        } else {
            return arg;
        }
    };

    setArgArray = function () {
        arg = [];
        var lastArgIndex = $('#arguments-area').data('last-arg-index');
        for(var index = 0; index <= lastArgIndex; index++){
            arg.push(getArg(index));
        }
        return false;
    };

    executeScript = function () {
        setArgArray();
        jsEditor.save();
        try {
            eval($('#editor-js').val());
        } catch (e) {
            printErr(e);
        }
    };

    print = function (obj) {
        $('#output-box').append(obj);
        return false;
    };

    println = function (obj) {
        if (arguments.length === 0) {
            $('#output-box').append('<br>&gt;&nbsp;');
        } else {
            $('#output-box').append(obj + '<br>&gt;&nbsp;');
        }
        return false;
    };

    printErr = function (obj) {
        $('#output-box').append('<span class="err-text">' + obj + '</span><br>&gt;&nbsp;');
        return false;
    };

    clearOutputBox = function () {
        $('#output-box').html('&gt;&nbsp;');
        return false;
    };

    editorFontSizeUp = function () {
        var currentSize = parseInt($('#editor-font-size').data('font-size'));
        if (currentSize < 25) {
            setEditorFontSize(currentSize + 1);
            $('#editor-font-size button[name="font-size-down-button"]').removeClass('disabled');
        }
        if (currentSize + 1 >= 25) {
            $('#editor-font-size button[name="font-size-up-button"]').addClass('disabled');
        }
    }

    editorFontSizeDown = function () {
        var currentSize = parseInt($('#editor-font-size').data('font-size'));
        if (currentSize > 7) {
            setEditorFontSize(currentSize - 1);
            $('#editor-font-size button[name="font-size-up-button"]').removeClass('disabled');
        }
        if (currentSize - 1 <= 7) {
            $('#editor-font-size button[name="font-size-down-button"]').addClass('disabled');
        }
    }

    setEditorFontSize = function (sizePx) {
        if (isFinite(sizePx)) {
            $('.CodeMirror').css('font-size', (sizePx / 10) + 'rem' );
            $('#editor-font-size').data('font-size', sizePx);
            $('#editor-font-size .size').text(sizePx);
        }
    }

};
