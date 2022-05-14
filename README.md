# Memories

![Memories](https://i.ibb.co/Z8Y0CJv/Screenshot-2020-10-30-at-11-10-04.png)

## Introduction
This is a code repository for the corresponding video tutorial - https://youtube.com/playlist?list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu.

Using React, Node.js, Express & MongoDB you'll learn how to build a Full Stack MERN Application - from start to finish. The App is called "Memories" and it is a simple social media app that allows users to post interesting events that happened in their lives.

By the end of this video, you will have a strong understanding of how the MERN Stack works.

## Stay up to date with new projects
New major projects coming soon, subscribe to the mailing list to stay up to date https://resource.jsmasterypro.com/newsletter

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