from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)


def analyze_sentiment(text):
    analyzer = SentimentIntensityAnalyzer()
    score = (TextBlob(text).sentiment.polarity + analyzer.polarity_scores(text)["compound"]) / 2
    if score > 0.2:
        return "positive"
    elif score < -0.2:
        return "negative"
    return "neutral"


def is_crisis(text):
    crisis_terms = ["suicide", "kill myself", "end my life", "hurt myself", "die"]
    return any(term in text.lower() for term in crisis_terms)


@app.route("/generateResponse", methods=["POST"])
def generate_response():
    data = request.get_json()
    msg = data.get("message", "")
    if not msg:
        return jsonify({"response": "Please share what's on your mind.", "crisis": False}), 400
    if is_crisis(msg):
        return jsonify({"response": "Your safety matters. Please contact 1800-599-0019 (AASRA Helpline).", "crisis": True})
    sentiment = analyze_sentiment(msg)
    reply = f"It sounds like you're feeling {sentiment}. I'm here with you. Would you like to talk more about what's been bothering you?"
    return jsonify({"response": reply, "crisis": False, "emotion": sentiment})


if __name__ == "__main__":
    app.run(port=5000)
