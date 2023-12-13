import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Layer
import tensorflowjs as tfjs

class FilterLayer(Layer):
    def __init__(
            self,
            is_on = True,
            **kwargs
    ):
        super(FilterLayer, self).__init__(**kwargs)
        self.is_on = is_on

    def call(self, inputs):
        if self.is_on:
            return inputs
        else:
            return tf.zeros_like(inputs)

    def get_config(self):
        config = super().get_config().copy()
        config.update({'is_on' : self.is_on})
        return config

    def turn_on(self):
        """Turn the layer `on` so inputs are returned unchanged as outputs"""
        self.is_on = True

    def turn_off(self):
        """Turn the layer `off` so inputs are destroyed and all-zero tensors are output"""
        # print("jeje salu2")
        self.is_on = False


input_layer = tf.keras.layers.Input(10)
filter_layer = FilterLayer()(input_layer)
model = tf.keras.models.Model(input_layer, filter_layer)
model.compile()
data = np.arange(10).reshape((1, 10))
print(model.predict(data))
# print(model.layers[-1].is_on)
model.layers[-1].turn_on()
# print(model.layers[-1].is_on)
print(model.predict(data))
print(model.predict(data))


tfjs.converters.save_keras_model(model, ".")