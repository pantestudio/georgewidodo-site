/* ============================================================
   CONTENT — one entry per case study. Copy is from georgewidodo.com
   and pante.studio as written. Every case follows the same order:
   logo → name → key visual → case film → role/agency/year →
   challenge → idea → chapters.
   Media: i(path) image, l(path) muted loop, y(id)/v(id) film.
   span: 'f' full width, 'h' half (pairs side by side).
============================================================ */
(() => {
const i = (s, span = 'f', cap) => ({ t: 'img', s, span, cap });
const l = (s, span = 'f', cap) => ({ t: 'loop', s, span, cap });
const y = (id, poster, cap, span = 'f', start) => ({ t: 'film', y: id, poster, cap, span, start });
const v = (id, poster, cap, span = 'f') => ({ t: 'film', v: id, poster, cap, span });

const YT_LOGO = `<svg viewBox="0 0 95 26" aria-label="YouTube"><path fill="currentColor" d="M15.27 20.9c4.44-.01 9.58-.17 11.14-.6a3.6 3.6 0 0 0 2.45-2.46c.43-1.56.6-4.52.61-6.86-.01-2.32-.18-5.27-.61-6.81a3.5 3.5 0 0 0-2.45-2.46C24.85 1.28 19.71 1.11 15.27 1.1c-4.43.01-9.56.18-11.11.61A3.6 3.6 0 0 0 1.69 4.17C1.27 5.71 1.11 8.66 1.1 10.98c.01 2.34.17 5.3.59 6.86a3.5 3.5 0 0 0 2.47 2.46c1.55.43 6.68.59 11.11.6ZM12.53 6.88l7.11 4.1-7.11 4.13V6.88Z"/><path fill="currentColor" d="M38.14 19.9v-5.46l3.47-11.34h-2.59l-1.32 5.15c-.3 1.18-.57 2.41-.77 3.55h-.16c-.11-1-.43-2.31-.75-3.57L34.74 3.1h-2.59l3.42 11.34v5.46h2.57ZM45.1 7.3c-3.03 0-4.07 1.75-4.07 5.52v1.79c0 3.38.65 5.5 4.01 5.5 3.31 0 4.02-2.02 4.02-5.5v-1.79c0-3.37-.68-5.52-3.96-5.52Zm1.29 8.42c0 1.64-.29 2.67-1.34 2.67-1.03 0-1.32-1.04-1.32-2.67v-4.04c0-1.4.2-2.65 1.32-2.65 1.18 0 1.34 1.32 1.34 2.65v4.04ZM53.27 20.09c1.46 0 2.37-.61 3.12-1.71h.11l.11 1.52h1.99V7.54h-2.64v9.93c-.28.49-.93.85-1.54.85-.77 0-1.01-.61-1.01-1.63V7.54h-2.63v9.27c0 2.01.58 3.28 2.49 3.28ZM63.83 19.9V5.15h3.04V3.1h-8.69v2.05h3.04V19.9h2.61ZM68.87 20.09c1.46 0 2.37-.61 3.12-1.71h.11l.11 1.52h1.99V7.54h-2.64v9.93c-.28.49-.93.85-1.54.85-.77 0-1.01-.61-1.01-1.63V7.54h-2.63v9.27c0 2.01.58 3.28 2.49 3.28ZM81.67 7.27c-1.28 0-2.2.56-2.81 1.47h-.13c.08-1.2.14-2.22.14-3.03V2.44h-2.55v17.46h2.22l.19-1.2h.07c.59.81 1.5 1.32 2.71 1.32 2.01 0 2.87-1.73 2.87-5.41v-1.91c0-3.44-.39-5.43-2.71-5.43Zm.09 7.34c0 2.3-.34 3.67-1.41 3.67-.5 0-1.19-.24-1.5-.69v-7.35c.27-.7.87-1.21 1.54-1.21 1.08 0 1.37 1.31 1.37 3.7v1.88ZM93.65 12.5c0-2.98-.3-5.19-3.73-5.19-3.23 0-3.95 2.15-3.95 5.31v2.17c0 3.08.66 5.32 3.87 5.32 2.54 0 3.85-1.27 3.7-3.73l-2.25-.12c-.03 1.52-.38 2.14-1.39 2.14-1.27 0-1.33-1.21-1.33-3.01v-.84h5.08V12.5Zm-3.79-3.53c1.22 0 1.31 1.15 1.31 3.1v1.01h-2.6v-1.01c0-1.93.08-3.1 1.29-3.1Z"/></svg>`;
const PANTE_LOGO = `<svg viewBox="0 0 182 62" aria-label="Panté"><use href="#pante-logo"/></svg>`;
const word = (txt, cls = '') => `<span class="wm ${cls}">${txt}</span>`;
const LOGO = (f, alt, h) => `<img class="lg" src="a/logo/${f}" alt="${alt}" style="height:${h || 30}px">`;

window.RECORDS = [
/* ---------------------------------------------------------------- 01 PANTÉ */
{ no: '01', brand: 'Panté', cover: 'a/cv/pante.jpg', color: '#0B3FBF', spine: '#0B3FBF', on: '#F4F0E7',
  sub: 'A recovery studio, from zero', role: 'Founder & Creative Director',
  cases: [{
    id: 'pante', title: 'A studio from zero', sub: 'Manual recovery for people who move',
    theme: { bg: '#0A2F9E', fg: '#F4F0E7', card: 'rgba(244,240,231,.08)', acc: '#FF7A2F' },
    logo: PANTE_LOGO,
    key: i('pante/hero.webp'),
    film: null,
    meta: [['Role', 'Founder & Creative Director'], ['Studio', 'Panté, Berawa · Bali'], ['Year', '2026'], ['Scope', 'Naming · Identity · Space · Content · Booking & membership']],
    challenge: 'Canggu has a massage on every corner, mostly built for a holiday afternoon. The people who live and train here — runners, surfers, riders, parents — had nowhere that treated recovery as seriously as they treat the work.',
    idea: 'A modern recovery studio rooted in old hands: certified Thai bodywork and Balinese massage, delivered slow, strong and steady. One electric blue, one sunset glow, and a ritual that starts before the first touch.',
    chapters: [
      { k: 'Identity', h: 'Slow. Strong. Steady.', p: 'A wordmark with weight, a blue you can see from Jl. Tegal Sari, and the orange of a Bali sundown. The brand lives on the building first.',
        m: [i('pante/front.webp', 'h'), i('pante/front2.webp', 'h')] },
      { k: 'The ritual', h: 'Tell us how you feel. We’ll take it from there.', p: 'We Listen — every visit starts with a short consultation. You Settle — jamu, foot wash and breathwork ease you in. We Treat — your therapist reads the body, then builds the session around it.',
        m: [i('pante/bowl.webp', 'h'), i('pante/moon.webp', 'h'), i('pante/fork.webp', 'h'), i('pante/aura.webp', 'h')] },
      { k: 'Our treatments', h: 'Recover. Relax. Restore. Focus.', p: 'Four rituals, each named for what it does. Recover is the one you take part in: two-person yoga on the tatami. Relax is the one you sink into. Restore goes deep. Focus is quick enough to fit between meeting and dinner.',
        m: [i('pante/t-recover.webp', 'h', 'Recover'), i('pante/t-relax.webp', 'h', 'Relax'), i('pante/t-restore.webp', 'h', 'Restore'), i('pante/t-focus.webp', 'h', 'Focus')] },
      { k: 'The flagship studio', h: 'Berawa, Canggu, Bali', p: 'Tatami rooms for Thai bodywork, table rooms for oil massage, and a lounge to land in after.',
        m: [i('pante/hall.webp', 'h'), i('pante/lounge.webp', 'h'), i('pante/tatami.webp', 'h'), i('pante/table.webp', 'h')] },
      { k: 'Who this is for', h: 'The Athlete. The Dawn Patrol. The Late Shift.', p: 'Marathon block, weekend Hyrox, legs that don’t quit on command. Paddled out before the sun was up, again. Beach club all day, dance all night long. Each one has a treatment that answers.',
        m: [i('pante/tall.webp', 'f')] },
      { k: 'On the feed', h: 'Sante di Panté', p: 'A content system shot in the studio’s own light: singing bowls, silhouettes, and the sunset that names the brand.',
        m: [i('pante/ig2.webp', 'h'), i('pante/ig4.webp', 'h'), i('pante/ig5.webp', 'h'), i('pante/ig6.webp', 'h'), i('pante/ig0.webp', 'h'), i('pante/ig8.webp', 'h')] },
      { k: 'Panté Member', h: 'A loyalty card that lives in your WhatsApp.', p: 'No app to download. Collect a stamp every session, climb from First Timer to Founder’s VIP, and save with session packages: Routine, Ritual, Royale.',
        m: [{ t: 'member' }] },
      { k: 'Recovery is a team sport', h: 'Partner with us', p: 'Whatever your community trains for, we can be your recovery partner. Run clubs, cycling communities, surf coaches, yoga studios, Hyrox crews, tennis clubs, gyms, climbers, villas.',
        m: [i('pante/team.webp', 'f')], link: ['pante.studio', 'https://pante.studio'] }
    ] }] },

/* ---------------------------------------------------------------- 02 YOUTUBE */
{ no: '02', brand: 'YouTube Music', cover: 'a/cv/ichigo.jpg', color: '#FF6B7F', spine: '#FF6B7F', on: '#2A0A10',
  sub: 'Project Ichigo-Song', role: 'Creative Lead',
  cases: [{
    id: 'ichigo', title: 'いちごソング', sub: 'YouTube Music: Project Ichigo-Song',
    theme: { bg: '#FFE3E6', fg: '#2A0A10', card: 'rgba(255,255,255,.6)', acc: '#E8263F' },
    logo: LOGO('ytmusic.svg', 'YouTube Music', 26),
    key: i('ichigo/key.webp'),
    film: y('gqTqBk3Awv0', 'ichigo/key.webp', 'Watch the case study'),
    meta: [['Role', 'Art Direction, Design, Content Production'], ['Agency', 'YouTube Creative Studio APAC · co-created with Boxx JP'], ['Year', 'FA2023']],
    challenge: 'How does YouTube Music break through the noise in Japan’s fast growing music streaming market?',
    insight: 'Farmers in Japan grow their groceries by playing music because they believe it enhances flavor.',
    idea: 'By partnering with viral sensation Imase (J-Pop’s fastest growing star), we embarked on an experiment: to curate the ultimate YouTube Music playlists to grow the sweetest strawberries. Showcased in a special livestream with farming creators and Imase himself. Engaging fans at our Shinjuku installation and offering ‘DIY growing kits’ for them to try it themselves.',
    chapters: [
      { k: 'The launch ( :60s )', h: 'Night Dancer × Project Ichigo', p: 'We partnered with Imase to release a remixed version of ‘Night Dancer’ (100M+ views), aiming to engage fans, promote the playlist, and encourage them to stay tuned to YT Music and download the app.',
        m: [y('aEui4eSZZx8', 'ichigo/teaser.jpg', 'Night Dancer × Project Ichigo', 'h'), l('ichigo/teaser.mp4', 'h')] },
      { k: 'The experiment (4 weeks)', h: 'The Farmers & Setup', p: 'We partnered with 0karanougyou, artisanal strawberry farmer from Nikko, JP, to blast six playlists on repeat whilst growing their renowned strawberries.',
        m: [i('ichigo/farm.webp'), y('tpu_EKw0YWY', 'ichigo/desk.webp', 'The setup', 'h'), i('ichigo/green.webp', 'h')] },
      { k: 'Activation', h: 'DIY Ichigo — Grow it Together', p: 'Fans can order their own kits to experiment at home (and download the YT Music app and play Imase’s playlist on repeat)…',
        m: [l('ichigo/unbox.mp4')] },
      { k: 'OOH', h: 'Tokyu Plaza Giveaway', p: '…or grab them at Omotesando’s kaleidoscopic entrance.',
        m: [i('ichigo/steps.webp', 'h'), l('ichigo/imase.mp4', 'h'), i('ichigo/plaza.webp', 'h'), i('ichigo/pack.webp', 'h'), i('ichigo/merch.webp')] },
      { k: 'Livestream', h: 'Imase Goes Live to Taste Test', p: 'After four weeks, Imase put the musically-grown strawberries to the test, live on his channel.',
        m: [y('48fPLkbp3lo', 'ichigo/live.webp', 'Imase live taste test', 'f', 1930), i('ichigo/social.webp')] }
    ] }] },

/* ---------------------------------------------------------------- YOUTUBE #SERIBUKARTINI */
{ no: '03', brand: 'YouTube', cover: 'a/cv/kartini.jpg', color: '#E85FA0', spine: '#E85FA0', on: '#2B0F1F',
  sub: '#SeribuKartini documentary', role: 'Creative Lead',
  cases: [{
    id: 'kartini', title: '#SeribuKartini', sub: 'A thousand Kartinis',
    theme: { bg: '#2B0F1F', fg: '#FBEFF3', card: 'rgba(251,239,243,.08)', acc: '#FF8FB5' },
    logo: YT_LOGO,
    key: i('kartini/key.webp'),
    film: v('960418948', 'kartini/key.webp', 'Watch the sizzle'),
    meta: [['Role', 'Creative Lead · Film, Editorial, Storytelling'], ['Agency', 'YouTube Creative Studio APAC'], ['Year', 'SP2024']],
    challenge: 'YouTube is seeing a decline in viewership amongst Gen-Z women in Indonesia. How could we show up for them in a hyperlocal way?',
    idea: 'In celebration of Kartini’s 145th birthday, we created a tiered content ecosystem, where five hero YouTube Creators’ stories create a thousand ripple effect — amplifying voices of all women.',
    chapters: [
      { k: 'Tier 1 · Documentary series', h: '#SeribuKartini', p: 'Five women creators share their life-changing choices that inspire themselves, fans, friends & family, and thousands of others in the spirit of Kartini.',
        m: [y('KqeR9aFlF_U', 'kartini/arih.webp', 'Watch the trailer'),
            y('j0J5Jx0PB6Y', 'kartini/arih.webp', 'Arih', 'h', 195), y('5Q2FBlIEVYA', 'kartini/irene.webp', 'Irene', 'h', 213),
            y('13zFssBNcX0', 'kartini/nadhira.webp', 'Nadhira', 'h'), y('6tdzpkiG9R0', 'kartini/nessie.webp', 'Nessie', 'h'), y('3n0TEKMjbzA', 'kartini/novi.webp', 'Novi')] },
      { k: 'Tier 2 · Social amplification', h: '#DearMbakKartini', p: 'Tapping into YouTube’s creator community, we asked every Indonesian woman to “curhat” (share their heart out) to other everyday Kartinis with the Swifties-inspired hashtag.',
        m: [l('kartini/social.mp4')] },
      { k: 'Tier 3 · The launch event', h: 'The launch event that changed a creator’s life', p: 'During Kartini Day, we hosted a press event with trailblazing Indonesian women, including journalist Najwa Shihab, Putri Ariani, and Isyana. After premiering our short docu series, the Minister of Social Affairs, Risma, encouraged women to keep creating despite societal challenges. Inspired by our film on Arih, Risma’s team gifted her a bionic hand to assist her daily life and journey as an illusion makeup artist.',
        m: [i('kartini/stage.webp'), i('kartini/panel.webp', 'h'), i('kartini/isyana.webp', 'h'), y('ECJUzqVnGX8', 'kartini/stage.webp', 'The moment')] }
    ] }] },

/* ---------------------------------------------------------------- ADIDAS ORIGINALS #TLKS */
{ no: '04', brand: 'adidas Originals', cover: 'a/cv/adidas.jpg', color: '#E8336D', spine: '#0D0D0D', on: '#F4F0E7',
  sub: '#TLKS at Miami Art Week', role: 'Social & Experiential',
  cases: [{
    id: 'tlks', title: '#TLKS', sub: 'The first digitally-sourced sneaker panel series',
    theme: { bg: '#0E0D0D', fg: '#F4F0E7', card: 'rgba(244,240,231,.07)', acc: '#E8336D' },
    logo: LOGO('adidas-light.svg', 'adidas Originals', 44),
    key: i('tlks/key.webp'),
    film: v('242648650', 'tlks/panel.webp', 'Watch the case study'),
    meta: [['Role', 'Social Media Content, FB Messenger Chatbot & Experiential Design'], ['Agency', 'Annex88 · Social AOR'], ['Year', 'FA2017']],
    challenge: 'adidas Originals wanted to mark the EQT, a popular technical performance sneaker, as a streetwear statement piece in the United States. During the globally-renowned Miami Art Week, we were tasked to promote adidas’ first inaugural panel series.',
    idea: 'The first ever digitally-sourced sneaker panel series featuring original creators at the forefront of innovation, creative, and performance — with conversation fueled by the adidas Originals audience via a Facebook Messenger chatbot.',
    chapters: [
      { k: 'The takeover', h: 'Cryptic animations on @adidasoriginals', p: 'As their Social AOR, I helped Annex88 take over the @adidasoriginals Instagram with cryptic animations revealing (1) the event and the speakers, streamed on Facebook Live, and (2) the adidas chatbot, where people could cop limited edition white #EQTs.',
        m: [l('tlks/ig-poster.mp4', 'h'), l('tlks/ig-pusha.mp4', 'h'), l('tlks/ig-mac.mp4', 'h'), l('tlks/ig-eqt.mp4', 'h'), l('tlks/ig-bot.mp4', 'h'), l('tlks/ig-phone.mp4', 'h')] },
      { k: 'The chatbot', h: 'Ask the panel. Cop the shoe.', p: 'The audience sourced the conversation: questions sent to the adidas Originals Messenger bot shaped what the panel talked about live — and unlocked the limited white EQTs.',
        m: [i('tlks/bot.webp')] },
      { k: 'The event', h: 'Miami Marine Stadium', p: 'The event celebrated the brand’s EQT shoe, and brought together artist Ben Jones, model and activist Adwoa Aboah, and artist and G.O.O.D. Music president Pusha T for a panel discussion. Guests gathered at the Hilario Candela-designed Miami Marine Stadium, and enjoyed a special performance from Pusha T after the conversation.',
        m: [v('469656415', 'tlks/lineup.webp', 'Art Basel sizzle'), i('tlks/panel.webp', 'h'), i('tlks/pusha.webp', 'h'), i('tlks/track.webp', 'h'), i('tlks/live1.webp', 'h')] },
      { k: 'Results', h: 'A sneaker panel the internet sat in on.', p: '',
        stats: [['55M', 'impressions'], ['1.25M', 'people watched the Facebook livestream'], ['347K', 'messages to the adidas Originals chatbot']] }
    ] }] },

/* ---------------------------------------------------------------- 03 NIKE */
{ no: '05', brand: 'Nike', cover: 'a/cv/nike.jpg', color: '#C9B193', spine: '#16130F', on: '#F3EFE6',
  sub: 'Legacy & You Can’t Stop Us', role: 'Designer / ACD',
  cases: [{
    id: 'legacy', vol: 'A1', title: 'Legacy Project', sub: 'Nike Cities: Legacy Project',
    theme: { bg: '#EFE8DC', fg: '#16130F', card: 'rgba(255,255,255,.55)', acc: '#16130F' },
    logo: LOGO('nike-dark.svg', 'Nike', 26),
    key: i('legacy/key.webp'),
    film: y('dnsAacFePwM', 'legacy/sizzle.webp', 'Watch the sizzle'),
    meta: [['Role', 'Art Direction, Content Curation, Strategy, Post-Production, Editorial & App Design'], ['Agency', 'Instrument'], ['Year', 'SP2021']],
    challenge: 'Nike’s NYC, LA, & CHI City teams wanted to build a sustainable and scaleable platform within the brand’s digital ecosystem — prioritizing authentic, human-centered stories of Black & LatinaX women, and non-binary folx who are transforming their local communities while inspiring the next generation of BIPOC changemakers.',
    idea: 'Nike LA’s Legacy Project highlights the life and work of eight Black Angeleno women transforming their Los Angeles communities through basketball, fashion, dance, running, and literacy.',
    chapters: [
      { k: 'The launch', h: 'Play Academy with Naomi Osaka', p: 'We partnered with Naomi Osaka’s PANO to empower young girls through sport. The anthem film was launched on @nikelosangeles Instagram and nike.com/la.',
        m: [v('589947766', 'legacy/dime.webp', 'Anthem film')] },
      { k: 'Part I', h: 'Meet the LA Community Leaders', p: 'From dotcom, Nike LA’s Instagram, integrated media, to Nike App editorial — we’ve designed and produced weekly content telling stories about our local leaders with the clever use of found footage and in-studio interviews.',
        m: [i('legacy/la.webp'), l('legacy/special.mp4', 'h'), i('legacy/sharada.webp', 'h'), i('legacy/zaneta.webp', 'h'), i('legacy/dime.webp', 'h'), i('legacy/sprint.webp')] },
      { k: 'Watch the full episodes', h: 'Three leaders, three films', p: '',
        m: [v('589955554', 'legacy/sharada.webp', 'Episode 01', 'h'), v('589954809', 'legacy/zaneta.webp', 'Episode 02', 'h'), v('589953125', 'legacy/dime.webp', 'Episode 03')] },
      { k: 'Part II', h: 'Self-care Becomes Community Care', p: 'To promote Nike’s wellness program on NTC (Nike Training Club) with Nike Trainer Traci Copeland, we refreshed the campaign across mediums to feature profiles of our LA Community leaders on how they build their own wellness routines.',
        m: [y('kgwdO1sE4-U', 'legacy/la.webp', 'Part II')] }
    ] }, {
    id: 'ycsu', vol: 'A2', title: 'You Can’t Stop Us', sub: 'Nike: “You Can’t Stop Us”',
    theme: { bg: '#111110', fg: '#F3EFE6', card: 'rgba(243,239,230,.07)', acc: '#F3EFE6' },
    logo: LOGO('nike-light.svg', 'Nike', 26),
    key: i('ycsu/key.webp'),
    film: y('t4L2j_9M5yw', 'ycsu/film.webp', 'Watch the film'),
    meta: [['Role', 'Art Direction, Motion Design, Content Production, (Zoom) Film Directing & UX Design'], ['Agency', 'Instrument'], ['Year', 'SU2020']],
    challenge: 'When the world of sports paused due to Covid-19, athletes* everywhere experienced an unprecedented disruption in their training routines.',
    idea: 'We helped Nike respond with You Can’t Stop Us — a rallying cry for everyone to stay motivated, moving, and connected to the culture of sport while stuck inside.',
    chapters: [
      { k: 'Showing up for the athlete*', h: 'In full service to their Members', p: 'Overnight, Nike had to figure out how to show up differently for their customers. At Instrument, we believed the right course of action during Covid-19 was to consistently and reliably show up in full service to their Members. From this perspective, You Can’t Stop Us — Nike’s promise to publish daily content in service of all athletes* — was built.',
        m: [l('ycsu/blog.mp4')] },
      { k: 'Moving from resigned to resilient', h: 'Daily content, real humans', p: 'With a dedicated team of writers, strategists, designers, and editors, we formulated, created, and published daily content to help shift Members from resigned to resilient. From stars like Mj Rodriguez and David Chang to athletes like Alex Morgan and Eliud Kipchoge, YCSU provided a steady cadence of movement, motivation, and hope during a challenging time.',
        m: [v('466100644', null, 'Film 01', 'h'), v('466099691', null, 'Film 02', 'h')] },
      { k: '365 Enablement', h: 'From launch speed to a long-term strategy', p: 'We helped Nike evolve its approach into a 365 “Enablement” strategy of weekly themes and daily content that matched the right athletes at the right time with the right message — with bespoke athlete, trainer, and influencer briefs, and remote video productions we directed through pre and post-production.',
        m: [l('ycsu/process.mp4')] },
      { k: 'Quote', quote: ['We spent a lot of time talking about the two speeds of marketing. In five short days, we were forced to just do it.', 'Carson York, Digital Marketing Director at Nike'] },
      { k: 'Results', h: 'Nike Members responded.', p: 'Just 14 days after launch, active weekly Members in the Nike App reached 3.2 million — an all-time high and more people than Nike had in their entire ecosystem the previous year.',
        stats: [['3.2M', 'active weekly Members in the Nike App, 14 days after launch'], ['+27%', 'Members interacting with YCSU content who returned to the Nike ecosystem']],
        m: [l('ycsu/stats.mp4')] }
    ] }] },

/* ---------------------------------------------------------------- 04 APPLE MUSIC */
{ no: '06', brand: 'Apple Music', cover: 'a/cv/apple.jpg', color: '#FF5AD9', spine: '#0B0B0B', on: '#FF8BE6',
  sub: 'And Then', role: 'ACD / Producer',
  cases: [{
    id: 'andthen', title: 'And Then', sub: 'Apple Music — “And Then”',
    theme: { bg: '#1C1030', fg: '#FFF2FB', card: 'rgba(255,242,251,.07)', acc: '#FF5AD9' },
    logo: LOGO('applemusic-light.svg', 'Apple Music', 26),
    key: l('apple/key.mp4'),
    film: y('8W84kkkF7Pw', 'apple/title.webp', 'Watch the case study'),
    meta: [['Role', 'ACD / Producer · Conceptual Development, 2D Animation, Content Production & Talent Directing'], ['Agency', 'ROSEWOOD Creative'], ['Year', 'SU/FA2018']],
    challenge: 'Apple Music wanted a concept to promote Independent Artists that would require the least amount of talent involvement, yet make the biggest impact. How do you promote new artists’ album releases from around the world, on a weekly basis, without having their presence on set?',
    idea: 'And Then was born — the social-first animated series that turns voice memos into beautifully bizarre & fantastical cartoons (in less than a week).',
    chapters: [
      { k: 'The solution: animated stories, reinvented', h: 'Voice memo in. Cartoon out.', p: '1. We send our booked and busy artists a series of culturally-relevant, strategically-fantastical questions. 2. Artists record their answers via Voice Memo. 3. Our group of talented storyboard artists, animators, and editors craft a fully-animated cartoon in less than a week.',
        m: [l('apple/animatic.mp4', 'h', 'Animatic'), l('apple/swim.mp4', 'h', 'Final')] },
      { k: 'Watch the full episodes', h: 'Sixteen artists, one format', p: '',
        m: [y('FlXywn0JDh4', 'apple/alina.webp', '', 'h'), y('5YhTJX9YprE', 'apple/cuco.webp', '', 'h'), y('d_isx5EAxXU', 'apple/chromeo.webp', '', 'h'), y('9vjm2F5VOh0', 'apple/ghost.webp', '', 'h'),
            y('8L8IcRH7D3M', 'apple/cero.webp', '', 'h'), y('Q0X_iEDS08k', 'apple/lump.webp', '', 'h'), y('aPZyJOVaVIE', 'apple/middle.webp', '', 'h'), y('pVaUJRHuMH0', 'apple/bob.webp', '', 'h')] },
      { k: 'Bespoke to every artist', h: 'Each illustrative style, animation, and color scheme is bespoke to our artists’ genres, origins, and languages.', p: 'Origins: Los Angeles, Montreal & Vancouver, London, Manchester, Brighton, Sweden, Madrid, Tokyo, Sydney & Melbourne, Mexico, Rio de Janeiro. Genres: alt rock, downtempo electronica, R&B, gothic metal, soul/jazz, psych pop, folk, electro funk, trap / hip hop, dance electronic.',
        m: [i('apple/aleman.webp', 'h'), i('apple/marcelo.webp', 'h')] },
      { k: 'Credits', credits: [['VP, Creative', 'Vasili Gavre'], ['ACD / Producer', 'George Widodo'], ['Account Manager', 'Lonnie Angle'], ['Strategist', 'Liz Lightbody'], ['Animators + Editors', 'Sam Ancona, Kylar Loya, Bill Cleveland, Tyler Rice, Moises Jimenez']] }
    ] }] },

/* ---------------------------------------------------------------- 05 INSTAGRAM */
{ no: '07', brand: 'Instagram', cover: 'a/cv/instagram.jpg', color: '#3D86D9', spine: '#3D86D9', on: '#0B1A2B',
  sub: 'Visual Refresh', role: 'Assoc. Content Director',
  cases: [{
    id: 'instagram', title: 'Visual Refresh', sub: 'about.instagram.com, redesigned',
    theme: { bg: '#F2EFEA', fg: '#151515', card: 'rgba(255,255,255,.7)', acc: '#D62F7A' },
    logo: LOGO('instagram.svg', 'Instagram', 40) + word('Instagram', 'ig'),
    key: l('instagram/home.mp4'),
    film: y('j_gCUOycAtM', 'instagram/community.jpg', 'Watch the case study'),
    meta: [['Role', 'Content for Web · Art Direction, Content Curation, Motion Design & UX Design'], ['Agency', 'Instrument'], ['Year', '2019']],
    challenge: 'With a business initiative to clarify their brand vision, codify a single design system, and expand from a product-focused mentality, Instagram partnered with Instrument to create a single strategy for their digital experiences across surfaces.',
    idea: 'Over a +1 year engagement, we collaborated to audit their digital ecosystem, create a coherent strategy for digital experiences, and craft an innovative, spirited, and extensible design system.',
    chapters: [
      { k: 'The website', h: 'about.instagram.com', p: 'Working quickly, iteratively, and collaboratively, we partnered with Perficient to execute on development, creating in-depth documentation to help maintain the visual fidelity of the design system.',
        m: [l('instagram/community.mp4', 'h'), l('instagram/features.mp4', 'h'), l('instagram/ui1.mp4', 'h'), l('instagram/ui2.mp4', 'h')], link: ['about.instagram.com', 'https://about.instagram.com/'] },
      { k: 'Content creation & curation', h: '228 bespoke assets', p: 'While working on the site design we were awarded the entire site curation. Quickly spinning up two concurrent workstreams, one for the community/creator curation, one for a feature-focused shoot in Los Angeles. Culminating in a delivery of 228 bespoke assets.',
        m: [i('instagram/couple.webp', 'h'), i('instagram/hat.webp', 'h'), i('instagram/selfie.webp', 'h'), l('instagram/dance.mp4', 'h'), i('instagram/loft.webp', 'h'), l('instagram/monster.mp4', 'h'), i('instagram/pink.webp', 'h'), i('instagram/egg.webp', 'h')] },
      { k: 'Recognition', h: 'Webby Awards — 2 Honorees, SP2020', p: 'Instagram Website Redesign, for Best Homepage & Use of Photography.' }
    ] }] },

/* ---------------------------------------------------------------- 06 QUIBI */
{ no: '08', brand: 'Quibi', cover: 'a/cv/quibi.jpg', color: '#7A5CF0', spine: '#7A5CF0', on: '#120A33',
  sub: 'Brand launch', role: 'Designer / ACD',
  cases: [{
    id: 'quibi', title: 'Brand Launch', sub: 'Bite-sized premium originals, exclusively on mobile',
    theme: { bg: '#120A33', fg: '#F1ECFF', card: 'rgba(241,236,255,.07)', acc: '#9C84FF' },
    logo: LOGO('quibi-light.svg', 'Quibi', 34),
    key: i('quibi/key.webp'),
    film: v('466022299', 'quibi/key.webp', 'Watch the case study'),
    meta: [['Role', 'Brand Launch · Art Direction, Graphic Design, Motion Design & Social Media Content'], ['Agency', 'Instrument'], ['Year', 'SP2020']],
    challenge: 'After 10+ years, streaming is the new norm. Eight months out from launch, Quibi came to us looking for strategic and creative ways to stand out in an increasingly saturated market.',
    idea: 'Quibi is here to disrupt the streaming world, delivering bite-sized premium original content, exclusively on mobile. We helped launch the brand through a bold new way of marketing, spanning all of their channels — building excitement for the brand and a global following from the ground up.',
    chapters: [
      { k: 'Start the show', h: 'You Ain’t Got These', p: 'We partnered with the brand and product team to imagine the branding and marketing for some of Quibi’s tentpole shows, including Lena Waithe’s ‘You Ain’t Got These’ — a sneaker culture docu-series going beyond the shoe, examining subtexts of race, politics, class, gender, commerce and addiction.',
        m: [v('466023380', 'quibi/key.webp', 'Watch the trailer'), i('quibi/poster.webp', 'h'), i('quibi/tall.webp', 'h')] },
      { k: 'The rebirth of Punk’d', h: 'And no one is safe', p: 'The iconic series returns with Chance the Rapper as host — masterminding the biggest pranks behind the scenes.',
        m: [y('3awKJu7EN6I', 'quibi/social.jpg', 'Punk’d')] },
      { k: 'A hidden social stunt at the Big Game', h: 'A phone number on the van, hidden in plain sight', p: 'Watch the Super Bowl ad — then watch what happens when you dial the number.',
        m: [y('ODsPEK0rmus', 'quibi/keke.webp', 'The Super Bowl ad', 'h'), v('466962324', 'quibi/keke.webp', 'Dial the number', 'h'), i('quibi/keke.webp')] },
      { k: 'Defining the system', h: 'Bite-sized, on brand', p: 'A graphic system showcasing the breadth of content parceled out in bite-sized chunks — lists, memes, quotes, etc — arming them with an ecosystem of branded assets to strengthen and amplify Quibi’s reach, audience and influence.',
        m: [l('quibi/social.mp4')] },
      { k: 'Quote', quote: ['Being a new product, we had to try something different in the way we got our brand out there. We needed fresh thinking and Instrument came in with a bold point of view that blended digital strategy with strong creative – pushing our brand into exciting new territories.', 'Edwin Lewis, Creative Lead at Quibi'] },
      { k: 'Results', h: 'Initial results far exceeded goals.', p: 'Quibi was named one of the top 10 brands to make an impact at the 2020 Super Bowl. Growth in their social following soared, and traffic to Quibi.com spiked — driving pre-orders and Quibi Insider signups.',
        stats: [['1.8M', 'app downloads in the first week'], ['8×', 'increase in social following']] }
    ] }] }
];
})();
