import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import {
  CalendarDays,
  Check,
  MapPin,
  Sparkles,
  Clock,
  MessageSquare,
  Heart,
  Send,
  Trash2,
  Gift,
  Copy,
} from "lucide-react";

import invitationImage from "@/assets/casal-joao-ana.jpg";
import weddingGardenImage from "@/assets/wedding-garden.jpg";
import weddingRingsImage from "@/assets/wedding-rings.jpg";
import { Button } from "@/components/ui/button";
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
      { title: "Casamento de João Carlos & Ana Paula | 07.11.2026" },
      {
        name: "description",
        content:
          "Convite para o casamento de João Carlos Marques e Ana Paula Fortunato, em 7 de novembro de 2026.",
      },
      { property: "og:title", content: "João Carlos Marques & Ana Paula Fortunato" },
      {
        property: "og:description",
        content:
          "Com a bênção de Deus, convidamos você para celebrar conosco em 7 de novembro de 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingInvitation,
});

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: "1",
    name: "Natally",
    message: "Parabéns aos noivos! Felicidades",
    date: "Hoje",
  },
  {
    id: "2",
    name: "Aldemir",
    message: "Felicidades",
    date: "Hoje",
  },
  {
    id: "3",
    name: "Eyshila Gomes",
    message: "Que o Senhor abençoe essa união grandemente! Toda felicidade do mundo para vocês.",
    date: "Ontem",
  },
  {
    id: "4",
    name: "Pedro",
    message: "Casal Lindo, Felicidades!!",
    date: "Ontem",
  },
  {
    id: "5",
    name: "Edu",
    message: "Casal nota mil!! Que alegria ver vocês realizarem este sonho.",
    date: "Há 2 dias",
  },
  {
    id: "6",
    name: "iuiu",
    message: "teste testando",
    date: "Há 3 dias",
  },
];

