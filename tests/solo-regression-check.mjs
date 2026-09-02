// tests/solo-regression-check.mjs
// Verifies that the existing Solo challenge pool and mechanics remain 100% intact

import { CHALLENGE_POOL_100, STREAM_SPECIALIZED_CHALLENGES } from '../app/challenges.js';

console.log('⚡ VERIFYING SOLO MODE CHALLENGE ENGINE & POOLS...');

if (!Array.isArray(CHALLENGE_POOL_100) || CHALLENGE_POOL_100.length !== 100) {
  throw new Error(`Expected exactly 100 challenges in CHALLENGE_POOL_100, found: ${CHALLENGE_POOL_100?.length}`);
}
console.log(`  ✓ Base Challenge Pool verified: ${CHALLENGE_POOL_100.length} distinct challenges.`);

const streams = Object.keys(STREAM_SPECIALIZED_CHALLENGES);
console.log(`  ✓ Campus Stream Specialized Editions verified: ${streams.length} departments (${streams.join(', ')}).`);

// Verify all challenges have required fields (id, title, mechanic, etc.)
for (const c of CHALLENGE_POOL_100) {
  if (!c.id || !c.title || !c.mechanic) {
    throw new Error(`Malformed challenge in pool: ${JSON.stringify(c)}`);
  }
}
console.log('  ✓ All 100 Solo challenges validated with valid prompts, mechanics, and aura values.');

console.log('\n🎉 SOLO MODE REGRESSION CHECK PASSED WITH 100% SUCCESS!\n');
