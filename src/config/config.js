const config = {
  sidemenuLinks: [
    {
      to: "/",
      desc: "blog home page",
      name: "Home",
      icon: "home"
    }, {
      to: "/testLink",
      desc: "404 link",
      name: "Test1",
      icon: "heart"
    }, {
      to: "/login",
      name: "Sign-in/Sign-up",
      icon: "user"
    }, {
      to: "/createarticle",
      desc: "olala, come and post!",
      name: "Create article",
      icon: "pencil"
    }, {
      to: "/myarticles",
      name: "My articles",
      desc: "Go to list of my articles",
      icon: "user"
    }, {
      to: "/logout",
      name: "Logout",
      icon: "fire"
    }

  ],
  staticBgText: { //I've made it to config because I want it to be sidewide and I want to have all configurations in 1 place. Like a template settings in wordpress
    bigText: "DaGuT Was Here",
    smallText: "This is absoluetly configurable text. You can make these chanegs in config.js or" +
        " in Component props"
  },
  apiBaseUrl: "https://react-blog-api.bahdcasts.com/api"
}

export default config;