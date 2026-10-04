# Personal Portfolio

Site pessoal de Ronald Franklin: um espaço para apresentar minha trajetória em desenvolvimento de software e reunir projetos que construí, ideias que explorei e aprendizados do caminho.

A interface segue uma estética escura inspirada no Ubuntu. A apresentação inicial funciona como um terminal visual; as áreas de projetos e sobre mim mantêm essa linguagem, com comandos e saídas próprios. O projeto está em evolução e serve também como um dos projetos apresentados aqui.

## O que você encontra

- **Início:** apresentação profissional, links e uma visão rápida do meu perfil.
- **Projetos:** lista rolável com resumo, tecnologias e link para cada repositório.
- **Sobre:** um pouco mais da minha trajetória, do backend ao desenvolvimento full stack.

Entre os projetos apresentados estão:

- [Personal Portfolio](https://github.com/RonaldFranklin/personal-portfolio) — este site, feito com React e Vite.
- [Application Foundation](https://github.com/RonaldFranklin/application-foundation) — base reutilizável para iniciar aplicações.
- [Auth Security Audit](https://github.com/RonaldFranklin/auth-security-audit) — skill do Codex para auditorias de segurança de autenticação.
- [Emulador Game Boy](https://github.com/RonaldFranklin/emulador-game-boy) — emulador web de Game Boy e Game Boy Advance, criado por diversão e aprendizado.
- [Carteira Financeira](https://github.com/RonaldFranklin/carteira-financeira) — API simples para contas e transferências entre usuários.

## Tecnologias

- React e Vite para a interface.
- CSS responsivo, sem biblioteca visual adicional.
- Docker multi-stage para gerar a versão de produção.
- Nginx para servir os arquivos estáticos.

O site é somente front-end: não possui API, banco de dados ou painel de edição. Os textos e projetos são mantidos no código. A foto de perfil é carregada do avatar público da conta `RonaldFranklin` no GitHub.

## Executar com Docker

Requer Docker Engine e Docker Compose v2.

```bash
git clone https://github.com/RonaldFranklin/personal-portfolio.git
cd personal-portfolio
docker compose up -d --build
```

O site ficará disponível em `http://localhost:8080`. O Compose constrói uma imagem de produção: o Vite gera os arquivos estáticos durante o build e o Nginx os serve na porta 80 do container. O serviço reinicia automaticamente após reinicializações do host e expõe uma verificação de saúde em `/health`.

### Escolher outra porta

Por padrão, a porta 8080 do host aponta para a porta 80 do container. Para usar outra porta no Linux/WSL:

```bash
PORT=3000 docker compose up -d --build
```

No PowerShell:

```powershell
$env:PORT = "3000"
docker compose up -d --build
```

Em um servidor atrás de proxy reverso, encaminhe o domínio para a porta configurada. Confirme que ela está livre e que as regras de rede/firewall do servidor correspondem à forma como você pretende publicar o site.

### Atualizar uma instalação existente

Dentro da pasta do repositório no servidor:

```bash
git pull
docker compose up -d --build
docker compose ps
```

Comandos úteis para acompanhar e parar o serviço:

```bash
docker compose logs -f portfolio
docker compose down
```

`docker compose down` para e remove o container e a rede do Compose; não remove a imagem nem os arquivos do repositório.

## Desenvolvimento local

Requer Node.js 20.19+ ou 22.12+ e npm.

```bash
npm ci
npm run dev
```

Para gerar e servir localmente uma build de produção:

```bash
npm run build
npm run preview
```

## Estrutura principal

```text
src/          componentes React e estilos
public/       ícones e arquivos estáticos
Dockerfile    build da aplicação e imagem Nginx
compose.yaml  execução local/servidor e health check
nginx.conf    servidor estático e fallback de rotas
```
