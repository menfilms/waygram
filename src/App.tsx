import type { ReactNode } from "react";

const APP_URL = "/server/index.html";

function ChatIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 20l1.1-4.2A8.4 8.4 0 1 1 21 11.5z" />
    </svg>
  );
}

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-mint shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

type Fix = { title: string; before: string; after: string };

const FIXES: Fix[] = [
  {
    title: "Ползунки громкости и шумки действительно работают",
    before:
      "Аудиоцепочка собиралась только после ontrack и легко ломалась: AudioContext закрывался, createMediaElementSource мог создаться дважды, ползунки крутились вхолостую.",
    after:
      "Единая живая цепочка Web Audio создаётся один раз: приём → GainNode (0–200%, плавное setTargetAtTime) → шумовой гейт → колонки. Ползунки видны сразу, значения применяются мгновенно, двойной клик сбрасывает к 100%.",
  },
  {
    title: "Настоящее шумоподавление (noise gate)",
    before:
      "«Шумка» была компрессором — он выравнивает громкость, но не глушит фоновый шум. Ползунок порога почти ничего не менял.",
    after:
      "Честный noise gate с гистерезисом: анализ уровня звука управляет обычным GainNode прямо в аудиоцепочке — без AudioWorklet и ScriptProcessor, поэтому ломаться нечему. Два независимых ползунка: входящий звук собеседника и ваш микрофон, у каждого — свой выключатель. В доке звонка — кнопка «тест звука» и сторож заблокированного контекста.",
  },
  {
    title: "Звонок больше не «висит» и не рвётся молча",
    before:
      "ICE-кандидаты, пришедшие до answer, просто выбрасывались — звонок часто не соединялся. Завершение звонка не доходило до собеседника, ник оставался «занят» навсегда.",
    after:
      "Очередь ранних ICE-кандидатов, сигналы «занят» / «отклонил» / «завершил», автоотмена через 45 секунд, onDisconnect-очистка звонка, ника и presence. Оба клиента всегда видят, что произошло.",
  },
  {
    title: "Удобство: всё под рукой",
    before:
      "Список устройств рисовался, но не переключал микрофон. alert() на каждую ошибку, Controls появлялись не сразу, статус звонка непонятен.",
    after:
      "Список «кто в сети» с кнопкой звонка, реальная смена микрофона на лету (и во время звонка), mute с иконкой, живые индикаторы уровня звука, таймер разговора, рингтон и мигание вкладки при входящем, тосты вместо alert.",
  },
  {
    title: "Безопасность чата",
    before: "Текст сообщений вставлялся через innerHTML — любой мог вставить HTML/скрипт в чат.",
    after: "Все сообщения рендерятся через textContent. Плюс ограничение чата последними 200 сообщениями и автопрокрутка только когда вы внизу.",
  },
];

const STEPS: { n: string; text: ReactNode }[] = [
  {
    n: "01",
    text: (
      <>
        Скопируйте <b className="text-snow">server/index.html</b> в корень вашего сервера (или в любую папку). Это весь сайт — стили, скрипты и логика внутри одного файла.
      </>
    ),
  },
  {
    n: "02",
    text: (
      <>
        Откройте его по адресу вида <span className="font-mono text-mint">https://ваш-домен/index.html</span>. Серверу достаточно уметь отдавать HTML — PHP-код в файле не используется, но файл можно смело переименовать в <b className="text-snow">index.php</b>, если сервер требует.
      </>
    ),
  },
  {
    n: "03",
    text: (
      <>
        Готово: пароли не нужны, Firebase-конфиг уже внутри. Для микрофона браузер требует <b className="text-snow">HTTPS</b> (или localhost) — на обычном HTTP звонок не получит доступ к звуку.
      </>
    ),
  },
];

