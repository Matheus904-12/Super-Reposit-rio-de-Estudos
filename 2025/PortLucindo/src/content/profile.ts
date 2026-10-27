import { emailPrivado } from './privado'
import { publicProfile } from './publico'
import { profileSchema, type Profile } from './schema'

export { publicProfile }

/** Perfil completo (com e-mail), para o gerador de PDF e os testes. Nunca importar em componentes do site. */
export const profile: Profile = profileSchema.parse({ ...publicProfile, email: emailPrivado })
