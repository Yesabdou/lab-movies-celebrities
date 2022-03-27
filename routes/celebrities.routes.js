const router = require('express').Router();

const async = require('hbs/lib/async');
const Celebrity = require('../models/Celebrity.model'); 


router.get('/create', (req, res) => { //fin de la route 

    res.render('new-celebrity')  

});

router.post('/create', async(req, res)=>{
    
    const {name,occupation,catchPhrase} =  await req.body
    
    try{

         Celebrity.create({name, occupation, catchPhrase})
         res.redirect('/celebrities')
    }
    catch(e){
        console.log(e.message)
        res.redirect('/create')
    }
    
})

router.get('/', async (req, res ) => {
    const celebrities = await Celebrity.find();
    res.render('celebrities', {celebrities})
  });

router.get ('/:id' , async(req,res)=>
{
    const celebritie = await Celebrity.findById(req.params.id)
    console.log(celebritie);
    res.render('celebrity-details', {celebritie})
})

module.exports = router;