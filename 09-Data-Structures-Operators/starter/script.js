'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
}

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ time = '20:00', address, mainIndex = 0, starterIndex = 1 }) {
    console.log(time, address, mainIndex, starterIndex);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(ing1, ing2, ing3);
  },

  orderPizza(mainIng, ...otherIngs) {
    console.log(mainIng, otherIngs)
  }
};

const rest = new Map()
rest.set('name', 'Classico Italliano');
rest.set(1, 'Firenze italy');
rest.set(2, 'Firenze italywwqdad');

console.log(rest);



// #Coding challenge 1 
// 
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },

//   printGoals: function (...players) {
//     self = this;
//     return players.reduce((acc, player) => {
//       if (acc.includes(player)) {
//         return acc;
//       }

//       let goals = 0;
//       self.scored.forEach((scored) => {
//         if (player === scored) {
//           goals++
//         }
//       });

//       return acc += `${player}: ${goals}\n`;
//     }, '')
//   }
// };

// // Task1 
// const [players1, players2] = game.players;
// console.log(players1);
// console.log(players2);

// // Task 2
// const [gk, ...fieldPlayers] = players1;
// console.log(gk);
// console.log(fieldPlayers);

// // Task3
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // Task4
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // Task 5
// const { team1, x: draw, team2 } = game.odds;
// console.log(team1);
// console.log(draw);
// console.log(team2);

// // Task 6
// console.log(game.printGoals('Lewandowski', 'Gnarby', 'Muller', 'Lewandowski'));

// // Task 7
// const winner1 = (game.odds.team1 > game.odds.team2) && game.team2;
// const winner2 = (game.odds.team1 < game.odds.team2) && game.team1;
// const winner = winner1 || winner2;

// console.log(winner);

// Closures 


