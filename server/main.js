import { Meteor } from 'meteor/meteor';
import { FactsCollection } from '/imports/api/facts';

function insertFact({ fact }) {
  FactsCollection.insert({fact, createdAt: new Date()});
}

Meteor.startup(() => {
  if (FactsCollection.find().count() === 0) {
    insertFact({
      fact: 'TRIVIA: 42 is the number of little squares forming the left side trail of Microsoft\'s Windows 98 logo.'
    })
  }
});

Meteor.methods({
  insertFavoriteFact(fact) {
    return FactsCollection.insert({fact, createdAt: new Date()});
  },
  removeFavoriteFact(id) {
    return FactsCollection.remove(id)
  }
});