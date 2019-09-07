## This is fancy react blog :)
I hope you enjoy visiting it. It's written with react+redux

Demolink: https://demos.dagut.ru/beautifulblog/

What you can do:
- See all created articles
- Share links for anything that you see, users will get exactly that content
- Login/register
- Create posts
- Edit posts (only if you're an author)
- Delete posts (only if you're an author)
- Filter posts by category

REST API Limitations that did not allow me to fully customize this blog:
- No "Posts per page settings" (cant grab more than 5 news per 1 time)
- Only one category per post
- Images in posts are really bad (so now I have random pic instead of the one used in API (really easy to correct, so dont blame me. I just want it to look better and can not restrcict post images))
- No search available. It's not nice to search within 5 available posts, so I did not add that
- In category filter news are not sorted in chrnological order :\
- Is not possible to get custom user's posts (is it?)
- API is not documented, so it's really hard to work with it


TODO:
- add prop types (did not have time to add them, so there are almost none of them)
- Change styles of create/edit articles
- Document/comment code. As I was in real rush, I did not have a chance to comment anything. However I tried to structure it to be undertandable. Though prettier smashed my beauty and now it looks scary :D
- Add posibility to load existing post image while editing post