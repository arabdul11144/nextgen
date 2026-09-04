$path = 'd:\Webxkey\nextgen\src\data\home-content.ts'
$bytes = [System.IO.File]::ReadAllBytes($path)
Write-Host "First 4 bytes (hex):"
for ($i = 0; $i -lt [Math]::Min(4, $bytes.Length); $i++) {
    Write-Host "  byte[$i] = 0x{0:x2}" -f $bytes[$i]
}

# Read the file content
$content = [System.IO.File]::ReadAllText($path)
Write-Host "First 100 chars:"
Write-Host "[$($content.Substring(0, [Math]::Min(100, $content.Length)))]"

# If BOM exists, rewrite without UTF8 BOM
if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    Write-Host "BOM detected - rewriting without BOM as UTF-8"
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Done"
} else {
    Write-Host "No BOM detected"
}