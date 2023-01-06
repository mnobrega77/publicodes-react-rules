// import rules from 'modele-social';
import Engine, {formatValue} from 'publicodes';
// const Engine = require('publicodes');
import Router from 'koa-router';
import * as ctx from "express";
// const Router = require('koa-router');
import rules from '../doc/modele-social-file.js';





//Define the prefix of the api
const apiRoutes = new Router({
    prefix: '/api'
})


//GET requests
apiRoutes.get('/rules', async ctx=>{
    // const rules = new Rules();
    const allRules = new Engine(rules);
    // ctx.body = Object.keys(allRules.baseContext.parsedRules);
    ctx.body = Object.keys(allRules.getParsedRules());
    // ctx.body = allRules;
    console.log(allRules);
    });


// apiRoutes.get('/rules/:rule', async (ctx) => {
//     console.log(ctx.params);
//     // const allRules = new Engine(rules);
//     // ctx.body = rule;
// })
apiRoutes.get(
    '/rules/:ruleName',   async (ctx) => {
        const allRules = new Engine(rules);
        let data = await allRules.getRule(ctx.params.ruleName)
            ctx.body = data;
        return data;


    },
    ctx => {
        console.log(ctx.body);
        // => { id: 17, name: "Alex" }
    }
);

// apiRoutes.get('/rules/:ruleName', (ctx) => {
//     const allRules = new Engine(rules);
//     const totalRules = allRules.getParsedRules();
//     const ruleName = ctx.params.ruleName;
//     const currRule = totalRules.map(function (singleRule) {
//         // if (singleRule.title == ruleName) {
//             console.log("ok : " + singleRule);
//             return true;
//         // }
//         // else {
//         //
//         //     const name = singleRule.slice(0, singleRule.indexOf('. $SITUATION'), 0);
//         //     console.log("param :" + ruleName + "title :" + singleRule);
//         // }
//     });
// });


    //     if(singleRule.title == 'impôt . méthode de calcul'){
    //         console.log(ruleName, ctx.params);
    //         return true;
    //     }
    // });
    // if(currRule.length == 1){
    //     ctx.body = currRule[0];
    //     console.log(ctx.body);
    // }else{
    //     ctx.body = {message: "Not found"}
    // }
// }


//POST request
// apiRoutes.post('/evaluate', async ctx=>{
//     const engine = new Engine(rules);
//     const net = engine
//         .setSituation({
//             'salarié . contrat . salaire brut': '5000 €/mois',
//             'salarié . contrat': 'CDI'
//         })
//         .evaluate('salarié . rémunération . net . à payer avant impôt')
//     // console.log(formatValue(net))
//     // ctx.response.status = 200;
//     ctx.body = formatValue(net);
// })

apiRoutes.post('/evaluate', async ctx=>{
    const engine = new Engine(rules);

    let situation = ctx.request.body.situation
    let expressions = ctx.request.body.expressions

    if(Array.isArray(expressions)){
        for (let i = 0; i < expressions.length; i++) {

            console.log(expressions[i]);
            //Do something
        }
    }

    // console.log(ctx.request.body.expressions)
    const resultat = engine
        .setSituation(situation)
        .evaluate(expressions)

    // .setSituation({
    //     'salarié . contrat . salaire brut': '5000 €/euros',
    // })
    // .evaluate('salarié . rémunération . net . à payer avant impôt')


    ctx.response.body = {
        "explication": [
            {
                "nodeKind" : resultat.nodeKind,
                "nodeValue" : resultat.nodeValue,
                "unit" : {
                    "numerator": resultat.unit.numerators,
                    "denominators": resultat.unit.denominators,
                },
                "traversedVariables": resultat.traversedVariables,
                "missingVariables": resultat.missingVariables
            }
        ],
        "warnings": engine.context.logger


        // "resultat": formatValue(resultat)
    };
    console.log("Log : "  )


})




export default apiRoutes;
