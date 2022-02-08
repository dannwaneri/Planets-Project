const {parse} = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanets(planet) {
return planet['koi_disposition'] === 'CONFIRMED'
&& planet['koi_insol'] > 0.36 
&& planet['koi_insol'] < 1.11
&& planet['koi_prad'] < 1.6
}

fs.createReadStream('kepler_data.csv')
.pipe(parse({
    comment:'#',
    columns:true,
}))
.on('data', (data) => {
    if(isHabitablePlanets(data)){
        habitablePlanets.push(data); 
    }
})
.on('error', (err) => {
    console.error(err);
})
.on('end', () => {
console.log(`${habitablePlanets.length} habitable planets found!`)
});
// parse();

