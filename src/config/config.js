const config = {
    sidemenuLinks: [
       {
           to: "/",
           desc: "blog home page",
           name: "Home",
           icon: "home"
       },
       {
           to: "/testLink",
           desc: "test link 1",
           name: "Test1",
           icon: "heart"
       },
       {
           to: "/testLink2",
           name: "Test2",
           icon: "heart"
       }
   ],
   staticBgText: { //I've made it to config because I want it to be sidewide and I want to have all configurations in 1 place. Like a template settings in wordpress
       bigText: "DaGuT Was Here",
       smallText: "This is absoluetly configurable text. You can make these chanegs in config.js or in Component props"
   }
}

export default config;