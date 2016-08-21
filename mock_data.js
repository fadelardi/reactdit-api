var data = {
    'threads' : [
      {
        id: 1,
        author: "Author1",
        title: "Text Post #1",
        timestring: "xx hours ago",
        subforum: "subforum1",
        comments: [
            {id: 1, body: 'lol', author: 'Author1', date: '2016-01-01'},
            {id: 2, body: 'lel', author: 'Author2', date: '2016-01-02'},
            {id: 3, body: 'blah', author: 'Author3', date: '2016-01-02'}
        ]
      },
      {
        id: 2,
        author: "Author2",
        title: "Text Post #2",
        timestring: "xx hours ago",
        subforum: "subforum2",
        comments: [
            {id: 1, body: 'lel', author: 'Author1', date: '2016-01-01'},
        ]
      },
      {
        id: 3,
        author: "Author3",
        title: "Image Post #1",
        timestring: "xx hours ago",
        subforum: "subforum1",
        comments: [
            {id: 2, body: 'lel', author: 'Author1', date: '2016-01-01'},
        ]
      },
      {
        id: 4,
        author: "Author4",
        title: "Link Post #1",
        timestring: "xx hours ago",
        subforum: "subforum2",
        comments: [
            {id: 1, body: 'lel', author: 'Author1', date: '2016-01-01'},
        ]
      },
      {
        id: 5,
        author: "Author5",
        title: "Link Post #2",
        timestring: "xx hours ago",
        subforum: "subforum2",
        comments: [
            {id: 1, body: 'lel', author: 'Author1', date: '2016-01-01'},
        ]
      },
      {
        id: 6,
        author: "Author6",
        title: "Title6",
        timestring: "xx hours ago",
        subforum: "subforum",
        comments: [
            {id: 1, body: 'lel', author: 'Author1', date: '2016-01-01'},
        ]
      }
    ],
    'users': [
      {username: 'Author1', browniepts: 99},
      {username: 'Author2', browniepts: 99},
      {username: 'Author3', browniepts: 99},
      {username: 'Author4', browniepts: 99},
      {username: 'Author5', browniepts: 99},
      {username: 'Author6', browniepts: 99}
    ]
  };

module.exports = data;
