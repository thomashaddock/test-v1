const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");
const {filterLayerTest, filterLoadModelTest, filterModelTest} = require("./filterLayer/filterLayerSandbox");
const {sumModelTest, sumLayerTest, sumLoadModelTest} = require("./sumLayer/sumLayerSandbox");
const {selectorLayerTest, selectorModelTest, selectorLoadModelTest} = require("./selectorLayer/selectorLayerSandbox");
const {multiConv2DLayerTest, multiConv2DModelTest, multiConv2DLoadModelTest} = require("./multiConv2DLayer/multiConv2DSandbox")


function layerTest(){
    filterLayerTest();
    sumLayerTest();
    selectorLayerTest();
    multiConv2DLayerTest();
}

function modelTest(){
    filterModelTest();
    sumModelTest();
    selectorModelTest();
    multiConv2DModelTest();
}

function loadModelTest(){
    filterLoadModelTest();
    sumLoadModelTest();
    selectorLoadModelTest();
    multiConv2DLoadModelTest();
}

layerTest();
modelTest();
loadModelTest();


