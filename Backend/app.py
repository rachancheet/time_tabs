from flask import Flask, render_template, request, session, jsonify
from uuid import uuid4
import json
# from bson import ObjectId
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util
from datetime import datetime

import os
import json


app = Flask("VELLE")
CORS(app)

database = MongoClient(
    "Do not mess with me")
db = database.time_tabs


# @app.route("/login", methods=["POST", "GET"])
# def abc():
#     # url = os.environ.get('apiname')
#     # print(url)
#     data = request.get_data()
#     data = json.loads(data)
#     print(data)

#     current = db.user.find_one({"name": data['name']})
#     if current is None:
#         return "fail"
#     elif data['password'] == current['password']:
#         return "success"
#     # print(data )
#     return "fail"


@app.route("/times/get_data/<cs>", methods=["GET"])
def lund(cs):
    # print(cs)
    data = db['schedule'].find_one({"name": cs})
    if data is None:
        return [["fail"]]
    else:
        # print(data["schedule"])
        print(data["schedule"])
        return jsonify(data["schedule"])


@app.route("/times/all", methods=["POST", "GET"])
def lund1():
    data = db['schedule'].find()
    # data = data["name"]
    print(data)
    names = []
    for g in data:
        # print("----------------------------------------\n",
        #       g[names], "------------------------\n")
        names.append(g["name"])

    print(names)
    return names


@app.route("/times/post/<cs>", methods=["POST", "GET"])
def lund3(cs):

    data = json.loads(request.data)

    password = data['password']
    if password == "jawed":
        col = db["schedule"]
        col.update_one({"name": cs},
                       {"$set": {
                        "schedule": data["baby"]}
                        })
        col2 = db["log"]
        col2.insert_one({"by": data["log"], "time": datetime.now().strftime(
            "%d/%m/%Y, %I:%M:%S %p"), "changes": data["baby"]})
        # print(json.loads(request.data)['baby'], ":  ", day)

        return request.data
        # password
    else:
        return "fail"


@app.route("/times/login", methods=["POST", "GET"])
def login():

    data = request.get_json()["data"]
    col = db.user.find_one({"name": data["name"]})
    # print(col)
    dict = {}
    if col:
        if data["password"] == col["password"]:
            # print((col))
            dict = {
                "id": str(col["_id"]),
                "name": col["name"],
                "password": col["password"],
            }
            return jsonify(dict)
    return jsonify({"name": "fail"})


if __name__ == '__main__':
    app.run(debug=True, port=8001, host="0.0.0.0")
