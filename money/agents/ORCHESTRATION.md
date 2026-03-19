# Multi-Agent Orchestration System

## Active Agents

### 1. Research Agent
- **Purpose**: Market research, opportunity discovery, competitive analysis
- **Status**: Ready to spawn
- **Runtime**: subagent

### 2. Coding Agent  
- **Purpose**: Build products, automation scripts, APIs
- **Status**: Ready to spawn
- **Runtime**: subagent (using sessions_spawn with acp or subagent)

### 3. Sales Agent
- **Purpose**: Find leads, outreach, close deals
- **Status**: Ready to spawn
- **Runtime**: subagent

### 4. Content Agent
- **Purpose**: Create content, social media, blog posts
- **Status**: Ready to spawn
- **Runtime**: subagent

### 5. Operations Agent
- **Purpose**: Manage crons, automation, systems
- **Status**: Active (main agent)

---

## Orchestration Flow

```
[Main Agent] → Coordinates all
     ↓
  ┌──┴──┐
  ↓     ↓
[Research] [Coding] → Build + Research
  ↓     ↓
  └──┬──┘
     ↓
 [Sales] → Monetize
     ↓
[Content] → Amplify
```

## Daily Workflow
1. Research finds opportunities
2. Coding builds products
3. Sales finds customers
4. Content amplifies reach
5. Operations keeps systems running

---

## Success Metrics
- Revenue generated
- Products shipped
- Leads converted
- Content engagement
