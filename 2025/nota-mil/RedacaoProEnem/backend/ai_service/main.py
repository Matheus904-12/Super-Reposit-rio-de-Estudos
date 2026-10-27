import fastapi
import uvicorn
import language_tool_python
from pydantic import BaseModel
import re

# Inicializando a ferramenta de verificação gramatical
tool = language_tool_python.LanguageTool('pt-BR')

app = fastapi.FastAPI()

class RedacaoRequest(BaseModel):
    texto: str

def contar_paragrafos(texto):
    # Um parágrafo é definido por uma ou mais quebras de linha
    paragrafos = [p for p in texto.split('\n') if p.strip()]
    return len(paragrafos)

def avaliar_c1(texto):
    erros = tool.check(texto)
    num_erros = len(erros)
    # Pontuação inversamente proporcional ao número de erros
    # Normalizado para a escala de 0 a 200 do ENEM
    nota = max(0, 200 - (num_erros * 20)) 
    comentario = f"Foram encontrados {num_erros} erros gramaticais ou de digitação."
    if nota == 200:
        comentario = "Excelente domínio da norma culta da língua portuguesa."
    return nota, comentario

def avaliar_c2(texto):
    num_palavras = len(texto.split())
    num_paragrafos = contar_paragrafos(texto)
    
    nota = 0
    if num_palavras < 150:
        nota = 40
        comentario = "Texto muito curto, com estrutura de parágrafos insuficiente."
    elif num_paragrafos < 3:
        nota = 80
        comentario = "A estrutura do texto não atende claramente à organização dissertativa-argumentativa com introdução, desenvolvimento e conclusão."
    elif num_palavras > 250 and num_paragrafos >= 3:
        nota = 200
        comentario = "Demonstrou boa compreensão do tema e da estrutura dissertativa-argumentativa."
    else:
        nota = 120
        comentario = "Estrutura textual básica, mas com necessidade de maior desenvolvimento."
        
    return nota, comentario

def avaliar_c3_c4(texto):
    # Verifica a presença de conectivos que indicam argumentação e coesão
    conectivos = [
        'portanto', 'logo', 'entretanto', 'contudo', 'todavia', 'no entanto', 
        'além disso', 'ademais', 'assim', 'dessa forma', 'primeiramente', 
        'segundamente', 'em suma', 'conclui-se'
    ]
    encontrados = [c for c in conectivos if re.search(r'\b' + c + r'\b', texto, re.IGNORECASE)]
    
    nota = 0
    if len(encontrados) > 5:
        nota = 200
        comentario = "Bom uso de articuladores e conectivos, demonstrando coesão e coerência."
    elif len(encontrados) > 2:
        nota = 120
        comentario = "Utiliza alguns conectivos, mas pode melhorar a articulação entre as partes do texto."
    else:
        nota = 40
        comentario = "Baixo uso de conectivos, o que prejudica a coesão e a fluidez do texto."
        
    return nota, comentario

def avaliar_c5(texto):
    # Verifica a presença de elementos de uma proposta de intervenção
    agentes = ['governo', 'mídia', 'sociedade', 'escola', 'família', 'ministério', 'ong']
    acoes = ['criar', 'implementar', 'desenvolver', 'promover', 'garantir', 'investir', 'conscientizar']
    
    agentes_encontrados = any(re.search(r'\b' + a + r'\b', texto, re.IGNORECASE) for a in agentes)
    acoes_encontradas = any(re.search(r'\b' + a + r'\b', texto, re.IGNORECASE) for a in acoes)
    
    nota = 0
    if agentes_encontrados and acoes_encontradas:
        nota = 200
        comentario = "Elaborou uma proposta de intervenção completa e articulada com a discussão."
    elif agentes_encontrados or acoes_encontradas:
        nota = 120
        comentario = "Apresentou uma proposta de intervenção, mas falta detalhamento de algum elemento (agente, ação, meio/modo, finalidade)."
    else:
        nota = 0
        comentario = "Não apresentou uma proposta de intervenção ou a proposta não se relaciona ao tema."
        
    return nota, comentario


@app.post("/evaluate")
async def evaluate_redacao(req: RedacaoRequest):
    texto = req.texto
    
    c1_nota, c1_comentario = avaliar_c1(texto)
    c2_nota, c2_comentario = avaliar_c2(texto)
    c3_c4_nota, c3_c4_comentario = avaliar_c3_c4(texto)
    c5_nota, c5_comentario = avaliar_c5(texto)

    competencias = [
      { "nome": "Competência 1", "nota": c1_nota, "comentario": c1_comentario },
      { "nome": "Competência 2", "nota": c2_nota, "comentario": c2_comentario },
      { "nome": "Competência 3", "nota": c3_c4_nota, "comentario": c3_c4_comentario },
      { "nome": "Competência 4", "nota": c3_c4_nota, "comentario": "A nota da C4 é agrupada com a C3 nesta análise inicial." },
      { "nome": "Competência 5", "nota": c5_nota, "comentario": c5_comentario }
    ]

    return {"competencias": competencias}

@app.get("/")
def root():
    return {"message": "Serviço de IA para avaliação de redação está rodando."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
