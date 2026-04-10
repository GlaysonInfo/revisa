import Image from "next/image";
import Link from "next/link";

import { BrandLockup } from "../components/brand-lockup";
import { PublicHeader } from "../components/public-header";

const territorialCards = [
  {
    title: "Atendimento e presenca",
    description: "Escuta qualificada e servicos proximos das pessoas.",
    image: "/reviva/Atividades do projeto Reviva Betim 2.png",
  },
  {
    title: "Mutirao social",
    description: "Acesso a direitos com organizacao e acolhimento.",
    image: "/reviva/Social REVISA 2.png",
  },
  {
    title: "Yoga e cuidado",
    description: "Rotinas de bem-estar com atividades coletivas.",
    image: "/reviva/Aula de yoga no Projeto REVIVA.png",
  },
  {
    title: "Juventude em movimento",
    description: "Esporte como ferramenta de inclusao e participacao.",
    image: "/reviva/Esporte REVISA 2.png",
  },
];

const services = [
  {
    icon: "🏃",
    title: "Esporte e convivencia",
    description: "Futebol, volei, handebol, judo, ballet e atividades coletivas.",
  },
  {
    icon: "🧘",
    title: "Saude e bem-estar",
    description: "Yoga, fisioterapia preventiva, meditacao e cuidado comunitario.",
  },
  {
    icon: "💻",
    title: "Educacao e renda",
    description: "Inclusao digital, cursos livres, empreendedorismo e autonomia.",
  },
];

const axes = [
  {
    title: "Esporte",
    description: "Futebol, futsal, volei, handebol, judo e ginastica.",
  },
  {
    title: "Cultura e lazer",
    description: "Musica, teatro, danca e artesanato.",
  },
  {
    title: "Saude e apoio",
    description: "Grupos, prevencao, acompanhamento e encaminhamentos.",
  },
];

const institutionalBase = [
  {
    title: "Resolucao CNAS 109/2009",
    description: "Servico de Convivencia e Fortalecimento de Vinculos.",
  },
  {
    title: "Resolucao CNAS 182/2025",
    description: "Defesa e garantia de direitos.",
  },
  {
    title: "Fluxo operacional",
    description: "Cadastro, acompanhamento e monitoramento.",
  },
];

const gallery = [
  {
    title: "Acao social",
    description: "Cadastro, escuta e atendimento no territorio.",
    image: "/reviva/Social REVISA 2.png",
  },
  {
    title: "Oficinas e renda",
    description: "Autonomia, convivio e producao comunitaria.",
    image: "/reviva/Social REVISA 5.png",
  },
  {
    title: "Identidade institucional",
    description: "Marca forte e presenca reconhecivel.",
    image: "/reviva/Reviva_Betim_Fundo_Claro.png",
  },
];

const audiences = [
  "Criancas, adolescentes e jovens",
  "Adultos e idosos",
  "Familias e grupos em vulnerabilidade",
];

