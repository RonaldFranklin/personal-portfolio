# Personal Portfolio

Site pessoal de Ronald Franklin, feito com React e Vite. A interface usa uma estética escura inspirada no Ubuntu e reúne apresentação, projetos e informações sobre a trajetória profissional.

## Executar com Docker

Requer Docker Engine e Docker Compose.

```bash
docker compose up -d --build
```

A aplicação ficará disponível em `http://localhost:8080`. Para escolher outra porta no host:

```bash
PORT=3000 docker compose up -d --build
```

No PowerShell:

```powershell
$env:PORT = "3000"
docker compose up -d --build
```

Comandos úteis:

```bash
docker compose ps
docker compose logs -f portfolio
docker compose down
```

O Compose mantém o container ativo após reinícios do servidor. A imagem faz o build de produção do Vite e serve os arquivos estáticos com Nginx; não há servidor de desenvolvimento React em produção. Em um servidor com proxy reverso, encaminhe o tráfego para a porta publicada.

## Desenvolvimento local

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

## Conteúdo

- Apresentação responsiva com painel visual de terminal Ubuntu.
- Navegação entre Início, Projetos e Sobre.
- Foto de perfil carregada do avatar público do GitHub `RonaldFranklin`.
- Interface em português.
