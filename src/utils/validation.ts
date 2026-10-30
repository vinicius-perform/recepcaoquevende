import { ALL_SCRIPTS } from '../data/scripts';
import { PACKS } from '../data/packs';

export interface ValidationReport {
  isValid: boolean;
  totalScripts: number;
  expectedTotal: number;
  packCounts: Record<string, { actual: number; expected: number }>;
  categoryCounts: Record<string, { actual: number; expected: number }>;
  errors: string[];
}

export function validateScriptsDataset(): ValidationReport {
  const errors: string[] = [];
  const expectedTotal = 120;
  const totalScripts = ALL_SCRIPTS.length;

  if (totalScripts !== expectedTotal) {
    errors.push(`Total de scripts inválido: encontrado ${totalScripts}, esperado ${expectedTotal}`);
  }

  // Check unique IDs
  const seenIds = new Set<string>();
  for (const script of ALL_SCRIPTS) {
    if (seenIds.has(script.id)) {
      errors.push(`ID duplicado encontrado: ${script.id}`);
    }
    seenIds.add(script.id);

    // Check empty fields
    if (!script.title || script.title.trim().length === 0) {
      errors.push(`Script ${script.id} possui título vazio`);
    }
    if (!script.message || script.message.trim().length === 0) {
      errors.push(`Script ${script.id} possui mensagem vazia`);
    }
    if (!script.categoryId || script.categoryId.trim().length === 0) {
      errors.push(`Script ${script.id} possui categoryId vazio`);
    }
    if (!script.packId || !['01', '02', '03'].includes(script.packId)) {
      errors.push(`Script ${script.id} possui packId inválido: ${script.packId}`);
    }
  }

  const packCounts: Record<string, { actual: number; expected: number }> = {};
  const categoryCounts: Record<string, { actual: number; expected: number }> = {};

  for (const pack of PACKS) {
    const actualPackCount = ALL_SCRIPTS.filter((s) => s.packId === pack.id).length;
    packCounts[pack.id] = { actual: actualPackCount, expected: pack.targetCount };
    if (actualPackCount !== pack.targetCount) {
      errors.push(
        `Pack ${pack.id} (${pack.title}): esperado ${pack.targetCount} scripts, encontrado ${actualPackCount}`
      );
    }

    for (const cat of pack.categories) {
      const actualCatCount = ALL_SCRIPTS.filter((s) => s.categoryId === cat.id).length;
      categoryCounts[cat.id] = { actual: actualCatCount, expected: cat.targetCount };
      if (actualCatCount !== cat.targetCount) {
        errors.push(
          `Categoria "${cat.title}" (${cat.id}): esperado ${cat.targetCount} scripts, encontrado ${actualCatCount}`
        );
      }
    }
  }

  return {
    isValid: errors.length === 0,
    totalScripts,
    expectedTotal,
    packCounts,
    categoryCounts,
    errors,
  };
}

