import cv2
import numpy as np
from loadModel import *
from pred_model import *

IMG_SIZE = 224
def predictClass(image_path,name):
    test_image = cv2.imread(image_path + name)
    test_image = cv2.resize(test_image, (IMG_SIZE, IMG_SIZE))
    test_image = np.expand_dims(test_image, axis=0)
    pred = model.predict(test_image)
    probs = [pred[0][0], pred[0][1], pred[0][2], pred[0][3]]
    names = ['Sağlıklı', 'Çok Hafif Alzheimer', 'Hafif Alzheimer', 'Gelişmiş Alzheimer']
    mx = probs[0]
    k = 0
    for i in range(4):
        if probs[i] > mx:
            mx = probs[i]
            k = i
    maxv = np.max(pred)
    pred = names[k]
    modelClass = PredictionModel(name=pred, value=maxv)
    return modelClass