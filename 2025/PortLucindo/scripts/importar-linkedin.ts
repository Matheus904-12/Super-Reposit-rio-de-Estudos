// Uso: npm run cv:importar -- caminho/para/Basic_LinkedInDataExport.zip
// Só imprime o que mudou. Nunca grava nada: quem aplica é o Senhor, ou o comando /atualizar-curriculo, depois do "ok".
import { execFileSync } from 'node:child_process'
import { parseCsv, diffPerfil } from '../src/lib/linkedin-csv'
import { publicProfile } from '../src/content/publico'

const zip = process.argv[2]
if (!zip) { console.error('Informe o .zip do export oficial do LinkedIn.'); process.exit(1) }

const ler = (arquivo: string) => {
  try { return parseCsv(execFileSync('unzip', ['-p', zip, arquivo], { encoding: 'utf8' })) } catch { return [] }
}
const diff = diffPerfil(publicProfile, { positions: ler('Positions.csv'), education: ler('Education.csv'), certifications: ler('Certifications.csv') })
console.log(diff.length ? diff.join('\n') : 'Nada novo no export em relação ao perfil.')
