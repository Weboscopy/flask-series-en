from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/auth/register")
def register():
    return render_template("auth/register.html")


@app.route("/auth/login")
def login():
    return render_template("auth/login.html")


if __name__ == "__main__":
    app.run(debug=True)
