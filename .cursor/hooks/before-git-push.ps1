#!/usr/bin/env pwsh
# PRIME v2 — prompt for QA confirmation before git push
# Hook: beforeShellExecution (matcher: git push)

$ErrorActionPreference = 'Stop'

$inputRaw = [Console]::In.ReadToEnd()
if (-not $inputRaw) { exit 0 }

try {
    $payload = $inputRaw | ConvertFrom-Json
} catch {
    exit 0
}

$command = $payload.command
if (-not $command -or $command -notmatch 'git\s+push') {
    exit 0
}

if ($env:PRIME_QA_PUSH_OK -eq '1') {
    exit 0
}

$msg = @'
PRIME v2 QA Push Gate — confirm before pushing:

1. Product Manager: change matches approved scope/story
2. Architect: design/module boundaries respected
3. Security: RBAC on backend; no secrets in commit
4. QA: tests defined and passing; permissions checked
5. Docs updated if behavior changed

Full checklist: docs/agents/QA-PUSH-GATE.md
To bypass once (emergency): set PRIME_QA_PUSH_OK=1
'@

$result = @{
    permission   = 'ask'
    user_message = 'PRIME v2: complete the QA Push Gate checklist before pushing.'
    agent_message = $msg
} | ConvertTo-Json -Compress

Write-Output $result
exit 0
