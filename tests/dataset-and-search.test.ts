import { describe, it, expect } from 'bun:test';
import { ALL_SCRIPTS, getScriptsByPack, getScriptsByCategory } from '../src/data/scripts';
import { PACKS } from '../src/data/packs';
import { validateScriptsDataset } from '../src/utils/validation';
import { searchScripts, normalizeText } from '../src/utils/search';

describe('1. Dataset & Structure Integrity', () => {
  it('should pass complete dataset validation', () => {
    const report = validateScriptsDataset();
    expect(report.isValid).toBe(true);
    expect(report.errors).toHaveLength(0);
  });

  it('should have exactly 120 total scripts', () => {
    expect(ALL_SCRIPTS).toHaveLength(120);
  });

  it('should have 120 unique IDs', () => {
    const ids = ALL_SCRIPTS.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(120);
  });

  it('should contain exactly 3 packs with specified distributions', () => {
    expect(PACKS).toHaveLength(3);

    // Pack 01: 45 scripts
    const pack1Scripts = getScriptsByPack('01');
    expect(pack1Scripts).toHaveLength(45);

    // Pack 02: 35 scripts
    const pack2Scripts = getScriptsByPack('02');
    expect(pack2Scripts).toHaveLength(35);

    // Pack 03: 40 scripts
    const pack3Scripts = getScriptsByPack('03');
    expect(pack3Scripts).toHaveLength(40);
  });

  it('should have exactly 15 categories with correct script counts', () => {
    const expectedCounts: Record<string, number> = {
      // Pack 1
      'primeiro-atendimento': 8,
      'precos-valores': 10,
      'objecoes-comerciais': 9,
      'conducao-consulta': 8,
      'follow-up-comercial': 10,
      // Pack 2
      'apos-agendamento': 6,
      'lembretes-inteligentes': 9,
      'reagendamentos': 7,
      'recuperacao-faltas': 7,
      'otimizacao-horarios': 6,
      // Pack 3
      'leads-antigos': 8,
      'avaliacoes-nao-convertidas': 8,
      'reavaliacoes-hof': 9,
      'relacionamento-pacientes': 8,
      'recuperacao-contatos': 7,
    };

    let totalCategoryScripts = 0;
    for (const [catId, count] of Object.entries(expectedCounts)) {
      const scripts = getScriptsByCategory(catId);
      expect(scripts).toHaveLength(count);
      totalCategoryScripts += scripts.length;
    }

    expect(totalCategoryScripts).toBe(120);
  });

  it('should not contain empty titles or messages', () => {
    for (const script of ALL_SCRIPTS) {
      expect(script.title.trim().length).toBeGreaterThan(5);
      expect(script.message.trim().length).toBeGreaterThan(20);
      expect(script.keywords.length).toBeGreaterThan(1);
    }
  });

  it('should contain critical commercial follow-up continuations', () => {
    const scriptsWithFollowUps = ALL_SCRIPTS.filter(
      (s) => s.followUps && s.followUps.length > 0
    );
    expect(scriptsWithFollowUps.length).toBeGreaterThanOrEqual(3);

    for (const s of scriptsWithFollowUps) {
      for (const f of s.followUps!) {
        expect(f.trigger.trim().length).toBeGreaterThan(5);
        expect(f.message.trim().length).toBeGreaterThan(15);
      }
    }
  });
});

describe('2. Text Normalization & Search Engine', () => {
  it('should correctly strip accents and lowercase', () => {
    expect(normalizeText('Preço')).toBe('preco');
    expect(normalizeText('AQUÉM')).toBe('aquem');
    expect(normalizeText('Acompanhamento Pós-Cirúrgico')).toBe('acompanhamento pos-cirurgico');
    expect(normalizeText('  Reavaliação  ')).toBe('reavaliacao');
  });

  it('should find Botox / Toxina synonyms', () => {
    const resBotox = searchScripts('botox');
    expect(resBotox.length).toBeGreaterThan(0);

    const resToxina = searchScripts('toxina');
    expect(resToxina.length).toBeGreaterThan(0);

    // Both should find the core botox scripts
    const botoxIds = new Set(resBotox.map((m) => m.script.id));
    expect(botoxIds.has('p1-c2-s01')).toBe(true); // Pergunta direta de valor do Botox
  });

  it('should find Preço / Caro / Valor synonyms', () => {
    const resPreco = searchScripts('preço');
    const resCaro = searchScripts('caro');
    const resValor = searchScripts('valor');

    expect(resPreco.length).toBeGreaterThan(0);
    expect(resCaro.length).toBeGreaterThan(0);
    expect(resValor.length).toBeGreaterThan(0);

    const caroIds = new Set(resCaro.map((m) => m.script.id));
    expect(caroIds.has('p1-c3-s01')).toBe(true); // Objeção "Achei caro"
  });

  it('should find Falta / No-Show synonyms', () => {
    const resFalta = searchScripts('falta');
    const resFaltou = searchScripts('faltou');
    const resNoShow = searchScripts('no-show');

    expect(resFalta.length).toBeGreaterThan(0);
    expect(resFaltou.length).toBeGreaterThan(0);
    expect(resNoShow.length).toBeGreaterThan(0);

    const faltaIds = new Set(resFalta.map((m) => m.script.id));
    expect(faltaIds.has('p2-c4-s01')).toBe(true); // 15 min após falta
  });

  it('should find Reagendamento / Remarcação synonyms', () => {
    const resReagendar = searchScripts('reagendar');
    const resRemarcar = searchScripts('remarcar');

    expect(resReagendar.length).toBeGreaterThan(0);
    expect(resRemarcar.length).toBeGreaterThan(0);
  });

  it('should return empty results for nonexistent queries', () => {
    const res = searchScripts('xyz123nonsense');
    expect(res).toHaveLength(0);
  });

  it('should return empty results for empty or whitespace query', () => {
    expect(searchScripts('')).toHaveLength(0);
    expect(searchScripts('   ')).toHaveLength(0);
  });
});
