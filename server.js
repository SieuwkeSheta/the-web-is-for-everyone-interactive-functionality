// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Importeer de multer package
import multer from 'multer';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

const upload = multer({ storage: multer.memoryStorage() });

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')



// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
  // Render index.liquid uit de Views map
  // Geef hier eventueel data aan mee
  response.render('index.liquid')
})

// Maak een GET route voor alle Groups in de database
app.get('/groups', async function (request, response) {

  const MultipleGroupslistapiResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_group?fields=name,slug,snappmap.snappthis_snapmap_uuid.*&fields=count(users)')
  const MultipleGroupslistapiResponseJSON = await MultipleGroupslistapiResponse.json()

  // Geef hier eventueel data aan mee
  response.render('groups.liquid', { MultipleGroupslist: MultipleGroupslistapiResponseJSON.data })
})

// Maak een GET route voor one-group met alle snappmaps
app.get('/groups/:slug', async function (request, response) {

  const snappMapsapiResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_group/?fields=*.*,snappmap.snappthis_snapmap_uuid.*&filter[slug]=' + request.params.slug)
  const snappMapsapiResponseJSON = await snappMapsapiResponse.json()

  // Geef hier eventueel data aan mee
  response.render('one-group.liquid', { SnappMapslist: snappMapsapiResponseJSON.data })
})

// Maak een GET route voor alle Groups in de database
app.get('/snappmaps', async function (request, response) {

  const MultipleSnappMapslistApiResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snapmap')
  const MultipleSnappMapslistApiResponseJSON = await MultipleSnappMapslistApiResponse.json()

  // Geef hier eventueel data aan mee
  response.render('snappmaps.liquid', { MultipleSnappMapslist: MultipleSnappMapslistApiResponseJSON.data })
})

// Maak een GET route voor one-snappmap met alle snapps
app.get('/snappmaps/:uuid', async function (request, response) {

  const OneSnappMappInfoApiResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snapmap?fields=*.*,groups.snappthis_group_uuid.name,groups.snappthis_group_uuid.slug,groups.snappthis_group_uuid.snappmap.snppthis_snapmap_uuid.name&deep[snaps][_sort]=-date_created&filter[uuid]=' + request.params.uuid)
  const OneSnappMappInfoApiResponseJSON = await OneSnappMappInfoApiResponse.json()

  // Geef hier eventueel data aan mee
  response.render('one-snappmap.liquid', { OneSnappMappInfos: OneSnappMappInfoApiResponseJSON.data })
})

// Maak een GET route voor alle snapps in de database
app.get('/snapps', async function (request, response) {

  const MultipleSnappsApiResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*,snapmap.groups.snappthis_group_uuid.name&filter[picture][_neq]=null')
  const MultipleSnappsApiResponseJSON = await MultipleSnappsApiResponse.json()

  // Geef hier eventueel data aan mee
  response.render('snapps.liquid', { MultipleSnapps: MultipleSnappsApiResponseJSON.data, path: request.path })
})

// Maak een GET route voor alle snapps in de database op locatie
app.get('/snapps/location/:location', async function (request, response) {

  const MultipleSnappsApiResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*,snapmap.groups.snappthis_group_uuid.name&filter[picture][_neq]=null&filter[location]=' + request.params.location)
  const MultipleSnappsApiResponseJSON = await MultipleSnappsApiResponse.json()

  // Geef hier eventueel data aan mee
  response.render('snapps.liquid', { MultipleSnapps: MultipleSnappsApiResponseJSON.data, pathLocation: request.path })
})

// Maak een GET route voor one-snapp in de database
app.get('/snapps/:uuid', async function (request, response) {

  // Data van one-snapp in de database
  const OneSnappApiResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*,snapmap.name,snapmap.uuid,snapmap.groups.snappthis_group_uuid.name,author.*&filter[uuid]=' + request.params.uuid)
  const OneSnappApiResponseJSON = await OneSnappApiResponse.json()

  // Data van alle likes per one-snapp in de database
  const LikesCountApiResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*,snapmap.name,snapmap.groups.snappthis_group_uuid.name,author.*,actions.action&deep[actions][_filter][action][_eq]=like&filter[uuid]=' + request.params.uuid)
  const LikesCountApiResponseJSON = await LikesCountApiResponse.json()

  // Data van alle dislikes per one-snapp in de database
  const TomatoCountApiResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*,snapmap.name,snapmap.groups.snappthis_group_uuid.name,author.*,actions.action&deep[actions][_filter][action][_eq]=tomato&filter[uuid]=' + request.params.uuid)
  const TomatoCountApiResponseJSON = await TomatoCountApiResponse.json()

  // Data van alle stars per one-snapp in de database
  const StarCountApiResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*,snapmap.name,snapmap.groups.snappthis_group_uuid.name,author.*,actions.action&deep[actions][_filter][action][_eq]=star&filter[uuid]=' + request.params.uuid)
  const StarCountApiResponseJSON = await StarCountApiResponse.json()

  // Geef hier eventueel data aan mee
  response.render('one-snapp.liquid', { 
    OneSnapps: OneSnappApiResponseJSON.data, 
    Likescounts: LikesCountApiResponseJSON.data,
    Tomatocounts: TomatoCountApiResponseJSON.data,
    Starcounts: StarCountApiResponseJSON.data
   })
})


/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  const fetchResponse = await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  // Als de POST niet gelukt is, kun je de response loggen. Sowieso een goede debugging strategie.
  // console.log(fetchResponse)

  // Eventueel kun je de JSON van die response nog debuggen
  // const fetchResponseJSON = await fetchResponse.json()
  // console.log(fetchResponseJSON)

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// Render een liquid pagina als er een foutmelding is / pagina niet bestaat
app.use((req, res, next) => {
  res.status(404).render('error.liquid')
})