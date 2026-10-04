import { useEffect, useRef, useState } from 'react'
import './App.css'

function Arrow() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4.5 13.5 13 5M5.5 5H13v7.5" /></svg>
}
function Github() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.5.1.7-.2.7-.5v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .7 2.6.5 3.2.4.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3.1 1.2a10.6 10.6 0 0 1 5.5 0c2.1-1.5 3.1-1.2 3.1-1.2.6 1.5.2 2.7.1 3 .7.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.4.7 1 .7 2.1v3.1c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z" /></svg>
}
function SocialEntry({ cwd, command, mark, title, detail, href, action, external = true }) {
  return (
    <div className="project-output social-output">
      <p className="console-command"><span>ronald@ubuntu: ~/{cwd} $</span> cat {command}</p>
      <article className="contact-row">
        <strong className="contact-mark" aria-hidden="true">{mark}</strong>
        <div><h2>{title}</h2><p>{detail}</p></div>
        {href ? <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{action} <Arrow /></a> : <span className="contact-pending">{action}</span>}
      </article>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio')
  const [language, setLanguage] = useState('pt')
  const isEnglish = language === 'en'
  const projectListRef = useRef(null)
  const contentListRef = useRef(null)
  const [projectScroll, setProjectScroll] = useState({ enabled: false, direction: 'down' })
  const [contentScroll, setContentScroll] = useState({ enabled: false, direction: 'down' })

  useEffect(() => {
    document.documentElement.lang = isEnglish ? 'en' : 'pt-BR'
    document.title = isEnglish ? 'Ronald — personal website' : 'Ronald — site pessoal'
    const description = document.querySelector('meta[name="description"]')
    if (description) description.content = isEnglish
      ? 'Ronald’s personal space: projects, learning, and ideas in software.'
      : 'O espaço pessoal de Ronald: projetos, aprendizados e ideias para a web.'
  }, [isEnglish])

  useEffect(() => {
    if (!['projetos', 'sobre', 'contato', 'interesses'].includes(activeTab)) return undefined

    const isProjectsTab = activeTab === 'projetos'
    const list = isProjectsTab ? projectListRef.current : contentListRef.current
    if (!list) return undefined

    const updateScrollCue = () => {
      const enabled = list.scrollHeight > list.clientHeight + 1
      const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1
      const nextState = { enabled, direction: atBottom ? 'up' : 'down' }
      if (isProjectsTab) setProjectScroll(nextState)
      else setContentScroll(nextState)
    }

    updateScrollCue()
    const resizeObserver = new ResizeObserver(updateScrollCue)
    const mutationObserver = new MutationObserver(updateScrollCue)
    resizeObserver.observe(list)
    mutationObserver.observe(list, { childList: true, subtree: true, characterData: true })
    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [activeTab, language])

  return (
    <main className="page">
      <div className="ambient ambient-purple" /><div className="ambient ambient-orange" />
      <header className="topbar">
        <a className="wordmark" href="#inicio" onClick={(event) => { event.preventDefault(); setActiveTab('inicio'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}><span className="ubuntu-mark"><i /><i /><i /></span>ronald<span className="orange">.dev</span></a>
        <span className="top-note"><i /> {isEnglish ? 'backend · data · systems' : 'backend · dados · sistemas'}</span>
        <nav className="main-nav" aria-label={isEnglish ? 'Main navigation' : 'Navegação principal'}>
          <button type="button" aria-current={activeTab === 'inicio' ? 'page' : undefined} onClick={() => setActiveTab('inicio')}>{isEnglish ? 'Home' : 'Início'}</button>
          <button type="button" aria-current={activeTab === 'projetos' ? 'page' : undefined} onClick={() => setActiveTab('projetos')}>{isEnglish ? 'Projects' : 'Projetos'}</button>
          <button type="button" aria-current={activeTab === 'sobre' ? 'page' : undefined} onClick={() => setActiveTab('sobre')}>{isEnglish ? 'About' : 'Sobre'}</button>
          <button type="button" aria-current={activeTab === 'interesses' ? 'page' : undefined} onClick={() => setActiveTab('interesses')}>{isEnglish ? 'Beyond code' : 'Além do código'}</button>
          <button type="button" aria-current={activeTab === 'contato' ? 'page' : undefined} onClick={() => setActiveTab('contato')}>{isEnglish ? 'Networks' : 'Redes'}</button>
          <div className="language-switch" role="group" aria-label={isEnglish ? 'Language' : 'Idioma'}>
            <button type="button" aria-pressed={!isEnglish} onClick={() => setLanguage('pt')}>PT</button>
            <button type="button" aria-pressed={isEnglish} onClick={() => setLanguage('en')}>EN</button>
          </div>
        </nav>
      </header>
      {activeTab === 'inicio' ? (
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><i /> {isEnglish ? 'HELLO, GLAD YOU’RE HERE' : 'OLÁ, QUE BOM TER VOCÊ AQUI'}</p>
          <h1>{isEnglish ? 'I’m ' : 'Eu sou '}<span>Ronald</span><br />{isEnglish ? 'and I build' : 'e construo'}<br /><em>software.</em></h1>
          <p className="intro">{isEnglish ? 'I started out in backend development and now work across the stack, from databases to user interfaces. I also have experience building APIs and large-scale systems.' : 'Comecei minha trajetória no backend e hoje atuo como desenvolvedor full stack, do banco de dados às interfaces. Também tenho experiência com APIs e sistemas de grande porte.'}</p>
          <div className="actions">
            <a className="button" href="https://github.com/RonaldFranklin" target="_blank" rel="noreferrer"><Github /> {isEnglish ? 'Visit my GitHub' : 'Conheça meu GitHub'} <Arrow /></a>
            <small>{isEnglish ? 'my projects start there' : 'meus projetos começam por lá'}</small>
          </div>
          <div className="signoff"><i /><p>{isEnglish ? 'A personal project,' : 'Um projeto pessoal,'}<small>{isEnglish ? 'under construction — like every good project.' : 'em construção — como todo bom projeto.'}</small></p></div>
        </div>
        <div className="art">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="glow" />
          <div className="window">
            <div className="window-bar"><span className="dots"><i /><i /><i /></span><span>ronald@ubuntu: ~/{isEnglish ? 'profile' : 'perfil'}</span><b>•••</b></div>
            <div className="window-inner">
              <div className="portrait"><div className="ring ring-a" /><div className="ring ring-b" /><div className="avatar"><img src="https://github.com/RonaldFranklin.png?size=320" alt={isEnglish ? 'Ronald’s GitHub profile picture' : 'Foto de perfil de Ronald no GitHub'} /><i>✦</i></div><span className="spark">✳</span><span className="chip">⌘ &nbsp; {isEnglish ? 'software under construction' : 'software em construção'}</span></div>
              <div className="terminal">
                <div className="command"><b>❯</b> whoami <i /></div>
                <p>Ronald<small>{isEnglish ? 'software developer' : 'desenvolvedor de software'}</small></p>
                <div className="tags"><span>backend</span><span>{isEnglish ? 'data' : 'dados'}</span><span>{isEnglish ? 'systems' : 'sistemas'}</span></div>
              </div>
            </div>
            <div className="window-foot"><span><i /> {isEnglish ? 'profile under construction' : 'perfil em construção'}</span><span>v. 01.0</span></div>
          </div>
          <span className="float float-a">✳ &nbsp; {isEnglish ? 'ideas in progress' : 'ideias em andamento'}</span>
          <span className="float float-b"><b>{'{ }'}</b> &nbsp; {isEnglish ? 'made with intention' : 'feito com intenção'}</span>
        </div>
      </section>
      ) : activeTab === 'projetos' ? (
        <section className="console-page" aria-label={isEnglish ? 'Projects terminal' : 'Terminal de projetos'}>
          <div className="content-terminal">
            <div className="content-terminal-bar"><span className="dots"><i /><i /><i /></span><span>ronald@ubuntu: ~/{isEnglish ? 'projects' : 'projetos'}</span><b>•••</b></div>
            <div className="content-terminal-body projects-terminal-body">
              <div className="project-scroll-shell">
              <div className="project-listing" ref={projectListRef} onScroll={() => {
                const list = projectListRef.current
                const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1
                setProjectScroll((current) => ({ ...current, direction: atBottom ? 'up' : 'down' }))
              }}>
                <div className="project-output">
                  <p className="console-command"><span>ronald@ubuntu: ~/{isEnglish ? 'projects' : 'projetos'} $</span> cat 01-personal-portfolio</p>
                  <article className="project-entry">
                    <strong>01</strong>
                    <div className="project-entry-content">
                      <h2>Personal Portfolio</h2>
                      <p>{isEnglish ? 'My personal website, built with React and Vite and inspired by Ubuntu’s dark interface.' : 'Meu site pessoal em construção, feito com React e Vite e inspirado na interface escura do Ubuntu.'}</p>
                      <div className="project-meta"><span>React</span><span>Vite</span></div>
                      <a className="project-repo-link" href="https://github.com/RonaldFranklin/personal-portfolio" target="_blank" rel="noreferrer">{isEnglish ? 'view repository' : 'ver repositório'} <Arrow /></a>
                    </div>
                  </article>
                </div>
                <div className="project-output">
                  <p className="console-command"><span>ronald@ubuntu: ~/{isEnglish ? 'projects' : 'projetos'} $</span> cat 02-application-foundation</p>
                  <article className="project-entry">
                    <strong>02</strong>
                    <div className="project-entry-content">
                      <h2>Application Foundation</h2>
                      <p>{isEnglish ? 'A reusable foundation for new applications, with authentication and organization management. NestJS API, Next.js interface, and Docker/Compose infrastructure in independent projects.' : 'Base reutilizável para iniciar aplicações, com autenticação e gestão de organizações. API NestJS, interface Next.js e infraestrutura Docker/Compose em projetos independentes.'}</p>
                      <div className="project-meta"><span>NestJS</span><span>Next.js</span><span>PostgreSQL</span><span>Docker</span></div>
                      <a className="project-repo-link" href="https://github.com/RonaldFranklin/application-foundation" target="_blank" rel="noreferrer">{isEnglish ? 'view repository' : 'ver repositório'} <Arrow /></a>
                    </div>
                  </article>
                </div>
                <div className="project-output">
                  <p className="console-command"><span>ronald@ubuntu: ~/{isEnglish ? 'projects' : 'projetos'} $</span> cat 03-auth-security-audit</p>
                  <article className="project-entry">
                    <strong>03</strong>
                    <div className="project-entry-content">
                      <h2>Auth Security Audit</h2>
                      <p>{isEnglish ? 'A Codex skill for evidence-based audits of authentication and session flows, focused on demonstrable risks and practical recommendations.' : 'Skill do Codex para auditar fluxos de autenticação e sessão com base em evidências, priorizando riscos demonstráveis e recomendações práticas.'}</p>
                      <div className="project-meta"><span>Codex Skill</span><span>AppSec</span><span>{isEnglish ? 'Authentication' : 'Autenticação'}</span></div>
                      <a className="project-repo-link" href="https://github.com/RonaldFranklin/auth-security-audit" target="_blank" rel="noreferrer">{isEnglish ? 'view repository' : 'ver repositório'} <Arrow /></a>
                    </div>
                  </article>
                </div>
                <div className="project-output">
                  <p className="console-command"><span>ronald@ubuntu: ~/{isEnglish ? 'projects' : 'projetos'} $</span> {isEnglish ? 'cat 04-game-boy-emulator' : 'cat 04-emulador-game-boy'}</p>
                  <article className="project-entry">
                    <strong>04</strong>
                    <div className="project-entry-content">
                      <h2>{isEnglish ? 'Game Boy Emulator' : 'Emulador Game Boy'}</h2>
                      <p>{isEnglish ? 'A fun learning project: a web emulator for Game Boy and Game Boy Advance, with browser-based games and individual save files.' : 'Projeto feito por diversão e aprendizado: emulador web de Game Boy e Game Boy Advance, com jogos no navegador e saves individuais.'}</p>
                      <div className="project-meta"><span>Game Boy</span><span>GBA</span><span>mGBA</span><span>React</span></div>
                      <a className="project-repo-link" href="https://github.com/RonaldFranklin/emulador-game-boy" target="_blank" rel="noreferrer">{isEnglish ? 'view repository' : 'ver repositório'} <Arrow /></a>
                    </div>
                  </article>
                </div>
                <div className="project-output">
                  <p className="console-command"><span>ronald@ubuntu: ~/{isEnglish ? 'projects' : 'projetos'} $</span> {isEnglish ? 'cat 05-personal-finance-wallet' : 'cat 05-carteira-financeira'}</p>
                  <article className="project-entry">
                    <strong>05</strong>
                    <div className="project-entry-content">
                      <h2>{isEnglish ? 'Personal Finance Wallet' : 'Carteira Financeira'}</h2>
                      <p>{isEnglish ? 'A personal finance API with user accounts, deposits, and balance transfers between people, recorded as reversible transactions.' : 'API de carteira financeira com contas de usuário, depósitos e transferências de saldo entre pessoas, registradas como transações reversíveis.'}</p>
                      <div className="project-meta"><span>NestJS</span><span>TypeScript</span><span>Prisma</span><span>PostgreSQL</span></div>
                      <a className="project-repo-link" href="https://github.com/RonaldFranklin/carteira-financeira" target="_blank" rel="noreferrer">{isEnglish ? 'view repository' : 'ver repositório'} <Arrow /></a>
                    </div>
                  </article>
                </div>
              </div>
              {projectScroll.enabled && <span className="project-scroll-cue" aria-hidden="true"><b>{projectScroll.direction === 'up' ? '↑' : '↓'}</b><small>scroll</small></span>}
              </div>
              <p className="console-ready"><span>ronald@ubuntu: ~ $</span><i /></p>
            </div>
          </div>
        </section>
      ) : activeTab === 'sobre' ? (
        <section className="console-page" aria-label={isEnglish ? 'About terminal' : 'Terminal sobre mim'}>
          <div className="content-terminal">
            <div className="content-terminal-bar"><span className="dots"><i /><i /><i /></span><span>ronald@ubuntu: ~/{isEnglish ? 'profile' : 'perfil'}</span><b>•••</b></div>
            <div className="content-terminal-body about-console-body">
              <div className="content-scroll-shell about-scroll-shell">
              <div className="content-scroll-list" ref={contentListRef} onScroll={() => {
                const list = contentListRef.current
                const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1
                setContentScroll((current) => ({ ...current, direction: atBottom ? 'up' : 'down' }))
              }}>
              <div className="about-output">
                <p className="console-command"><span>ronald@ubuntu: ~/{isEnglish ? 'profile' : 'perfil'} $</span> {isEnglish ? 'cat profile.txt' : 'cat perfil.txt'}</p>
                <article className="about-entry">
                  <h2>Ronald Franklin Rodrigues Romão</h2>
                  <p>{isEnglish ? 'I’m a software developer with a degree in Information Systems and a postgraduate degree in Software Architecture. I started out in backend development, building APIs and working with databases and large-scale systems. Today I also work on the frontend. I chose TypeScript because using the same language across the frontend and backend helps me build full-stack solutions more efficiently.' : 'Sou desenvolvedor de software, graduado em Sistemas de Informação e pós-graduado em Arquitetura de Software. Comecei minha trajetória no backend, construindo APIs e trabalhando com bancos de dados e sistemas de grande porte. Hoje também atuo no front-end. Escolhi TypeScript porque usar a mesma linguagem no front e no backend me permite desenvolver soluções full stack com mais eficiência.'}</p>
                </article>
              </div>
              <div className="about-output">
                <p className="console-command"><span>ronald@ubuntu: ~/{isEnglish ? 'profile' : 'perfil'} $</span> ls stacks/</p>
                <div className="stack-output">
                  <section className="stack-group">
                    <h3>backend</h3>
                    <div className="about-console-tags"><span>TypeScript</span><span>Node.js</span><span>NestJS</span><span>TypeORM</span><span>JavaScript</span><span>Java</span><span>Spring Boot</span><span>Spring Security</span></div>
                  </section>
                  <section className="stack-group">
                    <h3>frontend</h3>
                    <div className="about-console-tags"><span>TypeScript</span><span>JavaScript</span><span>React</span></div>
                  </section>
                  <section className="stack-group">
                    <h3>{isEnglish ? 'data' : 'dados'}</h3>
                    <div className="about-console-tags"><span>PostgreSQL</span><span>Prisma</span><span>Neo4j</span></div>
                  </section>
                  <section className="stack-group">
                    <h3>{isEnglish ? 'messaging' : 'mensageria'}</h3>
                    <div className="about-console-tags"><span>RabbitMQ</span></div>
                  </section>
                  <section className="stack-group">
                    <h3>{isEnglish ? 'tools' : 'ferramentas'}</h3>
                    <div className="about-console-tags"><span>Docker</span><span>Azure Pipelines</span><span>Azure Repos</span><span>Git / GitHub</span><span>Maven</span><span>Swagger / OpenAPI</span><span>Selenium</span></div>
                  </section>
                </div>
              </div>
                            </div>
{contentScroll.enabled && <span className="project-scroll-cue" aria-hidden="true"><b>{contentScroll.direction === 'up' ? '↑' : '↓'}</b><small>{isEnglish ? 'scroll' : 'rolar'}</small></span>}
              </div>
              <p className="console-ready"><span>ronald@ubuntu: ~ $</span><i /></p>
            </div>
          </div>
        </section>
      ) : activeTab === 'interesses' ? (
        <section className="console-page" aria-label={isEnglish ? 'Beyond code terminal' : 'Terminal além do código'}>
          <div className="content-terminal">
            <div className="content-terminal-bar"><span className="dots"><i /><i /><i /></span><span>ronald@ubuntu: ~/{isEnglish ? 'interests' : 'interesses'}</span><b>•••</b></div>
            <div className="content-terminal-body contact-console-body">
              <div className="content-scroll-shell contact-scroll-shell">
              <div className="content-scroll-list" ref={contentListRef} onScroll={() => {
                const list = contentListRef.current
                const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1
                setContentScroll((current) => ({ ...current, direction: atBottom ? 'up' : 'down' }))
              }}>
              <div className="about-output contact-output">
                <p className="interest-intro">{isEnglish ? 'A few things I enjoy beyond building software.' : 'Um pouco do que gosto além de construir software.'}</p>
                <div className="social-entries">
                  <SocialEntry cwd={isEnglish ? 'interests' : 'interesses'} command="spotify.profile" mark="SP" title="Spotify" detail="open.spotify.com/user/31htdyso3tbvjhicrw22elj5r6t4" href="https://open.spotify.com/user/31htdyso3tbvjhicrw22elj5r6t4" action={isEnglish ? 'listen on Spotify' : 'abrir no Spotify'} />
                  <SocialEntry cwd={isEnglish ? 'interests' : 'interesses'} command="steam.profile" mark="ST" title="Steam" detail="steamcommunity.com/profiles/76561199004578638" href="https://steamcommunity.com/profiles/76561199004578638/" action={isEnglish ? 'open profile' : 'abrir perfil'} />
                  <SocialEntry cwd={isEnglish ? 'interests' : 'interesses'} command="instagram.profile" mark="IG" title="Instagram" detail="@_ronaldfranklin" href="https://www.instagram.com/_ronaldfranklin/" action={isEnglish ? 'open profile' : 'abrir perfil'} />
                </div>
                </div>
              </div>
              {contentScroll.enabled && <span className="project-scroll-cue" aria-hidden="true"><b>{contentScroll.direction === 'up' ? '↑' : '↓'}</b><small>{isEnglish ? 'scroll' : 'rolar'}</small></span>}
              </div>
              <p className="console-ready"><span>ronald@ubuntu: ~ $</span><i /></p>
            </div>
          </div>
        </section>
      ) : (
        <section className="console-page" aria-label={isEnglish ? 'Networks terminal' : 'Terminal de redes'}>
          <div className="content-terminal">
            <div className="content-terminal-bar"><span className="dots"><i /><i /><i /></span><span>ronald@ubuntu: ~/{isEnglish ? 'networks' : 'redes'}</span><b>•••</b></div>
            <div className="content-terminal-body contact-console-body">
              <div className="content-scroll-shell contact-scroll-shell">
              <div className="content-scroll-list" ref={contentListRef} onScroll={() => {
                const list = contentListRef.current
                const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1
                setContentScroll((current) => ({ ...current, direction: atBottom ? 'up' : 'down' }))
              }}>
              <div className="about-output contact-output">
                <div className="social-entries">
                  <SocialEntry cwd={isEnglish ? 'networks' : 'redes'} command="email.profile" mark="EM" title={isEnglish ? 'Email' : 'E-mail'} detail="ronaldfrromao@gmail.com" href="mailto:ronaldfrromao@gmail.com" action={isEnglish ? 'send email' : 'enviar e-mail'} external={false} />
                  <SocialEntry cwd={isEnglish ? 'networks' : 'redes'} command="linkedin.profile" mark="IN" title="LinkedIn" detail="linkedin.com/in/ronaldfranklinromao" href="https://www.linkedin.com/in/ronaldfranklinromao/" action={isEnglish ? 'open profile' : 'abrir perfil'} />
                  <SocialEntry cwd={isEnglish ? 'networks' : 'redes'} command="discord.profile" mark="DC" title="Discord" detail="ronaldfrromao" action={isEnglish ? 'username' : 'usuário'} />
                  <SocialEntry cwd={isEnglish ? 'networks' : 'redes'} command="github.profile" mark="GH" title="GitHub" detail="github.com/RonaldFranklin" href="https://github.com/RonaldFranklin" action={isEnglish ? 'open profile' : 'abrir perfil'} />
                </div>
                </div>
              </div>
              {contentScroll.enabled && <span className="project-scroll-cue" aria-hidden="true"><b>{contentScroll.direction === 'up' ? '↑' : '↓'}</b><small>{isEnglish ? 'scroll' : 'rolar'}</small></span>}
              </div>
              <p className="console-ready"><span>ronald@ubuntu: ~ $</span><i /></p>
            </div>
          </div>
        </section>
      )}
      <footer><span>RONALD <i>/</i> {isEnglish ? 'PERSONAL WEBSITE' : 'SITE PESSOAL'}</span><span>{isEnglish ? 'made with' : 'feito com'} <b>♥</b> {isEnglish ? 'and plenty of coffee' : 'e bastante café'}</span></footer>
    </main>
  )
}