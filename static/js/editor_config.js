// Inicializar Ace Editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/sql");
document.getElementById('editor').style.fontSize='18px';

function resizeEditor() {
    var height = window.innerHeight;  // Ocupa toda la altura de la ventana
    var width = window.innerWidth / 2;  // Ocupa el 50% del ancho de la ventana

    document.getElementById('editor').style.height = height + 'px';
    document.getElementById('editor').style.width = width + 'px';

    editor.resize();  // Método de Ace Editor para redimensionar el contenido
}

// Llamar a la función cuando se cargue la página
resizeEditor();

// Redimensionar el editor cuando cambie el tamaño de la ventana
window.onresize = resizeEditor;