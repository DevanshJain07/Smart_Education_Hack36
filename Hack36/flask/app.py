import json
import numpy as np
import requests
from flask import Flask, request, jsonify, render_template
import pickle
# import requests
import urllib.request
import json
import time
from bs4 import BeautifulSoup

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

url = 'https://www.linkedin.com/jobs/search/?keywords=Software%20Development%20'
response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")


def jsonData():
  uri = "https://jobs.github.com/positions.json?description=python"
  r = requests.get(uri)
  print(r.json())
  return r.json()
# loops = open("file.txt", "r")

# for lines in loops.readlines():
#     print(lines)

# loops.close()

# file = open("templates/file.html", "w", encoding='utf-8')

# # for points in soup.find_all('div', {"class": "job-card-search--column"}):
# #     point = str(points.text)

# file.write(str(soup.prettify()))
    



# file.close()
# data = soup.find_all('job-card-search--column')
# print(data)

@app.route('/')
def home():
    # data = requests.get(
    #     'https://www.linkedin.com/jobs/search/?keywords=Software%20Development%20').content
    # print(data)
    # print(data)
    
    return render_template('index.html', data=str(jsonData()))


@app.route('/predict', methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    int_features = [int(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    prediction = model.predict(final_features)

    output = round(prediction[0], 2)

    return render_template('index.html', prediction_text='Employee Salary should be $ {}'.format(output))


@app.route('/predict_api', methods=['POST'])
def predict_api():
    '''
    For direct API calls trought request
    '''
    data = request.get_json(force=True)
    prediction = model.predict([np.array(list(data.values()))])

    output = prediction[0]
    return jsonify(output)


if __name__ == "__main__":
    app.run(debug=True)
