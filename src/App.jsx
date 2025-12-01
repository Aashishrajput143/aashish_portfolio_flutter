import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Smartphone, 
  Code, 
  Briefcase, 
  User, 
  Mail, 
  Gamepad2, 
  Send, 
  X, 
  Cpu, 
  Battery, 
  Wifi, 
  Signal, 
  ChevronLeft,
  Github,
  Linkedin,
  Terminal,
  Zap,
  MapPin,
  Layers,
  Cloud,
  Database,
  Copy,
  Bot,
  GraduationCap,
  ShoppingBag,
  HeartPulse,
  Palette,
  MessageCircle,
  Brain,
  Box,
  Play
} from 'lucide-react';

/**
 * Aashish Chauhan - Flutter Developer Portfolio
 * * Updates:
 * - Game: Reverted to "Widget Rush" (Catching game) as it's more user-friendly.
 * - Header: Added top padding (pt-10) to ScreenHeader to prevent clipping by the notch.
 * - Data: Kept all previous resume data and link updates.
 */

const RESUME_DATA = {
  name: "Aashish Chauhan",
  title: "Software Developer (Flutter)",
  location: "Noida, Uttar Pradesh, India",
  email: "aashishrajput782@gmail.com",
  phone: "+91 9690974412",
  github: "https://github.com/Aashishrajput143",
  linkedin: "linkedin.com/in/aashish-chauhan-668728234",
  summary: "Experienced in design and integration, with a knack for intuitive problem-solving. Skilled in Flutter, Dart, Python, Django, and SQL. Enthusiastic about spearheading new projects from conception to launch. Capable of bridging the gap between business needs and technical solutions.",
  techSummary: "I also have practical experience working with key technologies such as Firebase (Auth, Firestore, Storage, FCM), Supabase, Payment Gateway Integration (Razorpay, Stripe), Google Maps & Geolocation, Augmented Reality, REST APIs, and advanced mobile app architecture. My focus is always on clean code, performance optimization, and creating reliable production-ready apps.",
  skills: [
    "Flutter & Dart", 
    "Java", 
    "Python & Django",
    "Firebase (FCM, Auth)",
    "Supabase",
    "GetX / Bloc / Cubit",
    "MySQL / SQL",
    "REST APIs & WebSockets",
    "Google Maps & AR"
  ],
  experience: [
    {
      company: "Digixito Media Pvt Ltd",
      role: "Flutter Developer",
      duration: "Aug 2024 – Present",
      location: "Noida, Uttar Pradesh",
      desc: "Designed & developed high-performance, scalable mobile applications ensuring seamless cross-platform compatibility. Implemented RESTful APIs and WebSocket protocols for real-time communication. Collaborated with cross-functional teams to define and deliver new features. Worked on Cubit, Bloc, GetX, Firebase, and Social Logins."
    }
  ],
  projects: [
    {
      name: "MyTreks AI",
      tech: "Flutter, Firebase, Google/Apple Sign-In",
      duration: "Jan 2025 - Jun 2025",
      desc: "Spearheaded the development of a gamified learning experience tailored for diverse user demographics. Integrated Google & Apple authentication.",
      link: "https://apps.apple.com/us/app/mytreks-ai/id6720727191",
      icon: GraduationCap, 
      color: "bg-blue-500"
    },
    {
      name: "BHK Seller/Buyer App",
      tech: "Flutter",
      duration: "Sept 2024 - Dec 2024",
      desc: "E-commerce app providing users with a list of various Handloom and handicraft products. Connects sellers and buyers efficiently.",
      link: "Internal Project",
      icon: ShoppingBag,
      color: "bg-orange-500"
    },
    {
      name: "Blood - Organ Donation",
      tech: "Django, Python",
      duration: "Nov 2023 - Mar 2024",
      desc: "Platform for users to register as donors & recipients and connects them. Live at novenabo.pythonanywhere.com",
      link: "https://novenabo.pythonanywhere.com",
      icon: HeartPulse,
      color: "bg-red-500"
    },
    {
      name: "Moonarty Paintings",
      tech: "Django, Python",
      duration: "Oct 2022 - Jan 2023",
      desc: "Online store for paintings and handicraft products. Live at moonarty.pythonanywhere.com",
      link: "https://moonarty.pythonanywhere.com",
      icon: Palette,
      color: "bg-purple-500"
    },
    {
      name: "Chatting Application",
      tech: "Java, WebSockets, MySQL",
      duration: "Aug 2022 - Sept 2022",
      desc: "Real-time messaging app using WebSocket and storing messages in a MySQL database.",
      link: "Local Project",
      icon: MessageCircle,
      color: "bg-green-500"
    }
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "DIT University, Dehradun",
      year: "2022-2024",
      grade: "CGPA: 8.84"
    },
    {
      degree: "B.Sc. Computer Science",
      school: "MJPRU University, Bareilly",
      year: "2019-2022",
      grade: "62%"
    },
    {
      degree: "Senior Secondary (PCM)",
      school: "CBSE Board",
      year: "2019",
      grade: "60%"
    },
    {
      degree: "Matriculation",
      school: "CBSE Board",
      year: "2017",
      grade: "CGPA: 9.8"
    }
  ]
};

