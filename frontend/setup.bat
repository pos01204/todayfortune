@echo off
chcp 65001
echo 아이디어스 오늘의 취향 운세 - 프론트엔드 설정
echo.

REM public 폴더 생성
if not exist public mkdir public

REM 브랜드 에셋 복사
echo 브랜드 에셋 복사 중...
xcopy /E /I /Y brand public\brand

REM 폰트 복사
echo 폰트 복사 중...
xcopy /E /I /Y fonts public\fonts

REM 로딩 이미지 복사
echo 로딩 이미지 복사 중...
xcopy /E /I /Y loading public\loading

echo.
echo 설정 완료!
echo npm install 후 npm run dev로 실행하세요.
pause
