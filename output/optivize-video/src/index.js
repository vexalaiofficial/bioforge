import { registerRoot, Composition, AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { Brain, TrendingUp, PenTool, Sparkles, ArrowRight, Check, Rocket, Target, Zap, Users, Star, Play, ChevronRight } from "lucide-react";

// Brand colors from Optivize
const BRAND = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#22c55e",
  dark: "#09090b",
  darkCard: "#18181b",
  text: "#fafafa",
  textMuted: "#a1a1aa",
};

// Total: 60 seconds at 30fps = 1800 frames
const SCENES = {
  hook: 90,        // 3s - Pain point
  intro: 90,       // 3s - Solution reveal
  features: 600,   // 20s - Feature showcase (10 items, 60 frames each)
  demo: 300,       // 10s - AI in action
  social: 300,     // 10s - Social proof
  cta: 420,        // 14s - Final CTA
};

// Utility: interpolate
const i = (frame, from, to) => interpolate(frame, from, to, { extrapolateRight: "clamp" });

// Utility: spring animation
const s = (frame, fps, delay = 0, config = { damping: 15 }) => 
  spring({ frame: frame - delay, fps, config });

// Flying particle component
const Particle = ({ x, y, size, color, delay, frame }) => {
  const yOffset = i(frame - delay, [0, 200, 400], [0, -80, 0]);
  const xOffset = i(frame - delay, [0, 100, 200], [0, 30, 0]);
  const opacity = i(frame - delay, [0, 30, 170, 200], [0, 0.6, 0.6, 0]);
  const rotation = i(frame - delay, [0, 200], [0, 360]);
  
  return (
    <div style={{
      position: "absolute",
      left: x + xOffset,
      top: y + yOffset,
      width: size,
      height: size,
      borderRadius: size / 4,
      background: color,
      opacity,
      transform: `rotate(${rotation}deg)`,
      filter: `blur(${size / 4}px)`,
    }} />
  );
};

// Background with flying particles
const FlyingBackground = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const particles = [
    { x: width * 0.1, y: height * 0.2, size: 100, color: BRAND.primary, delay: 0 },
    { x: width * 0.85, y: height * 0.15, size: 150, color: BRAND.secondary, delay: 40 },
    { x: width * 0.2, y: height * 0.7, size: 80, color: BRAND.accent, delay: 80 },
    { x: width * 0.9, y: height * 0.8, size: 120, color: BRAND.primary, delay: 120 },
    { x: width * 0.5, y: height * 0.5, size: 60, color: BRAND.secondary, delay: 160 },
    { x: width * 0.7, y: height * 0.3, size: 90, color: "#f59e0b", delay: 60 },
    { x: width * 0.3, y: height * 0.4, size: 70, color: "#ec4899", delay: 100 },
    { x: width * 0.6, y: height * 0.75, size: 110, color: "#14b8a6", delay: 140 },
  ];
  
  return (
    <>
      {particles.map((p, i) => (
        <Particle key={i} {...p} frame={frame} />
      ))}
    </>
  );
};

