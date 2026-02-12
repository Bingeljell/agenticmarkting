import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Zap, Activity, ArrowRight, Cog } from 'lucide-react';
import AgenticCore from './components/AgenticCore';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const container = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Smooth Cursor
    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");
    window.addEventListener('mousemove', (e) => {
      xSet(e.clientX - 4);
      ySet(e.clientY - 4);
    });

    // Pipeline SVG Path Animation
    const path = document.querySelector("#main-path") as SVGPathElement;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5
        }
      });
    }

    // Animate Data Packets
    const packets = gsap.utils.toArray('.data-packet');
    packets.forEach((packet: any, i) => {
      gsap.to(packet, {
        y: 2000,
        duration: 3 + i,
        repeat: -1,
        ease: "none",
        keyframes: [
          { opacity: 0, duration: 0 },
          { opacity: 1, duration: 0.5 },
          { opacity: 0, duration: 0.5 }
        ]
      });
    });

    // Node Revelations
    gsap.utils.toArray('.agent-node').forEach((node: any) => {
      gsap.from(node, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: node,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

  }, { scope: container });

  return (
    <div ref={container} style={{ position: 'relative', overflowX: 'hidden', backgroundColor: 'var(--deep-carbon)' }}>
      <div id="custom-cursor" ref={cursorRef} />

      {/* SVG Pipeline Backbone */}
      <svg className="pipeline-svg" viewBox="0 0 100 2000" preserveAspectRatio="none">
        <path 
          id="main-path"
          d="M50,0 C70,500 30,1000 50,2000" 
          stroke="var(--neon-emerald)" 
          strokeWidth="1" 
          fill="none" 
          opacity="0.3"
        />
      </svg>

      {/* 1. Hero */}
      <section className="hero-section" style={{ height: '70vh', position: 'relative', overflow: 'hidden' }}>
        <AgenticCore />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ color: 'var(--neon-emerald)', letterSpacing: '0.8em', fontSize: '0.8rem', marginBottom: '1rem' }}>DEPLOYING AGENTS</span>
          <h1>AGENTIC</h1>
          <h1 style={{ color: 'transparent', WebkitTextStroke: '1px white' }}>PIPELINE</h1>
          <div style={{ marginTop: '2rem' }}>
            <button style={{ background: 'var(--neon-emerald)', color: 'black', border: 'none', padding: '1rem 2.5rem', borderRadius: '4px', fontWeight: 800, cursor: 'pointer' }}>
              START AUTOMATION
            </button>
          </div>
        </div>
      </section>

      {/* 2. The Flow */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 5vw', marginTop: '-5vh' }}>
        
        {/* Node 1: Strategy */}
        <div className="agent-node" style={{ alignSelf: 'flex-start', marginLeft: '5%' }}>
          <div className="node-connector left" style={{ width: '150px', right: '-150px' }} />
          <div className="bot-visual">
            <div className="bot-ring" />
            <Brain color="var(--neon-emerald)" size={20} />
          </div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>The Strategist</h2>
          <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>Autonomous market research and competitor analysis to define your winning angle.</p>
        </div>

        {/* Node 2: Creator */}
        <div className="agent-node" style={{ alignSelf: 'flex-end', marginRight: '5%', marginTop: '-2rem' }}>
          <div className="node-connector right" style={{ width: '150px', left: '-150px' }} />
          <div className="bot-visual" style={{ borderColor: 'var(--cyber-gold)' }}>
            <div className="bot-ring" style={{ borderColor: 'var(--cyber-gold)' }} />
            <Zap color="var(--cyber-gold)" size={20} />
          </div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>The Creator</h2>
          <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>Brand-sovereign content generation that resonates with human emotion.</p>
        </div>

        {/* Node 3: Optimizer */}
        <div className="agent-node" style={{ alignSelf: 'flex-start', marginLeft: '5%', marginTop: '-2rem' }}>
          <div className="node-connector left" style={{ width: '150px', right: '-150px' }} />
          <div className="bot-visual">
            <div className="bot-ring" />
            <Activity color="var(--neon-emerald)" size={20} />
          </div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>The Optimizer</h2>
          <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>Real-time performance tracking and distribution adjustment.</p>
        </div>

        {/* Decent Proposal Integration */}
        <div className="agent-node" style={{ maxWidth: '600px', background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.3)', marginTop: '4rem', marginBottom: '4rem' }}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.2 }}>
            <AgenticCore />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.8rem' }}>Decent Proposal</h2>
              <p style={{ marginTop: '0.5rem', opacity: 0.7, fontSize: '0.85rem' }}>The automated mercantile offer engine.</p>
              <a href="https://decentproposal.agenticmarkting.work" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', marginTop: '1.5rem', color: 'var(--neon-emerald)', textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem' }}>
                EXPLORE SUITE <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </a>
            </div>
            <Cog size={60} color="var(--neon-emerald)" style={{ animation: 'rotate 15s linear infinite' }} />
          </div>
        </div>

      </div>

      <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ opacity: 0.2, fontSize: '0.7rem', letterSpacing: '0.3em' }}>AGENTIC MARKETING INFRASTRUCTURE // MMXXVI</p>
      </footer>
    </div>
  );
};

export default App;
