import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink, Layers, Database, Activity, Wind, GraduationCap,
  X, ChevronRight, Cpu, Layout, Github, Server, Mail,
  FolderOpen, Mic2, Volume2, Sparkles, Send, Bot, Loader2, Briefcase,
  Users, FileText, Lightbulb, Target, BriefcaseBusiness, TrendingUp, ClipboardCheck, Terminal
} from 'lucide-react';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; // La clave se proporciona en el entorno de ejecución (ej. Vercel)

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Chat States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Andrés's AI assistant. My database is connected. How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Project Insights State
  const [aiInsights, setAiInsights] = useState(null);
  const [hrExplanation, setHrExplanation] = useState(null);
  const [isHrLoading, setIsHrLoading] = useState(false);

  // Industry Adaptor States
  const [visitorIndustry, setVisitorIndustry] = useState('');
  const [industryAdaptation, setIndustryAdaptation] = useState(null);
  const [isAdapting, setIsAdapting] = useState(false);

  // Job Fit Analyzer & Career Suite States
  const [jobDescription, setJobDescription] = useState('');
  const [fitAnalysis, setFitAnalysis] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [interviewPrep, setInterviewPrep] = useState(null);
  const [roiAnalysis, setRoiAnalysis] = useState(null);
  const [jobPostAudit, setJobPostAudit] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [isGeneratingPrep, setIsGeneratingPrep] = useState(false);
  const [isGeneratingROI, setIsGeneratingROI] = useState(false);
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);

  // Architecture Generator States
  const [businessProblem, setBusinessProblem] = useState('');
  const [architectureProposal, setArchitectureProposal] = useState(null);
  const [isGeneratingArch, setIsGeneratingArch] = useState(false);

  // NEW: Autonomous Agent Terminal States
  const [agentLogs, setAgentLogs] = useState([]);
  const [isAgentActive] = useState(true);

  const chatEndRef = useRef(null);
  // Reemplazamos logsEndRef por un ref para el contenedor entero
  const terminalContainerRef = useRef(null);

  // NEW: Simulate Autonomous Agent backend logs
  useEffect(() => {
    if (!isAgentActive) return;

    const simulateLogs = [
      { text: "[SYSTEM] Initializing Autonomous Job Hunter Agent (v2.1)...", delay: 1000, color: "text-slate-400" },
      { text: "[CRON] Scanning Dublin Tech Hub...", delay: 2500, color: "text-blue-400" },
      { text: "[SCRAPER] Extracting 15 recent 'AI Solutions Architect' vacancies...", delay: 4500, color: "text-slate-300" },
      { text: "[LLM] Evaluating vacancy at 'FinTech Scaleup' > Fit Analysis: 89% (Supabase, n8n, Python detected).", delay: 7000, color: "text-emerald-400" },
      { text: "[AGENT] Decision: PROCEED TO APPLY.", delay: 8500, color: "text-white font-bold" },
      { text: "[GENERATOR] Crafting dynamic Cover Letter using Gemini 2.5 Flash model...", delay: 10500, color: "text-amber-400" },
      { text: "[PLAYWRIGHT] Navigating to ATS (Greenhouse)... Injecting Resume data...", delay: 13000, color: "text-slate-300" },
      { text: "[SUCCESS] Application completed successfully. Saving record to Supabase DB.", delay: 16000, color: "text-emerald-500 font-bold" },
      { text: "[SYSTEM] Sleep mode activated. Next scan in 4 hours.", delay: 18000, color: "text-slate-500" }
    ];

    let timeouts = [];

    const startSimulation = () => {
      setAgentLogs([]);
      simulateLogs.forEach((log) => {
        const timeout = setTimeout(() => {
          setAgentLogs(prev => [...prev, log]);
        }, log.delay);
        timeouts.push(timeout);
      });
    };

    startSimulation();

    // Loop simulation every 25 seconds for the demo
    const loopTimeout = setInterval(startSimulation, 25000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(loopTimeout);
    };
  }, [isAgentActive]);

  // CORRECCIÓN: Scroll solo dentro del contenedor de la terminal
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [agentLogs]);

  const projects = [
    {
      id: 'roomflow',
      title: 'Roomflow',
      subtitle: 'AI-Driven SaaS Platform',
      shortDesc: 'Multi-tenant architecture for workflow optimization and automated task management.',
      fullDesc: 'A comprehensive SaaS solution designed to streamline professional workflows. The project focuses on providing a scalable environment where multiple organizations can manage their logic independently while leveraging centralized AI processing.',
      functionality: 'The platform manages user authentication, organizational data isolation, and dynamic AI-powered task generation. It uses a centralized engine to process requests and update the UI in real-time.',
      tools: ['Supabase', 'PostgreSQL', 'Vercel', 'AI Integration', 'Auth & Storage'],
      status: 'In Production',
      url: 'https://www.roomflow.space/',
      icon: <Layout className="w-6 h-6 text-blue-400" />,
      color: 'from-blue-500 to-cyan-400',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'easyfitness',
      title: 'EasyFitness Coach',
      subtitle: 'Expert-Level AI Coaching',
      shortDesc: 'Bridging Sport Science and Generative AI to provide personalized athletic guidance.',
      fullDesc: 'This project translates domain expertise in Sport Science (UPM) into a digital AI product. It simulates a professional coach by analyzing user data and generating tailored training and recovery plans.',
      functionality: 'Input data from users is processed through a proprietary coaching logic layer, then enriched with LLM generation to provide natural, expert-level feedback and scheduling.',
      tools: ['AI Strategy', 'Sport Science Logic', 'Generative AI', 'Mobile Responsive'],
      status: 'In Production',
      url: 'https://easyfitnesscoach.com/',
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500 to-teal-400',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'cellanalyzer',
      title: 'AI Cell Analyzer',
      subtitle: 'BioTech SaaS & Computer Vision',
      shortDesc: 'Automated image analysis SaaS built with Python and Railway for biological data processing.',
      fullDesc: 'A specialized BioTech SaaS designed for high-precision cellular image analysis. This tool provides a professional interface for researchers to upload and analyze biological samples using advanced computer vision models.',
      functionality: 'The web SaaS frontend connects to a Supabase backend for data and auth management. Heavy image processing is offloaded to a Python-based engine hosted on Railway (synced via GitHub), which executes the analysis and returns structured validation data.',
      tools: ['Python', 'Railway', 'Supabase', 'GitHub CI/CD', 'Image Processing', 'Backend Logic'],
      status: 'In Development',
      url: '#',
      icon: <Activity className="w-6 h-6 text-rose-400" />,
      color: 'from-rose-500 to-pink-400',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'meteonieve',
      title: 'Meteonieve',
      subtitle: 'Real-time Data & AI Podcast',
      shortDesc: 'Automated environmental monitoring with a daily AI-generated podcast using cloned voices.',
      fullDesc: 'A real-time information hub for mountain enthusiasts. Beyond data visualization, it features a fully automated content pipeline that generates a daily morning podcast. The system clones a specific voice to read the latest snow report bulletin, providing a natural and hands-free update for the community.',
      functionality: 'The system orchestrates data fetching from multiple weather APIs. Every morning, an automated workflow extracts the daily snow bulletin, converts the text into high-quality speech using Voice Cloning technology, and publishes the podcast episode directly to the platform.',
      tools: ['Voice Cloning (TTS)', 'API Orchestration', 'Automated Podcasting', 'Data Pipelines', 'PostgreSQL'],
      status: 'In Production',
      url: 'https://meteonieve.com/',
      icon: <Mic2 className="w-6 h-6 text-sky-400" />,
      color: 'from-sky-500 to-blue-400',
      image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'eps',
      title: 'EPS Gradebook',
      subtitle: 'Multi-Agent Academic Automation',
      shortDesc: 'Intelligent grading system using specialized AI agents for automated feedback and cloud orchestration.',
      fullDesc: 'A sophisticated academic automation ecosystem designed to handle the complete assessment lifecycle. It processes student submissions through specialized AI agents tailored to specific courses and terms, ensuring high-quality, personalized feedback.',
      functionality: 'A frontend endpoint triggers an n8n workflow upon submission. Specialized AI agents (segmented by course/term) assess the work, automatically update the web profile, generate a custom HTML feedback report sent via email, and archive all files in a structured Google Drive hierarchy.',
      tools: ['n8n Orchestration', 'Multi-Agent AI', 'Google Drive API', 'Email Automation (SMTP/API)', 'PostgreSQL', 'HTML Generation'],
      status: 'Internal Tool',
      url: '#',
      icon: <Database className="w-6 h-6 text-indigo-400" />,
      color: 'from-indigo-500 to-purple-400',
      image: 'https://images.unsplash.com/photo-1454165833767-02a698d1316a?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const callGemini = async (prompt, systemInstruction = "") => {
    let delay = 1000;
    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
          })
        });
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (error) {
        if (i === 4) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...chatMessages, { role: 'user', text: userInput }];
    setChatMessages(newMessages);
    setUserInput('');
    setIsAiLoading(true);

    const portfolioContext = `You are the AI Assistant for Andrés Ciordia, an AI Implementation Specialist based in Dublin. 
    His projects are: ${projects.map(p => `${p.title}: ${p.shortDesc}`).join('. ')}. 
    His core skills are n8n, Supabase, PostgreSQL, and AI Governance. Always respond in a professional and enthusiastic manner to help recruiters. Always respond in English.`;

    try {
      const response = await callGemini(userInput, portfolioContext);
      setChatMessages([...newMessages, { role: 'assistant', text: response }]);
    } catch {
      setChatMessages([...newMessages, { role: 'assistant', text: "Sorry, I had an issue connecting with my AI brain ✨. Please try again." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Helper function to clear Career Suite outputs
  const clearCareerOutputs = () => {
    setFitAnalysis(null);
    setCoverLetter(null);
    setInterviewPrep(null);
    setRoiAnalysis(null);
    setJobPostAudit(null);
  };

  const generateProjectInsight = async (project) => {
    setIsAiLoading(true);
    const prompt = `Analyze this project by Andrés Ciordia: ${project.title}. Description: ${project.fullDesc}. 
    Suggest 3 innovative ways to scale it or add more value using advanced AI technologies. Be concise and technical.`;

    try {
      const result = await callGemini(prompt, "You are a senior AI architecture consultant. Always respond in English.");
      setAiInsights(result);
    } catch {
      setAiInsights("Could not generate the analysis right now ✨.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const explainProjectToHR = async (project) => {
    setIsHrLoading(true);
    const prompt = `Analyze this technical project by Andrés Ciordia: ${project.title}. Description: ${project.fullDesc} and Stack: ${project.tools.join(', ')}. 
    Explain what value this project brings to a company in extremely simple, business-friendly language, ideal for an HR recruiter with no coding background. Highlight time saved, efficiency, and impact. Use 2 persuasive paragraphs.`;

    try {
      const result = await callGemini(prompt, "You are an expert translator between technical IT profiles and HR recruiters. Always respond in English.");
      setHrExplanation(result);
    } catch {
      setHrExplanation("Could not generate the explanation right now ✨.");
    } finally {
      setIsHrLoading(false);
    }
  };

  const adaptToIndustry = async (project) => {
    if (!visitorIndustry.trim()) return;
    setIsAdapting(true);
    const prompt = `A website visitor works in the industry: "${visitorIndustry}".
    Andrés has created the project: "${project.title}" (Description: ${project.fullDesc}).
    Explain how the underlying architecture and technology of this project could be adapted to automate or improve specific processes in the visitor's industry (${visitorIndustry}). 
    Write 2 persuasive paragraphs demonstrating that Andrés can help their business.`;

    try {
      const result = await callGemini(prompt, "You are a B2B sales consultant specialized in AI. Always respond in English.");
      setIndustryAdaptation(result);
    } catch {
      setIndustryAdaptation("Could not generate the use case. Please check the connection ✨.");
    } finally {
      setIsAdapting(false);
    }
  };

  const analyzeJobFit = async () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    clearCareerOutputs();

    const context = `You are an expert IT recruiter and headhunter specializing in Artificial Intelligence profiles. 
    The candidate is Andrés Ciordia: AI Solutions Architect & Implementation Specialist based in Dublin.
    Key skills: n8n, Supabase, PostgreSQL, AI Governance (Responsible AI), Python, Vercel, SaaS Architecture.
    Projects: Roomflow, EasyFitness Coach, AI Cell Analyzer, Meteonieve, EPS Gradebook. Always respond in English.`;

    const prompt = `Analyze this job offer in detail: "${jobDescription}"
    Write a persuasive "Pitch" of exactly 3 paragraphs explaining why Andrés's profile is a perfect fit for this role. 
    Explicitly mention which of his projects demonstrate the required experience.`;

    try {
      const result = await callGemini(prompt, context);
      setFitAnalysis(result);
    } catch {
      setFitAnalysis("An error occurred while analyzing the job offer. ✨");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateCoverLetter = async () => {
    if (!jobDescription.trim()) return;
    setIsGeneratingLetter(true);
    clearCareerOutputs();

    const context = `You are Andrés Ciordia, AI Solutions Architect & Implementation Specialist based in Dublin. You use a professional, confident, modern, and proactive tone. You specialize in end-to-end architectures, automation with n8n, Supabase, and LLMs. Always respond in English.`;

    const prompt = `Based on this job offer: "${jobDescription}".
    Write an email (Cover Letter) that you would send to the Hiring Manager applying for this position. 
    Sign as "Andrés Ciordia, AI Solutions Architect".`;

    try {
      const result = await callGemini(prompt, context);
      setCoverLetter(result);
    } catch {
      setCoverLetter("Could not generate the cover letter. ✨");
    } finally {
      setIsGeneratingLetter(false);
    }
  };

  const generateInterviewPrep = async () => {
    if (!jobDescription.trim()) return;
    setIsGeneratingPrep(true);
    clearCareerOutputs();

    const context = `You are a Senior Engineering Manager preparing Andrés Ciordia for a technical interview. 
    Andrés is an expert in n8n, Supabase, PostgreSQL, Python, Generative AI, and Vercel. 
    Projects: Roomflow (SaaS), EasyFitness Coach (Generative AI), AI Cell Analyzer (Computer Vision Python/Railway), Meteonieve (Voice Cloning TTS), EPS Gradebook (AI Agents in n8n). Always respond in English.`;

    const prompt = `Based on this job offer: "${jobDescription}".
    Generate the 3 most likely and difficult technical or architectural interview questions they would ask Andrés.
    For each question, provide a brief suggested answer on how Andrés should reply using the STAR method and referencing one of his specific projects.`;

    try {
      const result = await callGemini(prompt, context);
      setInterviewPrep(result);
    } catch {
      setInterviewPrep("Could not generate the interview prep. ✨");
    } finally {
      setIsGeneratingPrep(false);
    }
  };

  const calculateROI = async () => {
    if (!jobDescription.trim()) return;
    setIsGeneratingROI(true);
    clearCareerOutputs();

    const context = `You are a Chief Technology Officer (CTO) and expert in operational and financial efficiency. You know the value of Low-Code automation versus traditional development. Always respond in English.`;

    const prompt = `Analyze the following vacancy or project requirement: "${jobDescription}".
    Write a financial argument (ROI Analysis) of exactly 3 paragraphs explaining how much time and money the company would save by hiring Andrés Ciordia (AI Architect specializing in Low-Code, n8n, Supabase, and LLMs) instead of hiring a traditional development team of 3 people (Frontend, Backend, DevOps).
    Use realistic percentage estimates for "Time-to-Market" savings and operational cost reduction. Be highly persuasive and professional.`;

    try {
      const result = await callGemini(prompt, context);
      setRoiAnalysis(result);
    } catch {
      setRoiAnalysis("Could not calculate ROI. Please try again ✨.");
    } finally {
      setIsGeneratingROI(false);
    }
  };

  const auditJobPost = async () => {
    if (!jobDescription.trim()) return;
    setIsGeneratingAudit(true);
    clearCareerOutputs();

    const context = `You are a Senior Tech Recruiter and B2B Developer Advocate, expert in attracting Top Tier Artificial Intelligence talent. Always respond in English.`;

    const prompt = `Read the following job offer in detail: "${jobDescription}".
    Perform a constructive audit (a professional "roast") directed at the company that published the offer.
    Structure your response:
    1. Identify 1 or 2 "Red Flags" or generic phrases in the offer that would scare away Top AI talent (like Andrés).
    2. Suggest 2 specific improvements to the text or approach of the offer to make it irresistible to AI Solutions Architects.
    Use an expert consultant tone, direct but respectful.`;

    try {
      const result = await callGemini(prompt, context);
      setJobPostAudit(result);
    } catch {
      setJobPostAudit("Could not audit the job offer. Please try again ✨.");
    } finally {
      setIsGeneratingAudit(false);
    }
  };

  const generateArchitecture = async () => {
    if (!businessProblem.trim()) return;
    setIsGeneratingArch(true);

    const context = `You are Andrés Ciordia, an AI Solutions Architect expert in automation and AI. 
    Your main stack: n8n, Supabase, PostgreSQL, Python, Generative AI (LLMs), and Vercel. Always respond in English.`;

    const prompt = `A potential client or CTO presents the following business problem to you: 
    "${businessProblem}"
    
    Draft a high-level technical architecture proposal (Blueprint) to solve this problem.
    Structure your response into 3 brief parts:
    1. The Approach (Brief summary of the solution).
    2. The Stack (How n8n, Supabase, AI, etc. fit into this specific case).
    3. The Impact (Why this "Low-Code + AI" approach saves months of traditional development).
    
    Maintain a technical yet business-oriented tone, demonstrating authority and quick execution capability. Do not use greetings, go straight to the proposal.`;

    try {
      const result = await callGemini(prompt, context);
      setArchitectureProposal(result);
    } catch {
      setArchitectureProposal("Could not generate the architecture. Please check the connection and try again ✨.");
    } finally {
      setIsGeneratingArch(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 relative overflow-hidden">

      {/* Background Orbs for Liquid Glass Effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-[40%] left-[60%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl mx-auto mb-16 text-center relative z-10 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] mb-6 relative group bg-slate-800">
          <img
            src="/profile.jpg"
            alt="Andrés Ciordia"
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"; }}
          />
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full pointer-events-none"></div>
        </div>

        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider text-blue-300 uppercase bg-blue-500/10 border border-blue-500/20 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          AI Solutions Portfolio
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
          Andrés Ciordia
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          AI Implementation & Governance Specialist. Architecting the future of automated SaaS and intelligent workflows.
        </p>
      </header>

      {/* NEW: Autonomous Agent Terminal Monitor ✨ */}
      <div className="max-w-4xl mx-auto mb-16 relative z-10 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
        <div className="bg-black/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative">

          {/* Terminal Header */}
          <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="ml-4 text-xs font-mono text-slate-400 flex items-center">
                <Terminal className="w-3 h-3 mr-2" />
                auto-job-hunter-agent.py (Running)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalContainerRef}
            className="p-4 h-48 md:h-56 overflow-y-auto font-mono text-xs md:text-sm custom-scrollbar"
          >
            {agentLogs.map((log, index) => (
              <div key={index} className={`${log.color} mb-2 flex items-start animate-in fade-in slide-in-from-bottom-2`}>
                <span className="text-slate-600 mr-3 select-none">{'>'}</span>
                <span className="break-words">{log.text}</span>
              </div>
            ))}
            <div className="flex items-start">
              <span className="text-slate-600 mr-3">{'>'}</span>
              <span className="w-2 h-4 bg-emerald-500 animate-pulse"></span>
            </div>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-500 mt-3 font-light tracking-wide uppercase">
          * Simulated live demonstration of my automation backend architecture.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              setSelectedProject(project);
              setAiInsights(null);
              setHrExplanation(null);
              setIndustryAdaptation(null);
              setVisitorIndustry('');
            }}
            className="group cursor-pointer bg-white/5 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 overflow-hidden relative"
          >
            {/* Top gradient bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${project.color} opacity-80 group-hover:opacity-100 transition-opacity`} />

            <div className="p-7">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-inner">
                  {project.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 shadow-sm">
                  {project.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
              <p className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-widest">{project.subtitle}</p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                {project.shortDesc}
              </p>
              <div className="flex items-center text-blue-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Glass reflection gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
          </div>
        ))}
      </div>

      {/* EXTENDED FEATURE: Job Description Fit Analyzer + Cover Letter + Interview Prep + ROI + Audit ✨ */}
      <div className="max-w-6xl mx-auto mt-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-900/40 to-slate-900/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-indigo-500/20 border border-indigo-400/30 rounded-xl">
                <Briefcase className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center">
                  Career Suite & Job Analytics <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
                </h3>
                <p className="text-sm text-slate-400 font-light">Paste a job offer to unleash the analytical power of AI.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              {/* Input section */}
              <div className="flex flex-col gap-4">
                <textarea
                  className="w-full h-40 bg-black/30 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none backdrop-blur-sm font-light leading-relaxed transition-all"
                  placeholder="Paste the job description or IT vacancy here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>

                {/* 5 Buttons Layout */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <button
                    onClick={analyzeJobFit}
                    disabled={isAnalyzing || !jobDescription.trim()}
                    className="flex-auto flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 bg-indigo-600/80 hover:bg-indigo-500 border border-indigo-400/30 text-white font-bold text-[11px] sm:text-xs rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                  >
                    {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Fit Analysis</span>
                  </button>

                  <button
                    onClick={generateCoverLetter}
                    disabled={isGeneratingLetter || !jobDescription.trim()}
                    className="flex-auto flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 bg-purple-600/80 hover:bg-purple-500 border border-purple-400/30 text-white font-bold text-[11px] sm:text-xs rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                  >
                    {isGeneratingLetter ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                    <span>Cover Letter</span>
                  </button>

                  <button
                    onClick={generateInterviewPrep}
                    disabled={isGeneratingPrep || !jobDescription.trim()}
                    className="flex-auto flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 bg-pink-600/80 hover:bg-pink-500 border border-pink-400/30 text-white font-bold text-[11px] sm:text-xs rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                  >
                    {isGeneratingPrep ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
                    <span>Interview</span>
                  </button>

                  <button
                    onClick={calculateROI}
                    disabled={isGeneratingROI || !jobDescription.trim()}
                    className="flex-auto flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-400/30 text-white font-bold text-[11px] sm:text-xs rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                  >
                    {isGeneratingROI ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
                    <span>ROI Finance</span>
                  </button>

                  <button
                    onClick={auditJobPost}
                    disabled={isGeneratingAudit || !jobDescription.trim()}
                    className="flex-auto flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 bg-orange-600/80 hover:bg-orange-500 border border-orange-400/30 text-white font-bold text-[11px] sm:text-xs rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                  >
                    {isGeneratingAudit ? <Loader2 className="w-4 h-4 animate-spin" /> : <ClipboardCheck className="w-4 h-4" />}
                    <span>Audit Offer</span>
                  </button>
                </div>
              </div>

              {/* Output section */}
              <div className="bg-black/20 border border-white/5 rounded-2xl p-6 h-full min-h-[16rem] backdrop-blur-sm flex flex-col relative overflow-hidden">
                {!fitAnalysis && !coverLetter && !interviewPrep && !roiAnalysis && !jobPostAudit && (
                  <div className="m-auto text-center opacity-50 z-10 flex flex-col items-center">
                    <Bot className="w-12 h-12 mb-3 text-slate-400" />
                    <p className="text-sm font-light text-slate-300">Paste the offer and select which intelligence tool to use.</p>
                  </div>
                )}

                <div className="z-10 relative h-full overflow-y-auto pr-2 custom-scrollbar space-y-6">
                  {fitAnalysis && (
                    <div className="animate-in fade-in slide-in-from-right-4">
                      <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center">
                        <Activity className="w-4 h-4 mr-2" /> Technical Fit Analysis
                      </h4>
                      <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-light">
                        {fitAnalysis}
                      </div>
                    </div>
                  )}

                  {coverLetter && (
                    <div className="animate-in fade-in slide-in-from-right-4">
                      <h4 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3 flex items-center">
                        <Mail className="w-4 h-4 mr-2" /> Proposed Cover Letter
                      </h4>
                      <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-light bg-black/30 p-4 rounded-xl border border-white/5">
                        {coverLetter}
                      </div>
                    </div>
                  )}

                  {interviewPrep && (
                    <div className="animate-in fade-in slide-in-from-right-4">
                      <h4 className="text-sm font-bold text-pink-400 uppercase tracking-widest mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" /> Interview Simulator (STAR Method)
                      </h4>
                      <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-light">
                        {interviewPrep}
                      </div>
                    </div>
                  )}

                  {roiAnalysis && (
                    <div className="animate-in fade-in slide-in-from-right-4">
                      <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" /> Financial ROI Estimate
                      </h4>
                      <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-light bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20">
                        {roiAnalysis}
                      </div>
                    </div>
                  )}

                  {jobPostAudit && (
                    <div className="animate-in fade-in slide-in-from-right-4">
                      <h4 className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-3 flex items-center">
                        <ClipboardCheck className="w-4 h-4 mr-2" /> Job Offer Audit (Roast)
                      </h4>
                      <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-light">
                        {jobPostAudit}
                      </div>
                    </div>
                  )}
                </div>

                {/* Decorative background glow for output */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Architecture Blueprint Generator ✨ */}
      <div className="max-w-6xl mx-auto mt-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="p-6 md:p-8 bg-gradient-to-br from-emerald-900/30 to-slate-900/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-500/20 border border-emerald-400/30 rounded-xl">
                <Lightbulb className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center">
                  AI Architecture Blueprint <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
                </h3>
                <p className="text-sm text-slate-400 font-light">Facing a business challenge? Tell me the problem and my AI will design a technical architecture to solve it.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Input section */}
              <div className="flex flex-col gap-4">
                <textarea
                  className="w-full h-40 bg-black/30 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none backdrop-blur-sm font-light leading-relaxed transition-all"
                  placeholder="Ex: We spend 20 hours a week manually extracting data from PDF invoices and uploading them to our ERP..."
                  value={businessProblem}
                  onChange={(e) => setBusinessProblem(e.target.value)}
                ></textarea>

                <button
                  onClick={generateArchitecture}
                  disabled={isGeneratingArch || !businessProblem.trim()}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-400/30 text-white font-bold text-sm rounded-2xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                >
                  {isGeneratingArch ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Designing Solution...</>
                  ) : (
                    <><Cpu className="w-5 h-5" /> Design Architecture ✨</>
                  )}
                </button>
              </div>

              {/* Output section */}
              <div className="bg-black/20 border border-white/5 rounded-2xl p-6 h-full min-h-[16rem] backdrop-blur-sm flex flex-col relative overflow-hidden">
                {!architectureProposal ? (
                  <div className="m-auto text-center opacity-50 z-10 flex flex-col items-center">
                    <Layers className="w-12 h-12 mb-3 text-emerald-400/60" />
                    <p className="text-sm font-light text-slate-300">Describe a problem to see how my tech stack would solve it in record time.</p>
                  </div>
                ) : (
                  <div className="z-10 relative h-full overflow-y-auto pr-2 custom-scrollbar">
                    <div className="animate-in fade-in slide-in-from-right-4">
                      <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center">
                        <Server className="w-4 h-4 mr-2" /> Technical Proposal
                      </h4>
                      <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-light">
                        {architectureProposal}
                      </div>
                    </div>
                  </div>
                )}

                {/* Decorative background glow for output */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Liquid Glass */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-slate-900/70 backdrop-blur-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] border border-white/10 relative animate-in zoom-in-95 duration-300 custom-scrollbar">
            <div className="relative h-56 md:h-72 overflow-hidden shrink-0">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-2 bg-black/40 border border-white/10 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"><X className="w-6 h-6" /></button>
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-4xl font-bold mb-2">{selectedProject.title}</h2>
                <p className="text-slate-300 font-medium tracking-wide">{selectedProject.subtitle}</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center"><Cpu className="w-4 h-4 mr-2 text-blue-400" /> Overview</h4>
                    <p className="text-slate-300 leading-relaxed text-lg font-light">{selectedProject.fullDesc}</p>
                  </section>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Gemini Feature 1: Project Insights */}
                    <section className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-3xl relative overflow-hidden backdrop-blur-sm shadow-inner flex flex-col max-h-64">
                      <div className="flex justify-between items-center mb-5 shrink-0">
                        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center">
                          <Sparkles className="w-4 h-4 mr-2" /> AI Insights ✨
                        </h4>
                      </div>
                      {!aiInsights ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); generateProjectInsight(selectedProject); }}
                          disabled={isAiLoading}
                          className="w-full py-2 bg-blue-600/80 backdrop-blur-md text-white border border-blue-400/30 text-xs font-bold rounded-full hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] disabled:opacity-50 mt-auto"
                        >
                          {isAiLoading ? "Analyzing..." : "View Scalability"}
                        </button>
                      ) : (
                        <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap animate-in fade-in font-light flex-1 overflow-y-auto pr-1 custom-scrollbar">
                          {aiInsights}
                        </div>
                      )}
                    </section>

                    {/* Gemini Feature 2: HR Translator ✨ */}
                    <section className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl relative overflow-hidden backdrop-blur-sm shadow-inner flex flex-col max-h-64">
                      <div className="flex justify-between items-center mb-5 shrink-0">
                        <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center">
                          <Users className="w-4 h-4 mr-2" /> For HR ✨
                        </h4>
                      </div>
                      {!hrExplanation ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); explainProjectToHR(selectedProject); }}
                          disabled={isHrLoading}
                          className="w-full py-2 bg-emerald-600/80 backdrop-blur-md text-white border border-emerald-400/30 text-xs font-bold rounded-full hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] disabled:opacity-50 mt-auto"
                        >
                          {isHrLoading ? "Translating..." : "Explain to Recruiter"}
                        </button>
                      ) : (
                        <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap animate-in fade-in font-light flex-1 overflow-y-auto pr-1 custom-scrollbar">
                          {hrExplanation}
                        </div>
                      )}
                    </section>
                  </div>

                  {/* GEMINI FEATURE: Client Industry Adaptor ✨ */}
                  <section className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-3xl relative overflow-hidden backdrop-blur-sm shadow-inner">
                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-widest flex items-center mb-4">
                      <BriefcaseBusiness className="w-4 h-4 mr-2" /> Pitch to your Industry ✨
                    </h4>
                    <p className="text-xs text-slate-400 mb-4 font-light">How would this technology apply in a different industry?</p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={visitorIndustry}
                        onChange={(e) => setVisitorIndustry(e.target.value)}
                        placeholder="Your industry (e.g. Real Estate, E-commerce, Legal...)"
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-1 focus:ring-amber-500 outline-none font-light transition-all"
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); adaptToIndustry(selectedProject); }}
                        disabled={isAdapting || !visitorIndustry.trim()}
                        className="px-6 py-2.5 bg-amber-600/80 backdrop-blur-md text-white border border-amber-400/30 text-xs font-bold rounded-xl hover:bg-amber-500 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-50 whitespace-nowrap"
                      >
                        {isAdapting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Generate Use Case"}
                      </button>
                    </div>

                    {industryAdaptation && (
                      <div className="mt-5 pt-5 border-t border-white/5 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap animate-in fade-in font-light max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        {industryAdaptation}
                      </div>
                    )}
                  </section>

                  {selectedProject.url !== '#' && (
                    <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-all shadow-[0_4px_15px_rgba(0,0,0,0.2)] backdrop-blur-md">
                      Visit Website <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-black/20 border border-white/10 rounded-lg text-xs font-medium text-slate-300 shadow-inner">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Interface - Liquid Glass ✨ */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
        {isChatOpen && (
          <div className="w-80 md:w-96 h-[500px] bg-slate-900/60 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/10 flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-4 bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-b border-white/10 text-white flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl shadow-inner"><Bot className="w-5 h-5 text-blue-200" /></div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Andrés AI Assistant</p>
                  <p className="text-sm font-semibold text-slate-100">Ask me about Andrés ✨</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent custom-scrollbar">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm shadow-md font-light ${msg.role === 'user'
                    ? 'bg-blue-600/80 text-white rounded-tr-none border border-blue-500/30 backdrop-blur-sm'
                    : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none backdrop-blur-sm'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3.5 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-2 backdrop-blur-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                    <span className="text-xs text-slate-400 font-medium tracking-wide">Gemini is thinking... ✨</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-black/20 border-t border-white/10 flex gap-2 backdrop-blur-md">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Why hire Andrés?..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500 outline-none transition-shadow font-light"
              />
              <button
                onClick={handleSendMessage}
                disabled={isAiLoading}
                className="p-2.5 bg-blue-600/80 text-white rounded-xl hover:bg-blue-500 border border-blue-400/30 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50 backdrop-blur-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-4 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border ${isChatOpen
            ? 'bg-slate-800/80 text-white border-white/10 backdrop-blur-md'
            : 'bg-blue-600/90 text-white border-blue-400/30 backdrop-blur-md hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]'
            }`}
        >
          {isChatOpen ? <X className="w-6 h-6" /> : (
            <>
              <Sparkles className="w-6 h-6 text-blue-100" />
              <span className="font-bold text-sm pr-2 tracking-wide">Chat with Portfolio ✨</span>
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-20 pb-8 text-center text-slate-500 text-sm relative z-10 font-light">
        <p>© 2026 Andrés Ciordia Cagigal. Powered by ✨ Gemini LLM.</p>
        <p className="mt-2 text-slate-600">Windgates, Bray, Ireland</p>
      </footer>

      {/* Global styles for custom scrollbar to match glassmorphism */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
};

export default App;
