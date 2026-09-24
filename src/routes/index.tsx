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
          "Convite de casamento e lista de presentes de João Carlos Marques e Ana Paula Fortunato. Cerimônia em 7 de novembro de 2026 às 20h.",
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
        content:
          "Convite de casamento e lista de presentes de João Carlos Marques e Ana Paula Fortunato.",
      },
      { name: "twitter:image", content: "/src/assets/convite-final.jpg" },
    ],
  }),
  component: WeddingInvitation,
});

/**
 * Gera o conteúdo do arquivo iCalendar (.ics) para o casamento
 * Data: 07 de novembro de 2026 às 20:00 (Horário de Brasília / São Paulo)
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
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

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

const guestTips = [
  {
    id: "hospedagem",
    icon: Hotel,
    title: "Hospedagem",
    description:
      "Para os convidados que virão de fora ou desejam mais conforto, selecionamos opções de hotéis e pousadas próximas com tarifas especiais de parceiros.",
  },
  {
    id: "salao",
    icon: Scissors,
    title: "Salão de Beleza",
    description:
      "Indicamos profissionais renomados na região para penteado, maquiagem e cuidados pessoais para que todos se sintam radiantes no dia.",
  },
  {
    id: "trajes",
    icon: Shirt,
    title: "Trajes",
    description:
      "Traje Social / Passeio Completo. Sugerimos sapatos confortáveis para aproveitar com leveza a cerimônia no jardim e a pista de dança!",
  },
  {
    id: "estacionamento",
    icon: Car,
    title: "Estacionamento",
    description:
      "O local conta com serviço de valet e estacionamento seguro monitorado para tranquilidade e comodidade de todos os presentes.",
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

function WeddingInvitation() {
  const [guestName, setGuestName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [activeTip, setActiveTip] = useState<string>("hospedagem");

  // Estados da Lista de Presentes
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [giftFilter, setGiftFilter] = useState<"todas" | "lua-de-mel" | "casa" | "experiencias">(
    "todas",
  );
  const [giftSenderName, setGiftSenderName] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [giftPixCopied, setGiftPixCopied] = useState(false);
  const [giftConfirmed, setGiftConfirmed] = useState(false);

  // Áudio da Playlist do Casal (Web Audio sintetizado suave estilo piano/instrumental acústico)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicTimerRef = useRef<number | null>(null);

  const pixKey = "joaoeana.casamento2026@pix.com.br";

  function confirmPresence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (guestName.trim()) {
      setConfirmed(true);
    }
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

  // Tocador de Música Suave do Casal
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

      // Melodia romântica suave ("A Thousand Years" inspirada em C - G - Am - F)
      const notes = [
        261.63,
        329.63,
        392.0,
        523.25, // C chord arpeggio
        196.0,
        246.94,
        293.66,
        392.0, // G chord
        220.0,
        261.63,
        329.63,
        440.0, // Am chord
        174.61,
        220.0,
        261.63,
        349.23, // F chord
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

        const volume = isMuted ? 0 : 0.08;
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
      // Ignora falhas em navegadores sem suporte
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

  return (
    <main className="min-h-screen w-full bg-forest text-foreground">
      {/* BARRA DE MÚSICA & NAVEGAÇÃO FLUTUANTE */}
      <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-gold/20 bg-forest/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 fill-gold text-gold" />
          <span className="font-display text-sm tracking-wider text-forest-foreground sm:text-base">
            João Carlos & Ana Paula
          </span>
        </div>

        {/* Player de Música Flutuante */}
        <div className="flex items-center gap-2 rounded-full border border-gold/40 bg-forest-foreground/10 px-3 py-1 text-xs text-forest-foreground">
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? "Pausar música do casal" : "Tocar playlist do casal"}
            className="flex items-center gap-1.5 font-medium hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5 fill-gold text-gold" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-gold text-gold" />
            )}
            <span className="hidden sm:inline">
              {isPlaying ? "Tocando: A Thousand Years" : "Ouvir Música do Casal"}
            </span>
            <span className="sm:hidden">{isPlaying ? "Pausar" : "Música"}</span>
          </button>
          {isPlaying && (
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? "Ativar som" : "Silenciar"}
              className="text-gold/80 hover:text-gold"
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          )}
        </div>
      </header>

      {/* SEÇÃO 1: Convite Principal Digital */}
      <section className="flex w-full items-center justify-center py-0 sm:px-4 sm:py-8 md:py-12">
        <div className="invitation-shadow relative mx-auto w-full max-w-[560px] overflow-hidden bg-paper">
          {/* Imagem principal do convite (768 x 1376) */}
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
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Confirmar presença no casamento"
                className="absolute left-[16.93%] top-[50.22%] h-[3.34%] w-[66.15%] cursor-pointer rounded-[3px] bg-transparent transition-all duration-200 hover:bg-forest/10 hover:ring-1 hover:ring-gold/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.99]"
              >
                <span className="sr-only">Confirmar presença</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[calc(100%-2rem)] border border-gold/40 bg-paper sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-display text-2xl font-semibold text-forest sm:text-3xl">
                  <Sparkles className="h-5 w-5 shrink-0 text-gold" />
                  Confirmar presença
                </DialogTitle>
                <DialogDescription className="font-body text-sm text-muted-foreground">
                  Será uma alegria imensa celebrar este momento especial com você!
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={confirmPresence} className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="guest-name"
                    className="block font-body text-sm font-medium text-forest"
                  >
                    Nome do convidado
                  </label>
                  <input
                    id="guest-name"
                    name="guestName"
                    type="text"
                    value={guestName}
                    onChange={(event) => {
                      setGuestName(event.target.value);
                      setConfirmed(false);
                    }}
                    required
                    autoComplete="name"
                    placeholder="Digite seu nome completo"
                    className="mt-1.5 h-11 w-full rounded-sm border border-gold/40 bg-background px-3.5 font-body text-sm text-forest placeholder:text-muted-foreground/60 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                <button
                  type="submit"
                  className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-gold/30 bg-forest px-4 font-body text-xs font-semibold uppercase tracking-wider text-forest-foreground shadow-sm transition hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:scale-[0.99]"
                >
                  <Check className="h-4 w-4 shrink-0 text-gold" />
                  <span>Confirmar presença</span>
                </button>

                {confirmed && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-sm border border-gold/30 bg-gold-soft/30 p-3 text-center"
                  >
                    <p className="font-body text-sm font-medium text-forest">
                      Presença de {guestName.trim()} confirmada com carinho.
                    </p>
                  </div>
                )}
              </form>
            </DialogContent>
          </Dialog>

          {/* Hotspot interativo: Como chegar */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Como chegar ao local da celebração"
                className="absolute left-[16.80%] top-[54.43%] h-[3.05%] w-[31.38%] cursor-pointer rounded-[3px] bg-transparent transition-all duration-200 hover:bg-forest/10 hover:ring-1 hover:ring-gold/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.99]"
              >
                <span className="sr-only">Como chegar</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[calc(100%-2rem)] border border-gold/40 bg-paper sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-display text-2xl font-semibold text-forest sm:text-3xl">
                  <MapPin className="h-5 w-5 shrink-0 text-gold" />
                  Local da celebração
                </DialogTitle>
                <DialogDescription className="pt-1 font-body text-sm text-muted-foreground">
                  Confira as orientações de rota e trajeto através do Google Maps e Waze.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-3">
                <div className="rounded-sm border border-gold/30 bg-gold-soft/20 p-4 text-center">
                  <p className="font-display text-lg font-medium text-forest">
                    07 de novembro de 2026 às 20:00
                  </p>
                  <p className="mt-1 font-body text-xs text-muted-foreground">
                    Sítio & Espaço Jardim das Acácias • Estrada das Flores, 1500
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href="https://maps.google.com/?q=Estrada+das+Flores+1500"
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
            className="absolute left-[51.43%] top-[54.43%] h-[3.05%] w-[31.77%] cursor-pointer rounded-[3px] bg-transparent transition-all duration-200 hover:bg-forest/10 hover:ring-1 hover:ring-gold/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.99]"
          >
            <span className="sr-only">Adicionar à agenda</span>
          </button>
        </div>
      </section>

      {/* SEÇÃO 2: IMAGENS E TEXTOS - BOAS-VINDAS E HISTÓRIA DE AMOR */}
      <section className="w-full px-4 pb-12 pt-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-paper shadow-2xl ring-1 ring-gold/30">
            {/* Cabeçalho da Seção */}
            <div className="border-b border-gold/20 bg-paper/80 px-6 py-8 text-center sm:px-10">
              <h2 className="font-display text-3xl font-bold tracking-tight text-forest sm:text-4xl">
                Imagens e textos
              </h2>
              <p className="mt-2 font-body text-base text-forest/80 sm:text-lg">
                Use fotos e textos para contar a história de amor de vocês.
              </p>
            </div>

            {/* Conteúdo com Card de Boas-Vindas e Carrossel */}
            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
                {/* Card de Boas-Vindas */}
                <div className="flex flex-col justify-between rounded-xl border border-gold/40 bg-white p-7 shadow-md sm:p-9 lg:col-span-6">
                  <div>
                    {/* Raminho Botânico Dourado */}
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
                        <path
                          d="M45 20C52 14 62 12 70 14"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <circle cx="28" cy="18" r="3.2" fill="#D4AF37" />
                        <circle cx="38" cy="14" r="3.6" fill="#F1C40F" />
                        <circle cx="48" cy="11" r="3.8" fill="#E67E22" />
                        <circle cx="58" cy="10" r="3.4" fill="#F39C12" />
                        <circle cx="68" cy="12" r="3.6" fill="#F1C40F" />
                        <circle cx="78" cy="15" r="3.2" fill="#D4AF37" />
                        <circle cx="90" cy="19" r="3.0" fill="#E67E22" />
                        <circle cx="44" cy="22" r="2.8" fill="#F39C12" />
                        <circle cx="62" cy="23" r="2.6" fill="#F1C40F" />
                      </svg>
                    </div>

                    <h3 className="text-center font-display text-xl font-semibold uppercase tracking-[0.25em] text-forest sm:text-2xl">
                      Boas-vindas
                      <span className="block font-sans text-xs tracking-[0.22em] text-gold sm:text-sm">
                        ao nosso site
                      </span>
                    </h3>

                    <div className="mx-auto my-5 h-px w-16 bg-gold/40" />

                    <div className="space-y-4 text-center font-body text-sm leading-relaxed text-forest/85 sm:text-[0.95rem]">
                      <p>
                        Criamos esse site para compartilhar com vocês os detalhes da organização do
                        nosso casamento. Estamos muito felizes e contamos com a presença de todos no
                        nosso grande dia!
                      </p>
                      <p className="pt-2 text-forest/75">
                        Aqui vocês encontrarão também dicas para hospedagem, salão de beleza,
                        trajes, estacionamento, etc.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-2 pt-2 text-xs font-semibold uppercase tracking-wider text-gold">
                    <Heart className="h-3.5 w-3.5 fill-gold text-gold" />
                    <span>07 de novembro de 2026</span>
                    <Heart className="h-3.5 w-3.5 fill-gold text-gold" />
                  </div>
                </div>

                {/* Carrossel de Fotos */}
                <div className="flex flex-col lg:col-span-6">
                  <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-gold/40 bg-forest/5 shadow-md">
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
                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/70 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <button
                        type="button"
                        onClick={nextPhoto}
                        aria-label="Próxima foto"
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/70 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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

                    <div className="flex items-center justify-center gap-2 bg-white/70 py-3.5">
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

              {/* Dicas para os Convidados */}
              <div className="mt-12 border-t border-gold/30 pt-10">
                <div className="text-center">
                  <span className="font-script text-2xl text-gold">Com carinho</span>
                  <h4 className="font-display text-2xl font-bold tracking-tight text-forest sm:text-3xl">
                    Dicas para os convidados
                  </h4>
                  <p className="mx-auto mt-1 max-w-md font-body text-xs text-forest/75 sm:text-sm">
                    Preparamos algumas sugestões para tornar a sua experiência no nosso grande dia
                    ainda mais agradável.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
                  {guestTips.map((tip) => {
                    const Icon = tip.icon;
                    const isActive = activeTip === tip.id;
                    return (
                      <button
                        key={tip.id}
                        type="button"
                        onClick={() => setActiveTip(tip.id)}
                        className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-body text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                          isActive
                            ? "bg-forest text-forest-foreground shadow-md ring-1 ring-gold/40"
                            : "bg-white text-forest/80 hover:bg-gold-soft/40 hover:text-forest"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tip.title}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-xl border border-gold/30 bg-white p-6 text-center shadow-sm sm:p-8">
                  {(() => {
                    const selected = guestTips.find((tip) => tip.id === activeTip) || guestTips[0];
                    const Icon = selected.icon;
                    return (
                      <div className="mx-auto max-w-xl">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/40 text-forest">
                          <Icon className="h-6 w-6 text-forest" />
                        </div>
                        <h5 className="mt-3 font-display text-xl font-semibold text-forest">
                          {selected.title}
                        </h5>
                        <p className="mt-2 font-body text-sm leading-relaxed text-forest/80 sm:text-base">
                          {selected.description}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: LISTA DE PRESENTES VIRTUAIS & COTAS DE LUA DE MEL COM PIX */}
      <section id="lista-presentes" className="w-full px-4 pb-12 pt-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl bg-paper shadow-2xl ring-1 ring-gold/30">
            {/* Cabeçalho da Lista de Presentes */}
            <div className="border-b border-gold/20 bg-paper/80 px-6 py-8 text-center sm:px-10">
              <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-forest text-gold">
                <Gift className="h-6 w-6" />
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-forest sm:text-4xl">
                Lista de Presentes
              </h2>
              <p className="mx-auto mt-2 max-w-2xl font-body text-sm text-forest/85 sm:text-base">
                Sua presença é o nosso maior presente! Se desejar nos agraciar com uma cota para a
                nossa Lua de Mel ou para o nosso novo lar, escolha uma das opções abaixo com
                pagamento via PIX.
              </p>

              {/* Chave PIX Rápida */}
              <div className="mx-auto mt-5 flex max-w-md flex-col items-center justify-between gap-3 rounded-lg border border-gold/40 bg-white p-3.5 sm:flex-row">
                <div className="text-left">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Chave PIX do Casal (E-mail)
                  </span>
                  <span className="font-mono text-xs font-medium text-forest sm:text-sm">
                    {pixKey}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyPix}
                  className="flex cursor-pointer items-center gap-1.5 rounded-sm bg-forest px-3 py-1.5 font-body text-xs font-semibold text-forest-foreground transition hover:bg-forest/90"
                >
                  {giftPixCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-gold" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar Chave</span>
                    </>
                  )}
                </button>
              </div>

              {/* Filtro por Categoria */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  { id: "todas", label: "Todos os Presentes" },
                  { id: "lua-de-mel", label: "Cotas de Lua de Mel" },
                  { id: "casa", label: "Casa & Cozinha" },
                  { id: "experiencias", label: "Experiências a Dois" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setGiftFilter(tab.id as typeof giftFilter)}
                    className={`cursor-pointer rounded-full px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-wider transition ${
                      giftFilter === tab.id
                        ? "bg-forest text-forest-foreground shadow-sm ring-1 ring-gold/40"
                        : "bg-white text-forest/70 hover:bg-gold-soft/30 hover:text-forest"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Presentes */}
            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGifts.map((gift) => (
                  <div
                    key={gift.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl border border-gold/30 bg-white shadow-sm transition hover:shadow-md"
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

                      <div className="p-4 sm:p-5">
                        <h3 className="font-display text-base font-semibold leading-snug text-forest sm:text-lg">
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
                            }}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-forest py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-forest-foreground transition hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                          >
                            <Gift className="h-4 w-4 text-gold" />
                            <span>Presentear Noivos</span>
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
                                Sua mensagem de carinho foi registrada no coração dos noivos.
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
                                  htmlFor="gift-sender-name"
                                  className="block font-body text-xs font-medium text-forest"
                                >
                                  Seu Nome Completo
                                </label>
                                <input
                                  id="gift-sender-name"
                                  type="text"
                                  required
                                  value={giftSenderName}
                                  onChange={(e) => setGiftSenderName(e.target.value)}
                                  placeholder="Como deseja assinar o presente"
                                  className="mt-1 h-10 w-full rounded-sm border border-gold/40 bg-white px-3 font-body text-sm text-forest placeholder:text-muted-foreground/60 outline-none focus:border-gold"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="gift-message"
                                  className="block font-body text-xs font-medium text-forest"
                                >
                                  Mensagem aos noivos (opcional)
                                </label>
                                <textarea
                                  id="gift-message"
                                  rows={3}
                                  value={giftMessage}
                                  onChange={(e) => setGiftMessage(e.target.value)}
                                  placeholder="Escreva seus votos de felicidade e bênçãos..."
                                  className="mt-1 w-full rounded-sm border border-gold/40 bg-white p-3 font-body text-sm text-forest placeholder:text-muted-foreground/60 outline-none focus:border-gold"
                                />
                              </div>

                              <div className="rounded-lg border border-gold/30 bg-gold-soft/20 p-3 text-center">
                                <p className="font-body text-xs font-semibold uppercase tracking-wider text-forest">
                                  Instruções de Pagamento via PIX
                                </p>
                                <div className="mt-2 flex items-center justify-center gap-2">
                                  <span className="font-mono text-xs text-forest">{pixKey}</span>
                                  <button
                                    type="button"
                                    onClick={copyPix}
                                    className="cursor-pointer rounded bg-forest px-2 py-1 text-[11px] font-semibold text-white hover:bg-forest/90"
                                  >
                                    {giftPixCopied ? "Copiado!" : "Copiar"}
                                  </button>
                                </div>
                                <p className="mt-1 text-[11px] text-muted-foreground">
                                  Titular: João Carlos Marques / Banco do Brasil
                                </p>
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
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: MAPAS E ROTAS (GOOGLE MAPS & WAZE) */}
      <section className="w-full px-4 pb-12 pt-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-paper shadow-2xl ring-1 ring-gold/30">
            <div className="border-b border-gold/20 bg-paper/80 px-6 py-8 text-center sm:px-10">
              <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-forest text-gold">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-forest sm:text-4xl">
                Mapas e rotas
              </h2>
              <p className="mt-2 font-body text-base text-forest/80 sm:text-lg">
                Informe a localização da cerimônia e da festa através do Google Maps ou Waze.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
                {/* Visual do Mapa com Pin */}
                <div className="relative overflow-hidden rounded-xl border border-gold/30 bg-white p-3 shadow-md md:col-span-7">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-emerald-50">
                    {/* Ilustração e Mapa Esquemático do Trajeto */}
                    <svg
                      viewBox="0 0 400 300"
                      className="h-full w-full object-cover"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Fundo do Mapa */}
                      <rect width="400" height="300" fill="#EAE5D9" />
                      {/* Áreas Verdes */}
                      <path d="M0 0H140V110H0Z" fill="#D3DEC9" />
                      <path d="M260 0H400V90H260Z" fill="#D3DEC9" />
                      <path d="M300 200H400V300H300Z" fill="#D3DEC9" />
                      {/* Ruas e Avenidas */}
                      <path d="M-10 60L410 60" stroke="#FFFFFF" strokeWidth="18" />
                      <path d="M-10 180L410 180" stroke="#FFFFFF" strokeWidth="22" />
                      <path d="M120 -10L120 310" stroke="#FFFFFF" strokeWidth="20" />
                      <path d="M280 -10L280 310" stroke="#FFFFFF" strokeWidth="16" />
                      {/* Rota Destacada Rosa/Dourada até a cerimônia */}
                      <path
                        d="M60 40 L120 180 L280 180 L280 140"
                        stroke="#E11D48"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="6 3"
                      />
                      {/* Marcador no Mapa */}
                      <circle cx="280" cy="135" r="14" fill="#E11D48" />
                      <circle cx="280" cy="135" r="5" fill="#FFFFFF" />
                      {/* Tag do Local */}
                      <rect x="200" y="85" width="160" height="30" rx="6" fill="#123D2C" />
                      <text
                        x="280"
                        y="105"
                        fill="#F8F5ED"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        Local da Cerimônia
                      </text>
                    </svg>

                    {/* Selos flutuantes de Google Maps & Waze */}
                    <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gold/30">
                      <MapPin className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gold/30">
                      <Navigation className="h-5 w-5 text-sky-500" />
                    </div>
                  </div>
                </div>

                {/* Detalhes do Endereço e Botões de Rota */}
                <div className="space-y-4 md:col-span-5">
                  <div className="rounded-xl border border-gold/40 bg-white p-5 shadow-sm">
                    <span className="inline-block rounded-full bg-gold-soft/50 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wider text-forest">
                      Cerimônia & Festa
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-forest">
                      Espaço Jardim das Acácias
                    </h3>
                    <p className="mt-1 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      Estrada das Flores, nº 1500 • Bosque Primavera
                    </p>
                    <p className="mt-2 font-body text-xs font-medium text-forest">
                      Horário: 20:00 pontualmente
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <a
                      href="https://maps.google.com/?q=Estrada+das+Flores+1500"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gold/40 bg-white font-body text-xs font-semibold uppercase tracking-wider text-forest shadow-sm transition hover:bg-gold-soft/30 hover:scale-[1.01]"
                    >
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span>Abrir no Google Maps</span>
                    </a>
                    <a
                      href="https://waze.com/ul?q=Estrada+das+Flores+1500"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gold/40 bg-white font-body text-xs font-semibold uppercase tracking-wider text-forest shadow-sm transition hover:bg-gold-soft/30 hover:scale-[1.01]"
                    >
                      <Navigation className="h-4 w-4 text-sky-500" />
                      <span>Traçar Rota no Waze</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: HOMENAGENS ESPECIAIS */}
      <section className="w-full px-4 pb-12 pt-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-paper shadow-2xl ring-1 ring-gold/30">
            <div className="border-b border-gold/20 bg-paper/80 px-6 py-8 text-center sm:px-10">
              <span className="font-script text-2xl text-gold">Gratidão infinita</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-forest sm:text-4xl">
                Homenagens especiais
              </h2>
              <p className="mt-2 font-body text-base text-forest/80 sm:text-lg">
                Crie seções para agradecer e celebrar familiares e amigos queridos.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {tributes.map((tribute) => (
                  <div
                    key={tribute.name}
                    className="flex flex-col items-center rounded-xl border border-gold/30 bg-white p-5 text-center shadow-sm transition hover:shadow-md"
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
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: MÚSICAS E VÍDEOS (PLAYLIST DO CASAL) */}
      <section className="w-full px-4 pb-20 pt-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-paper shadow-2xl ring-1 ring-gold/30">
            <div className="border-b border-gold/20 bg-paper/80 px-6 py-8 text-center sm:px-10">
              <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-forest text-gold">
                <Music className="h-6 w-6" />
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-forest sm:text-4xl">
                Músicas e vídeos
              </h2>
              <p className="mt-2 font-body text-base text-forest/80 sm:text-lg">
                Crie a playlist do casal para tocar durante a navegação no site.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              <div className="mx-auto max-w-lg rounded-2xl border border-gold/40 bg-white p-6 shadow-md sm:p-8">
                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft/50 text-forest">
                      <Heart className="h-5 w-5 fill-forest" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-semibold text-forest sm:text-lg">
                        J&A Love Soundtrack
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Nossa história começa com uma música...
                      </p>
                    </div>
                  </div>
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="my-6 flex items-center justify-between gap-4 rounded-xl border border-gold/20 bg-paper/70 p-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-forest">
                      A Thousand Years
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      Christina Perri (Instrumental)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleMusic}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-forest text-gold shadow-md transition hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 fill-gold" />
                    ) : (
                      <Play className="h-5 w-5 fill-gold" />
                    )}
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-forest/10">
                    <div
                      className={`h-full bg-gold transition-all duration-300 ${isPlaying ? "w-2/3 animate-pulse" : "w-1/4"}`}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{isPlaying ? "01:24" : "00:00"}</span>
                    <span>04:45</span>
                  </div>
                </div>

                <p className="mt-5 text-center font-body text-xs text-forest/70">
                  {isPlaying
                    ? "Tocando suavemente a trilha sonora escolhida pelos noivos."
                    : "Clique no play para ouvir a melodia oficial do casal durante a sua visita."}
                </p>
              </div>
            </div>

            {/* Rodapé Final */}
            <div className="border-t border-gold/20 bg-paper/70 px-6 py-8 text-center">
              <p className="font-script text-2xl text-forest sm:text-3xl">
                Esperamos por você para celebrar o nosso amor!
              </p>
              <p className="mt-2 font-body text-xs tracking-wider text-forest/75 sm:text-sm">
                João Carlos Marques & Ana Paula Fortunato • 07 de novembro de 2026 às 20h
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
