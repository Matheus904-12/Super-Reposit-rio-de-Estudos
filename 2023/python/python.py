import matplotlib.pyplot as plt

# Criar um lista de países e suas diferenças com o Canadá
paises = ["Brasil", "Índia", "China", "Rússia", "França", "Coreia do Sul", "Estados Unidos", "Japão", "Reino Unido", "Alemanha", "Itália", "Austrália"]
diferenca = [0.167, 0.281, 0.170, 0.104, 0.097, 0.092, 0.098, 0.097, 0.098, 0.096, 0.045, 0.011]

# Criar um gráfico de colunas
plt.bar(paises, diferenca, width=0.5, color="blue")

# Adicionar um título e labels aos eixos
plt.title("Diferença entre os IDHs dos países e o Canadá")
plt.xlabel("Países")
plt.ylabel("Diferença")

# Mostrar o gráfico
plt.show()
