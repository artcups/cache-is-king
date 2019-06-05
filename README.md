# Step 1

`echo "GET http://localhost:3000/book" | vegeta attack -rate=500/s -duration=5s | tee results.bin | vegeta report`

# Step 2

`echo "GET http://localhost:3000/book" | vegeta attack -rate=100/s -duration=60s | tee results.bin | vegeta report`
`echo "GET http://localhost:3000/book/nocache" | vegeta attack -rate=100/s -duration=60s | tee results.bin | vegeta report`
