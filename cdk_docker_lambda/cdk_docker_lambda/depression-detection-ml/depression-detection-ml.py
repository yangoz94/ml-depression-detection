import pickle
import sys
from string import punctuation
import json
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
"""
The following line mounts the AWS Elastic File System (EFS) to the lambda container.
This is where we store the model and the bert encoder to reduce the execution time of the lambda function.
"""
sys.path.append("/mnt/efs/BertClassifierDirectory")
class CustomUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if name == 'BERTClassifier':
            from BertClassifier import BERTClassifier
            return BERTClassifier
        return super().find_class(module, name)

def preprocess(test):
    encoder_path = '/mnt/efs/encoder'
    bert_encoder = hub.KerasLayer(encoder_path, trainable=True)
    # preprocess the input text
    test = [char.lower() for char in test]
    test = [char.translate(str.maketrans('', '', punctuation)) for char in test]
    # encode the input text using the bert encoder we defined/loaded
    test_encoded = np.array(bert_encoder(test))
    return test_encoded

def handler(event, context):
    input_text = [event["input"]]
    input_text_encoded = preprocess(input_text)
    # load the model
    model = CustomUnpickler(open('/mnt/efs/bert.pkl', 'rb')).load()
    # make predictions
    pred = model.predict(input_text_encoded)
    output = str(pred[0])
    # return the prediction and the original input text
    return {
        "statusCode": 200,
        "headers": {'Content-Type': 'application/json'},
        "input": event["input"],
        "output": output,
        "message": "Success!"
    }