// Inicializar Ace Editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/sql");
document.getElementById('editor').style.fontSize='18px';

function resizeEditor() {
    var height = window.innerHeight;  
    var width = window.innerWidth / 2;  

    document.getElementById('editor').style.height = height + 'px';
    document.getElementById('editor').style.width = width + 'px';

    editor.resize();  
}


// Función para ejecutar la consulta SQL
document.getElementById("executeQueryButton").addEventListener("click", function() {
    
    var sqlQuery = editor.getValue();

    // Hacer la solicitud POST para ejecutar la consulta
    fetch('/execute_query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sqlQuery })
    })
    .then(response => response.json())
    .then(data => {
        
        document.getElementById("outputText").textContent = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
        document.getElementById("outputText").textContent = "Error: " + error;
    });
});
resizeEditor();

window.onresize = resizeEditor;