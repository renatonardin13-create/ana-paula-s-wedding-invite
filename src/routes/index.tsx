import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CalendarDays, Check, MapPin } from "lucide-react";

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
      { name: "description", content: "Convite para o casamento de João Carlos Marques e Ana Paula Fortunato, em 7 de novembro de 2026." },
      { property: "og:title", content: "João Carlos Marques & Ana Paula Fortunato" },
      { property: "og:description", content: "Com a bênção de Deus, convidamos você para celebrar conosco em 7 de novembro de 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingInvitation,
});

function WeddingInvitation() {
  const [guestName, setGuestName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  function confirmPresence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (guestName.trim()) setConfirmed(true);
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
    <main className="min-h-screen bg-forest sm:px-6 sm:py-8">
      <div className="invitation-shadow relative mx-auto w-full max-w-[768px] overflow-hidden bg-paper">
        <img
          src={invitationImage}
          alt="Convite do casamento de João Carlos Marques e Ana Paula Fortunato"
          width={726}
          height={1600}
          className="block h-auto w-full"
        />

        <div className="absolute left-[28%] top-[32.25%] flex h-[4.25%] w-[62%] items-center bg-paper pl-[1%]">
          <span className="whitespace-nowrap font-display text-[clamp(1.55rem,7vw,3.25rem)] font-semibold leading-none text-forest">Ana Paula Fortunato</span>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button aria-label="Confirmar presença" variant="ghost" className="absolute left-[16.8%] top-[49.05%] h-[3.55%] w-[66.4%] bg-transparent opacity-0" />
          </DialogTrigger>
          <DialogContent className="max-w-[calc(100%-2rem)] border-gold/40 bg-paper sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-3xl text-forest">Confirmar presença</DialogTitle>
              <DialogDescription className="font-body">Será uma alegria celebrar este momento com você.</DialogDescription>
            </DialogHeader>
            <form onSubmit={confirmPresence} className="mt-3 space-y-4">
              <label htmlFor="guest-name" className="text-sm font-medium text-foreground">Nome do convidado</label>
              <input
                id="guest-name"
                value={guestName}
                onChange={(event) => { setGuestName(event.target.value); setConfirmed(false); }}
                required
                placeholder="Digite seu nome"
                className="mt-2 h-12 w-full border border-input bg-background px-4 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
              <Button type="submit" className="h-12 w-full bg-forest text-forest-foreground hover:bg-forest/90"><Check /> Confirmar presença</Button>
              {confirmed && <p role="status" className="text-center text-sm font-medium text-primary">Presença de {guestName.trim()} confirmada com carinho.</p>}
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button aria-label="Como chegar" variant="ghost" className="absolute left-[16.8%] top-[53.35%] h-[3.2%] w-[31.8%] bg-transparent opacity-0" />
          </DialogTrigger>
          <DialogContent className="max-w-[calc(100%-2rem)] border-gold/40 bg-paper sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-3xl text-forest"><MapPin className="text-gold" /> Local da celebração</DialogTitle>
              <DialogDescription className="pt-2 font-body leading-relaxed">O endereço será informado em breve. Guarde a data — esperamos você!</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button
          type="button"
          aria-label="Adicionar à agenda"
          variant="ghost"
          onClick={addToCalendar}
          className="absolute left-[51.4%] top-[53.35%] h-[3.2%] w-[31.8%] bg-transparent opacity-0"
        ><CalendarDays /></Button>
      </div>
    </main>
  );
}