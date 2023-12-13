import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Layer
import tensorflowjs as tfjs

class MultiConv2D(Layer):
    """
    Multitask 2-dimensional convolutional layer
    This layer implements multiple stacks of convolutional weights to account for different ways individual
    neurons activate for various tasks. It is expected that to train using the RSN2 algorithm that MultiMaskedConv2D
    layers be used during training and then those layers be converted to this layer type.    
    
    """
    
    def __init__(
        self,
        filters,
        kernel_size = 3,
        padding = 'same',
        strides = 1,
        use_bias = True,
        activation = None,
        kernel_initializer = 'random_normal',
        bias_initializer = 'zeros',
        testing = True,
        **kwargs
    ):
        """
        Parameters
        ----------
        filters : int
            The number of convolutional filters to apply
        kernel_size : int or tuple of ints (default 3)
            The kernel size in height and width
        padding : str (default 'same')
            Either 'same' or 'valid', the padding to use during convolution
        strides : int or tuple of ints
            Stride lenghts to use during convolution
        use_bias : bool (default True)
            Whether to use a bias calculation on the outputs
        activation : None, str, or function (default None)
            Activation function to use on the outputs
        kernel_initializer : str or keras initialization function (default 'random_normal')
            The weight initialization function to use
        bias_initializer : str or keras initialization function (default 'zeros')
            The bias initialization function to use
        """
        super(MultiConv2D, self).__init__(**kwargs)
        self.filters = int(filters) if not isinstance(filters, int) else filters
        self.kernel_size = kernel_size
        self.padding = padding
        self.strides = tuple(strides) if isinstance(strides, list) else strides
        self.activation = tf.keras.activations.get(activation)
        self.use_bias = use_bias
        self.kernel_initializer = tf.keras.initializers.get(kernel_initializer)
        self.bias_initializer = tf.keras.initializers.get(bias_initializer)
        self.testing = testing

    @property
    def kernel_size(self):
        return self._kernel_size
    @kernel_size.setter
    def kernel_size(self, value):
        if isinstance(value, int):
            self._kernel_size = (value, value)
        else:
            self._kernel_size = value

    def build(self, input_shape):
        print("desde build")
        if(self.testing):
            print("desde testing!!!!!!!!!!!!1")

        input_shape = [
            tuple(shape.as_list()) for shape in input_shape
        ]
        if len(set(input_shape)) != 1:
            raise ValueError(f'All input shapes must be equal, got {input_shape}')

        simplified_shape = input_shape[0]
        if(self.testing):
            self.testW = tf.ones((len(input_shape), self.kernel_size[0], self.kernel_size[1], simplified_shape[-1], self.filters))
        self.w = self.add_weight(
            shape = (len(input_shape), self.kernel_size[0], self.kernel_size[1], simplified_shape[-1], self.filters),
            initializer = self.kernel_initializer,
            trainable = True,
            name = 'weights'
        )
        print(self.w.shape)
        if self.use_bias:
            self.b = self.add_weight(
                shape = (len(input_shape), self.filters),
                initializer = self.bias_initializer,
                trainable = True,
                name = 'bias'
            )

    def call(self, inputs):

        if(self.testing):
            conv_outputs = [
                tf.nn.convolution(
                    inputs[i],
                    self.testW[i],
                    padding = self.padding.upper(),
                    strides = self.strides,
                    data_format = 'NHWC'
                ) for i in range(len(inputs))
            ]
        else :    
            conv_outputs = [
                tf.nn.convolution(
                    inputs[i],
                    self.w[i],
                    padding = self.padding.upper(),
                    strides = self.strides,
                    data_format = 'NHWC'
                ) for i in range(len(inputs))
            ]
        if self.use_bias:
            
            product = self.b[0] + conv_outputs[0]
            conv_outputs = [
                conv_outputs[i] + self.b[i] for i in range(len(conv_outputs))
            ]
        return [self.activation(output) for output in conv_outputs]

    def get_config(self):
        config = super().get_config().copy()
        config.update(
            {
                'filters' : self.filters,
                'kernel_size' : list(self.kernel_size),
                'padding' : self.padding,
                'strides' : self.strides,
                'activation' : tf.keras.activations.serialize(self.activation),
                'use_bias' : self.use_bias,
                'kernel_initializer' : tf.keras.initializers.serialize(self.kernel_initializer),
                'bias_initializer' : tf.keras.initializers.serialize(self.bias_initializer)
            }
        )
        return config



input_1 = tf.keras.layers.Input((5, 5, 3))
input_2 = tf.keras.layers.Input((5, 5, 3))

img = MultiConv2D(16, activation="reLU")([input_1, input_2])
model = tf.keras.models.Model([input_1, input_2], img)

model.compile()

t1 = tf.ones((1,5,5,3))
t2 = tf.ones((1,5,5,3))

print(model.predict([t1, t2]))

tfjs.converters.save_keras_model(model, ".")

# print(img[0])
# input_shape = (4, 3, 3,3)

# y = MultiConv2D(1, 2, activation = "relu", input_shape=input_shape[1:])(x)
# # y2 = tf.keras.layers.Conv2D(
# #     1, 2, activation = "relu", input_shape=input_shape[1:])(x)
# print(y2.shape)
# # multi_conv_layer = MultiConv2D(
#     # 1, 2)(input_layer)
# # model = tf.keras.models.Model(input_layer, multi_conv_layer)
# # model.compile()
# # MultiConv2D(1)



# layer = MultiConv2D(16, testing=True)([input_1, input_2])

# model = tf.keras.models.Model([input_1, input_2], layer)

