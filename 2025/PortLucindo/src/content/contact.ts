import { profile } from './profile'

/** Só importar em Server Components: o e-mail vai codificado e só é decodificado no clique do visitante. */
export const emailEncoded = Buffer.from(profile.email).toString('base64')
