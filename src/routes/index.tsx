import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, MapPin, Sparkles } from "lucide-react";

import invitationImage from "@/assets/convite-final.jpg";
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
          "Convite de casamento de João Carlos Marques e Ana Paula Fortunato, realizado em 7 de novembro de 2026 às 20h.",
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
          "Convite de casamento de João Carlos Marques e Ana Paula Fortunato, realizado em 7 de novembro de 2026 às 20h.",
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

function WeddingInvitation() {
  const [guestName, setGuestName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

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

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-forest py-0 sm:px-4 sm:py-8 md:py-12">
      {/* Moldura física do convite centralizada */}
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

        {/* Camada interativa: Confirmar presença */}
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

        {/* Camada interativa: Como chegar */}
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
                O endereço será informado em breve. Guarde a data — esperamos você!
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 rounded-sm border border-gold/30 bg-gold-soft/20 p-4 text-center">
              <p className="font-display text-lg font-medium text-forest">
                07 de novembro de 2026 às 20:00
              </p>
              <p className="mt-1 font-body text-xs text-muted-foreground">
                O endereço e as orientações de trajeto serão disponibilizados em breve para todos os
                convidados.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Camada interativa: Adicionar à agenda */}
        <button
          type="button"
          aria-label="Adicionar casamento à agenda"
          onClick={addToCalendar}
          className="absolute left-[51.43%] top-[54.43%] h-[3.05%] w-[31.77%] cursor-pointer rounded-[3px] bg-transparent transition-all duration-200 hover:bg-forest/10 hover:ring-1 hover:ring-gold/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.99]"
        >
          <span className="sr-only">Adicionar à agenda</span>
        </button>
      </div>
    </main>
  );
}
