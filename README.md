# Find Your Tour

**Find Your Tour** is a web application built with Flask that allows users to find guided tours created by independent guides. Users can search for tours based on city, date, and type of tour. Independent guides can create and share their tours.

## Features

- **Guided Tour Search**: Search for tours based on city, date, and type of tour.
- **Guide Authentication**: Guide registration and login.
- **Tour Management**: Guides can add, edit, and delete tours.

## Technologies

- [Flask](https://flask.palletsprojects.com/) - Web framework for Python
- [SQLAlchemy](https://www.sqlalchemy.org/) - ORM for Python
- [SQLite](https://www.sqlite.org/index.html) - Lightweight relational database
- [Jinja2](https://jinja.palletsprojects.com/) - Templating engine for Python
- [Flask-Login](https://flask-login.readthedocs.io/) - User authentication management for Flask
- [Flask-Migrate](https://flask-migrate.readthedocs.io/) - Database migration management with SQLAlchemy
- [Flask-WTF](https://flask-wtf.readthedocs.io/) - WTForms integration for Flask
- [Flask-Mail](https://pythonhosted.org/Flask-Mail/) - Sending emails from a Flask application
- [qrcode](https://github.com/lincolnloop/python-qrcode) - QR code generator in Python
- [Pillow](https://pillow.readthedocs.io/) - Image processing library for Python
- [Leaflet](https://leafletjs.com/) - JavaScript library for interactive maps
- [Leaflet MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster) - Plugin for managing marker clusters on Leaflet maps
- [Flatpickr](https://flatpickr.js.org/) - Customizable date/time picker in JavaScript
- [Swiper](https://swiperjs.com/) - JavaScript slider/carousel

## Installation

### Prerequisites

- Python 3.x
- pip (Python package manager)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/Weboscopy/serie-flask.git
    ```

2. Create a virtual environment:

    ```bash
    python3 -m venv venv
    ```

3. Activate the virtual environment:

    - On macOS/Linux:

        ```bash
        source venv/bin/activate
        ```

    - On Windows:

        ```bash
        venv\Scripts\activate
        ```

4. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5. Set up the database:

    ```bash
    flask db init
    flask db upgrade
    ```

6. Run the application:

    ```bash
    flask run
    ```

The application will be available at `http://127.0.0.1:5000`.
