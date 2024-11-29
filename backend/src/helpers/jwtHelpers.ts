import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}

const createResetToken = (
  payload: any,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: expireTime,
  })
}

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  const test = jwt.verify(token, secret) as JwtPayload
   return test
}

export const jwtHelpers = {
  createToken,
  verifyToken,
  createResetToken,
}
