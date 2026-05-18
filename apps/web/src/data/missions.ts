export interface BriefingStep {
  title: string;
  explanation: string;
  code: string;
  language?: string;
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  initialCode: string;
  testCode: string;
  npcMessages: { npc: string; message: string; role: string; type: 'danger' | 'accent' | 'primary' }[];
  xpReward: number;
  briefing: BriefingStep[];
}

export const missions: Mission[] = [
  {
    id: 1,
    title: "Ambiente e Fundamentos",
    description: "Primeiro dia na empresa. Prove que sabe o básico: criar variáveis e logar no console do Node.js.",
    objectives: [
      "Criar uma variável chamada 'companyName'",
      "Atribuir exatamente o valor 'CodeHighTech'",
      "Imprimir o valor no console usando console.log()"
    ],
    initialCode: "// Bem-vindo(a) ao primeiro dia!\n// Crie a variável 'companyName' e exiba no console.\n\n",
    testCode: `
const fs = require('fs');
try {
  const code = fs.readFileSync('index.js', 'utf-8');
  if (!code.includes('companyName')) throw new Error("A variável 'companyName' não foi encontrada.");
  if (!code.includes('CodeHighTech')) throw new Error("O valor da variável não parece ser 'CodeHighTech'.");
  if (!code.includes('console.log')) throw new Error("Você não está usando console.log.");
  console.log("SUCESSO_VALIDACAO");
} catch(e) {
  console.error("FALHA:", e.message);
}
    `,
    npcMessages: [
      { npc: 'R', message: 'Espero que saiba declarar variáveis básicas em JavaScript.', role: 'Rafael (CTO)', type: 'danger' },
      { npc: 'C', message: 'Oi! Me avise quando o ambiente estiver pronto!', role: 'Camila (PM)', type: 'accent' }
    ],
    xpReward: 100,
    briefing: [
      {
        title: "Variáveis em JavaScript",
        explanation: "Em JavaScript, você declara variáveis com `const` (valor que não muda) ou `let` (valor que pode mudar). Evite `var` — é uma forma antiga com comportamentos imprevisíveis.",
        code: `const companyName = 'CodeHighTech'; // não muda
let counter = 0;                     // pode mudar

counter = 1;  // OK
// companyName = 'outro'; // ERRO: const não pode ser reatribuído`
      },
      {
        title: "Exibindo no Console",
        explanation: "O `console.log()` imprime informações no terminal. É a ferramenta mais básica para debugar e conferir se seu código está funcionando.",
        code: `const companyName = 'CodeHighTech';

console.log(companyName);            // CodeHighTech
console.log('Empresa:', companyName); // Empresa: CodeHighTech
console.log(typeof companyName);     // string`
      },
      {
        title: "Rodando no Node.js",
        explanation: "Node.js permite executar JavaScript fora do browser. Seus arquivos têm extensão `.js` e você roda com `node index.js` no terminal.",
        code: `// index.js
const companyName = 'CodeHighTech';
console.log(companyName);

// No terminal:
// $ node index.js
// CodeHighTech`
      }
    ]
  },
  {
    id: 2,
    title: "Primeira API REST",
    description: "A Camila pediu um endpoint urgente para a equipe do App Mobile testar a conexão com o servidor.",
    objectives: [
      "Importar o Express com require()",
      "Criar uma rota GET em '/'",
      "Retornar o JSON exato: { status: 'ok', api: 'CodeHighTech' }",
      "Deixar o servidor ouvindo na porta 3000"
    ],
    initialCode: "const express = require('express');\n\nconst app = express();\n\n// Sua lógica aqui\n\n",
    testCode: `
const { spawn } = require('child_process');
const http = require('http');

const server = spawn('node', ['index.js']);
console.log("Aguardando o servidor subir na porta 3000...");

setTimeout(() => {
  http.get('http://localhost:3000/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      server.kill();
      try {
        const json = JSON.parse(data);
        if (json.status === 'ok' && json.api === 'CodeHighTech') {
          console.log("SUCESSO_VALIDACAO");
        } else {
          console.error("FALHA: JSON incorreto. Recebido: " + data);
        }
      } catch (e) {
        console.error("FALHA: A resposta não é um JSON válido.");
      }
    });
  }).on('error', () => {
    server.kill();
    console.error("FALHA: Não foi possível conectar na porta 3000.");
  });
}, 2500);
    `,
    npcMessages: [
      { npc: 'C', message: 'O pessoal do mobile precisa dessa rota URGENTE! Suba na porta 3000.', role: 'Camila (PM)', type: 'accent' },
      { npc: 'R', message: 'Use res.json() e não coloque lógica toda misturada. Faça funcionar primeiro.', role: 'Rafael (CTO)', type: 'danger' }
    ],
    xpReward: 250,
    briefing: [
      {
        title: "O que é Express?",
        explanation: "Express é o framework web mais popular do Node.js. Com ele você cria servidores HTTP com rotas e respostas em poucas linhas. É a base da maioria das APIs em Node.",
        code: `const express = require('express');

const app = express();

// Toda requisição GET em '/' cai aqui
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000);`
      },
      {
        title: "Métodos HTTP — O CRUD",
        explanation: "Cada método HTTP tem um significado para operações de dados. Isso é a base de toda API REST profissional.",
        code: `app.get('/users', ...)       // READ — buscar dados
app.post('/users', ...)      // CREATE — criar registro
app.put('/users/:id', ...)   // UPDATE — atualizar registro
app.delete('/users/:id', ...) // DELETE — remover registro

// Sua tarefa agora: implementar o GET em '/'`
      },
      {
        title: "Respondendo com JSON",
        explanation: "Use `res.json()` para retornar objetos. Ele automaticamente define o header `Content-Type: application/json` e serializa o objeto.",
        code: `app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    api: 'CodeHighTech'
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});`
      }
    ]
  },
  {
    id: 3,
    title: "Banco de Dados (Prisma ORM)",
    description: "O MVP está rodando, mas os dados somem ao reiniciar. Modele a tabela de usuários com Prisma.",
    objectives: [
      "Criar um arquivo chamado 'schema.prisma'",
      "Definir o generator client e o datasource (sqlite)",
      "Criar um 'model User' com id, email (@unique) e name",
      "No index.js, instanciar o PrismaClient"
    ],
    initialCode: "const { PrismaClient } = require('@prisma/client');\n\n// Instancie o Prisma aqui...\n",
    testCode: `
const fs = require('fs');
try {
  let schema = '';
  try {
    schema = fs.readFileSync('schema.prisma', 'utf-8');
  } catch(e) {
    throw new Error("O arquivo 'schema.prisma' não foi encontrado. Crie-o no Explorer.");
  }

  if (!schema.includes('model User')) throw new Error("O 'model User' não foi encontrado no schema.prisma.");
  if (!schema.includes('email') || !schema.includes('String')) throw new Error("O model User precisa ter o campo email como String.");
  
  const index = fs.readFileSync('index.js', 'utf-8');
  if (!index.includes('PrismaClient')) throw new Error("Você esqueceu de instanciar o PrismaClient no index.js.");
  
  console.log("SUCESSO_VALIDACAO");
} catch(e) {
  console.error("FALHA:", e.message);
}
    `,
    npcMessages: [
      { npc: 'R', message: 'Pense nas regras de unicidade. Email duplicado não pode existir no banco.', role: 'Rafael (CTO)', type: 'danger' },
      { npc: 'L', message: 'Se travar na sintaxe do Prisma, abre o briefing da missão ou me pergunte.', role: 'Lucas (IA)', type: 'primary' }
    ],
    xpReward: 300,
    briefing: [
      {
        title: "O que é um ORM?",
        explanation: "ORM (Object-Relational Mapper) permite que você interaja com banco de dados usando objetos JavaScript, sem escrever SQL puro. O Prisma é o ORM mais moderno do ecossistema Node.js.",
        code: `// Sem ORM (SQL manual — verboso e inseguro)
db.query('SELECT * FROM users WHERE id = ?', [1]);

// Com Prisma (JavaScript puro, com autocomplete)
const user = await prisma.user.findUnique({
  where: { id: 1 }
});`
      },
      {
        title: "Estrutura do schema.prisma",
        explanation: "O arquivo schema.prisma define seus modelos de dados. É a fonte da verdade — o Prisma gera o banco e o client a partir dele.",
        code: `// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
}`,
        language: 'prisma'
      },
      {
        title: "Usando o PrismaClient",
        explanation: "No index.js você importa e instancia o client para fazer queries. Sempre crie uma única instância global.",
        code: `const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Exemplo de uso:
async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main();`
      }
    ]
  },
  {
    id: 4,
    title: "Testes Automatizados (TDD)",
    description: "O CTO descobriu que subimos código sem testes. Implemente o primeiro teste unitário.",
    objectives: [
      "Criar 'math.js' exportando a função: module.exports = { sum }",
      "Criar 'math.test.js' e importar a função sum",
      "Escrever um bloco test() ou it() com expect() para validar que sum(2, 2) === 4"
    ],
    initialCode: "// Crie os arquivos math.js e math.test.js no Explorer lateral\n",
    testCode: `
const fs = require('fs');
try {
  let mathJs = '';
  let mathTestJs = '';
  
  try { mathJs = fs.readFileSync('math.js', 'utf-8'); } catch(e) { throw new Error("Crie o arquivo math.js"); }
  try { mathTestJs = fs.readFileSync('math.test.js', 'utf-8'); } catch(e) { throw new Error("Crie o arquivo math.test.js"); }

  if (!mathJs.includes('sum')) throw new Error("A função sum não foi encontrada em math.js.");
  if (!mathTestJs.includes('test(') && !mathTestJs.includes('it(')) throw new Error("Nenhum bloco de teste encontrado em math.test.js.");
  if (!mathTestJs.includes('expect(')) throw new Error("Você esqueceu de usar expect() para validar o resultado.");
  
  console.log("SUCESSO_VALIDACAO");
} catch(e) {
  console.error("FALHA:", e.message);
}
    `,
    npcMessages: [
      { npc: 'R', message: 'INACEITÁVEL! Subimos para produção sem cobertura de testes! Corrija isso agora.', role: 'Rafael (CTO)', type: 'danger' },
      { npc: 'L', message: 'Vamos com calma. Escreva a função primeiro, depois o teste que a valida.', role: 'Lucas (IA)', type: 'primary' }
    ],
    xpReward: 400,
    briefing: [
      {
        title: "O que é TDD?",
        explanation: "Test-Driven Development: você escreve o teste ANTES do código. Isso força você a pensar no comportamento esperado, e não na implementação. Resultado: menos bugs e mais confiança para refatorar.",
        code: `// 1º Escreva o teste (vai falhar — isso é normal)
test('soma 2 + 2 deve ser 4', () => {
  expect(sum(2, 2)).toBe(4);
});

// 2º Implemente a função para o teste passar
function sum(a, b) {
  return a + b;
}

// 3º Refatore com confiança`
      },
      {
        title: "Anatomia de um Teste",
        explanation: "Todo teste tem 3 partes: Arrange (preparar), Act (executar) e Assert (verificar). Isso é chamado de padrão AAA.",
        code: `const { sum } = require('./math');

test('sum deve retornar a soma de dois números', () => {
  // Arrange — prepara os dados
  const a = 2;
  const b = 2;

  // Act — executa a função
  const result = sum(a, b);

  // Assert — verifica o resultado
  expect(result).toBe(4);
});`
      },
      {
        title: "Dois Arquivos Separados",
        explanation: "A convenção é separar implementação do teste em arquivos distintos. O arquivo de teste usa o sufixo `.test.js`.",
        code: `// math.js — implementação
function sum(a, b) {
  return a + b;
}
module.exports = { sum };

// math.test.js — teste
const { sum } = require('./math');

test('sum(2, 2) deve ser 4', () => {
  expect(sum(2, 2)).toBe(4);
});`
      }
    ]
  },
  {
    id: 5,
    title: "Autenticação com JWT",
    description: "Os usuários precisam fazer login. Implemente uma rota POST /login que retorna um JWT assinado.",
    objectives: [
      "Criar uma rota POST em '/login' no index.js",
      "Usar a lib 'jsonwebtoken' — const jwt = require('jsonwebtoken')",
      "Retornar o token em JSON: { token: '...' }",
      "Usar jwt.sign() para assinar o token (não faça hardcode!)"
    ],
    initialCode: "const express = require('express');\nconst jwt = require('jsonwebtoken');\n\nconst app = express();\n\n// Implemente a rota POST /login aqui\n",
    testCode: `
const { spawn } = require('child_process');
const http = require('http');

const server = spawn('node', ['index.js']);
console.log("Aguardando o servidor para testar o JWT...");

setTimeout(() => {
  const req = http.request('http://localhost:3000/login', { method: 'POST' }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      server.kill();
      try {
        const json = JSON.parse(data);
        if (json.token && json.token.split('.').length === 3) {
          console.log("SUCESSO_VALIDACAO");
        } else {
          console.error("FALHA: /login não retornou um JWT válido. Recebido: " + data);
        }
      } catch (e) {
        console.error("FALHA: A resposta não é um JSON válido.");
      }
    });
  });
  req.on('error', () => {
    server.kill();
    console.error("FALHA: Não foi possível conectar na porta 3000.");
  });
  req.end();
}, 2500);
    `,
    npcMessages: [
      { npc: 'R', message: 'Segurança não é brincadeira. Em produção, a chave secreta SEMPRE vem de variável de ambiente.', role: 'Rafael (CTO)', type: 'danger' },
      { npc: 'C', message: 'Meus usuários não conseguem logar! O front-end está travado te esperando!', role: 'Camila (PM)', type: 'accent' }
    ],
    xpReward: 500,
    briefing: [
      {
        title: "O que é JWT?",
        explanation: "JSON Web Token é um padrão para autenticação sem estado. O servidor assina um token com dados do usuário. O cliente guarda esse token e envia nas próximas requisições para provar quem é.",
        code: `// Estrutura de um JWT (3 partes separadas por '.')
// header.payload.signature

// eyJhbGciOiJIUzI1NiJ9   <- header
// .eyJ1c2VySWQiOjF9       <- payload (dados)
// .abc123signature        <- assinatura

// Decodificado, o payload é:
// { userId: 1, iat: 1716000000, exp: 1716086400 }`
      },
      {
        title: "Gerando um Token com jwt.sign()",
        explanation: "A função `jwt.sign()` recebe o payload (dados), a chave secreta (para assinar) e opções como tempo de expiração. Nunca exponha a chave secreta no código em produção.",
        code: `const jwt = require('jsonwebtoken');

const SECRET = 'minha-chave-secreta';

const token = jwt.sign(
  { userId: 1, role: 'dev' }, // payload
  SECRET,                      // chave secreta
  { expiresIn: '1d' }          // expira em 1 dia
);

console.log(token); // eyJhbGci...`
      },
      {
        title: "Rota de Login Completa",
        explanation: "A rota recebe as credenciais, valida (aqui simplificado) e retorna o token. Em produção, você buscaria o usuário no banco de dados e compararia a senha com hash.",
        code: `app.use(express.json());

app.post('/login', (req, res) => {
  // Em produção: verificar no banco de dados
  const token = jwt.sign(
    { userId: 1 },
    'minha-chave-secreta',
    { expiresIn: '1d' }
  );
  
  res.json({ token });
});

app.listen(3000);`
      }
    ]
  }
];
