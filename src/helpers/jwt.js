import jwt from "jsonwebtoken";

export function getExpiresAtFromToken(token) {
  if (!token) {
    return null;
  }
  const decoded = jwt.decode(token);
  if (!decoded || !decoded.exp) throw new Error("Invalid refresh token");
  return new Date(decoded.exp * 1000);
}
