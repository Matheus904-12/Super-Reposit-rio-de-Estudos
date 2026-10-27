import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { Profile } from '../content/schema'
import { dataCompleta, mesAno } from './format'

const fonte = (arquivo: string) => `node_modules/@fontsource/${arquivo}`
Font.register({
  family: 'Geist',
  fonts: [
    { src: fonte('geist/files/geist-latin-400-normal.woff'), fontWeight: 400 },
    { src: fonte('geist/files/geist-latin-600-normal.woff'), fontWeight: 600 },
  ],
})
Font.register({ family: 'Serif', src: fonte('instrument-serif/files/instrument-serif-latin-400-italic.woff') })
Font.registerHyphenationCallback((palavra) => [palavra]) // sem hifenização automática

const TINTA = '#18181b'
const MUDO = '#6b6b73'
const LINHA = '#e4e4e7'
const ACENTO = '#a3a300'

const s = StyleSheet.create({
  pagina: { fontFamily: 'Geist', fontSize: 9.5, color: TINTA, paddingTop: 46, paddingBottom: 50, paddingHorizontal: 52, lineHeight: 1.6, letterSpacing: 0.2, wordSpacing: 1.5 },
  nome: { fontFamily: 'Serif', fontSize: 34, lineHeight: 1, letterSpacing: 0.6, wordSpacing: 7 },
  cargo: { fontSize: 11, color: MUDO, marginTop: 8 },
  contato: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 14, paddingTop: 12, borderTopWidth: 0.7, borderTopColor: LINHA, fontSize: 9 },
  contatoItem: { marginRight: 18, color: TINTA, textDecoration: 'none' },
  secao: { flexDirection: 'row', marginTop: 20 },
  rotulo: { width: 108, paddingRight: 12, fontSize: 7.5, fontWeight: 600, letterSpacing: 1.6, textTransform: 'uppercase', color: ACENTO, paddingTop: 2 },
  conteudo: { flex: 1 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  forte: { fontWeight: 600 },
  mudo: { color: MUDO },
  bloco: { marginBottom: 11 },
  item: { flexDirection: 'row', marginTop: 3 },
  marcador: { width: 10, color: MUDO },
  rodape: { position: 'absolute', bottom: 24, left: 52, right: 52, flexDirection: 'row', justifyContent: 'space-between', fontSize: 7.5, color: MUDO },
})

/** A trilha Microsoft Learning aparece à parte, como uma linha de contagem. */
export function selecionarDestaques(profile: Profile, limite: number) {
  return profile.certifications.filter((c) => c.featured && c.id !== 'microsoft-learning').slice(0, limite)
}

/** Texto à esquerda quebra de linha; a data à direita nunca encolhe nem é atropelada. */
const LinhaComData = ({ esquerda, data }: { esquerda: React.ReactNode; data: string }) => (
  <View style={s.linha}>
    <Text style={{ flex: 1, paddingRight: 14 }}>{esquerda}</Text>
    <Text style={[s.mudo, { flexShrink: 0, fontSize: 8.5 }]}>{data}</Text>
  </View>
)

export function exibirLink(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

/** Rótulo à esquerda, conteúdo à direita: cada seção respira em vez de empilhar texto. */
const Secao = ({ titulo, children }: { titulo: string; children: React.ReactNode }) => (
  <View style={s.secao}>
    <Text style={s.rotulo}>{titulo}</Text>
    <View style={s.conteudo}>{children}</View>
  </View>
)
const Item = ({ texto }: { texto: string }) => (
  <View style={s.item}><Text style={s.marcador}>–</Text><Text style={{ flex: 1 }}>{texto}</Text></View>
)

const primeiraFrase = (texto: string) => (texto.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? texto)

function Experiencias({ profile }: { profile: Profile }) {
  return profile.experience.map((e, i) => (
    <View key={e.company + e.start} style={s.bloco} wrap={false}>
      <LinhaComData esquerda={<Text style={s.forte}>{e.role}</Text>} data={`${mesAno(e.start)} – ${mesAno(e.end)}`} />
      <Text style={s.mudo}>{e.company}</Text>
      <Text style={{ marginTop: 4 }}>{e.summary}</Text>
      {e.highlights.slice(0, i === 0 ? 3 : i === 1 ? 1 : 0).map((h) => <Item key={h} texto={h} />)}
    </View>
  ))
}

export function CurriculoDocument({ profile }: { profile: Profile }) {
  const destaques = selecionarDestaques(profile, 5)
  const ms = profile.certifications.find((c) => c.id === 'microsoft-learning')
  const projetos = profile.projects.filter((p) => p.featured)
  return (
    <Document title={`Currículo — ${profile.name}`} author={profile.name} language="pt-BR" subject="Currículo" keywords="desenvolvedor, TypeScript, Python, Node.js">
      <Page size="A4" style={s.pagina}>
        <Text style={s.nome}>{profile.name}</Text>
        <Text style={s.cargo}>{profile.headline}</Text>
        <View style={s.contato}>
          <Link src={`mailto:${profile.email}`} style={s.contatoItem}>{profile.email}</Link>
          {profile.links.slice(0, 3).map((l) => <Link key={l.href} src={l.href} style={s.contatoItem}>{exibirLink(l.href)}</Link>)}
          <Text style={s.mudo}>{profile.location}</Text>
        </View>

        <Secao titulo="Resumo">
          <Text>{profile.summary[0]}</Text>
          <Text style={{ marginTop: 6 }}>{profile.summary[2]}</Text>
        </Secao>

        <Secao titulo="Experiência"><Experiencias profile={profile} /></Secao>

        <Secao titulo="Formação">
          {profile.education.map((e) => (
            <View key={e.institution + e.start} style={s.bloco} wrap={false}>
              <LinhaComData esquerda={<Text style={s.forte}>{e.institution}</Text>} data={`${mesAno(e.start)} – ${mesAno(e.end)}`} />
              <Text style={s.mudo}>{e.course}</Text>
              {e.note && <Text>{e.note}</Text>}
            </View>
          ))}
        </Secao>

        <Secao titulo="Projetos">
          {projetos.map((p) => (
            <View key={p.slug} style={s.bloco} wrap={false}>
              <Text><Text style={s.forte}>{p.title}</Text> <Text style={s.mudo}>· {p.role}</Text></Text>
              <Text>{primeiraFrase(p.summary)}</Text>
              <Text style={s.mudo}>{p.stack.slice(0, 6).join(' · ')}</Text>
            </View>
          ))}
        </Secao>

        <Secao titulo="Competências">
          {profile.skills.map((g) => <Text key={g.group} style={{ marginBottom: 4 }}><Text style={s.forte}>{g.group}: </Text>{g.items.join(', ')}</Text>)}
        </Secao>

        <Secao titulo="Certificações">
          {destaques.map((c) => <Text key={c.id} style={{ marginBottom: 3 }}>{c.issuer} — {c.title}{c.issued ? ` (${mesAno(c.issued)})` : ''}</Text>)}
          {ms?.items && <Text style={s.mudo}>Microsoft Learning: {ms.items.length} certificados (GitHub, IA, Copilot for Security)</Text>}
        </Secao>

        <Secao titulo="Idiomas">
          <Text>{profile.languages.map((i) => `${i.name} (${i.level})`).join(' · ')}</Text>
        </Secao>

        <View style={s.rodape} fixed>
          <Text>Atualizado em {dataCompleta(profile.updatedAt)}</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}
