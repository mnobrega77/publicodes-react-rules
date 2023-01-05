import rules from 'modele-social';
import Engine, {formatValue} from 'publicodes';
// const Engine = require('publicodes');
import Router from 'koa-router';
// const Router = require('koa-router');



//Define the prefix of the api
const apiRoutes = new Router({
    prefix: '/api'
})

//GET requests
apiRoutes.get('/rules', async ctx=>{
    // const rules = new Rules();
    const allRules = new Engine(rules);
    ctx.body = Object.keys(allRules.baseContext.parsedRules);
})
apiRoutes.get('/rules/:rule', async (ctx) => {
    console.log(ctx.params);
    // const allRules = new Engine(rules);
    // ctx.body = rule;
})

apiRoutes.get('/test', async ctx=>{

    ctx.body = "coucou";
})

//POST request
apiRoutes.post('/evaluate', async ctx=>{
    const engine = new Engine(rules);
    const net = engine
        .setSituation({
            'salarié . contrat . salaire brut': '5000 €/euros',
        })
        .evaluate('salarié . rémunération . net . à payer avant impôt')
    // console.log(formatValue(net))
    // ctx.response.status = 200;
    ctx.body = formatValue(net);
})




export default apiRoutes;