function DockMock() {
  return (
    <div className="anim-rise relative w-full max-w-sm rounded-2xl border border-amber/35 bg-gradient-to-b from-[#152138] to-[#0d1526] p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,.85)]" style={{ animationDelay: ".25s" }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[hsl(160_72%_48%)] to-[hsl(205_70%_42%)] font-bold text-ink">
          С
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-[#0d1526] bg-[#5CE089]" style={{ animation: "dotPulse 2s infinite" }} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-sm">СонныйЁж</p>
          <p className="font-mono text-[11px] text-[#5CE089]">В эфире</p>
        </div>
        <span className="font-mono text-sm text-amber">04:12</span>
      </div>

      <div className="mb-1 flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#2FB39D] via-mint to-[#B8FFE9]" style={{ animation: "eq 1.4s ease-in-out infinite", transformOrigin: "left" }} />
        </div>
        <span className="font-mono text-[10px] text-dim">приём</span>
      </div>

      {[
        { label: "Громкость собеседника", val: "140%", color: "amber", w: "70%" },
        { label: "Шумоподавление · −50 дБ", val: "вкл", color: "mint", w: "50%" },
      ].map((row) => (
        <div key={row.label} className="mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-snow/90">{row.label}</span>
            <span className={`font-mono text-xs ${row.color === "amber" ? "text-amber" : "text-mint"}`}>{row.val}</span>
          </div>
          <div className="relative h-1.5 rounded-full bg-white/10">
            <div className={`absolute inset-y-0 left-0 rounded-full ${row.color === "amber" ? "bg-amber" : "bg-mint"}`} style={{ width: row.w }} />
            <div
              className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-[3px] bg-ink ${row.color === "amber" ? "border-amber" : "border-mint"}`}
              style={{ left: `calc(${row.w} - 8px)` }}
            />
          </div>
        </div>
      ))}

      <div className="mt-5 flex gap-2.5">
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-fog">
          <PhoneIcon />
        </span>
        <span className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-coral to-[#E23B3B] text-sm font-semibold text-[#2B0707]">
          <PhoneIcon /> Завершить
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* фоновые слои */}
      <div className="pointer-events-none fixed inset-0" style={{ backgroundImage: "linear-gradient(rgba(148,180,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(148,180,255,.045) 1px,transparent 1px)", backgroundSize: "44px 44px", maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%,#000 30%,transparent 100%)" }} />
      <div className="pointer-events-none fixed -left-40 -top-44 h-[520px] w-[520px] rounded-full opacity-50 blur-[90px]" style={{ background: "radial-gradient(circle,rgba(255,180,84,.22),transparent 65%)", animation: "driftSlow 22s ease-in-out infinite alternate" }} />
      <div className="pointer-events-none fixed -bottom-64 -right-52 h-[620px] w-[620px] rounded-full opacity-50 blur-[90px]" style={{ background: "radial-gradient(circle,rgba(79,214,190,.16),transparent 65%)", animation: "driftSlow 26s ease-in-out infinite alternate-reverse" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* шапка */}
        <header className="anim-rise flex items-center gap-3 py-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber to-ember text-ink shadow-[0_8px_24px_-8px_rgba(255,180,84,.6)]">
            <ChatIcon />
          </span>
          <span className="font-display text-lg font-extrabold tracking-wider">WAYGRAM</span>
          <span className="ml-auto rounded-full border border-white/10 bg-panel px-3 py-1.5 font-mono text-[11px] text-fog">
            1 файл · <span className="text-amber">server/index.html</span>
          </span>
        </header>

        {/* открытие */}
        <section className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="anim-rise mb-4 inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-3.5 py-1.5 font-mono text-xs text-mint">
              <span className="h-2 w-2 rounded-full bg-[#5CE089]" style={{ animation: "dotPulse 2s infinite" }} />
              починено · ползунки · шумка · звонки
            </p>
            <h1 className="anim-rise font-display text-3xl font-extrabold leading-tight sm:text-5xl" style={{ animationDelay: ".08s" }}>
              Waygram снова <span className="text-amber">в эфире</span>
            </h1>
            <p className="anim-rise mt-5 max-w-xl text-base leading-relaxed text-fog sm:text-lg" style={{ animationDelay: ".14s" }}>
              Мессенджер с голосовыми звонками собран в <b className="text-snow">один файл</b> для вашего HTML/PHP-сервера. Ползунки громкости и шумоподавления теперь управляют настоящей аудиоцепочкой Web Audio, а звонки соединяются и завершаются как положено.
            </p>
            <div className="anim-rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: ".2s" }}>
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-b from-amber to-ember px-6 py-3.5 font-semibold text-[#241303] shadow-[0_6px_22px_-8px_rgba(255,180,84,.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(255,180,84,.7)] active:scale-95"
              >
                <PhoneIcon className="w-5 h-5 transition-transform group-hover:rotate-12" />
                Открыть мессенджер
              </a>
              <a href="#deploy" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3.5 font-semibold text-snow/90 transition-colors hover:border-amber/50 hover:text-amber">
                Как задеплоить
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14m0 0 6-6m-6 6-6-6" />
                </svg>
              </a>
            </div>
            <ul className="anim-rise mt-9 grid gap-2.5 text-sm text-fog sm:grid-cols-2" style={{ animationDelay: ".26s" }}>
              {["Без паролей — вход по нику", "WebRTC: звук напрямую", "Firebase-конфиг уже внутри", "Работает с телефона"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <CheckIcon /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="pointer-events-none absolute inset-0 -z-10 grid place-items-center">
              <span className="h-64 w-64 rounded-full border border-mint/30" style={{ animation: "ringPulse 2.4s ease-out infinite" }} />
            </div>
            <DockMock />
          </div>
        </section>

        {/* что починено */}
        <section className="py-10">
          <div className="anim-rise mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.2em] text-mint">ремонтная карта</p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Что было сломано — и как теперь</h2>
            </div>
            <span className="hidden shrink-0 rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-xs text-dim sm:block">{FIXES.length} исправлений</span>
          </div>

          <ol className="grid gap-4">
            {FIXES.map((f, i) => (
              <li
                key={f.title}
                className="anim-rise group grid gap-4 rounded-xl border border-white/10 bg-gradient-to-b from-panel to-[#0e1728] p-5 transition-colors hover:border-amber/40 sm:grid-cols-[64px_1fr] sm:p-6"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <span className="font-display text-2xl font-extrabold text-white/15 transition-colors group-hover:text-amber/70">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-base font-bold sm:text-lg">{f.title}</h3>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <p className="rounded-lg border border-coral/25 bg-coral/5 p-3.5 text-sm leading-relaxed text-fog">
                      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-coral">было</span>
                      {f.before}
                    </p>
                    <p className="rounded-lg border border-mint/25 bg-mint/5 p-3.5 text-sm leading-relaxed text-fog">
                      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-mint">стало</span>
                      {f.after}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* деплой */}
        <section id="deploy" className="scroll-mt-10 py-10">
          <div className="rounded-2xl border border-amber/25 bg-gradient-to-b from-[#152138] to-[#0d1526] p-6 sm:p-9">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-amber">деплой за минуту</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Как положить на сервер</h2>
            <div className="mt-7 grid gap-6 md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n} className="rounded-xl border border-white/10 bg-ink/50 p-5">
                  <span className="font-display text-2xl font-extrabold text-amber/80">{s.n}</span>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-b from-mint to-[#2FB39D] px-6 py-3 font-semibold text-[#04211B] shadow-[0_6px_22px_-8px_rgba(79,214,190,.5)] transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <ChatIcon className="w-4 h-4" />
                Проверить прямо сейчас
              </a>
              <span className="font-mono text-xs text-dim">в превью мессенджер доступен по адресу /server/index.html</span>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-8 font-mono text-xs text-dim">
          <span>Waygram · один файл · WebRTC + Firebase</span>
          <span>
            файл для деплоя: <span className="text-amber">server/index.html</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
