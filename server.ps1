$port = 3000
$prefix = "http://localhost:$port/"
$baseDir = "C:\Users\Vatsal\.gemini\antigravity\scratch\eduexcel"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "Server running at $prefix"
} catch {
    $port = 8080
    $prefix = "http://localhost:$port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
    Write-Host "Server running at $prefix"
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".mp3"  = "audio/mpeg"
    ".wav"  = "audio/wav"
    ".ogg"  = "audio/ogg"
    ".mp4"  = "video/mp4"
    ".webm" = "video/webm"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/" -or $path -eq "") {
            $path = "/index.html"
        }

        # sanitize path
        $path = [System.Uri]::UnescapeDataString($path).TrimStart('/')
        $filePath = Join-Path $baseDir $path

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $mime = $mimeTypes[$ext]
            }

            $fileInfo = New-Object System.IO.FileInfo($filePath)
            $totalBytes = $fileInfo.Length
            $rangeHeader = $request.Headers["Range"]

            $response.AddHeader("Accept-Ranges", "bytes")
            $response.ContentType = $mime

            if ($rangeHeader -and $rangeHeader.StartsWith("bytes=")) {
                $range = $rangeHeader.Substring(6)
                $parts = $range.Split('-')
                $start = [long]::Parse($parts[0])
                $end = $totalBytes - 1
                if ($parts.Length -gt 1 -and [string]::IsNullOrWhiteSpace($parts[1]) -eq $false) {
                    $end = [long]::Parse($parts[1])
                }
                if ($end -ge $totalBytes) {
                    $end = $totalBytes - 1
                }
                $length = $end - $start + 1

                $response.StatusCode = 206
                $response.AddHeader("Content-Range", "bytes $start-$end/$totalBytes")
                $response.ContentLength64 = $length

                if ($request.HttpMethod -ne "HEAD") {
                    $fs = [System.IO.File]::OpenRead($filePath)
                    $fs.Seek($start, [System.IO.SeekOrigin]::Begin) | Out-Null
                    $buffer = New-Object byte[] 65536
                    $remaining = $length
                    while ($remaining -gt 0) {
                        $toRead = [Math]::Min($buffer.Length, $remaining)
                        $read = $fs.Read($buffer, 0, $toRead)
                        if ($read -le 0) { break }
                        $response.OutputStream.Write($buffer, 0, $read)
                        $remaining -= $read
                    }
                    $fs.Close()
                }
            } else {
                $response.StatusCode = 200
                $response.ContentLength64 = $totalBytes

                if ($request.HttpMethod -ne "HEAD") {
                    $fs = [System.IO.File]::OpenRead($filePath)
                    $buffer = New-Object byte[] 65536
                    while ($true) {
                        $read = $fs.Read($buffer, 0, $buffer.Length)
                        if ($read -le 0) { break }
                        $response.OutputStream.Write($buffer, 0, $read)
                    }
                    $fs.Close()
                }
            }
        } else {
            $response.StatusCode = 404
            if ($request.HttpMethod -ne "HEAD") {
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
        }
        $response.Close()
    } catch {
        # ignore client disconnects
    }
}
