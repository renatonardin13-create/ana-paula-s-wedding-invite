import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Gift,
  Heart,
  Hotel,
  MapPin,
  Music,
  Navigation,
  Pause,
  Play,
  Scissors,
  Share2,
  Shirt,
  Sparkles,
  Volume2,
  VolumeX,
  Car,
  Calendar,
  Lock,
  Search,
  Trash2,
  Download,
  Users,
  Clock,
  Send,
} from "lucide-react";

import invitationImage from "@/assets/convite-final.jpg";
import couplePhoto from "@/assets/foto-casal.jpg";
import gardenPhoto from "@/assets/wedding-garden.jpg";
import ringsPhoto from "@/assets/wedding-rings.jpg";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "João Carlos & Ana Paula | 07 de novembro de 2026" },
      {
        name: "description",
        content:
          "Convite digital de casamento de João Carlos Marques e Ana Paula Fortunato. Cerimônia em 7 de novembro de 2026 às 20h.",
      },
      { property: "og:title", content: "João Carlos & Ana Paula | 07 de novembro de 2026" },
      {
        property: "og:description",
        content:
          "Com a bênção de Deus, convidamos você para celebrar conosco o nosso casamento em 7 de novembro de 2026 às 20h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/src/assets/convite-final.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "João Carlos & Ana Paula | 07 de novembro de 2026" },
      {
        name: "twitter:description",
        content: "Convite digital de casamento de João Carlos Marques e Ana Paula Fortunato.",
      },
      { name: "twitter:image", content: "/src/assets/convite-final.jpg" },
    ],
  }),
  component: WeddingInvitation,
});

/**
 * Gera o conteúdo do arquivo iCalendar (.ics) para o casamento
 */
