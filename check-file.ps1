$file = 'd:\Webxkey\nextgen\src\data\home-content.ts'
$lines = Get-Content $file
Write-Host "Line count: $($lines.Count)"
Write-Host "--- Last 15 lines ---"
$lines | Select-Object -Last 15 | ForEach-Object { Write-Host $_ }
