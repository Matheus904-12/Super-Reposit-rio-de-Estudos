"""
Management command para popular banco de dados com dados iniciais da CPTM
"""
from django.core.management.base import BaseCommand
from apps.models import Linha, Estacao, Trem
from cptm_tracker.services.google_maps import maps_service

class Command(BaseCommand):
    help = 'Popula o banco de dados com dados iniciais da CPTM'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Iniciando população do banco de dados...'))
        
        # Criar linhas
        self.criar_linhas()
        
        # Criar estações
        self.criar_estacoes()
        
        # Criar trens iniciais
        self.criar_trens()
        
        self.stdout.write(self.style.SUCCESS('População do banco de dados concluída!'))

    def criar_linhas(self):
        linhas_data = [
            {'numero': '7', 'nome': 'Linha 7-Rubi', 'cor': '#FF6347', 'codigo': 'LIN7'},
            {'numero': '8', 'nome': 'Linha 8-Diamante', 'cor': '#FFD700', 'codigo': 'LIN8'},
            {'numero': '9', 'nome': 'Linha 9-Esmeralda', 'cor': '#2E8B57', 'codigo': 'LIN9'},
            {'numero': '10', 'nome': 'Linha 10-Turquesa', 'cor': '#9932CC', 'codigo': 'LIN10'},
            {'numero': '11', 'nome': 'Linha 11-Coral', 'cor': '#4169E1', 'codigo': 'LIN11'},
            {'numero': '12', 'nome': 'Linha 12-Safira', 'cor': '#DC143C', 'codigo': 'LIN12'},
            {'numero': '13', 'nome': 'Linha 13-Jade', 'cor': '#00FF7F', 'codigo': 'LIN13'},
        ]
        
        for linha_data in linhas_data:
            linha, created = Linha.objects.get_or_create(
                numero=linha_data['numero'],
                defaults=linha_data
            )
            if created:
                self.stdout.write(f'Linha criada: {linha.nome}')
            else:
                self.stdout.write(f'Linha já existe: {linha.nome}')

    def criar_estacoes(self):
        estacoes_data = {
            '7': [  # Linha 7-Rubi
                {'nome': 'Luz', 'lat': -23.534684, 'lng': -46.635199, 'ordem': 1, 'codigo': 'LUZ'},
                {'nome': 'Palmeiras-Barra Funda', 'lat': -23.527237, 'lng': -46.665668, 'ordem': 2, 'codigo': 'PBF'},
                {'nome': 'Água Branca', 'lat': -23.520150, 'lng': -46.681050, 'ordem': 3, 'codigo': 'AGB'},
                {'nome': 'Lapa', 'lat': -23.516033, 'lng': -46.700721, 'ordem': 4, 'codigo': 'LAP'},
                {'nome': 'Piqueri', 'lat': -23.505199, 'lng': -46.720368, 'ordem': 5, 'codigo': 'PIQ'},
                {'nome': 'Pirituba', 'lat': -23.485199, 'lng': -46.739368, 'ordem': 6, 'codigo': 'PIT'},
                {'nome': 'Vila Clarice', 'lat': -23.465199, 'lng': -46.740368, 'ordem': 7, 'codigo': 'VCL'},
                {'nome': 'Jaraguá', 'lat': -23.445199, 'lng': -46.741368, 'ordem': 8, 'codigo': 'JAR'},
                {'nome': 'Perus', 'lat': -23.410283, 'lng': -46.742836, 'ordem': 9, 'codigo': 'PER'},
                {'nome': 'Caieiras', 'lat': -23.366469, 'lng': -46.740847, 'ordem': 10, 'codigo': 'CAI'},
                {'nome': 'Franco da Rocha', 'lat': -23.324103, 'lng': -46.726461, 'ordem': 11, 'codigo': 'FRO'},
                {'nome': 'Baltazar Fidélis', 'lat': -23.305103, 'lng': -46.735461, 'ordem': 12, 'codigo': 'BAL'},
                {'nome': 'Francisco Morato', 'lat': -23.286847, 'lng': -46.744932, 'ordem': 13, 'codigo': 'FRM'},
                {'nome': 'Botujuru', 'lat': -23.250847, 'lng': -46.770932, 'ordem': 14, 'codigo': 'BOT'},
                {'nome': 'Campo Limpo Paulista', 'lat': -23.210847, 'lng': -46.800932, 'ordem': 15, 'codigo': 'CLP'},
                {'nome': 'Várzea Paulista', 'lat': -23.190847, 'lng': -46.830932, 'ordem': 16, 'codigo': 'VAP'},
                {'nome': 'Jundiaí', 'lat': -23.178453, 'lng': -46.887738, 'ordem': 17, 'codigo': 'JUN'},
            ],
            '8': [  # Linha 8-Diamante
                {'nome': 'Júlio Prestes', 'lat': -23.535484, 'lng': -46.637299, 'ordem': 1, 'codigo': 'JPR'},
                {'nome': 'Palmeiras-Barra Funda', 'lat': -23.527237, 'lng': -46.665668, 'ordem': 2, 'codigo': 'PBF'},
                {'nome': 'Lapa', 'lat': -23.516033, 'lng': -46.700721, 'ordem': 3, 'codigo': 'LAP'},
                {'nome': 'Domingos de Moraes', 'lat': -23.520033, 'lng': -46.720721, 'ordem': 4, 'codigo': 'DOM'},
                {'nome': 'Imperatriz Leopoldina', 'lat': -23.525033, 'lng': -46.750721, 'ordem': 5, 'codigo': 'IMP'},
                {'nome': 'Presidente Altino', 'lat': -23.530033, 'lng': -46.780721, 'ordem': 6, 'codigo': 'PAL'},
                {'nome': 'Osasco', 'lat': -23.532837, 'lng': -46.791898, 'ordem': 7, 'codigo': 'OSA'},
                {'nome': 'Quitaúna', 'lat': -23.530837, 'lng': -46.810898, 'ordem': 8, 'codigo': 'QUI'},
                {'nome': 'General Miguel Costa', 'lat': -23.525837, 'lng': -46.825898, 'ordem': 9, 'codigo': 'GMC'},
                {'nome': 'Carapicuíba', 'lat': -23.522337, 'lng': -46.835699, 'ordem': 10, 'codigo': 'CAR'},
                {'nome': 'Santa Terezinha', 'lat': -23.520337, 'lng': -46.845699, 'ordem': 11, 'codigo': 'STE'},
                {'nome': 'Antonio João', 'lat': -23.518337, 'lng': -46.855699, 'ordem': 12, 'codigo': 'ANJ'},
                {'nome': 'Barueri', 'lat': -23.510837, 'lng': -46.876199, 'ordem': 13, 'codigo': 'BAR'},
                {'nome': 'Jardim Belval', 'lat': -23.515837, 'lng': -46.885199, 'ordem': 14, 'codigo': 'JBE'},
                {'nome': 'Jardim Silveira', 'lat': -23.520837, 'lng': -46.895199, 'ordem': 15, 'codigo': 'JSI'},
                {'nome': 'Jandira', 'lat': -23.527837, 'lng': -46.902199, 'ordem': 16, 'codigo': 'JAN'},
                {'nome': 'Sagrado Coração', 'lat': -23.535837, 'lng': -46.915199, 'ordem': 17, 'codigo': 'SAG'},
                {'nome': 'Engenheiro Cardoso', 'lat': -23.540837, 'lng': -46.925199, 'ordem': 18, 'codigo': 'ENC'},
                {'nome': 'Itapevi', 'lat': -23.549337, 'lng': -46.933699, 'ordem': 19, 'codigo': 'ITA'},
                {'nome': 'Santa Rita', 'lat': -23.555337, 'lng': -46.943699, 'ordem': 20, 'codigo': 'SRI'},
                {'nome': 'Amador Bueno', 'lat': -23.565337, 'lng': -46.953699, 'ordem': 21, 'codigo': 'AMB'},
            ],
            '9': [  # Linha 9-Esmeralda (exemplo simplificado)
                {'nome': 'Osasco', 'lat': -23.532837, 'lng': -46.791898, 'ordem': 1, 'codigo': 'OSA'},
                {'nome': 'Ceasa', 'lat': -23.582837, 'lng': -46.751898, 'ordem': 2, 'codigo': 'CEA'},
                {'nome': 'Villa Lobos-Jaguaré', 'lat': -23.548337, 'lng': -46.724199, 'ordem': 3, 'codigo': 'VLJ'},
                {'nome': 'Cidade Universitária', 'lat': -23.558337, 'lng': -46.714199, 'ordem': 4, 'codigo': 'CUN'},
                {'nome': 'Pinheiros', 'lat': -23.561837, 'lng': -46.685199, 'ordem': 5, 'codigo': 'PIN'},
                {'nome': 'Hebraica-Rebouças', 'lat': -23.571837, 'lng': -46.665199, 'ordem': 6, 'codigo': 'HEB'},
                {'nome': 'Cidade Jardim', 'lat': -23.581837, 'lng': -46.645199, 'ordem': 7, 'codigo': 'CJA'},
                {'nome': 'Vila Olímpia', 'lat': -23.591837, 'lng': -46.625199, 'ordem': 8, 'codigo': 'VOL'},
                {'nome': 'Berrini', 'lat': -23.601837, 'lng': -46.605199, 'ordem': 9, 'codigo': 'BER'},
                {'nome': 'Morumbi', 'lat': -23.611837, 'lng': -46.585199, 'ordem': 10, 'codigo': 'MOR'},
                {'nome': 'Granja Julieta', 'lat': -23.631837, 'lng': -46.565199, 'ordem': 11, 'codigo': 'GJU'},
                {'nome': 'Santo Amaro', 'lat': -23.652337, 'lng': -46.702199, 'ordem': 12, 'codigo': 'SAM'},
                {'nome': 'Socorro', 'lat': -23.672337, 'lng': -46.722199, 'ordem': 13, 'codigo': 'SOC'},
                {'nome': 'Jurubatuba', 'lat': -23.692337, 'lng': -46.732199, 'ordem': 14, 'codigo': 'JUR'},
                {'nome': 'Autódromo', 'lat': -23.712337, 'lng': -46.742199, 'ordem': 15, 'codigo': 'AUT'},
                {'nome': 'Interlagos', 'lat': -23.732337, 'lng': -46.752199, 'ordem': 16, 'codigo': 'INT'},
                {'nome': 'Grajaú', 'lat': -23.777337, 'lng': -46.697199, 'ordem': 17, 'codigo': 'GRA'},
            ],
            '10': [  # Linha 10-Turquesa
                {'nome': 'Luz', 'lat': -23.534684, 'lng': -46.635199, 'ordem': 1, 'codigo': 'LUZ'},
                {'nome': 'Brás', 'lat': -23.525484, 'lng': -46.615299, 'ordem': 2, 'codigo': 'BRA'},
                {'nome': 'Mooca', 'lat': -23.535484, 'lng': -46.605299, 'ordem': 3, 'codigo': 'MOO'},
                {'nome': 'Ipiranga', 'lat': -23.592484, 'lng': -46.597299, 'ordem': 4, 'codigo': 'IPI'},
                {'nome': 'Tamanduateí', 'lat': -23.600484, 'lng': -46.580299, 'ordem': 5, 'codigo': 'TAM'},
                {'nome': 'São Caetano do Sul', 'lat': -23.618484, 'lng': -46.564299, 'ordem': 6, 'codigo': 'SCS'},
                {'nome': 'Utinga', 'lat': -23.635484, 'lng': -46.550299, 'ordem': 7, 'codigo': 'UTI'},
                {'nome': 'Prefeito Saladino', 'lat': -23.650484, 'lng': -46.545299, 'ordem': 8, 'codigo': 'PSA'},
                {'nome': 'Santo André', 'lat': -23.663484, 'lng': -46.537299, 'ordem': 9, 'codigo': 'SAN'},
                {'nome': 'Capuava', 'lat': -23.665484, 'lng': -46.510299, 'ordem': 10, 'codigo': 'CAP'},
                {'nome': 'Mauá', 'lat': -23.667484, 'lng': -46.461299, 'ordem': 11, 'codigo': 'MAU'},
                {'nome': 'Guapituba', 'lat': -23.690484, 'lng': -46.440299, 'ordem': 12, 'codigo': 'GUA'},
                {'nome': 'Ribeirão Pires', 'lat': -23.712484, 'lng': -46.413299, 'ordem': 13, 'codigo': 'RIP'},
                {'nome': 'Rio Grande da Serra', 'lat': -23.745484, 'lng': -46.398299, 'ordem': 14, 'codigo': 'RGS'},
            ],
            '11': [  # Linha 11-Coral
                {'nome': 'Luz', 'lat': -23.534684, 'lng': -46.635199, 'ordem': 1, 'codigo': 'LUZ'},
                {'nome': 'Brás', 'lat': -23.525484, 'lng': -46.615299, 'ordem': 2, 'codigo': 'BRA'},
                {'nome': 'Corinthians-Itaquera', 'lat': -23.540484, 'lng': -46.461299, 'ordem': 3, 'codigo': 'CIT'},
                {'nome': 'Dom Bosco', 'lat': -23.540484, 'lng': -46.440299, 'ordem': 4, 'codigo': 'DOB'},
                {'nome': 'José Bonifácio', 'lat': -23.539484, 'lng': -46.425299, 'ordem': 5, 'codigo': 'JBO'},
                {'nome': 'Guaianases', 'lat': -23.538484, 'lng': -46.407299, 'ordem': 6, 'codigo': 'GUA'},
                {'nome': 'Antonio Gianetti Neto', 'lat': -23.540484, 'lng': -46.385299, 'ordem': 7, 'codigo': 'AGN'},
                {'nome': 'Ferraz de Vasconcelos', 'lat': -23.541484, 'lng': -46.368299, 'ordem': 8, 'codigo': 'FVA'},
                {'nome': 'Poá', 'lat': -23.531484, 'lng': -46.345299, 'ordem': 9, 'codigo': 'POA'},
                {'nome': 'Calmon Viana', 'lat': -23.539484, 'lng': -46.319299, 'ordem': 10, 'codigo': 'CAV'},
                {'nome': 'Suzano', 'lat': -23.541484, 'lng': -46.311299, 'ordem': 11, 'codigo': 'SUZ'},
                {'nome': 'Jundiapeba', 'lat': -23.535484, 'lng': -46.250299, 'ordem': 12, 'codigo': 'JUN'},
                {'nome': 'Braz Cubas', 'lat': -23.530484, 'lng': -46.220299, 'ordem': 13, 'codigo': 'BCU'},
                {'nome': 'Mogi das Cruzes', 'lat': -23.522484, 'lng': -46.186299, 'ordem': 14, 'codigo': 'MOG'},
                {'nome': 'Estudantes', 'lat': -23.515484, 'lng': -46.175299, 'ordem': 15, 'codigo': 'EST'},
            ],
            '12': [  # Linha 12-Safira
                {'nome': 'Brás', 'lat': -23.525484, 'lng': -46.615299, 'ordem': 1, 'codigo': 'BRA'},
                {'nome': 'Tatuapé', 'lat': -23.538484, 'lng': -46.577299, 'ordem': 2, 'codigo': 'TAT'},
                {'nome': 'Engenheiro Goulart', 'lat': -23.521484, 'lng': -46.409299, 'ordem': 3, 'codigo': 'EGO'},
                {'nome': 'USP Leste', 'lat': -23.515484, 'lng': -46.430299, 'ordem': 4, 'codigo': 'USP'},
                {'nome': 'Comendador Ermelino', 'lat': -23.510484, 'lng': -46.450299, 'ordem': 5, 'codigo': 'CER'},
                {'nome': 'São Miguel Paulista', 'lat': -23.498484, 'lng': -46.443299, 'ordem': 6, 'codigo': 'SMP'},
                {'nome': 'Jardim Helena-Vila Mara', 'lat': -23.485484, 'lng': -46.425299, 'ordem': 7, 'codigo': 'JHV'},
                {'nome': 'Itaim Paulista', 'lat': -23.475484, 'lng': -46.405299, 'ordem': 8, 'codigo': 'ITP'},
                {'nome': 'Jardim Romano', 'lat': -23.465484, 'lng': -46.385299, 'ordem': 9, 'codigo': 'JRO'},
                {'nome': 'Engenheiro Manoel Feio', 'lat': -23.455484, 'lng': -46.365299, 'ordem': 10, 'codigo': 'EMF'},
                {'nome': 'Itaquaquecetuba', 'lat': -23.479484, 'lng': -46.343299, 'ordem': 11, 'codigo': 'ITQ'},
                {'nome': 'Aracaré', 'lat': -23.490484, 'lng': -46.330299, 'ordem': 12, 'codigo': 'ARA'},
                {'nome': 'Calmon Viana', 'lat': -23.539484, 'lng': -46.319299, 'ordem': 13, 'codigo': 'CAV'},
            ],
            '13': [  # Linha 13-Jade
                {'nome': 'Engenheiro Goulart', 'lat': -23.521484, 'lng': -46.409299, 'ordem': 1, 'codigo': 'EGO'},
                {'nome': 'Guarulhos-Cecap', 'lat': -23.466484, 'lng': -46.536299, 'ordem': 2, 'codigo': 'GCE'},
                {'nome': 'Aeroporto-Guarulhos', 'lat': -23.435484, 'lng': -46.473299, 'ordem': 3, 'codigo': 'AER'},
            ]
        }
        
        for linha_numero, estacoes_lista in estacoes_data.items():
            try:
                linha = Linha.objects.get(numero=linha_numero)
                
                for estacao_data in estacoes_lista:
                    estacao, created = Estacao.objects.get_or_create(
                        codigo=estacao_data['codigo'],
                        defaults={
                            'nome': estacao_data['nome'],
                            'linha': linha,
                            'latitude': estacao_data['lat'],
                            'longitude': estacao_data['lng'],
                            'ordem': estacao_data['ordem'],
                            'acessivel': estacao_data.get('acessivel', False),
                            'tem_elevador': estacao_data.get('tem_elevador', False),
                            'tem_escada_rolante': estacao_data.get('tem_escada_rolante', False),
                        }
                    )
                    if created:
                        self.stdout.write(f'Estação criada: {estacao.nome} ({linha.nome})')
                
            except Linha.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'Linha {linha_numero} não encontrada'))

    def criar_trens(self):
        linhas = Linha.objects.all()
        
        for linha in linhas:
            # Criar 8-12 trens por linha
            num_trens = 10
            
            for i in range(1, num_trens + 1):
                identificador = f"T{linha.numero}{i:02d}"
                
                trem, created = Trem.objects.get_or_create(
                    identificador=identificador,
                    defaults={
                        'linha': linha,
                        'status': 'operacional',
                        'lotacao': 'baixa',
                        'velocidade': 0,
                        'direcao': 'Terminal'
                    }
                )
                
                if created:
                    self.stdout.write(f'Trem criado: {trem.identificador} ({linha.nome})')

        self.stdout.write(self.style.SUCCESS(f'Total de trens criados: {Trem.objects.count()}'))