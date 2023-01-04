const Rules = require('modele-social');
const Engine = require('publicodes');
const Router = require('koa-router');



//Define the prefix of the api
const router = new Router({
    prefix: '/api'
})

//GET requests
router.get('/rules', async ctx=>{
    const rules = new Rules();
    ctx.body= new Engine(rules);
})
router.get('/rules/:rule', async (ctx) => {
    const rule = ctx.params.rule;
    ctx.body = rule;
})

//POST request
router.post('/evaluate', async ctx=>{
    let res = await evaluateSituation(situation);
    ctx.response.status = 200;
    ctx.body = res;
})




module.exports = router;
