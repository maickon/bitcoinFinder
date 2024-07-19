# bitcoinFinder
Código para achar bitcoins das carteiras puzzle do desafio 🔥 ~1000 BTC Bitcoin Challenge Transaction

# Sobre o código

Este projeto tomou como base o canal do Youtube Investidor Internacional que originalmente criou o código base. Este projeto apenas adaptou o código fonte para o ambiente do GoogleAppScripts.

# Referências

* Canal Investidor Internacional: <https://www.youtube.com/@investidorint>
* Video sobre o código original: <https://www.youtube.com/watch?v=uIg-GsUgdFE&t>
* Código original: <https://github.com/lmajowka/webloteria>
* Projeto Web Loteria: <https://lmajowka.github.io/webloteria/>

# Sobre o Projeto

Desde a primeira vez que conheci o canal, eu achei interesante o projeto mas sempre imaginei que o ideal seria que este script rodasse sozinho sem minha intervenção. Por isso, quando percebi que seria possível implementa-lo dentro do GoogleAppScript, eu acreditei que seria interessante ter um código que procurasse resolver os puzzles do desafio 🔥 ~1000 BTC Bitcoin Challenge Transaction diariamente sem que eu precisasse ficar rodando o código manualmente.

# Sobre o desafio 🔥 ~1000 BTC Bitcoin Challenge Transaction

Para quem não conhece, em 2015, para mostrar toda a imensidão do espaço da chave privada (ou talvez apenas por diversão), alguém criou um “quebra-cabeça” onde ela disponibilizava um range (intervalo entre dois espaços) de chaves privadas e o endereço de sua respectiva carteira Bitcoin.

Dessa forma, seguindo as regras sobre os algoritimos criptográficos que regem o Bitcoin, podemos ser capazes de descobrir a chave privada de uma carteira Bitcoin simplesmente sorteando os dos valores deste range e verificando através dos algoritmos criptográficos se aquela chave privada escolhida gera uma chave pública de carteira Bitcoin. Caso esta verificação seja verdadeira, meu parabéns! você acaba de ganhar uma bolada na loteria Bitcoin!

Desta forma, tudo que o código deste projeto busca resolver é encontrar uma chave privada válida dentro da imensidão deste esppaço. Como é matemáticamente quase impossível achar este valor. O criador deste desafio o fez com total segurança de que ele nunca seria completado. Só para você ter uma ideia da grandeza deste espaço, imagina esconder algo no universo que pode estar dentro de qualquer lugar, inclusive de um átomo. 

Você é livre para iniciar a sua busca a partir de qualquer ponto no universo. Mas depois de iniciado a busca, você só dependerá de suas pernas para se locomover. Conseguiu imaginar isso? Esse é um exemplo do grau de dificuldade que você vai enfrentar ao tentar achar uma chave provada usando este script. 

## Nível de dificuldade

Obsever o grau de dificuldade pela imagem abaixo:

![Tabela de tamanho do espaço](https://privatekeys.pw/images/puzzles/bitcoin-puzzle-tx.jpg)

# Histórico do Desafio

* 15/01/2015: Foi criada uma transação de transferência para 256 endereços Bitcoin diferentes.
* 11/07/2017: Os fundos dos endereços #161—256 foram transferidos para o mesmo número de endereços da faixa inferior. Aumentando assim a quantidade de fundos neles.
* 31-05-2019: O criador dos "quebra-cabeças" cria transações de saída no valor de 1000 satoshi para os endereços #65, #70, #75, #80, #85, #90, #95, #100, #105 , #110, #115, #120, #125, #130, #135, #140, #145, #150, #155, #160 com o objetivo de provavelmente comparar a dificuldade de encontrar uma chave privada para o endereço de qual tal transação foi realizada e outra que não há transação.
* 16/04/2023: Alguém (talvez o próprio criado do desafio) aumentou novamente os prêmios dos quebra-cabeças não resolvidos em x10. Agora, o prêmio do quebra-cabeça nº 66 é 6,6 BTC, o prêmio nº 67 é 6,7 BTC e assim por diante... o prêmio do quebra-cabeça nº 160 é 16 BTC.