import { ALL_SCRIPTS } from '../data/scripts';
import { PACKS } from '../data/packs';
import { SearchMatch, Pack, Category } from '../types';

// Precise domain synonym mappings for Aesthetic/HOF reception
const SYNONYM_MAP: Record<string, string[]> = {
  // Botox / Toxina
  botox: ['botox', 'toxina', 'toxina botulinica', 'dysport', 'xeomin', 'nabota', 'rugas', 'pes de galinha'],
  toxina: ['botox', 'toxina', 'toxina botulinica', 'dysport', 'rugas'],
  rugas: ['rugas', 'botox', 'toxina', 'linhas de expressao', 'pes de galinha', 'testa'],
  
  // Preços / Valores
  preco: ['preco', 'valor', 'valores', 'quanto custa', 'tabela', 'orcamento', 'investimento', 'custo'],
  valor: ['preco', 'valor', 'valores', 'quanto custa', 'tabela', 'orcamento', 'investimento'],
  caro: ['caro', 'achei caro', 'orcamento', 'acima do meu orcamento', 'desconto', 'mais barato'],
  desconto: ['desconto', 'promocao', 'a vista', 'parcelamento', 'condicoes'],
  parcelamento: ['parcelamento', 'cartao', 'vezes', 'pix', 'juros', 'pagamento'],
  tabela: ['tabela', 'pdf', 'cardapio', 'lista de precos', 'catalogo'],

  // Ausências e faltas
  falta: ['falta', 'faltou', 'faltas', 'no-show', 'noshow', 'nao compareceu', 'ausencia', 'desmarcou', 'sumiu'],
  faltou: ['falta', 'faltou', 'no-show', 'noshow', 'nao compareceu', 'ausencia', 'sumiu'],
  'no-show': ['falta', 'faltou', 'no-show', 'noshow', 'nao compareceu', 'ausencia'],
  noshow: ['falta', 'faltou', 'no-show', 'noshow', 'nao compareceu', 'ausencia'],
  'nao compareceu': ['falta', 'faltou', 'no-show', 'nao compareceu', 'ausencia'],

  // Retorno e Reavaliação
  retorno: ['retorno', 'reavaliacao', 'reavaliacoes', 'retoque', 'revisao', '15 dias', 'recall'],
  reavaliacao: ['retorno', 'reavaliacao', 'retoque', 'revisao', '15 dias', 'recall'],
  retoque: ['retorno', 'reavaliacao', 'retoque', '15 dias', 'complemento'],

  // Procedimentos específicos
  labio: ['labio', 'labios', 'labial', 'boca', 'preenchimento labial'],
  labios: ['labio', 'labios', 'labial', 'boca', 'preenchimento labial'],
  preenchimento: ['preenchimento', 'acido hialuronico', 'seringa', 'ml', 'labios', 'olheiras', 'malar'],
  olheira: ['olheira', 'olheiras', 'calha lacrimal', 'olho fundo'],
  olheiras: ['olheira', 'olheiras', 'calha lacrimal', 'olho fundo'],
  bioestimulador: ['bioestimulador', 'bioestimuladores', 'colageno', 'sculptra', 'radiesse', 'elleva', 'flacidez'],
  sculptra: ['sculptra', 'bioestimulador', 'colageno', 'flacidez'],
  radiesse: ['radiesse', 'bioestimulador', 'colageno', 'flacidez'],
  fios: ['fios', 'pdo', 'fios de pdo', 'sustentacao', 'lifting'],

  // Agenda e Reagendamento
  reagendar: ['reagendar', 'reagendamento', 'remarcar', 'remarcacao', 'trocar data', 'mudar data', 'mudar horario'],
  remarcar: ['reagendar', 'reagendamento', 'remarcar', 'remarcacao', 'trocar data', 'mudar horario'],
  atraso: ['atraso', 'atrasos', 'atrasou', 'transito', 'chegar tarde', 'pontualidade'],
  encaixe: ['encaixe', 'brecha', 'lista de espera', 'buraco na agenda', 'desistencia'],
};

export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getSynonymsForTerm(term: string): string[] {
  const norm = normalizeText(term);
  const result = new Set<string>([norm]);

  if (SYNONYM_MAP[norm]) {
    SYNONYM_MAP[norm].forEach((s) => result.add(normalizeText(s)));
  }

  // Also check if term matches any synonym key
  for (const [key, list] of Object.entries(SYNONYM_MAP)) {
    const normList = list.map(normalizeText);
    if (normList.includes(norm) || key === norm) {
      normList.forEach((s) => result.add(s));
    }
  }

  return Array.from(result);
}

// Quick lookup maps
const packMap = new Map<string, Pack>();
const categoryMap = new Map<string, Category>();

PACKS.forEach((pack) => {
  packMap.set(pack.id, pack);
  pack.categories.forEach((cat) => {
    categoryMap.set(cat.id, cat);
  });
});

export function searchScripts(query: string): SearchMatch[] {
  const cleanQuery = normalizeText(query);
  if (!cleanQuery) return [];

  const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);
  if (queryTokens.length === 0) return [];

  const results: SearchMatch[] = [];

  for (const script of ALL_SCRIPTS) {
    const normTitle = normalizeText(script.title);
    const normMessage = normalizeText(script.message);
    const normKeywords = script.keywords.map(normalizeText);
    const category = categoryMap.get(script.categoryId);
    const pack = packMap.get(script.packId);
    const normCatTitle = category ? normalizeText(category.title) : '';
    const followUpTexts = script.followUps
      ? script.followUps.map((f) => normalizeText(f.trigger + ' ' + f.message))
      : [];

    let totalScore = 0;
    let matchesAllTokens = true;

    for (const token of queryTokens) {
      const synList = getSynonymsForTerm(token);
      let tokenMatched = false;
      let tokenBestScore = 0;

      for (const syn of synList) {
        // 1. Exact match in title
        if (normTitle === syn) {
          tokenMatched = true;
          tokenBestScore = Math.max(tokenBestScore, 120);
        } else if (normTitle.includes(syn)) {
          tokenMatched = true;
          tokenBestScore = Math.max(tokenBestScore, 80);
        }

        // 2. Exact match in keywords
        if (normKeywords.some((k) => k === syn)) {
          tokenMatched = true;
          tokenBestScore = Math.max(tokenBestScore, 70);
        } else if (normKeywords.some((k) => k.includes(syn))) {
          tokenMatched = true;
          tokenBestScore = Math.max(tokenBestScore, 50);
        }

        // 3. Match in category title
        if (normCatTitle.includes(syn)) {
          tokenMatched = true;
          tokenBestScore = Math.max(tokenBestScore, 40);
        }

        // 4. Match in message body
        if (normMessage.includes(syn)) {
          tokenMatched = true;
          tokenBestScore = Math.max(tokenBestScore, 25);
        }

        // 5. Match in follow-ups
        if (followUpTexts.some((f) => f.includes(syn))) {
          tokenMatched = true;
          tokenBestScore = Math.max(tokenBestScore, 20);
        }
      }

      if (!tokenMatched) {
        matchesAllTokens = false;
        break;
      }

      totalScore += tokenBestScore;
    }

    if (matchesAllTokens && totalScore > 0 && pack && category) {
      results.push({
        script,
        pack,
        category,
        score: totalScore,
      });
    }
  }

  // Sort by highest score first, then by title
  return results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.script.title.localeCompare(b.script.title);
  });
}
