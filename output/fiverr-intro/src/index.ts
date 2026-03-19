import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Audio, Text } from "remotion";
import { Bot, Globe, MessageCircle, Zap, ArrowRight, Send } from "lucide-react";

const FPS = 30;
const DURATION = 30;

const Scene1_Greeting = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const waveY = spring({ frame, fps, from: 20, to: 0, durationInFrames: 25 });
  const fadeIn = interpolate(frame, [0, 20], [0, 1]);

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0a0a0f" }}>
      <div style={{ textAlign: "center", transform: `translateY(${waveY}px)`, opacity: fadeIn }}>
        <Text style={{ fontSize: 80, fontWeight: 700, color: "#fff", fontFamily: "Inter, sans-serif", marginBottom: 20 }}>
          Hi there! 👋
        </Text>
        <Text style={{ fontSize: 50, fontWeight: 500, color: "#a1a1aa", fontFamily: "Inter, sans-serif" }}>
          I'm Neil
        </Text>
      </div>
    </div>
  );
};

const Scene2_Services = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stagger = 15;
  const icons = [
    { Icon: Bot, text: "RAG Chatbot", sub: "For your business" },
    { Icon: MessageCircle, text: "Discord Bot", sub: "Fully functional" },
    { Icon: Globe, text: "Website", sub: "Clean & nice" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0a0a0f", gap: 60 }}>
      {icons.map(({ Icon, text, sub }, i) => {
        const delay = i * stagger;
        const y = spring({ frame: frame - delay, fps, from: 50, to: 0, durationInFrames: 30 });
        const opacity = interpolate(frame - delay, [0, 20], [0, 1]);
        const scale = spring({ frame: frame - delay, fps, from: 0.8, to: 1, durationInFrames: 25 });

        if (frame < delay - 10) return null;

        return (
          <div key={i} style={{ 
            transform: `translateY(${y}px) scale(${scale})`, 
            opacity, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            gap: 16
          }}>
            <div style={{ 
              width: 100, height: 100, 
              borderRadius: 24, 
              backgroundColor: "#1e1e2e", 
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid #2a2a3e"
            }}>
              <Icon size={40} color="#6366f1" />
            </div>
            <Text style={{ fontSize: 24, fontWeight: 600, color: "#fff", fontFamily: "Inter, sans-serif" }}>{text}</Text>
            <Text style={{ fontSize: 16, color: "#71717a", fontFamily: "Inter, sans-serif" }}>{sub}</Text>
          </div>
        );
      })}
    </div>
  );
};

const Scene3_Value = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideX = spring({ frame, fps, from: -100, to: 0, durationInFrames: 30 });
  const fadeIn = interpolate(frame, [10, 30], [0, 1]);

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0a0a0f" }}>
      <div style={{ 
        transform: `translateX(${slideX}px)`, 
        opacity: fadeIn,
        display: "flex", 
        alignItems: "center", 
        gap: 20,
        backgroundColor: "#1e1e2e",
        padding: "30px 50px",
        borderRadius: 16,
        border: "1px solid #2a2a3e"
      }}>
        <Zap size={36} color="#fbbf24" />
        <Text style={{ fontSize: 32, fontWeight: 600, color: "#fff", fontFamily: "Inter, sans-serif" }}>
          Fast & high-quality results that actually move the needle
        </Text>
      </div>
    </div>
  );
};

const Scene4_CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, from: 0.9, to: 1, durationInFrames: 30 });
  const fadeIn = interpolate(frame, [5, 20], [0, 1]);

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0a0a0f", flexDirection: "column", gap: 30 }}>
      <div style={{ transform: `scale(${scale})`, opacity: fadeIn, textAlign: "center" }}>
        <Text style={{ fontSize: 42, fontWeight: 700, color: "#fff", fontFamily: "Inter, sans-serif", marginBottom: 16 }}>
          Ready to turn your idea into reality?
        </Text>
        <Text style={{ fontSize: 28, color: "#a1a1aa", fontFamily: "Inter, sans-serif" }}>
          Let's make it happen together
        </Text>
      </div>
      <div style={{ 
        display: "flex", alignItems: "center", gap: 12, 
        backgroundColor: "#6366f1", 
        padding: "16px 32px", 
        borderRadius: 12,
        marginTop: 20
      }}>
        <Send size={24} color="#fff" />
        <Text style={{ fontSize: 22, fontWeight: 600, color: "#fff", fontFamily: "Inter, sans-serif" }}>
          Send me a message — I reply fast!
        </Text>
      </div>
    </div>
  );
};

const Scene5_Close = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bounce = spring({ frame, fps, from: 30, to: 0, durationInFrames: 35, config: { damping: 10 } });
  const fadeIn = interpolate(frame, [10, 25], [0, 1]);

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0a0a0f", flexDirection: "column", gap: 24 }}>
      <div style={{ transform: `translateY(${bounce}px)`, opacity: fadeIn, textAlign: "center" }}>
        <Text style={{ fontSize: 48, fontWeight: 700, color: "#fff", fontFamily: "Inter, sans-serif", marginBottom: 12 }}>
          Looking forward to working with you! 🚀
        </Text>
        <Text style={{ fontSize: 28, color: "#6366f1", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
          @neilwilliam
        </Text>
      </div>
    </div>
  );
};

export const FiverrVideo = () => {
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0f" }}>
      <Sequence from={0} durationInFrames={90}>
        <Scene1_Greeting />
      </Sequence>
      <Sequence from={75} durationInFrames={150}>
        <Scene2_Services />
      </Sequence>
      <Sequence from={210} durationInFrames={120}>
        <Scene3_Value />
      </Sequence>
      <Sequence from={315} durationInFrames={150}>
        <Scene4_CTA />
      </Sequence>
      <Sequence from={450} durationInFrames={150}>
        <Scene5_Close />
      </Sequence>
    </AbsoluteFill>
  );
};

export default FiverrVideo;