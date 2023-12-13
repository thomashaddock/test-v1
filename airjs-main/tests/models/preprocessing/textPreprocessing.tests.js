const tf = require("@tensorflow/tfjs");
const {ConvertToCase} = require("../../../src/models/preprocessing/textPreprocessing/convertToCase");
const {ConvertToVocabulary} = require("../../../src/models/preprocessing/textPreprocessing/convertToVocabulary");
const {PadSequences} = require("../../../src/models/preprocessing/textPreprocessing/padSequences");
const {RemoveCharacters} = require("../../../src/models/preprocessing/textPreprocessing/removeCharacters");
const {Tokenize} = require("../../../src/models/preprocessing/textPreprocessing/tokenizer");

describe("Text Preprocessing Tests", ()=>{

    it('should convert to case', async ()=>{
        const string = "Hola que (es la que hay) salu2. A todos ((espero que l?a? pasen-bien. Que me cuentan. punto. punto1.";
        const stringList = [ 'A', '(tod)os', 'espe@ro', 'que', 'la' ];
        const tokenizedSenteceList = [
            [
                'Hola',  'que',
                'es',    'la',
                'que',   'hay',
                'salu2'
            ],
            [ 'A', '(tod)os', 'espe@ro', 'que la esten pasando bien', 'la' ],
            [ 'pase%n', 'b&&ien' ],
            [ 'Que', 'me', 'cuentan' ],
            [ 'punto' ],
            [ 'punto1' ]
        ];

        const params = {lowercase: false};
        const dataPoint = {tensorData: tokenizedSenteceList, type: "text"};
        const f1 = new ConvertToCase(params,dataPoint);
        // const f2 = new ConvertToCase(params, stringList);
        // const f3 = new ConvertToCase(params, tokenizedSenteceList);
        console.log(await f1.apply());
        // console.log(await f2.apply());
        // console.log(await f3.apply());
    })

    it('should convert to vocabulary', async ()=>{
        const tokenizedSenteceList = [
        [
            'Hola',  'que',
            'es',    'la',
            'que',   'hay',
            'salu2'
        ],
        [ 'A', 'todos', 'espero', 'que', 'la' ],
        [ 'pasen', 'bien' ],
        [ 'Que', 'me', 'cuentan' ],
        [ 'punto' ],
        [ 'punto1' ]
    ];

    const string = [
        'Hola',  'que',
        'es',    'la',
        'que',   'hay',
        'salu2'
    ];
    const vocab = {'hola': 23, 'salu2': 43, 'que': 22, 'es': 1000, 'la': 232, 'espero': 69, 'pasen': 420, 'bien': 2000, 'a': 5000, 'punto': 69};

    //inputSize 1
    const params = {vocabulary : vocab, startCharacter: 1, oovCharacter: 2, maxVocab : null};
    const dataPoint = {tensorData: tokenizedSenteceList, type: "text"};
    const t1 = new ConvertToVocabulary(params,dataPoint);
    console.log(await t1.apply());

        // const t2 = new ConvertToVocabulary(string, vocab, 1, 2, 2000);
        // console.log(await t2.run());
        //
        // const t3 = new ConvertToVocabulary(vocab, tokenizedSenteceList, 5, "right");
        // console.log(await t3.run());
        //
        // const t4 = new ConvertToVocabulary(vocab, tokenizedSenteceList, 5, "left");
        // console.log(await t4.run());
    })

    it('should pad sequences', async ()=>{
        const sequenceList = [ [ 1, 2, 22, 1000, 232, 22, 2, 43 ],
        [ 1, 2, 2, 69, 22, 232 ],
        [ 1, 420, 2000 ],
        [ 1, 2, 2, 2 ],
        [ 1, 69 ],
        [ 1, 2 ] ];
        const sequence = [ 1, 2, 22, 1000, 232, 22, 2, 43 ];
        const params = {padCharacter: 0, length: 28 , padLocation: "pre", truncateLocation:"pre" };
        const dataPoint = {tensorData: sequenceList, type: "text"};
        const test = new PadSequences(params, dataPoint);
        console.log(await test.apply());
    })

    it('should remove characters', async ()=>{
        const string = "Hola que (es la que hay) salu2. A todos ((espero que l?a? pas45en-bien. Que me cuen22tan. punto. punto1.";
        const stringList = [ 'A', '(tod)os', 'espe@ro', 'que', 'la' ];
        const tokenizedSenteceList = [
            [
                'Hola',  'que',
                'es',    'la',
                'que',   'hay',
                'salu2'
            ],
            [ 'A', '(tod)os', 'espe@222ro', 'que', 'la' ],
            [ 'pase%n', 'b&&ien' ],
            [ 'Que', 'me', 'cuentan' ],
            [ 'punto' ],
            [ 'punto1' ]
        ];
        const dataPoint = {tensorData: tokenizedSenteceList, type: "text"};
        const params = {removeDigits: false, removePunctuation: true };
        const f = new RemoveCharacters(params, dataPoint);

        console.log(await f.apply());
        })
    
    it('should tokenize', async ()=>{
            const string = "Hola que (es la que hay) salu2. A todos ((espero que l?a? pasen-bien. Que me cuentan. punto. punto1.";
            // console.log(string.split('(?u)\\b\\w\\w+\\b'));
            const stringList = [ 'A. oracion. hola. 2. kjskdfkl', '(tod)os', 'espe@ro', 'que', 'la' ];
            const tokenizedSenteceList = [
                [
                    'Hola me',  'llamo que',
                    'es pablo',    'la pedro',
                    'que',   'hay',
                    'salu2'
                ],
                [ 'A', '(tod)os', 'espe@ro', 'que la esten pasando bien', 'la' ],
                [ 'pase%n', 'b&&ien' ],
                [ 'Que', 'me', 'cuentan' ],
                [ 'punto' ],
                [ 'punto1' ]
            ];
            const params = {splitSentences: true, splitWords: true, tokenPattern: ' '};
            const dataPoint = {tensorData: stringList, type: "text"};
            const f1 = new Tokenize(params, dataPoint);
            console.log(await f1.apply());
            // console.log(f1.splitWor(string));
            // const f2 = new Tokenize(stringList);
            // const f3 = new Tokenize(tokenizedSenteceList);
            // console.log(await f1.apply());
            // console.log(await f2.apply());
            // console.log(await f3.apply());
            })
})
