import passport from "passport";

export function jwt() {
  return passport.authenticate("jwt", { session: false });
}
