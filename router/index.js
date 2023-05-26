const router = require("@koa/router")();
// const passport = require("koa-passport");

router.get("/", async (ctx) => {
  ctx.body = { message: "hello world" };
});

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (ctx) => {
//     ctx.redirect("https://new-blog-web-prototype.vercel.app/");
//   }
// );

module.exports = router;
