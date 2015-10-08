if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Farenheit 451',
    author: 'Ray Bradbury',
    comments: 'I really liked this book!',
    userName: 'IsaacNewton'
  });

  Posts.insert({
    title: "Ender's Game",
    author: 'Orson Scott Card',
    comments: 'Good condition',
    userName: 'JonDoe'
  });

  Posts.insert({
    title: 'Discovering Meteor',
    author: 'Tom Coleman & Sacha Greif',
    comments: '',
    userName: 'Boredkid'
  });
}
