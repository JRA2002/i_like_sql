from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template
from flask_mysqldb import MySQL
import MySQLdb.cursors


app = Flask(__name__)

app.secret_key = '85c89cace37eb9e4ed12a7848e8c1dff1b938a99cd'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1990'
app.config['MYSQL_DB'] = 'new_database'

mysql = MySQL(app)

@app.route('/test_db')
def test_db_connection():
    try:
        # Conectar a la base de datos
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM USERS')
        db_name = cursor.fetchall()
        
        # Cerrar el cursor
        cursor.close()

        # Retornar la base de datos seleccionada como respuesta
        return jsonify({"status": "Conexión exitosa", "base_de_datos": db_name})

    except MySQLdb.Error as e:
        return jsonify({"status": "Error", "error": str(e)})

def execute_query(query):
    if request.method == 'POST':
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        try:
            print('helllooooo')
            cursor.execute(query)
            
            if query.strip().upper().startswith("SELECT"):
                results = cursor.fetchall()
                return results
            else:
                
                cursor.commit()
                return "Consulta ejecutada correctamente"
        except mysql.Error as e:
            return f"Error en la consulta: {e}"
        finally:
            cursor.close()

@app.route('/')
def home():
    return render_template('editor.html')

@app.route('/execute_query', methods=['POST'])
def execute_query_route():
    sql_query = request.json.get('query')
    result = execute_query(sql_query)
    return jsonify(result)




if __name__ == '__main__':
    app.run(debug=True)