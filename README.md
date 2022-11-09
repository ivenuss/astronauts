# TechFides Task

## Postup

V rámci zadání jsem použil moderní technologie/frameworky, které jsou v dnešní době v React komunitě hodně probírány.

Pro komunikaci se serverem jsem využil REST API, která je type-safe, díky technologii [#tRPC](tRPC).

Pro lepší práci s kódem a zaručení správného otypování jsem použil **TypeScript**.

Využil jsem možnost, kterou Next.js nabízí. Jsou to serverless funkce, které jsou rychlé a jednoduché na konfiguraci.

## Hyearchie složek

- `/server/trpc/router/astronaut.ts` - Logika serverless všech server funkcí týkající se astronautů.
- `/modules/*` - Všechny lokální komponenty týkající se jen té dané stránky.
- `/components/*` - Komponenty sdílené mezi více stránkami (budou použity napříč aplikací více než jednou).

## Hlavní použité technologie

### [Next.js](https://nextjs.org/)

Next.js je v dnešní době jeden z nejpopulárnějších frameworků v React světě. Nabízí spoustu výhod od SSR, ISR, Image optimalizace, serverless funkcí, apod.

Místo klasického `create-next-app` boilerplatu jsem použil [`create-t3-app`](https://github.com/t3-oss/create-t3-app), který je více nakonfigurovaný ze začátku (TypeScript, Prisma, tRPC, React Query) společně s obsáhlým boilerplatem na technologii [tRPC](https://trpc.io/).

### [tRPC](https://trpc.io/)

End-to-end typesafe nástroj na tvoření API endpointů. Umožňuje tvořit mutace, queries, subscriptions, apod. V momentální chvíli, kdy klasické Next.js serverless funkce nedisponují žádnou **type-safe** ochranou, tak je tohle skvělá a jednoduchá alternativa, jak tohoto docílit. Zároveň podporují pomocí externí knihovny [zod](https://github.com/colinhacks/zod) validování inputu v HTTP požadavku.

### [Prisma](https://www.prisma.io/)

Prisma je [ORM](https://cs.wikipedia.org/wiki/Objektov%C4%9B_rela%C4%8Dn%C3%AD_mapov%C3%A1n%C3%AD), která zbaví vývojáře zbytečného "hard codingu" většiny databázových queries a manuálního vytváření tabulek společně s relacemi. Zároveň je to **type-safe** řešení pro databáze, takže stačí si vytvořit vlastní schéma, to otypovat a o zbytek se Prisma postará za nás. Vygeneruje tabulky, vytvoří relace, apod. Zároveň podporuje nejpopulárnější databáze jakož jsou: PostgreSQL, MySQL, SQLite a MongoDB.

### [React Query](https://tanstack.com/query/)

Cachování dat z databáze může být složité. Knihovna **React Query** tuhle problematiku zvládá nejlépe.

### [Zustand](https://zustand-demo.pmnd.rs/)

Moderní, jednoduchá, globální state management knihovna, který skoro neobsahuje žádný boilerplate kód narozdíl od [Reduxu](https://redux.js.org/).

### [Chakra UI](https://chakra-ui.com/)

Komponent knihovna s předdefinovanými styly a logikou komponentů. Pro tohle zadání jsem ji zvolil z důvodu časové flexibility. Nemusím psát logiku všech komponentů a vytvářet vlastní styl. Kdybych chtěl tvořit vlastní komponenty, zvolil bych [Tailwind CSS](https://tailwindcss.com/).

## Hosting

### [Frontend -> Vercel](https://vercel.com/)

Vercel je nejlepší možností jak hostovat svůj Next.js projekt. Nabízí free tier a taktéž podporují serverless funkce, které žijí na [edge síti](https://vercel.com/docs/concepts/edge-network/overview).

### [Databáze -> PlanetScale](https://planetscale.com/)

Jeden z nejpopulárnějších databázových providerů na trhu. Setup samotné databáze zabere pár minut a samotná platforma nabízí spoustu možností.

## Spuštění lokálně

```
git clone https://github.com/ivenuss/astronauts.git
cd astronauts
yarn install
yarn dev
```

## Náhled
![image](https://user-images.githubusercontent.com/43939822/194782789-2eb94317-f0af-4604-a357-7fd280d3c028.png)
