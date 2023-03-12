import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
from keras.layers import Dense, Input,  Dropout
from keras.models import Model
from keras.optimizers import Adam

class BERTClassifier(tf.keras.layers.Layer):
    def __init__(self):
        text_input = Input(shape=(512,), name='text')
        l = Dense(2048, activation="relu")(text_input)
        l = Dense(1024, activation="relu")(l)
        l = Dropout(0.1, name="dropout")(l)
        l = Dense(512, activation="relu")(l)
        l = Dense(256, activation="relu")(l)
        l = Dropout(0.1, name="dropout2")(l)
        l = Dense(128, activation="relu")(l)
        l = Dense(64, activation="relu")(l)
        l = Dense(1, activation='sigmoid', name="outputs")(l)
        self.model = Model(inputs=[text_input], outputs=[l])
        self.model.compile(loss="binary_crossentropy", optimizer=Adam(learning_rate=0.00001), metrics=["accuracy"])

    def fit(self, X_train: np.array, y_train: np.array, epochs, validation_split):
        self.model.fit(X_train, y_train, epochs=epochs, validation_split=validation_split,
                       callbacks=[
                           tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5, verbose=1, mode="min")])

    def predict(self, X_test, threshold=0.3) -> np.array:
        predictions = self.model.predict(X_test)
        binary_predictions = [1 if prediction > threshold else 0 for prediction in predictions]
        return binary_predictions

    def summary(self):
        self.model.summary()

    @property
    def name(self) -> str:
        """Returns the name of the algorithm."""
        return "BERT model"
