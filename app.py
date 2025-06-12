from flask import Flask
from controllers.home import home_bp
from controllers.auth import auth_bp


app = Flask(__name__)


app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(home_bp, url_prefix="/")


if __name__ == "__main__":
    app.run(debug=True)
