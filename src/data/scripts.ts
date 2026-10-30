import { Script } from '../types';
import { SCRIPTS_PACK_01 } from './scripts-pack1';
import { SCRIPTS_PACK_02 } from './scripts-pack2';
import { SCRIPTS_PACK_03 } from './scripts-pack3';

export const ALL_SCRIPTS: Script[] = [
  ...SCRIPTS_PACK_01,
  ...SCRIPTS_PACK_02,
  ...SCRIPTS_PACK_03,
];

// Helper to get scripts by pack
export function getScriptsByPack(packId: '01' | '02' | '03'): Script[] {
  return ALL_SCRIPTS.filter((script) => script.packId === packId);
}

// Helper to get scripts by category
export function getScriptsByCategory(categoryId: string): Script[] {
  return ALL_SCRIPTS.filter((script) => script.categoryId === categoryId);
}

// Helper to get count by category
export function getCategoryScriptCount(categoryId: string): number {
  return ALL_SCRIPTS.filter((script) => script.categoryId === categoryId).length;
}

// Helper to get count by pack
export function getPackScriptCount(packId: '01' | '02' | '03'): number {
  return ALL_SCRIPTS.filter((script) => script.packId === packId).length;
}

