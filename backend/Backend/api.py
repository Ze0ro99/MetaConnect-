from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/connect', methods=['POST'])
def connect():
    data = request.json
    return jsonify({"message": "تم الاتصال بنجاح!", "data": data})

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"message": "خدمة MetaConnect تعمل بشكل جيد!"})

if __name__ == '__main__':
    app.run()
