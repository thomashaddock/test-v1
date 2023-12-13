import tensorflow as tf
import numpy as np
from tensorflow.keras.layers import Layer
import tensorflowjs as tfjs

class SumLayer(Layer):
	def __init__(self, **kwargs):
		super(SumLayer, self).__init__(**kwargs)

	def call(self, inputs):
		return tf.add_n(inputs)

	def get_config(self):
		return super().get_config().copy()


input_1 = tf.keras.layers.Input(10)
input_2 = tf.keras.layers.Input(10)
sum_layer = SumLayer()([input_1, input_2])
model = tf.keras.models.Model([input_1, input_2], sum_layer)
model.compile()

data = np.arange(10).reshape((1, 10))
res = model.predict([data, data])

print(res)


tfjs.converters.save_keras_model(model, ".")