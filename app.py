from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/heatmap')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/data.geojson')
def send_geojson():
    return send_from_directory('.', 'data.geojson')

if __name__ == '__main__':
    app.run(debug=True)
