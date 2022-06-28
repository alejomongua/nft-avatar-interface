npm run build
source .env
cd dist
FILES=$(find * -type f | awk -v q="'" '{print " -F " q "file=@\"" $0 "\";filename=\"" $0 "\"" q}')
curl -vv -X POST $FILES\
  -u "$INFURA_PROJECT_ID:$INFURA_PROJECT_SECRET" \
  "$INFURA_API_ENDPOINT/api/v0/add?pin=true&recursive=true&wrap-with-directory=true&cid-version=1"
cd ..