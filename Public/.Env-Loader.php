<?php
// Simple .env File Loader For PHP
function loadEnv($path) {
    if (!file_exists($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip Comments
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        // Parse key=value Pairs
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            
            // Remove Quotes If Present 
            if (preg_match('/^(["\'])(.*)\\1$/', $value, $matches)) {
                $value = $matches[2];
            }
            
            // Set As Environment Variable And In $_ENV
            putenv("$key=$value");
            $_ENV[$key] = $value;
        }
    }
}

// Load .env File From Parent Directory
loadEnv(__DIR__ . '/../.env');
?>