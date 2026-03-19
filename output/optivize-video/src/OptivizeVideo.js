import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Brain, TrendingUp, PenTool, Sparkles, ArrowRight } from "lucide-react";

// Brand colors from Optivize
const BRAND = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#22c55e",
  dark: "#0f172a",
};

// Scene durations
const SCENES = {
  intro: 90,
  hook: 60,
  features: 150,
  demo: 120,
  cta: 90,
};

// Animated background
const AnimatedBackground = ({ frame }) => {
  const gradient = interpolate(frame, [0, 300], [0, 360], { extrapolateRight: "clamp" });
  
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      background: `linear-gradient(${gradient}deg, ${BRAND.dark} 0%, ${BRAND.primary}22 50%, ${BRAND.dark} 100%)`,
    }} />
  );
};

// Logo reveal component
const LogoReveal = ({ frame }) => {
  const { fps } = useVideoConfig();
  
  const scale = spring({ frame, fps, config: { damping: 12 } });
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const y = spring({ frame, fps, from: 50, config: { damping: 15 } });
  
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
    }}>
      <div style={{
        width: 160,
        height: 160,
        borderRadius: 40,
        background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity,
        boxShadow: `0 0 80px ${BRAND.primary}66`,
      }}>
        <Brain size={80} color="white" />
      </div>
      <div style={{
        fontSize: 64,
        fontWeight: 800,
        color: "white",
        transform: `translateY(${y}px)`,
        opacity,
        letterSpacing: "-2px",
      }}>
        Optivize
      </div>
      <div style={{
        fontSize: 24,
        color: "#94a3b8",
        opacity,
        marginTop: 10,
      }}>
        AI-Powered Business Solutions
      </div>
    </div>
  );
};

// Feature card component
const FeatureCard = ({ icon: Icon, title, desc, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({ frame: frame - delay, fps, config: { damping: 15 } });
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: "clamp" });
  const x = interpolate(frame - delay, [0, 30], [100, 0]);
  
  const colors = [BRAND.primary, BRAND.secondary, BRAND.accent];
  const accentColor = colors[delay % 3];
  
  return (
    <div style={{
      transform: `scale(${scale}) translateX(${x}px)`,
      opacity,
      background: "rgba(255,255,255,0.05)",
      borderRadius: 24,
      padding: 32,
      border: `1px solid ${accentColor}33`,
      backdropFilter: "blur(10px)",
    }}>
      <div style={{
        width: 60,
        height: 60,
        borderRadius: 16,
        background: `${accentColor}22`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}>
        <Icon size={32} color={accentColor} />
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 700, color: "white", marginBottom: 12 }}>
        {title}
      </h3>
      <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.5 }}>
        {desc}
      </p>
    </div>
  );
};

// Features scene
const FeaturesScene = () => {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 60,
    }}>
      <h2 style={{
        fontSize: 48,
        fontWeight: 800,
        color: "white",
        marginBottom: 60,
        textAlign: "center",
      }}>
        Everything you need to{' '}
        <span style={{ color: BRAND.primary }}>scale</span>
      </h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
        width: "100%",
        maxWidth: 1200,
      }}>
        <FeatureCard 
          icon={Brain} 
          title="AI Business Plans" 
          desc="Generate comprehensive business plans in seconds with AI"
          delay={15}
        />
        <FeatureCard 
          icon={PenTool} 
          title="Logo Design" 
          desc="Create stunning logos that capture your brand essence"
          delay={30}
        />
        <FeatureCard 
          icon={TrendingUp} 
          title="Marketing Strategy" 
          desc="Data-driven marketing strategies that convert"
          delay={45}
        />
      </div>
    </div>
  );
};