function WeddingInvitation() {
  // Dedicated RSVP form state
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState("Sim, estarei presente");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const [copiedPix, setCopiedPix] = useState(false);
  const pixKey = "17974000330";

  function handleCopyPix() {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 4000);
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: weddingGardenImage,
      title: "Cenário da Celebração",
      description: "Espaço acolhedor ao ar livre preparado com carinho para receber você.",
      tag: "O Local",
    },
    {
      image: weddingRingsImage,
      title: "Alianças & Compromisso",
      description: "O símbolo eterno do nosso amor e da nossa união.",
      tag: "O Símbolo",
    },
    {
      image: invitationImage,
      title: "Nossa História",
      description: "Cada momento nos trouxe até aqui, para o dia mais feliz de nossas vidas.",
      tag: "Nossa Trajetória",
    },
  ];

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }

  function prevSlide() {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }

  function handleRsvpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rsvpName.trim()) {
      const message = encodeURIComponent(
        `Olá Ana Paula! Aqui está a minha confirmação de presença:\n\n*Nome:* ${rsvpName.trim()}\n*Telefone:* ${rsvpPhone.trim() || "Não informado"}\n*Status:* ${rsvpStatus}\n*Pessoas:* ${rsvpGuests}\n*Mensagem:* ${rsvpMessage.trim() || "Nenhuma mensagem adicional."}`,
      );
      const whatsappUrl = `https://wa.me/5517974000330?text=${message}`;
      window.open(whatsappUrl, "_blank");

      setRsvpSubmitted(true);
      setRsvpName("");
      setRsvpPhone("");
      setRsvpGuests("1");
      setRsvpMessage("");
      setTimeout(() => setRsvpSubmitted(false), 5000);
    }
  }

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Target date: November 7, 2026 16:00:00
  useEffect(() => {
    const targetDate = new Date("2026-11-07T16:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  function confirmPresence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (guestName.trim()) setConfirmed(true);
  }

  function handleAddWish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newWishName.trim() && newWishMessage.trim()) {
      const wish: Wish = {
        id: Date.now().toString(),
        name: newWishName.trim(),
        message: newWishMessage.trim(),
        date: "Agora mesmo",
      };
      setWishes([wish, ...wishes]);
      setNewWishName("");
      setNewWishMessage("");
      setWishSubmitted(true);
      setTimeout(() => setWishSubmitted(false), 4000);
    }
  }

  function addToCalendar() {
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Joao e Ana Paula//Casamento//PT-BR",
      "BEGIN:VEVENT",
      "UID:casamento-joao-ana-20261107@example.com",
      "DTSTAMP:20260924T135300Z",
      "DTSTART:20261107T230000Z",
      "DTEND:20261108T030000Z",
      "SUMMARY:Casamento de João Carlos Marques e Ana Paula Fortunato",
      "DESCRIPTION:Com a bênção de Deus, celebraremos o nosso casamento.",
      "LOCATION:Endereço será informado",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "casamento-joao-carlos-e-ana-paula.ics";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-white py-6 sm:px-6 sm:py-12 relative">
      <div className="mx-auto w-full max-w-[768px] relative z-10">
        {/* Invitation Card */}
        <div className="invitation-shadow relative mx-auto w-full max-h-[650px] overflow-hidden bg-[#FAF8F5]">
          <img
            src={invitationImage}
            alt="Convite do casamento de João Carlos Marques e Ana Paula Fortunato"
            width={726}
            height={1600}
            className="block w-full object-cover object-top"
            style={{ maxHeight: "650px" }}
          />
        </div>

        {/* Nossa História de Amor & Galeria */}
        <section className="mt-8 rounded-xl border border-[#D97757]/30 bg-[#FAF8F5] p-6 shadow-xl sm:p-10">
          <p className="font-serif italic text-lg text-[#D97757] sm:text-xl text-center">
            Nossa trajetória
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[#8C3B24] sm:text-4xl text-center">
            Nossa História de Amor
          </h2>
          <div className="mx-auto mt-1 h-0.5 w-16 bg-[#D97757]" />

          <div className="mt-8 grid gap-8 lg:grid-cols-2 items-stretch">
            {/* Welcome Card */}
            <div className="flex flex-col justify-between rounded-xl border border-[#D97757]/30 bg-white p-6 shadow-md text-center sm:p-8">
              <div>
                <div className="flex items-center justify-center gap-1.5 text-[#D97757] mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-widest text-[#8C3B24] sm:text-2xl">
                  Bem-vindos ao nosso site
                </h3>
                <p className="mt-2 font-sans text-xs font-semibold tracking-wider text-[#D97757]">
                  07.11.2026
                </p>
                <div className="mx-auto my-4 h-px w-12 bg-[#D97757]/30" />
                <p className="font-body text-sm text-[#8C3B24]/90 leading-relaxed">
                  Criamos este espaço com todo carinho para compartilhar com vocês os detalhes da
                  organização do nosso casamento. Estamos imensamente felizes e contamos com a
                  presença de todos no nosso grande dia!
                </p>
                <p className="mt-4 font-body text-xs text-[#8C3B24]/75 leading-relaxed">
                  Aqui você encontrará orientações de local, confirmação de presença, lista de
                  presentes e dicas especiais.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D97757]/20 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D97757]">
                <Heart className="h-3.5 w-3.5 fill-[#D97757] text-[#D97757]" />
                <span>João Carlos & Ana Paula</span>
                <Heart className="h-3.5 w-3.5 fill-[#D97757] text-[#D97757]" />
              </div>
            </div>

            {/* Slider Card */}
            <div className="relative overflow-hidden rounded-xl border border-[#D97757]/30 bg-[#FAF8F5] shadow-md flex flex-col">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black/10">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="h-full w-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <span className="absolute top-4 left-4 rounded-full bg-[#8C3B24] px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-[#FAF8F5] border border-[#D97757]">
                  {slides[currentSlide].tag}
                </span>

                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#8C3B24] shadow hover:bg-white transition-all font-bold text-lg"
                  aria-label="Slide anterior"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#8C3B24] shadow hover:bg-white transition-all font-bold text-lg"
                  aria-label="Próximo slide"
                >
                  ›
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-display text-xl font-bold text-[#FDE0D9]">
                    {slides[currentSlide].title}
                  </h4>
                  <p className="mt-1 font-body text-xs text-white/90">
                    {slides[currentSlide].description}
                  </p>
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 bg-white py-3 border-t border-[#D97757]/20">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSlide ? "w-6 bg-[#8C3B24]" : "w-2 bg-[#D97757]/40"
                    }`}
                    aria-label={`Ir para slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cronômetro / Contagem Regressiva */}
        <section className="mt-8 rounded-xl border border-[#D97757]/40 bg-[#8C3B24] p-6 text-center shadow-xl sm:p-8">
          <div className="flex items-center justify-center gap-2 text-[#FDE0D9]">
            <Clock className="h-5 w-5 animate-pulse" />
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-[#FAF8F5] sm:text-3xl">
              Contagem Regressiva para o Grande Dia
            </h2>
            <Clock className="h-5 w-5 animate-pulse" />
          </div>
          <p className="mt-1 font-body text-sm text-[#F3E8E2]/80">
            07 de Novembro de 2026 • Faltam apenas:
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-lg border border-[#D97757]/40 bg-[#78301C] p-4 shadow-inner">
              <div className="font-display text-3xl font-bold text-[#FDE0D9] sm:text-4xl">
                {timeLeft.days}
              </div>
              <div className="mt-1 font-sans text-xs font-medium uppercase tracking-widest text-[#FAF8F5]/80">
                Dias
              </div>
            </div>
            <div className="rounded-lg border border-[#D97757]/40 bg-[#78301C] p-4 shadow-inner">
              <div className="font-display text-3xl font-bold text-[#FDE0D9] sm:text-4xl">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="mt-1 font-sans text-xs font-medium uppercase tracking-widest text-[#FAF8F5]/80">
                Horas
              </div>
            </div>
            <div className="rounded-lg border border-[#D97757]/40 bg-[#78301C] p-4 shadow-inner">
              <div className="font-display text-3xl font-bold text-[#FDE0D9] sm:text-4xl">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="mt-1 font-sans text-xs font-medium uppercase tracking-widest text-[#FAF8F5]/80">
                Minutos
              </div>
            </div>
            <div className="rounded-lg border border-[#D97757]/40 bg-[#78301C] p-4 shadow-inner">
              <div className="font-display text-3xl font-bold text-[#FDE0D9] sm:text-4xl">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="mt-1 font-sans text-xs font-medium uppercase tracking-widest text-[#FAF8F5]/80">
                Segundos
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated RSVP Section (Matching User Image) */}
        <section className="mt-8 rounded-xl border border-[#D97757]/30 bg-[#FAF8F5] p-6 text-center shadow-xl sm:p-10">
          <p className="font-serif italic text-lg text-[#D97757] sm:text-xl">
            Sua presença é essencial
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[#8C3B24] sm:text-4xl">
            Confirmação de Presença (RSVP)
          </h2>
          <p className="mt-2 font-body text-xs text-[#8C3B24]/70 sm:text-sm">
            Por favor, confirme sua presença até o dia 10 de outubro de 2026.
          </p>

          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-[#D97757]/30 bg-white p-6 text-left shadow-md sm:p-8">
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C3B24]">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="mt-1.5 h-11 w-full rounded border border-[#D97757]/40 bg-[#FAF8F5] px-3 text-sm text-[#8C3B24] outline-none focus:border-[#8C3B24] focus:ring-2 focus:ring-[#8C3B24]/20"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8C3B24]">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="mt-1.5 h-11 w-full rounded border border-[#D97757]/40 bg-[#FAF8F5] px-3 text-sm text-[#8C3B24] outline-none focus:border-[#8C3B24] focus:ring-2 focus:ring-[#8C3B24]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8C3B24]">
                    Confirmação *
                  </label>
                  <select
                    value={rsvpStatus}
                    onChange={(e) => setRsvpStatus(e.target.value)}
                    className="mt-1.5 h-11 w-full rounded border border-[#D97757]/40 bg-[#FAF8F5] px-3 text-sm text-[#8C3B24] outline-none focus:border-[#8C3B24] focus:ring-2 focus:ring-[#8C3B24]/20"
                  >
                    <option value="Sim, estarei presente">Sim, estarei presente</option>
                    <option value="Não poderei comparecer">Não poderei comparecer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C3B24]">
                  Número de Pessoas Confirmadas
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rsvpGuests}
                  onChange={(e) => setRsvpGuests(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded border border-[#D97757]/40 bg-[#FAF8F5] px-3 text-sm text-[#8C3B24] outline-none focus:border-[#8C3B24] focus:ring-2 focus:ring-[#8C3B24]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C3B24]">
                  Mensagem para os Noivos
                </label>
                <textarea
                  rows={3}
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  placeholder="Deixe seus votos de felicidade..."
                  className="mt-1.5 w-full rounded border border-[#D97757]/40 bg-[#FAF8F5] p-3 text-sm text-[#8C3B24] outline-none focus:border-[#8C3B24] focus:ring-2 focus:ring-[#8C3B24]/20"
                />
              </div>

              <button
                type="submit"
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded bg-[#8C3B24] font-sans text-xs font-bold uppercase tracking-widest text-[#FAF8F5] shadow-md transition-all hover:bg-[#78301C] active:scale-[0.99]"
              >
                <Send className="h-4 w-4 text-[#FDE0D9]" /> Enviar Confirmação
              </button>

              {rsvpSubmitted && (
                <div className="rounded border border-[#D97757]/40 bg-[#8C3B24]/10 p-3 text-center">
                  <p className="font-sans text-sm font-semibold text-[#8C3B24]">
                    ✨ Confirmação enviada com sucesso! Muito obrigado pelo carinho.
                  </p>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Lista de Presentes */}
        <section className="mt-8 rounded-xl border border-[#D97757]/30 bg-[#FAF8F5] p-6 text-center shadow-xl sm:p-10">
          <p className="font-serif italic text-lg text-[#D97757] sm:text-xl">Com carinho</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[#8C3B24] sm:text-4xl">
            Lista de Presentes
          </h2>
          <div className="mx-auto mt-1 h-0.5 w-16 bg-[#D97757]" />

          <p className="mt-4 font-body text-sm text-[#8C3B24]/90 sm:text-base leading-relaxed max-w-xl mx-auto">
            Sua presença é o nosso maior presente! Se desejar nos agraciar com uma cota para a nossa
            Lua de Mel ou para o nosso novo lar, escolha uma das opções abaixo com pagamento via
            PIX.
          </p>

          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-[#D97757]/30 bg-white p-6 shadow-md text-left space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-[#D97757]/20 bg-[#FAF8F5] p-4">
              <div>
                <span className="block font-sans text-xs font-bold uppercase tracking-widest text-[#D97757]">
                  Chave PIX (CPF)
                </span>
                <span className="font-mono text-lg font-bold text-[#8C3B24]">17974000330</span>
              </div>
              <button
                type="button"
                onClick={handleCopyPix}
                className="flex h-11 items-center justify-center gap-2 rounded bg-[#8C3B24] px-5 font-sans text-xs font-bold uppercase tracking-wider text-[#FAF8F5] shadow transition-all hover:bg-[#78301C] active:scale-95 whitespace-nowrap"
              >
                {copiedPix ? (
                  <>
                    <Check className="h-4 w-4 text-[#FDE0D9]" /> PIX Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[#FDE0D9]" /> Copiar Chave PIX
                  </>
                )}
              </button>
            </div>

            <div className="pt-2">
              <a
                href="https://www.magazinevoce.com.br/magazinerenatonardin"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded bg-[#8C3B24] font-sans text-xs font-bold uppercase tracking-widest text-[#FAF8F5] shadow-md transition-all hover:bg-[#78301C] active:scale-[0.99]"
              >
                <Gift className="h-4 w-4 text-[#FDE0D9]" /> Acessar Lista de Presentes (Magazine
                Luiza)
              </a>
            </div>
          </div>
        </section>

        {/* Local da Celebração */}
        <section className="mt-8 rounded-xl border border-[#D97757]/30 bg-[#FAF8F5] p-6 shadow-xl sm:p-10">
          <p className="font-serif italic text-lg text-[#D97757] sm:text-xl text-center">
            O grande dia
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[#8C3B24] sm:text-4xl text-center">
            Local da Celebração
          </h2>
          <div className="mx-auto mt-1 h-0.5 w-16 bg-[#D97757]" />

          <div className="mt-8 grid gap-8 lg:grid-cols-2 items-center">
            {/* Map Illustration / Container */}
            <div className="relative overflow-hidden rounded-xl border border-[#D97757]/30 bg-[#F3E8E2]/30 p-4 shadow-inner">
              <div className="relative h-64 w-full rounded-lg bg-[#FAF6F2] flex items-center justify-center overflow-hidden border border-[#D97757]/20">
                {/* Simulated Map Background Grid */}
                <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#e7d5ce_1px,transparent_1px),linear-gradient(to_bottom,#e7d5ce_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Route Line & Pin */}
                <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 60 100 Q 120 180, 240 180 L 290 180"
                    fill="none"
                    stroke="#D97757"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="60" cy="100" r="6" fill="#D97757" />
                  <circle cx="290" cy="180" r="8" fill="#D97757" />
                  <circle
                    cx="290"
                    cy="180"
                    r="14"
                    fill="#D97757"
                    fillOpacity="0.3"
                    className="animate-ping"
                  />
                </svg>

                {/* Location Badge */}
                <div className="absolute z-10 rounded-full bg-[#8C3B24] px-4 py-1.5 shadow-lg border border-[#D97757]">
                  <span className="font-display text-xs font-semibold text-[#FAF8F5] whitespace-nowrap">
                    Espaço Jardim das Acácias
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 rounded bg-white/90 p-2 shadow">
                  <MapPin className="h-5 w-5 text-[#D97757]" />
                </div>

                <div className="absolute top-3 right-3 rounded-full bg-white p-2 shadow">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8C3B24]"
                  >
                    <Sparkles className="h-4 w-4 text-[#D97757]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Info Card & Buttons */}
            <div className="space-y-6">
              <div className="rounded-xl border border-[#D97757]/40 bg-[#8C3B24] p-6 text-[#FAF8F5] shadow-md">
                <span className="inline-block rounded-full bg-[#D97757]/20 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-[#FDE0D9] border border-[#D97757]/40">
                  Cerimônia e Recepção
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-[#FAF8F5]">
                  Espaço Jardim das Acácias
                </h3>
                <p className="mt-2 font-body text-sm text-[#F3E8E2]/95 leading-relaxed">
                  Estrada das Flores, nº 1500 • Bosque Primavera, São Paulo - SP
                </p>
                <div className="mt-4 pt-4 border-t border-[#D97757]/30 font-sans text-xs font-medium text-[#FDE0D9]">
                  07 de novembro de 2026 às 20:00
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://maps.google.com/?q=Espaço+Jardim+das+Acácias+Estrada+das+Flores+1500+São+Paulo"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded border border-[#D97757]/50 bg-white font-sans text-xs font-bold uppercase tracking-wider text-[#8C3B24] shadow-sm transition-all hover:bg-[#FAF8F5] hover:border-[#8C3B24]"
                >
                  <MapPin className="h-4 w-4 text-[#D97757]" /> Google Maps
                </a>
                <a
                  href="https://waze.com/ul?q=Estrada+das+Flores+1500+Sao+Paulo"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded border border-[#D97757]/50 bg-white font-sans text-xs font-bold uppercase tracking-wider text-[#8C3B24] shadow-sm transition-all hover:bg-[#FAF8F5] hover:border-[#8C3B24]"
                >
                  <Send className="h-4 w-4 text-[#D97757]" /> Waze
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Footer */}
        <footer className="mt-12 rounded-xl border border-[#D97757]/30 bg-[#8C3B24] p-8 text-center text-[#FAF8F5] shadow-xl">
          <p className="font-serif italic text-lg text-[#FDE0D9] sm:text-xl">
            Esperamos por você para celebrar o nosso amor!
          </p>
          <div className="mt-4 font-display text-2xl font-bold tracking-wide text-[#FAF8F5] sm:text-3xl">
            João Carlos & Ana Paula
          </div>
          <div className="mt-6 border-t border-[#D97757]/20 pt-6 text-xs text-[#F3E8E2]/70">
            <p>© 2026 Casamento de João Carlos & Ana Paula • Todos os direitos reservados</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
