const router = require('express').Router();

const Movie = require('../models/Movie.model'); 
const Celebrity = require('../models/Celebrity.model');
const async = require('hbs/lib/async');



router.get('/', async (req, res ) => {
  const movies = await Movie.find().populate('cast');
  res.render('movies', {movies})
});



//afficher le formulaire vide 
router.get('/create', async (req, res) => {
  const celebrities = await Celebrity.find(); // on doit chercher les celebrités car elles dependent

    res.render('new-movie', {celebrities})  // on afficher la page hbs celebrities et on envoie les données de celebrities dans les {{}}
});

// poster les données du fomulaire
router.post('/create', async(req, res)=>{  
const {title,genre,plot,cast} =  req.body
    createMovie = {
        title: title,
        genre: genre,
        plot: plot,
        cast: cast,
      };
      try {
        await Movie.create(createMovie);
        res.redirect('/movies')
      } catch (e){
        res.render("movies/new-movie");
        console.log(e.message)
      } 
})

//on récupère l'id du movies à partir du forms (req.params.id), on le transforme en lien, ensuite on afficher le dans celebrity'details la celebrité qui dépend de l'id
router.get('/:id', async(req,res)=>{
  try {
    const movie = await Movie.findById(req.params.id).populate('cast')
    res.render('movie-details', { movie })
  } catch (error) {
    console.log(error)
    res.redirect(`${req.baseUrl}`)
  }
})

router.get("/:id/edit", async (req, res, next) => {
  const movieId = req.params.id;
  try {
    const movieToEdit = await Movie.findById(movieId).populate("cast");
    console.log(movieToEdit)
    const celebrities = await Celebrity.find();

    for (let i = 0; i < movieToEdit.cast.length; i++) {
      let castname = movieToEdit.cast[i].name;
      celebrities.forEach((elmt) => {
        if (elmt.name === castname) {
          elmt.selected = true;
        }
      });
    }
    res.render("movies/edit-movie", { movieToEdit, celebrities });
  } catch (err) {
    next(err);
  }
});





module.exports = router;
