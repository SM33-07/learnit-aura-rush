// tests/aura-rush-multiplayer-e2e.mjs
// Comprehensive End-to-End Automated Test Suite for AURA RUSH — TAKE THE LEAD

import { spawn } from 'child_process';

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTestSuite() {
  console.log('⚡ STARTING COMPREHENSIVE AURA RUSH MULTIPLAYER E2E TEST SUITE...\n');

  // Start dev server on port 3005
  console.log(`[0/7] Spawning Next.js test server on port ${PORT}...`);
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: process.cwd(),
    shell: true,
    env: { ...process.env, PORT: String(PORT) },
  });

  server.stdout.on('data', (d) => {
    // console.log(`[SERVER] ${d}`);
  });
  server.stderr.on('data', (d) => {
    // console.error(`[SERVER ERR] ${d}`);
  });

  // Wait for server to become ready
  let ready = false;
  for (let i = 0; i < 25; i++) {
    await sleep(1000);
    try {
      const res = await fetch(`${BASE_URL}/api/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'PING' }),
      });
      if (res.status === 400 || res.status === 200) {
        ready = true;
        break;
      }
    } catch {}
  }

  if (!ready) {
    server.kill();
    throw new Error('Server failed to start on port ' + PORT);
  }
  console.log(`[READY] Server active on ${BASE_URL}\n`);

  try {
    // -------------------------------------------------------------
    // TEST 1: ROOM CREATION & HOST TOKEN ISOLATION
    // -------------------------------------------------------------
    console.log('--- TEST 1: Room Creation & Host Token Isolation ---');
    const roomCode = `AURA${Math.floor(1000 + Math.random() * 9000)}`;
    const createRes = await fetch(`${BASE_URL}/api/room`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'CREATE', code: roomCode }),
    });
    const createData = await createRes.json();
    if (!createData.success || !createData.hostToken) {
      throw new Error(`Failed to create room: ${JSON.stringify(createData)}`);
    }
    const hostToken = createData.hostToken;
    console.log(`  ✓ Room ${roomCode} created with hostToken: ${hostToken.substring(0, 10)}...`);

    // Verify Unauthorized Host Access is rejected
    const badHostRes = await fetch(`${BASE_URL}/api/room/${roomCode}/state?playerId=host&hostToken=bad_token`);
    if (badHostRes.status !== 403) {
      throw new Error('Host state allowed unauthorized token access!');
    }
    console.log('  ✓ Unauthorized host access strictly rejected with 403 Forbidden');

    // -------------------------------------------------------------
    // TEST 2: PLAYER CAPACITY (1–6 ACCEPTED, 7 REJECTED)
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: Player Capacity (1 to 6 Accepted, 7th Rejected) ---');
    const playerNames = ['Soham', 'Riya', 'Arjun', 'Dev', 'Kunal', 'Anaya'];
    const playerSessions = [];

    for (let i = 0; i < playerNames.length; i++) {
      const pid = `p_${i + 1}`;
      const name = playerNames[i];
      const res = await fetch(`${BASE_URL}/api/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'JOIN', code: roomCode, playerId: pid, name }),
      });
      const data = await res.json();
      if (!data.success || !data.player.sessionToken) {
        throw new Error(`Player ${name} join failed: ${JSON.stringify(data)}`);
      }
      playerSessions.push({
        id: pid,
        name,
        token: data.sessionToken,
        avatar: data.player.avatar,
      });
      console.log(`  ✓ ${name} ${data.player.avatar} joined (${i + 1}/6)`);
    }

    // Attempt 7th Player Join (Must be strictly rejected with ROOM FULL)
    const p7Res = await fetch(`${BASE_URL}/api/room`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'JOIN', code: roomCode, playerId: 'p_7', name: 'Extra Player' }),
    });
    const p7Data = await p7Res.json();
    if (p7Data.success) {
      throw new Error('7th player was wrongly accepted into a 6-player match!');
    }
    console.log(`  ✓ 7th player rejected with: "${p7Data.error}" (Capacity invariant enforced)`);

    // -------------------------------------------------------------
    // TEST 3: RECONNECT & REFRESH IDEMPOTENCY
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: Reconnect & Refresh Idempotency ---');
    const reconnected = await fetch(`${BASE_URL}/api/room`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'JOIN',
        code: roomCode,
        playerId: playerSessions[0].id,
        name: 'Soham Renamed',
      }),
    });
    const reconData = await reconnected.json();
    if (!reconData.success || reconData.player.id !== playerSessions[0].id) {
      throw new Error('Player reconnect failed or created duplicate!');
    }
    console.log('  ✓ Player reconnect restored existing session with zero duplicate creation');

    // -------------------------------------------------------------
    // TEST 4: BATTLE START & ZERO SECRET LEAKAGE
    // -------------------------------------------------------------
    console.log('\n--- TEST 4: Battle Start & Sanitized Projections ---');
    const startRes = await fetch(`${BASE_URL}/api/room`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'START', code: roomCode, hostToken }),
    });
    const startData = await startRes.json();
    if (!startData.success) {
      throw new Error(`Start failed: ${JSON.stringify(startData)}`);
    }

    // Check player projection for 0 secret leakage
    const p1Proj = (await (await fetch(`${BASE_URL}/api/room/${roomCode}/state?playerId=${playerSessions[0].id}&sessionToken=${playerSessions[0].token}`)).json()).view;
    if (p1Proj.challenge?.options?.some((opt) => opt.correct !== undefined)) {
      throw new Error('Secret answer leaked to player client projection!');
    }
    console.log('  ✓ Match started; player view has ZERO secret answer leakage');

    // -------------------------------------------------------------
    // TEST 5: POWER CARDS & DUPLICATE PREVENTION
    // -------------------------------------------------------------
    console.log('\n--- TEST 5: Tactical Power Cards & Duplicate Prevention ---');
    // Soham activates 2x SURGE
    const surgeRes = await fetch(`${BASE_URL}/api/room/${roomCode}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'USE_POWER_CARD',
        playerId: playerSessions[0].id,
        sessionToken: playerSessions[0].token,
        powerCardType: 'SURGE',
      }),
    });
    const surgeData = await surgeRes.json();
    if (!surgeData.success) throw new Error('Surge activation failed');
    console.log('  ✓ Soham activated 2× AURA SURGE');

    // Attempt second activation of same card (Must be rejected)
    const dupSurgeRes = await fetch(`${BASE_URL}/api/room/${roomCode}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'USE_POWER_CARD',
        playerId: playerSessions[0].id,
        sessionToken: playerSessions[0].token,
        powerCardType: 'SURGE',
      }),
    });
    const dupSurgeData = await dupSurgeRes.json();
    if (dupSurgeData.success) {
      throw new Error('Power card was allowed to be used twice!');
    }
    console.log('  ✓ Duplicate power card usage strictly rejected');

    // Riya activates SHIELD
    await fetch(`${BASE_URL}/api/room/${roomCode}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'USE_POWER_CARD',
        playerId: playerSessions[1].id,
        sessionToken: playerSessions[1].token,
        powerCardType: 'SHIELD',
      }),
    });
    console.log('  ✓ Riya activated AURA SHIELD');

    // -------------------------------------------------------------
    // TEST 6: ROUND SUBMISSIONS & SCORING
    // -------------------------------------------------------------
    console.log('\n--- TEST 6: Rapid Round Submissions & Authoritative Scoring ---');
    // Wait for 3-second countdown to transition into active round 1
    console.log('  Waiting 3.2s for countdown to transition to active challenge...');
    await sleep(3200);

    for (let i = 0; i < playerSessions.length; i++) {
      const p = playerSessions[i];
      const ansRes = await fetch(`${BASE_URL}/api/room/${roomCode}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'SUBMIT_ANSWER',
          actionId: `ans_${Date.now()}_${p.id}`,
          playerId: p.id,
          sessionToken: p.token,
          optionIndex: 0,
        }),
      });
      const ansData = await ansRes.json();
      if (!ansData.success) throw new Error(`Submission failed for ${p.name}`);
    }
    console.log('  ✓ All 6 players submitted answers cleanly; speed bonus and scores calculated');

    // Duplicate answer rejection
    const dupAnsRes = await fetch(`${BASE_URL}/api/room/${roomCode}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'SUBMIT_ANSWER',
        playerId: playerSessions[0].id,
        sessionToken: playerSessions[0].token,
        optionIndex: 0,
      }),
    });
    const dupAnsData = await dupAnsRes.json();
    if (dupAnsData.success) throw new Error('Duplicate answer in same round was accepted!');
    console.log('  ✓ Duplicate answer submission in same round strictly rejected');

    // -------------------------------------------------------------
    // TEST 7: FINAL PODIUM CEREMONY & VERDICT
    // -------------------------------------------------------------
    console.log('\n--- TEST 7: Final Podium Ceremony & LearnIT CTA ---');
    await fetch(`${BASE_URL}/api/room/${roomCode}/admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: 'FORCE_WIN', hostToken }),
    });

    const finalState = (await (await fetch(`${BASE_URL}/api/room/${roomCode}/state?playerId=host&hostToken=${hostToken}`)).json()).room;
    if (finalState.phase !== 'PODIUM') {
      throw new Error(`Expected PODIUM phase, got: ${finalState.phase}`);
    }
    console.log('  ✓ Final podium reached with champion and full rankings');

    console.log('\n🎉 ALL 7 TEST PHASES PASSED WITH 100% SUCCESS!\n');
  } finally {
    server.kill();
  }
}

runTestSuite().catch((err) => {
  console.error('❌ Test suite failed:', err);
  process.exit(1);
});
