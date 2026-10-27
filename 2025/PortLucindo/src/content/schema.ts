import { z } from 'zod'

const mes = z.string().regex(/^\d{4}-\d{2}$/, 'use AAAA-MM')
const link = z.object({ label: z.string(), href: z.url() })

export const experienceSchema = z.object({
  company: z.string(), role: z.string(), kind: z.string(),
  start: mes, end: mes.nullable(), place: z.string(),
  summary: z.string(), highlights: z.array(z.string()), stack: z.array(z.string()),
})
export const educationSchema = z.object({
  institution: z.string(), course: z.string(), start: mes, end: mes,
  note: z.string().optional(), summary: z.string().optional(),
})
export const certificationSchema = z.object({
  id: z.string(), issuer: z.string(), title: z.string(),
  issued: mes.optional(), featured: z.boolean(), credential: z.string().optional(),
  /** Link direto para o certificado: preferido ao código da credencial, que fica só como reserva. */
  credentialUrl: z.url().optional(),
  skills: z.array(z.string()).optional(),
  items: z.array(z.object({ title: z.string(), issued: mes, track: z.string() })).optional(),
})
export const projectSchema = z.object({
  slug: z.string(), title: z.string(), kind: z.string(),
  status: z.enum(['producao', 'estudo', 'academico', 'em-construcao']),
  role: z.string(), summary: z.string(), stack: z.array(z.string()),
  featured: z.boolean(), cover: z.string().optional(),
  repo: z.url().optional(), demo: z.url().optional(), privateCode: z.boolean().optional(),
  /** Banco no plano gratuito (ex.: Supabase): pode estar pausado por inatividade e demorar a acordar. */
  demoMayBeAsleep: z.boolean().optional(),
  /** Mês de início da produção, para projetos em construção. */
  startsAt: mes.optional(),
  /** O que o projeto faz (ou fará), em itens curtos, para o modal. */
  highlights: z.array(z.string()).optional(),
})
export const milestoneSchema = z.object({ date: mes, title: z.string(), text: z.string() })
export const recommendationSchema = z.object({
  name: z.string(), headline: z.string(), relation: z.string(), date: mes, text: z.string(),
})

export const profileSchema = z.object({
  name: z.string(), headline: z.string(), location: z.string(),
  availability: z.boolean(),
  tagline: z.string(),
  summary: z.array(z.string()).min(1),
  links: z.array(link), email: z.email(), updatedAt: z.iso.date(),
  experience: z.array(experienceSchema), education: z.array(educationSchema),
  certifications: z.array(certificationSchema), projects: z.array(projectSchema),
  skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
  languages: z.array(z.object({ name: z.string(), level: z.string() })),
  recommendations: z.array(recommendationSchema),
  milestones: z.array(milestoneSchema),
})
export type Profile = z.infer<typeof profileSchema>
export type Certification = z.infer<typeof certificationSchema>
export type Project = z.infer<typeof projectSchema>
export type Milestone = z.infer<typeof milestoneSchema>
