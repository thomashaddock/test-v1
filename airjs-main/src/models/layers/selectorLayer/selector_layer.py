import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Layer
import tensorflowjs as tfjs

class SelectorLayer(Layer):

    def __init__(
        self,
        sel_index,
        **kwargs
    ):
        """
        Parameters
        ----------
        sel_index : int
            The index of the inputs to be selected
        """
        super(SelectorLayer, self).__init__(**kwargs)
        self.sel_index = sel_index

    @property
    def sel_index(self):
        return self._sel_index
    @sel_index.setter
    def sel_index(self, value):
        if not isinstance(value, int):
            raise TypeError(f'sel_index must be int, got {value}, type {type(value)}')
        self._sel_index = value

    def call(self, inputs):
        return inputs[self.sel_index]

    def get_config(self):
        config = super().get_config().copy()
        config.update(
            {
                'sel_index' : self.sel_index
            }
        )
        return config


input_1 = tf.keras.layers.Input(10)
input_2 = tf.keras.layers.Input(10)
selector = SelectorLayer(0)([input_1, input_2])
model = tf.keras.models.Model([input_1, input_2], selector)
model.compile()
print(model.summary())
data1 = np.arange(10).reshape((1, 10))
data2 = 2*np.arange(10).reshape((1, 10))
print(model.predict([data1, data2]))

# tfjs.converters.save_keras_model(model, ".")