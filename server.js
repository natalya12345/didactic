var express = require('express');
var exphbs  = require('express-handlebars');
var fs = require('fs');

var cache = {};

var app = express();
var template='main';
// var template='main-simple';


app.engine('handlebars', exphbs({defaultLayout: template}));
app.set('view engine', 'handlebars');

app.use(express.static('web'));
app.use(express.static('pics'));


app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.render('test', {name:'Linux!'});
});


app.get('/svg/:id', function (req, res) {
  var id=req.params.id;
  var svg=load_svg(id);
  res.render('svg', {id:id, svg:svg});
});

app.get("/after/:task", function (req, res) {
  // task is of form q-a
  var task = req.params.task.trim();
  var parts = task.split("-");
  var q = parts[0];
  var a = parts[1];
  console.log(q,a);
  res.render('card', {queez:q, answer:a});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function load_svg(name) {
  if (name in cache) {
    return cache[name];
  }
  var lines=fs.readFileSync('pics/'+name+'.svg').toString().split("\n");
  lines.shift();
  lines.shift();
  lines.shift();
  lines.pop();
  var last=lines.pop();
  var s=lines.join('\n');

  /*
  s+="\n"+`
  <animateTransform
      xlink:href="#leave"
    attributeType="XML"
    attributeName="transform"
    type="translate"
    from="0,0" to="443,701"
    begin="0s" dur="1"

   />

  `+"\n";
  */

  s+="\n"+last+" <!-- comment --> \n";

  cache[name]=s;
  return s;
};


// Works
