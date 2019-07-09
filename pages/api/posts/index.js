import request from 'request';

const posts = (req, res) => {
  const fetchUrl = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=20';
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

export default posts;

// switch(req.method) {
//   case 'GET':
//     console.log('GET request');
//     break;
//   case 'POST':
//     console.log('POST request');
//     break;
//   default:
//     console.log('GET request');
// }