// Demo scene
const DemoScene = ({ frame }) => {
  const terminalOpacity = interpolate(frame, [0, 30], [0, 1]);
  
  const lines = [
    { text: "> Analyzing your business...", delay: 30 },
    { text: "> Generating business plan...", delay: 60 },
    { text: "> Creating marketing strategy...", delay: 90 },
  ];
  
  const visibleLines = Math.floor((frame - 15) / 20);
  
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: 800,
        background: "#1e293b",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        opacity: terminalOpacity,
      }}>
        <div style={{
          display: "flex",
          gap: 8,
          padding: "16px 20px",
          background: "#0f172a",
        }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#eab308" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ marginLeft: "auto", color: "#64748b", fontSize: 14, fontFamily: "monospace" }}>
            optivize
          </span>
        </div>
        
        <div style={{ padding: 30, fontFamily: "monospace", fontSize: 18, color: "#22c55e", minHeight: 300 }}>
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <span style={{ color: "#6366f1" }}>{line.text}</span>
            </div>
          ))}
          
          {visibleLines >= 3 && (
            <div style={{ marginTop: 20, padding: 20, background: `${BRAND.primary}22`, borderRadius: 12, border: `1px solid ${BRAND.primary}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Sparkles size={24} color={BRAND.primary} />
                <span style={{ color: "white", fontWeight: 600, fontSize: 20 }}>Plan Generated!</span>
              </div>
              <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.8 }}>
                ✓ Executive Summary<br/>
                ✓ Market Analysis<br/>
                ✓ Financial Projections<br/>
                ✓ Marketing Strategy
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// CTA Scene
const CTAScene = ({ frame }) => {
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const buttonScale = spring({ frame: frame - 30, fps, config: { damping: 10 } });
  
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 30,
    }}>
      <h2 style={{
        fontSize: 56,
        fontWeight: 800,
        color: "white",
        textAlign: "center",
        opacity,
      }}>
        Start building your{' '}
        <span style={{ 
          background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          empire
        </span>
      </h2>
      
      <p style={{
        fontSize: 22,
        color: "#94a3b8",
        textAlign: "center",
        maxWidth: 600,
        opacity,
      }}>
        Join thousands of entrepreneurs using AI to build faster, smarter businesses.
      </p>
      
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 40px",
        background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
        borderRadius: 16,
        transform: `scale(${buttonScale})`,
        cursor: "pointer",
      }}>
        <span style={{ color: "white", fontSize: 20, fontWeight: 700 }}>Get Started Free</span>
        <ArrowRight size={24} color="white" />
      </div>
      
      <div style={{ display: "flex", gap: 40, marginTop: 20, opacity }}>
        {[
          { num: "10K+", label: "Users" },
          { num: "50K+", label: "Plans Generated" },
          { num: "4.9", label: "Rating" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "white" }}>{stat.num}</div>
            <div style={{ fontSize: 14, color: "#64748b" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Floating shapes
const FloatingShapes = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const shapes = [
    { x: width * 0.1, y: height * 0.2, size: 80, color: BRAND.primary, delay: 0 },
    { x: width * 0.85, y: height * 0.3, size: 120, color: BRAND.secondary, delay: 50 },
    { x: width * 0.15, y: height * 0.7, size: 60, color: BRAND.accent, delay: 100 },
    { x: width * 0.9, y: height * 0.8, size: 100, color: BRAND.primary, delay: 80 },
  ];
  
  return (
    <>
      {shapes.map((shape, i) => {
        const yOffset = interpolate(frame - shape.delay, [0, 200], [0, 30], { extrapolateRight: "clamp" });
        const opacity = interpolate(frame - shape.delay, [0, 30, 170, 200], [0, 0.3, 0.3, 0], { extrapolateRight: "clamp" });
        
        return (
          <div key={i} style={{
            position: "absolute",
            left: shape.x,
            top: shape.y + yOffset,
            width: shape.size,
            height: shape.size,
            borderRadius: shape.size / 4,
            background: shape.color,
            opacity,
            filter: "blur(40px)",
          }} />
        );
      })}
    </>
  );
};

// Main video component
export const OptivizeVideo = () => {
  const frame = useCurrentFrame();
  const totalFrames = 510;
  
  let scene = "intro";
  let sceneFrame = frame;
  
  if (frame >= SCENES.intro + SCENES.hook) {
    if (frame < SCENES.intro + SCENES.hook + SCENES.features) {
      scene = "features";
      sceneFrame = frame - SCENES.intro - SCENES.hook;
    } else if (frame < SCENES.intro + SCENES.hook + SCENES.features + SCENES.demo) {
      scene = "demo";
      sceneFrame = frame - SCENES.intro - SCENES.hook - SCENES.features;
    } else {
      scene = "cta";
      sceneFrame = frame - SCENES.intro - SCENES.hook - SCENES.features - SCENES.demo;
    }
  } else if (frame >= SCENES.intro) {
    scene = "hook";
    sceneFrame = frame - SCENES.intro;
  }
  
  return (
    <AbsoluteFill style={{ background: BRAND.dark }}>
      <AnimatedBackground frame={frame} />
      <FloatingShapes />
      
      {scene === "intro" && <LogoReveal frame={sceneFrame} />}
      {scene === "features" && <FeaturesScene />}
      {scene === "demo" && <DemoScene frame={sceneFrame} />}
      {scene === "cta" && <CTAScene frame={sceneFrame} />}
      
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "rgba(255,255,255,0.1)" }}>
        <div style={{ height: "100%", width: `${(frame / totalFrames) * 100}%`, background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})` }} />
      </div>
    </AbsoluteFill>
  );
};
