# Memories

Setup:
- run ```npm i && npm start``` for both client and server side to start the app

PART 1 (SERVER SETUP)
First:  index file
second:  routes file()
Third:  model export ( controller,)
Fourth: controller()

PART 2 ( CLIENT SETUP)
first: App.js( index.js)
second: api file( actions)
third: actions file ()
fourth: reducers file

### App runtime
app.js component runs both the post and the form component

GETPOST =>  dispatch(getPosts) => go to getPost action file => dispatch(send data to the database api) =>  reducer file => return data => useselector to get data in post

CREATEPOST => handlesubmit function =>dispatch(createPost) => go to createPost action file => dispatch(go to databse api) => reducer file => return data => useSelector to get data

UPDATEPOST => get setCurrentID from card => App => take data to the form =>dispatch(getPosts) => go to getPost action file => dispatch(send data to the database api) =>  reducer file => return data => useselector to get data in post

DELETEPOST => dispatch(deletepost) => go to delete action file => dispatch(go to databse api) => reducer file => return data => useSelector to get data

LIKEPOST => dispatch(likepost) => go to like action file => dispatch(go to databse api) => reducer file => return data => useSelector to get data
