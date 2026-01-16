# 아이디어스 오늘의 취향 운세 - 프론트엔드 설정

Write-Host "아이디어스 오늘의 취향 운세 - 프론트엔드 설정" -ForegroundColor Cyan
Write-Host ""

# public 폴더 생성
if (!(Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" | Out-Null
    Write-Host "public 폴더 생성됨" -ForegroundColor Green
}

# 브랜드 에셋 복사
Write-Host "브랜드 에셋 복사 중..." -ForegroundColor Yellow
if (Test-Path "brand") {
    Copy-Item -Path "brand" -Destination "public/brand" -Recurse -Force
    Write-Host "  brand -> public/brand" -ForegroundColor Green
}

# 폰트 복사
Write-Host "폰트 복사 중..." -ForegroundColor Yellow
if (Test-Path "fonts") {
    Copy-Item -Path "fonts" -Destination "public/fonts" -Recurse -Force
    Write-Host "  fonts -> public/fonts" -ForegroundColor Green
}

# 로딩 이미지 복사
Write-Host "로딩 이미지 복사 중..." -ForegroundColor Yellow
if (Test-Path "loading") {
    Copy-Item -Path "loading" -Destination "public/loading" -Recurse -Force
    Write-Host "  loading -> public/loading" -ForegroundColor Green
}

Write-Host ""
Write-Host "설정 완료!" -ForegroundColor Green
Write-Host "npm install 후 npm run dev로 실행하세요." -ForegroundColor Cyan
