import math
import re
from collections import Counter
from flask import Flask, json, jsonify, make_response, request
from flask_cors import CORS

WORD = re.compile(r"\w+")

app = Flask(__name__)
CORS(app)


def get_cosine(vec1, vec2):
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])

    sum1 = sum([vec1[x] ** 2 for x in list(vec1.keys())])
    sum2 = sum([vec2[x] ** 2 for x in list(vec2.keys())])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)

    if not denominator:
        return 0.0
    else:
        return float(numerator) / denominator


def text_to_vector(text):
    words = WORD.findall(text)
    return Counter(words)


@app.route("/assess", methods=['GET'])
def assessment():
    ref_answer = request.args.get("reference")
    student_answer = request.args.get("student")

    vector_ref = text_to_vector(ref_answer)
    vector_student = text_to_vector(student_answer)

    cosine = get_cosine(vector_ref, vector_student)

    response = make_response(
        jsonify(
            {"scores": str(int(cosine * 10))}
        ),
        200,
    )

    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