// --- Helper: Copy to Clipboard Toast ---
const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
};

// --- Shared Components ---

const AppIcon = ({ icon: Icon, label, color, onClick }) => (
  <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer group transition-all duration-300 hover:scale-110 active:scale-95">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl relative overflow-hidden border border-white/10`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <Icon size={28} className="text-white drop-shadow-md" />
    </div>
    <span className="text-xs font-medium text-white/90 drop-shadow-md tracking-wide">{label}</span>
  </div>
);

// Updated ScreenHeader: Added `pt-10` to handle the notch area
const ScreenHeader = ({ title, onBack, rightAction }) => (
  <div className="bg-slate-900/95 backdrop-blur-md border-b border-white/10 pt-10 pb-3 px-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
    <div className="flex items-center gap-2">
      <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
        <ChevronLeft size={24} className="text-white" />
      </button>
      <h2 className="text-lg font-bold text-white tracking-wide">{title}</h2>
    </div>
    {rightAction && <div>{rightAction}</div>}
  </div>
);

// --- Content Apps ---

const ProfileApp = ({ onBack }) => (
  <div className="h-full bg-slate-900 text-white overflow-y-auto scrollbar-hide">
    <ScreenHeader title="Profile" onBack={onBack} />
    <div className="p-6 flex flex-col items-center text-center pb-20">
      <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full mb-4 flex items-center justify-center border-4 border-slate-800 shadow-xl relative">
        <User size={40} />
        <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse" />
      </div>
      <h1 className="text-2xl font-bold">{RESUME_DATA.name}</h1>
      <p className="text-cyan-400 font-medium mb-4">{RESUME_DATA.title}</p>
      
      <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 mb-6 text-sm leading-relaxed text-slate-300 text-left shadow-lg">
        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
          <Terminal size={16} className="text-cyan-400"/> Professional Overview
        </h4>
        {RESUME_DATA.summary}
        <div className="mt-3 pt-3 border-t border-slate-700/50">
          <p className="italic text-cyan-200/80">{RESUME_DATA.techSummary}</p>
        </div>
      </div>
      
      <h3 className="w-full text-left text-lg font-bold mb-3 border-b border-slate-700 pb-1 flex items-center gap-2">
        <Briefcase size={18} className="text-cyan-400" /> Experience
      </h3>
      <div className="w-full space-y-4 mb-6">
        {RESUME_DATA.experience.map((exp, idx) => (
          <div key={idx} className="bg-slate-800 p-4 rounded-lg text-left border-l-4 border-cyan-500 hover:bg-slate-750 transition-colors">
            <div className="font-bold text-white text-base">{exp.role}</div>
            <div className="text-cyan-300 text-xs mb-2 font-mono flex justify-between">
              <span>{exp.company}</span>
              <span>{exp.duration}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{exp.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="w-full text-left text-lg font-bold mb-3 border-b border-slate-700 pb-1 flex items-center gap-2">
        <Code size={18} className="text-cyan-400" /> Education
      </h3>
      <div className="w-full text-left space-y-3">
        {RESUME_DATA.education.map((edu, idx) => (
          <div key={idx} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 bg-slate-700 rounded-bl-lg text-[10px] text-cyan-300 font-bold">
              {edu.year}
            </div>
            <div className="text-sm font-bold text-white pr-10">{edu.degree}</div>
            <div className="text-xs text-slate-400">{edu.school}</div>
            <div className="mt-1 text-xs text-cyan-400 font-mono">{edu.grade}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProjectsApp = ({ onBack }) => {
  const { copied, copy } = useClipboard();

  return (
    <div className="h-full bg-indigo-950 text-white overflow-y-auto scrollbar-hide">
      <ScreenHeader title="Projects" onBack={onBack} />
      
      {copied && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
          Link Copied!
        </div>
      )}

      <div className="p-4 grid grid-cols-1 gap-4 pb-20">
        {RESUME_DATA.projects.map((project, idx) => (
          <div key={idx} className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-700 hover:border-cyan-400 transition-colors group relative">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-3 rounded-lg ${project.color} shadow-lg`}>
                <project.icon size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-indigo-50 group-hover:text-cyan-300 transition-colors">{project.name}</h3>
                <span className="text-[10px] bg-indigo-600/80 px-2 py-0.5 rounded text-white">{project.tech}</span>
              </div>
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed mb-3">{project.desc}</p>
            <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-2">
              <span className="text-[10px] text-indigo-400 font-mono">{project.duration}</span>
              {project.link !== "Internal Project" && project.link !== "Local Project" && (
                <button 
                  onClick={(e) => { e.stopPropagation(); copy(project.link); }}
                  className="flex items-center gap-1 text-[10px] bg-indigo-600 hover:bg-indigo-500 px-2 py-1 rounded-full transition-colors"
                >
                  <Copy size={10} /> Copy Link
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsApp = ({ onBack }) => (
  <div className="h-full bg-teal-950 text-white overflow-y-auto scrollbar-hide">
    <ScreenHeader title="Tech Stack" onBack={onBack} />
    <div className="p-6 pb-20">
      <div className="flex flex-wrap gap-2 mb-6">
        {RESUME_DATA.skills.map((skill, idx) => (
          <div key={idx} className="bg-teal-900/40 border border-teal-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
            <span className="text-sm font-medium text-teal-50">{skill}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-teal-900/30 p-4 rounded-xl border border-teal-800">
          <h3 className="text-sm font-bold text-teal-300 mb-2 flex items-center gap-2"><Cloud size={14} /> Backend Integration</h3>
          <p className="text-xs text-teal-100/70 leading-relaxed">
            Practical experience with <strong>Firebase</strong> (Auth, Firestore, FCM) and <strong>Supabase</strong>. 
            Proficient in creating scalable backend architectures.
          </p>
        </div>
        
        <div className="bg-teal-900/30 p-4 rounded-xl border border-teal-800">
          <h3 className="text-sm font-bold text-teal-300 mb-2 flex items-center gap-2"><MapPin size={14} /> Advanced Mobile Features</h3>
          <p className="text-xs text-teal-100/70 leading-relaxed">
            Integration of <strong>Google Maps</strong>, Geolocation, and <strong>Augmented Reality (AR)</strong> features using Flutter's platform channels and packages.
          </p>
        </div>

        <div className="bg-teal-900/30 p-4 rounded-xl border border-teal-800">
          <h3 className="text-sm font-bold text-teal-300 mb-2 flex items-center gap-2"><Zap size={14} /> Performance & Payments</h3>
          <p className="text-xs text-teal-100/70 leading-relaxed">
            Focus on <strong>clean code</strong> and state management (GetX/Bloc). Experienced in integrating <strong>Razorpay</strong> and <strong>Stripe</strong> for secure payments.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ContactApp = ({ onBack }) => {
  const { copied, copy } = useClipboard();
  
  return (
    <div className="h-full bg-rose-950 text-white overflow-y-auto scrollbar-hide">
      <ScreenHeader title="Contact Me" onBack={onBack} />
      
      {copied && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white text-rose-900 px-4 py-2 rounded-full text-xs font-bold shadow-xl z-50 animate-bounce">
          Copied to Clipboard!
        </div>
      )}

      <div className="p-6 flex flex-col items-center justify-center h-[80%] space-y-6">
        <div className="bg-rose-900/40 p-6 rounded-2xl border border-rose-800 w-full max-w-sm backdrop-blur-sm shadow-xl">
          <div 
            className="flex items-center gap-3 mb-5 group cursor-pointer active:scale-95 transition-transform" 
            onClick={() => copy(RESUME_DATA.email)}
          >
            <div className="bg-rose-800 p-2 rounded-lg group-hover:bg-rose-700 transition-colors"><Mail className="text-white" size={20} /></div>
            <div className="overflow-hidden flex-1">
               <div className="text-xs text-rose-300">Email</div>
               <span className="text-sm font-bold truncate block">{RESUME_DATA.email}</span>
            </div>
            <Copy size={14} className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div 
            className="flex items-center gap-3 mb-5 group cursor-pointer active:scale-95 transition-transform" 
            onClick={() => copy(RESUME_DATA.phone)}
          >
            <div className="bg-rose-800 p-2 rounded-lg group-hover:bg-rose-700 transition-colors"><Smartphone className="text-white" size={20} /></div>
            <div>
               <div className="text-xs text-rose-300">Phone</div>
               <span className="text-sm font-bold">{RESUME_DATA.phone}</span>
            </div>
            <Copy size={14} className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div 
             className="flex items-center gap-3 group cursor-pointer active:scale-95 transition-transform"
             onClick={() => copy(RESUME_DATA.linkedin)}
          >
            <div className="bg-rose-800 p-2 rounded-lg group-hover:bg-rose-700 transition-colors"><Linkedin className="text-white" size={20} /></div>
            <div className="flex-1 overflow-hidden">
               <div className="text-xs text-rose-300">LinkedIn</div>
               <span className="text-sm font-bold truncate block w-40">{RESUME_DATA.linkedin}</span>
            </div>
            <Copy size={14} className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Game: Widget Rush (Reverted from Dash Hover) ---
const GameApp = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]); // { id, x, y, type: 'widget' | 'bug' }
  const [gameOver, setGameOver] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [playerX, setPlayerX] = useState(50); // percentage

  // Player Movement
  const movePlayer = useCallback((direction) => {
    setPlayerX(prev => {
      const newPos = prev + direction * 10;
      return Math.max(0, Math.min(90, newPos)); // Keep within 0-90%
    });
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive) return;
      if (e.key === 'ArrowLeft') movePlayer(-1);
      if (e.key === 'ArrowRight') movePlayer(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, movePlayer]);

  // Game Loop
  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(() => {
      const id = Date.now();
      const x = Math.random() * 90; 
      const type = Math.random() > 0.3 ? 'widget' : 'bug'; // 70% chance of widget
      setItems(prev => [...prev, { id, x, y: -10, type }]);
    }, 1000); // Slower spawn rate

    const gameLoop = setInterval(() => {
      setItems(prevItems => {
        const nextItems = prevItems.map(item => ({ ...item, y: item.y + 1.5 })); // Slower fall speed
        
        // Check collisions & cleanup
        return nextItems.reduce((acc, item) => {
          // If hit bottom
          if (item.y > 90) {
            // Check collision with player
            if (item.y > 82 && Math.abs(item.x - playerX) < 15) {
              if (item.type === 'bug') {
                setGameOver(true);
                setGameActive(false);
              } else {
                setScore(s => s + 10);
              }
              return acc; // Remove item
            }
            return acc; // Remove item if missed (bottom of screen)
          }
          acc.push(item);
          return acc;
        }, []);
      });
    }, 50);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(gameLoop);
    };
  }, [gameActive, playerX]);

  const startGame = () => {
    setScore(0);
    setItems([]);
    setGameOver(false);
    setGameActive(true);
    setPlayerX(50);
  };

  return (
    <div className="h-full bg-sky-900 text-white relative overflow-hidden font-mono">
      <ScreenHeader 
        title="Widget Rush" 
        onBack={onBack} 
        rightAction={
          <button 
            onClick={(e) => { e.stopPropagation(); onBack(); }}
            className="flex items-center gap-1 text-xs bg-black/30 hover:bg-black/50 text-white px-3 py-1.5 rounded-full font-bold transition-all border border-white/20"
          >
            <X size={12} /> Exit
          </button>
        }
      />
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute top-20 left-10"><Box size={100} /></div>
         <div className="absolute bottom-40 right-10"><Code size={80} /></div>
      </div>

      {!gameActive && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 p-6 text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 animate-bounce">
            <Layers size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Widget Rush</h2>
          <p className="text-gray-300 mb-6 text-sm">
            Catch Blue Widgets.<br/>Avoid Red Bugs.<br/>Tap Left/Right to move.
          </p>
          <button onClick={startGame} className="bg-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/50 flex items-center gap-2">
            <Play size={20} fill="currentColor" /> Start Game
          </button>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 text-center p-4">
          <h2 className="text-3xl font-bold text-red-500 mb-2">CRASHED!</h2>
          <p className="text-white mb-2">You hit a bug.</p>
          <p className="text-2xl text-blue-400 mb-6 font-bold">Score: {score}</p>
          <button onClick={startGame} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">
            Try Again
          </button>
          <button 
             onClick={onBack}
             className="block w-full mt-4 text-sm text-slate-500 font-bold hover:text-white transition-colors"
           >
             Exit Game
           </button>
        </div>
      )}

      {/* Game Area */}
      <div className="absolute inset-0 z-10" onClick={(e) => {
        // Simple touch controls
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 2) movePlayer(-1);
        else movePlayer(1);
      }}>
        {/* HUD */}
        <div className="absolute top-24 right-4 text-2xl font-bold text-white drop-shadow-md bg-black/30 px-3 py-1 rounded-lg border border-white/10">
          {score}
        </div>

        {/* Falling Items */}
        {items.map(item => (
          <div
            key={item.id}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            className={`absolute w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-transform ${item.type === 'bug' ? 'bg-red-500 animate-pulse' : 'bg-blue-400'}`}
          >
            {item.type === 'bug' ? <X size={20} /> : <Box size={20} />}
          </div>
        ))}

        {/* Player (Phone) */}
        <div 
          style={{ left: `${playerX}%` }}
          className="absolute bottom-4 w-12 h-20 bg-slate-800 border-2 border-slate-600 rounded-lg flex items-center justify-center transition-all duration-100 transform -translate-x-1/2 shadow-xl shadow-black/50"
        >
          <div className="w-10 h-16 bg-black rounded overflow-hidden relative">
            <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Chat Assistant ---
const AIChatOverlay = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I can tell you about Aashish's work with Flutter, Firebase, AR, or his Projects." }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(p => [...p, userMsg]);
    setInput('');

    setTimeout(() => {
      const lower = input.toLowerCase();
      let response = "I'm focusing on Aashish's technical profile. Try asking about 'Skills', 'Projects', or 'Contact'.";
      
      if (lower.includes('firebase') || lower.includes('db')) {
        response = "Aashish uses Firebase Auth, Firestore, and FCM for robust real-time applications.";
      } else if (lower.includes('payment') || lower.includes('stripe')) {
        response = "He has integrated Razorpay and Stripe gateways, ensuring secure transactions in production apps.";
      } else if (lower.includes('project') || lower.includes('app')) {
        response = "Key projects include MyTreks (EdTech), BHK Seller/Buyer (E-commerce), and a Blood Donation system.";
      } else if (lower.includes('ar') || lower.includes('geo')) {
        response = "He implements Google Maps and AR Core features for immersive, location-aware experiences.";
      } else if (lower.includes('contact') || lower.includes('mail')) {
        response = `You can email him at ${RESUME_DATA.email}. Links are in the Contact app.`;
      } else if (lower.includes('experience') || lower.includes('work')) {
        response = "He is currently a Flutter Developer at Digixito Media Pvt Ltd (Aug 2024 - Present).";
      }
      
      setMessages(p => [...p, { role: 'ai', text: response }]);
    }, 600);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-slate-900 rounded-t-3xl shadow-2xl z-50 flex flex-col border-t border-slate-700 animate-in slide-in-from-bottom duration-300">
      <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-800 rounded-t-3xl">
        <div className="flex items-center gap-2">
          <div className="bg-cyan-500 p-1.5 rounded-full">
            <Bot size={16} className="text-white" />
          </div>
          <span className="font-bold text-white">Assistant</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-full transition-colors"><X className="text-slate-400" size={20}/></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-slate-700 text-slate-200 rounded-tl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-slate-700 flex gap-2 bg-slate-800">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about Supabase, AR..." 
          className="flex-1 bg-slate-900 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
        <button onClick={handleSend} className="bg-cyan-600 p-2 rounded-full text-white hover:bg-cyan-500 transition-colors">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function Portfolio() {
  const [activeApp, setActiveApp] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const renderContent = () => {
    switch(activeApp) {
      case 'profile': return <ProfileApp onBack={() => setActiveApp(null)} />;
      case 'projects': return <ProjectsApp onBack={() => setActiveApp(null)} />;
      case 'skills': return <SkillsApp onBack={() => setActiveApp(null)} />;
      case 'contact': return <ContactApp onBack={() => setActiveApp(null)} />;
      case 'game': return <GameApp onBack={() => setActiveApp(null)} />;
      default: return (
        <div className="h-full flex flex-col pt-12 pb-6 px-6 relative">
          {/* Widget Area */}
          <div className="mb-8 z-10">
            <div className="text-6xl font-thin text-white tracking-tighter">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div className="text-cyan-200 text-sm font-medium mt-1">{time.toLocaleDateString([], {weekday: 'long', month: 'short', day: 'numeric'})}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-lg mb-8 z-10">
             <div className="flex items-center gap-3">
               <div className="bg-cyan-500/20 p-2 rounded-full"><Database className="text-cyan-400" size={20} /></div>
               <div>
                 <div className="text-xs text-cyan-200">Latest Project</div>
                 <div className="text-sm font-bold text-white">MyTreks AI</div>
               </div>
             </div>
           </div>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-y-6 gap-x-2 z-10">
            <AppIcon icon={User} label="Profile" color="bg-cyan-600" onClick={() => setActiveApp('profile')} />
            <AppIcon icon={Briefcase} label="Projects" color="bg-indigo-600" onClick={() => setActiveApp('projects')} />
            <AppIcon icon={Cpu} label="Skills" color="bg-teal-600" onClick={() => setActiveApp('skills')} />
            <AppIcon icon={Gamepad2} label="Widget Rush" color="bg-orange-500" onClick={() => setActiveApp('game')} />
          </div>

          {/* Dock */}
          <div className="mt-auto z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-3 flex justify-around items-center border border-white/5">
            <div onClick={() => setActiveApp('contact')} className="p-3 bg-green-500 rounded-2xl shadow-lg shadow-green-500/20 cursor-pointer hover:-translate-y-2 transition-transform">
              <Smartphone className="text-white" size={24} />
            </div>
            
            {/* GitHub Link */}
            <div 
              onClick={() => window.open(RESUME_DATA.github, '_blank')} 
              className="p-3 bg-slate-700 rounded-2xl shadow-lg shadow-slate-700/20 cursor-pointer hover:-translate-y-2 transition-transform"
            >
              <Github className="text-white" size={24} />
            </div>

            {/* Chat Notification Trigger */}
            <div onClick={() => setIsChatOpen(true)} className="p-3 bg-white rounded-2xl shadow-lg cursor-pointer hover:-translate-y-2 transition-transform relative group flex items-center justify-center">
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900" />
               <Brain className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] delay-700 animate-pulse" />
      </div>

      {/* Desktop Info */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 max-w-md text-white space-y-6">
        <div>
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            Aashish Chauhan
          </h1>
          <p className="text-xl text-slate-400 font-light">Senior Flutter Developer</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <span className="bg-slate-800 px-3 py-1 rounded-full text-xs border border-slate-700 text-cyan-400">Firebase</span>
          <span className="bg-slate-800 px-3 py-1 rounded-full text-xs border border-slate-700 text-cyan-400">GetX</span>
          <span className="bg-slate-800 px-3 py-1 rounded-full text-xs border border-slate-700 text-cyan-400">AR Core</span>
          <span className="bg-slate-800 px-3 py-1 rounded-full text-xs border border-slate-700 text-cyan-400">Payment Gateways</span>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
          Welcome! Use the virtual phone to explore my portfolio. 
          <br/>
          <strong>Updates:</strong> Reverted to the easier "Widget Rush" game, fixed header layout issues.
        </p>
      </div>

      {/* Device Frame */}
      <div className="relative w-[360px] h-[720px] bg-black rounded-[50px] border-[8px] border-slate-800 shadow-2xl overflow-hidden ring-4 ring-slate-900/50 z-20 transition-all hover:shadow-cyan-500/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-36 bg-black rounded-b-2xl z-50 flex justify-center items-center gap-4">
           <div className="w-12 h-1.5 bg-slate-800/80 rounded-full" />
           <div className="w-1.5 h-1.5 bg-slate-800/80 rounded-full" />
        </div>

        {/* Status Bar */}
        <div className="absolute top-2 left-6 right-6 flex justify-between text-[10px] text-white font-medium z-40">
           <span>{time.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
           <div className="flex gap-1.5">
             <Signal size={12} />
             <Wifi size={12} />
             <Battery size={12} />
           </div>
        </div>

        {/* Screen */}
        <div className="w-full h-full bg-slate-900 relative">
          {!activeApp && (
             <div className="absolute inset-0 opacity-40">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
             </div>
          )}
          
          {renderContent()}
          
          {isChatOpen && <AIChatOverlay onClose={() => setIsChatOpen(false)} />}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50" />
      </div>
    </div>
  );
}