const flowSteps = [
  {
    step: "1",
    title: "Pre-cadastro",
    description: "Inscricao inicial.",
  },
  {
    step: "2",
    title: "Triagem social",
    description: "Avaliacao e priorizacao.",
  },
  {
    step: "3",
    title: "Matricula",
    description: "Entrada nas atividades.",
  },
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <div className="app-shell__inner public-home">
        <PublicHeader />

        <section id="inicio" className="public-hero">
          <div className="public-hero__grid">
            <div className="public-hero__copy">
              <p className="public-eyebrow">REVISA | Betim/MG</p>
              <h1>Rede de Proteção Social, Esporte, Saúde e Bem-Estar</h1>
              <p className="public-lead">
                Atuacao integrada com foco em vinculos, cidadania e prevencao de vulnerabilidades.
              </p>
              <div className="public-hero__cta">
                <Link href="/participar" className="primary-button">
                  Iniciar pre-cadastro
                </Link>
                <Link href="#contato" className="secondary-button">
                  Fale Conosco
                </Link>
              </div>
            </div>

            <article className="showcase-poster">
              <Image
                src="/reviva/Esporte REVISA 1.png"
                alt="Atividade esportiva da REVISA em Betim"
                fill
                className="showcase-poster__image"
                sizes="(max-width: 980px) 100vw, 44vw"
                priority
              />
            </article>
          </div>
        </section>

        <section id="a-revisa" className="public-section">
          <div className="section-heading">
            <p className="public-eyebrow">Organizacao da Sociedade Civil</p>
            <h2>A REVISA atua com protecao social e desenvolvimento comunitario.</h2>
            <p>
              A REVISA – Rede de Protecao a Vida e a Saude atua em Betim/MG com acoes integradas de assistencia
              social, esporte, saude e desenvolvimento comunitario.
            </p>
          </div>
          <div className="institutional-strip">
            <article className="public-card">
              <h3>SCFV</h3>
              <p>Convivencia, fortalecimento de vinculos e protecao social basica.</p>
            </article>
            <article className="public-card">
              <h3>Defesa de direitos</h3>
              <p>Articulacao, assessoramento e encaminhamento em rede.</p>
            </article>
            <article className="public-card">
              <h3>Rede socioassistencial</h3>
              <p>Integracao com CRAS, CREAS, saude, educacao e parceiros locais.</p>
            </article>
          </div>
        </section>

        <section id="atuacao" className="public-section">
          <div className="section-heading">
            <p className="public-eyebrow">REVISA no territorio</p>
            <h2>Presenca ativa com polos, acoes itinerantes e articulacao comunitaria.</h2>
            <p>Atendimento proximo, mutiroes, bem-estar e esporte como porta de entrada para a cidadania.</p>
          </div>
          <div className="territory-grid">
            {territorialCards.map((item) => (
              <article key={item.title} className="territory-card">
                <div className="territory-card__media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="territory-card__image"
                    sizes="(max-width: 980px) 100vw, 25vw"
                  />
                </div>
                <div className="territory-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="servicos" className="public-section">
          <div className="section-heading">
            <p className="public-eyebrow">Servicos oferecidos</p>
            <h2>Atuacao estruturada por frentes de cuidado, desenvolvimento e convivio.</h2>
          </div>
          <div className="service-grid">
            {services.map((item) => (
              <article key={item.title} className="service-card">
                <span className="service-card__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="public-section">
          <div className="section-heading">
            <p className="public-eyebrow">Eixos de atuacao</p>
            <h2>Atuacao organizada por servicos, protecao social e desenvolvimento integral.</h2>
          </div>
          <div className="public-card-grid">
            {axes.map((item) => (
              <article key={item.title} className="public-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="public-section">
          <div className="section-heading">
            <p className="public-eyebrow">Base institucional</p>
            <h2>Credibilidade, norma e metodo de acompanhamento.</h2>
          </div>
          <div className="document-grid">
            {institutionalBase.map((item) => (
              <article key={item.title} className="document-card">
                <span className="document-meta">Base institucional</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="galeria" className="public-section">
          <div className="section-heading">
            <p className="public-eyebrow">Galeria de atividades</p>
            <h2>Momentos, acoes e atividades da REVISA no territorio.</h2>
          </div>
          <div className="story-grid">
            {gallery.map((item) => (
              <article key={item.title} className="story-card">
                <div className="story-card__media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="story-card__image"
                    sizes="(max-width: 980px) 100vw, 30vw"
                  />
                  <div className="story-card__overlay">
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="public-section public-section--two-col">
          <article className="public-panel">
            <div className="section-heading">
              <p className="public-eyebrow">Publico atendido</p>
              <h2>Presenca ao longo dos ciclos de vida e dos grupos prioritarios.</h2>
            </div>
            <div className="bullet-stack">
              {audiences.map((item) => (
                <div key={item} className="bullet-item">
                  <span className="bullet-dot" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="public-panel">
            <div className="section-heading">
              <p className="public-eyebrow">Como participar</p>
              <h2>Fluxo de entrada simples e rastreavel.</h2>
            </div>
            <div className="stepper">
              {flowSteps.map((item) => (
                <div key={item.step} className="stepper__item">
                  <span className="stepper__badge">{item.step}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="public-hero__cta">
              <Link href="/participar" className="primary-button">
                Fazer inscricao
              </Link>
            </div>
          </article>
        </section>

        <section className="public-section">
          <div className="final-cta">
            <div>
              <p className="public-eyebrow">Participe da REVISA</p>
              <h2>Participe da rede de protecao a vida e a saude em Betim.</h2>
            </div>
            <div className="public-hero__cta">
              <Link href="/participar" className="primary-button">
                Iniciar pre-cadastro
              </Link>
              <Link href="#contato" className="secondary-button">
                Fale Conosco
              </Link>
            </div>
          </div>
        </section>

        <section id="contato" className="public-section">
          <div className="section-heading">
            <p className="public-eyebrow">Fale com a REVISA</p>
            <h2>Contato institucional.</h2>
          </div>
          <div className="contact-grid">
            <article className="contact-card">
              <strong>Telefone</strong>
              <p>(31) 3594-2181</p>
            </article>
            <article className="contact-card">
              <strong>WhatsApp</strong>
              <p>(31) 98267-3012</p>
            </article>
            <article className="contact-card">
              <strong>E-mail</strong>
              <p>sol.lange@yahoo.com.br</p>
            </article>
            <article className="contact-card">
              <strong>Endereco</strong>
              <p>Rua Urucuia, nº 352, Brasilia, Betim/MG, CEP 32.600-490</p>
            </article>
          </div>
        </section>

        <footer className="public-footer">
          <div className="public-footer__brand">
            <BrandLockup compact />
          </div>
          <div className="public-footer__meta">
            <p>REDE DE PROTECAO A VIDA E A SAUDE - REVISA</p>
            <p>CNPJ 14.452.770/0001-80</p>
            <p>Rua Urucuia, nº 352, Brasilia, Betim/MG</p>
          </div>
          <div className="public-footer__links">
            <Link href="#inicio">Inicio</Link>
            <Link href="#contato">Contato</Link>
            <Link href="/login">Acesso restrito</Link>
          </div>
        </footer>

        <Link
          href="https://wa.me/5531982673012"
          className="whatsapp-float"
          aria-label="Falar com a REVISA no WhatsApp"
        >
          WhatsApp
        </Link>
      </div>
    </main>
  );
}