function generateWeddingIcs(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Casamento Joao Carlos Marques e Ana Paula Fortunato//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:casamento-joao-carlos-e-ana-paula-20261107@convite",
    `DTSTAMP:${dtstamp}`,
    "DTSTART;TZID=America/Sao_Paulo:20261107T200000",
    "SUMMARY:Casamento de João Carlos Marques e Ana Paula Fortunato",
    "DESCRIPTION:Com a bênção de Deus, convidamos você para celebrar conosco o nosso casamento em 7 de novembro de 2026 às 20h.",
    "LOCATION:Espaço Jardim das Acácias - Estrada das Flores, 1500",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

interface RsvpEntry {
  id: string;
  guest_name: string;
  phone: string;
  attending: "sim" | "nao";
  guests_count: number;
  message: string;
  created_at: string;
}

const defaultRsvps: RsvpEntry[] = [
  {
    id: "1",
    guest_name: "Maria Luiza Fortunato",
    phone: "(11) 98765-4321",
    attending: "sim",
    guests_count: 2,
    message: "Parabéns aos noivos! Que Deus abençoe grandemente esta união.",
    created_at: "2026-09-20T14:30:00Z",
  },
  {
    id: "2",
    guest_name: "Carlos Eduardo Marques",
    phone: "(11) 91234-5678",
    attending: "sim",
    guests_count: 3,
    message: "Estamos ansiosos para celebrar este dia tão especial com vocês!",
    created_at: "2026-09-21T10:15:00Z",
  },
  {
    id: "3",
    guest_name: "Juliana Souza",
    phone: "(11) 99888-7766",
    attending: "sim",
    guests_count: 1,
    message: "Casal maravilhoso! Toda felicidade do mundo para vocês.",
    created_at: "2026-09-22T18:45:00Z",
  },
];

const galleryPhotos = [
  {
    src: couplePhoto,
    alt: "João Carlos e Ana Paula - Nosso amor e cumplicidade",
    tag: "O Casal",
    title: "João Carlos & Ana Paula",
    caption: "O início da nossa caminhada juntos com muito amor e gratidão.",
  },
  {
    src: gardenPhoto,
    alt: "O jardim onde celebraremos nossa cerimônia de casamento",
    tag: "O Local",
    title: "Cenário da Celebração",
    caption: "Espaço acolhedor ao ar livre preparado com carinho para receber você.",
  },
  {
    src: ringsPhoto,
    alt: "Alianças do casamento sobre pétalas delicadas",
    tag: "Alianças",
    title: "Bênção & União",
    caption: "O símbolo eterno do amor que une nossas vidas sob a bênção divina.",
  },
];

interface GiftItem {
  id: string;
  name: string;
  category: "lua-de-mel" | "casa" | "experiencias";
  price: number;
  description: string;
  image: string;
}

const giftItems: GiftItem[] = [
  {
    id: "jantar-romantico",
    name: "Jantar romântico à luz de velas na Lua de Mel",
    category: "lua-de-mel",
    price: 250,
    description: "Uma noite inesquecível a dois com gastronomia local e muito amor.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "passeio-barco",
    name: "Passeio de barco ao pôr do sol",
    category: "lua-de-mel",
    price: 320,
    description: "Um momento paradisíaco contemplando as águas e a natureza.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cafe-cama",
    name: "Café da manhã especial na cama",
    category: "lua-de-mel",
    price: 150,
    description: "Um mimo doce e carinhoso para começar o primeiro dia de casados.",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "diaria-hotel",
    name: "Diária em hotel de charme na Lua de Mel",
    category: "lua-de-mel",
    price: 450,
    description: "Conforto e acolhimento para celebrar o início do matrimônio.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "brinde-champanhe",
    name: "Brinde com champanhe e frutas tropicais",
    category: "lua-de-mel",
    price: 180,
    description: "Para brindar à vida e a todas as bênçãos desta nova fase.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "jogo-panelas",
    name: "Jogo de panelas antiaderentes premium",
    category: "casa",
    price: 380,
    description: "Para prepararmos os melhores almoços de domingo em família.",
    image:
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cafeteira-expresso",
    name: "Cafeteira expresso para os manhãs a dois",
    category: "casa",
    price: 290,
    description: "Aroma de café fresco para começar os dias com muita energia e carinho.",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "jogo-tacas",
    name: "Jogo de taças de cristal para receber amigos",
    category: "casa",
    price: 220,
    description: "Perfeito para celebrar as visitas e os momentos de comunhão no novo lar.",
    image:
      "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "robo-aspirador",
    name: "Cota para Robô Aspirador inteligente",
    category: "casa",
    price: 350,
    description: "Mais praticidade no dia a dia para sobrar mais tempo juntinhos.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "dia-spa",
    name: "Dia relaxante de Spa para os noivos",
    category: "experiencias",
    price: 280,
    description: "Massagem e relaxamento após os meses dedicados aos preparativos.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sessao-cinema",
    name: "Noite de cinema com pipoca gourmet e fondue",
    category: "experiencias",
    price: 130,
    description: "Momentos doces e divertidos que marcam as melhores lembranças.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cota-livre",
    name: "Cota de valor livre para os noivos",
    category: "experiencias",
    price: 100,
    description: "Contribua com o valor que desejar para abençoar a união do casal.",
    image: ringsPhoto,
  },
];

const tributes = [
  {
    name: "Avó Maria",
    role: "A Matriarca e Exemplo de Fé",
    description:
      "Com suas orações, ternura e amor incondicional, sempre foi a nossa inspiração de sabedoria e família.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Juninho",
    role: "Nosso Pajem Especial",
    description:
      "Com seu sorriso espontâneo e energia contagiante, trará as alianças com toda a pureza deste momento.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Spike",
    role: "O Pet Amigo da Família",
    description:
      "Nosso companheiro fiel de quatro patas que enche a nossa rotina de alegria, lambidas e amor sincero.",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Nossos Pais & Padrinhos",
    role: "Guardiões do Nosso Amor",
    description:
      "Aos nossos pais pela vida e valores, e aos padrinhos por aceitarem a missão sagrada de caminhar ao nosso lado.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80",
  },
];

const guestTips = [
  {
    id: "traje",
    icon: Shirt,
    title: "Traje",
    description:
      "Passeio Completo / Social Elegante. Sugerimos sapatos confortáveis para aproveitar com leveza a cerimônia no jardim e a festa.",
  },
  {
    id: "horario",
    icon: Clock,
    title: "Horário",
    description:
      "Pedimos a gentileza de chegarmos com 15 minutos de antecedência para acomodação antes do início pontual às 20:00.",
  },
  {
    id: "hospedagem",
    icon: Hotel,
    title: "Hospedagem",
    description:
      "Indicamos hotéis e pousadas parceiras na região com tarifas especiais para convidados que vêm de outras cidades.",
  },
  {
    id: "estacionamento",
    icon: Car,
    title: "Estacionamento",
    description:
      "O local conta com serviço de valet e estacionamento privativo e seguro no local para comodidade de todos.",
  },
];

function WeddingInvitation() {
  // RSVP Form state (persistente via localStorage)
  const [rsvps, setRsvps] = useState<RsvpEntry[]>(() => {
    if (typeof window === "undefined") return defaultRsvps;
    const saved = localStorage.getItem("joao_ana_rsvps");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultRsvps;
      }
    }
    return defaultRsvps;
  });

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestAttending, setGuestAttending] = useState<"sim" | "nao">("sim");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [guestMessage, setGuestMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  // Admin Panel state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminFilter, setAdminFilter] = useState<"todos" | "sim" | "nao">("todos");

  // Gallery carousel state
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Gift modal state
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [giftFilter, setGiftFilter] = useState<"todas" | "lua-de-mel" | "casa" | "experiencias">(
    "todas",
  );
  const [giftSenderName, setGiftSenderName] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [giftPixCopied, setGiftPixCopied] = useState(false);
  const [giftConfirmed, setGiftConfirmed] = useState(false);

  // Countdown state to 07/11/2026 20:00:00 (America/Sao_Paulo)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [eventPassed, setEventPassed] = useState(false);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicTimerRef = useRef<number | null>(null);

  const pixKey = "joaoeana.casamento2026@pix.com.br";

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("joao_ana_rsvps", JSON.stringify(rsvps));
    }
  }, [rsvps]);

  // Contagem regressiva em tempo real
  useEffect(() => {
    // 7 de novembro de 2026 às 20:00:00 em UTC-3 (America/Sao_Paulo)
    const targetDate = new Date("2026-11-07T20:00:00-03:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setEventPassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleRsvpSubmit(e: FormEvent) {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newEntry: RsvpEntry = {
      id: Date.now().toString(),
      guest_name: guestName.trim(),
      phone: guestPhone.trim() || "-",
      attending: guestAttending,
      guests_count: guestAttending === "sim" ? Number(guestCount) || 1 : 0,
      message: guestMessage.trim(),
      created_at: new Date().toISOString(),
    };

    setRsvps([newEntry, ...rsvps]);
    setRsvpSubmitted(true);
  }

  function addToCalendar() {
    if (typeof window === "undefined") return;

    const icsData = generateWeddingIcs();
    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "casamento-joao-carlos-e-ana-paula.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 200);
  }

  function nextPhoto() {
    setCurrentPhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
  }

  function prevPhoto() {
    setCurrentPhotoIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  }

  const currentPhoto = galleryPhotos[currentPhotoIndex];

  // Tocador de Trilha Sonora
  function toggleMusic() {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  function startMusic() {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }

      setIsPlaying(true);

      const notes = [
        261.63, 329.63, 392.0, 523.25, 196.0, 246.94, 293.66, 392.0, 220.0, 261.63, 329.63, 440.0,
        174.61, 220.0, 261.63, 349.23,
      ];

      let noteIndex = 0;
      const playNote = () => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = notes[noteIndex % notes.length];
        noteIndex++;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const volume = isMuted ? 0 : 0.07;
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);

        musicTimerRef.current = window.setTimeout(playNote, 480);
      };

      playNote();
    } catch {
      setIsPlaying(false);
    }
  }

  function stopMusic() {
    setIsPlaying(false);
    if (musicTimerRef.current) {
      window.clearTimeout(musicTimerRef.current);
      musicTimerRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (musicTimerRef.current) {
        window.clearTimeout(musicTimerRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  function copyPix() {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(pixKey);
      setGiftPixCopied(true);
      setTimeout(() => setGiftPixCopied(false), 2500);
    }
  }

  function submitGift(e: FormEvent) {
    e.preventDefault();
    setGiftConfirmed(true);
  }

  const filteredGifts =
    giftFilter === "todas" ? giftItems : giftItems.filter((item) => item.category === giftFilter);

  // Cálculos do painel administrativo
  const totalConfirmedGuests = rsvps
    .filter((r) => r.attending === "sim")
    .reduce((acc, curr) => acc + curr.guests_count, 0);
  const totalNotAttending = rsvps.filter((r) => r.attending === "nao").length;

  function exportRsvpCsv() {
    const headers = ["Nome", "Telefone", "Presença", "Qtd Pessoas", "Mensagem", "Data"];
    const rows = rsvps.map((r) => [
      `"${r.guest_name}"`,
      `"${r.phone}"`,
      r.attending === "sim" ? "Sim" : "Não",
      r.guests_count,
      `"${r.message.replace(/"/g, '""')}"`,
      `"${new Date(r.created_at).toLocaleDateString("pt-BR")}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lista_convidados_rsvp.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="min-h-screen w-full bg-forest text-foreground selection:bg-gold/30 selection:text-forest">
      {/* NAVEGAÇÃO DISCRETA DE ÂNCORAS */}
      <nav
        aria-label="Navegação rápida do convite"
        className="sticky top-0 z-40 w-full border-b border-gold/20 bg-forest/95 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
          <a href="#convite" className="flex items-center gap-2 text-forest-foreground">
            <Heart className="h-4 w-4 fill-gold text-gold" />
            <span className="font-display text-sm tracking-wider sm:text-base">
              João & Ana Paula
            </span>
          </a>

          <div className="hidden items-center gap-6 font-body text-xs font-medium uppercase tracking-widest text-forest-foreground/80 md:flex">
            <a href="#historia" className="transition hover:text-gold">
              História
            </a>
            <a href="#rsvp" className="transition hover:text-gold">
              RSVP
            </a>
            <a href="#local" className="transition hover:text-gold">
              Local
            </a>
            <a href="#presentes" className="transition hover:text-gold">
              Presentes
            </a>
            <a href="#homenagens" className="transition hover:text-gold">
              Homenagens
            </a>
            <a href="#trilha" className="transition hover:text-gold">
              Trilha
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Player de Trilha Sonora */}
            <button
              type="button"
              onClick={toggleMusic}
              aria-label={isPlaying ? "Pausar música" : "Ouvir música"}
              className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-white/10 px-3 py-1 text-xs text-white transition hover:bg-white/20"
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5 fill-gold text-gold" />
              ) : (
                <Play className="h-3.5 w-3.5 fill-gold text-gold" />
              )}
              <span className="hidden sm:inline">
                {isPlaying ? "Pausar Trilha" : "Nossa Música"}
              </span>
            </button>

            {/* Botão Admin */}
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              aria-label="Painel Administrativo"
              className="flex items-center gap-1 rounded-full border border-gold/30 bg-forest p-1.5 text-gold transition hover:bg-forest/80"
              title="Painel Administrativo"
            >
              <Lock className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* 1. CONVITE PRINCIPAL (Fundo Verde Floresta) */}
      <section
        id="convite"
        className="flex w-full items-center justify-center px-4 py-8 sm:px-6 md:py-12"
      >
        <div className="invitation-shadow relative mx-auto w-full max-w-[560px] overflow-hidden bg-paper">
          <img
            src={invitationImage}
            alt="Convite de casamento de João Carlos Marques e Ana Paula Fortunato - 07 de novembro de 2026 às 20:00"
            width={768}
            height={1376}
            loading="eager"
            decoding="async"
            className="block h-auto w-full select-none"
          />

          {/* Hotspot interativo: Confirmar presença */}
          <Dialog open={isRsvpOpen} onOpenChange={setIsRsvpOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Confirmar presença no casamento"
                className="absolute left-[16.93%] top-[50.22%] h-[3.34%] w-[66.15%] cursor-pointer rounded-[3px] bg-transparent transition-all duration-200 hover:bg-forest/15 hover:ring-1 hover:ring-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:scale-[0.99]"
              >
                <span className="sr-only">Confirmar presença</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[calc(100%-2rem)] border border-gold/40 bg-paper sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-display text-2xl font-semibold text-forest sm:text-3xl">
                  <Sparkles className="h-5 w-5 shrink-0 text-gold" />
                  Confirmar Presença
                </DialogTitle>
                <DialogDescription className="font-body text-sm text-muted-foreground">
                  Sua presença tornará este dia ainda mais inesquecível.
                </DialogDescription>
              </DialogHeader>

              {rsvpSubmitted ? (
                <div className="mt-4 space-y-4 rounded-lg border border-gold/30 bg-gold-soft/30 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-forest" />
                  <h4 className="font-display text-xl font-semibold text-forest">
                    Confirmação Registrada!
                  </h4>
                  <p className="font-body text-sm text-forest/85">
                    Muito obrigado por confirmar, {guestName}. Esperamos você no nosso grande dia!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setRsvpSubmitted(false);
                      setGuestName("");
                      setGuestPhone("");
                      setGuestMessage("");
                    }}
                    className="mt-2 text-xs font-semibold uppercase tracking-wider text-forest underline"
                  >
                    Fazer nova confirmação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="modal-guest-name"
                      className="block font-body text-xs font-medium uppercase tracking-wider text-forest"
                    >
                      Nome completo *
                    </label>
                    <input
                      id="modal-guest-name"
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="mt-1 h-11 w-full rounded-sm border border-gold/40 bg-background px-3.5 font-body text-sm text-forest placeholder:text-muted-foreground/60 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="modal-guest-phone"
                        className="block font-body text-xs font-medium uppercase tracking-wider text-forest"
                      >
                        Telefone / WhatsApp
                      </label>
                      <input
                        id="modal-guest-phone"
                        type="text"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                        className="mt-1 h-11 w-full rounded-sm border border-gold/40 bg-background px-3.5 font-body text-sm text-forest placeholder:text-muted-foreground/60 outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="modal-guest-status"
                        className="block font-body text-xs font-medium uppercase tracking-wider text-forest"
                      >
                        Sua Presença *
                      </label>
                      <select
                        id="modal-guest-status"
                        value={guestAttending}
                        onChange={(e) => setGuestAttending(e.target.value as "sim" | "nao")}
                        className="mt-1 h-11 w-full rounded-sm border border-gold/40 bg-background px-3 font-body text-sm text-forest outline-none focus:border-gold"
                      >
                        <option value="sim">Sim, estarei presente</option>
                        <option value="nao">Não poderei comparecer</option>
                      </select>
                    </div>
                  </div>

                  {guestAttending === "sim" && (
                    <div>
                      <label
                        htmlFor="modal-guest-count"
                        className="block font-body text-xs font-medium uppercase tracking-wider text-forest"
                      >
                        Quantidade de pessoas (incluindo você)
                      </label>
                      <input
                        id="modal-guest-count"
                        type="number"
                        min={1}
                        max={10}
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="mt-1 h-11 w-full rounded-sm border border-gold/40 bg-background px-3.5 font-body text-sm text-forest outline-none focus:border-gold"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="modal-guest-msg"
                      className="block font-body text-xs font-medium uppercase tracking-wider text-forest"
                    >
                      Mensagem opcional aos noivos
                    </label>
                    <textarea
                      id="modal-guest-msg"
                      rows={2}
                      value={guestMessage}
                      onChange={(e) => setGuestMessage(e.target.value)}
                      placeholder="Deixe uma palavra de carinho..."
                      className="mt-1 w-full rounded-sm border border-gold/40 bg-background p-3 font-body text-sm text-forest placeholder:text-muted-foreground/60 outline-none focus:border-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-gold/30 bg-forest px-4 font-body text-xs font-semibold uppercase tracking-wider text-forest-foreground shadow-sm transition hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:scale-[0.99]"
                  >
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    <span>Confirmar Presença</span>
                  </button>
                </form>
              )}
            </DialogContent>
          </Dialog>

          {/* Hotspot interativo: Como chegar */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Como chegar ao local da celebração"
                className="absolute left-[16.80%] top-[54.43%] h-[3.05%] w-[31.38%] cursor-pointer rounded-[3px] bg-transparent transition-all duration-200 hover:bg-forest/15 hover:ring-1 hover:ring-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:scale-[0.99]"
              >
                <span className="sr-only">Como chegar</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[calc(100%-2rem)] border border-gold/40 bg-paper sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-display text-2xl font-semibold text-forest sm:text-3xl">
                  <MapPin className="h-5 w-5 shrink-0 text-gold" />
                  Local da Celebração
                </DialogTitle>
                <DialogDescription className="pt-1 font-body text-sm text-muted-foreground">
                  Espaço Jardim das Acácias • Estrada das Flores, 1500
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-3">
                <div className="rounded-sm border border-gold/30 bg-gold-soft/20 p-4 text-center">
                  <p className="font-display text-lg font-medium text-forest">
                    07 de novembro de 2026 às 20:00
                  </p>
                  <p className="mt-1 font-body text-xs text-muted-foreground">
                    Bosque Primavera • São Paulo, SP
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href="https://maps.google.com/?q=Espaco+Jardim+das+Acacias+Estrada+das+Flores+1500"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-md border border-gold/40 bg-white p-2.5 font-body text-xs font-semibold text-forest shadow-sm transition hover:bg-gold-soft/30"
                  >
                    <Navigation className="h-4 w-4 text-emerald-600" />
                    <span>Google Maps</span>
                  </a>
                  <a
                    href="https://waze.com/ul?q=Estrada+das+Flores+1500"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-md border border-gold/40 bg-white p-2.5 font-body text-xs font-semibold text-forest shadow-sm transition hover:bg-gold-soft/30"
                  >
                    <Car className="h-4 w-4 text-cyan-600" />
                    <span>Waze</span>
                  </a>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Hotspot interativo: Adicionar à agenda */}
          <button
            type="button"
            aria-label="Adicionar casamento à agenda"
            onClick={addToCalendar}
            className="absolute left-[51.43%] top-[54.43%] h-[3.05%] w-[31.77%] cursor-pointer rounded-[3px] bg-transparent transition-all duration-200 hover:bg-forest/15 hover:ring-1 hover:ring-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:scale-[0.99]"
          >
            <span className="sr-only">Adicionar à agenda</span>
          </button>
        </div>
      </section>

      {/* 2. NOSSA HISTÓRIA (Fundo Off-White) */}
      <section id="historia" className="w-full bg-paper px-4 py-16 text-forest sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="font-script text-3xl text-gold">Nossa trajetória</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-forest sm:text-4xl">
              Nossa História de Amor
            </h2>
            <div className="mx-auto mt-3 h-px w-24 bg-gold/50" />
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Card de Boas-Vindas Editorial */}
            <div className="flex flex-col justify-between rounded-xl border border-gold/30 bg-white p-8 shadow-md lg:col-span-6">
              <div>
                <div className="flex justify-center pb-4">
                  <svg
                    className="h-10 w-28 text-gold"
                    viewBox="0 0 120 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 24C30 18 60 16 110 20"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle cx="38" cy="14" r="3.6" fill="#F1C40F" />
                    <circle cx="58" cy="10" r="3.4" fill="#F39C12" />
                    <circle cx="78" cy="15" r="3.2" fill="#D4AF37" />
                  </svg>
                </div>

                <h3 className="text-center font-display text-xl font-semibold uppercase tracking-[0.25em] text-forest">
                  Bem-vindos ao nosso site
                  <span className="block font-sans text-xs tracking-[0.22em] text-gold">
                    07.11.2026
                  </span>
                </h3>

                <div className="mx-auto my-5 h-px w-16 bg-gold/40" />

                <div className="space-y-4 text-center font-body text-sm leading-relaxed text-forest/85">
                  <p>
                    Criamos este espaço com todo carinho para compartilhar com vocês os detalhes da
                    organização do nosso casamento. Estamos imensamente felizes e contamos com a
                    presença de todos no nosso grande dia!
                  </p>
                  <p className="text-forest/75">
                    Aqui você encontrará orientações de local, confirmação de presença, lista de
                    presentes e dicas especiais.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 pt-2 text-xs font-semibold uppercase tracking-wider text-gold">
                <Heart className="h-3.5 w-3.5 fill-gold text-gold" />
                <span>João & Ana Paula</span>
                <Heart className="h-3.5 w-3.5 fill-gold text-gold" />
              </div>
            </div>

            {/* Carrossel de Fotos do Casal */}
            <div className="flex flex-col lg:col-span-6">
              <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-gold/30 bg-forest/5 shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest/10 sm:aspect-[16/11]">
                  <img
                    key={currentPhoto.src}
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    className="h-full w-full object-cover transition-opacity duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute left-3 top-3 rounded-full bg-forest/80 px-3 py-1 font-body text-[11px] font-medium tracking-wider text-white backdrop-blur-sm">
                    {currentPhoto.tag}
                  </div>

                  <button
                    type="button"
                    onClick={prevPhoto}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/70 active:scale-95"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={nextPhoto}
                    aria-label="Próxima foto"
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/70 active:scale-95"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="font-display text-lg font-semibold tracking-wide sm:text-xl">
                      {currentPhoto.title}
                    </p>
                    <p className="font-body text-xs text-white/90 sm:text-sm">
                      {currentPhoto.caption}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 bg-white/90 py-3.5">
                  {galleryPhotos.map((photo, index) => (
                    <button
                      key={photo.tag}
                      type="button"
                      onClick={() => setCurrentPhotoIndex(index)}
                      aria-label={`Ver imagem ${index + 1}: ${photo.title}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentPhotoIndex === index
                          ? "w-8 bg-forest"
                          : "w-2.5 bg-gold/40 hover:bg-gold"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTAGEM REGRESSIVA (Fundo Verde Floresta) */}
      <section className="w-full bg-forest px-4 py-16 text-forest-foreground sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-script text-2xl text-gold">Contagem regressiva</span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Faltam para o nosso sim
          </h2>
          <div className="mx-auto mt-3 h-px w-20 bg-gold/40" />

          {eventPassed ? (
            <div className="mt-8 rounded-xl border border-gold/30 bg-gold-soft/20 p-6">
              <p className="font-display text-2xl font-semibold text-gold">
                O grande dia chegou e foi celebrado com muito amor!
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-gold/30 bg-forest-foreground/5 p-4 backdrop-blur-sm">
                <span className="block font-display text-3xl font-bold text-gold sm:text-4xl">
                  {timeLeft.days}
                </span>
                <span className="mt-1 block font-body text-xs uppercase tracking-widest text-forest-foreground/80">
                  Dias
                </span>
              </div>
              <div className="rounded-xl border border-gold/30 bg-forest-foreground/5 p-4 backdrop-blur-sm">
                <span className="block font-display text-3xl font-bold text-gold sm:text-4xl">
                  {timeLeft.hours}
                </span>
                <span className="mt-1 block font-body text-xs uppercase tracking-widest text-forest-foreground/80">
                  Horas
                </span>
              </div>
              <div className="rounded-xl border border-gold/30 bg-forest-foreground/5 p-4 backdrop-blur-sm">
                <span className="block font-display text-3xl font-bold text-gold sm:text-4xl">
                  {timeLeft.minutes}
                </span>
                <span className="mt-1 block font-body text-xs uppercase tracking-widest text-forest-foreground/80">
                  Minutos
                </span>
              </div>
              <div className="rounded-xl border border-gold/30 bg-forest-foreground/5 p-4 backdrop-blur-sm">
                <span className="block font-display text-3xl font-bold text-gold sm:text-4xl">
                  {timeLeft.seconds}
                </span>
                <span className="mt-1 block font-body text-xs uppercase tracking-widest text-forest-foreground/80">
                  Segundos
                </span>
              </div>
            </div>
          )}

          <div className="mt-8">
            <button
              type="button"
              onClick={() => setIsRsvpOpen(true)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-gold bg-gold px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-widest text-forest shadow-md transition hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Check className="h-4 w-4" />
              <span>Confirmar Presença Agora</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. CONFIRMAR PRESENÇA & RSVP (Fundo Off-White) */}
      <section id="rsvp" className="w-full bg-paper px-4 py-16 text-forest sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <span className="font-script text-2xl text-gold">Sua presença é essencial</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-forest sm:text-4xl">
              Confirmação de Presença (RSVP)
            </h2>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Por favor, confirme sua presença até o dia 10 de outubro de 2026.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-gold/30 bg-white p-6 shadow-xl sm:p-10">
            {rsvpSubmitted ? (
              <div className="space-y-4 rounded-xl border border-gold/30 bg-gold-soft/30 p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-forest" />
                <h4 className="font-display text-xl font-semibold text-forest">
                  Presença Registrada com Sucesso!
                </h4>
                <p className="font-body text-sm text-forest/85">
                  Agradecemos imensamente o seu retorno, {guestName}.
                </p>
                <button
                  type="button"
                  onClick={() => setRsvpSubmitted(false)}
                  className="text-xs font-semibold uppercase tracking-wider text-forest underline"
                >
                  Enviar outra confirmação
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="block font-body text-xs font-medium uppercase tracking-wider text-forest"
                  >
                    Nome completo *
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="mt-1 h-11 w-full rounded-sm border border-gold/40 bg-background px-3.5 font-body text-sm text-forest placeholder:text-muted-foreground/60 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="rsvp-phone"
                      className="block font-body text-xs font-medium uppercase tracking-wider text-forest"
                    >
                      Telefone / WhatsApp
                    </label>
                    <input
                      id="rsvp-phone"
                      type="text"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="mt-1 h-11 w-full rounded-sm border border-gold/40 bg-background px-3.5 font-body text-sm text-forest placeholder:text-muted-foreground/60 outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="rsvp-status"
                      className="block font-body text-xs font-medium uppercase tracking-wider text-forest"
                    >
                      Confirmação *
                    </label>
                    <select
                      id="rsvp-status"
                      value={guestAttending}
                      onChange={(e) => setGuestAttending(e.target.value as "sim" | "nao")}
                      className="mt-1 h-11 w-full rounded-sm border border-gold/40 bg-background px-3 font-body text-sm text-forest outline-none focus:border-gold"
                    >
                      <option value="sim">Sim, estarei presente</option>
                      <option value="nao">Não poderei comparecer</option>
                    </select>
                  </div>
                </div>

                {guestAttending === "sim" && (
                  <div>
                    <label
                      htmlFor="rsvp-count"
                      className="block font-body text-xs font-medium uppercase tracking-wider text-forest"
                    >
                      Número de pessoas confirmadas
                    </label>
                    <input
                      id="rsvp-count"
                      type="number"
                      min={1}
                      max={10}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="mt-1 h-11 w-full rounded-sm border border-gold/40 bg-background px-3.5 font-body text-sm text-forest outline-none focus:border-gold"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="rsvp-message"
                    className="block font-body text-xs font-medium uppercase tracking-wider text-forest"
                  >
                    Mensagem para os noivos
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={3}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Deixe seus votos de felicidade..."
                    className="mt-1 w-full rounded-sm border border-gold/40 bg-background p-3 font-body text-sm text-forest placeholder:text-muted-foreground/60 outline-none focus:border-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-forest font-body text-xs font-semibold uppercase tracking-widest text-forest-foreground shadow-md transition hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Send className="h-4 w-4 text-gold" />
                  <span>Enviar Confirmação</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. LOCAL DA CELEBRAÇÃO (Fundo Verde Floresta) */}
      <section
        id="local"
        className="w-full bg-forest px-4 py-16 text-forest-foreground sm:px-6 md:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="font-script text-2xl text-gold">O grande dia</span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Local da Celebração
            </h2>
            <div className="mx-auto mt-3 h-px w-20 bg-gold/40" />
          </div>

          <div className="mt-10 grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="relative overflow-hidden rounded-xl border border-gold/30 bg-white p-3 shadow-xl md:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-emerald-50">
                <svg
                  viewBox="0 0 400 300"
                  className="h-full w-full object-cover"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="400" height="300" fill="#EAE5D9" />
                  <path d="M0 0H140V110H0Z" fill="#D3DEC9" />
                  <path d="M260 0H400V90H260Z" fill="#D3DEC9" />
                  <path d="M300 200H400V300H300Z" fill="#D3DEC9" />
                  <path d="M-10 60L410 60" stroke="#FFFFFF" strokeWidth="18" />
                  <path d="M-10 180L410 180" stroke="#FFFFFF" strokeWidth="22" />
                  <path d="M120 -10L120 310" stroke="#FFFFFF" strokeWidth="20" />
                  <path d="M280 -10L280 310" stroke="#FFFFFF" strokeWidth="16" />
                  <path
                    d="M60 40 L120 180 L280 180 L280 140"
                    stroke="#E11D48"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="6 3"
                  />
                  <circle cx="280" cy="135" r="14" fill="#E11D48" />
                  <circle cx="280" cy="135" r="5" fill="#FFFFFF" />
                  <rect x="180" y="85" width="200" height="30" rx="6" fill="#123D2C" />
                  <text
                    x="280"
                    y="105"
                    fill="#F8F5ED"
                    fontSize="11"
                    fontWeight="600"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    Espaço Jardim das Acácias
                  </text>
                </svg>

                <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
                  <Navigation className="h-5 w-5 text-sky-500" />
                </div>
              </div>
            </div>

            <div className="space-y-4 md:col-span-5">
              <div className="rounded-xl border border-gold/40 bg-forest-foreground/5 p-6 backdrop-blur-sm">
                <span className="inline-block rounded-full bg-gold/20 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wider text-gold">
                  Cerimônia e Recepção
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-forest-foreground">
                  Espaço Jardim das Acácias
                </h3>
                <p className="mt-1 font-body text-xs leading-relaxed text-forest-foreground/80 sm:text-sm">
                  Estrada das Flores, nº 1500 • Bosque Primavera, São Paulo - SP
                </p>
                <p className="mt-3 font-body text-xs font-semibold text-gold">
                  07 de novembro de 2026 às 20:00
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <a
                  href="https://maps.google.com/?q=Estrada+das+Flores+1500"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 items-center justify-center gap-2 rounded-md border border-gold/40 bg-white font-body text-xs font-semibold uppercase tracking-wider text-forest shadow-sm transition hover:bg-gold-soft/30"
                >
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>Google Maps</span>
                </a>
                <a
                  href="https://waze.com/ul?q=Estrada+das+Flores+1500"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 items-center justify-center gap-2 rounded-md border border-gold/40 bg-white font-body text-xs font-semibold uppercase tracking-wider text-forest shadow-sm transition hover:bg-gold-soft/30"
                >
                  <Navigation className="h-4 w-4 text-sky-500" />
                  <span>Waze</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ADICIONAR À AGENDA (Fundo Off-White) */}
      <section className="w-full bg-paper px-4 py-16 text-forest sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-script text-2xl text-gold">Não se esqueça</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-forest sm:text-4xl">
            Adicionar à Agenda
          </h2>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            Salve o evento diretamente no seu calendário para não perder nenhum detalhe.
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={addToCalendar}
              className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-gold bg-forest px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-widest text-forest-foreground shadow-md transition hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Calendar className="h-4 w-4 text-gold" />
              <span>Baixar Arquivo da Agenda (.ics)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. LISTA DE PRESENTES (Fundo Verde Floresta) */}
      <section
        id="presentes"
        className="w-full bg-forest px-4 py-16 text-forest-foreground sm:px-6 md:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="font-script text-2xl text-gold">Sugestões carinhosas</span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Lista de Presentes
            </h2>
            <p className="mx-auto mt-2 max-w-2xl font-body text-sm text-forest-foreground/80 sm:text-base">
              Sua presença é o nosso maior presente! Se desejar nos agraciar com uma cota para a
              nossa Lua de Mel ou para o nosso novo lar, escolha uma das opções abaixo com pagamento
              via PIX.
            </p>

            {/* Chave PIX Rápida */}
            <div className="mx-auto mt-6 flex max-w-md flex-col items-center justify-between gap-3 rounded-xl border border-gold/40 bg-forest-foreground/5 p-4 backdrop-blur-sm sm:flex-row">
              <div className="text-left">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-gold">
                  Chave PIX dos Noivos (E-mail)
                </span>
                <span className="font-mono text-xs font-medium text-white sm:text-sm">
                  {pixKey}
                </span>
              </div>
              <button
                type="button"
                onClick={copyPix}
                className="flex cursor-pointer items-center gap-1.5 rounded-sm bg-gold px-3.5 py-2 font-body text-xs font-semibold text-forest transition hover:bg-gold/90"
              >
                {giftPixCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar PIX</span>
                  </>
                )}
              </button>
            </div>

            {/* Filtros */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[
                { id: "todas", label: "Todas as Opções" },
                { id: "lua-de-mel", label: "Cotas de Lua de Mel" },
                { id: "casa", label: "Casa & Cozinha" },
                { id: "experiencias", label: "Experiências" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setGiftFilter(tab.id as typeof giftFilter)}
                  className={`cursor-pointer rounded-full px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-wider transition ${
                    giftFilter === tab.id
                      ? "bg-gold text-forest shadow-sm"
                      : "bg-white/10 text-white/90 hover:bg-white/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGifts.map((gift) => (
              <div
                key={gift.id}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-gold/30 bg-white text-forest shadow-md transition hover:shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-forest/10">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 rounded-full bg-forest/90 px-3 py-1 font-body text-xs font-bold text-gold backdrop-blur-sm">
                      R$ {gift.price.toFixed(2).replace(".", ",")}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold leading-snug text-forest">
                      {gift.name}
                    </h3>
                    <p className="mt-2 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {gift.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gold/20 p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedGift(gift);
                          setGiftConfirmed(false);
                          setGiftSenderName("");
                          setGiftMessage("");
                        }}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-forest py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-forest-foreground transition hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      >
                        <Gift className="h-4 w-4 text-gold" />
                        <span>Presentear</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[calc(100%-2rem)] border border-gold/40 bg-paper sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 font-display text-xl font-semibold text-forest sm:text-2xl">
                          <Heart className="h-5 w-5 shrink-0 fill-gold text-gold" />
                          Presentear os Noivos
                        </DialogTitle>
                        <DialogDescription className="font-body text-xs text-muted-foreground sm:text-sm">
                          {selectedGift?.name} • R${" "}
                          {selectedGift?.price.toFixed(2).replace(".", ",")}
                        </DialogDescription>
                      </DialogHeader>

                      {giftConfirmed ? (
                        <div className="mt-4 space-y-4 rounded-lg border border-gold/30 bg-gold-soft/30 p-5 text-center">
                          <CheckCircle2 className="mx-auto h-12 w-12 text-forest" />
                          <h4 className="font-display text-lg font-semibold text-forest">
                            Muito obrigado, {giftSenderName || "amigo(a)"}!
                          </h4>
                          <p className="font-body text-xs text-forest/85 sm:text-sm">
                            Sua mensagem de carinho foi registrada com sucesso.
                          </p>
                          {giftMessage && (
                            <blockquote className="italic text-xs text-muted-foreground">
                              &ldquo;{giftMessage}&rdquo;
                            </blockquote>
                          )}
                        </div>
                      ) : (
                        <form onSubmit={submitGift} className="mt-3 space-y-3.5">
                          <div>
                            <label
                              htmlFor="gift-sender"
                              className="block font-body text-xs font-medium text-forest"
                            >
                              Seu Nome Completo *
                            </label>
                            <input
                              id="gift-sender"
                              type="text"
                              required
                              value={giftSenderName}
                              onChange={(e) => setGiftSenderName(e.target.value)}
                              placeholder="Como deseja assinar"
                              className="mt-1 h-10 w-full rounded-sm border border-gold/40 bg-white px-3 font-body text-sm text-forest outline-none focus:border-gold"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="gift-msg"
                              className="block font-body text-xs font-medium text-forest"
                            >
                              Mensagem aos noivos (opcional)
                            </label>
                            <textarea
                              id="gift-msg"
                              rows={2}
                              value={giftMessage}
                              onChange={(e) => setGiftMessage(e.target.value)}
                              placeholder="Escreva seus votos..."
                              className="mt-1 w-full rounded-sm border border-gold/40 bg-white p-3 font-body text-sm text-forest outline-none focus:border-gold"
                            />
                          </div>

                          <div className="rounded-lg border border-gold/30 bg-gold-soft/20 p-3 text-center">
                            <span className="block font-body text-[11px] font-semibold uppercase tracking-wider text-forest">
                              Chave PIX para Pagamento
                            </span>
                            <div className="mt-1.5 flex items-center justify-center gap-2">
                              <span className="font-mono text-xs text-forest">{pixKey}</span>
                              <button
                                type="button"
                                onClick={copyPix}
                                className="cursor-pointer rounded bg-forest px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-forest/90"
                              >
                                {giftPixCopied ? "Copiado!" : "Copiar"}
                              </button>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-forest font-body text-xs font-semibold uppercase tracking-wider text-forest-foreground transition hover:bg-forest/90"
                          >
                            <Check className="h-4 w-4 text-gold" />
                            <span>Confirmar Envio do Presente</span>
                          </button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. HOMENAGENS ESPECIAIS (Fundo Off-White) */}
      <section id="homenagens" className="w-full bg-paper px-4 py-16 text-forest sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="font-script text-2xl text-gold">Gratidão infinita</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-forest sm:text-4xl">
              Homenagens Especiais
            </h2>
            <div className="mx-auto mt-3 h-px w-20 bg-gold/50" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tributes.map((tribute) => (
              <div
                key={tribute.name}
                className="flex flex-col items-center rounded-xl border border-gold/30 bg-white p-6 text-center shadow-md transition hover:shadow-xl"
              >
                <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-gold/40">
                  <img
                    src={tribute.image}
                    alt={tribute.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest">
                  {tribute.name}
                </h3>
                <span className="text-[11px] font-medium uppercase tracking-wider text-gold">
                  {tribute.role}
                </span>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted-foreground">
                  {tribute.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NOSSA TRILHA SONORA (Fundo Verde Floresta) */}
      <section id="trilha" className="w-full bg-forest px-4 py-16 text-forest-foreground sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-script text-2xl text-gold">A nossa música</span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Nossa Trilha Sonora
          </h2>
          <div className="mx-auto mt-3 h-px w-20 bg-gold/40" />

          <div className="mt-8 rounded-2xl border border-gold/40 bg-forest-foreground/5 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <Music className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-display text-base font-semibold text-white sm:text-lg">
                    J&A Love Soundtrack
                  </h4>
                  <p className="text-[11px] text-forest-foreground/70">
                    Nossa história com trilha sonora
                  </p>
                </div>
              </div>
              <Share2 className="h-4 w-4 text-gold/80" />
            </div>

            <div className="my-6 flex items-center justify-between gap-4 rounded-xl border border-gold/30 bg-white/10 p-4">
              <div className="text-left">
                <p className="font-display text-lg font-semibold text-white">A Thousand Years</p>
                <p className="font-body text-xs text-forest-foreground/70">
                  Christina Perri (Instrumental)
                </p>
              </div>
              <button
                type="button"
                onClick={toggleMusic}
                aria-label={isPlaying ? "Pausar música" : "Tocar música"}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gold text-forest shadow-md transition hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 fill-forest" />
                ) : (
                  <Play className="h-5 w-5 fill-forest" />
                )}
              </button>
            </div>

            <div className="space-y-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full bg-gold transition-all duration-300 ${isPlaying ? "w-2/3 animate-pulse" : "w-1/4"}`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-forest-foreground/70">
                <span>{isPlaying ? "01:24" : "00:00"}</span>
                <span>04:45</span>
              </div>
            </div>

            <p className="mt-5 font-body text-xs text-forest-foreground/80">
              {isPlaying
                ? "Tocando suavemente a trilha sonora escolhida pelos noivos."
                : "Clique no play para ouvir a melodia oficial do casal durante a sua visita."}
            </p>
          </div>
        </div>
      </section>

      {/* 10. DICAS PARA CONVIDADOS (Fundo Off-White) */}
      <section className="w-full bg-paper px-4 py-16 text-forest sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="font-script text-2xl text-gold">Informações úteis</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-forest sm:text-4xl">
              Para tornar esse dia ainda mais especial
            </h2>
            <div className="mx-auto mt-3 h-px w-24 bg-gold/50" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guestTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div
                  key={tip.id}
                  className="flex flex-col items-center rounded-xl border border-gold/30 bg-white p-6 text-center shadow-md transition hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/50 text-forest">
                    <Icon className="h-6 w-6 text-forest" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-forest">
                    {tip.title}
                  </h3>
                  <p className="mt-2 font-body text-xs leading-relaxed text-muted-foreground">
                    {tip.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. MENSAGENS FINAIS / MURAL DE RECADOS (Fundo Verde Floresta) */}
      <section className="w-full bg-forest px-4 py-16 text-forest-foreground sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-script text-2xl text-gold">Carinho em palavras</span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Mural de Recados dos Convidados
          </h2>
          <div className="mx-auto mt-3 h-px w-20 bg-gold/40" />

          <div className="mt-10 space-y-4 text-left">
            {rsvps
              .filter((r) => r.message && r.message.trim().length > 0)
              .slice(0, 5)
              .map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-gold/30 bg-forest-foreground/5 p-5 backdrop-blur-sm transition hover:bg-forest-foreground/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-semibold text-gold">
                      {r.guest_name}
                    </span>
                    <span className="font-body text-[11px] text-forest-foreground/60">
                      {new Date(r.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm italic text-forest-foreground/90">
                    &ldquo;{r.message}&rdquo;
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 12. RODAPÉ (Fundo Off-White) */}
      <footer className="w-full border-t border-gold/30 bg-paper px-4 py-12 text-center text-forest sm:px-6">
        <div className="mx-auto max-w-xl space-y-3">
          <p className="font-script text-3xl text-forest">
            Esperamos por você para celebrar o nosso amor!
          </p>
          <p className="font-display text-sm font-semibold tracking-wider uppercase text-gold">
            João Carlos Marques & Ana Paula Fortunato
          </p>
          <p className="font-body text-xs text-muted-foreground">
            07 de novembro de 2026 • São Paulo, SP
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 rounded border border-gold/40 bg-white px-3 py-1.5 font-body text-xs font-semibold text-forest shadow-sm transition hover:bg-gold-soft/30"
            >
              <Lock className="h-3.5 w-3.5 text-gold" />
              <span>Painel Administrativo (RSVP)</span>
            </button>
          </div>
        </div>
      </footer>

      {/* PAINEL ADMINISTRATIVO PROTEGIDO (MODAL) */}
      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] border border-gold/40 bg-paper sm:max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-2xl font-semibold text-forest">
              <Users className="h-6 w-6 text-gold" />
              Painel Administrativo • Gestão de RSVP
            </DialogTitle>
            <DialogDescription className="font-body text-sm text-muted-foreground">
              Acompanhe as confirmações de presença e mensagens enviadas pelos convidados em tempo
              real.
            </DialogDescription>
          </DialogHeader>

          {!isAdminAuthenticated ? (
            <div className="my-6 rounded-lg border border-gold/30 bg-white p-6 text-center shadow-sm">
              <Lock className="mx-auto h-10 w-10 text-gold" />
              <h4 className="mt-3 font-display text-lg font-semibold text-forest">
                Acesso Restrito aos Noivos
              </h4>
              <p className="mt-1 font-body text-xs text-muted-foreground">
                Digite a senha de administrador (PIN padrão:{" "}
                <span className="font-mono font-bold text-forest">2026</span>)
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPin === "2026") {
                    setIsAdminAuthenticated(true);
                  } else {
                    alert("Senha incorreta. PIN padrão: 2026");
                  }
                }}
                className="mx-auto mt-4 flex max-w-xs gap-2"
              >
                <input
                  type="password"
                  placeholder="Senha PIN"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="h-10 flex-1 rounded-sm border border-gold/40 px-3 font-mono text-sm text-forest outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="h-10 cursor-pointer rounded-sm bg-forest px-4 font-body text-xs font-semibold text-forest-foreground hover:bg-forest/90"
                >
                  Entrar
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6 pt-2">
              {/* Cards de Resumo */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-gold/30 bg-white p-4 text-center shadow-sm">
                  <span className="block font-display text-2xl font-bold text-forest">
                    {totalConfirmedGuests}
                  </span>
                  <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                    Total Confirmados
                  </span>
                </div>
                <div className="rounded-lg border border-gold/30 bg-white p-4 text-center shadow-sm">
                  <span className="block font-display text-2xl font-bold text-red-600">
                    {totalNotAttending}
                  </span>
                  <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                    Não Comparecem
                  </span>
                </div>
                <div className="rounded-lg border border-gold/30 bg-white p-4 text-center shadow-sm">
                  <span className="block font-display text-2xl font-bold text-gold">
                    {rsvps.length}
                  </span>
                  <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                    Total Respostas
                  </span>
                </div>
              </div>

              {/* Ferramentas de Busca, Filtro e Exportação */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Pesquisar convidado por nome..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    className="h-10 w-full rounded-sm border border-gold/40 bg-white pl-9 pr-3 font-body text-xs text-forest outline-none focus:border-gold"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={adminFilter}
                    onChange={(e) => setAdminFilter(e.target.value as typeof adminFilter)}
                    className="h-10 rounded-sm border border-gold/40 bg-white px-3 font-body text-xs text-forest outline-none focus:border-gold"
                  >
                    <option value="todos">Todos os Status</option>
                    <option value="sim">Confirmados (Sim)</option>
                    <option value="nao">Ausentes (Não)</option>
                  </select>

                  <button
                    type="button"
                    onClick={exportRsvpCsv}
                    className="flex h-10 cursor-pointer items-center gap-1.5 rounded-sm bg-forest px-3.5 font-body text-xs font-semibold text-forest-foreground hover:bg-forest/90"
                    title="Exportar CSV"
                  >
                    <Download className="h-4 w-4 text-gold" />
                    <span>Exportar CSV</span>
                  </button>
                </div>
              </div>

              {/* Tabela de Convidados */}
              <div className="overflow-x-auto rounded-lg border border-gold/30 bg-white shadow-sm">
                <table className="w-full text-left font-body text-xs">
                  <thead className="border-b border-gold/20 bg-gold-soft/20 text-forest">
                    <tr>
                      <th className="p-3 font-semibold">Convidado</th>
                      <th className="p-3 font-semibold">Telefone</th>
                      <th className="p-3 font-semibold">Presença</th>
                      <th className="p-3 font-semibold">Qtd</th>
                      <th className="p-3 font-semibold">Mensagem</th>
                      <th className="p-3 font-semibold text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10">
                    {rsvps
                      .filter((r) => {
                        const matchesSearch = r.guest_name
                          .toLowerCase()
                          .includes(adminSearch.toLowerCase());
                        const matchesFilter =
                          adminFilter === "todos" || r.attending === adminFilter;
                        return matchesSearch && matchesFilter;
                      })
                      .map((r) => (
                        <tr key={r.id} className="hover:bg-gold-soft/10">
                          <td className="p-3 font-medium text-forest">{r.guest_name}</td>
                          <td className="p-3 text-muted-foreground">{r.phone}</td>
                          <td className="p-3">
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                                r.attending === "sim"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {r.attending === "sim" ? "Confirmado" : "Não vai"}
                            </span>
                          </td>
                          <td className="p-3 font-mono">
                            {r.attending === "sim" ? r.guests_count : 0}
                          </td>
                          <td className="p-3 max-w-xs truncate text-muted-foreground">
                            {r.message || "—"}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Deseja remover a confirmação de ${r.guest_name}?`)) {
                                  setRsvps(rsvps.filter((item) => item.id !== r.id));
                                }
                              }}
                              className="cursor-pointer text-red-600 hover:text-red-800"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
