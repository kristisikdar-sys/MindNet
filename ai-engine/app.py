from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/get-response', methods=['POST'])
def get_response():
    data = request.get_json(silent=True) or {}
    message = data.get('message', '')
    if not isinstance(message, str) or not message.strip():
        return jsonify({"error": "Invalid message"}), 400
    return jsonify({"reply": "AI engine working"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

