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
            {'numero': '11', 'nome': 'Linha 11-Coral', 'cor': '#FF7F50', 'codigo': 'LIN11'},
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
                {'nome': 'Luz', 'lat': -23.534684, 'lng': -46.635199, 'ordem': 1, 'codigo': 'LUZ7'},
                {'nome': 'Palmeiras-Barra Funda', 'lat': -23.527237, 'lng': -46.665668, 'ordem': 2, 'codigo': 'PBF7'},
                {'nome': 'Água Branca', 'lat': -23.520150, 'lng': -46.681050, 'ordem': 3, 'codigo': 'AGB7'},
                {'nome': 'Lapa', 'lat': -23.516033, 'lng': -46.700721, 'ordem': 4, 'codigo': 'LAP7'},
                {'nome': 'Piqueri', 'lat': -23.505199, 'lng': -46.720368, 'ordem': 5, 'codigo': 'PIQ7'},
                {'nome': 'Pirituba', 'lat': -23.485199, 'lng': -46.739368, 'ordem': 6, 'codigo': 'PIT7'},
                {'nome': 'Vila Clarice', 'lat': -23.465199, 'lng': -46.740368, 'ordem': 7, 'codigo': 'VCL7'},
                {'nome': 'Jaraguá', 'lat': -23.445199, 'lng': -46.741368, 'ordem': 8, 'codigo': 'JAR7'},
                {'nome': 'Perus', 'lat': -23.410283, 'lng': -46.742836, 'ordem': 9, 'codigo': 'PER7'},
                {'nome': 'Caieiras', 'lat': -23.366469, 'lng': -46.740847, 'ordem': 10, 'codigo': 'CAI7'},
                {'nome': 'Franco da Rocha', 'lat': -23.324103, 'lng': -46.726461, 'ordem': 11, 'codigo': 'FRO7'},
                {'nome': 'Baltazar Fidélis', 'lat': -23.305103, 'lng': -46.735461, 'ordem': 12, 'codigo': 'BAL7'},
                {'nome': 'Francisco Morato', 'lat': -23.286847, 'lng': -46.744932, 'ordem': 13, 'codigo': 'FRM7'},
                {'nome': 'Botujuru', 'lat': -23.250847, 'lng': -46.770932, 'ordem': 14, 'codigo': 'BOT7'},
                {'nome': 'Campo Limpo Paulista', 'lat': -23.210847, 'lng': -46.800932, 'ordem': 15, 'codigo': 'CLP7'},
                {'nome': 'Várzea Paulista', 'lat': -23.190847, 'lng': -46.830932, 'ordem': 16, 'codigo': 'VAP7'},
                {'nome': 'Jundiaí', 'lat': -23.178453, 'lng': -46.887738, 'ordem': 17, 'codigo': 'JUN7'},
            ],
            '8': [  # Linha 8-Diamante
                {'nome': 'Júlio Prestes', 'lat': -23.535484, 'lng': -46.637299, 'ordem': 1, 'codigo': 'JPR8'},
                {'nome': 'Palmeiras-Barra Funda', 'lat': -23.527237, 'lng': -46.665668, 'ordem': 2, 'codigo': 'PBF8'},
                {'nome': 'Lapa', 'lat': -23.516033, 'lng': -46.700721, 'ordem': 3, 'codigo': 'LAP8'},
                {'nome': 'Domingos de Moraes', 'lat': -23.520033, 'lng': -46.720721, 'ordem': 4, 'codigo': 'DOM8'},
                {'nome': 'Imperatriz Leopoldina', 'lat': -23.525033, 'lng': -46.750721, 'ordem': 5, 'codigo': 'IMP8'},
                {'nome': 'Presidente Altino', 'lat': -23.530033, 'lng': -46.780721, 'ordem': 6, 'codigo': 'PAL8'},
                {'nome': 'Osasco', 'lat': -23.532837, 'lng': -46.791898, 'ordem': 7, 'codigo': 'OSA8'},
                {'nome': 'Quitaúna', 'lat': -23.530837, 'lng': -46.810898, 'ordem': 8, 'codigo': 'QUI8'},
                {'nome': 'General Miguel Costa', 'lat': -23.525837, 'lng': -46.825898, 'ordem': 9, 'codigo': 'GMC8'},
                {'nome': 'Carapicuíba', 'lat': -23.522337, 'lng': -46.835699, 'ordem': 10, 'codigo': 'CAR8'},
                {'nome': 'Santa Terezinha', 'lat': -23.520337, 'lng': -46.845699, 'ordem': 11, 'codigo': 'STE8'},
                {'nome': 'Antonio João', 'lat': -23.518337, 'lng': -46.855699, 'ordem': 12, 'codigo': 'ANJ8'},
                {'nome': 'Barueri', 'lat': -23.510837, 'lng': -46.876199, 'ordem': 13, 'codigo': 'BAR8'},
                {'nome': 'Jardim Belval', 'lat': -23.515837, 'lng': -46.885199, 'ordem': 14, 'codigo': 'JBE8'},
                {'nome': 'Jardim Silveira', 'lat': -23.520837, 'lng': -46.895199, 'ordem': 15, 'codigo': 'JSI8'},
                {'nome': 'Jandira', 'lat': -23.527837, 'lng': -46.902199, 'ordem': 16, 'codigo': 'JAN8'},
                {'nome': 'Sagrado Coração', 'lat': -23.535837, 'lng': -46.915199, 'ordem': 17, 'codigo': 'SAG8'},
                {'nome': 'Engenheiro Cardoso', 'lat': -23.540837, 'lng': -46.925199, 'ordem': 18, 'codigo': 'ENC8'},
                {'nome': 'Itapevi', 'lat': -23.549337, 'lng': -46.933699, 'ordem': 19, 'codigo': 'ITA8'},
                {'nome': 'Santa Rita', 'lat': -23.555337, 'lng': -46.943699, 'ordem': 20, 'codigo': 'SRI8'},
                {'nome': 'Amador Bueno', 'lat': -23.565337, 'lng': -46.953699, 'ordem': 21, 'codigo': 'AMB8'},
            ],
            '10': [  # Linha 10-Turquesa
                {'nome': 'Luz', 'lat': -23.534684, 'lng': -46.635199, 'ordem': 1, 'codigo': 'LUZ10'},
                {'nome': 'Brás', 'lat': -23.525484, 'lng': -46.615299, 'ordem': 2, 'codigo': 'BRA10'},
                {'nome': 'Mooca', 'lat': -23.535484, 'lng': -46.605299, 'ordem': 3, 'codigo': 'MOO10'},
                {'nome': 'Ipiranga', 'lat': -23.592484, 'lng': -46.597299, 'ordem': 4, 'codigo': 'IPI10'},
                {'nome': 'Tamanduateí', 'lat': -23.600484, 'lng': -46.580299, 'ordem': 5, 'codigo': 'TAM10'},
                {'nome': 'São Caetano do Sul', 'lat': -23.618484, 'lng': -46.564299, 'ordem': 6, 'codigo': 'SCS10'},
                {'nome': 'Utinga', 'lat': -23.635484, 'lng': -46.550299, 'ordem': 7, 'codigo': 'UTI10'},
                {'nome': 'Prefeito Saladino', 'lat': -23.650484, 'lng': -46.545299, 'ordem': 8, 'codigo': 'PSA10'},
                {'nome': 'Santo André', 'lat': -23.663484, 'lng': -46.537299, 'ordem': 9, 'codigo': 'SAN10'},
                {'nome': 'Capuava', 'lat': -23.665484, 'lng': -46.510299, 'ordem': 10, 'codigo': 'CAP10'},
                {'nome': 'Mauá', 'lat': -23.667484, 'lng': -46.461299, 'ordem': 11, 'codigo': 'MAU10'},
                {'nome': 'Guapituba', 'lat': -23.690484, 'lng': -46.440299, 'ordem': 12, 'codigo': 'GUA10'},
                {'nome': 'Ribeirão Pires', 'lat': -23.712484, 'lng': -46.413299, 'ordem': 13, 'codigo': 'RIP10'},
                {'nome': 'Rio Grande da Serra', 'lat': -23.745484, 'lng': -46.398299, 'ordem': 14, 'codigo': 'RGS10'},
            ],
            '11': [  # Linha 11-Coral (Estudantes - Barra Funda)
                {'nome': 'Estudantes', 'lat': -23.551800, 'lng': -46.316100, 'ordem': 1, 'codigo': 'EST11'},
                {'nome': 'Cidade Patriarca', 'lat': -23.541000, 'lng': -46.331600, 'ordem': 2, 'codigo': 'CPA11'},
                {'nome': 'Artur Alvim', 'lat': -23.538700, 'lng': -46.380800, 'ordem': 3, 'codigo': 'AAL11'},
                {'nome': 'Corinthians-Itaquera', 'lat': -23.545500, 'lng': -46.464700, 'ordem': 4, 'codigo': 'CIT11'},
                {'nome': 'Dom Bosco', 'lat': -23.540300, 'lng': -46.481900, 'ordem': 5, 'codigo': 'DBO11'},
                {'nome': 'José Bonifácio', 'lat': -23.537100, 'lng': -46.500200, 'ordem': 6, 'codigo': 'JBO11'},
                {'nome': 'Guaianases', 'lat': -23.533900, 'lng': -46.518500, 'ordem': 7, 'codigo': 'GUA11'},
                {'nome': 'Antonio Gianetti Neto', 'lat': -23.530700, 'lng': -46.536800, 'ordem': 8, 'codigo': 'AGN11'},
                {'nome': 'Ferraz de Vasconcelos', 'lat': -23.527500, 'lng': -46.555100, 'ordem': 9, 'codigo': 'FVA11'},
                {'nome': 'Poá', 'lat': -23.524300, 'lng': -46.573400, 'ordem': 10, 'codigo': 'POA11'},
                {'nome': 'Calmon Viana', 'lat': -23.521100, 'lng': -46.591700, 'ordem': 11, 'codigo': 'CVA11'},
                {'nome': 'Suzano', 'lat': -23.517900, 'lng': -46.610000, 'ordem': 12, 'codigo': 'SUZ11'},
                {'nome': 'Jundiapeba', 'lat': -23.514700, 'lng': -46.628300, 'ordem': 13, 'codigo': 'JUN11'},
                {'nome': 'Braz Cubas', 'lat': -23.511500, 'lng': -46.646600, 'ordem': 14, 'codigo': 'BCU11'},
                {'nome': 'Mogi das Cruzes', 'lat': -23.508300, 'lng': -46.664900, 'ordem': 15, 'codigo': 'MOG11'},
                {'nome': 'Estudantes', 'lat': -23.505100, 'lng': -46.683200, 'ordem': 16, 'codigo': 'EST211'},
                {'nome': 'Luz', 'lat': -23.534684, 'lng': -46.635199, 'ordem': 17, 'codigo': 'LUZ11'},
                {'nome': 'Palmeiras-Barra Funda', 'lat': -23.527237, 'lng': -46.665668, 'ordem': 18, 'codigo': 'PBF11'},
            ],
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