import request from 'request';

const post = (req, res) => {
  const fetchUrl = 'https://hn.algolia.com/api/v1/items/' + req.query.id;
  request.get(
    fetchUrl,
    function(err, response, body) {
      if(err)
        console.log(err);
      res.statusCode = 200;
      res.end(JSON.stringify(response));
    }
  );
};

export default post;
