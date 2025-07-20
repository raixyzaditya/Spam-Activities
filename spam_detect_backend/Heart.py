import joblib
import json
import sys
model = joblib.load('spam.pkl')
transform_msg = joblib.load('convert.pkl') 
def check(msg):
    convert = transform_msg.transform([msg])
    pred = model.predict(convert)[0]
    prob = model.predict_proba(convert)[0]

    if (pred == 1):
        label = 'Spam'
    else:
        label = 'Not spam'
    confidence = round(max(prob)*100,2)
    result = {
        'label':label,
        'confidence' : confidence
    }

    print(json.dumps(result))

if __name__ == '__main__':
    msg = sys.argv[1]
    ans = check(msg)
    
