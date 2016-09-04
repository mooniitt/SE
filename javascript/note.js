window.onload = function(){
    var content = document.getElementById("content");
    note.init(content);
    editor.init(content);
    //note.save('Edit Here...');
   // editor.init(content);
    button.init();
    note.show();

}

var note = {
    init:function(parent){
        this.parent = parent;
        this.url = 'note://' + window.location.pathname;
    },
    save:function (text) {
        localStorage.setItem(this.url,text);
    },
    date:function(){
        return localStorage.getItem(this.url);
    },
    show:function() {
        this.parent.innerText = this.date();
        this.parent.onclick = function(){
            note.hide();
            editor.show(note.date());
            button.show();
        }
    },
    hide:function(){
        this.parent.onclick = null;
        this.parent.innerHTML = '';
    }
};

var editor = {
    init:function(parent){
        this.elem = document.createElement("textarea");
        this.elem.id = 'editor';
        this.elem.style.resize = 'none';
        this.parent = parent;
    },
    date: function () {
        return this.elem.value;
    },
    show:function(text){
        this.elem.value = text;
        this.parent.innerHTML = '';
        this.parent.appendChild(this.elem);
    }
};


var button = {
    init:function(){
        this.ok = document.getElementById('ok');
        this.cancel = document.getElementById('cancel');
        this.ok.onclick = function(){
            button.hide();
            note.save(editor.date());
            note.show();
        };
        this.cancel.onclick = function() {
            button.hide();
            note.save('Type Here and Edit Here ...');
            note.show();
        };
        this.hide();
    },
    hide:function(){
        this.ok.style.display = 'none';
        this.cancel.style.display = 'none';
    },
    show:function(){
        this.ok.style.display = '';
        this.cancel.style.display = '';
    }
};
