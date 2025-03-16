from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*")

# Route ke halaman utama
@app.route('/')
def index():
    return render_template('index.html')

# Event saat pemain bergabung
@socketio.on('connect')
def handle_connect():
    print("Seorang pemain terhubung!")

# Event untuk mengirim pesan antar pemain
@socketio.on('send_message')
def handle_message(data):
    print(f"Pesan diterima: {data}")
    emit('receive_message', data, broadcast=True)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