// Text reveal character by character
const RevealText = ({ text, delay, style }) => {
  const frame = useCurrentFrame();
  const chars = text.split("");
  
  return (
    <div style={{ display: "flex", ...style }}>
      {chars.map((char, charIndex) => {
        const charOpacity = interpolate(frame - delay - charIndex * 3, [0, 8], [0, 1]);
        const charY = interpolate(frame - delay - charIndex * 3, [0, 8], [20, 0]);
        
        return (
          <span key={charIndex} style={{ 
            opacity: charOpacity, 
            transform: `translateY(${charY}px)`,
            display: "inline-block",
          }}>
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};

// HOOK SCENE - Pain point
const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const q1Opacity = i(frame, [0, 30], [0, 1]);
  const q1Scale = s(frame, fps, 0, { damping: 12 });
  
  return (
    <AbsoluteFill style={{ background: BRAND.dark, justifyContent: "center", alignItems: "center" }}>
      <FlyingBackground />
      
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <RevealText 
          text="Struggling to build your business?" 
          delay={0} 
          style={{ 
            fontSize: 56, 
            fontWeight: 800, 
            color: BRAND.text,
            marginBottom: 24,
          }} 
        />
        <RevealText 
          text="Spending hours on business plans?" 
          delay={60} 
          style={{ 
            fontSize: 40, 
            fontWeight: 600, 
            color: BRAND.textMuted,
            marginBottom: 24,
          }} 
        />
        <RevealText 
          text="Not sure where to start?" 
          delay={120} 
          style={{ 
            fontSize: 40, 
            fontWeight: 600, 
            color: BRAND.textMuted,
          }} 
        />
      </div>
      
      {/* Arrow down */}
      <div style={{
        position: "absolute",
        bottom: 60,
        opacity: i(frame, [60, 90], [0, 1]),
      }}>
        <ChevronRight size={40} color={BRAND.primary} style={{ transform: "rotate(90deg)" }} />
      </div>
    </AbsoluteFill>
  );
};

// INTRO SCENE - Solution
const IntroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const logoScale = s(frame, fps, 0, { damping: 15 });
  const logoOpacity = i(frame, [0, 30], [0, 1]);
  const textOpacity = i(frame, [30, 60], [0, 1]);
  const textY = s(frame, fps, 30, { damping: 15 });
  
  return (
    <AbsoluteFill style={{ background: BRAND.dark, justifyContent: "center", alignItems: "center" }}>
      <FlyingBackground />
      
      <div style={{
        transform: `scale(${logoScale})`,
        opacity: logoOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}>
        <div style={{
          width: 160,
          height: 160,
          borderRadius: 40,
          background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 40px 80px ${BRAND.primary}44`,
        }}>
          <Brain size={80} color="white" />
        </div>
        
        <div style={{
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 64, fontWeight: 800, color: BRAND.text, letterSpacing: "-2px" }}>
            Optivize
          </div>
          <div style={{ fontSize: 20, color: BRAND.textMuted, marginTop: 8 }}>
            Your AI Business Partner
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Feature card that flies in
const FeatureCard = ({ icon: Icon, title, desc, delay, color, x }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = s(frame, fps, delay, { damping: 12 });
  const opacity = i(frame - delay, [0, 15], [0, 1]);
  const cardX = i(frame - delay, [0, 40], [x > 0 ? 200 : -200, 0]);
  
  return (
    <div style={{
      position: "absolute",
      left: x,
      top: "50%",
      transform: `translateY(-50%) translateX(${cardX}px) scale(${scale})`,
      opacity,
      background: BRAND.darkCard,
      borderRadius: 24,
      padding: 32,
      border: `1px solid ${color}22`,
      width: 380,
      display: "flex",
      gap: 20,
      alignItems: "flex-start",
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        background: `${color}18`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon size={28} color={color} />
      </div>
      <div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: BRAND.text, marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 15, color: BRAND.textMuted, lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  );
};

// FEATURES SCENE
const FeaturesScene = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  
  const features = [
    { icon: Brain, title: "AI Business Plans", desc: "Generate comprehensive plans in seconds, not weeks", color: BRAND.primary },
    { icon: PenTool, title: "Logo Design", desc: "Professional logos that capture your brand essence", color: BRAND.secondary },
    { icon: TrendingUp, title: "Marketing Strategy", desc: "Data-driven strategies that maximize ROI", color: BRAND.accent },
    { icon: Target, title: "Market Research", desc: "Deep insights into your audience and competition", color: "#f59e0b" },
    { icon: Rocket, title: "Growth Planning", desc: "Scalable strategies for sustainable expansion", color: "#ec4899" },
    { icon: Users, title: "Customer Insights", desc: "Understand your customers at a deeper level", color: "#14b8a6" },
    { icon: Zap, title: "Instant Results", desc: "Everything you need in minutes, not months", color: BRAND.primary },
    { icon: Star, title: "Quality Output", desc: "Enterprise-grade quality, startup-friendly", color: BRAND.secondary },
    { icon: Check, title: "Always Current", desc: "AI trained on latest business trends", color: BRAND.accent },
    { icon: Sparkles, title: "Limitless Ideas", desc: "Unlimited creativity powered by AI", color: "#f59e0b" },
  ];
  
  // Show 1 feature at a time, each for 60 frames
  const featureIndex = Math.floor(frame / 60);
  const currentFeature = features[featureIndex % features.length];
  const centerX = (width - 380) / 2;
  
  return (
    <AbsoluteFill style={{ background: BRAND.dark }}>
      <FlyingBackground />
      <FeatureCard {...currentFeature} delay={15} x={centerX} />
    </AbsoluteFill>
  );
};

// DEMO SCENE - AI in action
const DemoScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const containerOpacity = i(frame, [0, 30], [0, 1]);
  
  const lines = [
    { text: "> Analyzing your business goals...", color: BRAND.primary, delay: 30 },
    { text: "> Researching market trends...", color: "#f59e0b", delay: 70 },
    { text: "> Generating business plan...", color: BRAND.secondary, delay: 110 },
    { text: "> Creating marketing strategy...", color: BRAND.accent, delay: 150 },
    { text: "> Designing logo concepts...", color: "#ec4899", delay: 190 },
    { text: "> Optimizing for growth...", color: "#14b8a6", delay: 230 },
  ];
  
  const visibleLines = Math.min(Math.floor((frame - 15) / 25), lines.length);
  
  return (
    <AbsoluteFill style={{ background: BRAND.dark, justifyContent: "center", alignItems: "center" }}>
      <FlyingBackground />
      
      <div style={{
        width: 800,
        background: BRAND.darkCard,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        opacity: containerOpacity,
      }}>
        {/* Terminal header */}
        <div style={{ display: "flex", gap: 8, padding: "16px 20px", background: "#0f0f0f" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#eab308" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ marginLeft: "auto", color: "#64748b", fontSize: 14, fontFamily: "monospace" }}>
            Optivize AI
          </span>
        </div>
        
        {/* Terminal body */}
        <div style={{ padding: 32, fontFamily: "monospace", fontSize: 18, minHeight: 350 }}>
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ 
              marginBottom: 16, 
              display: "flex", 
              alignItems: "center", 
              gap: 12,
              color: line.color 
            }}>
              <Sparkles size={18} />
              <span>{line.text}</span>
              {i === visibleLines - 1 && (
                <span style={{ 
                  display: "inline-block", 
                  width: 8, 
                  height: 18, 
                  background: line.color,
                  animation: "blink 1s infinite",
                }} />
              )}
            </div>
          ))}
          
          {visibleLines >= lines.length && (
            <div style={{ 
              marginTop: 24, 
              padding: 24, 
              background: `${BRAND.primary}15`,
              borderRadius: 16,
              border: `1px solid ${BRAND.primary}33`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Check size={24} color={BRAND.accent} />
                <span style={{ color: "white", fontWeight: 600, fontSize: 20 }}>
                  All Done! Your business is ready to grow.
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {["✓ Business Plan", "✓ Marketing Strategy", "✓ Logo Designs", "✓ Growth Roadmap"].map((item, i) => (
                  <div key={i} style={{ color: BRAND.textMuted, fontSize: 14 }}>{item}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// SOCIAL PROOF SCENE
const SocialScene = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const stats = [
    { num: "10,000+", label: "Active Users", x: width * 0.15 },
    { num: "50,000+", label: "Plans Generated", x: width * 0.38 },
    { num: "4.9/5", label: "User Rating", x: width * 0.62 },
    { num: "99.9%", label: "Uptime", x: width * 0.85 },
  ];
  
  return (
    <AbsoluteFill style={{ background: BRAND.dark, justifyContent: "center" }}>
      <FlyingBackground />
      
      <div style={{
        fontSize: 28,
        color: BRAND.primary,
        fontWeight: 600,
        letterSpacing: "3px",
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: 60,
        opacity: i(frame, [0, 30], [0, 1]),
      }}>
        Trusted by thousands
      </div>
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        {stats.map((stat, i) => {
          const opacity = i(frame - i * 20, [0, 20], [0, 1]);
          const scale = s(frame, 30, i * 20, { damping: 12 });
          const y = i(frame - i * 20, [0, 30], [60, 0]);
          
          return (
            <div key={i} style={{
              transform: `translateY(${y}px) scale(${scale})`,
              opacity,
              textAlign: "center",
              margin: "0 20px",
            }}>
              <div style={{ 
                fontSize: 52, 
                fontWeight: 800, 
                color: BRAND.text,
                background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {stat.num}
              </div>
              <div style={{ fontSize: 16, color: BRAND.textMuted, marginTop: 8 }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Testimonials */}
      <div style={{
        marginTop: 80,
        display: "flex",
        justifyContent: "center",
        gap: 24,
        opacity: i(frame - 60, [0, 30], [0, 1]),
      }}>
        {[
          { name: "Sarah C.", role: "Startup Founder", text: "Generated my entire business plan in 5 minutes!", avatar: "SC" },
          { name: "Mike T.", role: "Entrepreneur", text: "The best AI tool I've used. Highly recommend!", avatar: "MT" },
        ].map((t, i) => (
          <div key={i} style={{
            background: BRAND.darkCard,
            borderRadius: 20,
            padding: 24,
            width: 300,
            border: `1px solid ${BRAND.primary}22`,
          }}>
            <p style={{ color: BRAND.text, fontSize: 15, marginBottom: 16, lineHeight: 1.5 }}>"{t.text}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
              }}>
                {t.avatar}
              </div>
              <div>
                <div style={{ color: BRAND.text, fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                <div style={{ color: BRAND.textMuted, fontSize: 12 }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// CTA SCENE
const CTAScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = i(frame, [0, 30], [0, 1]);
  const buttonScale = s(frame, fps, 30, { damping: 10 });
  
  return (
    <AbsoluteFill style={{ background: BRAND.dark, justifyContent: "center", alignItems: "center" }}>
      <FlyingBackground />
      
      <div style={{ textAlign: "center", opacity, maxWidth: 800 }}>
        <h2 style={{
          fontSize: 60,
          fontWeight: 800,
          color: BRAND.text,
          marginBottom: 24,
          lineHeight: 1.1,
        }}>
          Start building your{' '}
          <span style={{ 
            background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            empire
          </span>
          {' '}today
        </h2>
        
        <p style={{
          fontSize: 24,
          color: BRAND.textMuted,
          marginBottom: 40,
          lineHeight: 1.5,
        }}>
          Join thousands of entrepreneurs already growing with Optivize.
        </p>
        
        <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center" }}>
          <div style={{
            padding: "24px 48px",
            background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
            borderRadius: 16,
            transform: `scale(${buttonScale})`,
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}>
            <span style={{ color: "white", fontSize: 20, fontWeight: 700 }}>Get Started Free</span>
            <ArrowRight size={24} color="white" />
          </div>
        </div>
        
        <p style={{
          fontSize: 14,
          color: BRAND.textMuted,
          marginTop: 24,
        }}>
          No credit card required • Free forever plan available
        </p>
        
        {/* Final logo */}
        <div style={{
          marginTop: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          opacity: i(frame - 120, [0, 20], [0, 1]),
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.secondary})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Brain size={24} color="white" />
          </div>
          <span style={{ fontSize: 24, fontWeight: 700, color: BRAND.text }}>Optivize</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// MAIN COMPONENT
export const OptivizeVideo = () => {
  const frame = useCurrentFrame();
  const totalFrames = 1800;
  
  let scene = "hook";
  let sceneFrame = frame;
  
  if (frame >= SCENES.hook) {
    if (frame < SCENES.hook + SCENES.intro) {
      scene = "intro";
      sceneFrame = frame - SCENES.hook;
    } else if (frame < SCENES.hook + SCENES.intro + SCENES.features) {
      scene = "features";
      sceneFrame = frame - SCENES.hook - SCENES.intro;
    } else if (frame < SCENES.hook + SCENES.intro + SCENES.features + SCENES.demo) {
      scene = "demo";
      sceneFrame = frame - SCENES.hook - SCENES.intro - SCENES.features;
    } else if (frame < SCENES.hook + SCENES.intro + SCENES.features + SCENES.demo + SCENES.social) {
      scene = "social";
      sceneFrame = frame - SCENES.hook - SCENES.intro - SCENES.features - SCENES.demo;
    } else {
      scene = "cta";
      sceneFrame = frame - SCENES.hook - SCENES.intro - SCENES.features - SCENES.demo - SCENES.social;
    }
  }
  
  return (
    <AbsoluteFill style={{ background: BRAND.dark }}>
      {scene === "hook" && <HookScene />}
      {scene === "intro" && <IntroScene />}
      {scene === "features" && <FeaturesScene />}
      {scene === "demo" && <DemoScene />}
      {scene === "social" && <SocialScene />}
      {scene === "cta" && <CTAScene />}
      
      {/* Progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "rgba(255,255,255,0.1)" }}>
        <div style={{ height: "100%", width: `${(frame / totalFrames) * 100}%`, background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})` }} />
      </div>
    </AbsoluteFill>
  );
};

// Register with Remotion
registerRoot(() => (
  <Composition
    id="OptivizeVideo"
    component={OptivizeVideo}
    durationInFrames={1800}
    fps={30}
    width={1920}
    height={1080}
  />
));
