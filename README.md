Olá, 
sou Juliana e vou apresentar um pouco do projeto que eu fiz.

## Getting Started
Este projeto foi desenvolvido usando:
  React + Next.js
  Material-ui
  Jest + React Testing Library

### To Run

- Para executar clone o repositório
- Abra o projeto na sua IDE de preferencia, eu recomendo Visual Studio Code
- Utilize o node 18 - normalmente eu uso: `nvm use 18`
- No mesmo terminal dê um `npm install`
- E por fim, `npm run dev`
- Abra [http://localhost:3000](http://localhost:3000) no browser para usar o aplicativo

- Se quiser executar os testes unitários pode usar `npm test`

## Explicações
1. Criei um arquivo **theme** de configurações globais para ter pelo menos as cores mais utilizadas
3. Como arquitetura segui:
  - imagens na pasta /public
  - pages na pasta /src/app -> separei por paginas
  - componentes na pasta /src/components -> toda page é bem simples e todo componente esta nesta pasta
  - objetos json na pasta /src/data -> como não fiz uma chamada de api usei json
  - routes é uma constante para deixar as rotas mais organizadas na pasta /src/lib
  - menus e stores são os fetchs para api na pasta /src/lib
  - e um arquivo de utils que usei para gravar na localStore na src/lib
  - dentro de cada /components tem arquivos de testes unitários relacionados aos componentes

**Melhorias**
1. Adicionei alguns testes unitários, mas acho legal falar que uma melhoria seria adição de testes snapshots e testes de integração (como cypress)
2. A última tela (ticket) só possui um pedido, fazer mais pedidos e exibir uma lista seria uma melhoria
3. Na última tela os botões de adicionar, remover ou editar também não possuem uma lógica, seria mais um ponto de melhoria


## Video demonstrativo
Segue um video passando pelo aplicativo
1. Usei mobile-first como abordagem porém deixei responsivo
2. A parte principal possui um campo de busca e a lista de itens abertos e fechados
3. Ao clicar numa loja o usuario é redirecionado para a tela do Menu
4. As informações no começo da tela estão hardcoded, somente mudando a taxa de entrega e a avaliação
5. A lista de produtos aparece de acordo com a chamada a api (no caso um json no front mesmo)
6. Nessa lista temos o icone aparecendo caso tenha um item em promoção e adicionei um texto vazio caso não tenha elementos
7. Ao clicar no item o usuario é redirecionado para a tela de pedidos
8. Nesta tela eu deixei apenas algumas seções como obrigatórias, por exemplo a seção para adicionar o item, a seção para escolher o tamanho, para escolher uma bebida e observação
9. Após adicionar o item que o botão de seguir com o pedido aparece
10. Então a última tela mostra o pedido feito e ao finalizar coloquei um Dialog de sucesso onde o usuário pode fazer um novo pedido




https://github.com/user-attachments/assets/f65a0245-bbf5-404a-99b8-0eef616e2a7c






