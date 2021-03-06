var pg = require('pg');
var config = require('./config.js');
var pool = new pg.Pool(config.db);

var actions = {
  replyIndex: 0,

  getThread : function(response, id) {
    var query = 'SELECT t.title, t.created, t.content, u.username, u.id as user_id, t.type FROM threads t '
                + 'JOIN users u ON t.pk_users_id = u.id AND t.id = $1 LIMIT 1';
    this.getOne(response, query, [id]);
  },

  getComments : function(response, id) {
    var self = this;
    var query = 'WITH RECURSIVE comments_tree AS ('
              + 'SELECT *, array[id] AS path, 0 as level FROM comments c WHERE c.pk_threads_id = $1 AND parent_id = 0 '
              + 'UNION ALL '
              + 'SELECT c.*, path || array[c.id] AS path, comments_tree.level+1 AS level FROM comments c JOIN comments_tree ON c.parent_id = comments_tree.id '
              + ') '
              + 'SELECT c.*, u.username AS author FROM comments_tree c '
              + 'JOIN users u ON u.id = c.pk_users_id '
              + 'ORDER BY path, created';
    pool.connect(function(err, client, done) {
      done();
      if (err) {
         response.status(500).json(err);
         console.error(err);
         return;
      }

      client.query(query, [id])
      .then(function(rs) {
        self.replyIndex = 0;
        var replies;
        replies = self.generateRecursiveReplies(rs.rows, 0);
        response.json(replies);
      })
      .catch(function(err) {
        console.error(err);
      });
    });
  },

  generateRecursiveReplies : function(comments, parent) {
    var result = [];

    for (var i = this.replyIndex; i < comments.length; i++) {
      if (comments[i].parent_id == parent) {
        comments[i].replies = [];
        result.push(comments[i]);
        this.replyIndex++;
      } else if (comments[i].parent_id > parent) {
        comments[i-1].replies = this.generateRecursiveReplies(comments, comments[i].parent_id);
        i = this.replyIndex - 1;
      } else {
        break;
      }
    }
    return result;
  },

  getUser : function(response, username) {
    var query = 'SELECT * FROM users where username = "$1"';
    this.get(response, query, [username]);
  },

  getForums : function(response) {
      var params = [];
      var query = 'SELECT * FROM forums';
      this.get(response, query, params);
  },

  getThreads : function(response, forum) {
    var self = this;
    var params = [];
    var query = 'SELECT t.*, u.username, f.name as forum FROM threads t '
              + 'JOIN users u ON u.id = t.pk_users_id '
              + 'JOIN forums f ON f.id = t.pk_forum_id ';
    if (typeof forum != 'undefined') {
      query += ' WHERE f.name = $1';
      params.push(forum);
    }
    pool.connect(function(err, client, done) {
      done();

      if (err) {
         response.status(500).json(err);
         return console.error(err);
      }

      client.query(query, params)
      .then(function(threadRs) {
        var countQuery = 'SELECT pk_threads_id AS tid, count(*) AS total FROM comments GROUP BY pk_threads_id';
        client.query(countQuery)
        .then(function(countRs) {
          var threads = threadRs.rows;
          var counts = self.sortCountArr(countRs.rows);
          threads.forEach(function(thread, index) {
              threads[index].totalCount = (typeof counts[thread.id] != 'undefined') ? counts[thread.id] : '0';
          });

          response.json(threads);
        })
        .catch(function(err) {
          response.status(500).json(err);
          console.error(err);
        });
      });
    });
  },

  sortCountArr : function(countArr) {
    var obj = {};
    countArr.forEach(function(elem) {
      obj[elem.tid] = elem.total;
    });

    return obj;
  },

  addComment: function(response, data) {
    pool.connect(function(err, client, done) {
      done();
      if (err) {
         response.status(500).json(err);
         console.error(err);
         return;
      }

      client.query('INSERT INTO comments (id, body, created, pk_threads_id, pk_users_id, parent_id) VALUES (DEFAULT, $1, $2, $3, $4, $5)', [data.comment, new Date(), data.id, data.uid, data.parent_id])
      .then(function(rs) {
        response.json(rs);
      })
      .catch(function(err) {
        response.status(500).json(err);
      });
    });
  },

  addThread: function(response, data) {
    pool.connect(function(err, client, done) {
      done();
      if (err) {
         response.status(500).json(err);
         console.error(err);
         return;
      }

      client.query('INSERT INTO threads (id, pk_users_id, title, created, pk_forum_id, content, type) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id',
      [data.uid, data.title, new Date(), data.fid, data.content, data.type])
      .then(function(rs) {
        response.json(rs);
      })
      .catch(function(err) {
        response.status(500).json(err);
      });
    });
  },

  get : function(response, query, params) {
    pool.connect(function(err, client, done) {
      done();
      if (err) {
         response.status(500).json(err);
         console.error(err);
         return;
      }

      client.query(query, params)
      .then(function(rs) {
        response.json(rs.rows);
      });
    });
  },

  getOne : function(response, query, params) {
    pool.connect(function(err, client, done) {
      done();
      if (err) {
         response.status(500).json(err);
         console.error(err);
         return;
      }

      client.query(query, params)
      .then(function(rs) {
        var ret = typeof rs.rows[0] != 'undefined' ? rs.rows[0] : {};
        response.json(ret);
      });
    });
  }
};

module.exports = actions;
