import request from 'request';

const user = (req, res) => {
  const fetchUrl = 'https://hn.algolia.com/api/v1/users/' + req.query.username;
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

export default user;
