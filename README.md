# Palette Generator (Python Flask)

A simple Flask web application to generate color palettes from uploaded images. Uses the [ColorThief](https://github.com/fengsp/color-thief-py) algorithm to extract the most dominant colors and presents them in both RGB and HEX formats.

## Features

- Upload an image and extract its dominant color palette.
- Returns up to 10 prominent colors per image.
- Results are provided in both RGB and HEX formats.
- Simple, Bootstrap-styled web UI.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/blainesilva16/palette-generator-py.git
   cd palette-generator-py
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Setup environment variables:**

   Create a `.env` file in the root directory and set your Flask secret key:
   ```
   SECRET_KEY=your_secret_key
   ```

## Usage

1. **Run the Flask app:**
   ```bash
   python main.py
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:5000
   ```

3. **Upload an image** using the form and view the extracted color palette.

## Project Structure

```
.
├── main.py
├── requirements.txt
├── static/        # Static files (CSS/JS/images)
├── templates/     # HTML templates (index.html, etc.)
└── .env           # Environment variables (not tracked by git)
```

## API

- **POST** `/get-dominant-colors`  
  Accepts an image file. Returns a JSON response with the dominant colors.

  **Request:**  
  `multipart/form-data` with `image` field.

  **Response:**
  ```json
  {
    "colors": [
      { "rgb": "rgb(82, 35, 2)", "hex": "#522302" },
      ...
    ]
  }
  ```

## Dependencies

- Flask
- Flask-Bootstrap
- Bootstrap-Flask
- Pillow
- numpy
- colorthief
- python-dotenv

## License

[MIT](LICENSE) (or specify your license here)

## Credits

- Color extraction powered by [ColorThief](https://github.com/fengsp/color-thief-py)
- Bootstrap UI via Flask-Bootstrap

---

*Feel free to contribute or open issues for feature requests or bugs!*
