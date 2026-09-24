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
} from "lucide-react";

import invitationImage from "@/assets/casal-joao-ana.jpg";
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
  const [guestName, setGuestName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Dedicated RSVP form state
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState("Sim, estarei presente");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  function handleRsvpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rsvpName.trim()) {
      const wish: Wish = {
        id: Date.now().toString(),
        name: rsvpName.trim() + " (RSVP)",
        message:
          rsvpMessage.trim() ||
          (rsvpStatus === "Sim, estarei presente"
            ? "Estarei presente no grande dia!"
            : "Não poderei comparecer, mas desejo muitas felicidades."),
        date: "Agora mesmo",
      };
      setWishes([wish, ...wishes]);
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

  // Wishes wall state
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wedding_wishes");
      if (saved) {
        try {
          setWishes(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wedding_wishes", JSON.stringify(wishes));
    }
  }, [wishes]);

  const [newWishName, setNewWishName] = useState("");
  const [newWishMessage, setNewWishMessage] = useState("");
  const [wishSubmitted, setWishSubmitted] = useState(false);

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
    <main className="min-h-screen bg-[#1E382B] py-6 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-[768px]">
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

        {/* Cronômetro / Contagem Regressiva */}
        <section className="mt-8 rounded-xl border border-[#C5A059]/30 bg-[#173827] p-6 text-center shadow-xl sm:p-8">
          <div className="flex items-center justify-center gap-2 text-[#f3d375]">
            <Clock className="h-5 w-5 animate-pulse" />
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-[#faf7f0] sm:text-3xl">
              Contagem Regressiva para o Grande Dia
            </h2>
            <Clock className="h-5 w-5 animate-pulse" />
          </div>
          <p className="mt-1 font-body text-sm text-[#E8DFC8]/80">
            07 de Novembro de 2026 • Faltam apenas:
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-lg border border-[#C5A059]/40 bg-[#122c1e] p-4 shadow-inner">
              <div className="font-display text-3xl font-bold text-[#f3d375] sm:text-4xl">
                {timeLeft.days}
              </div>
              <div className="mt-1 font-sans text-xs font-medium uppercase tracking-widest text-[#faf7f0]/80">
                Dias
              </div>
            </div>
            <div className="rounded-lg border border-[#C5A059]/40 bg-[#122c1e] p-4 shadow-inner">
              <div className="font-display text-3xl font-bold text-[#f3d375] sm:text-4xl">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="mt-1 font-sans text-xs font-medium uppercase tracking-widest text-[#faf7f0]/80">
                Horas
              </div>
            </div>
            <div className="rounded-lg border border-[#C5A059]/40 bg-[#122c1e] p-4 shadow-inner">
              <div className="font-display text-3xl font-bold text-[#f3d375] sm:text-4xl">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="mt-1 font-sans text-xs font-medium uppercase tracking-widest text-[#faf7f0]/80">
                Minutos
              </div>
            </div>
            <div className="rounded-lg border border-[#C5A059]/40 bg-[#122c1e] p-4 shadow-inner">
              <div className="font-display text-3xl font-bold text-[#f3d375] sm:text-4xl">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="mt-1 font-sans text-xs font-medium uppercase tracking-widest text-[#faf7f0]/80">
                Segundos
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated RSVP Section (Matching User Image) */}
        <section className="mt-8 rounded-xl border border-[#C5A059]/30 bg-[#FAF8F5] p-6 text-center shadow-xl sm:p-10">
          <p className="font-serif italic text-lg text-[#C5A059] sm:text-xl">
            Sua presença é essencial
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[#1E382B] sm:text-4xl">
            Confirmação de Presença (RSVP)
          </h2>
          <p className="mt-2 font-body text-xs text-[#6A7E73] sm:text-sm">
            Por favor, confirme sua presença até o dia 10 de outubro de 2026.
          </p>

          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-[#C5A059]/30 bg-white p-6 text-left shadow-md sm:p-8">
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1E382B]">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="mt-1.5 h-11 w-full rounded border border-[#C5A059]/40 bg-[#FAF8F5] px-3 text-sm text-[#1E382B] outline-none focus:border-[#1E382B] focus:ring-2 focus:ring-[#1E382B]/20"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E382B]">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="mt-1.5 h-11 w-full rounded border border-[#C5A059]/40 bg-[#FAF8F5] px-3 text-sm text-[#1E382B] outline-none focus:border-[#1E382B] focus:ring-2 focus:ring-[#1E382B]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E382B]">
                    Confirmação *
                  </label>
                  <select
                    value={rsvpStatus}
                    onChange={(e) => setRsvpStatus(e.target.value)}
                    className="mt-1.5 h-11 w-full rounded border border-[#C5A059]/40 bg-[#FAF8F5] px-3 text-sm text-[#1E382B] outline-none focus:border-[#1E382B] focus:ring-2 focus:ring-[#1E382B]/20"
                  >
                    <option value="Sim, estarei presente">Sim, estarei presente</option>
                    <option value="Não poderei comparecer">Não poderei comparecer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1E382B]">
                  Número de Pessoas Confirmadas
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rsvpGuests}
                  onChange={(e) => setRsvpGuests(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded border border-[#C5A059]/40 bg-[#FAF8F5] px-3 text-sm text-[#1E382B] outline-none focus:border-[#1E382B] focus:ring-2 focus:ring-[#1E382B]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1E382B]">
                  Mensagem para os Noivos
                </label>
                <textarea
                  rows={3}
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  placeholder="Deixe seus votos de felicidade..."
                  className="mt-1.5 w-full rounded border border-[#C5A059]/40 bg-[#FAF8F5] p-3 text-sm text-[#1E382B] outline-none focus:border-[#1E382B] focus:ring-2 focus:ring-[#1E382B]/20"
                />
              </div>

              <button
                type="submit"
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded bg-[#173827] font-sans text-xs font-bold uppercase tracking-widest text-[#faf7f0] shadow-md transition-all hover:bg-[#224d35] active:scale-[0.99]"
              >
                <Send className="h-4 w-4 text-[#f3d375]" /> Enviar Confirmação
              </button>

              {rsvpSubmitted && (
                <div className="rounded border border-[#C5A059]/40 bg-[#173827]/10 p-3 text-center">
                  <p className="font-sans text-sm font-semibold text-[#173827]">
                    ✨ Confirmação enviada com sucesso! Muito obrigado pelo carinho.
                  </p>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Mural de Recados / Mensagens dos Convidados */}
        <section className="mt-8 rounded-xl border border-[#C5A059]/30 bg-[#FAF8F5] p-6 shadow-xl sm:p-8">
          <div className="flex items-center gap-3 border-b border-[#C5A059]/20 pb-4">
            <MessageSquare className="h-6 w-6 text-[#1E382B]" />
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1E382B] sm:text-3xl">
                Mural de Recados aos Noivos
              </h2>
              <p className="font-body text-xs text-[#6A7E73] sm:text-sm">
                Deixe sua mensagem de carinho para João Carlos e Ana Paula
              </p>
            </div>
          </div>

          {/* Form to leave a message */}
          <form onSubmit={handleAddWish} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="wish-name"
                  className="block text-xs font-bold uppercase tracking-wider text-[#1E382B]"
                >
                  Seu Nome
                </label>
                <input
                  id="wish-name"
                  value={newWishName}
                  onChange={(e) => setNewWishName(e.target.value)}
                  placeholder="Ex: Maria Silva"
                  required
                  className="mt-1.5 h-11 w-full rounded border border-[#C5A059]/40 bg-white px-3 text-sm text-[#1E382B] outline-none focus:border-[#1E382B] focus:ring-2 focus:ring-[#1E382B]/20"
                />
              </div>
              <div>
                <label
                  htmlFor="wish-msg"
                  className="block text-xs font-bold uppercase tracking-wider text-[#1E382B]"
                >
                  Sua Mensagem
                </label>
                <input
                  id="wish-msg"
                  value={newWishMessage}
                  onChange={(e) => setNewWishMessage(e.target.value)}
                  placeholder="Ex: Muitas felicidades ao casal!"
                  required
                  className="mt-1.5 h-11 w-full rounded border border-[#C5A059]/40 bg-white px-3 text-sm text-[#1E382B] outline-none focus:border-[#1E382B] focus:ring-2 focus:ring-[#1E382B]/20"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded bg-[#1E382B] px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-[#FAF8F5] transition-all hover:bg-[#2c523e] active:scale-95"
              >
                <Send className="h-3.5 w-3.5" /> Enviar Recado
              </button>
              {wishSubmitted && (
                <span className="text-xs font-semibold text-emerald-700 animate-fade-in">
                  ✓ Recado enviado com sucesso!
                </span>
              )}
            </div>
          </form>

          {/* Messages List */}
          <div className="mt-8 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#6A7E73]">
              Mensagens Recebidas ({wishes.length})
            </h3>
            <div className="max-h-[500px] space-y-3 overflow-y-auto pr-1">
              {wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="relative flex items-start gap-3 rounded-lg border border-[#C5A059]/25 bg-white p-4 shadow-sm transition-all hover:border-[#C5A059]/60"
                >
                  <div className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-[#1E382B]" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-lg font-semibold text-[#1E382B]">
                        {wish.name}
                      </h4>
                      <span className="text-[10px] text-[#6A7E73]">{wish.date}</span>
                    </div>
                    <p className="mt-1 font-body text-sm text-[#1E382B]/90 break-words">
                      {wish.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-[#E8DFC8]/60">
          <p>© 2026 Casamento de João Carlos & Ana Paula • Todos os direitos reservados</p>
        </div>
      </div>
    </main>
  );
}
