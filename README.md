# Step 1
`echo "GET http://localhost:3000/book" | vegeta attack -rate=500/s -duration=5s | tee results.bin | vegeta report`
