from flask import Flask, jsonify, request
from flask_cors import CORS
from groq_client import GroqClient

app = Flask(__name__)
CORS(app)
groq_client = GroqClient()

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()
    user_message = data.get("message", "")
    response = groq_client.get_response(user_message)
    return jsonify({"reply": response})

