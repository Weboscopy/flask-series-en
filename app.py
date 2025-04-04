from flask import Flask


app = Flask(__name__)


@app.route("/")
def home():
    return "<h1>Homepage</h1>"


@app.route("/auth/register")
def register():
    return "<h1>Register</h1>"


@app.route("/auth/login")
def login():
    return "<h1>Login</h1>"


if __name__ == "__main__":
    app.run(debug=True)
