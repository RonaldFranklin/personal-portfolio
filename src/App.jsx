import { useEffect, useRef, useState } from 'react'
import './App.css'

function Arrow() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4.5 13.5 13 5M5.5 5H13v7.5" /></svg>
}
function Github() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.5.1.7-.2.7-.5v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .7 2.6.5 3.2.4.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3.1 1.2a10.6 10.6 0 0 1 5.5 0c2.1-1.5 3.1-1.2 3.1-1.2.6 1.5.2 2.7.1 3 .7.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.4.7 1 .7 2.1v3.1c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z" /></svg>
}
export default function App() {
  const [activeTab, setActiveTab] = useState('inicio')
  const projectListRef = useRef(null)
  const [projectScroll, setProjectScroll] = useState({ enabled: false, direction: 'down' })

  useEffect(() => {
    if (activeTab !== 'projetos') return undefined

    const list = projectListRef.current
    if (!list) return undefined

    const updateScrollCue = () => {
      const enabled = list.scrollHeight > list.clientHeight + 1
      const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1
      setProjectScroll({ enabled, direction: atBottom ? 'up' : 'down' })
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
  }, [activeTab])

  return (
    <main className="page">
      <div className="ambient ambient-purple" /><div className="ambient ambient-orange" />
      <header className="topbar">
        <a className="wordmark" href="#inicio" onClick={() => setActiveTab('inicio')}><span className="ubuntu-mark"><i /><i /><i /></span>ronald<span className="orange">.dev</span></a>
        <span className="top-note"><i /> backend · dados · sistemas</span>
        <nav className="main-nav" aria-label="Navegação principal">
          <button type="button" aria-current={activeTab === 'inicio' ? 'page' : undefined} onClick={() => setActiveTab('inicio')}>Início</button>
          <button type="button" aria-current={activeTab === 'projetos' ? 'page' : undefined} onClick={() => setActiveTab('projetos')}>Projetos</button>
          <button type="button" aria-current={activeTab === 'sobre' ? 'page' : undefined} onClick={() => setActiveTab('sobre')}>Sobre</button>
        </nav>
      </header>
      {activeTab === 'inicio' ? (
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><i /> OLÁ, QUE BOM TER VOCÊ AQUI</p>
          <h1>Eu sou <span>Ronald</span><br />e construo<br /><em>software.</em></h1>
          <p className="intro">Comecei minha trajetória no backend e hoje atuo como desenvolvedor full stack, do banco de dados às interfaces. Também tenho experiência com APIs e sistemas de grande porte.</p>
          <div className="actions">
            <a className="button" href="https://github.com/RonaldFranklin" target="_blank" rel="noreferrer"><Github /> Conheça meu GitHub <Arrow /></a>
            <small>meus projetos começam por lá</small>
          </div>
          <div className="signoff"><i /><p>Um projeto pessoal,<small>em construção — como todo bom projeto.</small></p></div>
        </div>
        <div className="art">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="glow" />
          <div className="window">
            <div className="window-bar"><span className="dots"><i /><i /><i /></span><span>ronald@ubuntu: ~/perfil</span><b>•••</b></div>
            <div className="window-inner">
              <div className="portrait"><div className="ring ring-a" /><div className="ring ring-b" /><div className="avatar"><img src="https://github.com/RonaldFranklin.png?size=320" alt="Foto de perfil de Ronald no GitHub" /><i>✦</i></div><span className="spark">✳</span><span className="chip">⌘ &nbsp; software em construção</span></div>
              <div className="terminal">
                <div className="command"><b>❯</b> whoami <i /></div>
                <p>Ronald<small>desenvolvedor de software</small></p>
                <div className="tags"><span>backend</span><span>dados</span><span>sistemas</span></div>
              </div>
            </div>
            <div className="window-foot"><span><i /> perfil em construção</span><span>v. 01.0</span></div>
          </div>
          <span className="float float-a">✳ &nbsp; ideias em andamento</span>
          <span className="float float-b"><b>{'{ }'}</b> &nbsp; feito com intenção</span>
        </div>
      </section>
      ) : activeTab === 'projetos' ? (
        <section className="console-page" aria-label="Terminal de projetos">
          <div className="content-terminal">
            <div className="content-terminal-bar"><span className="dots"><i /><i /><i /></span><span>ronald@ubuntu: ~/projetos</span><b>•••</b></div>
            <div className="content-terminal-body projects-terminal-body">
              <div className="project-scroll-shell">
              <div className="project-listing" ref={projectListRef} onScroll={() => {
                const list = projectListRef.current
                const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1
                setProjectScroll((current) => ({ ...current, direction: atBottom ? 'up' : 'down' }))
              }}>
                <div className="project-output">
                  <p className="console-command"><span>ronald@ubuntu: ~/projetos $</span> cat 01-personal-portfolio</p>
                  <article className="project-entry">
                    <strong>01</strong>
                    <div className="project-entry-content">
                      <h2>Personal Portfolio</h2>
                      <p>Meu site pessoal em construção, feito com React e Vite e inspirado na interface escura do Ubuntu.</p>
                      <div className="project-meta"><span>React</span><span>Vite</span></div>
                      <a className="project-repo-link" href="https://github.com/RonaldFranklin/personal-portfolio" target="_blank" rel="noreferrer">ver repositório <Arrow /></a>
                    </div>
                  </article>
                </div>
                <div className="project-output">
                  <p className="console-command"><span>ronald@ubuntu: ~/projetos $</span> cat 02-application-foundation</p>
                  <article className="project-entry">
                    <strong>02</strong>
                    <div className="project-entry-content">
                      <h2>Application Foundation</h2>
                      <p>Base reutilizável para iniciar aplicações, com autenticação e gestão de organizações. API NestJS, interface Next.js e infraestrutura Docker/Compose em projetos independentes.</p>
                      <div className="project-meta"><span>NestJS</span><span>Next.js</span><span>PostgreSQL</span><span>Docker</span></div>
                      <a className="project-repo-link" href="https://github.com/RonaldFranklin/application-foundation" target="_blank" rel="noreferrer">ver repositório <Arrow /></a>
                    </div>
                  </article>
                </div>
                <div className="project-output">
                  <p className="console-command"><span>ronald@ubuntu: ~/projetos $</span> cat 03-auth-security-audit</p>
                  <article className="project-entry">
                    <strong>03</strong>
                    <div className="project-entry-content">
                      <h2>Auth Security Audit</h2>
                      <p>Skill do Codex para auditar fluxos de autenticação e sessão com base em evidências, priorizando riscos demonstráveis e recomendações práticas.</p>
                      <div className="project-meta"><span>Codex Skill</span><span>AppSec</span><span>Autenticação</span></div>
                      <a className="project-repo-link" href="https://github.com/RonaldFranklin/auth-security-audit" target="_blank" rel="noreferrer">ver repositório <Arrow /></a>
                    </div>
                  </article>
                </div>
                <div className="project-output">
                  <p className="console-command"><span>ronald@ubuntu: ~/projetos $</span> cat 04-emulador-game-boy</p>
                  <article className="project-entry">
                    <strong>04</strong>
                    <div className="project-entry-content">
                      <h2>Emulador Game Boy</h2>
                      <p>Projeto feito por diversão e aprendizado: emulador web de Game Boy e Game Boy Advance, com jogos no navegador e saves individuais.</p>
                      <div className="project-meta"><span>Game Boy</span><span>GBA</span><span>mGBA</span><span>React</span></div>
                      <a className="project-repo-link" href="https://github.com/RonaldFranklin/emulador-game-boy" target="_blank" rel="noreferrer">ver repositório <Arrow /></a>
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
      ) : (
        <section className="console-page" aria-label="Terminal sobre mim">
          <div className="content-terminal">
            <div className="content-terminal-bar"><span className="dots"><i /><i /><i /></span><span>ronald@ubuntu: ~/perfil</span><b>•••</b></div>
            <div className="content-terminal-body about-console-body">
              <p className="console-command"><span>ronald@ubuntu: ~ $</span> cat sobre.txt</p>
              <div className="about-output">
                <h2>Ronald Franklin</h2>
                <p>Minha carreira começou no backend, trabalhando com APIs, bancos de dados e sistemas de grande porte.</p>
                <p>Hoje também atuo no front-end como desenvolvedor full stack, acompanhando o desenvolvimento de software de ponta a ponta.</p>
                <div className="about-console-tags"><span>backend</span><span>dados</span><span>full stack</span></div>
              </div>
              <p className="console-ready"><span>ronald@ubuntu: ~ $</span><i /></p>
            </div>
          </div>
        </section>
      )}
      <footer><span>RONALD <i>/</i> SITE PESSOAL</span><span>feito com <b>♥</b> e bastante café</span></footer>
    </main>
  )
}