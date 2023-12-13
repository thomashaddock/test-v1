// import input validation utils and model schemas to test schemas against static example config jsons

const config = require('./exampleConfigs').exampleConfig

for(task in config.ModelConfig.Preprocessing){
    for(step of config.ModelConfig.Preprocessing[task][Object.keys(config.ModelConfig.Preprocessing[task])[0]]){
        const stepName = Object.keys(step)[0]
        preprocessingFactory.apply(stepName, step[stepName], dataPoint)
    }
}
