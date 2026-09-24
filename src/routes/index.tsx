import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CalendarDays, Check, Clock3, Heart, Mail, MapPin, Sprout } from "lucide-react";

import gardenImage from "@/assets/wedding-garden.jpg";
import ringsImage from "@/assets/wedding-rings.jpg";
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
      { property: "og:title", content: "João Carlos & Ana Paula — Nosso casamento" },
      { property: "og:description", content: "Com a bênção de Deus, convidamos você para celebrar conosco em 7 de novembro de 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingInvitation,
});

function WeddingInvitation() {
  const [confirmedName, setConfirmedName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function confirmPresence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (confirmedName.trim()) setSubmitted(true);
  }

  function addToCalendar() {
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Joao e Ana Paula//Casamento//PT-BR",
      "BEGIN:VEVENT",
      "UID:casamento-joao-ana-20261107@example.com",
      "DTSTAMP:20260924T134800Z",
      "DTSTART:20261107T230000Z",
      "DTEND:20261108T030000Z",
      "SUMMARY:Casamento de João Carlos e Ana Paula",
      "DESCRIPTION:Com a bênção de Deus, celebraremos o nosso casamento.",
      "LOCATION:Endereço será informado",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "casamento-joao-e-ana-paula.ics";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-forest py-0 sm:px-6 sm:py-10">
      <article className="invitation-shadow mx-auto max-w-3xl overflow-hidden bg-paper">
        <header className="relative min-h-[760px] overflow-hidden sm:min-h-[820px]">
          <img src={gardenImage} alt="Rosas brancas e folhagens em um jardim iluminado" width={1200} height={1504} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/35" />
          <div className="relative z-10 flex min-h-[760px] flex-col items-center justify-between px-6 py-10 text-center sm:min-h-[820px] sm:px-16 sm:py-14">
            <div className="reveal-up">
              <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-forest sm:text-xs">Nosso casamento</p>
              <Heart className="mx-auto mt-4 size-5 stroke-gold" strokeWidth={1.5} />
            </div>

            <div className="reveal-up max-w-2xl [animation-delay:150ms]">
              <p className="mb-4 font-script text-3xl text-gold sm:text-4xl">Juntos para sempre</p>
              <h1 className="font-display text-5xl font-semibold leading-[0.88] text-forest sm:text-7xl">
                João Carlos
                <span className="my-2 block font-script text-5xl font-normal text-gold sm:text-6xl">&amp;</span>
                Ana Paula
              </h1>
              <p className="mt-4 font-display text-2xl text-foreground sm:text-3xl">Marques &amp; Fortunato</p>
              <div className="mx-auto my-6 h-px w-20 bg-gold" />
              <p className="mx-auto max-w-md font-display text-xl leading-relaxed text-foreground sm:text-2xl">
                Com a bênção de Deus, convidamos você para celebrar conosco o nosso casamento.
              </p>
            </div>

            <div className="grid w-full max-w-xl grid-cols-3 divide-x divide-gold/40 bg-paper/85 px-2 py-5 backdrop-blur-sm sm:px-5">
              <Detail icon={CalendarDays} label="Data" value={<>07 nov<br />2026</>} />
              <Detail icon={Clock3} label="Horário" value="20:00" />
              <Detail icon={MapPin} label="Local" value={<>Em breve</>} />
            </div>
          </div>
        </header>

        <section className="paper-texture px-5 py-12 text-center sm:px-14 sm:py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-gold">Um dia para guardar no coração</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-forest sm:text-5xl">Confirme sua presença</h2>
          <p className="mx-auto mt-3 max-w-md font-display text-lg text-muted-foreground">Será uma alegria viver esse momento ao seu lado.</p>

          <form onSubmit={confirmPresence} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="guest-name">Seu nome</label>
            <input id="guest-name" value={confirmedName} onChange={(event) => { setConfirmedName(event.target.value); setSubmitted(false); }} required placeholder="Digite seu nome" className="h-12 min-w-0 flex-1 border border-input bg-background/70 px-4 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" />
            <Button type="submit" size="lg" className="h-12 bg-forest px-6 text-forest-foreground hover:bg-forest/90">
              <Check /> Confirmar
            </Button>
          </form>
          {submitted && <p role="status" className="mt-4 text-sm font-medium text-primary">Presença de {confirmedName.trim()} confirmada com carinho.</p>}

          <div className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-11 border-gold/60 bg-transparent text-forest"><MapPin /> Como chegar</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[calc(100%-2rem)] border-gold/40 bg-paper sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl text-forest">Local da celebração</DialogTitle>
                  <DialogDescription className="pt-2 font-body leading-relaxed">O endereço será informado em breve. Guarde a data — esperamos você!</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button type="button" variant="outline" onClick={addToCalendar} className="h-11 border-gold/60 bg-transparent text-forest"><CalendarDays /> Agenda</Button>
          </div>
        </section>

        <section className="bg-forest px-7 py-14 text-center text-forest-foreground sm:px-16">
          <Heart className="mx-auto mb-5 size-6 stroke-gold-soft" strokeWidth={1.5} />
          <blockquote className="font-display text-3xl italic leading-snug sm:text-4xl">“As muitas águas não podem apagar este amor.”</blockquote>
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-soft">Cantares 8:7</p>
        </section>

        <section className="paper-texture grid gap-10 px-6 py-14 sm:grid-cols-[1.1fr_0.9fr] sm:px-14 sm:py-20">
          <div>
            <p className="font-script text-3xl text-gold">Até aqui nos ajudou o Senhor</p>
            <h2 className="mt-2 font-display text-5xl font-semibold text-forest">Nossa história</h2>
            <div className="my-5 h-px w-16 bg-gold" />
            <p className="font-display text-xl leading-relaxed text-foreground">
              Deus nos uniu em um propósito maior. Entre risos, desafios e muitas orações, construímos uma história de amor baseada na fé, no respeito e na cumplicidade. Agora, damos mais um passo, confiantes de que o melhor ainda está por vir.
            </p>
          </div>
          <figure className="self-center overflow-hidden border border-gold/30 bg-card p-2">
            <img src={ringsImage} alt="Alianças douradas entre rosas brancas" loading="lazy" width={1200} height={800} className="aspect-[4/3] w-full object-cover" />
          </figure>
        </section>

        <section className="border-t border-gold/25 bg-card px-6 py-12 sm:px-14">
          <div className="mx-auto grid max-w-2xl gap-6 text-center sm:grid-cols-[auto_1fr] sm:text-left">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-gold-soft text-gold sm:mx-0"><Mail className="size-8" strokeWidth={1.5} /></div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-forest">Mensagem aos nossos convidados</h2>
              <p className="mt-2 font-display text-lg leading-relaxed text-muted-foreground">Sua presença tornará este momento ainda mais especial. Queremos compartilhar essa alegria com as pessoas que fazem parte da nossa história, sob a graça e o amor de Deus.</p>
            </div>
          </div>
        </section>

        <footer className="bg-forest px-6 py-9 text-center text-forest-foreground">
          <div className="flex items-center justify-center gap-4 text-gold-soft"><Heart className="size-5" /><span className="h-px w-12 bg-gold/50" /><Sprout className="size-5" /></div>
          <p className="mt-4 font-display text-xl">Amor que vem de Deus · Vida a dois · Sempre com propósito</p>
          <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-gold-soft">João Carlos &amp; Ana Paula · 07.11.2026</p>
        </footer>
      </article>
    </main>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col items-center px-1 sm:px-4">
      <Icon className="mb-2 size-5 stroke-gold" strokeWidth={1.5} />
      <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-[9px]">{label}</span>
      <span className="mt-1 font-display text-lg font-semibold leading-tight text-forest sm:text-xl">{value}</span>
    </div>
  );
}
