from flask import Flask, render_template, jsonify, request,send_file
from flask_bootstrap import Bootstrap5
from colorthief import ColorThief
import dotenv,os

dotenv.load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
Bootstrap5(app)

@app.route("/", methods=["GET","POST"])
def home():
    return render_template('index.html')

@app.route("/get-dominant-colors", methods=["POST"])
def get_dominant_colors():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files['image']

    try:
        color_thief = ColorThief(image_file)
        colors_rgb = color_thief.get_palette(color_count=11,quality=5)
        colors = []
        for color_rgb in colors_rgb:
            r,g,b = color_rgb
            color_info = {
                'rgb': f'rgb({r}, {g}, {b})',
                'hex': '#{:02x}{:02x}{:02x}'.format(r, g, b)
            }
            colors.append(color_info)
        print(colors)
        return jsonify({"colors": colors})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
