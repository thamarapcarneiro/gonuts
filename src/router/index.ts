import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { RoutesName } from ".//routes";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/game",
    name: RoutesName.Game,
    component: () => import("@/views/GameView.vue")
  },
  {
    path: "/next",
    name: RoutesName.NextLevel,
    component: () => import("@/views/NextLevel.vue"),
    beforeEnter: (_:never, from: {name: string}, next: ({}?) => void) => {
      if (from.name === RoutesName.Game) {
        next();
      } else {
        next({ name: RoutesName.Home });
      }
    }
  } as never
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
